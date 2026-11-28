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
/** one unit's builds for `route` and `part` (route '' → the end-game builds): {pid, tier, order, team, builds: [{...build, jids, ok, issue,
    steps: [{jid, tier, req, idx, now}]}]} — the same object for the Builds catalog and the character ficha. `ctx` caches what the catalog computes once */
function buildsUnit(pid, route, part, ctx = {}) {
  const B = (window.WIKI_EXT || {}).builds || {}, end = buildPart(part) === 2;
  const key = ctx.key ?? buildsKey(route, part), mine = ctx.mine ?? (ctxChosen() && key === ctxGet().key), here = ctx.here ?? (route ? chapIdx(route, key) : -1);
  const tiers = ctx.tiers ?? ((end ? B.tiers?.final : B.tiers?.[route]) || {}), team = ctx.team !== undefined ? ctx.team : route ? teamNow(route) : null;
  const pp = ctx.pp ?? (end ? [2, 3] : [1]), p2 = ctx.p2 ?? (route && end ? routeChapters(route).findIndex(c => c.part >= 2) : -1);
  const x = route ? CHARS[pid].routes?.[route] || {} : {}, arrive = route ? Math.max(0, p2, chapIdx(route, x.join_key || x.recruit_key)) : -1;
  const rows = route ? teamOptions(pid, route, key)
    : (B.units[pid] || []).filter(o => !o.routes && (!o.parts || o.parts.some(n => pp.includes(n)))).map(o => ({ ...o, jids: o.path.map(es => teamJid(es) || null), ok: true, issue: '' }));
  const start = route ? teamStart(pid, route, key) : null;
  const builds = rows.map(o => {
    const i = start ? o.jids.indexOf(start) : -1, jids = (i > 0 ? o.jids.slice(i) : o.jids).filter(Boolean);
    const steps = jids.map(jid => { const k = CLASSES[jid]; const g = route && o.ok ? classFromIdx(jid, route) : -1;
      return { jid, tier: +k.tier || 0, req: k.exam_requirements_es || '', idx: g < 0 ? -1 : Math.max(g, arrive), now: false }; });
    if (mine) { const n = steps.map(s => s.idx >= 0 && s.idx <= here).lastIndexOf(true); if (n >= 0) steps[n].now = true; }
    return { ...o, steps };
  }).sort((a, b) => b.ok - a.ok);
  return { pid, tier: tiers[pid] || null, order: route ? arrive : CHARS[pid].serial ?? 0, team: !!team?.has(pid), builds, key };
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
    const u = buildsUnit(pid, route, part, { key, mine, here, tiers, team, p2, pp });
    if (u.builds.length || (route && !end && inPart1(pid))) out.push(u);  // a Part 1 unit of the route stays, «no build proposed»
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

/* ---------------- a build's mounts: one block for the catalog, the character ficha and the tier list ---------------- */
const mountStatLine = o => STAT_KEYS.filter(k => o?.[k]).map(k => `${statName(k)} +${o[k]}`).join(', ');
/** an earlier mounted step for build `b` (same tier, usable with its weapon, later steps still reachable) that grows more in the target's
    top 4 stats once the best mount there is counted: {i, from, to, rid, gain} or null. Only where mounts can be had (teamCatchOpen) */
function buildEarlyMount(pid, b, route, key) {
  if (!route || !b.ok || !teamCatchOpen(route, key)) return null;
  const ch = teamChain(pid, b.jids, route, b.weapon, key); if (!ch) return null;
  const start = teamStart(pid, route, key), seq = [start, ...ch.chain], top = teamTop(teamGrowth(pid, b.target), 4);
  const val = (j, rid, mul) => top.reduce((a, s) => a + teamGrowth(pid, j)[s] + (rid ? (MOUNTS[rid].growth_by_bond?.['5']?.[s] || 0) * mul : 0), 0);
  const firstM = seq.findIndex(j => CLASSES[j].mount_kind);
  let best = null;
  seq.forEach((j, i) => {
    if (CLASSES[j].mount_kind || (firstM >= 0 && i > firstM)) return;
    const before = [b.weapon, ...supportOf(start), ...seq.slice(0, i).flatMap(supportOf)];
    for (const alt of Object.keys(CLASSES).filter(a => a !== j && CLASSES[a].tier === CLASSES[j].tier && CLASSES[a].mount_kind)) {
      if (!teamUsable(pid, alt, route, b.weapon, new Set([...before, ...SUPPORT_SKILLS]), partBlk(key))) continue;
      const after = new Set([...before, ...supportOf(alt), ...seq.slice(i + 1).flatMap(supportOf)]);
      if (!seq.slice(i + 1).every(n => teamExamOk(n, after))) continue;
      const rid = teamMountWants(pid, CLASSES[alt].mount_kind, teamGrowth(pid, b.target), route, key).find(r => !MOUNTS[r].default_class_mount);
      if (!rid) continue;
      const gain = val(alt, rid, alt === CUADRI ? 2 : 1) - val(j, null, 1);
      if (gain > 0 && (!best || gain > best.gain)) best = { i, from: j, to: alt, rid, gain };
    }
  });
  return best;
}
/** the mounts of build `b` (its class path b.jids from the unit's start class): per mount type the mount in use, a select to change it
    (stored as the ctx pick m<Kind>, so Equipo and every page use the same one), where to lure it, from when, and how to feed it */
function buildMountHtml(pid, b, route, key) {
  const jids = (b.jids || []).filter(Boolean), start = route ? teamStart(pid, route, key) : null, i = start ? jids.indexOf(start) : -1;
  const path = start && i < 0 && !jids.length ? [] : start && i < 0 ? [start, ...jids.filter(j => CLASSES[j].tier > CLASSES[start].tier)] : i > 0 ? jids.slice(i) : jids;
  const plan = teamMountPlan(pid, path, route, key, undefined, teamBuildMounts(b)), part = CAPS[key]?.part || 1, pt = partBlk(key);
  const early = buildEarlyMount(pid, b, route, key);
  if (!plan.length && !early) return '';
  const open = route && teamCatchOpen(route, key);
  const rows = plan.map(st => {
    const who = st.classes.map(j => L('clase', j)).join(', ');
    if (!st.rid) return `<li><b>${esc(t(st.kind))}</b> (${who}): <span class="mut">${t(open ? 'ninguna montura de este tipo se captura aquí' : part === 1 ? 'en esta ruta no se capturan monturas en la Parte 1: la clase va con su montura de clase, sin bonos' : 'en la Parte 2 no hay monturas; en la Parte 3 se capturan con Cai en el ejército')}</span></li>`;
    const m = MOUNTS[st.rid], tag = st.owner ? t('propia de {p}', { p: L('personaje', st.owner) }) : (st.opts.find(o => o.rid === st.rid)?.rare ? t('rara') : t('común'));
    const sel = route && st.opts.length > 1 ? `<label class="fsel bd-msel"><span class="fsel-k">${t('Elegir')}</span><span class="fsel-v">${esc(nm(m))}</span><select data-mp="${esc([route, pt, pid, st.kind].join('|'))}" aria-label="${esc(t('Montura {k} de {p}', { k: t(st.kind), p: nm(CHARS[pid]) }))}">` +
      `<option value=""${st.picked ? '' : ' selected'}>${esc(t('La de la build: {m}', { m: nm(MOUNTS[st.def]) }))}</option>` +
      st.opts.map(o => `<option value="${esc(o.rid)}"${st.picked && o.rid === st.rid ? ' selected' : ''}>${esc(nm(MOUNTS[o.rid]))} · ${esc(mountStatLine(o.g5))}</option>`).join('') + '</select></label>' : '';
    const spot = st.opts.find(o => o.rid === st.rid)?.spot, f = st.feed;
    const capIdx = route === 'cai' && part === 1 ? Math.max(teamCaptureIdx('cai'), chapIdx('cai', CHARS[pid].routes?.cai?.join_key || CHARS[pid].routes?.cai?.recruit_key || '')) : -1;
    const when = st.owner ? '' : part === 1 && capIdx >= 0 ? t('se captura desde el {c}', { c: chapLink(routeChapters('cai')[capIdx].key) }) : part >= 2 ? t('en la Parte 3 se captura desde la sección 2 con Cai en el ejército') : '';
    const feed = f ? t('comida: {ty} de sabor {ta} ★★★ ({fs}), {n} puntos; vínculo 5 en {d} días ({d2} con su plato favorito)', { ty: esc(t(f.type)), ta: esc(t(f.taste)), fs: f.foods.map(x => L('objeto', x.iid, x.es)).join(', ') || '—', n: f.meal, d: f.days, d2: f.days_fav }) : '';
    const bits = [mountStatLine(st.g5) && t(st.double ? '{g} con vínculo 5 (doble en Cuadriguero)' : '{g} con vínculo 5', { g: mountStatLine(st.g5) }),
      spot && `${L('lugar', spot.spot, spot.es)} ${pct(spot.pct)}`, when, st.early && st.at >= 0 && t('aliméntala antes del examen de {c}', { c: L('clase', path[st.at + 1] || st.classes[0]) }), feed].filter(Boolean);
    return `<li><b>${esc(t(st.kind))}</b> (${who}): ${L('montura', st.rid)} <span class="mm-tag">${esc(tag)}</span>${sel}<br><small class="mut">${bits.join(' · ')}</small></li>`;
  });
  const earlyHtml = early ? `<li>${t('Montura temprana: {to} en vez de {from}, con {m}: +{g} en sus atributos clave.', { to: L('clase', early.to), from: L('clase', early.from), m: L('montura', early.rid), g: early.gain })}</li>` : '';
  return `<div class="bd-m"><h5>${t('Monturas')}</h5><ul class="mm-ol">${rows.join('')}${earlyHtml}</ul></div>`;
}
if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('change', e => {
  const el = e.target.closest?.('main [data-mp]'); if (!el) return;
  const [route, pt, pid, kind] = el.dataset.mp.split('|');
  teamPickSet(route, pid, 'm' + kind, el.value, pt);
  const y = window.scrollY; render(true); window.scrollTo(0, y);
  document.querySelector(`[data-mp="${window.CSS.escape(el.dataset.mp)}"]`)?.focus({ preventScroll: true });
});

/** one build as a card: name, community mark, «en disputa», availability, why/fits, the class steps with the chapter each opens on
    `rt` (or «ahora»), and its mounts. The Builds catalog and the character ficha draw the same card */
function buildCardHtml(rt, b, pid, key) {
  const P = h => `<p>${h}</p>`, com = `<span class="gu-com" title="${esc(t('Dato de la comunidad'))}"></span>`;
  const step = s => `<li>${L('clase', s.jid)} <span class="mut">· ${esc(tx(CLASSES[s.jid], 'tier'))}${s.req ? ' · ' + esc(dataTx(s.req)) : ''}</span>` +
    (s.now ? ` <b class="bd-now">${t('ahora')}</b>` : s.idx >= 0 && rt ? ` <span class="mut">· ${t('desde el {c}', { c: chapLink(routeChapters(rt)[s.idx].key) })}</span>` : '') + '</li>';
  return `<div class="bd-b"><h4>${esc(tx(b, 'name'))} ${com}${b.debate ? `<span class="mm-tag bd-deb">${t('En disputa')}</span>` : ''}</h4>` +
    (b.ok ? '' : P(`<b>${t('No disponible en esta ruta')}</b>: ${esc(b.issue)}`)) +
    (tx(b, 'why') ? P(esc(tx(b, 'why'))) : '') + (tx(b, 'fits') ? P(t('Elígela si: {f}', { f: esc(tx(b, 'fits')) })) : '') +
    (b.debate ? P(`<span class="mut">${esc(LANG === 'en' ? b.debate.en : b.debate.es)}</span>`) : '') +
    `<ol class="mm-ol bd-steps">${b.steps.map(step).join('')}</ol>` + (b.ok ? buildMountHtml(pid, b, rt, key) : '') + '</div>';
}
