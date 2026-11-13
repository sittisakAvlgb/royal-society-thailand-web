/* ============================================================================
 * data/knowledge.js — the knowledge page: fields and their articles
 *  fields: { id, name {th,en}, desc {th,en} } in page order
 *  items:  { id, field, type {th,en}, date (ISO), href (pages/article.html?id=…),
 *            title {th,en}, excerpt {th,en},
 *            pdf { src, pages, bytes } — the article as a PDF; the article page
 *            offers ดูตัวอย่าง / เปิดเอกสาร (the sample PDFs are printed from
 *            this site's article pages) }
 *  Sample content: replace with the Office's articles before launch.
 * ========================================================================== */
window.RS_KNOWLEDGE = {
  "fields": [
    {
      "id": "language",
      "name": {
        "th": "ภาษาและวรรณกรรม",
        "en": "Language & Literature"
      },
      "desc": {
        "th": "ภาษาไทย วรรณคดี ภาษาศาสตร์",
        "en": "Thai language, literature, linguistics"
      }
    },
    {
      "id": "science",
      "name": {
        "th": "วิทยาศาสตร์",
        "en": "Science"
      },
      "desc": {
        "th": "วิทยาศาสตร์กายภาพและชีวภาพ",
        "en": "Physical and biological sciences"
      }
    },
    {
      "id": "technology",
      "name": {
        "th": "เทคโนโลยี",
        "en": "Technology"
      },
      "desc": {
        "th": "คอมพิวเตอร์ วิศวกรรม สังคมดิจิทัล",
        "en": "Computing, engineering, digital society"
      }
    },
    {
      "id": "medicine",
      "name": {
        "th": "แพทยศาสตร์",
        "en": "Medicine"
      },
      "desc": {
        "th": "การแพทย์ สาธารณสุข เภสัชศาสตร์",
        "en": "Medicine, public health, pharmacy"
      }
    },
    {
      "id": "social",
      "name": {
        "th": "สังคมศาสตร์",
        "en": "Social Sciences"
      },
      "desc": {
        "th": "สังคม การเมือง การศึกษา",
        "en": "Society, politics, education"
      }
    },
    {
      "id": "arts",
      "name": {
        "th": "ศิลปกรรม",
        "en": "Arts"
      },
      "desc": {
        "th": "ทัศนศิลป์ ดนตรี สถาปัตยกรรม",
        "en": "Visual arts, music, architecture"
      }
    },
    {
      "id": "history",
      "name": {
        "th": "ประวัติศาสตร์",
        "en": "History"
      },
      "desc": {
        "th": "ประวัติศาสตร์ไทยและโลก โบราณคดี",
        "en": "Thai and world history, archaeology"
      }
    },
    {
      "id": "law",
      "name": {
        "th": "กฎหมาย",
        "en": "Law"
      },
      "desc": {
        "th": "นิติศาสตร์ กระบวนการยุติธรรม ภาษากฎหมาย",
        "en": "Law, justice, legal language"
      }
    },
    {
      "id": "economics",
      "name": {
        "th": "เศรษฐศาสตร์",
        "en": "Economics"
      },
      "desc": {
        "th": "เศรษฐกิจ การพัฒนา การคลัง",
        "en": "Economics, development, public finance"
      }
    }
  ],
  "items": [
    {
      "id": "kn-coined-terms",
      "pdf": { "src": "assets/docs/knowledge/kn-coined-terms.pdf", "pages": 3, "bytes": 611865 },
      "field": "language",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-08-18",
      "href": "pages/article.html?id=kn-coined-terms",
      "title": {
        "th": "หลักการบัญญัติศัพท์วิชาการภาษาไทย",
        "en": "Principles of coining Thai academic terms"
      },
      "excerpt": {
        "th": "ศัพท์บัญญัติคืออะไร ต่างจากคำทับศัพท์อย่างไร และควรเลือกใช้อย่างไรในงานเขียนวิชาการ",
        "en": "What coined terms are, how they differ from transliteration, and how to choose between them in academic writing."
      }
    },
    {
      "id": "kn-language-2026-08-18",
      "pdf": { "src": "assets/docs/knowledge/kn-language-2026-08-18.pdf", "pages": 4, "bytes": 555358 },
      "field": "language",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-08-18",
      "href": "pages/article.html?id=kn-language-2026-08-18",
      "title": {
        "th": "การใช้ลักษณนามในภาษาไทยปัจจุบัน",
        "en": "Classifiers in contemporary Thai"
      },
      "excerpt": {
        "th": "ลักษณนามที่มักใช้สับสน และหลักการเลือกใช้ให้เหมาะกับบริบท",
        "en": "Commonly confused classifiers and how to choose the right one."
      }
    },
    {
      "id": "kn-language-2026-06-09",
      "pdf": { "src": "assets/docs/knowledge/kn-language-2026-06-09.pdf", "pages": 4, "bytes": 535776 },
      "field": "language",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-06-09",
      "href": "pages/article.html?id=kn-language-2026-06-09",
      "title": {
        "th": "คำยืมภาษาบาลีและสันสกฤตในภาษาไทย",
        "en": "Pali and Sanskrit loanwords in Thai"
      },
      "excerpt": {
        "th": "ที่มาของคำยืม และความหมายที่เปลี่ยนไปเมื่อเข้ามาอยู่ในภาษาไทย",
        "en": "Where these loanwords come from and how their meanings shifted in Thai."
      }
    },
    {
      "id": "kn-language-2026-02-20",
      "pdf": { "src": "assets/docs/knowledge/kn-language-2026-02-20.pdf", "pages": 3, "bytes": 540682 },
      "field": "language",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-02-20",
      "href": "pages/article.html?id=kn-language-2026-02-20",
      "title": {
        "th": "การอ่านวรรณคดีไทยในห้องเรียนยุคใหม่",
        "en": "Reading Thai classical literature in today’s classroom"
      },
      "excerpt": {
        "th": "แนวทางช่วยให้ผู้เรียนเข้าใจบริบทและคุณค่าของวรรณคดี",
        "en": "Ways to help learners understand the context and value of classical works."
      }
    },
    {
      "id": "kn-science-2025-11-10",
      "pdf": { "src": "assets/docs/knowledge/kn-science-2025-11-10.pdf", "pages": 3, "bytes": 560090 },
      "field": "science",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2025-11-10",
      "href": "pages/article.html?id=kn-science-2025-11-10",
      "title": {
        "th": "ความหลากหลายทางชีวภาพของป่าชายเลน",
        "en": "Biodiversity in mangrove forests"
      },
      "excerpt": {
        "th": "บทบาทของป่าชายเลนต่อระบบนิเวศชายฝั่ง",
        "en": "The role of mangroves in coastal ecosystems."
      }
    },
    {
      "id": "kn-science-2026-07-21",
      "pdf": { "src": "assets/docs/knowledge/kn-science-2026-07-21.pdf", "pages": 3, "bytes": 496106 },
      "field": "science",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-07-21",
      "href": "pages/article.html?id=kn-science-2026-07-21",
      "title": {
        "th": "ศัพท์วิทยาศาสตร์พื้นฐานที่ควรใช้ให้ถูกต้อง",
        "en": "Basic science terms to use correctly"
      },
      "excerpt": {
        "th": "คำที่มักใช้ปะปนกัน เช่น มวลกับน้ำหนัก",
        "en": "Terms that are often mixed up, such as mass and weight."
      }
    },
    {
      "id": "kn-science-2026-04-02",
      "pdf": { "src": "assets/docs/knowledge/kn-science-2026-04-02.pdf", "pages": 3, "bytes": 587133 },
      "field": "science",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-04-02",
      "href": "pages/article.html?id=kn-science-2026-04-02",
      "title": {
        "th": "การอธิบายเรื่องการเปลี่ยนแปลงสภาพภูมิอากาศแก่สาธารณะ",
        "en": "Explaining climate change to the public"
      },
      "excerpt": {
        "th": "หลักการสื่อสารข้อมูลทางวิทยาศาสตร์ให้ถูกต้องและเข้าใจง่าย",
        "en": "Communicating scientific evidence accurately and plainly."
      }
    },
    {
      "id": "kn-technology-2026-07-02",
      "pdf": { "src": "assets/docs/knowledge/kn-technology-2026-07-02.pdf", "pages": 3, "bytes": 536939 },
      "field": "technology",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-07-02",
      "href": "pages/article.html?id=kn-technology-2026-07-02",
      "title": {
        "th": "ปัญญาประดิษฐ์กับการใช้ภาษาไทยในงานวิชาการ",
        "en": "Artificial intelligence and Thai in academic writing"
      },
      "excerpt": {
        "th": "ข้อควรพิจารณาเมื่อใช้เครื่องมือปัญญาประดิษฐ์ช่วยเขียนและแปลงานวิชาการ",
        "en": "What to consider when AI tools help write and translate academic work."
      }
    },
    {
      "id": "kn-technology-2026-05-12",
      "pdf": { "src": "assets/docs/knowledge/kn-technology-2026-05-12.pdf", "pages": 3, "bytes": 510865 },
      "field": "technology",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-05-12",
      "href": "pages/article.html?id=kn-technology-2026-05-12",
      "title": {
        "th": "การบัญญัติศัพท์ในสาขาที่เปลี่ยนแปลงเร็ว",
        "en": "Coining Thai terms in fast-changing fields"
      },
      "excerpt": {
        "th": "เหตุใดศัพท์ด้านเทคโนโลยีจึงต้องทั้งพิจารณาอย่างรอบคอบและเผยแพร่ให้ทันการใช้งาน",
        "en": "Why technology terms need both careful study and timely publication."
      }
    },
    {
      "id": "kn-technology-2026-01-27",
      "pdf": { "src": "assets/docs/knowledge/kn-technology-2026-01-27.pdf", "pages": 4, "bytes": 502476 },
      "field": "technology",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-01-27",
      "href": "pages/article.html?id=kn-technology-2026-01-27",
      "title": {
        "th": "การประมวลผลภาษาธรรมชาติสำหรับภาษาไทย",
        "en": "Natural language processing for Thai"
      },
      "excerpt": {
        "th": "ความท้าทายของการตัดคำในภาษาที่ไม่เว้นวรรคระหว่างคำ",
        "en": "The challenge of word segmentation in a language written without spaces between words."
      }
    },
    {
      "id": "kn-medicine-2026-08-04",
      "pdf": { "src": "assets/docs/knowledge/kn-medicine-2026-08-04.pdf", "pages": 4, "bytes": 549277 },
      "field": "medicine",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-08-04",
      "href": "pages/article.html?id=kn-medicine-2026-08-04",
      "title": {
        "th": "ศัพท์แพทย์ภาษาไทยที่ประชาชนควรรู้",
        "en": "Thai medical terms for everyday use"
      },
      "excerpt": {
        "th": "การเลือกใช้คำที่ช่วยให้ผู้ป่วยเข้าใจการรักษา",
        "en": "Choosing words that help patients understand their care."
      }
    },
    {
      "id": "kn-medicine-2026-03-19",
      "pdf": { "src": "assets/docs/knowledge/kn-medicine-2026-03-19.pdf", "pages": 4, "bytes": 650313 },
      "field": "medicine",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-03-19",
      "href": "pages/article.html?id=kn-medicine-2026-03-19",
      "title": {
        "th": "การสื่อสารความเสี่ยงด้านสุขภาพ",
        "en": "Communicating health risks"
      },
      "excerpt": {
        "th": "การอธิบายความเสี่ยงและความไม่แน่นอนอย่างตรงไปตรงมาและชัดเจน",
        "en": "Explaining risk and uncertainty honestly and clearly."
      }
    },
    {
      "id": "kn-medicine-2025-12-08",
      "pdf": { "src": "assets/docs/knowledge/kn-medicine-2025-12-08.pdf", "pages": 4, "bytes": 644232 },
      "field": "medicine",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2025-12-08",
      "href": "pages/article.html?id=kn-medicine-2025-12-08",
      "title": {
        "th": "ตำราการแพทย์แผนไทยในมุมมองวิชาการ",
        "en": "Thai traditional medicine texts as scholarly sources"
      },
      "excerpt": {
        "th": "การศึกษาตำราดั้งเดิมด้วยวิธีการทางวิชาการ",
        "en": "Studying traditional texts with scholarly methods."
      }
    },
    {
      "id": "kn-social-2026-08-25",
      "pdf": { "src": "assets/docs/knowledge/kn-social-2026-08-25.pdf", "pages": 4, "bytes": 560865 },
      "field": "social",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-08-25",
      "href": "pages/article.html?id=kn-social-2026-08-25",
      "title": {
        "th": "การเรียนรู้ตลอดชีวิตในสังคมสูงวัย",
        "en": "Lifelong learning in an ageing society"
      },
      "excerpt": {
        "th": "แนวคิดสำคัญและบทบาทของชุมชนในการส่งเสริมการเรียนรู้",
        "en": "Key ideas and the role of communities in supporting learning."
      }
    },
    {
      "id": "kn-social-2026-06-17",
      "pdf": { "src": "assets/docs/knowledge/kn-social-2026-06-17.pdf", "pages": 3, "bytes": 558101 },
      "field": "social",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-06-17",
      "href": "pages/article.html?id=kn-social-2026-06-17",
      "title": {
        "th": "ความรู้เท่าทันสื่อในยุคดิจิทัล",
        "en": "Media literacy in the digital age"
      },
      "excerpt": {
        "th": "ตรวจสอบแหล่งข้อมูลก่อนเชื่อและก่อนแบ่งปัน",
        "en": "Checking a source before believing and sharing it."
      }
    },
    {
      "id": "kn-social-2025-10-30",
      "pdf": { "src": "assets/docs/knowledge/kn-social-2025-10-30.pdf", "pages": 3, "bytes": 572962 },
      "field": "social",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2025-10-30",
      "href": "pages/article.html?id=kn-social-2025-10-30",
      "title": {
        "th": "โลกาภิวัตน์กับอัตลักษณ์ท้องถิ่น",
        "en": "Globalisation and local identity"
      },
      "excerpt": {
        "th": "กระแสโลกและวัฒนธรรมท้องถิ่นส่งผลต่อกันอย่างไร",
        "en": "How global currents and local cultures shape each other."
      }
    },
    {
      "id": "kn-arts-2026-07-14",
      "pdf": { "src": "assets/docs/knowledge/kn-arts-2026-07-14.pdf", "pages": 3, "bytes": 534645 },
      "field": "arts",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-07-14",
      "href": "pages/article.html?id=kn-arts-2026-07-14",
      "title": {
        "th": "การสืบทอดดนตรีไทยในสถาบันการศึกษา",
        "en": "Passing on Thai classical music"
      },
      "excerpt": {
        "th": "การถ่ายทอดจากครูสู่ศิษย์ และการปรับตัวในระบบการศึกษา",
        "en": "Teacher-to-student transmission and how it adapts to formal education."
      }
    },
    {
      "id": "kn-arts-2026-04-23",
      "pdf": { "src": "assets/docs/knowledge/kn-arts-2026-04-23.pdf", "pages": 4, "bytes": 536756 },
      "field": "arts",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-04-23",
      "href": "pages/article.html?id=kn-arts-2026-04-23",
      "title": {
        "th": "ลวดลายประดับในสถาปัตยกรรมไทย",
        "en": "Ornament in Thai architecture"
      },
      "excerpt": {
        "th": "ความหมายและหน้าที่ของลวดลายประดับในอาคารแบบไทย",
        "en": "The meaning and function of decorative motifs in Thai buildings."
      }
    },
    {
      "id": "kn-arts-2026-01-15",
      "pdf": { "src": "assets/docs/knowledge/kn-arts-2026-01-15.pdf", "pages": 3, "bytes": 571460 },
      "field": "arts",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-01-15",
      "href": "pages/article.html?id=kn-arts-2026-01-15",
      "title": {
        "th": "หลักการอนุรักษ์จิตรกรรมฝาผนัง",
        "en": "Principles of mural painting conservation"
      },
      "excerpt": {
        "th": "หลักพื้นฐานในการดูแลจิตรกรรมฝาผนังให้คงสภาพ",
        "en": "Basic principles for keeping mural paintings in good condition."
      }
    },
    {
      "id": "kn-history-2026-08-11",
      "pdf": { "src": "assets/docs/knowledge/kn-history-2026-08-11.pdf", "pages": 4, "bytes": 557415 },
      "field": "history",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-08-11",
      "href": "pages/article.html?id=kn-history-2026-08-11",
      "title": {
        "th": "การอ่านจารึกในฐานะหลักฐานทางประวัติศาสตร์",
        "en": "Reading inscriptions as historical sources"
      },
      "excerpt": {
        "th": "จารึกบอกอะไรเราได้ และข้อควรระวังในการตีความ",
        "en": "What inscriptions can tell us, and what to watch for when interpreting them."
      }
    },
    {
      "id": "kn-history-2026-05-28",
      "pdf": { "src": "assets/docs/knowledge/kn-history-2026-05-28.pdf", "pages": 4, "bytes": 501120 },
      "field": "history",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-05-28",
      "href": "pages/article.html?id=kn-history-2026-05-28",
      "title": {
        "th": "ชื่อบ้านนามเมืองกับร่องรอยทางประวัติศาสตร์",
        "en": "Place names as traces of the past"
      },
      "excerpt": {
        "th": "ชื่อสถานที่สะท้อนภูมิประเทศ ผู้คน และความเปลี่ยนแปลงอย่างไร",
        "en": "How place names reflect landscape, people and change."
      }
    },
    {
      "id": "kn-history-2025-09-22",
      "pdf": { "src": "assets/docs/knowledge/kn-history-2025-09-22.pdf", "pages": 3, "bytes": 569400 },
      "field": "history",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2025-09-22",
      "href": "pages/article.html?id=kn-history-2025-09-22",
      "title": {
        "th": "ประวัติศาสตร์เอเชียตะวันออกเฉียงใต้ในมุมมองเปรียบเทียบ",
        "en": "Southeast Asian history in comparative perspective"
      },
      "excerpt": {
        "th": "การศึกษาความเชื่อมโยงของรัฐและสังคมในภูมิภาค",
        "en": "Studying the links between states and societies across the region."
      }
    },
    {
      "id": "kn-law-2026-03-14",
      "pdf": { "src": "assets/docs/knowledge/kn-law-2026-03-14.pdf", "pages": 3, "bytes": 595616 },
      "field": "law",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-03-14",
      "href": "pages/article.html?id=kn-law-2026-03-14",
      "title": {
        "th": "ภาษากฎหมายที่ประชาชนเข้าใจได้",
        "en": "Legal language the public can understand"
      },
      "excerpt": {
        "th": "แนวทางเขียนกฎหมายและประกาศราชการด้วยภาษาที่ชัดเจน",
        "en": "Writing laws and public notices in clear language."
      }
    },
    {
      "id": "kn-law-2026-06-24",
      "pdf": { "src": "assets/docs/knowledge/kn-law-2026-06-24.pdf", "pages": 4, "bytes": 576965 },
      "field": "law",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-06-24",
      "href": "pages/article.html?id=kn-law-2026-06-24",
      "title": {
        "th": "หลักนิติธรรมกับการบริหารราชการ",
        "en": "The rule of law in public administration"
      },
      "excerpt": {
        "th": "ความหมายของหลักนิติธรรม และการนำไปใช้ในการปฏิบัติราชการ",
        "en": "What the rule of law means and how it applies to government work."
      }
    },
    {
      "id": "kn-law-2026-02-05",
      "pdf": { "src": "assets/docs/knowledge/kn-law-2026-02-05.pdf", "pages": 3, "bytes": 539313 },
      "field": "law",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-02-05",
      "href": "pages/article.html?id=kn-law-2026-02-05",
      "title": {
        "th": "ศัพท์กฎหมายที่มักใช้สับสน",
        "en": "Legal terms that are often confused"
      },
      "excerpt": {
        "th": "คำที่มีความหมายใกล้เคียงกันแต่มีผลทางกฎหมายต่างกัน",
        "en": "Words with similar meanings but different legal effects."
      }
    },
    {
      "id": "kn-economics-2026-07-30",
      "pdf": { "src": "assets/docs/knowledge/kn-economics-2026-07-30.pdf", "pages": 3, "bytes": 634864 },
      "field": "economics",
      "type": {
        "th": "บทความวิชาการ",
        "en": "Academic article"
      },
      "date": "2026-07-30",
      "href": "pages/article.html?id=kn-economics-2026-07-30",
      "title": {
        "th": "คำถามสำคัญของเศรษฐศาสตร์การพัฒนา",
        "en": "Development economics: key questions"
      },
      "excerpt": {
        "th": "แนวคิดหลักว่าเศรษฐกิจเติบโตอย่างไร และใครได้รับประโยชน์",
        "en": "Core ideas behind how economies grow and who benefits."
      }
    },
    {
      "id": "kn-economics-2026-05-06",
      "pdf": { "src": "assets/docs/knowledge/kn-economics-2026-05-06.pdf", "pages": 3, "bytes": 560757 },
      "field": "economics",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2026-05-06",
      "href": "pages/article.html?id=kn-economics-2026-05-06",
      "title": {
        "th": "การคลังสาธารณะสำหรับผู้อ่านทั่วไป",
        "en": "Public finance for general readers"
      },
      "excerpt": {
        "th": "รายได้ รายจ่าย และหนี้สาธารณะของรัฐทำงานอย่างไร",
        "en": "How government revenue, spending and public debt work."
      }
    },
    {
      "id": "kn-economics-2025-11-26",
      "pdf": { "src": "assets/docs/knowledge/kn-economics-2025-11-26.pdf", "pages": 4, "bytes": 596970 },
      "field": "economics",
      "type": {
        "th": "คลังความรู้",
        "en": "Knowledge base"
      },
      "date": "2025-11-26",
      "href": "pages/article.html?id=kn-economics-2025-11-26",
      "title": {
        "th": "ศัพท์เศรษฐศาสตร์ในข่าวที่ควรเข้าใจ",
        "en": "Economic terms you meet in the news"
      },
      "excerpt": {
        "th": "คำที่พบบ่อย เช่น เงินเฟ้อ และอัตราแลกเปลี่ยน",
        "en": "Common terms such as inflation and exchange rates."
      }
    }
  ]
};
