/* ============================================================================
 * data/publications.js — Publications for pages/publication.html?id=<id>
 * ============================================================================
 *
 *  SAMPLE CONTENT. Titles follow the series on pages/publications.html;
 *  issues, contents, authors (the site's fictional Fellows), page counts and
 *  sizes are stand-ins. No ISSN/ISBN is shown until the Office supplies them.
 *  TODO (Office): replace with the real catalogue and link each PDF.
 *
 *  Fields
 *    id          used in the URL (?id=)
 *    kind        key of RS_PUB_KINDS (sets the label and the cover colour)
 *    series      the series name; issue is the issue or edition line
 *    date        ISO date of publication
 *    title       { th, en }
 *    summary     Thai paragraphs (HTML allowed)
 *    editor      editor or compiler; publisher
 *    pages, lang, size (of the PDF)
 *    contents    optional table of contents: [{ title, authors, page }]
 *    online      optional link to read online (an external e-book page)
 * ========================================================================== */

window.RS_PUB_KINDS = {
  journal:    { th: 'วารสาร', en: 'Journal' },
  whitepaper: { th: 'สมุดปกขาว', en: 'White paper' },
  report:     { th: 'รายงานประจำปี', en: 'Annual report' },
  newsletter: { th: 'จดหมายข่าว', en: 'Newsletter' },
  bulletin:   { th: 'จุลสาร', en: 'Bulletin' }
};

window.RS_PUBLICATIONS = [
  {
    id: 'journal-2569-1',
    kind: 'journal',
    series: { th: 'วารสารราชบัณฑิตยสภา', en: 'Journal of the Royal Society of Thailand' },
    issue: { th: 'ฉบับที่ ๑ มกราคม–มิถุนายน ๒๕๖๙', en: 'No. 1, January–June 2026' },
    date: '2026-06-30',
    title: { th: 'วารสารราชบัณฑิตยสภา ฉบับที่ ๑ ประจำปี ๒๕๖๙', en: 'Journal of the Royal Society of Thailand, No. 1, 2026' },
    summary: [
      '<p>วารสารราชบัณฑิตยสภาเป็นวารสารวิชาการราย ๖ เดือน รวบรวมบทความวิจัยและบทความวิชาการของราชบัณฑิต ภาคีสมาชิก และผู้ทรงคุณวุฒิจากทั้งสามสำนัก บทความทุกเรื่องผ่านการประเมินโดยผู้ทรงคุณวุฒิ</p>',
      '<p>ฉบับนี้มีบทความ ๕ เรื่อง ครอบคลุมภาษาไทยในสื่อดิจิทัล ภาษากฎหมาย ศัพท์วิทยาศาสตร์ ประวัติศาสตร์ศิลปะ และนโยบายการศึกษา</p>'
    ],
    editor: { th: 'กองบรรณาธิการวารสารราชบัณฑิตยสภา', en: 'Journal editorial office' },
    publisher: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    pages: 186,
    lang: { th: 'ไทย (บทคัดย่อภาษาอังกฤษ)', en: 'Thai, with English abstracts' },
    size: '6.4 MB',
    contents: [
      { title: { th: 'ภาษาไทยในสื่อสังคมออนไลน์: ความเปลี่ยนแปลงของคำและความหมาย', en: 'Thai on social media: changing words and meanings' }, authors: { th: 'อรุณี ศรีสกุล', en: 'Arunee Srisakun' }, page: 1 },
      { title: { th: 'ภาษากฎหมายที่ประชาชนเข้าใจได้: ข้อเสนอเพื่อการร่างกฎหมาย', en: 'Legal language the public can understand' }, authors: { th: 'กิตติ วัฒนพงศ์', en: 'Kitti Wattanapong' }, page: 29 },
      { title: { th: 'การบัญญัติศัพท์วิทยาศาสตร์ข้อมูลเป็นภาษาไทย', en: 'Coining Thai terms for data science' }, authors: { th: 'ประเสริฐ ธนวัฒน์ และ นภา อินทรวิชัย', en: 'Prasert Thanawat and Napa Intharawichai' }, page: 63 },
      { title: { th: 'จิตรกรรมฝาผนังในพระอุโบสถสมัยรัตนโกสินทร์ตอนต้น', en: 'Early Rattanakosin temple murals' }, authors: { th: 'มาลัย จันทโรจน์', en: 'Malai Chantharot' }, page: 97 },
      { title: { th: 'นโยบายการศึกษากับการพัฒนาทักษะภาษาของนักเรียนไทย', en: 'Education policy and the language skills of Thai students' }, authors: { th: 'วรรณา บุญยเกียรติ', en: 'Wanna Bunyakiat' }, page: 141 }
    ]
  },
  {
    id: 'journal-2568-2',
    kind: 'journal',
    series: { th: 'วารสารราชบัณฑิตยสภา', en: 'Journal of the Royal Society of Thailand' },
    issue: { th: 'ฉบับที่ ๒ กรกฎาคม–ธันวาคม ๒๕๖๘', en: 'No. 2, July–December 2025' },
    date: '2025-12-30',
    title: { th: 'วารสารราชบัณฑิตยสภา ฉบับที่ ๒ ประจำปี ๒๕๖๘', en: 'Journal of the Royal Society of Thailand, No. 2, 2025' },
    summary: [
      '<p>ฉบับนี้รวบรวมบทความจากการประชุมวิชาการประจำปีของราชบัณฑิตยสภา ทั้งด้านภาษา ประวัติศาสตร์ วิทยาศาสตร์ และสังคมศาสตร์</p>'
    ],
    editor: { th: 'กองบรรณาธิการวารสารราชบัณฑิตยสภา', en: 'Journal editorial office' },
    publisher: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    pages: 172,
    lang: { th: 'ไทย (บทคัดย่อภาษาอังกฤษ)', en: 'Thai, with English abstracts' },
    size: '5.9 MB',
    contents: [
      { title: { th: 'ร้อยปีราชบัณฑิตยสภา: พัฒนาการของสถาบันวิชาการ', en: 'A century of the Royal Society' }, authors: { th: 'สุรชัย พิพัฒน์สกุล', en: 'Surachai Phiphatsakun' }, page: 1 },
      { title: { th: 'คำยืมภาษาอังกฤษในภาษาไทยร่วมสมัย', en: 'English loanwords in contemporary Thai' }, authors: { th: 'อรุณี ศรีสกุล', en: 'Arunee Srisakun' }, page: 35 },
      { title: { th: 'การจัดการน้ำในลุ่มเจ้าพระยา: มุมมองทางวิทยาศาสตร์', en: 'Water management in the Chao Phraya basin' }, authors: { th: 'ธนา เกษมสุข', en: 'Thana Kasemsuk' }, page: 71 },
      { title: { th: 'ดนตรีไทยในพระราชพิธี', en: 'Thai music in royal ceremonies' }, authors: { th: 'มาลัย จันทโรจน์', en: 'Malai Chantharot' }, page: 118 }
    ]
  },
  {
    id: 'whitepaper-digital-thai',
    kind: 'whitepaper',
    series: { th: 'สมุดปกขาวราชบัณฑิตยสภา', en: 'Royal Society white papers' },
    issue: { th: 'พิมพ์ครั้งที่ ๑ พ.ศ. ๒๕๖๙', en: 'First edition, 2026' },
    date: '2026-05-15',
    title: { th: 'สมุดปกขาว การใช้ภาษาไทยในสื่อดิจิทัล', en: 'White paper: Thai in digital media' },
    summary: [
      '<p>สมุดปกขาวฉบับนี้สรุปสถานการณ์การใช้ภาษาไทยในสื่อดิจิทัล และเสนอแนวทางต่อหน่วยงานภาครัฐ สถานศึกษา และสื่อมวลชน เพื่อส่งเสริมการใช้ภาษาไทยที่ถูกต้องและเหมาะสม</p>',
      '<p>ข้อเสนอแบ่งเป็น ๓ ด้าน คือ การศึกษา สื่อสารมวลชน และการให้บริการภาครัฐ พร้อมตัวชี้วัดที่ใช้ติดตามผล</p>'
    ],
    editor: { th: 'คณะกรรมการจัดทำสมุดปกขาว', en: 'White paper committee' },
    publisher: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    pages: 64,
    lang: { th: 'ไทย', en: 'Thai' },
    size: '2.1 MB',
    contents: [
      { title: { th: 'บทสรุปผู้บริหาร', en: 'Executive summary' }, authors: null, page: 1 },
      { title: { th: 'สถานการณ์ภาษาไทยในสื่อดิจิทัล', en: 'Thai in digital media today' }, authors: null, page: 7 },
      { title: { th: 'ข้อเสนอด้านการศึกษา', en: 'Proposals: education' }, authors: null, page: 25 },
      { title: { th: 'ข้อเสนอด้านสื่อสารมวลชนและภาครัฐ', en: 'Proposals: media and government' }, authors: null, page: 41 },
      { title: { th: 'ตัวชี้วัดและการติดตามผล', en: 'Indicators and follow-up' }, authors: null, page: 57 }
    ]
  },
  {
    id: 'annual-report-2568',
    kind: 'report',
    series: { th: 'รายงานประจำปีราชบัณฑิตยสภา', en: 'Royal Society annual reports' },
    issue: { th: 'ปีงบประมาณ พ.ศ. ๒๕๖๘', en: 'Fiscal year 2025' },
    date: '2026-03-31',
    title: { th: 'รายงานประจำปี ๒๕๖๘ ราชบัณฑิตยสภา', en: 'Annual report 2025' },
    summary: [
      '<p>รายงานผลการดำเนินงานของราชบัณฑิตยสภาและสำนักงานราชบัณฑิตยสภาในปีงบประมาณ พ.ศ. ๒๕๖๘ ทั้งงานวิชาการ การบัญญัติศัพท์ การจัดทำพจนานุกรม และการเผยแพร่ความรู้สู่สังคม</p>'
    ],
    editor: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    publisher: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    pages: 120,
    lang: { th: 'ไทย', en: 'Thai' },
    size: '8.7 MB',
    contents: [
      { title: { th: 'สารจากนายกราชบัณฑิตยสภา', en: 'Message from the President' }, authors: null, page: 3 },
      { title: { th: 'ผลการดำเนินงานด้านวิชาการ', en: 'Academic work' }, authors: null, page: 11 },
      { title: { th: 'การเผยแพร่ความรู้สู่สังคม', en: 'Knowledge for society' }, authors: null, page: 58 },
      { title: { th: 'รายงานการเงิน', en: 'Financial report' }, authors: null, page: 97 }
    ]
  },
  {
    id: 'newsletter-2569-09',
    kind: 'newsletter',
    series: { th: 'จดหมายข่าวราชบัณฑิตยสภา', en: 'Royal Society newsletter' },
    issue: { th: 'ฉบับเดือนกันยายน ๒๕๖๙', en: 'September 2026' },
    date: '2026-09-01',
    title: { th: 'จดหมายข่าวราชบัณฑิตยสภา กันยายน ๒๕๖๙', en: 'Royal Society newsletter, September 2026' },
    summary: [
      '<p>ข่าวและความเคลื่อนไหวประจำเดือน กิจกรรมที่จะจัดขึ้น ศัพท์บัญญัติใหม่ และเกร็ดความรู้ภาษาไทยจากราชบัณฑิต</p>'
    ],
    editor: { th: 'กลุ่มงานประชาสัมพันธ์', en: 'Public relations' },
    publisher: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    pages: 12,
    lang: { th: 'ไทย', en: 'Thai' },
    size: '1.4 MB'
  },
  {
    id: 'science-bulletin-2569',
    kind: 'bulletin',
    series: { th: 'จุลสารสำนักวิทยาศาสตร์', en: 'Academy of Science bulletin' },
    issue: { th: 'ฉบับที่ ๓ พ.ศ. ๒๕๖๙', en: 'No. 3, 2026' },
    date: '2026-08-20',
    title: { th: 'จุลสารสำนักวิทยาศาสตร์ ฉบับที่ ๓', en: 'Academy of Science bulletin, No. 3' },
    summary: [
      '<p>เรื่องเล่าวิทยาศาสตร์อ่านง่ายจากราชบัณฑิตสำนักวิทยาศาสตร์ ฉบับนี้ว่าด้วยปัญญาประดิษฐ์กับชีวิตประจำวัน และศัพท์วิทยาศาสตร์ที่ควรรู้</p>'
    ],
    editor: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' },
    publisher: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    pages: 24,
    lang: { th: 'ไทย', en: 'Thai' },
    size: '3.0 MB'
  }
];
