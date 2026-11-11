// g9.js — các dạng bài Toán 9 (SGK Kết nối tri thức)
import { ri, pick, nz, gcd, lcm, shuffle, fr, p, deg, terms, poly, lin, pt, factor, mc, txt, sq, cf, coprime, TRIPLES, dc, pickTF, range, sum, roman, isPrime, divisors, kpi } from './core.js';
/* =================== LỚP 9 =================== */
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
    `Định lí Viète: $x_1 + x_2 = -\\frac{b}{a} = ${fr(-b, a)}$.`);
  if (t === 1) return mc(`${head} Tính $x_1 x_2$.`, fr(c, a), [fr(-c, a), fr(-b, a), fr(b, a), fr(c + a, a), fr(c - a, a)],
    `Định lí Viète: $x_1 x_2 = \\frac{c}{a} = ${fr(c, a)}$.`);
  const s = r1 + r2, q = r1 * r2, v = s * s - 2 * q;
  return mc(`${head} Tính $x_1^2 + x_2^2$.`, v, [s * s + 2 * q, s * s - q, s * s, v + 2],
    `$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = ${p(s)}^2 - 2 \\cdot ${p(q)} = ${v}$ (Viète: $x_1 + x_2 = ${s}$, $x_1 x_2 = ${q}$).`);
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


/* =========================================================================
 * BỔ SUNG THEO SGK TOÁN 9 (Kết nối tri thức)
 * ========================================================================= */
const degU = (v) => `$${v}^\\circ$`, cmU = (v) => `${v} cm`, xeq = (v) => `$x = ${v}$`;
const eq2 = (a, b, c) => `${terms([[a, 'x'], [b, 'y']])} = ${c}`;

// Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn
function g9pt2an(lv) {
  const a = nz(-5, 5), b = nz(-5, 5), x = ri(-4, 4), y = ri(-4, 4), c = a * x + b * y, on = (u, v) => a * u + b * v === c;
  if (lv < 3) {
    const w = [[x + 1, y], [x, y + 1], [y, x], [-x, -y], [x - 1, y + 1]].filter(([u, v]) => !on(u, v)).map(([u, v]) => pt(u, v));
    return mc(`Cặp số nào là một nghiệm của phương trình $${eq2(a, b, c)}$?`, pt(x, y), w,
      `Thay $x = ${x}$, $y = ${y}$: $${a} \\cdot ${p(x)} + ${p(b)} \\cdot ${p(y)} = ${c}$ (đúng).`);
  }
  const m = nz(-6, 6), x0 = nz(-4, 4), y0 = ri(-4, 4), C = m * x0 + b * y0;
  return mc(`Tìm $m$ để cặp số $${pt(x0, y0)}$ là nghiệm của phương trình $mx ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${C}$.`, m, [-m, m + 1, C - b * y0],
    `Thay vào: $m \\cdot ${p(x0)} + ${p(b)} \\cdot ${p(y0)} = ${C} \\Rightarrow ${x0}m = ${C - b * y0} \\Rightarrow m = ${m}$.`, null, (v) => `$m = ${v}$`);
}

// Bài 3. Giải bài toán bằng cách lập hệ phương trình
function g9heptbt(lv) {
  if (lv === 1) {
    const g = ri(10, 30), c = ri(5, 25), H = g + c, L = 2 * g + 4 * c;
    return mc(`Vừa gà vừa chó có ${H} con, tổng số chân là ${L}. Hỏi có bao nhiêu con chó?`, c, [g, H - c + 1, L / 4 === Math.floor(L / 4) ? L / 4 : c + 2],
      `Gọi số gà là $x$, số chó là $y$: $\\sys{x + y = ${H}}{2x + 4y = ${L}}$, giải được $x = ${g}$, $y = ${c}$.`, null, (v) => `${v} con`);
  }
  if (lv === 2) {
    const pv = pick([5, 6, 8]) * 1000, pb = pick([3, 4]) * 1000, x = ri(3, 10), y = ri(2, 8), n = x + y, T = pv * x + pb * y;
    return mc(`Bạn An mua ${n} đồ dùng gồm vở và bút hết ${T.toLocaleString('vi-VN')} đồng. Giá mỗi quyển vở ${pv.toLocaleString('vi-VN')} đồng, mỗi cây bút ${pb.toLocaleString('vi-VN')} đồng. An mua bao nhiêu quyển vở?`, x, [y, x + 1, n - x + 2].filter((v) => v !== x),
      `$\\sys{x + y = ${n}}{${pv}x + ${pb}y = ${T}}$ $\\Rightarrow x = ${x}$, $y = ${y}$.`, null, (v) => `${v} quyển`);
  }
  const s = ri(30, 80), d = ri(4, 20), a = (s + d) / 2; if (!Number.isInteger(a)) return g9heptbt(lv);
  return mc(`Tổng hai số là ${s}, hiệu của chúng là ${d}. Số lớn là`, a, [s - a === a ? a + 1 : s - a, s - d, a + d], `$\\sys{x + y = ${s}}{x - y = ${d}}$ $\\Rightarrow x = ${a}$, $y = ${s - a}$.`);
}

// Bài 4. Phương trình quy về phương trình bậc nhất một ẩn
function g9pttich(lv) {
  if (lv === 1) {
    const a = nz(-9, 9), b = nz(-9, 9); if (a === b) return g9pttich(lv);
    const S = (u, v) => `x = ${Math.min(u, v)}; x = ${Math.max(u, v)}`;
    return mc(`Giải phương trình $${factor(a)}${factor(b)} = 0$.`, S(a, b), [S(-a, -b), S(a, -b), S(-a, b)],
      `Tích bằng 0 khi một thừa số bằng 0: $x - ${p(a)} = 0$ hoặc $x - ${p(b)} = 0$.`);
  }
  if (lv === 2) {
    const a = nz(-6, 6), b = nz(-6, 6); if (a === b) return g9pttich(lv);
    return mc(`Điều kiện xác định của phương trình $\\frac{2}{${poly([1, -a])}} + \\frac{3}{${poly([1, -b])}} = 1$ là`, `x \\ne ${a} \\text{ và } x \\ne ${b}`,
      [`x \\ne ${-a} \\text{ và } x \\ne ${-b}`, `x \\ne ${a}`, `x \\ne 0`], 'Các mẫu phải khác 0.');
  }
  const b = nz(-6, 6), c = pick([2, 3, -1, -2, 4]), x = nz(-9, 9); if (x === b) return g9pttich(lv);
  const a = c * (x - b) - x; // (x + a)/(x - b) = c
  return mc(`Giải phương trình $\\frac{${poly([1, a])}}{${poly([1, -b])}} = ${c}$.`, x, [-x, b, x + 1].filter((v) => v !== x),
    `ĐKXĐ: $x \\ne ${b}$. Quy đồng: $${poly([1, a])} = ${c}(${poly([1, -b])}) \\Rightarrow x = ${x}$ (thoả mãn).`, null, xeq);
}

// Bài 5. Bất đẳng thức và tính chất
function g9bdt(lv) {
  const c = ri(2, 9);
  if (lv === 1) return mc(`Cho $a > b$. Khẳng định nào đúng?`, `a + ${c} > b + ${c}`, [`a - ${c} < b - ${c}`, `${c}a < ${c}b`, `-${c}a > -${c}b`],
    'Cộng cùng một số vào hai vế của bất đẳng thức thì được bất đẳng thức cùng chiều.');
  if (lv === 2) return mc(`Cho $a < b$. Khẳng định nào đúng?`, `-${c}a > -${c}b`, [`-${c}a < -${c}b`, `${c}a > ${c}b`, `a + ${c} > b + ${c}`],
    'Nhân hai vế với cùng một số âm thì bất đẳng thức đổi chiều.');
  const d = ri(1, 9);
  return mc(`Cho $a > b$. So sánh $-${c}a + ${d}$ và $-${c}b + ${d}$.`, `-${c}a + ${d} < -${c}b + ${d}`, [`-${c}a + ${d} > -${c}b + ${d}`, `-${c}a + ${d} = -${c}b + ${d}`, '\\text{Không so sánh được}'],
    `$a > b \\Rightarrow -${c}a < -${c}b$ (nhân với số âm) $\\Rightarrow -${c}a + ${d} < -${c}b + ${d}$.`);
}

// Bài 6. Bất phương trình bậc nhất một ẩn
function g9bpt(lv) {
  if (lv === 1) {
    const a = ri(2, 9), x0 = nz(-8, 8), b = -a * x0;
    return mc(`Giải bất phương trình $${poly([a, b])} > 0$.`, `x > ${x0}`, [`x < ${x0}`, `x > ${-x0}`, `x \\ge ${x0}`], `$${a}x > ${-b} \\Rightarrow x > ${x0}$.`);
  }
  if (lv === 2) {
    const a = -ri(2, 9), x0 = nz(-8, 8), b = -a * x0;
    return mc(`Giải bất phương trình $${poly([a, b])} \\le 0$.`, `x \\ge ${x0}`, [`x \\le ${x0}`, `x \\ge ${-x0}`, `x > ${x0}`],
      `$${a}x \\le ${-b}$; chia hai vế cho $${a} < 0$ thì đổi chiều: $x \\ge ${x0}$.`);
  }
  const fee = pick([10, 12, 15]) * 1000, per = pick([12, 14, 15]) * 1000, M = fee + per * ri(5, 15) + ri(1, per - 1), n = Math.floor((M - fee) / per);
  return mc(`Một hãng taxi tính giá mở cửa ${fee.toLocaleString('vi-VN')} đồng và ${per.toLocaleString('vi-VN')} đồng cho mỗi kilômét tiếp theo. Với ${M.toLocaleString('vi-VN')} đồng, có thể đi được tối đa bao nhiêu kilômét (số nguyên)?`,
    n, [n + 1, Math.floor(M / per), n - 1], `$${fee} + ${per}x \\le ${M} \\Rightarrow x \\le ${dc((M - fee) / per, 2)}$, nên đi tối đa $${n}$ km.`, null, (v) => `${v} km`);
}

// Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai
function g9canrg(lv) {
  if (lv === 1) {
    let m, k; do { m = pick([2, 3, 5, 6, 7]); k = ri(2, 6); } while (m === k);
    return mc(`Đưa thừa số vào trong dấu căn: $${k}\\sqrt{${m}}$.`, `\\sqrt{${k * k * m}}`, [`\\sqrt{${k * m}}`, `\\sqrt{${k * m * m}}`, `\\sqrt{${k * k + m}}`],
      `$${k}\\sqrt{${m}} = \\sqrt{${k}^2 \\cdot ${m}} = \\sqrt{${k * k * m}}$.`);
  }
  if (lv === 2) {
    const m = pick([2, 3, 5, 6, 7]), a = ri(1, 9) * m; const g = gcd(a, m), num = a / m;
    return mc(`Trục căn thức ở mẫu: $\\frac{${a}}{\\sqrt{${m}}}$.`, sq(num, m), [`\\frac{${a}}{${m}}`, sq(a, m), `\\frac{\\sqrt{${m}}}{${a}}`],
      `$\\frac{${a}}{\\sqrt{${m}}} = \\frac{${a}\\sqrt{${m}}}{${m}} = ${sq(num, m)}$.${g ? '' : ''}`);
  }
  const m = pick([2, 3, 5, 6, 7]), c = m - 1;
  return mc(`Trục căn thức ở mẫu: $\\frac{${c}}{\\sqrt{${m}} - 1}$.`, `\\sqrt{${m}} + 1`, [`\\sqrt{${m}} - 1`, `\\frac{\\sqrt{${m}} + 1}{${c}}`, `${c}(\\sqrt{${m}} + 1)`],
    `Nhân tử và mẫu với $\\sqrt{${m}} + 1$: $\\frac{${c}(\\sqrt{${m}} + 1)}{${m} - 1} = \\sqrt{${m}} + 1$.`);
}

// Bài 10. Căn bậc ba và căn thức bậc ba
function g9canba(lv) {
  const a = nz(-6, 6);
  if (lv === 1) return mc(`Tính $\\sqrt3{${a ** 3}}$.`, a, [-a, a * a, a ** 3 / 3 === Math.floor(a ** 3 / 3) && a ** 3 / 3 !== a ? a ** 3 / 3 : a + 1], `$${p(a)}^3 = ${a ** 3}$ nên $\\sqrt3{${a ** 3}} = ${a}$.`);
  if (lv === 2) { const b = nz(-5, 5);
    return mc(`Tính $\\sqrt3{${a ** 3}} + \\sqrt3{${b ** 3}}$.`, a + b, [a - b, -(a + b) || 1, a * b], `$\\sqrt3{${a ** 3}} = ${a}$, $\\sqrt3{${b ** 3}} = ${b}$ nên tổng bằng $${a + b}$.`); }
  return mc(`Tìm $x$, biết $x^3 = ${a ** 3}$.`, a, [-a, a * a, 3 * a], `$x = \\sqrt3{${a ** 3}} = ${a}$.`, null, xeq);
}

// Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông
function g9hethuc(lv) {
  const c = 2 * ri(2, 10);
  if (lv === 1) return mc(`Tam giác $ABC$ vuông tại $A$ có $BC = ${c}$ cm, $\\hat{B} = 30^\\circ$. Độ dài $AC$ là`, String(c / 2), [String(c), sq(c / 2, 3), sq(c, 3)],
    `$AC = BC \\cdot \\sin B = ${c} \\cdot \\sin 30^\\circ = ${c} \\cdot \\frac{1}{2} = ${c / 2}$ (cm).`,
    { kind: 'righttri', data: { ab: Math.sqrt(3), ac: 1, mark: 'B', labels: { BC: c + ' cm', AC: '?' } } }, (v) => `$${v}$ cm`);
  if (lv === 2) return mc(`Tam giác $ABC$ vuông tại $A$ có $BC = ${c}$ cm, $\\hat{B} = 30^\\circ$. Độ dài $AB$ là`, sq(c / 2, 3), [String(c / 2), sq(c, 3), sq(c / 2, 2)],
    `$AB = BC \\cdot \\cos B = ${c} \\cdot \\frac{\\sqrt{3}}{2} = ${sq(c / 2, 3)}$ (cm).`,
    { kind: 'righttri', data: { ab: Math.sqrt(3), ac: 1, mark: 'B', labels: { BC: c + ' cm', AB: '?' } } }, (v) => `$${v}$ cm`);
  const L = 2 * ri(2, 5);
  return mc(`Một chiếc thang dài $${L}$ m dựa vào tường, tạo với mặt đất một góc $60^\\circ$. Chân thang cách chân tường bao nhiêu mét?`, String(L / 2), [sq(L / 2, 3), String(L), sq(L, 2)],
    `Khoảng cách $= ${L} \\cdot \\cos 60^\\circ = ${L} \\cdot \\frac{1}{2} = ${L / 2}$ (m).`, null, (v) => `$${v}$ m`);
}

// Bài 13–14. Mở đầu về đường tròn · Cung và dây
function g9duongtroncb(lv) {
  const R = ri(3, 12);
  if (lv === 1) { const d = R + pick([-2, -1, 0, 1, 2, 3]); const pos = d < R ? 'nằm trong đường tròn' : d === R ? 'nằm trên đường tròn' : 'nằm ngoài đường tròn';
    return mc(`Cho đường tròn $(O; ${R} \\text{ cm})$ và điểm $M$ với $OM = ${d}$ cm. Điểm $M$`, pos, ['nằm trong đường tròn', 'nằm trên đường tròn', 'nằm ngoài đường tròn', 'là tâm đường tròn'].filter((x) => x !== pos),
      `So sánh $OM = ${d}$ với $R = ${R}$: ${d < R ? 'OM < R' : d === R ? 'OM = R' : 'OM > R'}.`, null, txt); }
  if (lv === 2) return mc(`Dây cung dài nhất của đường tròn bán kính $${R}$ cm có độ dài là`, 2 * R, [R, R * R, 4 * R], `Dây lớn nhất là đường kính: $2R = ${2 * R}$ (cm).`, null, cmU);
  const n = 10 * ri(4, 16);
  return mc(`Trên đường tròn $(O)$, góc ở tâm $\\hat{AOB} = ${deg(n)}$. Số đo cung lớn $AB$ là`, 360 - n, [n, 180 - n > 0 ? 180 - n : n / 2, 2 * n], `Số đo cung nhỏ bằng số đo góc ở tâm ($${deg(n)}$), số đo cung lớn $= ${deg(360)} - ${deg(n)} = ${deg(360 - n)}$.`, null, degU);
}

// Bài 15. Độ dài cung tròn. Diện tích hình quạt tròn và hình vành khuyên
function g9cung(lv) {
  if (lv === 1) {
    const [R, n] = pick([[6, 60], [9, 40], [12, 30], [10, 36], [4, 90], [5, 72], [3, 120], [8, 45], [6, 120], [9, 80]]);
    return mc(`Tính độ dài cung $${deg(n)}$ của đường tròn bán kính $${R}$ cm.`, kpi(R * n, 180), [kpi(R * R * n, 360), kpi(2 * R * n, 180), kpi(R * n, 360)],
      `$l = \\frac{\\pi R n}{180} = \\frac{\\pi \\cdot ${R} \\cdot ${n}}{180} = ${kpi(R * n, 180)}$ (cm).`, null, (v) => `$${v}$ cm`);
  }
  if (lv === 2) {
    const [R, n] = pick([[6, 60], [6, 30], [4, 90], [12, 30], [10, 36], [3, 120], [8, 45], [9, 40], [5, 72], [4, 45]]);
    return mc(`Tính diện tích hình quạt tròn bán kính $${R}$ cm, ứng với cung $${deg(n)}$.`, kpi(R * R * n, 360), [kpi(R * n, 180), kpi(R * R * n, 180), kpi(R * R, 1)],
      `$S = \\frac{\\pi R^2 n}{360} = \\frac{\\pi \\cdot ${R * R} \\cdot ${n}}{360} = ${kpi(R * R * n, 360)}$ (cm²).`, null, (v) => `$${v}$ cm²`);
  }
  const r = ri(2, 6), R = r + ri(1, 5);
  return mc(`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính $${R}$ cm và $${r}$ cm.`, kpi(R * R - r * r), [kpi((R - r) ** 2), kpi(2 * (R - r)), kpi(R * R + r * r)],
    `$S = \\pi(R^2 - r^2) = \\pi(${R * R} - ${r * r}) = ${kpi(R * R - r * r)}$ (cm²).`,
    { kind: 'geo', data: { P: { O: [0, 0], A: [R, 0], B: [0, r] }, circ: [['O', R], ['O', r]], seg: ['OA', 'OB'], hide: 'AB', dots: 'O' } }, (v) => `$${v}$ cm²`);
}

// Bài 16. Vị trí tương đối của đường thẳng và đường tròn (tiếp tuyến)
function g9tieptuyen(lv) {
  if (lv === 1) { const R = ri(3, 10), d = R + pick([-2, -1, 0, 1, 2]);
    const pos = d < R ? 'cắt nhau tại hai điểm' : d === R ? 'tiếp xúc nhau' : 'không giao nhau';
    return mc(`Cho đường tròn $(O; ${R} \\text{ cm})$ và đường thẳng $a$ cách $O$ một khoảng $${d}$ cm. Đường thẳng $a$ và đường tròn`, pos, ['cắt nhau tại hai điểm', 'tiếp xúc nhau', 'không giao nhau', 'trùng nhau'].filter((x) => x !== pos),
      `So sánh khoảng cách $d = ${d}$ với $R = ${R}$: ${d < R ? '$d < R$' : d === R ? '$d = R$' : '$d > R$'}.`, null, txt); }
  const [r, t, o] = pick(TRIPLES);
  if (lv === 2) return mc(`Cho đường tròn $(O; ${r} \\text{ cm})$, $MA$ là tiếp tuyến tại $A$ và $OM = ${o}$ cm. Độ dài $MA$ là`, t, [o - r, o + r, t + 1],
    `Tiếp tuyến vuông góc với bán kính tại tiếp điểm nên tam giác $OAM$ vuông tại $A$: $MA = \\sqrt{${o}^2 - ${r}^2} = ${t}$ (cm).`,
    { kind: 'geo', data: { P: { O: [0, 0], A: [r * r / o, r * t / o], M: [o, 0] }, circ: [['O', r]], seg: ['OA', 'AM', 'OM'], ang: [['OAM', '', 1]] } }, cmU);
  const M = 5 * ri(8, 26);
  return mc(`Từ điểm $M$ ngoài đường tròn $(O)$ kẻ hai tiếp tuyến $MA$, $MB$ ($A$, $B$ là tiếp điểm), $\\hat{AMB} = ${deg(M)}$. Tính $\\hat{AOB}$.`, 180 - M, [M, 360 - M, 90 - M / 2 === Math.floor(90 - M / 2) ? 90 - M / 2 : 180 - M + 10],
    `Tứ giác $OAMB$ có $\\hat{A} = \\hat{B} = 90^\\circ$ nên $\\hat{AOB} = 180^\\circ - ${deg(M)} = ${deg(180 - M)}$.`, null, degU);
}

// Bài 17. Vị trí tương đối của hai đường tròn
function g9haiduongtron(lv) {
  const R = ri(5, 10), r = ri(2, R - 2);
  const C = lv === 1 ? pick([[R + r, 'tiếp xúc ngoài'], [R + r + ri(1, 4), 'ở ngoài nhau'], [R - r + 1, 'cắt nhau tại hai điểm']])
    : lv === 2 ? pick([[R - r, 'tiếp xúc trong'], [R - r + 1, 'cắt nhau tại hai điểm'], [R + r - 1, 'cắt nhau tại hai điểm']])
      : pick([[Math.max(1, R - r - 1), 'đựng nhau'], [R - r, 'tiếp xúc trong'], [R + r, 'tiếp xúc ngoài']]);
  if (C[0] <= 0) return g9haiduongtron(lv);
  return mc(`Cho hai đường tròn $(O; ${R} \\text{ cm})$ và $(O'; ${r} \\text{ cm})$ với $OO' = ${C[0]}$ cm. Hai đường tròn`, C[1], ['tiếp xúc ngoài', 'tiếp xúc trong', 'cắt nhau tại hai điểm', 'ở ngoài nhau', 'đựng nhau'].filter((x) => x !== C[1]).slice(0, 3),
    `$R + r = ${R + r}$, $R - r = ${R - r}$; so sánh với $OO' = ${C[0]}$.`, null, txt);
}

// Bài 21. Giải bài toán bằng cách lập phương trình (bậc hai)
function g9ptb2bt(lv) {
  if (lv === 1) {
    const w = ri(3, 15), l = w + ri(2, 10), P = 2 * (w + l), S = w * l;
    return mc(`Một mảnh đất hình chữ nhật có chu vi ${P} m và diện tích ${S} m². Chiều rộng mảnh đất là`, w, [l, P / 4 === Math.floor(P / 4) ? P / 4 : w + 1, w + 2],
      `Gọi chiều rộng là $x$ thì chiều dài $${P / 2} - x$: $x(${P / 2} - x) = ${S} \\Leftrightarrow x^2 - ${P / 2}x + ${S} = 0$, có nghiệm $x = ${w}$, $x = ${l}$; chiều rộng là nghiệm nhỏ hơn.`, null, (v) => `${v} m`);
  }
  if (lv === 2) {
    const a = ri(2, 12), b = a + ri(1, 9), S = a + b, P = a * b, Q = (u, v) => `${u} \\text{ và } ${v}`;
    return mc(`Tìm hai số biết tổng của chúng bằng $${S}$ và tích bằng $${P}$.`, Q(a, b), [Q(a - 1, b + 1), Q(-a, -b), Q(a + 1, b)],
      `Hai số là nghiệm của $x^2 - ${S}x + ${P} = 0$: $x_1 = ${a}$, $x_2 = ${b}$.`);
  }
  const n = ri(4, 12), m = ri(2, 6), k = n + m, T = n * (n + m); // mỗi bạn nhận x quyển ...
  return mc(`Một lớp có $x$ học sinh, mỗi bạn tặng mỗi bạn khác trong lớp một tấm thiệp, tổng cộng có ${(k) * (k - 1)} tấm thiệp. Số học sinh của lớp là`, k, [k - 1, k + 1, (k * (k - 1)) / 2],
    `Mỗi bạn tặng $x - 1$ tấm: $x(x - 1) = ${k * (k - 1)} \\Leftrightarrow x^2 - x - ${k * (k - 1)} = 0$ có nghiệm dương $x = ${k}$.${T ? '' : ''}`, null, (v) => `${v} học sinh`);
}

// Bài 22–24. Bảng tần số · Tần số tương đối · Ghép nhóm
function g9tanso(lv) {
  if (lv === 1) {
    const vals = [5, 6, 7, 8, 9, 10], data = Array.from({ length: 20 }, () => pick(vals)), v = pick(vals), f = data.filter((x) => x === v).length;
    return mc(`Điểm kiểm tra của 20 học sinh: ${data.join(', ')}. Tần số của điểm ${v} là`, f, [f + 1, f - 1 >= 0 && f - 1 !== f ? f - 1 : f + 2, v],
      `Đếm số lần giá trị ${v} xuất hiện: ${f} lần.`);
  }
  if (lv === 2) {
    const vals = [6, 7, 8, 9, 10], fr0 = vals.map(() => ri(2, 12)), N = sum(fr0), i = ri(0, 4), pct = Math.round((fr0[i] * 1000) / N) / 10;
    return mc(`Bảng tần số điểm kiểm tra của một lớp như sau. Tần số tương đối của điểm ${vals[i]} là (làm tròn đến hàng phần mười)`, dc(pct), [dc(fr0[i]), dc(Math.round((fr0[i] * 1000) / (N - fr0[i])) / 10), dc(pct + 2)],
      `$f = \\frac{${fr0[i]}}{${N}} \\cdot 100\\% \\approx ${dc(pct)}\\%$.`, { kind: 'table', data: { rows: [['Điểm', ...vals], ['Tần số', ...fr0]] } }, (v) => `$${v}\\%$`);
  }
  const g = ['[150; 155)', '[155; 160)', '[160; 165)', '[165; 170)'], f = g.map(() => ri(3, 15)), N = sum(f), i = ri(0, 3);
  return mc(`Bảng tần số ghép nhóm chiều cao (cm) của học sinh lớp 9A. Có bao nhiêu bạn cao từ 160 cm trở lên?`, f[2] + f[3], [f[3], N - f[0], f[2]],
    `Hai nhóm $[160; 165)$ và $[165; 170)$: $${f[2]} + ${f[3]} = ${f[2] + f[3]}$ (bạn).${i ? '' : ''}`, { kind: 'table', data: { rows: [['Chiều cao', ...g], ['Tần số', ...f]] } });
}

// Bài 25–26. Phép thử ngẫu nhiên và không gian mẫu · Xác suất của biến cố
function g9xacsuat(lv) {
  if (lv === 1) {
    const T = pick([['Gieo đồng thời hai con xúc xắc', 36], ['Tung đồng thời ba đồng xu', 8], ['Tung một đồng xu rồi gieo một con xúc xắc', 12], ['Chọn ngẫu nhiên 2 bạn từ 4 bạn An, Bình, Chi, Dũng', 6]]);
    return mc(`${T[0]}. Không gian mẫu có bao nhiêu phần tử?`, T[1], [T[1] / 2, T[1] + 6, T[1] * 2].filter(Number.isInteger), 'Liệt kê (hoặc lập bảng) tất cả các kết quả có thể của phép thử.');
  }
  if (lv === 2) {
    const k = ri(3, 11), n = 6 - Math.abs(7 - k);
    return mc(`Gieo đồng thời hai con xúc xắc cân đối. Xác suất để tổng số chấm bằng ${k} là`, fr(n, 36), [fr(n, 6), fr(1, 11), fr(n + 1, 36)],
      `Có 36 kết quả đồng khả năng; số kết quả có tổng bằng ${k} là ${n}: $P = \\frac{${n}}{36}${fr(n, 36) !== `\\frac{${n}}{36}` ? ' = ' + fr(n, 36) : ''}$.`);
  }
  const C = pick([['hai mặt giống nhau', 2, 4], ['ít nhất một mặt ngửa', 3, 4], ['hai mặt ngửa', 1, 4]]);
  return mc(`Tung hai đồng xu cân đối. Xác suất của biến cố “${C[0]}” là`, fr(C[1], C[2]), [fr(1, 3), fr(C[2] - C[1] || 2, C[2] + 1), fr(1, 2) === fr(C[1], C[2]) ? fr(3, 4) : fr(1, 2)],
    `Không gian mẫu: {SS; SN; NS; NN} có 4 kết quả, ${C[1]} kết quả thuận lợi: $P = ${fr(C[1], C[2])}$.`);
}

// Bài 28. Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác
function g9ngoaitiep(lv) {
  if (lv === 1) { const [a, b, c] = pick(TRIPLES);
    return mc(`Tam giác vuông có hai cạnh góc vuông $${a}$ cm và $${b}$ cm. Bán kính đường tròn ngoại tiếp tam giác là`, dc(c / 2), [dc(c), dc(a / 2), dc((a + b) / 2)],
      `Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền: cạnh huyền $= ${c}$ cm nên $R = ${dc(c / 2)}$ cm.`, null, (v) => `$${v}$ cm`); }
  const a = 6 * ri(1, 4);
  if (lv === 2) return mc(`Bán kính đường tròn ngoại tiếp tam giác đều cạnh $${a}$ cm là`, sq(a / 3, 3), [sq(a / 6, 3), sq(a / 2, 3), String(a / 3), sq(a, 3)],
    `$R = \\frac{a\\sqrt{3}}{3} = \\frac{${a}\\sqrt{3}}{3} = ${sq(a / 3, 3)}$ (cm).`, null, (v) => `$${v}$ cm`);
  const b = 6 * ri(1, 4);
  return mc(`Bán kính đường tròn nội tiếp tam giác đều cạnh $${b}$ cm là`, sq(b / 6, 3), [sq(b / 3, 3), sq(b / 2, 3), String(b / 6)],
    `$r = \\frac{a\\sqrt{3}}{6} = \\frac{${b}\\sqrt{3}}{6} = ${sq(b / 6, 3)}$ (cm).`, null, (v) => `$${v}$ cm`);
}

// Bài 29. Tứ giác nội tiếp
function g9tugiacnt(lv) {
  if (lv === 1) { const A = 5 * ri(10, 26);
    return mc(`Tứ giác $ABCD$ nội tiếp đường tròn có $\\hat{A} = ${deg(A)}$. Tính $\\hat{C}$.`, 180 - A, [A, 360 - A, 90], `Tổng hai góc đối của tứ giác nội tiếp bằng $${deg(180)}$: $\\hat{C} = ${deg(180 - A)}$.`,
      { kind: 'circle', data: { pts: { A: 150, B: 60, C: -20, D: 230 }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], angles: [] } }, degU); }
  if (lv === 2) { const [a, b, c] = pick(TRIPLES);
    return mc(`Hình chữ nhật có hai cạnh $${a}$ cm và $${b}$ cm. Bán kính đường tròn ngoại tiếp hình chữ nhật là`, dc(c / 2), [dc(c), dc((a + b) / 2), dc(a)],
      `Tâm là giao điểm hai đường chéo, bán kính bằng nửa đường chéo: $\\frac{\\sqrt{${a}^2 + ${b}^2}}{2} = ${dc(c / 2)}$ (cm).`, null, (v) => `$${v}$ cm`); }
  const [t, w] = pickTF(['Hình chữ nhật', 'Hình vuông', 'Hình thang cân'], ['Hình thoi (không vuông)', 'Hình bình hành (không phải hình chữ nhật)', 'Hình thang vuông', 'Hình thang (không cân)']);
  return mc('Tứ giác nào sau đây luôn nội tiếp được một đường tròn?', t, w, `${t} có tổng hai góc đối bằng $180^\\circ$ nên nội tiếp được đường tròn.`, null, txt);
}

// Bài 30. Đa giác đều
function g9dagiac(lv) {
  const n = pick([5, 6, 8, 9, 10, 12]);
  if (lv === 1) return mc(`Mỗi góc của đa giác đều ${n} cạnh có số đo là`, ((n - 2) * 180) / n, [360 / n, (n - 2) * 180, 180 - 360 / n + 10], `Mỗi góc $= \\frac{(n - 2) \\cdot 180^\\circ}{n} = \\frac{${n - 2} \\cdot 180^\\circ}{${n}} = ${deg(((n - 2) * 180) / n)}$.`, null, degU);
  if (lv === 2) return mc(`Phép quay tâm $O$ giữ nguyên đa giác đều ${n} cạnh (tâm $O$) có góc quay dương nhỏ nhất là`, 360 / n, [180 / n === Math.floor(180 / n) ? 180 / n : 360 / n + 5, ((n - 2) * 180) / n, 360], `Góc quay nhỏ nhất $= \\frac{360^\\circ}{${n}} = ${deg(360 / n)}$.`, null, degU);
  return mc(`Tổng số đo các góc của một đa giác ${n} cạnh là`, (n - 2) * 180, [n * 180, (n - 1) * 180, 360], `Tổng các góc $= (n - 2) \\cdot 180^\\circ = ${n - 2} \\cdot 180^\\circ = ${deg((n - 2) * 180)}$.`, null, degU);
}

// Bài 31. Hình trụ và hình nón
function g9trunon(lv) {
  const r = ri(2, 8), h = ri(3, 12);
  if (lv === 1) return mc(`Hình trụ có bán kính đáy $${r}$ cm, chiều cao $${h}$ cm. Diện tích xung quanh là`, kpi(2 * r * h), [kpi(r * h), kpi(r * r * h), kpi(2 * r * h + 2 * r * r)],
    `$S_{xq} = 2\\pi rh = 2\\pi \\cdot ${r} \\cdot ${h} = ${kpi(2 * r * h)}$ (cm²).`, { kind: 'solid', data: { type: 'cyl', lab: { r: r + ' cm', h: h + ' cm' } } }, (v) => `$${v}$ cm²`);
  if (lv === 2) return mc(`Hình trụ có bán kính đáy $${r}$ cm, chiều cao $${h}$ cm. Thể tích hình trụ là`, kpi(r * r * h), [kpi(2 * r * h), kpi(r * h), kpi(r * r * h, 3)],
    `$V = \\pi r^2 h = \\pi \\cdot ${r * r} \\cdot ${h} = ${kpi(r * r * h)}$ (cm³).`, { kind: 'solid', data: { type: 'cyl', lab: { r: r + ' cm', h: h + ' cm' } } }, (v) => `$${v}$ cm³`);
  const [a, b, c] = pick(TRIPLES); // r = a, h = b, l = c
  if (Math.random() < 0.5) return mc(`Hình nón có bán kính đáy $${a}$ cm, đường sinh $${c}$ cm. Diện tích xung quanh là`, kpi(a * c), [kpi(a * b), kpi(2 * a * c), kpi(a * a * c)],
    `$S_{xq} = \\pi r l = \\pi \\cdot ${a} \\cdot ${c} = ${kpi(a * c)}$ (cm²).`, { kind: 'solid', data: { type: 'cone', lab: { r: a + ' cm', l: c + ' cm' } } }, (v) => `$${v}$ cm²`);
  return mc(`Hình nón có bán kính đáy $${a}$ cm, chiều cao $${b}$ cm. Thể tích hình nón là`, kpi(a * a * b, 3), [kpi(a * a * b), kpi(a * c), kpi(a * b, 3)],
    `$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ${a * a} \\cdot ${b} = ${kpi(a * a * b, 3)}$ (cm³).`, { kind: 'solid', data: { type: 'cone', lab: { r: a + ' cm', h: b + ' cm' } } }, (v) => `$${v}$ cm³`);
}

// Bài 32. Hình cầu
function g9cau(lv) {
  if (lv === 1) { const R = ri(2, 10);
    return mc(`Diện tích mặt cầu bán kính $${R}$ cm là`, kpi(4 * R * R), [kpi(R * R), kpi(2 * R * R), kpi(4 * R * R * R, 3)], `$S = 4\\pi R^2 = 4\\pi \\cdot ${R * R} = ${kpi(4 * R * R)}$ (cm²).`,
      { kind: 'solid', data: { type: 'sphere', lab: { r: R + ' cm' } } }, (v) => `$${v}$ cm²`); }
  if (lv === 2) { const R = 3 * ri(1, 4);
    return mc(`Thể tích hình cầu bán kính $${R}$ cm là`, kpi(4 * R ** 3, 3), [kpi(4 * R * R), kpi(R ** 3), kpi(4 * R ** 3)], `$V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot ${R ** 3} = ${kpi(4 * R ** 3, 3)}$ (cm³).`,
      { kind: 'solid', data: { type: 'sphere', lab: { r: R + ' cm' } } }, (v) => `$${v}$ cm³`); }
  const d = 2 * ri(2, 12), R = d / 2;
  return mc(`Một quả bóng hình cầu có đường kính $${d}$ cm. Diện tích bề mặt quả bóng là`, kpi(4 * R * R), [kpi(4 * d * d), kpi(d * d * 2), kpi(R * R)],
    `Bán kính $R = ${R}$ cm; $S = 4\\pi R^2 = ${kpi(4 * R * R)}$ (cm²).`, null, (v) => `$${v}$ cm²`);
}

/* ---------------- danh mục Toán 9 theo mục lục SGK ---------------- */
export const CHAPTERS9 = { I: 'Phương trình và hệ hai phương trình bậc nhất hai ẩn', II: 'Phương trình và bất phương trình bậc nhất một ẩn', III: 'Căn bậc hai và căn bậc ba',
  IV: 'Hệ thức lượng trong tam giác vuông', V: 'Đường tròn', VI: 'Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn', VII: 'Tần số và tần số tương đối',
  VIII: 'Xác suất của biến cố trong một số mô hình xác suất đơn giản', IX: 'Đường tròn ngoại tiếp và đường tròn nội tiếp', X: 'Một số hình khối trong thực tiễn' };
export const SKILLS9 = [
  { code: '9-PT2AN', ch: 'I', bai: 'Bài 1', icon: '✏️', name: 'Phương trình bậc nhất hai ẩn', gen: g9pt2an },
  { code: '9-HEPT', ch: 'I', bai: 'Bài 2', icon: '🔗', name: 'Giải hệ hai phương trình bậc nhất hai ẩn', gen: g9hept },
  { code: '9-HEPTBT', ch: 'I', bai: 'Bài 3', icon: '🐔', name: 'Giải bài toán bằng cách lập hệ phương trình', gen: g9heptbt },
  { code: '9-PTTICH', ch: 'II', bai: 'Bài 4', icon: '🧩', name: 'Phương trình tích, phương trình chứa ẩn ở mẫu', gen: g9pttich },
  { code: '9-BDT', ch: 'II', bai: 'Bài 5', icon: '⚖️', name: 'Bất đẳng thức và tính chất', gen: g9bdt },
  { code: '9-BPT', ch: 'II', bai: 'Bài 6', icon: '📉', name: 'Bất phương trình bậc nhất một ẩn', gen: g9bpt },
  { code: '9-CAN', ch: 'III', bai: 'Bài 7–8', icon: '🌱', name: 'Căn bậc hai, khai căn với phép nhân, chia', gen: g9can },
  { code: '9-CANRG', ch: 'III', bai: 'Bài 9', icon: '🧹', name: 'Biến đổi, rút gọn biểu thức chứa căn', gen: g9canrg },
  { code: '9-CANBA', ch: 'III', bai: 'Bài 10', icon: '🧊', name: 'Căn bậc ba', gen: g9canba },
  { code: '9-LUONGGIAC', ch: 'IV', bai: 'Bài 11', icon: '🔺', name: 'Tỉ số lượng giác của góc nhọn', gen: g9luonggiac },
  { code: '9-HETHUC', ch: 'IV', bai: 'Bài 12', icon: '🪜', name: 'Hệ thức giữa cạnh và góc trong tam giác vuông', gen: g9hethuc },
  { code: '9-DUONGTRONCB', ch: 'V', bai: 'Bài 13–14', icon: '⚪', name: 'Đường tròn, cung và dây', gen: g9duongtroncb },
  { code: '9-CUNG', ch: 'V', bai: 'Bài 15', icon: '🍕', name: 'Độ dài cung, diện tích hình quạt, vành khuyên', gen: g9cung },
  { code: '9-TIEPTUYEN', ch: 'V', bai: 'Bài 16', icon: '📍', name: 'Đường thẳng và đường tròn, tiếp tuyến', gen: g9tieptuyen },
  { code: '9-HAIDT', ch: 'V', bai: 'Bài 17', icon: '⚭', name: 'Vị trí tương đối của hai đường tròn', gen: g9haiduongtron },
  { code: '9-PARABOL', ch: 'VI', bai: 'Bài 18', icon: '🎢', name: 'Hàm số y = ax² và parabol', gen: g9parabol },
  { code: '9-PTB2', ch: 'VI', bai: 'Bài 19–20', icon: '🧮', name: 'Phương trình bậc hai, định lí Viète', gen: g9ptb2 },
  { code: '9-PTB2BT', ch: 'VI', bai: 'Bài 21', icon: '🏡', name: 'Giải bài toán bằng cách lập phương trình', gen: g9ptb2bt },
  { code: '9-TANSO', ch: 'VII', bai: 'Bài 22–24', icon: '📊', name: 'Tần số, tần số tương đối, ghép nhóm', gen: g9tanso },
  { code: '9-XACSUAT', ch: 'VIII', bai: 'Bài 25–26', icon: '🎲', name: 'Không gian mẫu, xác suất của biến cố', gen: g9xacsuat },
  { code: '9-DUONGTRON', ch: 'IX', bai: 'Bài 27', icon: '⭕', name: 'Góc nội tiếp', gen: g9duongtron },
  { code: '9-NGOAITIEP', ch: 'IX', bai: 'Bài 28', icon: '🔵', name: 'Đường tròn ngoại tiếp, nội tiếp tam giác', gen: g9ngoaitiep },
  { code: '9-TUGIACNT', ch: 'IX', bai: 'Bài 29', icon: '🔷', name: 'Tứ giác nội tiếp', gen: g9tugiacnt },
  { code: '9-DAGIAC', ch: 'IX', bai: 'Bài 30', icon: '⬡', name: 'Đa giác đều', gen: g9dagiac },
  { code: '9-TRUNON', ch: 'X', bai: 'Bài 31', icon: '🥫', name: 'Hình trụ và hình nón', gen: g9trunon },
  { code: '9-CAU', ch: 'X', bai: 'Bài 32', icon: '⚽', name: 'Hình cầu', gen: g9cau },
].map((s) => ({ ...s, grade: 9 }));
