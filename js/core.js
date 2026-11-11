// core.js — tiện ích dùng chung cho bộ sinh câu hỏi (g6.js … g9.js)
// (trước đây là phần đầu gen.js) — sinh câu hỏi Toán THCS bằng thuật toán: không cần kho đề, không bao giờ hết câu.
// Mỗi bài có hàm gen(level) với level 1 (dễ) → 3 (khó), trả về
//   { q, opts[4], ans, exp, fig }   (q / opts / exp là chữ, công thức đặt trong $...$; fig là dữ liệu hình cho svg.js)
// Phương án sai được dựng từ các LỖI HAY GẶP của học sinh (quên đổi dấu, cộng cả mẫu, nhầm công thức...).

/* ---------------- tiện ích ---------------- */
export const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = (a) => a[Math.floor(Math.random() * a.length)];
export const nz = (a, b) => { let x; do x = ri(a, b); while (x === 0); return x; };
export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Phân số tối giản dạng TeX (mẫu 1 thì ra số nguyên). */
export const fr = (n, d) => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1; n /= g; d /= g;
  return d === 1 ? String(n || 0) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
};
export const p = (n) => (n < 0 ? `(${n})` : String(n)); // số âm đặt trong ngoặc
export const deg = (v) => `${v}^\\circ`;
/** Ghép các hạng tử [[hệ số, phần biến]] thành biểu thức gọn: 2x^2 - x + 3. */
export function terms(list) {
  let s = '';
  for (const [c, v] of list) {
    if (!c) continue;
    const a = Math.abs(c), body = (a === 1 && v ? '' : a) + v;
    s += s ? (c < 0 ? ' - ' : ' + ') + body : (c < 0 ? '-' : '') + body;
  }
  return s || '0';
}
/** Đa thức theo hệ số bậc cao → thấp: poly([1,-3,2]) = x^2 - 3x + 2 */
export const poly = (cs, v = 'x') => terms(cs.map((c, k) => { const e = cs.length - 1 - k; return [c, e === 0 ? '' : e === 1 ? v : `${v}^${e}`]; }));
export const lin = (a, b) => `y = ${poly([a, b])}`;
export const pt = (x, y) => `(${x || 0}; ${y || 0})`;
export const factor = (r) => (r === 0 ? 'x' : `(x ${r > 0 ? '-' : '+'} ${Math.abs(r)})`); // (x - r)

/** Dựng câu trắc nghiệm 4 phương án: lọc trùng, thiếu thì thêm số lân cận, rồi trộn. */
export function mc(q, ans, wrong, exp, fig = null, fmt = (v) => `$${v}$`) {
  const opts = [ans], seen = new Set([String(ans)]);
  const add = (w) => {
    if (opts.length < 4 && w != null && w === w && !seen.has(String(w)) && (typeof w !== 'number' || Number.isInteger(w))) {
      seen.add(String(w)); opts.push(w);
    }
  };
  wrong.forEach(add);
  if (typeof ans === 'number') {
    const st = Math.max(1, Math.round(Math.abs(ans) / 10));
    for (let k = 1; opts.length < 4 && k < 40; k++) add(ans + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * st);
  }
  if (opts.length < 4) throw new Error('Thiếu phương án: ' + q);
  shuffle(opts);
  return { q, opts: opts.map(fmt), ans: opts.indexOf(ans), exp, fig };
}
export const txt = (v) => String(v); // phương án là chữ thường (không phải công thức)

export const lcm = (a, b) => (a / gcd(a, b)) * b;
export const sq = (k, m) => (k === 1 ? '' : k === -1 ? '-' : k) + `\\sqrt{${m}}`;
export const cf = (n, d) => { const s = fr(n, d); return s === '1' ? '' : s === '-1' ? '-' : s; }; // hệ số đứng trước x^2
export function coprime(lo, hi) { let m, n; do { m = ri(lo, hi); n = ri(lo, hi); } while (m === n || gcd(m, n) !== 1); return [m, n]; }
/** Số thập phân viết kiểu Việt Nam: 2.5 → "2,5" (làm tròn bỏ sai số dấu phẩy động). */
export const dc = (x, d = 6) => String(+(+x).toFixed(d)).replace('.', ',');
/** Câu hỏi "chọn ý đúng": 1 ý lấy từ trues, 3 ý từ falses. */
export const pickTF = (trues, falses) => [pick(trues), shuffle(falses.slice()).slice(0, 3)];
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const sum = (a) => a.reduce((x, y) => x + y, 0);
export function roman(n) {
  const T = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; let s = '';
  for (const [v, r] of T) while (n >= v) { s += r; n -= v; }
  return s;
}
export const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
export const divisors = (n) => range(1, n).filter((d) => n % d === 0);
/** Kết quả dạng kπ: 12\pi, \pi, \frac{3}{2}\pi */
export const kpi = (n, d = 1) => { const s = fr(n, d); return (s === '1' ? '' : s === '-1' ? '-' : s) + '\\pi'; };
export const TRIPLES =[[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [15, 20, 25]];
