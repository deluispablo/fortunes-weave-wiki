/* Fortune's Weave · wiki2 · Min-max group content: Recorrido de la Parte 1 (#/guia: the header route chapter by chapter, a summary
   that links each chapter page), Builds (#/builds), Reclutas recomendados (#/reclutas) and Trucos y mecánicas ocultas (#/trucos).
   Numbers are read from WIKI (classes, chars) where the game has them; class lines, archetypes, masteries and per-unit builds come from WIKI_EXT.minmax. Authored text is impersonal Spanish. */
'use strict';
(() => {
  const MM = (window.WIKI_EXT || {}).minmax || {};
  const p = s => `<p>${s}</p>`;
  const ol = xs => `<ol class="mm-ol">${xs.map(x => `<li>${x}</li>`).join('')}</ol>`;
  const bl = xs => `<ul class="mm-ol">${xs.filter(Boolean).map(x => `<li>${x}</li>`).join('')}</ul>`;
  // each cell carries its column name: a narrow phone shows one card per row (style.css .stack)
  const tbl = (head, rows) => `<div class="tw"><table class="stack"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map((x, i) => `<td data-th="${esc(String(head[i]).replace(/<[^>]*>/g, ''))}">${x}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const C = id => L('clase', id), O = id => L('objeto', id), PJ = id => L('personaje', id);
  const CN = es => C(Object.keys(CLASSES).find(k => CLASSES[k].es === es) || es);  // class link by official name
  const pid = es => (Object.values(CHARS).find(c => c.es === es) || {}).id;
  /** «Lind, Hong Hua» (data names) → each character linked (core.js NAME: Spanish and English names), the rest plain */
  const chars = s => String(s).split(', ').map(x => { const h = NAME.get(norm(x)); return h?.[0] === 'personaje' ? PJ(h[1]) : esc(x); }).join(', ');
  const sgn = n => (n > 0 ? `+${n}` : String(n));
  const growthLine = g => Object.keys(STAT_ES).filter(k => g && g[k]).map(k => `${statName(k)} ${sgn(g[k])}`).join(', ');
  const head = (title, intro) => `<h1>${esc(title)}</h1><p class="mut">${intro}</p>`;  // both already in the reader's language
  const CSS = `.mm-ol{margin:0;padding-left:1.3em}.mm-ol>li{margin:0 0 var(--s2)}
.bd-ctx{display:flex;flex-wrap:wrap;gap:var(--s2);margin:0 0 var(--s3)}#bd-senor h2,#bd-plantel h2,#bd-divinas h2{font-size:var(--fs-row);margin:var(--s3) 0 var(--s2)}
.bd-u{border-top:1px solid var(--line)}.bd-u>summary,.bd-u>.fold-h .fold-t{display:flex;align-items:center;gap:var(--s2);min-height:var(--tap);cursor:pointer;white-space:nowrap;overflow:hidden}
.bd-f{flex:none;width:32px;height:32px;border-radius:50%;background:var(--surface2);object-fit:cover}.bd-n{font-weight:600;flex:none}.bd-ch{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;color:var(--tx2);font-size:var(--fs-small)}
.bd-w{flex:none;font-size:var(--fs-small)}.bd-u .mm-tag{flex:none;margin-left:0}.bd-b{margin:var(--s2) 0 var(--s3) var(--s3)}.bd-b h4{margin:0 0 var(--s1)}.bd-now{color:var(--acc)}.bd-g>summary{min-height:var(--tap);font-weight:600;cursor:pointer}
@media (max-width:480px){.bd-w{display:none}}
.rc-cap h2{display:inline;margin:0 var(--s2) 0 0;font-size:var(--fs-row)}.rc-cap small.mut{display:block;font-weight:400}.rc-cap .mm-ol{margin-bottom:var(--s3)}.rc-go{margin:var(--s2) 0 0}
.mm-tag{display:inline-block;margin-left:var(--s1);padding:0 var(--s2);border-radius:var(--r1);background:var(--surface2);color:var(--tx2);font-size:var(--fs-small);font-weight:500}
.mm-hit{box-shadow:inset 3px 0 0 var(--focus);padding-left:var(--s3)}.mm-tr{border-top:1px solid var(--line);padding:var(--s3) 0}.mm-tr:first-of-type{border-top:0;padding-top:0}.mm-tr>h4{margin:0 0 var(--s1)}.mm-tr p{margin:var(--s1) 0}.mm-tr.mm-hit{padding-left:var(--s3)}`;

  /* ---------------- Recorrido de la Parte 1 ---------------- */
  // the six topic tabs this page had moved to the guides that already held them: their old addresses land there
  const OLD_TABS = { prio: 'minmax', prestigio: 'prestigio', rutina: 'tiempo-libre', examenes: 'clases', apoyos: 'apoyos', economia: 'tiendas' };
  const ref = id => (id.startsWith('PID_') ? PJ(id) : id.startsWith('IID_') ? O(id) : L('lugar', id));  // [[id]] in priority text
  const plusN = iid => (String(ITEMS[iid]?.es || '').match(/\+\d+$/) || [''])[0];
  const range = ([a, b]) => (a === b ? `${a}` : `${a}–${b}`);
  const upTo = (xs, n, h) => list(xs.slice(0, n)) + (xs.length > n ? ' ' + t('y <a href="{h}">{n} más</a>', { h, n: xs.length - n }) : '');
  /** prologue and Part 1 of `route`, in play order */
  const partOne = route => { const ks = []; for (let k = 'comun-0-1'; CAPS[k] && CAPS[k].part < 2 && ks.length < 20; k = chapNav(k, route).next) ks.push(k); return ks; };

  /** one chapter, folded: what to do in a few lines, each one linking the page that has the detail */
  function capFold(c, route, open, mine) {
    const h = capHash(c.key), r = c.route === 'comun' ? route : c.route;
    // the action of each priority (the reason is in the chapter page); deadlines and chests are in «Perdibles»
    const prio = (c.priorities || []).map(x => (typeof x === 'string' ? x : x.es)).filter(s => !/^(Cerrar|Recoger los cofres)\b/.test(s)).slice(0, 4)  // i18n-ignore (data values)
      .map(s => `<li>${esc(t(s.split(': ')[0].replace(/\.$/, ''))).replace(/\[\[([^\]]+)\]\]/g, (_, id) => ref(id))}.</li>`).join('');
    // as the chapter page: missions closed on this route left out, a «Misiones …» row only repeats the mission rows
    const close = c.closing.filter(x => (x.kind !== 'mision' || questAvail(x.id, r, c.key)) && !(x.kind === 'perdible' && /^Misiones\b/.test(x.es) && c.closing.some(y => y.kind === 'mision')));
    const ms = close.filter(x => x.kind === 'mision'), first = ms.map(x => x.deadline).filter(Boolean).sort()[0];
    const lost = [ms.length && `<a href="${h}">${plural(ms.length, 'misión', 'misiones')}</a>${first ? ' ' + t('(la primera vence el {d})', { d: fechaDia(first) }) : ''}`,
      ...close.filter(x => x.kind !== 'mision').map(x => (x.kind === 'desvio' ? t('Desvío {d}', { d: L('desvio', x.id, x.es) }) : x.kind === 'recluta' ? t('reclutar a {p}', { p: L('personaje', x.id, x.es) }) : esc(t(x.es.replace(/\.$/, '')))))];
    const plan = c.part === 1 && typeof teamPlan === 'function' ? teamPlan(r, c.key, ctxRecruits(r), ctxDrop(r), ctxWant(r)) : null;
    const buy = (plan?.shop.buy || []).filter(b => spotAccess(b.spot, r, c.key).ok).flatMap(b => b.items.map(i => t('{i} en {p}', { i: O(i.iid), p: SPOTS[b.spot] ? `<a href="${href('lugar', b.spot)}">${esc(dataTx(b.where))}</a>` : esc(dataTx(b.where)) })));
    const forge = (plan?.forge.rows || []).map(x => t('{i} a {n}', { i: O(x.iid), n: plusN(x.to) }));
    const meta = [c.start && `${fechaDia(c.start)} – ${fechaDia(c.end)}`, c.level && t('Nv {n}', { n: range(c.level) })].filter(Boolean).join(' · ');
    return `<details class="card rc-cap"${open ? ' open' : ''} id="rc-${esc(c.key)}"><summary><h2>${esc(capShort(c))} · ${esc(gt(c.es))}</h2>` +
      `${mine ? `<span class="cp-tag">${t('Tu capítulo')}</span>` : ''}<small class="mut">${esc(meta)}</small></summary>` +
      (prio ? `<ol class="mm-ol">${prio}</ol>` : '') + `<div class="cp-list">${kvRows([
        [t('Reclutas'), c.recruits.map(x => `${PJ(x.pid)} <small class="mut">(${recruitCost(x.cost)})</small>`).join('<br>')],
        [t('Se unen'), list(c.joins.map(nl))],
        [t('Perdibles'), lost.filter(Boolean).join(' · ')],
        [t('Comprar'), buy.length ? `${upTo(buy, 3, `${capHash(c.key)}?ir=eq-semana`)} <a href="${capHash(c.key)}?ir=eq-semana">${t('(por qué)')}</a>` : ''],
        [t('Refinar'), forge.length ? upTo(forge, 3, `${capHash(c.key)}?ir=eq-herreria`) : ''],
        // battles of the same name (the four practice fights) once, with how many
        [t('Batallas'), c.battles.filter((b, i) => c.battles.findIndex(x => x.es === b.es) === i).map(b => { const n = c.battles.filter(x => x.es === b.es).length;
          return `<a href="${href('batalla', b.id)}">${esc(gt(b.es))}</a>${n > 1 ? ` ×${n}` : ''}${b.boss ? ` <small class="mut">${t('(jefe: {b})', { b: chars(dataTx(b.boss)) })}</small>` : ''}`; }).join(' · ')],
      ])}</div><p class="rc-go"><a href="${h}">${t('Capítulo completo')} <span aria-hidden="true">→</span></a></p></details>`;
  }

  function guia(qs) {
    const old = OLD_TABS[qs.sec] || OLD_TABS[String(qs.ir || '').replace(/^fi-/, '')];
    if (old) {
      if (typeof history !== 'undefined' && history.replaceState) history.replaceState(null, '', `#/guia/${old}`);
      return guiaTema(old);
    }
    // the route: ?r= (this page only, the game's context is not changed), else the chosen one; none: one card per route
    const route = qs.r === 'todas' ? '' : ROUTE_IDS.includes(qs.r) ? qs.r : ctxRoute(), key = ctxGet().key, rch = routeChips('guia', qs, route);
    const end = p(t('Partes 2 y 3 (comunes a todas las rutas): <a href="#/guia/guerra-y-salvacion">Guerra y Salvación</a>.'));  // i18n-ignore (the link text is part of the key)
    if (!route) return head(t('Recorrido de la Parte 1'), t('Cada señor tiene su Parte 1 de 12 capítulos, con sus fechas, reclutas y sistemas propios. Elige una ruta para verla capítulo a capítulo.')) +
      guiaLink('minmax', 'rutas') + rch + `<div class="ggrid">${ROUTE_IDS.map(r => { const a = CAPS[`${r}-1-1`], z = CAPS[`${r}-1-12`];
        return `<section class="card"><h3><a href="#/guia?r=${r}">${t('Ruta de {r}', { r: esc(ROUTE_NAME[r]) })}</a></h3>` + kvRows([[t('Capítulos'), `12 · ${esc(fechaDiaAno(a.start))} – ${esc(fechaDiaAno(z.end))}`],
          [t('Sistemas propios'), esc(t(LORD_SYS[r]))], [t('Nivel'), `${range(a.level)} → ${range(z.level)}`]]) + `<p class="rc-go"><a href="#/guia?r=${r}">${t('Recorrido de {r}', { r: esc(ROUTE_NAME[r]) })} <span aria-hidden="true">→</span></a></p></section>`; }).join('')}</div>` + end;
    const keys = partOne(route), mineOn = ctxChosen() && ctxGet().route === route, cur = mineOn && keys.includes(key) ? key : keys[0];
    return head(`${t('Recorrido de la Parte 1')} · ${ROUTE_NAME[route]}`, t('Ruta de {r}, capítulo a capítulo: lo esencial y el enlace a cada ficha.', { r: esc(ROUTE_NAME[route]) })) + guiaLink('minmax') + rch +
      (mineOn && keys.includes(key) ? `<p><a href="#/guia?ir=rc-${esc(key)}">${t('Ir a tu capítulo ({c})', { c: esc(capShort(CAPS[key])) })}</a></p>` : '') + keys.map(k => capFold(CAPS[k], route, k === cur, mineOn && k === key)).join('') + end;
  }
  /** each lord's own systems (the route-exclusive menus), for the route cards */
  const LORD_SYS = { cai: 'Altruismo, Formación, Cebo y Establo, Cultivar', dietrich: 'La Respondedora, Duelos de Temerario, Potenciar técnicas, Transmitir secreto',
    theodora: 'Enviar suministros, Enviar tropas, Reclutar unidades, batallones', leda: 'Actuar en locales y en la taberna, puesto de bebidas' };

  /* ---------------- Builds por arma y papel ---------------- */
  const LINE_TIPS = {
    'Espada': 'Primero Vel para atacar dos veces (el segundo golpe de espada hace más daño); después Fue en Forajido o Guerrero y vuelta a Mirmidón o Shido para sus maestrías.',
    'Hacha': 'Sin contar con ataques dobles: subir Golpe con Técnica entrenada (Guerrero), hachas precisas y técnicas de Golpe alto.',
    'Lanza': 'Eficaz contra caballería (Pot ×2). A pie, pasar por Soldado acorazado, Arquero o Mirmidón en el nivel intermedio.',
    'Arco': () => t('Muy eficaz contra voladores (Pot ×3). Golpe primero (Crescendo, Puntería); llevar un {i} para atacar a 1–2 casillas.', { i: O('IID_ショートボウ') }),
    'Magia negra': 'El Druida pierde la magia blanca. Los tomos pesados bajan la velocidad de ataque. En la ruta de Cai, el Caladrio sube Mag montado.',
    'Magia blanca': 'Los sanadores principales se quedan en Sacerdote u Obispo; los híbridos suben como Chamán o Vate y cambian a Obispo antes de la batalla.',
    'Coraza': 'Cada nivel de clase suma crecimiento de PV, Fue y Def a cambio de Mov 4 y crecimientos negativos de Vel y Res.',
    'Voladores': 'El Ala Celeste no tiene crecimiento de Fue ni de Vel: subirlos en Forajido, Shido o Rastreador.',
  };
  const MASTERY_NOTE = {
    'Técnica entrenada': 'Para unidades que viven de técnicas.', 'Crescendo': 'Rinde más en unidades de poco Golpe que en arqueros.',  // i18n-ignore
    'Desde las sombras': 'Para esquivadores y púgiles.', 'Siempre alerta': 'Para unidades con mucho crítico.',  // i18n-ignore
    'Arreón': 'Una derrota en la fase propia y dos en la enemiga dan Mov +3.', 'Contra mayor': 'Útil con arcos de alcance 1–2.',  // i18n-ignore
    'Presentir el peligro': 'Mejor en Catafracto y Jinete pesado.', 'Reflejos relámpago': 'Clase solo para mujeres; para unidades rápidas.',  // i18n-ignore
    'Apaño rápido': 'Poco útil.', 'Contratiro': 'Alternativa a Puntería.',  // i18n-ignore
  };
  const SENDA = { 35: { HP: 10, Str: 5, Mag: 5, Dex: 5, Spd: 5, Def: 10, Cha: 5 }, 45: { HP: 10, Str: 15, Mag: 5, Dex: 10, Spd: 5, Lck: 5, Def: 20, Res: 5, Cha: 10 } };
  const add = (a, b) => Object.fromEntries(Object.keys(STAT_ES).filter(k => k !== 'Mov').map(k => [k, (a?.[k] || 0) + (b?.[k] || 0)]));

  function monturas() {
    return bl([
      t('Una unidad montada suma el crecimiento de su montura, que sube con el vínculo (1–5). En la Parte 1 solo Cai captura monturas con bonos (en la Parte 3, cualquier ruta si Cai está en el ejército); las otras rutas en la Parte 1 reciben un {def} sin bonos, salvo {ros}, que trae {io}.', { def: L('montura', 'RID_デフォルト騎馬'), ros: L('montura', 'RID_ロシナン'), io: PJ('PID_イオ') }),
      t('Captura (ruta de Cai desde el cap. 5 de la Parte 1; en la Parte 3 desde el cap. 2, con Cai en el ejército): poner un Cebo en una zona de animales y capturarlo en 2 turnos como máximo; el manjar favorito asegura la captura.'),
      t('Vínculo: alimentar en el Establo una vez al día, hasta 20 puntos por comida (alimento de calidad alta, alimento y sabor preferidos, manjar favorito). Vínculo 2 a 20 puntos, 3 a 50, 4 a 90, 5 a 140. El vínculo es de cada pareja jinete–montura.'),
    ]) + p(t('Crecimiento, comida, habilidades y dónde se atrae cada montura: su ficha en <a href="#/monturas">Monturas</a>. La montura que conviene a cada unidad en cada etapa: <a href="#/equipo">Equipo</a>.'));  // i18n-ignore
  }

  function builds(qs = {}) {
    const cls = x => (x ? C(x[0]) : '');
    const lines = (MM.lines || []).map(l => {
      const fin = l.path[l.path.length - 1];
      return `<section class="mm-tr"><h4>${esc(t(l.line))}</h4>` + kvRows([
        [t('A pie'), l.path.map(cls).join(' → ') + (l.divine ? ` → ${cls(l.divine)} ${t('(Parte 3)')}` : '')],
        [t('Montado'), l.mounted.map(cls).join(' → ')],
        [t('Encaja con'), l.units.map(u => PJ(u[0])).join(', ')],
        [t('Crecimiento final'), fin && CLASSES[fin[0]] ? `${cls(fin)}: ${growthLine(CLASSES[fin[0]].growth_modifiers)}` : ''],
      ]) + p((x => (typeof x === 'function' ? x() : x ? t(x) : ''))(LINE_TIPS[l.line]) || esc(factOnly(t(l.tips)))) + '</section>';
    }).join('');
    const q = CLASSES['JID_戦車兵'], qg = q?.growth_modifiers;
    const cuadri = q ? p(t('{c} (clase {tier}, {req}, Mov {mov}) tiene un crecimiento oculto que depende del nivel, la habilidad Senda de la cuadriga, y va montado: a su crecimiento se suma el de la montura (hasta +25 con un caballo capturado a vínculo 5, +30 con {ros}; el {def} de serie no da nada). La Vel de la clase no mejora: no arregla unidades lentas.',
      { c: C('JID_戦車兵'), tier: esc(tx(q, 'tier').toLowerCase()), req: esc(dataTx(q.exam_requirements_es)), mov: q.mov, ros: L('montura', 'RID_ロシナン'), def: L('montura', 'RID_デフォルト騎馬') })) +
      statTable([qg, add(qg, SENDA[35]), add(qg, SENDA[45])], [t('Nv 20–34'), t('Nv 35–44'), t('Nv 45 o más')]) : '';
    const arch = (MM.archetypes || []).map(a => [esc(t(a.name)), esc(factOnly(t(a.how))), a.units.map(u => PJ(u[0])).join(', ')]);
    const mast = (MM.masteries || []).map(m => [C(m.cls[0]), `<b>${esc(gt(m.skill))}</b>${m.rec ? `<span class="mm-tag">${t('Recomendada')}</span>` : ''}`, esc(gt(m.desc)), esc(MASTERY_NOTE[m.skill] ? t(MASTERY_NOTE[m.skill]) : '')]);
    // one row per unit with its final class; the build itself (growths, alternatives, mounts) is in its ficha
    const chars = (MM.chars || []).filter(c => CHARS[c.pid]).map(c => [`<a href="${href('personaje', c.pid)}?sec=build">${esc(nm(CHARS[c.pid]))}</a>`, cls(c.best), cls(c.alt), (charLimits(c.pid) || []).filter(r => r[1]).map(r => r[1]).join(' · ')]);
    const teams = (MM.route_teams || []).map(([a, b]) => [esc(t(a)), esc(factOnly(t(b)))]);
    const ref = [
      ['reglas', 'Reglas', bl([
        'Velocidad de ataque = Vel − máx(0, peso del arma − Con). Con 4 o más de ventaja se ataca dos veces.',
        'Los crecimientos de clase solo cuentan mientras la unidad está en esa clase; los de la montura, mientras va montada.',
        'La habilidad maestra de una clase dominada se queda para siempre y se equipa en cualquier clase: conviene dominar pronto las baratas. La EXP de clase también sube con «Entrenar» en las Actividades auto. de la Posada, sin combatir.',
        'Los bonos de combate (batallón, montura, pasivas, bailes) no pasan de +10 por atributo.',
        'Al aprobar un examen, los atributos por debajo del mínimo de la clase suben a ese mínimo.',
      ].map(s => t(s)))],
      ['lineas', 'Por línea de arma', lines],
      ['cuadriguero', 'Cuadriguero', cuadri],
      ['monturas', 'Monturas', monturas()],
      ['papeles', 'Por papel', tbl([t('Papel'), t('Cómo'), t('Unidades')], arch)],
      ['maestrias', 'Maestrías', tbl([t('Clase'), t('Maestría'), t('Efecto'), t('Nota')], mast)],
      ['personajes', 'Por personaje', p(t('Clase final sugerida para cada unidad. Crecimientos, rutas de clase y monturas: su ficha; la build de tu equipo, en <a href="#/equipo">Equipo</a>.')) +
        tbl([t('Personaje'), t('Clase final'), t('Alternativa'), t('No puede ser')], chars)],
      ['equipos', 'Tamaño de equipo', tbl([t('Ruta o parte'), t('Equipo')], teams)],
    ];
    // the reference, folded under the catalog; ids kept (fi-*) so old links still land
    const refHtml = ref.filter(x => x[2]).map(([id, ti, h]) => `<details class="card fi-sec" id="fi-${id}"><summary><h3>${esc(tl(ti))}</h3></summary>${h}</details>`).join('');
    return head(t('Builds'), t('La clase que conviene a cada unidad en tu ruta y cuándo puede dar cada paso.')) + catalog(qs) + refHtml;
  }

  /* ---------------- Builds catalog (pages/builds.js) ---------------- */
  const COM = () => `<span class="gu-com" title="${esc(t('Dato de la comunidad'))}"></span>`;
  const face = pid => img(ico().face?.[pid], 'bd-f') || '<span class="bd-f"></span>';
  function catalog(qs) {
    const c = ctxGet(), cp = ctxChosen() ? CAPS[c.key]?.part : 1;
    const part = qs.p === '3' ? 3 : qs.p === '1' ? 1 : cp >= 2 ? 3 : 1;
    const r = qs.r === 'todas' ? '' : ROUTE_IDS.includes(qs.r) ? qs.r : ctxRoute(), papel = qs.papel || '', arma = qs.arma || '';
    const rows = rt => buildsCatalog(rt, part);
    const all = r || part === 3 ? rows(r) : ROUTE_IDS.flatMap(rows);
    const roles = [...new Set(all.flatMap(u => u.builds.flatMap(b => b.roles || [])))].sort();
    const bFits = b => (!papel || (b.roles || []).includes(papel)) && (!arma || armaKey(b.weapon) === arma);
    const fits = u => (!papel && !arma) || u.builds.some(bFits);
    const step = (rt, s) => `<li>${C(s.jid)} <span class="mut">· ${esc(tx(CLASSES[s.jid], 'tier'))}${s.req ? ' · ' + esc(dataTx(s.req)) : ''}</span>` +
      (s.now ? ` <b class="bd-now">${t('ahora')}</b>` : s.idx >= 0 && rt ? ` <span class="mut">· ${t('desde el {c}', { c: chapLink(routeChapters(rt)[s.idx].key) })}</span>` : '') + '</li>';
    const build = (rt, b) => `<div class="bd-b"><h4>${esc(tx(b, 'name'))} ${COM()}${b.debate ? `<span class="mm-tag bd-deb">${t('En disputa')}</span>` : ''}</h4>` +
      (b.ok ? '' : p(`<b>${t('No disponible en esta ruta')}</b>: ${esc(b.issue)}`)) +
      (tx(b, 'why') ? p(esc(tx(b, 'why'))) : '') + (tx(b, 'fits') ? p(t('Elígela si: {f}', { f: esc(tx(b, 'fits')) })) : '') +
      (b.debate ? p(`<span class="mut">${esc(LANG === 'en' ? b.debate.en : b.debate.es)}</span>`) : '') +
      `<ol class="mm-ol bd-steps">${b.steps.map(s => step(rt, s)).join('')}</ol></div>`;
    const card = (rt, u, open) => { const bs = u.builds.filter(bFits), b0 = bs[0];  // with a role or weapon filter, only the builds that match
      if (!b0) { const best = (MM.chars || []).find(c => c.pid === u.pid)?.best;
        return `<details class="bd-u" id="bd-u-${esc(u.pid)}"><summary>${face(u.pid)}<span class="bd-n">${esc(nm(CHARS[u.pid]))}</span>${u.tier ? `<span class="mm-tag">${esc(u.tier)}</span>` : ''}<span class="bd-ch">${t('Sin build propuesta')}</span>${u.team ? `<span class="mm-tag">${t('En tu equipo')}</span>` : ''}</summary>` +
          p([best ? t('Clase final sugerida: {c}', { c: C(best[0]) }) : '', `<a href="${href('personaje', u.pid)}?sec=build">${t('Ficha de {p}', { p: esc(nm(CHARS[u.pid])) })}</a>`].filter(Boolean).join(' · ')) + '</details>'; }
      return `<details class="bd-u" id="bd-u-${esc(u.pid)}"${open ? ' open' : ''}><summary>${face(u.pid)}<span class="bd-n">${esc(nm(CHARS[u.pid]))}</span>` +
        (u.tier ? `<span class="mm-tag">${esc(u.tier)}</span>` : '') + `<span class="bd-ch">${b0.steps.map(s => esc(nm(CLASSES[s.jid]) || '')).join(' → ')}</span>`  /* plain: a link inside <summary> would leave instead of opening the card; build() links them */ +
        `<span class="mut bd-w">${esc(t(b0.weapon || ''))}</span>${u.team ? `<span class="mm-tag">${t('En tu equipo')}</span>` : ''}</summary>` +
        bs.map(b => build(rt, b)).join('') +
        p([u.team ? `<a href="#/equipo">${t('Tu plan, en Equipo')}</a>` : '', `<a href="${href('personaje', u.pid)}?sec=build">${t('Ficha de {p}', { p: esc(nm(CHARS[u.pid])) })}</a>`].filter(Boolean).join(' · ')) + '</details>'; };
    const list = (rt, us) => us.filter(fits).map(u => card(rt, u, false)).join('');
    const empty = p(`<span class="mut">${t('Ninguna build con estos filtros.')}</span>`);
    let body = '';
    if (r) {
      const us = rows(r), lord = part === 1 ? us.find(u => u.pid === LORDS[r]) : null, rest = us.filter(u => u !== lord);
      if (lord && fits(lord)) body += `<section id="bd-senor"><h2>${t('Señor de la ruta')}</h2>${card(r, lord, true)}</section>`;
      const l = list(r, rest);
      body += `<section id="bd-plantel"><h2>${t('Plantel')}</h2>${l || empty}</section>`;
    } else if (part === 1) {
      const gs = ROUTE_IDS.map(rt => [rt, list(rt, rows(rt))]);
      body += `<section id="bd-plantel">${gs.some(g => g[1]) ? gs.map(([rt, l]) => `<details class="card bd-g"><summary>${t('Ruta de {r}', { r: esc(ROUTE_NAME[rt]) })}</summary>${l || empty}</details>`).join('') : empty}</section>`;
    } else body += `<section id="bd-plantel"><h2>${t('Plantel')}</h2>${list('', all) || empty}</section>`;
    if (part === 3) body += `<section id="bd-divinas" class="card"><h2>${t('Clases divinas')}</h2>${p(t('Cada clase divina es para una sola unidad y pide su objeto.'))}<ul class="mm-ol">` +
      buildsDivine().map(d => `<li class="bd-d">${C(d.jid)} · ${O(d.item)}${d.cands.length ? ': ' + d.cands.map(x => `${PJ(x.pid)} <span class="mut">(${x.alt ? t('si va a otra unidad: {b}', { b: esc(tx(x.alt, 'name')) }) : t('Sin alternativa propuesta')})</span>`).join(', ') : ''}</li>`).join('') + '</ul></section>';
    const ctl = `<div id="bd-ctx" class="bd-ctx">${routeChips('builds', qs, r)}${chips('builds', qs, 'p', [['1', 'Parte 1'], ['3', 'Partes 2 y 3']], String(part), 'Parte')}` +
      chips('builds', qs, 'papel', [['', 'Todos'], ...roles.map(x => [x, roleName(x)])], papel, 'Papel') + chips('builds', qs, 'arma', [['', 'Todas'], ...ARMAS], arma, 'Arma') + '</div>';
    return ctl + body;
  }

  /* ---------------- Reclutas que valen la pena ---------------- */
  const TOP = [
    ['Sirocco', 'Crecimientos altos y equilibrados; esquiva y magia.'], ['Esmeralda', 'Fue 55 y Def 45: tanque que vuela.'],
    ['Guzran', 'Vel 50 y Fue 45: daño físico y crítico.'], ['Mu', 'Signos de madurez suma +20 a todos sus crecimientos; mejor en clases físicas.'],
    ['Olympia', 'Mag 50: maga y sanadora.'], ['Fabio', 'Mag 50 y Res 45.'], ['Sofia', 'Sanadora de Mag 45 y Res 40.'],
    ['Catania', 'Vel 55 y Hab 50: tanque de esquiva.'], ['Ultand', 'De los crecimientos totales más altos; Res 45.'],
    ['Alexandra', 'Vel 55: voladora rápida.'], ['Ninae', () => t('Fue 45 y Res 45; cuesta 1 {i}.', { i: O('IID_カガヤキウオ') })], ['Noctula', 'Requisitos muy bajos en tres rutas; Fue y Vel 45.'],
  ];
  const LOW = [
    ['Majide', 'Los crecimientos totales más bajos del elenco de la Parte 1.'], ['Zarcone', 'Crecimientos bajos salvo Hab.'],
    ['Peppe', () => t('Llega tarde y pide haber hecho el Desvío {d}; no se recluta en la ruta de Leda.', { d: L('desvio', 'SSID_ベルトラン外伝') })],
    ['Benditz', 'Crecimientos modestos y llega tarde en varias rutas.'],
  ];
  const LATE = [
    ['Creek', 'Guerra 2, tras derrotarlo, si en la Parte 1 se completó su misión (caps. 9–10 de las rutas de Dietrich y Leda).'],
    ['Nathan', 'Guerra 3, si Creek le da el golpe final.'],
    ['Orchel', 'Parte 3, si se hizo su Desvío en la Parte 1.'], ['Talimun', 'Parte 3, si se hizo su Desvío en la Parte 1.'], ['Anatolia', 'Parte 3, si se hizo su Desvío en la Parte 1.'],
    ['Bertrand', 'Parte 3, con su Desvío hecho.'], ['Hong Hua', 'Se une sola.'], ['Troy', 'Se une solo.'],
    ['Aswan', 'Debe sobrevivir a la Guerra 3 para unirse en la Sección 5; llega tarde y con crecimientos bajos.'], ['Klapka', 'Debe sobrevivir a la Sección 5 para unirse en la 6; es el último en unirse.'],
  ];
  function costOn(id, r) {
    const x = CHARS[id]?.routes?.[r];
    if (!x) {  // chapter routes can miss a Part 1 recruit row (Guzran on Cai): fall back to the game's recruit table
      const row = (CHARS[id]?.recruit?.rows || []).find(w => w.route_es === ROUTE_NAME[r]);
      return row ? (list([row.item ? `${row.count_or_gold > 1 ? row.count_or_gold + '× ' : ''}${L('objeto', row.item, row.item_es)}` : row.count_or_gold ? gold(row.count_or_gold) : '', t('Apoyo {n}', { n: row.support }), t('Prestigio {n}', { n: row.renown })])) : `<span class="mut">${t('No se recluta en esta ruta')}</span>`;
    }
    if (!x.cost) return `${t('Se une sola')}${x.join_key && CAPS[x.join_key] ? ` (${chapLink(x.join_key)})` : ''}`;
    const deal = recruitDeal(id, r);
    return `${recruitCost(x.cost)}${x.recruit_key && CAPS[x.recruit_key] ? ' · ' + t('desde el {c}', { c: chapLink(x.recruit_key) }) : ''}${deal ? `<br><small>${deal}.</small>` : ''}`;
  }

  function reclutas(qs) {
    // ?r= or the chosen route; none (or «Todas las rutas»): one cost column per route
    const r = qs.r === 'todas' ? '' : ROUTE_IDS.includes(qs.r) ? listRoute(qs) : ctxRoute(), rs = r ? [r] : ROUTE_IDS;
    const team = teamNow(r), PJ = id => L('personaje', id) + (team?.has(id) ? `<span class="mm-tag">${t('En tu equipo')}</span>` : '');
    const rows = xs => xs.map(([es, why]) => [pid(es), typeof why === 'function' ? why() : t(why)]).filter(([id]) => id).map(([id, why]) => [PJ(id), why, ...rs.map(x => costOn(id, x))]);  // why is authored HTML; growths are in each ficha
    const isCheap = (c, x) => c.routes?.[x]?.cost && c.routes[x].cost.support <= 2 && c.routes[x].cost.renown <= 6;
    const cheap = Object.values(CHARS).filter(c => rs.some(x => isCheap(c, x)))
      .sort((a, b) => Math.min(...rs.map(x => CAPS[a.routes?.[x]?.recruit_key]?.n ?? 99)) - Math.min(...rs.map(x => CAPS[b.routes?.[x]?.recruit_key]?.n ?? 99)) || a.es.localeCompare(b.es, 'es'));
    const costH = rs.map(x => t('Coste en la ruta de {r}', { r: esc(ROUTE_NAME[x]) }));
    const late = LATE.map(([es, how]) => (pid(es) ? [PJ(pid(es)), esc(t(how))] : null)).filter(Boolean);
    return ficha(head(t('Reclutas recomendados'), r ? t('Quién compensa reclutar en la Parte 1 y cuánto cuesta en la ruta de {r}.', { r: esc(ROUTE_NAME[r]) }) : t('Quién compensa reclutar en la Parte 1 y cuánto cuesta en cada ruta.')) + guiaLink('reclutamiento') +
      routeChips('reclutas', qs, r), [
      ['reglas', 'Reglas', bl([
        'Reclutar pronto: quien llega tarde sube con el 80 % de su crecimiento, sin crecimientos de clase, con competencias bajas y sin clases intermedias dominadas.',
        'Si un recluta se desbloquea justo antes de cambiar de capítulo, conviene esperar al inicio del siguiente: entra con más nivel.',
        'El Prestigio que se pide es el de la ruta en curso.',
        'En la Parte 3 hacen falta muchas unidades: repartir los reclutas entre las cuatro rutas compensa más que repetirlos.',
      ].map(s => t(s)))],
      ['alta', 'Prioridad alta', tbl([t('Personaje'), t('Por qué'), ...costH], rows(TOP))],
      ['baratos', r ? 'Baratos y tempranos en esta ruta' : 'Baratos y tempranos', p(r ? t('Apoyo 2 o menos y Prestigio 6 o menos.') : t('Apoyo 2 o menos y Prestigio 6 o menos en alguna ruta.')) +
        tbl([t('Personaje'), ...costH], cheap.map(c => [PJ(c.id), ...rs.map(x => costOn(c.id, x))]))],
      ['baja', 'Poco rentables', tbl([t('Personaje'), t('Por qué'), ...costH], rows(LOW))],
      ['tarde', 'Se unen en las Partes 2 y 3', tbl([t('Personaje'), t('Cómo')], late)],
    ]) + p(t('Crecimientos y build de cada uno: su ficha. Orden de reclutamiento con totales, builds, monturas y regalos de los elegidos: <a href="{h}">Equipo</a>.', { h: `#/equipo${r ? `?r=${r}` : ''}` }));
  }

  /* ---------------- Trucos y mecánicas ocultas ---------------- */
  const RELOAD = 'Requiere recargar partida', RESET = 'Requiere Reiniciar capítulo';
  const TRUCOS = () => [  // built on each render: the texts follow the reader's language
    { id: 'reiniciar', g: 'Reinicios', t: 'Qué deshace Reiniciar capítulo', tag: '', h: p(t('«Reiniciar capítulo» (en la Percha o en Sistema) vuelve al inicio del capítulo.')) + kvRows([
      [t('Se conserva'), t('Puntos y niveles de apoyo, conversaciones vistas y galería, Registro de logros, Ayudas de salvación, Esquirlas cau. y casillas de búsqueda descubiertas.')],
      [t('Se deshace'), t('Niveles, EXP, atributos, competencias, clases y exámenes; objetos y oro; Prestigio; turnos; misiones del capítulo; reclutas de ese capítulo; tributo del Servicio divino; vínculo con las monturas.')]]) },
    { id: 'bucle-apoyos', g: 'Reinicios', t: 'Bucle de apoyos', tag: RESET, h: ol([
      t('Dar un regalo a los invitados en el capítulo anterior para que acepten comidas.'), t('Hacer las comidas de la semana con ellos.'),
      t('Pasar con Actividades auto. hasta el domingo siguiente y repetir hasta agotar el plazo.'), t('Reiniciar capítulo: el apoyo ganado se queda y el oro y los turnos vuelven.'),
    ]) + p(t('Durante el bucle no conviene subir niveles, comprar, reclutar ni hacer el Servicio divino: todo eso se deshace. Se hace en la última vuelta. Los capítulos largos rinden más y los apoyos no deseados también son permanentes.')) +
      p(t('Variante con Banquete: en el mapa, un banquete con un solo ingrediente da 20 de apoyo a cada pareja del grupo y se puede repetir.')) },
    { id: 'doble-semana', g: 'Rutina', t: 'Doble semana del sábado', tag: '', h: p(t('Lo usado el sábado vuelve a estar libre el domingo a las 0:00: gastar todo el cupo el sábado por la noche, esperar en Dagsion y gastarlo otra vez. La Plaza de armas tiene descuento los dos días; abre a las 6:00.')) },
    { id: 'secuencia', g: 'RNG fija', t: 'Secuencia fija de subidas de nivel', tag: RELOAD, h: p(t('Las subidas de nivel salen de una secuencia fija. Cada examen, apruebe o no, y cada clase nueva que se enseña la adelantan un paso. Se puede ver la próxima subida con Actividades auto. y recargar; si es mala, hacer antes un examen barato para saltarla. Rebobinar con Fortuna no la cambia: las mismas acciones dan los mismos resultados.')) },
    { id: 'examen', g: 'RNG fija', t: 'Resultado de examen fijado', tag: RESET, h: p(t('El resultado de cada examen queda fijado desde el inicio del capítulo. Si un intento aprueba, repetir los mismos pasos tras reiniciar vuelve a aprobar; hacer antes otro examen cambia qué intento aprueba.')) + p(t('Cómo averiguar el intento bueno: gasta licencias baratas en exámenes básicos para ver en qué intento sale el aprobado. Después recarga, haz antes los exámenes básicos necesarios con licencias baratas hasta llegar a ese intento y haz entonces el examen que importa.')) },
    { id: 'cajas', g: 'RNG fija', t: 'Cajas de armas', tag: RELOAD, h: p(t('El contenido de {a} (800 G) y {b} (2000 G), en la tienda de objetos de Megaira, se decide al comprarlas. Guardar antes y variar lo que se hace antes de comprar cambia el resultado; repetir exactamente los mismos pasos da lo mismo.', { a: O('IID_良質な武具箱'), b: O('IID_高級な武具箱') })) },
    { id: 'cebo', cai: true, g: 'RNG fija', t: 'Monturas: el animal se fija al poner el cebo (ruta de Cai)', tag: RELOAD, h: p(t('El animal y su habilidad se deciden al poner el Cebo, por el turno, la casilla y las acciones previas. Para cambiarlo: un turno más o menos, otra casilla, o una Búsqueda antes del cebo. Entrar en una mazmorra o chocar con enemigos del mapa crea un autoguardado que no se puede deshacer recargando.')) },
    { id: 'retirada', g: 'EXP', t: 'Golpear y retirarse (bucle de mazmorra)', tag: '', h: p(t('En una Batalla rápida (mazmorras y enemigos del mapa) cada asalto en que la unidad hace al menos 1 de daño da EXP de competencia y de clase; atacar dos veces no da más. Retirarse antes de matar al último enemigo conserva lo ganado y el enemigo vuelve con toda la vida: se repite sin gastar turnos de historia ni EXP de nivel.')) + bl([
      t('Tope: 15 asaltos por combate (el botón de saltar avanza como mucho 15). Retírate y vuelve a entrar.'),
      t('Retírate con el enemigo a 3 PV o más: un crítico que lo mate te devuelve al mapa con autoguardado y el bucle se pierde hasta el siguiente capítulo. Entrar con dos grupos ayuda: si matas al primero, te retiras en el segundo.'),
      t('Quita las armas y magias a todo el ejército, también a la reserva: los ataques de apoyo desde el banquillo pueden matar al enemigo.'),
      t('Equitación y Vuelo no suben aquí: dentro de una mazmorra las unidades montadas luchan a pie y suben Infantería. Coraza sí sube.'),
      t('Las magias se gastan: descansa en las zonas de recuperación de la mazmorra.'),
    ]) + p(`${t('Sitios probados:')} ${COM()}`) + bl([
      t('{a} (junto a {m}{cai}): un grupo de soldados. Con Atq 31 haces 1 de daño y con Def 24 no recibes nada. Atajos: {e} (Def +5, en {m}); {u} cura a los adyacentes cada turno; aprobar {k} sube la Fue al menos a 10; {f} (Pot 10, eficaz contra acorazados: 20) se vende en {c}. Sin Atq suficiente, {h}: las hachas quitan al menos 5 PV.',
        { a: L('lugar', 'ハイン砦'), m: L('lugar', '城塞都市モンス'), cai: caiHide() ? '' : t('; no está abierto para Cai en la Parte 1'), e: O('IID_銀の盾'), u: PJ('PID_ウルタンド'), k: C('JID_重装歩兵'), f: O('IID_フリッサ'), c: L('lugar', 'カリアネイラの港'), h: O('IID_木製の斧') }),
      !caiHide() && t('Ruta de Cai: {a}. Cuatro grupos de piojos en la primera sala; no mates al último grupo y retírate: vuelven todos. No pide atributos altos, no gasta turnos y el templo (cambio de clase) y la posada (recuperar magia) quedan al lado.', { a: L('lugar', '帝都ダグシオン下水道', t('Alcantarillas de Dagsion')) }),
      !caiHide() && t('Ruta de Cai: {a}, un grupo de acorazados cerca de la entrada, junto al templo.', { a: L('lugar', '禁断の森') }),
      t('{a}: dos combates con un gusano de arena que regenera unos 6–8 PV por turno; con un golpe que no lo supere se puede seguir sin retirarse. Cuidado con lo que lo acompaña.', { a: L('lugar', '異教徒の洞窟') }),
      t('Contra no muertos (el Favor infernal reduce el daño y se curan al herirte): un muro de unidades con {u} curando. Es una escaramuza normal, así que aquí las monturas sí suben.', { u: PJ('PID_ウルタンド') }),
    ]) + p(t('Las habilidades de formación del grupo activo también suman para llegar a los umbrales. Fórmula y tabla de rangos: <a href="#/mecanicas?ir=competencias">Competencias</a>. Los objetos, las tiendas y los accesos están comprobados con los datos del juego.')) },
    { id: 'magia-senores', g: 'EXP', t: 'Magia de los señores sin gastar usos', tag: '', h: p(t('{a}, {b} y {c} pueden subir Magia negra o blanca en una mazmorra: equipa un hechizo de daño y lanza el ataque preventivo al enemigo. Lo lanza sin gastar usos y acierta siempre. Después, retirarse y repetir. No funciona con «golpe para saltar» activado en esa mazmorra.', { a: PJ('PID_カイ'), b: PJ('PID_セオドラ'), c: PJ('PID_イシュマール') }) + ' ' + COM()) },
    { id: 'casillas-curativas', g: 'EXP', t: 'Casillas de curación', tag: '', h: p(t('En los mapas con casillas que curan, una unidad y un enemigo sobre ellas pueden combatir sin fin. Sirve para cualquier competencia, también monturas, pero da EXP de nivel en la clase actual. Ejemplos: cap. 10 de Theodora y cap. 6 de Cai.') + ' ' + COM()) },
    { id: 'derrota', g: 'EXP', t: 'Perder conserva la EXP', tag: '', h: p(t('Tras perder una batalla se puede reintentar conservando la EXP y las competencias ganadas: conviene luchar hasta la última unidad.')) },
    { id: 'reserva', g: 'EXP', t: 'Remate y reserva', tag: '', h: p(t('En la Batalla rápida, el golpe que remata da EXP ×3; las unidades en reserva reciben la mitad. Los jefes dan el doble.')) },
    { id: 'nivel-enemigo', g: 'Mecánicas ocultas', t: 'Nivel de los enemigos', tag: '', h: p(t('Al empezar cada capítulo, el nivel base es la media de los 10 aliados de mayor nivel, limitada al rango del capítulo. Enemigos normales +2, oficiales +3, jefes +5. Subir mucho a pocas unidades sube a todos los enemigos.')) },
    { id: 'tardios', g: 'Mecánicas ocultas', t: 'Reclutas tardíos', tag: '', h: p(t('Una unidad no reclutada sube sola con el 80 % de su crecimiento personal y sin crecimientos de clase. Reclutar pronto da unidades más fuertes.')) },
    { id: 'minimos', g: 'Mecánicas ocultas', t: 'Mínimos de clase al aprobar', tag: '', h: p(t('Aprobar un examen sube cada atributo por debajo del mínimo de la clase hasta ese mínimo, aunque no se cambie de clase: {a} regala Def a los magos y {b}, Vel.', { a: C('JID_重装歩兵'), b: C('JID_飛駝兵') })) },
    { id: 'bonos-apoyo', g: 'Mecánicas ocultas', t: 'Mejoras de apoyo en combate', tag: '', h: p(t('La Previsión oculta las Mejoras de apoyo (se ven pulsando X). Los de clase dependen de la familia de la clase del aliado adyacente y crecen del nivel 2 al 5; los de pareja son fijos desde el nivel 2 y son la única fuente de velocidad de ataque por apoyo. Algunas parejas sin conversaciones también tienen bono.')) },
    { id: 'busqueda', g: 'Mecánicas ocultas', t: 'Búsqueda acumulada', tag: '', h: p(t('La habilidad Búsqueda ({a}) y sus versiones de {b}, {c} y {d} se suman entre las unidades del grupo: varias unidades con ella multiplican los resultados Perfecto.', { a: CN('Pícaro'), b: CN('Rastreador'), c: CN('Buscasombras'), d: CN('Truhan') })) },  // i18n-ignore
    { id: 'tiempo', g: 'Mecánicas ocultas', t: 'Tiempo y turnos', tag: '', h: bl([
      t('Cada batalla gasta 1 turno, dure lo que dure.'), t('El carruaje no gasta turnos: solo la tarifa (100 / 200 / 300 G). El destino no necesita estar activado.'),
      t('Comprar en una ciudad puede gastar el turno.'), t('Las actividades de Dagsion no gastan turno: el reloj se para al final del turno en curso.')]) },
    { id: 'bendiciones', g: 'Mecánicas ocultas', t: 'Bendiciones y arena', tag: '', h: p(t('Las Bendiciones duran hasta la siguiente fase propia: se lanzan pronto. Rebobinar con Fortuna antes de lanzarlas devuelve su arena; la arena se rellena al entrar en una batalla principal o un Desvío.')) },
    { id: 'eventos', g: 'Perdibles', t: 'Eventos perdibles', tag: '', h: p(t('Los eventos aparecen como pulsos amarillos en el mapa de Dagsion y se pierden al cambiar de capítulo. En la Sala de los obeliscos (Santuario causalidad) → Recuerdos → Eventos se marcan con «?» los que faltan; se recuperan rejugando ese capítulo. Lista por ruta: <a href="#/perdibles">Perdibles</a>.')) },
    { id: 'desvios', g: 'Perdibles', t: 'Fecha de los Desvíos', tag: '', h: p(t('La fecha que anuncia un Desvío es la de aceptación: aceptarlo pronto en Dagsion muestra cuándo es el combate. Cada Desvío da 20 000 G y 150 de Prestigio.')) },
    { id: 'orden-rutas', g: 'Reinicios', t: 'Orden de las rutas', tag: '', h: p(t('Cambiar de ruta a mitad no da nada. Tras terminar la Parte 1 de una ruta, empezar otra desde el cap. 1 copia el mapa descubierto, las postas, las misiones compartidas y las Bendiciones. Terminar por primera vez la Parte 1 de cada señor da 5000 Esquirlas cau. y abre más Ayudas de salvación y las misiones de segunda vuelta.')) },
    { id: 'nueva-vuelta', g: 'Reinicios', t: 'Nueva vuelta de una ruta', tag: '', h: bl([
      t('Empieza la Parte 1 desde el cap. 1: «Reiniciar capítulo» no hereda el mapa ni las misiones de otra ruta.'),
      t('Los apoyos se conservan: hacen falta menos comidas y los reclutamientos llegan antes.'),
      t('Las misiones secundarias hechas en otras rutas cuentan como hechas, con su recompensa.'),
      t('Cambio de clase temprano: un examen por debajo del nivel recomendado (18–32 %) se puede repetir reiniciando el capítulo (ver «Resultado de examen fijado»).'),
      !caiHide() && t('En la ruta de Cai, con el mapa desvelado, las monturas raras se capturan en cuanto se abre el Cebo, sin explorar antes.'),
      !caiHide() && t('Cai sigue sin poder ir al oeste: los fuertes de esa mitad no se abren y no hay Dátiles ni mazmorras del desierto en su Parte 1.'),
    ]) },
    { id: 'fusion', g: 'Parte 3', t: 'Fusión causal', tag: '', h: p(t('Cuesta 300 Esquirlas cau. y conserva el mayor de los dos valores de nivel, cada atributo y la EXP de competencias y de clase; suma habilidades, técnicas y certificaciones. No conserva clase, montura, objetos ni apoyos. Rejugar una sección de la Parte 3 deshace las fusiones sin devolver las esquirlas: rejugar primero y fusionar después.')) },
  ].filter(x => !(x.cai && caiHide(true)));  // a Cai-only trick: not in Part 1 of another route

  function trucos(qs) {
    const TR = TRUCOS(), hit = TR.find(x => x.id === qs.s);
    const card1 = (x, on) => `<section class="mm-tr${on ? ' mm-hit' : ''}" id="mm-${x.id}"><h4>${esc(t(x.t))}${x.tag ? `<span class="mm-tag">${esc(t(x.tag))}</span>` : ''}</h4>${x.h}</section>`;
    const groups = [...new Set(TR.map(x => x.g))];
    return ficha(head(t('Trucos y mecánicas ocultas'), t('Atajos opcionales y reglas que el juego no explica. Los que dependen de recargar o reiniciar lo indican. Ningún parche ha cambiado ninguno.')) +
      (hit ? `<div class="card">${card1(hit, true)}</div>` : ''),
      groups.map(g => [norm(g).replace(/[^a-z0-9]+/g, '-'), g, TR.filter(x => x.g === g).map(x => card1(x, false)).join('')]));  // ficha() translates the titles; ids from the Spanish group keep the addresses
  }

  /* ---------------- registry ---------------- */
  // label and sub: dictionary keys or composed text already in the reader's language (pre: search.js leaves them as they are)
  const S = (label, sub2, h, aliases) => ({ group: 'Mecánicas', label: tl(label), sub: tl(sub2), href: h, aliases: [label, ...(aliases || [])], pre: true });
  register({ id: 'guia', group: 'minmax', title: 'Recorrido de la Parte 1', order: 10, render: (id, qs) => (id ? guiaTema(id) : guia(qs || {})), css: CSS,  // #/guia/<id>: a topic guide (pages/guias.js)
    search: () => [S('Recorrido de la Parte 1 (cada ruta)', 'Capítulo a capítulo', '#/guia', ['guia de la parte 1', 'recorrido', 'prioridades', 'qué hacer en cada capítulo']),  // i18n-ignore
      ...ROUTE_IDS.map(r => S(`${t('Recorrido de la Parte 1')} · ${ROUTE_NAME[r]}`, 'Capítulo a capítulo', `#/guia?r=${r}`, [`ruta de ${ROUTE_NAME[r]}`, ROUTE_NAME[r]]))] });  // i18n-ignore
  register({ id: 'builds', group: 'minmax', title: 'Builds', order: 20, render: (id, qs) => builds(qs || {}), css: CSS,
    search: () => [S('Builds', 'Por arma, papel y personaje', '#/builds', ['builds por arma y papel', 'build', 'maestrías']), S(gt('Senda de la cuadriga'), `${gt('Cuadriguero')} · ${t('crecimiento oculto')}`, '#/builds', ['cuadriguero', 'auriga']),  // i18n-ignore
      ...(MM.masteries || []).map(m => S(t('Maestría: {s}', { s: gt(m.skill) }), nm(CLASSES[m.cls[0]]), '#/builds', [m.skill]))] });  // i18n-ignore
  register({ id: 'reclutas', group: 'minmax', title: 'Reclutas recomendados', order: 30, render: (id, qs) => reclutas(qs || {}), css: CSS,
    search: () => [S('Reclutas recomendados', 'Quién compensa reclutar', '#/reclutas', ['reclutas que valen la pena', 'reclutamiento', 'tier'])] });  // i18n-ignore
  register({ id: 'trucos', group: 'minmax', title: 'Trucos y mecánicas ocultas', order: 40, render: (id, qs) => trucos(qs || {}), css: CSS,
    search: () => TRUCOS().map(x => S(x.t, `${t('Truco')} · ${t(x.g)}`, `#/trucos?s=${x.id}`, [x.tag])) });
})();
