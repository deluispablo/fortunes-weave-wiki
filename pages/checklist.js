/* Fortune's Weave · wiki2 · Mi partida › Checklist (#/checklist?r=&h=): recruits, missables, map chests, A/S supports, mounts, Desvíos
   and quests, one checkbox each. Ticks: store 'check' (fe2.check, a JSON list of ids); missables also read and write store 'perdibles'
   so #/perdibles and this page agree. ?r=<route> = that route's prologue and Part 1, ?r=p23 = Parts 2–3. Export: ckCode() / ckDecode().
   A row is a label (box and plain text: tapping anywhere on it ticks) plus one trailing link outside it (the chapter, or «›» to the page). */
'use strict';
const CK_B62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// shortcut: plain warnings among the missables are told apart by their wording (the data has no field); add a kind to rutas.json if more appear
const CK_NOTE = /^(Antes de la Parte \d|Conversaciones de apoyo C|Todas las misiones de la Parte)/;
const ckProse = s => { const e = t(s); return esc(e !== s ? e : sentence(factOnly(s))); };
const ckName = (kind, id) => esc(LBL[kind](id) ?? id);
/** [href, text] of a chapter link, or null */
const ckCap = key => (CAPS[key] ? [capHash(key), capShort(CAPS[key])] : null);
/** the checklist's sections: [id, title, rows, notes]. A row is [id, r → [label html (no links), href, link text ('' = «›»)], route test
    (r → bool, r = route id or 'p23'), order (r → number, optional)]; a note is [html, route test] */
let CK_ROWS = null;
function ckRows() {
  if (CK_ROWS) return CK_ROWS;
  const X = window.WIKI_EXT || {}, on = (pid, r) => !!CHARS[pid]?.routes?.[r];
  const BD = X.batallas || { b: [], terr: [] }, MP = X.batallas_mapas || {};
  const chests = b => { const m = MP[b.m]; return !m ? 0 : m.g.join('').split('').filter(c => /宝箱/.test(BD.terr[m.pal[CK_B62.indexOf(c)]]?.id || '')).length; };
  const pairMax = p => p.convs?.[p.max] || {};
  const recKey = (pid, r) => CHARS[pid].routes?.[r]?.recruit_key;
  const capN = key => (CAPS[key] ? CAPS[key].part * 100 + CAPS[key].n : 999);  // game order: part, then chapter
  const lords = Object.values(LORDS), ms = (X.rutas || {}).missables || [];
  const pdTest = m => r => (r === 'p23' ? m.part >= 2 : m.part <= 1 && (m.route === r || m.route === 'todas'));
  CK_ROWS = [
    ['rec', 'Reclutas', ((X.rutas || {}).recruits || []).filter(c => CHARS[c.pid] && !lords.includes(c.pid)).map(c => ['rec:' + c.pid,
      r => [ckName('personaje', c.pid), ...(ckCap(recKey(c.pid, r)) || [href('personaje', c.pid), ''])],
      r => (r === 'p23' ? !!c.p23 : c.routes?.[r]?.state === 'reclutable'),
      r => (r === 'p23' ? 999 : Math.min(...(r ? [r] : ROUTE_IDS).map(x => capN(recKey(c.pid, x)))))])],
    ['pd', 'Perdibles', ms.filter(m => !CK_NOTE.test(m.text)).map(m => ['pd:' + m.id, r => {
      const rt = m.route === 'todas' ? r : m.route, key = !m.ch ? '' : m.part === 1 ? `${rt}-1-${m.ch}` : `comun-${m.part}-${m.ch}`;
      // a Part 1 missable of every route with no route chosen: the chapter number, unlinked (it is the same on each route)
      return [ckProse(m.text), ...(ckCap(key) || ['', m.ch && m.part === 1 ? capShort(CAPS[`cai-1-${m.ch}`] || { part: 1, n: m.ch }) : ''])];
    }, pdTest(m)]), ms.filter(m => CK_NOTE.test(m.text)).map(m => [ckProse(m.text), pdTest(m)])],
    ['cf', 'Cofres de los mapas', BD.b.map(b => [b, chests(b)]).filter(([, n]) => n).map(([b, n]) => ['cf:' + b.id,
      () => [`${esc(gt(b.t) !== b.t ? gt(b.t) : tl(b.t))} · ${plural(n, 'cofre', 'cofres')}`, href('batalla', b.id), ''],
      r => (r === 'p23' ? b.p >= 2 : b.p <= 1 && (!b.r.length || b.r.includes(ROUTE_NAME[r])))])],
    ['ap', 'Apoyos A y S', ((X.apoyos || {}).pairs || []).filter(p => ['A', 'S'].includes(p.max) && CHARS[p.a] && CHARS[p.b]).map(p => ['ap:' + p.id,
      () => [`${ckName('personaje', p.a)} &amp; ${ckName('personaje', p.b)} · ${p.max}`, href('apoyo', p.id), ''],
      r => (r === 'p23' ? pairMax(p).part?.[1] >= 2 : pairMax(p).part?.[0] <= 1 && (!pairMax(p).route || pairMax(p).route === ROUTE_NAME[r]) && on(p.a, r) && on(p.b, r))])],
    ['mt', 'Monturas', Object.entries(MOUNTS).filter(([, m]) => !m.default_class_mount).map(([k, m]) => ['mt:' + k, () => [img(ico().mount?.[k], 'ico') + ckName('montura', k), href('montura', k), ''],
      r => { const a = m.availability || {}; return r === 'p23' || (a.how === 'cebo' ? !!a.p1_cai && r === 'cai' : a.how === 'personaje' && on(a.owner, r)); }])],
    ['ds', 'Desvíos', Object.values(PARA).map(p => ['ds:' + p.id, () => [ckName('desvio', p.id), href('desvio', p.id), ''], r => r !== 'p23' && !!p.routes?.[r]])],
    ['mi', 'Misiones', Object.values(QUEST).map(q => ['mi:' + q.id, () => [ckName('mision', q.id), href('mision', q.id), ''], r => (r === 'p23' ? q.part >= 2 : q.part <= 1 && (q.routes || ROUTE_IDS).includes(r))])],
  ];
  return CK_ROWS;
}
/** every id, sorted: the bit order of the export code */
let CK_IDS = null;
const ckIds = () => (CK_IDS ??= ckRows().flatMap(s => s[2].map(x => x[0])).sort());
/** a short tag of the id list: a code made on another data build (other lines, other bit order) is refused instead of misread */
const ckVer = () => { let h = 0; for (const c of ckIds().join('|')) h = (h * 31 + c.codePointAt(0)) >>> 0; return h.toString(36).slice(-4); };
/** ticked ids (fe2.check plus #/perdibles marks); anything malformed in storage reads as nothing */
function ckGet() {
  const a = store.get('check', []), p = store.get('perdibles', {});
  return new Set([...(Array.isArray(a) ? a.filter(x => typeof x === 'string') : []),
    ...(p && typeof p === 'object' && !Array.isArray(p) ? Object.keys(p).filter(k => p[k]).map(k => 'pd:' + k) : [])]);
}
function ckSet(s) {
  store.set('check', [...s]);
  const p = {}; s.forEach(id => { if (id.startsWith('pd:')) p[id.slice(3)] = 1; });
  store.set('perdibles', p);
}
/** a set of ids → «C2.<data tag>.<base64url bitset>» */
function ckCode(s) {
  const ids = ckIds(), bytes = new Uint8Array(Math.ceil(ids.length / 8));
  ids.forEach((id, i) => { if (s.has(id)) bytes[i >> 3] |= 1 << (i & 7); });
  let n = bytes.length; while (n && !bytes[n - 1]) n--;
  return `C2.${ckVer()}.` + btoa(String.fromCharCode(...bytes.slice(0, n))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
/** «C2.…» → a set of ids; null when it is no code, another data build's, or has no marks (it would only wipe them) */
function ckDecode(code) {
  const m = /^C2\.([0-9a-z]+)\.([A-Za-z0-9_-]+)$/.exec(String(code || '').trim()); if (!m || m[1] !== ckVer()) return null;
  let bin; try { bin = atob(m[2].replace(/-/g, '+').replace(/_/g, '/')); } catch (e) { return null; }
  const s = new Set(ckIds().filter((id, i) => (bin.charCodeAt(i >> 3) >> (i & 7)) & 1));
  return s.size ? s : null;
}
/** the import error (in the fold) and the last action's result (under the count): shown by the next render only */
let ckMsg = '', ckDone = '';
(() => {
  const see = lab => esc(t('Ver {x}', { x: unesc(lab.replace(/<[^>]*>/g, '')) }));  // «›» says where it goes
  const go = ([lab, h, text]) => (h ? `<a class="ck-go" href="${esc(h)}"${text ? '' : ` aria-label="${see(lab)}" title="${see(lab)}"`}>${text ? esc(text) : '›'}</a>`
    : text ? `<span class="ck-go">${esc(text)}</span>` : '');
  function page(qs) {
    const r = qs.r === 'p23' ? 'p23' : listRoute(qs), hide = qs.h === '1', ok = ckGet(), err = ckMsg, done = ckDone;
    ckMsg = ckDone = '';
    const ord = (x, i) => (x[3] ? x[3](r) : i);
    const secs = ckRows().map(([id, title, rows, notes = []]) => [id, title, rows.filter(x => !r || x[2](r)).map((x, i) => [x, ord(x, i)]).sort((a, b) => a[1] - b[1]).map(x => x[0]),
      notes.filter(x => !r || x[1](r))]);
    const all = secs.flatMap(s => s[2]), n = all.filter(x => ok.has(x[0])).length;
    const have = ctxGet().have.filter(p => !ok.has('rec:' + p) && ckIds().includes('rec:' + p));
    return `<h1>${t('Checklist')}</h1>` +
      chips('checklist', qs, 'r', [['todas', 'Todas las rutas'], ...ROUTE_IDS.map(x => [x, ROUTE_NAME[x]]), ['p23', 'Partes 2 y 3']], r || 'todas', 'Ruta') +
      chips('checklist', qs, 'h', [['', 'Mostrar todos'], ['1', 'Ocultar completados']], hide ? '1' : '', 'Completados') +
      `<p class="ck-sum">${t('<b>{n} de {all}</b> completados. Las marcas se guardan en este navegador.', { n: num(n), all: num(all.length) })}</p>` +
      (done ? `<p class="ck-done" id="ck-done" tabindex="-1">${esc(done)}</p>` : '') +
      (have.length ? `<p><button type="button" class="txtbtn" data-ck-have>${t('Marcar los reclutas que ya tienes en Equipo ({n})', { n: have.length })}</button></p>` : '') +
      `<details class="aj-paste"><summary>${t('Copiar o importar las marcas')}</summary><textarea id="ck-txt" rows="2" aria-label="${t('Código de las marcas')}" spellcheck="false">${esc(ckCode(ok))}</textarea>` +
      `<button type="button" class="txtbtn" data-ck-copy>${t('Copiar código')}</button><button type="button" class="txtbtn" data-ck-imp>${t('Importar código')}</button>` +
      `<p class="aj-err" id="ck-msg" role="alert">${esc(err)}</p></details>` +
      `<nav class="tabs" aria-label="${t('Apartados')}">${secs.filter(s => s[2].length).map(([id, title]) => `<button type="button" data-to="ck-${id}">${t(title)}</button>`).join('')}</nav>` +
      secs.filter(s => s[2].length).map(([id, title, rows, notes]) => {
        const shown = hide ? rows.filter(x => !ok.has(x[0])) : rows;
        return `<section class="card" id="ck-${id}"><h3>${t(title)} <small class="mut">${rows.filter(x => ok.has(x[0])).length}/${rows.length}</small></h3>` +
          (notes.length ? `<ul class="ck-note">${notes.map(([h]) => `<li>${h}</li>`).join('')}</ul>` : '') +
          (shown.length ? `<ul class="cp-list">${shown.map(([cid, lab]) => { const x = lab(r);
            return `<li class="pd-row ck-row"><label><input type="checkbox" data-ck="${esc(cid)}"${ok.has(cid) ? ' checked' : ''}><span>${x[0]}</span></label>${go(x)}</li>`; }).join('')}</ul>`
            : `<p class="mut">${t('Todo completado.')}</p>`) + '</section>';
      }).join('');
  }
  const say = s => { announce(s); document.getElementById('ck-done')?.focus(); };
  document.addEventListener('change', e => {
    const id = e.target.dataset?.ck; if (!id) return;
    const s = ckGet(); if (e.target.checked) s.add(id); else s.delete(id);
    ckSet(s); render(true);  // render keeps focus on this box (shell.js focus contract)
  });
  document.addEventListener('click', e => {
    if (e.target.closest?.('[data-ck-have]')) {
      const s = ckGet(), n0 = s.size; ctxGet().have.forEach(p => s.add('rec:' + p)); ckSet(s);
      const msg = ckDone = t('Reclutas marcados: {n}.', { n: s.size - n0 }); render(true); say(msg);
    }
    if (e.target.closest?.('[data-ck-copy]')) {
      const txt = document.getElementById('ck-txt')?.value || '';
      (navigator.clipboard?.writeText(txt) ?? Promise.reject()).then(() => announce(t('Código copiado')), () => { prompt(t('Copia este texto:'), txt); });
    }
    if (e.target.closest?.('[data-ck-imp]')) {
      const s = ckDecode(document.getElementById('ck-txt')?.value);
      if (!s) {  // the fold stays open (render keeps folds); the field gets focus so it can be fixed
        const msg = ckMsg = t('Ese código no es válido o es de otra versión de la wiki.'); render(true);
        document.getElementById('ck-txt')?.focus(); announce(msg); return;
      }
      const lost = [...ckGet()].filter(x => !s.has(x)).length;
      if (lost && !confirm(t('El código quita {n} marcas que tienes ahora. ¿Importarlo igualmente?', { n: lost }))) return;
      ckSet(s);
      const msg = ckDone = t('Marcas importadas: {n}.', { n: s.size }); render(true); say(msg);
    }
  });
  const CSS = '.ck-row{display:flex;align-items:flex-start;gap:var(--s2)}.ck-row label{flex:1;min-width:0}' +
    '.ck-go{flex:none;display:inline-flex;align-items:center;justify-content:center;min-width:var(--tap);min-height:var(--tap);margin-top:calc((24px - var(--tap)) / 2);font-size:var(--fs-small)}' +
    'span.ck-go{color:var(--mut)}.ck-note{margin:0 0 var(--s2);padding-left:1.2em;color:var(--tx2);font-size:var(--fs-small)}.ck-done{color:var(--green)}';
  register({ id: 'checklist', title: 'Checklist', render: (id, qs) => page(qs || {}), css: CSS });
})();
