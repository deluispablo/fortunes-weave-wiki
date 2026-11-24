/* Fortune's Weave · wiki2 · game script: index (#/guion), one script file by scene (#/guion/<file>?ir=e-<scene>) and character or
   battle lines (#/frases/<pid|battle>). Data: WIKI_EXT.guion and .frases (index); the texts load on demand from ext/*_textos.data.js.
   Texts load with extText/extWait (core.js); guionLinks.* give other pages their links. */
'use strict';
/** links from other pages into the script: [[href, label]] */
const guionLinks = { chapter: () => [], battle: () => [], quest: () => [], para: () => [] };
(() => {
  const X = window.WIKI_EXT || {}, G = X.guion, FR = X.frases;
  if (!G) return;
  /** data prose or game text in the reader's language: the wiki dictionary (i18n/en/data-*.json) first, else the game's own English */
  const dx = s => (s && isEn() && !((EN_DICT().ui || {})[s] != null) ? gt(s) : t(s));
  const FILES = Object.fromEntries(G.files.map(f => [f.f, f]));
  const PART = ['Prólogo', 'Parte 1', 'Parte 2', 'Parte 3'];
  const part = p => (PART[p] ? t(PART[p]) : '');
  const BAT = () => (window.WIKI_EXT || {}).batallas?.b || [];
  const who = w => (CHARS[w] ? L('personaje', w) : esc(w));
  const capTitle = k => { const [r, p, n] = String(k).split('-'); return CAPS[k] ? `${capShort(CAPS[k])} · ${gt(CAPS[k].es)}` : `${LORD_ALL[r] || r} · ${part(p)} · ${t('cap. {n}', { n })}`; };
  /** the paralogue a SideStory file belongs to (through its battle, SCXX_nn) */
  const batOf = f => { const m = (f.sc || []).map(s => s[0].match(/SCXX_\d+/)).find(Boolean); return m && BAT().find(x => x.id === m[0]); };
  const paraOf = f => { const b = batOf(f); return b?.ss && PARA[b.ss] ? b.ss : null; };
  const lordOfFile = f => LORD_ALL[G.meta.lords[String(f.f).split('_')[1]]] || '';
  function title(f) {
    if (f.fam === 'historia') return capTitle(f.k);
    if (f.fam === 'bases') {
      if (f.k) return t('Conversaciones · {c}', { c: capTitle(f.k) });
      const m = f.f.match(/_M(\d+)$/), lord = LORD_ALL[G.meta.lords[(f.f.match(/^LG_\d_?([A-Z]{3})_/) || [])[1]]];
      return m ? t('Conversaciones del mes {m} · {p}', { m: +m[1], p: part(f.p) }) : /cAssist$/.test(f.f) ? t('Conversaciones de ayuda · {p}', { p: part(f.p) }) + (lord && lord !== 'comun' ? ' · ' + lord : '') : t('Conversaciones comunes');
    }
    if (f.fam === 'video') return f.sc[0][1] ? dx(f.sc[0][1]) : t('Vídeo');
    if (f.fam === 'desvio') { const p = paraOf(f); return `${p ? nm(PARA[p]) : batOf(f) ? gt(batOf(f).t) : t('Desvío')}${f.f.startsWith('LG_') ? ' ' + t('(en el mapa)') : ''}`; }
    if (f.fam === 'batalla') return `${t('Diálogos en batalla')} · ${part(f.p)}${f.p === 1 ? ` · ${lordOfFile(f)}` : ''}`;
    return G.meta.fam[f.fam] ? dx(G.meta.fam[f.fam]) : f.f;
  }
  const gh = (f, scene) => `#/guion/${encodeURIComponent(f)}${scene ? `?ir=e-${encodeURIComponent(scene)}` : ''}`;
  const ghA = (f, label) => `<a href="${gh(f.f)}">${esc(label ?? title(f))}</a>`;

  // labels in the reader's language (callers show them as they are)
  guionLinks.chapter = k => G.files.filter(f => f.k === k && (f.fam === 'historia' || f.fam === 'bases')).map(f => [gh(f.f), t(f.fam === 'historia' ? 'Guion del capítulo' : 'Conversaciones en la base')]);
  guionLinks.battle = id => G.files.filter(f => (f.fam === 'batalla' || f.fam === 'torneo') && (f.sc || []).some(s => s[0] === id)).map(f => [gh(f.f, id), t('Diálogos de la batalla')]);
  guionLinks.quest = qid => { const f = FILES.SubQuest; return f ? Object.entries(f.q || {}).filter(([, q]) => q === qid).map(([s], i, a) => [gh(f.f, s), a.length > 1 ? t('Diálogos ({n})', { n: i + 1 }) : t('Diálogos')]) : []; };
  guionLinks.para = pid => G.files.filter(f => f.fam === 'desvio' && paraOf(f) === pid).map(f => [gh(f.f), t(f.f.startsWith('LG_') ? 'Diálogo en el mapa' : 'Guion del desvío')]);

  /* ---------- lines ---------- */
  const txt = s => esc(s).replace(/\n/g, '<br>');
  /** [who, text, mark]: ?A is a choice, A an answer to it (indented), who null without a mark is narration */
  const lines = ls => (ls || []).map(([w, s, m]) => (m && m[0] === '?' ? `<p class="ap-l gn-l gn-opt"><span class="rk">${esc(m.slice(1))}</span> ${txt(s)}</p>`
    : `<p class="ap-l gn-l${m ? ' gn-ans' : ''}">${w ? `<b>${who(w)}</b>` : ''}${txt(s)}</p>`)).join('') || `<p class="mut">${t('Sin texto.')}</p>`;
  const names = ws => list((ws || []).filter(w => CHARS[w]).map(w => esc(nm(CHARS[w]))));
  const fold = (id, sum, body) => `<details class="ap-c" id="${esc(id)}"><summary>${sum}</summary>${body}</details>`;

  function file(id) {
    const f = FILES[id];
    if (!f) return notFound();
    const T = extText(f.tx), D = T?.[f.f] || {};
    let scenes;
    if (f.sc) scenes = f.sc.map(([s, st, n, ws, rec], i) => fold('e-' + s, `<b>${esc(st ? dx(st) : t('Escena {n}', { n: i + 1 }))}</b> <span class="mut">· ${plural(n, 'línea', 'líneas')}${ws.length ? ' · ' + names(ws) : ''}${rec ? ' · ' + t('en Recuerdos') : ''}</span>`,
      T ? lines([...(D[s] || []), ...Object.keys(D).filter(k => k.startsWith(s + '_')).flatMap(k => D[k])]) : extWait(f.tx)));
    else scenes = T ? Object.entries(D).map(([s, ls], i) => {  // bases and missions: the scene list is in the text
      const q = f.q?.[s] && QUEST[f.q[s]];
      return fold('e-' + s, `<b>${q ? esc(nm(q)) : t('Escena {n}', { n: i + 1 })}</b> <span class="mut">· ${plural(ls.length, 'línea', 'líneas')}${names([...new Set(ls.map(l => l[0]))]) ? ' · ' + names([...new Set(ls.map(l => l[0]))]) : ''}</span>`, lines(ls));
    }) : [extWait(f.tx)];
    const p = f.fam === 'desvio' && paraOf(f);
    const sib = f.k ? G.files.filter(x => x.k === f.k && x !== f && (x.fam === 'historia' || x.fam === 'bases')) : [];
    const rel = list([f.k && CAPS[f.k] ? `<a href="${capHash(f.k)}">${esc(capShort(CAPS[f.k]))}</a>` : '', ...sib.map(x => ghA(x, t(x.fam === 'historia' ? 'Guion del capítulo' : 'Conversaciones en la base'))),
      p ? L('desvio', p) : batOf(f) ? `<a href="${href('batalla', batOf(f).id)}">${t('Batalla')}</a>` : '', f.fam === 'video' ? `<a href="#/archivo?t=videos">${t('Vídeos')}</a>` : '']);
    return fichaHead('', `<a href="#/guion">${t('Guion')}</a> · ${esc(G.meta.fam[f.fam] ? dx(G.meta.fam[f.fam]) : '')}`, title(f), `${plural(f.sc ? f.sc.length : f.ns, 'escena', 'escenas')} · ${plural(f.n, 'línea', 'líneas')}`) +
      `<p class="mut"><span class="ap-sp">spoiler</span> ${t('Texto íntegro del juego, escena a escena.')}${rel ? ' ' + rel : ''}</p>` +
      `<section class="card gn-sc">${scenes.join('')}</section>`;
  }

  function index() {
    const fam = k => G.files.filter(f => f.fam === k);
    const li2 = f => `<li><b>${ghA(f)}</b><small>${plural(f.sc ? f.sc.length : f.ns, 'escena', 'escenas')}</small></li>`;
    const byChap = fs => {
      const groups = new Map();
      fs.forEach(f => { const [r, p] = String(f.k || '').split('-'), g = !f.k ? t('Por mes y comunes') : r === 'comun' ? part(p) : `${LORD_ALL[r] || r} · ${t('Parte 1')}`; groups.set(g, [...(groups.get(g) || []), f]); });
      const here = ctxChosen() ? ROUTE_NAME[ctxGet().route] + ' · ' + t('Parte 1') : null;  // nothing picked: no group opens
      return [...groups].map(([g, xs]) => `<details${g === here ? ' open' : ''}><summary><b>${esc(g)}</b> <span class="mut">${xs.length}</span></summary><ul class="cp-list">${xs.map(li2).join('')}</ul></details>`).join('');
    };
    const other = ['batalla', 'desvio', 'resumen', 'torneo', 'interrupcion', 'mision'].flatMap(fam);
    return `<h1>${t('Guion')}</h1>${guiaLink('historia')}<p class="mut">${t('Todo el texto del juego por capítulo y escena, con quién habla.')} <span class="ap-sp">spoiler</span></p>` +
      card(t('Historia por capítulo'), byChap(fam('historia'))) +
      card(t('Conversaciones en bases y mapa'), byChap(fam('bases'))) +
      card(t('Desvíos, batallas y misiones'), `<ul class="cp-list">${other.map(li2).join('')}</ul>`) +
      `<p>${t('Memorias, obeliscos, adivinación y vídeos: {a}.', { a: `<a href="#/archivo">${t('Archivo')}</a>` })}</p>`;
  }

  /* ---------- frases ---------- */
  function frases(id) {
    const T = extText('frases_textos');
    if (CHARS[id] && FR?.by[id]) {
      const by = FR.by[id], kinds = Object.keys(FR.kinds).filter(k => by[k]);
      const item = x => `<p class="ap-l gn-l">${Array.isArray(x) ? x.map(txt).join('<br>') : txt(x)}</p>`;
      return fichaHead(img(ico().face?.[id], 'fi-thumb'), `${L('personaje', id)} · <a href="#/guion">${t('Guion')}</a>`, t('Frases de {c}', { c: nm(CHARS[id]) }), plural(kinds.reduce((s, k) => s + by[k], 0), 'frase', 'frases')) +
        `<section class="card gn-sc">${kinds.map(k => fold('fr-' + k, `<b>${esc(dx(FR.kinds[k]))}</b> <span class="mut">${by[k]}</span>`,
          T ? (T[id]?.[k] || []).map(item).join('') || `<p class="mut">${t('Sin texto.')}</p>` : extWait('frases_textos'))).join('')}</section>`;
    }
    const b = BAT().find(x => x.id === id);
    if (!FR?.battles[id] || !b) return notFound();
    return fichaHead('', `<a href="${href('batalla', id)}">${esc(gt(b.t))}</a>`, t('Frases al caer · {b}', { b: gt(b.t) }), plural(FR.battles[id], 'frase', 'frases')) +
      `<section class="card gn-sc">${T ? lines(T._batallas?.[id]) : extWait('frases_textos')}</section>`;
  }
  /** the ficha block: kinds with their counts, the text on its own page */
  window.frasesBlock = pid => {
    const by = FR?.by[pid]; if (!by) return '';
    const n = Object.values(by).reduce((s, x) => s + x, 0);
    return `<details><summary>${t('Frases')} <span class="mut">${n}</span></summary><ul class="cp-list">${Object.keys(FR.kinds).filter(k => by[k]).map(k =>
      `<li><a href="${href('frases', pid)}?ir=fr-${k}">${esc(dx(FR.kinds[k]))}</a> <span class="mut">${by[k]}</span></li>`).join('')}</ul></details>`;
  };

  const CSS = `
.gn-sc { max-width: 80ch; }
.gn-l { margin: 6px 0; }
.gn-opt { margin-top: var(--s2); color: var(--tx2); }
.gn-ans { margin-left: var(--s4); padding-left: var(--s2); border-left: 2px solid var(--line); }
.gn-sc .fold-p { padding-bottom: var(--s2); }`;
  register({ id: 'guion', title: 'Guion', routes: ['guion', 'frases'], css: CSS,
    count: () => G.files.reduce((s, f) => s + (f.sc ? f.sc.length : f.ns || 0), 0),
    render: (id, qs, sec) => (sec === 'frases' ? frases(id) : id ? file(id) : index()),
    // labels in the reader's language; the Spanish titles stay searchable
    search: () => [
      { group: 'Historia', label: 'Guion', sub: 'Texto del juego por escena', href: '#/guion', aliases: ['dialogos', 'historia', 'script', 'escenas'] },
      ...G.files.filter(f => f.fam === 'historia' || f.fam === 'video').flatMap(f => f.sc.filter(s => s[1]).map(s => ({ group: 'Historia', label: dx(s[1]), sub: title(f), href: gh(f.f, s[0]), aliases: [s[1]] }))),
      ...Object.keys(FR?.by || {}).filter(p => CHARS[p]).map(p => ({ group: 'Historia', label: t('Frases de {c}', { c: nm(CHARS[p]) }), sub: 'Frases', href: href('frases', p), aliases: [CHARS[p].es] })),
    ] });
})();
