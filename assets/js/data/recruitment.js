/* ============================================================================
 * data/recruitment.js — calls for Associate Fellows and their appointments
 *  (pages/fellows-recruitment.html, 26-recruitment.js), newest first.
 *  The page's "latest call" card shows the newest item of kind "call" (or
 *  the newest item when no call is open); the next ones are listed beneath
 *  it, and the count beside it is the length of this list.
 *    id, kind ("call" | "appoint"), academy ("moral" | "science" | "arts"),
 *    title {th,en}, date (ISO, optional), closes (ISO, optional: the last
 *    day to apply), pdf (link to the notice)
 *  TODO (CMS): one entry per notice; the same notices also appear on the
 *  announcements page under ภาคีสมาชิก.
 * ========================================================================== */
window.RS_RECRUIT = [
  { id: 'call-science-107', kind: 'call', academy: 'science',
    title: { th: 'รับสมัครคัดเลือกเพื่อแต่งตั้งเป็นภาคีสมาชิก สำนักวิทยาศาสตร์', en: 'Applications to be elected an Associate Fellow, Academy of Science' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000107.PDF' },
  { id: 'appoint-arts-109', kind: 'appoint', academy: 'arts',
    title: { th: 'แต่งตั้งนางสาวกรรณิการ์ วิมลเกษม เป็นภาคีสมาชิก สำนักศิลปกรรม', en: 'Appointment of an Associate Fellow, Academy of Arts' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000109.PDF' },
  { id: 'appoint-moral-110', kind: 'appoint', academy: 'moral',
    title: { th: 'แต่งตั้งศาสตราจารย์สุกัญญา สุดบรรทัด เป็นภาคีสมาชิก สำนักธรรมศาสตร์และการเมือง', en: 'Appointment of an Associate Fellow, Academy of Moral and Political Sciences' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000110.PDF' },
  { id: 'appoint-science-111', kind: 'appoint', academy: 'science',
    title: { th: 'แต่งตั้งนายเลิศศิริร์ บวรกิตติ เป็นภาคีสมาชิก สำนักวิทยาศาสตร์', en: 'Appointment of an Associate Fellow, Academy of Science' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000111.PDF' },
  { id: 'appoint-science-113', kind: 'appoint', academy: 'science',
    title: { th: 'แต่งตั้งศาสตราจารย์ ดร.วัลลภ สุระกำพลธร เป็นภาคีสมาชิก สำนักวิทยาศาสตร์', en: 'Appointment of an Associate Fellow, Academy of Science' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000113.PDF' },
  { id: 'appoint-science-114', kind: 'appoint', academy: 'science',
    title: { th: 'แต่งตั้งศาสตราจารย์ ดร.ปริญญา จินดาประเสริฐ เป็นภาคีสมาชิก สำนักวิทยาศาสตร์', en: 'Appointment of an Associate Fellow, Academy of Science' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000114.PDF' },
  { id: 'appoint-moral-118', kind: 'appoint', academy: 'moral',
    title: { th: 'แต่งตั้งภาคีสมาชิก สำนักธรรมศาสตร์และการเมือง', en: 'Appointment of Associate Fellows, Academy of Moral and Political Sciences' },
    pdf: 'https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000118.PDF' }
];
