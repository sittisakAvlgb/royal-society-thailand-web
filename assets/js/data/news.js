/* ============================================================================
 * data/news.js — News stories for pages/news-detail.html?id=<id>
 * ============================================================================
 *
 *  SAMPLE CONTENT. Titles, dates and photos match the home news band; the
 *  body text is a stand-in until the Office supplies each story.
 *  TODO (Office): replace body, facts and attachments with the real story.
 *
 *  Fields
 *    id          used in the URL (?id=)
 *    cat         key of RS_NEWS_CATS (the home band's filter uses the same keys,
 *                with "press" counted as news)
 *    label       optional category wording that overrides the cat's own
 *    date        ISO date of publication
 *    image       project-root path; fallback shows while the file is missing
 *    caption     photo caption
 *    title, dek  { th, en }
 *    by          who issued it
 *    body        Thai paragraphs (HTML allowed: <p>, <h2>, <ul>, <blockquote>)
 *    event       optional invitation card beside the story:
 *                { kind, date, start, finish, venue, map (true = the Office's
 *                  map link), seats, deadline (last day to register), register }
 *                The card works out its own status from today's date: days to
 *                go, registration closed, today, or already held.
 *    files       optional attachments: [{ name, size }]
 *    tags        optional keywords
 * ========================================================================== */

window.RS_NEWS_CATS = {
  news:         { th: 'ข่าว', en: 'News' },
  announcement: { th: 'ประกาศ', en: 'Announcement' },
  activity:     { th: 'กิจกรรม', en: 'Activity' },
  press:        { th: 'แถลงข่าว', en: 'Press release' }
};

window.RS_NEWS = [
  {
    id: 'public-lecture-digital-thai',
    cat: 'activity',
    label: { th: 'กิจกรรมสำคัญ', en: 'Key activity' },
    date: '2026-09-02',
    image: 'assets/images/news/news-lead.jpg',
    fallback: 'assets/images/hero/hero-1.jpg',
    caption: { th: 'บรรยากาศการบรรยายสาธารณะครั้งก่อน ณ สำนักงานราชบัณฑิตยสภา', en: 'A previous public lecture at the Office of the Royal Society' },
    title: { th: 'เปิดลงทะเบียนบรรยายสาธารณะ “ภาษาไทยในยุคดิจิทัล”', en: 'Registration opens for the public lecture “Thai in the digital age”' },
    dek: { th: 'เปิดให้ประชาชนทั่วไปเข้าร่วม พร้อมถ่ายทอดสดออนไลน์จากสำนักงาน ลงทะเบียนฟรี รับจำนวนจำกัด', en: 'Open to the public, with live streaming from the Office — registration is free and places are limited.' },
    by: { th: 'กลุ่มงานประชาสัมพันธ์ สำนักงานราชบัณฑิตยสภา', en: 'Public Relations, Office of the Royal Society' },
    body: [
      '<p>สำนักงานราชบัณฑิตยสภาขอเชิญประชาชน นักเรียน นักศึกษา ครู และผู้สนใจ เข้าร่วมฟังการบรรยายสาธารณะ เรื่อง “ภาษาไทยในยุคดิจิทัล” ซึ่งจะกล่าวถึงการเปลี่ยนแปลงของการใช้ภาษาไทยในสื่อออนไลน์ การสร้างคำใหม่ และแนวทางการใช้ภาษาให้ถูกต้องและเหมาะสมกับบริบท</p>',
      '<h2>เนื้อหาการบรรยาย</h2>',
      '<ul><li>ภาษาไทยในสื่อสังคมออนไลน์ ความเปลี่ยนแปลงที่ควรรู้</li><li>คำใหม่ ศัพท์บัญญัติ และคำทับศัพท์ เลือกใช้อย่างไร</li><li>เครื่องมือตรวจสอบคำและการสะกดของสำนักงานราชบัณฑิตยสภา</li><li>ช่วงถามตอบกับวิทยากร</li></ul>',
      '<p>ผู้เข้าร่วมในสถานที่จะได้รับเอกสารประกอบการบรรยาย และผู้ที่เข้าร่วมครบตามเวลาสามารถขอรับเกียรติบัตรได้ สำหรับผู้ที่ไม่สะดวกเดินทาง สามารถรับชมการถ่ายทอดสดได้ทางช่องทางออนไลน์ของสำนักงาน</p>',
      '<blockquote><p>ภาษาเปลี่ยนไปตามยุคสมัย แต่หลักของภาษายังเป็นเครื่องมือให้คนเข้าใจกันได้ตรงกัน</p></blockquote>',
      '<h2>การลงทะเบียน</h2>',
      '<p>ลงทะเบียนได้ตั้งแต่วันนี้ถึงวันที่ ๒๗ พฤศจิกายน ๒๕๖๙ หรือจนกว่าที่นั่งจะเต็ม ผู้ลงทะเบียนจะได้รับอีเมลยืนยันพร้อมลิงก์รับชมออนไลน์ก่อนวันงาน ๓ วัน</p>'
    ],
    /* TODO (Office): confirm the date, time, venue and closing date */
    event: {
      kind: { th: 'บรรยายสาธารณะ', en: 'Public lecture' },
      date: '2026-12-03',
      start: '13:30',
      finish: '16:00',
      venue: { th: 'ห้องประชุมใหญ่ สำนักงานราชบัณฑิตยสภา และออนไลน์', en: 'Main hall, Office of the Royal Society, and online' },
      map: true,
      seats: { th: '๒๐๐ ที่นั่ง · ไม่มีค่าใช้จ่าย', en: '200 places · free of charge' },
      deadline: '2026-11-27',
      register: 'pages/contact.html'
    },
    files: [{ name: { th: 'กำหนดการบรรยายสาธารณะ', en: 'Lecture programme' }, size: '320 KB' }],
    tags: [{ th: 'บรรยายสาธารณะ', en: 'Public lecture' }, { th: 'ภาษาไทย', en: 'Thai language' }, { th: 'สื่อดิจิทัล', en: 'Digital media' }]
  },
  {
    id: 'new-coined-terms',
    cat: 'announcement',
    date: '2026-08-27',
    image: 'assets/images/news/news-01.jpg',
    fallback: 'assets/images/hero/hero-1.jpg',
    caption: { th: 'การประชุมคณะกรรมการพิจารณาศัพท์', en: 'A meeting of the terminology committee' },
    title: { th: 'ประกาศเรื่องศัพท์ที่ผ่านการพิจารณาใหม่', en: 'Announcement on newly considered terms' },
    dek: { th: 'รายการศัพท์บัญญัติที่คณะกรรมการพิจารณาแล้วเสร็จ พร้อมคำอธิบายและตัวอย่างการใช้', en: 'Terms approved by the committee, with definitions and examples of use' },
    by: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    body: [
      '<p>สำนักงานราชบัณฑิตยสภาประกาศรายการศัพท์บัญญัติที่คณะกรรมการพิจารณาแล้วเสร็จในรอบนี้ เพื่อให้หน่วยงาน สถานศึกษา สื่อมวลชน และประชาชนนำไปใช้ให้เป็นแนวเดียวกัน</p>',
      '<p>ศัพท์ที่ประกาศครอบคลุมหลายสาขาวิชา ทั้งเทคโนโลยีสารสนเทศ วิทยาศาสตร์สุขภาพ และสังคมศาสตร์ แต่ละคำมีคำอธิบายความหมายและตัวอย่างการใช้ในประโยค</p>',
      '<h2>การนำไปใช้</h2>',
      '<p>ในงานเขียนวิชาการ ควรใช้ศัพท์บัญญัติและวงเล็บคำภาษาต่างประเทศกำกับเมื่อกล่าวถึงครั้งแรก ตรวจสอบศัพท์ทั้งหมดได้ที่ระบบศัพท์บัญญัติของสำนักงานราชบัณฑิตยสภา</p>'
    ],
    files: [{ name: { th: 'ประกาศรายการศัพท์บัญญัติ', en: 'List of approved terms' }, size: '1.2 MB' }],
    tags: [{ th: 'ศัพท์บัญญัติ', en: 'Coined terms' }]
  },
  {
    id: 'science-academic-meeting',
    cat: 'news',
    date: '2026-08-15',
    image: 'assets/images/news/news-02.jpg',
    fallback: 'assets/images/hero/hero-2.jpg',
    caption: { th: 'การประชุมวิชาการประจำปี สำนักวิทยาศาสตร์', en: 'The Academy of Science annual meeting' },
    title: { th: 'การประชุมวิชาการสำนักวิทยาศาสตร์', en: 'Academic meeting of the Academy of Science' },
    dek: { th: 'สรุปสาระการประชุมวิชาการประจำปี พร้อมบทคัดย่อของผลงานที่นำเสนอในที่ประชุม', en: 'Highlights of the annual meeting and abstracts of the papers presented' },
    by: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' },
    body: [
      '<p>สำนักวิทยาศาสตร์ ราชบัณฑิตยสภา จัดการประชุมวิชาการประจำปี โดยมีราชบัณฑิต ภาคีสมาชิก และนักวิชาการจากหลายสถาบันเข้าร่วมนำเสนอผลงาน</p>',
      '<p>การประชุมครั้งนี้มีการนำเสนอผลงานทั้งภาคบรรยายและภาคโปสเตอร์ ครอบคลุมสาขาวิทยาศาสตร์กายภาพ วิทยาศาสตร์ชีวภาพ และวิศวกรรมศาสตร์ พร้อมการอภิปรายเรื่องการใช้ศัพท์วิทยาศาสตร์ภาษาไทยในการสื่อสารกับสาธารณะ</p>',
      '<p>บทคัดย่อของผลงานที่นำเสนอจะรวบรวมเผยแพร่ในวารสารราชบัณฑิตยสภาฉบับถัดไป</p>'
    ],
    tags: [{ th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' }, { th: 'ประชุมวิชาการ', en: 'Conference' }]
  },
  {
    id: 'teacher-thai-camp',
    cat: 'activity',
    date: '2026-07-29',
    image: 'assets/images/news/news-03.jpg',
    fallback: 'assets/images/hero/hero-4.jpg',
    caption: { th: 'ครูผู้เข้าร่วมอบรมเชิงปฏิบัติการ', en: 'Teachers at the workshop' },
    title: { th: 'ค่ายภาษาไทยสำหรับครู', en: 'Thai language camp for teachers' },
    dek: { th: 'อบรมเชิงปฏิบัติการด้านหลักภาษาและการใช้ภาษาไทย สำหรับครูระดับมัธยมศึกษา', en: 'A workshop on Thai grammar and usage for secondary school teachers' },
    by: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    body: [
      '<p>สำนักงานราชบัณฑิตยสภาจัดค่ายภาษาไทยสำหรับครูระดับมัธยมศึกษา เพื่อเสริมความรู้ด้านหลักภาษาและการใช้ภาษาไทย และแลกเปลี่ยนแนวทางการสอนที่นำไปใช้ในห้องเรียนได้จริง</p>',
      '<p>กิจกรรมประกอบด้วยการบรรยายโดยราชบัณฑิต การฝึกปฏิบัติการใช้พจนานุกรมและระบบค้นคำ และการออกแบบกิจกรรมการเรียนรู้ร่วมกัน</p>',
      '<p>ครูที่ผ่านการอบรมครบตามหลักสูตรจะได้รับเกียรติบัตรจากสำนักงานราชบัณฑิตยสภา</p>'
    ],
    tags: [{ th: 'ครู', en: 'Teachers' }, { th: 'หลักภาษา', en: 'Grammar' }]
  },
  {
    id: 'centenary-press-release',
    cat: 'press',
    date: '2026-07-22',
    image: 'assets/images/news/news-04.jpg',
    fallback: 'assets/images/hero/hero-3.jpg',
    caption: { th: 'การแถลงข่าวโครงการ ๑๐๐ ปี ราชบัณฑิตยสภา', en: 'The centenary programme press conference' },
    title: { th: 'แถลงข่าวโครงการ ๑๐๐ ปี ราชบัณฑิตยสภา', en: 'Press release: centenary programme' },
    dek: { th: 'แผนงานและกิจกรรมตลอดปีในวาระครบรอบหนึ่งศตวรรษของราชบัณฑิตยสภา', en: 'The year-long programme marking a century of the Royal Society' },
    by: { th: 'กลุ่มงานประชาสัมพันธ์ สำนักงานราชบัณฑิตยสภา', en: 'Public Relations, Office of the Royal Society' },
    body: [
      '<p>ราชบัณฑิตยสภาแถลงข่าวโครงการเฉลิมฉลองวาระครบรอบ ๑๐๐ ปี นับจากการก่อตั้งเมื่อวันที่ ๑๙ เมษายน พ.ศ. ๒๔๖๙ โดยจัดกิจกรรมทางวิชาการต่อเนื่องตลอดปี</p>',
      '<h2>กิจกรรมหลักในโครงการ</h2>',
      '<ul><li>การประชุมวิชาการนานาชาติ</li><li>นิทรรศการประวัติราชบัณฑิตยสภา</li><li>การจัดพิมพ์หนังสือที่ระลึก</li><li>การบรรยายสาธารณะสัญจรในภูมิภาค</li></ul>',
      '<p>รายละเอียดและกำหนดการของแต่ละกิจกรรมจะประกาศผ่านเว็บไซต์และช่องทางสื่อสังคมออนไลน์ของสำนักงาน</p>'
    ],
    tags: [{ th: '๑๐๐ ปี', en: 'Centenary' }]
  },
  {
    id: 'journal-call-issue-3',
    cat: 'news',
    date: '2026-07-14',
    image: 'assets/images/news/news-05.jpg',
    fallback: 'assets/images/hero/hero-1.jpg',
    caption: { th: 'วารสารราชบัณฑิตยสภา', en: 'Journal of the Royal Society of Thailand' },
    title: { th: 'เปิดรับบทความวารสารราชบัณฑิตยสภา ฉบับที่ ๓', en: 'Call for papers, Journal issue 3' },
    dek: { th: 'เชิญชวนนักวิชาการส่งบทความเพื่อพิจารณาตีพิมพ์ ตามหลักเกณฑ์ที่กำหนด', en: 'Scholars are invited to submit papers for peer review' },
    by: { th: 'กองบรรณาธิการวารสารราชบัณฑิตยสภา', en: 'Journal editorial office' },
    body: [
      '<p>กองบรรณาธิการวารสารราชบัณฑิตยสภาขอเชิญนักวิชาการ อาจารย์ และนักวิจัย ส่งบทความวิจัยและบทความวิชาการเพื่อพิจารณาตีพิมพ์ในวารสารฉบับที่ ๓</p>',
      '<p>บทความทุกเรื่องจะผ่านการประเมินโดยผู้ทรงคุณวุฒิอย่างน้อย ๒ ท่าน แบบไม่เปิดเผยชื่อผู้เขียนและผู้ประเมิน ผู้เขียนควรศึกษาคำแนะนำการเตรียมต้นฉบับก่อนส่ง</p>'
    ],
    files: [{ name: { th: 'คำแนะนำการเตรียมต้นฉบับ', en: 'Author guidelines' }, size: '540 KB' }],
    tags: [{ th: 'วารสาร', en: 'Journal' }]
  },
  {
    id: 'associate-fellow-results-2569',
    cat: 'announcement',
    date: '2026-07-03',
    image: 'assets/images/news/news-06.jpg',
    fallback: 'assets/images/hero/hero-2.jpg',
    caption: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    title: { th: 'ประกาศผลการคัดเลือกภาคีสมาชิก ประจำปี ๒๕๖๙', en: 'Associate Fellow selection results 2026' },
    dek: { th: 'รายนามผู้ได้รับการคัดเลือกเป็นภาคีสมาชิกของแต่ละสำนัก พร้อมกำหนดการรับตำแหน่ง', en: 'Those selected as Associate Fellows of each academy, and the induction date' },
    by: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    body: [
      '<p>ราชบัณฑิตยสภาประกาศผลการคัดเลือกผู้ทรงคุณวุฒิเป็นภาคีสมาชิก ประจำปี ๒๕๖๙ ของสำนักธรรมศาสตร์และการเมือง สำนักวิทยาศาสตร์ และสำนักศิลปกรรม ตามรายนามในเอกสารแนบ</p>',
      '<p>ผู้ได้รับการคัดเลือกจะได้รับหนังสือแจ้งกำหนดการรับตำแหน่งจากสำนักงานราชบัณฑิตยสภาต่อไป</p>'
    ],
    files: [{ name: { th: 'ประกาศรายนามภาคีสมาชิก ประจำปี ๒๕๖๙', en: 'List of Associate Fellows 2026' }, size: '410 KB' }],
    tags: [{ th: 'ภาคีสมาชิก', en: 'Associate Fellows' }]
    },
  {
    id: 'enquiry-channels',
    cat: 'announcement',
    date: '2026-07-10',
    image: 'assets/images/hero/hero-3.jpg',
    caption: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    title: { th: 'ประกาศช่องทางสอบถามข้อมูลทางวิชาการ', en: 'Channels for academic enquiries' },
    dek: { th: 'สอบถามเรื่องคำศัพท์ การใช้ภาษาไทย และงานวิชาการของสำนักงานได้ทางโทรศัพท์ อีเมล และแบบฟอร์มออนไลน์', en: 'Ask about terms, Thai usage and the academic work of the Office by telephone, e-mail or the online form' },
    by: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    body: [
      '<p>สำนักงานราชบัณฑิตยสภาเปิดช่องทางให้ประชาชนสอบถามข้อมูลทางวิชาการ ทั้งเรื่องคำศัพท์ การสะกดคำ การใช้ภาษาไทย และผลงานของราชบัณฑิตยสภา</p>',
      '<p>สอบถามได้ทางโทรศัพท์ในวันและเวลาราชการ ทางอีเมล หรือผ่านแบบฟอร์มในหน้าติดต่อและมีส่วนร่วม เจ้าหน้าที่จะตอบกลับภายใน ๓ วันทำการ</p>'
    ],
    tags: [{ th: 'ติดต่อ', en: 'Contact' }]
  },
  {
    id: 'journal-new-issue',
    cat: 'news',
    date: '2026-06-30',
    image: 'assets/images/news/news-05.jpg',
    fallback: 'assets/images/hero/hero-2.jpg',
    caption: { th: 'วารสารราชบัณฑิตยสภา', en: 'Journal of the Royal Society of Thailand' },
    title: { th: 'เผยแพร่วารสารราชบัณฑิตยสภาฉบับใหม่', en: 'A new issue of the Journal is published' },
    dek: { th: 'วารสารฉบับล่าสุดรวบรวมบทความวิชาการจากราชบัณฑิตและภาคีสมาชิกทั้งสามสำนัก อ่านออนไลน์ได้ฟรี', en: 'The latest issue gathers papers by Fellows and Associate Fellows of all three academies, free to read online' },
    by: { th: 'กองบรรณาธิการวารสารราชบัณฑิตยสภา', en: 'Journal editorial office' },
    body: [
      '<p>กองบรรณาธิการวารสารราชบัณฑิตยสภาเผยแพร่วารสารฉบับใหม่ ซึ่งรวบรวมบทความวิชาการจากราชบัณฑิตและภาคีสมาชิกของสำนักธรรมศาสตร์และการเมือง สำนักวิทยาศาสตร์ และสำนักศิลปกรรม</p>',
      '<p>ผู้สนใจอ่านบทความฉบับเต็มได้ทางเว็บไซต์ของสำนักงาน และดาวน์โหลดเป็นไฟล์ PDF ได้ทุกบทความ <a href="publication.html?id=journal-2569-1">ดูสารบัญและดาวน์โหลดวารสารฉบับนี้</a></p>'
    ],
    tags: [{ th: 'วารสาร', en: 'Journal' }]
  }
];

/* ----------------------------------------------------------------------------
 * Photos and attachments for each story (shown under the story, beside each
 * other). SAMPLE: the albums reuse the site's stand-in photos and the extra
 * attachments are placeholders.
 * TODO (Office): each story's own photos (with captions) and real PDFs.
 *
 *    photos  [{ src, caption {th,en} }] — the first is the story's own photo
 *    files   [{ name {th,en}, size }]
 * -------------------------------------------------------------------------- */
(() => {
  const POOL = ['news/news-lead.jpg', 'news/news-01.jpg', 'news/news-02.jpg', 'news/news-03.jpg', 'news/news-04.jpg',
    'news/news-05.jpg', 'news/news-06.jpg', 'hero/hero-1.jpg', 'hero/hero-2.jpg', 'hero/hero-3.jpg', 'hero/hero-4.jpg'];
  const AMBIENCE = { th: 'ภาพบรรยากาศ', en: 'At the event' };
  const EXTRA_FILES = {
    'science-academic-meeting': [
      { name: { th: 'กำหนดการประชุมวิชาการ', en: 'Meeting programme' }, size: '410 KB' },
      { name: { th: 'บทคัดย่อการบรรยาย', en: 'Abstracts of the talks' }, size: '2.4 MB' }
    ],
    'teacher-thai-camp': [{ name: { th: 'รายละเอียดโครงการและใบสมัคร', en: 'Programme and application form' }, size: '380 KB' }],
    'centenary-press-release': [
      { name: { th: 'ข่าวแจก โครงการ ๑๐๐ ปี ราชบัณฑิตยสภา', en: 'Press release: centenary programme' }, size: '260 KB' },
      { name: { th: 'กำหนดการกิจกรรมตลอดปี ๒๕๖๙', en: 'Events through 2026' }, size: '690 KB' }
    ],
    'enquiry-channels': [{ name: { th: 'แบบฟอร์มสอบถามข้อมูลทางวิชาการ', en: 'Academic enquiry form' }, size: '150 KB' }],
    'journal-new-issue': [{ name: { th: 'สารบัญวารสารฉบับนี้', en: 'Contents of this issue' }, size: '210 KB' }]
  };

  (window.RS_NEWS || []).forEach((story, index) => {
    if (!story.photos) {
      const own = story.image;
      const others = POOL.map(name => `assets/images/${name}`).filter(src => src !== own);
      /* a different turn of the pool for each story, so albums do not all match */
      const start = (index * 3) % others.length;
      const picks = [...others.slice(start), ...others.slice(0, start)].slice(0, 5);
      story.photos = [{ src: own, caption: story.caption }, ...picks.map(src => ({ src, caption: AMBIENCE }))];
    }
    if (EXTRA_FILES[story.id]) story.files = [...(story.files || []), ...EXTRA_FILES[story.id]];
  });
})();
