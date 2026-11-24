/* Fortune's Weave · wiki2 · supports and endings (#/apoyos, #/apoyos/<pid>, #/apoyo/<pair>, #/finales[/<pid>]) and the gift matrix (#/regalos).
   Data: WIKI_EXT.apoyos; conversation and ending texts load on demand (extText, core.js). */
'use strict';
(() => {
  /** data prose or game text in the reader's language: the wiki dictionary (i18n/en/data-*.json) first, else the game's own English */
  const dx = s => (s && isEn() && !((EN_DICT().ui || {})[s] != null) ? gt(s) : t(s));
  /** a cell of the authored tables: words through t(), numbers as they are */
  const tc = s => (/[a-záéíóúñ]/i.test(s) ? t(s) : s);
  const A = (window.WIKI_EXT || {}).apoyos;
  if (A) {
    const PAIR = Object.fromEntries(A.pairs.map(p => [p.id, p]));
    const ORDER = 'CBAS';
    // i18n-ignore-next: the game's Spanish abbreviations, shown through gt()
    const ST = { 物攻: 'At fís', 魔攻: 'At mág', 物防: 'Agu', 魔防: 'Rsl', 命中: 'Gol', 回避: 'Esq', 必殺: 'Crí', 必避: 'Evit', 攻速: 'VA' };
    const ISM = 'PID_イシュマール';
    const ENDS = A.endings;
    const cn = pid => (CHARS[pid] ? nm(CHARS[pid]) : String(pid || '').replace(/^PID_/, ''));
    // a character without supports of their own (only met in an ending: Klapka, Tahonia) links to their ficha
    const cl = pid => (A.by_char[pid] ? `<a href="#/apoyos/${encodeURIComponent(pid)}">${esc(cn(pid))}</a>` : L('personaje', pid, CHARS[pid]?.es ?? cn(pid)));
    const pl = (p, label) => `<a href="${href('apoyo', p.id)}">${esc(label || t('{a} y {b}', { a: cn(p.a), b: cn(p.b) }))}</a>`;
    const other = (p, pid) => (p.a === pid ? p.b : p.a);
    const bon = o => Object.entries(o || {}).map(([k, v]) => `${ST[k] ? gt(ST[k]) : k} +${v}`).join(', ');
    const mult = n => { const s = (A.aff.mult[n] / 100).toFixed(2).replace(/\.?0+$/, ''); return isEn() ? s : s.replace('.', ','); };
    const pairEnd = id => ENDS.find(e => e.kind === 'pareja' && e.pair === id);

    const TX = () => extText('apoyos_textos'), waitTx = () => extWait('apoyos_textos');  // texts: loaded once, on demand

    function win(w) {
      const pt = w.part[0] === w.part[1] ? t('Parte {p}', { p: w.part[0] }) : t('Partes {a}–{b}', { a: w.part[0], b: w.part[1] });
      const ch = [w.ch[0] ? t('desde el cap. {n}', { n: w.ch[0] }) : '', w.ch[1] ? t('hasta el cap. {n}', { n: w.ch[1] }) : ''].filter(Boolean).join(', ');
      return [pt, ch, w.route ? t('solo en la ruta de {r}', { r: w.route }) : '', ...(w.flags || []).map(dx)].filter(Boolean).join(' · ');
    }
    const chip = c => `<span class="rk${c.part[1] === 1 ? ' rk-no' : ''}" title="${esc(win(c))}">${c.r}<small> P${c.part[0]}${c.part[1] !== c.part[0] ? '–' + c.part[1] : ''}</small></span>`;
    const rankChips = p => ORDER.split('').filter(r => p.convs[r]).map(r => chip(p.convs[r])).join(' ');

    function rules() {
      const lv = A.levels;
      const levels = `<div class="tw"><table><tr><th>${t('Nivel')}</th>${lv.points.map((_, i) => `<th>${i + 1}</th>`).join('')}</tr>` +
        `<tr><th>${t('Puntos acumulados')}</th>${lv.points.map(p => `<td>${num(p)}</td>`).join('')}</tr>` +
        `<tr><th>${t('Conversación')}</th>${lv.points.map((_, i) => `<td>${Object.entries(lv.conv_need).filter(([, n]) => n === i + 1).map(([r]) => r).join('') || '—'}</td>`).join('')}</tr>` +
        `<tr><th>${t('Ayuda de Eshmel')}</th>${A.eshmel_reinforce.map(v => `<td>${v == null ? '—' : pct(v)}</td>`).join('')}</tr></table></div>`;
      const lvH = [2, 3, 4, 5].map(n => `<th>${t('Nv {n}', { n })}</th>`).join('');
      const assist = `<div class="tw"><table><tr><th>${t('Intervención')}</th>${lvH}</tr>${A.assist.rows.map(r =>
        `<tr><th>${esc(dx(r.n))}</th>${r.rate.map(v => `<td>${pct(v)}</td>`).join('')}</tr>`).join('')}</table></div><p class="mut">${esc(dx(A.assist.note))}</p>`;
      const aff = `<p>${t('Afinidad de la pareja (multiplica los puntos ganados):')} ${Object.keys(A.aff.mult).map(k => `<span class="rk">${'★'.repeat(+k)} ×${mult(k)}</span>`).join(' ')}</p>`;
      const groups = `<div class="tw"><table><tr><th>${t('Grupo de clase')}</th>${lvH}<th>${t('Clases')}</th></tr>${Object.values(A.class_groups).map(g =>
        `<tr><th>${esc(dx(g.es))}</th>${[2, 3, 4, 5].map(l => `<td>${bon(g.lv[l])}</td>`).join('')}<td class="mut">${esc(g.classes.map(gt).join(', '))}</td></tr>`).join('')}</table></div>`;
      const facts = [...A.rules.map(r => factOnly(noJp(dx(r.t)))).filter(Boolean),
        t('Puntos para subir del nivel 1 al 5: 400, 1000, 1000 y 800. Los puntos por encima del nivel 5 se pierden; los apoyos se conservan al reiniciar el capítulo.'),
        t('Un regalo previo abre las comidas con ese personaje. La Comida semanal es la fuente principal; la Percha, el Teatro y las Termas suman encima.')];
      const doc = bs => docHtml(...bs.map(b => (typeof b === 'string' ? t(b) : b.kv ? { kv: b.kv.map(([k, v]) => [t(k), t(v)]) } : { head: b.head.map(tc), rows: b.rows.map(r => r.map(tc)) })));
      return card(t('Cómo funcionan los apoyos'), ul(facts.map(x => li(esc(x)))) + levels + aff + `<p>${t('La afinidad multiplica todos los puntos salvo los de los regalos.')}</p>`, 'como-funcionan') +
        card(t('Puntos por actividad'), doc(ACTIVITY), 'puntos-por-actividad') +
        card(t('Probabilidad de ayuda en combate'), assist, 'ayuda-en-combate') +
        card(t('Bonos de combate por nivel de apoyo'), groups + doc(['Cuentan hasta 4 aliados adyacentes, y cada pareja suma además su bono propio.',
          'Coste del medidor de acción combinada por nivel de apoyo 1 → 5: ataque 14/12/10/9/8; curación 18/16/14/12/10; ataque y defensa —/—/36/24/18 (no disponible con nivel 1–2).']), 'bonos-de-combate');
    }
    /** support points per activity (base values before multipliers); Spanish keys, translated when drawn */
    const ACTIVITY = ['Valores base antes de multiplicadores.',
      { head: ['Actividad', 'Peor', 'Normal', 'Bueno', 'Mejor'], rows: [['Comida (por pareja de comensales)', '40', '60', '—', '80'], ['Teatro: ver una obra', '60', '80', '—', '100'], ['Teatro: actuar (normal o especial)', '20', '30', '40', '50'],
        ['Plaza de armas (pareja)', '5', '10', '10', '20'], ['Servicio divino', '—', '5', '10', '20'], ['Termas normales', '—', '20', '—', '40'], ['Termas especiales', '—', '30', '—', '60'],
        ['Percha (0/1/2/3 aciertos)', '50', '70', '80', '100'], ['Adivina (cliente, 100 G)', '10', '15', '—', '20'], ['Banquete en el mapa', '20', '', '', ''],
        ['Conversación: opción elegida', '−10/−5/−3', '0', '+3/+5', '+10'], ['Órdenes en combate: atacar / combinado / apoyo', '2 / 16 / 10', '', '', '']] },
      { kv: [['Percha', 'con afinidad óptima los valores se doblan: 100/140/160/200.'], ['Conversaciones', 'ver una conversación C, B o A por primera vez: +50.'],
        ['Regalos', 'cumpleaños 70 · le gusta 65 · normal 40 · lo odia 0, × (1 + rareza %), redondeo hacia arriba, sin afinidad (65 → 98 con rareza 50, 130 con rareza 100); el cumpleaños sustituye a la base. Regalo favorito +82 (+98 si cuesta 300 G); categoría preferida +65.'],
        ['Comidas', 'base 80/60/40 por los gustos de la pareja × multiplicador del comedor por Prestigio (×1; ×1,3 desde Prestigio 5; ×1,5 desde 9; ×1,8 y ×2 en la Parte 3 tras sus misiones) × afinidad: 104 por invitado con Prestigio 7 (80 × 1,3).'],
        ['Termas, Plaza de armas y templo', 'se multiplican también por el multiplicador del local: Plaza 10 × 250 % = +25 y Servicio divino 20 × 80 % = +16 con Prestigio 7.']] },
      'Combate: puntos por puesto de la pareja tras la batalla.',
      { head: ['Puesto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Resto'], rows: [['Batalla normal', '80', '70', '60', '60', '55', '50', '50', '45', '40', '40', '30'], ['Escaramuza', '40', '35', '30', '25', '20', '15', '', '', '', '', '15']] }];

    /* window (apoyos_ventana): ranks whose conversation can no longer be seen after Part 1 or 2 */
    const AV = Object.fromEntries(((window.WIKI_EXT || {}).apoyos_ventana?.pares || []).map(x => [x.id, x]));
    const lostRanks = (id, n) => ORDER.split('').filter(r => AV[id]?.rangos[r]?.[1] === n);
    const lostTxt = id => [1, 2].map(n => (lostRanks(id, n).length ? t('{r} tras la Parte {n}', { r: lostRanks(id, n).join(', '), n }) : '')).filter(Boolean).join(' · ');
    function windowList(n, q) {
      const rows = Object.values(AV).filter(x => PAIR[x.id] && lostRanks(x.id, n).length && (!q || norm([cn(x.a), cn(x.b), CHARS[x.a]?.es, CHARS[x.b]?.es].join(' ')).includes(norm(q))))
        .sort((x, y) => `${cn(x.a)} ${cn(x.b)}`.localeCompare(`${cn(y.a)} ${cn(y.b)}`, LANG));
      return resultCount(rows.length, 'pareja', 'parejas', ' ' + t('con conversaciones que ya no se pueden ver al acabar la Parte {n}.', { n })) + `<p class="mut">${t('Más cosas que se pierden: {a}.', { a: `<a href="#/perdibles">${t('Perdibles')}</a>` })}</p>` +
        (rows.length ? `<div class="tw"><table><tr><th>${t('Pareja')}</th><th>${t('Se pierden')}</th><th>${t('Todas')}</th></tr>${rows.map(x =>
          `<tr><td>${pl(PAIR[x.id])}</td><td>${lostRanks(x.id, n).join(', ')}</td><td>${rankChips(PAIR[x.id])}</td></tr>`).join('')}</table></div>` : '');
    }
    const windowSummary = () => { const c = {}; Object.values(AV).forEach(x => { c[x.cierre] = (c[x.cierre] || 0) + 1; });
      return Object.keys(AV).length ? `<p class="mut">${t('Ventana: {a} parejas solo en la Parte 1, {b} hasta la Parte 2, {c} llegan a la Parte 3 y {d} mezclan ventanas.', { a: c.p1 || 0, b: c.p2 || 0, c: c.p3 || 0, d: c.mixto || 0 })}</p>` : ''; };

    function textSearch(q, sp) {
      const T = TX(); if (!T) return waitTx();
      const n = norm(q), out = [];
      for (const p of A.pairs) {
        const c = T.conv[p.id] || {};
        for (const r of ORDER) for (const [who, line] of c[r] || []) {
          if (out.length < 150 && norm(line).includes(n) && (sp || (p.convs[r]?.part[0] || 1) === 1)) out.push([p, r, who, line]);
        }
      }
      return `<p class="mut">${t(sp ? '{n} coincidencias.' : '{n} coincidencias en conversaciones de la Parte 1.', { n: out.length >= 150 ? t('Más de 150') : out.length })}</p>` +
        out.map(([p, r, who, line]) => `<p class="ap-hit">${pl(p)} <span class="rk">${r}</span> <b>${esc(cn(who))}:</b> ${esc(line.replace(/\n/g, ' '))}</p>`).join('');
    }

    function charPage(pid) {
      const ids = A.by_char[pid] || [];
      const rows = ids.map(id => PAIR[id]).sort((x, y) => cn(other(x, pid)).localeCompare(cn(other(y, pid)), LANG)).map(p => {
        const e = pairEnd(p.id);
        return `<tr><td>${pl(p, cn(other(p, pid)))}</td><td>${rankChips(p)}</td><td>${lostTxt(p.id)}</td><td>${p.aff ? '★'.repeat(p.aff) : ''}</td><td>${bon(p.bonus) || '—'}</td><td>${e ? t(e.in_game ? 'Sí' : 'Sin usar') : ''}</td></tr>`;
      }).join('');
      const solo = ENDS.filter(e => e.pid === pid && !e.empty).length;
      return fichaHead(img(ico().face?.[pid], 'fi-thumb'), `<a href="#/apoyos">${t('Apoyos')}</a>`, t('Apoyos de {c}', { c: cn(pid) }), plural(ids.length, 'pareja', 'parejas')) +
        `<p>${L('personaje', pid, t('Ficha del personaje'))}${solo ? ` · <a href="#/finales/${encodeURIComponent(pid)}">${t('Finales ({n})', { n: solo })}</a>` : ''}</p>` +
        card(t('Parejas'), `<div class="tw"><table><tr><th>${t('Pareja')}</th><th>${t('Conversaciones')}</th><th>${t('Se pierde')}</th><th>${t('Afinidad')}</th><th>${t('Bono de pareja')}</th><th>${t('Final')}</th></tr>${rows}</table></div>` +
          `<p class="mut">${t('En rojo, las conversaciones que solo existen en la Parte 1.')}</p>`);
    }

    function index(qs) {
      const q = (qs.t || '').trim(), sp = qs.sp !== 'p1', v = ['p1', 'p2'].includes(qs.v) ? qs.v : '';
      const hit = p => !q || norm(cn(p) + ' ' + (CHARS[p]?.es || '')).includes(norm(q));
      const chars = Object.keys(A.by_char).filter(hit).sort((x, y) => cn(x).localeCompare(cn(y), LANG));
      const nconv = A.pairs.reduce((s, p) => s + p.ranks.length, 0);
      const best = p => [...new Set(A.by_char[p].map(i => PAIR[i].max))].sort((a, b) => ORDER.indexOf(b) - ORDER.indexOf(a))[0];
      return `<h1>${t('Apoyos: parejas y finales')}</h1>${guiaLink('apoyos')}<nav class="tabs" aria-label="${t('Vista')}"><a href="#/apoyos" class="on" aria-current="page">${t('Apoyos')}</a><a href="#/finales">${t('Finales')}</a></nav>` +
        `<p class="mut">${plural(A.pairs.length, 'pareja', 'parejas')} · ${plural(nconv, 'conversación', 'conversaciones')}</p>` +
        `<div class="filters"><input type="search" name="t" data-qs="apoyos" value="${esc(q)}" placeholder="${t('Buscar personaje o frase')}" aria-label="${t('Buscar personaje o frase de las conversaciones')}">` +
        chips('apoyos', qs, 'sp', [['', 'Todas las partes'], ['p1', 'Sin spoilers (solo Parte 1)']], sp ? '' : 'p1', 'Partes') + '</div>' +
        chips('apoyos', qs, 'v', [['', 'Todas las parejas'], ['p1', 'Se pierden al acabar la Parte 1'], ['p2', 'Se pierden al acabar la Parte 2']], v, 'Ventana') +
        windowSummary() + (v ? windowList(+v[1], q) : (q.length >= 3 ? card(t('Texto de las conversaciones'), textSearch(q, sp)) : '') +
        (q && !chars.length ? `<p class="mut">${t('Ningún personaje con ese nombre.')}</p>` : '') +
        resultCount(chars.length, 'personaje', 'personajes', ' ' + t('con apoyos')) + `<div class="li-grid">${chars.map(p => `<a class="li-card" href="#/apoyos/${encodeURIComponent(p)}">${img(ico().face?.[p], 'li-pic') || '<span class="li-pic"></span>'}` +
          `<span><b>${esc(cn(p))}</b><small>${plural(A.by_char[p].length, 'pareja', 'parejas')} · ${t('máx. {r}', { r: best(p) })}</small></span></a>`).join('')}</div>`) + rules();
    }

    function pairPage(id, qs) {
      const p = PAIR[id], T = TX(), open = qs.r;
      const clsBonus = pid => {
        const j = CHARS[pid]?.combat?.class, G = A.class_groups[CLASSES[j]?.support_effect_q];
        return G ? esc(t('{c}: {j} → {g} (nivel 5: {b})', { c: cn(pid), j: nm(CLASSES[j]), g: dx(G.es), b: bon(G.lv[5]) })) : '';
      };
      const info = kvRows([
        [t('Rangos'), rankChips(p)],
        [t('Afinidad'), p.aff ? `${'★'.repeat(p.aff)} ${t('×{m} puntos', { m: mult(p.aff) })}` : ''],
        [t('Bono de pareja (nivel 2+)'), bon(p.bonus) || t('Sin bono')],
        [t('Bono de clase (clase inicial)'), [clsBonus(p.a), clsBonus(p.b)].filter(Boolean).join('<br>')],
        [t('Solo en la Parte 1'), p.p1_lock.length ? p.p1_lock.join(', ') : t('Ninguna conversación')],
      ]);
      const convs = ORDER.split('').filter(r => p.convs[r]).map(r => {
        const c = p.convs[r], lines = T?.conv[id]?.[r] || [], spoil = c.part[0] >= 2 || r === 'S';
        const body = !T ? waitTx() : lines.length ? lines.map(([w, line]) => `<p class="ap-l"><b>${esc(cn(w || ([p.a, p.b].includes(ISM) ? ISM : '')))}</b> ${esc(line).replace(/\n/g, ' ')}</p>`).join('') : `<p class="mut">${t('Sin texto.')}</p>`;
        return `<details class="ap-c"${open === r ? ' open' : ''}><summary><span class="rk">${r}</span> ${esc(win(c))}${c.alt ? ` <span class="mut">· ${esc(t('o bien: {x}', { x: c.alt.map(win).join(' | ') }))}</span>` : ''}` +
          `${spoil ? ' <span class="ap-sp">spoiler</span>' : ''} <span class="mut">${plural(c.lines, 'línea', 'líneas')}</span></summary>${body}</details>`;
      }).join('');
      const e = pairEnd(id);
      const end = e ? `<p>${esc(noJp(dx(e.cond)))}${e.in_game ? '' : ` <span class="mut">(${t('texto sin usar en el juego')})</span>`}</p>` +
        `<details class="ap-c"><summary><span class="ap-sp">spoiler</span> ${t('Leer el final')}</summary>${T ? `<p class="ap-l">${esc(T.end[e.id] || '').replace(/\n/g, ' ')}</p>` : waitTx()}</details>` : '';
      const head = `<div class="fi-head"><div class="fi-t"><p class="fi-eye"><a href="#/apoyos">${t('Apoyos')}</a></p><h1>${t('{a} y {b}', { a: cl(p.a), b: cl(p.b) })}</h1><p class="fi-sub">${t('Apoyo máximo {r}', { r: p.max })}</p></div></div>`;
      return ficha(head, [['bonos', 'Bonos y ventanas', info],
        ['convs', 'Conversaciones', convs + `<p class="mut">${t('Ventana: partes y capítulos en que se puede ver cada conversación.')}</p>`],
        ['final', 'Final en pareja', end]]);
    }

    const endTitle = e => (e.kind === 'pareja' ? t('{a} y {b}', { a: cn(e.a), b: cn(e.b) }) : e.pid ? cn(e.pid) : t('Cualquier unidad'));
    const endKind = e => (e.kind === 'pareja' ? 'pareja' : e.variant === 'Living' ? 'solo' : 'muerte');
    const KIND_ES = { pareja: 'En pareja', solo: 'En solitario', muerte: 'Muerte (modo Clásico)' };
    function endings(id, qs) {
      const pid = id && CHARS[id] ? id : null, k = qs.k || '', x = qs.x === '1', T = TX();
      if (id && !pid) return notFound();
      const rows = ENDS.filter(e => !e.empty && (x || e.in_game) && (!k || endKind(e) === k) && (!pid || e.pid === pid || e.a === pid || e.b === pid))
        .sort((a, b) => endTitle(a).localeCompare(endTitle(b), LANG));
      const g = A.endings_cmp.game_counts, path = pid ? `finales/${encodeURIComponent(pid)}` : 'finales';
      const counts = `<p>${t('{a} finales en pareja y finales en solitario para {b} personajes ({c} textos con variantes), más {d} textos de muerte. Hay además {e} finales en pareja escritos que el juego no usa.',
        { a: g.pair_bin, b: g.solo_living_chars, c: g.solo_living, d: g.solo_death, e: g.pair_msbt_not_in_bin })}</p>`;
      const items = rows.map(e => `<section class="card"><h3>${e.kind === 'pareja' ? t('{a} y {b}', { a: cl(e.a), b: cl(e.b) }) : e.pid ? cl(e.pid) : t('Cualquier unidad')} · ${esc(t(KIND_ES[endKind(e)]))}${e.in_game ? '' : ` · ${t('sin usar')}`}</h3>` +
        `<p class="mut">${esc(noJp(dx(e.cond)))}${e.kind === 'pareja' && PAIR[e.pair] ? ' · ' + pl(PAIR[e.pair], t('ver apoyo')) : ''}</p>` +
        `<details><summary>${t('Leer')}</summary>${T ? `<p class="ap-l">${esc(T.end[e.id] || '').replace(/\n/g, ' ')}</p>` : waitTx()}</details></section>`).join('');
      return `<h1>${pid ? t('Finales de {c}', { c: esc(cn(pid)) }) : t('Finales')}</h1><nav class="tabs" aria-label="${t('Vista')}"><a href="#/apoyos">${t('Apoyos')}</a><a href="#/finales" class="on" aria-current="page">${t('Finales')}</a></nav>` +
        resultCount(rows.length, 'final', 'finales', '.') + `<p class="mut">${t('Todo el texto de esta página revela el final del juego.')}${pid ? ` <a href="#/finales">${t('Ver todos')}</a>${A.by_char[pid] ? ` · <a href="#/apoyos/${encodeURIComponent(pid)}">${t('Apoyos de {c}', { c: esc(cn(pid)) })}</a>` : ''}` : ''}</p>` +
        chips(path, qs, 'k', [['', 'Todos los tipos'], ...Object.entries(KIND_ES)], k, 'Tipo de final') +
        chips(path, qs, 'x', [['', 'Solo los del juego'], ['1', 'Incluir textos sin usar']], x ? '1' : '', 'Textos') +
        (pid ? '' : card(t('Recuento'), counts)) + (items || `<p class="mut">${t('Sin resultados.')}</p>`);
    }

    register({
      id: 'apoyos', title: 'Apoyos: parejas y finales', routes: ['apoyos', 'apoyo', 'finales'],
      render: (id, qs = {}, sec) => (sec === 'finales' ? endings(id, qs) : !id ? index(qs) : PAIR[id] ? pairPage(id, qs) : A.by_char[id] ? charPage(id) : notFound()),
      // labels already in the reader's language (names inside); both languages' names stay searchable
      search: () => [
        ...A.pairs.map(p => ({ group: 'Personajes', label: t('{a} y {b}', { a: cn(p.a), b: cn(p.b) }), sub: t('Apoyo · {r}', { r: p.ranks.join(' ') }), href: href('apoyo', p.id), aliases: [CHARS[p.a]?.es, CHARS[p.b]?.es, CHARS[p.a]?.en, CHARS[p.b]?.en, 'apoyo', 'support'] })),
        ...ENDS.filter(e => e.in_game && !e.empty && (e.kind === 'pareja' || (e.variant === 'Living' && !e.id.endsWith('_002')))).map(e => (e.kind === 'pareja'
          ? { group: 'Personajes', label: t('Final: {a} y {b}', { a: cn(e.a), b: cn(e.b) }), sub: t('Final en pareja'), href: `#/finales/${encodeURIComponent(e.a === ISM ? e.b : e.a)}`, aliases: [CHARS[e.a]?.es, CHARS[e.b]?.es, 'final', 'epilogo', 'ending'] }
          : { group: 'Personajes', label: t('Final de {c}', { c: cn(e.pid) }), sub: t('Final en solitario'), href: `#/finales/${encodeURIComponent(e.pid)}`, aliases: [CHARS[e.pid]?.es, 'final', 'epilogo', 'ending'] })),
      ],
    });
  }

  /* ---------------- gift matrix ---------------- */
  const GD = W.gifts;
  if (!GD) return;
  const TL = { fav: '★ Favorito', love: '♥ Le encanta', like: 'Le gusta', dis: 'No le gusta', hate: '✗ Lo odia' };
  const TW = { fav: 'Favorito de', love: 'Le encanta a', like: 'Le gusta a', dis: 'No le gusta a', hate: 'Lo odia' };
  const TIERS = Object.keys(TL);
  const IT = Object.entries(GD.items);
  const LORD_NOTE = 'Solo en las Partes 2 y 3.';
  const cats = Object.keys(GD.cats).filter(c => c !== 'ninguna').sort((a, b) => a.localeCompare(b, 'es'));
  // notes: game facts only (sentences about sources or how they were worked out are dropped; the English ones leave them out)
  const notes = () => GD.notes.flatMap(n => factOnly(dx(n)).split(/(?<=\.)\s+/)).filter(s => s && !/\b(fuente|deducido|guías?|observan|sources?|deduced|guides?)\b/i.test(s));
  const priceOf = i => (i.price ? ` <small>${gold(i.price)}</small>` : '');
  const catsTx = i => i.cats.filter(c => c !== 'ninguna').map(dx).join(', ');
  const gchip = (id, i, tier, why, hl) => `<a class="gchip t-${tier}${hl ? ' hl' : ''}" href="#/regalos?m=r&amp;q=${encodeURIComponent(i.es)}" title="${esc(list([catsTx(i),
    i.grade > 1 ? t('grado {n}', { n: i.grade }) : '', why && why.length ? t('por: {x}', { x: why.map(dx).join(', ') }) : '']))}">${esc(nm(i))}${priceOf(i)}</a>`;
  /** «Puerto de Raivo (mercado)» → the place's name, «· taberna» for the tavern (English: the dictionary's «… (market)» / «… (tavern)») */
  const shopTxt = i => list(i.shops.map(s => {
    const w = isEn() ? dx(s.where).replace(' (market)', '').replace(' (tavern)', ' · ' + t('taberna')) : s.where.replace(' (mercado)', '').replace(' (taberna)', ' · taberna');  // i18n-ignore
    return `${esc(w)} <small>(${gold(s.price)})</small>`; }));

  function regalos(qs) {
    // lords (W.gifts_ui `lords`) only outside Part 1; `who` lists the 40 recruits, so their reactions are added here
    const LRD = ctxChosen() && CAPS[ctxGet().key]?.part === 1 ? {} : GD.lords || {}, GCH = { ...GD.chars, ...LRD };
    const whoOf = (id, i, tier) => [...(i.who[tier] || []), ...Object.keys(LRD).filter(jp => LRD[jp].gifts[id]?.t === tier)];
    const m = qs.m === 'r' ? 'r' : 'p', n = TIERS.includes(qs.n) ? qs.n : '', c = qs.c || '', q = norm((qs.q || '').trim());
    const okItem = i => !c || i.cats.includes(c), tiers = n ? [n] : TIERS;
    const charHit = jp => q && norm(GCH[jp].es + ' ' + GCH[jp].en).includes(q);
    const itemHit = i => q && norm(i.es + ' ' + i.en).includes(q);
    const anyChar = q && Object.keys(GCH).some(charHit), anyItem = q && IT.some(([, i]) => itemHit(i));
    let body = '', count = 0;
    // team planner: highlight (and optionally keep only) the picked recruits, with their clash-free gift proposal
    const route = ctxRoute(), team = teamNow(route), onlyTeam = team && qs.eq !== 'todos' && !q;  // a team picked: its members first; a search looks at everyone
    if (m === 'p') {
      const chars = Object.keys(GCH).filter(jp => (!onlyTeam || team.has(GCH[jp].pid)) && (!q || charHit(jp) || (anyItem && IT.some(([id, i]) => itemHit(i) && okItem(i) && tiers.includes(GCH[jp].gifts[id]?.t)))));
      body = chars.map(jp => {
        const ch = GCH[jp];
        const blocks = tiers.map(tier => {
          const rows = IT.filter(([id, i]) => ch.gifts[id]?.t === tier && okItem(i)).sort((a, b) => (a[1].price || 0) - (b[1].price || 0));
          if (!rows.length) return '';
          const chipsH = `<div>${rows.map(([id, i]) => gchip(id, i, tier, ch.gifts[id].why, itemHit(i))).join('')}</div>`;
          const head = `<b class="h-${tier}">${t(TL[tier])}</b> <span class="mut">${rows.length}${tier === 'like' || tier === 'dis' ? ' · ' + t('por precio') : ''}</span>`;
          const open = tier === 'fav' || tier === 'love' || n || c || anyItem || chars.length <= 2;
          return `<details class="glv"${open ? ' open' : ''}><summary>${head}</summary>${chipsH}</details>`;
        }).join('');
        if (!blocks && (c || n)) return '';
        count++;
        const meals = ch.meals.map(x => `<span class="gchip ${x.fav ? 't-fav' : x.hate ? 't-hate' : x.score >= 4 ? 't-love' : x.score <= 1 ? 't-dis' : ''}" title="${esc(t('afinidad {s} de 4', { s: x.score }) + (x.fav ? ' · ' + t('plato favorito') : '') + (x.hate ? ' · ' + t('plato odiado') : ''))}">${esc(dx(x.es))} <small>${x.fav ? '★' : x.hate ? '✗' : x.score}</small></span>`).join('');
        return `<section class="card${team?.has(ch.pid) ? ' eq-on' : ''}"><h3>${L('personaje', ch.pid, ch.es)}${team?.has(ch.pid) ? ` <small class="eq-tag">${t('En tu equipo')}</small>` : ''}</h3>` +
          (ch.lord ? `<p class="mut">${esc(t(LORD_NOTE))}</p>` : '') +
          `<p><span class="mut">${t('Le gustan:')}</span> ${esc(ch.cats_liked.map(dx).join(', ')) || '—'}${ch.cats_disliked.length ? ` <span class="mut">· ${t('No le gustan:')}</span> ${esc(ch.cats_disliked.map(dx).join(', '))}` : ''}</p>` +
          `${blocks || `<p class="mut">${t('Ningún regalo con estos filtros.')}</p>`}` +
          `<details class="glv"><summary><b>${t('Comidas')}</b> <span class="mut">${t('★ favorito · ✗ odiado · número = afinidad 0–4')}</span></summary><div>${meals}</div></details></section>`;
      }).join('');
    } else {
      const score = ([id, i]) => whoOf(id, i, 'fav').length * 3 + whoOf(id, i, 'love').length * 2 + whoOf(id, i, 'like').length;
      const jp0 = anyChar && Object.keys(GCH).find(charHit), rank = id => { const r = TIERS.indexOf(GCH[jp0].gifts[id]?.t); return r < 0 ? 9 : r; };
      const rows = IT.filter(([id, i]) => okItem(i) && (!q || itemHit(i) || (anyChar && Object.keys(GCH).some(jp => charHit(jp) && tiers.includes(GCH[jp].gifts[id]?.t)))) && (!n || whoOf(id, i, n).length))
        .sort((a, b) => (jp0 ? rank(a[0]) - rank(b[0]) : 0) || score(b) - score(a) || nm(a[1]).localeCompare(nm(b[1]), LANG));
      count = rows.length;
      body = rows.map(([id, i]) => {
        const who = tiers.map(tier => [tier, whoOf(id, i, tier)]).map(([tier, w]) => (w.length ? `<div class="glv"><b class="h-${tier}">${t(TW[tier])}</b> <span class="mut">${w.length}</span><div>${w.map(jp =>
          `<a class="gchip t-${tier}${charHit(jp) ? ' hl' : ''}" href="#/regalos?q=${encodeURIComponent(GCH[jp].es)}">${esc(nm(GCH[jp]))}</a>`).join('')}</div></div>` : '')).join('');
        const other = i.other.map(x => factOnly(dx(x))).filter(Boolean);
        return `<section class="card"><h3>${L('objeto', id, i.es)}${priceOf(i)}${i.grade > 1 ? ` · ${t('grado {n}', { n: i.grade })}` : ''}</h3>` +
          `<p class="mut">${esc(catsTx(i))}</p>${i.desc ? `<p>${esc(dx(i.desc))}</p>` : ''}` +
          `${who || `<p class="mut">${t('No provoca ninguna reacción especial: da los puntos normales.')}</p>`}` +
          kvRows([[t('Se compra en'), shopTxt(i)], [t('Otras fuentes'), other.map(esc).join('<br>')]]) + '</section>';
      }).join('');
    }
    const opts = [...Object.values(GCH).map(x => nm(x)), ...IT.map(([, i]) => nm(i))].sort((a, b) => a.localeCompare(b, LANG));
    return `<h1>${t('Tabla de regalos')}</h1>${guiaLink('regalos')}<nav class="tabs" aria-label="${t('Vista')}"><a href="${esc(qsHref('regalos', qs, { m: '' }))}"${m === 'p' ? ' class="on" aria-current="page"' : ''}>${t('Por personaje')}</a>` +
      `<a href="${esc(qsHref('regalos', qs, { m: 'r' }))}"${m === 'r' ? ' class="on" aria-current="page"' : ''}>${t('Por regalo')}</a></nav>` +
      `<div class="filters"><input type="search" name="q" data-qs="regalos" list="rgl" value="${esc(qs.q || '')}" placeholder="${t('Personaje o regalo')}" aria-label="${t('Personaje o regalo')}">` +
      `<datalist id="rgl">${opts.map(o => `<option value="${esc(o)}">`).join('')}</datalist>` +
      `<select name="c" data-qs="regalos" aria-label="${t('Categoría')}"><option value="">${t('Todas las categorías')}</option>${cats.map(x => `<option value="${esc(x)}"${x === c ? ' selected' : ''}>${esc(dx(x))} (${GD.cats[x]})</option>`).join('')}</select></div>` +
      chips('regalos', qs, 'n', [['', 'Cualquier reacción'], ...TIERS.map(tier => [tier, TL[tier]])], n, 'Reacción') +
      (team && m === 'p' ? chips('regalos', qs, 'eq', [['', 'Solo mi equipo'], ['todos', 'Todos']], onlyTeam ? '' : 'todos', 'Equipo') +
        `<p class="mut">${t('Qué regalar esta semana a cada recluta que quieres: {a}.', { a: `<a href="#/semana?ir=eq-ronda">${t('ronda de regalos')}</a>` })}</p>` : '') +
      resultCount(count, m === 'p' ? 'personaje' : 'regalo', m === 'p' ? 'personajes' : 'regalos') + `<p class="mut">${t('Al pasar el cursor (o mantener pulsado) un regalo se ve el motivo; un nombre o un regalo lleva a la otra vista.')}</p>` +
      (body ? `<div class="ggrid">${body}</div>` : `<p class="mut">${t('Nada coincide con la búsqueda.')}</p>`) +
      card(t('Cómo se calcula'), ul(notes().map(x => li(esc(x)))));
  }

  register({ id: 'regalos', title: 'Tabla de regalos', render: (id, qs) => regalos(qs || {}) });
})();
