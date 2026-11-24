/* Fortune's Weave · Equipo (#/equipo?r=<ruta>; core.js sends the old #/planificador here): the selector of recruits, roles, builds and
   equipment, recruitment, and the «Esta semana» block that Capítulo shows. The model lives in equipo-*.js, loaded before this file. */
'use strict';

(() => {
  const TL = { fav: '★ Favorito', love: '♥ Le encanta', like: 'Le gusta' };  // shown through t()
  // tokens and components of style.css only: cards between units, a softer rule between stages, a tinted block for the extras
  const CSS = `.fi-sec:has(> .eq-box){background:none;border:0;box-shadow:none;padding:0}.eq-box+.eq-box{margin-top:var(--s3)}\n@media (max-width:600px){.eq-gifts .eq-gi{display:flex;align-items:center;gap:6px;padding:2px 0}.eq-gifts .eq-gi>a{flex:1;min-width:0}.eq-gifts .eq-tw{display:none}.eq-gifts .eq-rec{gap:var(--s2)}}\n.eq-pick{font:inherit;cursor:pointer}.eq-pick.on{padding-right:28px}.eq-pick.on::after{background:url(img/ui/IconCheck.png) right 8px center/14px no-repeat,var(--cf)}.eq-st{font-weight:650;color:var(--tx)}
.eq-units{display:grid;gap:var(--s4)}.eq-unit{margin:0;padding:var(--s3) var(--s4)}
.eq-unit>header{display:flex;align-items:center;gap:var(--s3);margin:0 0 var(--s2)}.eq-unit>header h4{margin:0}.eq-unit>header .cp-tag{margin:0 var(--s1) 0 0}
.eq-steps{list-style:none;margin:0;padding:0}.eq-steps>li{padding:var(--s2) 0;border-top:1px dashed var(--line)}.eq-steps>li:first-child{border-top:0;padding-top:0}
.eq-steps small{display:block;color:var(--mut)}.eq-extra{margin:var(--s3) 0 0;padding:var(--s1) var(--s3);background:var(--surface2);border-radius:var(--r1)}
.eq-extra .kv:first-of-type{border-top:0}.eq-extra .kv{border-top-color:var(--line)}.eq-sel summary{cursor:pointer;min-height:var(--tap);display:flex;align-items:center;gap:var(--s2);flex-wrap:wrap}
.eq-gap{color:var(--tx);box-shadow:inset 3px 0 0 var(--focus);padding-left:var(--s3)}.li-card.eq-on,.card.eq-on{border-color:var(--sel-line)}
.eq-tag{font-size:var(--fs-small);color:var(--tx2)}.eq-more summary{cursor:pointer;color:var(--tx2);min-height:var(--tap);display:flex;align-items:center}\n.eq-recs,.eq-need,.eq-gl{list-style:none;margin:0;padding:0}.eq-rec{display:flex;gap:var(--s3);align-items:flex-start;padding:var(--s2) 0;border-top:1px solid var(--line)}.eq-rec:first-child{border-top:0}.eq-rec>div{min-width:0;flex:1}.eq-rec b{display:block;font:600 15px/1.3 var(--font-display);letter-spacing:.02em}.eq-line{display:block;color:var(--tx2)}.eq-rec small{display:block}.eq-need li{display:grid;grid-template-columns:auto auto 1fr;column-gap:var(--s2);align-items:baseline;padding:var(--s1) 0;border-top:1px solid var(--line)}.eq-need li:first-child{border-top:0}.eq-need li small{grid-column:1/-1}.eq-need li:only-child,.eq-need li:not(:has(b)){display:block}.eq-gi{display:block;padding:2px 0;font-size:var(--fs-small);line-height:1.4}.eq-gi .ico{vertical-align:middle}.eq-gear{margin:var(--s2) 0 0;padding-top:var(--s2);border-top:1px dashed var(--line)}.eq-gear>p{margin:0}.eq-gear .fold{border-top:0;margin:0}.eq-sel-t{font-size:17px;line-height:1.3}.eq-sel-t small{display:block;font:400 var(--fs-small)/1.4 var(--font);letter-spacing:0}.eq-acts{margin-left:calc(-1 * var(--s2))}.eq-due{padding-left:var(--s3);box-shadow:inset 3px 0 0 var(--focus)}`;
  const face = (pid, cls = 'ico ico-personaje') => img(ico().face?.[pid], cls);
  const cls = jid => (CLASSES[jid] ? `${img(ico().job?.[jid], 'ico')}${L('clase', jid)}` : '');
  const capOf = key => (CAPS[key] ? chapLink(key) : '');
  const statLine = o => STAT_KEYS.filter(k => o?.[k]).map(k => `${statName(k)} +${o[k]}`).join(', ');
  const roleNames = rs => list(rs.map(r => t(ROLES.find(x => x[0] === r)[1])));

  /** one mount stage in one line: mount, rarity, what it adds at bond 5, best place, and when to start; details live in the mount's ficha */
  function mountRow(b, st, got, route, key) {
    const head = t('Montura {k}', { k: t(st.kind) });
    if (!got?.rid) return [head, `<span class="mut">${t('Sin montura en esta ruta y parte')}</span>`];
    const m = MOUNTS[got.rid], spot = teamMountSpots(got.rid, key)[0], p3 = CAPS[key]?.part === 3;
    const tag = m.default_class_mount ? (teamCatchOpen(route, key) ? t('de la clase') : t('de la clase; aquí no se capturan')) : m.unique_q ? (ownerOf(m) === b.pid ? t('propia') : t('de {p}', { p: esc(nm(CHARS[ownerOf(m)])) })) : teamMountRare(got.rid) ? t('rara') : t('común');
    const step = st.at >= 0 ? b.steps[st.at] : null;
    const dbl = teamMountMul(st.classes) > 1;
    const bits = [statLine(m.growth_by_bond?.['5']) && t(dbl ? '{g} con vínculo 5 (doble en Cuadriguero)' : '{g} con vínculo 5', { g: statLine(m.growth_by_bond['5']) }),
      !m.default_class_mount && !m.unique_q && spot && `${L('lugar', spot.spot, spot.es)} ${pct(spot.pct)}`,
      !m.default_class_mount && !m.unique_q && spot && (() => { const rv = spotAccess(spot.spot, 'cai', key).reveal; return rv.length ? t('antes hay que descubrirlo ({how})', { how: esc(rv.slice(0, 2).join(t(' o '))) }) : ''; })(),
      st.early && step && !m.default_class_mount && (capOf(step.key) ? t('capturarla y alimentarla antes del {c}', { c: capOf(step.key) }) : t('capturarla y alimentarla antes del examen de {c}', { c: esc(nm(CLASSES[step.jid])) })),
      p3 && !m.default_class_mount && !m.unique_q && t('en la Parte 3 se captura si Cai está en el ejército'),
      got.lost_to && t('{m} va a {p}', { m: L('montura', got.want), p: L('personaje', got.lost_to) })].filter(Boolean);
    return [head, `${L('montura', got.rid)} <span class="eq-tag">${tag}</span>${bits.length ? `<br><small class="mut">${bits.join(' · ')}</small>` : ''}`];
  }

  /** one unit's build: stages, then the extras (target, skills, weapon, mounts) grouped apart; mounts = plan.mounts[pid] */
  function buildHtml(b, mounts, route = ctxGet().route, key = ctxGet().key) {
    if (!b) return '';
    if (!b.target) return `<p class="mut">${t('Ninguna clase objetivo tiene una ruta de clases válida en esta ruta.')}</p>`;
    const steps = [`<li><span class="mut">${t('Empieza en')}</span> ${cls(b.start)}</li>`, ...b.steps.map(s => `<li><b>${cls(s.jid)}</b>${s.bridge ? ` <span class="eq-tag">${t('clase puente')}</span>` : ''} ` +
      `<span class="mut">${[s.level ? t('Nv {n}', { n: s.level }) : '', capOf(s.key) ? t('hacia el {c}', { c: capOf(s.key) }) : ''].filter(Boolean).join(' · ')}</span><small>${esc(s.why)}</small></li>`)].join('');
    const stages = teamMountStages(b);
    return `<ol class="eq-steps">${steps}</ol><div class="eq-extra">` + kvRows([
      [t('Clase objetivo'), `${cls(b.target)} <small class="mut">${esc(b.target_why)}</small>`],
      [t('Habilidades que llevar'), esc(list(b.skills.map(gt)))],
      [t('Arma principal'), list(b.weapons.map(w => `${esc(t(w.type))}: ${w.iid ? L('objeto', w.iid) : t('sin arma en tienda en esta parte')}`))],
      ...stages.map(st => mountRow(b, st, mounts?.[st.kind], route, key)),
    ]) + '</div>';
  }
  window.teamBuildHtml = buildHtml;
  /** Equipo › Builds: one line per unit (class path and target); stages, skills, weapon and mounts live in the character ficha */
  const buildSummary = b => (!b?.target ? `<p class="mut">${t('Sin ruta de clases válida en esta ruta.')}</p>` :
    `<p class="eq-path">${[b.start, ...b.steps.map(x => x.jid)].map(cls).join(' → ')}</p>` +
    `<p><a href="${href('personaje', b.pid)}?sec=partida">${t('Build completa, armas y monturas')}</a></p>`);

  /** character ficha: the mount of each stage for every build of the unit, with what it adds at bond 5 and the difference with the recommended one */
  function mountsByBuild(pid, route, key, plan) {
    const opts = teamBuildOptions(pid, route, key), mine = plan?.builds.find(x => x.pid === pid);
    if (mine?.target) opts.unshift({ label: t('En tu equipo'), path: [mine.start, ...mine.steps.map(s => s.jid)], team: true });
    const rows = opts.map(o => {
      const st = o.team ? teamMountStages(mine).map(x => { const g = plan.mounts[pid]?.[x.kind], mul = teamMountMul(x.classes);
        const g5 = Object.fromEntries(Object.entries(MOUNTS[g?.rid]?.growth_by_bond?.['5'] || {}).map(([k, v]) => [k, v * mul]));
        return { kind: x.kind, rid: g?.rid, g5, double: mul > 1, total: Object.values(g5).reduce((a, v) => a + v, 0) }; }) : teamMountsFor(pid, o.path, route, key);
      return { ...o, st, total: st.reduce((a, x) => a + x.total, 0) };
    });
    const base = rows.find(r => r.rec)?.total;
    if (!rows.some(r => r.st.length)) return '';
    return `<h4>${t('Montura por build')}</h4>${ul(rows.map(r => li(`${esc(r.label)}: ${r.path.map(j => esc(nm(CLASSES[j]))).join(' → ')}`,
      r.st.length ? `${r.st.map(x => `${esc(t(x.kind))}: ${x.rid ? L('montura', x.rid) : '—'}${statLine(x.g5) ? ` (${statLine(x.g5)})` : ''}`).join(' · ')} · ${t('total +{n}', { n: r.total })}` +
        (base != null && !r.rec ? ` (${r.total === base ? t('igual que la recomendada') : t('{d} frente a la recomendada', { d: `${r.total > base ? '+' : '−'}${Math.abs(r.total - base)}` })})` : '') : t('a pie'))))}` +
      `<p class="mut">${t('Crecimiento que añade cada montura con vínculo 5, solo mientras la clase la monta. En Cuadriguero el bono de la montura cuenta doble.')}</p>`;
  }
  window.teamMountsByBuild = mountsByBuild;

  const RULES = [  // Spanish keys: WEEK_RULE reads them; shown through t()
    'Equipo: el señor de la ruta, los que se unen por la historia y no se han desmarcado (hasta el final de la Parte 1; los del prólogo solo en el prólogo; los de las Partes 2 y 3 desde su capítulo) y los reclutas marcados como «quiero reclutarlo» o «ya lo tengo»: builds y papeles cuentan los dos grupos. Los señores de la llama no salen en la lista.',
    'Semana, regalos, comidas y reclutamiento solo cuentan los «quiero»: a los que ya tienes no hace falta subirles el apoyo para reclutarlos.',
    'Prioridad (etiqueta de cada build): el señor de la ruta, después la valoración publicada (S, A, B, C; sin valoración cuenta como B), después quien se une antes y por último el nombre.',
    'Clase de inicio: la última clase por defecto de la Parte 1. Arma principal: la primera, entre las de la clase objetivo, que permite una ruta válida, en este orden: línea de arma publicada de la unidad, arma inicial, arma que comparte con su clase de inicio, magia y el resto.',
    'Clase objetivo: la recomendada para la unidad; si no tiene una ruta válida en esta ruta, la alternativa; si tampoco, la clase avanzada recomendada; si ninguna es alcanzable, la clase magistral alcanzable con el arma principal que más crece en sus atributos principales.',
    'Ruta de clases: una clase por nivel de clase. Cada una debe existir en esta ruta y parte (las que piden desbloqueo solo donde se desbloquean), usar el arma principal y tener un examen alcanzable con lo que la unidad ya entrena (el arma principal y la equitación, el vuelo o la coraza que enseñan sus clases anteriores). Entre las válidas gana la que menos cambia de tipo de montura y conserva más tiempo la actual; después, la que reúne más habilidades maestras útiles, la que sigue el árbol del juego y la de más crecimiento en los atributos principales.',
    'El crecimiento de una clase solo cuenta mientras se está en ella: cada paso indica los tres atributos que más suben en esa clase.',
    'Examen en el nivel recomendado de la clase: por cada nivel por debajo, la probabilidad se multiplica por 50, 32, 18, 8 y 2 %. El capítulo es el primero, desde que la unidad está en el grupo y hay licencia y examen, cuyo nivel enemigo alcanza ese nivel.',
    'El examen sube los atributos que falten hasta los mínimos de la clase (en la ficha de cada clase).',
    'Clase puente: la primera habilidad maestra útil (Crescendo, Técnica entrenada, Siempre alerta, Contra mayor) de una clase disponible en la ruta que use el arma principal y cuyo examen se alcance con lo ya entrenado; si no hay ninguna, no hay puente. Dominar la clase la deja para siempre.',
    'El vínculo con la montura es de cada pareja unidad-montura y se conserva mientras la clase use el mismo tipo de montura. Si la etapa siguiente usa otro tipo, conviene capturar y alimentar la nueva antes: el vínculo sube aunque la clase actual no la monte.',
    'En Cuadriguero el bono de la montura cuenta doble (crecimientos y bonos fijos); la búsqueda de ruta lo tiene en cuenta y, desde el nivel 35, la Senda de la cuadriga suma crecimiento.',
    'Monturas: una por cada tipo de montura de la ruta de clases (el vínculo es de cada pareja y sirve en todas las clases de ese tipo). Gana la que más suma su crecimiento con vínculo 5 con los crecimientos de la unidad en la clase objetivo. Solo se proponen monturas que existen en la ruta y parte: capturarlas es cosa de Cai (en la Parte 1, y en la Parte 3 si Cai está en el ejército) en la Parte 1, desde el capítulo que abre el Cebo. Las raras (solo salen en el hueco raro de un campo) van a una sola unidad, por prioridad; las propias (Rocinán, Bucephalus) se pueden dar a otra unidad si su dueño está en el equipo, y van a quien más gana con ellas (a su dueño si empatan); las comunes y la de la clase se repiten.',
    'Arma: la de más poder del arma principal que se vende en una tienda abierta en esta parte, desde el capítulo elegido.',
    'Compras: armas eficaces contra los tipos de enemigo (2 o más) de la batalla del capítulo y la del siguiente, para quien del equipo usa ese tipo de arma (una por tipo de arma: la que pide menos Prestigio y está más cerca; los voladores no cuentan porque cualquier arco ya es eficaz); la licencia y los manuales del próximo examen de cada build; el arma principal; y accesorios con regla (Anillo de gigante para el Cuadriguero). El tipo de enemigo sale de su clase: acorazado si su examen pide Coraza, jinete si entrena Equitación, volador si entrena Vuelo. Solo lugares abiertos en esta ruta, parte y capítulo; en la Parte 1 de Cai, con el Prestigio que piden sus puestos fronterizos. Se agrupan por lugar.',
    'Nueva vuelta: el mapa sale desvelado (no hace falta descubrir los lugares, pero los puestos fronterizos y el Prestigio siguen igual), los apoyos se conservan y las misiones de otras rutas ya están hechas. Lo que está cerrado a Cai en la Parte 1 sigue cerrado.',
    'Trueques de Vandahl: si lo que piden se consigue con Búsqueda en un lugar accesible, se propone la cadena búsqueda y trueque.',
    'El nivel enemigo sigue la media de las 10 unidades de más nivel: conviene repartir la EXP entre todo el equipo.',
    'Regalos: el favorito de un «quiero» no se propone a otro (si dos comparten favorito, lo recibe el de más prioridad). Orden: favorito (el más caro da más apoyo), le encanta (el más barato primero) y le gusta (en el orden del juego, para encontrarlos en la lista de regalos). Solo se proponen regalos con alguna fuente abierta en esta ruta y parte.',
    'Regalos semanales: los «le gusta» y «le encanta» más baratos con fuente abierta, sin ningún favorito de otro «quiero».',
    'Comidas: el apoyo para reclutar es con el señor de la ruta. Se cuenta desde cero (la página no lee la partida): 400, 1400, 2400 y 3200 puntos para los apoyos 2 a 5, a 60 puntos por comida sin bonos. Van primero los que necesitan más comidas por cada semana que les queda hasta su plazo (el cierre del recluta o, si no tiene, el final de la Parte 1), de dos en dos. El plato es el de la carta de esa semana que más gusta a los dos.',
    'Servicio divino: el señor con el «quiero» más urgente, porque el apoyo sube entre los dos que sirven; el día sagrado del dios garantiza el resultado alto, y todos los domingos son día sagrado de todos los templos. Una vez por semana; también suma tributo a la bendición del dios.',
    'Comidas: dos platos por semana (tres desde Prestigio 3), a mitad de precio el domingo. Cada invitado necesita un regalo previo.',
    'Plazos: arriba los reclutas que cierran en este capítulo; los demás, plegados. Las comidas se cuentan desde cero.',
    'Ronda de regalos: favoritos y «le encanta» a la vista; los «le gusta», plegados. El resto de perdibles de la ruta está en Perdibles.',
    'Teatro: ver la obra con quien le gusta da más motivación y sube el apoyo entre los espectadores. Percha: sube el apoyo con Eshmel, así que no adelanta reclutamientos.',
    'Refinado: el arma principal de cada build, las armas eficaces de Compras y el arma inicial de cada unidad, hasta el nivel que permiten los materiales de esta parte (sin Marcialito en la Parte 1; sin materiales de regiones cerradas ni de cajas al azar), ordenadas por Pot ganada por usuario y coste. La página no lee la partida: parte de +0.',
    'Herrería: abre en la Parte 1 con su desbloqueo y vuelve en la Parte 3; en la Parte 2 no hay. Si el primer paso solo da Pot +1 y pide un material escaso (sin tienda y con búsqueda del 10 % o menos), conviene repararla y guardar el material.',
    'Equipamiento: para cada unidad que ya tienes, el arma más fuerte del tipo de su build si su clase de ese capítulo puede usarlo (si no, de un tipo que usen su clase y las de su build; nunca otro), sin arma si su build es de magia (los hechizos son propios de cada unidad), con lo que se consigue en ese punto: equipo inicial, recompensas de misiones de capítulos ya jugados, cofres de lugares accesibles y tiendas abiertas. Las piezas únicas (cofre, recompensa) van a una sola unidad, por prioridad. Opciones: hasta tres armas que se venden ahora en un lugar accesible, con su precio. El peso resta velocidad de ataque cuando supera la Constitución (estimada como Fue ÷ 5): se indica la cifra. Entre armas del mismo tipo gana la de más daño por ronda contra un enemigo típico del capítulo (media de su nivel de clase al nivel recomendado), el doble si se le dobla con seguridad, menos un punto por cada punto de velocidad de ataque perdido: un arma pesada que pierde el ataque doble queda detrás de una ligera salvo que pegue más del doble.',
    'Equipamiento: rango de arma máximo por capítulo (la página no conoce la competencia de cada unidad): hierro antes del capítulo 6 de la Parte 1, armas especiales hasta el final de la Parte 1 y plata desde la Parte 2. Peso: si un arma resta 2 o más de velocidad de ataque (peso − Con, con Con = Fue ÷ 5 estimada al nivel del capítulo), cuenta con 3 de Pot menos al compararla con las ligeras, para no perder el ataque doble por poco.',
    'Reclutar pronto: fuera del grupo una unidad sube sola al 80 % de su crecimiento personal y sin crecimientos de clase.',
  ];

  /** rules shown under «Esta semana» (Capítulo); the rest under Equipo */
  const WEEK_RULE = /^(Semana|Compras|Trueques|Regalos|Comidas|Servicio|Plazos|Ronda|Teatro|Refinado|Herrería)\b/;
  /** one recruit: face, name and one line with what it asks (support · Prestigio · payment), plus the deadline when it has one */
  function recruitStep(s, route) {
    const late = CAPS[s.start_by_key] && Object.values(CAPS).flatMap(c => (c.route === route ? c.closing : []).filter(x => x.kind === 'recluta' && x.id === s.pid).map(x => [c.key, x]))[0];
    const asks = [t('Apoyo {n} con {l}', { n: s.support, l: esc(ROUTE_NAME[route]) }), t('Prestigio {n}', { n: s.renown }), s.gold ? gold(s.gold) : '', ...s.items.map(i => `${i.n}× ${L('objeto', i.id, i.es)}`)].filter(Boolean).join(' · ');
    const plazo = late ? `<small class="mut">${t('Plazo: {d} ({c}).', { d: late[1].deadline ? t('hasta el {d}', { d: fechaDia(late[1].deadline) }) : t('hasta el final del capítulo'), c: chapLink(late[0]) })} ${esc(dataTx(late[1].if_missed || ''))}</small>` : '';
    const j = joinAt(s.pid, route, joinKeyFor(s.pid, route, ctxGet().key));  // the class of the level they join at (core.js)
    const llega = j ? `<small class="mut">${t('Llega con Nv {a}–{b} aprox.: {k}', { a: j.lv[0], b: j.lv[1], k: j.classes.map(c => c[1] ? L('clase', c[1]) : esc(gt(c[2]))).join(` ${t('o')} `) })}</small>` : '';
    return `<li class="eq-rec">${face(s.pid, 'cp-face') || '<span class="cp-face"></span>'}<div><b>${L('personaje', s.pid)}</b><span class="eq-line">${asks}</span>${llega}${plazo}</div></li>`;
  }
  /** «★ Favorito»: the symbol and the word apart, so a narrow screen can keep only the symbol */
  const tierTag = k => { const m = t(TL[k]).match(/^([★♥])\s*(.*)$/);
    return `<span class="eq-tag">${m ? `<span aria-hidden="true">${m[1]}</span><span class="eq-tw"> ${esc(m[2])}</span>` : esc(t(TL[k]))}</span>`; };
  /** the gift round: one compact row per «quiero» (serial order), its first gifts inline and the rest folded */
  function giftRound(round) {
    if (!round.length) return '';
    // one short line per gift (name, level, price); where to get it is the item's ficha and the line's tooltip
    const it = x => `<span class="eq-gi" title="${esc(list(x.src.slice(0, 3)).replace(/<[^>]*>/g, ''))}"><i class="tier tier-${x.t}" aria-hidden="true"></i>${img(ico().item?.[x.iid], 'ico')}${L('objeto', x.iid)} ${tierTag(x.t)}${x.price ? ` <span class="mut">${gold(x.price)}</span>` : ''}</span>`;
    const row = r => `<li class="eq-rec">${face(r.pid, 'cp-face') || '<span class="cp-face"></span>'}<div><b>${L('personaje', r.pid)}</b>` +
      (r.none ? `<span class="eq-line mut">${t('Sin datos de regalos.')}</span>` : !r.items.length ? `<span class="eq-line mut">${t('Ningún regalo apreciado con fuente abierta en esta parte.')}</span>` :
        (() => { const love = r.items.filter(x => x.t === 'love'), top = [...r.items.filter(x => x.t === 'fav'), ...love.slice(0, 2)];  // favourite + the two cheapest loves visible
          const like = r.items.filter(x => x.t === 'like'), ord = Object.keys(W.items); like.sort((a, b) => ord.indexOf(a.iid) - ord.indexOf(b.iid));  // likes in the game's item order, to find them in the in-game gift list
          const rest = [...love.slice(2), ...like];
          return top.map(it).join('') + (rest.length ? `<details class="eq-more"><summary>${t('Más regalos ({n})', { n: rest.length })}</summary>${rest.map(it).join('')}</details>` : ''); })()) + '</div></li>';
    return `<ul class="eq-recs">${round.map(row).join('')}</ul>`;
  }
  function recruitment(route, picked) {
    const { steps, totals } = planRecruits(route, picked);
    if (!steps.length) return '';
    const need = [totals.gold ? `<li>${gold(totals.gold)}</li>` : '', ...Object.entries(totals.items).map(([iid, n]) =>
      `<li>${img(ico().item?.[iid], 'ico')}<b>${n}×</b> ${L('objeto', iid)}<small class="mut">${(() => { const src = itemSources(iid, route, ctxGet().key); return src.length ? list(src.slice(0, 2)) + (src.length > 2 ? ' ' + t('y {n} más en su ficha', { n: src.length - 2 }) : '') : t('Sin fuente fija en esta ruta'); })()}</small></li>`)].filter(Boolean);
    return `<ul class="eq-recs">${[...steps].sort((a, b) => bySerial(a.pid, b.pid)).map(s => recruitStep(s, route)).join('')}</ul>` +
      (need.length ? `<h4>${t('Oro y objetos necesarios')}</h4><ul class="eq-need">${need.join('')}</ul>` : '');
  }

  const STATE_LONG = { no: 'no está en el equipo', quiero: 'quiero reclutarlo', tengo: 'ya lo tengo', llega: 'se une por la historia más tarde' };  // shown through t()
  const STATE_SHORT = { quiero: 'quiero', tengo: 'tengo', llega: 'llega' };  // the chip's state word, through t()
  const day = d => (d ? fechaDia(d) : '');
  const who = ps => list(ps.map(p => L('personaje', p)));

  /** birthdays of the «quiero» in this chapter: that day the gift counts more */
  const birthdays = w => { const bds = (w?.birthdays || []).map(b => t('{p} el {d}', { p: L('personaje', b.pid), d: day(b.date) }));
    return bds.length ? `<p class="mut">${t('Cumpleaños: {l}; ese día el regalo cuenta más.', { l: list(bds) })}</p>` : ''; };
  /** «Semana»: a short checklist for the «quiero» recruits at the context chapter, in the order it is done:
      buy, meals, gifts (the gift round), Servicio divino, deadlines due this chapter; explanations live in «Cómo se calcula» */
  function weekHtml(w, round, shop, forge) {
    const lordN = L('personaje', w.lord), compras = shopHtml(shop, w.route) + forgeHtml(forge);
    if (!w.need.length) return compras + `<p class="mut">${t('Ningún recluta marcado como «quiero reclutarlo» en esta ruta: no hay regalos ni comidas que preparar.')}</p>`;
    const live = w.need.filter(n => !n.late && n.pts > 0);
    // meals: one line per week, the first two open
    const dish = d => (d ? `${esc(gt(d.es))}${d.renown_rank > 1 ? ` <small class="mut">(${t('Prestigio {n}', { n: d.renown_rank })})</small>` : ''}` : t('sin plato en la carta'));
    const menu = sun => (CAPS[w.key]?.weeks || []).find(x => x.sunday === sun)?.menu || [];  // the week's full menu, folded under its row
    const weekRow = m => li(t('Semana del {d}', { d: day(m.sunday) }), m.pairs.map(q => `${t('{a} con {b}', { a: lordN, b: who(q.guests) })}: ${dish(q.dish)}`).join(' · ') +
      (menu(m.sunday).length ? `<details class="eq-more"><summary>${t('Carta de la Posada ({n})', { n: menu(m.sunday).length })}</summary>${esc(list(menu(m.sunday).map(d => gt(d.es) + (d.renown_rank > 1 ? ` (${t('Prestigio {n}', { n: d.renown_rank })})` : ''))))}</details>` : ''));
    const comidas = `<h4>${t('Comidas en la Posada')}</h4>` + (!w.inn ? `<p class="mut">${t('La Posada abre en el {c}.', { c: chapLink(w.innAt) })}</p>` : !live.length ? `<p class="mut">${t('Ningún «quiero» necesita apoyo con el señor.')}</p>` :
      (w.meals.length ? ul(w.meals.slice(0, 2).map(weekRow)) + (w.meals.length > 2 ? `<details class="eq-more"><summary>${t('Resto de semanas del capítulo ({n})', { n: w.meals.length - 2 })}</summary>${ul(w.meals.slice(2).map(weekRow))}</details>` : '') : '') +
      (w.rerun ? `<p class="mut">${t('Nueva vuelta: salta las parejas que ya tengan el apoyo.')}</p>` : ''));
    // gifts: the round, one row per «quiero»
    const regalos = `<h4 id="eq-ronda">${t('Ronda de regalos')}</h4>` + birthdays(w) +
      (giftRound(round) || `<p class="mut">${t('Ningún «quiero» con regalos que preparar.')}</p>`);
    // Servicio divino
    const tp = w.temple;
    const templo = `<h4>${t('Servicio divino')}</h4>` + (!tp ? `<p class="mut">${t('Todavía no está abierto en este capítulo.')}</p>` :
      `<p>${t(tp.with ? '{l} con {p}, en domingo{d} o en el día sagrado del dios.' : '{l}, en domingo{d} o en el día sagrado del dios.', { l: lordN, p: tp.with ? L('personaje', tp.with) : '', d: tp.sundays.length ? ` (${list(tp.sundays.map(day))})` : '' })}</p>`);
    // deadlines: the ones due this chapter, the rest folded
    const dl = n => n.deadline ? (n.deadline.part ? t('antes del final de la Parte 1') : t('antes del {d} ({c})', { d: day(n.deadline.date), c: chapLink(n.deadline.key) })) : '';
    const plazoRow = n => li(`${L('personaje', n.pid)} · ${t('apoyo {a}, Prestigio {r}', { a: n.support, r: n.renown })}`,
      n.late ? t('El plazo ya pasó.') : [n.open ? t('ya se puede reclutar') : t('desde el {c}', { c: chapLink(n.from) }), dl(n), n.meals ? t('unas {n} comidas desde cero', { n: n.meals }) : ''].filter(Boolean).join(' · '));
    const byDate = [...w.need].sort((a, b) => chapOrder(a.deadline?.key) - chapOrder(b.deadline?.key) || b.urgency - a.urgency);
    const due = byDate.filter(n => n.late || n.deadline?.key === w.key), later = byDate.filter(n => !due.includes(n));
    const plazos = `<h4>${t('Plazos')}</h4>` + (due.length ? ul(due.map(plazoRow)) : `<p class="mut">${t('Ningún recluta cierra en este capítulo.')}</p>`) +
      (later.length ? `<details class="eq-more"><summary>${t('Los que cierran más adelante ({n})', { n: later.length })}</summary>${ul(later.map(plazoRow))}</details>` : '');
    const other = [
      w.play.length && li(t('Teatro (Prestigio 7)'), w.play.map(pl => `«${esc(gt(pl.es))}»${pl.fans.length ? t(': les gusta a {p}', { p: who(pl.fans) }) : ''}`).join(' · ')),
      w.renown >= 8 && li(t('Termas (Prestigio 8)'), t('{l} con un «quiero»; el domingo da más apoyo.', { l: lordN })),
      w.training && li(gt('Plaza de armas'), t('poco apoyo; sirve para las competencias.')),
      w.rerun && li(t('Nueva vuelta'), t('las misiones de otras rutas ya están hechas.')),
      w.renown && li(t('Prestigio'), t('el más alto que piden tus «quiero»: {n}.', { n: w.renown })),
    ].filter(Boolean);
    const detours = w.detours?.length ? `<p>${t('Desvíos de este capítulo que quizá perdiste en la vuelta anterior: {l}.', { l: list(w.detours.map(d => `<a href="${href('batalla', d.id)}">${esc(gt(d.es))}</a>`)) })}</p>` : '';
    // Percha: who to take and the answers, in their ficha
    const raven = live.filter(n => CHARS[n.pid]?.p?.pale_raven?.sets?.length).map(n => `<a href="${href('personaje', n.pid)}?sec=partida">${esc(nm(CHARS[n.pid]))}</a>`);
    const percha = w.perch ? `<h4>${t('Percha')}</h4><p>${t('Sube el apoyo con Eshmel, no con {l}.', { l: lordN })}${raven.length ? ' ' + t('Respuestas: {l}.', { l: list(raven) }) : ''}</p>` : '';
    const dueLine = due.length ? `<p class="eq-due">${t('Cierran en este capítulo: {l}. Detalle en Plazos.', { l: list(due.map(n => L('personaje', n.pid))) })}</p>` : '';
    return dueLine + compras + comidas + regalos + templo + percha + plazos + detours + (other.length ? `<details class="eq-more"><summary>${t('Otras actividades ({n})', { n: other.length })}</summary>${ul(other)}</details>` : '');
  }

  const matTxt = m => list(Object.entries(m).map(([iid, n]) => `${n}× ${L('objeto', iid)}`));
  const plusN = iid => (String(ITEMS[iid]?.es || '').match(/\+\d+$/) || [''])[0];
  const srcTxt = (mat, s) => `${esc(nm(ITEMS[mat]))}: ${s.spot ? t('Búsqueda en {p} ({n})', { p: L('lugar', s.spot), n: pct(s.pct) }) : s.text || t('sin fuente fija ahora')}`;
  /** «Herrería»: one line per weapon (three open, the rest folded), Part 3 chains folded */
  function forgeHtml(f) {
    if (!f) return '';
    const h = `<h4 id="eq-herreria">${gt('Herrería')}</h4>`;
    if (!f.rows.length && !f.later.length) return h + `<p class="mut">${f.closed ? t('La Herrería abre en el {c}.', { c: chapLink(f.closed) }) : f.closed === null && CAPS[ctxGet().key]?.part === 1 ? t('Nada que refinar con los materiales de esta parte.') : t('Sin herrería en esta parte.')}</p>`;
    const row = r => r.repair
      ? li(t('{i}: repárala', { i: L('objeto', r.iid) }), `${t('{m} y {g}; refinarla a +1 solo da Pot +1. Guarda el material para otra arma.', { m: matTxt(Object.fromEntries(r.repair.mats.map(m => [m.iid, m.n]))), g: gold(r.repair.gold) })} ${Object.entries(r.src).map(([m, s]) => srcTxt(m, s)).join(' · ')}.`)
      : li(`${L('objeto', r.iid)} → ${plusN(r.to)} (${t('Pot +{n}', { n: r.pot })}${r.effect ? `; ${esc(r.effect.replace(/\.$/, ''))}` : ''})`,
        `${t('{m} y {g}; para {p}.', { m: matTxt(r.mats), g: gold(r.gold), p: list(r.users.map(p => L('personaje', p))) })} ${Object.entries(r.src).map(([m, s]) => srcTxt(m, s)).join(' · ')}.`);
    const later = f.later.map(r => li(`${L('objeto', r.iid)} → ${plusN(r.to)} (${t('Pot +{n}', { n: r.pot })}${r.effect ? `; ${esc(r.effect.replace(/\.$/, ''))}` : ''})`, t('{m} y {g}; para {p}.', { m: matTxt(r.mats), g: gold(r.gold), p: list(r.users.map(p => L('personaje', p))) })));
    return h + (f.rows.length ? ul(f.rows.slice(0, 3).map(row)) : '') +
      (f.rows.length > 3 ? `<details class="eq-more"><summary>${t('Más armas ({n})', { n: f.rows.length - 3 })}</summary>${ul(f.rows.slice(3).map(row))}</details>` : '') +
      (later.length ? `<details class="eq-more"><summary>${t('Para la Parte 3 ({n})', { n: later.length })}</summary>${ul(later)}</details>` : '') +
      `<p class="mut">${t('Refina en vez de reparar: el primer paso cuesta lo mismo y también la deja al máximo. Hazlo antes de que llegue a 0 usos.')}</p>`;
  }
  const SRC_KIND = { inicial: () => t('equipo inicial'), mision: s => t('misión {q}', { q: L('mision', s.quest) }), cofre: s => t('cofre en {p}', { p: L('lugar', s.spot) }),
    tienda: s => `${s.spot ? L('lugar', s.spot) : esc(dataTx(s.where))}, ${gold(s.price)}`, ambulante: s => `${esc(dataTx(s.where))}, ${gold(s.price)}`,
    barter: s => t('trueque en {p}', { p: s.spot ? L('lugar', s.spot) : esc(dataTx(s.where)) }) };
  /** one unit's equipment: a compact line (weapon now, where from, refining link) and the options folded */
  function gearHtml(g, forge) {
    if (!g) return '';
    const fr = g.now && forge?.rows.find(r => r.iid === g.now.iid && !r.repair);
    const now = g.now ? `${img(ico().item?.[g.now.iid], 'ico')}${L('objeto', g.now.iid)} <span class="mut">· ${SRC_KIND[g.now.kind](g.now)}${g.now.loss ? ' · ' + t('pesa: −{n} de velocidad de ataque (peso {w} − Con ≈{c})', { n: g.now.loss, w: ITEMS[g.now.iid].weapon.weight, c: g.con }) : ''}</span>` +
      (fr ? ` · <a href="#/cap?ir=eq-herreria">${t('refínala a {n}', { n: plusN(fr.to) })}</a>` : '') : g.spells ? `<span class="mut">${t('{m}: sus hechizos son propios de la unidad; no hay arma que comprar.', { m: t(g.spells === 'magia-blanca' ? 'Magia blanca' : 'Magia negra') })}</span>` : `<span class="mut">${t('Sin arma de su build que pueda llevar ahora con su clase.')}</span>`;
    const opts = g.options.map(o => li(`${img(ico().item?.[o.iid], 'ico')}${L('objeto', o.iid)} · ${L('lugar', o.spot, o.where.replace(/\s*\(.*\)$/, ''))}, ${gold(o.price)}`,
      [t('Pot {m}, peso {w}', { m: ITEMS[o.iid].weapon.might, w: ITEMS[o.iid].weapon.weight }), o.effective && t('arma eficaz')].filter(Boolean).join(' · ')));
    const acc = g.acc ? li(`${L('objeto', g.acc.iid)} · ${g.acc.spot ? L('lugar', g.acc.spot, g.acc.where.replace(/\s*\(.*\)$/, '')) : esc(dataTx(g.acc.where))}${g.acc.price ? `, ${gold(g.acc.price)}` : ''}`, esc(t(g.acc.why))) : '';
    return `<div class="eq-gear"><p><b>${t('Arma')}</b> ${now}</p>` +
      (opts.length || acc ? `<details class="eq-more"><summary>${t('Opciones ({n})', { n: opts.length + (acc ? 1 : 0) })}</summary>${ul([...opts, acc].filter(Boolean))}</details>` : '') + '</div>';
  }

  /** «Compras y búsquedas»: the 3–5 first places (what and why), the rest folded; search → barter chains; the chapter routine */
  function shopHtml(sh, route) {
    if (!sh) return '';
    const place = g => (g.spot ? L('lugar', g.spot) : esc(dataTx(g.where))) + (g.renown ? ` <small class="mut">(${t('Prestigio {n}', { n: g.renown })})</small>` : '');
    const how = x => x.offer.type === 'barter' ? t('trueque por {l}', { l: list(x.offer.pay.map(p => `${p.n > 1 ? p.n + '× ' : ''}${L('objeto', p.id, p.es)}`)) }) : x.offer.price ? gold(x.offer.price) : '';
    const row = g => li(place(g), g.items.map(x => `${L('objeto', x.iid)}${how(x) ? ` (${how(x)})` : ''}: ${esc(x.why)}`).join('<br>'));
    const top = sh.buy.slice(0, 4), rest = sh.buy.slice(4);
    const chains = sh.chains.slice(0, 4).map(c => li(t('Búsqueda en {p} ({n})', { p: L('lugar', c.search.spot), n: pct(c.search.pct) + (c.search.cond.length ? ', ' + esc(conds(c.search.cond)) : '') }),
      `${t('{a} → cámbialo por {b} en {p}', { a: L('objeto', c.pay.id, c.pay.es), b: L('objeto', c.get), p: c.offer.spot ? L('lugar', c.offer.spot) : esc(dataTx(c.offer.where)) })}: ${esc(c.why)}.`));
    const routine = sh.routine.map(r => t('{i} en {p}', { i: L('objeto', r.iid), p: list(r.offers.slice(0, 4).map(o => o.spot ? L('lugar', o.spot) : esc(dataTx(o.where)))) }));
    const lures = sh.lures.slice(0, 3).map(m => t('{m} para {p} en {s} ({n})', { m: L('montura', m.rid), p: L('personaje', m.pid), s: L('lugar', m.spot.spot, m.spot.es), n: pct(m.spot.pct) }));
    return `<h4>${t('Compras y búsquedas')}</h4>` + (top.length ? ul(top.map(row)) : `<p class="mut">${t('Nada urgente que comprar para este capítulo.')}</p>`) +
      `<p class="mut">${t('El arma de cada unidad y dónde comprar otra: <a href="#/equipo?ir=eq-equipamiento">Equipamiento</a>.')}</p>` +
      (rest.length ? `<details class="eq-more"><summary>${t('Más sitios ({n})', { n: rest.length })}</summary>${ul(rest.map(row))}</details>` : '') +
      (chains.length ? `<details class="eq-more"><summary>${t('Búsqueda y trueque con Vandahl ({n})', { n: chains.length })}</summary>${ul(chains)}</details>` : '') +
      ((routine.length || lures.length) ? `<p class="mut">${t('Cada capítulo: {l}. Los manuales se conservan para la Parte 3.', { l: [...routine, ...(lures.length ? [t('cebo para {l}', { l: list(lures) })] : [])].join('; ') })}</p>` : '');
  }

  function page(qs) {
    // nothing picked: no pretend Cai game, an invitation (as the home page and Capítulo)
    if (!ROUTE_IDS.includes(qs.r) && !ctxChosen()) return `<h1>${t('Equipo')}</h1><section class="card"><p>${t('Elige ruta y capítulo para planificar reclutas, builds, monturas y equipamiento.')}</p>` +
      `<p><button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog">${t('Elegir ruta y capítulo')}</button></p>` +
      `<p class="mut">${t('O empieza por una ruta: {l}.', { l: ROUTE_IDS.map(x => `<a href="#/equipo?r=${x}">${esc(ROUTE_NAME[x])}</a>`).join(' · ') })}</p></section>`;
    // Equipo is the player's game, not a listing: its ?r= (the invitation, old planner links) picks the game like the header selector
    if (ROUTE_IDS.includes(qs.r) && (!ctxChosen() || qs.r !== ctxGet().route)) { const c0 = CAPS[ctxGet().key]; ctxSet(qs.r, c0.route === 'comun' ? c0.key : chapterFromPath(qs.r, 1, c0.n)); }
    const route = ctxGet().route, key = ctxGet().key;
    // old recruit planner links (#/planificador?r=&p=pid,pid): their picks join the selection as «quiero»
    if (qs.p) { const add = String(qs.p).split(',').filter(p => CHARS[p]?.routes?.[route]?.recruit_key && !ctxGet().have.includes(p)); if (add.length) ctxSetRecruits([...ctxGet().recruits, ...add]); }
    const c = ctxGet(), all = teamChips(route, key), picked = ctxRecruits(route), want = ctxWant(route), drop = ctxDrop(route), fold = c.fold;
    const story = p => !!CHARS[p].routes[route].join_key, st = p => teamState(p, route, key, c);
    const n = teamCounts(route, key, c), counts = teamCountTxt(n), marked = all.filter(p => st(p) !== 'no'), rest = all.filter(p => st(p) === 'no');
    const pick = p => { const s = st(p), x = CHARS[p].routes[route];
      return `<button type="button" class="chip eq-pick${s === 'tengo' ? ' on' : s === 'quiero' ? ' want' : ''}" data-eq="${esc(p)}" aria-label="${esc(nm(CHARS[p]))}: ${t(STATE_LONG[s])}">${face(p)}${esc(nm(CHARS[p]))} ` +
        `<small>${esc(capShort(CAPS[x.join_key || x.recruit_key]))}</small>${s !== 'no' ? ` <small class="eq-st">${t(STATE_SHORT[s])}</small>` : ''}${story(p) ? ` <small class="eq-tag">${t('historia')}</small>` : ''}</button>`; };
    const folded = picked.length > 0 && !teamUi.editing && fold !== false;
    const summary = `${esc(ROUTE_NAME[route])}${c.rerun ? ' · ' + t('Nueva vuelta') : ''} · ${counts} · ${esc(capShort(CAPS[key]))}`;
    // the route is the header's (one place to change it); the page only reflects it
    const editor = `<p class="eq-route">${t('Ruta de {r}', { r: esc(ROUTE_NAME[route]) })} · ${chapLink(key)} <small class="mut">${t('(se cambian arriba)')}</small></p>` +
      `<div class="seg seg2" role="group" aria-label="${t('Partida')}"><button type="button"${c.rerun ? '' : ' class="on"'} data-eq-rerun="0" aria-pressed="${!c.rerun}">${t('Primera partida')}</button>` +
      `<button type="button"${c.rerun ? ' class="on"' : ''} data-eq-rerun="1" aria-pressed="${c.rerun}">${t('Nueva vuelta')}</button></div>` +
      (c.rerun && route === 'cai' ? `<p class="mut">${t('En una nueva vuelta el mapa sale desvelado y los apoyos se conservan, pero Cai sigue sin poder ir al oeste en la Parte 1.')}</p>` : '') +
      `<h2>${t('Reclutas')} <small class="mut">${counts}</small></h2>` +
      `<p class="mut">${t('Toca un recluta para cambiar su estado: no → quiero reclutarlo → ya lo tengo.')}</p>` +
      // the marked chips always; the rest folded (open while nothing is marked, or once opened in this visit)
      (marked.length ? `<div class="chips pl-picks" role="group" aria-label="${t('Reclutas marcados')}">${marked.map(pick).join('')}</div>` : '') +
      (rest.length ? `<details class="eq-grid"${!marked.length || teamUi.all ? ' open' : ''}><summary>${t('Ver todos ({n} sin marcar)', { n: rest.length })}</summary>` +
        `<div class="chips pl-picks" role="group" aria-label="${t('Reclutas sin marcar')}">${rest.map(pick).join('')}</div></details>` : '') +
      `<p class="eq-acts"><button type="button" class="txtbtn" data-eq-all="1">${t('Marcar todos como «quiero»')}</button> <button type="button" class="txtbtn" data-eq-all="0"${marked.length ? '' : ' disabled'}>${t('Quitar todos')}</button>` +
      '</p>' +
      `<p class="mut">${t('{l} siempre cuenta en el equipo. Los de «historia» se unen solos: «llega» antes de su capítulo y «tengo» desde él; se pueden desmarcar.', { l: L('personaje', LORDS[route]) })}</p>`;
    // the selection is a fold box: chevron top right (the whole header toggles it); folding is stored in ctx, so it goes through teamApply
    const chev = picked.length ? `<button type="button" class="fold-b" data-eq-fold="${folded ? 0 : 1}" aria-expanded="${!folded}" aria-controls="eq-sel-p" aria-label="${folded ? t('Desplegar') : t('Plegar')}"><i class="fold-i" aria-hidden="true"></i></button>` : '';
    const head = `<h1>${t('Equipo')}</h1><section class="card eq-sel fold"><div class="fold-h"><h2 class="eq-sel-t">${t('Tu selección')} <small class="mut">${marked.length ? summary : t('sin reclutas marcados')}</small></h2>${chev}</div>` +
      `<div class="fold-p" id="eq-sel-p"${folded ? ' hidden' : ''}>${folded ? '' : `<p class="mut">${t('Marca qué reclutas ya tienes y cuáles quieres reclutar. La selección se guarda y las fichas, los regalos y los reclutas la tienen en cuenta.')}</p>${editor}`}</div></section>`;
    if (!marked.length) return head + `<p class="mut">${t('Marca los reclutas que tienes o quieres reclutar para calcular el equipo.')}</p>`;
    const plan = teamPlan(route, key, picked, drop, want), { roles } = plan;
    const roleRows = ROLES.map(([r, rn]) => [t(rn), roles.cover[r].length ? list([...roles.cover[r]].sort(bySerial).map(p => L('personaje', p))) : `<span class="eq-gap">${t('Sin cubrir')}</span>`]);
    const gapTxt = roles.gaps.map(r => { const rn = ROLES.find(x => x[0] === r)[1], f = roles.fix[r];
      return li(t('Falta {r}', { r: t(rn).toLowerCase() }), f.length ? t('Lo cubriría {l}.', { l: list([...f].sort((a, b) => bySerial(a[0], b[0])).map(([p, j]) => t('{p} como {c}', { p: L('personaje', p), c: cls(j) }))) }) : t('Ninguna unidad del equipo lo cubre con su alternativa: conviene reclutar a alguien para este papel.')); });
    const clashes = plan.prio.map(x => x.pid).sort(bySerial).flatMap(p => Object.values(plan.mounts[p] || {}).filter(m => m.lost_to).map(m => [p, m]))
      .map(([p, m]) => li(t('{m} para {p}', { m: L('montura', m.want), p: L('personaje', m.lost_to) }), t('{p} lleva {m}.', { p: L('personaje', p), m: L('montura', m.rid) })));
    const equipo = kvRows(roleRows) + (gapTxt.length ? `<h4>${t('Huecos')}</h4>${ul(gapTxt)}` : `<p>${t('Todos los papeles básicos están cubiertos.')}</p>`) +
      (clashes.length ? `<h4>${t('Monturas en conflicto')}</h4>${ul(clashes)}` : '');
    const rank = Object.fromEntries(plan.prio.map(x => [x.pid, x.n])), gearOf = Object.fromEntries(plan.gear.map(g => [g.pid, g]));
    const stTag = p => { if (p === LORDS[route]) return ''; const s = st(p);
      return `<span class="cp-tag">${s === 'tengo' ? t('ya lo tienes') : s === 'llega' ? t('se une en {c}', { c: esc(capShort(CAPS[CHARS[p].routes[route].join_key])) }) : t('quieres reclutarlo')}</span>`; };
    const builds = `<div class="eq-units">${[...plan.builds].sort((a, b) => bySerial(a.pid, b.pid)).map(b => `<section class="card eq-unit" id="eq-${esc(b.pid)}">` +
      `<header>${face(b.pid, 'cp-face')}<div><h4>${L('personaje', b.pid)}</h4><span class="cp-tag">${t('prioridad {n}', { n: rank[b.pid] })}</span>${b.roles.length ? `<span class="cp-tag">${esc(roleNames(b.roles))}</span>` : ''}${stTag(b.pid)}</div></header>` +
      `${buildSummary(b)}${gearHtml(gearOf[b.pid], plan.forge)}</section>`).join('')}</div>`;
    const gearOfTxt = plan.gear.length ? `<p class="mut">${t('Arma de cada unidad que ya tienes, con lo que se consigue en este capítulo; se recalcula al cambiar de capítulo o de reclutas.')}</p>` : '';
    const rules = RULES.filter(r => !WEEK_RULE.test(r));
    // two tabs: the team (roles, builds, equipment) and recruitment; the rules folded at the foot (?sec=reglas opens it)
    return ficha(head, [
      ['equipo', 'Equipo', equipo + `<h4 id="eq-equipamiento">${t('Builds y equipamiento')}</h4>${gearOfTxt}${builds}`],
      ['reclutamiento', 'Reclutamiento', `<section class="card eq-box">${recruitment(route, want) || `<p class="mut">${t('Ningún recluta marcado como «quiero reclutarlo».')}</p>`}</section>` +
        (want.length ? `<section class="card eq-box eq-gifts"><h3>${t('Regalos para subir el apoyo')}</h3>${birthdays(plan.week)}` +
          (giftRound(plan.round) || `<p class="mut">${t('Ningún «quiero» con regalos que preparar.')}</p>`) + `<p class="mut"><a href="#/semana">${t('Plan de la semana: comidas, regalos y Servicio divino')} →</a></p></section>` : '')],
    ]) + `<details class="card eq-reglas" id="eq-reglas"${qs.sec === 'reglas' ? ' open' : ''}><summary>${t('Cómo se calcula ({n})', { n: rules.length })}</summary>${ul(rules.map(r => `<li>${esc(t(r))}</li>`))}</details>`;
  }

  /** Capítulo › «Esta semana»: the week checklist for the context team at `key` (the «quiero» recruits), with its rules folded */
  window.teamWeekBlock = (route, key) => {
    const plan = teamPlan(route, key, ctxRecruits(route), ctxDrop(route), ctxWant(route)), rules = RULES.filter(r => WEEK_RULE.test(r));
    return weekHtml(plan.week, plan.round, plan.shop, plan.forge) + `<details class="eq-more"><summary>${t('Cómo se calcula ({n})', { n: rules.length })}</summary>${ul(rules.map(r => `<li>${esc(t(r))}</li>`))}</details>`;
  };

  /** re-render in place keeping the page scroll and the focus on the pressed control (selector `again` finds it) */
  function keepPlace(again, change, say = true) {
    const y = window.scrollY;
    const h = location.hash.replace(/([?&])ir=[^&]*&?/, '$1').replace(/[?&]$/, '');  // a deep-link ?ir= would scroll on every render
    if (h !== location.hash) history.replaceState(null, '', h);
    change();
    render(true);
    document.querySelector(again)?.focus({ preventScroll: true });
    window.scrollTo(0, y);
    if (say && typeof announce === 'function') announce(t('Equipo y equipamiento recalculados'));
  }

  // selector buttons change ctx through teamApply and re-render in place (the page does not move)
  document.addEventListener('click', e => {
    // «Ver todos» is a plain fold (shell.js toggles it); remember it so a re-render keeps it open
    const gb = e.target.closest?.('.eq-grid > .fold-h .fold-b');
    if (gb) { setTimeout(() => { teamUi.all = gb.getAttribute('aria-expanded') === 'true'; }); return; }
    const b = e.target.closest?.('[data-eq],[data-eq-all],[data-eq-fold],[data-eq-rerun]');
    if (!b) return;
    const d = b.dataset;
    const again = d.eqRerun != null ? `[data-eq-rerun="${d.eqRerun}"]` : d.eqFold != null ? `[data-eq-fold="${d.eqFold === '1' ? '0' : '1'}"]`
      : d.eqAll != null ? `[data-eq-all="${d.eqAll}"]` : `[data-eq="${window.CSS.escape(d.eq)}"]`;
    keepPlace(again, () => teamApply(d.eqRerun != null ? { rerun: d.eqRerun === '1' } : d.eqFold != null ? { fold: d.eqFold === '1' } : d.eqAll != null ? { all: d.eqAll } : { eq: d.eq }), d.eqFold == null);
  });
  // leaving the page ends the edit: coming back with a selection shows it folded
  if (typeof window.addEventListener === 'function') window.addEventListener('hashchange', () => { if (!/^#\/equipo\b/.test(location.hash)) teamLeave(); });

  // #/planificador is rewritten to #/equipo by core.js (OLD_ADDR) before it gets here
  const renderEquipo = (id, qs) => {
    // the week moved to Capítulo: #/equipo?sec=semana and …&ir=eq-ronda land there
    if (qs && (qs.sec === 'semana' || qs.ir === 'eq-ronda')) {
      const h = `#/cap?ir=${qs.ir === 'eq-ronda' ? 'eq-ronda' : 'eq-semana'}`;
      if (typeof history !== 'undefined' && history.replaceState) history.replaceState(null, '', h);
      return P.cap('');
    }
    return page(qs || {});
  };
  /** «Esta semana» on its own (Mi partida's second tab): the same week block Capítulo shows, for the chosen route and chapter */
  register({ id: 'semana', title: 'Esta semana', routes: ['semana'], render: () => {
    if (!ctxChosen()) return `<h1>${t('Esta semana')}</h1><section class="card"><p>${t('Elige ruta y capítulo para ver qué hacer esta semana, a quién reclutar y qué no perderte.')}</p>` +
      `<p><button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog">${t('Elegir ruta y capítulo')}</button></p></section>`;
    const key = ctxGet().key, c = CAPS[key], wr = c.route === 'comun' ? ctxRoute() : c.route;
    return `<h1>${t('Esta semana')}</h1><p class="mut">${esc(ROUTE_NAME[wr] || '')} · ${chapLink(key)}</p>` +
      `<section class="card" id="eq-semana">${window.teamWeekBlock(wr, key)}</section>`;
  } });
  register({ id: 'equipo', title: 'Equipo', routes: ['equipo', 'planificador'], render: renderEquipo, css: CSS,
    search: () => [
      // search.js translates label and sub with t()
      { group: 'Secciones', label: 'Equipo', sub: 'Builds, equipamiento, reclutamiento', href: '#/equipo', aliases: ['team', 'planner', 'planificador', 'reclutas'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Semana', sub: 'Capítulo · compras, herrería, comidas, regalos y Servicio divino', href: '#/semana', aliases: ['esta semana', 'comidas', 'posada', 'servicio divino', 'compras', 'checklist'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Ronda de regalos', sub: 'Capítulo · Esta semana', href: '#/cap?ir=eq-ronda', aliases: ['ronda', 'regalos de la semana', 'regalar'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Herrería', sub: 'Capítulo · Esta semana · qué refinar', href: '#/cap?ir=eq-herreria', aliases: ['refinar', 'refinado', 'forja', 'reparar'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Builds del equipo', sub: 'Equipo', href: '#/equipo?ir=eq-equipamiento', aliases: ['build', 'clases del equipo', 'monturas', 'equipamiento', 'armas del equipo'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Reclutamiento', sub: 'Equipo · condiciones, oro y objetos', href: '#/equipo?sec=reclutamiento', aliases: ['reclutar', 'requisitos'] },  // i18n-ignore (aliases)
    ] });
})();
