/* Fortune's Weave · wiki2 · places: listing (#/lugares?r=&k=) and ficha (#/lugar/<sid>): what is there, shops, gathering, quests, connections. */
'use strict';
(() => {
  const SHOP = SHOP_ES;
  /** data text: the game's English when the game has it, else the wiki's (i18n/en/data-map.json) */
  const dt = s => { const g = gt(s); return g !== s ? g : t(s); };
  const itemL = it => (it ? `${img(ico().item?.[it.id], 'ico')}${L('objeto', it.id, it.es)}` : '');
  const spotL = (id, label) => (SPOTS[id] ? L('lugar', id, label) : esc(gt(label || '')));
  const shopRows = s => [...Object.values(s.shops || {}).flat(), ...(s.vandahl || []).flatMap(v => W.map?.vandahl_fixed?.[v]?.rows || [])];
  /** shown for a route unless every shop row it has is locked to other routes */
  const spotIn = (s, r) => { if (!r) return true; const rows = shopRows(s); return !rows.length || rows.some(x => routeOk(x.conds, r)); };
  /** Cai's closed places are hidden only while the game is in Cai's Part 1 (nothing picked with ?r=cai counts as Part 1) */
  const caiClosed = (s, r) => r === 'cai' && (!ctxChosen() || CAPS[ctxGet().key]?.part === 1) && !spotAccess(s.id, 'cai', partOneKey('cai')).ok;

  function listing(qs) {
    const r = listRoute(qs), kind = qs.k || '';
    const all = Object.entries(SPOTS).filter(([, s]) => s.es);
    const kinds = [...new Set(all.map(([, s]) => s.kind_es).filter(Boolean))].sort();
    const shown = all.filter(([, s]) => spotIn(s, r) && (!kind || s.kind_es === kind)), rows = shown.filter(([, s]) => !caiClosed(s, r)).sort((a, b) => nm(a[1]).localeCompare(nm(b[1]), LANG));
    const hid = shown.length - rows.length, reg = s => W.map?.regions?.[s.region];
    return `<h1>${t('Lugares')}</h1>${routeChips('lugares', qs, r)}${chips('lugares', qs, 'k', [['', 'Todos los tipos'], ...kinds.map(k => [k, k])], kind, 'Tipo')}` +
      `<p class="mut">${plural(rows.length, 'lugar', 'lugares')}${hid ? '. ' + t('Se ocultan {n} cerrados en la Parte 1 de Cai.', { n: hid }) : ''}</p>` +
      (rows.length ? `<div class="li-grid">${rows.map(([k, s]) => `<a class="li-card" href="${href('lugar', k)}">${img(s.thumb, 'li-pic li-thumb') || '<span class="li-pic"></span>'}` +
        `<span><b>${esc(nm(s))}</b><small>${esc(list([s.kind_es && t(s.kind_es), reg(s) && nm(reg(s))]))}</small></span></a>`).join('')}</div>`
        : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`);
  }

  /** the chosen route's facts, or (nothing picked) each route's: Cai's Part 1 reachability is always a fact about Cai */
  function here(s, route) {
    const a = !route || route === 'cai' ? s.cai_p1_access : null;  // reachability is computed for the Cai route only
    const only = r => list([...new Set(shopRows(s).filter(x => (x.conds || []).some(c => String(c).endsWith('篇')) && routeOk(x.conds, r) && x.item).map(x => itemL(x.item)))]);
    return kvRows([
      [t('Acceso en la Parte 1 de Cai'), a ? (a.reachable ? (a.via_checkpoints || []).length ? t('Cruzando {p}', { p: list(a.via_checkpoints.map(v => spotL(v.checkpoint, v.es) +
        (v.renown_rank ? ` <small>(${t('Prestigio {n}', { n: v.renown_rank })})</small>` : ''))) }) : t('Libre') : t('Sin acceso')) : ''],
      ...(route ? [route] : ROUTE_IDS).map(r => [t('Solo en la ruta de {r}', { r: ROUTE_NAME[r] }), only(r)]),
    ]);
  }

  /** Leda's «Actuar en locales» (WIKI_EXT.sistemas.leda.shows): the town's rewards and the secret place it reveals, or, on a secret place, the show that reveals it */
  const SHOWS = () => (window.WIKI_EXT || {}).sistemas?.leda?.shows || [];
  const showPay = x => [x.gold1 || x.items1?.length ? `${t('Parte {p}', { p: 1 })}: ${list([x.gold1 ? gold(x.gold1) : '', ...(x.items1 || []).map(itemL)])}` : '',
    x.gold3 || x.items3?.length ? `${t('Parte {p}', { p: 3 })}: ${list([x.gold3 ? gold(x.gold3) : '', ...(x.items3 || []).map(itemL)])}` : ''].filter(Boolean).join('; ');
  function show(id) {
    const town = SHOWS().find(x => x.spot === id), sec = SHOWS().find(x => x.secret?.spot === id);
    const q = x => (x.quest && QUEST[x.quest] ? ` <small>(${t('misión {q}', { q: L('mision', x.quest) })})</small>` : '');
    return [
      [t('Actuar en locales (ruta de Leda)'), town && `${showPay(town)}${town.secret ? '. ' + t('Revela el lugar secreto {p}', { p: spotL(town.secret.spot, town.secret.es) }) : ''}${q(town)} · <a href="#/senores?ir=leda">${t('Sistemas de Leda')}</a>`],
      [t('Lugar secreto (ruta de Leda)'), sec && `${t('Se revela al actuar en {p}', { p: spotL(sec.spot, sec.es) })}${q(sec)}${sec.secret.force ? '; ' + t('lo guardan {f}', { f: esc(dt(sec.secret.force.es)) }) : ''}. ${t('Recompensa de esa actuación: {r}', { r: showPay(sec) })}`],
    ];
  }

  function whatsHere(s, id) {
    const reg = W.map?.regions?.[s.region], f = s.facilities;
    const rev = (s.revealed_by || []).map(r => [r, r.spot ? spotL(r.spot, r.spot_es) : r.item ? itemL(r.item) : r.where ? spotL(r.where, r.where_es) : ''])
      .filter(([, x]) => x).map(([r, x]) => esc(dt(String(r.how || '').replace(/^\p{Lu}(?!\p{Lu})/u, c => c.toLowerCase()))) + ' ' + x);  // unnamed waypoints are left out
    const r = ctxRoute(), quests = ((W.chapters || {}).quests || []).filter(q => (q.where || []).includes(s.es) && questOnRoute(q, r))
      .map(q => L('mision', q.id) + (r || !q.routes || q.routes.length === 4 ? '' : ` <small>(${esc(questRoutesEs(q))})</small>`));
    return (s.desc_es ? `<p>${esc(tx(s, 'desc'))}</p>` : '') + `<p><a class="fi-btn" href="#/mapa?sel=${encodeURIComponent(id)}">${t('Ver en el mapa')}</a></p>` + kvRows([
      [t('Región'), reg && esc(nm(reg)) + (reg.enemy_level ? ` <small>(${t('enemigos de nivel {n}', { n: reg.enemy_level.join('–') })})</small>` : '')],
      [t('Posada'), f?.inn_price != null ? gold(f.inn_price) : ''], [t('Herrería'), f?.smith ? t('Sí') : ''],
      [t('Misión aquí'), s.subquest_here && L('mision', s.subquest_here.id, s.subquest_here.es)],
      [t('Misiones'), list(quests)],
      [t('Enemigos (Parte 1)'), list((s.roaming_enemies_p1 || []).map(e => esc(nm(e))))],
      [t('Enemigos (Parte 3)'), list((s.roaming_enemies_p3 || []).map(e => esc(nm(e))))],
      [t('Mercaderes'), list((s.roaming_merchants || []).map(e => esc(nm(e))))],
      [t('Se descubre al'), list(rev)],
      ...show(id),
    ]);
  }

  /** shop rows: those available in the active route first; the rest dimmed */
  const rowsList = (rows, route) => ul(rows.filter(x => x.item).map(x => [!route || routeOk(x.conds, route) ? 0 : 1, li(itemL(x.item),
    list([x.barter?.length ? t('a cambio de {x}', { x: list(x.barter.map(b => `${b.n}× ${itemL(b.item)}`)) }) : x.price != null ? gold(x.price) : '',
      x.stock && t('existencias {n}', { n: x.stock }), x.restock_per_chapter && t('+{n} por capítulo', { n: x.restock_per_chapter }), conds(x.conds) && esc(conds(x.conds))]),
    !route || routeOk(x.conds, route) ? '' : 'off')]).sort((a, b) => a[0] - b[0]).map(x => x[1]));
  const shops = (s, route) => Object.entries(s.shops || {}).map(([k, rows]) => `<h4>${esc(t(SHOP[k] || k))}</h4>${rowsList(rows, route)}`).join('') +
    (s.vandahl || []).map(v => `<h4>${t('Sociedad Mercantil Vandahl (trueque)')}</h4>${rowsList(W.map?.vandahl_fixed?.[v]?.rows || [], route)}`).join('');

  function gather(s, id) {
    const dg = W.map?.dungeons?.[id];
    const drops = (s.search?.drops || []).map(x => li(itemL(x.item), list([pct(x.pct), x.rare && t('raro'), x.first_time_only && t('solo la primera vez')])));
    const loot = (dg?.loot_tables || []).flat().filter(x => x.item).map(x => li(itemL(x.item), `${x.n}× · ${pct(x.pct)}`));
    const fm = s.farm, lu = s.lure;
    const chests = ((window.WIKI_EXT || {}).detalle?.chests?.[id] || []).filter(r => ITEMS[r[0]]).map(r => li(itemL(ITEMS[r[0]] && { id: r[0], es: ITEMS[r[0]].es }),
      r[1] && ITEMS[r[1]] ? `${t('Parte {p}', { p: 3 })}: ${itemL({ id: r[1], es: ITEMS[r[1]].es })}` : ''));
    return (drops.length ? `<h4>${t('Búsqueda')}</h4>${ul(drops)}` : '') +
      (fm ? `<h4>${t('Cultivo')}</h4>${kvRows([[t('Planta rara'), itemL(fm.rare_plant)], [t('Probabilidad de mutación'), fm.plot_mutation_pct != null ? pct(fm.plot_mutation_pct) : '']])}` : '') +
      (lu ? `<h4>${t('Cebo')}</h4>${kvRows([[t('Animales'), list((lu.animals || []).map(a => L('montura', a.id, a.es) + ` <small>${pct(a.pct)}</small>`))],
        [t('Si falla, deja'), itemL(lu.fertiliser)], [t('Misión'), lu.subquest && L('mision', lu.subquest.id, lu.subquest.es)]])}` : '') +
      (chests.length ? `<h4>${t('Cofres')}</h4><p class="mut">${t('Contenido en la Parte 1 y, debajo, en la Parte 3.')}</p>${ul(chests)}` : '') +
      (loot.length ? `<h4>${t('Mazmorra')}${dg.base_level_part?.['1'] ? ' · ' + t('nivel {n} en la Parte 1', { n: dg.base_level_part['1'] }) : ''}</h4>${ul(loot)}` : '');
  }

  const rebuild = s => (s.rebuild ? kvRows([[t('Entregar'), list((s.rebuild.deliver || []).map(d => `${d.n}× ${itemL(d.item)}`))],
    [t('Oro'), s.rebuild.gold ? gold(s.rebuild.gold) : ''], [t('Turnos'), s.rebuild.turns ? String(s.rebuild.turns) : '']]) : '');

  function lugar(id) {
    const s = SPOTS[id];
    if (!s) return notFound();
    const route = ctxRoute();
    const conn = (s.connections || []).filter(x => SPOTS[x.spot]).map(x => li(L('lugar', x.spot, x.es), x.sea ? t('por mar') : ''));
    const head = fichaHead(img(s.thumb, 'fi-thumb'), `<a href="#/lugares">${t('Lugares')}</a>`, nm(s), s.kind_es && t(s.kind_es));
    return ficha(head, [
      ['aqui', route ? 'En esta ruta' : 'Por ruta', here(s, route)],
      ['resumen', 'Qué hay', whatsHere(s, id)],
      ['tiendas', 'Tiendas', shops(s, route)],
      ['recoleccion', 'Recolección', gather(s, id)],
      ['conexiones', 'Conexiones', ul(conn)],
      ['reconstruccion', 'Reconstrucción (Parte 3)', rebuild(s)],
    ]);
  }

  register({ id: 'lugares', title: 'Lugares', routes: ['lugares', 'lugar'], render: (id, qs) => (id ? lugar(id) : listing(qs || {})) });
})();
