/* Fortune's Weave · wiki: service worker registration (https or localhost only), the «Nueva versión disponible» notice and
   offlineState(), the one reading of the offline mode that pages show (Ajustes, the home page's footer). */
'use strict';
const SW_OK = typeof navigator !== 'undefined' && 'serviceWorker' in navigator &&
  (location.protocol === 'https:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname));
let swFail = false;
/** 'on' (pages come from the cache), 'next' (installed on the next visit), 'fail' (the browser refused it), 'none' (no https) */
const offlineState = () => (SW_OK && navigator.serviceWorker.controller ? 'on' : swFail ? 'fail' : SW_OK ? 'next' : 'none');

/** the notice lives in #toast (role=status, aria-live=polite, in index.html): empty means hidden */
function showUpdate(reg) {
  const el = document.getElementById('toast');
  if (!el || el.dataset.kind === 'upd') return;
  el.dataset.kind = 'upd';
  el.innerHTML = `<span>${t('Nueva versión disponible')}</span><span aria-hidden="true">·</span><button type="button" class="toast-go">${t('Actualizar')}</button>` +
    `<button type="button" class="x toast-x" aria-label="${t('Ocultar aviso')}">×</button>`;
  el.querySelector('.toast-go').onclick = () => {
    if (!reg.waiting) return location.reload();
    navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), { once: true });
    reg.waiting.postMessage('skip-waiting');
  };
  el.querySelector('.toast-x').onclick = () => { el.innerHTML = ''; delete el.dataset.kind; };  // until the next load
}

if (SW_OK) document.addEventListener('wiki:ready', () => {  // after the scripts: the first install must not compete with them
  navigator.serviceWorker.register('sw.js').then(reg => {
    const waiting = () => { if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg); };
    waiting();
    reg.addEventListener('updatefound', () => {
      const w = reg.installing;
      w?.addEventListener('statechange', () => { if (w.state === 'installed') waiting(); });
    });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
  }).catch(e => { swFail = true; console.warn('Sin modo sin conexión:', e.message); });  // i18n-ignore (console only)
});
