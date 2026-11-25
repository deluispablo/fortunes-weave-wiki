/* Fortune's Weave · wiki2 · world sections: shops and barter (#/tiendas), gathering (#/recoleccion), dungeons (#/mazmorras),
   quests and side stories (#/misiones, #/mision/<id>, #/desvio/<id>). */
'use strict';
(() => {
  const SHOP = SHOP_ES;
  const M = W.map || {}, CH = W.chapters || {};
  /** data text: the game's English when the game has it, else the wiki's (i18n/en/data-*.json) */
  const dt = s => { const g = gt(s); return g !== s ? g : t(s); };
  const itemL = it => (it ? `${img(ico().item?.[it.id], 'ico')}${L('objeto', it.id, it.es)}` : '');
  const spotL = id => (SPOTS[id] ? L('lugar', id) : '');
  const byName = (a, b) => nm(a[1]).localeCompare(nm(b[1]), LANG);
  const md = s => fechaMD(s);  // called at render time (pages/perdibles.js loads later); "9/17" (month/day) → "17 sep" / "Sep 17" (pages/perdibles.js)

  /* ---------------- shops and barter ---------------- */
  /** rows of one shop for route r ('' = every route): rows locked to other routes are dropped */
  function shopTable(rows, r) {
    const rs = (rows || []).filter(x => x.item && (!r || routeOk(x.conds, r)));
    if (!rs.length) return '';
    return `<div class="tw"><table><tr><th>${t('Objeto')}</th><th>${t('Precio')}</th><th>${t('Existencias')}</th><th>${t('Condiciones')}</th></tr>${rs.map(x => `<tr><td>${itemL(x.item)}</td>` +
      `<td>${x.barter?.length ? list(x.barter.map(b => `${b.n}× ${itemL(b.item)}`)) : x.price != null ? gold(x.price) : ''}</td>` +
      `<td>${x.stock == null ? '∞' : x.stock}${x.restock_per_chapter ? ' ' + t('(+{n} por capítulo)', { n: x.restock_per_chapter }) : ''}</td><td>${esc(conds(x.conds))}</td></tr>`).join('')}</table></div>`;
  }
  function tiendas(qs) {
    const r = listRoute(qs), tp = qs.t || '';
    const show = k => !tp || tp === k;
    const towns = Object.entries(SPOTS).filter(([, s]) => s.es && s.shops && Object.keys(s.shops).length).sort(byName).map(([k, s]) => {
      const body = Object.entries(s.shops).map(([n, rows]) => { const tb = shopTable(rows, r); return tb && `<h4>${esc(t(SHOP[n] || n))}</h4>${tb}`; }).join('');
      return body && `<details class="card"><summary><b>${L('lugar', k)}</b> <small class="mut">${esc(Object.keys(s.shops).map(n => t(SHOP[n] || n)).join(', '))}</small></summary>${body}</details>`;
    }).filter(Boolean);
    const vandahl = Object.values(M.vandahl_fixed || {}).map(v => { const tb = shopTable(v.rows, r); return tb && `<details class="card"><summary><b>${spotL(v.spot) || t('Sociedad Mercantil Vandahl')}</b></summary>${tb}</details>`; }).filter(Boolean);
    const roaming = Object.values(M.roaming_merchants || {}).map(m => {
      const tb = shopTable(m.rows, r), at = list((m.spawn_spots || []).map(spotL));
      return tb && `<details class="card"><summary><b>${esc(nm(m))}</b>${at ? ` <small class="mut">${t('aparece en {p}', { p: at })}</small>` : ''}</summary>${tb}</details>`;
    }).filter(Boolean);
    return `<h1>${t('Tiendas y trueques')}</h1>${guiaLink('tiendas', 'vandahl')}${routeChips('tiendas', qs, r)}` +
      chips('tiendas', qs, 't', [['', t('Todo')], ['tiendas', `${t('Tiendas')} (${towns.length})`], ['vandahl', `${t('Trueque Vandahl')} (${vandahl.length})`], ['ambulantes', `${t('Mercaderes itinerantes')} (${roaming.length})`]], tp, 'Tipo') +
      (show('tiendas') ? `<h2>${t('Tiendas por lugar')}</h2>${towns.join('') || `<p class="mut">${t('Sin tiendas en esta ruta.')}</p>`}` : '') +
      (show('vandahl') ? `<h2>${t('Sociedad Mercantil Vandahl (trueque)')}</h2><p class="mut">${t('Se paga con objetos en lugar de oro.')}</p>${vandahl.join('')}` : '') +
      (show('ambulantes') ? `<h2>${t('Mercaderes itinerantes')}</h2>${roaming.join('')}` : '');
  }

  /* ---------------- gathering ---------------- */
  const isFish = it => /pescado/i.test(ITEMS[it?.id]?.section || '');
  const drops = s => ul((s.search?.drops || []).filter(x => x.item).map(x => li(itemL(x.item), list([pct(x.pct), x.rare && t('raro'), x.first_time_only && t('solo la primera vez')]))));
  const nth = n => (!isEn() ? `${n}.ª` : n % 10 === 1 && n % 100 !== 11 ? `${n}st` : n % 10 === 2 && n % 100 !== 12 ? `${n}nd` : n % 10 === 3 && n % 100 !== 13 ? `${n}rd` : `${n}th`);
  function recoleccion(qs) {
    const tp = qs.t || '';
    const all = Object.entries(SPOTS).filter(([, s]) => s.es).sort(byName);
    const search = all.filter(([, s]) => s.search?.drops?.some(x => x.item));
    const fish = search.filter(([, s]) => s.search.drops.some(x => isFish(x.item))), dry = search.filter(([, s]) => !s.search.drops.some(x => isFish(x.item)));
    const farms = all.filter(([, s]) => s.farm), lures = all.filter(([, s]) => s.lure);
    const spotCards = rows => `<div class="ggrid">${rows.map(([k, s]) => `<section class="card"><h3>${L('lugar', k)}</h3>${drops(s)}</section>`).join('')}</div>`;
    const fr = M.farm_rules || {};
    const farmRules = kvRows([
      [t('Ruta'), t('en la Parte 1, solo en la ruta de Cai (desde el cap. 6); en la Parte 3, en todas las rutas con Cai en el ejército')],
      [t('Parcelas'), list(Object.entries(fr.plots_by_renown || {}).map(([rk, n]) => t('{n} con Prestigio {r}', { n, r: rk }))) + (fr.plots_part3 ? t('; {n} en la Parte 3', { n: fr.plots_part3 }) : '')],
      [t('Cosecha'), fr.harvest_turns ? t('{q} unidades cada {n} turnos', { q: fr.harvest_qty, n: fr.harvest_turns }) : ''],
      [t('Cosecha extra'), list(Object.entries(fr.extra_harvest_pct || {}).filter(([, v]) => v).map(([n, v]) => `${nth(+n)} ${pct(v)}`))],
      [t('Mutación con abono'), list(Object.values(fr.fertiliser_mutation_pct || {}).map(f => `${itemL(f.item)} ${pct(f.pct)}`))],
    ]);
    const farmT = `<div class="tw"><table><tr><th>${t('Lugar')}</th><th>${t('Planta rara')}</th><th>${t('Mutación')}</th></tr>${farms.map(([k, s]) =>
      `<tr><td>${L('lugar', k)}</td><td>${itemL(s.farm.rare_plant)}</td><td>${s.farm.plot_mutation_pct != null ? pct(s.farm.plot_mutation_pct) : ''}</td></tr>`).join('')}</table></div>`;
    const lureT = `<div class="tw"><table><tr><th>${t('Lugar')}</th><th>${t('Animales')}</th><th>${t('Si falla, deja')}</th><th>${t('Misión')}</th></tr>${lures.map(([k, s]) =>
      `<tr><td>${L('lugar', k)}</td><td>${list((s.lure.animals || []).map(a => L('montura', a.id, a.es) + ` <small>${pct(a.pct)}</small>`))}</td>` +
      `<td>${itemL(s.lure.fertiliser)}</td><td>${s.lure.subquest ? L('mision', s.lure.subquest.id, s.lure.subquest.es) : ''}</td></tr>`).join('')}</table></div>`;
    const kv = rows => docHtml({ kv: rows.map(([k, v]) => [t(k), t(v)]) });
    const searchRules = card(t('Reglas de la búsqueda'), kv([['Resultado', 'malo 25 % → 1 objeto; bueno 70 % → 3; perfecto 5 % → 6.'], ['Búsquedas de evento', 'siempre perfectas, con 10 objetos.']]));
    const lureRules = card(t('Reglas del cebo'), kv([['Ruta', 'en la Parte 1, solo en la ruta de Cai (Prestigio 1; el Cebo y el Establo se abren en el cap. 5); en la Parte 3, en todas las rutas desde el cap. 2 con Cai en el ejército.'],
      ['Espera', 'con cebo, el animal espera 5 turnos a ser capturado.'],
      ['Captura', 'manjar favorito 100 %, calidad alta 40 / media 20 / baja 0, alimento preferido de uno 30 / de ambos 60, llamar con la mano 20; huida 40 %; 2 turnos como máximo.']]) +
      `<p>${t('Fichas de cada animal y cómo subir el vínculo: <a href="#/monturas">Monturas</a>.')}</p>`);
    const secs = [['busqueda', t('Búsqueda'), dry.length, searchRules + spotCards(dry)], ['pesca', t('Pesca'), fish.length, spotCards(fish)],
      ['cultivo', t('Cultivo · ruta de Cai'), farms.length, caiFold(card(t('Reglas del cultivo'), farmRules) + farmT)], ['cebo', t('Cebo y monturas · ruta de Cai'), lures.length, caiFold(lureRules + lureT)]];
    return `<h1>${t('Recolección')}</h1>${guiaLink('busqueda', 'cultivo')}${chips('recoleccion', qs, 't', [['', t('Todo')], ...secs.map(([k, n, c]) => [k, `${n} (${c})`])], tp, 'Tipo')}` +
      secs.filter(([k]) => !tp || tp === k).map(([k, n, , h]) => `<h2 id="${k}">${esc(n)}</h2>${h}`).join('');
  }

  /* ---------------- dungeons ---------------- */
  function mazmorras() {
    const rows = Object.entries(M.dungeons || {}).filter(([k, d]) => SPOTS[k]?.es || d.es).sort((a, b) => (a[1].base_level_part?.['1'] || 0) - (b[1].base_level_part?.['1'] || 0) || byName(a, b));
    const loot = d => [...new Map((d.loot_tables || []).flat().filter(x => x.item).map(x => [x.item.id, x.item])).values()];
    return `<h1>${t('Mazmorras')}</h1>${guiaLink('mazmorras')}<p class="mut">${t('Ordenadas por nivel en la Parte 1.')}</p>` +
      `<div class="tw"><table><tr><th>${t('Mazmorra')}</th><th>${t('Nivel (Parte 1)')}</th><th>${t('Bono de nivel (Parte 2)')}</th><th>${t('Botín')}</th></tr>${rows.map(([k, d]) =>
        `<tr><td>${SPOTS[k] ? L('lugar', k) : esc(nm(d))}</td><td>${d.base_level_part?.['1'] || ''}</td><td>${d.level_bonus_2 ? '+' + d.level_bonus_2 : ''}</td><td>${list(loot(d).map(itemL))}</td></tr>`).join('')}</table></div>`;
  }

  /* ---------------- quests and side stories ---------------- */
  const QFIRST = QUEST_FIRST;
  const inRoute = (q, r) => !r || questAvail(q.id, r);  // quests for later runs only on a «nueva vuelta»; never in places closed on the route
  /** a name linked when it is an entity, else a data label («Item ×3», «en la propia zona») in the reader's language */
  const nlx = v => { const h = nl(v); return h === esc(gt(v)) ? esc(dt(v)) : h; };
  const BAT = () => Object.fromEntries(((window.WIKI_EXT || {}).guerra?.battalions || []).map(b => [b.id, b]));
  /** everything a quest gives: gold, Prestigio, items, the skill it teaches, the class it unlocks, battalions and mounts (all linked) */
  const renownTx = n => (n ? t('+{n} Prestigio', { n }) : '');
  const reward = q => list([q.gold ? gold(q.gold) : '', renownTx(q.renown),
    ...(q.item_ids?.length ? q.item_ids.map((id, i) => itemL({ id, es: q.items?.[i] })) : (q.items || []).map(nl)),
    q.skill ? t('habilidad {s}', { s: L('habilidad', q.skill.id, q.skill.es) }) : '',
    ...(q.class_unlock || []).map(c => t('clase {c}', { c: img(ico().job?.[c.id], 'ico') + L('clase', c.id, c.es) })),
    ...(q.battalions || []).map(b => t('batallón {b}', { b: BAT()[b.id] ? `<a href="${href('batallon', b.id)}">${esc(nm(BAT()[b.id]))}</a>` : esc(nm(b)) })),
    ...(q.mounts || []).map(m => t('montura {m}', { m: L('montura', m.id, m.es) }))]);
  const PARTS = [['', 'Todas las partes'], ['1', 'Prólogo y Parte 1'], ['3', 'Parte 3']];
  const inPart = (q, p) => !p || (p === '3' ? q.part === 3 : (q.part ?? 1) <= 1);
  /** a Desvío's acceptance window on route r: «17 sep – 25 sep», with the last day to fight when the game sets one */
  const paraWin = (p, r) => { const w = p.routes?.[r]; return w ? `${md(w.accept_from)} – ${md(w.accept_to)}${w.fight_to ? ` <small>${t('(combate hasta el {d})', { d: md(w.fight_to) })}</small>` : ''}` : ''; };

  function misiones(qs) {
    const r = listRoute(qs), k = qs.k || '', pt = PARTS.some(x => x[0] === qs.p) ? qs.p : '';
    const kinds = [...new Set((CH.quests || []).map(q => q.kind))];
    const ord = q => { const c = CAPS[r && QFIRST[q.id]?.[r]]; return c ? c.part * 100 + c.n : (q.part ?? 1) * 100 + (q.ch_from || 0); };
    const rows = (CH.quests || []).filter(q => inRoute(q, r) && (!k || q.kind === k) && inPart(q, pt)).sort((a, b) => ord(a) - ord(b) || nm(a).localeCompare(nm(b), LANG));
    const from = q => (r ? chapLink(QFIRST[q.id]?.[r]) || esc(questWhenEs(q)) : esc(questRoutesEs(q)) + (q.ch_from ? `<br><small>${esc(questWhenEs(q))}</small>` : ''));
    const quests = `<div class="tw"><table><tr><th>${t('Misión')}</th><th>${t('Tipo')}</th><th>${t('Lugar')}</th><th>${t(r ? 'Desde' : 'Rutas')}</th><th>${t('Recompensa')}</th></tr>${rows.map(q =>
      `<tr><td>${L('mision', q.id)}${(q.nth_route || 1) >= 2 ? ` <small class="mut">${t('(nueva vuelta)')}</small>` : ''}</td><td>${esc(dt(q.kind))}</td><td>${list((q.where || []).map(nl))}</td><td>${from(q)}</td><td>${reward(q)}</td></tr>`).join('')}</table></div>`;
    // Desvíos: the window of the chosen route, or every route's window
    const ps = (CH.paralogues || []).filter(p => !r || p.routes?.[r]);
    const paras = pt === '3' ? '' : ps.map(p => `<tr><td>${L('desvio', p.id)}</td><td>${nl(p.lord)}</td><td>${nl(p.spot)}</td>` +
      `<td>${r ? paraWin(p, r) : paraRoutes(p).map(x => `${esc(ROUTE_NAME[x])}: ${paraWin(p, x)}`).join('<br>')}</td>` +
      `<td>${list([p.gold ? gold(p.gold) : '', renownTx(p.renown), ...(p.items || []).map(nl)])}</td></tr>`).join('');
    const lessons = (!r || r === 'cai') && pt !== '3' && (CH.lessons || []).length ? `<h2>${t('Lecciones (ruta de Cai)')}</h2><div class="tw"><table><tr><th>${t('Lección')}</th><th>${t('Profesor')}</th><th>${t('Prestigio')}</th><th>${t('Recompensa')}</th></tr>${CH.lessons.map(l =>
      `<tr><td>${esc(dt(l.es))}${l.subquest && QUEST[l.subquest] ? ' · ' + L('mision', l.subquest) : ''}</td><td>${nl(l.teacher)}</td><td>${l.renown}</td><td>${nl(l.reward)}</td></tr>`).join('')}</table></div>` : '';
    return `<h1>${t('Misiones y desvíos')}</h1>${guiaLink('misiones')}${routeChips('misiones', qs, r)}${chips('misiones', qs, 'p', PARTS, pt, 'Parte')}${chips('misiones', qs, 'k', [['', t('Todos los tipos')], ...kinds.map(x => [x, dt(x)])], k, 'Tipo')}` +
      `<h2>${t('Misiones')}</h2>${resultCount(rows.length, 'misión', 'misiones', r ? ' ' + t('en la ruta de {r}', { r: ROUTE_NAME[r] }) : '')}${rows.length ? quests : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`}` +
      (paras ? `<h2>${t('Desvíos')}</h2><p class="mut">${r ? t('Plazo para aceptarlos en la ruta de {r}.', { r: esc(ROUTE_NAME[r]) }) : t('Plazo para aceptarlos en cada ruta; un Desvío no sale en las rutas que no aparecen.')}</p>` +
        `<div class="tw"><table><tr><th>${t('Desvío')}</th><th>${t('Señor')}</th><th>${t('Lugar')}</th><th>${t('Aceptar')}</th><th>${t('Recompensa')}</th></tr>${paras}</table></div>` : '') + lessons;
  }

  function mision(id) {
    const q = QUEST[id];
    if (!q) return notFound();
    const route = ctxRoute(), f = QFIRST[id] || {};
    const deliver = (q.deliver || []).map(v => (typeof v === 'string' ? nlx(v) : `${v.n ?? ''}× ${nl(v.es || v.item)}`));
    const head = fichaHead('', `<a href="#/misiones">${t('Misiones y desvíos')}</a>`, nm(q), dt(q.kind));
    const on = r => questOnRoute(q, r) ? (f[r] ? t('desde el {c}', { c: chapLink(f[r]) }) : esc(questWhenEs(q)) || t('sí')) : t('No aparece en esta ruta');
    const variants = Object.values(QUEST).filter(x => x.id !== id && x.es === q.es && x.giver === q.giver).map(x => `${L('mision', x.id)} <small>(${esc(questRoutesEs(x))})</small>`);
    return ficha(head, [
      ['aqui', 'En esta ruta', route ? kvRows([[t('Ruta de {r}', { r: ROUTE_NAME[route] }), on(route)], [t('Solo en una nueva vuelta'), (q.nth_route || 1) >= 2 ? t('Sí') : '']]) : ''],
      ['resumen', 'Misión', kvRows([[t('Objetivo'), esc(dt(q.goal))], [t('Encarga'), nl(q.giver)], [t('Se cobra en'), nlx(String(q.cash_in || q.giver || '').replace(/\s*\(Dng_[^)]*\)/, ''))], [t('Lugar'), list((q.where || []).map(nl))],
        [t('Rutas'), esc(questRoutesEs(q))], [t('Cuándo'), esc(questWhenEs(q))],
        [t('Nueva vuelta'), (q.nth_route || 1) >= 2 ? t('Solo al repetir la ruta (nueva vuelta)') : ''],
        [t('Entregar'), list(deliver)], [t('Prestigio necesario'), q.renown_req ? String(q.renown_req) : ''],
        [t('Requisitos'), (q.prereq || []).map(x => (QUEST[x] ? L('mision', x) : nl(x))).filter(Boolean).join(q.prereq_any ? ` ${t('o')} ` : ', ')],
        [t('Nivel recomendado'), q.recommended_lv != null ? String(q.recommended_lv) : ''], [t('Recompensa'), reward(q)],
        [t('Abre el paso'), list(Object.values(W.map?.checkpoints || {}).filter(g => g.cai_subquest?.id === id).map(g => L('lugar', g.spot, g.es) + ` <small>${t('(ruta de Cai)')}</small>`))],
        [t('Otras versiones'), list(variants)],
        [t('Diálogos'), list(guionLinks.quest(id).map(([h, tl]) => `<a href="${h}">${esc(tl)}</a>`))]])],
      ['rutas', 'Por ruta', kvRows((route ? routesFirst(route) : ROUTE_IDS).map(r => [ROUTE_NAME[r], on(r)]))],
    ]);
  }

  function desvio(id) {
    const p = PARA[id];
    if (!p) return notFound();
    const bat = ((window.WIKI_EXT || {}).batallas?.b || []).find(b => b.id === p.battle), route = ctxRoute();
    const head = fichaHead('', `<a href="#/misiones">${t('Misiones y desvíos')}</a>`, nm(p), t('Desvío'));
    const rs = paraRoutes(p);
    const here = route ? (p.routes?.[route] ? paraWin(p, route) : t('No sale en la ruta de {r}', { r: esc(ROUTE_NAME[route]) })) : '';
    const byRoute = `<div class="tw"><table><tr><th>${t('Ruta')}</th><th>${t('Aceptar')}</th><th>${t('Combate hasta')}</th></tr>${ROUTE_IDS.map(r => { const w = p.routes?.[r];
      return `<tr><td>${esc(ROUTE_NAME[r])}</td><td>${w ? `${md(w.accept_from)} – ${md(w.accept_to)}` : `<span class="mut">${t('No sale')}</span>`}</td><td>${w?.fight_to ? md(w.fight_to) : ''}</td></tr>`; }).join('')}</table></div>`;
    return ficha(head, [['resumen', 'Desvío', kvRows([[t('Señor'), nl(p.lord)], [t('Hablar con'), nl(p.talk_to)], [t('Lugar'), nl(p.spot)],
      [t('Rutas'), esc(list(rs.map(r => ROUTE_NAME[r])))],
      [t('Aceptar (ruta de {r})', { r: ROUTE_NAME[route] }), here], [t('Hora del evento'), p.event_time && esc(p.event_time)],
      [t('Objetivo'), esc(dt(p.goal))], [t('Batalla'), bat ? `<a href="${href('batalla', bat.id)}">${esc(dt(bat.t))}</a>` : ''],
      [t('Guion'), list(guionLinks.para(id).map(([h, tl]) => `<a href="${h}">${esc(tl)}</a>`))],
      [t('Recompensa'), list([p.gold ? gold(p.gold) : '', renownTx(p.renown), ...(p.items || []).map(nl)])]]) +
      `<h4>${t('Plazo en cada ruta')}</h4>${byRoute}`]]);
  }

  register({ id: 'tiendas', title: 'Tiendas y trueques', render: (id, qs) => tiendas(qs || {}) });
  register({ id: 'recoleccion', title: 'Recolección', render: (id, qs) => recoleccion(qs || {}) });
  register({ id: 'mazmorras', title: 'Mazmorras', render: () => mazmorras() });
  register({ id: 'misiones', title: 'Misiones y desvíos', routes: ['misiones', 'mision', 'desvio'],
    render: (id, qs) => (!id ? misiones(qs || {}) : QUEST[id] ? mision(id) : desvio(id)) });
})();
