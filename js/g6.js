// g6.js — các dạng bài Toán 6 (SGK Kết nối tri thức)
import { ri, pick, nz, gcd, lcm, shuffle, fr, p, deg, terms, poly, lin, pt, factor, mc, txt, sq, cf, coprime, TRIPLES, dc, pickTF, range, sum, roman, isPrime, divisors, kpi } from './core.js';
/* =================== LỚP 6 =================== */

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
    const a = ri(2, 9), mul = Math.random() < 0.5, m = ri(4, 9), n = ri(2, mul ? 7 : m - 2), e = mul ? m + n : m - n, ans = `${a}^{${e}}`;
    const w = mul ? [m * n, e + 1, e - 1] : [m + n, e + 1, Math.max(1, e - 1)];
    return mc(`Viết kết quả dưới dạng một luỹ thừa: $${a}^{${m}} ${mul ? '\\cdot' : ':'} ${a}^{${n}}$.`, ans,
      [...w.map((k) => `${a}^{${k}}`), `${a * a}^{${e}}`],
      mul ? `Nhân hai luỹ thừa cùng cơ số: giữ cơ số, cộng số mũ: $${m} + ${n} = ${e}$.`
        : `Chia hai luỹ thừa cùng cơ số: giữ cơ số, trừ số mũ: $${m} - ${n} = ${e}$.`);
  }
  const a = ri(2, 20), b = ri(2, 5), c = ri(2, 4), d = ri(1, 12), v = a + b * c * c - d;
  return mc(`Tính $${a} + ${b} \\cdot ${c}^{2} - ${d}$.`, v, [(a + b) * c * c - d, a + (b * c) ** 2 - d, a + b * c * 2 - d],
    `Luỹ thừa trước, rồi nhân, cuối cùng cộng trừ: $${c}^2 = ${c * c}$; $${b} \\cdot ${c * c} = ${b * c * c}$; $${a} + ${b * c * c} - ${d} = ${v}$.`);
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


/* =========================================================================
 * BỔ SUNG THEO SGK TOÁN 6 (Kết nối tri thức) — mỗi hàm ghi bài tương ứng
 * ========================================================================= */
const cmU = (v) => `${v} cm`, cm2U = (v) => `${v} cm²`, degU = (v) => `$${v}^\\circ$`;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// Bài 1–3. Tập hợp · Cách ghi số tự nhiên (số La Mã) · Thứ tự trong tập hợp số tự nhiên
function g6taphop(lv) {
  if (lv === 1) {
    const A = shuffle(range(1, 20)).slice(0, 5).sort((a, b) => a - b), out = range(1, 20).filter((x) => !A.includes(x));
    const a = pick(A), c = pick(A.filter((x) => x !== a)), b = pick(out), d = pick(out.filter((x) => x !== b));
    return mc(`Cho tập hợp $A = \\{${A.join('; ')}\\}$. Khẳng định nào đúng?`, `${a} \\in A`, [`${b} \\in A`, `${c} \\notin A`, `${d} \\in A`],
      `$${a}$ là một phần tử của $A$ nên $${a} \\in A$; còn $${b}$ không có trong $A$ nên $${b} \\notin A$.`);
  }
  if (lv === 2) {
    const a = ri(2, 15), b = a + ri(4, 12), t = ri(0, 2);
    const cond = [`${a} \\le x < ${b}`, `${a} < x \\le ${b}`, `${a} \\le x \\le ${b}`][t], n = [b - a, b - a, b - a + 1][t];
    const list = t === 1 ? range(a + 1, b) : t === 0 ? range(a, b - 1) : range(a, b);
    return mc(`Tập hợp $B = \\{x \\in \\N \\mid ${cond}\\}$ có bao nhiêu phần tử?`, n, [n + 1, n - 1, b],
      `$B = \\{${list.length > 6 ? list.slice(0, 3).join('; ') + '; ...; ' + list[list.length - 1] : list.join('; ')}\\}$ có $${n}$ phần tử.`);
  }
  const n = ri(4, 30), r = roman(n);
  if (Math.random() < 0.5) return mc(`Số $${n}$ viết bằng số La Mã là`, r, [roman(n + 1), roman(Math.max(1, n - 1)), r.split('').reverse().join(''), roman(n + 5)],
    `$${n}$ = ${r} (X = 10, V = 5, I = 1; IV = 4, IX = 9).`, null, txt);
  return mc(`Số La Mã ${r} có giá trị bằng`, n, [n + 2, n - 2, n + 10 <= 39 ? n + 10 : n - 3], `${r} = $${n}$.`);
}

// Bài 4–5. Phép cộng, trừ, nhân, chia số tự nhiên
function g6pheptinh(lv) {
  if (lv === 1) {
    const b = ri(3, 12), q = ri(5, 40), r = ri(1, b - 1), a = b * q + r, S = (x, y) => `thương ${x}, dư ${y}`;
    return mc(`Chia $${a}$ cho $${b}$ được`, S(q, r), [S(q + 1, r), S(q, r + 1 < b ? r + 1 : r - 1), S(q - 1, r + b)],
      `$${a} = ${b} \\cdot ${q} + ${r}$ với $0 < ${r} < ${b}$.`, null, txt);
  }
  if (lv === 2) {
    const a = ri(12, 99), b = ri(11, 89), c = 100 - b;
    return mc(`Tính nhanh: $${a} \\cdot ${b} + ${a} \\cdot ${c}$.`, a * 100, [a * 100 + a, a * b + c, a * 10],
      `Tính chất phân phối: $${a} \\cdot (${b} + ${c}) = ${a} \\cdot 100 = ${a * 100}$.`);
  }
  const a = ri(1, 30), x = a + ri(2, 40), b = ri(2, 9), c = b * (x - a);
  return mc(`Tìm số tự nhiên $x$, biết $(x - ${a}) \\cdot ${b} = ${c}$.`, x, [c / b - a, c - a, x + b].filter((v) => v > 0),
    `$x - ${a} = ${c} : ${b} = ${x - a}$, nên $x = ${x - a} + ${a} = ${x}$.`, null, (v) => `$x = ${v}$`);
}

// Bài 8–9. Quan hệ chia hết · Dấu hiệu chia hết
function g6chiahet(lv) {
  if (lv === 1) {
    const k = pick([2, 3, 5, 9]), ok = (n) => n % k === 0;
    let a; do a = ri(100, 999); while (!ok(a));
    const w = []; while (w.length < 3) { const n = ri(100, 999); if (!ok(n) && !w.includes(n)) w.push(n); }
    const why = { 2: 'chữ số tận cùng là chữ số chẵn', 5: 'chữ số tận cùng là 0 hoặc 5', 3: 'tổng các chữ số chia hết cho 3', 9: 'tổng các chữ số chia hết cho 9' }[k];
    const ds = String(a).split('').map(Number);
    return mc(`Số nào chia hết cho $${k}$?`, a, w, `$${a}$ có ${why}${k === 3 || k === 9 ? ` ($${ds.join(' + ')} = ${sum(ds)}$)` : ''}.`);
  }
  if (lv === 2) {
    const d1 = ri(1, 9), d2 = ri(0, 9), s = d1 + d2;
    if (Math.random() < 0.5 && s % 9) {
      const x = 9 - (s % 9);
      return mc(`Tìm chữ số $*$ để số $\\overline{${d1}${d2}*}$ chia hết cho $9$.`, x, [(x + 3) % 10, (x + 1) % 10, (x + 6) % 10],
        `Tổng các chữ số $${d1} + ${d2} + * = ${s} + *$ phải chia hết cho 9 nên $* = ${x}$.`, null, (v) => `$* = ${v}$`);
    }
    const n = s % 3 === 0 ? 4 : 3, list = range(0, 9).filter((x) => (s + x) % 3 === 0);
    return mc(`Có bao nhiêu chữ số $*$ để số $\\overline{${d1}${d2}*}$ chia hết cho $3$?`, n, [n === 4 ? 3 : 4, 1, 10],
      `$${s} + *$ chia hết cho 3 khi $* \\in \\{${list.join('; ')}\\}$: có ${n} chữ số.`);
  }
  const n = pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48]), D = divisors(n), S = (l) => `\\{${l.join('; ')}\\}`;
  const miss = pick(D.filter((d) => d !== 1 && d !== n)), extra = pick([7, 11, 13].filter((x) => n % x));
  return mc(`Tập hợp các ước của $${n}$ là`, S(D), [S(D.filter((d) => d !== miss)), S(D.concat([extra]).sort((a, b) => a - b)), S(D.filter((d) => d !== 1))],
    `Lần lượt chia $${n}$ cho $1, 2, 3, ...$: các ước là $${D.join(', ')}$.`);
}

// Bài 10. Số nguyên tố
function g6snt(lv) {
  if (lv === 1) {
    const a = pick(range(11, 97).filter(isPrime));
    return mc('Số nào sau đây là số nguyên tố?', a, shuffle([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93]).slice(0, 3),
      `$${a}$ chỉ có hai ước là $1$ và $${a}$ nên là số nguyên tố.`);
  }
  if (lv === 2) {
    const e = [ri(1, 4), ri(0, 2), ri(0, 2)]; if (e[1] + e[2] === 0) e[1] = 1;
    const n = 2 ** e[0] * 3 ** e[1] * 5 ** e[2];
    const F = (a, b, c) => [[2, a], [3, b], [5, c]].filter((x) => x[1] > 0).map(([q, k]) => (k > 1 ? `${q}^{${k}}` : q)).join(' \\cdot ');
    return mc(`Phân tích số $${n}$ ra thừa số nguyên tố.`, `${n} = ${F(...e)}`,
      [`${n} = ${F(e[0] + 1, Math.max(0, e[1] - 1), e[2])}`, `${n} = ${F(e[0], e[1] + 1, e[2])}`, `${n} = ${F(e[0], e[1], e[2] + 1)}`, `${n} = 4 \\cdot ${n / 4}`],
      `Chia liên tiếp cho các số nguyên tố $2, 3, 5$: $${n} = ${F(...e)}$.`);
  }
  const m = ri(10, 40), L = range(2, m - 1).filter(isPrime);
  return mc(`Có bao nhiêu số nguyên tố nhỏ hơn $${m}$?`, L.length, [L.length + 1, L.length - 1, L.length + 2], `Các số nguyên tố nhỏ hơn $${m}$: $${L.join(', ')}$.`);
}

// Bài 13. Tập hợp các số nguyên
function g6tapZ(lv) {
  if (lv === 1) {
    let a, b; do { a = ri(-12, 12); b = ri(-12, 12); } while (a === b);
    const lo = Math.min(a, b), hi = Math.max(a, b);
    return mc('Khẳng định nào đúng?', `${lo} < ${hi}`, [`${lo} > ${hi}`, `${-ri(1, 9)} > 0`, `${hi} < ${lo}`],
      `Trên trục số, $${lo}$ nằm bên trái $${hi}$ nên $${lo} < ${hi}$.`,
      { kind: 'numberline', data: { min: Math.min(lo, 0) - 1, max: Math.max(hi, 0) + 1, marks: [lo, hi] } });
  }
  if (lv === 2) {
    const A = shuffle(range(-15, 15)).slice(0, 5), S = A.slice().sort((x, y) => x - y), L = (l) => l.join('; ');
    return mc(`Sắp xếp các số $${A.join('; ')}$ theo thứ tự tăng dần.`, L(S),
      [L(S.slice().reverse()), L(S.slice().sort((x, y) => Math.abs(x) - Math.abs(y))), L([S[1], S[0], ...S.slice(2)])],
      `Số âm nhỏ hơn 0 và nhỏ hơn mọi số dương; trong hai số âm, số nào xa 0 hơn thì nhỏ hơn: $${L(S)}$.`);
  }
  const t0 = ri(-8, 6), up = ri(3, 12), down = ri(4, 15), t = t0 + up - down;
  return mc(`Nhiệt độ lúc 6 giờ sáng ở Sa Pa là $${t0}^\\circ C$, đến trưa tăng thêm $${up}^\\circ C$, đến tối lại giảm $${down}^\\circ C$. Nhiệt độ lúc tối là`,
    t, [t0 + up + down, t0 - up + down, -t], `$${t0} + ${up} - ${down} = ${t}$ ($^\\circ C$).`, null, (v) => `$${v}^\\circ C$`);
}

// Bài 15. Quy tắc dấu ngoặc
function g6daungoac(lv) {
  if (lv === 1) {
    const a = ri(10, 99), b = ri(10, 99), c = ri(1, 50), v = a - (b - c);
    return mc(`Tính $${a} - (${b} - ${c})$.`, v, [a - b - c, a + b - c, -v], `Bỏ ngoặc có dấu "−" đằng trước thì đổi dấu các số hạng trong ngoặc: $${a} - ${b} + ${c} = ${v}$.`);
  }
  if (lv === 2) {
    const a = pick([2024, 2025, 1999, 357, 468, 1234]), b = ri(10, 99), c = ri(10, 99);
    return mc(`Tính nhanh: $(${a} + ${b}) - (${a} - ${c})$.`, b + c, [b - c, 2 * a + b - c, b + c + 2 * a],
      `$${a} + ${b} - ${a} + ${c} = (${a} - ${a}) + ${b} + ${c} = ${b + c}$.`);
  }
  const a = nz(-30, 30), b = nz(-30, 30), c = nz(-30, 30), d = nz(-30, 30), v = a - (b - c) - d;
  return mc(`Tính $${a} - (${b} - ${p(c)}) + (${-d})$.`, v, [a - b - c - d, a - (b - c) + d, -v], `$${a} - ${p(b)} + ${p(c)} - ${p(d)} = ${v}$.`);
}

// Bài 16. Phép nhân số nguyên
function g6nhanZ(lv) {
  if (lv === 1) {
    const a = nz(-15, 15), b = nz(-12, 12);
    return mc(`Tính $${p(a)} \\cdot ${p(b)}$.`, a * b, [-a * b, a + b, a * b + (a * b > 0 ? 10 : -10)],
      `${(a < 0) === (b < 0) ? 'Hai số cùng dấu: tích dương' : 'Hai số khác dấu: tích âm'}: $${a * b}$.`);
  }
  if (lv === 2) {
    const x = nz(-19, 19);
    return mc(`Tính nhanh: $(-25) \\cdot ${p(x)} \\cdot (-4)$.`, 100 * x, [-100 * x, -29 * x, 100 * x + 1],
      `$(-25) \\cdot (-4) = 100$, nên kết quả là $100 \\cdot ${p(x)} = ${100 * x}$.`);
  }
  const n = ri(10, 20), k = ri(2, n - 2), w = n - k, gain = pick([4, 5]), lose = pick([1, 2]), v = k * gain - w * lose;
  return mc(`Bài thi có ${n} câu. Mỗi câu đúng được $+${gain}$ điểm, mỗi câu sai bị $-${lose}$ điểm. Bạn An làm đúng ${k} câu, sai ${w} câu. Số điểm của An là`,
    v, [k * gain + w * lose, k * gain, -v], `$${k} \\cdot ${gain} + ${w} \\cdot (-${lose}) = ${k * gain} - ${w * lose} = ${v}$.`);
}

// Bài 17. Phép chia hết. Ước và bội của một số nguyên
function g6uocZ(lv) {
  if (lv === 1) {
    const b = nz(-9, 9), q = nz(-12, 12), a = b * q;
    return mc(`Tính $${p(a)} : ${p(b)}$.`, q, [-q, a - b, q * 2], `$${p(b)} \\cdot ${p(q)} = ${a}$ nên $${p(a)} : ${p(b)} = ${q}$.`);
  }
  if (lv === 2) {
    const n = pick([6, 8, 10, 12, 15, 18, 20]), D = divisors(n);
    return mc(`Số nguyên $${n}$ có bao nhiêu ước nguyên?`, 2 * D.length, [D.length, 2 * D.length - 1, D.length + 1],
      `Các ước dương: $${D.join(', ')}$; mỗi ước dương có một ước âm tương ứng nên có $2 \\cdot ${D.length} = ${2 * D.length}$ ước.`);
  }
  const a = nz(-9, 9), x = nz(-15, 15), b = a * x;
  return mc(`Tìm số nguyên $x$, biết $${p(a)} \\cdot x = ${b}$.`, x, [-x, b - a, b + a], `$x = ${p(b)} : ${p(a)} = ${x}$.`, null, (v) => `$x = ${v}$`);
}

// Bài 18–19. Tam giác đều, hình vuông, lục giác đều · Hình chữ nhật, thoi, bình hành, thang cân
const SHAPES = ['hình vuông', 'hình chữ nhật', 'hình thoi', 'hình bình hành', 'hình thang cân'];
const CLAIMS = [
  ['Bốn cạnh bằng nhau', [0, 2]], ['Bốn góc đều là góc vuông', [0, 1]], ['Hai đường chéo bằng nhau', [0, 1, 4]],
  ['Hai đường chéo vuông góc với nhau', [0, 2]], ['Các cạnh đối song song với nhau', [0, 1, 2, 3]],
  ['Chỉ có một cặp cạnh đối song song', [4]], ['Hai cạnh bên bằng nhau và hai góc kề một đáy bằng nhau', [4]],
];
function g6hinhphang(lv) {
  if (lv === 3) {
    const t = ri(0, 2), a = ri(2, 9);
    if (t === 0) return mc('Mỗi góc của tam giác đều bằng', 60, [90, 45, 120], 'Tam giác đều có ba góc bằng nhau và đều bằng $60^\\circ$.', null, degU);
    if (t === 1) return mc('Mỗi góc của hình lục giác đều bằng', 120, [60, 90, 135], 'Lục giác đều có sáu góc bằng nhau, mỗi góc bằng $120^\\circ$.', null, degU);
    return mc(`Ghép sáu tam giác đều cạnh $${a}$ cm thành một hình lục giác đều. Đường chéo chính của lục giác đều dài`, 2 * a, [a, 3 * a, 6 * a],
      `Đường chéo chính gồm hai cạnh tam giác đều: $2 \\cdot ${a} = ${2 * a}$ (cm).`, null, cmU);
  }
  if (lv === 1) {
    const s = ri(0, 4), tr = CLAIMS.filter((c) => c[1].includes(s)), fa = CLAIMS.filter((c) => !c[1].includes(s));
    const [t, w] = pickTF(tr, fa);
    return mc(`Khẳng định nào đúng với mọi ${SHAPES[s]}?`, t[0], w.map((c) => c[0]), `${t[0]} là một tính chất của ${SHAPES[s]}.`, null, txt);
  }
  const c = pick(CLAIMS.filter((x) => x[1].length <= 2)), yes = c[1].map((i) => SHAPES[i]), no = SHAPES.filter((_, i) => !c[1].includes(i));
  return mc(`Hình nào sau đây có tính chất: ${c[0].toLowerCase()}?`, pick(yes), no.slice(0, 3).concat(['hình tam giác đều']),
    `${c[0]} là tính chất của ${yes.join(' và ')}.`, null, txt);
}

// Bài 20. Chu vi và diện tích của một số tứ giác đã học
function g6chuvi(lv) {
  if (lv === 1) {
    const a = ri(4, 15), b = ri(2, a - 1), askS = Math.random() < 0.5;
    const fig = { kind: 'geo', data: { P: { A: [0, b], B: [a, b], C: [a, 0], D: [0, 0] }, seg: ['AB', 'BC', 'CD', 'DA'], poly: 'ABCD', len: [['AB', cmU(a)], ['BC', cmU(b)]], ang: [['ADC', '', 1]], dots: '' } };
    return askS ? mc(`Hình chữ nhật $ABCD$ có $AB = ${a}$ cm, $BC = ${b}$ cm. Diện tích hình chữ nhật là`, a * b, [2 * (a + b), a + b, a * b * 2], `$S = ${a} \\cdot ${b} = ${a * b}$ (cm²).`, fig, cm2U)
      : mc(`Hình chữ nhật $ABCD$ có $AB = ${a}$ cm, $BC = ${b}$ cm. Chu vi hình chữ nhật là`, 2 * (a + b), [a * b, a + b, 4 * a], `$C = 2 \\cdot (${a} + ${b}) = ${2 * (a + b)}$ (cm).`, fig, cmU);
  }
  if (lv === 2) {
    if (Math.random() < 0.5) {
      const d1 = 2 * ri(2, 8), d2 = 2 * ri(2, 8);
      const fig = { kind: 'geo', data: { P: { A: [0, d2 / 2], B: [d1 / 2, 0], C: [0, -d2 / 2], D: [-d1 / 2, 0] }, seg: ['AB', 'BC', 'CD', 'DA'], dash: ['AC', 'BD'], poly: 'ABCD', len: [['AC', cmU(d2)], ['DB', cmU(d1)]] } };
      return mc(`Hình thoi có độ dài hai đường chéo là $${d1}$ cm và $${d2}$ cm. Diện tích hình thoi là`, (d1 * d2) / 2, [d1 * d2, d1 + d2, 2 * (d1 + d2)],
        `$S = \\frac{${d1} \\cdot ${d2}}{2} = ${(d1 * d2) / 2}$ (cm²).`, fig, cm2U);
    }
    const a = ri(4, 14), h = ri(2, 9), s = ri(1, 3);
    const fig = { kind: 'geo', data: { P: { A: [s, h], B: [a + s, h], C: [a, 0], D: [0, 0], H: [s, 0] }, seg: ['AB', 'BC', 'CD', 'DA'], dash: ['AH'], poly: 'ABCD', len: [['DC', cmU(a)], ['AH', cmU(h)]], ang: [['AHC', '', 1]] } };
    return mc(`Hình bình hành $ABCD$ có cạnh đáy $CD = ${a}$ cm, chiều cao $AH = ${h}$ cm. Diện tích hình bình hành là`, a * h, [a * h + h, 2 * (a + h), a + h],
      `$S = ${a} \\cdot ${h} = ${a * h}$ (cm²).`, fig, cm2U);
  }
  if (Math.random() < 0.5) {
    const a = ri(6, 14), b = ri(2, a - 2), h = 2 * ri(1, 5);
    const fig = { kind: 'geo', data: { P: { A: [(a - b) / 2, h], B: [(a + b) / 2, h], C: [a, 0], D: [0, 0], H: [(a - b) / 2, 0] }, seg: ['AB', 'BC', 'CD', 'DA'], dash: ['AH'], poly: 'ABCD', len: [['AB', cmU(b)], ['DC', cmU(a)], ['AH', cmU(h)]] } };
    return mc(`Hình thang cân có hai đáy $${a}$ cm và $${b}$ cm, chiều cao $${h}$ cm. Diện tích hình thang là`, ((a + b) * h) / 2, [(a + b) * h, a * b, ((a + b) * h) / 2 + h],
      `$S = \\frac{(${a} + ${b}) \\cdot ${h}}{2} = ${((a + b) * h) / 2}$ (cm²).`, fig, cm2U);
  }
  const a = ri(8, 25), b = ri(5, 15), k = ri(2, 6);
  return mc(`Một mảnh vườn hình chữ nhật dài $${a}$ m, rộng $${b}$ m. Mỗi mét vuông thu hoạch được $${k}$ kg rau. Cả mảnh vườn thu hoạch được bao nhiêu kilôgam rau?`,
    a * b * k, [2 * (a + b) * k, a * b + k, a * b], `Diện tích: $${a} \\cdot ${b} = ${a * b}$ (m²); số rau: $${a * b} \\cdot ${k} = ${a * b * k}$ (kg).`, null, (v) => `${v} kg`);
}

// Bài 21–22. Hình có trục đối xứng · Hình có tâm đối xứng
const AXES = [['tam giác đều', '3'], ['hình vuông', '4'], ['hình chữ nhật', '2'], ['hình thoi', '2'], ['hình lục giác đều', '6'], ['hình thang cân', '1'], ['hình bình hành', '0']];
const BIG = (v) => `<b style="font-size:1.4em">${v}</b>`;
function g6doixung(lv) {
  if (lv === 1) {
    const [s, n] = pick(AXES);
    return mc(`${cap(s)} có bao nhiêu trục đối xứng?`, n, shuffle(['0', '1', '2', '3', '4', '6', 'vô số'].filter((x) => x !== n)), `${cap(s)} có ${n} trục đối xứng.`, null, txt);
  }
  if (lv === 2) {
    const yes = ['hình vuông', 'hình chữ nhật', 'hình thoi', 'hình bình hành', 'hình lục giác đều', 'hình tròn'], no = ['tam giác đều', 'hình thang cân', 'tam giác vuông', 'hình thang vuông'];
    if (Math.random() < 0.5) { const [t, w] = pickTF(yes, no); return mc('Hình nào sau đây có tâm đối xứng?', t, w, `${cap(t)} có tâm đối xứng.`, null, txt); }
    const [t, w] = pickTF(no, yes); return mc('Hình nào sau đây KHÔNG có tâm đối xứng?', t, w, `${cap(t)} không có tâm đối xứng.`, null, txt);
  }
  if (Math.random() < 0.5) { const [t, w] = pickTF(['A', 'H', 'M', 'O', 'T', 'U', 'V', 'X', 'Y', 'W'], ['F', 'G', 'J', 'L', 'N', 'P', 'Q', 'R', 'S', 'Z']); return mc('Chữ cái in hoa nào sau đây có trục đối xứng?', t, w, `Chữ ${t} có trục đối xứng.`, null, BIG); }
  const [t, w] = pickTF(['H', 'I', 'N', 'O', 'S', 'X', 'Z'], ['A', 'C', 'E', 'F', 'G', 'K', 'L', 'M', 'P', 'T', 'U', 'V', 'Y']);
  return mc('Chữ cái in hoa nào sau đây có tâm đối xứng?', t, w, `Quay chữ ${t} nửa vòng quanh tâm thì được chính nó.`, null, BIG);
}

// Bài 23–24. Phân số bằng nhau · Rút gọn · So sánh phân số · Hỗn số dương
function g6phansobn(lv) {
  if (lv === 1) {
    let a, b; do { b = ri(2, 12); a = ri(1, 3 * b); } while (gcd(a, b) !== 1 || a === b);
    const k = pick([4, 6, 8, 9]), n = a * k, d = b * k, h = k === 9 ? 3 : 2;
    return mc(`Rút gọn phân số $\\frac{${n}}{${d}}$ về phân số tối giản.`, `\\frac{${a}}{${b}}`,
      [`\\frac{${n / h}}{${d / h}}`, `\\frac{${b}}{${a}}`, `\\frac{${a + 1}}{${b}}`, `\\frac{${a}}{${b + 1}}`],
      `Chia cả tử và mẫu cho ƯCLN$(${n}, ${d}) = ${k}$: $\\frac{${n}}{${d}} = \\frac{${a}}{${b}}$.`);
  }
  if (lv === 2) {
    const F = []; while (F.length < 4) { const d = ri(2, 12), n = ri(1, 2 * d); if (gcd(n, d) === 1 && !F.some((x) => x[0] * d === n * x[1])) F.push([n, d]); }
    const best = F.reduce((m, x) => (x[0] * m[1] > m[0] * x[1] ? x : m)), S = (x) => `\\frac{${x[0]}}{${x[1]}}`;
    return mc('Phân số nào lớn nhất trong các phân số sau?', S(best), F.filter((x) => x !== best).map(S),
      `Quy đồng mẫu rồi so sánh tử: $${S(best)} \\approx ${dc(best[0] / best[1], 2)}$ là lớn nhất.`);
  }
  let c, b; do { c = ri(2, 9); b = ri(1, c - 1); } while (gcd(b, c) !== 1);
  const a = ri(1, 5);
  return mc(`Viết hỗn số $${a}\\frac{${b}}{${c}}$ dưới dạng phân số.`, `\\frac{${a * c + b}}{${c}}`, [`\\frac{${a * b + c}}{${c}}`, `\\frac{${a + b}}{${c}}`, `\\frac{${a * c * b}}{${c}}`, `\\frac{${a * c + b}}{${b}}`],
    `$${a}\\frac{${b}}{${c}} = \\frac{${a} \\cdot ${c} + ${b}}{${c}} = \\frac{${a * c + b}}{${c}}$.`);
}

// Bài 26. Phép nhân và phép chia phân số
function g6phansonc(lv) {
  const rq = () => { let a, b; do { a = nz(-9, 9); b = ri(2, 9); } while (gcd(a, b) !== 1); return [a, b]; };
  const [a, b] = rq(), [c, d] = rq(), Fq = (x, y) => (x < 0 ? `(${fr(x, y)})` : fr(x, y));
  if (lv === 1) return mc(`Tính $${fr(a, b)} \\cdot ${Fq(c, d)}$.`, fr(a * c, b * d), [fr(a * d, b * c), fr(a + c, b + d), fr(-a * c, b * d), fr(a * c, b + d)],
    `Nhân tử với tử, mẫu với mẫu: $${fr(a * c, b * d)}$.`);
  if (lv === 2) return mc(`Tính $${fr(a, b)} : ${Fq(c, d)}$.`, fr(a * d, b * c), [fr(a * c, b * d), fr(b * c, a * d), fr(-a * d, b * c), fr(a + d, b + c)],
    `Chia cho một phân số là nhân với phân số nghịch đảo: $${fr(a, b)} \\cdot ${Fq(d * Math.sign(c), Math.abs(c))} = ${fr(a * d, b * c)}$.`);
  const x = ri(2, 9), y = ri(2, 9), e = ri(1, 9), m = ri(3, 11);
  return mc(`Tính hợp lí: $\\frac{${e}}{${b}} \\cdot \\frac{${x}}{${m}} + \\frac{${e}}{${b}} \\cdot \\frac{${y}}{${m}}$.`, fr(e * (x + y), b * m),
    [fr(e * x * y, b * m), fr(2 * e * (x + y), b * m), fr(e + x + y, b + m), fr(e * (x + y), b * m * 2)],
    `$\\frac{${e}}{${b}} \\cdot (\\frac{${x}}{${m}} + \\frac{${y}}{${m}}) = \\frac{${e}}{${b}} \\cdot \\frac{${x + y}}{${m}} = ${fr(e * (x + y), b * m)}$.`);
}

// Bài 27. Hai bài toán về phân số
function g6phansobt(lv) {
  let a, b; do { b = ri(2, 9); a = ri(1, b - 1); } while (gcd(a, b) !== 1);
  if (lv === 1) {
    const N = b * ri(3, 9);
    return mc(`Lớp 6A có ${N} học sinh, trong đó $\\frac{${a}}{${b}}$ số học sinh là nữ. Lớp 6A có bao nhiêu học sinh nữ?`, (N / b) * a, [N - (N / b) * a, N / b, N * a],
      `$${N} \\cdot \\frac{${a}}{${b}} = ${(N / b) * a}$ (học sinh).`, null, (v) => `${v} học sinh`);
  }
  if (lv === 2) {
    const x = b * ri(3, 15), M = (x / b) * a;
    return mc(`$\\frac{${a}}{${b}}$ của một số bằng $${M}$. Số đó là`, x, [M * b, M + a, x + b],
      `Số cần tìm: $${M} : \\frac{${a}}{${b}} = ${M} \\cdot \\frac{${b}}{${a}} = ${x}$.`);
  }
  const N = b * 4 * ri(2, 6), d1 = (N / b) * a, rest = N - d1;
  if (rest % 2) return g6phansobt(lv);
  return mc(`Một quãng đường dài ${N} km. Ngày thứ nhất đi được $\\frac{${a}}{${b}}$ quãng đường, ngày thứ hai đi được $\\frac{1}{2}$ quãng đường còn lại. Ngày thứ hai đi được bao nhiêu kilômét?`,
    rest / 2, [N / 2, d1, rest], `Ngày 1: $${N} \\cdot \\frac{${a}}{${b}} = ${d1}$ (km); còn lại $${rest}$ km; ngày 2: $${rest} \\cdot \\frac{1}{2} = ${rest / 2}$ (km).`, null, (v) => `${v} km`);
}

// Bài 28–29. Số thập phân · Tính toán với số thập phân
function g6thapphan(lv) {
  const D = (n) => dc(n / 100); // làm việc với phần trăm (số nguyên) để không sai số
  if (lv === 1) {
    const a = ri(-999, 999), b = ri(-999, 999), plus = Math.random() < 0.5, v = plus ? a + b : a - b, Bs = b < 0 ? `(${D(b)})` : D(b);
    return mc(`Tính $${D(a)} ${plus ? '+' : '-'} ${Bs}$.`, D(v), [D(plus ? a - b : a + b), D(-v), D(v + 10)], `$${D(a)} ${plus ? '+' : '-'} ${Bs} = ${D(v)}$.`);
  }
  if (lv === 2) {
    const a = nz(-99, 99), b = ri(2, 49);
    return mc(`Tính $${dc(a / 10)} \\cdot ${dc(b / 10)}$.`, dc((a * b) / 100), [dc((a * b) / 10), dc((a * b) / 1000), dc((-a * b) / 100)],
      `Nhân như số tự nhiên: $${Math.abs(a)} \\cdot ${b} = ${Math.abs(a * b)}$; hai thừa số có tổng cộng 2 chữ số thập phân nên kết quả là $${dc((a * b) / 100)}$.`);
  }
  const q = ri(11, 99), b = pick([2, 4, 5, 8, 25]), a = q * b;
  return mc(`Tính $${dc(a / 10)} : ${b}$.`, dc(q / 10), [dc(q), dc(q / 100), dc(q / 10 + 1)], `$${dc(a / 10)} : ${b} = ${dc(q / 10)}$.`);
}

// Bài 30. Làm tròn và ước lượng
function g6lamtron(lv) {
  if (lv === 1) {
    const x = ri(1001, 99999) / 1000, [k, nm] = pick([[1, 'hàng phần mười'], [2, 'hàng phần trăm'], [0, 'hàng đơn vị']]), m = 10 ** k;
    const r = Math.round(x * m + 1e-9) / m, fl = Math.floor(x * m) / m, ce = Math.ceil(x * m) / m;
    return mc(`Làm tròn số $${dc(x)}$ đến ${nm}.`, dc(r), [dc(fl === r ? ce : fl), dc(Math.round(x * m * 10) / (m * 10)), dc(r + 1 / m), dc(r - 1 / m)].filter((s) => s !== dc(x)),
      `Xét chữ số ngay bên phải ${nm}: nhỏ hơn 5 thì giữ nguyên, từ 5 trở lên thì tăng thêm 1 đơn vị. Kết quả: $${dc(r)}$.`);
  }
  if (lv === 2) {
    const n = ri(10000, 999999), [m, nm] = pick([[10, 'hàng chục'], [100, 'hàng trăm'], [1000, 'hàng nghìn']]), r = Math.round(n / m) * m;
    return mc(`Làm tròn số $${n}$ đến ${nm}.`, r, [Math.floor(n / m) * m === r ? r + m : Math.floor(n / m) * m, Math.round(n / (m * 10)) * m * 10, r + 2 * m],
      `Chữ số ngay bên phải ${nm} là $${Math.floor((n % m) / (m / 10))}$ nên ta được $${r}$.`);
  }
  const a = ri(151, 494) / 10, b = ri(151, 494) / 10, A = Math.round(a / 10) * 10, B = Math.round(b / 10) * 10;
  return mc(`Làm tròn các thừa số đến hàng chục rồi ước lượng kết quả phép nhân $${dc(a)} \\cdot ${dc(b)}$.`, A * B, [Math.round(a) * Math.round(b), A + B, A * B * 10],
    `$${dc(a)} \\approx ${A}$, $${dc(b)} \\approx ${B}$ nên tích khoảng $${A} \\cdot ${B} = ${A * B}$.`);
}

// Bài 31. Một số bài toán về tỉ số và tỉ số phần trăm
function g6tiso(lv) {
  if (lv === 1) {
    const b = pick([20, 25, 40, 50, 80, 200]), pct = pick([10, 20, 25, 30, 40, 60, 75]), a = (b * pct) / 100;
    if (!Number.isInteger(a)) return g6tiso(lv);
    return mc(`Tỉ số phần trăm của $${a}$ và $${b}$ là`, pct, [100 - pct, pct * 2, pct + 5], `$\\frac{${a}}{${b}} \\cdot 100\\% = ${pct}\\%$.`, null, (v) => `$${v}\\%$`);
  }
  if (lv === 2) {
    const N = pick([120, 150, 200, 240, 300, 360, 400, 500]), pct = pick([5, 10, 15, 20, 25, 30, 40]), v = (N * pct) / 100;
    if (!Number.isInteger(v)) return g6tiso(lv);
    return mc(`Tính $${pct}\\%$ của $${N}$.`, v, [N - v, v * 10, N + v], `$${N} \\cdot \\frac{${pct}}{100} = ${v}$.`);
  }
  const P = pick([200, 250, 300, 400, 500, 600, 800]) * 1000, pct = pick([10, 15, 20, 25, 30]), v = (P * (100 - pct)) / 100;
  const vnd = (x) => `${x.toLocaleString('vi-VN')} đồng`;
  return mc(`Một chiếc áo giá ${vnd(P)}, nay giảm giá $${pct}\\%$. Giá mới của chiếc áo là`, v, [(P * pct) / 100, P - pct * 1000, (P * (100 + pct)) / 100],
    `Giá mới bằng $${100 - pct}\\%$ giá cũ: $${P} \\cdot ${100 - pct}\\% = ${v}$ (đồng).`, null, vnd);
}

// Bài 32–35. Điểm và đường thẳng · Tia · Đoạn thẳng · Trung điểm của đoạn thẳng
function g6doanthang(lv) {
  if (lv === 1) {
    const n = ri(4, 9), v = (n * (n - 1)) / 2, what = pick(['đường thẳng', 'đoạn thẳng']);
    return mc(`Cho ${n} điểm, trong đó không có ba điểm nào thẳng hàng. Vẽ ${what} đi qua từng cặp điểm. Có tất cả bao nhiêu ${what}?`, v, [n * (n - 1), n, v + n],
      `Mỗi điểm nối với ${n - 1} điểm còn lại, mỗi ${what} được đếm hai lần: $\\frac{${n} \\cdot ${n - 1}}{2} = ${v}$.`);
  }
  if (lv === 2) {
    const AB = ri(6, 15), AM = ri(1, AB - 1), MB = AB - AM;
    return mc(`Điểm $M$ nằm giữa hai điểm $A$ và $B$. Biết $AM = ${AM}$ cm, $AB = ${AB}$ cm. Độ dài đoạn $MB$ là`, MB, [AB + AM, AM === MB ? MB + 2 : AM, MB + 1],
      `$M$ nằm giữa $A$ và $B$ nên $AM + MB = AB$, suy ra $MB = ${AB} - ${AM} = ${MB}$ (cm).`,
      { kind: 'geo', data: { P: { A: [0, 0], M: [AM, 0], B: [AB, 0] }, seg: ['AB'], len: [['AM', AM + ' cm']] } }, cmU);
  }
  const AB = 4 * ri(2, 6), AI = (3 * AB) / 4;
  return mc(`Cho đoạn thẳng $AB = ${AB}$ cm, $M$ là trung điểm của $AB$, $I$ là trung điểm của $MB$. Độ dài đoạn $AI$ là`, AI, [AB / 4, AB / 2, AI + 2],
    `$AM = MB = ${AB / 2}$ cm; $MI = ${AB / 4}$ cm; $AI = AM + MI = ${AI}$ (cm).`,
    { kind: 'geo', data: { P: { A: [0, 0], M: [AB / 2, 0], I: [AI, 0], B: [AB, 0] }, seg: ['AB'], tick: [['AM', 1], ['MB', 1]] } }, cmU);
}

// Bài 36–37. Góc · Số đo góc
function g6goc(lv) {
  if (lv === 1) {
    const a = pick([35, 50, 72, 90, 110, 145, 180, 65, 120, 160, 25]), kind = a < 90 ? 'Góc nhọn' : a === 90 ? 'Góc vuông' : a < 180 ? 'Góc tù' : 'Góc bẹt', r = (a * Math.PI) / 180;
    return mc(`Góc $xOy$ có số đo $${a}^\\circ$ là góc gì?`, kind, ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'].filter((k) => k !== kind),
      'Góc nhọn: nhỏ hơn $90^\\circ$; góc vuông: $90^\\circ$; góc tù: lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$; góc bẹt: $180^\\circ$.',
      { kind: 'geo', data: { P: { O: [0, 0], x: [4, 0], y: [4 * Math.cos(r), 4 * Math.sin(r)] }, ray: ['Ox', 'Oy'], ang: a === 180 ? [] : [['xOy', a + '°', a === 90]], dots: 'O' } }, txt);
  }
  if (lv === 2) {
    const n = ri(3, 6), v = (n * (n - 1)) / 2, P = { O: [0, 0] }, nm = ['x', 'y', 'z', 't', 'u', 'v'];
    for (let i = 0; i < n; i++) { const r = ((i * Math.PI) / (n - 1)) * 0.92; P[nm[i]] = [4 * Math.cos(r), 4 * Math.sin(r)]; }
    return mc(`Vẽ ${n} tia chung gốc $O$ (như hình). Có tất cả bao nhiêu góc đỉnh $O$ tạo bởi hai trong các tia đó?`, v, [n, n * (n - 1), v - 1],
      `Mỗi cặp tia tạo thành một góc: $\\frac{${n} \\cdot ${n - 1}}{2} = ${v}$ góc.`, { kind: 'geo', data: { P, ray: nm.slice(0, n).map((m) => 'O' + m), dots: 'O' } });
  }
  const h = ri(1, 6), a = 30 * h, rh = Math.PI / 2 - (h * Math.PI) / 6;
  return mc(`Lúc ${h} giờ đúng, kim giờ và kim phút tạo thành một góc có số đo bằng bao nhiêu?`, a, [a + 30, a === 180 ? 150 : 360 - a, 6 * h],
    `Mỗi khoảng giữa hai số liền nhau trên mặt đồng hồ ứng với $30^\\circ$; lúc ${h} giờ hai kim cách nhau ${h} khoảng: $${h} \\cdot 30^\\circ = ${a}^\\circ$.`,
    { kind: 'geo', data: { P: { O: [0, 0], M: [0, 4], G: [2.6 * Math.cos(rh), 2.6 * Math.sin(rh)] }, circ: [['O', 4.6]], seg: ['OM', 'OG'], ang: [['MOG', '?']], hide: 'OMG', dots: 'O' } }, degU);
}

// Bài 38–39. Dữ liệu và thu thập dữ liệu · Bảng thống kê và biểu đồ tranh
const SOLIEU = ['Chiều cao (cm) của các bạn trong lớp', 'Số học sinh của mỗi lớp trong trường', 'Cân nặng (kg) của các bạn trong tổ', 'Điểm kiểm tra môn Toán của lớp', 'Số anh chị em ruột của mỗi bạn'];
const KHONGSO = ['Màu sắc yêu thích của các bạn trong lớp', 'Môn thể thao yêu thích', 'Tên các tỉnh, thành phố đã đến du lịch', 'Loại quả yêu thích của các bạn', 'Phương tiện đến trường của học sinh'];
function g6thongke(lv) {
  if (lv === 1) {
    if (Math.random() < 0.5) { const [t, w] = pickTF(SOLIEU, KHONGSO); return mc('Dữ liệu nào sau đây là số liệu?', t, w, `“${t}” là dữ liệu dạng số (số liệu).`, null, txt); }
    const [t, w] = pickTF(KHONGSO, SOLIEU); return mc('Dữ liệu nào sau đây KHÔNG phải là số liệu?', t, w, `“${t}” không phải là dữ liệu dạng số.`, null, txt);
  }
  if (lv === 2) {
    const names = ['6A', '6B', '6C', '6D'], vals = names.map(() => ri(2, 8)), k = pick([2, 5, 10]), i = ri(0, 3);
    const rows = [['Lớp', `Số cây trồng được (🌳 = ${k} cây)`], ...names.map((n, j) => [n, '🌳'.repeat(vals[j])])];
    return mc(`Biểu đồ tranh cho biết số cây trồng được của các lớp. Lớp ${names[i]} trồng được bao nhiêu cây?`, vals[i] * k, [vals[i], vals[i] * k + k, vals[i] * k - k],
      `Lớp ${names[i]} có ${vals[i]} biểu tượng, mỗi biểu tượng ứng với ${k} cây: $${vals[i]} \\cdot ${k} = ${vals[i] * k}$ (cây).`, { kind: 'table', data: { rows } });
  }
  const items = ['Bóng đá', 'Cầu lông', 'Bơi lội', 'Cờ vua'], cnt = items.map(() => ri(3, 15)), tot = sum(cnt);
  return mc('Bảng thống kê cho biết môn thể thao yêu thích của học sinh lớp 6A. Lớp 6A có bao nhiêu học sinh?', tot, [tot - cnt[0], tot + cnt[1], Math.max(...cnt)],
    `$${cnt.join(' + ')} = ${tot}$ (học sinh).`, { kind: 'table', data: { rows: [['Môn thể thao', ...items], ['Số học sinh', ...cnt]] } });
}

// Bài 41. Biểu đồ cột kép
function g6cotkep(lv) {
  const names = ['6A', '6B', '6C', '6D'], a = names.map(() => ri(5, 20)), b = names.map(() => ri(5, 20)), i = ri(0, 3);
  const fig = { kind: 'bars2', data: { items: names.map((n, j) => [n, a[j], b[j]]), names: ['Nam', 'Nữ'], unit: 'học sinh', title: 'Số học sinh nam, nữ thích đọc sách' } };
  if (lv === 1) return mc(`Theo biểu đồ, lớp ${names[i]} có bao nhiêu học sinh nữ thích đọc sách?`, b[i], [a[i], a[i] + b[i], b[i] + 2], `Đọc cột màu cam của lớp ${names[i]}: $${b[i]}$.`, fig);
  if (lv === 2) return mc(`Theo biểu đồ, lớp ${names[i]} có tất cả bao nhiêu học sinh thích đọc sách?`, a[i] + b[i], [Math.abs(a[i] - b[i]), a[i], a[i] + b[i] + 5], `$${a[i]} + ${b[i]} = ${a[i] + b[i]}$.`, fig);
  const d = names.map((_, j) => b[j] - a[j]), mx = Math.max(...d), j = d.indexOf(mx);
  if (mx <= 0 || d.filter((x) => x === mx).length > 1) return g6cotkep(lv);
  return mc('Lớp nào có số học sinh nữ nhiều hơn số học sinh nam nhiều nhất?', names[j], names.filter((n) => n !== names[j]),
    `Hiệu nữ − nam: ${names.map((n, k) => `${n}: ${d[k]}`).join('; ')}. Lớn nhất là lớp ${names[j]}.`, fig, txt);
}

// Bài 42–43. Kết quả có thể và sự kiện · Xác suất thực nghiệm
function g6xstn(lv) {
  if (lv === 1) {
    const t = pick([['Gieo một con xúc xắc', 6], ['Tung một đồng xu', 2], ['Tung hai đồng xu cùng lúc', 4], ['Lấy ngẫu nhiên 1 quả bóng từ hộp có 1 bóng xanh, 1 bóng đỏ, 1 bóng vàng', 3]]);
    return mc(`${t[0]}. Có bao nhiêu kết quả có thể xảy ra?`, t[1], [t[1] + 1, t[1] === 6 ? 12 : t[1] + 2, t[1] * 2 === 6 ? 5 : t[1] * 2], `Liệt kê các kết quả có thể: có ${t[1]} kết quả.`);
  }
  if (lv === 2) {
    const N = pick([20, 25, 40, 50, 100]), k = ri(Math.round(N * 0.3), Math.round(N * 0.7));
    return mc(`Tung một đồng xu ${N} lần thấy mặt ngửa xuất hiện ${k} lần. Xác suất thực nghiệm của sự kiện “mặt ngửa” là`, fr(k, N), [fr(N - k, N), fr(k, N - k), fr(k + 1, N), fr(1, 2)],
      `Xác suất thực nghiệm $= \\frac{${k}}{${N}} = ${fr(k, N)}$ (số lần mặt ngửa chia tổng số lần tung).`);
  }
  const col = ['Xanh', 'Đỏ', 'Vàng'], c = col.map(() => ri(4, 15)), tot = sum(c), i = ri(0, 2);
  return mc(`Lấy bóng có hoàn lại từ một hộp nhiều lần, kết quả ghi trong bảng. Xác suất thực nghiệm lấy được bóng màu ${col[i].toLowerCase()} là`, fr(c[i], tot),
    [fr(c[i], tot - c[i]), fr(tot - c[i], tot), fr(c[i] + 1, tot), fr(1, 3)],
    `Tổng số lần lấy: $${tot}$; bóng ${col[i].toLowerCase()}: $${c[i]}$ lần. Xác suất thực nghiệm: $\\frac{${c[i]}}{${tot}} = ${fr(c[i], tot)}$.`,
    { kind: 'table', data: { rows: [['Màu bóng', ...col], ['Số lần', ...c]] } });
}

/* ---------------- danh mục Toán 6 theo mục lục SGK ---------------- */
export const CHAPTERS6 = { I: 'Tập hợp các số tự nhiên', II: 'Tính chia hết trong tập hợp các số tự nhiên', III: 'Số nguyên',
  IV: 'Một số hình phẳng trong thực tiễn', V: 'Tính đối xứng của hình phẳng trong tự nhiên', VI: 'Phân số', VII: 'Số thập phân',
  VIII: 'Những hình hình học cơ bản', IX: 'Dữ liệu và xác suất thực nghiệm' };
export const SKILLS6 = [
  { code: '6-TAPHOP', ch: 'I', bai: 'Bài 1–3', icon: '🧺', name: 'Tập hợp, số La Mã', gen: g6taphop },
  { code: '6-PHEPTINH', ch: 'I', bai: 'Bài 4–5', icon: '➕', name: 'Cộng, trừ, nhân, chia số tự nhiên', gen: g6pheptinh },
  { code: '6-LUYTHUA', ch: 'I', bai: 'Bài 6–7', icon: '⚡', name: 'Luỹ thừa, thứ tự thực hiện phép tính', gen: g6luythua },
  { code: '6-CHIAHET', ch: 'II', bai: 'Bài 8–9', icon: '✂️', name: 'Quan hệ chia hết, dấu hiệu chia hết', gen: g6chiahet },
  { code: '6-SNT', ch: 'II', bai: 'Bài 10', icon: '💎', name: 'Số nguyên tố, phân tích ra thừa số', gen: g6snt },
  { code: '6-UCLN', ch: 'II', bai: 'Bài 11–12', icon: '🔢', name: 'ƯCLN và BCNN', gen: g6ucln },
  { code: '6-TAPZ', ch: 'III', bai: 'Bài 13', icon: '🌡️', name: 'Tập hợp các số nguyên', gen: g6tapZ },
  { code: '6-SONGUYEN', ch: 'III', bai: 'Bài 14', icon: '↔️', name: 'Cộng, trừ số nguyên', gen: g6songuyen },
  { code: '6-DAUNGOAC', ch: 'III', bai: 'Bài 15', icon: '🔣', name: 'Quy tắc dấu ngoặc', gen: g6daungoac },
  { code: '6-NHANZ', ch: 'III', bai: 'Bài 16', icon: '✖️', name: 'Phép nhân số nguyên', gen: g6nhanZ },
  { code: '6-UOCZ', ch: 'III', bai: 'Bài 17', icon: '➗', name: 'Phép chia hết, ước và bội của số nguyên', gen: g6uocZ },
  { code: '6-HINHPHANG', ch: 'IV', bai: 'Bài 18–19', icon: '🔷', name: 'Tam giác đều, hình vuông, hình thoi, …', gen: g6hinhphang },
  { code: '6-CHUVI', ch: 'IV', bai: 'Bài 20', icon: '📐', name: 'Chu vi và diện tích tứ giác', gen: g6chuvi },
  { code: '6-DOIXUNG', ch: 'V', bai: 'Bài 21–22', icon: '🦋', name: 'Trục đối xứng, tâm đối xứng', gen: g6doixung },
  { code: '6-PHANSOBN', ch: 'VI', bai: 'Bài 23–24', icon: '🍰', name: 'Phân số bằng nhau, so sánh, hỗn số', gen: g6phansobn },
  { code: '6-PHANSO', ch: 'VI', bai: 'Bài 25', icon: '🍕', name: 'Cộng, trừ phân số', gen: g6phanso },
  { code: '6-PHANSONC', ch: 'VI', bai: 'Bài 26', icon: '🥧', name: 'Nhân, chia phân số', gen: g6phansonc },
  { code: '6-PHANSOBT', ch: 'VI', bai: 'Bài 27', icon: '🧁', name: 'Hai bài toán về phân số', gen: g6phansobt },
  { code: '6-THAPPHAN', ch: 'VII', bai: 'Bài 28–29', icon: '🔟', name: 'Số thập phân và các phép tính', gen: g6thapphan },
  { code: '6-LAMTRON', ch: 'VII', bai: 'Bài 30', icon: '🎯', name: 'Làm tròn và ước lượng', gen: g6lamtron },
  { code: '6-TISO', ch: 'VII', bai: 'Bài 31', icon: '💯', name: 'Tỉ số, tỉ số phần trăm', gen: g6tiso },
  { code: '6-DOANTHANG', ch: 'VIII', bai: 'Bài 32–35', icon: '📍', name: 'Điểm, đường thẳng, đoạn thẳng, trung điểm', gen: g6doanthang },
  { code: '6-GOC', ch: 'VIII', bai: 'Bài 36–37', icon: '🕒', name: 'Góc và số đo góc', gen: g6goc },
  { code: '6-THONGKE', ch: 'IX', bai: 'Bài 38–39', icon: '📋', name: 'Dữ liệu, bảng thống kê, biểu đồ tranh', gen: g6thongke },
  { code: '6-BIEUDO', ch: 'IX', bai: 'Bài 40', icon: '📊', name: 'Biểu đồ cột', gen: g6bieudo },
  { code: '6-COTKEP', ch: 'IX', bai: 'Bài 41', icon: '📶', name: 'Biểu đồ cột kép', gen: g6cotkep },
  { code: '6-XSTN', ch: 'IX', bai: 'Bài 42–43', icon: '🎲', name: 'Kết quả có thể, xác suất thực nghiệm', gen: g6xstn },
].map((s) => ({ ...s, grade: 6 }));
