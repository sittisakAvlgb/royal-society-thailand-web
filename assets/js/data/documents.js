/* ============================================================================
 * data/documents.js — Laws and regulations of the Royal Society (CMS feed)
 * ============================================================================
 *  One list per page; 19-works-list.js draws the cards, the filter tabs
 *  (group), search, grid/list and pager from it:
 *    acts           pages/about-acts.html           พระราชบัญญัติ
 *    bylaws         pages/about-bylaws.html         ข้อบังคับ
 *    rules          pages/about-rules.html          ระเบียบ
 *    announcements  pages/about-announcements.html  ประกาศ
 *
 *  A record, in the order shown (newest first is the CMS's order):
 *    group     the page's filter tab (data-academy on its tabs)
 *    title     {th, en?} the name as listed; en makes it show in English
 *    full      the full official title, read out to screen readers
 *    subject   the subject line (ann-subject)
 *    edition   {th, en} acts only: ฉบับเต็ม / ฉบับแปล / สรุปสาระสำคัญ …
 *    academy   'moral'|'science'|'arts' when an academy issued it
 *    issuer    the body that issued it, when it is not the Royal Society
 *    form      a form: the note on what it goes with
 *    year      Buddhist-era year of issue (2567), shown as พ.ศ. ๒๕๖๗
 *    lang      'th'|'en' — the language of the PDF
 *    latest    true: marked ล่าสุด
 *    href      the PDF (assets/docs/… or the Office's file room)
 *    cover     {name, sub} the printed cover in grid view (acts)
 * ========================================================================== */
window.RS_DOCUMENTS = {
 "acts": [
  {
   "group": "current",
   "title": {
    "th": "พระราชบัญญัติราชบัณฑิตยสภา พ.ศ. ๒๕๕๘"
   },
   "lang": "th",
   "edition": {
    "th": "ฉบับเต็ม",
    "en": "Full text"
   },
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000048.PDF",
   "cover": {
    "name": "ราชบัณฑิตยสภา",
    "sub": "พ.ศ. ๒๕๕๘"
   }
  },
  {
   "group": "current",
   "title": {
    "th": "Royal Society Act, B.E. 2558 (2015)",
    "en": "Royal Society Act, B.E. 2558 (2015)"
   },
   "lang": "en",
   "edition": {
    "th": "ฉบับแปล",
    "en": "Translation"
   },
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000047.PDF",
   "cover": {
    "name": "ราชบัณฑิตยสภา",
    "sub": "ฉบับแปล ค.ศ. 2015"
   }
  },
  {
   "group": "current",
   "title": {
    "th": "คำอธิบายสรุปสาระสำคัญของพระราชบัญญัติ"
   },
   "lang": "th",
   "edition": {
    "th": "อ่านเข้าใจง่าย",
    "en": "Plain summary"
   },
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000160.PDF",
   "cover": {
    "name": "ราชบัณฑิตยสภา",
    "sub": "สรุปสาระสำคัญ"
   }
  },
  {
   "group": "previous",
   "title": {
    "th": "พระราชบัญญัติราชบัณฑิตยสถาน พ.ศ. ๒๕๔๔"
   },
   "lang": "th",
   "edition": {
    "th": "สมัยราชบัณฑิตยสถาน",
    "en": "Royal Institute era"
   },
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000049.PDF",
   "cover": {
    "name": "ราชบัณฑิตยสถาน",
    "sub": "พ.ศ. ๒๕๔๔"
   }
  }
 ],
 "bylaws": [
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยคุณวุฒิของผู้สมัครเป็นภาคีสมาชิก หลักเกณฑ์ วิธีการสมัครและวิธีการรับบุคคลเป็นภาคีสมาชิก"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยคุณวุฒิของผู้สมัครเป็นภาคีสมาชิก หลักเกณฑ์ วิธีการสมัครและวิธีการรับบุคคลเป็นภาคีสมาชิก พ.ศ. ๒๕๖๓",
   "subject": "สมาชิก",
   "year": 2563,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000156.pdf"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยหลักเกณฑ์และวิธีการเลือกภาคีสมาชิก เพื่อแต่งตั้งเป็นราชบัณฑิตในตำแหน่งที่ตั้งขึ้นใหม่หรือตำแหน่งที่ว่าง"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยหลักเกณฑ์และวิธีการเลือกภาคีสมาชิก เพื่อแต่งตั้งเป็นราชบัณฑิตในตำแหน่งที่ตั้งขึ้นใหม่หรือตำแหน่งที่ว่าง",
   "subject": "สมาชิก",
   "lang": "th",
   "href": "../assets/docs/bylaws/00000157.pdf"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยการกำหนดจำนวนภาคีสมาชิกและจำนวนราชบัณฑิต"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการกำหนดจำนวนภาคีสมาชิกและจำนวนราชบัณฑิต พ.ศ. ๒๕๖๓",
   "subject": "สมาชิก",
   "year": 2563,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000158.pdf"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยหลักเกณฑ์และวิธีการในการแต่งตั้งราชบัณฑิตกิตติมศักดิ์"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยหลักเกณฑ์และวิธีการในการแต่งตั้งราชบัณฑิตกิตติมศักดิ์ พ.ศ. ๒๕๖๙",
   "latest": true,
   "subject": "สมาชิก",
   "year": 2569,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000242.pdf"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยการให้สมาชิกราชบัณฑิตยสภาพ้นจากตำแหน่ง"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการให้สมาชิกราชบัณฑิตยสภาพ้นจากตำแหน่ง พ.ศ. ๒๕๕๙",
   "subject": "สมาชิก",
   "year": 2559,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000193.pdf"
  },
  {
   "group": "elect",
   "title": {
    "th": "ว่าด้วยหลักเกณฑ์และวิธีการในการเลือกนายกราชบัณฑิตยสภา และอุปนายกราชบัณฑิตยสภา"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยหลักเกณฑ์และวิธีการในการเลือกนายกราชบัณฑิตยสภา และอุปนายกราชบัณฑิตยสภา พ.ศ. ๒๕๖๓",
   "subject": "การเลือกผู้บริหาร",
   "year": 2563,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000159.pdf"
  },
  {
   "group": "elect",
   "title": {
    "th": "ว่าด้วยหลักเกณฑ์และวิธีการเลือกประธานสำนักและเลขานุการสำนัก"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยหลักเกณฑ์และวิธีการเลือกประธานสำนักและเลขานุการสำนัก พ.ศ. ๒๕๖๗",
   "subject": "การเลือกผู้บริหาร",
   "year": 2567,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000235.pdf"
  },
  {
   "group": "elect",
   "title": {
    "th": "ว่าด้วยการแต่งตั้งและวาระการดำรงตำแหน่งของกรรมการผู้ทรงคุณวุฒิ และการประชุมของคณะกรรมการกิจการสำนักงานราชบัณฑิตยสภา"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการแต่งตั้งและวาระการดำรงตำแหน่งของกรรมการผู้ทรงคุณวุฒิ และการประชุมของคณะกรรมการกิจการสำนักงานราชบัณฑิตยสภา",
   "subject": "การเลือกผู้บริหาร",
   "lang": "th",
   "href": "../assets/docs/bylaws/00000061.pdf"
  },
  {
   "group": "meet",
   "title": {
    "th": "ว่าด้วยการประชุมราชบัณฑิตยสภา"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการประชุมราชบัณฑิตยสภา พ.ศ. ๒๕๖๓",
   "subject": "การประชุม",
   "year": 2563,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000154.pdf"
  },
  {
   "group": "meet",
   "title": {
    "th": "ว่าด้วยการประชุมสำนัก"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการประชุมสำนัก พ.ศ. ๒๕๖๓",
   "subject": "การประชุม",
   "year": 2563,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000155.pdf"
  },
  {
   "group": "work",
   "title": {
    "th": "ว่าด้วยการกำหนดประเภทวิชาในแต่ละสำนัก และการแบ่งประเภทวิชาออกเป็นสาขาวิชา"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการกำหนดประเภทวิชาในแต่ละสำนัก และการแบ่งประเภทวิชาออกเป็นสาขาวิชา พ.ศ. ๒๕๖๘",
   "subject": "งานวิชาการ",
   "year": 2568,
   "lang": "th",
   "href": "../assets/docs/bylaws/00000236.pdf"
  },
  {
   "group": "work",
   "title": {
    "th": "ว่าด้วยการให้บริการทางวิชาการ การจัดการศึกษาอบรมและพัฒนาทางวิชาการ และการเรียกเก็บค่าใช้จ่าย ค่าธรรมเนียมและค่าบริการ"
   },
   "full": "ข้อบังคับราชบัณฑิตยสภา ว่าด้วยการให้บริการทางวิชาการ การจัดการศึกษาอบรมและพัฒนาทางวิชาการ และการเรียกเก็บค่าใช้จ่าย ค่าธรรมเนียมและค่าบริการ",
   "subject": "งานวิชาการ",
   "lang": "th",
   "href": "../assets/docs/bylaws/00000170.pdf"
  }
 ],
 "rules": [
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยเงินอุปการะและเงินอุปการะพิเศษราชบัณฑิตและภาคีสมาชิก"
   },
   "full": "ระเบียบราชบัณฑิตยสภา ว่าด้วยเงินอุปการะและเงินอุปการะพิเศษราชบัณฑิตและภาคีสมาชิก พ.ศ. ๒๕๖๗",
   "subject": "สมาชิกและสวัสดิการ",
   "year": 2567,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000247.PDF"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยกองทุนสวัสดิการ การจัดสวัสดิการ การสงเคราะห์และสิทธิประโยชน์อื่นแก่สมาชิกราชบัณฑิตยสภา"
   },
   "full": "ระเบียบราชบัณฑิตยสภา ว่าด้วยกองทุนสวัสดิการ การจัดสวัสดิการ การสงเคราะห์และสิทธิประโยชน์อื่นแก่สมาชิกราชบัณฑิตยสภา พ.ศ. ๒๕๖๐",
   "subject": "สมาชิกและสวัสดิการ",
   "year": 2560,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000090.PDF"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยแนวทางปฏิบัติในการรับบุคคลเป็นภาคีสมาชิกและการแต่งตั้ง"
   },
   "full": "ระเบียบราชบัณฑิตยสภา ว่าด้วยแนวทางปฏิบัติในการรับบุคคลเป็นภาคีสมาชิกและการแต่งตั้ง พ.ศ. ๒๕๔๖",
   "subject": "สมาชิกและสวัสดิการ",
   "year": 2546,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000088.PDF"
  },
  {
   "group": "members",
   "title": {
    "th": "ว่าด้วยการประดับเข็มเครื่องหมาย"
   },
   "full": "ระเบียบสภาราชบัณฑิต ว่าด้วยการประดับเข็มเครื่องหมาย พ.ศ. ๒๕๔๘",
   "subject": "สมาชิกและสวัสดิการ",
   "year": 2548,
   "lang": "th",
   "issuer": "สภาราชบัณฑิต",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000248.PDF"
  },
  {
   "group": "funds",
   "title": {
    "th": "ว่าด้วยเงินกองทุนส่งเสริมกิจการราชบัณฑิตยสถาน"
   },
   "full": "ระเบียบราชบัณฑิตยสภา ว่าด้วยเงินกองทุนส่งเสริมกิจการราชบัณฑิตยสถาน พ.ศ. ๒๕๔๙",
   "subject": "การเงินและกองทุน",
   "year": 2549,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000086.PDF"
  },
  {
   "group": "funds",
   "title": {
    "th": "ว่าด้วยค่าใช้จ่ายในกิจการราชบัณฑิตยสถาน"
   },
   "full": "ระเบียบราชบัณฑิตยสถาน ว่าด้วยค่าใช้จ่ายในกิจการราชบัณฑิตยสถาน พ.ศ. ๒๕๓๓",
   "subject": "การเงินและกองทุน",
   "year": 2533,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสถาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000245.PDF"
  },
  {
   "group": "funds",
   "title": {
    "th": "ว่าด้วยเงินทุนพิมพ์ตำรา"
   },
   "full": "ระเบียบราชบัณฑิตยสถาน ว่าด้วยเงินทุนพิมพ์ตำรา พ.ศ. ๒๕๓๑",
   "subject": "การเงินและกองทุน",
   "year": 2531,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสถาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000246.PDF"
  },
  {
   "group": "authors",
   "title": {
    "th": "ว่าด้วยการจ่ายเงินตอบแทนผู้แต่ง แปล หรือเรียบเรียงหนังสือ (ฉบับที่ ๒)"
   },
   "full": "ระเบียบราชบัณฑิตยสถาน ว่าด้วยการจ่ายเงินตอบแทนผู้แต่ง แปล หรือเรียบเรียงหนังสือ (ฉบับที่ ๒) พ.ศ. ๒๕๓๙",
   "subject": "การแต่งและเรียบเรียงหนังสือ",
   "year": 2539,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสถาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000243.PDF"
  },
  {
   "group": "authors",
   "title": {
    "th": "ว่าด้วยการจ่ายเงินตอบแทนผู้แต่ง แปล หรือเรียบเรียงหนังสือ"
   },
   "full": "ระเบียบราชบัณฑิตยสถาน ว่าด้วยการจ่ายเงินตอบแทนผู้แต่ง แปล หรือเรียบเรียงหนังสือ พ.ศ. ๒๕๒๕",
   "subject": "การแต่งและเรียบเรียงหนังสือ",
   "year": 2525,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสถาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000244.PDF"
  },
  {
   "group": "authors",
   "title": {
    "th": "ว่าด้วยการแต่ง เรียบเรียงหนังสือหรือตำราทางวิชาการของนักวรรณศิลป์ (ฉบับที่ ๒)"
   },
   "full": "ระเบียบราชบัณฑิตยสถาน ว่าด้วยการแต่ง เรียบเรียงหนังสือหรือตำราทางวิชาการของนักวรรณศิลป์ (ฉบับที่ ๒) พ.ศ. ๒๕๕๗",
   "subject": "การแต่งและเรียบเรียงหนังสือ",
   "year": 2557,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสถาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000102.PDF"
  },
  {
   "group": "authors",
   "title": {
    "th": "ว่าด้วยการแต่ง เรียบเรียงหนังสือหรือตำราทางวิชาการของนักวรรณศิลป์"
   },
   "full": "ระเบียบราชบัณฑิตยสถาน ว่าด้วยการแต่ง เรียบเรียงหนังสือหรือตำราทางวิชาการของนักวรรณศิลป์ พ.ศ. ๒๕๕๕",
   "subject": "การแต่งและเรียบเรียงหนังสือ",
   "year": 2555,
   "lang": "th",
   "issuer": "ราชบัณฑิตยสถาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000240.PDF"
  },
  {
   "group": "publish",
   "title": {
    "th": "ว่าด้วยการกำหนดราคาจำหน่ายหนังสือของสำนักงานราชบัณฑิตยสภา"
   },
   "full": "ระเบียบสำนักงานราชบัณฑิตยสภา ว่าด้วยการกำหนดราคาจำหน่ายหนังสือของสำนักงานราชบัณฑิตยสภา พ.ศ. ๒๕๖๓",
   "subject": "หนังสือและการเผยแพร่",
   "year": 2563,
   "lang": "th",
   "issuer": "สำนักงานราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000239.PDF"
  },
  {
   "group": "publish",
   "title": {
    "th": "ว่าด้วยการให้อภินันทนาการหนังสือที่สำนักงานราชบัณฑิตยสภาผลิตขึ้นเพื่อเผยแพร่และจำหน่าย"
   },
   "full": "ระเบียบสำนักงานราชบัณฑิตยสภา ว่าด้วยการให้อภินันทนาการหนังสือที่สำนักงานราชบัณฑิตยสภาผลิตขึ้นเพื่อเผยแพร่และจำหน่าย พ.ศ. ๒๕๖๙",
   "latest": true,
   "subject": "หนังสือและการเผยแพร่",
   "year": 2569,
   "lang": "th",
   "issuer": "สำนักงานราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000238.PDF"
  },
  {
   "group": "publish",
   "title": {
    "th": "ว่าด้วยการอนุญาตให้ใช้สิทธิในการจัดพิมพ์และจำหน่ายหนังสือที่สำนักงานราชบัณฑิตยสภาผลิตขึ้น"
   },
   "full": "ระเบียบสำนักงานราชบัณฑิตยสภา ว่าด้วยการอนุญาตให้ใช้สิทธิในการจัดพิมพ์และจำหน่ายหนังสือที่สำนักงานราชบัณฑิตยสภาผลิตขึ้น",
   "subject": "หนังสือและการเผยแพร่",
   "lang": "th",
   "issuer": "สำนักงานราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000097.PDF"
  },
  {
   "group": "publish",
   "title": {
    "th": "ว่าด้วยการอนุญาตให้จัดพิมพ์และเผยแพร่สิ่งพิมพ์ สื่ออิเล็กทรอนิกส์ ข้อมูลอิเล็กทรอนิกส์ และสื่ออื่น ๆ"
   },
   "full": "ระเบียบสำนักงานราชบัณฑิตยสภา ว่าด้วยการอนุญาตให้จัดพิมพ์และเผยแพร่สิ่งพิมพ์ สื่ออิเล็กทรอนิกส์ ข้อมูลอิเล็กทรอนิกส์ และสื่ออื่น ๆ",
   "subject": "หนังสือและการเผยแพร่",
   "lang": "th",
   "issuer": "สำนักงานราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000100.PDF"
  },
  {
   "group": "publish",
   "title": {
    "th": "แบบคำขออนุญาตจัดพิมพ์หรือใช้สิ่งพิมพ์ สื่ออิเล็กทรอนิกส์ และสื่ออื่น ๆ ของสำนักงานราชบัณฑิตยสภา"
   },
   "full": "แบบคำขออนุญาตจัดพิมพ์หรือใช้สิ่งพิมพ์ สื่ออิเล็กทรอนิกส์ และสื่ออื่น ๆ ของสำนักงานราชบัณฑิตยสภา",
   "subject": "หนังสือและการเผยแพร่",
   "form": "ใช้คู่กับระเบียบการอนุญาตจัดพิมพ์",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000101.PDF"
  },
  {
   "group": "office",
   "title": {
    "th": "ว่าด้วยการจัดสวัสดิการภายในสำนักงานราชบัณฑิตยสภา"
   },
   "full": "ระเบียบสำนักงานราชบัณฑิตยสภา ว่าด้วยการจัดสวัสดิการภายในสำนักงานราชบัณฑิตยสภา พ.ศ. ๒๕๖๘",
   "subject": "สวัสดิการภายในสำนักงาน",
   "year": 2568,
   "lang": "th",
   "issuer": "สำนักงานราชบัณฑิตยสภา",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000093.PDF"
  },
  {
   "group": "office",
   "title": {
    "th": "ว่าด้วยการสงเคราะห์สมาชิก"
   },
   "full": "ระเบียบสวัสดิการสำนักงานราชบัณฑิตยสภา ว่าด้วยการสงเคราะห์สมาชิก พ.ศ. ๒๕๖๒",
   "subject": "สวัสดิการภายในสำนักงาน",
   "year": 2562,
   "lang": "th",
   "issuer": "สวัสดิการสำนักงาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000094.PDF"
  },
  {
   "group": "office",
   "title": {
    "th": "ว่าด้วยการให้กู้ยืมเงินสวัสดิการ"
   },
   "full": "ระเบียบสวัสดิการสำนักงานราชบัณฑิตยสภา ว่าด้วยการให้กู้ยืมเงินสวัสดิการ พ.ศ. ๒๕๖๒",
   "subject": "สวัสดิการภายในสำนักงาน",
   "year": 2562,
   "lang": "th",
   "issuer": "สวัสดิการสำนักงาน",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000241.PDF"
  }
 ],
 "announcements": [
  {
   "group": "associates",
   "title": {
    "th": "รับสมัครคัดเลือกเพื่อแต่งตั้งเป็นภาคีสมาชิก สำนักวิทยาศาสตร์"
   },
   "full": "รับสมัครคัดเลือกเพื่อแต่งตั้งเป็นภาคีสมาชิก สำนักวิทยาศาสตร์",
   "subject": "ภาคีสมาชิก",
   "academy": "science",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000107.PDF"
  },
  {
   "group": "associates",
   "title": {
    "th": "แต่งตั้งนางสาวกรรณิการ์ วิมลเกษม เป็นภาคีสมาชิก สำนักศิลปกรรม"
   },
   "full": "แต่งตั้งนางสาวกรรณิการ์ วิมลเกษม เป็นภาคีสมาชิก สำนักศิลปกรรม",
   "subject": "ภาคีสมาชิก",
   "academy": "arts",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000109.PDF"
  },
  {
   "group": "associates",
   "title": {
    "th": "แต่งตั้งศาสตราจารย์สุกัญญา สุดบรรทัด เป็นภาคีสมาชิก สำนักธรรมศาสตร์และการเมือง"
   },
   "full": "แต่งตั้งศาสตราจารย์สุกัญญา สุดบรรทัด เป็นภาคีสมาชิก สำนักธรรมศาสตร์และการเมือง",
   "subject": "ภาคีสมาชิก",
   "academy": "moral",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000110.PDF"
  },
  {
   "group": "associates",
   "title": {
    "th": "แต่งตั้งนายเลิศศิริร์ บวรกิตติ เป็นภาคีสมาชิก สำนักวิทยาศาสตร์"
   },
   "full": "แต่งตั้งนายเลิศศิริร์ บวรกิตติ เป็นภาคีสมาชิก สำนักวิทยาศาสตร์",
   "subject": "ภาคีสมาชิก",
   "academy": "science",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000111.PDF"
  },
  {
   "group": "associates",
   "title": {
    "th": "แต่งตั้งศาสตราจารย์ ดร.วัลลภ สุระกำพลธร เป็นภาคีสมาชิก สำนักวิทยาศาสตร์"
   },
   "full": "แต่งตั้งศาสตราจารย์ ดร.วัลลภ สุระกำพลธร เป็นภาคีสมาชิก สำนักวิทยาศาสตร์",
   "subject": "ภาคีสมาชิก",
   "academy": "science",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000113.PDF"
  },
  {
   "group": "associates",
   "title": {
    "th": "แต่งตั้งศาสตราจารย์ ดร.ปริญญา จินดาประเสริฐ เป็นภาคีสมาชิก สำนักวิทยาศาสตร์"
   },
   "full": "แต่งตั้งศาสตราจารย์ ดร.ปริญญา จินดาประเสริฐ เป็นภาคีสมาชิก สำนักวิทยาศาสตร์",
   "subject": "ภาคีสมาชิก",
   "academy": "science",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000114.PDF"
  },
  {
   "group": "associates",
   "title": {
    "th": "แต่งตั้งภาคีสมาชิก สำนักธรรมศาสตร์และการเมือง"
   },
   "full": "แต่งตั้งภาคีสมาชิก สำนักธรรมศาสตร์และการเมือง",
   "subject": "ภาคีสมาชิก",
   "academy": "moral",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000118.PDF"
  },
  {
   "group": "posts",
   "title": {
    "th": "แต่งตั้งประธานสำนักและเลขานุการสำนักศิลปกรรม"
   },
   "full": "แต่งตั้งประธานสำนักและเลขานุการสำนักศิลปกรรม",
   "subject": "ผู้บริหารสำนักและโฆษก",
   "academy": "arts",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000106.PDF"
  },
  {
   "group": "posts",
   "title": {
    "th": "แต่งตั้งประธานสำนักธรรมศาสตร์และการเมือง"
   },
   "full": "แต่งตั้งประธานสำนักธรรมศาสตร์และการเมือง",
   "subject": "ผู้บริหารสำนักและโฆษก",
   "academy": "moral",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000117.PDF"
  },
  {
   "group": "posts",
   "title": {
    "th": "แต่งตั้งประธานสำนักและเลขานุการสำนักวิทยาศาสตร์"
   },
   "full": "แต่งตั้งประธานสำนักและเลขานุการสำนักวิทยาศาสตร์",
   "subject": "ผู้บริหารสำนักและโฆษก",
   "academy": "science",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000120.PDF"
  },
  {
   "group": "posts",
   "title": {
    "th": "ยกเลิกและแต่งตั้งโฆษกราชบัณฑิตยสถาน รองโฆษกราชบัณฑิตยสถาน"
   },
   "full": "ยกเลิกและแต่งตั้งโฆษกราชบัณฑิตยสถาน รองโฆษกราชบัณฑิตยสถาน",
   "subject": "ผู้บริหารสำนักและโฆษก",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000115.PDF"
  },
  {
   "group": "guidance",
   "title": {
    "th": "แนวทางการเผยแพร่ข้อมูลต่อสาธารณะผ่านเว็บไซต์ของสำนักงานราชบัณฑิตยสภา"
   },
   "full": "ประกาศสำนักงานราชบัณฑิตยสภา เรื่อง แนวทางการเผยแพร่ข้อมูลต่อสาธารณะผ่านเว็บไซต์ของสำนักงานราชบัณฑิตยสภา",
   "subject": "แนวทางการดำเนินงาน",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000105.PDF"
  },
  {
   "group": "guidance",
   "title": {
    "th": "มาตรฐานทางคุณธรรมและจริยธรรมของเจ้าหน้าที่ราชบัณฑิตยสถาน"
   },
   "full": "มาตรฐานทางคุณธรรมและจริยธรรมของเจ้าหน้าที่ราชบัณฑิตยสถาน",
   "subject": "แนวทางการดำเนินงาน",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000125.PDF"
  },
  {
   "group": "guidance",
   "title": {
    "th": "หลักเกณฑ์และวิธีการประเมินผลการปฏิบัติราชการของข้าราชการราชบัณฑิตยสถาน"
   },
   "full": "หลักเกณฑ์และวิธีการประเมินผลการปฏิบัติราชการของข้าราชการราชบัณฑิตยสถาน",
   "subject": "แนวทางการดำเนินงาน",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000121.PDF"
  },
  {
   "group": "guidance",
   "title": {
    "th": "การกำหนดระยะเวลาแล้วเสร็จของงาน พ.ศ. ๒๕๔๘"
   },
   "full": "การกำหนดระยะเวลาแล้วเสร็จของงาน พ.ศ. ๒๕๔๘",
   "subject": "แนวทางการดำเนินงาน",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000126.PDF"
  },
  {
   "group": "guidance",
   "title": {
    "th": "หลักเกณฑ์และเงื่อนไขการเข้าร่วมมาตรการปรับปรุงอัตรากำลังของราชบัณฑิตยสถาน"
   },
   "full": "หลักเกณฑ์และเงื่อนไขการเข้าร่วมมาตรการปรับปรุงอัตรากำลังของราชบัณฑิตยสถาน",
   "subject": "แนวทางการดำเนินงาน",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000119.PDF"
  },
  {
   "group": "awards",
   "title": {
    "th": "หลักเกณฑ์และวิธีการจัดสรรเงินรางวัล ประจำปีงบประมาณ พ.ศ. ๒๕๕๕"
   },
   "full": "หลักเกณฑ์และวิธีการจัดสรรเงินรางวัล ประจำปีงบประมาณ พ.ศ. ๒๕๕๕",
   "subject": "เงินรางวัลและสิทธิประโยชน์",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000112.PDF"
  },
  {
   "group": "awards",
   "title": {
    "th": "หลักเกณฑ์และวิธีการจัดสรรเงินรางวัล ประจำปีงบประมาณ พ.ศ. ๒๕๕๔"
   },
   "full": "หลักเกณฑ์และวิธีการจัดสรรเงินรางวัล ประจำปีงบประมาณ พ.ศ. ๒๕๕๔",
   "subject": "เงินรางวัลและสิทธิประโยชน์",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000116.PDF"
  },
  {
   "group": "awards",
   "title": {
    "th": "ขอให้ราชบัณฑิตได้รับพระราชทานน้ำอาบศพและได้รับพระราชทานเพลิงศพ"
   },
   "full": "ขอให้ราชบัณฑิตได้รับพระราชทานน้ำอาบศพและได้รับพระราชทานเพลิงศพ",
   "subject": "เงินรางวัลและสิทธิประโยชน์",
   "lang": "th",
   "href": "https://www.orst.go.th/FILEROOM/CABROYINWEB/DRAWER001/GENERAL/DATA0000/00000122.PDF"
  }
 ]
};
