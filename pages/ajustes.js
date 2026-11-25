/* Fortune's Weave · wiki · Ajustes (#/ajustes): theme (store 'tema', read before the CSS by index.html) and a copy of «mi selección»
   (fe2.ctx + fe2.tabs) as a link (#/importar/<base64url JSON>), clipboard text or a .json file. Every import goes through
   #/importar/…, which validates and asks before replacing. No QR: it would need a third-party library. */
'use strict';
const SEL_APP = 'fw-wiki', SEL_FMT = 1;
const b64url = s => btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = s => new TextDecoder().decode(Uint8Array.from(atob(String(s).replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)));
/** what travels: the stored context as is (ctxGet() would fill defaults) and the remembered tabs */
const selExport = () => ({ app: SEL_APP, fmt: SEL_FMT, ctx: store.get('ctx', null), tabs: store.get('tabs', {}) || {} });
const selLink = (base = '') => base + '#/importar/' + b64url(JSON.stringify(selExport()));
/** untrusted input (object, JSON text or link payload) → {ok, sel: {ctx, tabs}} or {ok: false, error}; never throws */
function selParse(input) {
  let o = input;
  try {
    if (typeof o === 'string') { const t = o.trim(); o = JSON.parse(t.startsWith('{') ? t : unb64url(t.replace(/^.*#\/importar\//, ''))); }
  } catch (e) { return { ok: false, error: 'El texto no es una copia válida de la selección.' }; }
  if (!o || typeof o !== 'object' || o.app !== SEL_APP) return { ok: false, error: 'No es una copia de esta wiki.' };
  if (o.fmt !== SEL_FMT) return { ok: false, error: 'La copia es de otra versión del formato.' };
  const c = o.ctx;
  if (c != null && (typeof c !== 'object' || Array.isArray(c))) return { ok: false, error: 'La selección está dañada.' };
  if (c && (!ROUTE_IDS.includes(c.route) || !CAPS[c.key])) return { ok: false, error: 'La ruta o el capítulo no existen.' };
  if (c && ['team', 'recruits', 'have', 'drop'].some(k => c[k] != null && !(Array.isArray(c[k]) && c[k].every(p => typeof p === 'string'))))
    return { ok: false, error: 'La lista de reclutas está dañada.' };
  const tabs = o.tabs == null ? {} : o.tabs;
  if (typeof tabs !== 'object' || Array.isArray(tabs) || Object.values(tabs).some(v => typeof v !== 'string')) return { ok: false, error: 'Las pestañas guardadas están dañadas.' };
  // only the known fields (unknown pids dropped); older copies with «quiero» and «tengo» lists read as one team
  const ctx = c && { route: c.route, key: c.key, team: ctxTeamRaw(c), got: ctxGotRaw(c).filter(p => ctxTeamRaw(c).includes(p)), drop: ctxPids(c.drop), ...(typeof c.fold === 'boolean' ? { fold: c.fold } : {}),
    ...(ctxObj(c.plan) ? { plan: ctxPlanAll(c) } : {}) };  // Equipo's hand picks, validated (ctxPicks)
  return { ok: true, sel: { ctx, tabs: Object.fromEntries(Object.entries(tabs).filter(([k, v]) => k.length < 40 && v.length < 40)) } };
}
const selSummary = ctx => (ctx ? `${t('Ruta {r}', { r: ROUTE_NAME[ctx.route] })} · ${capShort(CAPS[ctx.key])} · ${teamCountTxt(teamCounts(ctx.route, ctx.key, ctx))}` : t('Sin ruta ni reclutas elegidos'));
const selApply = sel => { if (sel.ctx) store.set('ctx', sel.ctx); else { try { localStorage.removeItem('fe2.ctx'); } catch (e) { /* no storage */ } } store.set('tabs', sel.tabs); };

const LANG_NAMES = [['es', 'Español'], ['en', 'English']];  // i18n-ignore (each language named in itself)
const THEMES = [['auto', 'Sistema'], ['light', 'Claro'], ['dark', 'Oscuro']];
function setTheme(t) {
  store.set('tema', t);
  const root = document.documentElement;
  if (t === 'light' || t === 'dark') root.dataset.theme = t; else delete root.dataset.theme;
  // theme-color stays #102020 (index.html) in every theme: the header is the game's ink panel in light and dark alike
}

(() => {
  const ver = () => {
    const s = (window.WIKI_SCRIPTS || [])[0], v = s && s.split('v=')[1];
    const off = { on: 'Disponible sin conexión.', fail: 'Este navegador no permite el modo sin conexión.', next: 'El modo sin conexión se activa en la próxima visita.', none: 'Sin modo sin conexión: hace falta HTTPS.' }[offlineState()];
    const [y, m, d] = String(W.meta?.built || '').split('-').map(Number);
    return `<p class="mut aj-ver">${t('Versión {v} · datos del {d}.', { v: esc(v || 'local'), d: y ? dateTx(y, m, d) : '' })} ${off ? t(off) : ''}</p><p class="mut aj-ver">${LEGAL()}</p>`;
  };
  function ajustes() {
    const th = store.get('tema', 'auto');
    return `<h1>${t('Ajustes')}</h1>` +
      // the two names are each in their own language (and lang=): a reader who cannot read the current one still finds theirs
      card(t('Idioma'), `<div class="chips" role="group" aria-label="${t('Idioma')}">${LANG_NAMES.map(([v, l]) =>
        `<button type="button" class="chip${v === LANG ? ' on' : ''}" data-lang="${v}" lang="${v}" aria-pressed="${v === LANG}">${l}</button>`).join('')}</div>` +
        `<p class="mut">${t('Los nombres y textos del juego salen de su versión en inglés; las guías aún sin traducir se muestran en español.')}</p>`) +
      card(t('Tema'), `<div class="chips" role="group" aria-label="${t('Tema')}">${THEMES.map(([v, l]) =>
        `<button type="button" class="chip${v === th ? ' on' : ''}" data-tema="${v}" aria-pressed="${v === th}">${t(l)}</button>`).join('')}</div>`) +
      card(t('Mi selección'), `<p class="mut">${t('Ruta, capítulo, reclutas y pestañas abiertas. Sirve de copia o para seguir en otro dispositivo.')}</p>` +
        `<p class="mut">${esc(selSummary(selParse(selExport()).sel?.ctx))}</p>` +
        `<div class="aj-acts" role="group" aria-label="${t('Exportar')}"><button type="button" class="txtbtn" data-aj="link">${t('Copiar enlace')}</button>` +
        `<button type="button" class="txtbtn" data-aj="copy">${t('Copiar texto')}</button><button type="button" class="txtbtn" data-aj="file">${t('Descargar .json')}</button></div>` +
        `<div class="aj-acts" role="group" aria-label="${t('Importar')}"><label class="txtbtn aj-file">${t('Cargar .json')}<input type="file" accept="application/json,.json" data-aj="load" class="sr-only"></label></div>` +
        `<details class="aj-paste"><summary>${t('Pegar un enlace o un texto copiado')}</summary><textarea id="aj-txt" rows="3" aria-label="${t('Enlace o texto de la copia')}" spellcheck="false"></textarea>` +
        `<button type="button" class="txtbtn" data-aj="paste">${t('Revisar e importar')}</button><p class="aj-err" id="aj-msg" role="alert"></p></details>`) + ver();
  }
  function importar(id) {
    const r = selParse(id || '');
    if (!r.ok) return `<h1>${t('Importar selección')}</h1><p class="aj-err" role="alert">${esc(t(r.error))}</p><p><a href="#/ajustes">${t('Volver a Ajustes')}</a></p>`;
    return `<h1>${t('Importar selección')}</h1>` + card(t('Se recibe'), `<p>${esc(selSummary(r.sel.ctx))}</p>` +
      `<p class="mut">${t('Reemplaza tu selección actual: {s}.', { s: esc(selSummary(selParse(selExport()).sel?.ctx)) })}</p>` +
      `<div class="aj-acts"><button type="button" class="txtbtn" data-aj="apply" data-p="${esc(id)}">${t('Reemplazar mi selección')}</button><a class="txtbtn txtbtn-2" href="#/ajustes">${t('Cancelar')}</a></div>`);
  }
  register({ id: 'ajustes', title: 'Ajustes', routes: ['ajustes', 'importar'], nav: false,  // behind the header gear, not in the menu (R-AJU)
    render: (id, qs, sec) => (sec === 'importar' ? importar(id) : ajustes()),
    css: '.aj-paste textarea{display:block;width:100%;margin:var(--s2) 0;font:inherit;font-size:var(--fs-small);background:var(--surface2);color:var(--tx);border:1px solid var(--line-strong);border-radius:var(--r1);padding:var(--s2)}' +
      '.aj-acts{display:flex;flex-wrap:wrap;gap:0 var(--s2);margin:0 0 var(--s2) calc(-1 * var(--s2))}.aj-paste summary{cursor:pointer;min-height:var(--tap);display:flex;align-items:center;color:var(--acc)}.aj-err{color:var(--red)}.aj-err:empty{display:none}.aj-file{cursor:pointer}.aj-file:focus-within{outline:2px solid var(--focus);outline-offset:2px}' });

  const goImport = payload => { location.hash = '#/importar/' + payload; };
  // pasted text, a pasted link or a file: all end on #/importar/…, which validates and shows the error or asks for confirmation
  const fromText = txt => {
    const v = String(txt).trim();
    if (v) goImport(v.startsWith('{') ? b64url(v) : v.replace(/^.*#\/importar\//, ''));
    else { const m = document.getElementById('aj-msg'); if (m) m.textContent = t('Pega primero un enlace o un texto copiado.'); document.getElementById('aj-txt')?.focus(); }
  };
  const copy = (txt, ok) => (navigator.clipboard?.writeText(txt) ?? Promise.reject()).then(() => announce(t(ok)), () => { prompt(t('Copia este texto:'), txt); });
  document.addEventListener('click', e => {
    const b = e.target.closest?.('[data-tema],[data-aj]');
    if (!b || b.tagName === 'INPUT') return;
    if (b.dataset.tema) { setTheme(b.dataset.tema); render(true); document.querySelector(`[data-tema="${b.dataset.tema}"]`)?.focus(); announce(t('Tema') + ': ' + b.textContent); return; }  // the page was redrawn: focus the new copy
    const a = b.dataset.aj;
    if (a === 'link') copy(selLink(location.href.split('#')[0]), 'Enlace copiado');
    else if (a === 'copy') copy(JSON.stringify(selExport()), 'Texto copiado');
    else if (a === 'file') {
      const u = URL.createObjectURL(new Blob([JSON.stringify(selExport(), null, 1)], { type: 'application/json' }));
      const x = Object.assign(document.createElement('a'), { href: u, download: `fw-wiki-seleccion-${new Date().toISOString().slice(0, 10)}.json` });
      document.body.appendChild(x); x.click(); x.remove(); setTimeout(() => URL.revokeObjectURL(u), 1000);
    } else if (a === 'paste') fromText(document.getElementById('aj-txt')?.value || '');
    else if (a === 'apply') {
      const r = selParse(b.dataset.p);
      if (!r.ok) return;
      selApply(r.sel);
      location.replace(location.href.split('#')[0] + '#/equipo');
      announce(t('Selección importada'));
    }
  });
  document.addEventListener('change', e => {
    const f = e.target.dataset?.aj === 'load' && e.target.files?.[0];
    if (f) (f.size > 200000 ? Promise.resolve('x') : f.text()).then(fromText);  // a selection is ~2 KB: anything huge is not one
  });
})();
