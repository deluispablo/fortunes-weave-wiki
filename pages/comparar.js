/* Fortune's Weave · Comparar personajes (#/comparar?a=<pid>&b=<pid>&c=<pid>): two characters side by side (a third optional):
   base stats, growths (the higher one of each row marked), personal skills, classes (core.js classBan), routes, best support partners
   (ext/apoyos pairs) and build tier (ext/builds tiers). With a Part 1 game picked, recruitment and partners keep to its route
   (?todas=1 shows every route). */
'use strict';
(() => {
  const EXT = () => window.WIKI_EXT || {};
  const RANKS = ['C', 'B', 'A', 'S'];
  const pick = v => (typeof v === 'string' && Object.hasOwn(CHARS, v) ? v : '');
  const opts = () => Object.keys(CHARS).sort(bySerial).map(p => [p, nm(CHARS[p])]);
  const face = pid => img(ico().face?.[pid], 'cmp-face');

  /** the route whose Part 1 the page keeps to: the picked game's, '' in Parts 2–3, with no game or with ?todas=1 */
  const p1Route = qs => (qs.todas !== '1' && ctxChosen() && CAPS[ctxGet().key]?.part === 1 ? ctxRoute() : '');
  /** partners with the highest support rank first, then the biggest bonus; top 3 (on the Part 1 route `r`, only who is there) */
  function partners(pid, r) {
    const sum = x => Object.values(x.bonus || {}).reduce((s, v) => s + v, 0), mate = x => (x.a === pid ? x.b : x.a);
    return list((EXT().apoyos?.pairs || []).filter(x => (x.a === pid || x.b === pid) && CHARS[mate(x)] && (!r || joinsP1(mate(x), r)))
      .sort((x, y) => RANKS.indexOf(y.max) - RANKS.indexOf(x.max) || sum(y) - sum(x)).slice(0, 3)
      .map(x => `${L('personaje', x.a === pid ? x.b : x.a)} <small>(${esc(x.max || '')})</small>`));
  }
  function routes(c, only) {
    const j = (EXT().rutas?.join23 || []).find(x => x.pid === c.id);
    const rows = ROUTE_IDS.filter(r => c.routes?.[r] && (!only || r === only)).map(r => { const x = c.routes[r], k = x.join_key || x.recruit_key;
      return CAPS[k] ? `${esc(ROUTE_NAME[r])}: ${t(x.join_key ? 'Se une en {c}' : 'Reclutable desde {c}', { c: chapLink(k) })}` : ''; }).filter(Boolean);
    if (only && !rows.length) rows.push(t('No se une en la Parte 1 de {r}', { r: esc(ROUTE_NAME[only]) }));
    if (j) rows.push(esc(dataTx(j.how)));
    return rows.join('<br>') || t('No se une al ejército');
  }
  function tier(pid) {
    const T = EXT().builds?.tiers || {}, r = ctxRoute();
    return list((r ? [r, 'final'] : [...ROUTE_IDS, 'final']).filter(x => T[x]?.[pid]).map(x => `${x === 'final' ? t('Partes 2 y 3') : esc(ROUTE_NAME[x])} <b>${esc(T[x][pid])}</b>`));
  }
  function classes(pid) {
    const ks = Object.keys(CLASSES), ban = ks.map(k => [k, classBan(pid, k)]).filter(x => x[1]);
    const n = ks.length - ban.length;  // only classes with no limit at all: a part-only limit is listed below, not counted
    return `<a href="${esc(qsHref('arbol-clases', {}, { p: pid }))}">${t('{n} de {m} clases', { n, m: ks.length })}</a>` +
      (ban.length ? `<br><small>${t('No puede ser: {l}', { l: list(ban.map(([k, w]) => L('clase', k) + (w === true ? '' : ` (${esc(dataTx(w))})`))) })}</small>` : '');
  }

  function page(qs) {
    const def = LORDS[ctxRoute()] || LORDS.cai, r1 = p1Route(qs);
    const a = pick(qs.a) || def, b = pick(qs.b) || (opts().find(([p]) => p !== a && (!r1 || joinsP1(p, r1))) || opts().find(([p]) => p !== a))[0], c = pick(qs.c);
    const pids = [a, b, c].filter(Boolean), cur = { a, b, c, todas: qs.todas === '1' ? '1' : '' }, cb = p => CHARS[p].p?.combat || {};
    // filterCtl translates the label itself: pass the Spanish key
    const sel = (k, label, none) => filterCtl('comparar', cur, k, [...(none ? [['', t('Ninguno')]] : []), ...opts()], cur[k], label, x => x);
    // a row of numbers: the highest value marked when they differ
    const nums = (lab, vals) => { const ok = vals.filter(v => v != null), hi = Math.max(...ok), mark = ok.length > 1 && Math.min(...ok) !== hi;
      return `<tr class="cmp-n"><th>${lab}</th>${vals.map(v => (mark && v === hi ? `<td class="cmp-hi"><b>${v}</b><span class="sr-only"> (${t('mayor')})</span></td>` : `<td>${v ?? ''}</td>`)).join('')}</tr>`; };
    const row = (lab, f) => `<tr><th>${esc(lab)}</th>${pids.map(p => `<td>${f(p) || '—'}</td>`).join('')}</tr>`;
    const sec = lab => `<tr class="cmp-sec"><th colspan="${pids.length + 1}">${esc(lab)}</th></tr>`;
    const stats = (obj, k) => pids.map(p => cb(p)[obj]?.[k] ?? null);
    const keys = obj => Object.keys(STAT_ES).filter(k => pids.some(p => cb(p)[obj]?.[k] != null));
    const body = `<caption class="sr-only">${esc(pids.map(p => nm(CHARS[p])).join(' · '))}</caption><tr><th><span class="sr-only">${t('Personaje')}</span></th>${pids.map(p => `<th class="cmp-who">${face(p)}${L('personaje', p)}</th>`).join('')}</tr>` +
      sec(t('Base')) + keys('base').map(k => nums(statAbbr(k), stats('base', k))).join('') +
      sec(t('Crecimiento %')) + keys('growth').map(k => nums(statAbbr(k), stats('growth', k))).join('') +
      nums(esc(t('Suma')), pids.map(p => cb(p).growth_total ?? null)) +
      sec(t('Clases')) +
      row(t('Clases por nivel'), p => lvPath(p).map(([lv, k, es]) => `${t('Nv {n}', { n: lv })} ${k ? L('clase', k) : esc(gt(es))}`).join('<br>')) +
      row(t('Clases posibles'), classes) +
      row(t('Habilidades personales'), p => (cb(p).personal_skills || []).map(s => `${t('Nv {n}', { n: s.level })} · ${L('habilidad', s.id, s.es)}`).join('<br>')) +
      sec(t('Partida')) +
      row(t('Reclutamiento'), p => routes(CHARS[p], r1)) +
      row(t('Mejores apoyos'), p => partners(p, r1)) +
      row(t('Tier de builds'), tier);
    return `<h1>${t('Comparar personajes')}</h1><div class="cmp-sel">${sel('a', 'Personaje 1')}${sel('b', 'Personaje 2')}${sel('c', 'Personaje 3', true)}</div>` +
      `<div class="tw"><table class="cmp cmp-${pids.length}">${body}</table></div>` +
      (ctxChosen() && CAPS[ctxGet().key]?.part === 1 ? `<p><a class="txtbtn" href="${esc(qsHref('comparar', cur, { todas: r1 ? '1' : '' }))}">${r1 ? t('Ver todas las rutas') : t('Solo la ruta de {r}', { r: esc(ROUTE_NAME[ctxRoute()]) })}</a></p>` : '') +
      `<p class="mut">${t('Tiers por ruta en {a}; apoyos completos en {b}.', { a: `<a href="#/tier-personajes">${t('Tier list de personajes')}</a>`, b: `<a href="#/apoyos">${t('Apoyos')}</a>` })}</p>`;
  }

  const CSS = `.cmp-sel { margin-bottom: var(--s3); }
table.cmp { width: 100%; table-layout: fixed; }
.cmp th:first-child { width: 30%; text-align: left; }
.cmp td, .cmp th { vertical-align: top; }
.cmp .cmp-n > * { vertical-align: middle; padding-top: 0; padding-bottom: 0; }  /* number rows: the stat label's tap height, no extra padding */
.cmp-who { text-align: center; }
.cmp-who a { display: inline-flex; align-items: center; min-height: var(--tap); }
.cmp-face { display: block; width: 56px; height: 56px; margin: 0 auto var(--s1); border-radius: 50%; }
.cmp-sec th { background: var(--surface2); text-align: left; }
.cmp-hi { color: var(--green); }
@media (max-width: 600px) { .cmp-3 { font-size: var(--fs-small); } .cmp-3 .cmp-face { width: 40px; height: 40px; } }`;

  register({ id: 'comparar', title: 'Comparar personajes', render: (id, qs) => page(qs || {}), css: CSS });
})();
