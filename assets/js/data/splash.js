/* ============================================================================
 * data/splash.js — the entry page shown before the website (CMS feed)
 * ============================================================================
 *  On royal and national occasions Thai government sites open on a page of
 *  its own before the site; 29-splash.js shows this one on the home page.
 *  The Office sets it from the CMS: one record, switched on and off here.
 *
 *    enabled   true to show it at all
 *    id        a new id shows it again to everyone who closed an earlier one
 *    start/end ISO dates it is shown between (inclusive); omit for always
 *    mode      'normal' | 'celebration' | 'mourning'
 *              mourning: the black ribbon in the corner of every page and
 *              the site in grey for the period (start–end), as is custom
 *    poster    the entry page as one designed image, shown whole:
 *              { desktop: wide image (1920x1080), mobile: tall (1080x1350) }
 *              or a single path; the usual way — the Office's designer
 *              makes the image, the CMS uploads it here
 *    alt       {th,en} everything the poster says, read out to screen
 *              readers (required with a poster)
 *    background  the colour around the poster when the screen's shape
 *              differs from the image's
 *
 *  Without a poster the page is set from the text fields below instead:
 *    image     the background photograph (wide); darkened under the text
 *    portrait  an optional cut-out image beside the text (transparent PNG)
 *    kicker    {th,en} a small line above the title
 *    title     {th,en} the headline
 *    subtitle  {th,en} the line under it
 *    lines     [{th,en}] the message, one line each
 *    from      {th,en} who it is from, set last
 *    enter     {th,en} the button into the site (Thai); the English button
 *              opens the English site
 *
 *  TODO (Office): the wording of every entry page is the Office's; the
 *  sample below marks the Royal Society's centenary (19 April 2026).
 * ========================================================================== */
window.RS_SPLASH = {
  enabled: true,
  id: 'centenary-2569',
  start: '2026-04-01',
  end: '2026-12-31',
  mode: 'celebration',
  poster: {
    desktop: 'assets/images/splash/centenary-2569.jpg',
    mobile: 'assets/images/splash/centenary-2569-mobile.jpg'
  },
  alt: {
    th: '๑๐๐ ปี ราชบัณฑิตยสภา ร้อยปีแห่งการบำรุงสรรพวิชา ๑๙ เมษายน ๒๔๖๙ ถึง ๑๙ เมษายน ๒๕๖๙ นับแต่พระบาทสมเด็จพระปกเกล้าเจ้าอยู่หัวทรงสถาปนาราชบัณฑิตยสภา ราชบัณฑิตยสภาได้ค้นคว้า สร้างองค์ความรู้ และกำหนดมาตรฐานการใช้ภาษาไทย เพื่อประโยชน์ของประเทศและประชาชนตลอดมา ราชบัณฑิตยสภา และสำนักงานราชบัณฑิตยสภา',
    en: 'The Royal Society of Thailand at 100: a hundred years in the service of learning, 19 April 1926 to 19 April 2026.'
  },
  background: '#06251A',
  image: 'assets/images/hero/hero-1.jpg',
  portrait: null,
  kicker: { th: '๑๙ เมษายน ๒๔๖๙ – ๑๙ เมษายน ๒๕๖๙', en: '19 April 1926 – 19 April 2026' },
  title: { th: '๑๐๐ ปี ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand at 100' },
  subtitle: { th: 'ร้อยปีแห่งการบำรุงสรรพวิชา', en: 'A hundred years in the service of learning' },
  lines: [
    { th: 'นับแต่พระบาทสมเด็จพระปกเกล้าเจ้าอยู่หัวทรงสถาปนาราชบัณฑิตยสภา', en: 'Since King Prajadhipok founded the Royal Society,' },
    { th: 'ราชบัณฑิตยสภาได้ค้นคว้า สร้างองค์ความรู้ และกำหนดมาตรฐานการใช้ภาษาไทย', en: 'it has researched, built knowledge and set the standard for written Thai' },
    { th: 'เพื่อประโยชน์ของประเทศและประชาชนตลอดมา', en: 'for the nation and its people.' }
  ],
  from: { th: 'ราชบัณฑิตยสภา และสำนักงานราชบัณฑิตยสภา', en: 'The Royal Society and the Office of the Royal Society' },
  enter: { th: 'เข้าสู่เว็บไซต์', en: 'Enter site' }
};
