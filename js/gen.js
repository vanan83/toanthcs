// gen.js — danh mục toàn bộ dạng bài Toán 6–9 theo mục lục SGK Kết nối tri thức.
// Mỗi lớp nằm trong một tệp riêng (g6.js … g9.js); tiện ích dùng chung ở core.js.
// Mỗi dạng bài: { code, grade, ch (chương), bai (bài SGK), icon, name, gen(level) }.
import { shuffle } from './core.js';
import { SKILLS6, CHAPTERS6 } from './g6.js';
import { SKILLS7, CHAPTERS7 } from './g7.js';
import { SKILLS8, CHAPTERS8 } from './g8.js';
import { SKILLS9, CHAPTERS9 } from './g9.js';

export { shuffle };
export const GRADES = [6, 7, 8, 9];
export const SKILLS = [...SKILLS6, ...SKILLS7, ...SKILLS8, ...SKILLS9];
export const CHAPTERS = { 6: CHAPTERS6, 7: CHAPTERS7, 8: CHAPTERS8, 9: CHAPTERS9 };
export const skill = (code) => SKILLS.find((s) => s.code === code) || null;

/** Mô tả ngắn từng lớp (hiện dưới các tab). */
export const GRADE_INFO = {
  6: 'Số tự nhiên · Số nguyên · Phân số · Số thập phân · Hình học cơ bản · Thống kê',
  7: 'Số hữu tỉ · Số thực · Góc, song song · Tam giác · Đa thức · Xác suất',
  8: 'Đa thức · Hằng đẳng thức · Tứ giác · Thalès · Phân thức · Hàm số · Đồng dạng',
  9: 'Hệ phương trình · Bất phương trình · Căn thức · Lượng giác · Đường tròn · Phương trình bậc hai',
};

/** Sinh 1 câu của bài `code` ở mức `lv` (thử lại nếu lần sinh ngẫu nhiên không đủ phương án). */
export function make(code, lv) {
  const s = skill(code);
  for (let i = 0; ; i++) {
    try { const q = s.gen(lv); q.code = code; q.lv = lv; return q; } catch (e) { if (i >= 40) throw e; }
  }
}
