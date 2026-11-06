/* ============================================================================
 * data/academies.js — content for the academy pages (pages/academy.html?id=)
 * ============================================================================
 *
 *  TODO (Office / Backend): replace with the CMS. The three academy websites
 *  are WordPress, so their posts can be migrated or read from the WordPress
 *  REST API (/wp-json/wp/v2/posts) into the same shape:
 *
 *    intro     { th, en }  a short paragraph about the academy
 *    photo     image path (optional) for the masthead; the Office building otherwise
 *    posts     [{ id, cat: 'activity' | 'article', title {th,en}, date 'YYYY-MM-DD',
 *                 excerpt {th,en}, image, href }]
 *    lectures  [{ title {th,en}, speaker {th,en}, date 'YYYY-MM-DD', place {th,en}, href }]
 *    links     [{ label {th,en}, href, external }]
 *
 *  Names, fields and website addresses live in RS_CONFIG.academies. Post
 *  titles are those published on each academy's website; the photographs are
 *  temporary ones from assets/images/news.
 * ========================================================================== */

window.RS_POST_CATS = {
  activity: { th: 'กิจกรรม', en: 'Activity' },
  article:  { th: 'บทความ', en: 'Article' }
};

window.RS_ACADEMY_PAGES = {
  moral: {
    intro: {
      th: 'สำนักธรรมศาสตร์และการเมืองศึกษา ค้นคว้า และวิจัยในสาขาปรัชญา นิติศาสตร์ รัฐศาสตร์ เศรษฐศาสตร์ สังคมศาสตร์ และประวัติศาสตร์ จัดทำศัพท์บัญญัติและพจนานุกรมเฉพาะสาขา และนำความรู้สู่สังคมผ่านการบรรยาย การประชุมวิชาการ และโครงการราชบัณฑิตสัญจร',
      en: 'The Academy of Moral and Political Sciences studies and researches philosophy, law, political science, economics, the social sciences and history; it coins terminology and compiles specialist dictionaries, and takes its work to the public through lectures, conferences and the Fellows on Tour programme.'
    },
    posts: [
      { id: 'moral-newsletter-3', cat: 'activity', date: '2026-01-20', image: 'assets/images/news/news-01.jpg', href: 'pages/article.html',
        title: { th: 'จดหมายข่าว ฉบับที่ 3', en: 'Newsletter No. 3' },
        excerpt: { th: 'การประชุมคณะกรรมการศึกษาและพัฒนาความรู้ทางจิตวิทยาและสังคม ครั้งที่ 20/2568 ณ ห้องประชุมกองธรรมศาสตร์และการเมือง และผ่านระบบการประชุมอิเล็กทรอนิกส์', en: 'Meeting 20/2025 of the committee on psychology and society, held in the academy meeting room and online.' } },
      { id: 'moral-newsletter-2', cat: 'activity', date: '2026-01-20', image: 'assets/images/news/news-02.jpg', href: 'pages/article.html',
        title: { th: 'จดหมายข่าว ฉบับที่ 2', en: 'Newsletter No. 2' },
        excerpt: { th: 'การประชุมคณะกรรมการศึกษาและพัฒนาความรู้ทางจิตวิทยาและสังคม ครั้งที่ 19/2568 ณ ห้องประชุมกองธรรมศาสตร์และการเมือง และผ่านระบบการประชุมอิเล็กทรอนิกส์', en: 'Meeting 19/2025 of the committee on psychology and society, held in the academy meeting room and online.' } },
      { id: 'moral-tour-oral-history', cat: 'activity', date: '2024-08-05', image: 'assets/images/news/news-03.jpg', href: 'pages/article.html',
        title: { th: 'ขอเชิญเข้าร่วมโครงการราชบัณฑิตสัญจร การใช้ประวัติศาสตร์จากคำบอกเล่าในการศึกษาประวัติศาสตร์ท้องถิ่น : กรณีศึกษาภาคตะวันออกและภาคใต้', en: 'Fellows on Tour: oral history in the study of local history — the East and the South' },
        excerpt: { th: 'กิจกรรมเสวนาของสำนักธรรมศาสตร์และการเมือง ปีงบประมาณ 2567 เปิดให้ผู้สนใจลงทะเบียนเข้าร่วม', en: 'A forum of the academy for fiscal year 2024, open to anyone who registers.' } },
      { id: 'moral-law-language', cat: 'article', date: '2025-11-14', image: 'assets/images/news/news-04.jpg', href: 'pages/article.html',
        title: { th: 'ภาษากฎหมายกับการสื่อสารให้ประชาชนเข้าใจ', en: 'Legal language the public can understand' },
        excerpt: { th: 'บทความจากการเสวนาอาศรมความคิด ว่าด้วยการเขียนกฎหมายให้กระชับ ชัดเจน และเข้าถึงได้', en: 'From the Think Tank Forum: drafting law that is concise, clear and accessible.' } }
    ],
    lectures: [
      { date: '2026-11-26', href: 'pages/academic-works.html#ideas-forum',
        title: { th: 'ภาษากฎหมายที่ประชาชนเข้าใจได้', en: 'Legal language the public can understand' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชานิติศาสตร์', en: 'Fellow in Law' },
        place: { th: 'ออนไลน์', en: 'Online' } },
      { date: '2026-08-22', href: 'pages/academic-works.html#on-tour',
        title: { th: 'การใช้ประวัติศาสตร์จากคำบอกเล่าในการศึกษาประวัติศาสตร์ท้องถิ่น', en: 'Oral history in the study of local history' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาประวัติศาสตร์', en: 'Fellow in History' },
        place: { th: 'ราชบัณฑิตสัญจร ภาคใต้', en: 'Fellows on Tour, the South' } },
      { date: '2026-06-17', href: 'pages/academic-works.html',
        title: { th: 'จิตวิทยาสังคมกับความเปลี่ยนแปลงของครอบครัวไทย', en: 'Social psychology and the changing Thai family' },
        speaker: { th: 'ภาคีสมาชิก สาขาวิชาจิตวิทยา', en: 'Associate Fellow in Psychology' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } }
    ],
    links: [
      { label: { th: 'พจนานุกรมศัพท์รัฐศาสตร์', en: 'Dictionary of political science terms' }, href: 'https://coined-word.orst.go.th/', external: true },
      { label: { th: 'พจนานุกรมศัพท์นิติศาสตร์', en: 'Dictionary of legal terms' }, href: 'https://coined-word.orst.go.th/', external: true },
      { label: { th: 'คลังความรู้ราชบัณฑิตยสภา', en: 'Royal Society knowledge base' }, href: 'https://www.orst.go.th/iwfm_table.asp?a=28', external: true }
    ]
  },

  science: {
    intro: {
      th: 'สำนักวิทยาศาสตร์ศึกษา ค้นคว้า และวิจัยในสาขาวิทยาศาสตร์กายภาพ วิทยาศาสตร์ชีวภาพ วิทยาศาสตร์ประยุกต์ แพทยศาสตร์ วิศวกรรมศาสตร์ และเทคโนโลยี บัญญัติศัพท์วิทยาศาสตร์ภาษาไทย และเผยแพร่บทความ หนังสือ และผลงานของราชบัณฑิตและภาคีสมาชิกเป็นประจำ',
      en: 'The Academy of Science studies and researches the physical, biological and applied sciences, medicine, engineering and technology; it coins Thai scientific terminology and regularly publishes the articles, books and other work of its Fellows and Associate Fellows.'
    },
    posts: [
      { id: 'science-centenary-report', cat: 'article', date: '2026-07-13', image: 'assets/images/news/news-lead.jpg', href: 'pages/article.html',
        title: { th: 'รายงานสรุปการจัดกิจกรรมโครงการ 100 ปี ราชบัณฑิตยสภา สำนักวิทยาศาสตร์ ปีงบประมาณ พ.ศ. 2569', en: 'Report on the Academy of Science centenary activities, fiscal year 2026' },
        excerpt: { th: 'สรุปการบรรยาย การประชุม และกิจกรรมเผยแพร่ความรู้ของสำนักวิทยาศาสตร์ในวาระครบ 100 ปี', en: 'Lectures, meetings and outreach held by the academy for the centenary.' } },
      { id: 'science-works-jan-feb', cat: 'article', date: '2026-03-03', image: 'assets/images/news/news-05.jpg', href: 'pages/article.html',
        title: { th: 'บทความทางวิชาการ หนังสือ และผลงานอื่น เผยแพร่โดยราชบัณฑิตและภาคีสมาชิก สำนักวิทยาศาสตร์ ระหว่างเดือนมกราคมถึงกุมภาพันธ์ 2569', en: 'Articles, books and other work by Fellows of the Academy of Science, January–February 2026' },
        excerpt: { th: 'รวบรวมผลงานที่ราชบัณฑิตและภาคีสมาชิกเผยแพร่ในรอบสองเดือน', en: 'Work published by the Fellows and Associate Fellows over two months.' } },
      { id: 'science-works-nov-dec', cat: 'article', date: '2026-03-03', image: 'assets/images/news/news-06.jpg', href: 'pages/article.html',
        title: { th: 'บทความทางวิชาการ หนังสือ และผลงานอื่น เผยแพร่โดยราชบัณฑิตและภาคีสมาชิก สำนักวิทยาศาสตร์ ระหว่างเดือนพฤศจิกายนถึงธันวาคม 2568', en: 'Articles, books and other work by Fellows of the Academy of Science, November–December 2025' },
        excerpt: { th: 'รวบรวมผลงานที่ราชบัณฑิตและภาคีสมาชิกเผยแพร่ในรอบสองเดือน', en: 'Work published by the Fellows and Associate Fellows over two months.' } },
      { id: 'science-meeting-10', cat: 'activity', date: '2026-10-21', image: 'assets/images/news/news-02.jpg', href: 'pages/article.html',
        title: { th: 'การประชุมสำนักวิทยาศาสตร์ ครั้งที่ 10/2569', en: 'Academy of Science meeting 10/2026' },
        excerpt: { th: 'การประชุมประจำเดือน พร้อมการบรรยายทางวิชาการโดยราชบัณฑิตในสำนัก', en: 'The monthly meeting, with an academic lecture by a Fellow of the academy.' } }
    ],
    lectures: [
      { date: '2026-12-09', href: 'pages/academic-works.html',
        title: { th: 'วิทยาศาสตร์ไทยในศตวรรษใหม่ของราชบัณฑิตยสภา', en: 'Thai science in the Royal Society’s new century' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาฟิสิกส์', en: 'Fellow in Physics' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } },
      { date: '2026-10-21', href: 'pages/academic-works.html',
        title: { th: 'ศัพท์บัญญัติวิทยาศาสตร์กับการสื่อสารสาธารณะ', en: 'Scientific terminology and public communication' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาเคมี', en: 'Fellow in Chemistry' },
        place: { th: 'ห้องประชุม 301 และ Zoom', en: 'Room 301 and Zoom' } },
      { date: '2026-08-19', href: 'pages/academic-works.html',
        title: { th: 'การแพทย์แม่นยำกับระบบสุขภาพไทย', en: 'Precision medicine and the Thai health system' },
        speaker: { th: 'ภาคีสมาชิก สาขาวิชาแพทยศาสตร์', en: 'Associate Fellow in Medicine' },
        place: { th: 'ออนไลน์', en: 'Online' } }
    ],
    links: [
      { label: { th: 'ศัพท์บัญญัติวิทยาศาสตร์', en: 'Coined scientific terms' }, href: 'https://coined-word.orst.go.th/', external: true },
      { label: { th: 'คำทับศัพท์', en: 'Transliteration' }, href: 'https://transliteration.orst.go.th/', external: true },
      { label: { th: 'จุลสารสำนักวิทยาศาสตร์', en: 'Academy of Science Bulletin' }, href: 'pages/academic-works.html#science-bulletin', external: false }
    ]
  },

  arts: {
    intro: {
      th: 'สำนักศิลปกรรมศึกษา ค้นคว้า และวิจัยในสาขาภาษาและวรรณกรรม ภาษาศาสตร์ ดุริยางคศิลป์ ทัศนศิลป์ และสถาปัตยกรรม ดูแลงานพจนานุกรม หลักเกณฑ์การใช้ภาษาไทย และจัดประชุมสำนักพร้อมการบรรยายผลงานของราชบัณฑิตและภาคีสมาชิกทุกเดือน',
      en: 'The Academy of Arts studies and researches language and literature, linguistics, music, the visual arts and architecture; it looks after the dictionaries and the rules of written Thai, and meets every month to hear the work of its Fellows and Associate Fellows.'
    },
    posts: [
      { id: 'arts-meeting-11', cat: 'activity', date: '2024-06-05', image: 'assets/images/news/news-03.jpg', href: 'pages/article.html',
        title: { th: 'การประชุมสำนักศิลปกรรม ครั้งที่ 11/2567', en: 'Academy of Arts meeting 11/2024' },
        excerpt: { th: 'ณ ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา และผ่านระบบ Zoom Cloud Meetings โดยมีราชบัณฑิตและภาคีสมาชิกบรรยายผลงานทางวิชาการ รวม 3 คน', en: 'In Room 301 and on Zoom, with academic talks by three Fellows and Associate Fellows.' } },
      { id: 'arts-meeting-10', cat: 'activity', date: '2024-05-17', image: 'assets/images/news/news-04.jpg', href: 'pages/article.html',
        title: { th: 'การประชุมสำนักศิลปกรรม ครั้งที่ 10/2567', en: 'Academy of Arts meeting 10/2024' },
        excerpt: { th: 'ณ ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา และผ่านระบบ Zoom Cloud Meetings โดยมีภาคีสมาชิกบรรยายผลงานทางวิชาการ จำนวน 2 คน', en: 'In Room 301 and on Zoom, with academic talks by two Associate Fellows.' } },
      { id: 'arts-meeting-5', cat: 'activity', date: '2024-03-06', image: 'assets/images/news/news-01.jpg', href: 'pages/article.html',
        title: { th: 'ประชุมสำนักศิลปกรรม ครั้งที่ 5/2567', en: 'Academy of Arts meeting 5/2024' },
        excerpt: { th: 'มีการบรรยายทางวิชาการเรื่อง “ฮิตเลอร์กับซอฟต์พาวเวอร์” โดยราชบัณฑิต ประเภทวิชาวิจิตรศิลป์ สาขาวิชานาฏกรรม', en: 'With the lecture “Hitler and soft power” by a Fellow in dramatic arts.' } },
      { id: 'arts-loanwords', cat: 'article', date: '2024-02-12', image: 'assets/images/news/news-06.jpg', href: 'pages/article.html',
        title: { th: 'คำยืมภาษาต่างประเทศในภาษาไทยปัจจุบัน', en: 'Foreign loanwords in present-day Thai' },
        excerpt: { th: 'บทความจากการบรรยายในการประชุมสำนัก ว่าด้วยที่มาและการเขียนคำยืมให้ถูกต้อง', en: 'From a talk at the academy meeting: where loanwords come from and how to spell them.' } }
    ],
    lectures: [
      { date: '2026-12-02', href: 'pages/academic-works.html',
        title: { th: 'ภาษาและวรรณกรรมไทยในโลกดิจิทัล', en: 'Thai language and literature in a digital world' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาวรรณศิลป์', en: 'Fellow in Literature' },
        place: { th: 'ห้องประชุม 301 และ Zoom', en: 'Room 301 and Zoom' } },
      { date: '2024-03-05', href: 'pages/academic-works.html',
        title: { th: 'ฮิตเลอร์กับซอฟต์พาวเวอร์', en: 'Hitler and soft power' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชานาฏกรรม', en: 'Fellow in Dramatic Arts' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } },
      { date: '2024-02-12', href: 'pages/academic-works.html',
        title: { th: 'คำยืมภาษาต่างประเทศในภาษาไทยปัจจุบัน', en: 'Foreign loanwords in present-day Thai' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาภาษาศาสตร์', en: 'Fellow in Linguistics' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } }
    ],
    links: [
      { label: { th: 'พจนานุกรม ฉบับราชบัณฑิตยสถาน', en: 'Royal Institute Dictionary' }, href: 'https://dictionary.orst.go.th/', external: true },
      { label: { th: 'หลักเกณฑ์การทับศัพท์', en: 'Transliteration rules' }, href: 'https://transliteration.orst.go.th/', external: true },
      { label: { th: 'อักขรานุกรมภูมิศาสตร์', en: 'Gazetteer' }, href: 'https://gazetteer.orst.go.th/', external: true }
    ]
  }
};
