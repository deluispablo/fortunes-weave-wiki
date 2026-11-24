// Stamps one cache key (hash of everything the app loads) into index.html and sw.js, so visitors get fresh files after every change.
// GitHub Pages runs it on deploy; run it locally only to test the offline mode: node scripts/stamp.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rd = f => fs.readFileSync(path.join(ROOT, f));
const ls = d => fs.readdirSync(path.join(ROOT, d)).sort().map(f => `${d}/${f}`);
const BLOCK = /\/\*build\*\/[\s\S]*?\/\*\/build\*\//;

const files = ['index.html', 'data.js', 'style.css', 'manifest.webmanifest', ...['js', 'pages', 'ext', 'icons', 'fonts', 'img/ui'].flatMap(ls)];
const sw = rd('sw.js').toString();
const h = crypto.createHash('sha1').update(sw.replace(BLOCK, ''));
for (const f of files) h.update(f).update(f === 'index.html' ? rd(f).toString().replace(/\?v=\w+/g, '') : rd(f));
const v = h.digest('hex').slice(0, 12);

// the script lists in index.html and the precache list in sw.js stay as they are; only their ?v= key changes
const restamp = s => s.replace(/\?v=\w+/g, `?v=${v}`);
fs.writeFileSync(path.join(ROOT, 'index.html'), restamp(rd('index.html').toString()));
// every image, so the whole wiki is downloaded on install and works offline from the start
const imgs = fs.readdirSync(path.join(ROOT, 'img'), { recursive: true }).map(f => 'img/' + f.split(path.sep).join('/'))
  .filter(f => !/(^|\/)\./.test(f) && fs.statSync(path.join(ROOT, f)).isFile()).sort();
fs.writeFileSync(path.join(ROOT, 'sw.js'), sw.replace(BLOCK, m => restamp(m).replace(/VERSION = "\w+"/, `VERSION = "${v}"`)
  .replace(/IMAGES = \[[^\]]*\]/, `IMAGES = ${JSON.stringify(imgs)}`)));
console.log('version', v);
