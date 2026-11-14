/* ============================================================================
 * data/notices.js — the announcement popup (CMS feed)
 * ============================================================================
 *  30-notice.js opens these in a small window over the page, after the entry
 *  page (data/splash.js) and the cookie notice have closed, so the three
 *  never stack. The Office sets them from the CMS: one record per notice,
 *  shown in this order; with more than one, the window pages through them.
 *
 *    enabled   true to show it at all
 *    id        a new id shows it again to everyone who closed an earlier one
 *    start/end ISO dates it is shown between (inclusive); omit for always
 *    pages     'home' (default) | 'all' | ['news.html', 'admissions.html', …]
 *    image     an optional picture above the text (wide, 16:9 or 2:1;
 *              a poster with its own wording: give imageAlt the wording)
 *    imageAlt  {th,en} what the picture says, if it carries text
 *    kicker    {th,en} a small line above the title, e.g. ประกาศ
 *    title     {th,en} the headline
 *    text      {th,en} a sentence or two
 *    date      ISO date shown beside the kicker (optional)
 *    link      { href, label: {th,en}, external: true|false } the main button
 *
 *  Closing it keeps it closed for the visit; "ไม่ต้องแสดงอีก" keeps it closed
 *  on this device until its id changes. ?notice=1 shows it regardless (for
 *  the Office to check), ?notice=0 skips it.
 *
 *  TODO (Office): the sample below is placeholder wording; set the real
 *  notices from the CMS.
 * ========================================================================== */
window.RS_NOTICES = [
  {
    enabled: true,
    id: 'associate-2570',
    start: '2026-11-01',
    end: '2026-12-31',
    pages: 'home',
    image: 'assets/images/news/news-lead.jpg',
    kicker: { th: 'ประกาศ', en: 'Notice' },
    date: '2026-11-10',
    title: { th: 'เปิดรับสมัครบุคคลเป็นภาคีสมาชิก ประจำปี ๒๕๗๐', en: 'Applications open for Associate Fellows, 2027' },
    text: { th: 'ราชบัณฑิตยสภาเปิดรับสมัครบุคคลผู้มีความรู้ความเชี่ยวชาญเป็นภาคีสมาชิกในทุกสำนัก ยื่นใบสมัครได้ถึงวันที่ ๒๖ ธันวาคม ๒๕๖๙', en: 'The Royal Society invites applications for Associate Fellows in every Academy, until 26 December 2026.' },
    link: { href: 'pages/admissions.html#associate-fellow', label: { th: 'ดูรายละเอียดการรับสมัคร', en: 'How to apply' } }
  },
  {
    enabled: true,
    id: 'office-closed-2569-12',
    start: '2026-11-01',
    end: '2026-12-31',
    pages: 'home',
    kicker: { th: 'แจ้งปิดทำการ', en: 'Office closure' },
    date: '2026-11-12',
    title: { th: 'สำนักงานราชบัณฑิตยสภาปิดทำการ ๕ และ ๑๐ ธันวาคม ๒๕๖๙', en: 'The Office is closed on 5 and 10 December 2026' },
    text: { th: 'งดให้บริการห้องสมุดและการติดต่อ ณ สำนักงาน บริการออนไลน์ยังใช้ได้ตามปกติ', en: 'The library and front desk are closed; online services run as usual.' },
    link: { href: 'pages/contact.html', label: { th: 'ช่องทางติดต่อ', en: 'Contact us' } }
  }
];
