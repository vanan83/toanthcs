// api.js — lưu trong máy (localStorage) và gọi máy chủ Apps Script.
import { APP_URL } from './config.js';

export const ls = {
  get(k, d) { try { const v = localStorage.getItem('thcs.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('thcs.' + k, JSON.stringify(v)); } catch (e) { /* bộ nhớ đầy / bị chặn */ } },
  del(k) { try { localStorage.removeItem('thcs.' + k); } catch (e) { /* bỏ qua */ } },
};

export const SERVER_ON = /^https:\/\/script\.google\.com\/.+\/exec$/.test(APP_URL) && !APP_URL.includes('DAN_MA');

/**
 * Gọi 1 chức năng của máy chủ. Gửi POST dạng text/plain (không phát sinh yêu cầu "preflight" CORS),
 * Apps Script trả JSON { ok, data } hoặc { ok:false, error, session }.
 */
export async function call(fn, args = [], token = '') {
  if (!SERVER_ON) throw new Error('Chưa cấu hình máy chủ (APP_URL trong js/config.js).');
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 25000);
  let res;
  try {
    res = await fetch(APP_URL, { method: 'POST', body: JSON.stringify({ fn, args, token }), signal: ctl.signal });
  } catch (e) {
    throw new Error(navigator.onLine === false ? 'Đang mất mạng. Thử lại khi có mạng.' : 'Không kết nối được máy chủ. Thử lại sau.');
  } finally { clearTimeout(timer); }
  let j;
  try { j = await res.json(); } catch (e) { throw new Error('Máy chủ trả về dữ liệu lạ. Kiểm tra lại link Web App và quyền "Bất kỳ ai".'); }
  if (!j.ok) { const e = new Error(j.error || 'Lỗi máy chủ.'); e.session = !!j.session; throw e; }
  return j.data;
}
