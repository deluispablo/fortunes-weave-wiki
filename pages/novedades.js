/* Fortune's Weave · wiki2 · Novedades (#/novedades): what each published version added, newest first. */
'use strict';
(() => {
  // one entry per publish day; es and en side by side, newest first. {page-id} becomes a link named with the title that page registers
  const LOG = [
    ['2026-11-25', [
      ['Un solo equipo: el planificador vive ahora en {equipo}. Añade unidades por su cara, completa el equipo, elige build y equipamiento, y compártelo con un enlace.', 'One team: the planner now lives in {equipo}. Add units by their face, complete the team, pick builds and equipment, and share it with a link.'],  // i18n-ignore
      ['Nuevas páginas: {mejor-equipamiento}, {comparar}, {arbol-clases}, {calculadora} y {checklist}.', 'New pages: {mejor-equipamiento}, {comparar}, {arbol-clases}, {calculadora} and {checklist}.'],  // i18n-ignore
      ['Páginas propias para cada personaje, clase, objeto, habilidad, montura y lugar, para encontrarlas desde los buscadores.', 'Pages of their own for every character, class, item, skill, mount and place, so search engines can find them.'],  // i18n-ignore
      ['Arreglos en Tiempo libre, {builds}, {mejores-armas}, {cap} y {regalos}.', 'Fixes in Free time, {builds}, {mejores-armas}, {cap} and {regalos}.'],  // i18n-ignore
      ['Barra de tier lists en todas las páginas y {tier-personajes} por ruta y para las Partes 2 y 3.', 'Tier list bar on every page, and the {tier-personajes} per route and for Parts 2 and 3.'],  // i18n-ignore
      ['Los «+N» ya no salen como armas aparte: la ficha del arma base trae su refinado y dónde se consigue cada nivel.', '"+N" weapons are no longer separate items: the base weapon page shows its refines and where to get each level.'],  // i18n-ignore
      ['Los objetos malditos llevan su icono morado.', 'Cursed items show their purple icon.'],  // i18n-ignore
      ['{mejores-armas}: tier list por tipo, ruta y parte, con ventanas de tienda, trueques y la ficha de cada arma con su tier.', '{mejores-armas}: tier list by type, route and part, with shop windows, trades and each weapon page showing its tier.'],  // i18n-ignore
      ['{builds}: catálogo por ruta, parte y capítulo, sin mezclar rutas.', '{builds}: a catalogue by route, part and chapter, without mixing routes.'],  // i18n-ignore
      ['Mi partida: {cap}, {equipo} y {armas}; Tiempo libre con recados, trueques, dinero y materiales de forja.', 'My playthrough: {cap}, {equipo} and {armas}; Free time with errands, trades, money and forging materials.'],  // i18n-ignore
    ]],
    ['2026-11-24', [
      ['Ruta de Leda: {builds} según tu equipo, tier list y guía de min-max de la Parte 1.', "Leda's route: {builds} for your team, tier list and a Part 1 min-max guide."],  // i18n-ignore
      ['Plan de fin de semana y consejos de cada capítulo.', 'Weekend plan and advice for each chapter.'],  // i18n-ignore
      ['La clase con la que se une cada recluta según su nivel, ruta y capítulo.', 'The class each recruit joins with, by level, route and chapter.'],  // i18n-ignore
      ['Primera versión pública de la wiki.', 'First public version of the wiki.'],  // i18n-ignore
    ]],
  ];
  const link = id => { const p = NAV.flatMap(g => g.pages).find(x => x.id === id); return p ? `<a href="${pageHref(p)}">${esc(t(p.title))}</a>` : esc(id); };
  const day = d => { const [y, m, dd] = d.split('-').map(Number); return `<time datetime="${d}">${dateTx(y, m, dd)}</time>`; };
  function page() {
    const en = LANG === 'en';
    return `<h1>${t('Novedades')}</h1><p class="mut">${t('Lo que trae cada versión publicada.')}</p>` +
      LOG.map(([d, items]) => `<section class="card"><h2>${day(d)}</h2><ul>${items.map(([es, e]) => `<li>${esc(en ? e : es).replace(/\{([a-z-]+)\}/g, (m, id) => link(id))}</li>`).join('')}</ul></section>`).join('');
  }
  register({ id: 'novedades', title: 'Novedades', render: () => page(),
    search: () => [{ group: 'Secciones', label: tl('Novedades'), sub: tl('Lo que trae cada versión publicada.'), href: '#/novedades', aliases: ['novedades', 'cambios', 'changelog', "what's new", 'whats new'], pre: true }] });  // i18n-ignore
})();
