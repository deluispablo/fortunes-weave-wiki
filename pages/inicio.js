/* Fortune's Weave · wiki2 · the home page #/: the search, the Guías block (Empieza
   aquí and the 7 topics), Tu partida, Consulta with real counts, a game tip and the footer. A library row whose page is not registered is not drawn (R-POR-2b). */
'use strict';
/** game tips without spoilers (R-POR-5), each route's own (tips_all; every tip is a Part 1 tip of one route): the chosen route's up to
    the chosen chapter, all of them in Parts 2 and 3; no game chosen, those of each route's first tip chapter (3 on Cai, 4 on the others);
    the prologue (and Part 1 before the first tip chapter) none */
function homeTips() {
  const all = W.chapters?.tips_all || W.chapters?.tips || [], c = ctxChosen() ? CAPS[ctxGet().key] : null;
  if (!c) { const first = {}; all.forEach(t => { first[t.route] = Math.min(first[t.route] ?? 99, t.ch_from); }); return all.filter(t => t.ch_from === first[t.route]); }
  const mine = all.filter(t => !t.route || t.route === ctxGet().route);
  return c.part >= 2 ? mine : c.part === 1 ? mine.filter(t => t.ch_from <= c.n) : [];
}
(() => {
  const ext = () => window.WIKI_EXT || {};
  /* [route, name, count as the listing shows it with «Todas las rutas», singular, plural, icon: a game texture (img/ui, a white
     mask tinted by CSS) or a NAV_ICON key]. A page's own register({count}) wins over the count here */
  const LIB = [
    ['personajes', 'Personajes', () => Object.keys(CHARS).length, 'personaje', 'personajes', 'IconPageTab_Unit'],
    ['clases', 'Clases', () => Object.keys(CLASSES).length, 'clase', 'clases', 'IconPageTab_Sword'],
    ['habilidades', 'Habilidades', () => Object.values(SKILLS).filter(s => s.es).length, 'habilidad', 'habilidades', 'IconBasicStatus_Technique'],
    ['objetos', 'Objetos', () => Object.values(ITEMS).filter(i => i.es).length, 'objeto', 'objetos', 'IconPageTab_Equipment'],
    ['apoyos', 'Apoyos', () => (ext().apoyos?.pairs || []).length, 'pareja', 'parejas', 'IconPageTab_Reliance'],
    ['lugares', 'Lugares', () => Object.values(SPOTS).filter(s => s.es).length, 'lugar', 'lugares', 'pin'],
    ['mapa', 'Mapa', () => Object.keys(W.map?.regions || {}).length, 'región', 'regiones', 'map'],
    ['misiones', 'Misiones', () => (W.chapters?.quests || []).length, 'misión', 'misiones', 'scroll'],
    ['batallas', 'Batallas', () => (ext().batallas?.b || []).length, 'batalla', 'batallas', 'swords'],
    ['tutoriales', 'Tutoriales', () => (ext().tutoriales?.tutorials || []).length, 'tutorial', 'tutoriales', 'tut'],
    ['glosario', 'Glosario', () => (W.gloss || []).length, 'término', 'términos', 'gloss'],
  ];
  const GO = [['#/cap', 'cap', 'Capítulo'], ['#/equipo?sec=regalos', 'week', 'Regalos'], ['#/equipo', 'eq', 'Equipo'], ['#/equipo?ir=eq-equipamiento', 'build', 'Builds']];
  const pageOf = r => NAV.flatMap(g => g.pages).find(p => p.id === ROUTES[r]);

  function hero() {
    const rec = typeof recents !== 'undefined' ? recents.list().slice(0, 3) : [];
    return `<div class="hm-hero"><h1>${t("Wiki de Fortune's Weave")}</h1><p class="hm-lead">${t('Personajes, clases, objetos, mapa y guías del juego, en español y sin conexión.')}</p>` +
      `<button class="hm-q" type="button" data-pal aria-haspopup="dialog" aria-keyshortcuts="/ Control+K">${navIcon('q')}<span>${t('Busca un personaje, objeto, lugar…')}</span><kbd aria-hidden="true">/</kbd></button>` +
      (rec.length ? `<p class="hm-rec"><span>${t('Recientes:')}</span>${rec.map(r => `<a href="${esc(r.href)}">${esc(r.label)}</a>`).join('')}</p>` : '') + '</div>';
  }
  /** Recomendadas (game8 style): what most visits come for, first; the min-max guide of the chosen route */
  function recommended() {
    const r = ctxChosen() ? ctxGet().route : '', mm = r && (W.guias || []).some(g => g.id === `minmax-${r}`) ? `minmax-${r}` : 'minmax';
    const items = [[`#/guia/${mm}`, 'cap', r && mm !== 'minmax' ? t('Min-max de {r}', { r: ROUTE_NAME[r] }) : t('Min-max por ruta')],
      ['#/builds', 'build', t('Builds')], ['#/reclutas', 'eq', t('Reclutas recomendados')],
      ['#/perdibles', 'scroll', t('Perdibles')], ['#/trucos', 'book', t('Trucos')], ['#/guia', 'map', t('Recorrido')]].filter(([h]) => ROUTES[parseHash(h).sec]);
    return `<section class="hm-top" aria-labelledby="hm-top-t"><h2 id="hm-top-t">${t('Recomendadas')}</h2><ul class="hm-tops tiles">` +
      items.map(([h, k, lb]) => `<li><a href="${h}">${navIcon(k)}<span><b>${esc(lb)}</b></span></a></li>`).join('') + '</ul></section>';
  }
  /** the menu's topic blocks (Personajes, Clases y combate, …), each page with its count when the library knows it */
  function library() {
    const byR = Object.fromEntries(LIB.map(x => [x[0], x])), routeOf = p => Object.keys(ROUTES).find(r => ROUTES[r] === p.id);
    const row = p => { const r = routeOf(p), x = byR[r], n = x ? (typeof p.count === 'function' ? p.count() : x[2]()) : null;
      return `<li><a href="#/${r}"><span><b>${esc(t(p.title))}</b>${n != null ? `<small>${plural(n, x[3], x[4])}</small>` : ''}</span></a></li>`; };
    const blocks = NAV.filter(g => g.id !== 'guias' && g.id !== 'partida').map(g => { const ps = g.pages.filter(p => p.nav !== false && routeOf(p));
      return ps.length ? `<section class="hm-blk" aria-labelledby="hm-b-${g.id}"><h2 id="hm-b-${g.id}">${esc(t(g.title))}</h2><ul class="hm-lib tiles">${ps.map(row).join('')}</ul></section>` : ''; }).join('');
    return `<div class="hm-libs">${blocks}</div>`;
  }
  function mine() {
    if (!ctxChosen()) return `<section class="hm-mine empty" aria-labelledby="hm-mine-t"><b id="hm-mine-t">${t('Tu partida')}</b>` +
      `<p>${t('Si estás jugando, elige ruta y capítulo: la wiki te dirá qué hacer esta semana, a quién reclutar y qué no perderte.')}</p>` +
      `<button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog">${t('Elegir ruta y capítulo')}</button></section>`;
    const { route, key } = ctxGet(), c = CAPS[key], cs = capShort(c);
    const where = `${c.route === 'comun' ? t('Común') : ROUTE_NAME[route]}, ${cs[0].toLowerCase()}${cs.slice(1)}`;
    return `<section class="hm-mine" aria-labelledby="hm-mine-t"><div class="hm-mine-h"><p><b id="hm-mine-t">${t('Tu partida')}</b> <span class="hm-where">${esc(where)}<i> · ${esc(gt(c.es))}</i></span></p>` +
      `<button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog" aria-label="${t('Cambiar ruta y capítulo')}">${t('Cambiar')}</button></div>` +
      `<ul class="hm-go">${GO.map(([h, k, lb]) => `<li><a href="${h}">${navIcon(k)}<span>${t(lb)}</span></a></li>`).join('')}</ul></section>`;
  }
  /** Guías (09-ia): Empieza aquí as a line of links, then the 7 topics with their guide count; the block the user wants first */
  function guides() {
    const gs = W.guias || [];
    if (!gs.length) return '';
    return `<section class="hm-gu" aria-labelledby="hm-gu-t"><div class="hm-h"><h2 id="hm-gu-t">${t('Guías')}</h2><a class="txtbtn" href="#/guias">${t('Todas las guías ({n})', { n: gs.length })}</a></div>` +
      `<ul class="hm-temas tiles">${temasL().map(([tm, n]) => { const k = gs.filter(g => g.tema === tm).length;
        return `<li><a href="#/guias/${tm}"><span><b>${esc(n)}</b><small>${plural(k, 'guía')}</small></span></a></li>`; }).join('')}</ul></section>`;
  }
  const tipParts = x => [esc(tx(x, 'text')), `${t('Consejo del juego')} · ${x.route ? t('ruta de {r}', { r: esc(ROUTE_NAME[x.route]) }) + ', ' : ''}${t('cap. {n}', { n: x.ch_from })}${x.spot && SPOTS[x.spot] ? ' · ' + L('lugar', x.spot) : ''}`];
  function tip() {
    const pool = homeTips();
    if (!pool.length) return '';
    const i = Math.floor(Math.random() * pool.length), [p, f] = tipParts(pool[i]);
    return `<aside class="hm-tip" aria-labelledby="hm-tip-t"><b id="hm-tip-t">${t('¿Sabías que…?')}</b><p id="hm-tip-p" aria-live="polite">${p}</p>` +
      `<div class="hm-tip-f"><span id="hm-tip-s">${f}</span>${pool.length > 1 ? `<button class="txtbtn" type="button" data-tip="${i}">${t('Otro dato')}</button>` : ''}</div></aside>`;
  }
  function foot() {
    const [y, m, d] = String(W.meta?.built || '').split('-').map(Number);
    const off = { on: 'Funciona sin conexión.', next: 'Funcionará sin conexión desde la próxima visita.' }[offlineState()];
    return `<p class="hm-foot">${t('Datos del juego contrastados con guías de la comunidad.')}${y ? ' ' + t('Actualizada el {d}.', { d: dateTx(y, m, d) }) : ''}${off ? ' ' + t(off) : ''}</p><p class="hm-foot hm-legal">${LEGAL()}</p>`;  // the same reading as Ajustes
  }
  const home = () => `${hero()}<div class="hm-cols">${recommended()}${guides()}${mine()}${library()}${tip()}</div>${foot()}`;

  // «Otro dato» swaps the tip in place; «Todas las secciones» opens «Más» on a phone and moves to the sidebar on a wide screen
  document.addEventListener('click', e => {
    const b = e.target.closest?.('[data-tip]'), all = e.target.closest?.('[data-allsec]');
    if (b) {
      const pool = homeTips(); if (pool.length < 2) return;
      const i = (+b.dataset.tip + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length, [p, f] = tipParts(pool[i]);
      b.dataset.tip = i; document.getElementById('hm-tip-p').innerHTML = p; document.getElementById('hm-tip-s').innerHTML = f;
    } else if (all) {
      const side = document.querySelector('#side .nav-g a');
      if (side && side.offsetParent) side.focus(); else openSheet('mas');
    }
  });

  const CSS = `
.hm svg, .hm-q svg { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hm-hero { margin: 0 0 var(--s2); padding: 32px 32px 24px; border: 1px solid var(--line); border-radius: var(--r2);
  background: var(--smoke), linear-gradient(180deg, var(--surface), var(--bg)); }
.hm-hero h1 { margin: 0; font-size: 34px; line-height: 1.15; }
.hm-lead { margin: 6px 0 0; max-width: 56ch; color: var(--tx2); }
.hm-q { display: flex; align-items: center; gap: var(--s3); width: 100%; max-width: 640px; min-height: 52px; margin-top: var(--s3); padding: 0 var(--s3) 0 var(--s4);
  border: 1px solid var(--line-strong); border-radius: var(--r2); background: var(--surface); color: var(--mut); text-align: left; font-size: 16px; box-shadow: inset 0 1px 2px rgba(0, 0, 0, .06); }
.hm-q:hover { border-color: var(--focus); }
.hm-q svg { flex: none; width: 20px; height: 20px; color: var(--tx2); }
.hm-q span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hm-q kbd { flex: none; padding: 1px 7px; border: 1px solid var(--line-strong); border-radius: var(--r1); font: 500 12px/18px var(--font); color: var(--mut); }
.hm-rec { display: flex; flex-wrap: wrap; align-items: center; gap: 0 var(--s3); margin: var(--s2) 0 0; color: var(--mut); font-size: var(--fs-small); }
.hm-rec a { display: inline-flex; align-items: center; min-height: var(--tap); margin-block: -6px; font-size: 13px; }
.hm-h { display: flex; align-items: center; justify-content: space-between; gap: var(--s3); margin: 20px 0 var(--s1);
  background: linear-gradient(90deg, var(--line-strong), transparent 80%) left bottom / 100% 1px no-repeat; }
.hm-h h2 { margin: 0; background: none; }
.hm-h h2, .hm-top h2, .hm-blk h2 { font: 600 var(--fs-small)/1.2 var(--font); text-transform: uppercase; letter-spacing: .08em; color: var(--mut); }
.hm-h .txtbtn { margin-right: calc(-1 * var(--s2)); font-weight: 500; font-size: 13px; white-space: nowrap; }
.hm-top h2, .hm-blk h2 { margin: var(--s4) 0 var(--s2); }
.hm-blk + .hm-blk { margin-top: var(--s2); }
.hm-mine { margin-top: var(--s4); padding: var(--s1) var(--s4); background: var(--surface); border: 1px solid var(--line); border-radius: var(--r2); box-shadow: inset 0 1px 0 var(--panel-hi); }
.hm-mine b { font: 600 16px/1.3 var(--font-display); letter-spacing: .02em; }
.hm-mine.empty > b { display: block; margin-top: var(--s2); }
.hm-mine p { margin: var(--s1) 0; color: var(--tx2); }
.hm-mine.empty .txtbtn { margin-left: calc(-1 * var(--s2)); }
.hm-mine-h { display: flex; align-items: center; justify-content: space-between; gap: var(--s2); }
.hm-mine-h p { min-width: 0; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hm-mine-h .txtbtn { margin-right: calc(-1 * var(--s2)); }
.hm-where { margin-left: 6px; font-size: 13px; }
.hm-where i { font-style: normal; color: var(--mut); }
.hm-go { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--s1); margin: 0 calc(-1 * var(--s2)); padding: 0; list-style: none; }
.hm-go a { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; min-height: 52px; padding: 2px; border-radius: var(--r2); color: var(--tx2); font-size: 12px; text-align: center; }
.hm-go a:hover { background: var(--ghost-hover); color: var(--tx); text-decoration: none; }
.hm-go svg { width: 22px; height: 22px; color: var(--acc); }
.hm-tip { margin-top: var(--s5); padding: var(--s3) var(--s4); border-left: 2px solid var(--acc-mark); border-radius: 0 var(--r2) var(--r2) 0; background: var(--surface2); }
.hm-tip b { display: block; font: 600 16px/1.3 var(--font-display); letter-spacing: .02em; }
.hm-tip p { margin: 4px 0 0; color: var(--tx2); }
.hm-tip-f { display: flex; align-items: center; justify-content: space-between; gap: var(--s2); margin-top: 2px; color: var(--mut); font-size: var(--fs-small); }
.hm-tip-f .txtbtn { margin-right: calc(-1 * var(--s2)); font-size: 13px; }
.hm-foot { margin: var(--s5) 0 0; padding-top: var(--s3); border-top: 1px solid var(--line); color: var(--mut); font-size: var(--fs-small); }
.hm-legal { margin-top: var(--s2); padding-top: 0; border-top: 0; }
@media (prefers-reduced-motion: no-preference) { .hm-go a { transition: background-color .12s; } }
/* wide: two columns like Wikipedia's front page; the library and Empieza aquí on the left, Tu partida and the tip on the right */
@media (min-width: 1000px) {
  .hm-cols { display: grid; grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr); grid-template-rows: auto auto 1fr auto; column-gap: 40px; }
  .hm-top { grid-area: 1 / 1; }
  .hm-gu { grid-area: 2 / 1; }
  .hm-libs { grid-area: 3 / 1 / 5; }
  .hm-mine { grid-area: 1 / 2; align-self: start; margin-top: 30px; }
  .hm-tip { grid-area: 2 / 2 / 5; align-self: start; }
  .hm-mine-h p { white-space: normal; }
  .hm-where { display: block; margin: 0; }
  .hm-go { grid-template-columns: 1fr 1fr; margin-top: var(--s1); }
  .hm-go a { flex-direction: row; justify-content: flex-start; gap: var(--s2); min-height: var(--tap); padding: 0 var(--s2); font-size: 13px; }
}
/* phone: the hero bleeds to the edges, two library columns, Tu partida inside the first screen */
@media (max-width: 760px) {
  .hm-hero { margin: calc(-1 * var(--s4)) calc(-1 * var(--s4)) 0; padding: 20px var(--s4) var(--s3); border: 0; border-bottom: 1px solid var(--line); border-radius: 0; }
  .hm-hero h1 { font-size: var(--fs-title); }
  .hm-q { min-height: 48px; font-size: 15px; }
  .hm-q kbd { display: none; }
  .hm-where i { display: none; }
}`;
  register({ id: 'inicio', title: 'Inicio', routes: [''], render: () => `<div class="hm">${home()}</div>`, css: CSS });  // title: a t() key (the menu translates it)
  P[''] = P.inicio;  // through the registry wrapper, as the chapter page used to be
})();
