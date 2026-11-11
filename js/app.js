// app.js — giao diện: chọn bài, làm bài, tiến bộ, đăng nhập, quản lý tài khoản.
// Mọi thứ chạy trong máy; máy chủ Apps Script chỉ dùng để đăng nhập và lưu kết quả lên Google Sheet.
import { SKILLS, GRADES, make, skill, shuffle } from './gen.js';
import { rich, esc, plain } from './math.js';
import { render as drawFig } from './svg.js';
import { ls, call, SERVER_ON } from './api.js';

const VERSION = '1.0.0';
const ADMIN = 'Quản trị';
const LV = ['', 'Dễ', 'Vừa', 'Khó'];
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const view = $('#view');

/* ---------------- dữ liệu trong máy ---------------- */
let auth = ls.get('auth', null);
const me = () => (auth && auth.me) || null;
const who = () => (me() ? me().username : 'khach');
const isAdmin = () => !!me() && me().role === ADMIN;
const hist = () => ls.get('hist.' + who(), []);
const setHist = (h) => ls.set('hist.' + who(), h.slice(-300));
const queue = () => ls.get('queue.' + who(), []);
const wrongBank = () => ls.get('sai.' + who(), []);
const z2 = (n) => String(n).padStart(2, '0');
const now = () => { const d = new Date(); return `${d.getFullYear()}-${z2(d.getMonth() + 1)}-${z2(d.getDate())} ${z2(d.getHours())}:${z2(d.getMinutes())}`; };
const dmy = (t) => (t ? t.slice(0, 10).split('-').reverse().join('/') + t.slice(10) : '');
const dur = (s) => (s >= 60 ? `${Math.floor(s / 60)} phút ${s % 60} giây` : `${s} giây`);

/** Mức thành thạo từng bài: tỉ lệ đúng của 5 lượt gần nhất. */
function stats(rows) {
  const by = {}, out = {};
  rows.forEach((r) => (by[r.code] = by[r.code] || []).push(r));
  for (const c in by) {
    const l = by[c];
    let n = 0, ok = 0;
    l.slice(-5).forEach((r) => { n += r.n; ok += r.ok; });
    out[c] = { sessions: l.length, mastery: n ? Math.round((ok * 100) / n) : 0, last: l[l.length - 1].t };
  }
  return out;
}
const tone = (m) => (m >= 80 ? 'good' : m >= 50 ? 'mid' : 'low');

/* ---------------- tiện ích giao diện ---------------- */
function toast(msg, bad = false) {
  const t = document.createElement('div');
  t.className = 'toast' + (bad ? ' bad' : ''); t.textContent = msg; t.setAttribute('role', 'status');
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}
const loading = (msg = 'Đang tải…') => { view.innerHTML = `<p class="muted center pad">${msg}</p>`; };
const errBox = (e) => `<div class="card pad bad-box"><b>Có lỗi:</b> ${esc(e.message || e)}</div>`;
async function busy(btn, fn) {
  const old = btn.textContent; btn.disabled = true; btn.textContent = 'Đang xử lý…';
  try { return await fn(); } finally { btn.disabled = false; btn.textContent = old; }
}
function sessionCheck(e) {
  if (e && e.session) { logout(); toast('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.', true); location.hash = '#/dang-nhap'; return true; }
  return false;
}

/* ---------------- đồng bộ kết quả lên Google Sheet ---------------- */
let flushing = false;
async function flush() {
  if (!me() || !SERVER_ON || flushing || navigator.onLine === false) return;
  const key = 'queue.' + who(), q = ls.get(key, []);
  if (!q.length) return;
  flushing = true;
  try {
    const r = await call('saveResults', [q.slice(0, 20)], auth.token);
    const done = new Set(r.saved);
    ls.set(key, ls.get(key, []).filter((x) => !done.has(x.id)));
    if (ls.get(key, []).length) setTimeout(flush, 500);
  } catch (e) { sessionCheck(e); } finally { flushing = false; foot(); }
}

function logout() {
  auth = null; ls.del('auth'); chrome();
}

/* ---------------- khung trang ---------------- */
function chrome() {
  $('#navAcc').hidden = !isAdmin();
  const b = $('#meBtn');
  b.textContent = me() ? (me().name || me().username) : 'Đăng nhập';
  b.href = me() ? '#/ca-nhan' : '#/dang-nhap';
  b.hidden = !SERVER_ON;
  foot();
}
function foot() {
  const n = queue().length, off = navigator.onLine === false;
  $('#foot').innerHTML = `Luyện Toán THCS · Phiên bản ${VERSION}` +
    (off ? ' · <b>Đang ngoại tuyến</b> (vẫn làm bài được)' : '') +
    (n ? ` · Chờ đồng bộ ${n} lượt` : '');
}
function navActive() {
  const h = location.hash || '#/';
  $$('.nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#/' ? h === '#/' || h.startsWith('#/luyen') : h.startsWith(a.getAttribute('href'))));
}

/* ================= TRANG CHỦ: chọn lớp, chọn bài ================= */
function home() {
  const g = GRADES.includes(+ls.get('grade', 6)) ? +ls.get('grade', 6) : 6, st = stats(hist()), wb = wrongBank().length;
  view.innerHTML = `
  <section class="hero">
    <h1>Luyện Toán THCS</h1>
    <p>Câu hỏi tự sinh theo thuật toán nên không bao giờ hết đề. Hình vẽ vector sắc nét, trang rất nhẹ, mạng yếu hay mất mạng vẫn làm bài được.</p>
  </section>
  <div class="seg" role="tablist" aria-label="Chọn lớp">${GRADES.map((x) => `<button role="tab" aria-selected="${x === g}" data-g="${x}">Lớp ${x}</button>`).join('')}</div>
  <div class="row">
    <a class="btn" href="#/luyen/tonghop-${g}">🎲 Ôn tổng hợp lớp ${g}</a>
    ${wb ? `<a class="btn" href="#/luyen/sai">🔁 Ôn câu sai (${wb})</a>` : ''}
  </div>
  <div class="grid">${SKILLS.filter((s) => s.grade === g).map((s) => {
    const t = st[s.code];
    return `<a class="card skill" href="#/luyen/${s.code}">
      <b>${esc(s.name)}</b>
      <span class="meta">${t ? `Thành thạo ${t.mastery}% · ${t.sessions} lượt` : 'Chưa luyện'}</span>
      <span class="bar"><i class="${t ? tone(t.mastery) : ''}" style="width:${t ? t.mastery : 0}%"></i></span></a>`;
  }).join('')}</div>`;
  $$('[data-g]').forEach((b) => (b.onclick = () => { ls.set('grade', +b.dataset.g); home(); }));
}

/* ================= LUYỆN TẬP ================= */
function quizInfo(arg) {
  if (arg === 'sai') {
    const n = wrongBank().length;
    return n ? { mode: 'sai', code: 'ON-SAI', grade: 0, title: 'Ôn lại câu sai', kicker: 'Ôn tập', max: n,
      desc: `Có ${n} câu bạn từng làm sai. Làm đúng câu nào thì câu đó được xoá khỏi danh sách.` } : null;
  }
  const m = /^tonghop-(\d)$/.exec(arg);
  if (m && GRADES.includes(+m[1])) return { mode: 'mix', code: 'TONGHOP-' + m[1], grade: +m[1], title: `Ôn tổng hợp lớp ${m[1]}`,
    kicker: `Lớp ${m[1]}`, desc: 'Trộn câu hỏi từ mọi bài của lớp; độ khó tự điều chỉnh theo kết quả.' };
  const s = skill(arg);
  return s ? { mode: 'skill', code: s.code, grade: s.grade, title: s.name, kicker: `Lớp ${s.grade}`,
    desc: 'Câu hỏi đổi mới mỗi lần. Làm đúng liên tiếp thì câu khó dần lên; sai thì quay về mức dễ hơn.' } : null;
}

let Q = null; // lượt làm bài đang chạy

function practice(arg) {
  const info = quizInfo(arg);
  if (!info) { location.hash = '#/'; return; }
  const counts = info.mode === 'sai' ? [...new Set([5, 10, 20].filter((n) => n < info.max).concat(info.max))] : [10, 15, 20];
  view.innerHTML = `
  <a class="back" href="#/">‹ Chọn bài khác</a>
  <section class="card pad">
    <p class="kicker">${esc(info.kicker)}</p>
    <h1>${esc(info.title)}</h1>
    <p class="muted">${esc(info.desc)}</p>
    <p><b>Chọn số câu:</b></p>
    <div class="row">${counts.map((n) => `<button class="btn pri" data-n="${n}">${n} câu</button>`).join('')}</div>
  </section>`;
  $$('[data-n]').forEach((b) => (b.onclick = () => start(info, +b.dataset.n)));
}

function start(info, n) {
  const st = stats(hist())[info.code];
  const lv = st ? (st.mastery >= 90 ? 3 : st.mastery >= 75 ? 2 : 1) : 1;
  Q = { ...info, n, i: 0, ok: 0, lv, streak: 0, t0: Date.now(), wrong: [], missed: [], cur: null, picked: -1,
    fixed: info.mode === 'sai' ? shuffle(wrongBank().slice()).slice(0, n) : null };
  if (Q.fixed) Q.n = Q.fixed.length;
  next();
}

function next() {
  if (Q.i >= Q.n) return finish();
  if (Q.fixed) Q.cur = Q.fixed[Q.i];
  else {
    const pool = SKILLS.filter((s) => s.grade === Q.grade);
    Q.cur = make(Q.mode === 'mix' ? pool[Math.floor(Math.random() * pool.length)].code : Q.code, Q.lv);
  }
  Q.picked = -1;
  drawQ();
  window.scrollTo(0, 0);
}

const PRAISE = ['Chính xác!', 'Đúng rồi!', 'Tuyệt vời!', 'Giỏi lắm!', 'Rất tốt!'];
function drawQ() {
  const q = Q.cur, s = skill(q.code), done = Q.picked >= 0, right = Q.picked === q.ans;
  const cls = (k) => (!done ? '' : k === q.ans ? 'ok' : k === Q.picked ? 'bad' : 'dim');
  view.innerHTML = `
  <div class="qtop"><a class="back" href="#/" id="quit">‹ Thoát</a><span class="muted ell">${esc(Q.title)}</span></div>
  <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${Q.n}" aria-valuenow="${Q.i + (done ? 1 : 0)}"><i style="width:${((Q.i + (done ? 1 : 0)) / Q.n) * 100}%"></i></div>
  <div class="qmeta"><span>Câu ${Q.i + 1}/${Q.n}</span><span class="pill lv${q.lv}">${LV[q.lv]}</span>
    ${Q.mode !== 'skill' && s ? `<span class="pill">${esc(s.name)}</span>` : ''}<span class="sp"></span><span class="okc">✓ ${Q.ok}</span></div>
  <section class="card pad qcard">
    <div class="stem">${rich(q.q)}</div>
    ${q.fig ? `<div class="figbox">${drawFig(q.fig)}</div>` : ''}
    <div class="opts">${q.opts.map((o, k) => `<button class="opt ${cls(k)}" data-k="${k}" ${done ? 'disabled' : ''}>
      <span class="key">${'ABCD'[k]}</span><span class="otx">${rich(o)}</span></button>`).join('')}</div>
    ${done ? `<div class="fb ${right ? 'ok' : 'bad'}" role="status">
        <b>${right ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : `Chưa đúng. Đáp án đúng là ${'ABCD'[q.ans]}.`}</b>
        <div class="exp">${rich(q.exp)}</div></div>
      <div class="row end"><button class="btn pri" id="nextBtn">${Q.i + 1 >= Q.n ? 'Xem kết quả' : 'Câu tiếp ›'}</button></div>` : ''}
  </section>`;
  $$('.opt').forEach((b) => (b.onclick = () => answer(+b.dataset.k)));
  $('#quit').onclick = (e) => { if (Q.i > 0 && !confirm('Thoát lượt này? Kết quả sẽ không được lưu.')) e.preventDefault(); else Q = null; };
  const nb = $('#nextBtn');
  if (nb) { nb.onclick = () => { Q.i++; next(); }; nb.focus({ preventScroll: true }); }
}

function answer(k) {
  if (!Q || Q.picked >= 0) return;
  const q = Q.cur, right = k === q.ans, key = q.key || q.q + '|' + q.opts.join('|');
  Q.picked = k;
  let bank = wrongBank();
  if (right) {
    Q.ok++; Q.streak++;
    if (Q.streak >= 2 && Q.lv < 3) { Q.lv++; Q.streak = 0; }
    if (Q.mode === 'sai') bank = bank.filter((x) => x.key !== key);
  } else {
    Q.streak = 0; Q.lv = Math.max(1, Q.lv - 1);
    Q.wrong.push({ q: plain(q.q).slice(0, 200), a: plain(q.opts[k]).slice(0, 80), c: plain(q.opts[q.ans]).slice(0, 80), k: q.code });
    Q.missed.push({ q, k });
    if (Q.mode !== 'sai') bank = bank.filter((x) => x.key !== key).concat([{ ...q, key }]);
  }
  ls.set('sai.' + who(), bank.slice(-60));
  drawQ();
}

function finish() {
  const secs = Math.round((Date.now() - Q.t0) / 1000), pct = Math.round((Q.ok * 100) / Q.n);
  const rec = { id: who() + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), t: now(), code: Q.code,
    name: Q.title, grade: Q.grade, n: Q.n, ok: Q.ok, secs, wrong: Q.wrong };
  setHist(hist().concat([rec]));
  if (me() && SERVER_ON) { ls.set('queue.' + who(), queue().concat([rec])); flush(); }
  const msg = pct === 100 ? 'Xuất sắc! Đúng tất cả các câu.' : pct >= 80 ? 'Rất tốt! Bạn đã nắm vững dạng bài này.'
    : pct >= 50 ? 'Khá ổn. Xem lại các câu sai bên dưới rồi luyện thêm nhé.' : 'Cần luyện thêm. Đọc kỹ lời giải các câu sai rồi thử lại.';
  const info = quizInfo(Q.mode === 'sai' ? 'sai' : Q.mode === 'mix' ? 'tonghop-' + Q.grade : Q.code);
  const n = Q.n, missed = Q.missed;
  Q = null;
  view.innerHTML = `
  <section class="card pad center">
    <div class="ring ${tone(pct)}" style="--p:${pct}"><span>${pct}%</span></div>
    <h1>Đúng ${rec.ok}/${n} câu</h1>
    <p class="muted">${esc(rec.name)} · ${dur(secs)}</p>
    <p>${msg}</p>
    ${!me() && SERVER_ON ? '<p class="muted small">Kết quả đang lưu trong máy này. <a href="#/dang-nhap">Đăng nhập</a> để lưu lên hệ thống.</p>' : ''}
    <div class="row center">
      ${info ? '<button class="btn pri" id="again">Làm lượt mới</button>' : ''}
      <a class="btn" href="#/">Chọn bài khác</a>
    </div>
  </section>
  ${missed.length ? `<h2>Các câu làm sai</h2>${missed.map(({ q, k }) => `
    <section class="card pad review">
      <div class="stem">${rich(q.q)}</div>
      ${q.fig ? `<div class="figbox">${drawFig(q.fig)}</div>` : ''}
      <p><span class="tag bad">Bạn chọn</span> ${rich(q.opts[k])}</p>
      <p><span class="tag ok">Đáp án</span> ${rich(q.opts[q.ans])}</p>
      <div class="exp">${rich(q.exp)}</div>
    </section>`).join('')}` : ''}`;
  const again = $('#again');
  if (again) again.onclick = () => practice(info.mode === 'sai' ? 'sai' : info.mode === 'mix' ? 'tonghop-' + info.grade : info.code);
  foot();
}

/* ================= TIẾN BỘ ================= */
async function progress(arg) {
  let rows = hist(), title = me() ? me().name || me().username : 'Máy này (chưa đăng nhập)', kids = null;
  if (isAdmin()) {
    loading();
    try {
      kids = await call('kids', [], auth.token);
      if (arg && arg !== who()) { const r = await call('progress', [arg], auth.token); rows = r.rows; title = r.user.name || r.user.username; }
    } catch (e) { if (sessionCheck(e)) return; view.innerHTML = errBox(e); return; }
  }
  const st = stats(rows), total = rows.reduce((s, r) => s + r.n, 0), ok = rows.reduce((s, r) => s + r.ok, 0);
  const since = new Date(Date.now() - 6 * 864e5), sinceS = `${since.getFullYear()}-${z2(since.getMonth() + 1)}-${z2(since.getDate())}`;
  const days = new Set(rows.filter((r) => r.t.slice(0, 10) >= sinceS).map((r) => r.t.slice(0, 10))).size;
  const weak = SKILLS.filter((s) => st[s.code] && st[s.code].mastery < 70);
  view.innerHTML = `
  <h1>Tiến bộ: ${esc(title)}</h1>
  ${kids ? `<div class="chips">${kids.map((k) => `<a class="chip ${(arg || who()) === k.username ? 'on' : ''}" href="#/tien-bo/${encodeURIComponent(k.username)}">
      ${esc(k.name)} <small>${k.sessions} lượt${k.sessions ? ` · ${k.pct}%` : ''}</small></a>`).join('')}</div>` : ''}
  <div class="tiles">
    <div class="tile"><b>${rows.length}</b><span>lượt luyện</span></div>
    <div class="tile"><b>${total}</b><span>câu đã làm</span></div>
    <div class="tile"><b>${total ? Math.round((ok * 100) / total) : 0}%</b><span>trả lời đúng</span></div>
    <div class="tile"><b>${days}/7</b><span>ngày học tuần này</span></div>
  </div>
  ${weak.length ? `<div class="card pad warn-box"><b>Nên ôn thêm:</b> ${weak.map((s) => `<a href="#/luyen/${s.code}">${esc(s.name)} (${st[s.code].mastery}%)</a>`).join(' · ')}</div>` : ''}
  ${GRADES.map((g) => {
    const list = SKILLS.filter((s) => s.grade === g && st[s.code]);
    return list.length ? `<h2>Lớp ${g}</h2><div class="card">${list.map((s) => `
      <div class="prow"><span class="pname">${esc(s.name)}</span>
        <span class="bar"><i class="${tone(st[s.code].mastery)}" style="width:${st[s.code].mastery}%"></i></span>
        <span class="pnum">${st[s.code].mastery}%</span><span class="muted small">${st[s.code].sessions} lượt</span></div>`).join('')}</div>` : '';
  }).join('')}
  <h2>Các lượt gần đây</h2>
  ${rows.length ? `<div class="card">${rows.slice(-30).reverse().map((r) => `
    <details class="sess"><summary><span>${dmy(r.t)}</span><span class="ell">${esc(r.name)}</span><b class="${tone((r.ok * 100) / r.n)}t">${r.ok}/${r.n}</b></summary>
      ${(r.wrong || []).length ? `<ul>${r.wrong.map((w) => `<li>${esc(w.q)}<br><span class="tag bad">Chọn</span> ${esc(w.a)} <span class="tag ok">Đúng</span> ${esc(w.c)}</li>`).join('')}</ul>`
      : '<p class="muted small">Không sai câu nào.</p>'}
    </details>`).join('')}</div>` : '<p class="muted">Chưa có lượt luyện nào.</p>'}`;
}

/* ================= ĐĂNG NHẬP / CÁ NHÂN ================= */
function loginPage() {
  if (me()) { location.hash = '#/ca-nhan'; return; }
  view.innerHTML = `
  <section class="card pad narrow">
    <h1>Đăng nhập</h1>
    <p class="muted">Đăng nhập để lưu kết quả lên hệ thống và xem tiến bộ trên mọi máy. Không đăng nhập vẫn luyện tập được.</p>
    <form id="lf" class="form">
      <label>Tên đăng nhập<input name="u" autocomplete="username" required autocapitalize="none"></label>
      <label>Mật khẩu<input name="p" type="password" autocomplete="current-password" required></label>
      <button class="btn pri">Đăng nhập</button>
    </form>
  </section>`;
  $('#lf').onsubmit = (e) => {
    e.preventDefault();
    const f = e.target, btn = $('button', f);
    busy(btn, async () => {
      try {
        auth = await call('login', [f.u.value, f.p.value]);
        ls.set('auth', auth);
        try { // lấy lịch sử trên máy chủ về máy này (để thấy mức thành thạo ngay)
          const r = await call('progress', [auth.me.username], auth.token), ids = new Set(r.rows.map((x) => x.id));
          setHist(r.rows.concat(queue().filter((x) => !ids.has(x.id))));
        } catch (e2) { /* không sao, lần sau tải lại */ }
        chrome(); toast('Xin chào ' + (auth.me.name || auth.me.username) + '!');
        location.hash = '#/';
      } catch (err) { toast(err.message, true); }
    });
  };
}

function profile() {
  if (!me()) { location.hash = '#/dang-nhap'; return; }
  const u = me(), n = queue().length;
  view.innerHTML = `
  <section class="card pad narrow">
    <h1>${esc(u.name || u.username)}</h1>
    <p class="muted">Tên đăng nhập: <b>${esc(u.username)}</b> · ${esc(u.role)}${u.expires ? ` · Dùng đến ${dmy(u.expires)}` : ''}</p>
    <p>${n ? `Còn ${n} lượt chưa gửi lên hệ thống. <button class="btn sm" id="sync">Gửi ngay</button>` : 'Mọi kết quả đã được lưu lên hệ thống.'}</p>
    <h2>Đổi mật khẩu</h2>
    <form id="pf" class="form">
      <label>Mật khẩu hiện tại<input name="o" type="password" autocomplete="current-password" required></label>
      <label>Mật khẩu mới (ít nhất 6 ký tự)<input name="n" type="password" autocomplete="new-password" minlength="6" required></label>
      <label>Nhập lại mật khẩu mới<input name="n2" type="password" autocomplete="new-password" minlength="6" required></label>
      <button class="btn pri">Đổi mật khẩu</button>
    </form>
    <hr><button class="btn" id="out">Đăng xuất</button>
  </section>`;
  const sync = $('#sync');
  if (sync) sync.onclick = () => busy(sync, flush).then(profile);
  $('#out').onclick = () => { logout(); toast('Đã đăng xuất.'); location.hash = '#/'; };
  $('#pf').onsubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.n.value !== f.n2.value) return toast('Hai lần nhập mật khẩu mới không khớp.', true);
    busy($('button', f), async () => {
      try { const r = await call('changePassword', [f.o.value, f.n.value], auth.token); auth.token = r.token; ls.set('auth', auth); f.reset(); toast('Đã đổi mật khẩu.'); }
      catch (err) { if (!sessionCheck(err)) toast(err.message, true); }
    });
  };
}

/* ================= QUẢN LÝ TÀI KHOẢN (Quản trị) ================= */
async function accounts() {
  if (!isAdmin()) { location.hash = '#/'; return; }
  loading();
  try { drawAccounts(await call('listUsers', [], auth.token)); } catch (e) { if (!sessionCheck(e)) view.innerHTML = errBox(e); }
}
function drawAccounts(data, edit = null) {
  const link = location.href.split('#')[0];
  const status = (u) => (!u.active ? '<span class="tag bad">Khoá</span>' : u.expired ? '<span class="tag bad">Hết hạn</span>' : '<span class="tag ok">Hoạt động</span>');
  const e = edit || { isNew: true, username: '', name: '', role: 'Học sinh', active: true, expires: '' };
  view.innerHTML = `
  <h1>Tài khoản</h1>
  <section class="card pad">
    <h2>${e.isNew ? 'Thêm tài khoản' : 'Sửa: ' + esc(e.username)}</h2>
    <form id="af" class="form two">
      <label>Tên đăng nhập<input name="username" value="${esc(e.username)}" ${e.isNew ? '' : 'readonly'} required autocapitalize="none" placeholder="vd: 0905123456"></label>
      <label>Họ tên<input name="name" value="${esc(e.name)}" placeholder="vd: Nguyễn Minh An"></label>
      <label>Vai trò<select name="role">${['Học sinh', ADMIN].map((r) => `<option ${r === e.role ? 'selected' : ''}>${r}</option>`).join('')}</select></label>
      <label>Dùng đến hết ngày (để trống = không giới hạn)<input name="expires" type="date" value="${esc(e.expires || '')}"></label>
      ${e.isNew ? '<label>Mật khẩu (để trống = trùng tên đăng nhập)<input name="password" type="text" autocomplete="off"></label>' : ''}
      <label class="check"><input name="active" type="checkbox" ${e.active ? 'checked' : ''}> Đang hoạt động</label>
      <div class="row"><button class="btn pri">${e.isNew ? 'Thêm' : 'Lưu'}</button>${e.isNew ? '' : '<button type="button" class="btn" id="cancel">Huỷ</button>'}</div>
    </form>
  </section>
  <div class="card tbl"><table>
    <thead><tr><th>Tên đăng nhập</th><th>Họ tên</th><th>Vai trò</th><th>Trạng thái</th><th>Đăng nhập cuối</th><th></th></tr></thead>
    <tbody>${data.users.map((u) => `<tr>
      <td><b>${esc(u.username)}</b></td><td>${esc(u.name)}</td><td>${esc(u.role)}</td><td>${status(u)}${u.expires ? `<br><small>đến ${dmy(u.expires)}</small>` : ''}</td>
      <td><small>${dmy(u.lastLogin)}</small></td>
      <td class="acts"><button class="btn sm" data-a="edit" data-u="${esc(u.username)}">Sửa</button>
        <button class="btn sm" data-a="copy" data-u="${esc(u.username)}">Sao chép</button>
        ${u.username !== who() ? `<button class="btn sm" data-a="reset" data-u="${esc(u.username)}">Đặt lại MK</button>
        <button class="btn sm danger" data-a="del" data-u="${esc(u.username)}">Xoá</button>` : ''}</td></tr>`).join('')}</tbody>
  </table></div>`;
  const run = (btn, fn, args, okMsg) => busy(btn, async () => {
    try { drawAccounts(await call(fn, args, auth.token)); toast(okMsg); } catch (err) { if (!sessionCheck(err)) toast(err.message, true); }
  });
  $('#af').onsubmit = (ev) => {
    ev.preventDefault();
    const f = ev.target;
    run($('button', f), 'saveUser', [{ isNew: !!e.isNew, username: f.username.value, name: f.name.value, role: f.role.value,
      active: f.active.checked, expires: f.expires.value, password: f.password ? f.password.value : '' }], 'Đã lưu tài khoản.');
  };
  const c = $('#cancel');
  if (c) c.onclick = () => drawAccounts(data);
  $$('[data-a]').forEach((b) => (b.onclick = () => {
    const u = data.users.find((x) => x.username === b.dataset.u);
    if (b.dataset.a === 'edit') { drawAccounts(data, { ...u, isNew: false }); window.scrollTo(0, 0); }
    if (b.dataset.a === 'copy') {
      const t = `Luyện Toán THCS\nLink: ${link}\nTên đăng nhập: ${u.username}\nMật khẩu: ${u.username} (nếu chưa đổi)`;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Đã sao chép, dán vào Zalo để gửi.'), () => prompt('Sao chép nội dung này:', t));
    }
    if (b.dataset.a === 'reset' && confirm(`Đặt lại mật khẩu của ${u.username} thành "${u.username}"?`)) run(b, 'resetPassword', [u.username], 'Đã đặt lại mật khẩu.');
    if (b.dataset.a === 'del' && confirm(`Xoá tài khoản ${u.username}? Kết quả học vẫn giữ trong Sheet.`)) run(b, 'deleteUser', [u.username], 'Đã xoá tài khoản.');
  }));
}

/* ================= ĐIỀU HƯỚNG ================= */
function route() {
  const [name = '', arg = ''] = (location.hash || '#/').replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  if (name !== 'luyen' || !Q) Q = null;
  navActive();
  if (name === 'luyen') return practice(arg);
  if (name === 'tien-bo') return progress(arg);
  if (name === 'dang-nhap') return SERVER_ON ? loginPage() : home();
  if (name === 'ca-nhan') return profile();
  if (name === 'tai-khoan') return accounts();
  home();
}

document.addEventListener('keydown', (e) => {
  if (!Q || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase());
  if (Q.picked < 0 && k >= 0 && e.key.length === 1) { e.preventDefault(); answer(k); }
});

// Giao diện sáng / tối
const applyTheme = (t) => { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; };
applyTheme(ls.get('theme', ''));
$('#theme').onclick = () => {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const t = dark ? 'light' : 'dark'; ls.set('theme', t); applyTheme(t);
};

window.addEventListener('hashchange', route);
window.addEventListener('online', () => { foot(); flush(); });
window.addEventListener('offline', foot);
chrome();
route();
flush();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
