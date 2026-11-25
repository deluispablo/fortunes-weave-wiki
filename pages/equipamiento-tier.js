/* Fortune's Weave · wiki2 · Mejor equipamiento (#/mejor-equipamiento): curated tiers of accessories, shields and equipment staves
   (WIKI_EXT.equipamiento), with where and from which chapter each piece is on a route and part. Reuses the weapon page's
   availability (armsAvail over teamGearPool, which holds every piece with a weight) and its source line (armsSrcLine). */
'use strict';
const GEAR_TYPES = ['acc', 'escudo', 'baston'];
/** {type: [{iid, tier, why, why_en, web, idx, routes, marks, src, lvl}]} — src is a pool source, or the row's own {es, en} when the
    pool has none (temple battles, a quest reward); route '' → every route, no chapter */
function gearCatalog(route, part) {
  const rows = (((window.WIKI_EXT || {}).equipamiento || {}).tiers || []).filter(r => r.parts.includes(armsBlock(part)));
  const out = {};
  for (const r of rows) {
    const it = ITEMS[r.iid]; if (!it) continue;
    const av = route ? armsAvail(route, part)[r.iid] : null;
    const routes = route ? [] : ROUTE_IDS.filter(x => armsAvail(x, part)[r.iid]);
    if (route && !av && !r.obtiene) continue;
    const src = av ? av.src : routes.length ? armsAvail(routes[0], part)[r.iid].src : r.obtiene || null, marks = [];
    if (!route && armsBlock(part) === 1 && routes.length && !routes.includes('cai')) marks.push('nocai');
    (out[r.type] ??= []).push({ iid: r.iid, tier: r.tier, why: r.why, why_en: r.why_en, web: r.extra || r.web || null, idx: av ? av.idx : -1, routes, marks, src,
      lvl: armsDungeonLv(src, part), w: it.weapon.weight });
  }
  return Object.fromEntries(GEAR_TYPES.filter(ty => out[ty]).map(ty => [ty, out[ty].sort((a, b) => ARMS_RANK[a.tier] - ARMS_RANK[b.tier] || a.w - b.w || a.iid.localeCompare(b.iid))]));
}

(() => {
  const H = { acc: 'Accesorios', escudo: 'Escudos', baston: 'Bastones' };
  const MARK = { nocai: () => t('no en Cai P1') };
  function page(qs = {}) {
    const c = ctxGet(), cp = ctxChosen() ? CAPS[c.key]?.part : 1;
    const part = qs.p === '3' ? 3 : qs.p === '1' ? 1 : cp >= 2 ? 3 : 1;
    const r = qs.r === 'todas' ? '' : ROUTE_IDS.includes(qs.r) ? qs.r : ctxRoute(), tipo = GEAR_TYPES.includes(qs.tipo) ? qs.tipo : '';
    const here = r && ctxChosen() && c.route === r && armsBlock(CAPS[c.key]?.part) === armsBlock(part) ? chapIdx(r, c.key) : -1;
    const cat = gearCatalog(r, part);
    const when = x => (x.lvl ? t('Cofre · Nv {n}', { n: x.lvl }) : r ? (x.idx < 0 ? '' : x.idx <= here && here >= 0 ? `<b class="bd-now">${t('ahora')}</b>` : t('desde el {c}', { c: chapLink(routeChapters(r)[x.idx].key) }))
      : x.routes.length ? esc(list(x.routes.map(k => ROUTE_NAME[k]))) : '') || '—';
    const where = s => (!s ? '' : s.kind ? armsSrcLine(s) : esc(LANG === 'en' ? s.en : s.es));
    const row = x => { const it = ITEMS[x.iid], en = LANG === 'en';
      const tags = [...x.marks.map(m => MARK[m]()), t('Peso {w}', { w: x.w })].map(s => `<span class="mm-tag">${esc(s)}</span>`).join('');
      return `<details class="aw-u"><summary>${itemIco(x.iid, 'ico')}<span class="aw-n">${esc(nm(it))}</span><span class="mm-tag">${x.tier}</span>${armsCurseTag(x.iid)}<span class="aw-w">${when(x)}</span></summary><div class="aw-b">` +
        `<p>${tags}</p><p>${esc(en ? x.why_en : x.why)}</p>` + (x.src ? `<p>${where(x.src)}</p>` : '') +
        `<p class="mut">${esc((en ? it.effect_en : it.effect_es) || '')} · ${L('objeto', x.iid, t('Ficha'))}</p>` +
        (x.web ? `<p class="mut">${esc(en ? x.web.en : x.web.es)}</p>` : '') + '</div></details>'; };
    const types = Object.keys(cat).filter(ty => !tipo || ty === tipo);
    const body = types.length ? types.map(ty => `<section class="card aw-g"><h2>${t(H[ty])}</h2>${cat[ty].map(row).join('')}</section>`).join('')
      : `<p class="mut">${t('Nada con estos filtros.')}</p>`;
    const ctl = `<div class="aw-ctx">${routeChips('mejor-equipamiento', qs, r)}${chips('mejor-equipamiento', qs, 'p', [['1', 'Parte 1'], ['3', 'Partes 2 y 3']], String(part), 'Parte')}` +
      chips('mejor-equipamiento', qs, 'tipo', [['', 'Todos'], ...GEAR_TYPES.map(k => [k, H[k]])], tipo, 'Tipo') + '</div>';
    const rules = `<details class="card"><summary><h3>${t('Reglas')}</h3></summary><ul class="mm-ol">${[
      t('Todo el equipamiento pesa: su peso se suma al del arma y, si el total pasa de la Con, cada punto de más resta Vel de ataque.'),
      t('Quitarse el escudo durante el combate no gasta turno: sirve para recuperar el ataque doble.'),
      (r === '' || r === 'cai') && part === 1 && t('En la Parte 1, Cai no llega a Mons ni al Lago Zeet: no hay Escudo de plata, y la Gema sacra solo puede salir al azar de la Caja de gemas.'),
      t('Los bastones de esta lista son equipamiento; los hechizos de curación son de cada unidad y no se compran.'),
      t('El tier sale de guías y pruebas; la disponibilidad, el peso y el efecto salen de los datos del juego.'),
    ].filter(Boolean).map(s => `<li>${s}</li>`).join('')}</ul></details>`;
    return `<h1>${t('Mejor equipamiento')}</h1><p class="mut">${t('Los accesorios, escudos y bastones que más rinden, y dónde y desde cuándo los tienes en tu ruta.')}</p>` + ctl + body + rules;
  }
  register({ id: 'mejor-equipamiento', group: 'minmax', title: 'Mejor equipamiento', order: 26, render: (id, qs) => page(qs || {}),
    search: () => [{ group: 'Mecánicas', label: tl('Mejor equipamiento'), sub: tl('Tier list de accesorios, escudos y bastones por ruta y parte'), href: '#/mejor-equipamiento',
      aliases: ['Mejor equipamiento', 'tier list equipamiento', 'mejores accesorios', 'mejores escudos', 'mejores bastones', 'best gear', 'best accessories', 'best shields'], pre: true }] });  // i18n-ignore
})();
