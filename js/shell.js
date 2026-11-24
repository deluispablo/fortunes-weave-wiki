/* Fortune's Weave · wiki2 shell: top bar, context selector (sheet on phone), sidebar, bottom tabs, search palette, render(). */
'use strict';
const $ = s => document.querySelector(s);
const COMMON_LABEL = 'Común a todas las rutas';  // shown through t()

/* ---------------- context ---------------- */
/** chapters for the selector: [[group label, [chapter]]] — Part 1 only for `route` */
const chapterGroups = route => [[t('Prólogo'), 'comun-0-'], [`${t('Parte {p}', { p: 1 })} · ${ROUTE_NAME[route]}`, `${route}-1-`], [t('Parte {p}', { p: 2 }), 'comun-2-'], [t('Parte {p}', { p: 3 }), 'comun-3-']]
  .map(([t, pre]) => [t, Object.values(CAPS).filter(c => c.key.startsWith(pre)).sort((a, b) => a.n - b.n)]);

/** the header's right side (R-CAB): context as text with a chevron, search icon, gear link to Ajustes; no boxes */
function ctxControls() {
  const { route, key } = ctxGet(), c = CAPS[key], common = c.route === 'comun', sec = parseHash(location.hash).sec, aj = ROUTES[sec] === 'ajustes';
  const wide = common ? t(COMMON_LABEL) : t('Ruta de {r}', { r: ROUTE_NAME[route] }), narrow = common ? t('Común') : ROUTE_NAME[route];
  const open = `<button class="ctx-btn" id="ctx-btn" type="button" data-sheet="ctx" aria-haspopup="dialog" aria-expanded="${sheetKind === 'ctx' && !$('#sheet')?.hidden}"`;
  return (ctxChosen()  // nothing picked yet: no pretend game, an invitation (08-portada, decision 3)
    ? `${open} aria-label="${esc(`${wide}, ${capShort(c)}, ${gt(c.es)}. ${t('Cambiar ruta y capítulo')}`)}">` +
      `<span class="t"><span class="r"><span class="w">${esc(wide)}</span><span class="n">${esc(narrow)}</span></span><span class="c">${esc(capShort(c))} <i>· ${esc(gt(c.es))}</i></span></span>${navIcon('chev')}</button>`
    : `${open} aria-label="${t('Elegir ruta y capítulo')}"><span class="t"><span class="c">${t('Elegir ruta')}</span></span>${navIcon('chev')}</button>`) +
    (sec === '' ? '' : `<button class="ib" id="q" type="button" data-pal aria-haspopup="dialog" aria-keyshortcuts="/ Control+K" aria-label="${t('Buscar')}" title="${t('Buscar (/)')}">${navIcon('q')}</button>`) +
    langBtn() +
    `<a class="ib" id="aj" href="#/ajustes" aria-label="${t('Ajustes')}" title="${t('Ajustes')}"${aj ? ' aria-current="page"' : ''}>${navIcon('gear')}</a>`;
}

/** the header's language switch: ES | EN side by side, the language being read lit (aria-pressed); Ajustes has the same choice */
const langBtn = () => `<span class="lang-sw" role="group" aria-label="Idioma · Language">${['es', 'en'].map(l => {
  const on = (l === 'en') === isEn();
  return `<button class="lang-b" id="lang-${l}" type="button" data-lang="${l}" lang="${l}" aria-pressed="${on}" title="${l === 'en' ? 'Read the wiki in English' : 'Leer la wiki en español'}">${l.toUpperCase()}</button>`;
}).join('')}</span>`;  // i18n-ignore (each language named in itself)

function ctxSheet() {
  const { route, key } = ctxGet(), common = CAPS[key].route === 'comun';
  return `<h3>${t('Ruta')}</h3>${common ? `<p class="mut">${t(COMMON_LABEL)}</p>` : ''}<div class="seg">${ROUTE_IDS.map(r =>
    `<button type="button" data-route="${r}"${r === route && ctxChosen() ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"'}>${ROUTE_NAME[r]}</button>`).join('')}</div>` +
    chapterGroups(route).map(([t, cs]) => `<h3>${esc(t)}</h3><div class="chaps">${cs.map(x =>
      `<button type="button" data-key="${x.key}"${x.key === key ? ' class="on" aria-current="true"' : ''}><b>${x.part === 0 ? 'P' : x.part + '-'}${x.n}</b> ${esc(gt(x.es))}</button>`).join('')}</div>`).join('');
}

/** set context and refresh: on the chapter page follow the chapter URL, elsewhere re-render in place */
function setCtx(route, key) {
  ctxSet(route, key);
  const { sec } = parseHash(location.hash);
  if (sec === 'cap' && location.hash !== capHash(key)) location.hash = capHash(key);
  else render(true);
}
// on a common chapter only the stored route changes; on Part 1 the same chapter number of the new route
const pickRoute = r => { const c = ctxChapter(); setCtx(r, c.route === 'comun' ? c.key : chapterFromPath(r, 1, c.n)); };
const pickChapter = key => { const c = CAPS[key]; if (c) setCtx(c.route === 'comun' ? ctxGet().route : c.route, key); };


/* ---------------- navigation ---------------- */
const pageHref = p => '#/' + (p.routes || [p.id])[0];
/* bottom bar (phone and tablet): the order is this one line. Keys of TABS; inTabbar() (pages «Todas las secciones» leaves out) follows it */
const TABBAR = ['guias', 'personajes', 'mapa', 'partida', 'mas'];
const TAB_PAGES = { inicio: ['inicio'], guias: ['guias'], personajes: ['personajes'], mapa: ['mapa'], partida: ['cap'] };
const inTabbar = id => TABBAR.some(t => (TAB_PAGES[t] || []).includes(id));
/** the menu (09-ia): search row, Inicio, the Guías panel (the home page has its own search and Guías block: the sidebar leaves them out there) (Empieza aquí, the 7 topics folded with only the current one open, all
    guides), Consulta in groups, Mi partida as a folded footer. `more` (the phone's «Todas las secciones» sheet) leaves out what the
    bottom bar already has and prefixes its ids with m- (the sidebar uses s-) */
function sectionIndex(sec, more, id = parseHash(location.hash).id, qs = parseHash(location.hash).qs) {
  const px = more ? 'm-' : 's-', pg = ROUTES[sec], skip = x => more && inTabbar(x);
  const guide = pg === 'guia' && id ? (W.guias || []).find(g => g.id === id) : null, tema = pg === 'guias' ? id : guide?.tema;  // Spanish objects: identity; shown through guiaL()
  const cur = guide || (pg === 'guias' && id) ? null : pg;  // a topic guide or topic page is marked in the Guías panel, not as a page
  const on = t => (t ? ' class="on" aria-current="page"' : '');
  const a = (h, t, isOn) => `<a href="${h}"${on(isOn)}>${esc(t)}</a>`;
  const pages = g => g.pages.filter(p => p.nav !== false && !skip(p.id)).map(p => a(pageHref(p), t(p.title), cur === p.id));  // MENU order (register sorts them)
  const gu = NAV.find(g => g.id === 'guias'), all = (W.guias || []).length, home = sec === '' && !more;
  const temas = temasL().map(([tm, name]) => {
    const open = tm === tema, gs = (W.guias || []).filter(g => g.tema === tm);
    return `<div class="nav-t"><div class="nav-th">${a('#/guias/' + tm, name, pg === 'guias' && id === tm)}<button type="button" class="nav-tb" aria-expanded="${open}" aria-controls="${px}t-${tm}"` +
      ` aria-label="${esc(t('Guías de {t}', { t: name }))}"><span class="nav-n" aria-hidden="true">${gs.length}</span>${navIcon('chev')}</button></div>` +
      `<div class="nav-tl" id="${px}t-${tm}"${open ? '' : ' hidden'}>${gs.map(g => { const l = guiaL(g); return a('#/guia/' + g.id, l.titulo, guide === g).replace('<a ', l._es ? '<a lang="es" ' : '<a '); }).join('')}</div></div>`;
  }).join('');
  const panel = `<section class="nav-blk nav-gu" aria-labelledby="${px}gu-h"><h2 class="nav-blk-h" id="${px}gu-h">${t('Guías')}</h2>` +
    `<div class="nav-g"><b>${t('Empieza aquí')}</b>${pages(gu).filter(l => !l.includes('href="#/guias"')).join('')}</div>` +
    (temas ? `<div class="nav-g nav-temas"><b>${t('Por tema')}</b>${temas}</div>` : '') +
    (ROUTES.guias && !skip('guias') ? `<a class="nav-all${cur === 'guias' ? ' on' : ''}" href="#/guias"${cur === 'guias' ? ' aria-current="page"' : ''}>${t('Todas las guías ({n})', { n: all })}</a>` : '') + '</section>';
  const consulta = NAV.filter(g => g.id !== 'guias' && g.id !== 'partida').map(g => { const l = pages(g); return l.length ? `<div class="nav-g"><b>${esc(t(g.title))}</b>${l.join('')}</div>` : ''; }).join('');
  // Perdibles is listed once, in Empieza aquí; the order is the tabs' (the weekend first)
  const week = pg === 'semana' || (pg === 'cap' && qs.ir === 'eq-semana'), mineOpen = MINE_TABS.some(([p]) => p === pg) || store.get('navMine', false) === true;
  // all three always, also in the phone's «Más» sheet
  const mine = [...(ROUTES.semana ? [a('#/semana', t('Este fin de semana'), week)] : []), a('#/cap', t('Capítulo actual'), pg === 'cap' && !week),
    ...['equipo'].filter(x => ROUTES[x]).map(x => a('#/' + x, t(NAV.flatMap(g => g.pages).find(p => p.id === x).title), pg === x))];
  const mineBlk = open => `<div class="nav-mine"><button type="button" class="nav-mb" aria-expanded="${open}" aria-controls="${px}mine">${navIcon('cap')}<span>${t('Mi partida')}</span>${navIcon('chev')}</button>` +
    `<div id="${px}mine"${open ? '' : ' hidden'}>${mine.join('')}</div></div>`;
  const consultaBlk = `<section class="nav-blk" aria-labelledby="${px}co-h"><h2 class="nav-blk-h" id="${px}co-h">${t('Consulta')}</h2>${consulta}</section>`;
  const homeA = `<a class="nav-home${sec === '' ? ' on' : ''}" href="#/"${sec === '' ? ' aria-current="page"' : ''}>${navIcon('home')}${t('Inicio')}</a>`;
  // phone «Más»: Mi partida first and open (the game being played is what a phone is used for), then Consulta, the guides last
  if (more) return homeA + mineBlk(true) + consultaBlk + panel;
  return (home ? '' : `<button class="nav-q" type="button" data-pal aria-haspopup="dialog" aria-keyshortcuts="/ Control+K">${navIcon('q')}<span>${t('Buscar en la wiki')}</span><kbd aria-hidden="true">/</kbd></button>`) +
    homeA + (home ? '' : panel) + consultaBlk + mineBlk(mineOpen);
}
const NAV_ICON = {  // 24px stroke icons
  cap: '<path d="M4 5h11a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3z"/><path d="M8 9h6M8 13h6"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>',
  week: '<rect x="4" y="5" width="16" height="15" rx="1"/><path d="M4 10h16M9 3v4M15 3v4M8 14h2M12 14h2"/>',
  build: '<path d="m14 4 6 6-9 9H5v-6z"/><path d="m12 6 6 6"/>',
  pin: '<path d="M12 21s-6-6.2-6-11a6 6 0 0 1 12 0c0 4.8-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
  scroll: '<path d="M7 4h11v13a3 3 0 0 1-3 3H6"/><path d="M7 4a2 2 0 0 0-2 2v2h2M6 20a2 2 0 0 1-2-2v-1h11"/><path d="M10 9h5M10 13h5"/>',
  swords: '<path d="m4 4 9 9M4 4h4l9 9-4 4-9-9z"/><path d="m20 4-6 6M20 4h-4l-2 2M17 13l-4 4M6 18l-2 2M18 18l2 2"/>',
  book: '<path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5z"/><path d="M12 6v14"/>',
  tut: '<rect x="3" y="5" width="18" height="12" rx="1"/><path d="M8 21h8M12 17v4"/><path d="m10 9 4 2-4 2z"/>',
  gloss: '<path d="M4 18 8.5 6 13 18M5.8 14h5.4"/><path d="M15 12.5c.6-.9 1.5-1.3 2.6-1.3 1.6 0 2.4.9 2.4 2.4V18M20 15.2c-3.4 0-5 .6-5 1.6 0 .8.6 1.3 1.7 1.3 1.6 0 3.3-1 3.3-2.9"/>',
  prev: '<path d="m15 6-6 6 6 6"/>',
  next: '<path d="m9 6 6 6-6 6"/>',
  q: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  eq: '<circle cx="9" cy="9" r="3"/><circle cx="16.5" cy="10" r="2.5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 19a4 4 0 0 1 7 0"/>',
  pj: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  mas: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  gear: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="8" stroke-width="3" stroke-dasharray="3.1416 3.1416" stroke-linecap="butt"/>',  // a cog (8 teeth), not the spec's spokes: those read as «brightness»
  chev: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
};
const navIcon = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${NAV_ICON[k]}</svg>`;
/* «Mi partida» (R-NAV-1): the last game page visited (fe2.partida), the weekend the first time. A chapter is stored as #/cap (the current
   one): its own address would pull the context back to that chapter; ?ir= jumps are dropped so the tab never re-scrolls */
const PARTIDA = ['cap', 'semana', 'equipo', 'perdibles'];
/** Mi partida's three tabs, on top of each of its pages (phone and desktop alike) */
const MINE_TABS = [['semana', '#/semana', 'Fin de semana'], ['cap', '#/cap', 'Capítulo'], ['equipo', '#/equipo', 'Equipo']];
const mineTabs = pg => (MINE_TABS.some(([p]) => p === pg) ? `<nav class="tabs mine-tabs" aria-label="${t('Mi partida')}">${MINE_TABS.filter(([p]) => ROUTES[p] || P[p])
  .map(([p, h, lb]) => `<a href="${h}"${p === pg ? ' class="on" aria-current="page"' : ''}>${t(lb)}</a>`).join('')}</nav>` : '');
const partidaHref = () => { const h = store.get('partida', null); return typeof h === 'string' && PARTIDA.includes(ROUTES[parseHash(h).sec]) ? h : '#/semana'; };
function rememberPartida(hash) {
  const { sec, qs } = parseHash(hash), pg = ROUTES[sec];
  // ?r= is dropped too: a listing's ?r= sets the context route (listRoute), so an old one would pull the context back
  if (PARTIDA.includes(pg)) store.set('partida', pg === 'cap' ? '#/cap' : qsHref(String(hash).replace(/^#\/?/, '').split('?')[0], qs, { ir: '', r: '' }));
}
const TABS = {  // inicio is not in TABBAR today: it is there so that putting it back is one line
  inicio: ['#/', 'home', 'Inicio', (sec) => sec === ''],
  guias: ['#/guias', 'book', 'Guías', (sec, pg) => ['guias', 'guia', 'builds', 'reclutas', 'trucos'].includes(pg)],
  personajes: ['#/personajes', 'pj', 'Personajes', (sec, pg) => ['personajes', 'apoyos', 'regalos'].includes(pg)],
  mapa: ['#/mapa', 'map', 'Mapa', (sec, pg) => pg === 'mapa'],
  partida: [() => partidaHref(), 'cap', 'Mi partida', (sec, pg) => PARTIDA.includes(pg)],
};
function tabbar(sec) {
  const pg = ROUTES[sec];
  return TABBAR.map(k => {
    if (k === 'mas') return `<button type="button" data-sheet="mas" aria-haspopup="dialog" aria-label="${t('Más: todas las secciones')}">${navIcon('mas')}<span>${t('Más')}</span></button>`;
    const [h, ic, lb, isOn] = TABS[k], on = isOn(sec, pg);
    return `<a href="${esc(typeof h === 'function' ? h() : h)}"${on ? ' class="on" aria-current="page"' : ''}>${navIcon(ic)}<span>${t(lb)}</span></a>`;
  }).join('');
}

/* ---------------- modals: background inert, page scroll locked, focus back to the trigger ---------------- */
let modalReturn = null;
/* the phone's Back closes an open sheet or the search: opening one adds a history entry (same address), Back pops it.
   A dismiss (×, backdrop, Esc) or a close on the same address (a route pick) pops it too; a link or search result first pops it,
   then goes (modalLeave), so Back never lands on a dead entry. */
let modalPushed = false, modalHash = '', modalGo = null;
const canPush = () => typeof history !== 'undefined' && typeof history.pushState === 'function';
function modalShow(el) {
  if (!modalReturn) modalReturn = document.activeElement;
  if (!modalPushed && canPush()) { history.pushState({ fwModal: 1 }, ''); modalPushed = true; modalHash = location.hash; }
  el.hidden = false;
  ['.skip', '.top', '.app', '.tabbar'].forEach(s => { const b = $(s); if (b) b.inert = true; });
  document.documentElement.classList.add('modal');
}
function modalHide(el, dismiss = false) {
  if (!el || el.hidden) return;
  el.hidden = true;
  $('#ctx-btn')?.setAttribute('aria-expanded', 'false');
  if (!$('#sheet').hidden || !$('#pal').hidden) return;
  if (modalPushed) { modalPushed = false; if ((dismiss || location.hash === modalHash) && history.state?.fwModal) history.back(); }
  ['.skip', '.top', '.app', '.tabbar'].forEach(s => { const b = $(s); if (b) b.inert = false; });
  document.documentElement.classList.remove('modal');
  const f = modalReturn; modalReturn = null;
  // back to the trigger; opened with «/» or Ctrl+K from the page, back to the visible search button
  const back = f && f.isConnected && f !== document.body && f.focus ? f : f?.id && document.getElementById(f.id)  // a header button re-rendered meanwhile: its new copy
    || f?.dataset?.sheet && $(`main [data-sheet="${f.dataset.sheet}"]`) || $('#q') || $('main [data-pal]');  // the home page's «Elegir ruta y capítulo» is «Cambiar» once picked; its search field stands for #q
  back?.focus();
}

/* ---------------- sheet (context on phone, «Más») ---------------- */
let sheetKind = null, keepSheet = false;
function openSheet(kind) {
  sheetKind = kind;
  $('#sheet-t').textContent = t(kind === 'ctx' ? 'Ruta y capítulo' : 'Todas las secciones');
  $('#sheet-body').innerHTML = kind === 'ctx' ? ctxSheet() : sectionIndex(parseHash(location.hash).sec, true);
  modalShow($('#sheet'));
  $('#ctx-btn')?.setAttribute('aria-expanded', String(kind === 'ctx'));
  $('#sheet .x').focus();
  if (kind === 'ctx') $('#sheet-body .chaps button.on')?.scrollIntoView?.({ block: 'center' });  // a long route list opens at the current chapter
}
const closeSheet = (dismiss = false) => modalHide($('#sheet'), dismiss);

/* ---------------- search palette ---------------- */
let palSel = 0, palItems = [];
function openPal(text = '') {
  const q = $('#pal-q');
  modalShow($('#pal')); closeSheet(); q.value = text; q.focus(); palRender();  // shown first: the sheet's history entry carries over
}
const closePal = (dismiss = false) => modalHide($('#pal'), dismiss);
/** go to `href` from inside the sheet or the search: pop their history entry first, then navigate (popstate below) */
const modalLeave = href => { if (modalPushed && history.state?.fwModal) { modalGo = href; history.back(); } else { closeSheet(); closePal(); location.hash = href; } };
/** results as a listbox: one group per kind, options out of the tab order (arrows move, Enter opens) */
function palHtml(items, q) {
  if (!items.length) return `<p class="mut sr-empty">${t(String(q).trim() ? 'Sin resultados.' : 'Nombre en español, inglés o japonés.')}</p>`;
  const recent = !String(q).trim();
  let html = '', g = null, gi = -1;
  items.forEach((r, i) => {
    const grp = recent ? 'Recientes' : r.group;
    if (grp !== g) { html += `${g === null ? '' : '</div>'}<div role="group" aria-labelledby="sr-g${++gi}"><div class="sr-g" id="sr-g${gi}">${esc(t(grp))}</div>`; g = grp; }
    html += `<a class="sr${i === 0 ? ' on' : ''}" href="${esc(r.href)}" role="option" id="sr-${i}" aria-selected="${i === 0}" tabindex="-1" data-i="${i}">` +
      (r.icon ? `<img src="${esc(r.icon)}" alt="" loading="lazy">` : `<i aria-hidden="true">${esc(t(r.group)[0])}</i>`) +
      `<span><b>${esc(r.label)}</b>${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</span></a>`;
  });
  return `<div role="listbox" id="pal-lb" aria-label="${t('Resultados')}">${html}</div></div>`;
}
let palSay;
function palRender() {
  const q = $('#pal-q').value;
  palItems = search(q, 40); palSel = 0;
  $('#pal-res').innerHTML = palHtml(palItems, q);
  const pq = $('#pal-q');
  pq.setAttribute('aria-expanded', String(palItems.length > 0));
  if (palItems.length) pq.setAttribute('aria-controls', 'pal-lb'); else pq.removeAttribute('aria-controls');  // no listbox to point at
  palActive();
  clearTimeout(palSay);
  if (q.trim()) palSay = setTimeout(() => announce(palItems.length ? plural(palItems.length, 'resultado') : t('Sin resultados')), 600);
}
const palActive = () => { const q = $('#pal-q'); if (palItems.length) q.setAttribute('aria-activedescendant', 'sr-' + palSel); else q.removeAttribute('aria-activedescendant'); };
function palMove(d) {
  if (!palItems.length) return;
  const els = document.querySelectorAll('#pal-res .sr');
  els[palSel].classList.remove('on'); els[palSel].setAttribute('aria-selected', 'false');
  palSel = (palSel + d + palItems.length) % palItems.length;
  els[palSel].classList.add('on'); els[palSel].setAttribute('aria-selected', 'true');
  els[palSel].scrollIntoView({ block: 'nearest' });
  palActive();
}
function palGo(i) { const r = palItems[i]; if (!r) return; recents.push(r.href); modalLeave(r.href); }

/** polite announcement in the live region (page changes, result counts) */
function announce(t) { const l = $('#live'); if (!l) return; l.textContent = ''; setTimeout(() => { l.textContent = t; }, 60); }

/* ---------------- tabs (ficha() in core.js): one panel visible, ?sec= in the address, last one remembered ---------------- */
function selectTab(btn, focus) {
  const list = btn.closest('[role="tablist"]');
  list.querySelectorAll('[role="tab"]').forEach(b => {
    const on = b === btn, p = document.getElementById(b.getAttribute('aria-controls'));
    b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
    if (p) p.hidden = !on;
  });
  const id = btn.id.replace(/^tab-/, ''), { sec, qs } = parseHash(location.hash);
  tabRemember(ROUTES[sec] ?? sec, id);
  history.replaceState(history.state, '', qsHref(location.hash.replace(/^#\/?/, '').split('?')[0], qs, { sec: id, ir: '' }));
  if (focus) btn.focus();
  const p = document.getElementById(btn.getAttribute('aria-controls')), under = list.getBoundingClientRect().bottom;
  if (p && p.getBoundingClientRect().top < under) window.scrollBy(0, p.getBoundingClientRect().top - under - 8);  // panel start under the sticky tab row
}
/** an element inside a hidden tab panel: open that tab first */
function revealTab(el) {
  const p = el?.closest?.('[role="tabpanel"]');
  if (p?.hidden) { const b = document.getElementById(p.getAttribute('aria-labelledby')); if (b) selectTab(b, false); }
}
/* ---------------- folds: every <details> becomes a box whose header toggles it, with a small chevron button top right ---------------- */
let foldN = 0;
/** the button says what it folds: «Plegar: <title>» / «Desplegar: <title>» (the title is kept in data-t) */
const foldSay = (b, open) => { b.setAttribute('aria-expanded', String(open)); b.setAttribute('aria-label', `${t(open ? 'Plegar' : 'Desplegar')}${b.dataset.t ? ': ' + b.dataset.t : ''}`); };
/** <details><summary>X</summary>…</details> → <div class="fold"><div class="fold-h">X<button class="fold-b" aria-expanded aria-controls aria-label></div><div class="fold-p">…</div></div> */
function foldify(root) {
  root.querySelectorAll('details').forEach(d => {
    const box = document.createElement('div'), head = document.createElement('div'), btn = document.createElement('button'), panel = document.createElement('div');
    const sum = [...d.children].find(x => x.tagName === 'SUMMARY'), open = d.open;
    box.className = ('fold ' + d.className).trim(); if (d.id) box.id = d.id;
    head.className = 'fold-h'; head.innerHTML = `<span class="fold-t">${sum ? sum.innerHTML : ''}</span>`; sum?.remove();
    panel.className = 'fold-p'; panel.id = 'fold-' + (++foldN); panel.hidden = !open; panel.append(...d.childNodes);
    btn.type = 'button'; btn.className = 'fold-b'; btn.setAttribute('aria-controls', panel.id); btn.innerHTML = '<i class="fold-i" aria-hidden="true"></i>';
    btn.dataset.t = head.textContent.replace(/\s+/g, ' ').trim(); foldSay(btn, open);
    head.append(btn); box.append(head, panel); d.replaceWith(box);
  });
}
const foldToggle = (b, open = b.getAttribute('aria-expanded') !== 'true') => { const p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = !open; foldSay(b, open); };
/** an element inside folded panels (a deep link): open them */
const revealFold = el => { for (let p = el?.closest?.('.fold-p[hidden]'); p; p = p.parentElement?.closest('.fold-p[hidden]')) { const b = document.querySelector(`[aria-controls="${p.id}"]`); if (b) foldToggle(b, true); } };
const focusH1 = () => { const h = $('#main h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } return h; };

/* ---------------- render ---------------- */
const PLACEHOLDER = notFound();  // as loaded; render() builds notFound() again, in the reader's language
/* a picture that fails (a dropped connection on a busy local server, the cache-first service worker passing the failure on) is asked
   for once more; if it fails again it is left blank, the frame keeps its placeholder colour instead of the broken-image icon */
document.addEventListener('error', e => {
  const i = e.target;
  if (i?.tagName !== 'IMG' || !i.getAttribute('src')) return;
  if (!i.dataset.retry) { i.dataset.retry = '1'; const src = i.getAttribute('src'); setTimeout(() => { if (i.isConnected) i.src = src; }, 500); } else i.removeAttribute('src');
}, true);
let lastPath = null, lastCount = null;
function render(keepScroll) {
  const old = legacyHash(location.hash);  // old bookmarks and links (core.js: OLD_ADDR)
  if (old) { history.replaceState(history.state, '', old); return render(keepScroll); }
  const { sec, id, qs } = parseHash(location.hash);
  const path = sec + '/' + id, first = lastPath === null, samePage = path === lastPath;
  lastPath = path;
  const was = document.activeElement?.closest?.('main') ? document.activeElement.getAttribute('href') : null;
  const fn = P[ROUTES[sec] ?? sec];  // viewing a chapter never changes the context: only the header's selector does
  let html = notFound();
  if (fn) try { html = mineTabs(ROUTES[sec] ?? sec) + autoLink(fn(id, qs, sec), id ? href(sec, id) : ''); } catch (e) { console.error(e); html = `<h1>${t('No se pudo mostrar la página')}</h1><p><a href="#/">${t('Ir a la portada')}</a></p>`; }
  const ir = qs.ir;
  const typing = document.activeElement?.closest?.('main') && document.activeElement.dataset.qs != null ? document.activeElement.name : null;
  const main = $('#main');
  main.innerHTML = html; main.removeAttribute('aria-busy'); foldify(main);
  document.title = docTitle(html);
  staticText();
  const f = typing && $(`main [data-qs][name="${typing}"]`);  // a filter field being typed in keeps focus across re-renders
  if (f) { f.focus(); f.setSelectionRange?.(f.value.length, f.value.length); }
  $('#ctx').innerHTML = ctxControls();
  const now = parseHash(location.hash).sec;  // the section shown, after any alias redirect
  rememberPartida(location.hash);
  $('#side').innerHTML = sectionIndex(now);
  $('#side .on')?.scrollIntoView?.({ block: 'center' });  // the current page in view in a long sidebar (centre: clear of the sticky search and footer)
  $('#tabbar').innerHTML = tabbar(now);
  // a route picked in the sheet keeps it open (refreshed); anything else closes the modals
  if (keepSheet && sheetKind === 'ctx' && !$('#sheet').hidden) { $('#sheet-body').innerHTML = ctxSheet(); $('#sheet-body [data-route].on')?.focus(); } else closeSheet();
  keepSheet = false;
  closePal();
  const irNow = parseHash(location.hash).qs.ir || ir;  // a page may have moved the address (old #/equipo?sec=semana → #/semana)
  const to = irNow && document.getElementById(irNow);  // ?ir=<id>: deep link to a section (its tab and folds open first)
  if (keepScroll !== true) {
    window.scrollTo(0, history.state?.y > 0 ? history.state.y : 0);  // back/forward (and reload) land where the page was left; a new page at the top
    // after a navigation the focus goes to the new page title, or to the ?ir= section (a filter change on the same page keeps it on the chip just used)
    if (!first && !f) {
      const again = samePage && was && [...document.querySelectorAll('main [href]')].find(a => a.getAttribute('href') === was);
      if (again) again.focus({ preventScroll: true });
      else if ((to || !focusH1()) && !samePage) announce(document.title.replace(/ · Fortune's Weave$/, ''));  // a focused h1 already says the title
    }
  }
  if (to) {
    revealTab(to); revealFold(to); if (to.classList.contains('fold')) { const b = to.querySelector(':scope > .fold-h .fold-b'); if (b) foldToggle(b, true); }
    to.scrollIntoView();
    if (!first && keepScroll !== true && !f) { if (!to.matches('a,button,input,select,textarea,[tabindex]')) to.tabIndex = -1; to.focus({ preventScroll: true }); }
  }
  const cnt = $('#main [data-count]')?.textContent || null;  // a filter changed the listing: say how many results are left
  if (samePage && !first && cnt && cnt !== lastCount) announce(cnt);
  lastCount = cnt;
}

window.onhashchange = () => { clearTimeout(qsTimer); clearTimeout(scrollTimer); render(); };
if (typeof window.addEventListener === 'function') window.addEventListener('popstate', () => {
  if (modalGo != null) { const h = modalGo; modalGo = null; modalPushed = false; closeSheet(); closePal(); if (location.hash !== h) location.hash = h; return; }
  if (modalPushed) { modalPushed = false; closeSheet(); closePal(); }
});
/* scroll memory: the position rides in the history entry (history.state.y), saved when scrolling stops and before following a link */
let scrollTimer;
const saveScroll = () => { try { history.replaceState({ ...history.state, y: Math.round(window.scrollY) }, ''); } catch (e) { /* Safari caps replaceState calls */ } };
document.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(saveScroll, 200); }, { passive: true });
document.addEventListener('click', e => { if (e.target.closest?.('a[href^="#"]')) { clearTimeout(scrollTimer); saveScroll(); } }, true);
// after pages/*.js have registered: the sequential loader of index.html says so with «wiki:ready»
document.addEventListener('wiki:ready', () => render());
document.addEventListener('change', e => {
  if (e.target.dataset.qs != null) location.hash = qsHref(e.target.dataset.qs, parseHash(location.hash).qs, { [e.target.name]: e.target.value });  // listing filter controls: <select|input data-qs="path" name="param">
});
document.addEventListener('click', e => {
  const sa = e.target.closest('#sheet a[href^="#"]');
  if (sa && !e.defaultPrevented && !e.ctrlKey && !e.metaKey) { e.preventDefault(); modalLeave(sa.getAttribute('href')); }  // «Más»: also a link to the page already shown
  const fh = e.target.closest('.fold-h');  // the whole header of a fold toggles it (its links and buttons keep their own job)
  if (fh && !e.target.closest('a,button,input,select,textarea,label')) { fh.querySelector('.fold-b')?.click(); return; }
  const nb = e.target.closest('.nav-tb,.nav-mb');  // sidebar folds: a topic's guides, the Mi partida footer (remembered)
  if (nb) {
    const open = nb.getAttribute('aria-expanded') !== 'true', p = document.getElementById(nb.getAttribute('aria-controls'));
    nb.setAttribute('aria-expanded', String(open)); if (p) p.hidden = !open;
    if (nb.classList.contains('nav-mb')) store.set('navMine', open);
    return;
  }
  const fb = e.target.closest('.fold-b');
  if (fb && fb.dataset.eqFold == null) { foldToggle(fb); return; }  // the team selector fold is stored in ctx: equipo.js handles it
  const el = e.target.closest('[data-sheet],[data-pal],[data-route],[data-key],[data-close],[data-to],[data-more],[role="tab"],.sr');
  if (!el) { if (e.target.id === 'sheet') closeSheet(true); else if (e.target.id === 'pal') closePal(true); return; }
  if (el.dataset.sheet) openSheet(el.dataset.sheet);
  else if (el.dataset.pal != null) openPal();
  else if (el.dataset.route) { keepSheet = true; pickRoute(el.dataset.route); }
  else if (el.dataset.key) {
    const inPage = el.closest('main');
    pickChapter(el.dataset.key);
    if (inPage) { focusH1(); announce(`${t('Tu partida')}: ${capShort(CAPS[el.dataset.key])}`); }  // «Usar como mi capítulo» (capitulo.js) went away with the redraw
  }
  else if (el.dataset.close != null) { closeSheet(true); closePal(true); }
  else if (el.dataset.more) {  // listing «Mostrar más»: reveal the next batch of hidden cards in the grid before the button
    const rest = [...(el.previousElementSibling?.querySelectorAll('[hidden]') || [])];
    const shown = rest.slice(0, +el.dataset.more);
    shown.forEach(el => { el.hidden = false; });
    if (rest.length <= +el.dataset.more) { (shown[0]?.matches('a,button') ? shown[0] : shown[0]?.querySelector('a,button'))?.focus(); el.remove(); }  // the button goes: focus the first new card
    announce(t('{n} más', { n: shown.length }));
  }
  else if (el.getAttribute('role') === 'tab') selectTab(el, true);
  else if (el.dataset.to) {  // in-page jumps (skip link, «Partes»): never touch the hash router
    e.preventDefault();
    const to = document.getElementById(el.dataset.to);
    if (to) { revealTab(to); revealFold(to); to.scrollIntoView(); if (to.id === 'main') focusH1() || to.focus(); }
  }
  else if (el.classList.contains('sr')) { e.preventDefault(); palGo(+el.dataset.i); }
});
/* language switch (header ES/EN button, Ajustes): data-lang="es|en" */
document.addEventListener('click', e => {
  const b = e.target.closest?.('[data-lang]');
  if (!b) return;
  setLang(b.dataset.lang);
  (document.getElementById(b.id) || document.querySelector(`[data-lang="${b.dataset.lang}"]`) || document.getElementById('lang-es'))?.focus();  // redrawn: the new copy
  announce(isEn() ? 'English' : 'Español');  // i18n-ignore
});
/** index.html's fixed text (skip link, landmarks, dialogs, search box) in the reader's language; render() calls it */
const STATIC_TEXT = [['.skip', null, 'Ir al contenido'], ['.brand', 'aria-label', "Fortune's Weave · Inicio"], ['.brand', 'title', 'Inicio'],
  ['#side', 'aria-label', 'Secciones'], ['#tabbar', 'aria-label', 'Accesos rápidos'], ['#sheet .x', 'aria-label', 'Cerrar'],
  ['.pal-box', 'aria-label', 'Buscar en la wiki'], ['#pal-q', 'placeholder', 'Secciones, personajes, objetos, lugares…'], ['#pal-q', 'aria-label', 'Buscar'],
  ['#pal .k-coarse', null, 'Cancelar']];
function staticText() {
  for (const [sel, attr, es] of STATIC_TEXT) {
    const el = $(sel); if (!el) continue;
    if (attr) el.setAttribute(attr, t(es)); else el.textContent = t(es);
  }
  document.documentElement.lang = LANG;
}
/* stat header tooltips: fixed-positioned under the header, so a table's scroll box never clips them */
const tipAt = e => { const ab = e.target.closest?.('.st-ab'); if (!ab) return; document.documentElement.classList.remove('tip-off'); const r = ab.getBoundingClientRect(), t = ab.nextElementSibling;
  if (t) { t.style.left = Math.max(8, Math.min(r.left, innerWidth - 248)) + 'px'; t.style.top = r.bottom + 6 + 'px'; } };
document.addEventListener('mouseover', tipAt);
document.addEventListener('focus', tipAt, true);
document.addEventListener('scroll', () => document.documentElement.classList.add('tip-off'), { passive: true, capture: true });  // a fixed tooltip would drift
let qsTimer;
document.addEventListener('input', e => {
  if (e.target.id === 'pal-q') palRender();
  else if (e.target.dataset.qs != null && e.target.type === 'search') {  // filter as you type; render() puts focus back in the field
    clearTimeout(qsTimer);
    const t = e.target;
    const at = location.hash;
    qsTimer = setTimeout(() => {  // the page may have changed meanwhile: a late timer must never pull the user back
      if (!t.isConnected || location.hash !== at) return;
      const h = qsHref(t.dataset.qs, parseHash(location.hash).qs, { [t.name]: t.value });
      if (h !== location.hash) location.hash = h;
    }, 350);
  }
});
document.addEventListener('keydown', e => {
  const palOpen = !$('#pal').hidden, typing = /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palOpen ? closePal(true) : openPal(); }
  else if (e.key === '/' && !typing && !palOpen) { e.preventDefault(); openPal(); }
  else if (e.key === 'Escape') { document.documentElement.classList.add('tip-off'); if (palOpen) closePal(true); else closeSheet(true); }  // Esc also hides a stat tooltip
  else if (palOpen && e.key === 'ArrowDown') { e.preventDefault(); palMove(1); }
  else if (palOpen && e.key === 'ArrowUp') { e.preventDefault(); palMove(-1); }
  else if (palOpen && e.key === 'Enter' && e.target.id === 'pal-q') { e.preventDefault(); palGo(palSel); }
  else if (e.target.getAttribute?.('role') === 'tab' && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {  // tabs: arrows move and open
    const ts = [...e.target.closest('[role="tablist"]').querySelectorAll('[role="tab"]')], i = ts.indexOf(e.target);
    const j = e.key === 'Home' ? 0 : e.key === 'End' ? ts.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + ts.length) % ts.length;
    e.preventDefault(); selectTab(ts[j], true);
  }
});
