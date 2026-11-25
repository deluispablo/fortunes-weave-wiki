/* Fortune's Weave · wiki2 · Builds catalog: every unit with community builds for a route and part, each class step with the chapter
   it opens on that route (classFromIdx), sorted by the route's tier. Rendered by builds() in minmax.js. */
'use strict';
const BUILD_RANK = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];  // every grade the tiers use: an unknown one sorts last
/** «S/A+» → mean index of its parts; no tier → last */
const buildRank = t => { const xs = t ? String(t).split('/').map(x => BUILD_RANK.indexOf(x.trim())).filter(i => i >= 0) : []; return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 99; };
const buildPart = p => (p >= 2 ? 2 : 1);
/** the chapter the catalog reads: Mi partida's when it is on that route and part (Parts 2–3 count as one), else the first one */
function buildsKey(route, part) {
  const c = ctxGet(), ck = CAPS[c.key];
  if (ctxChosen() && ck && c.route === route && buildPart(ck.part) === buildPart(part)) return c.key;
  const ch = (route ? routeChapters(route) : Object.keys(CAPS).filter(k => CAPS[k].route === 'comun').map(k => ({ key: k, ...CAPS[k] }))).find(x => buildPart(x.part) === buildPart(part) && x.part >= 1);
  return ch ? ch.key : '';
}
/** [{pid, tier, order, team, builds: [{...build, jids, ok, issue, steps: [{jid, tier, req, idx, now}]}]}]; route '' → only Parts 2–3 (Part 1 is shown per route) */
function buildsCatalog(route, part) {
  const B = (window.WIKI_EXT || {}).builds || {}, end = buildPart(part) === 2;
  if (!route && !end) return [];
  const key = buildsKey(route, part), mine = ctxChosen() && key === ctxGet().key, here = route ? chapIdx(route, key) : -1;
  const tiers = (end ? B.tiers?.final : B.tiers?.[route]) || {}, team = route ? teamNow(route) : null;
  const pp = end ? [2, 3] : [1];
  const p2 = route && end ? routeChapters(route).findIndex(c => c.part >= 2) : -1;  // Parts 2–3: a class step never opens in a Part 1 chapter
  const out = [];
  const inPart1 = p => { const x = CHARS[p].routes?.[route], k = x && (x.join_key || x.recruit_key); return !!k && CAPS[k]?.part === 1; };
  const pids = [...new Set([...Object.keys(B.units || {}), ...(route && !end ? Object.keys(CHARS).filter(inPart1) : [])])].filter(p => CHARS[p]).sort();
  for (const pid of pids) {
    const x = route ? CHARS[pid].routes?.[route] || {} : {}, arrive = route ? Math.max(0, p2, chapIdx(route, x.join_key || x.recruit_key)) : -1;
    const rows = route ? teamOptions(pid, route, key)
      : (B.units[pid] || []).filter(o => !o.routes && (!o.parts || o.parts.some(n => pp.includes(n)))).map(o => ({ ...o, jids: o.path.map(es => teamJid(es) || null), ok: true, issue: '' }));
    if (!rows.length && !(route && !end && inPart1(pid))) continue;  // a Part 1 unit of the route stays, «no build proposed»
    const start = route ? teamStart(pid, route, key) : null;
    const builds = rows.map(o => {
      const i = start ? o.jids.indexOf(start) : -1, jids = (i > 0 ? o.jids.slice(i) : o.jids).filter(Boolean);
      const steps = jids.map(jid => { const k = CLASSES[jid]; const g = route && o.ok ? classFromIdx(jid, route) : -1;
        return { jid, tier: +k.tier || 0, req: k.exam_requirements_es || '', idx: g < 0 ? -1 : Math.max(g, arrive), now: false }; });
      if (mine) { const n = steps.map(s => s.idx >= 0 && s.idx <= here).lastIndexOf(true); if (n >= 0) steps[n].now = true; }
      return { ...o, steps };
    }).sort((a, b) => b.ok - a.ok);
    out.push({ pid, tier: tiers[pid] || null, order: route ? arrive : CHARS[pid].serial ?? 0, team: !!team?.has(pid), builds });
  }
  return out.sort((a, b) => buildRank(a.tier) - buildRank(b.tier) || a.order - b.order || a.pid.localeCompare(b.pid));
}
/** the 8 Divine classes (one unit each): item, candidates from the end-game builds and each one's other end-game build */
function buildsDivine() {
  const units = ((window.WIKI_EXT || {}).builds || {}).units || {};
  const endOf = pid => (units[pid] || []).filter(o => !o.routes && (!o.parts || o.parts.some(n => n >= 2))).map(o => ({ ...o, jids: o.path.map(es => teamJid(es) || null) }));
  return Object.keys(CLASSES).filter(j => +CLASSES[j].tier === 5).map(jid => ({
    jid, item: CLASSES[jid].licence,
    cands: Object.keys(units).filter(p => CHARS[p]).sort().flatMap(pid => { const e = endOf(pid), b = e.find(o => o.jids.at(-1) === jid);
      return b ? [{ pid, build: b, alt: e.find(o => o.jids.at(-1) !== jid) || null }] : []; }),
  }));
}
