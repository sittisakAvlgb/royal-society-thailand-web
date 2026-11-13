/* ============================================================================
 * data/plans.js — the Office's plans and performance reports
 *   (pages/about-plans.html; sitemap 1.9 แผนงาน โครงการ และรายงานผลการดำเนินงานประจำปี)
 * ============================================================================
 *  Brought across from orst.go.th (Nov 2026), where they were spread over
 *  several lists: แผนปฏิบัติราชการประจำปี, แผนยุทธศาสตร์, ผลการปฏิบัติราชการ
 *  รายเดือน, สรุปผลการปฏิบัติราชการตามคำรับรอง, แผนดิจิทัล, แผนป้องกันการทุจริต
 *  and แผนบริหารความต่อเนื่อง. That site is being retired: one record per
 *  document, so the CMS can take them over as they are.
 *
 *    group   key of RS_PLAN_GROUPS
 *    title   as published
 *    year    the fiscal year it covers: the one named after ปีงบประมาณ, or the
 *            first year of a range such as ๒๕๖๖-๒๕๗๐; null when undated
 *    posted  ISO date it was published, where the old list gave one
 *    src     the PDF, kept on this site (assets/docs/plans/)
 *    from    where it was published on orst.go.th, for the record only
 *    pages   page count
 *    thumb   its first page as a small picture (assets/docs/plans/covers/)
 *    bytes   file size
 * ========================================================================== */
window.RS_PLAN_GROUPS = {
  annual:   { th: 'แผนปฏิบัติราชการประจำปี', en: 'Annual action plans' },
  strategy: { th: 'แผนยุทธศาสตร์และแผนระยะยาว', en: 'Strategic and long-term plans' },
  report:   { th: 'รายงานผลการดำเนินงาน', en: 'Performance reports' },
  assess:   { th: 'ผลการประเมินและความพึงพอใจ', en: 'Assessments and satisfaction surveys' },
  other:    { th: 'แผนอื่น ๆ', en: 'Other plans' }
};

window.RS_PLANS = [
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการ ประจำปีงบประมาณ พ.ศ. ๒๕๖๓",
  "year": 2563,
  "posted": null,
  "src": "assets/docs/plans/2563-annual-1.pdf",
  "bytes": 289145,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000175.PDF",
  "pages": 40,
  "thumb": "assets/docs/plans/covers/2563-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนการปฏิบัติงานของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. ๒๕๖๒",
  "year": 2562,
  "posted": null,
  "src": "assets/docs/plans/2562-annual-1.pdf",
  "bytes": 161672,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000176.PDF",
  "pages": 13,
  "thumb": "assets/docs/plans/covers/2562-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการประจำปี พ.ศ. ๒๕๖๑",
  "year": 2561,
  "posted": null,
  "src": "assets/docs/plans/2561-annual-1.pdf",
  "bytes": 14739428,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000178.PDF",
  "pages": 18,
  "thumb": "assets/docs/plans/covers/2561-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนการปฏิบัติราชการและแผนการใช้จ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. ๒๕๖๔",
  "year": 2564,
  "posted": null,
  "src": "assets/docs/plans/2564-annual-1.pdf",
  "bytes": 5316877,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000771.PDF",
  "pages": 13,
  "thumb": "assets/docs/plans/covers/2564-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการ ประจำปีงบประมาณ พ.ศ. ๒๕๖๔",
  "year": 2564,
  "posted": null,
  "src": "assets/docs/plans/2564-annual-2.pdf",
  "bytes": 505108,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000792.PDF",
  "pages": 27,
  "thumb": "assets/docs/plans/covers/2564-annual-2.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการประจำปีงบประมาณ พ.ศ. ๒๕๖๕ สำนักงานราชบัณฑิตยสภา",
  "year": 2565,
  "posted": null,
  "src": "assets/docs/plans/2565-annual-1.pdf",
  "bytes": 683368,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000856.PDF",
  "pages": 27,
  "thumb": "assets/docs/plans/covers/2565-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนการใช้จ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. ๒๕๖๖ สำนักงานราชบัณฑิตยสภา",
  "year": 2566,
  "posted": null,
  "src": "assets/docs/plans/2566-annual-1.pdf",
  "bytes": 20243363,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000860.PDF",
  "pages": 18,
  "thumb": "assets/docs/plans/covers/2566-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการประจำปีงบประมาณ พ.ศ. ๒๕๖๖ สำนักงานราชบัณฑิตยสภา",
  "year": 2566,
  "posted": null,
  "src": "assets/docs/plans/2566-annual-2.pdf",
  "bytes": 320585,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000893.PDF",
  "pages": 29,
  "thumb": "assets/docs/plans/covers/2566-annual-2.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการประจำปีงบประมาณ พ.ศ. ๒๕๖๗ สำนักงานราชบัณฑิตยสภา",
  "year": 2567,
  "posted": null,
  "src": "assets/docs/plans/2567-annual-1.pdf",
  "bytes": 333458,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000968.PDF",
  "pages": 9,
  "thumb": "assets/docs/plans/covers/2567-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการประจำปีงบประมาณ พ.ศ. ๒๕๖๘ สำนักงานราชบัณฑิตยสภา",
  "year": 2568,
  "posted": null,
  "src": "assets/docs/plans/2568-annual-1.pdf",
  "bytes": 296823,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000981.PDF",
  "pages": 10,
  "thumb": "assets/docs/plans/covers/2568-annual-1.jpg"
 },
 {
  "group": "annual",
  "title": "แผนปฏิบัติราชการประจำปีงบประมาณ พ.ศ. ๒๕๖๙ สำนักงานราชบัณฑิตยสภา",
  "year": 2569,
  "posted": null,
  "src": "assets/docs/plans/2569-annual-1.pdf",
  "bytes": 1839934,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0001/00001007.PDF",
  "pages": 13,
  "thumb": "assets/docs/plans/covers/2569-annual-1.jpg"
 },
 {
  "group": "strategy",
  "title": "แผนปฏิบัติราชการ ระยะ ๕ ปี ระยะเริ่มแรก ๓ ปี (พ.ศ. ๒๕๖๓-๒๕๖๕) สำนักงานราชบัณฑิตยสภา",
  "year": 2563,
  "posted": null,
  "src": "assets/docs/plans/2563-strategy-1.pdf",
  "bytes": 467326,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000855.PDF",
  "pages": 26,
  "thumb": "assets/docs/plans/covers/2563-strategy-1.jpg"
 },
 {
  "group": "strategy",
  "title": "แผนปฏิบัติราชการ ระยะ ๕ ปี ช่วงที่ ๒ (พ.ศ. ๒๕๖๖-๒๕๗๐) สำนักงานราชบัณฑิตยสภา",
  "year": 2566,
  "posted": null,
  "src": "assets/docs/plans/2566-strategy-1.pdf",
  "bytes": 222381,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000886.PDF",
  "pages": 28,
  "thumb": "assets/docs/plans/covers/2566-strategy-1.jpg"
 },
 {
  "group": "strategy",
  "title": "แผนยุทธศาสตร์สำนักงานราชบัณฑิตยสภา ระยะ ๒๐ ปี (พ.ศ. ๒๕๖๑-๒๕๘๐)",
  "year": 2561,
  "posted": null,
  "src": "assets/docs/plans/2561-strategy-1.pdf",
  "bytes": 1550932,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000892.PDF",
  "pages": 23,
  "thumb": "assets/docs/plans/covers/2561-strategy-1.jpg"
 },
 {
  "group": "strategy",
  "title": "แผนปฏิบัติราชการระยะ ๕ ปี (พ.ศ. ๒๕๖๖-๒๕๗๐) ของสำนักงานราชบัณฑิตยสภา",
  "year": 2566,
  "posted": null,
  "src": "assets/docs/plans/2566-strategy-2.pdf",
  "bytes": 108265,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000987.PDF",
  "pages": 5,
  "thumb": "assets/docs/plans/covers/2566-strategy-2.jpg"
 },
 {
  "group": "report",
  "title": "แผนการดำเนินงานตามภารกิจและความก้าวหน้าในการดำเนินงานตามแผนของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2569 (รอบ 6 เดือน)",
  "year": 2569,
  "posted": "2026-05-14",
  "src": "assets/docs/plans/2569-report-1.pdf",
  "bytes": 89017,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0001/00001023.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2569-report-1.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการดำเนินงานตามแผนดำเนินงาน ประจำปีงบประมาณ พ.ศ. 2568 สำนักงานราชบัณฑิตยสภา",
  "year": 2568,
  "posted": "2026-05-14",
  "src": "assets/docs/plans/2568-report-1.pdf",
  "bytes": 100477,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0001/00001024.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2568-report-1.jpg"
 },
 {
  "group": "report",
  "title": "ข้อมูลสถิติการให้บริการผ่านช่องทางออนไลน์ (E-Service) ประจำปีงบประมาณ พ.ศ. 2568 รอบ 12 เดือน",
  "year": 2568,
  "posted": "2026-05-14",
  "src": "assets/docs/plans/2568-report-2.pdf",
  "bytes": 211786,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0001/00001025.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2568-report-2.jpg"
 },
 {
  "group": "report",
  "title": "ข้อมูลสถิติการให้บริการของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2567 รอบ 12 เดือน (1 ตุลาคม 2566-30 กันยายน 2567)",
  "year": 2567,
  "posted": "2025-04-10",
  "src": "assets/docs/plans/2567-report-1.pdf",
  "bytes": 192258,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000992.PDF",
  "pages": 9,
  "thumb": "assets/docs/plans/covers/2567-report-1.jpg"
 },
 {
  "group": "report",
  "title": "แผนการดำเนินงานตามภารกิจและความก้าวหน้าในการดำเนินงานตามแผนของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2568 (รอบ 6 เดือน)",
  "year": 2568,
  "posted": "2025-04-09",
  "src": "assets/docs/plans/2568-report-3.pdf",
  "bytes": 85034,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000989.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2568-report-3.jpg"
 },
 {
  "group": "report",
  "title": "สรุปผลการดำเนินงานโครงการ/กิจกรรม ตามแผนปฏิบัติการและแผนการใช้จ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. 2567 รอบ 12 เดือน",
  "year": 2567,
  "posted": "2025-03-14",
  "src": "assets/docs/plans/2567-report-2.pdf",
  "bytes": 79341,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000984.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2567-report-2.jpg"
 },
 {
  "group": "report",
  "title": "แผนการดำเนินงานและผลความก้าวหน้าในการดำเนินงานตามภารกิจของสำนักงาน ราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2567 รอบ 6 เดือน (1 ตุลาคม 2566-31 มีนาคม 2567)",
  "year": 2567,
  "posted": "2024-04-25",
  "src": "assets/docs/plans/2567-report-3.pdf",
  "bytes": 86605,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000967.PDF",
  "pages": 4,
  "thumb": "assets/docs/plans/covers/2567-report-3.jpg"
 },
 {
  "group": "report",
  "title": "ข้อมูลสถิติการให้บริการของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2566 รอบ 12 เดือน (1 ตุลาคม 2565-30 กันยายน 2566)",
  "year": 2566,
  "posted": "2024-02-29",
  "src": "assets/docs/plans/2566-report-1.pdf",
  "bytes": 157336,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000960.PDF",
  "pages": 5,
  "thumb": "assets/docs/plans/covers/2566-report-1.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการดำเนินงานและผลการใช้จ่ายงบประมาณของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2566 รอบ 12 เดือน (1 ตุลาคม 2565-30 กันยายน 2566)",
  "year": 2566,
  "posted": "2024-02-09",
  "src": "assets/docs/plans/2566-report-2.pdf",
  "bytes": 516444,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000950.PDF",
  "pages": 23,
  "thumb": "assets/docs/plans/covers/2566-report-2.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการปฏิบัติราชการ ประจำปีงบประมาณ พ.ศ. 2566 รอบ 6 เดือน (1 ตุลาคม 2565-31 มีนาคม 2566)",
  "year": 2566,
  "posted": "2023-04-25",
  "src": "assets/docs/plans/2566-report-3.pdf",
  "bytes": 405121,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000916.PDF",
  "pages": 18,
  "thumb": "assets/docs/plans/covers/2566-report-3.jpg"
 },
 {
  "group": "report",
  "title": "ข้อมูลสถิติการให้บริการของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2566 รอบ 6 เดือน (1 ตุลาคม 2565-31 มีนาคม 2566)",
  "year": 2566,
  "posted": "2023-04-24",
  "src": "assets/docs/plans/2566-report-4.pdf",
  "bytes": 215143,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000917.PDF",
  "pages": 4,
  "thumb": "assets/docs/plans/covers/2566-report-4.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการดำเนินงานประจำปีงบประมาณ พ.ศ. 2565 สำนักงานราชบัณฑิตยสภา รอบ 12 เดือน (1 ตุลาคม 2564-30 กันยายน 2565)",
  "year": 2565,
  "posted": "2023-04-24",
  "src": "assets/docs/plans/2565-report-1.pdf",
  "bytes": 414608,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000915.PDF",
  "pages": 6,
  "thumb": "assets/docs/plans/covers/2565-report-1.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการเบิกจ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. 2565 รอบ 6 เดือน (1 ตุลาคม 2564-31 มีนาคม 2565)",
  "year": 2565,
  "posted": "2022-04-22",
  "src": "assets/docs/plans/2565-report-2.pdf",
  "bytes": 73374,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000863.PDF",
  "pages": 4,
  "thumb": "assets/docs/plans/covers/2565-report-2.jpg"
 },
 {
  "group": "report",
  "title": "ข้อมูลสถิติการให้บริการของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2565 รอบ 6 เดือน (1 ตุลาคม 2564-31 มีนาคม 2565)",
  "year": 2565,
  "posted": "2022-04-22",
  "src": "assets/docs/plans/2565-report-3.pdf",
  "bytes": 3380091,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000868.PDF",
  "pages": 6,
  "thumb": "assets/docs/plans/covers/2565-report-3.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการดำเนินงาน ประจำปีงบประมาณ พ.ศ. 2564 สำนักงานราชบัณฑิตยสภา รอบ 12 เดือน (1 ตุลาคม 2563-30 กันยายน 2564)",
  "year": 2564,
  "posted": "2022-04-22",
  "src": "assets/docs/plans/2564-report-1.pdf",
  "bytes": 415337,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000869.PDF",
  "pages": 16,
  "thumb": "assets/docs/plans/covers/2564-report-1.jpg"
 },
 {
  "group": "report",
  "title": "ผลการเบิกจ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. 2564 รอบ 12 เดือน (1 ตุลาคม พ.ศ. 2563-30 กันยายน พ.ศ. 2564)",
  "year": 2564,
  "posted": "2022-04-20",
  "src": "assets/docs/plans/2564-report-2.pdf",
  "bytes": 76733,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000857.PDF",
  "pages": 4,
  "thumb": "assets/docs/plans/covers/2564-report-2.jpg"
 },
 {
  "group": "report",
  "title": "ผลการเบิกจ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. ๒๕๖๔ รอบ ๖ เดือน (๑ ตุลาคม พ.ศ. ๒๕๖๓-๓๑ มีนาคม พ.ศ. ๒๕๖๔)",
  "year": 2564,
  "posted": "2021-04-27",
  "src": "assets/docs/plans/2564-report-3.pdf",
  "bytes": 224209,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000790.PDF",
  "pages": 10,
  "thumb": "assets/docs/plans/covers/2564-report-3.jpg"
 },
 {
  "group": "report",
  "title": "จำนวนให้บริการประชาชน ปี 2564 รอบ 6 เดือน (1 ตุลาคม 2563-31 มีนาคม 2564)",
  "year": 2564,
  "posted": "2021-04-27",
  "src": "assets/docs/plans/2564-report-4.pdf",
  "bytes": 72902,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000796.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2564-report-4.jpg"
 },
 {
  "group": "report",
  "title": "ผลการดำเนินงานตามมาตรการปรับปรุงประสิทธิภาพในการปฏิบัติราชการ ประจำปีงบประมาณ พ.ศ. 2563 รอบ 12 เดือน",
  "year": 2563,
  "posted": "2021-04-27",
  "src": "assets/docs/plans/2563-report-1.pdf",
  "bytes": 110148,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000798.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2563-report-1.jpg"
 },
 {
  "group": "report",
  "title": "ผลงานคณะกรรมการวิชาการ ปี 2564 รอบ 6 เดือน (1ตุลาคม 2563-31 มีนาคม 2564)",
  "year": 2564,
  "posted": "2021-04-20",
  "src": "assets/docs/plans/2564-report-5.pdf",
  "bytes": 62206,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000787.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2564-report-5.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการเบิกจ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. 2563 รอบ 12 เดือน",
  "year": 2563,
  "posted": "2021-04-20",
  "src": "assets/docs/plans/2563-report-2.pdf",
  "bytes": 107322,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000797.PDF",
  "pages": 8,
  "thumb": "assets/docs/plans/covers/2563-report-2.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการเบิกจ่ายเงินงบประมาณประจำปีงบประมาณ พ.ศ. ๒๕๖๓ ข้อมูล ณ วันที่ ๒๙ มิถุนายน ๒๕๖๓",
  "year": 2563,
  "posted": "2020-06-29",
  "src": "assets/docs/plans/2563-report-3.pdf",
  "bytes": 30429,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000442.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2563-report-3.jpg"
 },
 {
  "group": "report",
  "title": "จำนวนการให้บริการประชาชน ตั้งแต่เดือนตุลาคม ๒๕๖๒-พฤษภาคม ๒๕๖๓",
  "year": 2563,
  "posted": "2020-05-31",
  "src": "assets/docs/plans/2563-report-4.pdf",
  "bytes": 42466,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000443.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2563-report-4.jpg"
 },
 {
  "group": "report",
  "title": "ผลการปฏิบัติงานของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. ๒๕๖๒ รอบ ๖ เดือน (๑ ตุลาคม ๒๕๖๑-๓๑ มีนาคม ๒๕๖๒)",
  "year": 2562,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2562-report-1.pdf",
  "bytes": 286448,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000123.PDF",
  "pages": 21,
  "thumb": "assets/docs/plans/covers/2562-report-1.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการเบิกจ่ายเงินงบประมาณประจำปีงบประมาณ พ.ศ. ๒๕๖๒ ตั้งแต่วันที่ ๑ ตุลาคม ๒๕๖๑-๓๑ มีนาคม ๒๕๖๒",
  "year": 2562,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2562-report-2.pdf",
  "bytes": 56168,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000124.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2562-report-2.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการเบิกจ่ายเงินงบประมาณประจำปีงบประมาณ พ.ศ. ๒๕๖๑ ตั้งแต่วันที่ ๑ ตุลาคม ๒๕๖๐-๓๐ กันยายน ๒๕๖๑",
  "year": 2561,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2561-report-1.pdf",
  "bytes": 58243,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000125.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2561-report-1.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการประเมินส่วนราชการ ตามมาตรการปรับปรุงประสิทธิภาพในการปฏิบัติราชการ ประจำปีงบประมาณ พ.ศ. ๒๕๖๑",
  "year": 2561,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2561-report-2.pdf",
  "bytes": 80947,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000126.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2561-report-2.jpg"
 },
 {
  "group": "report",
  "title": "ผลการปฏิบัติงานของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. ๒๕๖๑",
  "year": 2561,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2561-report-3.pdf",
  "bytes": 67277,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000127.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2561-report-3.jpg"
 },
 {
  "group": "report",
  "title": "ปีงบประมาณ พ.ศ. ๒๕๕๔",
  "year": 2554,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2554-report-1.pdf",
  "bytes": 222482,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000131.PDF",
  "pages": 26,
  "thumb": "assets/docs/plans/covers/2554-report-1.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการตรวจสอบงบการเงินจากสำนักงานตรวจเงินแผ่นดิน ตาม พรบ.วินัยการเงินการคลังของรัฐ พ.ศ. ๒๕๖๑",
  "year": 2561,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2561-report-4.pdf",
  "bytes": 10443166,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000132.PDF",
  "pages": 36,
  "thumb": "assets/docs/plans/covers/2561-report-4.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการดำเนินงานของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. ๒๕๖๓ รอบ ๖ เดือน (๑ ตุลาคม ๒๕๖๒-๓๑ มีนาคม ๒๕๖๓)",
  "year": 2563,
  "posted": "2020-03-31",
  "src": "assets/docs/plans/2563-report-5.pdf",
  "bytes": 162528,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000445.PDF",
  "pages": 8,
  "thumb": "assets/docs/plans/covers/2563-report-5.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการดำเนินงานของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. ๒๕๖๒ รอบ ๑๒ เดือน (๑ ตุลาคม ๒๕๖๑-๓๐ กันยายน ๒๕๖๒)",
  "year": 2562,
  "posted": "2019-09-30",
  "src": "assets/docs/plans/2562-report-3.pdf",
  "bytes": 160499,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000446.PDF",
  "pages": 8,
  "thumb": "assets/docs/plans/covers/2562-report-3.jpg"
 },
 {
  "group": "report",
  "title": "รายงานผลการใช้จ่ายงบประมาณ ประจำปีงบประมาณ พ.ศ. ๒๕๖๒ ตั้งแต่วันที่ ๑ ตุลาคม ๒๕๖๑-๓๐ กันยายน ๒๕๖๒",
  "year": 2562,
  "posted": "2019-09-30",
  "src": "assets/docs/plans/2562-report-4.pdf",
  "bytes": 201013,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000444.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2562-report-4.jpg"
 },
 {
  "group": "assess",
  "title": "รายงานผลการสำรวจความพึงพอใจการให้บริการของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2565",
  "year": 2565,
  "posted": "2023-02-09",
  "src": "assets/docs/plans/2565-assess-1.pdf",
  "bytes": 953051,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000888.PDF",
  "pages": 53,
  "thumb": "assets/docs/plans/covers/2565-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "ผลการสำรวจความพึงพอใจการให้บริการของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. 2564",
  "year": 2564,
  "posted": "2022-02-02",
  "src": "assets/docs/plans/2564-assess-1.pdf",
  "bytes": 24437791,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000841.PDF",
  "pages": 88,
  "thumb": "assets/docs/plans/covers/2564-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "ผลการสำรวจความพึงพอใจของผู้รับบริการและผู้มีส่วนได้ส่วนเสีย สำนักงานราชบัณฑิตยสภา ปี 2563",
  "year": 2563,
  "posted": "2021-04-20",
  "src": "assets/docs/plans/2563-assess-1.pdf",
  "bytes": 156895,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000777.PDF",
  "pages": 5,
  "thumb": "assets/docs/plans/covers/2563-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "รายงานผลการสำรวจความพึงพอใจของผู้รับฟัง จำนวน ๕ รายการ ทางสถานีวิทยุ ม.ก. ปีงบประมาณ ๒๕๖๒",
  "year": 2562,
  "posted": "2020-08-03",
  "src": "assets/docs/plans/2562-assess-1.pdf",
  "bytes": 5365918,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000447.PDF",
  "pages": 19,
  "thumb": "assets/docs/plans/covers/2562-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "รายงานผลการสำรวจความนิยมของผู้รับฟัง จำนวน ๔ รายการ ทางสถานีวิทยุกระจายเสียงแห่งประเทศไทย ประจำปีงบประมาณ ๒๕๖๒",
  "year": 2562,
  "posted": "2020-08-03",
  "src": "assets/docs/plans/2562-assess-2.pdf",
  "bytes": 419052,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000448.PDF",
  "pages": 12,
  "thumb": "assets/docs/plans/covers/2562-assess-2.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผู้ใช้บริการทางอินเทอร์เน็ตของสำนักงานราชบัณฑิตยสภา พ.ศ. ๒๕๕๗-๒๕๖๑",
  "year": 2557,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2557-assess-1.pdf",
  "bytes": 313057,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000133.PDF",
  "pages": 1,
  "thumb": "assets/docs/plans/covers/2557-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๔๘ (๓.๗๓๓๗ คะแนน ณ สิงหาคม ๒๕๔๙)",
  "year": 2548,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2548-assess-1.pdf",
  "bytes": 92138,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000135.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2548-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๔๙ (๓.๘๐๔๖ คะแนน ณ สิงหาคม ๒๕๕๐)",
  "year": 2549,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2549-assess-1.pdf",
  "bytes": 111432,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000136.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2549-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๐ (๓.๔๘๙๖ คะแนน ณ เมษายน ๒๕๕๑)",
  "year": 2550,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2550-assess-1.pdf",
  "bytes": 89964,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000137.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2550-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๑ (๓.๘๘๐๙ คะแนน ณ พฤษภาคม ๒๕๕๒)",
  "year": 2551,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2551-assess-1.pdf",
  "bytes": 87095,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000138.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2551-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๒ (๓.๖๑๖๔ คะแนน ณ กรกฎาคม ๒๕๕๓)",
  "year": 2552,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2552-assess-1.pdf",
  "bytes": 90689,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000139.PDF",
  "pages": 4,
  "thumb": "assets/docs/plans/covers/2552-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๓ (๔.๑๕๒๗ คะแนน ณ สิงหาคม ๒๕๕๔)",
  "year": 2553,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2553-assess-1.pdf",
  "bytes": 111750,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000140.PDF",
  "pages": 4,
  "thumb": "assets/docs/plans/covers/2553-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๔ (๔.๑๑๙๘ คะแนน ณ กรกฎาคม ๒๕๕๕)",
  "year": 2554,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2554-assess-1.pdf",
  "bytes": 184267,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000141.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2554-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๕ (๓.๗๗๕๑ คะแนน ณ มิถุนายน พ.ศ. ๒๕๕๖)",
  "year": 2555,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2555-assess-1.pdf",
  "bytes": 94254,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000142.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2555-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๖ (๓.๙๘๑๑ คะแนน)",
  "year": 2556,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2556-assess-1.pdf",
  "bytes": 83963,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000143.PDF",
  "pages": 3,
  "thumb": "assets/docs/plans/covers/2556-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๗ (๓.๐๕๑๒ คะแนน)",
  "year": 2557,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2557-assess-2.pdf",
  "bytes": 75119,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000144.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2557-assess-2.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๘ (๓.๘๘๔๘ คะแนน)",
  "year": 2558,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2558-assess-1.pdf",
  "bytes": 70484,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000145.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2558-assess-1.jpg"
 },
 {
  "group": "assess",
  "title": "สรุปผลการปฏิบัติราชการตามคำรับรองการปฏิบัติราชการ ปีงบประมาณ พ.ศ. ๒๕๕๙ (๔.๒๘๗๓ คะแนน)",
  "year": 2559,
  "posted": "2020-05-07",
  "src": "assets/docs/plans/2559-assess-1.pdf",
  "bytes": 69026,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000146.PDF",
  "pages": 2,
  "thumb": "assets/docs/plans/covers/2559-assess-1.jpg"
 },
 {
  "group": "other",
  "title": "แผนปฏิบัติการดิจิทัล ของสำนักงานราชบัณฑิตยสภา พ.ศ. 2563-2565",
  "year": 2563,
  "posted": null,
  "src": "assets/docs/plans/2563-other-1.pdf",
  "bytes": 961437,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000167.PDF",
  "pages": 36,
  "thumb": "assets/docs/plans/covers/2563-other-1.jpg"
 },
 {
  "group": "other",
  "title": "แผนปฏิบัติการดิจิทัล ของสำนักงานราชบัณฑิตยสภา พ.ศ. 2563-2565",
  "year": 2563,
  "posted": null,
  "src": "assets/docs/plans/2563-other-2.pdf",
  "bytes": 961437,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000805.PDF",
  "pages": 36,
  "thumb": "assets/docs/plans/covers/2563-other-2.jpg"
 },
 {
  "group": "other",
  "title": "แผนปฏิบัติการป้องกันและปราบปรามการทุจริต",
  "year": null,
  "posted": null,
  "src": "assets/docs/plans/na-other-1.pdf",
  "bytes": 3835633,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER005/GENERAL/DATA0000/00000803.PDF",
  "pages": 18,
  "thumb": "assets/docs/plans/covers/na-other-1.jpg"
 },
 {
  "group": "other",
  "title": "แผนบริหารความต่อเนื่องของราชบัณฑิตยสถาน",
  "year": null,
  "posted": null,
  "src": "assets/docs/plans/na-other-2.pdf",
  "bytes": 1032580,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000007.PDF",
  "pages": 37,
  "thumb": "assets/docs/plans/covers/na-other-2.jpg"
 },
 {
  "group": "other",
  "title": "แผนดำเนินธุรกิจอย่างต่อเนื่องสำหรับการบริหารความพร้อมต่อสภาวะวิกฤต (BCP)",
  "year": null,
  "posted": null,
  "src": "assets/docs/plans/na-other-3.pdf",
  "bytes": 1792370,
  "from": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000152.PDF",
  "pages": 34,
  "thumb": "assets/docs/plans/covers/na-other-3.jpg"
 }
];
