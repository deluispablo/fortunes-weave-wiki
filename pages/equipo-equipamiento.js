/* Fortune's Weave · team planner, equipment per «tengo» unit («Builds y equipamiento» in Equipo). */
'use strict';

/* ---------------- equipment per unit («Equipamiento» in Equipo) ---------------- */
const RANK_OF = { espada: 'Sword', lanza: 'Lance', hacha: 'Axe', arco: 'Bow', punos: 'Brawl', 'magia-negra': 'BlackMagic', 'magia-blanca': 'WhiteMagic' };
/** shortcut: the data has no unit proficiency, so the weapon rank a unit can wield is capped by the chapter: rank 3 (iron) before Part 1
    chapter 6, rank 5 (Flyssa, Antijinetes…) for the rest of Part 1, rank 7 (silver) from Part 2. Upgrade when the save's proficiency is read. */
const teamRankCap = key => { const c = CAPS[key]; return !c ? 5 : c.part >= 2 ? 7 : c.part === 0 || c.n < 6 ? 3 : 5; };
/** the class `b` is in at chapter `key`: the last step of its build whose exam chapter is reached */
const teamClassAt = (b, route, key) => { const i = chapIdx(route, key); let j = b.start; (b.steps || []).forEach(s => { if (s.key && chapIdx(route, s.key) <= i) j = s.jid; }); return j; };
/** estimated Con (Fue ÷ 5) at the chapter's lowest recommended level: base + personal growth per level (shortcut: no class modifiers) */
const teamCon = (pid, key) => { const cb = teamCombat(pid), lv = CAPS[key]?.level?.[0] || 1;
  return Math.floor(((cb.base?.Str || 0) + (cb.growth?.Str || 0) * (lv - 1) / 100) / 5); };
const teamLv = key => CAPS[key]?.level?.[0] || 1;
const teamStatAt = (base, growth, flat, lv) => base + growth * (lv - 1) / 100 + flat;
/** estimated stat `st` of the unit at the chapter's lowest recommended level in class `cls` (personal base and growth, class growth and flat modifiers) */
const teamStat = (pid, cls, key, st) => teamStatAt(teamCombat(pid).base?.[st] || 0, teamGrowth(pid, cls)[st], CLASSES[cls]?.flat_modifiers?.[st] || 0, teamLv(key));
/** stat `st` of a typical enemy of the chapter: the mean over the highest class tier whose recommended level is reached (tier 1 before that) */
const teamFoe = (key, st) => {
  const lv = teamLv(key), all = Object.values(CLASSES).filter(c => c.tier >= 1 && c.recommended_level && c.class_base_stats);
  const top = Math.max(1, ...all.filter(c => c.recommended_level <= lv).map(c => c.tier)), pick = all.filter(c => c.tier === top);
  return pick.reduce((a, c) => a + teamStatAt(c.class_base_stats[st] || 0, c.class_base_growth?.[st] || 0, c.flat_modifiers?.[st] || 0, lv), 0) / (pick.length || 1);
};
/** the unit and the chapter's typical enemy for teamWeaponCmp */
const teamFight = (pid, cls, key, con) => ({ con, spd: teamStat(pid, cls, key, 'Spd'), str: teamStat(pid, cls, key, 'Str'), foeSpd: teamFoe(key, 'Spd'), foeDef: teamFoe(key, 'Def') });
/** weapon order for a unit (`f` from teamFight, `main` its build type). Attack speed lost = weight − Con, never negative (VA = Vel − lost).
    First the build type; then the damage per round on the typical enemy, doubled when VA ≥ its Vel + 4, minus one point per attack speed
    lost: a weapon that loses the double attack falls behind a lighter one unless it hits more than twice as hard; then hit, id. */
function teamWeaponCmp(f, main) {
  const w = iid => ITEMS[iid].weapon, loss = iid => Math.max(0, w(iid).weight - f.con);
  // estimates: only a sure double counts (the unit's Vel rounded down, the enemy's rounded up)
  const score = iid => (Math.floor(f.spd) - loss(iid) >= Math.ceil(f.foeSpd) + 4 ? 2 : 1) * Math.max(1, w(iid).might + f.str - f.foeDef) - loss(iid);
  return (a, z) => (armaKey(w(z).type) === main) - (armaKey(w(a).type) === main) || score(z) - score(a) || w(z).hit - w(a).hit || a.localeCompare(z);
}
/** every weapon that can be had at chapter `key`: {iid: [{kind, where, spot, price, once}]} — quest rewards up to the chapter,
    chests at reachable places, shops and merchants open now (shops never run out: shortcut, stock is not tracked) */
function teamGearPool(route, key) {
  const c = CAPS[key] || {}, idx = chapIdx(route, key), pool = {};
  const put = (iid, s) => { if (ITEMS[iid]?.weapon && !QUEST_DELIVER.has(ITEMS[iid].es)) (pool[iid] ??= []).push(s); };
  for (const [iid, it] of Object.entries(ITEMS)) {
    if (!it.weapon) continue;
    for (const o of it.obtain || []) {
      if (o.type !== 'recompensa' || !o.quest) continue;
      const first = QUEST_FIRST[o.quest]?.[route];
      if (first && chapIdx(route, first) <= idx && rewardOpen(o.when, route, first) && questAvail(o.quest, route)) put(iid, { kind: 'mision', where: QUEST[o.quest]?.es || '', quest: o.quest, once: true });
    }
    for (const o of teamOffers(iid, route, key)) if (o.type !== 'barter' || barterOk(o, route, key))
      put(iid, { kind: o.type, where: o.where, spot: o.spot || o.home, price: o.type === 'barter' ? 0 : o.price, pay: o.pay, once: false });
  }
  Object.entries((window.WIKI_EXT || {}).detalle?.chests || {}).forEach(([sp, rows]) => {
    if (!spotAccess(sp, route, key).ok) return;
    rows.forEach(r => put(r.length < 2 || c.part !== 3 ? r[0] : r[1], { kind: 'cofre', where: SPOTS[sp]?.es || '', spot: sp, once: true }));
  });
  return pool;
}
/** equipment for the «tengo» units `have` on `route` at `key` (builds: the team builds). Per unit, in priority order:
    now: the strongest weapon of the build's main weapon type when the class at `key` can use it; otherwise of a type the class can use
    and the build's classes also use (a healer never gets a sword because Augur happens to allow one), within the chapter's rank cap,
    ranked by teamWeaponCmp (attack speed lost and the double attack on a typical enemy count); one-off pieces (chest, quest reward) go to one unit.
    options: up to 3 other weapons sold now at a reachable place, with the price. acc: an accessory with a rule for the current class. */
function teamGear(route, key, have, builds) {
  const pool = teamGearPool(route, key), taken = new Set(), cap = teamRankCap(key), out = [];
  const effective = iid => Object.values(EFF_ITEMS).some(a => a.includes(iid));  // the specialised effective weapons Compras also uses
  for (const { pid } of teamPriority(route, have, key)) {
    const b = builds.find(x => x.pid === pid); if (!b) continue;
    const cls = teamClassAt(b, route, key), usable = (CLASSES[cls]?.weapons_usable || []).map(armaKey).filter(t => RANK_OF[t]);
    const main = armaKey(b.weapon || ''), con = teamCon(pid, key);
    const build = new Set([b.start, ...(b.steps || []).map(s => s.jid)].flatMap(j => (CLASSES[j]?.weapons_usable || []).map(armaKey)));
    const types = usable.includes(main) ? [main] : usable.filter(t => build.has(t));
    const ok = iid => { const w = ITEMS[iid]?.weapon; return w && types.includes(armaKey(w.type || '')) && (w.rank?.[RANK_OF[armaKey(w.type)]] || 1) <= cap && !(CAPS[key]?.part === 1 && isSilver(iid)); };
    const heavy = iid => Math.max(0, ITEMS[iid].weapon.weight - con) >= 2;  // −2 attack speed or worse: a lighter option is worth showing
    const rank = teamWeaponCmp(teamFight(pid, cls, key, con), main);
    const own = (teamCombat(pid).start_items || []).map(n => ITEM_BY_ES[n]).filter(i => i && ok(i)).map(iid => ({ iid, src: { kind: 'inicial', where: '', once: false } }));
    const tag = (iid, s) => `${iid}|${s.kind}|${s.where}`, free = iid => s => !s.once || !taken.has(tag(iid, s));
    const cands = [...own, ...Object.entries(pool).filter(([iid]) => ok(iid)).flatMap(([iid, ss]) => { const s = ss.find(free(iid)); return s ? [{ iid, src: s }] : []; })];
    cands.sort((x, y) => rank(x.iid, y.iid) || (x.src.price || 0) - (y.src.price || 0));
    const best = cands[0] || null;
    if (best?.src.once) taken.add(tag(best.iid, best.src));
    const nowW = best ? ITEMS[best.iid].weapon : null;
    // options: same weapon type, sold now at a reachable place, and worth it: stronger, effective, or about as strong and lighter
    const t0 = armaKey(ITEMS[best?.iid]?.weapon.type || b.weapon || ''), m0 = nowW?.might || 0;
    const worth = iid => ITEMS[iid].weapon.might > m0 || effective(iid) || (best && heavy(best.iid) && !heavy(iid) && ITEMS[iid].weapon.might >= m0 - 3);
    const opts = [];
    for (const x of cands.filter(x => x.iid !== best?.iid && armaKey(ITEMS[x.iid].weapon.type) === t0 && worth(x.iid))) {
      if (opts.length >= 3) break;
      if (opts.some(o => o.iid === x.iid)) continue;
      const o = (pool[x.iid] || []).filter(s => (s.kind === 'tienda' || s.kind === 'ambulante') && s.price > 0 && s.spot && spotAccess(s.spot, route, key).ok).sort((a, z) => a.price - z.price)[0];
      if (o) opts.push({ iid: x.iid, where: o.where, spot: o.spot, price: o.price, effective: effective(x.iid) });
    }
    const fight = teamFight(pid, cls, key, con), gap = nowW ? teamFoe(key, 'Spd') + 4 - (fight.spd - Math.max(0, nowW.weight - con)) : 0;
    const accOf = r => { const iid = Object.keys(ITEMS).find(k => ITEMS[k].es === r.name), o = iid && teamOffers(iid, route, key)[0]; return o ? { iid, o, r } : null; };
    const accHit = ACC_RULES.filter(r => r.test(cls, { pid, key, gap })).map(accOf).find(Boolean), rule = accHit?.r, accIid = accHit?.iid, accOffer = accHit?.o;
    // a stronger weapon of the same type that asks for more rank than the cap: an option for when the unit gets there
    const hi = Object.entries(pool).filter(([iid]) => { const w = ITEMS[iid]?.weapon, rk = w && (w.rank?.[RANK_OF[armaKey(w.type || '')]] || 1);
      return w && armaKey(w.type) === (nowW ? armaKey(nowW.type) : main) && rk > cap && rk <= 9 && (!nowW || armsScore(w) > armsScore(nowW) + 0.5) && !(CAPS[key]?.part === 1 && isSilver(iid)); })
      .sort(([a], [z]) => armsScore(ITEMS[z].weapon) - armsScore(ITEMS[a].weapon) || a.localeCompare(z))[0];  // better = higher weapon score (might, hit, crit, weight)
    const higher = hi ? (() => { const w = ITEMS[hi[0]].weapon, rk = w.rank[RANK_OF[armaKey(w.type)]], s = hi[1][0];
      return { iid: hi[0], rank: rk >= 9 ? 'A' : rk >= 7 ? 'B' : 'C', type: armaKey(w.type), where: s.where, spot: s.spot }; })() : null;
    // spells are each unit's own list (no tome is sold or found): a magic build gets no weapon to buy, never a fallback sword
    const spells = !best && /^magia-/.test(main) && usable.includes(main) ? main : null;
    out.push({ pid, cls, con, spells, higher, now: best && { iid: best.iid, ...best.src, heavy: heavy(best.iid), loss: Math.max(0, nowW.weight - con) }, options: opts,
      acc: accOffer ? { iid: accIid, where: accOffer.where, spot: accOffer.spot || accOffer.home, price: accOffer.price, why: rule.why } : null });
  }
  return out.sort((a, z) => bySerial(a.pid, z.pid));
}
