/* Fortune's Weave · wiki2 · Mejores armas (#/mejores-armas): curated weapon tiers (WIKI_EXT.armas) per weapon type, with where and
   from which chapter each weapon is available on a route and part (teamGearPool), and the marks the game data gives. */
'use strict';
const ARMS_RANK = { S: 0, A: 1, B: 2 };
const ARMS_SOUL = 'IID_戦魂石';  // Marcialito: the refine step that asks for it is only paid in Part 3
const armsBase = iid => String(iid).replace(/＋[0-9０-９]+$/, '');
const armsBlock = part => (part >= 2 ? 2 : 1);
/** the tier row of a weapon (a refined copy reads its base) for a part; null without one */
const armsTier = (iid, part) => (((window.WIKI_EXT || {}).armas || {}).tiers || []).find(r => r.iid === armsBase(iid) && r.parts.includes(armsBlock(part))) || null;
const armsScore = w => w.might + (w.hit || 0) / 10 + (w.crit || 0) / 5 - (w.weight || 0) / 2;
/** refine steps reachable before the Marcialito step: {cap, capped} */
function armsCap(iid) {
  let f = ITEMS[iid]?.weapon?.forge, n = 0;
  while (f && !(f.mats || []).some(m => m.iid === ARMS_SOUL)) { n++; f = ITEMS[f.to]?.weapon?.forge; }
  return { cap: n, capped: !!f };
}
/** base level of the dungeon a chest is in (chests carry no chapter), for the part; 0 when not a chest */
const armsDungeonLv = (src, part) => (src?.kind === 'cofre' ? Object.values(W.map?.dungeons || {}).find(d => d.spot === src.spot)?.base_level_part?.[String(part >= 3 ? 3 : part)] || 0 : 0);
const ARMS_AV = {};
/** {base iid: {idx, src}} — first chapter of `route` in that part where the weapon (or a refined copy) is in teamGearPool */
function armsAvail(route, part) {
  const k = route + '|' + armsBlock(part);
  if (ARMS_AV[k]) return ARMS_AV[k];
  const out = {}, ch = routeChapters(route);
  ch.forEach((c, i) => {
    if (armsBlock(c.part) !== armsBlock(part) || c.part < 1) return;
    for (const [iid, srcs] of Object.entries(teamGearPool(route, c.key))) { const b = armsBase(iid); if (!out[b]) out[b] = { idx: i, src: srcs[0] }; }
  });
  return (ARMS_AV[k] = out);
}
/** {type: [{iid, tier, why, why_en, web, score, idx, routes, marks, cap, src}]} in ARMAS order; route '' → every route, no chapter */
function armsCatalog(route, part) {
  const rows = (((window.WIKI_EXT || {}).armas || {}).tiers || []).filter(r => r.parts.includes(armsBlock(part)));
  const out = {};
  for (const r of rows) {
    const it = ITEMS[r.iid], w = it?.weapon; if (!w) continue;
    const av = route ? armsAvail(route, part)[r.iid] : null;
    const routes = route ? [] : ROUTE_IDS.filter(x => armsAvail(x, part)[r.iid]);
    if (route && !av) continue;
    // no route has it in the pool (story loot, a quest outside the pool): the game's own source line
    // only what the pool cannot model (quests, story loot); a crate is not a shop
    const gameSrc = () => { const o = (it.obtain || []).find(x => ['recompensa', 'botín enemigo'].includes(x.type)); return o ? { kind: o.type, where: o.where || o.what || '' } : null; };
    const src = av ? av.src : routes.length ? armsAvail(routes[0], part)[r.iid].src : route ? null : gameSrc();
    const { cap, capped } = armsCap(r.iid), marks = [];
    if (armsBlock(part) === 1 && capped) marks.push('tope');
    if (!route && armsBlock(part) === 1 && routes.length && !routes.includes('cai')) marks.push('nocai');
    if (/^Prototipo/.test(it.es)) marks.push('dlc');
    if (!(av || routes.length) && (it.obtain || []).some(o => o.type === 'sorteo')) marks.push('cajas');
    const ty = armaKey(w.type);
    (out[ty] ??= []).push({ iid: r.iid, tier: r.tier, why: r.why, why_en: r.why_en, web: r.extra || r.web || null, score: Math.round(armsScore(w) * 10) / 10,
      idx: av ? av.idx : -1, routes, marks, cap, src: src || null, lvl: armsDungeonLv(src, part) });
  }
  const order = ARMAS.map(a => a[0]);
  return Object.fromEntries(Object.keys(out).sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map(ty => [ty, out[ty].sort((a, b) => ARMS_RANK[a.tier] - ARMS_RANK[b.tier] || b.score - a.score || a.iid.localeCompare(b.iid))]));
}

/** the visible tag of a cursed treasure in a closed row (shared with #/mejor-equipamiento): not colour only */
const armsCurseTag = iid => (isCursed(iid) ? `<span class="mm-tag">${t('Tesoro maldito')}</span>` : '');
/** where a pool source is, one line (shared with #/mejor-equipamiento) */
function armsSrcLine(s) {
  if (!s) return '';
  // a barter names its place: «Vandahl 007 en Alecto» carries the merchant's internal number
  const at = s.spot ? L('lugar', s.spot, s.kind === 'barter' ? undefined : dataTx(s.where).replace(/\s*\(.*\)$/, '')) : esc(dataTx(s.where || '').replace(/\s*\([A-Z]+\d+_\d+\)$/, ''));  // «(SC30_03)»: the game's map id
  if (s.kind === 'barter') return t('Trueque en {w}: {p}', { w: at, p: list((s.pay || []).map(p => `${p.n > 1 ? p.n + '× ' : ''}${L('objeto', p.id, p.es)}`)) });
  if (s.kind === 'tienda') return t('Tienda: {w}', { w: at }) + (s.price ? ' · ' + gold(s.price) : '');
  if (s.kind === 'cofre') return t('Cofre: {w}', { w: at });
  return s.kind === 'recompensa' || s.kind === 'mision' ? t('Misión: {w}', { w: at }) : s.kind === 'botín enemigo' ? t('Botín enemigo: {w}', { w: at }) : at;
}

(() => {
  const ARMS_H = { espada: 'Espadas', lanza: 'Lanzas', hacha: 'Hachas', arco: 'Arcos', punos: 'Guanteletes' };
  const MARK = { tope: c => t('tope P1: +{n}', { n: c }), nocai: () => t('no en Cai P1'), dlc: () => t('DLC'), cajas: () => t('solo cajas') };
  const COM = () => `<span class="gu-com" title="${esc(t('Dato de la comunidad'))}"></span>`;
  const CSS = `.aw-ctx{display:flex;flex-wrap:wrap;gap:var(--s2);margin:0 0 var(--s3)}.aw-g h2{font-size:var(--fs-row);margin:0 0 var(--s2)}
.aw-u{border-top:1px solid var(--line)}.aw-u>summary,.aw-u>.fold-h .fold-t{display:flex;flex-wrap:wrap;align-items:center;gap:0 var(--s2);min-height:var(--tap)}
.aw-u .ico{flex:none;width:28px;height:28px}.aw-n{font-weight:600;flex:0 1 auto;min-width:0}.aw-w{flex:1 1 10em;min-width:0;color:var(--tx2);font-size:var(--fs-small)}
.mm-tag{display:inline-block;padding:0 var(--s2);border-radius:var(--r1);background:var(--surface2);color:var(--tx2);font-size:var(--fs-small);font-weight:500}.aw-u .mm-tag{flex:none}.bd-now{color:var(--acc)}.aw-b{margin:var(--s2) 0 var(--s3) var(--s3)}.aw-b p{margin:0 0 var(--s2)}`;
  // the game's weapon rank scale: 1 E, 3 D, 5 C, 7 B, 9 A, 11 S; only B and above get a tag
  const rankOf = iid => { const r = Math.max(...Object.values(ITEMS[iid].weapon.rank || {}), 0); return r >= 7 ? 'EDCBAS'[Math.min(5, (r - 1) >> 1)] : ''; };
  function page(qs = {}) {
    const c = ctxGet(), cp = ctxChosen() ? CAPS[c.key]?.part : 1;
    const part = qs.p === '3' ? 3 : qs.p === '1' ? 1 : cp >= 2 ? 3 : 1;
    const r = qs.r === 'todas' ? '' : ROUTE_IDS.includes(qs.r) ? qs.r : ctxRoute(), arma = qs.arma || '';
    const here = r && ctxChosen() && c.route === r && armsBlock(CAPS[c.key]?.part) === armsBlock(part) ? chapIdx(r, c.key) : -1;
    const cat = armsCatalog(r, part);
    const when = x => (x.lvl ? t('Cofre · Nv {n}', { n: x.lvl }) : r ? (x.idx <= here && here >= 0 ? `<b class="bd-now">${t('ahora')}</b>` : t('desde el {c}', { c: chapLink(routeChapters(r)[x.idx].key) }))
      : x.routes.length ? esc(list(x.routes.map(k => ROUTE_NAME[k]))) : '') || '—';
    const row = x => { const it = ITEMS[x.iid], w = it.weapon, rk = rankOf(x.iid);
      const tags = [...x.marks.map(m => MARK[m](x.cap)), rk && t('Rango {r}', { r: rk })].filter(Boolean).map(s => `<span class="mm-tag">${esc(s)}</span>`).join('');
      return `<details class="aw-u"><summary>${itemIco(x.iid, 'ico')}<span class="aw-n">${esc(nm(it))}</span><span class="mm-tag">${x.tier}</span>${armsCurseTag(x.iid)}<span class="aw-w">${when(x)}</span></summary><div class="aw-b">` + (tags ? `<p>${tags}</p>` : '') +
        `<p>${esc(LANG === 'en' ? x.why_en : x.why)} ${COM()}</p>` + (x.src ? `<p>${armsSrcLine(x.src)}</p>` : '') +
        `<p class="mut">${t('Pot {m}, peso {w}', { m: w.might, w: w.weight })} · ${L('objeto', x.iid, t('Ficha'))}</p>` +
        (x.web ? `<p class="mut">${esc(LANG === 'en' ? x.web.en : x.web.es)}</p>` : '') + '</div></details>'; };
    const types = Object.keys(cat).filter(ty => !arma || ty === arma);
    const body = types.length ? types.map(ty => `<section class="card aw-g"><h2>${t(ARMS_H[ty] || ty)}</h2>${cat[ty].map(row).join('')}</section>`).join('')
      : `<p class="mut">${t('Ningún arma con estos filtros.')}</p>`;
    const ctl = `<div class="aw-ctx">${routeChips('mejores-armas', qs, r)}${chips('mejores-armas', qs, 'p', [['1', 'Parte 1'], ['3', 'Partes 2 y 3']], String(part), 'Parte')}` +
      chips('mejores-armas', qs, 'arma', [['', 'Todas'], ...ARMAS.filter(a => ARMS_H[a[0]])], arma, 'Arma') + '</div>';
    const rules = `<details class="card"><summary><h3>${t('Reglas')}</h3></summary><ul class="mm-ol">${[
      t('Las armas de plata solo se venden desde la Parte 3.'),
      t('En la Parte 1 no se puede pagar el refinado que pide Marcialito: cada arma se queda en su «tope P1».'),
      t('Ningún arma sale de búsquedas ni de los minerales de las mazmorras: tiendas, trueques, cofres, misiones y cajas.'),
      t('Si el peso del arma pasa de la Con, cada punto de más resta Vel de ataque.'),
      t('El tier es una valoración, no un dato del juego; la disponibilidad, los precios y el refinado sí salen de los datos.'),
    ].map(s => `<li>${s}</li>`).join('')}</ul></details>`;
    return `<h1>${t('Mejores armas')}</h1><p class="mut">${t('Las armas que más rinden por tipo, y dónde y desde cuándo las tienes en tu ruta.')}</p>` + ctl + body + rules;
  }
  register({ id: 'mejores-armas', group: 'minmax', title: 'Mejores armas', order: 25, render: (id, qs) => page(qs || {}), css: CSS,
    search: () => [{ group: 'Mecánicas', label: tl('Mejores armas'), sub: tl('Tier list de armas por tipo, ruta y parte'), href: '#/mejores-armas', aliases: ['Mejores armas', 'tier list armas', 'armas recomendadas'], pre: true }] });  // i18n-ignore
})();
