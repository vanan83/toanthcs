// g7.js — các dạng bài Toán 7 (SGK Kết nối tri thức)
import { ri, pick, nz, gcd, lcm, shuffle, fr, p, deg, terms, poly, lin, pt, factor, mc, txt, sq, cf, coprime, TRIPLES, dc, pickTF, range, sum, roman, isPrime, divisors, kpi } from './core.js';
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
    `Luỹ thừa của một thương: $\\frac{${p(a)}^{${n}}}{${b}^{${n}}} = ${ans}$.`);
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
    t, [(d * m) / n, d + n - m, d - n + m, t + 1].filter((v) => v > 0),
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


/* =========================================================================
 * BỔ SUNG THEO SGK TOÁN 7 (Kết nối tri thức)
 * ========================================================================= */
const degU = (v) => `$${v}^\\circ$`, cmU = (v) => `${v} cm`;
const xeq = (v) => `$x = ${v}$`;

// Bài 1. Tập hợp các số hữu tỉ
function g7tapQ(lv) {
  if (lv === 1) {
    const [a, b] = rq();
    return mc(`Số đối của số hữu tỉ $${fr(a, b)}$ là`, fr(-a, b), [fr(a, b), fr(b, a), fr(-b, a)], `Số đối của $${fr(a, b)}$ là $${fr(-a, b)}$ (tổng của chúng bằng 0).`);
  }
  if (lv === 2) {
    const F = []; while (F.length < 4) { const q = rq(); if (!F.some((x) => x[0] * q[1] === q[0] * x[1])) F.push(q); }
    const best = F.reduce((m, x) => (x[0] * m[1] > m[0] * x[1] ? x : m));
    return mc('Số hữu tỉ nào lớn nhất?', fr(...best), F.filter((x) => x !== best).map((x) => fr(...x)),
      `Đổi ra số thập phân hoặc quy đồng mẫu để so sánh: $${fr(...best)} \\approx ${dc(best[0] / best[1], 2)}$ là lớn nhất.`);
  }
  const b = ri(3, 9), a = ri(1, b - 2), m = 2 * b, x = 2 * a + 1;
  return mc(`Số hữu tỉ nào nằm giữa $${fr(a, b)}$ và $${fr(a + 1, b)}$?`, fr(x, m), [fr(a, b + 1), fr(a + 2, b), fr(x + 2, m)].filter((s) => s !== fr(x, m)),
    `$${fr(a, b)} = \\frac{${2 * a}}{${m}}$, $${fr(a + 1, b)} = \\frac{${2 * a + 2}}{${m}}$ nên $\\frac{${x}}{${m}}$ nằm giữa hai số đó.`);
}

// Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế
function g7chuyenve(lv) {
  const [a, b] = rq(), [c, d] = rq();
  if (lv === 1) {
    const [e, f] = rq();
    return mc(`Tính $${fr(a, b)} + ${fq([c, d])} \\cdot ${fq([e, f])}$.`, fr(a * d * f + c * e * b, b * d * f), [fr((a * d + c * b) * e, b * d * f), fr(a * d * f - c * e * b, b * d * f), fr(a + c * e, b + d * f)],
      `Nhân trước, cộng sau: $${fq([c, d])} \\cdot ${fq([e, f])} = ${fr(c * e, d * f)}$; rồi $${fr(a, b)} + ${fq([c * e, d * f])} = ${fr(a * d * f + c * e * b, b * d * f)}$.`);
  }
  if (lv === 2) return mc(`Tìm $x$, biết $x + ${fq([a, b])} = ${fr(c, d)}$.`, fr(c * b - a * d, b * d), [fr(c * b + a * d, b * d), fr(a * d - c * b, b * d), fr(c - a, d - b || 1)],
    `Chuyển vế, đổi dấu: $x = ${fr(c, d)} - ${fq([a, b])} = ${fr(c * b - a * d, b * d)}$.`, null, xeq);
  return mc(`Tìm $x$, biết $${fr(a, b)} - x = ${fr(c, d)}$.`, fr(a * d - c * b, b * d), [fr(c * b - a * d, b * d), fr(a * d + c * b, b * d), fr(a - c, b)],
    `$x = ${fr(a, b)} - ${fq([c, d])} = ${fr(a * d - c * b, b * d)}$.`, null, xeq);
}

// Bài 5. Làm quen với số thập phân vô hạn tuần hoàn
function g7vhth(lv) {
  if (lv === 1) {
    const good = [2, 4, 5, 8, 10, 16, 20, 25, 40], bad = [3, 6, 7, 9, 11, 12, 13, 15, 14];
    const d = pick(good), w = shuffle(bad.slice()).slice(0, 3), num = (x) => { let n; do n = ri(1, 2 * x); while (gcd(n, x) !== 1); return n; };
    return mc('Phân số nào viết được dưới dạng số thập phân hữu hạn?', fr(num(d), d), w.map((x) => fr(num(x), x)),
      `Phân số tối giản có mẫu dương chỉ có ước nguyên tố $2$ và $5$ thì viết được dưới dạng số thập phân hữu hạn: $${d}$ chỉ có ước nguyên tố 2 và/hoặc 5.`);
  }
  const T = lv === 2 ? [[1, 3, '0,(3)'], [2, 3, '0,(6)'], [1, 9, '0,(1)'], [4, 9, '0,(4)'], [5, 9, '0,(5)'], [7, 9, '0,(7)']]
    : [[1, 11, '0,(09)'], [5, 11, '0,(45)'], [7, 11, '0,(63)'], [1, 6, '0,1(6)'], [5, 6, '0,8(3)'], [7, 12, '0,58(3)']];
  const [n, dd, s] = pick(T), dig = s.replace(/[^\d]/g, '');
  const bump = s.replace(/(\d)\)$/, (m0, d0) => `${(+d0 + 1) % 10})`);   // đổi chữ số cuối của chu kì
  return mc(`Viết phân số $${fr(n, dd)}$ dưới dạng số thập phân.`, s, [s.replace(/[()]/g, ''), `0,(${dig.slice(1)})`, bump, s.replace(/[()]/g, '') + '5'],
    `Chia $${n} : ${dd}$ thấy nhóm chữ số lặp lại mãi: $${fr(n, dd)} = ${s}$.`);
}

// Bài 6. Số vô tỉ. Căn bậc hai số học
function g7can(lv) {
  if (lv === 1) {
    const n = ri(2, 20);
    if (Math.random() < 0.5) return mc(`Tính $\\sqrt{${n * n}}$.`, n, [n * n, 2 * n, -n], `$${n} \\ge 0$ và $${n}^2 = ${n * n}$ nên $\\sqrt{${n * n}} = ${n}$.`);
    const m = ri(1, 9);
    return mc(`Tính $\\sqrt{${dc((m * m) / 100)}}$.`, dc(m / 10), [dc((m * m) / 10), dc(m / 100), dc(m)], `$${dc(m / 10)}^2 = ${dc((m * m) / 100)}$ nên $\\sqrt{${dc((m * m) / 100)}} = ${dc(m / 10)}$.`);
  }
  if (lv === 2) {
    const ir = pick([2, 3, 5, 6, 7, 8, 10, 11, 12]), sqv = pick([4, 9, 16, 25, 36, 49]);
    return mc('Số nào sau đây là số vô tỉ?', `\\sqrt{${ir}}`, [`\\sqrt{${sqv}}`, fr(1, 3), '0,(3)', dc(ri(11, 99) / 10)],
      `$\\sqrt{${ir}}$ không viết được dưới dạng số thập phân hữu hạn hay vô hạn tuần hoàn nên là số vô tỉ; $\\sqrt{${sqv}} = ${Math.sqrt(sqv)}$ là số hữu tỉ.`);
  }
  const a = ri(2, 15), b = ri(2, 15), c = ri(1, 12), v = a + b - c;
  return mc(`Tính $\\sqrt{${a * a}} + \\sqrt{${b * b}} - \\sqrt{${c * c}}$.`, v, [Math.round(Math.sqrt(a * a + b * b - c * c) * 10) / 10 === v ? v + 2 : a * a + b * b - c * c, a + b + c, v - 2],
    `$\\sqrt{${a * a}} = ${a}$, $\\sqrt{${b * b}} = ${b}$, $\\sqrt{${c * c}} = ${c}$ nên kết quả là $${a} + ${b} - ${c} = ${v}$.`);
}

// Bài 7. Tập hợp các số thực (giá trị tuyệt đối, so sánh)
function g7sothuc(lv) {
  if (lv === 1) {
    const a = nz(-30, 30), b = nz(-20, 20), v = Math.abs(a) + Math.abs(b);
    return mc(`Tính $|${a}| + |${b}|$.`, v, [a + b, Math.abs(a + b) === v ? v + 2 : Math.abs(a + b), -v], `$|${a}| = ${Math.abs(a)}$, $|${b}| = ${Math.abs(b)}$ nên tổng bằng $${v}$.`);
  }
  if (lv === 2) {
    const a = ri(2, 15), S = (s) => s;
    return mc(`Tìm $x$, biết $|x| = ${a}$.`, `x = ${a}` + ' \\text{ hoặc } ' + `x = ${-a}`, [`x = ${a}`, `x = ${-a}`, `x = ${a * a}` + ' \\text{ hoặc } ' + `x = ${-a * a}`].map(S),
      `Có hai số có giá trị tuyệt đối bằng $${a}$ là $${a}$ và $${-a}$.`);
  }
  const L = [['\\sqrt{2}', Math.SQRT2], ['1,5', 1.5], ['\\pi', Math.PI], ['1,(3)', 4 / 3], ['\\sqrt{5}', Math.sqrt(5)], ['2,1', 2.1]];
  const S = shuffle(L.slice()).slice(0, 4), up = S.slice().sort((x, y) => x[1] - y[1]), str = (l) => l.map((x) => x[0]).join('; ');
  return mc('Sắp xếp các số thực sau theo thứ tự tăng dần.', str(up), [str(up.slice().reverse()), str([up[1], up[0], up[2], up[3]]), str([up[0], up[2], up[1], up[3]])],
    `$\\sqrt{2} \\approx 1,414$; $\\sqrt{5} \\approx 2,236$; $\\pi \\approx 3,14$; $1,(3) = 1,333...$ nên thứ tự là $${str(up)}$.`);
}

// Bài 8. Góc ở vị trí đặc biệt. Tia phân giác của một góc
function g7gocdb(lv) {
  const a = 5 * ri(5, 31), r = (a * Math.PI) / 180;
  if (lv === 1) {
    return mc(`Hai góc $xOy$ và $yOz$ kề bù, $\\hat{xOy} = ${deg(a)}$. Tính $\\hat{yOz}$.`, 180 - a, [a, 90 - a > 0 ? 90 - a : 360 - a, 180 - a + 10],
      `Hai góc kề bù có tổng bằng $${deg(180)}$: $\\hat{yOz} = ${deg(180)} - ${deg(a)} = ${deg(180 - a)}$.`,
      { kind: 'geo', data: { P: { O: [0, 0], x: [4, 0], z: [-4, 0], y: [3.5 * Math.cos(r), 3.5 * Math.sin(r)] }, ray: ['Ox', 'Oz', 'Oy'], ang: [['xOy', a + '°'], ['yOz', '?']], dots: 'O' } }, degU);
  }
  if (lv === 2) {
    const P = { O: [0, 0], x: [4 * Math.cos(r), 4 * Math.sin(r)], y: [4, 0], X: [-4 * Math.cos(r), -4 * Math.sin(r)], Y: [-4, 0] };
    const askOpp = Math.random() < 0.5;
    return mc(`Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, $\\hat{xOy} = ${deg(a)}$. Tính $${askOpp ? "\\hat{x'Oy'}" : "\\hat{x'Oy}"}$.`, askOpp ? a : 180 - a,
      [askOpp ? 180 - a : a, 90, askOpp ? a / 2 : 360 - a].filter(Number.isInteger),
      askOpp ? `$\\hat{x'Oy'}$ và $\\hat{xOy}$ là hai góc đối đỉnh nên bằng nhau: $${deg(a)}$.` : `$\\hat{x'Oy}$ kề bù với $\\hat{xOy}$: $${deg(180)} - ${deg(a)} = ${deg(180 - a)}$.`,
      { kind: 'geo', data: { P, line: ['Xx', 'Yy'], ang: [['yOx', a + '°']], dots: 'O', hide: 'XY' } }, degU);
  }
  const b = 2 * ri(15, 80), h = b / 2, rb = (b * Math.PI) / 180, rt = rb / 2;
  return mc(`Tia $Ot$ là tia phân giác của góc $xOy$, $\\hat{xOy} = ${deg(b)}$. Tính $\\hat{xOt}$.`, h, [b, 180 - b, 2 * b < 180 ? 2 * b : h + 10],
    `Tia phân giác chia góc thành hai góc bằng nhau: $\\hat{xOt} = ${deg(b)} : 2 = ${deg(h)}$.`,
    { kind: 'geo', data: { P: { O: [0, 0], x: [4, 0], y: [4 * Math.cos(rb), 4 * Math.sin(rb)], t: [4.4 * Math.cos(rt), 4.4 * Math.sin(rt)] }, ray: ['Ox', 'Oy', 'Ot'], ang: [['xOt', '?']], dots: 'O' } }, degU);
}

// Bài 9–10. Hai đường thẳng song song · Tiên đề Euclid · Tính chất hai đường thẳng song song
function g7songsong(lv) {
  const a = 5 * ri(8, 17), k = 2.2 / Math.tan((a * Math.PI) / 180);
  const P = { A: [0, 2.2], B: [k, 0], M: [-3, 2.2], N: [4 + k, 2.2], P: [-3, 0], Q: [4 + k, 0], U: [-0.8 * k, 2.2 * 1.8], V: [1.8 * k, -2.2 * 0.8] };
  const base = { P, seg: ['MN', 'PQ', 'UV'], par: ['MN', 'PQ'], dots: 'AB', hide: 'MNPQUV' };
  const head = 'Cho hai đường thẳng song song bị một đường thẳng cắt tại $A$ và $B$ (hình vẽ).';
  if (lv === 1) return mc(`${head} Góc đánh dấu tại $A$ bằng $${deg(180 - a)}$. Góc đồng vị với nó tại $B$ (đánh dấu ?) bằng`, 180 - a, [a, 90, 180 - a + 10],
    'Hai đường thẳng song song thì hai góc đồng vị bằng nhau.', { kind: 'geo', data: { ...base, ang: [['NAU', (180 - a) + '°'], ['QBA', '?']] } }, degU);
  if (lv === 2) return mc(`${head} Góc đánh dấu tại $A$ bằng $${deg(a)}$. Góc so le trong với nó tại $B$ (đánh dấu ?) bằng`, a, [180 - a, 90, a + 10],
    'Hai đường thẳng song song thì hai góc so le trong bằng nhau.', { kind: 'geo', data: { ...base, ang: [['BAN', a + '°'], ['ABP', '?']] } }, degU);
  return mc(`${head} Góc đánh dấu tại $A$ bằng $${deg(a)}$. Tính góc đánh dấu ? tại $B$ (hai góc trong cùng phía).`, 180 - a, [a, 90, 180 - a + 20],
    `Hai góc trong cùng phía tạo bởi một đường thẳng cắt hai đường thẳng song song thì bù nhau: $${deg(180)} - ${deg(a)} = ${deg(180 - a)}$.`,
    { kind: 'geo', data: { ...base, ang: [['BAN', a + '°'], ['QBA', '?']] } }, degU);
}

// Bài 11. Định lí và chứng minh định lí
const THEOREMS = [
  ['Nếu hai góc đối đỉnh thì hai góc đó bằng nhau.', 'Hai góc đối đỉnh', 'Hai góc đó bằng nhau'],
  ['Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau.', 'Một đường thẳng cắt hai đường thẳng song song', 'Hai góc so le trong bằng nhau'],
  ['Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì chúng song song với nhau.', 'Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba', 'Hai đường thẳng đó song song với nhau'],
  ['Nếu một tam giác có hai góc bằng nhau thì tam giác đó là tam giác cân.', 'Tam giác có hai góc bằng nhau', 'Tam giác đó là tam giác cân'],
  ['Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì chúng song song với nhau.', 'Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba', 'Hai đường thẳng đó song song với nhau'],
];
function g7dinhli(lv) {
  const T = pick(THEOREMS), others = THEOREMS.filter((x) => x !== T), askGT = lv !== 2;
  const ans = askGT ? T[1] : T[2], w = [askGT ? T[2] : T[1], ...shuffle(others).slice(0, 2).map((x) => (askGT ? x[1] : x[2]))];
  return mc(`Cho định lí: “${T[0]}” ${askGT ? 'Giả thiết' : 'Kết luận'} của định lí là`, ans, w,
    `Định lí có dạng “Nếu … thì …”: phần sau “nếu” là giả thiết (${T[1].toLowerCase()}), phần sau “thì” là kết luận (${T[2].toLowerCase()}).`, null, txt);
}

// Bài 13–15. Hai tam giác bằng nhau · Các trường hợp bằng nhau
function g7tgbn(lv) {
  const M = ['DEF', 'MNP', 'HIK', 'PQR'], N = pick(M), V = 'ABC';
  if (lv === 1) {
    const i = ri(0, 2), j = (i + 1) % 3, side = Math.random() < 0.5;
    const ans = side ? N[i] + N[j] : `\\hat{${N[i]}}`, w = side ? [N[j] + N[i] === ans ? N[i] + N[(j + 1) % 3] : N[j] + N[(j + 1) % 3], N[(i + 2) % 3] + N[j], N[(i + 1) % 3] + N[(i + 2) % 3]] : [0, 1, 2].filter((k) => k !== i).map((k) => `\\hat{${N[k]}}`).concat([`\\hat{${V[i]}}`]);
    return mc(`Cho $\\triangle ABC = \\triangle ${N}$. ${side ? `Cạnh tương ứng với cạnh $${V[i]}${V[j]}$ là` : `Góc tương ứng với góc $\\hat{${V[i]}}$ là`}`, ans, w,
      `Các đỉnh tương ứng viết theo cùng thứ tự: $A \\leftrightarrow ${N[0]}$, $B \\leftrightarrow ${N[1]}$, $C \\leftrightarrow ${N[2]}$.`);
  }
  if (lv === 2) {
    const s = [ri(3, 9), ri(4, 10), ri(5, 11)], i = ri(0, 2), j = (i + 1) % 3;
    return mc(`Cho $\\triangle ABC = \\triangle ${N}$, biết $AB = ${s[0]}$ cm, $BC = ${s[1]}$ cm, $CA = ${s[2]}$ cm. Độ dài cạnh $${N[i]}${N[j]}$ là`, s[i], s.filter((_, k) => k !== i).concat([s[i] + 1]),
      `$${N[i]}${N[j]}$ tương ứng với $${V[i]}${V[j]}$ nên $${N[i]}${N[j]} = ${V[i]}${V[j]} = ${s[i]}$ cm.`, null, cmU);
  }
  const C = pick([['$AB = DE$, $BC = EF$, $CA = FD$', 'cạnh – cạnh – cạnh (c.c.c)'], ['$AB = DE$, $\\hat{B} = \\hat{E}$, $BC = EF$', 'cạnh – góc – cạnh (c.g.c)'], ['$\\hat{B} = \\hat{E}$, $BC = EF$, $\\hat{C} = \\hat{F}$', 'góc – cạnh – góc (g.c.g)']]);
  return mc(`Hai tam giác $ABC$ và $DEF$ có ${C[0]}. Khi đó $\\triangle ABC = \\triangle DEF$ theo trường hợp`, C[1],
    ['cạnh – cạnh – cạnh (c.c.c)', 'cạnh – góc – cạnh (c.g.c)', 'góc – cạnh – góc (g.c.g)', 'góc – góc – góc'].filter((x) => x !== C[1]),
    `Các yếu tố bằng nhau là ${C[0]}: đó là trường hợp ${C[1]}.`, null, txt);
}

// Bài 16. Tam giác cân. Đường trung trực của đoạn thẳng
function g7tgcan(lv) {
  if (lv === 1) {
    const B = 5 * ri(7, 17), A = 180 - 2 * B;
    return mc(`Tam giác $ABC$ cân tại $A$ có $\\hat{B} = ${deg(B)}$. Tính $\\hat{A}$.`, A, [180 - B, B, 90 - B > 0 ? 90 - B : A + 10],
      `Tam giác cân tại $A$ nên $\\hat{C} = \\hat{B} = ${deg(B)}$; $\\hat{A} = ${deg(180)} - 2 \\cdot ${deg(B)} = ${deg(A)}$.`,
      { kind: 'triangle', data: { ang: [A, B, B], labels: ['?', B + '°', ''] } }, degU);
  }
  if (lv === 2) {
    return mc('Tam giác cân có một góc bằng $60^\\circ$ là', 'tam giác đều', ['tam giác vuông cân', 'tam giác tù', 'tam giác vuông'],
      'Tam giác cân có một góc $60^\\circ$ thì cả ba góc đều bằng $60^\\circ$, nên là tam giác đều.', null, txt);
  }
  const MA = ri(3, 12), AB = ri(4, 14);
  return mc(`Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB = ${AB}$ cm và $MA = ${MA}$ cm. Độ dài $MB$ là`, MA, [AB, AB / 2 === Math.floor(AB / 2) ? AB / 2 : MA + 1, MA + AB],
    'Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai đầu mút của đoạn thẳng đó: $MB = MA$.',
    { kind: 'geo', data: { P: { A: [0, 0], B: [AB, 0], I: [AB / 2, 0], M: [AB / 2, Math.sqrt(Math.max(1, MA * MA - (AB * AB) / 4))] }, seg: ['AB', 'MA', 'MB'], dash: ['MI'], tick: [['AI', 1], ['IB', 1]], ang: [['MIB', '', 1]] } }, cmU);
}

// Bài 17. Thu thập và phân loại dữ liệu
const DINHTINH = ['Màu sắc yêu thích', 'Tên các loài hoa', 'Xếp loại học lực (Tốt, Khá, Đạt)', 'Phương tiện đến trường', 'Món ăn sáng yêu thích'];
const DINHLUONG = ['Chiều cao (cm)', 'Số anh chị em ruột', 'Nhiệt độ trong ngày ($^\\circ C$)', 'Điểm kiểm tra môn Toán', 'Số giờ ngủ mỗi đêm'];
function g7dulieu(lv) {
  if (lv === 1) { const [t, w] = pickTF(DINHLUONG, DINHTINH); return mc('Dữ liệu nào sau đây là dữ liệu định lượng (là số)?', t, w, `“${t}” là các số nên là dữ liệu định lượng.`, null, txt); }
  if (lv === 2) { const [t, w] = pickTF(DINHTINH, DINHLUONG); return mc('Dữ liệu nào sau đây là dữ liệu định tính (không phải số)?', t, w, `“${t}” không phải là số nên là dữ liệu định tính.`, null, txt); }
  return mc('Để biết môn thể thao yêu thích của học sinh toàn trường THCS, cách khảo sát nào có tính đại diện nhất?',
    'Chọn ngẫu nhiên mỗi lớp trong trường một số bạn để hỏi', ['Chỉ hỏi các bạn trong đội bóng đá của trường', 'Chỉ hỏi các bạn nữ lớp 7A', 'Chỉ hỏi các bạn lớp 9'],
    'Mẫu khảo sát cần đại diện cho mọi khối lớp, cả nam và nữ; chỉ hỏi một nhóm riêng sẽ không đại diện cho toàn trường.', null, txt);
}

// Bài 18. Biểu đồ hình quạt tròn
function g7quat(lv) {
  const names = ['Bóng đá', 'Cầu lông', 'Bơi lội', 'Cờ vua'];
  let v; do { const a = 5 * ri(4, 9), b = 5 * ri(2, 6), c = 5 * ri(1, 5); v = [a, b, c, 100 - a - b - c]; } while (v[3] < 5 || new Set(v).size < 4);
  const fig = { kind: 'pie', data: { items: names.map((n, i) => [n, v[i]]), title: 'Môn thể thao yêu thích của lớp 7A' } }, i = ri(0, 3);
  if (lv === 1) return mc(`Theo biểu đồ, môn ${names[i]} chiếm bao nhiêu phần trăm?`, v[i], v.filter((_, j) => j !== i), `Đọc số ghi trên hình quạt ${names[i]}: $${v[i]}\\%$.`, fig, (x) => `$${x}\\%$`);
  const N = 40;
  if (lv === 2) { const c = (N * v[i]) / 100; if (!Number.isInteger(c)) return g7quat(lv);
    return mc(`Lớp 7A có ${N} học sinh. Theo biểu đồ, có bao nhiêu học sinh thích ${names[i].toLowerCase()}?`, c, [v[i], N - c, c + 2], `$${N} \\cdot ${v[i]}\\% = ${c}$ (học sinh).`, fig); }
  const j = (i + 1) % 4, d = (N * (v[i] - v[j])) / 100; if (!Number.isInteger(d) || d === 0) return g7quat(lv);
  return mc(`Lớp 7A có ${N} học sinh. Số học sinh thích ${names[i].toLowerCase()} nhiều hơn số học sinh thích ${names[j].toLowerCase()} là bao nhiêu? (số âm nghĩa là ít hơn)`, d, [v[i] - v[j], -d, d + 4],
    `$${N} \\cdot (${v[i]}\\% - ${v[j]}\\%) = ${d}$ (học sinh).`, fig);
}

// Bài 19. Biểu đồ đoạn thẳng
function g7doanthang(lv) {
  const t = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'], v = t.map(() => ri(20, 36));
  const fig = { kind: 'line', data: { items: t.map((x, i) => [x, v[i]]), unit: '°C', title: 'Nhiệt độ cao nhất các ngày trong tuần' } };
  const i = ri(0, 5), hi = v.indexOf(Math.max(...v));
  if (lv === 1) return mc(`Theo biểu đồ, nhiệt độ cao nhất ngày ${t[i]} là bao nhiêu?`, v[i], v.filter((x) => x !== v[i]).slice(0, 3), `Đọc điểm ứng với ${t[i]}: $${v[i]}^\\circ C$.`, fig, (x) => `$${x}^\\circ C$`);
  if (lv === 2) { if (v.filter((x) => x === v[hi]).length > 1) return g7doanthang(lv);
    return mc('Ngày nào có nhiệt độ cao nhất?', t[hi], t.filter((x) => x !== t[hi]).slice(0, 3), `Điểm cao nhất của đường gấp khúc ứng với ${t[hi]} ($${v[hi]}^\\circ C$).`, fig, txt); }
  const a = ri(0, 4), d = v[a + 1] - v[a];
  return mc(`Nhiệt độ ngày ${t[a + 1]} thay đổi bao nhiêu độ so với ngày ${t[a]}? (số âm nghĩa là giảm)`, d, [-d, v[a + 1] + v[a], d + 1].filter((x) => x !== d || d === 0),
    `$${v[a + 1]} - ${v[a]} = ${d}$ ($^\\circ C$).`, fig, (x) => `$${x}^\\circ C$`);
}

// Bài 21. Tính chất của dãy tỉ số bằng nhau
function g7daytiso(lv) {
  const a = ri(2, 9), b = ri(2, 9), k = ri(2, 12); if (a === b) return g7daytiso(lv);
  if (lv === 1) return mc(`Tìm $x$, biết $\\frac{x}{${a}} = \\frac{y}{${b}}$ và $x + y = ${(a + b) * k}$.`, a * k, [b * k, k, (a + b) * k - a],
    `$\\frac{x}{${a}} = \\frac{y}{${b}} = \\frac{x + y}{${a} + ${b}} = \\frac{${(a + b) * k}}{${a + b}} = ${k}$ nên $x = ${a} \\cdot ${k} = ${a * k}$.`, null, xeq);
  if (lv === 2) return mc(`Tìm $y$, biết $\\frac{x}{${a}} = \\frac{y}{${b}}$ và $x - y = ${(a - b) * k}$.`, b * k, [a * k, -b * k, k],
    `$\\frac{x}{${a}} = \\frac{y}{${b}} = \\frac{x - y}{${a} - ${b}} = \\frac{${(a - b) * k}}{${a - b}} = ${k}$ nên $y = ${b} \\cdot ${k} = ${b * k}$.`, null, (v) => `$y = ${v}$`);
  const c = ri(2, 9), N = (a + b + c) * k, mx = Math.max(a, b, c) * k;
  return mc(`Ba lớp 7A, 7B, 7C quyên góp được ${N} quyển sách, tỉ lệ với các số $${a}; ${b}; ${c}$. Lớp quyên góp nhiều nhất được bao nhiêu quyển?`, mx, [Math.min(a, b, c) * k, k, mx + k],
    `Mỗi phần: $${N} : (${a} + ${b} + ${c}) = ${k}$; lớp nhiều nhất: $${Math.max(a, b, c)} \\cdot ${k} = ${mx}$ (quyển).`, null, (v) => `${v} quyển`);
}

// Bài 24. Biểu thức đại số
function g7btds(lv) {
  if (lv === 1) {
    const a = nz(-4, 4), b = nz(-5, 5), x = nz(-3, 3), y = nz(-3, 3), v = a * x * x + b * y;
    return mc(`Tính giá trị của biểu thức $${terms([[a, 'x^2'], [b, 'y']])}$ tại $x = ${x}$, $y = ${y}$.`, v, [a * 2 * x + b * y, a * x * x - b * y, -v],
      `Thay $x = ${x}$, $y = ${y}$: $${a} \\cdot ${p(x)}^2 + ${p(b)} \\cdot ${p(y)} = ${v}$.`);
  }
  if (lv === 2) {
    const k = ri(2, 9);
    return mc(`Một hình chữ nhật có chiều rộng $x$ (cm), chiều dài hơn chiều rộng $${k}$ cm. Biểu thức biểu thị chu vi hình chữ nhật là`, `2(2x + ${k})`, [`2x + ${k}`, `x(x + ${k})`, `4x + ${k}`],
      `Chiều dài: $x + ${k}$; chu vi: $2(x + x + ${k}) = 2(2x + ${k})$.`);
  }
  const a = pick([5, 6, 7, 8, 10]) * 1000, b = pick([12, 15, 18, 20]) * 1000, x = ri(2, 8), y = ri(1, 5), v = a * x + b * y, vnd = (z) => `${z.toLocaleString('vi-VN')} đồng`;
  return mc(`Giá một quyển vở là ${vnd(a)}, giá một cây bút là ${vnd(b)}. Biểu thức $${a}x + ${b}y$ là số tiền mua $x$ quyển vở và $y$ cây bút. Tính số tiền khi $x = ${x}$, $y = ${y}$.`,
    v, [a * y + b * x, (a + b) * (x + y), v + 1000], `$${a} \\cdot ${x} + ${b} \\cdot ${y} = ${v}$ (đồng).`, null, vnd);
}

// Bài 26. Phép cộng và phép trừ đa thức một biến
function g7dathucct(lv) {
  const P = [nz(-5, 5), ri(-6, 6), ri(-9, 9)], Q = [nz(-5, 5), ri(-6, 6), ri(-9, 9)];
  const add = P.map((c, i) => c + Q[i]), sub = P.map((c, i) => c - Q[i]);
  if (add[0] === 0 || sub[0] === 0) return g7dathucct(lv);
  const PP = poly(P), QQ = poly(Q);
  if (lv === 1) return mc(`Cho $P(x) = ${PP}$ và $Q(x) = ${QQ}$. Tính $P(x) + Q(x)$.`, poly(add), [poly(sub), poly([add[0], add[1], -add[2]]), poly([add[0], -add[1], add[2]])],
    `Cộng các hạng tử cùng bậc: $(${P[0]} + ${p(Q[0])})x^2 + (${P[1]} + ${p(Q[1])})x + (${P[2]} + ${p(Q[2])}) = ${poly(add)}$.`);
  if (lv === 2) return mc(`Cho $P(x) = ${PP}$ và $Q(x) = ${QQ}$. Tính $P(x) - Q(x)$.`, poly(sub), [poly(add), poly(sub.map((c) => -c)), poly([sub[0], add[1], sub[2]])],
    `Trừ các hạng tử cùng bậc: $(${P[0]} - ${p(Q[0])})x^2 + (${P[1]} - ${p(Q[1])})x + (${P[2]} - ${p(Q[2])}) = ${poly(sub)}$.`);
  return mc(`Tìm đa thức $R(x)$ sao cho $R(x) + (${PP}) = ${poly(add)}$.`, QQ, [poly(add.map((c, i) => c + P[i])), poly(Q.map((c) => -c)), poly(P)],
    `$R(x) = ${poly(add)} - (${PP}) = ${QQ}$.`);
}

// Bài 27–28. Phép nhân, phép chia đa thức một biến
function g7dathucnc(lv) {
  if (lv === 1) {
    const a = nz(-5, 5), b = nz(-6, 6), c = nz(-9, 9);
    return mc(`Tính $${a === 1 ? '' : a === -1 ? '-' : a}x \\cdot (${poly([b, c])})$.`, poly([a * b, a * c, 0]), [poly([a * b, c, 0]), poly([a * b, a * c]), poly([a + b, a * c, 0])],
      `Nhân $${a === 1 ? '' : a === -1 ? '-' : a}x$ với từng hạng tử: $${poly([a * b, a * c, 0])}$.`);
  }
  if (lv === 2) {
    const a = nz(-7, 7), b = nz(-7, 7);
    return mc(`Tính $${factor(-a)}${factor(-b)}$.`, poly([1, a + b, a * b]), [poly([1, a * b, a + b]), poly([1, 0, a * b]), poly([1, a + b, -a * b])],
      `$x \\cdot x + ${p(b)}x + ${p(a)}x + ${p(a)} \\cdot ${p(b)} = ${poly([1, a + b, a * b])}$.`);
  }
  const a = nz(-6, 6), b = nz(-6, 6), r = ri(0, 1) ? 0 : nz(-5, 5), D = poly([1, a + b, a * b + r]);
  return mc(`Chia đa thức $${D}$ cho $${factor(-a)}$ được thương và dư là`, `\\text{thương } ${poly([1, b])}, \\text{ dư } ${r}`,
    [`\\text{thương } ${poly([1, a])}, \\text{ dư } ${r}`, `\\text{thương } ${poly([1, -b])}, \\text{ dư } ${r}`, `\\text{thương } ${poly([1, b])}, \\text{ dư } ${r + a}`, `\\text{thương } ${poly([1, a + b])}, \\text{ dư } ${a * b + r}`],
    `$${D} = ${factor(-a)}(${poly([1, b])}) + ${p(r)}$.`);
}

// Bài 29–30. Làm quen với biến cố · Xác suất của biến cố
function g7bienco(lv) {
  if (lv === 1) {
    const E = [['Gieo một con xúc xắc, mặt xuất hiện có số chấm nhỏ hơn 7', 'chắc chắn'], ['Gieo một con xúc xắc, mặt xuất hiện có 7 chấm', 'không thể'],
      ['Gieo một con xúc xắc, mặt xuất hiện có số chấm chẵn', 'ngẫu nhiên'], ['Tháng Hai năm sau có 30 ngày', 'không thể'], ['Mặt trời mọc ở hướng Đông', 'chắc chắn'], ['Tung đồng xu được mặt ngửa', 'ngẫu nhiên']];
    const [e, k] = pick(E);
    return mc(`Biến cố “${e}” là biến cố gì?`, `Biến cố ${k}`, ['Biến cố chắc chắn', 'Biến cố không thể', 'Biến cố ngẫu nhiên', 'Không phải biến cố'].filter((x) => x !== `Biến cố ${k}`).slice(0, 3),
      'Chắc chắn: luôn xảy ra; không thể: không bao giờ xảy ra; ngẫu nhiên: có thể xảy ra hoặc không.', null, txt);
  }
  if (lv === 2) {
    const C = pick([['số chấm chẵn', 3], ['số chấm là số nguyên tố', 3], ['số chấm chia hết cho 3', 2], ['số chấm lớn hơn 4', 2], ['6 chấm', 1], ['số chấm nhỏ hơn 5', 4]]);
    return mc(`Gieo một con xúc xắc cân đối. Xác suất để mặt xuất hiện có ${C[0]} là`, fr(C[1], 6), [fr(1, 6) === fr(C[1], 6) ? fr(1, 2) : fr(1, 6), fr(C[1], 5), fr(6 - C[1], 6)],
      `Có 6 kết quả đồng khả năng, trong đó ${C[1]} kết quả thuận lợi: xác suất $\\frac{${C[1]}}{6} = ${fr(C[1], 6)}$.`);
  }
  const n = ri(4, 8);
  return mc(`Một hộp có ${n} quả bóng được đánh số từ 1 đến ${n}. Lấy ngẫu nhiên một quả. Xác suất lấy được quả bóng số ${ri(1, n)} là`, fr(1, n), [fr(1, n - 1), fr(n - 1, n), fr(1, 2) === fr(1, n) ? fr(1, 3) : fr(1, 2)],
    `Có ${n} quả bóng, mỗi quả có khả năng được lấy như nhau nên xác suất là $\\frac{1}{${n}}$.`);
}

// Bài 31–33. Quan hệ giữa góc và cạnh đối diện · đường vuông góc, đường xiên · ba cạnh tam giác
function g7qhtg(lv) {
  if (lv === 1) {
    let A, B; do { A = 5 * ri(8, 20); B = 5 * ri(6, 16); } while (A + B >= 170 || A === B || A + B === 90 || 180 - A - B === A || 180 - A - B === B);
    const C = 180 - A - B, big = [['BC', A], ['CA', B], ['AB', C]].sort((x, y) => y[1] - x[1])[0][0];
    return mc(`Tam giác $ABC$ có $\\hat{A} = ${deg(A)}$, $\\hat{B} = ${deg(B)}$. Cạnh lớn nhất của tam giác là`, big, ['AB', 'BC', 'CA'].filter((x) => x !== big).concat(['Không xác định được']),
      `$\\hat{C} = ${deg(C)}$. Trong một tam giác, cạnh đối diện với góc lớn nhất là cạnh lớn nhất.`, null, (v) => (v.length === 2 ? `$${v}$` : v));
  }
  if (lv === 2) {
    const ok = pick([[3, 4, 6], [5, 6, 8], [4, 7, 9], [6, 7, 12], [2, 3, 4]]), bad = shuffle([[1, 2, 3], [2, 3, 6], [3, 4, 8], [4, 5, 10], [2, 5, 8], [1, 3, 5]]).slice(0, 3), T = (t) => t.map((x) => x + ' cm').join('; ');
    return mc('Bộ ba độ dài nào có thể là độ dài ba cạnh của một tam giác?', T(ok), bad.map(T), `Tổng hai cạnh nhỏ phải lớn hơn cạnh lớn nhất: $${ok[0]} + ${ok[1]} > ${ok[2]}$.`, null, txt);
  }
  const a = ri(2, 6), b = a + ri(4, 8), P = 2 * b + a;
  return mc(`Một tam giác cân có hai cạnh dài $${a}$ cm và $${b}$ cm. Chu vi của tam giác đó là`, P, [2 * a + b, a + b, P + 1],
    `Nếu cạnh bên là $${a}$ cm thì $${a} + ${a} < ${b}$, không thỏa mãn bất đẳng thức tam giác. Vậy cạnh bên là $${b}$ cm, chu vi $= ${b} + ${b} + ${a} = ${P}$ (cm).`, null, cmU);
}

// Bài 34–35. Sự đồng quy của các đường trong tam giác
function g7dongquy(lv) {
  const k = ri(2, 9);
  if (lv === 1) return mc(`Cho tam giác $ABC$ có đường trung tuyến $AM = ${3 * k}$ cm, $G$ là trọng tâm. Độ dài $AG$ là`, 2 * k, [k, 3 * k, (3 * k) / 2 === Math.floor((3 * k) / 2) ? (3 * k) / 2 : 2 * k + 1],
    `Trọng tâm cách mỗi đỉnh một khoảng bằng $\\frac{2}{3}$ độ dài đường trung tuyến: $AG = \\frac{2}{3} \\cdot ${3 * k} = ${2 * k}$ (cm).`,
    { kind: 'geo', data: { P: { A: [1.5, 4], B: [0, 0], C: [6, 0], M: [3, 0], G: [2.5, 4 / 3] }, seg: ['AB', 'BC', 'CA', 'AM'], tick: [['BM', 1], ['MC', 1]] } }, cmU);
  if (lv === 2) return mc(`Cho $G$ là trọng tâm tam giác $ABC$, $AM$ là đường trung tuyến, $GM = ${k}$ cm. Độ dài $AM$ là`, 3 * k, [2 * k, k, 4 * k],
    `$GM = \\frac{1}{3}AM$ nên $AM = 3 \\cdot ${k} = ${3 * k}$ (cm).`, null, cmU);
  const Q = pick([['Điểm cách đều ba đỉnh của tam giác là', 'Giao điểm ba đường trung trực'], ['Điểm nằm trong tam giác và cách đều ba cạnh của tam giác là', 'Giao điểm ba đường phân giác'],
    ['Điểm cách mỗi đỉnh một khoảng bằng $\\frac{2}{3}$ độ dài đường trung tuyến đi qua đỉnh đó là', 'Trọng tâm (giao điểm ba đường trung tuyến)'], ['Giao điểm của ba đường cao trong tam giác được gọi là', 'Trực tâm']]);
  return mc(Q[0], Q[1], ['Giao điểm ba đường trung trực', 'Giao điểm ba đường phân giác', 'Trọng tâm (giao điểm ba đường trung tuyến)', 'Trực tâm'].filter((x) => x !== Q[1]),
    `${Q[1]} là điểm ${Q[0]}.`, null, txt);
}

// Bài 36. Hình hộp chữ nhật và hình lập phương
function g7hinhhop(lv) {
  const a = ri(3, 12), b = ri(2, 10), c = ri(2, 10);
  if (lv === 1) return mc(`Một hình hộp chữ nhật có chiều dài $${a}$ cm, chiều rộng $${b}$ cm, chiều cao $${c}$ cm. Thể tích của hình hộp là`, a * b * c, [2 * (a + b) * c, a * b + c, a + b + c],
    `$V = ${a} \\cdot ${b} \\cdot ${c} = ${a * b * c}$ (cm³).`, { kind: 'solid', data: { type: 'box', lab: { a: a + ' cm', b: b + ' cm', c: c + ' cm' } } }, (v) => `${v} cm³`);
  if (lv === 2) return mc(`Một hình hộp chữ nhật có chiều dài $${a}$ cm, chiều rộng $${b}$ cm, chiều cao $${c}$ cm. Diện tích xung quanh của hình hộp là`, 2 * (a + b) * c, [a * b * c, (a + b) * c, 2 * (a * b + b * c + c * a)],
    `$S_{xq} = 2 \\cdot (${a} + ${b}) \\cdot ${c} = ${2 * (a + b) * c}$ (cm²).`, { kind: 'solid', data: { type: 'box', lab: { a: a + ' cm', b: b + ' cm', c: c + ' cm' } } }, (v) => `${v} cm²`);
  const x = ri(5, 15), y = ri(4, 10), z = ri(3, 8), V = x * y * z;
  return mc(`Một bể nước dạng hình hộp chữ nhật có kích thước trong lòng bể là $${x}$ dm, $${y}$ dm, $${z}$ dm. Bể chứa đầy được bao nhiêu lít nước?`, V, [V * 10, 2 * (x + y) * z, V / 10 === Math.floor(V / 10) ? V / 10 : V + 10],
    `$V = ${x} \\cdot ${y} \\cdot ${z} = ${V}$ (dm³) $= ${V}$ lít (vì $1\\ \\text{dm}^3 = 1$ lít).`, null, (v) => `${v} lít`);
}

// Bài 37. Hình lăng trụ đứng tam giác, hình lăng trụ đứng tứ giác
function g7langtru(lv) {
  const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]), h = ri(4, 15);
  const fig = { kind: 'solid', data: { type: 'prism3', lab: { h: h + ' cm' } } };
  if (lv === 1) return mc(`Một hình lăng trụ đứng tam giác có đáy là tam giác với ba cạnh $${a}$ cm, $${b}$ cm, $${c}$ cm và chiều cao $${h}$ cm. Diện tích xung quanh là`,
    (a + b + c) * h, [((a * b) / 2) * h, (a + b + c) * h * 2, a * b * c], `$S_{xq} = (${a} + ${b} + ${c}) \\cdot ${h} = ${(a + b + c) * h}$ (cm²).`, fig, (v) => `${v} cm²`);
  if (lv === 2) return mc(`Một hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $${a}$ cm và $${b}$ cm, chiều cao lăng trụ $${h}$ cm. Thể tích lăng trụ là`,
    ((a * b) / 2) * h, [a * b * h, (a + b + c) * h, ((a * b) / 2) * h + h], `$S_{đáy} = \\frac{${a} \\cdot ${b}}{2} = ${(a * b) / 2}$ (cm²); $V = ${(a * b) / 2} \\cdot ${h} = ${((a * b) / 2) * h}$ (cm³).`, fig, (v) => `${v} cm³`);
  const d1 = ri(4, 10), d2 = ri(2, 8);
  return mc(`Một hình lăng trụ đứng tứ giác có đáy là hình thang với hai đáy $${d1 + d2}$ cm, $${d1}$ cm và chiều cao hình thang $4$ cm; chiều cao lăng trụ $${h}$ cm. Thể tích lăng trụ là`,
    ((2 * d1 + d2) * 4 / 2) * h, [(2 * d1 + d2) * 4 * h, ((2 * d1 + d2) * 4 / 2) + h, (d1 + d2) * d1 * h],
    `$S_{đáy} = \\frac{(${d1 + d2} + ${d1}) \\cdot 4}{2} = ${(2 * d1 + d2) * 2}$ (cm²); $V = ${(2 * d1 + d2) * 2} \\cdot ${h} = ${(2 * d1 + d2) * 2 * h}$ (cm³).`, null, (v) => `${v} cm³`);
}

/* ---------------- danh mục Toán 7 theo mục lục SGK ---------------- */
export const CHAPTERS7 = { I: 'Số hữu tỉ', II: 'Số thực', III: 'Góc và đường thẳng song song', IV: 'Tam giác bằng nhau', V: 'Thu thập và biểu diễn dữ liệu',
  VI: 'Tỉ lệ thức và đại lượng tỉ lệ', VII: 'Biểu thức đại số và đa thức một biến', VIII: 'Làm quen với biến cố và xác suất của biến cố',
  IX: 'Quan hệ giữa các yếu tố trong một tam giác', X: 'Một số hình khối trong thực tiễn' };
export const SKILLS7 = [
  { code: '7-TAPQ', ch: 'I', bai: 'Bài 1', icon: '🔢', name: 'Tập hợp các số hữu tỉ', gen: g7tapQ },
  { code: '7-SOHUUTI', ch: 'I', bai: 'Bài 2–3', icon: '➗', name: 'Phép tính, luỹ thừa của số hữu tỉ', gen: g7sohuuti },
  { code: '7-CHUYENVE', ch: 'I', bai: 'Bài 4', icon: '↪️', name: 'Thứ tự phép tính, quy tắc chuyển vế', gen: g7chuyenve },
  { code: '7-VHTH', ch: 'II', bai: 'Bài 5', icon: '🔁', name: 'Số thập phân vô hạn tuần hoàn', gen: g7vhth },
  { code: '7-CAN', ch: 'II', bai: 'Bài 6', icon: '🌱', name: 'Số vô tỉ, căn bậc hai số học', gen: g7can },
  { code: '7-SOTHUC', ch: 'II', bai: 'Bài 7', icon: '📏', name: 'Số thực, giá trị tuyệt đối', gen: g7sothuc },
  { code: '7-GOCDB', ch: 'III', bai: 'Bài 8', icon: '✳️', name: 'Góc kề bù, đối đỉnh, tia phân giác', gen: g7gocdb },
  { code: '7-SONGSONG', ch: 'III', bai: 'Bài 9–10', icon: '🛤️', name: 'Hai đường thẳng song song', gen: g7songsong },
  { code: '7-DINHLI', ch: 'III', bai: 'Bài 11', icon: '📜', name: 'Định lí, giả thiết và kết luận', gen: g7dinhli },
  { code: '7-GOC', ch: 'IV', bai: 'Bài 12', icon: '📐', name: 'Tổng các góc trong một tam giác', gen: g7goc },
  { code: '7-TGBN', ch: 'IV', bai: 'Bài 13–15', icon: '👯', name: 'Hai tam giác bằng nhau', gen: g7tgbn },
  { code: '7-TGCAN', ch: 'IV', bai: 'Bài 16', icon: '🔺', name: 'Tam giác cân, đường trung trực', gen: g7tgcan },
  { code: '7-DULIEU', ch: 'V', bai: 'Bài 17', icon: '📋', name: 'Thu thập và phân loại dữ liệu', gen: g7dulieu },
  { code: '7-QUAT', ch: 'V', bai: 'Bài 18', icon: '🥧', name: 'Biểu đồ hình quạt tròn', gen: g7quat },
  { code: '7-DOANTHANG', ch: 'V', bai: 'Bài 19', icon: '📈', name: 'Biểu đồ đoạn thẳng', gen: g7doanthang },
  { code: '7-TILE', ch: 'VI', bai: 'Bài 20, 22–23', icon: '⚖️', name: 'Tỉ lệ thức, đại lượng tỉ lệ', gen: g7tile },
  { code: '7-DAYTISO', ch: 'VI', bai: 'Bài 21', icon: '🔗', name: 'Dãy tỉ số bằng nhau', gen: g7daytiso },
  { code: '7-BTDS', ch: 'VII', bai: 'Bài 24', icon: '🔤', name: 'Biểu thức đại số', gen: g7btds },
  { code: '7-DATHUC', ch: 'VII', bai: 'Bài 25', icon: '🧮', name: 'Đa thức một biến', gen: g7dathuc },
  { code: '7-DATHUCCT', ch: 'VII', bai: 'Bài 26', icon: '➕', name: 'Cộng, trừ đa thức một biến', gen: g7dathucct },
  { code: '7-DATHUCNC', ch: 'VII', bai: 'Bài 27–28', icon: '✖️', name: 'Nhân, chia đa thức một biến', gen: g7dathucnc },
  { code: '7-BIENCO', ch: 'VIII', bai: 'Bài 29–30', icon: '🎲', name: 'Biến cố và xác suất của biến cố', gen: g7bienco },
  { code: '7-QHTG', ch: 'IX', bai: 'Bài 31–33', icon: '📐', name: 'Quan hệ giữa góc và cạnh, ba cạnh tam giác', gen: g7qhtg },
  { code: '7-DONGQUY', ch: 'IX', bai: 'Bài 34–35', icon: '🎯', name: 'Trọng tâm, trực tâm, các đường đồng quy', gen: g7dongquy },
  { code: '7-HINHHOP', ch: 'X', bai: 'Bài 36', icon: '📦', name: 'Hình hộp chữ nhật, hình lập phương', gen: g7hinhhop },
  { code: '7-LANGTRU', ch: 'X', bai: 'Bài 37', icon: '🧀', name: 'Hình lăng trụ đứng', gen: g7langtru },
].map((s) => ({ ...s, grade: 7 }));
