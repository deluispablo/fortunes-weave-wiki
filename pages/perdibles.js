/* Fortune's Weave · wiki2 · Min-max › Perdibles por ruta (#/perdibles): tipo · ruta · fecha límite · «Si se pierde: …»,
   counter «n de N», «ocultar completados», jumps by part; marks live in store 'perdibles' (fe2.perdibles).
   Own file so pages/minmax.js (guide, builds, recruits, tricks) stays separate. */
'use strict';
/* shared date helpers (no js/ slot in the build list, so they live here; pages load alphabetically and only call them at render time) */
const FECHA_MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
/** '1449-04-18' → '18 abr' (English 'Apr 18') */
const fechaDia = s => { const [, m, d] = String(s).split('-').map(Number); return isEn() ? dateTx(0, m, d) : `${d} ${FECHA_MES[m - 1]}`; };
/** '1449-04-18' → '18 abr 1449' (English 'Apr 18, 1449') */
const fechaDiaAno = s => { const [y, m, d] = String(s).split('-').map(Number); return isEn() ? dateTx(y, m, d) : `${fechaDia(s)} ${y}`; };
/** game 'month/day' ('2/1') → '1 feb' (English 'Feb 1') */
const fechaMD = s => { const m = String(s || '').match(/^(\d{1,2})\/(\d{1,2})$/); return m ? (isEn() ? dateTx(0, +m[1], +m[2]) : `${+m[2]} ${FECHA_MES[+m[1] - 1]}`) : esc(s || ''); };
(() => {
  const day = fechaDia;
  const PART = ['Prólogo', 'Parte 1', 'Parte 2', 'Parte 3'];
  const TIPO = [[/^p-/, 'Desvío', 'id'], [/escena/i, 'Escena'], [/cofre|orbes|marcador/i, 'Cofre'], [/misi[oó]n|peticiones|guerreros temibles/i, 'Misión'],
    [/apoyo C/i, 'Apoyo'], [/sobrevivir|golpe final|desvío|no salen/i, 'Recluta'], [/\+1|objetos equipados|armas|anillo|escudo/i, 'Objeto']];
  const tipo = m => t((TIPO.find(([re, , on]) => re.test(on ? m.id : m.text)) || [, 'Evento'])[1]);
  /** wiki prose: the English text when the dictionary has it (written without sources), else the Spanish fact */
  const prose = s => { const e = t(s); return e !== s ? e : sentence(factOnly(s)); };

  /** [chapter key, closing row] of a missable on `route` ('' = not chosen): paralogue rows close as 'desvio' entries */
  function closingOf(m, route) {
    const desvio = m.id.startsWith('p-') ? m.id.split('-').slice(2).join('-') : null;
    const r = m.route === 'todas' ? route : m.route;
    for (const c of Object.values(CAPS)) {
      if (c.part !== m.part || (c.route !== 'comun' && c.route !== r)) continue;
      const x = c.closing.find(y => (desvio ? y.kind === 'desvio' && y.id === desvio : y.kind === 'perdible' && y.id === m.id));
      if (x) return [c.key, x];
    }
    return null;
  }

  function row(m, r, ok) {
    const cl = closingOf(m, r), done = !!ok[m.id];
    const dl = cl ? `${cl[1].deadline ? t('hasta el {d}', { d: day(cl[1].deadline) }) : t('hasta el final del capítulo')} · ${chapLink(cl[0])}`
      : m.ch ? (m.part === 0 ? t('al terminar el prólogo {n}', { n: m.ch }) : t(m.route === 'todas' && m.part === 1 ? 'al terminar el cap. {c} de cada ruta' : 'al terminar el cap. {c}', { c: `${m.part}-${m.ch}` }))
      : m.part === 0 ? t('antes del final del prólogo') : t('antes del final de la {p}', { p: t(PART[m.part]) });
    const lost = t(cl ? cl[1].if_missed : 'No se puede recuperar más adelante.');
    return `<li class="pd-row${done ? ' on' : ''}"><label><input type="checkbox" data-pd="${esc(m.id)}"${done ? ' checked' : ''}>` +
      `<span><span class="pd-meta"><span class="cp-tag">${tipo(m)}</span> · <b>${m.route === 'todas' ? t('Todas las rutas') : esc(ROUTE_NAME[m.route])}</b> · <span class="cp-dl">${dl}</span></span>` +
      `${esc(prose(m.text))}<small>${t('Si se pierde: {x}', { x: esc(lost) })}</small></span></label></li>`;
  }

  function perdibles(qs) {
    const r = listRoute(qs), hide = qs.h === '1', ok = store.get('perdibles', {}) || {};
    const all = ((window.WIKI_EXT || {}).rutas?.missables || []).filter(m => !r || m.route === r || m.route === 'todas')
      .map(m => [m, closingOf(m, r)]).sort(([a, ca], [b, cb]) => a.part - b.part || (a.ch ?? 99) - (b.ch ?? 99) ||
        String(ca?.[1].deadline ?? '9').localeCompare(String(cb?.[1].deadline ?? '9')) || a.route.localeCompare(b.route)).map(x => x[0]);
    const n = all.filter(m => ok[m.id]).length, shown = hide ? all.filter(m => !ok[m.id]) : all;
    const parts = PART.map((pt, p) => [p, t(pt), shown.filter(m => m.part === p)]).filter(x => x[2].length);
    return `<h1>${t('Perdibles por capítulo')}</h1>${guiaLink('perdibles')}${routeChips('perdibles', qs, r)}` +
      chips('perdibles', qs, 'h', [['', 'Mostrar todos'], ['1', 'Ocultar completados']], hide ? '1' : '', 'Completados') +
      `<p class="pd-count">${t('<b>{n} de {all}</b> completados. Las marcas se guardan en este navegador.', { n: num(n), all: num(all.length) })}</p>` +
      `<p class="mut">${t('Conversaciones de apoyo que dejan de verse:')} <a href="#/apoyos?v=p1">${t('al acabar la Parte 1')}</a> · <a href="#/apoyos?v=p2">${t('al acabar la Parte 2')}</a>.</p>` +
      (parts.length > 1 ? `<nav class="tabs" aria-label="${t('Partes')}">${parts.map(([p, pt]) => `<button type="button" data-to="pd-p${p}">${pt}</button>`).join('')}</nav>` : '') +
      (parts.map(([p, pt, xs]) => `<section class="card" id="pd-p${p}"><h3>${pt} <small class="mut">(${xs.length})</small></h3><ul class="cp-list pd-list">${xs.map(m => row(m, r, ok)).join('')}</ul></section>`).join('') ||
        `<p class="mut">${t('Nada pendiente con estos filtros.')}</p>`);
  }

  document.addEventListener('change', e => {
    const id = e.target.dataset?.pd;
    if (!id) return;
    const ok = store.get('perdibles', {}) || {};
    if (e.target.checked) ok[id] = 1; else delete ok[id];
    store.set('perdibles', ok);
    render(true);
    document.querySelector(`[data-pd="${window.CSS.escape(id)}"]`)?.focus({ preventScroll: true });  // the re-render keeps the focus on the box
  });

  register({ id: 'perdibles', title: 'Perdibles por capítulo', render: (id, qs) => perdibles(qs || {}) });
})();
