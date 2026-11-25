/* Fortune's Weave · wiki2 · battles: listing (#/batallas?r=&p=&k=) and ficha (#/batalla/<id>) with terrain grid, units, stats and loot. Data: WIKI_EXT.batallas + batallas_mapas. */
'use strict';
(() => {
  const D = (window.WIKI_EXT || {}).batallas, MP = (window.WIKI_EXT || {}).batallas_mapas || {};
  if (!D) return;
  const B = Object.fromEntries(D.b.map(b => [b.id, b]));
  const KINDS = ['historia', 'desvío', 'duelo', 'entrenamiento', 'encuentro', 'práctica'];
  const PARTS = { 0: 'Prólogo', 1: 'Parte 1', 2: 'Parte 2', 3: 'Parte 3' };
  const SHARED = ['Prólogo', 'Parte 2', 'Parte 3'];
  const STATK = ['HP', 'Str', 'Mag', 'Dex', 'Spd', 'Lck', 'Def', 'Res', 'Cha', 'Mov'];  // statName(): PV, Fue… / HP, Str…
  /** data text: the game's English when the game has it, else the wiki's (i18n/en/data-battles.json) */
  const dt = s => { const g = gt(s); return g !== s ? g : t(s); };
  /** wiki prose with sources inline: the English text when the dictionary has it (written without sources), else the Spanish fact */
  const prose = s => { const e = t(s); return e !== s ? e : factOnly(s); };
  const kindL = k => t(k[0].toUpperCase() + k.slice(1));
  const B62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const KEY_OF = { Prólogo: n => `comun-0-${n}`, 'Parte 2': n => `comun-2-${n}`, 'Parte 3': n => `comun-3-${n}` };
  ROUTE_IDS.forEach(r => { KEY_OF[ROUTE_NAME[r]] = n => `${r}-1-${n}`; });
  /** Spanish name of a game id; internal ids with no Spanish name (map gimmicks, monster classes) give '' */
  const nmEs = id => { const raw = String(id || '').replace(/^[A-Z]+_/, ''); return D.names[id] || CLASSES[id]?.es || SKILLS[id]?.es || ITEMS[id]?.es || (JP_ANY.test(raw) ? '' : raw); };
  /** the same name in the reader's language */
  const nmId = id => { const s = nmEs(id), e = CLASSES[id] || SKILLS[id] || ITEMS[id]; return !s || !isEn() ? s : e?.es === s ? nm(e) : gt(s) !== s ? gt(s) : window.I18N_EN?.ui?.[s] || s; };  // names: no t() (a name without English is not a missing key)
  const VARIANT = [['本物', 'verdadero'], ['偽物', 'falso'], ['弱点', 'punto débil'], ['強', 'fuerte']];
  /** unit name; monsters and gimmick units carry an internal name: class name plus the variant (unEs: in Spanish, as the data's texts use it) */
  const unEs = u => (!JP_ANY.test(u.n) ? u.n : nmEs(u.c) + list(VARIANT.filter(([j]) => u.n.includes(j)).map(([, e]) => ` (${e})`)));
  const un = u => (!JP_ANY.test(u.n) ? gt(u.n) : nmId(u.c) + list(VARIANT.filter(([j]) => u.n.includes(j)).map(([, e]) => ` (${t(e)})`)));
  const item = id => (nmId(id) ? L('objeto', id, nmEs(id)) : '');
  const skill = id => (nmId(id) ? L('habilidad', id, nmEs(id)) : '');
  const cls = id => (nmId(id) ? L('clase', id, nmEs(id)) : '—');
  const BATS = new Set((((window.WIKI_EXT || {}).guerra || {}).battalions || []).map(b => b.id));
  const batallon = id => (BATS.has(id) ? `<a href="${href('batallon', id)}">${esc(nmId(id))}</a>` : esc(nmId(id)));
  const CHAR_BY_NAME = Object.fromEntries(Object.values(CHARS).map(c => [c.es, c.id]));
  /** unit name, linked to the character page when a recruit or named character carries it */
  const unit = u => (CHARS[u.p] ? L('personaje', u.p, un(u)) : CHAR_BY_NAME[u.n] ? L('personaje', CHAR_BY_NAME[u.n], un(u)) : esc(un(u)));
  /** random loot group (game data) → «item 50 %, item 25 %»; IID_無し is «nothing» */
  const loot = g => list((D.loot?.[g] || []).filter(([i]) => i !== 'IID_無し' && nmEs(i)).map(([i, p]) => `${item(i)} ${pct(p)}`));
  const chapKey = c => KEY_OF[c[0]] && KEY_OF[c[0]](c[1]);
  const chTx = c => `${t(c[0])} · ${t('cap. {n}', { n: c[1] })}`;
  const chap = c => chapLink(chapKey(c)) || esc(chTx(c));
  const where = b => (b.ch.length ? b.ch.map(chTx).join(', ') : b.k === 'encuentro' ? t('Mapa del mundo') : '');
  const nFoes = b => b.e.reduce((s, u) => s + u.xy.length, 0) + (b.rnd || []).length;
  const bosses = b => b.e.filter(u => u.boss);
  const lvTxt = l => (l.startsWith('ej.') ? t('ejército') + (l.slice(3) ? ' ' + l.slice(3) : '') : t('fijo {n}', { n: l }));
  /** a route sees its own Part 1 battles plus the shared ones (prologue, Parts 2–3, world-map encounters) */
  const inRoute = (b, r) => !r || !b.r.length || b.r.some(x => x === ROUTE_NAME[r] || SHARED.includes(x));

  function listing(qs) {
    const r = listRoute(qs), p = qs.p || '', k = qs.k || '';
    const rows = D.b.filter(b => inRoute(b, r) && (!p || String(b.p) === p) && (!k || b.k === k));
    let last;
    const body = rows.map(b => {
      const head = b.p !== last ? `<tr><th colspan="3">${t(b.p == null ? 'Encuentros en el mapa del mundo' : PARTS[b.p])}</th></tr>` : '';
      last = b.p;
      const bs = [...new Set(bosses(b).map(u => esc(un(u))))].slice(0, 4);
      return head + `<tr><td><a href="${href('batalla', b.id)}">${esc(dt(b.t))}</a><br><small class="mut">${esc(where(b))}${bs.length ? ' · ' + t('jefes: {x}', { x: bs.join(', ') }) : ''}</small></td>` +
        `<td>${esc(t(b.k))}</td><td>${nFoes(b)}</td></tr>`;
    }).join('');
    return `<h1>${t('Batallas')}</h1>${routeChips('batallas', qs, r)}` +
      chips('batallas', qs, 'p', [['', 'Todas las partes'], ...Object.entries(PARTS)], p, 'Parte') +
      chips('batallas', qs, 'k', [['', 'Todos los tipos'], ...KINDS.map(x => [x, x[0].toUpperCase() + x.slice(1)])], k, 'Tipo') +
      `<p class="sr-only" data-count>${t('{n} de {all} batallas', { n: rows.length, all: D.b.length })}</p>` +
      (rows.length ? `<div class="tw"><table><tr><th>${t('Batalla')}</th><th>${t('Tipo')}</th><th>${t('Enemigos')}</th></tr>${body}</table></div>` : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`);
  }

  /* ---------- terrain grid ---------- */
  const terr = i => D.terr[i];
  function grid(b) {
    const m = MP[b.m]; if (!m) return '';
    const [ox, oz] = m.o, h = m.g.length, w = m.g[0].length, S = 16, cells = [], marks = [];
    m.g.forEach((row, z) => [...row].forEach((c, x) => {
      cells.push(`<rect x="${x * S}" y="${z * S}" width="${S}" height="${S}" fill="${terr(m.pal[B62.indexOf(c)]).c}" data-x="${x + ox}" data-z="${z + oz}"/>`);
    }));
    const mark = (x, z, cl, tt) => { x -= ox; z -= oz; if (x >= 0 && z >= 0 && x < w && z < h) marks.push(`<circle class="${cl}" cx="${x * S + S / 2}" cy="${z * S + S / 2}" r="${cl.includes('boss') ? 6.5 : 5}"><title>${esc(tt)}</title></circle>`); };
    (b.ps || []).forEach(([x, z]) => mark(x, z, 'bt-ps', t('despliegue')));
    (b.a || []).forEach(u => u.xy.forEach(([x, z]) => mark(x, z, 'bt-al', un(u))));
    (b.o || []).forEach(u => u.xy.forEach(([x, z]) => mark(x, z, 'bt-ot', un(u))));
    (b.rnd || []).forEach(([x, z]) => mark(x, z, 'bt-rn', t('Enemigo aleatorio')));
    b.e.forEach(u => u.xy.forEach(([x, z]) => mark(x, z, 'bt-en' + (u.boss ? ' bt-boss' : '') + (u.rf ? ' bt-rf' : ''), un(u) + (u.rf ? ` (${t('refuerzo')})` : ''))));
    const used = [...new Map(m.pal.map(terr).filter(tr => tr.id !== 'TID_空' && !JP_ANY.test(tr.es)).map(tr => [tr.es + tr.c, tr])).values()];
    return `<div class="bt-mapw"><svg class="bt-map" viewBox="0 0 ${w * S} ${h * S}" data-b="${esc(b.id)}" role="img" aria-label="${t('Mapa de casillas')}">${cells.join('')}<g>${marks.join('')}</g></svg></div>` +
      `<div id="bt-cell" class="bt-cell mut">${t('Al tocar una casilla se ven su terreno y las unidades que hay en ella.')}</div>` +
      `<div class="bt-leg"><span><i class="bt-dot bt-en"></i>${t('enemigo')}</span><span><i class="bt-dot bt-en bt-boss"></i>${t('jefe')}</span><span><i class="bt-dot bt-en bt-rf"></i>${t('refuerzo')}</span>` +  // i18n-ignore (class names; the labels go through t())
      `${b.rnd ? `<span><i class="bt-dot bt-rn"></i>${t('enemigo aleatorio')}</span>` : ''}<span><i class="bt-dot bt-al"></i>${t('ejército propio o aliado')}</span><span><i class="bt-dot bt-ps"></i>${t('despliegue')}</span>` +  // i18n-ignore (class names; the labels go through t())
      `${b.o ? `<span><i class="bt-dot bt-ot"></i>${t('tercer bando')}</span>` : ''}</div>` +
      `<div class="bt-leg">${used.map(tr => `<span><i class="bt-sw" style="background:${esc(tr.c)}"></i>${esc(gt(tr.es))}</span>`).join('')}</div>`;
  }
  function cellInfo(b, x, z) {
    const m = MP[b.m], [ox, oz] = m.o, tr = terr(m.pal[B62.indexOf(m.g[z - oz][x - ox])]);
    const sg = v => (v > 0 ? '+' : '') + v;
    const mv = D.meta.moves.map((n, i) => `${dt(n)} ${tr.mv[i] >= 255 ? '✕' : tr.mv[i]}`).join(' · ');
    const fx = [tr.avo && t('Esquiva {v}', { v: sg(tr.avo) }), tr.hit && t('Golpe {v}', { v: sg(tr.hit) }), tr.def && t('Def {v}', { v: sg(tr.def) }), tr.res && t('Res {v}', { v: sg(tr.res) }),
      tr.heal && t('Cura {v}', { v: tr.heal }), ...(tr.sk || []).map(dt)].filter(Boolean).join(' · ');
    const same = [...b.e.map(u => [u, 'enemigo']), ...(b.a || []).map(u => [u, 'aliado']), ...(b.o || []).map(u => [u, 'tercer bando'])]
      .filter(([u]) => u.xy.some(p => p[0] === x && p[1] === z))
      .reduce((m, [u, k]) => { const s = `${esc(un(u))}\0 <span class="mut">(${esc(list([t(k), u.boss && t('jefe'), u.rf && t('refuerzo'), nmId(u.c)]))})</span>`; return m.set(s, (m.get(s) || 0) + 1); }, new Map());
    const here = [...same].map(([s, n]) => s.replace('\0', n > 1 ? ` ×${n}` : ''));
    return `<b>${esc(gt(tr.es))}</b> <span class="mut">(${x}, ${z})</span><br>${t('Coste de movimiento: {m}', { m: esc(mv) })}${fx ? '<br>' + esc(fx) : ''}${tr.help ? `<br><span class="mut">${esc(dt(tr.help))}</span>` : ''}${here.length ? '<br>' + here.join('<br>') : ''}`;
  }
  document.addEventListener('click', e => {
    const r = e.target.closest && e.target.closest('.bt-map rect, .bt-map circle'); if (!r) return;
    const svg = r.closest('svg'), b = B[svg.dataset.b]; if (!b) return;
    let x = +r.dataset.x, z = +r.dataset.z;
    if (r.tagName === 'circle') { const m = MP[b.m]; x = Math.floor(+r.getAttribute('cx') / 16) + m.o[0]; z = Math.floor(+r.getAttribute('cy') / 16) + m.o[1]; }
    svg.querySelectorAll('.bt-on').forEach(n => n.classList.remove('bt-on'));
    svg.querySelector(`rect[data-x="${x}"][data-z="${z}"]`)?.classList.add('bt-on');
    const box = document.getElementById('bt-cell'); if (box) { box.classList.remove('mut'); box.innerHTML = cellInfo(b, x, z); }
  });

  /* ---------- units ---------- */
  const tag = (s, c = '') => `<span class="bt-tag${c ? ' ' + c : ''}">${s}</span>`;
  function unitTable(us, enemy) {
    const rows = new Map();  // identical rows merge; the count (spawn points) goes after the name
    us.forEach(u => {
      const tags = [u.boss && tag(t('jefe'), 'bt-tb'), u.obj && tag(t('objetivo'), 'bt-tb'), u.rf && tag(t('refuerzo')), u.dif === 'D' && tag(t('solo Difícil'), 'bt-td'),
        u.dif === 'N' && tag(t('solo Normal')), u.tn && tag(t('actúa desde el turno {n}', { n: esc(u.tn) }))].filter(Boolean).join(' ');
      const its = u.it.filter(([i]) => nmEs(i)).map(([i, d]) => item(i) + (d ? ' ' + tag(t('suelta'), 'bt-tdrop') : '')).join(', ');
      const sk = [...(u.sk || []).filter(nmEs).map(skill), ...(u.dsk || []).filter(nmEs).map(s => skill(s) + ` <span class="mut">(${t('extra')})</span>`)].join(', ');
      const extra = [nmEs(u.bt) && t('Batallón: {b}', { b: batallon(u.bt) }), nmEs(u.rd) && t('Montura: {m}', { m: MOUNTS[u.rd] ? L('montura', u.rd) : esc(nmId(u.rd)) }), u.bar && t('Barrera: {x}', { x: list(u.bar.map(item)) }),
        u.pd && list(u.pd.filter(Boolean).map(item)) && t('Suelta: {x}', { x: list(u.pd.filter(Boolean).map(item)) }),
        u.pd3 && list(u.pd3.filter(Boolean).map(item)) && t('Suelta en la Parte 3: {x}', { x: list(u.pd3.filter(Boolean).map(item)) }),
        u.rl && loot(u.rl) && t('Botín aleatorio: {x}', { x: loot(u.rl) })].filter(Boolean).join(' · ');
      const row = `<tr><td><b>${unit(u)}</b>\0 ${tags}${extra ? `<br><small class="mut">${extra}</small>` : ''}</td>` +
        `<td>${cls(u.c)}</td><td>${esc(lvTxt(u.lv))}</td><td>${its || '—'}</td>${enemy ? `<td>${sk || '—'}</td>` : ''}</tr>`;
      rows.set(row, (rows.get(row) || 0) + u.xy.length);
    });
    return `<div class="tw"><table><tr><th>${t('Unidad')}</th><th>${t('Clase')}</th><th>${t('Nivel')}</th><th>${t('Objetos')}</th>${enemy ? `<th>${t('Habilidades')}</th>` : ''}</tr>${[...rows].map(([r, n]) => r.replace('\0', n > 1 ? ` <span class="mut">×${n}</span>` : '')).join('')}</table></div>`;
  }
  function statRows(us) {
    const add = (a, d) => a.map((v, i) => v + (d ? d[i] : 0)), rows = [];
    us.filter(u => u.st).forEach(u => {
      rows.push([esc(un(u)) + (u.sn || u.sh ? ` <span class="mut">${t('base')}</span>` : ''), u.st]);
      if (!u.sn && !u.sh) return;
      if (JSON.stringify(u.sn || 0) === JSON.stringify(u.sh || 0)) rows.push([`<span class="mut">${t('Normal y Difícil')}</span>`, add(u.st, u.sn)]);
      else rows.push([`<span class="mut">${t('Normal')}</span>`, add(u.st, u.sn)], [`<span class="mut">${t('Difícil')}</span>`, add(u.st, u.sh)]);
    });
    return rows.length ? `<div class="tw"><table><tr><th></th>${STATK.map(s => `<th>${statName(s)}</th>`).join('')}</tr>${rows.map(([l, v]) => `<tr><th>${l}</th>${v.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</table></div>` : '';
  }
  function drops(b) {
    const out = new Map(), put = (i, who) => { if (!out.has(i)) out.set(i, new Set()); out.get(i).add(who); };
    b.e.forEach(u => {
      u.it.forEach(([i, d]) => d && put(i, un(u)));
      (u.pd || []).filter(Boolean).forEach(i => put(i, un(u)));
      (u.pd3 || []).filter(Boolean).forEach(i => put(i, `${un(u)} (${t('Parte {p}', { p: 3 })})`));
      (D.loot?.[u.rl] || []).filter(([i]) => i !== 'IID_無し').forEach(([i, p]) => put(i, `${un(u)} (${pct(p)})`));
      (u.bar || []).forEach(i => put(i, `${un(u)} (${t('al romper la barrera')})`));
    });
    return ul([...out].filter(([i]) => nmEs(i)).map(([i, w]) => li(item(i), esc([...w].join(', ')))));
  }

  function batalla(id) {
    const b = B[id];
    if (!b) return notFound();
    const route = ctxRoute(), rec = b.rec || {};  // no game chosen: chapters in data order, none first
    const chs = [...b.ch].sort((x, y) => (x[0] === ROUTE_NAME[route] ? 0 : 1) - (y[0] === ROUTE_NAME[route] ? 0 : 1));
    const sum = kvRows([
      [t('Capítulo'), list(chs.map(c => chap(c) + (c[2] ? ` <small>«${esc(dt(c[2]))}»</small>` : ''))) || esc(where(b))],
      [t('Tipo'), esc(t(b.k)) + (b.p != null ? ' · ' + t(PARTS[b.p]) : '')],
      [t('Lugar'), list((b.sp || []).filter(s => SPOTS[s]?.es).map(s => L('lugar', s)))],
      [t('Desvío'), b.ss && PARA[b.ss] ? L('desvio', b.ss) : ''],
      [t('Misión'), b.sq && QUEST[b.sq] ? L('mision', b.sq) : ''],
      // objective texts name units by their internal name: Spanish names first (the dictionary's keys), then the reader's language
      [t('Victoria'), (b.win || []).map(w => esc(dt(b.e.reduce((x, u) => x.replace(u.n, unEs(u)), w)))).join('<br>')],
      [t('Derrota'), (b.lose || []).map(w => esc(dt(w))).join('<br>')],
      [t('Nivel de los enemigos'), b.lv ? `${b.lv[0]}–${b.lv[1]}` : ''],
      [t('Enemigos'), `${nFoes(b)}${b.rnd ? ' ' + t('(aleatorios, dependen de la zona)') : ''}`],
      [t('Casillas de despliegue'), b.ps ? String(b.ps.length) : ''],
      [t('Lluvia'), b.rain ? pct(b.rain) : ''],
      [t('Diálogos'), list(guionLinks.battle(b.id).map(([h, tl]) => `<a href="${h}">${esc(tl)}</a>`))],
      [t('Frases al caer'), (window.WIKI_EXT || {}).frases?.battles?.[b.id] ? `<a href="#/frases/${encodeURIComponent(b.id)}">${t('Frases al caer ({n})', { n: WIKI_EXT.frases.battles[b.id] })}</a>` : ''],
    ]);
    const advice = (b.adv ? `<p>${esc(dt(b.adv))}</p>` : '') + kvRows([
      [t('Clases recomendadas'), rec.tr ? esc(dt(rec.tr)) + ((rec.cl || []).length ? ' · ' + rec.cl.map(x => esc(dt(x))).join(', ') : '') : ''],
      [t('Armas'), rec.wr ? esc(dt(rec.wr)) + ((rec.it || []).length ? ' · ' + rec.it.map(item).join(', ') : '') : '']]) +
      (b.extra || []).map(([x]) => prose(x)).filter(Boolean).map(x => `<p>${esc(x)}</p>`).join('');
    const foes = b.e.reduce((s, u) => s + u.xy.length, 0), stats = statRows([...bosses(b), ...b.e.filter(u => !u.boss)]);
    const head = fichaHead('', `<a href="#/batallas">${t('Batallas')}</a>`, dt(b.t), list([kindL(b.k), where(b)]));
    return ficha(head, [
      ['resumen', 'Resumen', sum],
      ['consejo', 'Consejo', advice],
      ['mapa', 'Mapa', grid(b)],
      ['enemigos', `${t('Enemigos')} (${foes})`, b.e.length ? unitTable(b.e, true) : ''],
      ['aleatorios', 'Enemigos aleatorios', b.rnd ? `<p>${t('{n} casillas de aparición. Las unidades dependen de la zona y de la parte del juego.', { n: b.rnd.length })}</p>` : ''],
      ['stats', 'Atributos base', stats && stats +
        `<p class="mut"><small>${t('Antes de sumar el nivel. Normal y Difícil incluyen el ajuste de dificultad. Nivel «ejército +N»: nivel del ejército más N; «fijo»: nivel fijo.')}</small></p>`],
      ['botin', 'Botín', drops(b)],
      ['aliados', 'Ejército propio y aliados fijos', b.a ? unitTable(b.a, false) : ''],
      ['tercero', 'Tercer bando', b.o ? unitTable(b.o, false) : ''],
    ]);
  }

  register({
    id: 'batallas', title: 'Batallas', routes: ['batallas', 'batalla'],
    render: (id, qs) => (id ? batalla(id) : listing(qs || {})),
    // battles themselves are in the base index; bosses are not
    search: () => D.b.flatMap(b => [...new Map(bosses(b).map(u => [un(u), u])).values()].filter(u => un(u)).map(u => ({ group: 'Batallas', label: un(u), sub: `${t('Jefe')} · ${dt(b.t)}`, href: href('batalla', b.id), pre: true }))),
  });
})();
