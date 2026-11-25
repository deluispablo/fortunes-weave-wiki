/* Fortune's Weave · wiki2 · Archivo (#/archivo?t=memorias|obeliscos|adivinacion|videos): EX-zone memories, the route obelisks,
   the 64 divination hexagrams and the videos. Data: WIKI_EXT.lore; memory pages and readings load on demand (lore_textos, via extText in core.js). */
'use strict';
(() => {
  const LO = (window.WIKI_EXT || {}).lore;
  if (!LO) return;
  /** data prose or game text in the reader's language: the wiki dictionary (i18n/en/data-*.json) first, else the game's own English */
  const dx = s => (s && isEn() && !((EN_DICT().ui || {})[s] != null) ? gt(s) : t(s));
  const TABS = [['memorias', 'Memorias'], ['obeliscos', 'Obeliscos'], ['adivinacion', 'Adivinación'], ['videos', 'Vídeos']];
  const tabs = cur => `<nav class="tabs" aria-label="${t('Apartados')}">${TABS.map(([k, lb]) => `<a href="#/archivo${k === 'memorias' ? '' : '?t=' + k}"${cur === k ? ' class="on" aria-current="page"' : ''}>${esc(t(lb))}</a>`).join('')}</nav>`;
  const paras = a => (a || []).map(x => `<p>${esc(x)}</p>`).join('');
  const zone = d => LO.zonas_ex.find(z => z.dng === d);
  const spot = s => (SPOTS[s] ? L('lugar', s) + (caiHide() || spotAccess(s, 'cai', 'cai-1-1', false).ok ? '' : ` <small>(${t('cerrado en la Parte 1 de Cai')})</small>`) : '');  // a fact about Cai: with no route or on Cai

  function memorias() {
    const T = extText('lore_textos');
    const zones = `<div class="tw"><table><tr><th>${t('Lugar')}</th><th>${t('Habilidad')}</th><th>${t('Memorias')}</th></tr>${LO.zonas_ex.map(z =>
      `<tr><td>${spot(z.spot)}</td><td>${SKILLS[z.skill] ? L('habilidad', z.skill, z.skill_es) : esc(gt(z.skill_es))}</td><td>${z.memorias.join(', ')}</td></tr>`).join('')}</table></div>`;
    const mem = LO.memorias.map(m => `<details class="ap-c" id="m-${m.n}"><summary><b>${m.n}. ${esc(dx(m.t))}</b> <span class="mut">· ${plural(m.paginas, 'página', 'páginas')}${zone(m.zona) && SPOTS[zone(m.zona).spot] ? ' · ' + esc(nm(SPOTS[zone(m.zona).spot])) : ''}</span></summary>` +
      `${T ? paras(T.memorias[m.n]) : extWait('lore_textos')}${zone(m.zona) ? `<p class="mut">${t('Se encuentra en {l}.', { l: spot(zone(m.zona).spot) || t('una zona EX') })}</p>` : ''}</details>`).join('');
    return card(t('Zonas EX'), zones + `<p class="mut">${t('Cada zona da su habilidad y guarda las memorias indicadas.')}</p>`) +
      card(t('Memorias ({n})', { n: LO.memorias.length }), `<p class="mut"><span class="ap-sp">spoiler</span> ${t('Revelan el trasfondo del mundo.')}</p>${mem}`);
  }

  function obeliscos() {
    const O = LO.obelisco;
    const sendas = Object.entries(O.sendas).filter(([, s]) => s).map(([r, s]) => `<section class="card"><h3>${esc(LORD_ALL[r] || r)} · ${esc(dx(s.obelisco))}</h3><p><b>${esc(dx(s.titulo))}.</b> ${esc(dx(s.intro))}</p>` +
      `<details><summary>${t('Cómo se juega')}</summary><p>${esc(dx(s.como_jugar))}</p></details>` +
      Object.entries(s.partes || {}).map(([p, x]) => `<details><summary>${t('Parte {p}', { p: esc(p) })} <span class="ap-sp">spoiler</span></summary>${x.inicio ? `<h4>${t('Comienzo')}</h4><p>${esc(dx(x.inicio))}</p>` : ''}${x.final ? `<h4>${t('Final')}</h4><p>${esc(dx(x.final))}</p>` : ''}</details>`).join('') + '</section>').join('');
    // Part 3 chapter lines: the game's text starts with «…» where the protagonist's name goes
    const cap3 = c => (isEn() ? dx(c).replace(/…\s*/g, 'the protagonist ') : c.replace(/…\s*/g, 'el protagonista ')).replace(/^./, x => x.toUpperCase());  // i18n-ignore
    return `<p class="mut">${t('El obelisco de cada ruta resume su protagonista y, al acabar cada parte, cómo empieza y cómo termina.')}</p>` + sendas +
      card(t('Parte 2 · {o}', { o: dx(O.parte2) }), `<p>${t('Un único obelisco para la Parte 2, común a todas las rutas.')}</p>`) +
      card(t('Parte 3 · {o}', { o: dx(O.parte3.obelisco) }), `<details><summary>${t('Capítulos')} <span class="ap-sp">spoiler</span></summary><ol>${O.parte3.capitulos.map(c => `<li>${esc(cap3(c))}</li>`).join('')}</ol></details>`);
  }

  function adivinacion() {
    const T = extText('lore_textos');
    return `<p class="mut">${t('La adivina de Dagsion saca uno de los 64 hexagramas; el valor es la suerte de la lectura.')}</p>` +
      `<div class="tw"><table><tr><th>${t('N.º')}</th><th>${t('Hexagrama')}</th><th>${t('Valor')}</th><th>${t('Lectura')}</th></tr>${LO.adivinacion.map(a =>
        `<tr><td>${a.n}</td><td>${esc(dx(a.nombre))}</td><td>${a.valor}</td><td>${T ? `<details><summary>${t('Leer')}</summary>${paras(T.adivinacion[a.n])}</details>` : `<span class="mut">${W.sinTextos ? '—' : '…'}</span>`}</td></tr>`).join('')}</table></div>`;
  }

  function videos() {
    const d = f => (f ? dateTx(f[0], f[1], f[2]) : '');
    return `<div class="tw"><table><tr><th>${t('Vídeo')}</th><th>${t('Fecha')}</th><th>${t('Subtítulos')}</th></tr>${LO.videos.map(v =>
      `<tr><td>${esc(dx(v.t))}</td><td>${d(v.fecha)}</td><td>${v.subs ? `<a href="#/guion/${encodeURIComponent(v.id)}">${plural(v.subs, 'línea', 'líneas')}</a>` : `<span class="mut">${t('sin diálogo')}</span>`}</td></tr>`).join('')}</table></div>`;
  }

  function archivo(qs) {
    const tab = TABS.some(([k]) => k === qs.t) ? qs.t : 'memorias';
    return `<h1>${t('Archivo')}</h1>${guiaLink('historia')}${tabs(tab)}` + ({ memorias, obeliscos, adivinacion, videos })[tab]() +
      `<p>${t('Todo el diálogo por capítulo y escena: {a}.', { a: `<a href="#/guion">${t('Guion')}</a>` })}</p>`;
  }

  register({ id: 'archivo', title: 'Archivo', render: (id, qs) => archivo(qs || {}),
    count: () => LO.memorias.length,
    search: () => [
      { group: 'Historia', label: 'Archivo', sub: 'Memorias, obeliscos, adivinación y vídeos', href: '#/archivo', aliases: ['lore', 'memorias', 'trasfondo'] },
      { group: 'Historia', label: 'Adivinación', sub: 'Archivo · 64 hexagramas', href: '#/archivo?t=adivinacion', aliases: ['hexagrama', 'adivina', 'fortuna', 'divination'] },
      { group: 'Historia', label: 'Obeliscos', sub: 'Archivo · resumen de cada ruta', href: '#/archivo?t=obeliscos', aliases: ['obelisco', 'sendas', 'obelisk'] },
      // the label in the reader's language; the Spanish title stays searchable
      ...LO.memorias.map(m => ({ group: 'Historia', label: dx(m.t), sub: 'Memoria del archivo', href: `#/archivo?ir=m-${m.n}`, aliases: [m.t, 'memoria', 'memory'] })),
    ] });
})();
