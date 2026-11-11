// gen.js — sinh câu hỏi Toán THCS bằng thuật toán: không cần kho đề, không bao giờ hết câu.
// Mỗi bài có hàm gen(level) với level 1 (dễ) → 3 (khó), trả về
//   { q, opts[4], ans, exp, fig }   (q / opts / exp là chữ, công thức đặt trong $...$; fig là dữ liệu hình cho svg.js)
// Phương án sai được dựng từ các LỖI HAY GẶP của học sinh (quên đổi dấu, cộng cả mẫu, nhầm công thức...).

/* ---------------- tiện ích ---------------- */
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const nz = (a, b) => { let x; do x = ri(a, b); while (x === 0); return x; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Phân số tối giản dạng TeX (mẫu 1 thì ra số nguyên). */
const fr = (n, d) => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1; n /= g; d /= g;
  return d === 1 ? String(n || 0) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
};
const p = (n) => (n < 0 ? `(${n})` : String(n)); // số âm đặt trong ngoặc
const deg = (v) => `${v}^\\circ`;
/** Ghép các hạng tử [[hệ số, phần biến]] thành biểu thức gọn: 2x^2 - x + 3. */
function terms(list) {
  let s = '';
  for (const [c, v] of list) {
    if (!c) continue;
    const a = Math.abs(c), body = (a === 1 && v ? '' : a) + v;
    s += s ? (c < 0 ? ' - ' : ' + ') + body : (c < 0 ? '-' : '') + body;
  }
  return s || '0';
}
/** Đa thức theo hệ số bậc cao → thấp: poly([1,-3,2]) = x^2 - 3x + 2 */
const poly = (cs, v = 'x') => terms(cs.map((c, k) => { const e = cs.length - 1 - k; return [c, e === 0 ? '' : e === 1 ? v : `${v}^${e}`]; }));
const lin = (a, b) => `y = ${poly([a, b])}`;
const pt = (x, y) => `(${x || 0}; ${y || 0})`;
const factor = (r) => (r === 0 ? 'x' : `(x ${r > 0 ? '-' : '+'} ${Math.abs(r)})`); // (x - r)

/** Dựng câu trắc nghiệm 4 phương án: lọc trùng, thiếu thì thêm số lân cận, rồi trộn. */
function mc(q, ans, wrong, exp, fig = null, fmt = (v) => `$${v}$`) {
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
const txt = (v) => String(v); // phương án là chữ thường (không phải công thức)

/* =================== LỚP 6 =================== */
function coprime(lo, hi) { let m, n; do { m = ri(lo, hi); n = ri(lo, hi); } while (m === n || gcd(m, n) !== 1); return [m, n]; }

function g6ucln(lv) {
  const g = ri(2, lv === 1 ? 6 : 9), [m, n] = coprime(2, lv === 1 ? 5 : 7), a = g * m, b = g * n, L = g * m * n;
  const U = `\\text{ƯCLN}(${a}, ${b})`, B = `\\text{BCNN}(${a}, ${b})`;
  if (lv === 1) return mc(`Tìm $${U}$.`, g, [L, Math.min(a, b), 2 * g, 1],
    `$${a} = ${g} \\cdot ${m}$, $${b} = ${g} \\cdot ${n}$; $${m}$ và $${n}$ không còn ước chung nào khác 1 nên $${U} = ${g}$.`);
  if (lv === 2) return mc(`Tìm $${B}$.`, L, [a * b, g, 2 * L, a + b],
    `$${a} = ${g} \\cdot ${m}$, $${b} = ${g} \\cdot ${n}$ nên $${B} = ${g} \\cdot ${m} \\cdot ${n} = ${L}$.`);
  if (Math.random() < 0.5) return mc(
    `Cô giáo có ${a} quyển vở và ${b} chiếc bút. Cô muốn chia đều vào các phần quà (số vở ở các phần như nhau, số bút cũng như nhau). Có thể chia được nhiều nhất bao nhiêu phần quà?`,
    g, [L, Math.min(a, b), 2 * g, Math.abs(a - b)], `Số phần quà nhiều nhất là $${U} = ${g}$.`, null, (v) => `${v} phần`);
  return mc(
    `Hai xe buýt cùng rời bến lúc 6 giờ. Xe thứ nhất cứ ${a} phút rời bến một lần, xe thứ hai cứ ${b} phút một lần. Sau ít nhất bao nhiêu phút hai xe lại cùng rời bến?`,
    L, [a * b, g, a + b, 2 * L], `Số phút cần tìm là $${B} = ${L}$.`, null, (v) => `${v} phút`);
}

function g6luythua(lv) {
  if (lv === 1) {
    const a = ri(2, 5), n = ri(2, a <= 3 ? 5 : 3), v = a ** n;
    return mc(`Tính $${a}^{${n}}$.`, v, [a * n, a ** (n - 1), a ** (n + 1), a + n],
      `$${a}^{${n}} = ${Array(n).fill(a).join(' \\cdot ')} = ${v}$.`);
  }
  if (lv === 2) {
    const a = ri(2, 9), mul = Math.random() < 0.5, m = ri(3, 9), n = ri(2, mul ? 7 : m - 1), e = mul ? m + n : m - n, ans = `${a}^{${e}}`;
    const w = mul ? [m * n, e + 1, e - 1] : [m + n, e + 1, Math.max(1, e - 1)];
    return mc(`Viết kết quả dưới dạng một lũy thừa: $${a}^{${m}} ${mul ? '\\cdot' : ':'} ${a}^{${n}}$.`, ans,
      [...w.map((k) => `${a}^{${k}}`), `${a * a}^{${e}}`],
      mul ? `Nhân hai lũy thừa cùng cơ số: giữ cơ số, cộng số mũ: $${m} + ${n} = ${e}$.`
        : `Chia hai lũy thừa cùng cơ số: giữ cơ số, trừ số mũ: $${m} - ${n} = ${e}$.`);
  }
  const a = ri(2, 20), b = ri(2, 5), c = ri(2, 4), d = ri(1, 12), v = a + b * c * c - d;
  return mc(`Tính $${a} + ${b} \\cdot ${c}^{2} - ${d}$.`, v, [(a + b) * c * c - d, a + (b * c) ** 2 - d, a + b * c * 2 - d],
    `Lũy thừa trước, rồi nhân, cuối cùng cộng trừ: $${c}^2 = ${c * c}$; $${b} \\cdot ${c * c} = ${b * c * c}$; $${a} + ${b * c * c} - ${d} = ${v}$.`);
}

function g6songuyen(lv) {
  if (lv === 1) {
    let a, b, r;
    do { a = nz(-6, 6); b = nz(-7, 7); r = a + b; } while (Math.abs(r) > 8);
    let lo = Math.min(a, r, 0) - 1, hi = Math.max(a, r, 0) + 1;
    while (hi - lo < 10) { lo--; if (hi - lo < 10) hi++; }
    const fig = { kind: 'numberline', data: { min: lo, max: hi, marks: [a], jumps: [[a, r, (b > 0 ? '+' : '−') + Math.abs(b)]] } };
    return mc(`Dựa vào trục số, tính $${a} + ${p(b)}$.`, r, [a - b, -r, Math.abs(a) + Math.abs(b)],
      `Từ điểm $${a}$ đi sang ${b > 0 ? 'phải' : 'trái'} $${Math.abs(b)}$ đơn vị thì đến điểm $${r}$.`, fig);
  }
  if (lv === 2) {
    const a = nz(-15, 15), b = nz(-15, 15), v = a - b;
    return mc(`Tính $${a} - ${p(b)}$.`, v, [a + b, b - a, -a - b],
      `Trừ đi một số là cộng với số đối của nó: $${a} - ${p(b)} = ${a} + ${p(-b)} = ${v}$.`);
  }
  const a = nz(-20, 20), b = nz(-15, 15), c = nz(-15, 15), v = a - b + c;
  return mc(`Tính $${a} - ${p(b)} + ${p(c)}$.`, v, [a - (b + c), a + b + c, -v, a - b - c],
    `$${a} - ${p(b)} + ${p(c)} = ${a} + ${p(-b)} + ${p(c)} = ${v}$.`);
}

function g6phanso(lv) {
  const plus = Math.random() < 0.6, op = plus ? '+' : '-';
  if (lv === 1) {
    const d = ri(3, 12);
    let a, b;
    do { a = ri(1, d - 1); b = ri(1, d - 1); } while (!plus && a === b);
    const r = plus ? a + b : a - b;
    return mc(`Tính $\\frac{${a}}{${d}} ${op} \\frac{${b}}{${d}}$.`, fr(r, d), [fr(r, 2 * d), fr(plus ? a * b : b - a, d), fr(r + 1, d), fr(r, d + 1)],
      `Cùng mẫu: giữ nguyên mẫu, ${plus ? 'cộng' : 'trừ'} các tử: $\\frac{${a} ${op} ${b}}{${d}} = ${fr(r, d)}$.`);
  }
  if (lv === 2) {
    let b1, b2, a1, a2, L, n1, n2, r;
    do {
      b1 = ri(2, 9); b2 = ri(2, 9); a1 = ri(1, b1 - 1); a2 = ri(1, b2 - 1);
      L = (b1 * b2) / gcd(b1, b2); n1 = (a1 * L) / b1; n2 = (a2 * L) / b2; r = plus ? n1 + n2 : n1 - n2;
    } while (b1 === b2 || r === 0);
    return mc(`Tính $\\frac{${a1}}{${b1}} ${op} \\frac{${a2}}{${b2}}$.`, fr(r, L),
      [fr(plus ? a1 + a2 : a1 - a2, b1 + b2), fr(plus ? n1 - n2 : n1 + n2, L), fr(r, 2 * L), fr(plus ? a1 + a2 : a1 - a2, L)],
      `Quy đồng mẫu chung $${L}$: $\\frac{${n1}}{${L}} ${op} \\frac{${n2}}{${L}} = ${fr(r, L)}$.`);
  }
  let a, b;
  do { b = ri(2, 9); a = ri(1, b - 1); } while (gcd(a, b) !== 1);
  const k = ri(2, 9), N = b * k;
  return mc(`$\\frac{${a}}{${b}}$ của $${N}$ bằng bao nhiêu?`, a * k, [N * a, k, N - a * k, N + a],
    `$${N} \\cdot \\frac{${a}}{${b}} = ${N} : ${b} \\cdot ${a} = ${k} \\cdot ${a} = ${a * k}$.`);
}

const THEMES = [
  { t: 'Môn thể thao yêu thích của lớp 6A', unit: 'học sinh', names: ['Bóng đá', 'Cầu lông', 'Bơi', 'Cờ vua', 'Đá cầu'] },
  { t: 'Số cây trồng được của khối 6', unit: 'cây', names: ['6A', '6B', '6C', '6D', '6E'] },
  { t: 'Số sách thư viện cho mượn trong tuần', unit: 'quyển', names: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'] },
];
function g6bieudo(lv) {
  const th = pick(THEMES), k = ri(4, 5), names = th.names.slice(0, k), step = pick([1, 2, 5]);
  const vals = shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, k).map((v) => v * step);
  const fig = { kind: 'bars', data: { items: names.map((n, i) => [n, vals[i]]), unit: th.unit, title: th.t } };
  const hi = vals.indexOf(Math.max(...vals)), lo = vals.indexOf(Math.min(...vals)), U = th.unit;
  if (lv === 1) {
    if (Math.random() < 0.5) return mc(`Theo biểu đồ, mục nào có số ${U} nhiều nhất?`, names[hi], names.filter((_, i) => i !== hi),
      `Cột “${names[hi]}” cao nhất (${vals[hi]} ${U}).`, fig, txt);
    const i = ri(0, k - 1);
    return mc(`Theo biểu đồ, “${names[i]}” có bao nhiêu ${U}?`, vals[i], vals.filter((_, j) => j !== i),
      `Đỉnh cột “${names[i]}” ứng với ${vals[i]} ${U}.`, fig, txt);
  }
  if (lv === 2) {
    const s = vals.reduce((x, y) => x + y, 0);
    return mc(`Theo biểu đồ, tổng cộng có bao nhiêu ${U}?`, s, [s - vals[0], s + step, s - step, s + vals[1]],
      `$${vals.join(' + ')} = ${s}$ (${U}).`, fig, txt);
  }
  const d = vals[hi] - vals[lo];
  return mc(`Theo biểu đồ, mục nhiều nhất hơn mục ít nhất bao nhiêu ${U}?`, d, [vals[hi] + vals[lo], vals[hi], d + step, d - step],
    `Nhiều nhất: “${names[hi]}” (${vals[hi]}); ít nhất: “${names[lo]}” (${vals[lo]}). Hiệu: $${vals[hi]} - ${vals[lo]} = ${d}$.`, fig, txt);
}

/* =================== LỚP 7 =================== */
function rq() { let a, b; do { a = nz(-9, 9); b = ri(2, 9); } while (gcd(a, b) !== 1); return [a, b]; }
const fq = (q) => (q[0] < 0 ? `(${fr(q[0], q[1])})` : fr(q[0], q[1]));

function g7sohuuti(lv) {
  if (lv === 1) {
    const [a, b] = rq(), [c, d] = rq();
    return mc(`Tính $${fr(a, b)} \\cdot ${fq([c, d])}$.`, fr(a * c, b * d), [fr(a * d, b * c), fr(-a * c, b * d), fr(a + c, b + d), fr(a * c, b + d)],
      `Nhân tử với tử, mẫu với mẫu: $\\frac{${a} \\cdot ${p(c)}}{${b} \\cdot ${d}} = ${fr(a * c, b * d)}$.`);
  }
  if (lv === 2) {
    const [a, b] = rq(), [c, d] = rq();
    return mc(`Tính $${fr(a, b)} : ${fq([c, d])}$.`, fr(a * d, b * c), [fr(a * c, b * d), fr(-a * d, b * c), fr(b * c, a * d), fr(a + d, b + c)],
      `Chia cho một số là nhân với số nghịch đảo của nó: $${fr(a, b)} \\cdot ${fq([d * Math.sign(c), Math.abs(c)])} = ${fr(a * d, b * c)}$.`);
  }
  let a, b;
  do { a = nz(-4, 4); b = ri(2, 5); } while (gcd(a, b) !== 1);
  const n = ri(2, 3), ans = fr(a ** n, b ** n);
  return mc(`Tính $\\left(${fr(a, b)}\\right)^{${n}}$.`, ans, [fr(-(a ** n), b ** n), fr(a ** n, b), fr(a * n, b * n), fr(a, b ** n)],
    `Lũy thừa của một thương: $\\frac{${p(a)}^{${n}}}{${b}^{${n}}} = ${ans}$.`);
}

function g7tile(lv) {
  if (lv === 1) {
    const b = ri(2, 9), k = ri(2, 6), a = ri(1, 12), c = b * k, x = a * k;
    return mc(`Tìm $x$, biết $\\frac{${a}}{${b}} = \\frac{x}{${c}}$.`, x, [a * c, a + c - b, c - a, x + b],
      `Nhân chéo: $x = \\frac{${a} \\cdot ${c}}{${b}} = ${x}$.`);
  }
  if (lv === 2) {
    const u = ri(3, 15), q = ri(2, 6);
    let r; do r = ri(3, 12); while (r === q);
    return mc(`Mua ${q} quyển vở hết ${u * q} nghìn đồng. Hỏi mua ${r} quyển vở cùng loại hết bao nhiêu nghìn đồng?`, u * r,
      [u * q + r - q, u * r + u, u * q * r, u * (r - 1)],
      `Số tiền tỉ lệ thuận với số vở. Giá 1 quyển: $${u * q} : ${q} = ${u}$ (nghìn đồng); ${r} quyển: $${u} \\cdot ${r} = ${u * r}$ (nghìn đồng).`,
      null, (v) => `${v} nghìn đồng`);
  }
  let n, d, W, ms;
  do {
    n = ri(3, 10); d = ri(4, 12); W = n * d;
    ms = []; for (let m = 2; m <= 3 * n; m++) if (m !== n && W % m === 0 && W / m >= 2) ms.push(m);
  } while (!ms.length);
  const m = pick(ms), t = W / m;
  return mc(`${n} công nhân làm xong một công việc trong ${d} ngày. Hỏi ${m} công nhân (năng suất như nhau) làm xong công việc đó trong bao nhiêu ngày?`,
    t, [(d * m) / n, d + n - m, d - n + m, t + 1],
    `Số công nhân và số ngày là hai đại lượng tỉ lệ nghịch: $${n} \\cdot ${d} = ${m} \\cdot x$ nên $x = ${W} : ${m} = ${t}$ (ngày).`,
    null, (v) => `${v} ngày`);
}

function g7goc(lv) {
  const D = (v) => `$${deg(v)}$`;
  if (lv === 1) {
    let B, C; do { B = 5 * ri(6, 16); C = 5 * ri(6, 16); } while (B + C > 150);
    const A = 180 - B - C;
    return mc(`Cho tam giác $ABC$ có $\\hat{B} = ${deg(B)}$, $\\hat{C} = ${deg(C)}$. Tính $\\hat{A}$.`, A, [B + C, 180 - B, 180 - C, 90 - Math.abs(B - C)],
      `Tổng ba góc của một tam giác bằng $${deg(180)}$: $\\hat{A} = ${deg(180)} - ${deg(B)} - ${deg(C)} = ${deg(A)}$.`,
      { kind: 'triangle', data: { ang: [A, B, C], labels: ['?', B + '°', C + '°'] } }, D);
  }
  if (lv === 2) {
    const A = 10 * ri(2, 14), base = (180 - A) / 2;
    return mc(`Cho tam giác $ABC$ cân tại $A$ có $\\hat{A} = ${deg(A)}$. Tính $\\hat{B}$.`, base, [180 - A, A / 2, A, base + 10],
      `Tam giác cân tại $A$ nên $\\hat{B} = \\hat{C} = (${deg(180)} - ${deg(A)}) : 2 = ${deg(base)}$.`,
      { kind: 'triangle', data: { ang: [A, base, base], labels: [A + '°', '?', ''] } }, D);
  }
  let A, B; do { A = 5 * ri(6, 20); B = 5 * ri(6, 16); } while (A + B > 160);
  return mc(`Cho tam giác $ABC$ có $\\hat{A} = ${deg(A)}$, $\\hat{B} = ${deg(B)}$. Tính số đo góc ngoài tại đỉnh $C$.`, A + B,
    [180 - A - B, 180 - A, 180 - B, Math.abs(A - B)],
    `Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó: $${deg(A)} + ${deg(B)} = ${deg(A + B)}$.`,
    { kind: 'triangle', data: { ang: [A, B, 180 - A - B], labels: [A + '°', B + '°', ''], ext: '?' } }, D);
}

function g7dathuc(lv) {
  if (lv === 1) {
    const a = nz(-3, 3), b = ri(-5, 5), c = ri(-6, 6), t = nz(-3, 3), v = a * t * t + b * t + c;
    return mc(`Cho $P(x) = ${poly([a, b, c])}$. Tính $P(${t})$.`, v,
      [a * 2 * t + b * t + c, -a * t * t + b * t + c, a * t * t - b * t + c, a * t * t + b * t - c],
      `$P(${t}) = ${a} \\cdot ${p(t)}^{2} + ${p(b)} \\cdot ${p(t)} + ${p(c)} = ${v}$.`);
  }
  if (lv === 2) {
    let a1, a2, b, d; do { a1 = nz(-5, 5); a2 = nz(-5, 5); b = nz(-6, 6); d = nz(-6, 6); } while (a1 + a2 === 0 || b === d);
    const c = nz(-9, 9), ans = poly([a1 + a2, b - d, c]);
    return mc(`Thu gọn đa thức $${terms([[a1, 'x^2'], [b, 'x'], [a2, 'x^2'], [c, ''], [-d, 'x']])}$.`, ans,
      [poly([a1 + a2, b + d, c]), poly([a1 - a2, b - d, c]), poly([a1 + a2, b - d, -c]), poly([a1 + a2, d - b, c])],
      `Gộp các hạng tử đồng dạng: $(${a1} + ${p(a2)})x^2 + (${b} - ${p(d)})x + ${p(c)} = ${ans}$.`);
  }
  const a = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]), r = nz(-6, 6), b = -a * r;
  return mc(`Nghiệm của đa thức $${poly([a, b])}$ là`, r, [-r, b, a, r + 1],
    `$${poly([a, b])} = 0 \\Rightarrow ${a}x = ${-b} \\Rightarrow x = ${-b} : ${p(a)} = ${r}$.`, null, (v) => `$x = ${v}$`);
}

/* =================== LỚP 8 =================== */
function g8hdt(lv) {
  const a = ri(2, 9);
  if (lv === 1) {
    const s = pick([1, -1]), ans = poly([1, 2 * s * a, a * a]), sg = s > 0 ? '+' : '-';
    return mc(`Khai triển $${factor(-s * a)}^2$.`, ans, [poly([1, 0, a * a]), poly([1, -2 * s * a, a * a]), poly([1, s * a, a * a]), poly([1, 0, -a * a])],
      `$(A ${sg} B)^2 = A^2 ${sg} 2AB + B^2$ với $A = x$, $B = ${a}$: kết quả $${ans}$.`);
  }
  if (lv === 2) {
    if (Math.random() < 0.5) {
      const ans = poly([1, 0, -a * a]);
      return mc(`Tính $(x - ${a})(x + ${a})$.`, ans, [poly([1, 0, a * a]), poly([1, -2 * a, a * a]), poly([1, 0, -2 * a]), poly([1, -a, -a * a])],
        `$(A - B)(A + B) = A^2 - B^2$: $x^2 - ${a}^2 = ${ans}$.`);
    }
    const k = ri(2, 3), b = ri(1, 5), s = pick([1, -1]), ans = poly([k * k, 2 * k * s * b, b * b]);
    return mc(`Khai triển $(${k}x ${s > 0 ? '+' : '-'} ${b})^2$.`, ans,
      [poly([k, 2 * k * s * b, b * b]), poly([k * k, k * s * b, b * b]), poly([k * k, 0, b * b]), poly([k * k, 2 * s * b, b * b])],
      `$(A ${s > 0 ? '+' : '-'} B)^2$ với $A = ${k}x$, $B = ${b}$: $${k * k}x^2 ${s > 0 ? '+' : '-'} 2 \\cdot ${k}x \\cdot ${b} + ${b * b} = ${ans}$.`);
  }
  const t = ri(0, 2), P = [poly([1, 0, -a * a]), poly([1, 2 * a, a * a]), poly([1, -2 * a, a * a])][t];
  const M = `(x - ${a})`, Pl = `(x + ${a})`;
  const opts = [[`${M}${Pl}`, `${M}^2`, `${Pl}^2`, `(${a} - x)(${a} + x)`],
    [`${Pl}^2`, `${M}^2`, `${M}${Pl}`, `(x + ${2 * a})^2`],
    [`${M}^2`, `${Pl}^2`, `${M}${Pl}`, `(x - ${2 * a})^2`]][t];
  return mc(`Phân tích đa thức $${P}$ thành nhân tử.`, opts[0], opts.slice(1),
    `Áp dụng hằng đẳng thức ${['hiệu hai bình phương', 'bình phương của một tổng', 'bình phương của một hiệu'][t]}: $${P} = ${opts[0]}$.`);
}

function g8pt(lv) {
  const X = (v) => `$x = ${v}$`;
  if (lv === 1) {
    const a = pick([-9, -7, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]), r = nz(-9, 9), b = -a * r;
    return mc(`Giải phương trình $${poly([a, b])} = 0$.`, r, [-r, r + 1, -r - 1],
      `$${a}x = ${-b} \\Rightarrow x = ${-b} : ${p(a)} = ${r}$.`, null, X);
  }
  if (lv === 2) {
    let a, c; do { a = nz(-6, 6); c = nz(-6, 6); } while (a === c);
    const r = nz(-8, 8), b = ri(-9, 9), d = (a - c) * r + b;
    return mc(`Giải phương trình $${poly([a, b])} = ${poly([c, d])}$.`, r, [-r, (d + b) / (a - c), a + c ? (d - b) / (a + c) : null, r + 2],
      `Chuyển vế: $${poly([a - c, 0])} = ${d - b} \\Rightarrow x = ${r}$.`, null, X);
  }
  if (Math.random() < 0.5) {
    const s = ri(10, 60), k = ri(2, 30), S = 2 * s + k;
    return mc(`Tổng của hai số là ${S}, số lớn hơn số bé ${k} đơn vị. Tìm số bé.`, s, [s + k, S - k, S % 2 ? s - 1 : S / 2],
      `Gọi số bé là $x$ thì số lớn là $x + ${k}$: $x + x + ${k} = ${S} \\Rightarrow 2x = ${S - k} \\Rightarrow x = ${s}$.`, null, txt);
  }
  const w = ri(3, 20), k = ri(2, 10), P = 2 * (2 * w + k);
  return mc(`Một mảnh vườn hình chữ nhật có chu vi ${P} m, chiều dài hơn chiều rộng ${k} m. Tính chiều rộng mảnh vườn.`, w,
    [w + k, P % 4 ? w + 1 : P / 4, P / 2 - k],
    `Gọi chiều rộng là $x$ (m), chiều dài là $x + ${k}$: $2(x + x + ${k}) = ${P} \\Rightarrow 2x + ${k} = ${P / 2} \\Rightarrow x = ${w}$.`,
    null, (v) => `${v} m`);
}

function g8hamso(lv) {
  if (lv === 1) {
    const a = pick([-3, -2, -1, 1, 2, 3]), b = nz(-3, 3), x2 = Math.abs(a + b) <= 4 ? 1 : -1, y2 = a * x2 + b;
    const fig = { kind: 'coord', data: { x: [-4, 4], y: [-4, 4], curves: [{ b: a, c: b }],
      pts: [{ x: 0, y: b, l: pt(0, b) }, { x: x2, y: y2, l: pt(x2, y2), dash: true }] } };
    return mc('Đường thẳng trong hình là đồ thị của hàm số nào?', lin(a, b),
      [lin(-a, b), lin(a, -b), lin(b, a), lin(a + Math.sign(a), b)],
      `Đường thẳng cắt trục $Oy$ tại $${pt(0, b)}$ nên $b = ${b}$; đi qua $${pt(x2, y2)}$ nên $${y2} = a \\cdot ${p(x2)} + ${p(b)}$, suy ra $a = ${a}$.`, fig);
  }
  if (lv === 2) {
    const a = nz(-4, 4), b = ri(-5, 5);
    if (Math.random() < 0.5) return mc(`Hệ số góc của đường thẳng $${lin(a, b)}$ là`, a, [b, -a, a + b],
      `Đường thẳng $y = ax + b$ có hệ số góc là $a$; ở đây $a = ${a}$.`);
    const x = nz(-3, 3), y = a * x + b, on = (u, v) => a * u + b === v;
    const w = [[x, y + 1], [x, -y], [y, x], [-x, y], [x, y - 2]].filter(([u, v]) => !on(u, v)).map(([u, v]) => pt(u, v));
    return mc(`Điểm nào thuộc đồ thị hàm số $${lin(a, b)}$?`, pt(x, y), w,
      `Thay $x = ${x}$: $y = ${a} \\cdot ${p(x)} + ${p(b)} = ${y}$, nên điểm $${pt(x, y)}$ thuộc đồ thị.`);
  }
  const a = nz(-4, 4), x0 = nz(-4, 4), b = -a * x0;
  return mc(`Đồ thị hàm số $${lin(a, b)}$ cắt trục hoành tại điểm nào?`, pt(x0, 0), [pt(0, b), pt(-x0, 0), pt(b, 0), pt(0, x0)],
    `Cho $y = 0$: $${poly([a, b])} = 0 \\Rightarrow x = ${x0}$. Giao điểm là $${pt(x0, 0)}$.`);
}

const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [15, 20, 25]];
function g8pytago(lv) {
  const [a, b, c] = pick(TRIPLES), sw = Math.random() < 0.5, AB = sw ? a : b, AC = sw ? b : a, cm = (v) => `${v} cm`;
  if (lv === 1) return mc(`Cho tam giác $ABC$ vuông tại $A$ có $AB = ${AB}$ cm, $AC = ${AC}$ cm. Tính độ dài $BC$.`, c,
    [AB + AC, AB * AB + AC * AC, c + 1, c - 2],
    `Định lí Pythagore: $BC^2 = AB^2 + AC^2 = ${AB * AB} + ${AC * AC} = ${c * c}$, nên $BC = ${c}$ cm.`,
    { kind: 'righttri', data: { ab: AB, ac: AC, labels: { AB: cm(AB), AC: cm(AC), BC: '?' } } }, cm);
  if (lv === 2) return mc(`Cho tam giác $ABC$ vuông tại $A$ có $AB = ${AB}$ cm, $BC = ${c}$ cm. Tính độ dài $AC$.`, AC,
    [c - AB, c + AB, AB, c * c - AB * AB],
    `$AC^2 = BC^2 - AB^2 = ${c * c} - ${AB * AB} = ${AC * AC}$, nên $AC = ${AC}$ cm.`,
    { kind: 'righttri', data: { ab: AB, ac: AC, labels: { AB: cm(AB), AC: '?', BC: cm(c) } } }, cm);
  if (Math.random() < 0.5) {
    const [x, y, z] = pick(TRIPLES.slice(0, 3)), right = (u, v, w) => u * u + v * v === w * w;
    const w = [[x, y, z + 1], [x + 1, y, z], [x, y + 1, z + 1], [x + 1, y + 1, z + 1], [x, y, z - 1]].filter((t) => !right(...t));
    const T = (t) => t.map(cm).join('; ');
    return mc('Bộ ba độ dài nào dưới đây là độ dài ba cạnh của một tam giác vuông?', T([x, y, z]), w.map(T),
      `$${x}^2 + ${y}^2 = ${x * x + y * y} = ${z}^2$ nên đó là ba cạnh của tam giác vuông (định lí Pythagore đảo).`, null, txt);
  }
  const [x, y, z] = pick(TRIPLES.slice(0, 3)), m = (v) => `${v} m`;
  return mc(`Một chiếc thang dài ${z} m đặt tựa vào bức tường thẳng đứng, chân thang cách chân tường ${x} m. Đỉnh thang cách mặt đất bao nhiêu mét?`,
    y, [z - x, z + x, z, y + 1],
    `Thang, tường và mặt đất tạo thành tam giác vuông: chiều cao $= \\sqrt{${z}^2 - ${x}^2} = \\sqrt{${z * z - x * x}} = ${y}$ (m).`,
    { kind: 'righttri', data: { ab: x, ac: y, labels: { AB: m(x), AC: '?', BC: m(z) } } }, m);
}

/* =================== LỚP 9 =================== */
const sq = (k, m) => (k === 1 ? '' : k === -1 ? '-' : k) + `\\sqrt{${m}}`;
function g9can(lv) {
  if (lv === 1) {
    const n = ri(2, 20);
    if (Math.random() < 0.5) return mc(`Tính $\\sqrt{${n * n}}$.`, n, [n * n, 2 * n, -n, n + 1], `$${n}^2 = ${n * n}$ và $${n} > 0$ nên $\\sqrt{${n * n}} = ${n}$.`);
    return mc(`Tính $\\sqrt{(${-n})^{2}}$.`, n, [-n, n * n, -n * n], `$\\sqrt{A^2} = |A|$ nên $\\sqrt{(${-n})^{2}} = |${-n}| = ${n}$.`);
  }
  if (lv === 2) {
    let m, k; do { m = pick([2, 3, 5, 6, 7]); k = ri(2, 6); } while (m === k);
    return mc(`Rút gọn $\\sqrt{${k * k * m}}$.`, sq(k, m), [sq(m, k), sq(k * k, m), sq(k, k * m), sq(m, k * k)],
      `$\\sqrt{${k * k * m}} = \\sqrt{${k}^2 \\cdot ${m}} = ${sq(k, m)}$.`);
  }
  const m = pick([2, 3, 5]), plus = Math.random() < 0.6, op = plus ? '+' : '-';
  let k1, k2; do { k1 = ri(2, 5); k2 = ri(2, 5); } while (k1 === k2);
  const r = plus ? k1 + k2 : k1 - k2, A = k1 * k1 * m, B = k2 * k2 * m;
  return mc(`Rút gọn $\\sqrt{${A}} ${op} \\sqrt{${B}}$.`, sq(r, m),
    [plus || A > B ? `\\sqrt{${plus ? A + B : A - B}}` : null, sq(k1 * k2, m), sq(plus ? k1 - k2 : k1 + k2, m), sq(r, 2 * m)],
    `$\\sqrt{${A}} ${op} \\sqrt{${B}} = ${sq(k1, m)} ${op} ${sq(k2, m)} = ${sq(r, m)}$.`);
}

function g9hept(lv) {
  const x = ri(-5, 5), y = ri(-5, 5);
  let a1 = 1, b1 = 1, a2 = 1, b2 = -1;
  if (lv > 1) { const R = lv === 2 ? 3 : 6; do { a1 = nz(-R, R); b1 = nz(-R, R); a2 = nz(-R, R); b2 = nz(-R, R); } while (a1 * b2 === a2 * b1); }
  const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y, eq = (a, b, c) => `${terms([[a, 'x'], [b, 'y']])} = ${c}`;
  return mc(`Nghiệm của hệ phương trình $\\sys{${eq(a1, b1, c1)}}{${eq(a2, b2, c2)}}$ là`, pt(x, y),
    [pt(y, x), pt(-x, y), pt(x, -y), pt(x + 1, y), pt(x, y - 1)],
    lv === 1 ? `Cộng từng vế hai phương trình: $2x = ${c1 + c2}$ nên $x = ${x}$; thay vào được $y = ${y}$.`
      : `Dùng phương pháp cộng đại số hoặc phương pháp thế, được $x = ${x}$, $y = ${y}$. Thử lại: $${a1} \\cdot ${p(x)} + ${p(b1)} \\cdot ${p(y)} = ${c1}$ và $${a2} \\cdot ${p(x)} + ${p(b2)} \\cdot ${p(y)} = ${c2}$.`);
}

const cf = (n, d) => { const s = fr(n, d); return s === '1' ? '' : s === '-1' ? '-' : s; }; // hệ số đứng trước x^2
function g9parabol(lv) {
  if (lv === 1) {
    const [n, d] = pick([[1, 1], [-1, 1], [2, 1], [-2, 1], [1, 2], [-1, 2]]), x0 = d === 2 ? 2 : 1, y0 = (n / d) * x0 * x0;
    const P = (nn, dd) => `y = ${cf(nn, dd)}x^2`;
    const fig = { kind: 'coord', data: { x: [-3, 3], y: n > 0 ? [-1, 5] : [-5, 1], curves: [{ a: n / d }],
      pts: [{ x: x0, y: y0, l: pt(x0, y0), dash: true }, { x: -x0, y: y0 }] } };
    return mc('Parabol trong hình là đồ thị của hàm số nào?', P(n, d), [P(-n, d), P(2 * n, d), P(n, 2 * d)],
      `Parabol đi qua điểm $${pt(x0, y0)}$ nên $${y0} = a \\cdot ${x0}^2$, suy ra $a = ${fr(n, d)}$.`, fig);
  }
  if (lv === 2) {
    const a = nz(-3, 3), t = nz(-4, 4);
    return mc(`Cho hàm số $y = ${cf(a, 1)}x^2$. Tính giá trị của $y$ khi $x = ${t}$.`, a * t * t, [2 * a * t, -a * t * t, (a * t) ** 2, a * t],
      `$y = ${a} \\cdot ${p(t)}^2 = ${a} \\cdot ${t * t} = ${a * t * t}$.`);
  }
  let r1, r2; do { r1 = ri(-3, 3); r2 = ri(-3, 3); } while (r1 >= r2);
  const m = r1 + r2, n = -r1 * r2, S = (u, v) => { [u, v] = [Math.min(u, v) || 0, Math.max(u, v) || 0]; return u === v ? `x = ${u}` : `x = ${u}; x = ${v}`; };
  return mc(`Hoành độ giao điểm của parabol $y = x^2$ và đường thẳng $${lin(m, n)}$ là`, S(r1, r2),
    [S(-r1, -r2), S(r1, -r2), S(-r1, r2), S(r1 + 1, r2 + 1), S(r1 - 1, r2 - 1)],
    `Phương trình hoành độ giao điểm: $x^2 = ${poly([m, n])} \\Leftrightarrow ${poly([1, -m, -n])} = 0 \\Leftrightarrow ${factor(r1)}${factor(r2)} = 0$, nên $x = ${r1}$ hoặc $x = ${r2}$.`,
    { kind: 'coord', data: { x: [-4, 4], y: [-1, 10], curves: [{ a: 1 }, { b: m, c: n }] } });
}

function g9ptb2(lv) {
  if (lv === 1) {
    const a = nz(-3, 3), b = ri(-7, 7), c = nz(-6, 6), D = b * b - 4 * a * c;
    return mc(`Tính biệt thức $\\Delta$ của phương trình $${poly([a, b, c])} = 0$.`, D, [b * b + 4 * a * c, b - 4 * a * c, b * b - 2 * a * c, -D],
      `$\\Delta = b^2 - 4ac = ${p(b)}^2 - 4 \\cdot ${p(a)} \\cdot ${p(c)} = ${D}$.`);
  }
  if (lv === 2) {
    let r1, r2; do { r1 = ri(-6, 6); r2 = ri(-6, 6); } while (r1 >= r2);
    const S = (u, v) => { [u, v] = [Math.min(u, v) || 0, Math.max(u, v) || 0]; return u === v ? `x = ${u}` : `x_1 = ${u}, x_2 = ${v}`; };
    const P = poly([1, -(r1 + r2), r1 * r2]);
    return mc(`Giải phương trình $${P} = 0$.`, S(r1, r2), [S(-r1, -r2), S(r1, -r2), S(-r1, r2), S(r1 + 1, r2 - 1)],
      `$${P} = ${factor(r1)}${factor(r2)}$ nên phương trình có hai nghiệm $x = ${r1}$ và $x = ${r2}$ (có thể dùng công thức nghiệm, $\\Delta = ${(r1 - r2) ** 2}$).`);
  }
  const a = pick([-2, -1, 1, 2]), r1 = ri(-5, 5), r2 = ri(-5, 5), b = -a * (r1 + r2), c = a * r1 * r2;
  const head = `Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $${poly([a, b, c])} = 0$.`, t = ri(0, 2);
  if (t === 0) return mc(`${head} Tính $x_1 + x_2$.`, fr(-b, a), [fr(b, a), fr(c, a), fr(-c, a), fr(-b + a, a), fr(-b - a, a)],
    `Định lí Vi-ét: $x_1 + x_2 = -\\frac{b}{a} = ${fr(-b, a)}$.`);
  if (t === 1) return mc(`${head} Tính $x_1 x_2$.`, fr(c, a), [fr(-c, a), fr(-b, a), fr(b, a), fr(c + a, a), fr(c - a, a)],
    `Định lí Vi-ét: $x_1 x_2 = \\frac{c}{a} = ${fr(c, a)}$.`);
  const s = r1 + r2, q = r1 * r2, v = s * s - 2 * q;
  return mc(`${head} Tính $x_1^2 + x_2^2$.`, v, [s * s + 2 * q, s * s - q, s * s, v + 2],
    `$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = ${p(s)}^2 - 2 \\cdot ${p(q)} = ${v}$ (Vi-ét: $x_1 + x_2 = ${s}$, $x_1 x_2 = ${q}$).`);
}

function g9luonggiac(lv) {
  const [x, y, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), sw = Math.random() < 0.5, AB = sw ? x : y, AC = sw ? y : x;
  const V = lv === 3 ? 'C' : 'B', fn = lv === 1 ? pick(['sin', 'cos']) : lv === 2 ? pick(['tan', 'cot']) : pick(['sin', 'cos', 'tan', 'cot']);
  const [opN, opV, adN, adV] = V === 'B' ? ['AC', AC, 'AB', AB] : ['AB', AB, 'AC', AC];
  const val = { sin: [opN, 'BC', opV, c], cos: [adN, 'BC', adV, c], tan: [opN, adN, opV, adV], cot: [adN, opN, adV, opV] };
  const F = (k) => fr(val[k][2], val[k][3]), ans = F(fn), [tN, mN, tV, mV] = val[fn];
  return mc(`Cho tam giác $ABC$ vuông tại $A$ có $AB = ${AB}$ cm, $AC = ${AC}$ cm, $BC = ${c}$ cm. Tính $\\${fn} ${V}$.`, ans,
    ['sin', 'cos', 'tan', 'cot'].filter((k) => k !== fn).map(F).concat([fr(val[fn][3], val[fn][2])]),
    `Với góc $${V}$: cạnh đối là $${opN}$, cạnh kề là $${adN}$, cạnh huyền là $BC$. $\\${fn} ${V} = \\frac{${tN}}{${mN}} = \\frac{${tV}}{${mV}} = ${ans}$.`,
    { kind: 'righttri', data: { ab: AB, ac: AC, mark: V, labels: { AB: AB, AC: AC, BC: c } } });
}

function g9duongtron(lv) {
  const D = (v) => `$${deg(v)}$`;
  if (lv < 3) {
    const x = ri(25, 75), ctr = 2 * x;
    const fig = { kind: 'circle', data: { pts: { A: 270 - x, B: 270 + x, C: 90 },
      segs: [['O', 'A'], ['O', 'B'], ['C', 'A'], ['C', 'B']],
      angles: [['O', 'A', 'B', lv === 1 ? ctr + '°' : '?'], ['C', 'A', 'B', lv === 1 ? '?' : x + '°']] } };
    if (lv === 1) return mc(`Cho đường tròn tâm $O$ có góc ở tâm $\\hat{AOB} = ${deg(ctr)}$, điểm $C$ thuộc cung lớn $AB$. Tính góc nội tiếp $\\hat{ACB}$.`,
      x, [ctr, 180 - ctr, 180 - x, 2 * ctr < 180 ? 2 * ctr : null],
      `Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung: $\\hat{ACB} = ${deg(ctr)} : 2 = ${deg(x)}$.`, fig, D);
    return mc(`Cho đường tròn tâm $O$, điểm $C$ thuộc cung lớn $AB$ và góc nội tiếp $\\hat{ACB} = ${deg(x)}$. Tính góc ở tâm $\\hat{AOB}$.`,
      ctr, [x, x % 2 ? null : x / 2, 180 - x, 360 - ctr],
      `Góc ở tâm gấp đôi góc nội tiếp cùng chắn một cung: $\\hat{AOB} = 2 \\cdot ${deg(x)} = ${deg(ctr)}$.`, fig, D);
  }
  const x = ri(20, 70);
  return mc(`Cho đường tròn tâm $O$ đường kính $AB$, điểm $C$ thuộc đường tròn và $\\hat{CAB} = ${deg(x)}$. Tính $\\hat{ABC}$.`, 90 - x,
    [x, 180 - x, 2 * x < 180 ? 2 * x : null, 90 + x],
    `Góc nội tiếp chắn nửa đường tròn là góc vuông nên $\\hat{ACB} = ${deg(90)}$. Do đó $\\hat{ABC} = ${deg(90)} - ${deg(x)} = ${deg(90 - x)}$.`,
    { kind: 'circle', data: { pts: { A: 180, B: 0, C: 2 * x }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C']],
      angles: [['A', 'C', 'B', x + '°'], ['B', 'C', 'A', '?'], ['C', 'A', 'B', '', true]] } }, D);
}

/* =================== DANH MỤC BÀI =================== */
export const GRADES = [6, 7, 8, 9];
export const SKILLS = [
  { code: '6-UCLN', grade: 6, name: 'ƯCLN và BCNN', gen: g6ucln },
  { code: '6-LUYTHUA', grade: 6, name: 'Lũy thừa, thứ tự thực hiện phép tính', gen: g6luythua },
  { code: '6-SONGUYEN', grade: 6, name: 'Cộng, trừ số nguyên', gen: g6songuyen },
  { code: '6-PHANSO', grade: 6, name: 'Phân số', gen: g6phanso },
  { code: '6-BIEUDO', grade: 6, name: 'Đọc biểu đồ cột', gen: g6bieudo },
  { code: '7-SOHUUTI', grade: 7, name: 'Số hữu tỉ', gen: g7sohuuti },
  { code: '7-TILE', grade: 7, name: 'Tỉ lệ thức, đại lượng tỉ lệ', gen: g7tile },
  { code: '7-GOC', grade: 7, name: 'Tổng các góc của tam giác', gen: g7goc },
  { code: '7-DATHUC', grade: 7, name: 'Đa thức một biến', gen: g7dathuc },
  { code: '8-HDT', grade: 8, name: 'Hằng đẳng thức đáng nhớ', gen: g8hdt },
  { code: '8-PT', grade: 8, name: 'Phương trình bậc nhất một ẩn', gen: g8pt },
  { code: '8-HAMSO', grade: 8, name: 'Hàm số bậc nhất và đồ thị', gen: g8hamso },
  { code: '8-PYTAGO', grade: 8, name: 'Định lí Pythagore', gen: g8pytago },
  { code: '9-CAN', grade: 9, name: 'Căn bậc hai', gen: g9can },
  { code: '9-HEPT', grade: 9, name: 'Hệ hai phương trình bậc nhất', gen: g9hept },
  { code: '9-PARABOL', grade: 9, name: 'Hàm số y = ax² và parabol', gen: g9parabol },
  { code: '9-PTB2', grade: 9, name: 'Phương trình bậc hai, Vi-ét', gen: g9ptb2 },
  { code: '9-LUONGGIAC', grade: 9, name: 'Tỉ số lượng giác của góc nhọn', gen: g9luonggiac },
  { code: '9-DUONGTRON', grade: 9, name: 'Góc ở tâm, góc nội tiếp', gen: g9duongtron },
];
export const skill = (code) => SKILLS.find((s) => s.code === code) || null;

/** Sinh 1 câu của bài `code` ở mức `lv` (thử lại nếu lần sinh ngẫu nhiên không đủ phương án). */
export function make(code, lv) {
  const s = skill(code);
  for (let i = 0; ; i++) {
    try { const q = s.gen(lv); q.code = code; q.lv = lv; return q; } catch (e) { if (i >= 30) throw e; }
  }
}
