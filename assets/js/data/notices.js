/* ============================================================================
 * data/notices.js — the announcement popup (CMS feed)
 * ============================================================================
 *  30-notice.js opens these as a picture in a window over the page, after
 *  the entry page (data/splash.js) and the cookie notice have closed, so the
 *  three never stack. The notice is the picture alone: the Office's designer
 *  makes it with its own wording, the CMS uploads it here. One record per
 *  notice, shown in this order; with more than one, the window pages
 *  through them.
 *
 *    enabled   true to show it at all
 *    id        a new id shows it again to everyone who closed an earlier one
 *    start/end ISO dates it is shown between (inclusive); omit for always
 *    pages     'home' (default) | 'all' | ['news.html', 'admissions.html', ...]
 *    image     the picture: one path, or { desktop, mobile } - desktop wide
 *              (16:9, 1920x1080), mobile optional (4:5, 1080x1350)
 *    alt       {th,en} everything the picture says, read out to screen
 *              readers (required)
 *    link      optional { href, external: true|false }: the picture opens it
 *
 *  Closing it keeps it closed for the visit; "ไม่ต้องแสดงอีก" keeps it closed
 *  on this device until its id changes. ?notice=1 shows it regardless (for
 *  the Office to check), ?notice=0 skips it.
 * ========================================================================== */
window.RS_NOTICES = [
  {
    enabled: true,
    id: 'centenary-2569-notice',
    start: '2026-04-01',
    end: '2026-12-31',
    pages: 'home',
    image: { desktop: 'assets/images/notices/centenary-2569.jpg' },
    alt: {
      th: '๑๐๐ ปี ราชบัณฑิตยสภา ร้อยปีแห่งการบำรุงสรรพวิชา ๑๙ เมษายน ๒๔๖๙ ถึง ๑๙ เมษายน ๒๕๖๙',
      en: 'The Royal Society of Thailand at 100: a hundred years in the service of learning, 19 April 1926 to 19 April 2026.'
    },
    link: { href: 'pages/about-history.html' }
  }
];
