/* ============================================================================
 * data/events.js — SAMPLE events for the calendar (home, news)
 * ============================================================================
 *
 *  TODO (Backend): replace with the events feed / CMS.
 *
 *  Each event:
 *    id        unique string
 *    title     { th, en }
 *    date      'YYYY-MM-DD' (local)      end   'YYYY-MM-DD' (optional, multi-day)
 *    start     'HH:MM' (optional)        finish 'HH:MM' (optional)
 *    type      'lecture' | 'training' | 'meeting' | 'ceremony' | 'exhibition'
 *    location  { th, en }
 *    summary   { th, en }
 *    href      page with details
 * ========================================================================== */

window.RS_EVENT_TYPES = {
  lecture:    { th: 'บรรยาย',      en: 'Lecture' },
  training:   { th: 'อบรม',        en: 'Training' },
  meeting:    { th: 'ประชุม',      en: 'Meeting' },
  ceremony:   { th: 'พิธี',        en: 'Ceremony' },
  exhibition: { th: 'นิทรรศการ',   en: 'Exhibition' }
};

window.RS_EVENTS = [
  { id: 'ev-2026-09-24', type: 'lecture',
    title: { th: 'บรรยายสาธารณะ “ภาษาไทยในยุคดิจิทัล”', en: 'Public lecture: “Thai in the digital age”' },
    date: '2026-09-24', start: '13:30', finish: '16:00',
    location: { th: 'ห้องประชุมชั้น 4 และถ่ายทอดสดออนไลน์', en: '4th-floor hall and live stream' },
    summary: { th: 'เปิดให้ประชาชนทั่วไปลงทะเบียนเข้าร่วม', en: 'Open to the public with registration.' },
    href: 'pages/news.html' },
  { id: 'ev-2026-09-29', type: 'meeting',
    title: { th: 'ประชุมสำนักศิลปกรรม ครั้งที่ 9/2569', en: 'Academy of Arts meeting 9/2026' },
    date: '2026-09-29', start: '09:30', finish: '12:00',
    location: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    summary: { th: 'การประชุมประจำเดือนของสำนัก', en: 'Monthly academy meeting.' },
    href: 'pages/news.html' },
  { id: 'ev-2026-10-08', type: 'training',
    title: { th: 'อบรมการเขียนคำทับศัพท์สำหรับบรรณาธิการ', en: 'Workshop: transliteration for editors' },
    date: '2026-10-08', start: '09:00', finish: '12:00',
    location: { th: 'ออนไลน์', en: 'Online' },
    summary: { th: 'รับจำนวนจำกัด 60 คน', en: 'Limited to 60 participants.' },
    href: 'pages/news.html' },
  { id: 'ev-2026-10-20', type: 'exhibition',
    title: { th: 'นิทรรศการ 100 ปี ราชบัณฑิตยสภา', en: 'Centenary exhibition of the Royal Society' },
    date: '2026-10-20', end: '2026-10-24',
    location: { th: 'หอศิลป์ ชั้น 1', en: 'Gallery, ground floor' },
    summary: { th: 'จัดแสดง 5 วัน เข้าชมฟรี', en: 'A five-day exhibition, free admission.' },
    href: 'pages/news.html' },
  { id: 'ev-2026-11-12', type: 'meeting',
    title: { th: 'การประชุมวิชาการประจำปี', en: 'Annual academic conference' },
    date: '2026-11-12', start: '08:30', finish: '16:30',
    location: { th: 'ศูนย์ราชการ อาคาร B', en: 'Government Complex, Building B' },
    summary: { th: 'นำเสนอผลงานจากสามสำนัก', en: 'Papers from all three academies.' },
    href: 'pages/news.html' },
  { id: 'ev-2026-11-26', type: 'lecture',
    title: { th: 'อาศรมความคิด: ภาษากฎหมายที่ประชาชนเข้าใจได้', en: 'Think Tank Forum: legal language the public can understand' },
    date: '2026-11-26', start: '14:00', finish: '16:00',
    location: { th: 'ออนไลน์', en: 'Online' },
    summary: { th: 'เสวนาทางวิชาการ', en: 'Academic forum.' },
    href: 'pages/academic-works.html#ideas-forum' },
  { id: 'ev-2026-12-15', type: 'ceremony',
    title: { th: 'พิธีมอบรางวัลราชบัณฑิตยสภาสรรเสริญ', en: 'Royal Society Award ceremony' },
    date: '2026-12-15', start: '10:00', finish: '12:00',
    location: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    summary: { th: 'พิธีการของสำนักงาน', en: 'Office ceremony.' },
    href: 'pages/news.html' },
  { id: 'ev-2027-01-21', type: 'training',
    title: { th: 'ราชบัณฑิตสัญจร ภาคเหนือ', en: 'Fellows on Tour: northern region' },
    date: '2027-01-21', end: '2027-01-22',
    location: { th: 'เชียงใหม่', en: 'Chiang Mai' },
    summary: { th: 'กิจกรรมของสำนักงาน', en: 'Office event.' },
    href: 'pages/academic-works.html#on-tour' },
  { id: 'ev-2027-04-19', type: 'ceremony',
    title: { th: 'วันสถาปนาราชบัณฑิตยสภา ครบ 101 ปี', en: '101st anniversary of the Royal Society' },
    date: '2027-04-19', start: '09:00', finish: '11:00',
    location: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    summary: { th: 'กิจกรรมของสำนักงาน', en: 'Office event.' },
    href: 'pages/about.html#history' },
  { id: 'ev-2026-08-27', type: 'lecture',
    title: { th: 'บรรยาย: ศัพท์บัญญัติกับสื่อสารมวลชน', en: 'Lecture: coined terms and the media' },
    date: '2026-08-27', start: '13:00', finish: '15:00',
    location: { th: 'ออนไลน์', en: 'Online' },
    summary: { th: 'กิจกรรมที่ผ่านมา', en: 'Past event.' },
    href: 'pages/news.html' }
];
