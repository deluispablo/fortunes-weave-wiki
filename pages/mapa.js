/* Fortune's Weave · wiki2 · interactive world map (#/mapa?sel=&it=&q=), ported from wiki/app.js.
   State lives in the URL (replaceState, no scroll jump); the view box only in memory. Fixed layers (everything but minor points),
   the context chapter for quests and the map picture. Point types filter with a chip bar (count per type, kept in fe2.mapf); no checkboxes. */
'use strict';
(() => {
  const M = W.map || {};
  if (!M.spots) return;
  const MV = { vb: null, full: null, bounds: null, hi: false, focus: null, ptrs: new Map(), drag: null, moved: false };
  const LAYERS = [['pob', 'Ciudades y pueblos'], ['tie', 'Tiendas'], ['van', 'Trueque Vandahl'], ['bus', 'Búsqueda'], ['cul', 'Cultivo'],
    ['ceb', 'Cebo (monturas)'], ['maz', 'Mazmorras'], ['tem', 'Templos'], ['pos', 'Postas'], ['for', 'Fortalezas'], ['mis', 'Misiones'], ['otr', 'Otros puntos']];
  const LAY_DEF = LAYERS.filter(l => l[0] !== 'otr').map(l => l[0]);
  const layOn = () => { const v = store.get('mapf', null); return new Set(Array.isArray(v) ? v : LAY_DEF); };
  const SHOP = SHOP_ES;
  const ANIMAL_ICON = { Caballo: 'Horse', Pegaso: 'Pegasus', Ornius: 'Ornius', Magonius: 'Ornius', Meganius: 'Ornius', Bau: 'Elephant', Halicornio: 'Dragon' };

  /* ---------------- indexes ---------------- */
  let IDX = null;
  LANG_RESET.push(() => { IDX = null; });  // labels and names in the reader's language
  const spotOfShop = sid => { if (!sid) return null; if (M.vandahl_fixed?.[sid]) return M.vandahl_fixed[sid].spot; const p = sid.split('_')[0]; return SPOTS[p] ? p : SPOTS[sid] ? sid : null; };
  function index() {
    if (IDX) return IDX;
    const byName = {}, shown = {}; Object.entries(SPOTS).forEach(([k, s]) => { if (s.es) { byName[s.es] = k; shown[nm(s)] = k; } });  // byName: the data's Spanish labels; shown: names typed by the reader
    const dng = {}; Object.entries(M.dungeons || {}).forEach(([k, d]) => { if (d.dungeon_id) dng[d.dungeon_id] = k; });
    const src = {};  // item → [{spot, how, rows}]
    const HOW = { tienda: 'tienda', barter: 'trueque Vandahl', búsqueda: 'búsqueda', mazmorra: 'mazmorra', ambulante: 'mercader ambulante', 'cultivo (planta rara)': 'cultivo (raro)', 'atraer animal (estiércol)': 'estiércol (cebo)' };
    const add = (iid, spot, how, rows) => { if (spot && SPOTS[spot]) (src[iid] = src[iid] || []).push({ spot, how, rows }); };
    for (const [iid, it] of Object.entries(ITEMS)) for (const o of it.obtain || []) {
      const how = HOW[o.type]; if (!how) continue;
      const label = t(how) + ((o.price || o.pct != null || o.pay) ? ' · ' + list([o.price && gold(o.price), o.pct != null && pct(o.pct), o.pay && t('paga {x}', { x: o.pay.map(p => `${p.n}× ${ITEMS[p.id] ? nm(ITEMS[p.id]) : gt(p.es)}`).join(', ') })]) : '');
      if (o.type === 'ambulante') (M.roaming_merchants?.[o.shop_id]?.spawn_spots || []).forEach(sp => add(iid, sp, label, o.rows));
      else if (o.type === 'mazmorra') add(iid, dng[String(o.where).split(' ')[0]], label, o.rows);
      else add(iid, o.spot || spotOfShop(o.shop_id) || byName[String(o.where).replace(/ \(.*$/, '')], label, o.rows);
    }
    const regs = {};
    Object.values(SPOTS).forEach(s => { if (s.xy && s.region) { const r = regs[s.region] = regs[s.region] || [0, 0, 0]; r[0] += s.xy[0]; r[1] += s.xy[1]; r[2]++; } });
    const pts = Object.values(M.xy).filter(Boolean), xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys);
    MV.bounds = [Math.min(...xs) - bw * 0.05, Math.min(...ys) - bh * 0.05, bw * 1.1, bh * 1.1];
    return (IDX = { src, regs, byName: shown });
  }

  /* ---------------- chapter layer: quests open in the context chapter of the context route ---------------- */
  const capIdx = c => c.part * 100 + c.n;
  function questOpen(q, route, c) {
    if (!questAvail(q.id, route, c.key)) return false;  // other routes, later-run quests and quests in closed places
    const f = CAPS[QUEST_FIRST[q.id]?.[route]];
    // no chapter lists it: its window (part and chapters, the same on every route of that part)
    if (!f) { const a = q.part ?? 1, b = q.part_end ?? a; return c.part >= a && c.part <= b && (c.part !== a || !a || c.n >= (q.ch_from || 1)) && (c.part !== b || !q.ch_to || c.n <= q.ch_to); }
    return f.part === c.part && capIdx(f) <= capIdx(c) && (c.part !== 1 || q.ch_to >= c.n);
  }
  /** quests at a place: open in the context chapter, or (nothing picked) every quest there on any route */
  const spotQuests = (s, route, c) => ((W.chapters || {}).quests || []).filter(q => (q.where || []).includes(s.es) && (c ? questOpen(q, route, c) : questOnRoute(q, route)));

  function spotLayers(k, s, route, c) {
    const L = [];
    if (['ciudad', 'pueblo/puerto'].includes(s.kind_es)) L.push('pob');
    if (s.shops && Object.keys(s.shops).length) L.push('tie');
    if (s.vandahl?.length) L.push('van');
    if (s.search) L.push('bus');
    if (s.farm) L.push('cul');
    if (s.lure) L.push('ceb');
    if (M.dungeons?.[k]) L.push('maz');
    if (s.kind_es === 'templo') L.push('tem');
    if (s.kind_es === 'posta') L.push('pos');
    if (s.kind_es === 'puesto fronterizo') L.push('for');
    if (spotQuests(s, route, c).length) L.push('mis');
    if (!L.length) L.push('otr');
    return L;
  }
  const turnsFromDagsion = s => { const d = SPOTS['帝都ダグシオン']?.xy; return d && s.xy ? Math.hypot(s.xy[0] - d[0], s.xy[1] - d[1]) / 47 : null; };
  const turnsTxt = s => { const n = turnsFromDagsion(s); return n == null ? '' : n < 0.5 ? t('en Dagsion') : t(Math.round(n) === 1 ? '~{n} turno desde Dagsion' : '~{n} turnos desde Dagsion', { n: Math.round(n) }); };
  /** in-game marker for a spot: by kind; fields by what they give (bait animal, first search drop) */
  function spotIcon(k, s) {
    if (k === '帝都ダグシオン') return ['Spot_Hub_Dagsion', 36];
    const by = { ciudad: ['Spot_Hub', 32], 'pueblo/puerto': ['Spot_HubSimple', 27], templo: ['Spot_Temple', 27], posta: ['Spot_Station', 23], 'puesto fronterizo': ['Spot_Gate', 23], mazmorra: ['Spot_Dungeon', 23], 'tierra de cultivo': ['Spot_ConstructionMakeFarm', 23] }[s.kind_es];
    if (by) return by;
    const an = s.lure?.animals?.[0]?.es, a = an && ANIMAL_ICON[an.split(' ')[0]];
    if (a) return ['Spot_Sight' + a, 23];
    const d = s.search?.drops?.find(x => x.item)?.item, sec = (d && ITEMS[d.id]?.section) || '';
    return ['Spot_Sight' + (/plantas/.test(sec) ? 'Vegetable' : /pescado/.test(sec) ? 'Fish' : /forja/.test(sec) ? 'Ore' : sec ? 'Item' : 'Empty'), 23];
  }
  /** names matching typed text: an exact match wins, else every name containing it (2+ letters) */
  const match = (q, names) => { const n = norm(String(q || '').trim()); if (n.length < 2) return []; const ex = names.filter(x => norm(x) === n); return ex.length ? ex : names.filter(x => norm(x).includes(n)); };
  const accessTxt = a => (!a ? '' : !a.reachable ? t('Sin acceso en la Parte 1 de Cai') : (a.via_checkpoints || []).length ? t('Prestigio {n} para cruzar la fortaleza', { n: a.via_checkpoints.map(v => v.renown_rank ?? '?').join('/') }) : t('Libre'));

  /** point types of the map with how many places each has on `route` (chapter `c` for quests); empty types left out */
  window.mapKinds = (route, c) => {
    const n = {};
    Object.entries(SPOTS).filter(([, s]) => s.xy && s.es).forEach(([k, s]) => spotLayers(k, s, route, c).forEach(l => { n[l] = (n[l] || 0) + 1; }));
    return LAYERS.filter(([k]) => n[k]).map(([kind, label]) => ({ kind, label: t(label), n: n[kind] }));
  };
  /** a tap on the type bar: with every default type shown, a type is isolated; after that a tap adds or removes it; * all, - none */
  window.mapKindTap = k => {
    let on = layOn();
    if (k === '*') on = new Set(LAYERS.map(([x]) => x)); else if (k === '-') on.clear();
    else if (LAY_DEF.every(x => on.has(x))) on = new Set([k]); else on.has(k) ? on.delete(k) : on.add(k);
    store.set('mapf', [...on]); return [...on];
  };
  const kindsBar = (route, c, on) => `<div class="mkinds" role="group" aria-label="${t('Tipos de punto')}">` +
    `<button type="button" class="mkind mk-all" data-mvk="*" aria-pressed="false">${t('Todo')}</button><button type="button" class="mkind mk-all" data-mvk="-" aria-pressed="false">${t('Nada')}</button>` +
    mapKinds(route, c).map(x => `<button type="button" class="mkind" data-mvk="${x.kind}" aria-pressed="${on.has(x.kind)}">${esc(x.label)} <small>${x.n}</small></button>`).join('') + '</div>';

  /* ---------------- page ---------------- */
  function mapa(qs) {
    const IX = index(), route = ctxRoute(), c = ctxChosen() ? ctxChapter() : null;  // nothing picked: every route, no chapter
    const caiP1 = route === 'cai' && c.part <= 1;  // reachability is computed for Cai's Part 1 only
    const on = layOn(), sel = SPOTS[qs.sel] ? qs.sel : '';
    // item finder: one item, or a choice when several names match; sources locked to other routes are left out
    const itemNames = [...new Set(Object.keys(IX.src).map(id => nm(ITEMS[id])))];
    const itM = match(qs.it, itemNames);
    const itemId = itM.length === 1 ? Object.keys(IX.src).find(id => nm(ITEMS[id]) === itM[0]) : null;
    const hits = {};
    if (itemId) IX.src[itemId].filter(x => !route || !x.rows || x.rows.some(r => routeOk(r.conds, route))).forEach(x => (hits[x.spot] = hits[x.spot] || []).push(x.how));
    const spM = match(qs.q, Object.keys(IX.byName)), qSet = new Set(spM.length <= 40 ? spM : []);
    const roads = (M.roads || []).map(([d, sea]) => `<path d="${d}"${sea ? ' class="sea"' : ''}/>`).join('');
    const regLbl = Object.entries(IX.regs).map(([r, v]) => (M.regions[r] ? `<text class="reg" x="${v[0] / v[2]}" y="${v[1] / v[2]}">${esc(nm(M.regions[r]))}</text>` : '')).join('');
    const rank = s => ({ ciudad: 3, 'pueblo/puerto': 2, templo: 2 }[s.kind_es] || 0);  // towns drawn last so they win overlapping taps
    const spots = Object.entries(SPOTS).filter(([, s]) => s.xy && s.es).sort((a, b) => rank(a[1]) - rank(b[1]));
    let shown = 0;
    const dots = spots.map(([k, s]) => {
      const lay = spotLayers(k, s, route, c), hit = hits[k], qh = qSet.has(nm(s)), isSel = sel === k;
      if (!(hit || qh || isSel || lay.some(l => on.has(l)))) return '';
      shown++;
      const big = ['ciudad', 'pueblo/puerto', 'templo'].includes(s.kind_es), [ic, sz] = spotIcon(k, s);
      const no = caiP1 && !spotAccess(k, 'cai', partOneKey('cai')).ok;
      const cls = ['mk', big && 'big', no && 'no', hit && 'hit', qh && 'qh', isSel && 'sel', itemId && !hit && !isSel && 'dim'].filter(Boolean).join(' ');
      // place names by zoom (applyVB: l1 cities, l2 towns and temples, l3 the rest); found and selected places always say theirs
      const lc = hit || qh || isSel ? 'lbl on' : s.kind_es === 'ciudad' ? 'lbl city' : big ? 'lbl mid' : 'lbl minor';
      const state = [no && 'sin acceso en la Parte 1 de Cai', hit && 'tiene el objeto buscado', qh && 'coincide con la búsqueda', isSel && 'seleccionado'].filter(Boolean).map(x => t(x));
      return `<g class="${cls}" data-spot="${esc(k)}" transform="translate(${s.xy[0]},${s.xy[1]})" tabindex="-1" role="button" aria-label="${esc([nm(s), s.kind_es && t(s.kind_es), ...state].filter(Boolean).join(', '))}">` +
        `<circle class="tap"/><circle class="ring"/><g class="ic"><image href="img/spot/${ic}.webp" x="${-sz / 2}" y="${-sz / 2}" width="${sz}" height="${sz}"/></g>` +
        `<text class="${lc}" style="--o:${sz / 2 + 3}px">${esc(nm(s))}</text></g>`;
    }).join('');
    const small = Object.entries(M.xy).filter(([k, p]) => p && !SPOTS[k]).map(([, p]) => `<circle cx="${p[0]}" cy="${p[1]}"/>`).join('');
    const mi = M.image;
    const chip = (sp, extra) => `<button type="button" data-mvsel="${esc(sp)}" class="gchip t-love">${esc(nm(SPOTS[sp]))} <small>${esc(extra)}</small></button>`;
    const more = n => `<span class="mut">${t('y {n} más', { n })}</span>`;
    let res = '';
    if (itM.length > 1) res = `<div class="mres"><b>${t('¿Qué objeto?')}</b> ${itM.slice(0, 12).map(n => `<button type="button" data-mvit="${esc(n)}" class="gchip">${esc(n)}</button>`).join('')}${itM.length > 12 ? more(itM.length - 12) : ''}</div>`;
    else if (String(qs.it || '').trim().length >= 2 && !itM.length) res = `<div class="mres"><span class="mut">${t('Ningún objeto con ese nombre se consigue en tiendas, trueques, búsquedas, mazmorras o cultivos.')}</span></div>`;
    else if (itemId) {
      const rows = Object.entries(hits).sort((a, b) => (turnsFromDagsion(SPOTS[a[0]]) || 0) - (turnsFromDagsion(SPOTS[b[0]]) || 0));
      res = `<div class="mres"><b>${L('objeto', itemId)}</b>: ${rows.length ? rows.map(([sp, hw]) => chip(sp, list([[...new Set(hw)].join(' / '), turnsTxt(SPOTS[sp])]))).join('')
        : `<span class="mut">${t('no está en ningún lugar del mapa en esta ruta; otras fuentes en <a href="{h}">su ficha</a>.', { h: href('objeto', itemId) })}</span>`}</div>`;
    }
    if (spM.length > 1) res += `<div class="mres"><b>${t('Lugares:')}</b> ${spM.slice(0, 12).map(n => chip(IX.byName[n], turnsTxt(SPOTS[IX.byName[n]]))).join('')}${spM.length > 12 ? more(spM.length - 12) : ''}</div>`;
    else if (String(qs.q || '').trim().length >= 2 && !spM.length) res += `<div class="mres"><span class="mut">${t('Ningún lugar con ese nombre.')}</span></div>`;
    const filtered = qs.q || qs.it || qs.sel;
    return `<h1>${t('Mapa')}</h1><div class="filters mfil">` +
      `<input type="search" data-mv="q" list="mvsl" value="${esc(qs.q || '')}" placeholder="${t('Buscar lugar')}" aria-label="${t('Buscar lugar')}"><datalist id="mvsl">${Object.keys(IX.byName).sort((a, b) => a.localeCompare(b, LANG)).map(o => `<option value="${esc(o)}">`).join('')}</datalist>` +
      `<input type="search" data-mv="it" list="mvil" value="${esc(qs.it || '')}" placeholder="${t('Dónde se consigue un objeto')}" aria-label="${t('Dónde se consigue un objeto')}"><datalist id="mvil">${itemNames.sort((a, b) => a.localeCompare(b, LANG)).map(o => `<option value="${esc(o)}">`).join('')}</datalist>` +
      `${filtered ? `<button type="button" data-mvclear class="chip">${t('Quitar filtros')}</button>` : ''}</div>` +
      kindsBar(route, c, on) + res +
      `<div class="mapwrap"><div class="mapbox2"><svg viewBox="${(MV.vb || MV.bounds).join(' ')}" class="map2${mi ? ' pic' : ''}" id="mapsvg" tabindex="0" role="group" aria-roledescription="${t('mapa')}" aria-label="${t('Mapa del mundo. Flechas: desplazar; + y −: zoom; Intro: recorrer los lugares con las flechas; Escape: volver al mapa.')}">` +
      `${mi ? `<image href="${MV.hi ? mi.files['4096'] : mi.files['2048']}" data-hi="${MV.hi ? '' : mi.files['4096']}" x="${mi.x}" y="${mi.y}" width="${mi.w}" height="${mi.h}" preserveAspectRatio="none"/>` : ''}` +
      `<g class="edges bg">${roads}</g><g class="edges">${roads}</g><g class="small">${small}</g><g class="regs">${regLbl}</g>${dots}</svg>` +
      `<div class="mzoom"><button type="button" data-mvz="1.5" aria-label="${t('Acercar')}">+</button><button type="button" data-mvz="0.667" aria-label="${t('Alejar')}">−</button><button type="button" data-mvz="0" aria-label="${t('Ver todo')}">⤢</button></div></div>` +
      `${sel ? panel(sel, route, c, caiP1, hits[sel]) : ''}</div>` +
      `<p class="mut mhelp"><span data-count>${t('{n} en el mapa', { n: plural(shown, 'lugar', 'lugares') })}</span>. ${t('Arrastrar para desplazarlo; rueda, pellizco o +/− para el zoom; al tocar un punto se ve qué tiene. Con el teclado: flechas para desplazarlo e Intro para recorrer los lugares. Turnos en línea recta desde Dagsion (±1).')}</p>`;
  }

  function panel(k, route, c, caiP1, hit) {
    const s = SPOTS[k], reg = M.regions[s.region], dg = M.dungeons?.[k], qs = spotQuests(s, route, c), dr = (s.search?.drops || []).filter(d => d.item), a = caiP1 || !route ? s.cai_p1_access : null;  // nothing picked: Cai's reachability as a labelled fact
    const verdict = list([turnsTxt(s), a ? (a.reachable ? ((a.via_checkpoints || []).length ? t('Prestigio {n}', { n: a.via_checkpoints.map(v => v.renown_rank ?? '?').join('/') }) : t('libre')) : t('sin acceso en la Parte 1 de Cai')) : '',
      qs.length ? plural(qs.length, 'misión', 'misiones') + (c ? ' ' + t('en este capítulo') : '') : '']);
    const rows = kvRows([
      [t('Objeto buscado'), hit ? esc([...new Set(hit)].join(' / ')) : ''],
      [t('Misiones'), list(qs.map(q => L('mision', q.id)))],
      [t('Búsqueda'), dr.length ? dr.slice(0, 5).map(d => `${esc(nm(d.item))} ${pct(d.pct)}`).join(', ') + (dr.length > 5 ? ` <a href="${href('lugar', k)}">${t('+{n} más', { n: dr.length - 5 })}</a>` : '') : ''],
      [t('Cultivo'), s.farm?.rare_plant ? `${t('planta rara: {x}', { x: esc(nm(s.farm.rare_plant)) })}${s.farm.plot_mutation_pct != null ? ` (${pct(s.farm.plot_mutation_pct)})` : ''}` : ''],
      [t('Cebo'), s.lure ? list((s.lure.animals || []).map(x => `${esc(MOUNTS[x.id] ? nm(MOUNTS[x.id]) : gt(x.es))} ${pct(x.pct)}`)) + (s.lure.rare ? ` · ${t('raro: {x}', { x: esc(nm(s.lure.rare)) })} ${pct(s.lure.rare.pct)}` : '') : ''],
      [t('Mazmorra'), dg?.base_level_part?.['1'] ? t('nivel {n}', { n: dg.base_level_part['1'] }) : ''],
      [t('Tiendas'), esc(list(Object.keys(s.shops || {}).map(x => t(SHOP[x] || x))))],
      ['Vandahl', s.vandahl?.length ? t('trueques (<a href="{h}">ver lista</a>)', { h: `${href('lugar', k)}?ir=fi-tiendas` }) : ''],
      [t('Mercaderes'), esc(list((s.roaming_merchants || []).map(e => nm(e))))],
      [t('Acceso en la Parte 1 de Cai'), accessTxt(a)],
      [t('Región'), reg ? `${esc(nm(reg))}${reg.enemy_level ? ' · ' + t('enemigos de nivel {n}', { n: reg.enemy_level.join('–') }) : ''}` : ''],
    ]);
    return `<aside class="mpanel" tabindex="-1" aria-label="${esc(nm(s))}"><button type="button" class="mclose" data-mvsel="" aria-label="${t('Cerrar')}">×</button><h4>${esc(nm(s))} <small class="mut">${esc(s.kind_es ? t(s.kind_es) : '')}</small></h4>` +
      `${img(s.thumb, 'mthumb')}${s.desc_es ? `<p class="mdesc">${esc(tx(s, 'desc'))}</p>` : ''}${verdict ? `<p class="mverd">${verdict}</p>` : ''}${rows}` +
      `<p><a href="${href('lugar', k)}">${t('Abrir la ficha completa ›')}</a></p></aside>`;
  }

  /* ---------------- view box: pan, zoom, hi-res picture ---------------- */
  function fitAspect(svg, vb, cover) {  // view box with the box's aspect ratio, so drag, pinch and --u are exact
    const cw = svg.clientWidth || 800, chh = svg.clientHeight || 600, r = chh / cw;
    let [x, y, w, h] = vb; const cx = x + w / 2, cy = y + h / 2;
    if (cover === 'fit') { if (h / w > r) w = h / r; h = w * r; } else if (cover === 'cover') { if (h / w > r) h = w * r; else w = h / r; } else h = w * r;
    return [cx - w / 2, cy - h / 2, w, h];
  }
  function applyVB(svg) {
    MV.full = fitAspect(svg, MV.bounds, 'fit');
    MV.vb = fitAspect(svg, MV.vb || fitAspect(svg, MV.bounds, 'cover'));  // first view fills the box
    svg.setAttribute('viewBox', MV.vb.join(' '));
    svg.style.setProperty('--u', MV.vb[2] / (svg.clientWidth || 800));
    svg.classList.toggle('zmid', MV.vb[2] < MV.full[2] * 0.7);
    svg.classList.toggle('zin', MV.vb[2] < MV.full[2] * 0.45);
    const u = MV.vb[2] / (svg.clientWidth || 800);  // map units per screen pixel: names show once there is room for them on screen
    svg.classList.toggle('l1', u < 0.9); svg.classList.toggle('l2', u < 0.55); svg.classList.toggle('l3', u < 0.32);
    const im = svg.querySelector('image[data-hi]:not([data-hi=""])');  // sharper picture once zoomed in
    if (im && MV.vb[2] < MV.full[2] * 0.6) { im.setAttribute('href', im.dataset.hi); im.dataset.hi = ''; MV.hi = true; }
  }
  function zoom(svg, factor, cx, cy) {
    const [x, y, w, h] = MV.vb;
    const nw = Math.min(MV.full[2] * 1.2, Math.max(MV.full[2] * 0.04, w / factor)), nh = nw * h / w;
    const px = cx ?? x + w / 2, py = cy ?? y + h / 2;
    MV.vb = [px - (px - x) * nw / w, py - (py - y) * nh / h, nw, nh];
    applyVB(svg);
  }
  function center(svg, k, zoomTo) {
    const s = SPOTS[k]; if (!s?.xy) return;
    let [, , w, h] = MV.vb; if (zoomTo && w > MV.full[2] * zoomTo) { h = h * MV.full[2] * zoomTo / w; w = MV.full[2] * zoomTo; }
    // the middle of the map's visible part: on phones the place panel (fixed at the bottom) covers the lower half
    const r = svg.getBoundingClientRect(), p = document.querySelector('.mpanel')?.getBoundingClientRect();
    const bot = Math.min(r.bottom, innerHeight || r.bottom, p && p.left <= r.left + 1 && p.top > r.top ? p.top : Infinity), top = Math.max(r.top, 0);
    const fy = r.height > 0 && bot > top ? ((top + bot) / 2 - r.top) / r.height : 0.5;
    MV.vb = [s.xy[0] - w / 2, s.xy[1] - h * fy, w, h]; applyVB(svg);
  }
  const svgPoint = (svg, cx, cy) => { const r = svg.getBoundingClientRect(); return [MV.vb[0] + (cx - r.left) / r.width * MV.vb[2], MV.vb[1] + (cy - r.top) / r.height * MV.vb[3]]; };
  const phone = () => innerWidth <= 760;

  /** change map state: new URL without a history entry or a hashchange, then re-render in place */
  function go(patch) {
    const { qs } = parseHash(location.hash);
    history.replaceState(null, '', qsHref('mapa', qs, patch));
    render(true);
  }
  /** open (k) or close ('') the panel; the focus follows: into the panel, and back to its marker (or the map) when it closes */
  function select(k) {
    const was = parseHash(location.hash).qs.sel;
    if (k) MV.focus = k;
    go({ sel: k });
    if (k) { const p = document.querySelector('.mpanel'); p?.focus({ preventScroll: true }); if (phone()) p?.scrollIntoView({ block: 'nearest' }); }
    else (document.querySelector(`#mapsvg [data-spot="${window.CSS.escape(was || '')}"]`) || document.getElementById('mapsvg'))?.focus({ preventScroll: true });
  }
  /** keyboard walk between markers: the nearest one in the arrow's direction (or the one nearest the centre), kept in view */
  function walk(svg, from, dir) {
    const xy = g => SPOTS[g.dataset.spot].xy, all = [...svg.querySelectorAll('[data-spot]')];
    const c = from ? xy(from) : [MV.vb[0] + MV.vb[2] / 2, MV.vb[1] + MV.vb[3] / 2];
    const ok = g => { if (!dir) return true; const [dx, dy] = [xy(g)[0] - c[0], xy(g)[1] - c[1]]; return g !== from && (dir[0] ? Math.sign(dx) === dir[0] && Math.abs(dx) >= Math.abs(dy) : Math.sign(dy) === dir[1] && Math.abs(dy) >= Math.abs(dx)); };
    const to = all.filter(ok).sort((a, b) => Math.hypot(xy(a)[0] - c[0], xy(a)[1] - c[1]) - Math.hypot(xy(b)[0] - c[0], xy(b)[1] - c[1]))[0];
    if (!to) return;
    const [x, y] = xy(to), [vx, vy, vw, vh] = MV.vb;
    if (x < vx || x > vx + vw || y < vy || y > vy + vh) center(svg, to.dataset.spot);  // i18n-ignore (code, not text)
    to.focus({ preventScroll: true });
  }

  if (typeof MutationObserver === 'function') {
    new MutationObserver(() => {  // a fresh render: fit the view box, fly to a pending spot (a place ficha's «Ver en el mapa» included)
      const s = document.getElementById('mapsvg');
      if (!s) { MV.shownSel = null; return; }  // left the map: a later ?sel= link flies to its spot again
      if (s.dataset.init) return;
      s.dataset.init = 1;
      const sel = parseHash(location.hash).qs.sel;
      if (sel && sel !== MV.shownSel && SPOTS[sel]) MV.focus = sel;
      MV.shownSel = sel;
      applyVB(s);
      if (MV.focus) { const k = MV.focus; MV.focus = null; center(s, k, 0.3); }
    }).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', () => { const s = document.getElementById('mapsvg'); if (s) applyVB(s); });
    document.addEventListener('wheel', e => {
      const svg = e.target.closest?.('#mapsvg'); if (!svg) return;
      e.preventDefault(); const [px, py] = svgPoint(svg, e.clientX, e.clientY); zoom(svg, e.deltaY < 0 ? 1.25 : 0.8, px, py);
    }, { passive: false });
    document.addEventListener('pointerdown', e => {
      const svg = e.target.closest?.('#mapsvg'); if (!svg) return;
      try { svg.setPointerCapture(e.pointerId); } catch (x) { /* synthetic events */ }
      MV.ptrs.set(e.pointerId, [e.clientX, e.clientY]); MV.moved = false;
      MV.drag = { vb: MV.vb.slice(), start: [...MV.ptrs.values()].map(p => p.slice()), spot: e.target.closest('[data-spot]')?.dataset.spot };
    });
    document.addEventListener('pointermove', e => {
      const svg = document.getElementById('mapsvg'); if (!svg || !MV.ptrs.has(e.pointerId) || !MV.drag) return;
      MV.ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      const r = svg.getBoundingClientRect(), Ps = [...MV.ptrs.values()], S0 = MV.drag.start, V = MV.drag.vb;
      if (Ps.length === 1 && S0.length === 1) {
        const dx = Ps[0][0] - S0[0][0], dy = Ps[0][1] - S0[0][1];
        if (Math.abs(dx) + Math.abs(dy) > 5) MV.moved = true;
        MV.vb = [V[0] - dx / r.width * V[2], V[1] - dy / r.height * V[3], V[2], V[3]]; applyVB(svg);
      } else if (Ps.length >= 2 && S0.length >= 2) {
        MV.moved = true;
        const d0 = Math.hypot(S0[0][0] - S0[1][0], S0[0][1] - S0[1][1]), d1 = Math.hypot(Ps[0][0] - Ps[1][0], Ps[0][1] - Ps[1][1]);
        MV.vb = V.slice();
        const [px, py] = svgPoint(svg, (Ps[0][0] + Ps[1][0]) / 2, (Ps[0][1] + Ps[1][1]) / 2); zoom(svg, d1 / (d0 || 1), px, py);
      }
    });
    const ptrEnd = e => {
      if (!MV.ptrs.has(e.pointerId)) return;
      MV.ptrs.delete(e.pointerId);
      if (MV.ptrs.size) { MV.drag = { vb: MV.vb.slice(), start: [...MV.ptrs.values()].map(p => p.slice()) }; return; }
      const spot = MV.drag?.spot, moved = MV.moved; MV.drag = null;
      if (!moved && spot && e.type === 'pointerup') { MV.shownSel = spot; go({ sel: spot }); if (phone()) document.querySelector('.mpanel')?.scrollIntoView({ block: 'nearest' }); }
    };
    document.addEventListener('pointerup', ptrEnd); document.addEventListener('pointercancel', ptrEnd);
    document.addEventListener('keydown', e => {
      const svg = document.getElementById('mapsvg'); if (!svg) return;
      const g = e.target.closest?.('#mapsvg [data-spot]'), dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (e.key === 'Escape' && document.querySelector('.mpanel') && (e.target.closest?.('.mapwrap') || e.target === document.body)) { e.preventDefault(); select(''); return; }
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(g.dataset.spot); return; }
      if (g && dir) { e.preventDefault(); walk(svg, g, dir); return; }
      if (g && e.key === 'Escape') { e.preventDefault(); svg.focus({ preventScroll: true }); return; }
      if (e.target === svg && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); const cur = svg.querySelector(`[data-spot="${window.CSS.escape(parseHash(location.hash).qs.sel || '')}"]`); cur ? cur.focus({ preventScroll: true }) : walk(svg, null, null); return; }
      if (!e.target.closest?.('#mapsvg')) return;
      const st = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (st) { e.preventDefault(); MV.vb[0] += st[0] * MV.vb[2] * 0.15; MV.vb[1] += st[1] * MV.vb[3] * 0.15; applyVB(svg); } else if (e.key === '+' || e.key === '=') { e.preventDefault(); zoom(svg, 1.5); } else if (e.key === '-') { e.preventDefault(); zoom(svg, 0.667); }
    });
    document.addEventListener('click', e => {
      const el = e.target.closest?.('[data-mvz],[data-mvsel],[data-mvclear],[data-mvit],[data-mvk]');
      if (!el) return;
      e.preventDefault();
      const d = el.dataset, qs = parseHash(location.hash).qs;
      if (d.mvk) { mapKindTap(d.mvk); render(true); return; }
      if (d.mvz) { const svg = document.getElementById('mapsvg'); if (+d.mvz === 0) { MV.vb = MV.full.slice(); applyVB(svg); } else zoom(svg, +d.mvz); }
      else if (d.mvsel != null) select(d.mvsel);
      else if (d.mvit) go({ it: d.mvit });
      else if (d.mvclear != null) { history.replaceState(null, '', '#/mapa'); render(true); }
    });
    // filter as you type (debounced, focus and caret kept); Enter or a datalist pick (change) also opens a single place
    const mvApply = (el, pick) => {
      const k = el.dataset.mv, v = el.value.trim(), m = k === 'q' ? match(v, Object.keys(index().byName)) : [];
      if (pick && m.length === 1) { MV.focus = index().byName[m[0]]; go({ q: '', sel: MV.focus }); return; }
      go({ [k]: v });
      const f = document.querySelector(`[data-mv="${k}"]`);
      if (!pick && f) { f.focus({ preventScroll: true }); f.setSelectionRange?.(f.value.length, f.value.length); }
    };
    let mvTimer;
    document.addEventListener('input', e => {
      const el = e.target; if (!el.dataset?.mv) return;
      clearTimeout(mvTimer);
      const at = location.hash.split('?')[0];
      mvTimer = setTimeout(() => { if (el.isConnected && location.hash.split('?')[0] === at) mvApply(el, false); }, 350);
    });
    document.addEventListener('change', e => { if (e.target.dataset?.mv) { clearTimeout(mvTimer); mvApply(e.target, true); } });
  }

  /* names by zoom (style.css shows them by zmid/zin; these rules come later and win) and a focus ring unlike the white «found» ring
     and the gold «selected» one: wider, unfilled, with a dark halo, and the focused place's name always shown */
  const CSS = 'svg.map2:not(.l0) .mk text.lbl{display:none}' +
    'svg.map2.l1 .mk text.lbl.city,svg.map2.l2 .mk text.lbl.mid,svg.map2.l3 .mk text.lbl.minor,svg.map2 .mk text.lbl.on,svg.map2 .mk:focus-visible text.lbl.lbl{display:inline}' +
    'svg.map2 .mk:focus-visible circle.ring{r:calc(var(--u) * 22px);fill:none;stroke:var(--gold2);stroke-width:calc(var(--u) * 4px);stroke-dasharray:calc(var(--u) * 6px) calc(var(--u) * 3px);filter:drop-shadow(0 0 2px #000)}';
  register({ id: 'mapa', title: 'Mapa', render: (id, qs) => mapa(qs || {}), css: CSS });
})();
