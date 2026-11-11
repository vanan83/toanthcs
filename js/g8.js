// g8.js — các dạng bài Toán 8 (SGK Kết nối tri thức)
import { ri, pick, nz, gcd, lcm, shuffle, fr, p, deg, terms, poly, lin, pt, factor, mc, txt, sq, cf, coprime, TRIPLES, dc, pickTF, range, sum, roman, isPrime, divisors, kpi } from './core.js';
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


/* =========================================================================
 * BỔ SUNG THEO SGK TOÁN 8 (Kết nối tri thức)
 * ========================================================================= */
const degU = (v) => `$${v}^\\circ$`, cmU = (v) => `${v} cm`, xeq = (v) => `$x = ${v}$`;
/** Đơn thức: hệ số + biến với số mũ, vd mono(-3, {x:2, y:1}) = -3x^2y */
const mono = (c, e) => {
  const v = Object.keys(e).filter((k) => e[k]).map((k) => (e[k] === 1 ? k : `${k}^${e[k]}`)).join('');
  if (c === 0) return '0';
  return v ?(c === 1 ? '' : c === -1 ? '-' : c) + v : String(c);
};

// Bài 1. Đơn thức
function g8donthuc(lv) {
  if (lv === 1) {
    const c = nz(-9, 9), a = ri(1, 5), b = ri(1, 4), z = ri(0, 2);
    return mc(`Bậc của đơn thức $${mono(c, { x: a, y: b, z })}$ là`, a + b + z, [a * b || 1, Math.max(a, b, z), a + b + z + 1],
      `Bậc của đơn thức (có hệ số khác 0) là tổng số mũ của các biến: $${a} + ${b}${z ? ' + ' + z : ''} = ${a + b + z}$.`);
  }
  if (lv === 2) {
    const c1 = nz(-6, 6), c2 = nz(-6, 6), a1 = ri(1, 3), b1 = ri(1, 3), a2 = ri(1, 3), b2 = ri(1, 3);
    return mc(`Thu gọn đơn thức $(${mono(c1, { x: a1, y: b1 })}) \\cdot (${mono(c2, { x: a2, y: b2 })})$.`, mono(c1 * c2, { x: a1 + a2, y: b1 + b2 }),
      [mono(c1 + c2, { x: a1 + a2, y: b1 + b2 }), mono(c1 * c2, { x: a1 * a2, y: b1 * b2 }), mono(-c1 * c2, { x: a1 + a2, y: b1 + b2 })],
      `Nhân hệ số với hệ số, cộng số mũ của cùng một biến: $${mono(c1 * c2, { x: a1 + a2, y: b1 + b2 })}$.`);
  }
  const e = { x: ri(1, 3), y: ri(1, 2) }, a = nz(-9, 9), b = nz(-9, 9), c = nz(-5, 5), s = a + b + c;
  if (!s) return g8donthuc(lv);
  return mc(`Tính $${mono(a, e)} + ${b < 0 ? `(${mono(b, e)})` : mono(b, e)} + ${c < 0 ? `(${mono(c, e)})` : mono(c, e)}$.`, mono(s, e),
    [mono(a * b * c, e), mono(s, { x: 3 * e.x, y: 3 * e.y }), mono(-s, e)],
    `Các đơn thức đồng dạng: cộng các hệ số $${a} + ${p(b)} + ${p(c)} = ${s}$ và giữ nguyên phần biến.`);
}

// Bài 2–3. Đa thức · Phép cộng và phép trừ đa thức
function g8dathuc(lv) {
  if (lv === 1) {
    const a = nz(-5, 5), b = nz(-5, 5), m = ri(2, 4), n = ri(1, 3);
    return mc(`Bậc của đa thức $${terms([[a, `x^${m}y^${n}`], [b, `xy^${n}`], [-a, `x^${m}y^${n}`], [3, 'x']])}$ là`, 1 + n, [m + n, m + n + 1, n],
      `Thu gọn: hai hạng tử $${mono(a, { x: m, y: n })}$ và $${mono(-a, { x: m, y: n })}$ triệt tiêu, còn $${terms([[b, `xy^${n}`], [3, 'x']])}$ có bậc $${1 + n}$.`);
  }
  if (lv === 2) {
    const x = nz(-3, 3), y = nz(-3, 3), a = nz(-4, 4), b = nz(-4, 4), c = ri(-6, 6), v = a * x * x * y + b * x * y + c;
    return mc(`Tính giá trị của đa thức $${terms([[a, 'x^2y'], [b, 'xy'], [c, '']])}$ tại $x = ${x}$, $y = ${y}$.`, v, [a * x * x * y - b * x * y + c, -v, a * 2 * x * y + b * x * y + c],
      `Thay $x = ${x}$, $y = ${y}$: $${a} \\cdot ${p(x)}^2 \\cdot ${p(y)} + ${p(b)} \\cdot ${p(x)} \\cdot ${p(y)} + ${p(c)} = ${v}$.`);
  }
  const A = [nz(-5, 5), nz(-5, 5), ri(-6, 6)], B = [nz(-5, 5), nz(-5, 5), ri(-6, 6)], mk = (c) => terms([[c[0], 'x^2y'], [c[1], 'xy'], [c[2], '']]);
  const S = A.map((c, i) => c - B[i]);
  return mc(`Cho $A = ${mk(A)}$ và $B = ${mk(B)}$. Tính $A - B$.`, mk(S), [mk(A.map((c, i) => c + B[i])), mk(S.map((c) => -c)), mk([S[0], A[1] + B[1], S[2]])],
    `Bỏ ngoặc (đổi dấu các hạng tử của $B$) rồi cộng các hạng tử đồng dạng: $${mk(S)}$.`);
}

// Bài 4–5. Phép nhân đa thức · Phép chia đa thức cho đơn thức
function g8nhan(lv) {
  if (lv === 1) {
    const a = nz(-5, 5), b = nz(-5, 5), c = nz(-6, 6);
    return mc(`Tính $${mono(a, { x: 1 })}(${terms([[b, 'x'], [c, 'y']])})$.`, terms([[a * b, 'x^2'], [a * c, 'xy']]), [terms([[a * b, 'x^2'], [c, 'xy']]), terms([[a * b, 'x'], [a * c, 'y']]), terms([[a * b, 'x^2'], [-a * c, 'xy']])],
      `Nhân $${mono(a, { x: 1 })}$ với từng hạng tử trong ngoặc: $${terms([[a * b, 'x^2'], [a * c, 'xy']])}$.`);
  }
  if (lv === 2) {
    const a = ri(1, 3), b = nz(-5, 5), c = ri(1, 3), d = nz(-5, 5);
    const ans = poly([a * c, a * d + b * c, b * d]);
    return mc(`Tính $(${poly([a, b])})(${poly([c, d])})$.`, ans, [poly([a * c, a * d - b * c, b * d]), poly([a * c, 0, b * d]), poly([a * c, a * d + b * c, -b * d])],
      `Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi thu gọn: $${ans}$.`);
  }
  const k = nz(-4, 4), a = nz(-5, 5), b = nz(-6, 6), m = ri(1, 2);
  const D = terms([[k * a, `x^${m + 2}y^2`], [k * b, `x^${m + 1}y`]]), d = mono(k, { x: m + 1, y: 1 });
  return mc(`Tính $(${D}) : ${k < 0 ? `(${d})` : d}$.`, terms([[a, 'xy'], [b, '']]), [terms([[a, 'x^2y'], [b, 'x']]), terms([[a, 'xy'], [-b, '']]), terms([[k * a, 'xy'], [k * b, '']])],
    `Chia từng hạng tử của đa thức cho đơn thức: $${terms([[a, 'xy'], [b, '']])}$.`);
}

// Bài 7–8. Lập phương của một tổng, một hiệu · Tổng và hiệu hai lập phương
function g8hdt3(lv) {
  const a = ri(1, 4);
  if (lv === 1) return mc(`Khai triển $(x + ${a})^3$.`, poly([1, 3 * a, 3 * a * a, a ** 3]), [poly([1, 0, 0, a ** 3]), poly([1, a, a * a, a ** 3]), poly([1, 3 * a, 3 * a, a ** 3])],
    `$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$: $${poly([1, 3 * a, 3 * a * a, a ** 3])}$.`);
  if (lv === 2) return mc(`Khai triển $(x - ${a})^3$.`, poly([1, -3 * a, 3 * a * a, -(a ** 3)]), [poly([1, 0, 0, -(a ** 3)]), poly([1, -3 * a, -3 * a * a, -(a ** 3)]), poly([1, 3 * a, 3 * a * a, a ** 3])],
    `$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$: $${poly([1, -3 * a, 3 * a * a, -(a ** 3)])}$.`);
  const b = ri(2, 5), plus = Math.random() < 0.5, c = b ** 3;
  return plus ? mc(`Phân tích $x^3 + ${c}$ thành nhân tử.`, `(x + ${b})(${poly([1, -b, b * b])})`, [`(x + ${b})(${poly([1, b, b * b])})`, `(x - ${b})(${poly([1, b, b * b])})`, `(x + ${b})^3`],
    `$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$ với $A = x$, $B = ${b}$.`)
    : mc(`Phân tích $x^3 - ${c}$ thành nhân tử.`, `(x - ${b})(${poly([1, b, b * b])})`, [`(x - ${b})(${poly([1, -b, b * b])})`, `(x + ${b})(${poly([1, -b, b * b])})`, `(x - ${b})^3`],
      `$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$ với $A = x$, $B = ${b}$.`);
}

// Bài 9. Phân tích đa thức thành nhân tử
function g8ptnt(lv) {
  if (lv === 1) {
    const k = ri(2, 6), a = nz(-5, 5), b = nz(-7, 7); if (gcd(a, b) !== 1) return g8ptnt(lv);
    return mc(`Phân tích $${poly([k * a, k * b, 0])}$ thành nhân tử.`, `${k}x(${poly([a, b])})`, [`x(${poly([k * a, b])})`, `${k}(${poly([a, k * b, 0])})`, `${k}x(${poly([a, -b])})`],
      `Đặt nhân tử chung $${k}x$: $${poly([k * a, k * b, 0])} = ${k}x(${poly([a, b])})$.`);
  }
  if (lv === 2) {
    const a = nz(-6, 6), b = nz(-6, 6);
    return mc(`Phân tích $${terms([[1, 'xy'], [a, 'y'], [b, 'x'], [a * b, '']])}$ thành nhân tử.`, `${factor(-a)}(${poly([1, b], 'y')})`,
      [`${factor(a)}(${poly([1, b], 'y')})`, `${factor(-b)}(${poly([1, a], 'y')})`, `${factor(-a)}(${poly([1, -b], 'y')})`],
      `Nhóm: $(xy + ${p(a)}y) + (${p(b)}x + ${p(a * b)}) = y(${poly([1, a])}) + ${p(b)}(${poly([1, a])}) = ${factor(-a)}(${poly([1, b], 'y')})$.`);
  }
  const a = nz(-9, 9), A = (u, v) => `x = ${Math.min(u, v)}; x = ${Math.max(u, v)}`;
  return mc(`Giải phương trình $${poly([1, -a, 0])} = 0$.`, A(0, a), [`x = ${a}`, A(0, -a), 'x = 0'],
    `$x(${poly([1, -a])}) = 0$ nên $x = 0$ hoặc $x = ${a}$.`);
}

// Bài 10. Tứ giác
function g8tugiac(lv) {
  let A, B, C; do { A = 5 * ri(12, 26); B = 5 * ri(12, 26); C = 5 * ri(12, 26); } while (360 - A - B - C < 50 || 360 - A - B - C > 150);
  const D = 360 - A - B - C;
  if (lv < 3) return mc(`Tứ giác $ABCD$ có $\\hat{A} = ${deg(A)}$, $\\hat{B} = ${deg(B)}$, $\\hat{C} = ${deg(C)}$. Tính $\\hat{D}$.`, D, [180 - (A + B + C - 180) > 0 && 180 - (A + B + C - 180) !== D ? 180 - (A + B + C - 180) : D + 10, 360 - A - B, D - 10],
    `Tổng các góc của một tứ giác bằng $${deg(360)}$: $\\hat{D} = ${deg(360)} - ${deg(A)} - ${deg(B)} - ${deg(C)} = ${deg(D)}$.`,
    { kind: 'geo', data: { P: { A: [0.6, 3], B: [4.5, 3.4], C: [5.4, 0], D: [0, 0.2] }, seg: ['AB', 'BC', 'CD', 'DA'], poly: 'ABCD', dots: '' } }, degU);
  const [m1, m2, m3, m4] = pick([[1, 2, 3, 4], [2, 3, 4, 1], [1, 1, 2, 2], [3, 4, 5, 6], [2, 2, 3, 5]]), S = m1 + m2 + m3 + m4, x = 360 / S;
  if (!Number.isInteger(x)) return g8tugiac(lv);
  const T = (m) => (m === 1 ? 'x' : `${m}x`);
  return mc(`Tứ giác $ABCD$ có $\\hat{A} = ${T(m1)}$, $\\hat{B} = ${T(m2)}$, $\\hat{C} = ${T(m3)}$, $\\hat{D} = ${T(m4)}$. Giá trị của $x$ là`, x, [x + 10, 180 / S === Math.floor(180 / S) ? 180 / S : x - 6, 90],
    `$${T(m1)} + ${T(m2)} + ${T(m3)} + ${T(m4)} = ${deg(360)} \\Rightarrow ${S}x = ${deg(360)} \\Rightarrow x = ${deg(x)}$.`, null, degU);
}

// Bài 11–12. Hình thang cân · Hình bình hành
function g8hinhthang(lv) {
  if (lv === 1) {
    const D = 5 * ri(9, 16);
    return mc(`Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\hat{D} = ${deg(D)}$. Tính $\\hat{A}$.`, 180 - D, [D, 90, 180 - D + 10],
      `Trong hình thang, hai góc kề một cạnh bên bù nhau: $\\hat{A} = ${deg(180)} - ${deg(D)} = ${deg(180 - D)}$.`, null, degU);
  }
  if (lv === 2) {
    const A = 5 * ri(10, 26);
    return mc(`Hình bình hành $ABCD$ có $\\hat{A} = ${deg(A)}$. Tính $\\hat{C}$ và $\\hat{B}$.`, `\\hat{C} = ${deg(A)}, \\hat{B} = ${deg(180 - A)}`,
      [`\\hat{C} = ${deg(180 - A)}, \\hat{B} = ${deg(A)}`, `\\hat{C} = ${deg(A)}, \\hat{B} = ${deg(A)}`, `\\hat{C} = ${deg(360 - 2 * A)}, \\hat{B} = ${deg(90)}`],
      'Trong hình bình hành, các góc đối bằng nhau và hai góc kề một cạnh bù nhau.');
  }
  const a = ri(4, 12), b = ri(3, 9), d = ri(6, 16);
  return mc(`Hình bình hành $ABCD$ có $AB = ${a}$ cm, $BC = ${b}$ cm, hai đường chéo cắt nhau tại $O$ và $AC = ${d}$ cm. Tính chu vi hình bình hành và độ dài $OA$.`,
    `\\text{Chu vi } ${2 * (a + b)} \\text{ cm}, OA = ${dc(d / 2)} \\text{ cm}`, [`\\text{Chu vi } ${a + b} \\text{ cm}, OA = ${dc(d / 2)} \\text{ cm}`, `\\text{Chu vi } ${2 * (a + b)} \\text{ cm}, OA = ${d} \\text{ cm}`, `\\text{Chu vi } ${a * b} \\text{ cm}, OA = ${dc(d / 2)} \\text{ cm}`],
    `Các cạnh đối bằng nhau nên chu vi $= 2(${a} + ${b}) = ${2 * (a + b)}$ cm; hai đường chéo cắt nhau tại trung điểm mỗi đường nên $OA = \\frac{${d}}{2}$ cm.`);
}

// Bài 13–14. Hình chữ nhật · Hình thoi và hình vuông
function g8hcn(lv) {
  if (lv === 1) {
    const d = 2 * ri(3, 12);
    return mc(`Hình chữ nhật $ABCD$ có $AC = ${d}$ cm, hai đường chéo cắt nhau tại $O$. Độ dài $OB$ là`, d / 2, [d, d / 4 === Math.floor(d / 4) ? d / 4 : d / 2 + 1, 2 * d],
      'Hình chữ nhật có hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường: $OB = \\frac{BD}{2} = \\frac{AC}{2}$.',
      { kind: 'geo', data: { P: { A: [0, 3], B: [5, 3], C: [5, 0], D: [0, 0], O: [2.5, 1.5] }, seg: ['AB', 'BC', 'CD', 'DA', 'AC', 'BD'], poly: 'ABCD' } }, cmU);
  }
  if (lv === 2) {
    const A = 2 * ri(25, 65);
    return mc(`Hình thoi $ABCD$ có $\\hat{A} = ${deg(A)}$. Tính $\\hat{ABD}$.`, (180 - A) / 2, [A / 2, 180 - A, 90 - A / 2 === (180 - A) / 2 ? A : 90 - A / 2],
      `Đường chéo $BD$ là phân giác của góc $B$ và $\\hat{B} = ${deg(180)} - ${deg(A)} = ${deg(180 - A)}$, nên $\\hat{ABD} = ${deg((180 - A) / 2)}$.`, null, degU);
  }
  const Q = pick([['Hình chữ nhật có hai đường chéo vuông góc', 'hình vuông'], ['Hình bình hành có một góc vuông', 'hình chữ nhật'], ['Hình bình hành có hai cạnh kề bằng nhau', 'hình thoi'],
    ['Hình thoi có một góc vuông', 'hình vuông'], ['Hình bình hành có hai đường chéo bằng nhau', 'hình chữ nhật'], ['Tứ giác có bốn cạnh bằng nhau', 'hình thoi']]);
  return mc(`${Q[0]} là`, Q[1], ['hình vuông', 'hình chữ nhật', 'hình thoi', 'hình thang cân'].filter((x) => x !== Q[1]), `Theo dấu hiệu nhận biết: ${Q[0].toLowerCase()} là ${Q[1]}.`, null, txt);
}

// Bài 15. Định lí Thalès trong tam giác
function g8thales(lv) {
  const m = ri(2, 6), n = ri(2, 6), k = ri(1, 3), AM = m * k, MB = n * k, t = ri(1, 3), AN = m * t, NC = n * t;
  const fig = (lab) => ({ kind: 'geo', data: { P: { A: [2, 4], B: [0, 0], C: [6, 0], M: [2 - (2 * m) / (m + n), 4 - (4 * m) / (m + n)], N: [2 + (4 * m) / (m + n), 4 - (4 * m) / (m + n)] }, seg: ['AB', 'BC', 'CA', 'MN'], par: ['MN', 'BC'], len: lab } });
  if (lv === 1) return mc(`Cho tam giác $ABC$, $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = ${AM}$ cm, $MB = ${MB}$ cm, $AN = ${AN}$ cm. Độ dài $NC$ là`, NC, [AN + MB - AM > 0 && AN + MB - AM !== NC ? AN + MB - AM : NC + 1, (AM * AN) / MB === Math.floor((AM * AN) / MB) ? (AM * AN) / MB : NC + 2, MB],
    `Định lí Thalès: $\\frac{AM}{MB} = \\frac{AN}{NC} \\Rightarrow NC = \\frac{${AN} \\cdot ${MB}}{${AM}} = ${NC}$ (cm).`, fig([['AM', AM + ''], ['MB', MB + ''], ['AN', AN + '']]), cmU);
  if (lv === 2) { const AC = AN + NC;
    return mc(`Cho tam giác $ABC$, $MN \\parallel BC$, $AM = ${AM}$ cm, $AB = ${AM + MB}$ cm, $AC = ${AC}$ cm. Độ dài $AN$ là`, AN, [NC, AC - AM > 0 && AC - AM !== AN ? AC - AM : AN + 1, AN + 2],
      `$\\frac{AM}{AB} = \\frac{AN}{AC} \\Rightarrow AN = \\frac{${AM} \\cdot ${AC}}{${AM + MB}} = ${AN}$ (cm).`, fig([['AM', AM + ''], ['AB', ''], ['AC', '']]), cmU); }
  const AM2 = m * k, AN2 = n * t, ok = AM2 * NC === AN2 * MB;
  return mc(`Tam giác $ABC$ có $M \\in AB$, $N \\in AC$ với $AM = ${AM}$, $MB = ${MB}$, $AN = ${AN}$, $NC = ${NC}$ (cùng đơn vị). Khẳng định nào đúng?`, 'MN \\parallel BC',
    ['MN \\perp BC', 'MN = BC', 'AM = AN'], `$\\frac{AM}{MB} = \\frac{${AM}}{${MB}} = ${fr(AM, MB)}$ và $\\frac{AN}{NC} = \\frac{${AN}}{${NC}} = ${fr(AN, NC)}$ bằng nhau nên $MN \\parallel BC$ (định lí Thalès đảo).${ok ? '' : ''}`);
}

// Bài 16. Đường trung bình của tam giác
function g8trungbinh(lv) {
  const BC = 2 * ri(3, 15);
  const fig = { kind: 'geo', data: { P: { A: [2.2, 4], B: [0, 0], C: [6, 0], M: [1.1, 2], N: [4.1, 2] }, seg: ['AB', 'BC', 'CA', 'MN'], tick: [['AM', 1], ['MB', 1], ['AN', 2], ['NC', 2]] } };
  if (lv === 1) return mc(`Cho tam giác $ABC$, $M$, $N$ lần lượt là trung điểm của $AB$, $AC$; $BC = ${BC}$ cm. Độ dài $MN$ là`, BC / 2, [BC, 2 * BC, BC / 2 + 1], `$MN$ là đường trung bình nên $MN = \\frac{BC}{2} = ${BC / 2}$ (cm).`, fig, cmU);
  if (lv === 2) return mc(`Cho tam giác $ABC$, $M$, $N$ là trung điểm của $AB$, $AC$; $MN = ${BC / 2}$ cm. Độ dài $BC$ là`, BC, [BC / 2, BC / 4 === Math.floor(BC / 4) ? BC / 4 : BC + 1, BC + 2], `$BC = 2 \\cdot MN = ${BC}$ (cm).`, fig, cmU);
  const a = ri(4, 12), b = ri(4, 12), c = ri(Math.abs(a - b) + 1, a + b - 1), P = a + b + c;
  return mc(`Tam giác $ABC$ có các cạnh $${a}$ cm, $${b}$ cm, $${c}$ cm. Chu vi tam giác tạo bởi ba đường trung bình là`, dc(P / 2), [dc(P), dc(P / 4), dc(P / 2 + 1)],
    `Mỗi đường trung bình bằng nửa cạnh tương ứng nên chu vi bằng nửa chu vi tam giác $ABC$: $\\frac{${P}}{2} = ${dc(P / 2)}$ (cm).`, null, (v) => `$${v}$ cm`);
}

// Bài 17. Tính chất đường phân giác của tam giác
function g8phangiac(lv) {
  const AB = ri(3, 9), AC = ri(4, 12), k = ri(1, 3); if (AB === AC) return g8phangiac(lv);
  const DB = AB * k, DC = AC * k, BC = DB + DC;
  if (lv === 1) return mc(`Cho tam giác $ABC$ có $AD$ là đường phân giác ($D \\in BC$), $AB = ${AB}$ cm, $AC = ${AC}$ cm. Tỉ số $\\frac{DB}{DC}$ bằng`, fr(AB, AC), [fr(AC, AB), fr(AB, AB + AC), fr(AC, AB + AC)],
    `Đường phân giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề: $\\frac{DB}{DC} = \\frac{AB}{AC} = ${fr(AB, AC)}$.`);
  if (lv === 2) return mc(`Tam giác $ABC$ có $AD$ là đường phân giác, $AB = ${AB}$ cm, $AC = ${AC}$ cm, $DB = ${DB}$ cm. Độ dài $DC$ là`, DC, [DB, (DB * AB) / AC === Math.floor((DB * AB) / AC) && (DB * AB) / AC !== DC ? (DB * AB) / AC : DC + 1, DC + 2],
    `$\\frac{DB}{DC} = \\frac{AB}{AC} \\Rightarrow DC = \\frac{${DB} \\cdot ${AC}}{${AB}} = ${DC}$ (cm).`, null, cmU);
  return mc(`Tam giác $ABC$ có $AB = ${AB}$ cm, $AC = ${AC}$ cm, $BC = ${BC}$ cm, $AD$ là đường phân giác. Độ dài $DB$ là`, DB, [DC, BC / 2 === Math.floor(BC / 2) && BC / 2 !== DB ? BC / 2 : DB + 1, DB + 2],
    `$\\frac{DB}{DC} = \\frac{AB}{AC} = \\frac{${AB}}{${AC}}$ nên $DB = \\frac{${AB}}{${AB} + ${AC}} \\cdot ${BC} = ${DB}$ (cm).`, null, cmU);
}

// Bài 18–20. Thu thập, phân loại, biểu diễn và phân tích dữ liệu
function g8dulieu(lv) {
  if (lv === 1) {
    const LT = ['Chiều cao (cm) của học sinh', 'Cân nặng (kg) của trẻ sơ sinh', 'Nhiệt độ ($^\\circ C$) trong ngày', 'Thời gian (phút) chạy 1 km'];
    const RR = ['Số học sinh của mỗi lớp', 'Số anh chị em ruột', 'Số bàn thắng mỗi trận', 'Số cuốn sách đọc trong tháng'];
    if (Math.random() < 0.5) { const [t, w] = pickTF(LT, RR); return mc('Dữ liệu nào sau đây là số liệu liên tục?', t, w, `“${t}” là đại lượng đo được, có thể nhận mọi giá trị trong một khoảng nên là số liệu liên tục.`, null, txt); }
    const [t, w] = pickTF(RR, LT); return mc('Dữ liệu nào sau đây là số liệu rời rạc?', t, w, `“${t}” là số đếm được nên là số liệu rời rạc.`, null, txt);
  }
  const names = ['Giỏi', 'Khá', 'Đạt', 'Chưa đạt'];
  let v; do { const a = 5 * ri(2, 8), b = 5 * ri(4, 10), c = 5 * ri(2, 6); v = [a, b, c, 100 - a - b - c]; } while (v[3] < 5);
  const fig = { kind: 'pie', data: { items: names.map((n, i) => [n, v[i]]), title: 'Kết quả học tập của khối 8' } };
  if (lv === 2) { const N = 200, i = ri(0, 3);
    return mc(`Khối 8 có ${N} học sinh. Theo biểu đồ, số học sinh xếp loại ${names[i]} là`, (N * v[i]) / 100, [v[i], N - (N * v[i]) / 100, (N * v[i]) / 100 + 10], `$${N} \\cdot ${v[i]}\\% = ${(N * v[i]) / 100}$ (học sinh).`, fig); }
  return mc('Theo biểu đồ, tỉ lệ học sinh xếp loại Khá và Giỏi chiếm bao nhiêu phần trăm?', v[0] + v[1], [v[1], 100 - v[0] - v[1], v[0] + v[1] + 5], `$${v[0]}\\% + ${v[1]}\\% = ${v[0] + v[1]}\\%$.`, fig, (x) => `$${x}\\%$`);
}

// Bài 21–22. Phân thức đại số · Tính chất cơ bản của phân thức
function g8phanthuc(lv) {
  const a = nz(-9, 9), b = nz(-7, 7);
  if (lv === 1) return mc(`Điều kiện xác định của phân thức $\\frac{${poly([b, 1])}}{${poly([1, -a])}}$ là`, `x \\ne ${a}`, [`x \\ne ${-a}`, `x \\ne 0`, `x = ${a}`],
    `Phân thức xác định khi mẫu khác 0: $${poly([1, -a])} \\ne 0 \\Leftrightarrow x \\ne ${a}$.`);
  if (lv === 2) {
    const c = ri(2, 9);
    return Math.random() < 0.5 ? mc(`Rút gọn phân thức $\\frac{x^2 - ${c * c}}{x - ${c}}$.`, `x + ${c}`, [`x - ${c}`, `x + ${c * c}`, `\\frac{1}{x + ${c}}`], `$\\frac{(x - ${c})(x + ${c})}{x - ${c}} = x + ${c}$.`)
      : mc(`Rút gọn phân thức $\\frac{${c}x^2 + ${c * c}x}{${c}x}$.`, `x + ${c}`, [`x + ${c * c}`, `${c}x + ${c}`, `x^2 + ${c}`], `$\\frac{${c}x(x + ${c})}{${c}x} = x + ${c}$.`);
  }
  const t = nz(-4, 4); if (t === a) return g8phanthuc(lv);
  return mc(`Tính giá trị của phân thức $\\frac{${poly([b, 1])}}{${poly([1, -a])}}$ tại $x = ${t}$.`, fr(b * t + 1, t - a), [fr(b * t - 1, t - a), fr(b * t + 1, t + a || 1), fr(-(b * t + 1), t - a)],
    `Thay $x = ${t}$ (thoả mãn điều kiện $x \\ne ${a}$): $\\frac{${b} \\cdot ${p(t)} + 1}{${t} - ${p(a)}} = ${fr(b * t + 1, t - a)}$.`);
}

// Bài 23–24. Cộng, trừ, nhân, chia phân thức đại số
function g8phanthucpt(lv) {
  const c = ri(1, 9);
  if (lv === 1) { const a = nz(-9, 9), b = nz(-9, 9);
    return mc(`Tính $\\frac{${a}x}{x + ${c}} + \\frac{${b}x}{x + ${c}}$.`, `\\frac{${mono(a + b, { x: 1 })}}{x + ${c}}`, [`\\frac{${mono(a + b, { x: 1 })}}{2x + ${2 * c}}`, `\\frac{${mono(a * b, { x: 2 })}}{x + ${c}}`, `\\frac{${mono(a - b, { x: 1 })}}{x + ${c}}`],
      'Cộng hai phân thức cùng mẫu: cộng các tử, giữ nguyên mẫu.'); }
  if (lv === 2) return mc(`Tính $\\frac{1}{x} - \\frac{1}{x + ${c}}$.`, `\\frac{${c}}{x(x + ${c})}`, [`\\frac{1}{x(x + ${c})}`, `\\frac{-${c}}{x(x + ${c})}`, `\\frac{${c}}{x + ${c}}`],
    `Quy đồng mẫu $x(x + ${c})$: $\\frac{x + ${c} - x}{x(x + ${c})} = \\frac{${c}}{x(x + ${c})}$.`);
  return mc(`Tính $\\frac{x^2 - ${c * c}}{x} \\cdot \\frac{${c}x}{x + ${c}}$.`, `${c}(x - ${c})`, [`x - ${c}`, `${c}(x + ${c})`, `\\frac{x - ${c}}{${c}}`],
    `$\\frac{(x - ${c})(x + ${c}) \\cdot ${c}x}{x(x + ${c})} = ${c}(x - ${c})$.`);
}

// Bài 27. Khái niệm hàm số và đồ thị của hàm số
function g8hamsokn(lv) {
  if (lv === 1) { const a = nz(-4, 4), b = ri(-6, 6), t = nz(-4, 4);
    return mc(`Cho hàm số $y = f(x) = ${poly([a, b])}$. Tính $f(${t})$.`, a * t + b, [a * t - b, a + b * t, -(a * t + b)], `$f(${t}) = ${a} \\cdot ${p(t)} + ${p(b)} = ${a * t + b}$.`); }
  if (lv === 2) { const a = nz(-3, 3), c = ri(-5, 5), t = nz(-3, 3);
    return mc(`Cho hàm số $y = f(x) = ${poly([a, 0, c])}$. Tính $f(${t})$.`, a * t * t + c, [a * 2 * t + c, -a * t * t + c, a * t + c], `$f(${t}) = ${a} \\cdot ${p(t)}^2 + ${p(c)} = ${a * t * t + c}$.`); }
  const x = nz(-4, 4), y = nz(-4, 4);
  return mc('Điểm $M$ trong hình có toạ độ là', pt(x, y), [pt(y, x), pt(-x, y), pt(x, -y)], `Chiếu $M$ xuống trục $Ox$ được hoành độ $${x}$, xuống trục $Oy$ được tung độ $${y}$.`,
    { kind: 'coord', data: { x: [-5, 5], y: [-5, 5], pts: [{ x, y, l: 'M', dash: true }] } });
}

// Bài 30–32. Kết quả thuận lợi · Xác suất bằng tỉ số · Xác suất thực nghiệm
function g8xacsuat(lv) {
  const r = ri(2, 9), g = ri(2, 9), y = ri(1, 6), tot = r + g + y;
  if (lv === 1) return mc(`Một hộp có ${r} viên bi đỏ, ${g} viên bi xanh và ${y} viên bi vàng. Lấy ngẫu nhiên 1 viên. Số kết quả thuận lợi cho biến cố “lấy được viên bi xanh” là`, g, [tot, r, tot - g],
    `Mỗi viên bi xanh là một kết quả thuận lợi: có ${g} kết quả.`);
  if (lv === 2) return mc(`Một hộp có ${r} viên bi đỏ, ${g} viên bi xanh và ${y} viên bi vàng. Lấy ngẫu nhiên 1 viên. Xác suất lấy được viên bi đỏ là`, fr(r, tot), [fr(r, g + y), fr(1, 3), fr(g + y, tot), fr(r, tot + 1)],
    `Có $${tot}$ kết quả đồng khả năng, $${r}$ kết quả thuận lợi: $P = \\frac{${r}}{${tot}}${fr(r, tot) !== `\\frac{${r}}{${tot}}` ? ' = ' + fr(r, tot) : ''}$.`);
  const N = pick([50, 100, 200]), k = ri(Math.round(N * 0.2), Math.round(N * 0.6)), M = pick([500, 1000, 2000]), est = (k * M) / N;
  return mc(`Kiểm tra ngẫu nhiên ${N} sản phẩm thấy có ${k} sản phẩm loại A. Hãy ước lượng số sản phẩm loại A trong một lô ${M} sản phẩm.`, est, [k, M - est, est + 10],
    `Xác suất thực nghiệm $\\frac{${k}}{${N}}$; ước lượng: $${M} \\cdot \\frac{${k}}{${N}} = ${est}$ (sản phẩm).`);
}

// Bài 33–34, 36–37. Tam giác đồng dạng
function g8dongdang(lv) {
  const s = [ri(3, 8), ri(4, 9), ri(5, 10)], K = pick([2, 3]);
  if (lv === 1) return mc(`Cho $\\triangle ABC \\sim \\triangle DEF$ với $AB = ${s[0]}$ cm, $BC = ${s[1]}$ cm, $DE = ${s[0] * K}$ cm. Độ dài $EF$ là`, s[1] * K, [s[1], s[0] * K, s[1] + K],
    `Tỉ số đồng dạng $\\frac{DE}{AB} = ${K}$ nên $EF = ${K} \\cdot BC = ${s[1] * K}$ (cm).`, null, cmU);
  if (lv === 2) { const P = sum(s);
    return mc(`$\\triangle ABC \\sim \\triangle DEF$ theo tỉ số $k = ${K}$, chu vi tam giác $ABC$ bằng $${P}$ cm. Chu vi tam giác $DEF$ là`, P * K, [P, P * K * K, P + K],
      `Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng: $${P} \\cdot ${K} = ${P * K}$ (cm).`, null, cmU); }
  const coc = pick([1, 2]), bc = pick([1, 2, 3]) * coc / 1, H = ri(4, 15) * coc;
  const bongCoc = bc, bongCay = (H / coc) * bc;
  return mc(`Một cái cọc cao $${coc}$ m cắm thẳng đứng có bóng dài $${bongCoc}$ m. Cùng lúc đó, bóng của một cái cây dài $${bongCay}$ m. Cây cao bao nhiêu mét?`, H, [bongCay, (bongCay * bongCoc) / coc === H ? H + 1 : (bongCay * bongCoc) / coc, H + coc],
    `Hai tam giác vuông tạo bởi vật và bóng đồng dạng: $\\frac{h}{${bongCay}} = \\frac{${coc}}{${bongCoc}} \\Rightarrow h = ${H}$ (m).`, null, (v) => `${v} m`);
}

// Bài 38–39. Hình chóp tam giác đều · Hình chóp tứ giác đều
function g8hinhchop(lv) {
  const a = ri(3, 10), d = ri(4, 12), h = 3 * ri(1, 5);
  if (lv === 1) return mc(`Hình chóp tứ giác đều có cạnh đáy $${a}$ cm, trung đoạn $${d}$ cm. Diện tích xung quanh là`, 2 * a * d, [4 * a * d, a * d, a * a + 2 * a * d],
    `$S_{xq} = p \\cdot d = \\frac{4 \\cdot ${a}}{2} \\cdot ${d} = ${2 * a * d}$ (cm²) ($p$ là nửa chu vi đáy).`, { kind: 'solid', data: { type: 'pyr4', lab: { a: a + ' cm', d: d + ' cm' } } }, (v) => `${v} cm²`);
  if (lv === 2) return mc(`Hình chóp tứ giác đều có cạnh đáy $${a}$ cm, chiều cao $${h}$ cm. Thể tích hình chóp là`, (a * a * h) / 3, [a * a * h, (a * a * h) / 3 + a, a * h],
    `$V = \\frac{1}{3} S_{đáy} \\cdot h = \\frac{1}{3} \\cdot ${a * a} \\cdot ${h} = ${(a * a * h) / 3}$ (cm³).`, { kind: 'solid', data: { type: 'pyr4', lab: { a: a + ' cm', h: h + ' cm' } } }, (v) => `${v} cm³`);
  const a2 = 2 * ri(2, 6);
  return mc(`Hình chóp tam giác đều có cạnh đáy $${a2}$ cm, trung đoạn $${d}$ cm. Diện tích xung quanh là`, (3 * a2 * d) / 2, [3 * a2 * d, a2 * d, (a2 * d) / 2],
    `$S_{xq} = p \\cdot d = \\frac{3 \\cdot ${a2}}{2} \\cdot ${d} = ${(3 * a2 * d) / 2}$ (cm²).`, { kind: 'solid', data: { type: 'pyr3', lab: { a: a2 + ' cm', d: d + ' cm' } } }, (v) => `${v} cm²`);
}

/* ---------------- danh mục Toán 8 theo mục lục SGK ---------------- */
export const CHAPTERS8 = { I: 'Đa thức', II: 'Hằng đẳng thức đáng nhớ và ứng dụng', III: 'Tứ giác', IV: 'Định lí Thalès', V: 'Dữ liệu và biểu đồ',
  VI: 'Phân thức đại số', VII: 'Phương trình bậc nhất và hàm số bậc nhất', VIII: 'Mở đầu về tính xác suất của biến cố', IX: 'Tam giác đồng dạng', X: 'Một số hình khối trong thực tiễn' };
export const SKILLS8 = [
  { code: '8-DONTHUC', ch: 'I', bai: 'Bài 1', icon: '🔤', name: 'Đơn thức', gen: g8donthuc },
  { code: '8-DATHUC', ch: 'I', bai: 'Bài 2–3', icon: '🧮', name: 'Đa thức, cộng trừ đa thức', gen: g8dathuc },
  { code: '8-NHAN', ch: 'I', bai: 'Bài 4–5', icon: '✖️', name: 'Nhân đa thức, chia đa thức cho đơn thức', gen: g8nhan },
  { code: '8-HDT', ch: 'II', bai: 'Bài 6', icon: '✨', name: 'Hiệu hai bình phương, bình phương tổng/hiệu', gen: g8hdt },
  { code: '8-HDT3', ch: 'II', bai: 'Bài 7–8', icon: '🧊', name: 'Lập phương, tổng và hiệu hai lập phương', gen: g8hdt3 },
  { code: '8-PTNT', ch: 'II', bai: 'Bài 9', icon: '🧩', name: 'Phân tích đa thức thành nhân tử', gen: g8ptnt },
  { code: '8-TUGIAC', ch: 'III', bai: 'Bài 10', icon: '🔶', name: 'Tứ giác', gen: g8tugiac },
  { code: '8-HINHTHANG', ch: 'III', bai: 'Bài 11–12', icon: '⏢', name: 'Hình thang cân, hình bình hành', gen: g8hinhthang },
  { code: '8-HCN', ch: 'III', bai: 'Bài 13–14', icon: '⬜', name: 'Hình chữ nhật, hình thoi, hình vuông', gen: g8hcn },
  { code: '8-THALES', ch: 'IV', bai: 'Bài 15', icon: '📐', name: 'Định lí Thalès trong tam giác', gen: g8thales },
  { code: '8-TRUNGBINH', ch: 'IV', bai: 'Bài 16', icon: '➖', name: 'Đường trung bình của tam giác', gen: g8trungbinh },
  { code: '8-PHANGIAC', ch: 'IV', bai: 'Bài 17', icon: '🔪', name: 'Tính chất đường phân giác', gen: g8phangiac },
  { code: '8-DULIEU', ch: 'V', bai: 'Bài 18–20', icon: '📊', name: 'Dữ liệu và biểu đồ', gen: g8dulieu },
  { code: '8-PHANTHUC', ch: 'VI', bai: 'Bài 21–22', icon: '➗', name: 'Phân thức đại số, rút gọn', gen: g8phanthuc },
  { code: '8-PHANTHUCPT', ch: 'VI', bai: 'Bài 23–24', icon: '🔣', name: 'Cộng, trừ, nhân, chia phân thức', gen: g8phanthucpt },
  { code: '8-PT', ch: 'VII', bai: 'Bài 25–26', icon: '🎯', name: 'Phương trình bậc nhất một ẩn', gen: g8pt },
  { code: '8-HAMSOKN', ch: 'VII', bai: 'Bài 27', icon: '🗺️', name: 'Khái niệm hàm số, toạ độ', gen: g8hamsokn },
  { code: '8-HAMSO', ch: 'VII', bai: 'Bài 28–29', icon: '📈', name: 'Hàm số bậc nhất, hệ số góc', gen: g8hamso },
  { code: '8-XACSUAT', ch: 'VIII', bai: 'Bài 30–32', icon: '🎲', name: 'Xác suất của biến cố', gen: g8xacsuat },
  { code: '8-DONGDANG', ch: 'IX', bai: 'Bài 33–34, 36–37', icon: '🔍', name: 'Tam giác đồng dạng', gen: g8dongdang },
  { code: '8-PYTAGO', ch: 'IX', bai: 'Bài 35', icon: '📏', name: 'Định lí Pythagore', gen: g8pytago },
  { code: '8-HINHCHOP', ch: 'X', bai: 'Bài 38–39', icon: '🔺', name: 'Hình chóp tam giác đều, tứ giác đều', gen: g8hinhchop },
].map((s) => ({ ...s, grade: 8 }));
