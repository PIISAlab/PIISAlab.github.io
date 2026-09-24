// Bilingual helpers. Vietnamese lives at the root (/people), English under /en (/en/people).
// Each page is written once as src/pages/[...lang]/<page>.astro and built for both languages.

export const langs = ['vi', 'en'] as const;
export type Lang = (typeof langs)[number];
export type Bi = string | { vi: string; en: string };

/** getStaticPaths for every bilingual page: `lang` param is undefined for vi (root), 'en' for English. */
export function langPaths() {
	return langs.map((lang) => ({ params: { lang: lang === 'vi' ? undefined : lang }, props: { lang } }));
}

/** Resolve a bilingual value. Plain strings are shared by both languages. */
export function tr(value: Bi, lang: Lang): string;
export function tr(value: Bi | undefined, lang: Lang): string | undefined;
export function tr(value: Bi | undefined, lang: Lang) {
	if (value === undefined || typeof value === 'string') return value;
	return value[lang];
}

/** Localized internal link: url('en', '/people') -> '/en/people', url('vi', '/') -> '/'. */
export function url(lang: Lang, path: string) {
	if (lang === 'vi') return path;
	return path === '/' ? '/en' : `/en${path}`;
}

/** The same page in the other language, given the current pathname. */
export function switchUrl(lang: Lang, pathname: string) {
	const path = pathname.replace(/\/$/, '') || '/';
	if (lang === 'vi') return url('en', path);
	return path.replace(/^\/en/, '') || '/';
}

export function formatDate(date: Date, lang: Lang) {
	return date.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' });
}

export const nav = [
	{ path: '/', label: { vi: 'Trang chủ', en: 'Home' } },
	{ path: '/research', label: { vi: 'Nghiên cứu', en: 'Research' } },
	{ path: '/people', label: { vi: 'Thành viên', en: 'People' } },
	{ path: '/publications', label: { vi: 'Công bố', en: 'Publications' } },
	{ path: '/applications', label: { vi: 'Ứng dụng', en: 'Applications' } },
	{ path: '/opportunities', label: { vi: 'Cơ hội', en: 'Opportunities' } },
	{ path: '/contact', label: { vi: 'Liên hệ', en: 'Contact' } },
] as const;

export const site = {
	name: 'PIISA Lab',
	fullName: {
		vi: 'Nhóm nghiên cứu Hệ thống Thông minh và Ứng dụng Dựa trên Vật lý (PIISA)',
		en: 'Physics-Informed Intelligent Systems and Applications (PIISA) Lab',
	},
	affiliation: {
		vi: 'Bộ môn Vật lý tin học, Khoa Vật lý - Vật lý kỹ thuật, Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM',
		en: 'Computer Science Physics Division, Faculty of Physics and Engineering Physics, University of Science, VNU-HCM',
	},
	description: {
		vi: 'PIISA Lab kết hợp các quy luật vật lý với trí tuệ nhân tạo cho thiết kế vi mạch, hệ thống nhúng & AI biên và truyền thông vô tuyến 6G.',
		en: 'PIISA Lab combines physical laws with artificial intelligence for IC design, embedded systems & edge AI, and 6G wireless communications.',
	},
	email: 'truongkien@hcmus.edu.vn',
} as const;
