/* Fortune's Weave · wiki2 · Sistemas group (instalaciones, dioses, prestigio, turnos, sendas + ayudas, partes 2 y 3, dificultad, glosario,
   tutoriales) and the Clases y combate page Batallones (#/batallones, #/batallon/<id>). Each section is a card with a readable id
   (#/instalaciones?ir=plaza-de-armas); authored blocks use docHtml (core.js). Text: t() for wiki text, gx() for data text. */
'use strict';
(() => {
  const X = window.WIKI_EXT || {}, G = X.guerra || {}, FA = (W.mech || {}).facilities || {};
  const WD = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const wd = i => t(WD[i % 7]);
  const ymd = s => fechaDiaAno(s), md = s => fechaMD(s);
  const SK = { 剣: 'Espada', 槍: 'Lanza', 斧: 'Hacha', 弓: 'Arco', 格闘: 'Guanteletes', 黒魔: 'Magia negra', 白魔: 'Magia blanca', 歩兵: 'Infantería', 騎兵: 'Equitación', 重装: 'Coraza', 飛行: 'Vuelo', 指揮: 'Mando' };
  /** data text: the game's English when it has it, else the wiki dictionary (i18n/en/data-*.json) */
  const gx = s => (isEn() && s && (EN_DICT().game || {})[s] != null ? gt(s) : t(s));
  /** translated table headers / key-value rows (keys are Spanish t() keys; values are HTML the caller built) */
  const H = a => a.map(h => t(h));
  const kv = rows => kvRows(rows.map(r => (r ? [t(r[0]), r[1]] : r)));
  /** a stat key as the data has it (Fue, Hab…) → the game's short name in the reader's language */
  const ST = Object.fromEntries(Object.entries(STAT_ES).map(([k, v]) => [v, k]));
  const stn = k => (ST[k] ? statName(ST[k]) : gx(k));
  /** table from a header and rows of HTML cells */
  const tw = (head, rows) => (rows.length ? `<div class="tw"><table><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c ?? ''}</td>`).join('')}</tr>`).join('')}</table></div>` : '');
  const obj = (i, n) => (i ? `${n > 1 ? n + '× ' : ''}${L('objeto', i.id, i.es)}` : '');
  const objs = a => list((a || []).map(i => obj(i, i.n)));
  const tabs = (base, cur, opts) => `<nav class="tabs" aria-label="${t('Apartados')}">${opts.map(([k, lb]) => `<a href="#/${base}?t=${k}"${cur === k ? ' class="on" aria-current="page"' : ''}>${esc(t(lb))}</a>`).join('')}</nav>`;
  /** official tutorial text (game text) as a card */
  const tut = n => { const u = (G.tutorials || {})[n]; return u && u.p.length ? card(u.t ? gx(u.t) : t('Tutorial del juego'), u.p.map(x => `<p>${esc(gx(x))}</p>`).join('')) : ''; };
  const p = s => `<p>${s}</p>`;
  const TEACHER = { PID_カストール: 'Castor' };  // not a playable character, so not in CHARS
  const FW = s => String(s).replace(/[０-９]/g, d => String.fromCharCode(d.charCodeAt(0) - 0xFEE0));
  /** lesson reward: an item, or gold stored as a pseudo item («IID_８０００Ｇ») */
  const reward = r => (!r ? '' : r.es ? L('objeto', r.id, r.es) : /Ｇ$/.test(r.id) ? gold(FW(r.id).replace(/\D/g, '')) : '');
  /** «a, b y c» in the reader's language */
  const andList = a => (a.length > 1 ? `${a.slice(0, -1).join(', ')} ${t('y')} ${a[a.length - 1]}` : a[0] || '');

  /** theatre plays as acted: each scene's role and the emotions it asks for (W.extras teatro), folded */
  function roles() {
    const T = X.extras?.teatro || [];
    const emo = k => (k === 'Valor' && isEn() ? t('Valor (emoción)') : t(k));  // «Valor» elsewhere is Value; the emotion is Courage
    const bars = e => Object.entries(e).map(([k, v]) => `<span class="tt-e">${esc(emo(k))} <span class="tt-bar" style="--v:${+v}%"></span> ${+v}</span>`).join('');
    return T.length ? `<details><summary>${t('Papeles y emociones de cada obra')}</summary>${T.map(o => `<h4>${esc(gx(o.es))}</h4>` +
      tw(H(['Escena', 'Papel', 'Emociones']), o.escenas.map(e => [esc(gx(e.situacion)), esc(gx(e.papel)), bars(e.emociones)]))).join('')}</details>` : '';
  }
  /** Dagsion tavern drinks (W.tiendas bebidas): paid with ingredients, stock refills every chapter */
  function drinks() {
    const B = X.tiendas?.bebidas || [];
    return B.length ? card(t('Taberna · Bebidas (ruta de Leda)'), tw(H(['Bebida', 'Efecto', 'Se paga con', 'Existencias', 'Condición']), B.map(b =>
      [L('objeto', b.iid, b.es), esc(gx(b.efecto)), list([...b.pago.map(([i, es, n]) => `${n}× ${L('objeto', i, es)}`), b.oro ? gold(b.oro) : '']), t('{n} (+{m} por capítulo)', { n: b.existencias, m: b.reposicion }), esc(list(b.condiciones.map(gx))) || '—'])) +
      p(t('Ruta de Leda; en la Parte 3, para todo el ejército si Leda está en él. El efecto dura hasta el final de la batalla. Las que tienen condición se desbloquean con las misiones de la taberna: <a href="#/senores?ir=leda">Sistemas de Leda</a>.')) + guiaLink('bebidas-leda'), 'bebidas') : '';  // i18n-ignore
  }

  /* ================= Instalaciones ================= */
  function instalaciones() {
    const tr = FA.training || {}, meals = (FA.meals || {}).dishes || [], th = FA.thermae || {};
    const spans = blocks => blocks.map(b => b.split('～').map(Number)).reduce((a, [x, y]) => (a.length && a[a.length - 1][1] === x ? (a[a.length - 1][1] = y, a) : [...a, [x, y]]), [])
      .map(([x, y]) => `${x}:00–${y}:00`).join(` ${t('y')} `);  // 6～12, 12～18 → 6:00–18:00
    const weeks = [0, 1, 2, 3, 4];
    const train = tw([...H(['Opción', 'Competencias (+10 base)', 'Coste']), ...weeks.map(i => t('Sem. {n}', { n: i + 1 }))], (tr.options || []).map(o =>
      [esc(nm(o)), esc(Object.keys(o.exp).map(k => gx(SK[k] || k)).join(', ')), `${gold(o.cost)}${o.part.includes('3部') ? ` (${t('Parte {p}', { p: 3 })})` : ''}`,
        ...weeks.map(i => (o.schedule_bits >> i & 1 ? '✓' : '<span class="mut">—</span>'))]));
    const fav = name => Object.values(CHARS).filter(c => (c.relations?.dish_fav || []).some(f => f.es === name)).map(c => L('personaje', c.id)).join(', ');
    const meal = tw(H(['Plato', 'Material', 'Sabor', 'Prestigio', 'Carta', 'Plato favorito de']), meals.map(x =>
      [img(ico().meal?.[x.id], 'ico') + esc(nm(x)), esc(gx(x.material)), esc(gx(x.taste)), x.renown_rank, Math.log2(x.menu_bit) + 1, fav(x.es)]));
    const therm = tw(H(['Baño', 'Prestigio', 'Grupo', 'Habilidades posibles']), (th.springs || []).map(s =>
      [esc(nm(s)), s.renown_rank, s.normal_set_bit ? t('normal {n}', { n: s.normal_set_bit }) : t('especial {n}', { n: s.special_set_bit }), list(s.skills.map(k => L('habilidad', k.id, k.es)))]));
    const fans = {};  // play → fans, from the weekly schedule of the chapters
    Object.values(CAPS).forEach(c => (c.weeks || []).forEach(w => (w.plays || []).forEach(pl => { fans[pl.es] ??= pl.fans || []; })));
    const plays = tw(H(['Obra', 'Género', 'En cartel (Parte 1)', 'Le gusta a']), ((W.chapters || {}).plays || []).map(pl =>
      [esc(gx(pl.es)), esc(gx(pl.genre)), `${ymd(pl.start)} – ${ymd(pl.end)}`, pl.index >= 9 ? t('todos los personajes') : list((fans[pl.es] || []).map(id => L('personaje', id)))]));
    const lessons = tw(H(['Lección', 'Profesor', 'Prestigio', 'Recompensa']), (FA.lessons_cai || []).map(l =>
      [l.subquest && QUEST[l.subquest] ? `${L('mision', l.subquest)} <small class="mut">${t('misión')}</small>` : esc(nm(l)), L('personaje', l.teacher, CHARS[l.teacher]?.es || TEACHER[l.teacher]), l.renown_rank,
        list([reward(l.reward), l.class_unlock && CLASSES['JID_' + l.class_unlock.replace('共有_兵種解放_', '')] ? t('clase {c}', { c: L('clase', 'JID_' + l.class_unlock.replace('共有_兵種解放_', '')) }) : ''])]));
    const lords = r => list(r.map(x => String(x).match(/^(.+)篇$/)).filter(m => m && ROUTE_OF_LORD[m[1]]).map(m => ROUTE_NAME[ROUTE_OF_LORD[m[1]]]));
    const arena = tw(H(['Fecha', 'Combate', 'Rutas']), (FA.arena_watch || []).filter(a => lords(a.routes)).map(a => [ymd(a.date), esc(String(nm(a)).replace(/\{[^}]*\}/g, '')), lords(a.routes)]));
    const HOURS = { 武器屋: 'Armería', 鍛冶屋: 'Herrería', 道具屋: 'Bazar', 市場: 'Mercado', 宿屋: 'Posada', 商会: 'Sociedad Mercantil Vandahl', 観劇: 'Teatro (ver)', 出演: 'Teatro (actuar)',
      闘技場: 'Torneo', 訓練: 'Plaza de armas', 資格試験官: 'Examinador', 手形屋: 'Licencias', 神殿: 'Templos', テルマエ: 'Termas', 止まり木: 'Percha', アンナの店: 'Tienda de Anna',
      厩舎: 'Establo', 酒場: 'Taberna', 飲み物係: 'Puesto de bebidas', 軍団兵舎: 'Cuartel' };
    const hours = tw(H(['Local', 'Abierto']), (FA.opening_hours || []).filter(h => HOURS[h.id.replace('OPH_', '')] && !(h.id === 'OPH_厩舎' && caiHide(true))).map(h =>
      [`${esc(gx(HOURS[h.id.replace('OPH_', '')]) + (h.id === 'OPH_厩舎' ? caiTag() : ''))}${h.cond.length ? ` (${condsH(h.cond)})` : ''}`, h.open.length === 4 ? t('todo el día') : spans(h.open)]));
    const v = o => o?.value;
    const mo = FA.motivation_result_bonus || {}, fo = (FA.fortune || {}).vars || {};
    return `<h1>${t('Dagsion: actividades semanales')}</h1>${guiaLink('tiempo-libre', 'comidas')}<p class="mut">${t('Se reinician cada domingo a las 0:00 y al empezar cada capítulo; lo que no se usa se pierde. Cada actividad adelanta el reloj {m} minutos y no gasta turno salvo comprar; el reloj se para al final del turno en curso, así que se pueden hacer todas en el mismo turno. El Servicio divino está en <a href="#/dioses?ir=servicio-divino">Templos</a> y el Establo en <a href="#/monturas?ir=establo">Monturas</a>.', { m: v(FA.minutes_per_activity) || 20 })}</p>` +  // i18n-ignore
      card(t('Plaza de armas'), p(t('Dos unidades entrenan juntas: suben EXP de competencias (armas, tipo de unidad, Mando) y algo de apoyo. Cada opción una vez por semana.')) + train +
        p(t('Cada semana falta una de las cinco opciones; la rotación de cinco semanas empieza el 15 jul 1449 (semana 1). Mitad de precio sábado, domingo y festivos. Cuesta 1 barra de Motivación por participante.')) +
        docHtml({ kv: [[t('EXP'), t('(10 + resultado + aptitud + pareja) × multiplicador de Prestigio (×1 / ×1,8 / ×2,5 con Prestigio 1 / 4 / 7): 25 sin bonos con Prestigio 7.')],
          [t('Bonos'), t('resultado mejor +5, bueno +2, normal 0, peor −2; aptitud fuerte +7; cada rango que saca la pareja +5 (máx. +20).')],
          [t('Apoyo por pareja'), t('5/10/10/20 (peor/normal/bueno/mejor).')]] }), 'plaza-de-armas') +
      card(t('Posada · Comida'), p(t('La mejor fuente de apoyos. Tres comensales comen un plato; cada plato una vez por semana; los invitados necesitan un regalo previo y estar en Dagsion ese capítulo. 300 G por plato, 150 G los domingos y festivos. Motivación: +2 si le gusta, +1 si le es indiferente, 0 si no.')) + meal +
        p(t('Cuatro cartas que rotan cada semana (1 → 2 → 3 → 4); la que empieza el 15 jul 1449 toca la carta 3. Los platos de Prestigio 3 solo salen con ese rango. Platos por semana: 2 con Prestigio 1–2 (3 con la carta 2, que no tiene plato de Prestigio 3) y 3 desde Prestigio 3.')), 'comidas') +
      card(t('Teatro'), plays + p(t('Una vez por semana, ver o actuar. Ver una obra desde Prestigio 7 (500 G): apoyo 60/80/100 entre los espectadores y hasta +2 de Motivación para quien le gusta la obra; las tres obras especiales gustan a todos. Actuar desde Prestigio 8, solo aliados reclutados: recompensa por resultado.')) +
        docHtml({ head: H(['Resultado', 'Normal: oro / Prestigio / apoyo', 'Especial: oro / Prestigio / apoyo', 'Caja de regalo']), rows: [[t('Peor'), '300 / 0 / 20', '500 / 0 / 20', t('normal 0 %, especial 100 %')], [t('Normal'), '500 / 10 / 30', '1000 / 10 / 30', t('normal 0 %, especial 100 %')],
          [t('Bueno'), '1000 / 10 / 40', '2000 / 10 / 40', t('normal 50 %, especial 100 %')], [t('Mejor'), '1000 / 10 / 50', '3000 / 10 / 50', pct(100)]] },
        t('Puntuación: momento lucido 70/40/20/0 por aptitud, «sin riesgo» 60; umbrales de resultado 300/180/50 (normal) y 500/300/80 (especial); 5 segundos para elegir.')) + roles(), 'teatro') +
      drinks() +
      card(t('Termas'), therm + p(t('Desde Prestigio {a}; más baños con Prestigio {b}. 500 G. Dos unidades recuperan Motivación, PV y usos de hechizos y aprenden al azar una de las 7 habilidades del baño elegido; cada una tira por separado, así que pueden salir distintas, y no sale una que ya tenga al nivel máximo. El azar va con la partida guardada: recargar y repetir el baño da lo mismo si no haces nada antes. Los baños especiales salen los domingos y festivos y dan más apoyo. Probabilidad de resultado perfecto (más apoyo: 40 en vez de 20, 60 en vez de 30 en los especiales): 10 %.', { a: th.unlock_rank || 8, b: th.more_springs_rank || 9 })), 'termas') +
      card(t('Percha · Cuervo Blanco'), p(t('Una vez por semana, mientras el Cuervo Blanco (Eshmel) está posado, eliges a qué aliado llevar y qué comida darle; no viene nadie por su cuenta. Respondes con gestos y cada respuesta correcta sube el apoyo entre Eshmel y ese aliado, nunca con el señor de la ruta. Más apoyo con Eshmel da más rescates de apoyo. No gasta turno.')) + kv([
        ['Puntos', t('0/1/2/3 aciertos = 50/70/80/100 de apoyo × afinidad; la de Eshmel es óptima (×2) con todos, así que siempre suman 100/140/160/200')],
        ['Preguntas', t('68 juegos de 10 respuestas (uno por personaje, con variantes para la Parte 3); las respuestas están en cada ficha de personaje')],
        ['Dónde', t('Menú de acceso rápido → «Percha Cuervo Blanco»; en Dagsion hay perchas en la zona central, el puerto, el barrio de los templos, la zona alta y la zona subterránea; abierta todo el día')],
        ['Rescate de apoyo', t('Alas Blancas de la Salvación (batalla normal: Eshmel se interpone ante un golpe letal) y Lanza Voladora Resplandeciente (batalla rápida: aniquila al enemigo si los PV totales bajan mucho). La probabilidad depende del apoyo con Eshmel; conviene priorizar al señor (si cae, se pierde la partida) y a las unidades de primera línea')],
        ['Logros', t('«Perfecto» y estrechar lazos 10–50 veces: 150 + 150 Esquirlas cau.')],
        ['Otras opciones', t('Previsión (consejos de la batalla principal), Reiniciar capítulo y Sala de los obeliscos')],
        ['Gestos', list((W.gestures || []).map(g => esc(nm(g))))]]), 'percha') +
      card(t('Formación (ruta de Cai)'), caiFold(lessons + p(t('Una vez cada lección, abiertas por Prestigio.'))), 'formacion') +
      card(t('Torneo: asistir'), arena + p(t('De 12:00 a 18:00 en el estadio, en la fecha indicada; las fechas son distintas en cada ruta.')), 'torneo') +
      card(t('Posada: actividades automáticas'), p(t('Gastan los turnos elegidos (en la Parte 3, todos hasta la fecha límite).')) + kv([['Buscar', t('oro y 25 % de materiales por turno')], ['Entrenar', t('EXP de clase y de competencia')],
        ['Combate', t('EXP base 5 y EXP de clase')], ['Dormir', t('{g} y 1 turno: recupera Motivación, PV y hechizos (500 G en las posadas del mapa)', { g: gold(v(FA.inn_price) || 400) })]]), 'actividades-automaticas') +
      card(t('Motivación'), kv([['Barras', t('3 por unidad. Entrenar y servir cuestan 1 por participante; con 0 no se puede entrenar')],
        ['Se recupera', t('comiendo (+2/+1), viendo una obra que le gusta (+2), en las termas, con un regalo que le gusta (+1) o durmiendo en la posada (todo)')],
        ['Orden recomendado', t('entrenar, servir, comer')],
        ['Excelente', t('+{n} al resultado', { n: v(mo['拠点_施設_やる気_判定向上_絶好調']) ?? 50 })], ['Buena', `+${v(mo['拠点_施設_やる気_判定向上_好調']) ?? 30}`],
        ['Normal', `+${v(mo['拠点_施設_やる気_判定向上_普通']) ?? 10}`], ['Baja', `+${v(mo['拠点_施設_やる気_判定向上_不調']) ?? 0}`]]) +
        p(t('Lo usado el sábado vuelve a estar disponible el domingo a las 0:00: la cuota semanal se puede gastar el sábado por la noche, esperar en Dagsion al domingo y gastarla otra vez (la Plaza de armas cuesta la mitad el sábado y el domingo; la comida, el domingo).')), 'motivacion') +
      card(t('Adivinación'), p(t('Como cliente: {g} por lectura; apoyo {a}/{b}/{c} con la adivina. Hay 64 hexagramas con un valor de 1 a 8.', { g: gold(v(fo['拠点_占い客_値段']) || 100), a: v(fo['拠点_占い客_支援_最良']) ?? 20, b: v(fo['拠点_占い客_支援_普通']) ?? 15, c: v(fo['拠点_占い客_支援_最悪']) ?? 10 })) +
        p(t('Negocio propio de adivinación (ruta de Anatolia): 6 clientes; realeza 5 %, nobleza 20 %, pueblo 75 %; pagos 400/200/100; multiplicadores de 150 a 1000.')), 'adivinacion') +
      card(t('Horario'), hours, 'horario');
  }

  /* ================= Dioses y bendiciones ================= */
  const AUD = ['マーズ神殿', 'スミルノス神殿', 'ジュラ神殿', 'カーラ神殿'];
  const SY = () => X.sistemas || {};
  const COM = () => `<span class="gu-com" title="${t('Dato de la comunidad')}"></span>`;
  const nd = o => (o ? `${num(o.n)} / ${num(o.h)}` : '');  // Normal / Difícil
  /** «Cai cap. 5; Dietrich, Theodora y Leda cap. 4» from {route: chapter} */
  const chByRoute = by => Object.entries(Object.entries(by).reduce((a, [r, c]) => ((a[c] ||= []).push(ROUTE_NAME[r]), a), {}))
    .map(([c, rs]) => `${andList(rs)} ${t('cap. {n}', { n: c })}`).join('; ');
  /** a blessing level's effect without the trailing «durante 1 turno» (every effect lasts 1 turn; the table says it once) */
  const lvl = s => gx(s).replace(/ durante 1 turno\.?$/, '').replace(/ for 1 turn\.?$/i, '');
  function dioses() {
    const gods = (FA.temple || {}).gods || [], S = SY(), B = S.blessings || [], R = S.blessing_rules || {}, sv = R.service || {}, MU = R.multiplier || [], F = S.fortuna;
    const apt = svc => Object.values(CHARS).filter(c => (c.p?.temple_service?.values || {})[svc] === 2).map(c => L('personaje', c.id)).join(', ') || '—';
    const unl = Object.fromEntries(Object.entries(S.unlocks || {}).map(([r, u]) => [r, u['Servicio divino']]).filter(([, c]) => c));
    const mlabel = m => (m.quest ? t('Parte 3, tras {q}', { q: L('mision', m.quest) }) : m.part ? t('Parte {p}', { p: 3 }) : t('Prestigio {n}', { n: `${m.renown}${m.renown === 1 ? '–5' : m.renown === 6 ? '–9' : ''}` }));
    const best = (sv.tribute || [15])[0], need3 = B.reduce((a, b) => a + b.tribute[2], 0), hard = B.reduce((a, b) => (b.tribute[2] > a ? b.tribute[2] : a), 0);
    const holy = B.map(b => `${wd(b.holy_weekday)}: ${b.god}`).join(' · ');
    const trialP1 = B.flatMap(b => b.trials.filter(tr => tr.part === 1).map(tr => ({ ...tr, god: b.god })));
    return `<h1>${t('Templos y Servicio divino')}</h1>${guiaLink('servicio-divino')}<p class="mut">${t('Seis dioses dan una Bendición que se mejora con el tributo del Servicio divino y se lanza en batalla con Arena divina. Es igual en las cuatro rutas; cambian el capítulo en que se abre el Servicio y el portal de cada ruta.')}</p>` +
      card(t('Qué son las bendiciones'), kv([
        ['Efecto', t('Mejoran a todo el ejército durante 1 turno. Se lanzan en la fase del jugador desde el menú de batalla; solo puede haber una activa por turno, así que no se combinan dioses.')],
        ['Duración', `${t('La fase en que se lanza y la fase enemiga siguiente: conviene lanzarlas al empezar el turno.')} ${COM()}`],
        ['Arena divina', t('Las pagan. Empieza en {a} y su máximo es {b}; se repone al empezar cada capítulo y antes de las batallas de las misiones principales. Ningún objeto la repone. El coste depende de la dificultad, no del nivel de la bendición.', { a: R.sand?.start ?? 100, b: R.sand?.max ?? 100 })],
        ['Cómo se consigue', t('Hablar una vez con el dios y reunir con el Servicio divino el tributo del nivel 1 («Ahora cuentas con la Bendición de…»).')],
        ['Niveles', t('Tres. Cada nivel añade un efecto a los anteriores: en el nivel 3 se tienen los tres por el mismo coste. Los umbrales de tributo son acumulados.')],
        ['Equipar', `${t('En un templo o en una base con templo («Bendiciones»). Casillas: 3 a elegir y Fortuna fija, sin confirmar (el juego no da el número).')} ${COM()}`],
        ['Bendición de Fortuna', `${t('Rebobina la batalla hasta la acción elegida; no tiene niveles y la da la historia. Arena {c} (Normal / Difícil). Si rebobina a antes de otra bendición, devuelve su arena.', { c: nd(F?.cost) })} ${COM()}`],
        ['Sin bendición', t('Yu Phas, Dagda y Solel.')],
        ['Entre rutas', `${t('Los niveles pasan a otra ruta al empezarla desde el cap. 1 tras terminar una Parte 1; las rutas jugadas en paralelo no los comparten.')} ${COM()}`],
        ['Reiniciar capítulo', t('Deshace el tributo ganado en ese capítulo.')]]), 'bendiciones') +
      card(t('Las seis bendiciones'), tw(H(['Bendición', 'Nivel 1', 'Nivel 2', 'Nivel 3', 'Tributo', 'Arena N / D', 'En su Prueba']), B.map(b => [
        `${img(ico().temple?.[b.id.replace('MIR_', '') + '神殿'], 'ico')}<b>${esc(gx(b.es))}</b><br><small class="mut">${esc(b.god)} · ${wd(b.holy_weekday)}</small>`,
        ...b.levels.map(l => esc(lvl(l.es))), b.tribute.join(' / '),
        `<b>${nd(b.cost)}</b> <small class="mut">(${t('{n} usos', { n: nd(b.uses) })})</small><br><small>−${pct(20)}: ${nd(b.cost20)} · −${pct(50)}: ${nd(b.cost50)}</small>`,
        t('nivel {n}', { n: b.trial_copies.join(', ') })])) +
        p(t('Cada efecto dura 1 turno. Tributo: acumulado para los niveles 1 / 2 / 3. Usos: lanzamientos con 100 de arena. «En su Prueba»: niveles que llevan para siempre los enemigos de la Prueba de ese dios. El redondeo de los costes con descuento está sin confirmar.')) +
        (F ? p(t('Bendición de Fortuna: arena {c}, sin descuentos.', { c: nd(F.cost) })) : ''), 'tabla-bendiciones') +
      card(t('Templos'), tw(H(['Dios', 'Día sagrado', 'Servicio divino', 'Mejor aptitud', 'Audiencia']), gods.map(g => [img(ico().temple?.[g.id], 'ico') + esc(nm(g)), wd(g.holy_weekday), esc(nm(g.service)), apt(g.service.es), AUD.includes(g.id) ? t('sí, +50 de Prestigio por etapa') : t('no')])) +
        p(t('Cada dios tiene un templo adjunto en el barrio de los templos de Dagsion y un templo principal en el mapa; en los dos se puede servir, elegir bendiciones y pedir audiencia. Audiencias: etapas con Prestigio 2, 4, 6, 8, 9 y 10, en el día sagrado del dios o el domingo, sin gastar turno ni servicio y sin dar tributo. Aurora y Credna no conceden audiencia: hasta 24 audiencias en la Parte 1 (4 dioses × 6 etapas).')) +
        tw(H(['Ruta', 'Portal de los Dioses', 'Se abre']), (R.portals || []).map(x => [ROUTE_NAME[x.route], t('Templo de {g}', { g: esc(x.god) }), `${t('cap. {n}', { n: x.chapter })} (${esc(x.date.split(' ')[0])})`])) +
        p(t('El portal lleva al instante del templo adjunto al principal. En la Parte 3 cada Petición de un dios abre el portal de su templo.') + (caiHide() ? '' : ' ' + t('En la Parte 1 de Cai solo se llega al templo principal de Aurora (las regiones de los demás están cerradas), pero se sirve a los seis dioses desde Dagsion.'))), 'templos') +
      card(t('Servicio divino'), p(t('Una vez por semana en total, entre todos los templos, dos unidades sirven a un dios: suben el apoyo entre ambas y el tributo de su bendición. Gratis; 1 barra de Motivación por participante, que no se gasta con resultado «Perfecto». Se abre en {w}; en la Parte 3, desde la sección 2.', { w: chByRoute(unl) })) +
        tw(H(['Resultado', 'Probabilidad base', 'Tributo base', 'Apoyo base']), ['Mejor', 'Bueno', 'Normal'].map((k, i) => [t(k), pct(sv.prob?.[i]), sv.tribute?.[i], sv.support?.[i]])) +
        kv([['Aptitud', t('de 0 a 2 por unidad y servicio; con 2, {n} puntos de probabilidad pasan de Normal a Mejor, y con 0, de Mejor a Normal.', { n: sv.shift ?? 20 })],
          ['Multiplicador del templo', list(MU.map(m => `×${num(m.pct / 100)} ${mlabel(m)}`))],
          ['Día sagrado', t('{h}. El domingo es el Día de Dagda, sagrado para todos. Ese día el resultado es siempre «Perfecto», sin sorteo, en cualquier templo del dios, también en el adjunto de Dagsion.', { h: holy })],
          ['Templo principal', t('En la Parte 1, el aviso del día sagrado de Mars, Smyrnos, Jurah y Kalla habla de su templo principal, pero el efecto completo vale en cualquier templo del dios.')],
          ['Parte 2: Servicio grupal', t('Lo ofrece el Oficial al cargo, una vez entre misiones: sirven todas las unidades a la vez; tributo {b} más {x} (probabilidad {p} %).', { b: R.group_p2?.base, x: (R.group_p2?.bonus || []).join(' / '), p: (R.group_p2?.prob || []).join(' / ') })],
          ['Logros', t('{l} Esquirlas cau.', { l: list((R.achievements || []).map(a => t(a.need > 1 ? '{l} con {n} dioses: {s}' : '{l} con {n} dios: {s}', { l: t(a.es.includes('máximo') ? 'nivel máximo' : 'nivel 2'), n: a.need, s: a.shards }))) })]]), 'servicio-divino') +  // i18n-ignore
      card(t('Descuentos con Esquirlas cau.'), p(t('Cada dios tiene dos compras en <a href="#/ayudas">Ayudas de salvación</a>: {l}. En total, {n} esquirlas para los seis.', {
        l: list((B[0]?.discounts || []).map(d => t(d.routes_cleared > 1 ? '−{p} ({s} esquirlas, {r} rutas terminadas)' : '−{p} ({s} esquirlas, {r} ruta terminada)', { p: pct(d.pct), s: d.shards, r: d.routes_cleared }))),
        n: num(B.reduce((a, b) => a + b.discounts.reduce((x, d) => x + d.shards, 0), 0)) })), 'descuentos') +
      card(t('Pruebas y peticiones'), p(t('Parte 1: {l}. Parte 3: una Prueba de nivel 60 por dios, tras su Petición; sus enemigos llevan copias permanentes de la bendición.', {
        l: list(trialP1.map(tr => t('{t} (ruta de {r}, desde el cap. 10, nivel {l}; premio {p})', { t: esc(gx(tr.es)), r: ROUTE_NAME[tr.route], l: tr.level, p: esc(tr.rewards.map(gx).join(', ')) }))) })) +
        tw(H(['Dios', 'Petición (Parte 3)', 'Entregar', 'Clase', 'Prueba (nivel)']), B.map(b => [esc(b.god), b.request ? L('mision', b.request.id, b.request.es) : '—',
          b.request ? esc(list(b.request.deliver.map(d => `${gx(d.item)}${d.n > 1 ? ' ×' + d.n : ''}`))) + (b.request.needs.length ? ` <small class="mut">${t('con el templo principal reconstruido')}</small>` : '') || '—' : '—',
          b.request ? esc(list(b.request.classes.map(gx))) : '—', list(b.trials.filter(tr => tr.part === 3).map(tr => `${esc(gx(tr.es))} (${tr.level})`))])) +
        p(t('Premios, reconstrucciones y Llaves del Halo: <a href="#/partes23?t=dioses">Partes 2 y 3</a>.')), 'pruebas') +
      card(t('Min-max'), p(t('Llevar los seis dioses al nivel 3 cuesta {n} de tributo. Un servicio con resultado Mejor da {b} × el multiplicador:', { n: need3, b: best })) +
        tw([...H(['Momento', 'Tributo por servicio Mejor']), t('Servicios para {n} de tributo', { n: hard })], MU.map(m => [mlabel(m), num(best * m.pct / 100), Math.ceil(hard / (best * m.pct / 100))])) +
        kv([['Conclusión', t('Con un servicio por semana, una sola Parte 1 no basta para todos: hay que elegir, y los niveles se acumulan entre rutas.')],
          ['Cómo servir', t('En el día sagrado del dios o el domingo, con dos unidades de aptitud 2 y una pareja cuyo apoyo interese. Subir pronto a Prestigio 6 y 10.')],
          ['Orden', `${t('1) Kalla nivel 1 (Esq +50), la mejor para no recibir daño; en Difícil cuesta 40. 2) Aurora niveles 1–2 (mitad de daño físico y mágico), barata; nivel 3 antes de la Parte 3 contra el Favor infernal. 3) Credna nivel 1 si llegan mapas con niebla. 4) Mars nivel 2 para ejércitos físicos, Smyrnos nivel 2 para magos y curanderos.')} ${COM()}`],
          ['Jurah: saltar', t('{n} fichas de enemigos llevan Crítico −30 oculto, así que su nivel 3 (sin críticos) casi no sirve, y su nivel 2 (sin ataques dobles) tampoco aporta mucho. Su nivel 1 solo compensa si el ejército depende de voladores o caballería frente a arcos o armas antimontura.', { n: num(R.enemy_hidden_crit || 0) })],
          ['Esquirlas', t('Primero los descuentos de Kalla (Difícil 40 → 32 → 20) y de Aurora.')],
          ['Arena', t('En Difícil, guardar siempre 5 para rebobinar. La arena no se repone en los encuentros del tiempo libre: no gastarla antes de la misión principal.')],
          ['Parte 3', t('Hacer pronto {q} para servir con ×2.', { q: L('mision', 'SQID_神殿の備品調達') })]]), 'min-max');
  }

  /* ================= Prestigio ================= */
  function prestigio() {
    return `<h1>${t('Rangos de Prestigio')}</h1>${guiaLink('prestigio')}<p class="mut">${t('La fama del ejército en la ruta actual. Cada rango abre locales (teatro, termas), mejora otros (entrenamiento, comidas, templo), abre exámenes de clase y lo piden los reclutamientos. Se gana sobre todo con misiones; no pasa a otras rutas y en la Parte 1 el tope es el rango 12. Conviene llegar a los rangos 4 y 7 antes de la Plaza de armas (×1,8 y ×2,5), a los rangos 5 y 9 antes de las comidas y al 8 para los exámenes avanzados y las Termas.')}</p>` +
      card(t('Rangos'), docHtml({ head: H(['Rango', 'Puntos', 'Acumulado', 'Desbloquea']), rows: [['1', '—', '0', '—'], ['2', num(800), num(800), t('«Banquete» en el Mapa del mundo')],
        ['3', num(1000), num(1800), t('Carta de la Posada ampliada (platos de Prestigio 3); lecciones de Formación (ruta de Cai)')],
        ['4', num(1000), num(2800), t('Exámenes de clase intermedia; entrenamiento ×1,8; lecciones (ruta de Cai)')],
        ['5', num(1000), num(3800), t('Comidas ×1,3; lecciones (ruta de Cai); «Arenga»; mejores batallones y más envíos (ruta de Theodora)')],
        ['6', num(1000), num(4800), t('Manuales en el bazar; Servicio divino ×0,8; lecciones (ruta de Cai)')],
        ['7', num(1000), num(5800), t('Teatro «Ver una obra»; armas +1 en la armería; entrenamiento ×2,5; lecciones (ruta de Cai); 5 campos de cultivo (ruta de Cai); batallones (ruta de Theodora)')],
        ['8', num(1000), num(6800), t('Exámenes de clase avanzada; Termas; Teatro «Actuar»; lecciones (ruta de Cai)')],
        ['9', num(1000), num(7800), t('Más termas; comidas ×1,5; 7 campos de cultivo (ruta de Cai); batallones (ruta de Theodora)')],
        ['10', num(1000), num(8800), t('Armas +2; templo ×1,2; lecciones (ruta de Cai)')], ['11', num(1000), num(9800), gx('Lingote de oro enorme')], ['12', num(1000), num(10800), gx('Retrato de Yu Phas')],
        ['13–21', t('{n} cada uno', { n: num(1000) }), '—', t('Solo en la Parte 3: libros secretos, Botas del viento, cofres de libros')]].map(r => [r[0], r[1], r[2], routeParts(r[3])]) }), 'rangos') +
      card(t('Multiplicadores de los locales'), docHtml({ head: H(['Local', 'Base', 'Mejora 1', 'Mejora 2', 'Parte 3 (misión 1)', 'Parte 3 (misión 2)']), rows: [
        [t('Plaza de armas'), pct(100), t('Prestigio {n}: {p}', { n: 4, p: pct(180) }), t('Prestigio {n}: {p}', { n: 7, p: pct(250) }), pct(300), pct(350)], [t('Comidas'), pct(100), t('Prestigio {n}: {p}', { n: 5, p: pct(130) }), t('Prestigio {n}: {p}', { n: 9, p: pct(150) }), pct(180), pct(200)],
        [t('Servicio divino'), pct(50), t('Prestigio {n}: {p}', { n: 6, p: pct(80) }), t('Prestigio {n}: {p}', { n: 10, p: pct(120) }), pct(150), pct(200)]] },
        t('En la Parte 3 los dos últimos escalones llegan con las misiones de reconstrucción del coliseo, el comedor y el templo.')), 'multiplicadores') +
      card(t('Fuentes de Prestigio'), docHtml({ kv: [
        [t('Audiencias'), t('+50 cada una, con etapas en los rangos 2, 4, 6, 8, 9 y 10 (6 por dios); no son automáticas: hay que pedirlas en el templo, y cada una vale 50 aunque la etapa llegue tarde. No gastan turno ni servicio. Solo las conceden Mars, Smyrnos, Jurah y Kalla; Aurora y Credna nunca. Máximo en la Parte 1: 4 dioses × 6 etapas = 24 audiencias = 1200.')],
        ...caiHide() ? [] : [[t('Altruismo del cap. 8 (ruta de Cai)'), t('«Exterminio de Porcelios» (+50, plazo cap. 9) y «Verduras para los aragueses» (+200; 30 de Melara, Shaktoh o Usama). El Shaktoh se compra en el mercado de Aguiño (50 G, 5 por reposición): comprar 5 y plantar 2–3 (cada cosecha da 10, o 1 planta rara si muta: sin abono pasa el 2–30 % de las veces según el campo; cada parcela da unas 3 cosechas) cubre las 30.')]],
        [t('Batalla principal (por capítulo, sumando sus combates)'), routeParts(t('caps. 1–2: 0, caps. 3–7: 450, caps. 8–12: 700 (ruta de Cai); caps. 4–7: 400, caps. 8–10: 600, caps. 11–12: 700 (ruta de Dietrich); cap. 4: 450, cap. 5: 600, cap. 6: 1100 (600 de la batalla y 500 del combate contra Bertrand del 6/4), caps. 7–8: 600, caps. 9–12: 700 (ruta de Theodora); caps. 4–8: 500, caps. 9–12: 700 (ruta de Leda)'))],
        [t('Historia (sin aviso)'), routeParts(t('+350 al acabar el cap. 2 y +350 al empezar el 3 (ruta de Cai); +200, +270 y +300 en los caps. 2, 3 y 4 (ruta de Dietrich); +300 en el cap. 4 (ruta de Leda); ninguno (ruta de Theodora)'))],
        [t('Tropas del mapa'), ctxRoute() === 'dietrich' ? t('30 por cada tropa vencida.') : ctxRoute() ? '0' : t('0, salvo 30 por cada tropa vencida en la ruta de Dietrich.')],
        [t('Misiones'), routeParts(t('normales 10–200; Altruismo (ruta de Cai) 100–200 (26 misiones); Desvíos 150 + 20.000 G; peticiones de los dioses (Parte 3) 100 + 10.000 G.'))],
        [t('Teatro'), t('actuar (Prestigio 8): +10 con resultado normal o mejor, 0 con el peor.')],
        [t('Sin Prestigio'), t('exámenes, reclutamientos, comidas, Plaza de armas, Servicio divino, Termas, ver una obra, la adivina y capturar monturas.')]] }), 'fuentes');
  }

  /* ================= Turnos y viajes ================= */
  function turnos() {
    return `<h1>${t('Turnos y viajes')}</h1>${guiaLink('tiempo-libre', 'mapa-del-mundo')}<p class="mut">${t('El capítulo tiene un plazo; cada día tiene 4 turnos de 6 horas (0, 6, 12 y 18 h). Moverse por el mapa, combatir y dormir gastan turnos; las actividades de Dagsion casi no. Conviene planificar rutas en bucle y volver a Dagsion al final de cada semana.')}</p>` +
      card(t('Turnos'), docHtml({ kv: [
        [t('Turno'), t('6 horas, 4 por día. Turnos restantes = (límite − inicio del turno en curso) ÷ 6 h: a las 15:33 del 15/3 con límite el 10/4 a las 12:00 se cuenta desde las 12:00 y quedan 104.')], [t('Movimiento'), t('hasta 3 tramos de camino por turno y una acción al llegar; los tramos que sobran se pierden. Un viaje de h tramos cuesta ⌈h ÷ 3⌉ turnos. Un punto de control cerrado obliga a parar encima.')],
        [t('Batalla'), t('1 turno, dure lo que dure: el reloj queda al inicio del bloque y avanza uno al terminar.')], [t('Carruaje'), t('es la acción del turno, más la tarifa (100/200/300 G): llegar andando a la posta y montar en el mismo turno cuesta 1 turno en total. El Portal de los Dioses, igual.')],
        [t('Comprar'), t('en las tiendas de una población no gasta el turno; después aún cabe una acción.')], [t('Actividades de Dagsion'), t('+20 minutos cada una, sin turno; el reloj se para al final del turno en curso.')],
        [t('Otros'), t('salir de la capital al mapa, descansar o un banquete: 1 turno cada uno.')], [t('Plazo'), t('al llegar en el mapa la historia avanza sola; si el destino no se visitó nunca, hay que repetir el capítulo.')]] }) +
        p(t('Motivación: <a href="#/instalaciones?ir=motivacion">Dagsion</a>.')), 'turnos') +
      card(t('Banquete'), docHtml(t('Desde Prestigio 2, 1 turno: de 1 a 10 ingredientes; apoyo base 20 por pareja; curación +10/30/50/100 % por puntos.')), 'banquete') +
      card(t('Carruajes'), docHtml(t('Solo líneas que salen de la posta de partida activada; tarifa fija 100/200/300 G; el destino se activa al llegar.') + (caiHide() ? '' : ' ' + t('En la ruta de Cai no hay ningún carruaje hasta cobrar «Fabricado en Megaira» (caps. 7–12); las líneas de Urka y Eochaid piden además otra misión, y las que tocan Chiron, Aragona o Cartodo están cerradas a Cai.'))), 'carruajes');
  }

  /* ================= Sistemas de cada señor (#/senores) ================= */
  const qlink = id => (QUEST[id] ? L('mision', id) : '');
  const SPOT = (id, es) => (SPOTS[id] ? L('lugar', id, es) : esc(gx(es || '')));
  const PER_LORD = {
    cai() {
      const S = SY(), u = S.unlocks?.cai || {};
      return kv([
        ['Tercer Ojo', t('Cap. {c}. En una zona explorable, mantener pulsado el botón muestra en rojo a los enemigos a través de los muros; mientras está activo no te mueves.', { c: u['Tercer Ojo'] })],
        ['Altruismo', t('Cap. {c}. Encargos de los vecinos que dan Prestigio (26 misiones, 100–200 cada una): <a href="#/misiones">Misiones</a>.', { c: u.Altruismo })],
        ['Formación', t('Cap. {c}. Lecciones de los dioses y maestros, abiertas por Prestigio: <a href="#/instalaciones?ir=formacion">Formación</a>.', { c: u['Formación'] })],
        ['Cebo', t('Cap. {c}. Orden del mapa: el cebo atrae a un animal en {n} turnos (hasta {m} cebos); luego se intenta capturar: <a href="#/recoleccion?t=cebo">Cebo y monturas</a>.', { c: u.Cebo, n: S.cai?.lure_turns, m: S.cai?.lure_max })],  // i18n-ignore
        ['Establo', t('Cap. {c}. Alimentar, nombrar y liberar las monturas capturadas: <a href="#/monturas?ir=establo">Establo</a>.', { c: u.Establo })],
        ['Cultivar', t('Cap. {c}. Parcelas en el mapa (3, 5 y 7 con Prestigio 1, 7 y 9; 10 en la Parte 3); la cosecha tarda 6 turnos y puede mutar según el lugar y el estiércol: <a href="#/recoleccion?t=cultivo">Cultivo</a>.', { c: u.Cultivar })],
        ['Parte 3', t('{q} da 2 elefantes; el cebo, el cultivo y el Tercer Ojo vuelven si Cai va en la milicia.', { q: qlink('SQID_お腹を空かせた戦象') })]]);
    },
    dietrich() {
      const S = SY(), D = S.dietrich || {}, A = D.answerer || {}, u = S.unlocks?.dietrich || {}, sh = D.shard ? L('objeto', D.shard.id, D.shard.es) : esc(gx('Esquirla del eco'));
      const regions = Object.values((W.map || {}).regions || {}).filter(r => (r.clash_forces || []).length);
      const duels = Object.values(QUEST).filter(q => /^SQID_ディートリヒ篇_挑戦状\d$/.test(q.id)).sort((a, b) => +a.id.slice(-1) - +b.id.slice(-1));
      return kv([
        ['La Respondedora', t('Cap. {c}. Orden del mapa: descubre enemigos ocultos cerca y abre una escaramuza con ellos; el grupo descubierto se va a los {r} turnos. Energía {max}; cada uso cuesta {cost}; recupera {a} por turno y {b} al volver al mapa del mundo desde una base o zona.', { c: u['La Respondedora'], r: A.remove_turns, max: A.max, cost: A.cost, a: A.regen_turn, b: A.regen_enter })],
        ['Esquirlas del eco', t('{s}: las sueltan los enemigos de la Respondedora (cuántas por enemigo: sin confirmar). Se gastan en Potenciar técnicas (20, 30, 50 o 70 por técnica) y en Transmitir secreto. En la Parte 2 de Dietrich se reciben 100.', { s: sh })],
        ['Potenciar técnicas', t('Cap. {c}, en el templo de Smyrnos: cada técnica sube una vez a su versión «+» (más Pot o Gol, o menos desgaste). Con {n} mejoras se abre la clase {k}: <a href="#/guia/tecnicas">Técnicas</a>.', { c: u['Potenciar técnicas'], n: D.smith_upgrades, k: CLASSES.JID_鍛冶師 ? L('clase', 'JID_鍛冶師') : gx('Herrero') })],
        ['Cazatalentos', t('Cap. {c}. Cartas de desafío abiertas por Prestigio; el Temerario espera en una zona explorable y, al vencerlo, Dietrich aprende su técnica secreta.', { c: u['Cazatalentos (Duelos de Temerario)'] })],
        ['Transmitir secreto', t('Cap. {c}. En el templo, Dietrich enseña sus secretos a otros aliados por esquirlas; la mejora «+» no se transmite.', { c: u['Transmitir secreto'] })],
        ['Respondedora Suprema y Fatídica', t('Dos versiones mejoradas del arma de Dietrich. Una llega al hablar con Fabio en el cap. 12 {com}; la condición de la otra, sin confirmar.', { com: COM() })]]) +
        `<h4>${t('Duelos de Temerario')}</h4>` + tw(H(['Duelo', 'Prestigio', 'Oro', 'Técnica secreta', 'Clase']), duels.map(q => [qlink(q.id), q.renown_req || 1, gold(q.gold),
          q.skill ? L('habilidad', q.skill.id, q.skill.es) : '—', list((q.class_unlock || []).map(c => L('clase', c.id, c.es))) || '—'])) +
        `<h4>${t('Transmitir secreto: coste')}</h4>` + tw(H(['Técnica', 'Esquirlas del eco']), (D.teach || []).map(x => [L('habilidad', x.sid, x.es), x.cost])) +
        `<h4>${t('En busca de Cetus (cap. 8)')}</h4>` + p(t('La Respondedora detecta a Cetus en cuatro sitios, siempre en este orden; hasta confirmar la señal no se puede volver a usar: {l}.', { l: (D.cetus || []).map(c => `${c.n}) ${SPOT(c.spot, c.es)}${c.force ? ` (${t('con {f}', { f: esc(gx(c.force.es)) })})` : ''}`).join(', ') })) +
        `<details><summary>${t('Grupos ocultos por región')}</summary>` + tw(H(['Región', 'Grupos (probabilidad)']), regions.map(r => [esc(nm(r)), list(Object.entries(r.clash_forces.reduce((a, f) => ((a[f.es] = (a[f.es] || 0) + f.pct), a), {})).map(([es, n]) => `${esc(gx(es))} ${pct(n)}`))])) + `</details>`;
    },
    theodora() {
      const S = SY(), T = S.theodora || {}, u = S.unlocks?.theodora || {};
      const sup = Object.values(QUEST).filter(q => /^SQID_セオドラ篇_仕送り\d+$/.test(q.id)).length;
      return kv([
        ['Batallones', t('Desde el cap. 4 (los da la historia). Un batallón por unidad a pie: bonos y una táctica: <a href="#/batallones">Batallones</a>.')],
        ['Mercado', t('Abre en el cap. {c} (las demás rutas, en el cap. 3).', { c: u.Mercado })],
        ['Enviar suministros', t('Cap. {c}. {n} peticiones de Bonaventure para Saramis, 5500 G y 100–350 de Prestigio cada una, hasta el fin de la Parte 1 (24/10). Las clases se abren por número de envíos completados, no por un envío concreto: {l}.', { c: u['Enviar suministros'], n: sup, l: list((T.supply_classes || []).map(c => `${c.n} → ${L('clase', c.id, c.es)}`)) })],
        ['Enviar tropas', t('Cap. {c}. Manda un batallón a buscar, a una zona explorable o a un bastión; tarda varios turnos y el batallón queda ocupado. Trae más con batallones de más calidad y afines al lugar. Envíos a la vez: {l}; {n} en la Parte 3.', { c: u['Enviar tropas'], l: list((T.dispatch_slots || []).map(d => t('{n} con Prestigio {r}', { n: d.n, r: d.renown }))), n: T.dispatch_slots_p3 })],
        ['Reclutar unidades', t('Cap. {c}. En una población; tarda {n} turnos. La lista de cada pueblo crece con el Prestigio: <a href="#/batallones?t=pueblos">Por pueblo</a>.', { c: u['Reclutar unidades'], n: T.recruit_turns })],
        ['Arenga', t('Tras reclutar, sube la calidad: con efecto n se quitan de la lista los batallones de los niveles 1 a n. La probabilidad depende de la aptitud del orador: <a href="#/batallones?t=reclutar">Cómo se consiguen</a>. Desde Prestigio 5, sin confirmar.')],
        ['Plan de alistamiento', `${t('Reclutamiento especial con arenga incluida, en algunas poblaciones desde el cap. 8; qué pueblos lo ofrecen, sin confirmar.')} ${COM()}`],
        ['Cuartel', t('Cap. {c}. Transporte militar: se entregan batallones a cambio de puntos de tropa; 100 puntos = 1 manual de estrategia.', { c: u['Cuartel (Transporte militar)'] })]]) +
        `<details><summary>${t('Enviar tropas: botín de cada zona ({n})', { n: (T.dispatch_loot || []).length })}</summary>` +
        tw(H(['Zona', 'Botín (probabilidad)']), (T.dispatch_loot || []).map(z => [SPOT(z.spot, z.es), list(z.items.map(i => `${L('objeto', i.id, i.es)} ${pct(i.pct)}`))])) + `</details>`;
    },
    leda() {
      const S = SY(), Ld = S.leda || {}, u = S.unlocks?.leda || {};
      const its = a => list(a.map(i => L('objeto', i.id, i.es)));
      const dancer = 'SQID_レダ篇_踊り子への道';
      return kv([
        ['Actuar en locales', t('Cap. {c}. Orden Actuar en una población: paga oro y objetos y, en algunos pueblos, revela un lugar secreto. Cada «Baile en…» es también una misión con Prestigio.', { c: u['Actuar en locales'] })],
        ['Lugares secretos', t('No salen en el mapa hasta actuar en el pueblo indicado; tienen materiales únicos y a veces enemigos.')],
        ['Actuar en la taberna', t('Cap. {c}. Cinco misiones del tabernero, abiertas por Prestigio; cada una enseña una canción a Leda y abre bebidas nuevas.', { c: u['Actuar en la taberna'] })],
        ['Bebidas', t('Se pagan con materiales y dan mejoras durante una batalla; las existencias se reponen cada capítulo: <a href="#/instalaciones?ir=bebidas">Taberna · Bebidas</a>.')],
        ['Bailarín', QUEST[dancer] ? t('{q}: entregar Hingosh da la Licencia de bailarín y la clase, hasta el cap. 10.', { q: qlink(dancer) }) : ''],
        ['Templo de Kalla', t('Portal desde el cap. 4; desde el cap. 10, la Prueba de Kalla (nivel 30) da el Arco de Kalla.')]]) +
        `<h4>${t('Taberna')}</h4>` + tw(H(['Misión', 'Prestigio', 'Prestigio que da', 'Entregar', 'Canción', 'Clases']), (Ld.tavern || []).map(x => [qlink(x.id) + (/復興/.test(x.id) ? ` <small class="mut">${t('Parte {p}', { p: 3 })}</small>` : ''),
          x.renown, x.renown_gain ? `+${num(x.renown_gain)}` : '—', its(x.deliver) || '—', x.skill ? L('habilidad', x.skill.id, x.skill.es) : '—', list((QUEST[x.id]?.class_unlock || []).map(c => L('clase', c.id, c.es))) || '—'])) +
        `<h4>${t('Actuaciones por población')}</h4>` + tw(H(['Población', 'Parte 1', 'Parte 3', 'Lugar secreto']), (Ld.shows || []).map(s => [
          SPOT(s.spot, s.es) + (s.quest ? `<br><small>${qlink(s.quest)}</small>` : ''),
          s.gold1 ? `${gold(s.gold1)}; ${its(s.items1)}` : '—', s.gold3 ? `${gold(s.gold3)}; ${its(s.items3)}` : '—',
          s.secret ? `${SPOT(s.secret.spot, s.secret.es)}${s.secret.force ? ` <small class="mut">${t('con {f}', { f: esc(gx(s.secret.force.es)) })}</small>` : ''}` : '—']));
    },
  };
  const LORD_PID = { cai: 'PID_カイ', dietrich: 'PID_ディートリヒ', theodora: 'PID_セオドラ', leda: 'PID_レダ' };
  function senores(qs) {
    const S = SY(), r = ROUTE_IDS.includes(qs.ir) && !qs.r ? qs.ir : listRoute(qs), U = S.unlocks || {}, routes = r ? [r] : ROUTE_IDS;  // ?ir=<lord> always shows that lord
    const feats = [...new Set(ROUTE_IDS.flatMap(x => Object.keys(U[x] || {})))].sort((a, b) =>
      Math.min(...ROUTE_IDS.map(x => U[x]?.[a] || 99)) - Math.min(...ROUTE_IDS.map(x => U[x]?.[b] || 99)) || a.localeCompare(b));
    const portal = Object.fromEntries((S.blessing_rules?.portals || []).map(x => [x.route, x]));
    return `<h1>${t('Sistemas de cada señor')}</h1>${guiaLink('rutas')}${routeChips('senores', {}, r)}` +
      routes.map(x => card(t('Ruta de {r}', { r: ROUTE_NAME[x] }), `<p class="mut">${t('Parte 1, solo en la ruta de {w}', { w: CHARS[LORD_PID[x]] ? L('personaje', LORD_PID[x]) : ROUTE_NAME[x] })}${portal[x] ? t('; portal al templo de {g} desde el cap. {n}', { g: esc(portal[x].god), n: portal[x].chapter }) : ''}.</p>` + PER_LORD[x](), x)).join('') +
      card(t('Capítulo en que abre cada local'), tw([t('Local u orden'), ...ROUTE_IDS.map(x => ROUTE_NAME[x])], feats.map(f => [esc(gx(f)), ...ROUTE_IDS.map(x => (U[x]?.[f] ? t('cap. {n}', { n: U[x][f] }) : '<span class="mut">—</span>'))])) +
        p(t('Parte 1. En la Parte 3 se abre todo desde la sección 2; las órdenes de cada señor necesitan que esté en el ejército.')), 'comparativa') +
      card(t('Parte 3: sistemas de los señores'), kvRows([
        ['Cai', t('en la milicia: cultivar, cebo y Tercer Ojo; como aliado, el establo.')],
        ['Dietrich', t('en la milicia: la Respondedora; como aliado, Potenciar técnicas; en Dagsion, Transmitir secreto.')],
        ['Theodora', t('como aliada: batallones y Transporte militar; en la milicia: reclutar, arenga y enviar tropas al máximo.')],
        ['Leda', t('bebidas para todo el ejército; en Dagsion, la taberna.')]]), 'parte-3');
  }

  /* ================= Rutas, reinicios (+ Ayudas de salvación) ================= */
  function sendas(qs) {
    const tb = qs.t === 'ayudas' ? 'ayudas' : 'sendas';
    const head = `<h1>${t('Rutas, reinicios y Ayudas')}</h1>${guiaLink('rutas', 'nueva-vuelta', 'esquirlas')}${tabs('sendas', tb, [['sendas', 'Rutas y reinicios'], ['ayudas', 'Ayudas de salvación']])}`;
    const merge = (G.p3 || {}).vars?.merge_cost || 300;
    if (tb === 'sendas') return head + card(t('Reclutar: apoyo con el señor'), p(t('El apoyo que pide un reclutamiento es con el señor de la ruta en curso. El apoyo con el señor de una ruta solo cuenta para reclutar en esa ruta (también al reiniciar capítulos o repetirla); no sirve en las otras.')), 'apoyo-con-el-senor') +
      card(t('Reiniciar capítulo'), p(t('«Reiniciar capítulo» (en la Percha o en Sistema) vuelve al inicio del capítulo; el juego avisa de que se perderá el progreso actual.')) + kv([
        ['Se deshace', t('Niveles, objetos, oro, Prestigio, misiones, tributo de los templos y amistad con los animales.')],
        ['Se conserva', t('Apoyos, galería, Registro de logros, Ayudas de salvación y Esquirlas cau.')],
        ['Uso', t('Repetir Comida, Teatro y Percha y reiniciar acumula apoyo con el mismo oro y los mismos turnos. Los apoyos no deseados son permanentes; los niveles y las compras del bucle se deshacen.')]]), 'reiniciar-capitulo') +
      card(t('Fin de la Parte 1'), kv([
        ['A la Parte 2', t('Solo lo que lleva cada unidad, 6 objetos como máximo. Se pierden el convoy, la bolsa de materiales, el oro, los regalos sin dar, los reclutamientos a medias, las misiones con fecha y el Prestigio: conviene gastar oro y Prestigio antes del final.')]]), 'fin-de-la-parte-1') +
      card(t('Qué se conserva entre rutas'), kv([
        ['Global a la partida', t('Desbloqueos de clase, Ayudas de salvación, Registro de logros y puntos de apoyo. Mapa, tributo de las bendiciones y misiones compartidas se copian al empezar otra ruta desde el cap. 1 si alguna ya terminó la Parte 1.')],
        ['Por ruta', t('Niveles, clases, Prestigio, oro, objetos y animales.')],
        ['Por ruta completada', t('5000 Esquirlas cau. una vez por señor; abre escalones de Ayudas y 18 misiones nuevas en la ruta de Cai.')],
        ['Fusión causal', t('{n} Esquirlas cau. por fusión (Parte 3).', { n: merge })]]), 'que-se-conserva');
    const R = W.reward; if (!R) return head;
    const groups = {}; R.rows.forEach(r => (groups[r.key] ||= []).push(r));
    const by = n => R.rows.filter(r => r.paths_cleared === n).reduce((a, r) => a + r.cost, 0);
    const deeds = {}; (R.deed_list || []).forEach(d => (deeds[d.key] ||= []).push(d));
    return head + p(t('Mejoras permanentes que se compran con Esquirlas cau. en la Sala de los obeliscos, accesible desde la Percha. Cada escalón exige haber completado un número de rutas de la Parte 1. «Exp adicional» es la primera que conviene comprar.')) +
      card(t('Esquirlas cau.'), p(t('Moneda global de la partida: se gana con logros y al terminar rutas, y se gasta en Ayudas de salvación y en fusionar personajes en la Parte 3.')) + kv([
        ['Logros', t('418 entradas del Registro de logros dan esquirlas (10–25 cada una en los primeros; p. ej. completar historias secundarias 25, ver conversaciones C 10/15)')],
        ['Rutas', t('5000 al terminar por primera vez la Parte 1 de cada señor')], ['Fusión (Parte 3)', t('{n} por fusión', { n: merge })]]), 'esquirlas') +
      card(t('Coste por rutas completadas'), kvRows([...[0, 1, 2, 3].map(n => [t(n === 1 ? '{n} ruta' : '{n} rutas', { n }), t('{n} esquirlas', { n: num(by(n)) })]),
        [t('Total'), t('{n} esquirlas', { n: num(R.rows.reduce((a, r) => a + r.cost, 0)) })], [t('Logros'), t('{n} logros dan {s} esquirlas en total', { n: R.deeds, s: num(R.deed_total_shards) })]])) +
      card(t('Ayudas'), tw(H(['Ayuda', 'Efecto', 'Escalones: valor · rutas · coste']), Object.values(groups).map(g => [`<b>${esc(nm(g[0]))}</b>`, esc(tx(g[0], 'help')),
        g.map(r => `<span class="rk">${r.op === 5 ? '−' : '+'}${r.value}${esc(r.unit)} · ${r.paths_cleared} · ${r.cost}</span>`).join(' ')])) +
        p(t('El descuento de comida no se suma a la rebaja del domingo.')), 'ayudas') +
      card(t('Logros que dan esquirlas'), tw(H(['Logro', 'Esquirlas']), Object.values(deeds).map(l => [esc(gx(l[l.length - 1].es).replace(/\d+/, l.map(x => x.need).join('/'))), l.reduce((a, x) => a + x.shards, 0)])));
  }

  /* ================= Batallones ================= */
  const BAT = Object.fromEntries((G.battalions || []).map(b => [b.id, b])), TOWN = Object.fromEntries((G.towns || []).map(tn => [tn.spot, tn]));
  const RANKS = ['E', 'D', 'C', 'B', 'A'];
  const bl = id => (BAT[id] ? `<a href="${href('batallon', id)}">${esc(nm(BAT[id]))}</a>` : '');
  const bstats = s => Object.entries(s || {}).map(([k, v]) => `${stn(k)} ${v > 0 ? '+' : ''}${v}`).join(', ');
  /** gambit kind, might and hit («Ataque · Pot 4 · Gol 85») */
  const gpow = b => [b.kind && t(b.kind), b.gambit?.might && t('Pot {n}', { n: b.gambit.might }), b.gambit?.hit && t('Gol {n}', { n: b.gambit.hit })].filter(Boolean).join(' · ');
  const share = (n, d) => (d ? pct(Math.round(n / d * 1000) / 10) : '—');
  function batallones(qs) {
    const tb = ['pueblos', 'reclutar'].includes(qs.t) ? qs.t : 'lista';
    const head = `<h1>${t('Batallones')}</h1>${guiaLink('batallones')}<p class="mut">${t('Solo en la ruta de Theodora (Parte 1, desde el cap. 4), en su Parte 2 y en la Parte 3 cuando Theodora se une. Un batallón por unidad; las unidades montadas no pueden llevarlo. Da bonos a las estadísticas y una táctica con usos por batalla.')}</p>` +
      tabs('batallones', tb, [['lista', 'Lista'], ['pueblos', 'Por pueblo'], ['reclutar', 'Cómo se consiguen']]);
    if (tb === 'lista') {
      const r = RANKS.includes(qs.rk) ? qs.rk : '', k = ['Ataque', 'Zona', 'Apoyo'].includes(qs.k) ? qs.k : '';  // i18n-ignore (data values)
      const rows = (G.battalions || []).filter(b => (!r || b.rank === r) && (!k || b.kind === k));
      return head + chips('batallones', qs, 'rk', [['', 'Todos los rangos'], ...RANKS.map(x => [x, `Rango ${x}`])], r, 'Rango de mando') +
        chips('batallones', qs, 'k', [['', 'Todas las tácticas'], ['Ataque', 'Ataque'], ['Zona', 'Zona'], ['Apoyo', 'Apoyo']], k, 'Tipo de táctica') +
        `<p class="sr-only" data-count>${t('{n} de {m} batallones.', { n: rows.length, m: (G.battalions || []).length })}</p>` +
        tw(H(['Batallón', 'Mando', 'Táctica', 'Bonos', 'Dónde']), rows.map(b => [bl(b.id), b.rank,
          b.gambit ? `${SKILLS[b.gambit.id] ? L('habilidad', b.gambit.id, b.gambit.es) : esc(gx(b.gambit.es))}${b.gambit.uses ? ` ×${b.gambit.uses}` : ''}${gpow(b) ? ` <small class="mut">${esc(gpow(b))}</small>` : ''}` : '—', esc(bstats(b.stats)),
          b.where.length ? t(b.where.length > 1 ? '{n} pueblos' : '{n} pueblo', { n: b.where.length }) : b.p2 != null ? t('Parte {p}', { p: 2 }) : b.auto ? t('autocrecimiento') : '—']));
    }
    if (tb === 'pueblos') {
      const tn = TOWN[qs.w] || (G.towns || [])[0];
      if (!tn) return head;
      return head + `<label class="filters">${t('Pueblo')} <select data-qs="batallones" name="w">${(G.towns || []).map(x => `<option value="${esc(x.spot)}"${x.spot === tn.spot ? ' selected' : ''}>${esc(gx(x.es))}</option>`).join('')}</select></label>` +
        p(t('Cada etapa añade batallones a la lista del pueblo. Sin arenga sale uno al azar de toda la lista; una arenga con efecto n quita de la lista los batallones de los niveles 1 a n, así que quedan los mejores. Probabilidad = 1 ÷ batallones que quedan.')) +
        tn.stages.map(s => card(`${gx(tn.es)} · ${t('etapa {n}', { n: s.stage })}${s.stage > 1 && s.stage <= 4 && (G.recruit_renown || [])[s.stage - 2] ? ` (${t('Prestigio {n}', { n: G.recruit_renown[s.stage - 2] })})` : ''}`,
          p(t('Nuevos: {l}', { l: list(s.new.map(bl)) })) + tw(H(['Batallón', 'Rango', 'Sin arenga', 'Efecto 1', 'Efecto 2', 'Efecto 3', 'Efecto 4']),
            s.pools[0].map(id => [bl(id), BAT[id]?.rank || '', ...s.pools.map(pl => (pl.includes(id) ? share(1, pl.length) : '—'))])))).join('');
    }
    return head + card(t('Etapas de reclutamiento y Prestigio'), p(t('La tabla de cada pueblo tiene 5 etapas. Las etapas 2, 3 y 4 se abren con Prestigio {l}; la etapa 5 añade un batallón de rango A.', { l: (G.recruit_renown || []).join(', ') }))) +
      card(t('Arenga: probabilidad de cada efecto'), tw(H(['Aptitud del orador', 'Efecto 1', 'Efecto 2', 'Efecto 3', 'Efecto 4']), (G.speech || []).map(s => [esc(gx(s.apt)), ...s.p.map(x => pct(x))]))) +
      card(t('Enviar tropas: cantidad por calidad del batallón'), tw(H(['Destino', 'Con afinidad (calidad 0 → 5)', 'Sin afinidad (calidad 0 → 5)']), (G.dispatch || []).map(d => [esc(gx(d.kind)), d.fav.join(' · '), d.other.join(' · ')]))) +
      card(t('Parte 2 de Theodora: batallones que entrega el juego'), tw(H(['Puntos acumulados', 'Batallón']), ((G.p2 || {}).legion || []).map(x => [x.threshold, bl(x.bat)])) + p(t('Cada batallón suma sus puntos (ver su ficha).'))) +
      card(t('Autocrecimiento: batallón por rango de Mando'), tw(H(['Mando', 'Batallón']), Object.entries((G.growth || {}).cmd_battalion || {}).map(([rk, id]) => [rk, bl(id)]))) +
      ['Root_Legionnaire', 'Root_RecruitingSoldiers', 'Root_BigRecruitingSoldiers', 'Root_Speech', 'Root_Deployment', 'Root_MercenaryUnion'].map(tut).join('');
  }
  function batallon(id) {
    const b = BAT[id];
    if (!b) return notFound();
    const ch = b.where.flatMap(w => (TOWN[w.spot]?.stages || []).filter(s => s.stage >= w.stage).map(s =>
      [L('lugar', w.spot, w.es), `${t('etapa {n}', { n: s.stage })}${s.stage === w.stage ? ` (${t('aparece')})` : ''}`, ...s.pools.map(pl => (pl.includes(b.id) ? share(1, pl.length) : '—'))]));
    const g = b.gambit;
    return fichaHead('', `<a href="#/batallones">${t('Batallones')}</a>`, nm(b), b.desc ? gx(b.desc) : '') + ficha('', [
      ['datos', 'Datos', kv([['Mando necesario', t('Rango {r}', { r: b.rank })], ['Bonos', esc(bstats(b.stats)) || '—'],
        ['Táctica', g ? `<b>${L('habilidad', g.id, g.es)}</b>${b.kind ? ` (${esc(t(b.kind))})` : ''}: ${esc(gx(g.desc || ''))}${g.uses ? ` · ${t('{n} usos por batalla', { n: g.uses })}` : ''}${g.might ? ` · ${t('Pot {n}', { n: g.might })}` : ''}${g.hit ? ` · ${t('Gol {n}', { n: g.hit })}` : ''}` : '—'],
        ['Arma de la tropa', list(b.equip.map(i => obj(i))) || '—'], ['Habilidades extra', list(b.extra.map(s => L('habilidad', s.id, s.es)))],
        ['Soldados', String(b.size)], ['Calidad', String(b.quality)], ['Puntos', String(b.reward)],
        ['Precio', b.price ? gold(b.price) + (b.not_for_sale ? ` (${t('no está a la venta')})` : '') : ''],
        ['Parte 2 de Theodora', b.p2 != null ? t('se entrega al llegar a {n} puntos', { n: b.p2 }) : ''], ['Autocrecimiento', b.auto ? t('se asigna con Mando {r}', { r: b.auto }) : '']])],
      ['donde', 'Dónde se recluta', ch.length ? tw(H(['Pueblo', 'Etapa', 'Sin arenga', 'Ef. 1', 'Ef. 2', 'Ef. 3', 'Ef. 4']), ch) : `<p class="mut">${t('No aparece en las tablas de reclutamiento de los pueblos.')}</p>`]]);
  }

  /* ================= Partes 2 y 3 ================= */
  /** every rebuilding material added up (what to stockpile), most needed first, folded */
  const reconTotal = recon => {
    const tot = {};
    recon.forEach(r => (r.mats || []).forEach(m => { (tot[m.id] ||= { ...m, n: 0 }).n += m.n || 1; }));
    const rows = Object.values(tot).sort((a, b) => b.n - a.n);
    return rows.length ? `<details><summary>${t('Materiales en total')}</summary><p>${objs(rows)}; ${gold(recon.reduce((a, r) => a + (r.gold || 0), 0))}.</p></details>` : '';
  };
  const PP = {
    p2() {
      const P = G.p2 || {}, v = P.vars || {};
      return card(t('Capítulos de la Parte 2: Guerra'), p(list((P.chapters || []).map(c => `${c.n}. ${esc(gx(c.es))}`))) + p(t('Sin tiempo libre ni tiendas: solo preparativos en la base y la misión. Al entrar, las unidades suben hasta el nivel {n}. Saltar la Guerra suma {m} niveles más con el autocrecimiento.', { n: v.join_level_p2, m: v.skip_levels })) + `<p class="mut">${esc(gx(P.skip_text || ''))}</p>`) +
        card(t('Suministros de cada capítulo'), tw(H(['Grupo', 'Objetos']), (P.supplies || []).map(s => [esc(gx(s.kind)), objs(s.items)]))) +
        card(t('Acción del ejército (una por capítulo)'), tw(H(['Acción', 'Qué hace']), (P.actions || []).map(a => [esc(gx(a.es)), esc(gx(a.help))]))) + tut('Hub_PreparationMarch') + tut('Hub_MarchingOfficer');
    },
    auto() {
      const g = G.growth || {}, v = (G.p2 || {}).vars || {}, ranks = ['E', 'D', 'C', 'B', 'A', 'S'];
      return p(t('El autocrecimiento pone al día a las unidades que se unen tarde o que pasan a otra parte: les da competencias acordes a su clase, un arma acorde a su rango y objetos fijos a los señores.')) +
        card(t('Arma por rango de competencia'), tw([t('Arma'), ...ranks], (g.weapons || []).map(w => [esc(gx(w.kind)), ...ranks.map(r => obj(w.by_rank[r]))]))) +
        card(t('Objetos fijos de los Señores de la Llama'), tw(H(['Señor', 'Si se cumple la condición', 'Siempre']), (g.lords || []).map(l => [L('personaje', l.pid, l.es), objs(l.cond) || '—', objs(l.always)]))) +
        card(t('Competencias que asigna por clase'), tw(H(['Clase', 'Competencias', 'Solo para']), (g.class_judge || []).filter(c => Object.keys(c.ranks).length).map(c =>
          [L('clase', c.id, c.es), esc(Object.entries(c.ranks).map(([k, r]) => `${gx(k)} ${r}`).join(', ')), esc(c.only ? gx(noJp(c.only)) : '')]))) +
        card(t('Al entrar en la Parte 3'), kv([['Reclutas', t('{p} del crecimiento normal', { p: pct(v.p3_growth_recruit) })], ['Señores que se reúnen', pct(v.p3_growth_lord)],
          ['Reclutas tardíos', pct(v.p3_growth_late)], ['Nivel de entrada', String(v.join_level_p3)]]));
    },
    fusion() {
      return card(t('Fusión causal'), kv([['Coste', t('{n} Esquirlas cau.', { n: (G.p3 || {}).vars?.merge_cost })], ['Quién puede', t('Cualquier aliado salvo los Señores de la Llama')],
        ['Habilidades y técnicas', t('se suman; si se repiten, se queda la de mayor nivel')], ['Estadísticas y nivel', t('se queda el valor mayor de cada estadística, sin modificadores de clase')],
        ['No se fusionan', t('clase, montura, batallón, objetos, crecimientos y apoyos')], ['Repetir una sección', t('deshace la fusión y no devuelve las esquirlas: conviene repetir antes de fusionar')]])) +
        tut('Hub_Merge') + tut('Hub_Warehouse') + tut('Bmap_BondsParticipation');
    },
    p3() {
      const P = G.p3 || {};
      return card(t('Calendario de la Parte 3: Salvación'), tw(H(['Sección', 'Nombre', 'Tiempo libre', 'Portales del inframundo']), (P.chapters || []).map(c => {
        const tl = (P.timeline || []).find(x => x.n === c.n);
        return [c.n, esc(gx(c.es)), tl?.free ? tl.free.map(md).join('–') : '—', tl?.gate ? tl.gate.map(md).join('–') : '—'];
      })) + p(t('Año 1454; la sección 1 empieza el 24 ene. Todas las misiones caducan el 6 jun.'))) +
        card(t('Moral (sustituye al Prestigio)'), p(t('{l} puntos de moral por nivel; se ganan con misiones y reconstrucciones.', { l: (P.moral_exp || []).join('/') })) + tw(H(['Nivel', 'Recompensa']), (P.moral || []).map(m => [m.lv, objs(m.items)]))) +
        card(t('Instalaciones de Dagsion'), p(t('Multiplicadores de los locales, también los de la Parte 3: <a href="#/prestigio?ir=multiplicadores">Rangos de Prestigio</a>.')) +
          tw(H(['Misión de Dagsion', 'Pide', 'Oro', 'Moral', 'Secciones']), (P.dagsion_quests || []).map(q => [L('mision', q.id, q.es), objs(q.deliver), num(q.gold), q.points, q.ch.join('–')]))) +
        card(t('Reconstrucción ({n} lugares)', { n: (P.recon || []).length }), tw(H(['Lugar', 'Tipo', 'Materiales', 'Oro', 'Moral', 'Turnos']), (P.recon || []).map(r => [L('lugar', r.spot, r.es), esc(gx(r.kind)), objs(r.mats), num(r.gold), r.moral, r.turns])) +
          reconTotal(P.recon || []) +
          p(t('El oro es la recompensa al terminar. Enviar tropas acorta los turnos.'))) +
        tut('Gmap_Reconstruction') + tut('Gmap_ReconstructionShorten') + tut('Hub_SectionFree3') +
        card(t('Milicias y defensa de Dagsion'), kv([['Unidades por milicia', String(P.vars?.squad_size)], ['Número de milicias', t('2 al principio, hasta 5')]])) +
        ['Gmap_TroopFormation', 'Gmap_MultipleTroops', 'Gmap_StandbyUnit', 'Gmap_Defense', 'Gmap_DefenseBattle', 'Gmap_Fort', 'Gmap_GateDestruction', 'Gmap_BigGate', 'Gmap_MultipleGate', 'Gmap_LastGate'].map(tut).join('');
    },
    dioses() {
      const P = G.p3 || {};
      return card(t('Encargos de los dioses y Pruebas de nivel 60'), tw(H(['Dios', 'Encargo', 'Reconstruir el templo', 'Recompensa', 'Prueba (nivel)', 'Premio de la prueba']), (P.gods || []).map(g => [L('personaje', g.pid, g.god),
        `<b>${esc(gx(g.quest.es))}</b><br>${esc(gx(g.quest.goal || ''))} ${objs(g.quest.deliver)}${g.quest.needs.length ? `<br><small class="mut">${t('Requiere el templo reconstruido')}</small>` : ''}`,
        g.recon ? `${objs(g.recon.mats)} · ${gold(g.recon.gold)} · ${t('{n} de moral', { n: g.recon.moral })}` : '—',
        list([gold(g.quest.gold), t('{n} de moral', { n: g.quest.points }), t('portal al templo'), g.quest.cls.length ? t('clase {c}', { c: list(g.quest.cls.map(c => L('clase', c.id, c.es))) }) : '']),
        `${esc(gx(g.trial.es))} (${g.trial.level})${g.trial_p1 ? `<br><small class="mut">${t('Parte {p}', { p: 1 })}: ${esc(gx(g.trial_p1.es))} (${g.trial_p1.level})</small>` : ''}`, objs(g.trial.rewards)])) +
        p(t('Los encargos van de la sección 2 a la 6 de la Parte 3.'))) +
        card(t('Llaves del Halo y clases divinas'), p(t('Hay 5 Llaves del Halo, cada una en un cofre de una zona explorable. Cada llave abre una de las 5 salas del templo del Halo; en las salas hay 8 objetos de licencia, uno por cada clase divina.')) +
          tw(H(['Zona', 'En el mismo cofre']), (P.keys || []).map(k => [k.spot && SPOTS[k.spot] ? L('lugar', k.spot, k.es) : esc(gx(k.es)), objs(k.with)])) +
          tw(H(['Sala', 'Objeto de licencia', 'Clase divina']), (P.rooms || []).flatMap(r => r.items.map(x => [r.room, obj(x.item), x.cls ? L('clase', x.cls, x.cls_es) : '—'])))) +
        ['Hub_TempleCrown', 'Hub_LegendPass', 'Hub_GodGate', 'Gmap_TempleSpot', 'Gmap_Station'].map(tut).join('');
    },
  };
  const PT = [['p2', 'Parte 2'], ['auto', 'Autocrecimiento'], ['fusion', 'Fusión y arcón'], ['p3', 'Parte 3'], ['dioses', 'Dioses y llaves']];
  const partes = qs => { const tb = PP[qs.t] ? qs.t : 'p2'; return `<h1>${t('Partes 2 y 3: sistemas')}</h1><p class="mut">${t('Sistemas de la Guerra (Parte 2, las cuatro rutas) y de la Salvación (Parte 3, con Eshmel).')}</p>${tabs('partes23', tb, PT)}${PP[tb]()}`; };

  /* ================= Dificultad, DLC y parches ================= */
  function dificultad(qs) {
    const tb = ['parches', 'dlc'].includes(qs.t) ? qs.t : 'dif', D = G.difficulty || {}, DL = G.dlc || {};
    const wtab = w => tw(H(['Arma', 'Tipo', 'Pod.', 'Gol.', 'Crít.', 'Peso', 'Alc.', 'Usos', 'Efecto']), w.filter(i => i?.w?.type).map(i =>
      [obj(i), esc(gx(i.w.type)), i.w.might, i.w.hit, i.w.crit, i.w.weight, (i.w.range || []).join('–'), i.w.uses, esc(i.desc ? gx(i.desc) : '')]));
    let body;
    if (tb === 'dif') {
      body = card(t('Normal y Difícil'), kv([['Nivel de los enemigos', t('igual en las dos')], ['Golpe y crítico enemigos en Normal', t('Golpe −30, Crítico −50 (en batallas rápidas solo Crítico −50)')],
        ['Estadísticas enemigas en Normal', t('−1 por cada 25 % de crecimiento de esa estadística')], ['EXP', t('la misma en las dos')],
        ['Prólogo', t('{b} ignoran la dificultad', { b: list([...new Map((D.prologue_maps || []).map(id => (X.batallas?.b || []).find(x => x.id === id)).filter(Boolean).map(bt => [bt.t, `<a href="${href('batalla', bt.id)}">${esc(gx(bt.t))}</a>`])).values()]) || t('las batallas del prólogo') })],
        ['Arena divina', t('empieza y topa en {n}; en Difícil, retroceder también cuesta', { n: D.sand_vars?.max ?? 100 })]])) +
        card(t('Coste de Arena divina por bendición'), tw(H(['Bendición', 'Normal', 'Difícil']), (D.sand || []).map(s => [esc(gx(s.es)), s.n, s.h]))) +
        card(t('Clásico y Novato'), kv([['Novato', t('la unidad caída vuelve tras la batalla')],
          ['Clásico', t('el recluta caído se pierde, pero solo en la historia de ese señor; los invitados solo dejan la batalla')],
          ['Salvar a alguien en Clásico', t('retroceder con Fortuna antes de ganar o reiniciar el capítulo; recargar no sirve (hay un solo guardado)')],
          ['Bajar de Difícil a Normal', t('en cualquier momento, desde la Sala de los obeliscos (Santuario causalidad) → Cambiar dificultad')],
          ['Subir a Difícil o cambiar de modo', t('guardar en la Sala de los obeliscos, volver al título y elegir «Reiniciar prólogo»: se repite el prólogo y se conserva todo')]])) + tut('Bmap_TurnBackTime');
    } else if (tb === 'parches') {
      const p1 = DL.p101 || {};
      body = card(t('Versión 1.0.1 ({d}): armas adicionales gratis', { d: dateTx(2026, 9, 16) }), (p1.tutorial || []).map(x => p(esc(gx(x)))).join('') + wtab(p1.items || []) +
        tw(H(['Parte', 'Qué se recibe (en Dagsion, en tiempo libre)']), (p1.by_part || []).map(b => [b.part, objs(b.items)])) +
        p(t('No se pueden llevar a la Parte 2: {l}; allí se reciben las versiones +1.', { l: objs(p1.forbidden_p2) }))) +
        card(t('Versión 1.1.0 ({d})', { d: dateTx(2026, 10, 14) }), p(t('Compatibilidad con el Pase de expansión y botón «DLC» en la pantalla de título. Sin cambios de equilibrio publicados.')));
    } else {
      const w1 = DL.wave1 || {};
      body = card(t('Pase de expansión: oleadas'), kv([['Precio', t('34,99 $ / 29,99 £; las oleadas no se venden por separado')],
        ['Oleada 1 (14 oct 2026)', t('Cuatro «Prototipos» inspirados en las reliquias de Three Houses')], ['Oleada 2 (invierno de 2026)', t('Aurora, Jurah y Smyrnos reclutables en el acto final, y trajes')],
        ['Oleada 3 (2027)', t('Historia de Anatolia, Bertrand, Orchel y Talimun, con aliados y clases nuevos')]])) +
        card(t('Oleada 1: Prototipos'), wtab((w1.quests || []).map(q => q.items[0])) +
          tw(H(['Ruta', 'Misión (Parte 1, en Dagsion)', 'Capítulos', 'Recompensa']), (w1.quests || []).map(q => [esc(q.route), QUEST[q.id] ? L('mision', q.id) : esc(gx(q.es)), q.ch.join('–'), objs(q.items)])) +
          p(t('En la Parte 3 se recibe el prototipo de cada ruta cuya Parte 2 se haya completado: {l}.', { l: list((w1.p3 || []).map(x => `${esc(x.route)}: ${obj(x.item)}`)) }))) +
        card(t('Fichas de los dioses'), tw(H(['Dios', 'Clase', 'Estadísticas base', 'Crecimientos %', 'Competencias', 'Habilidades']), (DL.gods || []).map(g => [
          `${L('personaje', g.pid, g.es)}${g.wave2 ? ` <small class="mut">${t('oleada 2')}</small>` : ''}`, esc(g.cls.map(gx).join(', ')), esc(Object.entries(g.base).map(([k, x]) => `${stn(k)} ${x}`).join(' ')),
          esc(Object.entries(g.growth).map(([k, x]) => `${stn(k)} ${x}`).join(' ')), esc(Object.entries(g.ranks).map(([k, x]) => `${gx(k)} ${x}`).join(', ')), list(g.skills.map(s => (SKILLS[s.id] ? L('habilidad', s.id, s.es) : esc(gx(s.es)))))])));
    }
    return `<h1>${t('Dificultad, DLC y parches')}</h1>${guiaLink('dificultad', 'dlc')}${tabs('dificultad', tb, [['dif', 'Dificultad y modos'], ['parches', 'Parches'], ['dlc', 'Pase de expansión']])}${body}`;
  }

  /* ================= Glosario ================= */
  /** key-terms table of the glossary doc (game text), cells shown as-is minus provenance tokens; the intro note is left out.
      The concept and English columns are English, the Spanish one stays Spanish (lang marks) */
  function keyTerms() {
    const tb = (((W.docs || {}).glossary || {}).html || '').match(/<table class="md">([\s\S]*?)<\/table>/);
    if (!tb) return '';
    const cell = c => { const s = c.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); return factOnly(s) || s; };
    const rows = [...tb[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(r => [...r[1].matchAll(/<t[hd]>([\s\S]*?)<\/t[hd]>/g)].map(c => cell(c[1])));
    return rows.length ? tw(H(['Concepto', 'Español', 'Inglés']), rows.slice(1).map(r => r.map((c, i) => `<span lang="${i === 1 ? 'es' : 'en'}">${esc(c)}</span>`))) : '';
  }
  function glosario(qs) {
    const q = qs.q || '', n = norm(q.trim());
    const rows = (W.gloss || []).filter(([es, en]) => !n || norm(es + ' ' + en).includes(n));
    return `<h1>${t('Glosario')}</h1>` + (!n ? card(t('Términos clave'), keyTerms()) : '') +
      card(t('Textos de sistema'), `<div class="filters"><input type="search" data-qs="glosario" name="q" value="${esc(q)}" placeholder="${t('Español o inglés')}" aria-label="${t('Buscar en el glosario')}" autocomplete="off"></div>` +
        resultCount(rows.length, 'término', 'términos', rows.length > 400 ? t('; se muestran 400, afina la búsqueda') : '') +
        tw(H(['Español', 'Inglés']), rows.slice(0, 400).map(([es, en]) => [`<span lang="es">${esc(es)}</span>`, `<span lang="en">${esc(en)}</span>`])));
  }

  /* ================= Tutoriales ================= */
  const TU = () => X.tutoriales || { cats: [], tutorials: [], tips: [] };
  const fmt = s => (s || '').split('\n\n').map(x => `<p>${esc(x).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*\*/g, '')}</p>`).join('');
  const plain = s => (s || '').replace(/\*\*/g, '');
  /** when a tutorial or tip shows up; internal flags without a Spanish reading are left out */
  const when = w => { const ws = [...new Set((w || []).filter(x => /[a-záéíóúñ]/i.test(x)).map(x => (JP_ANY.test(x) ? cond(x) : gx(x))).filter(x => !JP_ANY.test(x) && !x.includes('_')))]; return ws.length ? ` <small class="mut">${esc(ws.join(' · '))}</small>` : ''; };  // plain text: it also sits inside tutorial <summary> titles, where links are not allowed
  /** a tutorial page's or tip's text in the reader's language (game text; the ** bold marks are kept when the game table has the text) */
  const txt = s => gx(s || '');
  const pagesHtml = u => u.pages.filter(pg => pg.text || pg.img).map((pg, i, a) => `<div class="tu-pg">${pg.img ? `<img src="${esc(pg.img)}" loading="lazy" alt="${esc(t('Captura {n} de «{t}»', { n: i + 1, t: gx(u.title) }))}">` : ''}` +
    `<div>${a.length > 1 ? `<small class="mut">${i + 1}/${a.length}</small>` : ''}${fmt(txt(pg.text))}</div></div>`).join('');
  function tutoriales(qs) {
    const d = TU(), n = norm((qs.q || '').trim()), k = ['tuto', 'tips'].includes(qs.k) ? qs.k : '', c = qs.c || '';
    const hit = s => !n || norm(s).includes(n);
    const tutos = k === 'tips' ? [] : d.tutorials.filter(u => (!c || u.cat === c) && hit(u.title + ' ' + gx(u.title) + ' ' + u.pages.map(pg => plain(pg.text) + ' ' + plain(txt(pg.text))).join(' ')));
    const tipCats = [...new Set(d.tips.map(u => u.cat))];
    const tips = k === 'tuto' ? [] : d.tips.filter(u => (!c || u.cat === c) && hit((u.title || '') + ' ' + (u.who || '') + ' ' + plain(u.text) + ' ' + plain(txt(u.text))));
    const open = n && tutos.length <= 8 ? ' open' : '';
    const tipHtml = u => {
      const head = u.skill ? L('habilidad', u.skill, u.title) + (u.char ? ' · ' + L('personaje', u.char, u.who) : '') : u.item ? L('objeto', u.item, u.title) : '';
      const ic = (u.skill && ico().skill?.[u.skill]) || (u.item && ico().item?.[u.item]);
      return `<li>${img(ic, 'ico')}<div>${head ? `<b>${head}</b> ` : ''}${fmt(txt(u.text))}${when(u.when)}</div></li>`;
    };
    const sel = `<label class="filters">${t('Tema')} <select data-qs="tutoriales" name="c"><option value="">${t('Todos los temas')}</option>` +
      `<optgroup label="${t('Tutoriales')}">${d.cats.map(x => `<option value="${esc(x)}"${c === x ? ' selected' : ''}>${esc(gx(x))}</option>`).join('')}</optgroup>` +
      `<optgroup label="${t('Consejos')}">${tipCats.map(x => `<option value="${esc(x)}"${c === x ? ' selected' : ''}>${esc(gx(x))}</option>`).join('')}</optgroup></select></label>`;
    return `<h1>${t('Tutoriales')}</h1><p class="mut">${t('Tutoriales oficiales del juego (menú Tutorial) y consejos de las pantallas de carga. {a} tutoriales · {b} consejos.', { a: tutos.length, b: tips.length })}</p>` +
      `<div class="filters"><input type="search" data-qs="tutoriales" name="q" value="${esc(qs.q || '')}" placeholder="${t('Buscar en títulos y textos')}" aria-label="${t('Buscar en los tutoriales')}" autocomplete="off"></div>` +
      chips('tutoriales', qs, 'k', [['', 'Tutoriales y consejos'], ['tuto', 'Solo tutoriales'], ['tips', 'Solo consejos']], k, 'Tipo') + sel +
      [...d.cats, 'Otros'].map(cat => { const l = tutos.filter(u => u.cat === cat); return l.length ? card(`${gx(cat)} (${l.length})`, l.map(u =>
        `<details class="tu-d"${open}><summary><b>${esc(gx(u.title))}</b>${when(u.when)}</summary>${pagesHtml(u)}<p><a href="${href('tutorial', u.id)}">${t('Abrir en su página')}</a>${autoHref(gx(u.title)) ? ` · <a href="${autoHref(gx(u.title))}">${esc(gx(u.title))}</a>` : ''}</p></details>`).join('')) : ''; }).join('') +
      tipCats.map(cat => { const l = tips.filter(u => u.cat === cat); return l.length ? card(t('Consejos: {c} ({n})', { c: gx(cat), n: l.length }), `<ul class="tu-tips">${l.map(tipHtml).join('')}</ul>`) : ''; }).join('') +
      (!tutos.length && !tips.length ? `<p class="mut">${t('Sin resultados.')}</p>` : '');
  }
  function tutorial(id) {
    const u = TU().tutorials.find(x => x.id === id);
    if (!u) return notFound();
    return `<p class="fi-eye"><a href="#/tutoriales">${t('Tutoriales')}</a> · ${esc(gx(u.cat))}</p><h1>${esc(gx(u.title))}</h1>${when(u.when)}<section class="card">${pagesHtml(u)}</section>`;
  }

  /* ================= registry ================= */
  const S = (label, sub, h, aliases) => ({ group: 'Mecánicas', label, sub, href: h, aliases });
  const CSS = `
.tt-e { display: inline-flex; align-items: center; gap: 4px; margin-right: var(--s3); white-space: nowrap; font-size: var(--fs-small); }
.tt-bar { display: inline-block; width: 48px; height: 6px; border-radius: 3px; background: linear-gradient(90deg, var(--acc) var(--v), var(--surface2) var(--v)); }`;
  register({ id: 'instalaciones', title: 'Dagsion: actividades semanales', render: () => instalaciones(), css: CSS,
    search: () => [S('Dagsion: actividades semanales', 'Plaza de armas, Posada, Teatro, Termas, Percha', '#/instalaciones', ['instalaciones', 'locales semanales']),  // i18n-ignore
      ...[['plaza-de-armas', 'Plaza de armas', ['entrenamiento', 'coliseo', 'entrenar']], ['comidas', 'Posada · Comida', ['comida', 'posada']], ['teatro', 'Teatro', []], ['termas', 'Termas', []],
        ['percha', 'Percha · Cuervo Blanco', ['cuervo blanco']], ['formacion', 'Formación (ruta de Cai)', ['lecciones']], ['torneo', 'Torneo: asistir', []],  // i18n-ignore
        ['actividades-automaticas', 'Posada: actividades automáticas', ['dormir']], ['motivacion', 'Motivación', []], ['adivinacion', 'Adivinación', []], ['horario', 'Horario de los locales', []]]  // i18n-ignore
        .map(([id, l, al]) => S(l, 'Dagsion', '#/instalaciones?ir=' + id, al))] });
  register({ id: 'dioses', title: 'Templos y Servicio divino', render: () => dioses(),
    search: () => [S('Templos y Servicio divino', 'Dioses, bendiciones, audiencias, Arena divina', '#/dioses', ['dioses y bendiciones', 'bendición', 'audiencia', 'templo']),  // i18n-ignore
      S('Servicio divino', 'Templos', '#/dioses?ir=servicio-divino', ['servir'])] });  // i18n-ignore
  register({ id: 'prestigio', title: 'Rangos de Prestigio', render: () => prestigio(),
    search: () => [S('Prestigio', 'Rangos, multiplicadores de los locales y fuentes', '#/prestigio', ['fama', 'rango de prestigio']),  // i18n-ignore
      S('Multiplicadores de los locales', 'Prestigio', '#/prestigio?ir=multiplicadores', ['multiplicador'])] });  // i18n-ignore
  register({ id: 'turnos', title: 'Turnos y viajes', render: () => turnos(),
    search: () => [S('Turnos y viajes', 'Turnos, plazos, banquete y carruajes', '#/turnos', ['turno', 'tiempo', 'plazo', 'carruaje', 'banquete'])] });  // i18n-ignore
  register({ id: 'senores', title: 'Sistemas de cada señor', render: (id, qs) => senores(qs || {}),
    search: () => [S('Sistemas de cada señor', 'Órdenes y locales propios de Cai, Dietrich, Theodora y Leda', '#/senores', ['sistemas por ruta', 'exclusivos de ruta']),  // i18n-ignore
      ...[['cai', 'Tercer Ojo, Altruismo, Formación, Cebo, Establo, Cultivar', ['tercer ojo', 'altruismo']], ['dietrich', 'La Respondedora, Esquirlas del eco, Duelos de Temerario, Transmitir secreto, Cetus', ['respondedora', 'temerario', 'cazatalentos', 'transmitir secreto', 'cetus']],
        ['theodora', 'Enviar suministros, Enviar tropas, Reclutar unidades, Arenga, Cuartel', ['enviar tropas', 'enviar suministros', 'arenga', 'plan de alistamiento']], ['leda', 'Actuar en locales, lugares secretos, taberna, bebidas', ['actuar', 'actuaciones', 'lugares secretos', 'taberna']]]  // i18n-ignore
        .map(([r, sub, al]) => S(`Sistemas de ${ROUTE_NAME[r]}`, sub, `#/senores?ir=${r}`, al))] });
  register({ id: 'sendas', title: 'Rutas, reinicios y Ayudas', routes: ['sendas', 'ayudas'],
    render: (id, qs, sec) => sendas(sec === 'ayudas' ? { t: 'ayudas' } : qs || {}),
    search: () => [S('Rutas, reinicios y Ayudas', 'Qué se conserva al reiniciar o cambiar de ruta', '#/sendas', ['sendas y reinicios', 'senda', 'reiniciar capítulo']), S('Ayudas de salvación', 'Sala de los obeliscos, Esquirlas cau.', '#/ayudas', ['esquirlas']),  // i18n-ignore
      S('Reiniciar capítulo', 'Qué se deshace y qué se conserva', '#/sendas?ir=reiniciar-capitulo', []),  // i18n-ignore
      S('Fin de la Parte 1', 'Qué pasa a la Parte 2', '#/sendas?ir=fin-de-la-parte-1', [])] });  // i18n-ignore
  register({ id: 'partes23', title: 'Partes 2 y 3: sistemas', render: (id, qs) => partes(qs || {}),
    search: () => [...PT.map(([k, l]) => S(l, 'Partes 2 y 3', '#/partes23?t=' + k, ['guerra', 'salvación'])),  // i18n-ignore
      ...((G.p3 || {}).recon || []).map(r => S(`Reconstruir ${r.es}`, 'Parte 3', '#/partes23?t=p3', [r.kind]))] });  // i18n-ignore
  register({ id: 'dificultad', title: 'Dificultad, DLC y parches', render: (id, qs) => dificultad(qs || {}),
    search: () => [S('Normal y Difícil', 'Dificultad', '#/dificultad?t=dif', ['clásico', 'novato', 'casual']), S('Parche 1.0.1', 'Armas adicionales', '#/dificultad?t=parches', []),  // i18n-ignore
      S('Pase de expansión', 'Oleadas y Prototipos', '#/dificultad?t=dlc', ['dlc', 'prototipo'])] });  // i18n-ignore
  register({ id: 'glosario', title: 'Glosario', render: (id, qs) => glosario(qs || {}) });
  register({ id: 'tutoriales', title: 'Tutoriales', routes: ['tutoriales', 'tutorial'], render: (id, qs) => (id ? tutorial(id) : tutoriales(qs || {})),
    search: () => TU().tutorials.map(u => S(u.title, 'Tutorial · ' + u.cat, href('tutorial', u.id))) });  // i18n-ignore
  register({ id: 'batallones', title: 'Batallones', routes: ['batallones', 'batallon'], render: (id, qs) => (id ? batallon(id) : batallones(qs || {})),
    search: () => (G.battalions || []).map(b => ({ group: 'Clases', label: b.es, sub: `Batallón · rango ${b.rank}`, href: href('batallon', b.id), aliases: [b.en] })) });
})();
