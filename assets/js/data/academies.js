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
    /* The academy's information, kept on this site */
    info: [
      { title: { th: 'รายนามตามประเภทวิชาและสาขาวิชา', en: 'Members by discipline and field' }, text: { th: 'ราชบัณฑิตและภาคีสมาชิกของสำนัก', en: 'Fellows and Associate Fellows of the academy' }, href: 'pages/fellows.html?academy=moral' },
      { title: { th: 'โครงสร้างและผู้บริหาร', en: 'Structure and executives' }, text: { th: 'แผนผังการบริหารราชบัณฑิตยสภา', en: 'How the Royal Society is governed' }, href: 'pages/about-structure.html' },
      { title: { th: 'ติดต่อสำนัก', en: 'Contact the academy' }, text: { th: 'ที่อยู่และช่องทางติดต่อ', en: 'Address and how to get in touch' }, href: 'pages/contact.html' }
    ],
    posts: [
      { id: "moral-newsletter-3", cat: "activity", date: "2026-01-20", image: "https://mps.royalsociety.go.th/wp-content/uploads/2026/01/%E0%B8%88%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-3png_Page1-890x530.png", href: "https://mps.royalsociety.go.th/%E0%B8%88%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-3/", external: true,
        title: { th: "จดหมายข่าว ฉบับที่ 3", en: "Newsletter No. 3" },
        excerpt: { th: "การประชุมคณะกรรมการศึกษาและพัฒนาความรู้ทางจิตวิทยาและสังคม ครั้งที่ 20/2568 เมื่อวันศุกร์ที่ 26 ธันวาคม พ.ศ. 2568", en: "Meeting 20/2568 of the committee on psychology and society, Friday 26 December 2025." } },
      { id: "moral-newsletter-2", cat: "activity", date: "2026-01-20", image: "https://mps.royalsociety.go.th/wp-content/uploads/2026/01/%E0%B8%88%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-2png_Page1-890x530.png", href: "https://mps.royalsociety.go.th/%E0%B8%88%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B8%A7-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-2/", external: true,
        title: { th: "จดหมายข่าว ฉบับที่ 2", en: "Newsletter No. 2" },
        excerpt: { th: "การประชุมคณะกรรมการศึกษาและพัฒนาความรู้ทางจิตวิทยาและสังคม ครั้งที่ 19/2568 เมื่อวันศุกร์ที่ 12 ธันวาคม พ.ศ. 2568", en: "Meeting 19/2568 of the committee on psychology and society, Friday 12 December 2025." } },
      { id: "moral-tour-oral-history", cat: "activity", date: "2024-08-05", image: "https://mps.royalsociety.go.th/wp-content/uploads/2024/08/%E0%B8%9A%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%81%E0%B8%9A%E0%B8%9A1-890x530.png", href: "https://mps.royalsociety.go.th/22-08-2567-zoom/", external: true,
        title: { th: "ขอเชิญเข้าร่วมโครงการราชบัณฑิตสัญจร การใช้ประวัติศาสตร์จากคำบอกเล่าในการศึกษาประวัติศาสตร์ท้องถิ่น : กรณีศึกษาภาคตะวันออกและภาคใต้", en: "Fellows on Tour: oral history in the study of local history — the East and the South" },
        excerpt: { th: "โครงการราชบัณฑิตสัญจร สำนักธรรมศาสตร์และการเมือง ปีงบประมาณ 2567 กิจกรรมเสวนา วันที่ 22 สิงหาคม 2567", en: "Fellows on Tour, fiscal year 2024: a public forum on 22 August 2024." } },
      { id: "moral-meeting-11-2567", cat: "activity", date: "2024-06-06", image: "https://mps.royalsociety.go.th/wp-content/uploads/2024/06/446814408_869743338512018_4371981163796194065_n-890x530.jpg", href: "https://mps.royalsociety.go.th/11-2567/", external: true,
        title: { th: "การประชุมสำนักธรรมศาสตร์และการเมือง ครั้งที่ 11/2567", en: "Academy meeting 11/2567" },
        excerpt: { th: "วันพุธที่ 5 มิถุนายน พ.ศ. 2567 เวลา 09.00 น. ศาสตราจารย์กิตติคุณ ดร.ปิยนาถ บุนนาค ประธานสำนักธรรมศาสตร์และการเมือง", en: "Wednesday 5 June 2024, 9 a.m., with Professor Emeritus Dr Piyanart Bunnag, President of the Academy." } },
      { id: "moral-meeting-10-2567", cat: "activity", date: "2024-05-16", image: "https://mps.royalsociety.go.th/wp-content/uploads/2024/06/427990881_856321889854163_6200346421818907739_n-890x530.jpg", href: "https://mps.royalsociety.go.th/10-2567/", external: true,
        title: { th: "การประชุมสำนักธรรมศาสตร์และการเมือง ครั้งที่ 10/2567", en: "Academy meeting 10/2567" },
        excerpt: { th: "วันพุธที่ 15 พฤษภาคม พ.ศ. 2567 เวลา 09.00 น. ศาสตราจารย์กิตติคุณ ดร.ปิยนาถ บุนนาค ประธานสำนักธรรมศาสตร์และการเมือง", en: "Wednesday 15 May 2024, 9 a.m., with Professor Emeritus Dr Piyanart Bunnag, President of the Academy." } },
      { id: "moral-amulets", cat: "article", date: "2024-04-01", image: "https://mps.royalsociety.go.th/wp-content/uploads/2024/06/Thai_buddhist_amulets-890x530.jpg", href: "https://mps.royalsociety.go.th/%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87/", external: true,
        title: { th: "บทความเรื่อง พระเครื่อง : มหัศจรรย์แห่งเมืองสยาม โดย ศ. ดร.ไผทชิต เอกจริยกร", en: "Amulets: a wonder of Siam — by Professor Dr Phaitoonchit Ekachariyakorn" },
        excerpt: { th: "บทความวิชาการโดย ศ. ดร.ไผทชิต เอกจริยกร", en: "An academic article by Professor Dr Phaitoonchit Ekachariyakorn." } }
    ],
    lectures: [
      { date: '2026-11-26', href: 'pages/works-ideas-forum.html',
        title: { th: 'ภาษากฎหมายที่ประชาชนเข้าใจได้', en: 'Legal language the public can understand' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชานิติศาสตร์', en: 'Fellow in Law' },
        place: { th: 'ออนไลน์', en: 'Online' } },
      { date: '2026-08-22', href: 'pages/works-on-tour.html',
        title: { th: 'การใช้ประวัติศาสตร์จากคำบอกเล่าในการศึกษาประวัติศาสตร์ท้องถิ่น', en: 'Oral history in the study of local history' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาประวัติศาสตร์', en: 'Fellow in History' },
        place: { th: 'ราชบัณฑิตสัญจร ภาคใต้', en: 'Fellows on Tour, the South' } },
      { date: '2026-06-17', href: 'pages/works-calendar.html',
        title: { th: 'จิตวิทยาสังคมกับความเปลี่ยนแปลงของครอบครัวไทย', en: 'Social psychology and the changing Thai family' },
        speaker: { th: 'ภาคีสมาชิก สาขาวิชาจิตวิทยา', en: 'Associate Fellow in Psychology' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } }
    ],
    links: [
      { label: { th: 'พจนานุกรมศัพท์รัฐศาสตร์', en: 'Dictionary of political science terms' }, href: 'https://coined-word.orst.go.th/', external: true },
      { label: { th: 'พจนานุกรมศัพท์นิติศาสตร์', en: 'Dictionary of legal terms' }, href: 'https://coined-word.orst.go.th/', external: true },
      { label: { th: 'คลังความรู้ราชบัณฑิตยสภา', en: 'Royal Society knowledge base' }, href: 'pages/knowledge.html' }
    ]
  },

  science: {
    intro: {
      th: 'สำนักวิทยาศาสตร์ศึกษา ค้นคว้า และวิจัยในสาขาวิทยาศาสตร์กายภาพ วิทยาศาสตร์ชีวภาพ วิทยาศาสตร์ประยุกต์ แพทยศาสตร์ วิศวกรรมศาสตร์ และเทคโนโลยี บัญญัติศัพท์วิทยาศาสตร์ภาษาไทย และเผยแพร่บทความ หนังสือ และผลงานของราชบัณฑิตและภาคีสมาชิกเป็นประจำ',
      en: 'The Academy of Science studies and researches the physical, biological and applied sciences, medicine, engineering and technology; it coins Thai scientific terminology and regularly publishes the articles, books and other work of its Fellows and Associate Fellows.'
    },
    /* The academy's information, kept on this site */
    info: [
      { title: { th: 'รายนามตามประเภทวิชาและสาขาวิชา', en: 'Members by discipline and field' }, text: { th: 'ราชบัณฑิตและภาคีสมาชิกของสำนัก', en: 'Fellows and Associate Fellows of the academy' }, href: 'pages/fellows.html?academy=science' },
      { title: { th: 'โครงสร้างและผู้บริหาร', en: 'Structure and executives' }, text: { th: 'แผนผังการบริหารราชบัณฑิตยสภา', en: 'How the Royal Society is governed' }, href: 'pages/about-structure.html' },
      { title: { th: 'ติดต่อสำนัก', en: 'Contact the academy' }, text: { th: 'ที่อยู่และช่องทางติดต่อ', en: 'Address and how to get in touch' }, href: 'pages/contact.html' }
    ],
    posts: [
      { id: "science-centenary-coast", cat: "article", date: "2026-07-13", image: "assets/images/news/news-lead.jpg", href: "https://science.royalsociety.go.th/100year-coastal-erosion/", external: true,
        title: { th: "รายงานสรุปการจัดกิจกรรมโครงการ 100 ปี ราชบัณฑิตยสภา สำนักวิทยาศาสตร์ปีงบประมาณ พ.ศ. 2569", en: "Report on the Academy of Science centenary activities, fiscal year 2026" },
        excerpt: { th: "การสัมมนาทางวิชาการเรื่อง ปัญหาการกัดเซาะชายฝั่งของอ่าวไทยและแนวทางแก้ไขอย่างยั่งยืน เมื่อวันศุกร์ที่ 22 พฤษภาคม พ.ศ. 2569", en: "A seminar on coastal erosion in the Gulf of Thailand and lasting remedies, Friday 22 May 2026." } },
      { id: "science-works-2569-1-2", cat: "article", date: "2026-03-03", image: "assets/images/news/news-05.jpg", href: "https://science.royalsociety.go.th/book-academic-articles-2569-1-2/", external: true,
        title: { th: "บทความทางวิชาการ หนังสือ และผลงานอื่น เผยแพร่โดยราชบัณฑิตและภาคีสมาชิก สำนักวิทยาศาสตร์ ระหว่างเดือนมกราคมถึงกุมภาพันธ์ 2569", en: "Articles, books and other works by Fellows of the Academy of Science, January–February 2026" },
        excerpt: { th: "รายงานผลการตีพิมพ์ของสำนักวิทยาศาสตร์ ฉบับเอกสาร PDF", en: "The academy's publication report, as a PDF." } },
      { id: "science-works-2568-11-12", cat: "article", date: "2026-03-03", image: "assets/images/news/news-06.jpg", href: "https://science.royalsociety.go.th/book-academic-articles-2568-11-12/", external: true,
        title: { th: "บทความทางวิชาการ หนังสือ และผลงานอื่น เผยแพร่โดยราชบัณฑิตและภาคีสมาชิก สำนักวิทยาศาสตร์ ระหว่างเดือนพฤศจิกายนถึงธันวาคม 2568", en: "Articles, books and other works by Fellows of the Academy of Science, November–December 2025" },
        excerpt: { th: "รายงานผลการตีพิมพ์ของสำนักวิทยาศาสตร์ ฉบับเอกสาร PDF", en: "The academy's publication report, as a PDF." } },
      { id: "science-abstracts-2568-11-12", cat: "activity", date: "2026-03-03", image: "assets/images/news/news-02.jpg", href: "https://science.royalsociety.go.th/abstract2568-6/", external: true,
        title: { th: "บทคัดย่อการบรรยายของราชบัณฑิตและภาคีสมาชิก ระหว่างเดือนพฤศจิกายนถึงธันวาคม พ.ศ. 2568", en: "Abstracts of lectures by Fellows and Associate Fellows, November–December 2025" },
        excerpt: { th: "บทคัดย่อการบรรยายในการประชุมสำนักวิทยาศาสตร์ ฉบับเอกสาร PDF", en: "Abstracts of the lectures given at the academy's meetings, as a PDF." } },
      { id: "science-works-2568-9-10", cat: "article", date: "2026-03-03", image: "assets/images/news/news-01.jpg", href: "https://science.royalsociety.go.th/book-academic-articles-2568-9-10/", external: true,
        title: { th: "บทความทางวิชาการ หนังสือ และผลงานอื่น เผยแพร่โดยราชบัณฑิตและภาคีสมาชิก สำนักวิทยาศาสตร์ ระหว่างเดือนกันยายนถึงตุลาคม 2568", en: "Articles, books and other works by Fellows of the Academy of Science, September–October 2025" },
        excerpt: { th: "รายงานผลการตีพิมพ์ของสำนักวิทยาศาสตร์ ฉบับเอกสาร PDF", en: "The academy's publication report, as a PDF." } },
      { id: "science-abstracts-2568-9-10", cat: "activity", date: "2026-03-03", image: "assets/images/news/news-03.jpg", href: "https://science.royalsociety.go.th/abstract2568-5/", external: true,
        title: { th: "บทคัดย่อการบรรยายของราชบัณฑิตและภาคีสมาชิก ระหว่างเดือนกันยายนถึงตุลาคม พ.ศ. 2568", en: "Abstracts of lectures by Fellows and Associate Fellows, September–October 2025" },
        excerpt: { th: "บทคัดย่อการบรรยายในการประชุมสำนักวิทยาศาสตร์ ฉบับเอกสาร PDF", en: "Abstracts of the lectures given at the academy's meetings, as a PDF." } }
    ],
    lectures: [
      { date: '2026-12-09', href: 'pages/works-calendar.html',
        title: { th: 'วิทยาศาสตร์ไทยในศตวรรษใหม่ของราชบัณฑิตยสภา', en: 'Thai science in the Royal Society’s new century' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาฟิสิกส์', en: 'Fellow in Physics' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } },
      { date: '2026-10-21', href: 'pages/works-calendar.html',
        title: { th: 'ศัพท์บัญญัติวิทยาศาสตร์กับการสื่อสารสาธารณะ', en: 'Scientific terminology and public communication' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาเคมี', en: 'Fellow in Chemistry' },
        place: { th: 'ห้องประชุม 301 และ Zoom', en: 'Room 301 and Zoom' } },
      { date: '2026-08-19', href: 'pages/works-calendar.html',
        title: { th: 'การแพทย์แม่นยำกับระบบสุขภาพไทย', en: 'Precision medicine and the Thai health system' },
        speaker: { th: 'ภาคีสมาชิก สาขาวิชาแพทยศาสตร์', en: 'Associate Fellow in Medicine' },
        place: { th: 'ออนไลน์', en: 'Online' } }
    ],
    links: [
      { label: { th: 'ศัพท์บัญญัติวิทยาศาสตร์', en: 'Coined scientific terms' }, href: 'https://coined-word.orst.go.th/', external: true },
      { label: { th: 'คำทับศัพท์', en: 'Transliteration' }, href: 'https://transliteration.orst.go.th/', external: true },
      { label: { th: 'จุลสารสำนักวิทยาศาสตร์', en: 'Academy of Science Bulletin' }, href: 'pages/series.html?id=science-bulletin', external: false }
    ]
  },

  arts: {
    intro: {
      th: 'สำนักศิลปกรรมศึกษา ค้นคว้า และวิจัยในสาขาภาษาและวรรณกรรม ภาษาศาสตร์ ดุริยางคศิลป์ ทัศนศิลป์ และสถาปัตยกรรม ดูแลงานพจนานุกรม หลักเกณฑ์การใช้ภาษาไทย และจัดประชุมสำนักพร้อมการบรรยายผลงานของราชบัณฑิตและภาคีสมาชิกทุกเดือน',
      en: 'The Academy of Arts studies and researches language and literature, linguistics, music, the visual arts and architecture; it looks after the dictionaries and the rules of written Thai, and meets every month to hear the work of its Fellows and Associate Fellows.'
    },
    /* The academy's information, kept on this site */
    info: [
      { title: { th: 'รายนามตามประเภทวิชาและสาขาวิชา', en: 'Members by discipline and field' }, text: { th: 'ราชบัณฑิตและภาคีสมาชิกของสำนัก', en: 'Fellows and Associate Fellows of the academy' }, href: 'pages/fellows.html?academy=arts' },
      { title: { th: 'โครงสร้างและผู้บริหาร', en: 'Structure and executives' }, text: { th: 'แผนผังการบริหารราชบัณฑิตยสภา', en: 'How the Royal Society is governed' }, href: 'pages/about-structure.html' },
      { title: { th: 'ติดต่อสำนัก', en: 'Contact the academy' }, text: { th: 'ที่อยู่และช่องทางติดต่อ', en: 'Address and how to get in touch' }, href: 'pages/contact.html' }
    ],
    posts: [
      { id: "arts-meeting-11-2567", cat: "activity", date: "2024-06-05", image: "https://arts.royalsociety.go.th/wp-content/uploads/2024/06/447209918_869637738522578_2326131371159057780_n-890x530.jpg", href: "https://arts.royalsociety.go.th/11-2567/", external: true,
        title: { th: "การประชุมสำนักศิลปกรรม ครั้งที่ 11/2567", en: "Academy of Arts meeting 11/2567" },
        excerpt: { th: "เมื่อวันอังคารที่ 4 มิถุนายน พ.ศ. 2567 เวลา 13.30 น. รองศาสตราจารย์โชษิตา มณีใส เป็นประธานในการประชุม", en: "Tuesday 4 June 2024, 1.30 p.m., chaired by Associate Professor Chosita Maneesai." } },
      { id: "arts-meeting-10-2567", cat: "activity", date: "2024-05-17", image: "https://arts.royalsociety.go.th/wp-content/uploads/2024/06/441950776_857576479728704_3627402383060231772_n-890x530.jpg", href: "https://arts.royalsociety.go.th/10-2567/", external: true,
        title: { th: "การประชุมสำนักศิลปกรรม ครั้งที่ 10/2567", en: "Academy of Arts meeting 10/2567" },
        excerpt: { th: "เมื่อวันพฤหัสบดีที่ 16 พฤษภาคม พ.ศ. 2567 เวลา 13.30 น. ศาสตราจารย์เกียรติคุณวิบูลย์ ลี้สุวรรณ เป็นประธาน", en: "Thursday 16 May 2024, 1.30 p.m., chaired by Professor Emeritus Viboon Leesuwan." } },
      { id: "arts-meeting-5-2567", cat: "activity", date: "2024-03-06", image: "https://arts.royalsociety.go.th/wp-content/uploads/2024/06/431329306_813278967491789_6827036482441333524_n-890x530.jpg", href: "https://arts.royalsociety.go.th/5-2567/", external: true,
        title: { th: "ประชุมสำนักศิลปกรรม ครั้งที่ 5/2567", en: "Academy of Arts meeting 5/2567" },
        excerpt: { th: "สำนักศิลปกรรม ราชบัณฑิตยสภา จัดประชุมสำนักศิลปกรรม ครั้งที่ 5/2567 เมื่อวันอังคารที่ 5 มีนาคม พ.ศ. 2567", en: "The Academy of Arts held its meeting 5/2567 on Tuesday 5 March 2024." } },
      { id: "arts-tour-peace", cat: "activity", date: "2021-08-24", image: "https://arts.royalsociety.go.th/wp-content/uploads/2021/08/236753542_4421391314585596_1160942742776977873_n-890x530.jpg", href: "https://arts.royalsociety.go.th/%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%B2%E0%B8%90%E0%B8%81%E0%B8%96%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9A%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B8%B4%E0%B8%95/", external: true,
        title: { th: "โครงการปาฐกถาราชบัณฑิตสัญจร ภาษากับการสื่อสาร เพื่อสันติสุขที่ยั่งยืน", en: "Fellows on Tour lecture: language and communication for lasting peace" },
        excerpt: { th: "ปาฐกถาในโครงการราชบัณฑิตสัญจรของสำนักศิลปกรรม", en: "A Fellows on Tour lecture by the Academy of Arts." } },
      { id: "arts-chonburi-murals", cat: "article", date: "2020-04-23", image: "https://arts.royalsociety.go.th/wp-content/uploads/2020/04/1024px-Dharmacakra_flag_Thailand.svg_-890x530.png", href: "https://arts.royalsociety.go.th/%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%9D%E0%B8%B5%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87/", external: true,
        title: { th: "จิตรกรรมฝีมือกลุ่มช่างพื้นบ้านชลบุรี", en: "Murals by the folk painters of Chonburi" },
        excerpt: { th: "จิตรกรรมเป็นงานศิลปะประเภทหนึ่งของไทยที่ส่วนมากเกี่ยวเนื่องกับพุทธศาสนา — ศ. ดร.วิบูลย์ ลี้สุวรรณ ราชบัณฑิต", en: "Thai painting is an art largely bound up with Buddhism — Professor Dr Viboon Leesuwan, Fellow." } },
      { id: "arts-semiotics", cat: "article", date: "2020-04-07", image: "https://arts.royalsociety.go.th/wp-content/uploads/2020/04/sense-2326348_960_720-890x530.jpg", href: "https://arts.royalsociety.go.th/semiotics-the-truth-of-meaning-on-philosophy-and-technology/", external: true,
        title: { th: "Semiotics: The Truth of Meaning on Philosophy and Technology", en: "Semiotics: The Truth of Meaning on Philosophy and Technology" },
        excerpt: { th: "บทความโดย ศ. ดร.มณีรัตน์ สวัสดิวัตน์ ณ อยุธยา ภาคีสมาชิก", en: "An article by Professor Dr Maneerat Svasti-xuto na Ayudhya, Associate Fellow." } }
    ],
    lectures: [
      { date: '2026-12-02', href: 'pages/works-calendar.html',
        title: { th: 'ภาษาและวรรณกรรมไทยในโลกดิจิทัล', en: 'Thai language and literature in a digital world' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชาวรรณศิลป์', en: 'Fellow in Literature' },
        place: { th: 'ห้องประชุม 301 และ Zoom', en: 'Room 301 and Zoom' } },
      { date: '2024-03-05', href: 'pages/works-calendar.html',
        title: { th: 'ฮิตเลอร์กับซอฟต์พาวเวอร์', en: 'Hitler and soft power' },
        speaker: { th: 'ราชบัณฑิต สาขาวิชานาฏกรรม', en: 'Fellow in Dramatic Arts' },
        place: { th: 'ห้องประชุม 301 สำนักงานราชบัณฑิตยสภา', en: 'Room 301, Office of the Royal Society' } },
      { date: '2024-02-12', href: 'pages/works-calendar.html',
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
