/* Fortune's Weave · wiki2 · Clases y combate › Monturas: listing (#/monturas?t=<type>: every mount, the Establo rules and the lure) and
   the ficha #/montura/<rid> (highlights «Monturas» in the menu). Everything shows without a click: the ficha is a header plus cards.
   Data: W.classes.mounts (availability, bond_skill_pool, food, matching_foods, flat/growth_by_bond, lure_spots_detail, release_table)
   and W.classes.mount_rules (bond thresholds, feeding points, capture and lure odds). */
'use strict';
(() => {
  const R = (W.classes || {}).mount_rules || {}, FE = R.feed_exp || {}, CAP = R.capture || {};
  const COM = () => `<span class="gu-com" title="${t('Dato de la comunidad')}"></span>`;
  /** data text in the reader's language: the wiki's prose dictionary, else the game's own table */
  const dx = s => (s && isEn() && EN_DICT().ui?.[s] != null ? t(s) : gt(s));
  /** nlx() in the reader's language: an entity's own name (nm), else the text through dx (nlx() shows the game table, which lacks most names) */
  const nlx = n => { if (n == null) return ''; const s = String(n), ex = NAME.get(norm(s)), h = ex || NAME.get(norm(s.replace(/\s*\(.*\)\s*$/, '')));
    return ex && LBL[ex[0]] ? L(ex[0], ex[1]) : h ? `<a href="${href(h[0], h[1])}">${esc(dx(s))}</a>` : esc(dx(s)); };
  const KINDS = ['Caballo', 'Ornius', 'Pegaso', 'Bau', 'Elefante'];
  const tw = (head, rows) => (rows.length ? `<div class="tw"><table><tr>${head.map(h => `<th>${/^[\d★]+$/.test(h) ? h : t(h)}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c ?? ''}</td>`).join('')}</tr>`).join('')}</table></div>` : '');
  const p = x => `<p>${x}</p>`;
  const stars = g => '★'.repeat(g || 0);
  const statTxt = o => list(Object.entries(o || {}).map(([k, v]) => `${statName(k) || k} +${v}`));
  const food = f => `${esc(dx(f.type))} · ${esc(dx(f.taste))}`;
  const obj = (iid, label) => `${itemIco(iid, 'ico')}${L('objeto', iid, label)}`;
  const klass = name => nlx(name);  // a class named in the data (Spanish)
  /** bond points of one meal: base + quality + favourite type + favourite flavour (+ the animal's own «Favorito») */
  const feedPts = (grade, type, taste, fav) => (FE.base ?? 1) + ((FE.grade || {})[grade] ?? 0) + (type ? FE.fav_type ?? 6 : 0) + (taste ? FE.fav_taste ?? 3 : 0) + (fav ? FE.great_fav ?? 5 : 0);
  const original = k => Object.keys(MOUNTS).find(x => MOUNTS[x].duplicate_becomes === k);
  const questsOf = k => (R.quests || []).filter(q => q.deliver_mount === k || (q.gives_mounts || []).includes(k));
  const qLink = q => (QUEST[q.id] ? L('mision', q.id) : esc(gt(q.es)));

  /** short availability (listing column and ficha header) */
  function availShort(k, m) {
    const a = m.availability || {};
    if (m.default) return t('De clase: sin bonos');
    if (a.how === 'cebo') return a.p1_cai ? t('Cebo: Parte 1 (ruta de Cai, desde el cap. {n}) y Parte 3', { n: a.p1_from_chapter }) : t('Cebo: solo Parte 3');
    if (a.how === 'misión') return t('Misión de la Parte 3');
    if (a.how === 'personaje') return t('Montura de {who}', { who: a.owner && CHARS[a.owner] ? L('personaje', a.owner) : esc(gt(a.owner_es || '')) });
    if (a.how === 'duplicado') return t('Copia de {m} (Parte 3)', { m: original(k) ? L('montura', original(k)) : t('una montura única') });
    return '';
  }
  /** every way to get it, one line each, with the route and part it applies to */
  function availLines(k, m) {
    const a = m.availability || {}, out = [];
    if (a.how === 'cebo') {
      out.push(a.p1_cai ? t('<b>Parte 1:</b> solo en la ruta de Cai, desde el cap. {n}, con Cebo. En las otras rutas no se capturan animales.', { n: a.p1_from_chapter })
        : t('<b>Parte 1:</b> no se puede conseguir en ninguna ruta (sus lugares de cebo están cerrados para Cai).'));
      out.push(`${t('<b>Parte 2:</b> el Establo sigue abierto con Cai aliado (alimentar y asignar), sin Cebo.')} ${COM()}`);
      out.push(t('<b>Parte 3:</b> en todas las rutas, desde el cap. {n}, con Cai en el ejército (la milicia de Cai pone el Cebo; capturan todos).', { n: a.p3_from_chapter || 2 }));
    }
    if (a.how === 'misión') questsOf(k).forEach(q => out.push(t('<b>Parte 3:</b> recompensa de la misión {q} (entregar {n}× {items}); da {c} ejemplares. Pide haber terminado la Parte 2 de Cai y tener desbloqueado el {cl}. Es la única forma de conseguirlo.',
      { q: qLink(q), n: q.n, items: list((q.deliver_items || []).map(i => obj(i))), c: (q.gives_mounts || []).filter(x => x === k).length, cl: klass('Jinete de elefantes') })));  // i18n-ignore: the class's Spanish name, linked by nlx()
    if (a.how === 'personaje') {
      const o = a.owner, r = CHARS[o]?.routes || {};
      out.push(t('Llega con {who}, que lo monta siempre. No se puede capturar ni tiene lugar de cebo.', { who: CHARS[o] ? L('personaje', o) : esc(gt(a.owner_es)) }) +
        (CHARS[o] ? ' ' + t('Se une en: {where}.', { where: list(ROUTE_IDS.filter(x => r[x]?.recruit_key || r[x]?.join_key).map(x => `${t('ruta de {r}', { r: ROUTE_NAME[x] })} (${chapLink(r[x].recruit_key || r[x].join_key)})`)) }) : ''));
      out.push(`${t('En la ruta de Cai se puede asignar a otra unidad del mismo tipo de montura.')} ${COM()}`);
      if (m.duplicate_becomes) out.push(t('Si en la Parte 3 se junta un segundo ejemplar (varios {m} de distintas rutas), el juego lo convierte en {d}: igual, pero no única.', { m: esc(gt(a.owner_es)), d: L('montura', m.duplicate_becomes) }));
    }
    if (a.how === 'duplicado' && original(k)) out.push(t('Aparece en la Parte 3 cuando se tiene {m} repetido: el juego convierte la copia en esta montura. Tiene los mismos bonos, comida y habilidad que la original, pero no es única.', { m: L('montura', original(k)) }));
    (R.quests || []).filter(q => q.deliver_mount === k).forEach(q => out.push(t(q.n > 1 ? 'Se entrega en la misión {q} ({n}×): conviene conservar ejemplares en el Establo.' : 'Se entrega en la misión {q} ({n}×): conviene conservar uno en el Establo.', { q: qLink(q), n: q.n })));
    return out;
  }
  /** lure places with their chance; the ones closed in Cai's Part 1 say so, and a line says when none is open in the context chapter */
  function lure(m) {
    const rows = (m.lure_spots_detail || []).map(s => {
      const name = SPOTS[s.spot] ? L('lugar', s.spot) : nlx(s.es);
      const ok = !ctxChosen() || spotAccess(s.spot).ok;
      return [`${name} <small>${pct(s.pct)}${s.rare ? ', ' + t('rara') : ''}${s.cai_p1 ? (ok ? '' : ` (${t('sin acceso')})`) : ', ' + t('solo Parte 3')}</small>`, ok];
    });
    const other = ctxChosen() && ctxRoute() !== 'cai' && CAPS[ctxGet().key]?.part === 1;  // Part 1 of another lord: no Cebo at all
    return list(rows.map(r => r[0])) + (rows.length && rows.every(r => !r[1]) ? `<br><small>${t('No se puede atraer en la Parte 1 de Cai.')}</small>` : '') +
      `<br><small>${other ? t('En la Parte 1 de esta ruta no se capturan monturas.') + ' ' : ''}${t('Solo con el {cebo} de Cai: ruta de Cai en la Parte 1; Parte 3 de cualquier ruta con Cai en el ejército.', { cebo: `<a href="#/monturas?ir=cebo">${t('Cebo')}</a>` })}</small>`;
  }
  const skillLink = s => (SKILLS[s.id] ? L('habilidad', s.id, s.es) : esc(dx(s.es)));
  const skillDesc = s => esc((SKILLS[s.id]?.desc_en && isEn() ? SKILLS[s.id].desc_en : dx(s.desc_es || '')).replace(/\s+/g, ' '));

  function montura(k) {
    const m = MOUNTS[k];
    if (!m) return notFound();
    const pool = m.bond_skill_pool || [], f = m.food;
    const kindLink = m.kind ? `<a href="#/monturas?t=${esc(m.kind)}">${esc(gt(m.kind))}</a>` : '';
    const head = fichaHead(img(ico().mount?.[k], 'fi-pic'), `<a href="#/monturas">${t('Monturas')}</a> · <a href="#/guia/monturas">${t('Guía')}</a>`, nm(m), gt(m.kind),
      (tx(m, 'desc') ? `<p>${esc(tx(m, 'desc'))}</p>` : '') + kvRows([
        [t('Tipo'), kindLink], [t('Cómo se consigue'), availShort(k, m)],
        [t('Dónde se atrae'), (m.lure_spots_detail || []).length ? lure(m) : ''],
        [t('Comida'), f ? food(f) : ''],
        [t('Habilidad de vínculo'), list(pool.map(x => skillLink(x.stage1)))],
        [t('Bonos con vínculo 5'), statTxt(m.flat_by_bond?.[5])],
        [t('Quién la monta'), list((m.riding_classes || []).map(klass))],
      ]));
    if (m.default) {
      const wild = (m.wild_same_kind || []).filter(x => MOUNTS[x]);
      return head + card(t('Montura de clase'), p(t('Es la montura que lleva la clase cuando no tiene un animal asignado. No da atributos, crecimientos ni habilidad de vínculo, no come y no se puede liberar. Para tener bonos hay que asignar una montura salvaje del mismo tipo ({kind}), con su vínculo:', { kind: esc(gt(m.kind)) })) +
        tw(['Montura', 'Bonos con vínculo 5', 'Crecimiento con vínculo 5', 'Cómo se consigue'], wild.map(x => [L('montura', x), statTxt(MOUNTS[x].flat_by_bond?.[5]), statTxt(MOUNTS[x].growth_by_bond?.[5]), availShort(x, MOUNTS[x])])) +
        p(t('Las monturas salvajes solo se capturan en la ruta de Cai (Parte 1, desde el cap. 5) y en la Parte 3 de cualquier ruta con Cai en el ejército. Más en {establo} y en la {guia}.', { establo: `<a href="#/monturas?ir=establo">${t('Establo')}</a>`, guia: `<a href="#/guia/monturas">${t('guía')}</a>` })), 'fi-clase');
    }
    const B = R.bond_skill_levels || { base: 3, plus: 5 };
    const skill = pool.length ? card(t('Habilidad de vínculo'),
      tw(['Probabilidad', `Vínculo ${B.base}`, `Vínculo ${B.plus} («+»)`], pool.map(x => [pct(x.pct), `${skillLink(x.stage1)}<br><small>${skillDesc(x.stage1)}</small>`, `${skillLink(x.stage2)}<br><small>${skillDesc(x.stage2)}</small>`])) +
      p(pool.length > 1 ? t('Cada ejemplar trae {one} de estas habilidades, sorteada al crearse el animal (captura, misión o copia), con la misma probabilidad para cada una; el cebo, el lugar y el vínculo no influyen. Una vez capturado no cambia: el Establo muestra cuál tiene.', { one: `<b>${t('una sola')}</b>` })
        : t('Todos los ejemplares traen esta habilidad.')) +
      p(t('El jinete la aprende al llegar a vínculo {a} con este animal y pasa a la versión «+» con vínculo {b}. Cuenta el vínculo del jinete que la monta, y solo funciona montado.', { a: B.base, b: B.plus })) +
      (pool.length > 1 ? p(`${t('Para elegirla: guarda antes de poner el Cebo; si sale la que no quieres, recarga y cambia algo antes de cebar (otra casilla, esperar un turno, hacer una Búsqueda). Repetir exactamente lo mismo da el mismo animal.')} ${COM()}`) : ''), 'fi-vinculo') : '';
    const foods = m.matching_foods || [];
    const foodCard = f ? card(t('Comida'),
      kvRows([[t('Le gusta'), `${esc(dx(f.type))} <small>(${list(Object.entries(m.food_scores || {}).map(([ty, v]) => `${esc(dx(ty))} ${v}`))})</small>`], [t('Sabor'), esc(dx(f.taste))],
        [t('Favorito'), t('uno concreto por animal, sorteado al crearse; se ve en el Establo')]]) +
      p(t('Cada animal tiene su propio «Favorito»: se sortea al crearse el animal, con la misma semilla que su habilidad de vínculo, y se ve en el Establo; no hay uno fijo por especie. Los ingredientes de {type} con sabor {taste} de esta lista dan el bono de tipo y sabor; si el que le das es además su Favorito, suma {n} puntos y al capturar asegura el 100 %.', { type: esc(dx(f.type)), taste: esc(dx(f.taste)), n: FE.great_fav ?? 5 })) +
      tw(['Ingrediente', 'Calidad', 'Vínculo por comida', 'Si es su Favorito'], foods.map(x => [obj(x.iid, x.es), stars(x.grade), feedPts(x.grade, 1, 1, 0), feedPts(x.grade, 1, 1, 1)])) +
      p(t('Una comida por animal y día. Vínculo 5 pide {n} puntos. Fórmula completa en {establo}.', { n: R.bond_thresholds?.[4] ?? 140, establo: `<a href="#/monturas?ir=establo">${t('Establo')}</a>` })), 'fi-comida') : '';
    const lv = [1, 2, 3, 4, 5], labels = lv.map(n => `Vínculo ${n}`);  // statTable() translates the labels
    const bonus = lv.some(n => Object.keys(m.flat_by_bond?.[n] || {}).length || Object.keys(m.growth_by_bond?.[n] || {}).length) ? card(t('Bonos por vínculo'),
      `<h4>${t('Atributos')}</h4>${statTable(lv.map(n => m.flat_by_bond?.[n] || {}), labels)}<h4>${t('Crecimientos (%)')}</h4>${statTable(lv.map(n => m.growth_by_bond?.[n] || {}), labels)}` +
      p(t('Cada nivel sustituye al anterior (no se suman). Solo cuentan montado; el {cl} los dobla. Puntos de vínculo por nivel: {pts}.', { cl: CLASSES.JID_戦車兵 ? L('clase', 'JID_戦車兵') : t('Cuadriguero'), pts: (R.bond_thresholds || []).join(' / ') })), 'fi-bonos') : '';
    const lines = availLines(k, m), spots = m.lure_spots_detail || [];
    const where = card(t('Dónde y cómo se consigue'), ul(lines.map(x => `<li>${x}</li>`)) +
      (spots.length ? `<h4>${t('Lugares de cebo')}</h4>` + caiFold(tw(['Lugar', 'Región', 'Probabilidad', 'Parte 1 (Cai)', 'Parte 3'], spots.map(s => [SPOTS[s.spot] ? L('lugar', s.spot) : nlx(s.es), esc(gt(s.region_es || '')), `${pct(s.pct)}${s.rare ? ` (${t('rara')})` : ''}`, t(s.cai_p1 ? 'sí' : 'no'), t(s.part3 ? 'sí' : 'no')])) +
        p(t('El porcentaje es la probabilidad de que salga esta especie en ese lugar. Con un cebo de ★★★ del tipo que le gusta sale siempre un animal y la especie rara es mucho más probable. Reglas del cebo en {rec}.', { rec: `<a href="#/recoleccion?ir=cebo">${t('Recolección')}</a>` }))) : ''), 'fi-donde');
    const rel = m.release_table || {};
    const release = Object.keys(rel).length ? card(t('Al liberarla'),
      p(t('El animal se va para siempre y deja un accesorio, que se sortea con el vínculo que tenga. Cada accesorio da los bonos de atributo de la montura en ese nivel.')) +
      tw(['Vínculo', 'Objeto (probabilidad)'], Object.entries(rel).map(([n, rows]) => [n, rows.map(x => `${obj(x.iid, x.es)} ${pct(x.pct)} <small>${statTxt(x.stats)}</small>`).join('<br>')])) +
      p(t('Con varios jinetes, no se sabe qué vínculo cuenta (seguramente el más alto, sin confirmar).')), 'fi-liberar') : '';
    return head + skill + foodCard + bonus + where + release;
  }

  /** the Establo rules (mount_rules): opening, bond, feeding, capture, lure, release */
  function establo() {
    const G = FE.grade || {}, rows = [['Su Favorito (ya es del tipo y sabor)', 1, 1, 1], ['Tipo y sabor que le gustan', 1, 1, 0], ['Solo el tipo', 1, 0, 0], ['Solo el sabor', 0, 1, 0], ['Ninguno', 0, 0, 0]];
    const th = R.bond_thresholds || [0, 20, 50, 90, 140];
    const out = R.lure?.outcomes || [];
    const h4 = x => `<h4>${t(x)}</h4>`;
    return card(t('Establo'), p(t('{h} Parte 1: solo en la ruta de Cai, desde el cap. 5 (las otras rutas no tienen Cebo ni Establo; {io} y {alex} llevan su montura propia en cualquier ruta). Parte 2: sigue abierto con Cai aliado, sin Cebo {com}. Al acabar la Parte 2 los animales pasan al arcón de la memoria. Parte 3: todas las rutas, desde el cap. 2, con Cai en el ejército. Caben {n} animales.',
      { h: `<b>${t('Cuándo se abre.')}</b>`, io: L('personaje', 'PID_イオ'), alex: L('personaje', 'PID_アレキサンドラ'), com: COM(), n: R.stable_cap ?? 200 })) +
      h4('Vínculo') + tw(['Nivel', ...th.map((_, i) => String(i + 1))], [[t('Puntos'), ...th.map(String)]]) +
      p(t('Es de cada pareja jinete–animal: cada animal recuerda hasta 5 jinetes, y si pasa a otra unidad, esa unidad sigue desde su propio vínculo. Se puede subir antes de tener la clase. La habilidad de vínculo llega con vínculo {a} y su versión «+» con {b}. También sube combatiendo montado; la cantidad exacta no se conoce {com}.',
        { a: R.bond_skill_levels?.base ?? 3, b: R.bond_skill_levels?.plus ?? 5, com: COM() })) +
      h4('Alimentar') + p(t('Se elige qué aliado da de comer; el vínculo sube para ese aliado. Puntos = {base} + calidad (★ {g1}, ★★ {g2}, ★★★ {g3}) + tipo que le gusta {ty} + sabor {ta} + su Favorito {fav}. Una comida por animal y día {com}.',
        { base: FE.base ?? 1, g1: G[1] ?? 0, g2: G[2] ?? 2, g3: G[3] ?? 5, ty: FE.fav_type ?? 6, ta: FE.fav_taste ?? 3, fav: FE.great_fav ?? 5, com: COM() })) +
      tw(['Ingrediente', '★', '★★', '★★★'], rows.map(([l, ty, s, fv]) => [t(l), ...[1, 2, 3].map(g => feedPts(g, ty, s, fv))])) +
      p(t('El tipo y el sabor de cada especie y sus ingredientes están en su ficha. El Favorito cambia de un animal a otro y se ve en el Establo.')) +
      h4('Capturar') + p(t('Tras el Cebo aparece el animal y hay {turns} turnos para Capturar; cada turno huye con un {flee} %. Probabilidad: su Favorito {fav} %; si no, calidad (★★★ {g3}, ★★ {g2}, ★ {g1}) + coincidir en tipo o sabor {one} (los dos, {both}) + llamarlo con la mano {beckon} (sin confirmar). Si huye deja boñiga, abono que sube la mutación de los cultivos:',
        { turns: CAP.max_turns ?? 2, flee: CAP.flee ?? 40, fav: CAP.great_fav ?? 100, g3: CAP.grade?.[3] ?? 40, g2: CAP.grade?.[2] ?? 20, g1: CAP.grade?.[1] ?? 0, one: CAP.match_one ?? 30, both: CAP.match_both ?? 60, beckon: CAP.beckon ?? 20 })) +
      tw(['Abono', 'Mutación'], Object.entries(R.manure_mutation || {}).map(([n, v]) => [nlx(n), pct(v)])) +
      h4('Cebo') + p(t('Cai pone un ingrediente en un campo de animales y el animal llega a los {n} turnos. Sin límite de cebos. Resultado de cada cebo (sin confirmar; coincide con lo que cuenta la comunidad):', { n: R.lure?.turns ?? 5 })) +
      tw(['Cebo', 'Calidad', 'Aparece', 'Nada', 'Combate', 'Bono a la rara'], out.map(o => [t(o.correct ? 'tipo que le gusta' : 'otro tipo'), stars(o.grade), pct(o.appear), pct(o.nothing), pct(o.battle), `+${o.rare_bonus}`])) +
      p(t('Con el tipo equivocado nunca aparece el animal. Lugares de cebo en {rec} y en cada ficha.', { rec: `<a href="#/recoleccion?ir=cebo">${t('Recolección')}</a>` })) +
      h4('Liberar') + p(t('El animal se va y deja un accesorio (Amuleto con vínculo 1–4, Talismán con vínculo 5) con los bonos de la montura; la tabla de cada especie está en su ficha.')) +
      h4('Misiones con monturas') + ul((R.quests || []).map(q => `<li>${qLink(q)}: ${q.deliver_mount ? t('entregar {n}× {what}', { n: q.n, what: L('montura', q.deliver_mount) }) : t('entregar {n}× {what}', { n: q.n, what: list((q.deliver_items || []).map(i => obj(i))) })}${(q.gives_mounts || []).length ? '; ' + t('da {n}× {what}', { n: q.gives_mounts.length, what: L('montura', q.gives_mounts[0]) }) : ''}</li>`)) +
      p(t('El {cl} dobla los bonos de la montura (×{n}).', { cl: CLASSES.JID_戦車兵 ? L('clase', 'JID_戦車兵') : t('Cuadriguero'), n: R.charioteer_factor ?? 2 })), 'establo');
  }

  function listing(qs) {
    const ty = KINDS.includes(qs.t) ? qs.t : '';
    const rows = Object.entries(MOUNTS).filter(([, m]) => !ty || m.kind === ty);
    const q = { ...qs, ir: '' };
    return `<h1>${t('Monturas')}</h1>${guiaLink('monturas')}` + (caiHide(true) ? p(t('En la Parte 1 de esta ruta no se capturan monturas.')) : '') +
      p(t('Las monturas dan atributos, crecimientos y una habilidad al jinete, y todo crece con el vínculo entre los dos. Cada clase montada solo acepta su tipo. Se capturan con Cebo en la ruta de Cai (Parte 1) y en la Parte 3 de todas las rutas; las de clase no dan nada.')) +
      chips('monturas', q, 't', [['', 'Todos los tipos'], ...KINDS.map(x => [x, x])], ty, 'Tipo') + resultCount(rows.length, 'montura', 'monturas') +
      tw(['Montura', 'Tipo', 'Cómo se consigue', 'Habilidad de vínculo', 'Comida', 'Bonos con vínculo 5'], rows.map(([k, m]) => [L('montura', k), esc(gt(m.kind || '')), availShort(k, m),
        list((m.bond_skill_pool || []).map(x => skillLink(x.stage1))) || '—', m.food ? food(m.food) : '—', statTxt(m.flat_by_bond?.[5]) || '—'])) +
      establo() +
      card(t('Cebo'), p(t('Los lugares de cebo con su especie común y rara y las reglas de captura están en {rec}; cada ficha de montura lista los suyos.', { rec: `<a href="#/recoleccion?ir=cebo">${t('Recolección')}</a>` })), 'cebo');
  }

  register({ id: 'monturas', title: 'Monturas', routes: ['monturas', 'montura'], render: (id, qs) => (id ? montura(id) : listing(qs || {})),
    search: () => [{ group: 'Secciones', label: 'Monturas', sub: 'Fichas, Establo y cebo', href: '#/monturas', aliases: ['montura', 'establo', 'vinculo', 'vínculo'] }] });  // i18n-ignore: Spanish search aliases
})();
