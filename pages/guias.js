/* Fortune's Weave · wiki2 · topic guides: index by topic (#/guias), a topic page (#/guias/<tema>: its guides and its listings, like
   Wikipedia's portals) and one guide (#/guia/<id>, routed through the Part 1 guide
   page in minmax.js, which keeps the bare #/guia). Data: W.guias in data.js (body is HTML).
   guiaLink(...ids) is the «Guía: …» line list pages put under their title. */
'use strict';
const GUIAS = Object.fromEntries((W.guias || []).map(g => [g.id, g]));
const TEMA_NAME = Object.fromEntries(W.temas || []);  // slug → Spanish name (which slugs exist); shown names: temaName()
/** lang="es" on a link to a guide still in Spanish (English reader) */
const langEs = g => (g?._es ? ' lang="es"' : '');
const temaName = slug => Object.fromEntries(temasL())[slug] || TEMA_NAME[slug] || slug;
/** per topic: a one or two sentence lead and its Consulta listings (MENU ids; missing ones are skipped) */
const TEMA_INFO = {
  personajes: ['Quién es cada personaje, cómo subir sus apoyos, a quién reclutar y qué regalarle.', ['personajes', 'apoyos', 'regalos']],
  combate: ['Clases, habilidades, armas y monturas, y las cuentas que hay detrás de cada golpe.', ['clases', 'habilidades', 'monturas', 'batallones', 'mecanicas']],
  economia: ['Dónde comprar, vender, refinar y recolectar, y cómo no quedarse sin oro.', ['objetos', 'tiendas', 'recoleccion']],
  mundo: ['El mapa, sus lugares y mazmorras, las misiones y las batallas.', ['mapa', 'lugares', 'mazmorras', 'misiones', 'batallas']],
  progresion: ['Cómo aprovechar cada semana en Dagsion, el Prestigio, las rutas y lo que se pierde si no se hace a tiempo.', ['instalaciones', 'dioses', 'prestigio', 'turnos', 'sendas', 'senores', 'partes23']],
  historia: ['La historia del juego y sus textos: el archivo de memorias y obeliscos, y el guion.', ['archivo', 'guion']],
  juego: ['Ficha técnica, dificultad, DLC y parches, y la ayuda del propio juego.', ['dificultad', 'tutoriales', 'glosario']],
};
/** a listing of the menu as {title, href} */
const temaListing = id => { const p = NAV.flatMap(g => g.pages).find(x => x.id === id); return p ? { title: t(p.title), href: pageHref(p) } : null; };
/** «Guía: Habilidades →» under a list page title; unknown ids are skipped */
const guiaLink = (...ids) => {
  const gs = ids.map(i => GUIAS[i]).filter(Boolean).map(guiaL);
  return gs.length ? `<p class="gu-ver">${gs.map(g => `<a href="#/guia/${g.id}"${langEs(g)}>${navIcon('book')}${t('Guía: {t}', { t: esc(g.titulo) })}</a>`).join('')}</p>` : '';
};
/** one guide page (not found when the id is unknown) */
function guiaTema(id) {
  if (!GUIAS[id]) return notFound();
  const g = guiaL(GUIAS[id]);  // English version, or the Spanish one marked _es
  const [res, ...rest] = g.secs;
  const sec = ([t, h]) => (h.length > 1600 || /^Spoilers\b/i.test(t)  // long sections and spoilers fold (shell.js foldify turns <details> into its fold pattern)
    ? `<details class="card gu-sec"><summary><h2>${t}</h2></summary>${h}</details>`
    : `<section class="card gu-sec"><h2>${t}</h2>${h}</section>`);
  const rel = (g.relacionados || []).map(r => GUIAS[r]).filter(Boolean).map(guiaL);
  const foot = (rel.length ? `<h2>${t('Relacionadas')}</h2><ul class="gu-rel">${rel.map(r => `<li><a href="#/guia/${r.id}"${langEs(r)}>${esc(r.titulo)}</a></li>`).join('')}</ul>` : '') +
    (g.enlaces?.length ? `<h2>${t('Ver también')}</h2><ul class="gu-rel">${g.enlaces.map(e => `<li><a href="${esc(e.ruta)}">${esc(g._es ? t(e.texto) : e.texto)}</a></li>`).join('')}</ul>` : '');
  const com = g.secs.some(([ti, h]) => (ti + h).includes('gu-com'));
  const sib = W.guias.filter(x => x.tema === g.tema), next = guiaL(sib[sib.findIndex(x => x.id === g.id) + 1]);
  // English reader, no English version yet: the Spanish guide under a short note (lang="es" so screen readers read it in Spanish)
  const fb = g._es ? `<p class="gu-notr">${t('Esta guía aún no está traducida; se muestra en español.')}</p>` : '';
  return `<p class="fi-eye"><a href="#/guias">${t('Guías')}</a> › <a href="#/guias/${g.tema}">${esc(temaName(g.tema))}</a></p>${fb}${g._es ? '<div lang="es">' : ''}<h1>${esc(g.titulo)}</h1><p class="gu-lead">${esc(g.resumen)}</p>` +
    `<section class="card gu-res"><h2>${res[0]}</h2>${res[1]}</section>` + rest.map(sec).join('') + (g._es ? '</div>' : '') +
    (next ? `<nav class="gu-next" aria-label="${t('Siguiente en este tema')}"><a href="#/guia/${next.id}"${langEs(next)}><small>${t('Siguiente en este tema')}</small><b>${esc(next.titulo)}</b></a></nav>` : '') +
    (foot ? `<footer class="card gu-foot">${foot}</footer>` : '') +
    (com ? `<p class="mut gu-leyenda"><span class="gu-com" aria-hidden="true"></span> ${t('dato de la comunidad, no del juego')}</p>` : '');
}
(() => {
  const guideList = gs => `<ul class="gu-list">${gs.map(guiaL).map(g => `<li><a href="#/guia/${g.id}"${langEs(g)}><b>${esc(g.titulo)}</b><small>${esc(g.resumen)}</small></a></li>`).join('')}</ul>`;
  const START = ['guia', 'builds', 'reclutas', 'trucos', 'perdibles'];
  function index() {
    const start = START.map(temaListing).filter(Boolean);
    return `<h1>${t('Guías')}</h1><p class="mut">${t('{n} guías en {m} temas.', { n: (W.guias || []).length, m: (W.temas || []).length })}</p>` +
      (start.length ? `<section class="gu-start" aria-labelledby="gu-st-t"><h2 id="gu-st-t">${t('Empieza aquí')}</h2><ul class="gu-rel">${start.map(l => `<li><a href="${l.href}">${esc(l.title)}</a></li>`).join('')}</ul></section>` : '') +
      `<nav class="chips gu-chips" aria-label="${t('Temas')}">${temasL().map(([tm, n]) => `<a class="chip" href="#/guias/${tm}">${esc(n)}</a>`).join('')}</nav>` +
      temasL().map(([tm, n]) => `<section class="gu-cat"><h2><a href="#/guias/${tm}">${esc(n)}</a></h2>${guideList(W.guias.filter(g => g.tema === tm))}</section>`).join('');
  }
  /** #/guias/<tema>: lead, its guides, its listings */
  function tema(tm) {
    if (!TEMA_NAME[tm]) return notFound();
    const [lead, ids] = TEMA_INFO[tm] || ['', []], gs = W.guias.filter(g => g.tema === tm), ls = ids.map(temaListing).filter(Boolean);
    return `<p class="fi-eye"><a href="#/guias">${t('Guías')}</a></p><h1>${esc(temaName(tm))}</h1>${lead ? `<p class="gu-lead">${esc(t(lead))}</p>` : ''}` +
      `<section class="gu-cat"><h2>${t('Guías ({n})', { n: gs.length })}</h2>${guideList(gs)}</section>` +
      (ls.length ? `<section class="gu-cat"><h2>${t('Datos y listados')}</h2><ul class="gu-rel">${ls.map(l => `<li><a href="${l.href}">${esc(l.title)}</a></li>`).join('')}</ul></section>` : '');
  }
  const CSS = `
.gu-lead { font-size: var(--fs-row); color: var(--tx2); max-width: 70ch; }
.gu-res { border-left: 3px solid var(--acc-mark); background: var(--acc-soft); }
.gu-sec h2, .gu-res h2, .gu-foot h2 { font-size: var(--fs-sec); margin: 0 0 var(--s2); }
.gu-sec, .gu-res { max-width: 78ch; }
.gu-sec p, .gu-res li, .gu-sec li { line-height: 1.55; }
.gu-com { display: inline-block; width: .55em; height: .55em; margin: 0 .15em 0 .25em; border: 1.5px solid var(--mut); border-radius: 50%; vertical-align: .1em; cursor: help; }
.gu-leyenda { font-size: var(--fs-small); }
.gu-notr { margin: 0 0 var(--s2); padding: var(--s2) var(--s3); border-left: 2px solid var(--line-strong); background: var(--surface2); color: var(--tx2); font-size: var(--fs-small); }
.gu-foot h2 { font-size: var(--fs-row); margin-top: var(--s3); }
.gu-foot h2:first-child { margin-top: 0; }
.gu-rel { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.gu-start .gu-rel { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding-bottom: 2px; }
.gu-start .gu-rel li { flex: none; }
.gu-cat h2 { font-size: var(--fs-sec); margin: var(--s5) 0 var(--s2); }
.gu-start h2 { font-size: var(--fs-sec); margin: var(--s4) 0 var(--s1); }
.gu-chips { margin: var(--s4) 0 0; }
.gu-next { max-width: 78ch; margin: var(--s3) 0; }
.gu-next a { display: flex; flex-direction: column; align-items: flex-end; min-height: var(--tap); padding: var(--s2) var(--s3); border: 1px solid var(--line); border-radius: var(--r2); background: var(--card); text-align: right; }
.gu-next a:hover { border-color: var(--line-strong); text-decoration: none; }
.gu-next small { color: var(--mut); font-size: var(--fs-small); }
.gu-next b::after { content: ' →'; }
.gu-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: var(--s2); margin: 0; padding: 0; list-style: none; }
.gu-list a { display: block; height: 100%; padding: var(--s3); background: var(--card); border: 1px solid var(--line); border-radius: var(--r2); color: var(--tx); text-decoration: none; }
.gu-list a:hover { border-color: var(--line-strong); }
.gu-list b { display: block; color: var(--acc); }
.gu-list small { display: block; margin-top: var(--s1); color: var(--mut); font-size: var(--fs-small); line-height: 1.45; }
.sr[href^="#/guia/"] { box-shadow: inset 3px 0 0 var(--acc-mark); }
.sr[href^="#/guia/"] small { white-space: normal; }`;
  register({ id: 'guias', title: 'Todas las guías', render: id => (id ? tema(id) : index()), css: CSS,
    search: () => [{ group: 'Secciones', label: 'Todas las guías', sub: 'Guías', href: '#/guias', aliases: ['guias', 'guias tematicas', 'biblioteca', 'temas', 'wiki', 'guides', 'all guides'] },
      ...(W.temas || []).map(([tm, n]) => ({ group: 'Secciones', label: temaName(tm), sub: 'Guías y listados del tema', href: '#/guias/' + tm, aliases: [n, (W.temas_en || []).find(x => x[0] === tm)?.[1]].filter(Boolean) }))] });
})();
