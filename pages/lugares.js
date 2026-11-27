/* Fortune's Weave · wiki2 · places: listing (#/lugares?r=&k=) and ficha (#/lugar/<sid>): what is there, shops, gathering, quests, connections. */
'use strict';
/** quests behind a Search item that drops only while a quest is accepted (flag «サブクエ_<name>_受注中»): the quest itself, its route
    variants, or (generic flag) the quests that ask for the item; the active route's first. Also read by pages/mapa.js. */
function searchQuests(s, d) {
  const n = (s.search?.first_time_conds || []).map(f => /^サブクエ_(.+)_受注中$/.exec(f)?.[1]).find(Boolean);
  if (!d.first_time_only || !n) return null;
  const id = 'SQID_' + n, all = Object.values(QUEST);
  let qs = QUEST[id] ? [QUEST[id]] : all.filter(q => q.id.startsWith(id + '_'));
  if (!qs.length) qs = all.filter(q => (q.deliver || []).some(x => x.startsWith(d.item.es + ' ×')));
  const r = ctxRoute(), on = qs.filter(q => questOnRoute(q, r));
  return on.length ? on : qs;
}
(() => {
  const SHOP = SHOP_ES;
  /** data text: the game's English when the game has it, else the wiki's (i18n/en/data-map.json) */
  const dt = s => { const g = gt(s); return g !== s ? g : t(s); };
  const dx = s => (s && isEn() && EN_DICT().ui?.[s] != null ? t(s) : gt(s));
  /** one lured animal: chance (rare slot marked), the food type · taste it likes and the best baits that match both */
  const lureAnimal = a => {
    const m = MOUNTS[a.id], f = m?.food, best = (m?.matching_foods || []).filter(x => x.grade === 3 && ITEMS[x.iid]).slice(0, 3);
    return `<li>${L('montura', a.id, a.es)} <small>${pct(a.pct)}${a.rare ? ' · ' + t('raro') : ''}</small>` +
      (f ? `<br><small>${t('Cebo favorito')}: ${esc(dx(f.type))} · ${esc(dx(f.taste))}${best.length ? ' (' + best.map(x => itemL({ id: x.iid, es: x.es })).join(', ') + ')' : ''}</small>` : '') + '</li>';
  };
  const itemL = it => (it ? `${itemIco(it.id, 'ico')}${L('objeto', it.id, it.es)}` : '');
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
      `<p class="sr-only" data-count>${plural(rows.length, 'lugar', 'lugares')}</p>${hid ? `<p class="mut">${t('Se ocultan {n} cerrados en la Parte 1 de Cai.', { n: hid })}</p>` : ''}` +
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

  /** named places only: map waypoints (分岐点, 中スポット) have no page */
  const named = ids => list((ids || []).filter(x => SPOTS[x]?.es).map(x => spotL(x, SPOTS[x].es)));
  const temple = id => { const x = W.map?.temples?.[id];
    return x ? [[t('Dios'), x.god_es && esc(gt(x.god_es))], [t('Portal de los Dioses'), x.portal_variable &&
      t('Se llega desde Dagsion por el portal cuando está abierto: la historia abre uno en la Parte 1 y los demás se abren en la Parte 3 con la petición de cada dios.')]] : []; };
  /** a checkpoint (関所): Prestigio to pass, closed routes, the quest Cai needs, a story event that opens it, the places behind it */
  const gate = id => { const c = W.map?.checkpoints?.[id];
    return c ? [[t('Prestigio para cruzar'), !c.closed_all && c.renown_rank ? String(c.renown_rank) : ''],
      [t('Paso'), c.closed_all ? t('Cerrado en todas las rutas') : c.closed_cai ? t('Cerrado en la ruta de Cai') : ''],
      [t('Misión que pide a Cai'), c.cai_subquest && L('mision', c.cai_subquest.id, c.cai_subquest.es)],
      [t('Se abre también'), c.force_open_flag && t(/カイ篇/.test(c.force_open_flag) ? 'con un avance de la historia (ruta de Cai)' : 'con un avance de la historia')],
      [t('Da paso a'), named(c.opens)]] : []; };
  /** stagecoach lines leaving this posta: price, stops, what Cai needs (flags «サブクエ_<quest>_クリア済» plus the line's quest), what was seen on screen */
  const doneQuest = f => { const id = 'SQID_' + (/^サブクエ_(.+)_クリア済$/.exec(f)?.[1] || ''); return QUEST[id] ? L('mision', id) : ''; };
  function carriage(id) {
    const ls = (W.map?.carriage_lines || []).filter(l => l.from === id);
    const cai = l => (l.closed_cai ? t('cerrada en la ruta de Cai') : t('ruta de Cai: tras completar {q}', { q: list([...(l.cai_flags || []).map(doneQuest), l.cai_subquest && L('mision', l.cai_subquest.id)].filter(Boolean)) }) +
      (l.seen_on_screen == null ? '' : ' ' + t(l.seen_on_screen ? '(en pantalla se abrió con la misión solo aceptada)' : '(en pantalla seguía cerrada con la misión solo aceptada)')));
    return ls.length ? `<h4>${t('Carruaje')}</h4><p class="mut">${t('0 turnos, solo la tarifa. Hay que haber pasado antes por esta posta.')}</p>` +
      ul(ls.map(l => li(spotL(l.to, l.to_es), list([gold(l.price), named(l.via) && t('pasa por {p}', { p: named(l.via) }), cai(l)])))) : '';
  }
  /** Theodora's battalion recruiting in this town (WIKI_EXT.guerra.towns): what each stage adds, with the Prestigio stages 2–4 need */
  function battalions(id) {
    const G = (window.WIKI_EXT || {}).guerra || {}, tn = (G.towns || []).find(x => x.spot === id);
    if (!tn) return '';
    const B = Object.fromEntries((G.battalions || []).map(b => [b.id, b])), rr = G.recruit_renown || [];
    return `<p class="mut">${t('Ruta de Theodora: batallones que se pueden reclutar aquí. Cada etapa añade nuevos.')}</p>` +
      kvRows(tn.stages.map(st => [t('Etapa {n}', { n: st.stage }) + (st.stage > 1 && st.stage <= 4 && rr[st.stage - 2] ? ` (${t('Prestigio {n}', { n: rr[st.stage - 2] })})` : ''),
        list(st.new.filter(b => B[b]).map(b => `<a href="${href('batallon', b)}">${esc(nm(B[b]))}</a>`))])) +
      `<p><a href="#/batallones?t=pueblos&amp;w=${encodeURIComponent(id)}">${t('Probabilidad de cada batallón en este pueblo')}</a></p>`;
  }

  function whatsHere(s, id) {
    const reg = W.map?.regions?.[s.region], f = s.facilities;
    const rev = (s.revealed_by || []).map(r => [r, r.spot ? spotL(r.spot, r.spot_es) : r.item ? itemL(r.item) : r.where ? spotL(r.where, r.where_es) : ''])
      .filter(([, x]) => x).map(([r, x]) => esc(dt(String(r.how || '').replace(/^\p{Lu}(?!\p{Lu})/u, c => c.toLowerCase()))) + ' ' + x);  // unnamed waypoints are left out
    const r = ctxRoute(), quests = ((W.chapters || {}).quests || []).filter(q => (q.where || []).includes(s.es) && questOnRoute(q, r))
      .map(q => L('mision', q.id) + (r || !q.routes || q.routes.length === 4 ? '' : ` <small>(${esc(questRoutesEs(q))})</small>`));
    return (s.desc_es ? `<p>${esc(tx(s, 'desc'))}</p>` : '') + `<p><a class="fi-btn" href="#/mapa?sel=${encodeURIComponent(id)}">${t('Ver en el mapa')}</a></p>` + kvRows([
      [t('Región'), reg && esc(nm(reg)) + (reg.enemy_level ? ` <small>(${t('enemigos de nivel {n}', { n: reg.enemy_level.join('–') })})</small>` : '')],
      [t('Producto típico'), list((reg?.specialty || []).filter(x => ITEMS[x.id]).map(itemL))],
      [t('Puerta del inframundo (Parte 3)'), /第(\d+)門/.exec(reg?.underworld_gate || '')?.[1] || ''],
      ...temple(id), ...gate(id),
      [t('Posada'), f?.inn_price != null ? gold(f.inn_price) : ''], [t('Herrería'), f?.smith ? t('Sí') : ''],
      [t('Misión aquí'), s.subquest_here && L('mision', s.subquest_here.id, s.subquest_here.es)],
      [t('Misiones'), list(quests)],
      [t('Enemigos (Parte 1)'), list((s.roaming_enemies_p1 || []).map(e => esc(nm(e))))],
      [t('Enemigos (Parte 3)'), list((s.roaming_enemies_p3 || []).map(e => esc(nm(e))))],
      [t('Mercaderes'), list((s.roaming_merchants || []).map(e => esc(nm(e))))],
      [t('Se descubre al'), list(rev)],
      [t('Al llegar se descubre'), named(s.reveals_on_arrival)], [t('Al buscar aquí se descubre'), named(s.reveals_on_search)],
      [t('Al completar la mazmorra se descubre'), named(s.reveals_on_dungeon_clear)],
      ...show(id),
    ]);
  }

  /** shop rows: those available in the active route first; the rest dimmed */
  const rowsList = (rows, route) => ul(rows.filter(x => x.item).map(x => [!route || routeOk(x.conds, route) ? 0 : 1, li(itemL(x.item),
    list([x.barter?.length ? t('a cambio de {x}', { x: list(x.barter.map(b => `${b.n}× ${itemL(b.item)}`)) }) : x.price != null ? gold(x.price) : '',
      x.stock && t('existencias {n}', { n: x.stock }), x.restock_per_chapter && t('+{n} por capítulo', { n: x.restock_per_chapter }), condsH(x.conds)]),
    !route || routeOk(x.conds, route) ? '' : 'off')]).sort((a, b) => a[0] - b[0]).map(x => x[1]));
  const shops = (s, route) => Object.entries(s.shops || {}).map(([k, rows]) => `<h4>${esc(t(SHOP[k] || k))}</h4>${rowsList(rows, route)}`).join('') +
    (s.vandahl || []).map(v => `<h4>${t('Sociedad Mercantil Vandahl (trueque)')}</h4>${rowsList(W.map?.vandahl_fixed?.[v]?.rows || [], route)}`).join('') +
    (s.roaming_merchants || []).map(m => `<h4>${t('Mercader ambulante: {m}', { m: esc(nm(m)) })}</h4>${rowsList(W.map?.roaming_merchants?.[m.id]?.rows || [], route)}`).join('');

  function gather(s, id) {
    const dg = W.map?.dungeons?.[id];
    const drops = (s.search?.drops || []).map(x => { const q = searchQuests(s, x);
      return li(itemL(x.item), list([q ? t('con la misión {q} aceptada', { q: q.map(y => L('mision', y.id)).join(` ${t('o')} `) }) : pct(x.pct), x.rare && t('raro'), x.first_time_only && t('solo la primera vez')])); });
    const loot = (dg?.loot_tables || []).flat().filter(x => x.item).map(x => li(itemL(x.item), `${x.n}× · ${pct(x.pct)}`));
    const fm = !caiHide(true) && s.farm, lu = !caiHide(true) && s.lure;  // Cai's farms and Lure: not in Part 1 of another route
    const chests = ((window.WIKI_EXT || {}).detalle?.chests?.[id] || []).filter(r => ITEMS[r[0]]).map(r => li(itemL(ITEMS[r[0]] && { id: r[0], es: ITEMS[r[0]].es }),
      r[1] && ITEMS[r[1]] ? `${t('Parte {p}', { p: 3 })}: ${itemL({ id: r[1], es: ITEMS[r[1]].es })}` : ''));
    return (drops.length ? `<h4>${t('Búsqueda')}</h4>${ul(drops)}` : '') +
      (fm ? `<h4>${t('Cultivo')}${caiTag()}</h4>${kvRows([[t('Planta rara'), itemL(fm.rare_plant)], [t('Probabilidad de mutación'), fm.plot_mutation_pct != null ? pct(fm.plot_mutation_pct) : ''], [t('Cuándo se abre'), fm.faerghast?.note && esc(dt(fm.faerghast.note))]])}` : '') +
      (lu ? `<h4>${t('Cebo')}${caiTag()}</h4>${kvRows([[t('Animales'), `<ul>${[...(lu.animals || []), ...(lu.rare ? [{ ...lu.rare, rare: 1 }] : [])].map(lureAnimal).join('')}</ul>`],
        [t('Si falla, deja'), itemL(lu.fertiliser)], [t('Misión'), lu.subquest && L('mision', lu.subquest.id, lu.subquest.es)]])}` : '') +
      (chests.length ? `<h4>${t('Cofres')}</h4><p class="mut">${t('Contenido en la Parte 1 y, debajo, en la Parte 3.')}</p>${ul(chests)}` : '') +
      (loot.length ? `<h4>${t('Mazmorra')}${dg.base_level_part?.['1'] ? ' · ' + t('nivel {n} en la Parte 1', { n: dg.base_level_part['1'] }) : ''}</h4>${ul(loot)}` : '');
  }

  const rebuild = s => (s.rebuild ? kvRows([[t('Entregar'), list((s.rebuild.deliver || []).map(d => `${d.n}× ${itemL(d.item)}`))],
    [t('Oro'), s.rebuild.gold ? gold(s.rebuild.gold) : ''], [t('Turnos'), s.rebuild.turns ? String(s.rebuild.turns) : ''], [t('Salvación'), s.rebuild.salvation ? '+' + s.rebuild.salvation : '']]) : '');

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
      ['conexiones', 'Conexiones', ul(conn) + carriage(id)],
      ['batallones', 'Batallones', battalions(id)],
      ['reconstruccion', 'Reconstrucción (Parte 3)', rebuild(s)],
    ]);
  }

  register({ id: 'lugares', title: 'Lugares', routes: ['lugares', 'lugar'], render: (id, qs) => (id ? lugar(id) : listing(qs || {})) });
})();
