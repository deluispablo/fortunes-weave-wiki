/* Fortune's Weave · team planner, the week (Capítulo › «Esta semana»): gifts and the gift round, meals, Servicio divino,
   deadlines, shopping and searches, and refining at the Herrería. */
'use strict';

/* ---------------- gifts ---------------- */
const GIFT_RANK = { fav: 0, love: 1, like: 2 };
const GIFT_BY_PID = Object.fromEntries(Object.values((W.gifts || {}).chars || {}).map(g => [g.pid, g]));
const ITEM_ORD = Object.fromEntries(Object.keys(ITEMS).map((k, i) => [k, i]));  // W.items keeps the game's game data order: the gift menu order
/** one unit's gifts as the game menu lists them: {good: [{iid, t}] (fav, love, like, in menu order), bad: [iid] (dislikes and hates)} */
/** the favourites of `team` other than `pid`: a gift kept for them is never a plain like/love for `pid` */
const favOfOthers = (pid, team) => new Set(team.filter(p => p !== pid).flatMap(p => Object.entries(GIFT_BY_PID[p]?.gifts || {}).filter(([, g]) => g.t === 'fav').map(([iid]) => iid)));
function giftList(pid, team = []) {
  const kept = favOfOthers(pid, team);
  const e = Object.entries(GIFT_BY_PID[pid]?.gifts || {}).filter(([iid, g]) => g.t === 'fav' || !kept.has(iid)), ord = ([a], [b]) => (ITEM_ORD[a] ?? 1e9) - (ITEM_ORD[b] ?? 1e9);
  return { good: e.filter(([, g]) => ['fav', 'love', 'like'].includes(g.t)).sort(ord).map(([iid, g]) => ({ iid, t: g.t })),
    bad: e.filter(([, g]) => ['dis', 'hate'].includes(g.t)).sort(ord).map(([iid]) => iid) };
}
const giftPrice = iid => W.gifts.items[iid]?.price ?? ITEMS[iid]?.price ?? 0;
/** pids (priority order) → {pid: {picks, weekly, blocked, none}}.
    A favourite of a teammate is kept for the first of them in priority and never offered to anyone else.
    picks: top `n` by tier (favourite → loves → likes; favourites priciest first, the rest cheapest first) with an open source.
    weekly: the cheap everyday gifts («le gusta» and «le encanta»), cheapest first, up to `w`, not already in picks. */
function teamGifts(pids, route, key, n = 3, w = 6) {
  const favOwner = {};
  pids.forEach(p => Object.entries(GIFT_BY_PID[p]?.gifts || {}).forEach(([iid, g]) => { if (g.t === 'fav') favOwner[iid] ??= p; }));
  return Object.fromEntries(pids.map(p => {
    const g = GIFT_BY_PID[p];
    if (!g) return [p, { picks: [], weekly: [], blocked: [], none: true }];
    const blocked = [], picks = [], weekly = [];
    const mine = iid => !favOwner[iid] || favOwner[iid] === p;
    const cands = Object.entries(g.gifts).filter(([, x]) => x.t in GIFT_RANK)
      .sort((a, b) => GIFT_RANK[a[1].t] - GIFT_RANK[b[1].t] || (a[1].t === 'fav' ? giftPrice(b[0]) - giftPrice(a[0]) : giftPrice(a[0]) - giftPrice(b[0])) || a[0].localeCompare(b[0]));
    for (const [iid, x] of cands) {
      if (picks.length >= n) break;
      if (!mine(iid)) { blocked.push(iid); continue; }
      const src = itemSources(iid, route, key);
      if (src.length) picks.push({ iid, t: x.t, price: giftPrice(iid), src });
    }
    const cheap = Object.entries(g.gifts).filter(([iid, x]) => (x.t === 'like' || x.t === 'love') && !favOwner[iid] && !picks.some(q => q.iid === iid))
      .sort((a, b) => giftPrice(a[0]) - giftPrice(b[0]) || GIFT_RANK[a[1].t] - GIFT_RANK[b[1].t] || a[0].localeCompare(b[0]));
    for (const [iid, x] of cheap) {
      if (weekly.length >= w) break;
      const src = itemSources(iid, route, key);
      if (src.length) weekly.push({ iid, t: x.t, price: giftPrice(iid), src });
    }
    return [p, { picks, weekly, blocked, none: false }];
  }));
}

/** the weekly gift round («Ronda de regalos»): the «quiero» recruits in the game's roster order (serial, as the in-town teleport list),
    each with every favourite, loved and liked gift that has an open source, favourite first (then the priciest favourite, the cheapest of the rest).
    An item that is the favourite of another team member (`team`: «quiero» or recruited) is left out of everyone else's loved/liked lists. */
function teamGiftRound(want, route, key, team = want) {
  const favOf = {};
  [...new Set([...want, ...team])].forEach(p => Object.entries(GIFT_BY_PID[p]?.gifts || {}).forEach(([iid, g]) => { if (g.t === 'fav') (favOf[iid] ??= new Set()).add(p); }));
  return [...new Set(want)].filter(p => CHARS[p]).sort(bySerial).map(p => {
    const g = GIFT_BY_PID[p];
    if (!g) return { pid: p, none: true, items: [] };
    const items = Object.entries(g.gifts).filter(([iid, x]) => x.t in GIFT_RANK && (x.t === 'fav' || !favOf[iid] || (favOf[iid].size === 1 && favOf[iid].has(p))))
      .sort((a, b) => GIFT_RANK[a[1].t] - GIFT_RANK[b[1].t] || (a[1].t === 'fav' ? giftPrice(b[0]) - giftPrice(a[0]) : giftPrice(a[0]) - giftPrice(b[0])) || a[0].localeCompare(b[0]))
      .map(([iid, x]) => ({ iid, t: x.t, price: giftPrice(iid), src: itemSources(iid, route, key) })).filter(x => x.src.length);
    return { pid: p, none: false, items };
  });
}

/* ---------------- week plan («Semana»): what to do in Dagsion this chapter for the «quiero» recruits ---------------- */
const SUPPORT_AT = [0, 0, 400, 1400, 2400, 3200];  // cumulative support points per level
// support from zero a weekend visit gives one recruit (two gifts, two meals a day, two services), before the Prestigio bonuses
const WEEKEND_PTS = 500;
const teamOpenIdx = (route, what) => teamFirst(route, 0, c => (c.unlocks || []).includes(what));
/** last day to recruit `pid` on `route`: its closing row, else the end of Part 1 → {key, date|null} */
function teamDeadline(pid, route) {
  for (const c of routeChapters(route)) { const x = (c.closing || []).find(z => z.kind === 'recluta' && z.id === pid); if (x) return { key: c.key, date: x.deadline || c.end || null }; }
  const ch = routeChapters(route), last = ch[ch.map(c => c.part).lastIndexOf(1)];
  return last ? { key: last.key, date: last.end || null, part: true } : null;
}
/** weeks (Sundays) from chapter `key` up to and including chapter `until` */
const teamWeeksLeft = (route, key, until) => { const ch = routeChapters(route), a = chapIdx(route, key), b = chapIdx(route, until); return a < 0 || b < a ? 0 : ch.slice(a, b + 1).reduce((n, c) => n + (c.weeks || []).length, 0); };
/** the week plan for the «quiero» recruits `want` (recruitable ones with a cost) on `route` at chapter `key`:
    need: one row per recruit (support level with the lord, points from zero, meals needed, weeks left, urgency), most urgent first;
    meals: per week of the chapter, the guests paired by urgency with the best dish of that week's menu for both;
    temple / play / open: what the chapter offers (Servicio divino, Teatro, Percha…), from the chapter data. */
function teamWeek(route, key, want) {
  const lord = LORDS[route], idx = chapIdx(route, key), ch = CAPS[key] || {};
  const need = [...new Set(want)].map(pid => [pid, CHARS[pid]?.routes?.[route]]).filter(([, x]) => x?.recruit_key && x.cost).map(([pid, x]) => {
    const dl = teamDeadline(pid, route), pts = SUPPORT_AT[x.cost.support] || 0, visits = Math.ceil(pts / WEEKEND_PTS);
    const weeks = dl ? teamWeeksLeft(route, key, dl.key) : 0, late = dl && chapIdx(route, dl.key) < idx;
    return { pid, support: x.cost.support, renown: x.cost.renown, from: x.recruit_key, open: chapIdx(route, x.recruit_key) <= idx, deadline: dl, pts, visits, weeks, late,
      urgency: late ? -1 : weeks ? pts / weeks : pts ? 1e6 : 0 };
  }).sort((a, b) => b.urgency - a.urgency || chapOrder(a.deadline?.key) - chapOrder(b.deadline?.key) || bySerial(a.pid, b.pid));
  const live = need.filter(n => !n.late && n.pts > 0);
  const innOpen = teamOpenIdx(route, 'Posada'), inn = innOpen >= 0 && innOpen <= idx;
  const meals = !inn ? [] : (ch.weeks || []).map(w => {
    const pairs = [];
    for (let i = 0; i < live.length && pairs.length < 3; i += 2) {
      const guests = live.slice(i, i + 2).map(n => n.pid);
      const score = d => guests.reduce((a, p) => { const m = (GIFT_BY_PID[p]?.meals || []).find(x => x.es === d.es); return a + (m?.hate ? -9 : m?.score || 0) + (m?.fav ? 2 : 0); }, 0);
      const dish = (w.menu || []).filter(d => !pairs.some(q => q.dish?.es === d.es)).sort((a, b) => score(b) - score(a) || a.renown_rank - b.renown_rank)[0] || null;
      pairs.push({ guests, dish });
    }
    return { sunday: w.sunday, pairs };
  });
  const svcOpen = teamOpenIdx(route, 'Servicio divino'), [a, b] = teamFree(key), inCh = d => d >= a && d <= b;
  const temple = svcOpen >= 0 && svcOpen <= idx ? { with: live[0]?.pid || null, sundays: (ch.weeks || []).map(w => w.sunday).filter(inCh),
    holy: (ch.weeks || []).flatMap(w => (w.discounts || []).filter(d => inCh(d.date) && /Día sagrado|Día de Dagda/.test(d.es)).map(d => ({ date: d.date, es: d.es }))) } : null;
  const fansIn = (ch.weeks || []).flatMap(w => (w.plays || []).map(pl => ({ es: pl.es, fans: (pl.fans || []).filter(p => p === lord || live.some(n => n.pid === p)) })));
  const play = fansIn.filter((x, i) => fansIn.findIndex(y => y.es === x.es) === i);
  const birthdays = (ch.weeks || []).flatMap(w => (w.birthdays || []).filter(b => inCh(b.date) && live.some(n => n.pid === b.pid)));
  const perch = teamOpenIdx(route, 'Percha'), training = teamOpenIdx(route, 'Plaza de armas');
  const B = (window.WIKI_EXT || {}).batallas?.b || [], rerun = ctxGet().rerun;
  const detours = rerun && ch.part === 1 ? B.filter(b => b.k === 'desvío' && (b.ch || []).some(([r, n]) => r === ROUTE_NAME[route] && n === ch.n)).map(b => ({ id: b.id, es: b.t })) : [];
  return { route, key, lord, need, meals, inn, rerun, detours, innAt: innOpen >= 0 ? routeChapters(route)[innOpen].key : null, temple, play, birthdays,
    perch: perch >= 0 && perch <= idx, training: training >= 0 && training <= idx,
    renown: Math.max(0, ...need.filter(n => !n.late).map(n => n.renown || 0)) };
}

/* ---------------- the weekend visit («Este fin de semana»): Saturday + Sunday in Dagsion ----------------
   What is used on Saturday is stamped with the next Sunday, so it is free again at 0:00 on Sunday: one visit spends two weekly
   windows. Per window: one gift per person, each dish of the week's menu once (the lord + 2 guests), one Servicio divino in all,
   each Plaza de armas option once (2 units). */
const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];  // i18n-ignore (data values: recruit.where weekdays)
const dayNum = d => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) / 864e5;
const addDays = (d, n) => new Date((dayNum(d) + n) * 864e5).toISOString().slice(0, 10);
const dowOf = d => DOW[((dayNum(d) % 7) + 11) % 7];  // 1970-01-01 was a Thursday
/** the chapter's free days [first, last] (ISO dates) */
const teamFree = key => { const c = CAPS[key] || {}; return [c.free_start || c.start || '', c.free_end || c.end || '']; };
/** the weekends of chapter `key` with at least one free day: [{sat, sun}] (a day outside the free days is null) */
function teamWeekends(key) {
  const c = CAPS[key] || {}, [a, b] = teamFree(key), suns = (c.weeks || []).map(w => w.sunday);
  if (suns.length) suns.push(addDays(suns[suns.length - 1], 7));
  return suns.map(sun => { const sat = addDays(sun, -1); return { sat: sat >= a && sat <= b ? sat : null, sun: sun >= a && sun <= b ? sun : null }; })
    .filter(w => w.sat || w.sun);
}
const isoOf = s => { const m = /(\d{4})\/(\d{1,2})\/(\d{1,2})/.exec(s); return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : null; };
/** is recruit `pid` in Dagsion on `date` (chapter `key`)? From recruit.where («solo mar/mié», «mes 3», «desde…», «antes de…», «cap. N»).
    Part 1 only (the rows say «toda la Parte 1»); no row, or another part → assumed there.
    shortcut: the rows are Cai's route schedule; the other lords reuse it until each lord has its own rows. */
function teamHere(pid, date, key) {
  const c = CAPS[key] || {};
  const rows = (CHARS[pid]?.recruit?.where || []).filter(x => /^Dagsion:/.test(x));
  if (c.part !== 1 || !rows.length) return true;
  return rows.some(x => {
    const cap = /cap\. (\d+)/.exec(x); if (cap && +cap[1] !== c.n) return false;
    const days = /solo ((?:lun|mar|mié|jue|vie|sáb|dom)(?:\/(?:lun|mar|mié|jue|vie|sáb|dom))*)/.exec(x); if (days && !days[1].split('/').includes(dowOf(date))) return false;
    const mes = /(?:^|, )mes (\d+)/.exec(x); if (mes && +mes[1] !== +date.slice(5, 7)) return false;
    const dia = /día del mes (\d+)/.exec(x); if (dia && +dia[1] !== +date.slice(8, 10)) return false;
    const from = /desde (\S+)/.exec(x), until = /antes de (\S+)/.exec(x);
    if (from && isoOf(from[1]) && date < isoOf(from[1])) return false;
    if (until && isoOf(until[1]) && date >= isoOf(until[1])) return false;
    return true;
  });
}
/** the weekdays a recruit is in Dagsion, when they never are on Saturday or Sunday: «mar/mié» (else null) */
const teamWeekdays = pid => { const d = [...new Set((CHARS[pid]?.recruit?.where || []).flatMap(x => (/solo ((?:lun|mar|mié|jue|vie|sáb|dom)(?:\/\S+?)*)(?:,|$)/.exec(x) || [])[1]?.split('/') || []))];
  return d.length ? d.sort((a, b) => DOW.indexOf(a) - DOW.indexOf(b)).join('/') : null; };
const GIFT_PTS = { fav: 90, love: 75, like: 65 }, MEAL_BASE = 80, SERVICE_PTS = 10;
/** the weekend plan for `want` («quiero») at chapter `key`, weekend number `n` (0-based, clamped); `army`: the units already in the army,
    in priority order (the Plaza de armas pairs). → {weekends, n, sat, sun, days, gifts, away, meals, training, service, need, gold} */
function teamWeekend(route, key, want, n = 0, army = []) {
  const ends = teamWeekends(key), c = CAPS[key] || {}, idx = chapIdx(route, key), lord = LORDS[route];
  n = Math.max(0, Math.min(n, ends.length - 1));
  const we = ends[n] || { sat: null, sun: null };
  const wk = teamWeek(route, key, want), live = wk.need.filter(x => !x.late && x.pts > 0 && x.open);
  const weekOf = d => (c.weeks || []).find(w => w.sunday === (dowOf(d) === 'dom' ? d : addDays(d, -6))) || null;
  const on = (d, re) => { const w = weekOf(d); return [...(w?.discounts || []), ...(w?.festivals || []).map(f => ({ date: f.date, es: f.es + ': ' + (f.detail || '') }))].some(x => x.date === d && re.test(x.es)); };
  const days = [we.sat, we.sun].filter(Boolean).map(d => ({ date: d, dow: dowOf(d), here: live.filter(x => teamHere(x.pid, d, key)).map(x => x.pid),
    holy: (weekOf(d)?.discounts || []).find(x => x.date === d && /Día sagrado|Día de Dagda/.test(x.es))?.es || null }));
  const hereAny = new Set(days.flatMap(d => d.here));
  // gifts: one per present day, the best gift sold or bartered in this chapter (favourite first); birthdays add one that day
  const round = teamGiftRound(live.map(x => x.pid), route, key, ctxTeam(route));
  const gifts = round.filter(r => hereAny.has(r.pid)).map(r => {
    const buy = r.items.map(x => ({ ...x, offer: teamOffers(x.iid, route, key)[0] || null })).filter(x => x.offer);
    const pick = buy[0] || null, on2 = days.filter(d => d.here.includes(r.pid)).map(d => d.date);
    const bday = (weekOf(on2[0] || we.sat || we.sun)?.birthdays || []).concat(weekOf(we.sun || we.sat)?.birthdays || []).find(b => b.pid === r.pid && on2.includes(b.date))?.date || null;
    return { pid: r.pid, days: on2, pick, alts: buy.slice(1, 4), other: pick ? null : r.items[0] || null, none: r.none, birthday: bday };
  });
  const away = live.filter(x => !hereAny.has(x.pid)).map(x => ({ pid: x.pid, when: teamWeekdays(x.pid) }));
  // meals: per day, that week's menu (Prestigio 1–2 dishes; Prestigio 3 ones apart), the lord + the 2 most urgent present
  const innOpen = teamOpenIdx(route, 'Posada'), inn = innOpen >= 0 && innOpen <= idx;
  const meals = !inn ? [] : days.map(d => {
    const guests = d.here.slice(0, 2), half = d.dow === 'dom' || on(d.date, /Comida a mitad/);
    const score = m => guests.reduce((a, p) => { const x = (GIFT_BY_PID[p]?.meals || []).find(y => y.es === m.es); return a + (x?.hate ? -9 : x?.score || 0) + (x?.fav ? 2 : 0); }, 0);
    const menu = [...(weekOf(d.date)?.menu || [])].sort((a, b) => a.renown_rank - b.renown_rank || score(b) - score(a));
    return { date: d.date, dow: d.dow, guests, price: half ? 150 : 300, dishes: menu.filter(m => m.renown_rank < 3), more: menu.filter(m => m.renown_rank >= 3) };
  });
  // Plaza de armas: the options of the part minus the week's missing one, half price on the weekend; pairs from the army (the lord in 3)
  const trOpen = teamOpenIdx(route, 'Plaza de armas'), F = (W.mech || {}).facilities?.training || {};
  const opts = trOpen >= 0 && trOpen <= idx ? (F.options || []).filter(o => (o.part || []).includes(`${c.part}部`)) : [];
  const mates = army.filter(p => p !== lord);  // the lord trains in three sessions (motivation), two of the team in the fourth
  const training = !opts.length ? null : days.map(d => {
    const miss = weekOf(d.date)?.training_missing || [], list = opts.filter(o => !miss.includes(o.es));
    return { date: d.date, dow: d.dow, price: Math.round((list[0]?.cost || 300) / 2), missing: miss, options: list.map((o, i) => {
      const pair = !mates.length ? [] : i < 3 ? [lord, mates[i % mates.length]] : mates.length > 1 ? [mates[i % mates.length], mates[(i + 1) % mates.length]] : [];
      return { es: o.es, pair };
    }) };
  });
  // Servicio divino: one a day, the lord with the most urgent recruit present that day
  const svcOpen = teamOpenIdx(route, 'Servicio divino');
  const service = svcOpen >= 0 && svcOpen <= idx ? days.map(d => ({ date: d.date, dow: d.dow, with: d.here[0] || null, holy: d.holy })) : null;
  // support per recruit this weekend and visits to reach the level from zero
  const need = live.map(x => {
    const g = gifts.find(y => y.pid === x.pid), tier = g?.pick?.t || g?.other?.t;
    const pts = (g ? g.days.length * (GIFT_PTS[tier] || 40) : 0) + meals.reduce((a, m) => a + (m.guests.includes(x.pid) ? m.dishes.length * MEAL_BASE : 0), 0) +
      (service || []).filter(s => s.with === x.pid).length * SERVICE_PTS;
    return { ...x, weekend: pts, visits: pts ? Math.ceil(x.pts / pts) : null };
  });
  const gold = gifts.reduce((a, g) => a + (g.pick ? (g.pick.offer.type === 'barter' ? 0 : g.pick.offer.price) * g.days.length : 0), 0) +
    meals.reduce((a, m) => a + (m.guests.length ? m.dishes.length * m.price : 0), 0) + (training || []).reduce((a, d) => a + d.options.filter(o => o.pair.length === 2).length * d.price, 0);
  return { route, key, lord, weekends: ends, n, sat: we.sat, sun: we.sun, days, gifts, away, meals, inn, innAt: innOpen >= 0 ? routeChapters(route)[innOpen].key : null,
    training, trainingAt: trOpen > idx ? routeChapters(route)[trOpen].key : null, service, need, gold, rerun: wk.rerun, late: wk.need.filter(x => x.late), soon: wk.need.filter(x => !x.open && !x.late) };
}

/* ---------------- shopping, searches and routines for the context chapter («Compras» in Semana) ---------------- */
const DAGSION = '帝都ダグシオン';
const teamDist = spot => { const d = SPOTS[DAGSION]?.xy, s = SPOTS[spot]?.xy; return d && s ? Math.hypot(s[0] - d[0], s[1] - d[1]) : 1e6; };

/** where `iid` can be bought or bartered on `route` in chapter `key` itself, nearest first (Dagsion, then fewest Prestigio, then distance) */
function teamOffers(iid, route, key) {
  const c = CAPS[key], out = [];
  for (const o of ITEMS[iid]?.obtain || []) {
    if (!['tienda', 'ambulante', 'barter'].includes(o.type)) continue;
    // stock gated by a Dagsion progress stage has no chapter in the data: left out rather than guessed
    const row = (o.rows || [{ conds: o.conds || [] }]).find(w => !(w.conds || []).some(x => /^進行_段階/.test(x)) && condOk(w.conds, route, c) && (route !== 'cai' || c.part !== 1 || !w.cai_p1_chapters || w.cai_p1_chapters.includes(c.n)));
    if (!row || !barterOk(o, route, key) || !facOk(o, route, key)) continue;  // the facility must be open in this very chapter
    // a wandering merchant has no fixed spot but roams around its home town (shop id «<town>商人»): that town decides access
    const home = o.type === 'ambulante' ? sourceSpot(o) : null;
    const spot = o.type === 'ambulante' ? null : sourceSpot(o), acc = spotAccess(spot || home, route, key);
    if (!acc.ok) continue;
    out.push({ type: o.type, where: o.where, spot, home, price: row.price ?? o.price ?? ITEMS[iid].price ?? 0, pay: o.pay || [], renown: acc.renown, gates: acc.gates, iid });
  }
  const TY = { tienda: 0, barter: 1, ambulante: 2 };
  return out.sort((a, b) => (b.spot === DAGSION) - (a.spot === DAGSION) || TY[a.type] - TY[b.type] || a.renown - b.renown || teamDist(a.spot) - teamDist(b.spot));
}
/** searches that give `iid` at a place reachable on `route` in chapter `key` */
const teamSearches = (iid, route, key) => (ITEMS[iid]?.obtain || []).filter(o => o.type === 'búsqueda' && o.spot && SPOTS[o.spot] && routeOk(o.condition || [], route) && spotAccess(o.spot, route, key).ok)
  .map(o => ({ spot: o.spot, pct: o.pct, cond: o.condition || [], renown: spotAccess(o.spot, route, key).renown })).sort((a, b) => b.pct - a.pct || a.renown - b.renown);

/* ---------------- «En este capítulo»: tips computed from the shops, barters and searches open now ---------------- */
/** where to get a barter material now: the best search, else the cheapest shop → {search, shop} (both null: no source) */
const teamPaySrc = (id, route, key) => ({ search: teamSearches(id, route, key).find(s => s.pct > 0) || null,
  shop: teamOffers(id, route, key).filter(o => o.type !== 'barter').sort((a, b) => a.price - b.price)[0] || null });
/** → {news: [{iid, offer}], barters: [{iid, offer, mats: [{id, n, src}], value, cost}], loot: [{iid, spot, pct, sell}]} */
function teamTips(route, key) {
  const c = CAPS[key] || {};
  const news = [...new Set(Object.values(c.news?.shop || {}).flat())].map(iid => ({ iid, offer: teamOffers(iid, route, key).find(o => o.type !== 'barter') }))
    .filter(x => x.offer).sort((a, b) => (b.offer.spot === DAGSION) - (a.offer.spot === DAGSION) || b.offer.price - a.offer.price);  // Dagsion first, the priciest (weapons, tonics) before drinks
  // barters that pay off: every material has a source now, sorted by what the result sells for minus what the materials cost
  const barters = Object.keys(ITEMS).filter(id => (ITEMS[id].obtain || []).some(o => o.type === 'barter')).flatMap(iid => teamOffers(iid, route, key).filter(o => o.type === 'barter').map(offer => {
    const mats = offer.pay.map(p => ({ id: p.id, n: p.n, src: teamPaySrc(p.id, route, key) }));
    const cost = mats.reduce((a, m) => a + (m.src.shop ? m.src.shop.price * m.n : 0), 0);
    const tries = mats.reduce((a, m) => a + (m.src.search && !m.src.shop ? m.n * 100 / m.src.search.pct : 0), 0);  // searches it takes on average
    return { iid, offer, mats, value: ITEMS[iid].sell || 0, cost, score: ((ITEMS[iid].sell || 0) - cost) / Math.max(1, tries) };
  })).filter(b => b.mats.every(m => m.src.search || m.src.shop) && b.value - b.cost >= 300).sort((a, b) => b.score - a.score || b.value - a.value);
  // free loot that sells well: searches open now (not quest finds at 0 %)
  const loot = Object.keys(ITEMS).filter(id => (ITEMS[id].sell || 0) >= 500 && (ITEMS[id].obtain || []).some(o => o.type === 'búsqueda'))
    .flatMap(iid => teamSearches(iid, route, key).filter(s => s.pct > 0).slice(0, 1).map(s => ({ iid, spot: s.spot, pct: s.pct, sell: ITEMS[iid].sell })))
    .sort((a, b) => b.sell * b.pct - a.sell * a.pct);
  return { news, barters, loot };
}

/* enemy types of a battle, read from the enemy classes: armoured = the class exam asks Coraza, riders = trains Equitación (not Vuelo),
   fliers = trains Vuelo; beasts and undead = monster classes (bears, wolves, birds, sea beasts… / skeletons, zombies, mummies) */
const FOE_BEAST = /ベア|オオカミ|ルフ|海獣|ヴィーグル|ハルピア|魔獣|ケートゥス|ヒュドラ/, FOE_UNDEAD = /スケルトン|ゾンビ|マミー/;
function teamFoeKinds(cls) {
  const j = CLASSES[cls];
  if (!j) return FOE_UNDEAD.test(cls) ? ['nomuerto'] : FOE_BEAST.test(cls) ? ['bestia'] : [];
  const t = j.skills_trainable_q || {}, out = [];
  if ((j.exam_requirements || []).some(r => r.skill === 'Armor')) out.push('acorazado');
  if (t['Vuelo'] > 0) out.push('volador'); else if (t['Equitación'] > 0) out.push('jinete');
  return out;
}
const FOE_ES = { acorazado: 'acorazados', jinete: 'jinetes', volador: 'voladores', bestia: 'bestias', nomuerto: 'no muertos' };
const FOE_EFF = { acorazado: /SID_重装(有効|特効)/, jinete: /SID_騎兵(有効|特効)/, bestia: /SID_獣有効/, nomuerto: /SID_冥魔有効/ };  // fliers: every bow already hits them
/** the battles ahead from chapter `key`: the chapter's own story battle (it closes the chapter) and the next chapter's, with the enemy types (2 or more) */
function teamFoesAhead(route, key) {
  const B = (window.WIKI_EXT || {}).batallas?.b || [], ch = routeChapters(route), i = chapIdx(route, key);
  return [ch[i], ch[i + 1]].filter(Boolean).flatMap((c, k) => (c.battles || []).map(x => B.find(b => b.id === x.id)).filter(Boolean).map(b => {
    const n = {}; b.e.forEach(u => teamFoeKinds(u.c).forEach(t => { n[t] = (n[t] || 0) + 1; }));
    return { id: b.id, es: b.t, key: c.key, next: k === 1, kinds: Object.entries(n).filter(([, v]) => v >= 2).sort((a, b) => b[1] - a[1]) };
  }));
}
const EFF_ITEMS = Object.fromEntries(Object.entries(FOE_EFF).map(([k, re]) => [k, Object.keys(ITEMS).filter(id => {
  const w = ITEMS[id].weapon; return w && (w.equip_skills || []).some(x => re.test(x)) && (ITEMS[id].price || 0) >= 2000 && !/\+\d$/.test(ITEMS[id].es); })]));
const MANUAL_OF = { 'Equitación': 'IID_馬術書', 'Vuelo': 'IID_飛行術書', 'Coraza': 'IID_重装術書' };
const ROUTINE_ITEMS = ['IID_白魔術書', 'IID_黒魔術書', 'IID_上級資格手形'];
/** accessory rules: an accessory worth it only for a class on the build */
const ACC_RULES = [{ name: 'Anillo de gigante', cls: 'Cuadriguero', why: 'Con +4 compensa el peso; el Cuadriguero no depende de la esquiva' }];  // i18n-ignore — name, cls: Spanish game names (lookup keys); why: shown through t()

/** what to buy, search and barter in chapter `key` for the team `builds` (+ the mounts plan):
    buy: [{spot|null, where, items: [{iid, why, offer}]}] grouped by place; chains: search → Vandahl barter; routine: the chapter's usual purchases */
function teamShopping(route, key, builds, mounts = {}) {
  const ch = routeChapters(route), i = chapIdx(route, key), nextKey = ch[i + 1]?.key, want = [];
  const add = (iid, why, prio) => { const o = teamOffers(iid, route, key)[0]; if (o && !want.some(w => w.iid === iid && w.why === why)) want.push({ iid, why, prio, offer: o }); };
  // 1 · effective weapons for the battles ahead, for a team member who trains that weapon
  // (one per enemy type and weapon type: the one sold nearest with the least Prestigio, then the cheapest)
  for (const f of teamFoesAhead(route, key)) for (const [kind, n] of f.kinds) {
    const best = {};
    for (const iid of EFF_ITEMS[kind] || []) {
      const wt = armaKey(ITEMS[iid].weapon.type), o = teamOffers(iid, route, key)[0];
      if (!o || !builds.some(b => (b.weapons || []).some(w => armaKey(w.type) === wt))) continue;
      const cur = best[wt], rank = [o.renown, o.spot === DAGSION ? 0 : 1, o.price || ITEMS[iid].price || 0];
      if (!cur || rank.some((v, k) => v !== cur.rank[k] && v < cur.rank[k] && rank.slice(0, k).every((x, z) => x === cur.rank[z]))) best[wt] = { iid, rank };
    }
    for (const [wt, { iid }] of Object.entries(best)) {
      const users = builds.filter(b => (b.weapons || []).some(w => armaKey(w.type) === wt)).map(b => b.pid);
      add(iid, t(f.next ? '{n} {foe} en «{b}» (capítulo siguiente); para {who}' : '{n} {foe} en «{b}» (batalla de este capítulo); para {who}',
        { n, foe: t(FOE_ES[kind]), b: gt(f.es), who: list(users.slice(0, 3).map(p => nm(CHARS[p]))) }), f.next ? 2 : 1);
    }
  }
  // 2 · builds: licence and manuals for an exam due this chapter or the next, the main weapon, accessories with a rule
  for (const b of builds) (b.steps || []).forEach((s, k) => {
    if (s.key !== key && s.key !== nextKey) return;
    const j = CLASSES[s.jid], prev = CLASSES[k ? b.steps[k - 1].jid : b.start];
    if (j?.licence) add(j.licence, t('examen de {c} de {p} ({k})', { c: nm(j), p: nm(CHARS[b.pid]), k: capShort(CAPS[s.key]) }), 2);
    (j?.exam_requirements || []).forEach(r => { const m = MANUAL_OF[r.es]; if (m && !(prev?.skills_trainable_q?.[r.es] > 0)) add(m, t('{p} necesita {s} {r} para {c}', { p: nm(CHARS[b.pid]), s: t(r.es), r: r.rank, c: nm(j) }), 3); });
  });
  // the main weapon of each unit is in «Equipamiento» (Equipo), not repeated here
  for (const r of ACC_RULES) { const iid = Object.keys(ITEMS).find(k => ITEMS[k].es === r.name), users = builds.filter(b => (b.steps || []).some(s => CLASSES[s.jid]?.es === r.cls)).map(b => b.pid);
    if (iid && users.length) add(iid, `${t(r.why)}: ${list(users.map(p => nm(CHARS[p])))}`, 3); }
  // 3 · Vandahl barters whose payment comes from a search at a reachable place: needed items first
  const chains = [];
  for (const w of want.filter(x => x.offer.type === 'barter')) for (const p of w.offer.pay) { const sr = teamSearches(p.id, route, key)[0]; if (sr) chains.push({ get: w.iid, why: w.why, pay: p, search: sr, offer: w.offer }); }
  // 4 · routine: magic manuals and the advanced licence where they are sold this chapter
  const routine = ROUTINE_ITEMS.map(iid => ({ iid, offers: teamOffers(iid, route, key).filter(o => o.type === 'tienda') })).filter(x => x.offers.length);
  const lures = Object.entries(mounts).flatMap(([pid, o]) => Object.values(o).map(m => ({ pid, rid: m.rid }))).filter(m => !MOUNTS[m.rid]?.default_class_mount && !MOUNTS[m.rid]?.unique_q && teamCatchOpen(route, key))
    .map(m => ({ ...m, spot: teamMountSpots(m.rid, key)[0] })).filter(m => m.spot);
  // group by place, places with more things first; travelling merchants last
  const top = want.sort((a, b) => a.prio - b.prio), groups = [];
  for (const w of top) { const k = w.offer.spot || w.offer.where; let g = groups.find(x => x.k === k); if (!g) groups.push(g = { k, spot: w.offer.spot, where: w.offer.where, renown: w.offer.renown, items: [] }); if (!g.items.some(x => x.iid === w.iid)) g.items.push(w); }
  groups.sort((a, b) => Math.min(...a.items.map(x => x.prio)) - Math.min(...b.items.map(x => x.prio)) || a.renown - b.renown || b.items.length - a.items.length);
  return { buy: groups, chains, routine, lures, foes: teamFoesAhead(route, key) };
}

/* ---------------- refining at the Herrería («Herrería» in Esta semana) ---------------- */
/** weapons a quest asks to hand in (the Espada asesina…): never refined, never handed out as gear */
const QUEST_DELIVER = new Set(Object.values(QUEST).flatMap(q => (q.deliver || []).map(d => String(d).replace(/\s*×\s*\d+$/, ''))));
const ITEM_BY_ES = {};
Object.entries(ITEMS).forEach(([k, i]) => { if (i.es && !ITEM_BY_ES[i.es] && i.weapon?.type) ITEM_BY_ES[i.es] = k; });
const isSilver = iid => /de plata/.test(ITEMS[iid]?.es || '');
/** where a material comes from now: best search at a reachable place, else the first open source */
const teamMatSrc = (mat, route, key) => { const s = teamSearches(mat, route, key)[0];
  return s ? { spot: s.spot, pct: s.pct } : { text: itemSources(mat, route, key)[0] || '' }; };
/** a scarce material: no shop or merchant sells it here and its best search is 10 % or less */
const teamMatScarce = (mat, route, key) => !teamOffers(mat, route, key).some(o => o.type !== 'barter') && (teamSearches(mat, route, key)[0]?.pct || 0) <= 10;
/** refining chain of `iid` from +0 while every material can be had on this route and part (the page does not read the save) */
function teamForgeChain(iid, route, key) {
  const part = CAPS[key]?.part, w0 = ITEMS[iid]?.weapon, steps = [];
  let cur = iid;
  while (ITEMS[cur]?.weapon?.forge && steps.length < 9) {
    const f = ITEMS[cur].weapon.forge;
    if ((f.part3 && part !== 3) || !ITEMS[f.to] || !f.mats.every(m => !m.iid || payOk(m.iid, route, key, 1, true))) break;
    steps.push(f); cur = f.to;
  }
  const mats = {};
  steps.forEach(f => f.mats.forEach(m => { if (m.iid) mats[m.iid] = (mats[m.iid] || 0) + m.n; }));
  const fx = (ITEMS[cur]?.weapon?.equip_skills || []).filter(s => !(w0?.equip_skills || []).includes(s));
  return { iid, to: cur, n: steps.length, gold: steps.reduce((a, f) => a + f.gold, 0), mats, steps,
    pot: (ITEMS[cur]?.weapon?.might || 0) - (w0?.might || 0), effect: fx.map(s => factOnly(tx(SKILLS[s], 'desc').replace(/\s+/g, ' ')) || nm(SKILLS[s]) || '').filter(Boolean)[0] || '' };
}
/** what to refine on `route` at chapter `key`: the builds' main weapons, the effective weapons Compras proposes and the units' starting weapons
    (`gear`: the weapons the gear plan hands out). → {closed: key|null, rows: [{iid, to, n, gold, mats, pot, effect, users, src, repair?}], later: [...]}.
    Smithy: Part 1 from the chapter that unlocks it, Part 3 always, never in the prologue or Part 2. Order: Pot gained × users ÷ cost. */
function teamForge(route, key, builds, shop = { buy: [] }, gear = []) {
  const c = CAPS[key] || {}, idx = chapIdx(route, key), at = teamOpenIdx(route, 'Herrería');
  const open = c.part === 3 || (c.part === 1 && at >= 0 && at <= idx);
  if (!open) return { closed: c.part === 1 && at > idx ? routeChapters(route)[at].key : null, rows: [], later: [] };
  const users = {};
  const add = (iid, pid) => { if (iid && ITEMS[iid]?.weapon?.forge && !QUEST_DELIVER.has(ITEMS[iid].es) && !(c.part === 1 && isSilver(iid))) (users[iid] ??= new Set()).add(pid); };
  builds.forEach(b => (b.weapons || []).forEach(w => add(w.iid, b.pid)));
  (shop.buy || []).flatMap(g => g.items).forEach(x => builds.filter(b => (b.weapons || []).some(w => armaKey(w.type) === armaKey(ITEMS[x.iid]?.weapon?.type || ''))).forEach(b => add(x.iid, b.pid)));
  builds.forEach(b => (teamCombat(b.pid).start_items || []).forEach(n => add(ITEM_BY_ES[n], b.pid)));
  gear.forEach(g => g.now && add(g.now.iid, g.pid));
  const price = m => ITEMS[m]?.price || 100;
  const rows = Object.entries(users).map(([iid, u]) => {
    const ch = teamForgeChain(iid, route, key), first = ch.steps[0];
    const repair = first && (ITEMS[first.to].weapon.might - ITEMS[iid].weapon.might) <= 1 && first.mats.some(m => teamMatScarce(m.iid, route, key)) ? ITEMS[iid].weapon.repair : null;
    const cost = ch.gold + Object.entries(ch.mats).reduce((a, [m, n]) => a + n * price(m), 0);
    return { ...ch, users: [...u].sort(bySerial), repair, score: ch.n ? (ch.pot * u.size) / Math.max(1, cost) : 0,
      src: Object.fromEntries(Object.keys(repair ? Object.fromEntries(repair.mats.map(m => [m.iid, m.n])) : ch.mats).map(m => [m, teamMatSrc(m, route, key)])) };
  }).filter(r => r.n || r.repair).sort((a, b) => !!a.repair - !!b.repair || b.score - a.score || a.iid.localeCompare(b.iid));
  // the last two chapters of Part 1: what each weapon reaches in Part 3, with Marcialito
  const ch = routeChapters(route), lastP1 = ch.map(x => x.part).lastIndexOf(1);
  const later = c.part === 1 && idx >= lastP1 - 1 ? Object.keys(users).map(iid => ({ ...teamForgeChain(iid, route, 'comun-3-1'), users: [...users[iid]].sort(bySerial) }))
    .filter(r => r.to !== (rows.find(x => x.iid === r.iid)?.to || r.iid)).sort((a, b) => b.pot - a.pot) : [];
  return { closed: null, rows, later };
}
