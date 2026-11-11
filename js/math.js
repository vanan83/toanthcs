// math.js — hiển thị công thức Toán bằng HTML + CSS (thay cho KaTeX: ~2 KB, không cần font, chạy offline).
// Chỉ hỗ trợ những lệnh app dùng: \frac{}{} \sqrt{} \hat{} \sys{}{} \text{} ^{} _{} \sin \cos ... và các ký hiệu.
const SYM = { le: '≤', ge: '≥', ne: '≠', Rightarrow: '⇒', Leftrightarrow: '⇔', approx: '≈', in: '∈', perp: '⊥',
  angle: '∠', circ: '°', Delta: 'Δ', alpha: 'α', beta: 'β', pi: 'π', triangle: '△', infty: '∞' };
const BIN = { cdot: '·', times: '×', div: ':', pm: '±' };
const FN = ['sin', 'cos', 'tan', 'cot'];
const REL = '=<>≤≥≠⇒⇔≈';
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function parse(s) {
  let i = 0;
  const raw = () => { // đọc {…} nguyên văn
    while (s[i] === ' ') i++;
    if (s[i] !== '{') return esc(s[i++] || '');
    let depth = 0, out = '';
    for (i++; i < s.length; i++) { if (s[i] === '{') depth++; else if (s[i] === '}' && !depth--) break; out += s[i]; }
    i++; return esc(out);
  };
  const group = () => {
    while (s[i] === ' ') i++;
    if (s[i] === '{') { i++; const out = seq('}'); i++; return out; }
    return atom();
  };
  const atom = () => {
    const c = s[i];
    if (c === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i)); i += m[0].length;
      const n = m[1];
      if (n === 'frac') { const a = group(), b = group(); return `<span class="m-frac"><span>${a}</span><span>${b}</span></span>`; }
      if (n === 'sqrt') return `<span class="m-sqrt"><span class="m-rad">√</span><span class="m-rc">${group()}</span></span>`;
      if (n === 'hat') return `<span class="m-hat">${group()}</span>`;
      if (n === 'sys') { const a = group(), b = group(); return `<span class="m-sys"><span class="m-br">{</span><span class="m-rows"><span>${a}</span><span>${b}</span></span></span>`; }
      if (n === 'text') return `<span class="m-tx">${raw()}</span>`;
      if (FN.includes(n)) return `<span class="m-fn">${n}</span>`;
      if (n in BIN) return `<span class="m-bin">${BIN[n]}</span>`;
      if (n in SYM) return REL.includes(SYM[n]) ? `<span class="m-op">${SYM[n]}</span>` : SYM[n];
      if (n === 'left' || n === 'right') return '';
      return esc(n);
    }
    i++;
    if (c === '^') return `<sup>${group()}</sup>`;
    if (c === '_') return `<sub>${group()}</sub>`;
    if (/[a-zA-Z]/.test(c)) return `<i>${c}</i>`;
    return esc(c);
  };
  const seq = (end) => {
    let out = '', operand = false;
    while (i < s.length && s[i] !== end) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      if (c === '+' || c === '-') { // dấu cộng/trừ: có khoảng cách nếu là phép toán hai ngôi
        i++; const ch = c === '-' ? '−' : '+';
        out += operand ? `<span class="m-bin">${ch}</span>` : ch; operand = false; continue;
      }
      if (c === ':') { i++; out += '<span class="m-bin">:</span>'; operand = false; continue; }
      if (REL.includes(c)) { i++; out += `<span class="m-op">${esc(c)}</span>`; operand = false; continue; }
      if (c === '(' || c === '[') { i++; out += c; operand = false; continue; }
      if (c === '|') { i++; out += '|'; continue; } // trị tuyệt đối: |−2| (dấu − sau | mở là dấu âm)
      if (c === ';' || c === ',') { i++; out += c + ' '; operand = false; continue; }
      const h = atom();
      operand = !/^<span class="m-(op|bin)"/.test(h);
      out += h;
    }
    return out;
  };
  return seq();
}

/** Một công thức (không có dấu $). */
export const tex = (s) => `<span class="m">${parse(String(s))}</span>`;

/** Chữ thường xen công thức trong $...$ → HTML. */
export const rich = (t) => String(t).split(/\$([^$]+)\$/).map((p, k) => (k % 2 ? tex(p) : esc(p).replace(/\n/g, '<br>'))).join('');

/** Bỏ ký hiệu TeX để lưu vào Google Sheet dạng chữ thường. */
export function plain(t) {
  return String(t).replace(/\$/g, '')
    .replace(/\\left|\\right/g, '').replace(/\^\\circ/g, '°')
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2')
    .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
    .replace(/\\hat\{([^{}]*)\}/g, '∠$1')
    .replace(/\\sys\{([^{}]*)\}\{([^{}]*)\}/g, '{ $1 ; $2 }')
    .replace(/\\text\{([^{}]*)\}/g, '$1')
    .replace(/\\([a-zA-Z]+)/g, (m, n) => BIN[n] || SYM[n] || n)
    .replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}
