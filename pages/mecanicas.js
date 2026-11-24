/* Fortune's Weave · wiki2 · Clases y combate › Tablas de combate (#/mecanicas): formulas, proficiency, EXP and levels, enemy level,
   halos and ignition. One page; each section has a readable id (#/mecanicas?ir=experiencia). Authored blocks: docHtml (core.js).
   The old positional pages #/mecanicas/hN moved to the page of their topic (core.js OLD_ADDR). */
'use strict';
(() => {
  const T = (head, rows) => ({ head, rows }), K = kv => ({ kv });
  /** data text: the game's English when it has it, else the wiki dictionary */
  const gx = s => (isEn() && s && (EN_DICT().game || {})[s] != null ? gt(s) : t(s));

  const FORMULAS = [
    ['Constitución (Con)', 'Fue ÷ 5; reduce el efecto del peso del arma en la velocidad'],
    ['Velocidad de ataque (VA)', 'Vel − máx(0, peso − Con); nunca supera la Vel'],
    ['Ataque doble', 'VA ≥ VA del rival + 4'],
    ['Golpe físico', 'Golpe del arma + Hab'],
    ['Golpe mágico', 'Golpe del hechizo + ⌊(Hab + Sue) ÷ 2⌋'],
    ['Crítico (Crí)', 'Crítico del arma + ⌊(Hab + Sue) ÷ 2⌋'],
    ['Esquiva (Esq)', 'VA'],
    ['Evitar crítico (Evit)', 'Sue'],
    ['Daño', '(Fue o Mag + Pot del arma) − (Def o Res); 0 o menos = sin daño'],
    ['Daño crítico', '×3; los multiplicadores se suman (segundo golpe de espada ×1,2 + crítico = ×3,2)'],
    ['Eficacia', '«eficaz» dobla la Pot del arma y «muy eficaz» la triplica; solo cuenta el mayor'],
    ['Espadas', 'el segundo golpe de un ataque doble hace más daño'],
    ['Hachas', 'daño mínimo 5'],
    ['Golpe real', 'por encima del 50 % mostrado la probabilidad real es mayor (75 mostrado ≈ 85 real)'],
    ['Triángulo de armas', 'no existe'],
    ['Enemigos', 'muchos llevan una penalización oculta de Crítico (de −10 a −80, distinta en cada enemigo); el Favor infernal reduce a la mitad el daño que reciben salvo de ataques eficaces (la Espada purificadora lo anula)'],
    ['Bonificaciones fijas', 'las de clase, arma y batallón comparten un tope de +10 por atributo'],
  ];
  const COMPETENCIAS = [
    ['EXP acumulada por rango', 'E 0 · E+ 20 · D 35 · D+ 80 · C 220 · C+ 440 · B 690 · B+ 910 · A 1215 · A+ 1510 · S 1960 · S+ 2560'],
    ['EXP por asalto', '1 + aptitud (+1/0/−1) + bono de clase + Ayudas, en cada asalto con al menos 1 de daño; atacar dos veces no suma más. Equitación, Coraza, Vuelo e Infantería no tienen el 1 base (un vídeo de la comunidad dice que sí lo tienen)'],
    ['Aptitud', 'competencia en dorado: +1 por asalto; en negro: 0; en azul: −1'],
    ['Bono de clase', 'cada clase suma a las competencias que entrena (se ve al cambiar de clase): Gladiador, a Espada, Hacha y Guanteletes, no a Lanza'],
    ['Mazmorras', 'las unidades montadas luchan a pie: suben Infantería, no Equitación ni Vuelo'],
    ['Ayudas de salvación', 'suman en cada combate; una prueba de la comunidad no las vio sumar en la Batalla rápida (sin confirmar)'],
    ['Batalla rápida', 'solo cuentan los primeros 15 asaltos para la EXP de competencia, de clase y de movimiento; el botón + salta 15 asaltos. Para subir sin gastar turnos: Trucos › Golpear y retirarse'],
    ['Manuales', 'manual +20, tratado +100; solo Mando, Equitación, Coraza, Vuelo, Magia negra y Magia blanca'],
  ];

  // i18n: built with the translator passed in (t to render, fill for the search index, which search.js translates itself)
  const SECTIONS = t => [
    { hid: 'experiencia', title: t('Experiencia (EXP)'), intro: [t('Cada 100 EXP la unidad sube un nivel. La EXP de un golpe o una muerte se multiplica por dos factores: la diferencia de nivel con el enemigo (luchar contra enemigos más fuertes paga mucho más) y el nivel propio (las unidades bajas aprenden más rápido). Curar no usa la diferencia de nivel: un sanador gana lo mismo cure a quien cure. Las muertes rinden más en unidades de nivel bajo frente a enemigos de nivel igual o superior; una unidad 5 niveles por encima del enemigo gana un 1 %.')],
      subs: [
        { hid: 'formula-de-exp', title: t('Fórmula de EXP'), blocks: [t('EXP = base × factor de diferencia de nivel × factor de nivel propio. Las dificultades no la cambian.'),
          T([t('Acción'), t('Diferencia de nivel'), t('Nivel propio')], [[t('Ataque'), t('sí'), t('sí')], [t('Magia de apoyo o curación'), t('no (100 %)'), t('sí')], [t('Habilidad de apoyo'), t('no'), t('sí')], [t('EXP fija'), t('no'), t('no')]]),
          t('Factor de diferencia de nivel (nivel enemigo − nivel propio, recortado entre −5 y +20): +10 % por cada nivel de ventaja del enemigo entre 0 y +20.'),
          T([t('Diferencia'), '≤ −5', '−4', '−3', '−2', '−1', '0', '+1', '+2', '+3', '+5', '+10', '+15', '≥ +20'], [['%', '1', '20', '30', '40', '50', '100', '110', '120', '130', '150', '200', '250', '300']]),
          t('Factor de nivel propio: Nv1 150 %, −5 por nivel hasta Nv11 = 100 %; Nv12 100 %; después −1 cada 2 niveles: Nv13–14 99, Nv19–20 96, Nv23–24 94, Nv29–30 91, Nv39–40 86, Nv49–50 81, Nv99 56.'),
          t('La EXP no baja por tardar turnos.'),
          K([[t('Muerte'), t('EXP base por clase del enemigo: 15 (clases de rango 0–2: Gladiador, Soldado, Cazador, Augur, Jinete de ornius), 20 (rango 3: Shido, Tirador…), 25 (rango 4), 30 (rango 5: La Hoja…), 35–45 (jefes especiales y monstruos), 10 (animales pequeños). El golpe final da más que un golpe.')],
            [t('Curación'), t('EXP fija del bastón: Curar, Antorcha, Restaurar, Laia, Escudo mágico y Muro errante 10; Recuperar, Sanar, Rescatar, Resquia, Transportar, Barrera, Emergis y Regenerar 15; Fortalecer 20.')],
            [t('Multiplicadores'), t('jefe ×2. En combates con órdenes: golpe final ×3, normal ×1, reserva ×0,5.')],
            [t('Ayuda de salvación'), t('«Exp adicional»: +10/20/30/40/50 %.')]]),
          T([t('Caso'), t('Cálculo'), t('Resultado (% de la base)')], [[t('Nv10 mata a un enemigo Nv12'), t('120 × 105 %'), t('126 %')], [t('Nv20 contra Nv20'), t('100 × 96 %'), t('96 %')], [t('Nv20 contra un jefe Nv22'), t('120 × 96 % × 2'), t('230 %')],
            [t('Nv25 contra Nv20'), t('1 × 93 %'), t('~1 %')], [t('Sacerdote Nv5 lanza Curar'), t('10 × 130 %'), t('13 EXP')], [t('Sacerdote Nv20 lanza Curar'), t('10 × 96 %'), t('9 EXP')]])] },
        { hid: 'niveles-y-crecimiento', title: t('Niveles, tablas y crecimiento'), blocks: [K([
          [t('Nivel de unidad'), t('100 EXP por nivel, Nv2–99.')],
          [t('Competencias'), t('EXP para subir a Nv2…12: 20, 15, 45, 140, 220, 250, 220, 305, 295, 450, 600.')],
          [t('Vínculo de montura'), t('20, 30, 40 y 50 para Nv2–5.')],
          [t('Nivel de referencia por rango de clase'), t('Inicial 5, Intermedia 20, Avanzada 35, Suprema 45 (lo usa el autocrecimiento).')],
          [t('Reclutas no reclutados'), t('suben solos con el 80 % de su crecimiento personal, con un nivel menos. Nivel al unirse en la Parte 2: 35; en la Parte 3: 40; saltar la Parte 2 suma 5 niveles.')],
          [t('Turnos de mapa'), t('base 5 ×1 y EXP de clase 1 por turno.')],
          [t('Miasma'), t('daño 100, EXP base 20, ×150 %.')],
          [t('Mínimo por subida'), t('en las Partes 1 y 2 cada nivel sube al menos 2 atributos (hasta 4 tiradas y luego relleno); en la Parte 3 no hay mínimo. Conviene subir en las Partes 1 y 2 a las unidades de crecimiento bajo.')],
          [t('Topes'), t('mín(tope personal, tope de clase) + modificador plano de la clase actual; mejoras +10 como máximo; nivel máximo 99.')],
          [t('Crecimiento'), t('personal + modificador de clase + montura + habilidades (mínimo 0; por encima del 100 % da 1 punto seguro más una tirada).')]])] },
      ] },
    { hid: 'nivel-de-los-enemigos', title: t('Nivel de los enemigos'), intro: [t('El nivel enemigo de cada capítulo sale del ejército: subir mucho a pocas unidades sube a todos los enemigos. Conviene repartir la EXP.')],
      subs: [{ hid: '', title: '', blocks: [K([
        [t('Base'), t('media truncada de los 10 aliados de mayor nivel (despliegue y reserva), limitada al rango del capítulo; se calcula al empezar el capítulo.')],
        [t('Por tipo'), t('enemigos normales +2, oficiales +3, jefes +5.')],
        ...ROUTE_IDS.map(r => [t('Rango, ruta de {r}', { r: ROUTE_NAME[r] }), t('Parte 1, caps. 1–12: {l}.', { l: Object.values(CAPS).filter(c => c.route === r && c.part === 1 && c.level)
          .sort((x, y) => x.n - y.n).map(c => (c.level[0] === c.level[1] ? c.level[0] : c.level.join('–'))).join(', ') })]),
        [t('Partes 2 y 3'), t('Parte 2: de 30–35 a 35–45; Parte 3: de 35–40 a 50–60; la batalla final no tiene límite.')],
        [t('Encuentros en el mapa (Parte 1)'), t('base +1, limitada al rango de la región.')]])] }] },
  ];

  /** halos: innate activation skills of some characters, folded */
  function halos() {
    const H = Object.entries((window.WIKI_EXT || {}).detalle?.halos || {});
    return H.length ? `<section class="card" id="halos"><details><summary>${t('Halos')}</summary>${ul(H.map(([sid, h]) => li(L('habilidad', sid, h.es),
      `${esc(gx(h.desc))} · ${list(h.who.map(w => (CHARS[w] ? L('personaje', w) : esc(gt(w)))))}`)))}</details></section>` : '';
  }
  /** ignition types, the burst table and the lords that have it (W.ignicion), folded */
  function ignicion() {
    const I = (window.WIKI_EXT || {}).ignicion;
    if (!I) return '';
    const R = I.rafaga, pv = [100, ...R.pv_max_tras_rafaga];
    return `<section class="card" id="ignicion"><details><summary>${t('Ignición y ráfaga')}</summary>` +
      kvRows(Object.values(I.tipos).map(ty => [gx(ty.es), esc(gx(ty.ayuda))])) +
      `<h4>${t('Ráfaga (Inframundo)')}</h4><div class="tw"><table><tr><th>${t('Ráfagas')}</th>${pv.map((_, i) => `<th>${i}</th>`).join('')}</tr><tr><th>${t('PV máx.')}</th>${pv.map(v => `<td>${pct(v)}</td>`).join('')}</tr></table></div>` +
      `<p>${t('Cada ráfaga resta {n} puntos a los PV máx.; como mucho {m} ráfagas.', { n: R.reduccion_por_rafaga, m: R.max_rafagas })}</p>` +
      `<h4>${t('Señores con ignición')}</h4>${ul(I.senores.map(x => li(CHARS[x.pid] ? `<a href="${href('personaje', x.pid)}?sec=build">${esc(nm(CHARS[x.pid]))}</a>` : esc(gx(x.es)), `${esc(gx(x.tipo_es))} · ${t('{n} técnicas', { n: x.tecnicas.length })}`)))}` +
      `<p class="mut">${t('{n} tesoros malditos (los marca su ficha de objeto).', { n: I.malditos.length })} ${t('<a href="#/guia/ignicion">Guía: Ignición</a> · <a href="#/guia/objetos-malditos">Guía: Tesoros malditos</a>.')}</p></details></section>`;  // i18n-ignore (link text inside the t() key above)
  }
  const section = s => card(s.title, docHtml(...s.intro) + s.subs.map(x => (x.hid ? `<h4 id="${x.hid}">${esc(x.title)}</h4>` : '') + docHtml(...x.blocks)).join(''), s.hid);
  function mecanicas(id) {
    if (id) return notFound();
    return `<h1>${t('Tablas de combate')}</h1>${guiaLink('combate', 'crecimientos')}` + card(t('Combate'), kvRows(FORMULAS.map(([k, v]) => [t(k), esc(t(v))])), 'formulas') +
      card(t('Competencias'), kvRows(COMPETENCIAS.map(([k, v]) => [t(k), esc(t(v))])), 'competencias') + SECTIONS(t).map(section).join('') + halos() + ignicion();
  }

  const S = (label, sub, h, aliases) => ({ group: 'Mecánicas', label, sub, href: h, aliases });
  register({ id: 'mecanicas', title: 'Tablas de combate', render: id => mecanicas(id),
    search: () => [S('Tablas de combate', 'Fórmulas de golpe, crítico, daño y velocidad', '#/mecanicas', ['formulas', 'formulas de combate']),  // i18n-ignore (search.js translates labels; aliases stay Spanish)
      ...SECTIONS(fill).flatMap(s => [s, ...s.subs.filter(x => x.hid)]).map(x => S(x.title, 'Tablas de combate', '#/mecanicas?ir=' + x.hid))] });
})();
