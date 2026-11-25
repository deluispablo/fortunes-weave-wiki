/* Fortune's Weave · team planner, free time (Capítulo › «Tiempo libre»): what to do with the turns left once the chapter's
   important things are done. Ranked: 1 what the team needs and is hard to get, 2 a dungeon with something for the team,
   3 skill training for the build exams, 4 gold. Cai also: crops and lures that give something the team uses. */

const FREE_PER_SEARCH = 0.25 * 1 + 0.7 * 3 + 0.05 * 6;  // items per search turn on average (bad / good / perfect)
const FREE_MANUAL = { 'Equitación': 'IID_馬術書', 'Vuelo': 'IID_飛行術書', 'Coraza': 'IID_重装術書', 'Magia negra': 'IID_黒魔術書', 'Magia blanca': 'IID_白魔術書' };
const freeTravel = spot => Math.round(teamDist(spot) / 47);  // the map's straight-line turns from Dagsion
const FREE_MAX = 6;  // a free-time task is a short errand: a bigger need shows what 6 turns give
/** n wanted at pct % per search → {turns, n, some} (some: only part of the need in 6 turns) */
const freeSearchCost = (n, pct) => { const rate = FREE_PER_SEARCH * pct / 100, turns = Math.max(1, Math.ceil(n / rate));
  return turns <= FREE_MAX ? { turns, n, some: false } : { turns: FREE_MAX, n: Math.max(1, Math.floor(FREE_MAX * rate)), some: true }; };
/** best search without a quest condition, reachable now → {spot, pct} | null */
const freeSearch = (iid, route, key) => teamSearches(iid, route, key).find(s => s.pct > 0 && !s.cond.length) || null;
/** dungeons reachable now (Part 1: base level up to the chapter's top level + 3) → [{spot, d, lv}] nearest first */
function freeDungeons(route, key) {
  const c = CAPS[key] || {}, max = (c.level || [0, 99])[1];
  return Object.values(W.map?.dungeons || {}).filter(d => SPOTS[d.spot] && d.spot !== DAGSION && spotAccess(d.spot, route, key).ok)
    .map(d => ({ spot: d.spot, d, lv: d.base_level_part?.['1'] || 0 })).filter(x => x.lv > 0 && (c.part !== 1 || x.lv <= max + 3))
    .sort((a, b) => teamDist(a.spot) - teamDist(b.spot) || a.lv - b.lv);
}

/** → [{tier, kind, spot, turns, travel, gain: [{iid?, n?, text?, why?}], for?: [pid]}], at most 5, by tier then score */
function teamFreeTime(route, key, plan) {
  const c = CAPS[key] || {}, p3 = c.part === 3, out = [];
  if (!c.free_start) return [];  // a chapter with no free days has no free time
  const add = (x, score) => { const travel = freeTravel(x.spot);
    if ((x.kind === 'buscar' || x.kind === 'oro') && x.turns + travel > 12) return;  // a search errand with the trip stays under 12 turns
    out.push({ ...x, travel, score: score - travel * 5 }); };  // nearer first among equals
  // 1 · materials the forge plan needs and no shop sells now: the scarcest first, at the best plain search
  const need = {};
  (plan.forge?.rows || []).forEach(r => Object.entries(r.mats).forEach(([m, n]) => { need[m] = (need[m] || 0) + n; }));
  Object.entries(need).filter(([m]) => !teamOffers(m, route, key).some(o => o.type !== 'barter')).forEach(([m, n]) => {
    const s = freeSearch(m, route, key); if (!s) return;
    const k = freeSearchCost(n, s.pct);
    add({ tier: 1, kind: 'buscar', spot: s.spot, turns: k.turns, gain: [{ iid: m, n: k.n, some: k.some, why: 'forja' }] }, (teamMatScarce(m, route, key) ? 1000 : 0) + 100 - s.pct);
  });
  // 1 · barter chains whose payment comes from a plain search
  (plan.shop?.chains || []).filter(ch => ch.search && !(ch.search.cond || []).length && spotAccess(ch.search.spot, route, key).ok).forEach(ch =>
    { const k = freeSearchCost(ch.pay.n, ch.search.pct); add({ tier: 1, kind: 'buscar', spot: ch.search.spot, turns: k.turns, gain: [{ iid: ch.pay.id, n: k.n, some: k.some, trade: ch.get }] }, 500); });
  // 1 · favourite gifts of a «quiero» that a plain search gives
  Object.entries(plan.gifts || {}).forEach(([pid, g]) => (g.picks || []).forEach(pk => { const s = freeSearch(pk.iid, route, key);
    if (s) { const k = freeSearchCost(1, s.pct); if (!k.some) add({ tier: 1, kind: 'buscar', spot: s.spot, turns: k.turns, gain: [{ iid: pk.iid, n: 1, gift: pid }] }, 300); } }));
  // 2 · a dungeon whose chest of this part the team uses (a manual for an exam skill, a weapon of a build) or whose minerals the forge needs
  const builds = plan.builds || [], focus = builds.flatMap(b => teamFocus(b).map(f => ({ ...f, pid: b.pid })));
  const manuals = new Set(focus.map(f => FREE_MANUAL[f.skill]).filter(Boolean).concat('IID_戦術書'));
  const wtypes = new Set(builds.map(b => String(b.weapon || '').toLowerCase()).filter(Boolean));  // a build with no weapon adds nothing
  const useful = iid => { const w = String(ITEMS[iid]?.weapon?.type || '').toLowerCase(); return manuals.has(iid) || (!!w && wtypes.has(w)); };
  const dungeons = freeDungeons(route, key);
  dungeons.forEach(x => {
    const chest = [...new Set((WIKI_EXT?.detalle?.chests?.[x.spot] || []).map(r => r[p3 ? 1 : 0]).filter(i => ITEMS[i] && useful(i)))];
    const ore = ((x.d.loot_tables || [])[p3 ? 3 : 2] || []).filter(y => y.item && need[y.item.id] && !teamOffers(y.item.id, route, key).some(o => o.type !== 'barter')).map(y => y.item.id);
    const gain = [...chest.map(iid => ({ iid, chest: true })), ...[...new Set(ore)].map(iid => ({ iid, why: 'forja' }))];
    if (gain.length) add({ tier: 2, kind: 'mazmorra', spot: x.spot, turns: route === 'cai' && x.spot === DAGSION ? 0 : 2, gain }, chest.length * 10 + ore.length);
  });
  // 3 · skill EXP for the build exams in the nearest dungeon at the chapter level (15 turns per quick battle, then leave and come back)
  const skills = [...new Map(focus.map(f => [f.skill, f])).values()].slice(0, 3);
  const train = dungeons.filter(x => !(c.level && c.part === 1) || x.lv >= c.level[0] - 3)[0] || dungeons[0];
  if (skills.length && train) add({ tier: 3, kind: 'entrenar', spot: train.spot, turns: 2, gain: skills.map(f => ({ skill: f.skill, rank: f.rank })), for: [...new Set(focus.map(f => f.pid))] }, 0);
  // 4 · gold: the best barter, else the best loot to sell
  const tips = teamTips(route, key), b = tips.barters[0], l = tips.loot.find(x => !freeSearchCost(1, x.pct).some && !(ITEMS[x.iid]?.obtain || []).some(o => o.type === 'búsqueda' && o.spot === x.spot && (o.condition || []).length));
  if (b) { const m = b.mats.find(z => z.src.search && !z.src.search.cond.length), k = m && freeSearchCost(m.n, m.src.search.pct);
    if (k && !k.some) add({ tier: 4, kind: 'oro', spot: m.src.search.spot, turns: k.turns, gain: [{ iid: m.id, n: m.n, trade: b.iid, gold: b.value - b.cost }] }, b.value - b.cost); }
  if (l) { const k = freeSearchCost(1, l.pct); if (!k.some) add({ tier: 4, kind: 'oro', spot: l.spot, turns: k.turns, gain: [{ iid: l.iid, gold: l.sell }] }, l.sell * l.pct / 100); }
  // 4 · gold anywhere: near searches whose best drop sells, one item on average within the errand (fills early chapters too)
  Object.entries(SPOTS).filter(([sp, v]) => (v.search?.drops || []).length && freeTravel(sp) <= 4 && spotAccess(sp, route, key).ok).map(([sp, v]) => {
    const best = v.search.drops.filter(d => d.item && !d.first_time_only && (ITEMS[d.item.id]?.sell || 0) >= 50).map(d => ({ iid: d.item.id, s: (teamSearches(d.item.id, route, key).find(x => x.spot === sp && !x.cond.length) || {}).pct || 0 }))
      .filter(d => d.s > 0 && !freeSearchCost(1, d.s).some).sort((a, b) => ITEMS[b.iid].sell * b.s - ITEMS[a.iid].sell * a.s || (a.iid < b.iid ? -1 : 1))[0];
    return best && { sp, best, v: ITEMS[best.iid].sell * best.s / 100 };
  }).filter(Boolean).sort((a, b) => b.v - a.v || (a.sp < b.sp ? -1 : 1)).filter((x, i, a) => a.findIndex(y => y.best.iid === x.best.iid) === i).slice(0, 2)
    .forEach(x => add({ tier: 4, kind: 'oro', spot: x.sp, turns: freeSearchCost(1, x.best.s).turns, gain: [{ iid: x.best.iid, gold: ITEMS[x.best.iid].sell }] }, x.v));
  // Cai · lures the mounts plan wants, crops whose rare plant the team needs
  if (route === 'cai') {
    const lureNow = c.part === 1 ? chapIdx(route, key) >= teamCaptureIdx(route) : c.part === 3 && c.n >= 2;  // the plan looks ahead; free time is now
    (lureNow ? plan.shop?.lures || [] : []).filter(x => x.spot?.spot && spotAccess(x.spot.spot, route, key).ok).slice(0, 1).forEach(x => add({ tier: 3, kind: 'cebo', spot: x.spot.spot, turns: W.map?.lure_rules?.['完了ターン'] || 5, gain: [{ mount: x.rid, pid: x.pid }] }, 1));
    Object.entries(SPOTS).filter(([s, v]) => v.farm?.rare_plant && need[v.farm.rare_plant.id] && spotAccess(s, route, key).ok).slice(0, 1)
      .forEach(([s, v]) => add({ tier: 2, kind: 'cultivo', spot: s, turns: W.map?.farm_rules?.harvest_turns || 6, gain: [{ iid: v.farm.rare_plant.id, why: 'forja' }] }, 1));
  }
  // one task per place (gains merged), best first, ties by place id
  const by = new Map();
  out.sort((a, b) => a.tier - b.tier || b.score - a.score || (a.spot < b.spot ? -1 : a.spot > b.spot ? 1 : 0)).forEach(x => {
    const y = by.get(x.spot); if (!y) by.set(x.spot, x); else { y.gain.push(...x.gain.filter(g => !y.gain.some(h => h.iid && h.iid === g.iid))); y.turns = Math.max(y.turns, x.turns); }
  });
  // a mix: up to 2 of tiers 1 and 2, 1 of tiers 3 and 4, then fill to 5 in rank order
  const CAP = { 1: 2, 2: 2, 3: 1, 4: 1 }, all = [...by.values()], pick = [], n = {};
  all.forEach(x => { if (pick.length < 5 && (n[x.tier] || 0) < CAP[x.tier]) { pick.push(x); n[x.tier] = (n[x.tier] || 0) + 1; } });
  all.forEach(x => { if (pick.length < 5 && !pick.includes(x)) pick.push(x); });
  return pick.sort((a, b) => a.tier - b.tier || b.score - a.score).map(({ score, ...x }) => x);
}
