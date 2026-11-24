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
/** a mount that only one unit can have: personal mounts and rare catches */
const teamMountScarce = rid => !!MOUNTS[rid]?.unique_q || teamMountRare(rid);
/** wants: [{pid, kind, ranked: [rid]}] in priority order → {pid: {kind: {rid, first, want, lost_to}}}; common and default mounts repeat */
function teamAssignMounts(wants) {
  const taken = {}, out = {};
  // a personal mount goes to whoever gains most from it (score = Σ bond-5 growth × unit growth, ×2 in Cuadriguero), its owner on ties
  const uniq = [...new Set(wants.flatMap(w => w.ranked.filter(r => MOUNTS[r]?.unique_q)))];
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
/** builds of a unit for the ficha: [{label, path}] — the planner's recommended build, published alternatives and the game's default classes */
function teamBuildOptions(pid, route, key) {
  const cb = teamCombat(pid), out = [], seen = new Set();
  const add = (label, path, rec = false) => { const p = path.filter(j => CLASSES[j]); const k = p.join('>'); if (p.length && !seen.has(k)) { seen.add(k); out.push({ label, path: p, rec }); } };
  const rec = teamBuild(pid, route, key);
  if (rec?.target) add(t('Recomendada'), [rec.start, ...rec.steps.map(s => s.jid)], true);
  const rising = js => js.filter(j => CLASSES[j].tier > 0).reduce((a, j) => (!a.length || CLASSES[j].tier > CLASSES[a[a.length - 1]].tier ? [...a, j] : a), []);  // one class per tier, as written
  (cb.community_paths || []).forEach(x => add(factOnly(dataTx(x.role)) || t('Alternativa'), rising(teamClassesIn(factOnly(x.path)))));  // the path is read for Spanish class names: never translated
  const auto = Object.entries(cb.autolevel_classes || {}).sort((a, b) => +a[0] - +b[0])
    .map(([, v]) => teamJid(v) || Object.keys(CLASSES).find(k => CLASSES[k].jp === v)).filter(j => j && CLASSES[j].tier > 0);
  add(t('Clases por defecto del juego'), [...new Set(auto)]);
  return out;
}
