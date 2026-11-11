// svg.js — vẽ hình minh hoạ bằng SVG từ vài con số (không dùng thư viện, không tải ảnh).
// Màu lấy từ CSS (class .fig ...) nên tự đổi theo nền sáng / tối; phóng to bao nhiêu cũng nét.
const f = (n) => Math.round(n * 10) / 10;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let uid = 0;

const svg = (w, h, body, label) =>
  `<svg class="fig" viewBox="0 0 ${f(w)} ${f(h)}" width="${f(w)}" height="${f(h)}" role="img" aria-label="${esc(label)}">${body}</svg>`;
const text = (x, y, s, cls = 'tx', a = 'middle') =>
  `<text x="${f(x)}" y="${f(y)}" class="${cls}" text-anchor="${a}" dominant-baseline="central">${esc(s).replace(/-(?=\d)/g, '−')}</text>`;
const line = (x1, y1, x2, y2, cls = 'ln') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls}"/>`;
const dot = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="3.6" class="dt"/>`;
const head = (x, y, a, cls = 'ah') => { // đầu mũi tên tại (x,y), hướng a (radian)
  const s = 8, p = (d) => `${f(x + s * Math.cos(a + d))} ${f(y + s * Math.sin(a + d))}`;
  return `<path d="M${f(x)} ${f(y)}L${p(2.7)}L${p(-2.7)}Z" class="${cls}"/>`;
};
const neg = (v) => (v < 0 ? '−' + -v : String(v));

/** Đánh dấu góc tại P giữa hai tia PQ, PR (cung nhỏ hoặc ô vuông nếu là góc vuông). */
function angle(P, Q, R, label = '', right = false, r = 20) {
  const a1 = Math.atan2(Q[1] - P[1], Q[0] - P[0]), a2 = Math.atan2(R[1] - P[1], R[0] - P[0]);
  let d = a2 - a1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const mid = a1 + d / 2, at = (a, rr) => [P[0] + rr * Math.cos(a), P[1] + rr * Math.sin(a)];
  let out;
  if (right) {
    const s = 11, u = at(a1, s), v = at(a2, s), w = [u[0] + v[0] - P[0], u[1] + v[1] - P[1]];
    out = `<path d="M${f(u[0])} ${f(u[1])}L${f(w[0])} ${f(w[1])}L${f(v[0])} ${f(v[1])}" class="am"/>`;
  } else {
    const u = at(a1, r), v = at(a2, r);
    out = `<path d="M${f(u[0])} ${f(u[1])}A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${f(v[0])} ${f(v[1])}" class="am"/>`;
  }
  if (label) { const t = at(mid, r + 13 + label.length * 2); out += text(t[0], t[1], label, 'tx al'); }
  return out;
}
/** Tên đỉnh đặt ra phía ngoài (xa điểm G). */
const vname = (P, G, s, d = 15) => {
  const dx = P[0] - G[0], dy = P[1] - G[1], L = Math.hypot(dx, dy) || 1;
  return text(P[0] + (dx / L) * d, P[1] + (dy / L) * d, s, 'tx it');
};

/* ---------------- Trục số ---------------- */
function numberline({ min, max, jumps = [], marks = [] }) {
  const W = 360, pad = 18, u = (W - 2 * pad - 10) / (max - min), y = 72, X = (v) => pad + (v - min) * u;
  let b = line(pad - 6, y, W - pad + 4, y, 'ax') + head(W - pad + 8, y, 0, 'ahx');
  for (let v = min; v <= max; v++) {
    b += line(X(v), y - 5, X(v), y + 5, 'ax');
    if (u >= 15 || v % 2 === 0) b += text(X(v), y + 17, neg(v), v === 0 ? 'tx sm b' : 'tx sm');
  }
  for (const [a, c, lab] of jumps) {
    const x1 = X(a), x2 = X(c), h = Math.min(26, 10 + Math.abs(x2 - x1) * 0.25), cy = y - 6 - 2 * h, mx = (x1 + x2) / 2;
    b += `<path d="M${f(x1)} ${f(y - 6)}Q${f(mx)} ${f(cy)} ${f(x2)} ${f(y - 6)}" class="c2"/>`;
    b += head(x2, y - 6, Math.atan2(y - 6 - cy, x2 - mx), 'ah2');
    if (lab) b += text(mx, y - 14 - h, lab, 'tx sm c2t');
  }
  for (const m of marks) b += dot(X(m), y);
  return svg(W, y + 32, b, 'trục số');
}

/* ------------- Hệ trục toạ độ + đường thẳng / parabol ------------- */
// curves: [{a,b,c}] → y = ax² + bx + c ; pts: [{x, y, l, dash}]
function coord({ x: [x0, x1], y: [y0, y1], curves = [], pts = [] }) {
  const u = Math.min(34, 320 / (x1 - x0), 300 / (y1 - y0)), pad = 22, id = 'cl' + ++uid;
  const W = (x1 - x0) * u + 2 * pad, H = (y1 - y0) * u + 2 * pad;
  const X = (v) => pad + (v - x0) * u, Y = (v) => pad + (y1 - v) * u;
  let b = `<defs><clipPath id="${id}"><rect x="${f(X(x0))}" y="${f(Y(y1))}" width="${f((x1 - x0) * u)}" height="${f((y1 - y0) * u)}"/></clipPath></defs>`;
  for (let v = Math.ceil(x0); v <= x1; v++) b += line(X(v), Y(y0), X(v), Y(y1), 'gr');
  for (let v = Math.ceil(y0); v <= y1; v++) b += line(X(x0), Y(v), X(x1), Y(v), 'gr');
  b += line(X(x0) - 4, Y(0), X(x1) + 8, Y(0), 'ax') + head(X(x1) + 12, Y(0), 0, 'ahx') + text(X(x1) + 8, Y(0) + 13, 'x', 'tx it');
  b += line(X(0), Y(y0) + 4, X(0), Y(y1) - 8, 'ax') + head(X(0), Y(y1) - 12, -Math.PI / 2, 'ahx') + text(X(0) + 12, Y(y1) - 10, 'y', 'tx it');
  b += text(X(0) - 9, Y(0) + 11, 'O', 'tx sm it');
  const every = u < 22 ? 2 : 1;
  for (let v = Math.ceil(x0); v <= x1; v++) if (v && v % every === 0) b += text(X(v), Y(0) + 12, neg(v), 'tx xs');
  for (let v = Math.ceil(y0); v <= y1; v++) if (v && v % every === 0) b += text(X(0) - 6, Y(v), neg(v), 'tx xs', 'end');
  curves.forEach(({ a = 0, b: bb = 0, c = 0 }, k) => {
    const n = a ? 160 : 2, pts2 = [];
    for (let i = 0; i <= n; i++) { const xv = x0 - 0.5 + (x1 - x0 + 1) * i / n; pts2.push(`${f(X(xv))} ${f(Y(a * xv * xv + bb * xv + c))}`); }
    b += `<path d="M${pts2.join('L')}" class="${k ? 'c2' : 'c1'}" clip-path="url(#${id})"/>`;
  });
  for (const p of pts) {
    if (p.dash) b += line(X(p.x), Y(p.y), X(p.x), Y(0), 'ds') + line(X(p.x), Y(p.y), X(0), Y(p.y), 'ds');
    b += dot(X(p.x), Y(p.y));
    if (p.l) b += text(X(p.x) + (p.x < 0 ? -6 : 6), Y(p.y) - 11, p.l, 'tx sm', p.x < 0 ? 'end' : 'start');
  }
  return svg(W, H, b, 'hệ trục toạ độ');
}

/* ---------------- Tam giác (biết 3 góc) ---------------- */
// ang: [A, B, C] độ; A ở đỉnh, B trái, C phải. labels: chữ ghi ở mỗi góc. ext: chữ ở góc ngoài tại C.
function triangle({ ang, labels = ['', '', ''], names = ['A', 'B', 'C'], ext = '' }) {
  const [A, B, C] = ang.map((d) => (d * Math.PI) / 180), AB = Math.sin(C) / Math.sin(A);
  const raw = [[AB * Math.cos(B), -AB * Math.sin(B)], [0, 0], [1, 0]];
  const xs = raw.map((p) => p[0]).concat(ext ? [1.5] : []), ys = raw.map((p) => p[1]);
  const mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys);
  const s = Math.min(270 / (Mx - mx), 170 / (0 - my)), ox = 40 - mx * s, oy = 34 - my * s;
  const P = raw.map(([x, y]) => [ox + x * s, oy + y * s]), G = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
  let b = `<path d="M${P.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}Z" class="sh"/>`;
  for (let k = 0; k < 3; k++) {
    if (labels[k] || !ext || k !== 2) b += angle(P[k], P[(k + 1) % 3], P[(k + 2) % 3], labels[k], false, labels[k] ? 20 : 14);
    b += vname(P[k], G, names[k]);
  }
  if (ext) {
    const D = [P[2][0] + 0.5 * s, P[2][1]];
    b += line(P[2][0], P[2][1], D[0], D[1], 'ln') + angle(P[2], P[0], D, ext, false, 18);
  }
  return svg((Mx - mx) * s + 80, -my * s + 64, b, 'tam giác');
}

/* ---------------- Tam giác vuông tại A ---------------- */
// ab: cạnh đáy AB, ac: cạnh đứng AC; labels: {AB, AC, BC}; mark: 'B' | 'C' (đánh dấu góc)
function righttri({ ab, ac, labels = {}, mark = '' }) {
  const s = Math.min(260 / ab, 170 / ac), A = [50, 30 + ac * s], B = [50 + ab * s, A[1]], C = [50, 30];
  const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  let b = `<path d="M${f(A[0])} ${f(A[1])}L${f(B[0])} ${f(B[1])}L${f(C[0])} ${f(C[1])}Z" class="sh"/>`;
  b += angle(A, B, C, '', true);
  if (mark === 'B') b += angle(B, C, A, '', false, 22);
  if (mark === 'C') b += angle(C, A, B, '', false, 22);
  b += vname(A, G, 'A') + vname(B, G, 'B') + vname(C, G, 'C');
  if (labels.AB) b += text((A[0] + B[0]) / 2, A[1] + 16, labels.AB, 'tx sm c2t');
  if (labels.AC) b += text(A[0] - 10, (A[1] + C[1]) / 2, labels.AC, 'tx sm c2t', 'end');
  if (labels.BC) b += text((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2 - 10, labels.BC, 'tx sm c2t', 'start');
  return svg(B[0] + 40, A[1] + 34, b, 'tam giác vuông');
}

/* ---------------- Biểu đồ cột ---------------- */
function bars({ items, unit = '', title = '' }) {
  const W = 360, H = 250, L = 40, bot = 206, top = 50, max = Math.max(...items.map((i) => i[1]));
  const step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500].find((s) => s * 4 >= max * 1.12) || 1000, Mv = step * 4;
  const Y = (v) => bot - (v / Mv) * (bot - top), bw = (W - L - 12) / items.length;
  let b = title ? text(W / 2, 12, title, 'tx sm b') : '';
  for (let k = 0; k <= 4; k++) b += line(L, Y(k * step), W - 6, Y(k * step), k ? 'gr' : 'ax') + text(L - 6, Y(k * step), k * step, 'tx xs', 'end');
  b += line(L, bot, L, top - 8, 'ax') + text(L - 2, top - 16, `(${unit})`, 'tx xs', 'start');
  items.forEach(([n, v], k) => {
    const x = L + bw * k + bw * 0.2, w = bw * 0.6;
    b += `<rect x="${f(x)}" y="${f(Y(v))}" width="${f(w)}" height="${f(bot - Y(v))}" rx="3" class="col"/>`;
    b += text(x + w / 2, Y(v) - 9, v, 'tx xs b') + text(x + w / 2, bot + 14, n, 'tx xs');
  });
  return svg(W, H, b, 'biểu đồ cột');
}

/* ---------------- Đường tròn ---------------- */
// pts: {A: độ, ...} (0° bên phải, ngược chiều kim đồng hồ); segs: [['O','A'], ...]
// angles: [[đỉnh, điểm 1, điểm 2, nhãn, vuông?]]
function circle({ pts, segs = [], angles = [] }) {
  const R = 100, O = [150, 128], P = (n) => (n === 'O' ? O : [O[0] + R * Math.cos((pts[n] * Math.PI) / 180), O[1] - R * Math.sin((pts[n] * Math.PI) / 180)]);
  let b = `<circle cx="${O[0]}" cy="${O[1]}" r="${R}" class="ln"/>`;
  for (const [p, q] of segs) { const a = P(p), c = P(q); b += line(a[0], a[1], c[0], c[1], 'ln'); }
  for (const [v, p, q, lab, right] of angles) b += angle(P(v), P(p), P(q), lab, !!right, v === 'O' ? 18 : 22);
  b += dot(O[0], O[1]) + text(O[0] - 10, O[1] - 10, 'O', 'tx it');
  for (const n of Object.keys(pts)) { const p = P(n); b += dot(p[0], p[1]) + vname(p, O, n, 14); }
  return svg(300, 256, b, 'đường tròn');
}

/* ---------------- Hình học chung ---------------- */
// P: {A:[x,y]} (toạ độ toán, y hướng lên); seg: ['AB',...]; dash: ['AH']; ray: ['OA'] (kéo dài quá A); line: ['AB'] (kéo dài 2 phía)
// circ: [['O', r]]; ang: [['ABC', 'nhãn', vuông?]] (góc tại B); len: [['AB','5 cm']]; tick: [['AB',1]]; par: ['AB'] (mũi tên song song)
// poly: 'ABCD' (tô nền); hide: 'O' (không ghi tên); dots: 'ABC' (chỉ chấm các điểm này; mặc định chấm hết)
function geo({ P, seg = [], dash = [], ray = [], line: lines = [], circ = [], ang = [], len = [], tick = [], par = [], poly = '', hide = '', dots = null }) {
  const names = Object.keys(P), xs = [], ys = [];
  names.forEach((n) => { xs.push(P[n][0]); ys.push(P[n][1]); });
  circ.forEach(([c, r]) => { xs.push(P[c][0] - r, P[c][0] + r); ys.push(P[c][1] - r, P[c][1] + r); });
  const ext = (a, b, k) => [P[b][0] + (P[b][0] - P[a][0]) * k, P[b][1] + (P[b][1] - P[a][1]) * k];
  ray.forEach((s) => { const e = ext(s[0], s[1], 0.35); xs.push(e[0]); ys.push(e[1]); });
  lines.forEach((s) => { [ext(s[0], s[1], 0.25), ext(s[1], s[0], 0.25)].forEach((e) => { xs.push(e[0]); ys.push(e[1]); }); });
  const mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys), My = Math.max(...ys);
  const k = Math.min(300 / (Mx - mx || 1), 210 / (My - my || 1)), pad = 30;
  const W = (Mx - mx) * k + 2 * pad, H = (My - my) * k + 2 * pad;
  const S = ([x, y]) => [pad + (x - mx) * k, pad + (My - y) * k], Q = (n) => S(P[n]);
  const G = [W / 2, H / 2];
  let b = '';
  if (poly) b += `<path d="M${[...poly].map((n) => Q(n).map(f).join(' ')).join('L')}Z" class="sh" style="stroke:none"/>`;
  circ.forEach(([c, r]) => { const o = Q(c); b += `<circle cx="${f(o[0])}" cy="${f(o[1])}" r="${f(r * k)}" class="ln"/>`; });
  const L = (a, c, cls) => { b += line(a[0], a[1], c[0], c[1], cls); };
  seg.forEach((s) => L(Q(s[0]), Q(s[1]), 'ln'));
  dash.forEach((s) => L(Q(s[0]), Q(s[1]), 'ds'));
  ray.forEach((s) => L(Q(s[0]), S(ext(s[0], s[1], 0.35)), 'ln'));
  lines.forEach((s) => L(S(ext(s[1], s[0], 0.25)), S(ext(s[0], s[1], 0.25)), 'ln'));
  tick.forEach(([s, n]) => { // vạch đánh dấu đoạn bằng nhau
    const a = Q(s[0]), c = Q(s[1]), m = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2], d = Math.atan2(c[1] - a[1], c[0] - a[0]);
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 5, px = m[0] + o * Math.cos(d), py = m[1] + o * Math.sin(d);
      b += line(px - 6 * Math.sin(d), py + 6 * Math.cos(d), px + 6 * Math.sin(d), py - 6 * Math.cos(d), 'am'); }
  });
  par.forEach((s) => { const a = Q(s[0]), c = Q(s[1]); b += head((a[0] + c[0]) / 2 + 4 * Math.cos(Math.atan2(c[1] - a[1], c[0] - a[0])), (a[1] + c[1]) / 2 + 4 * Math.sin(Math.atan2(c[1] - a[1], c[0] - a[0])), Math.atan2(c[1] - a[1], c[0] - a[0]), 'ah2'); });
  ang.forEach(([t, lab, right]) => { b += angle(Q(t[1]), Q(t[0]), Q(t[2]), lab || '', !!right, lab ? 20 : 15); });
  len.forEach(([s, lab]) => { // nhãn độ dài đặt lệch ra ngoài
    const a = Q(s[0]), c = Q(s[1]), m = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
    let nx = -(c[1] - a[1]), ny = c[0] - a[0]; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
    if ((m[0] + nx - G[0]) ** 2 + (m[1] + ny - G[1]) ** 2 < (m[0] - G[0]) ** 2 + (m[1] - G[1]) ** 2) { nx = -nx; ny = -ny; }
    b += text(m[0] + nx * 13, m[1] + ny * 13, lab, 'tx sm c2t');
  });
  names.forEach((n) => {
    const q = Q(n);
    if (!dots || dots.includes(n)) b += dot(q[0], q[1]);
    if (!hide.includes(n)) b += vname(q, G, n, 14);
  });
  return svg(W, H, b, 'hình vẽ');
}

/* ---------------- Biểu đồ quạt tròn ---------------- */
function pie({ items, title = '' }) {
  const R = 86, O = [110, 120];
  let b = title ? text(180, 12, title, 'tx sm b') : '', a0 = -Math.PI / 2;
  items.forEach(([n, v], i) => {
    const a1 = a0 + (v / 100) * 2 * Math.PI, big = a1 - a0 > Math.PI ? 1 : 0, P0 = [O[0] + R * Math.cos(a0), O[1] + R * Math.sin(a0)], P1 = [O[0] + R * Math.cos(a1), O[1] + R * Math.sin(a1)];
    b += `<path d="M${O[0]} ${O[1]}L${f(P0[0])} ${f(P0[1])}A${R} ${R} 0 ${big} 1 ${f(P1[0])} ${f(P1[1])}Z" class="pc${i % 6}"/>`;
    const m = (a0 + a1) / 2; if (v >= 6) b += text(O[0] + R * 0.62 * Math.cos(m), O[1] + R * 0.62 * Math.sin(m), v + '%', 'tx sm b pl');
    b += `<rect x="222" y="${44 + i * 24}" width="14" height="14" rx="3" class="pc${i % 6}"/>` + text(242, 51 + i * 24, n, 'tx sm', 'start');
    a0 = a1;
  });
  return svg(360, 220, b, 'biểu đồ quạt tròn');
}

/* ---------------- Biểu đồ đoạn thẳng ---------------- */
function linechart({ items, unit = '', title = '' }) {
  const W = 360, H = 240, L = 42, bot = 200, top = 46, max = Math.max(...items.map((i) => i[1]));
  const step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500].find((s) => s * 4 >= max * 1.12) || 1000, Mv = step * 4;
  const Y = (v) => bot - (v / Mv) * (bot - top), dx = (W - L - 24) / (items.length - 1 || 1), X = (i) => L + 12 + i * dx;
  let b = title ? text(W / 2, 12, title, 'tx sm b') : '';
  for (let k = 0; k <= 4; k++) b += line(L, Y(k * step), W - 6, Y(k * step), k ? 'gr' : 'ax') + text(L - 6, Y(k * step), k * step, 'tx xs', 'end');
  b += line(L, bot, L, top - 8, 'ax') + text(L - 2, top - 16, `(${unit})`, 'tx xs', 'start');
  b += `<path d="M${items.map((it, i) => `${f(X(i))} ${f(Y(it[1]))}`).join('L')}" class="c1"/>`;
  items.forEach(([n, v], i) => { b += dot(X(i), Y(v)) + text(X(i), Y(v) - 11, v, 'tx xs b') + text(X(i), bot + 14, n, 'tx xs'); });
  return svg(W, H, b, 'biểu đồ đoạn thẳng');
}

/* ---------------- Biểu đồ cột kép ---------------- */
function bars2({ items, names = ['', ''], unit = '', title = '' }) {
  const W = 360, H = 260, L = 40, bot = 206, top = 56, max = Math.max(...items.flatMap((i) => [i[1], i[2]]));
  const step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500].find((s) => s * 4 >= max * 1.12) || 1000, Mv = step * 4;
  const Y = (v) => bot - (v / Mv) * (bot - top), bw = (W - L - 12) / items.length;
  let b = title ? text(W / 2, 12, title, 'tx sm b') : '';
  names.forEach((n, i) => { b += `<rect x="${70 + i * 140}" y="26" width="12" height="12" rx="2" class="${i ? 'col2' : 'col'}"/>` + text(88 + i * 140, 32, n, 'tx xs', 'start'); });
  for (let k = 0; k <= 4; k++) b += line(L, Y(k * step), W - 6, Y(k * step), k ? 'gr' : 'ax') + text(L - 6, Y(k * step), k * step, 'tx xs', 'end');
  b += line(L, bot, L, top - 8, 'ax') + text(L - 2, top - 16, `(${unit})`, 'tx xs', 'start');
  items.forEach(([n, v1, v2], k) => {
    const x = L + bw * k + bw * 0.14, w = bw * 0.34;
    [[v1, 'col', x], [v2, 'col2', x + w + 2]].forEach(([v, c, xx]) => { b += `<rect x="${f(xx)}" y="${f(Y(v))}" width="${f(w)}" height="${f(bot - Y(v))}" rx="2" class="${c}"/>` + text(xx + w / 2, Y(v) - 8, v, 'tx xs'); });
    b += text(x + w + 1, bot + 14, n, 'tx xs');
  });
  return svg(W, H, b, 'biểu đồ cột kép');
}

/* ---------------- Bảng số liệu (HTML) ---------------- */
function table({ rows, title = '' }) {
  return (title ? `<p class="ftitle">${esc(title)}</p>` : '') + `<table class="ftab">${rows.map((r, i) => `<tr>${r.map((c) => (i === 0 || r === rows[0] ? `<th>${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</table>`;
}

/* ---------------- Hình khối (phối cảnh) ---------------- */
// type: box | prism3 | pyr3 | pyr4 | cyl | cone | sphere ; lab: { a, b, c, h, r, l, d } (chữ ghi cạnh)
function solid({ type, lab = {} }) {
  const D = [34, -22]; // vector chiều sâu
  let b = '';
  const E = (p, q, hid) => { b += line(p[0], p[1], q[0], q[1], hid ? 'ds' : 'ln'); };
  const T = (p, s, a = 'middle') => { if (s) b += text(p[0], p[1], s, 'tx sm c2t', a); };
  const add = (p, v, s = 1) => [p[0] + v[0] * s, p[1] + v[1] * s];
  if (type === 'box' || type === 'prism3' || type === 'pyr4' || type === 'pyr3') {
    const w = 150, h = type.startsWith('pyr') ? 0 : 100, x0 = 70, y0 = 190;
    const A = [x0, y0], B = [x0 + w, y0], C = add(B, D, 2), Dd = add(A, D, 2);
    if (type === 'box') {
      const up = (p) => [p[0], p[1] - h], A1 = up(A), B1 = up(B), C1 = up(C), D1 = up(Dd);
      E(A, B); E(B, C); E(C, Dd, 1); E(Dd, A, 1); E(A1, B1); E(B1, C1); E(C1, D1); E(D1, A1); E(A, A1); E(B, B1); E(C, C1); E(Dd, D1, 1);
      T([(A[0] + B[0]) / 2, A[1] + 16], lab.a); T([(B[0] + C[0]) / 2 + 16, (B[1] + C[1]) / 2 + 8], lab.b, 'start'); T([A[0] - 10, (A[1] + A1[1]) / 2], lab.c, 'end');
    } else if (type === 'prism3') {
      const M = [x0 + w * 0.45, y0 + 0], C3 = add(M, D, 2.4), up = (p) => [p[0], p[1] - h];
      const A1 = up(A), B1 = up(B), C1 = up(C3);
      E(A, B); E(B, C3, 0); E(C3, A, 1); E(A1, B1); E(B1, C1); E(C1, A1); E(A, A1); E(B, B1); E(C3, C1, 0);
      T([(A[0] + B[0]) / 2, A[1] + 16], lab.a); T([B[0] + 12, (B[1] + B1[1]) / 2], lab.h, 'start');
    } else {
      const base = type === 'pyr4' ? [A, B, C, Dd] : [A, B, add([x0 + w * 0.5, y0], D, 2.4)];
      const O = type === 'pyr4' ? [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2] : [(base[0][0] + base[1][0] + base[2][0]) / 3, (base[0][1] + base[1][1] + base[2][1]) / 3];
      const S = [O[0], O[1] - 150];
      base.forEach((p, i) => { const q = base[(i + 1) % base.length]; const hid = type === 'pyr4' ? i >= 2 : i >= 1; E(p, q, hid); });
      base.forEach((p, i) => E(S, p, type === 'pyr4' ? i === 3 : i === 2));
      E(S, O, 1);
      const Mab = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]; E(S, Mab, 1);
      T([(A[0] + B[0]) / 2, A[1] + 16], lab.a); T([O[0] + 8, (O[1] + S[1]) / 2], lab.h, 'start'); T([(S[0] + Mab[0]) / 2 - 8, (S[1] + Mab[1]) / 2], lab.d, 'end');
      b += text(S[0], S[1] - 10, 'S', 'tx it');
    }
    return svg(300, 230, b, 'hình khối');
  }
  const cx = 150, rx = 70, ry = 18, top = 40, bot = 190;
  if (type === 'cyl') {
    b += `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" class="ln"/>`;
    b += `<path d="M${cx - rx} ${bot}A${rx} ${ry} 0 0 0 ${cx + rx} ${bot}" class="ln"/><path d="M${cx - rx} ${bot}A${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" class="ds"/>`;
    E([cx - rx, top], [cx - rx, bot]); E([cx + rx, top], [cx + rx, bot]); E([cx, bot], [cx + rx, bot], 1); E([cx, top], [cx, bot], 1);
    T([cx + rx / 2, bot - 8], lab.r); T([cx + rx + 10, (top + bot) / 2], lab.h, 'start');
  } else if (type === 'cone') {
    const S = [cx, top - 10];
    b += `<path d="M${cx - rx} ${bot}A${rx} ${ry} 0 0 0 ${cx + rx} ${bot}" class="ln"/><path d="M${cx - rx} ${bot}A${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" class="ds"/>`;
    E(S, [cx - rx, bot]); E(S, [cx + rx, bot]); E(S, [cx, bot], 1); E([cx, bot], [cx + rx, bot], 1);
    T([cx + rx / 2, bot - 8], lab.r); T([cx + 8, (S[1] + bot) / 2], lab.h, 'start'); T([cx + rx / 2 + 14, (S[1] + bot) / 2 - 6], lab.l, 'start');
  } else {
    const R = 80, cy = 115;
    b += `<circle cx="${cx}" cy="${cy}" r="${R}" class="ln"/><path d="M${cx - R} ${cy}A${R} ${ry} 0 0 0 ${cx + R} ${cy}" class="ln"/><path d="M${cx - R} ${cy}A${R} ${ry} 0 0 1 ${cx + R} ${cy}" class="ds"/>`;
    E([cx, cy], [cx + R, cy], 1); b += dot(cx, cy); T([cx + R / 2, cy - 10], lab.r);
  }
  return svg(300, 220, b, 'hình khối');
}

const KINDS = { numberline, coord, triangle, righttri, bars, circle, geo, pie, line: linechart, bars2, table, solid };
export function render(fig) {
  if (!fig || !KINDS[fig.kind]) return '';
  try { return KINDS[fig.kind](fig.data || {}); } catch (e) { console.error(e); return ''; }
}
