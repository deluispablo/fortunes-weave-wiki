/* Fortune's Weave · wiki2 · skill listing (#/habilidades?t=&q=): every named skill once, by type, with a text filter, and the ficha
   #/habilidad/<sid> (highlights «Lista de habilidades» in the menu). Internal copies of a skill (enemy, preview) share its name and fold into the best-described one. */
'use strict';
(() => {
  const latin = s => /[A-Za-zÀ-ÿ]/.test(String(s || ''));
  /** data text in the reader's language: the wiki's prose dictionary, else the game's own table */
  const dx = s => (s && isEn() && EN_DICT().ui?.[s] != null ? t(s) : gt(s));
  const MASTERY = new Set(Object.values(CLASSES).flatMap(c => (c.mastery_skill || []).map(s => s.id)));
  const TYPES = [  // [chip value, label, test(id, skill)]: the first match wins
    ['personal', 'Personales', (k, s) => s.kind_es === 'Habilidad Personal'],
    ['dominio', 'De dominio', k => MASTERY.has(k)],
    ['clase', 'De clase', (k, s) => s.kind_es === 'habilidad de clase'],
    ['equipable', 'Equipables', (k, s) => s.kind_es === 'pasiva'],
    ['tecnica', 'Técnicas', (k, s) => s.kind_es === 'técnica de combate'],
    ['magia', 'Magia', (k, s) => /^magia/.test(s.kind_es || '')],
    ['ignicion', 'Ignición', (k, s) => s.kind_es === 'habilidad de ignición'],
    ['montura', 'De montura', (k, s) => s.kind_es === 'Habilidad de Montura'],
    ['halo', 'Halos', (k, s) => /^halo/.test(s.kind_es || '')],
    ['batallon', 'Tácticas de batallón', (k, s) => /batallón/.test(s.kind_es || '')],
    ['otras', 'Otras', () => true],
  ];
  const typeOf = (k, s) => TYPES.find(x => x[2](k, s))[0];
  const LABEL = Object.fromEntries(TYPES.map(([v, l]) => [v, l]));
  /** one row per name: the copy that is not an internal one ([e], other/hidden) and has a description wins */
  const ROWS = (() => {
    const by = new Map(), score = (k, s) => (/\[e\]|^SID_\[/.test(k) ? 0 : 4) + (s.kind_es === 'otro/oculto' ? 0 : 2) + (s.desc_es ? 1 : 0);
    Object.entries(SKILLS).filter(([, s]) => latin(s.es)).forEach(([k, s]) => {
      const n = norm(s.es), cur = by.get(n);
      if (!cur || score(k, s) > score(...cur)) by.set(n, [k, s]);
    });
    return [...by.values()].map(([k, s]) => ({ k, s, t: typeOf(k, s), n: norm(`${s.es} ${s.en || ''} ${s.desc_es || ''} ${s.desc_en || ''}`) }))
      .sort((a, b) => a.s.es.localeCompare(b.s.es, 'es'));
  })();
  const STEP = 120;
  /** a skill's picture: its own icon, else its base skill's («Aguijón+» → «Aguijón»), else the game's mask icon for its type */
  const TYPE_ICON = { personal: 'IconBasicStatus_Technique', dominio: 'IconPageTab_Sword', clase: 'IconPageTab_Sword', equipable: 'IconBasicStatus_Technique', tecnica: 'IconPageTab_Sword',
    magia: 'IconBasicStatus_Magic', ignicion: 'IconBasicStatus_Strength', montura: 'IconBasicStatus_Speed', halo: 'IconBasicStatus_Charm', batallon: 'IconPageTab_Unit', otras: 'IconBasicStatus_Luck' };
  const ICON_BY_NAME = new Map(Object.entries(SKILLS).filter(([k, s]) => s.es && ico().skill?.[k]).map(([k, s]) => [norm(s.es), ico().skill[k]]));
  const pic = r => img(ico().skill?.[r.k] || ICON_BY_NAME.get(norm(r.s.es.replace(/\s*\+$/, ''))), 'li-pic') ||
    `<img class="li-pic gi" src="img/ui/${TYPE_ICON[r.t]}.png" alt="" loading="lazy">`;
  const clip = s => { const c = String(s || '').replace(/\s+/g, ' '); return c.length > 90 ? c.slice(0, 88).replace(/\s\S*$/, '') + '…' : c; };
  /** chips() translates its labels; these carry a count, so they arrive translated and are shown as they are */
  const chipsN = (qs, key, opts, cur, label) => filterCtl('habilidades', qs, key, opts, cur, label, x => x);

  /** extra filter ?f=: skills with an area, with limited uses per battle, with a duration in turns */
  const FEAT = [['area', 'Con área', s => s.area && s.area.rows.join('') !== '1'], ['usos', 'Usos por batalla', s => s.uses_per_battle], ['turnos', 'Dura varios turnos', s => s.duration]];
  const featTxt = s => list([FEAT[0][2](s) ? t('área') : '', s.uses_per_battle ? plural(s.uses_per_battle, 'uso', 'usos') : '']);
  function listing(qs) {
    const ty = LABEL[qs.t] ? qs.t : '', q = norm((qs.q || '').trim()), f = FEAT.find(x => x[0] === qs.f);
    const rows = ROWS.filter(r => (!ty || r.t === ty) && (!q || r.n.includes(q)) && (!f || f[2](r.s)));
    if (isEn()) rows.sort((a, b) => nm(a.s).localeCompare(nm(b.s), 'en'));  // ROWS is in Spanish order
    const nOf = v => ROWS.filter(r => r.t === v).length;
    return `<h1>${t('Lista de habilidades')}</h1>${guiaLink('habilidades', 'tecnicas', 'ignicion')}` +
      `<div class="filters"><input type="search" name="q" data-qs="habilidades" value="${esc(qs.q || '')}" placeholder="${t('Nombre o efecto')}" aria-label="${t('Buscar por nombre o efecto')}"></div>` +
      chipsN(qs, 't', [['', t('Todos los tipos')], ...TYPES.map(([v, l]) => [v, `${t(l)} (${num(nOf(v))})`])], ty, 'Tipo') +
      chips('habilidades', qs, 'f', [['', 'Todas'], ...FEAT.map(([v, l]) => [v, l])], f ? f[0] : '', 'Características') +
      resultCount(rows.length, 'habilidad', 'habilidades') +
      (rows.length ? `<div class="li-grid">${rows.map((r, i) => `<a class="li-card" href="${href('habilidad', r.k)}"${i >= STEP ? ' hidden' : ''}>${pic(r)}` +
        `<span><b>${esc(nm(r.s))}</b><small>${esc(list([ty ? '' : t(LABEL[r.t]), featTxt(r.s), clip(tx(r.s, 'desc'))]))}</small></span></a>`).join('')}</div>` : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`) +
      (rows.length > STEP ? `<button type="button" class="fi-btn li-more" data-more="${STEP}">${t('Mostrar más')}</button>` : '');
  }

  const DT = () => (window.WIKI_EXT || {}).detalle || {};
  const BATS = () => Object.fromEntries((((window.WIKI_EXT || {}).guerra || {}).battalions || []).map(b => [b.id, b]));
  const obj = id => `${img(ico().item?.[id], 'ico')}${L('objeto', id)}`;
  /** area shape: rows from the facing side down; 1 = the unit, 2 = affected square, 3 = centre of the area (also affected) */
  const area = a => {
    const rows = a?.rows || [];
    if (!rows.length || rows.join('') === '1') return '';
    const cell = c => `<i class="ar-${c === '1' ? 'u' : c === '.' ? 'n' : 'h'}"></i>`;
    return `<span class="ar-grid" role="img" aria-label="${t('Área de efecto: {n} casillas; la unidad es la casilla marcada abajo y ataca hacia arriba', { n: rows.join('').split('').filter(c => c === '2' || c === '3').length })}">` +
      rows.map(r => `<span>${[...r].map(cell).join('')}</span>`).join('') + '</span>';
  };
  const cap = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  function habilidad(k) {
    const s = SKILLS[k];
    if (!s) return notFound();
    const H = s.holders || {}, B = BATS();
    const has = c => [c.skills, c.arts, c.ally_skills, c.mastery_skill].some(a => (a || []).some(x => x.id === k));
    const classes = [...new Set([...Object.entries(CLASSES).filter(([, c]) => has(c)).map(([id]) => id), ...(H.classes || []).filter(id => CLASSES[id])])].map(id => L('clase', id));
    const chars = [...(H.units || []).filter(p => CHARS[p]), ...Object.values(CHARS).filter(ch => (ch.p?.combat?.personal_skills || []).some(x => x.id === k)).map(ch => ch.id)].map(p => L('personaje', p));
    (DT().halos?.[k]?.who || []).forEach(w => chars.push(CHARS[w] ? L('personaje', w) : esc(gt(w))));
    const byProf = Object.entries(DT().learn || {}).flatMap(([pid, rows]) => rows.filter(r => r[2] === k).map(r => `${L('personaje', pid)} <small>(${esc(t(r[0]))} ${r[1]})</small>`));
    const up = DT().arts_plus?.[k], from = Object.entries(DT().arts_plus || {}).find(([, v]) => v[0] === k)?.[0];
    const mounts = (H.mounts || []).filter(r => MOUNTS[r]).map(r => {
      const pl = (MOUNTS[r].bond_skill_pool || []).find(x => x.stage1.id === k || x.stage2.id === k);
      return `${L('montura', r)}${pl ? ` <small>(${t('vínculo {n}', { n: pl.stage1.id === k ? 3 : 5 })}, ${pct(pl.pct)})</small>` : ''}`;
    });
    const bats = (H.battalions || []).map(id => (B[id] ? `<a href="${href('batallon', id)}">${esc(nm(B[id]))}</a>${B[id].gambit?.id === k ? ` <small>(${t('táctica')})</small>` : ''}` : '')).filter(Boolean);
    const isBat = /batallón/.test(s.kind_es || '');
    const gam = isBat ? Object.values(B).find(b => b.gambit?.id === k)?.gambit : null;
    const uses = s.uses_per_battle || gam?.uses;
    // quest-given personal skills (Leda's songs, Dietrich's secret arts) and Transmitir secreto, from learned_by
    const qWhen = q => (QUEST[q] ? ` <small>(${esc(list([questRoutesEs(QUEST[q]) && t('ruta de {r}', { r: questRoutesEs(QUEST[q]) }), questWhenEs(QUEST[q])]))})</small>` : '');
    /** nlx() in the reader's language: an entity's own name (nm), else the text through dx (nlx() shows the game table, which lacks most names) */
  const nlx = n => { if (n == null) return ''; const s = String(n), ex = NAME.get(norm(s)), h = ex || NAME.get(norm(s.replace(/\s*\(.*\)\s*$/, '')));
    return ex && LBL[ex[0]] ? L(ex[0], ex[1]) : h ? `<a href="${href(h[0], h[1])}">${esc(dx(s))}</a>` : esc(dx(s)); };
    const learn = (s.learned_by || []).flatMap(l => l.how === 'misión' ? (l.quests || []).map(q => t('{who} la aprende con la misión {q}', { who: nlx(l.who), q: L('mision', q) }) + qWhen(q))
      : l.how === 'Transmitir secreto' ? [t('{a} a otra unidad: {n} × {item}', { a: `<a href="#/senores?ir=dietrich">${esc(t('Transmitir secreto'))}</a>`, n: l.cost, item: ITEMS[l.item] ? L('objeto', l.item, l.item_es) : esc(gt(l.item_es)) }) +
        ` <small>(${t('ruta de Dietrich; en la Parte 3, en Dagsion')})</small>`] : []);
    return ficha(fichaHead(img(ico().skill?.[k], 'fi-pic'), `<a href="#/habilidades">${t('Habilidades')}</a> · <a href="#/guia/habilidades">${t('Guía')}</a>`, nm(s) || k, /\?|sin datos/.test(s.kind_es || '') ? '' : cap(dx(s.kind_es)),
      (tx(s, 'desc') ? `<p>${esc(tx(s, 'desc'))}</p>` : '') + kvRows([
        [t('Alcance'), s.range && s.range[1] ? s.range.join('–') : ''], [t('Área'), area(s.area)],
        [t('Usos por batalla'), uses ? String(uses) : ''], [t('Duración'), s.duration ? plural(s.duration, 'turno', 'turnos') : ''],
        [t('Poder · Golpe'), gam && (gam.might || gam.hit) ? `${gam.might ?? '—'} · ${gam.hit ?? '—'}` : ''],
        [t('Coste de PV'), s.hp_cost ? String(s.hp_cost) : ''], [t('Coste de usos'), s.durability_cost ? String(s.durability_cost) : ''],
        [t('Mejora'), up && `${L('habilidad', up[0])} · ${up[2]}× ${L('objeto', up[1])}`], [t('Mejora de'), from && L('habilidad', from)],
      ])), [
      ['quien', 'Quién la tiene', kvRows([[t('Cómo se aprende'), learn.join('<br>')], [t('Clases'), list(classes)], [t('Personajes'), list([...new Set(chars)])], [t('Por competencia'), list(byProf)],
        [t('Armas (técnica)'), list((H.weapon_arts || []).map(obj))], [t('Objetos que la dan al equiparlos'), list((H.items_equip || []).map(obj))],
        [t('Objetos que la enseñan'), list((H.items_teach || []).map(obj))], [t('Monturas (vínculo)'), list(mounts)],
        [t(isBat ? 'Batallones (táctica)' : 'Batallones'), list(bats)], [t('Misiones que la enseñan'), list((H.quests || []).map(q => L('mision', q)))]]) ||
        `<p class="mut">${t('Solo la usan enemigos o es un efecto interno del juego.')}</p>`],
    ]);
  }

  const CSS = `.ar-grid { display: inline-flex; flex-direction: column; gap: 1px; vertical-align: middle; }
.ar-grid > span { display: flex; gap: 1px; }
.ar-grid i { width: .85em; height: .85em; border-radius: 2px; background: transparent; }
.ar-grid i.ar-n { background: var(--line); opacity: .35; }
.ar-grid i.ar-h { background: var(--acc); }
.ar-grid i.ar-u { background: var(--gold); outline: 1px solid var(--line-strong); }`;

  register({ id: 'habilidades', title: 'Lista de habilidades', routes: ['habilidades', 'habilidad'], css: CSS, render: (id, qs) => (id ? habilidad(id) : listing(qs || {})), count: () => ROWS.length,
    search: () => [{ group: 'Secciones', label: 'Lista de habilidades', sub: 'Listado por tipo', href: '#/habilidades', aliases: ['habilidad', 'skills', 'tecnicas', 'pasivas'] }] });
})();
