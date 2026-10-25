// Minimal browser-script-loader simulator.
// Reproduces: inline scripts execute in document order; external <script src>
// executes AFTER all preceding inline scripts but its definitions are only
// visible to scripts that come after it in source order.
const fs = require('fs');
const path = require('path');

const htmlPath = process.argv[2];
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract <script> tags in source order
const scriptTags = [];
const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
while ((m = re.exec(html)) !== null) {
  const attrs = m[1];
  const body = m[2];
  const srcMatch = /src\s*=\s*"([^"]+)"/i.exec(attrs);
  scriptTags.push({ src: srcMatch ? srcMatch[1] : null, body, idx: m.index });
}

// Resolve src relative to html dir
const htmlDir = path.dirname(htmlPath);
const errors = [];

function runInline(code, label) {
  try {
    (0, eval)(code);
  } catch (e) {
    errors.push(`${label}: ${e.constructor.name}: ${e.message}`);
  }
}

function loadExternal(src, label) {
  const full = path.resolve(htmlDir, src);
  if (!fs.existsSync(full)) {
    errors.push(`${label}: external script NOT FOUND: ${src}`);
    return;
  }
  const code = fs.readFileSync(full, 'utf-8');
  try {
    (0, eval)(code);
  } catch (e) {
    errors.push(`${label}: external script threw: ${e.constructor.name}: ${e.message}`);
  }
}

console.log('Script tags found in source order:');
scriptTags.forEach((s, i) => console.log(`  [${i}] ${s.src ? 'EXTERNAL src='+s.src : 'INLINE'}`));

// Browser semantics: scripts execute in source order. Inline immediately,
// external when loaded (we simulate synchronously here).
scriptTags.forEach((s, i) => {
  if (s.src) loadExternal(s.src, `script[${i}]`);
  else runInline(s.body, `script[${i}]`);
});

// Now simulate the onclick handler firing (like the user clicking "Calculer")
console.log('\n--- Simulating onclick="f_Calculer()" ---');
try {
  const fn = (0, eval)('f_Calculer');
  if (typeof fn !== 'function') {
    console.log('f_Calculer is not a function, type=' + typeof fn);
  } else {
    // stub document.Form
    global.document = { Form: { Resultat: { value: '' } } };
    global.window = {};
    fn();
    console.log('Resultat.value =', global.document.Form.Resultat.value);
  }
} catch (e) {
  errors.push(`onclick: ${e.constructor.name}: ${e.message}`);
}

console.log('\n=== ERRORS ===');
if (errors.length === 0) console.log('(none)');
else errors.forEach(e => console.log(' - ' + e));