/* Fortune's Weave · team planner, mounts: lure spots, one mount per mount type of a build (rare and personal ones once per team)
   and the mounts of any class path (character ficha). */
'use strict';

/* ---------------- mounts: one per mount type of the build, rare ones once per team ---------------- */
const DUP_MOUNTS = new Set(Object.values(MOUNTS).map(m => m.duplicate_becomes).filter(Boolean));
const ownerOf = m => { const s = String(m.unique_q || '').match(/montura personal de (.+)$/); return s ? Object.values(CHARS).find(c => c.es === s[1])?.id : null; };
const LURES = (W.classes || {}).lures || [];
/** where a mount is lured: [{spot, es, pct, rare, region, lv}], best chance first */
// capture is Cai's: in Part 1 only lure spots reachable there (the bau zones other than Cabo del Bau are Part 3 only); in Part 3 (key) every spot
const teamMountSpots = (rid, key) => LURES.filter(l => CAPS[key]?.part === 3 || spotAccess(l.spot_jp, 'cai', 'cai-1-1').ok).flatMap(l => [...(l.normal || []).map(x => [x, false]), ...(l.rare ? [[l.rare, true]] : [])].filter(([x]) => x.rid === rid)
  .map(([x, rare]) => { const rg = (W.map?.regions || {})[SPOTS[l.spot_jp]?.region];
    return { spot: l.spot_jp, es: l.spot_es, pct: x.pct, rare, region: rg?.es || '', lv: rg?.enemy_level || null }; }))
  .sort((a, b) => b.pct - a.pct || a.es.localeCompare(b.es, 'es'));
/** rare: only ever in the rare slot of a lure spot */
const teamMountRare = rid => { const s = teamMountSpots(rid); return s.length > 0 && s.every(x => x.rare); };
/** chapter index from which Cai can lure on `route` (the chapter that unlocks the Cebo); -1 on the other routes */
const teamCaptureIdx = route => (route === 'cai' ? teamFirst(route, 0, c => c.part === 1 && (c.unlocks || []).includes('Cebo')) : -1);
/** a catchable mount can be had from chapter `key`: Cai route in Part 1 (from the Cebo chapter), and any route in Part 3 from chapter 2
    with Cai in the army (the game opens the Cebo and the Stable again there) */
const teamCatchOpen = (route, key) => (teamCaptureIdx(route) >= 0 && (CAPS[key]?.part ?? 1) <= 1) || (CAPS[key]?.part === 3 && CAPS[key].n >= 2);
/** stable release draw: the item a bond-5 release always gives (with its effect) */
const teamRelease = rid => {
  const m = MOUNTS[rid]; if (!m) return null;
  const hit = Object.entries(ITEMS).find(([, i]) => (i.obtain || []).some(o => o.type === 'sorteo' && o.what === `establo: montura ${m.es} vínculo 5`));
  return hit ? { iid: hit[0], effect: hit[1].effect_es || '' } : null;
};
/** mounts of `kind` for `pid` that exist on `route` from `key`: own personal mount, then catchable mounts by Σ bond-5 growth × unit growth
    (rare first on ties), then the class default */
const teamMountSc = (m, growth) => STAT_KEYS.reduce((a, s) => a + (m?.growth_by_bond?.['5']?.[s] || 0) * (growth?.[s] || 0), 0);
function teamMountWants(pid, kind, growth, route, key, team = null) {
  if (!kind) return [];
  const sc = m => teamMountSc(m, growth);
  const ent = Object.entries(MOUNTS).filter(([, m]) => m.kind === kind);
  // personal mounts (Rocinán, Bucephalus) can be handed to another unit once their owner is in the team; the owner wins ties
  const own = ent.filter(([rid, m]) => m.unique_q && !DUP_MOUNTS.has(rid) && ownerOf(m) && (ownerOf(m) === pid || team?.has(ownerOf(m))))
    .sort((a, b) => sc(b[1]) - sc(a[1]) || (ownerOf(b[1]) === pid) - (ownerOf(a[1]) === pid)).map(([rid]) => rid);
  const wild = !route || teamCatchOpen(route, key) ? ent.filter(([rid, m]) => !m.default_class_mount && !m.unique_q && !DUP_MOUNTS.has(rid) && teamMountSpots(rid, key).length)
    .sort((a, b) => sc(b[1]) - sc(a[1]) || teamMountRare(b[0]) - teamMountRare(a[0]) || a[0].localeCompare(b[0])).map(([rid]) => rid) : [];
  const def = ent.filter(([, m]) => m.default_class_mount).map(([rid]) => rid);
  const mine = own.filter(rid => ownerOf(MOUNTS[rid]) === pid), others = own.filter(rid => !mine.includes(rid));
  const byScore = [...others, ...wild].sort((a, b) => sc(MOUNTS[b]) - sc(MOUNTS[a]));
  return [...new Set([...mine.filter(rid => !byScore.length || sc(MOUNTS[rid]) >= sc(MOUNTS[byScore[0]])), ...byScore, ...mine, ...def])];
}
/** the Cuadriguero doubles the mount bonus (growth and flat): ×2 for a mount stage that includes it */
const teamMountMul = classes => ((classes || []).includes(CUADRI) ? 2 : 1);
/** a mount that only one unit can have: personal mounts. Rare catches repeat (the spot's rare roll runs again on every lure; no caught flag or stable cap) */
const teamMountScarce = rid => !!MOUNTS[rid]?.unique_q;
/** wants: [{pid, kind, ranked: [rid]}] in priority order → {pid: {kind: {rid, first, want, lost_to}}}; common and default mounts repeat */
function teamAssignMounts(wants) {
  const taken = {}, out = {};
  wants.filter(w => w.pick && teamMountScarce(w.pick)).forEach(w => { taken[w.pick] ??= w.pid; });  // a hand-picked rare or personal mount is that unit's
  // a personal mount goes to whoever gains most from it (score = Σ bond-5 growth × unit growth, ×2 in Cuadriguero), its owner on ties
  const uniq = [...new Set(wants.flatMap(w => w.ranked.filter(r => MOUNTS[r]?.unique_q && !taken[r])))];
  for (const rid of uniq) {
    const cand = wants.map((w, i) => ({ w, i, sc: w.score?.[rid] ?? (w.ranked[0] === rid ? 1 : 0) })).filter(x => x.w.ranked.includes(rid))
      .sort((a, b) => b.sc - a.sc || (ownerOf(MOUNTS[rid]) === b.w.pid) - (ownerOf(MOUNTS[rid]) === a.w.pid) || a.i - b.i);
    if (cand.length) taken[rid] = cand[0].w.pid;
  }
  for (const w of wants) {
    const forced = w.ranked.find(r => MOUNTS[r]?.unique_q && taken[r] === w.pid);
    if (forced) { const first = w.ranked[0]; (out[w.pid] ??= {})[w.kind || ''] = { rid: forced, first: first === forced, want: first, lost_to: first !== forced && taken[first] && taken[first] !== w.pid ? taken[first] : null }; continue; }
    if (!w.ranked.length) continue;
    const rid = w.ranked.find(x => !teamMountScarce(x) || !taken[x] || taken[x] === w.pid);
    const first = w.ranked[0], lost = first !== rid && taken[first] && taken[first] !== w.pid ? taken[first] : null;
    if (!rid) { (out[w.pid] ??= {})[w.kind || ''] = { rid: null, first: false, want: first, lost_to: lost }; continue; }
    if (teamMountScarce(rid)) taken[rid] ??= w.pid;
    (out[w.pid] ??= {})[w.kind || ''] = { rid, first: first === rid, want: first, lost_to: lost };
  }
  return out;
}
/** mount stages of a build: [{kind, classes: [jid], at: step index of the first class (-1 = start class), early: true when the previous stage rides another type}] */
function teamMountStages(b) {
  const seq = [[b.start, -1], ...b.steps.map((s, i) => [s.jid, i])], out = [];
  let prev;
  seq.forEach(([j, i], n) => {
    const k = CLASSES[j]?.mount_kind || null;
    if (k) { const st = out.find(x => x.kind === k); if (st) st.classes.push(j); else out.push({ kind: k, classes: [j], at: i, early: n > 0 && prev !== k }); }
    prev = k;
  });
  return out;
}


/* ---------------- mounts of any class path (character ficha: recommended build and alternatives) ---------------- */
const CLASS_BY_NAME = Object.keys(CLASSES).sort((a, b) => CLASSES[b].es.length - CLASSES[a].es.length);
/** class ids named in a free text, in reading order («Jinete de ornius → Jin. ornius acorazado → …») */
const teamClassesIn = text => {
  const t = String(text || ''), hits = [];
  let rest = t;
  for (const j of CLASS_BY_NAME) { const i = rest.indexOf(CLASSES[j].es); if (i >= 0) { hits.push([i, j]); rest = rest.slice(0, i) + ' '.repeat(CLASSES[j].es.length) + rest.slice(i + CLASSES[j].es.length); } }
  return hits.sort((a, b) => a[0] - b[0]).map(x => x[1]);
};
/** class path → [{kind, classes, rid, g5, total}]: per mount type, the best mount for this unit on `route` from `key` (no team clashes) */
function teamMountsFor(pid, path, route, key) {
  const seq = path.filter(j => CLASSES[j]), target = seq[seq.length - 1];
  const b = { start: seq[0], steps: seq.slice(1).map(jid => ({ jid })) };
  const growth = target ? teamGrowth(pid, target) : {};
  return teamMountStages(b).map(st => {
    const rid = teamMountWants(pid, st.kind, growth, route, key)[0] || null, mul = teamMountMul(st.classes);
    const g5 = Object.fromEntries(Object.entries(MOUNTS[rid]?.growth_by_bond?.['5'] || {}).map(([k, v]) => [k, v * mul]));
    return { kind: st.kind, classes: st.classes, rid, g5, double: mul > 1, total: Object.values(g5).reduce((a, v) => a + v, 0) };
  });
}

/* ---------------- one mount plan per build: the same on the builds catalog, the character ficha, the tier list and Equipo ---------------- */
/** how to feed mount `rid`: its liked type and flavour, the ★★★ ingredients of both, points per ★★★ meal (with and without the animal's own
    favourite dish) and meals to bond 5 at one meal a day (mount_rules.feed_exp; bond 5 at bond_thresholds[4]) */
function teamMountFeed(rid) {
  const m = MOUNTS[rid], R = (W.classes || {}).mount_rules || {}, F = R.feed_exp || {}, need = (R.bond_thresholds || [])[4] ?? 140;
  if (!m?.food?.type || m.default_class_mount) return null;
  const meal = (F.base ?? 1) + (F.grade?.['3'] ?? 5) + (F.fav_type ?? 6) + (F.fav_taste ?? 3), fav = meal + (F.great_fav ?? 5);
  return { type: m.food.type, taste: m.food.taste, foods: (m.matching_foods || []).filter(f => f.grade === 3).slice(0, 4), meal, fav,
    days: Math.ceil(need / meal), days_fav: Math.ceil(need / fav) };
}
/** mount stages of class path `jids` for `pid` on `route` from chapter `key`: per mount type, the mounts the unit can have there (best
    first: Σ bond-5 growth × the target class's growth, ×2 in Cuadriguero; class mounts left out) with the player's pick (ctx m<Kind>) in use,
    what it adds at bond 5 and how to feed it. [] when the path never rides */
/** mounts a build's own text names, first mention per mount type ({kind: rid}); longer names win where one contains another (Magonius negro) */
const MOUNT_BY_NAME = Object.keys(MOUNTS).filter(r => !MOUNTS[r].default_class_mount && MOUNTS[r].es).sort((a, b) => MOUNTS[b].es.length - MOUNTS[a].es.length);
function teamBuildMounts(o) {
  let rest = `${o?.name || ''} ${o?.why || ''}`; const hits = [];
  for (const r of MOUNT_BY_NAME) { const n = MOUNTS[r].es; let i; while ((i = rest.indexOf(n)) >= 0) { hits.push([i, r]); rest = rest.slice(0, i) + ' '.repeat(n.length) + rest.slice(i + n.length); } }
  const out = {};
  hits.sort((a, b) => a[0] - b[0]).forEach(([, r]) => { out[MOUNTS[r].kind] ??= r; });
  return out;
}
function teamMountPlan(pid, jids, route, key, pick = route ? ctxPicks(route, undefined, partBlk(key))[pid] || {} : {}, prefer = {}) {
  const seq = (jids || []).filter(j => CLASSES[j]);
  if (!seq.length) return [];
  const growth = teamGrowth(pid, seq.at(-1)), team = route ? teamNow(route) : null;
  return teamMountStages({ start: seq[0], steps: seq.slice(1).map(jid => ({ jid })) }).map(st => {
    const mul = teamMountMul(st.classes);
    const opts = teamMountWants(pid, st.kind, growth, route, key, team).filter(rid => !MOUNTS[rid].default_class_mount).map(rid => {
      const g5 = Object.fromEntries(Object.entries(MOUNTS[rid].growth_by_bond?.['5'] || {}).map(([k, v]) => [k, v * mul]));
      return { rid, g5, total: Object.values(g5).reduce((a, v) => a + v, 0), rare: teamMountRare(rid), owner: ownerOf(MOUNTS[rid]), spot: teamMountSpots(rid, key)[0] || null };
    });
    const want = pick['m' + st.kind], def = opts.find(o => o.rid === prefer[st.kind]) || opts[0] || null, cur = opts.find(o => o.rid === want) || def;
    return { kind: st.kind, classes: st.classes, at: st.at, early: st.early, double: mul > 1, opts, def: def?.rid || null, rid: cur?.rid || null, picked: !!cur && cur.rid === want,
      g5: cur?.g5 || {}, total: cur?.total || 0, feed: cur ? teamMountFeed(cur.rid) : null };
  });
}
