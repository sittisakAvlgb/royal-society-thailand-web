/* ============================================================================
 * data/knowledge.js — the knowledge page: fields and their articles
 *  fields: { id, name {th,en}, desc {th,en} } in page order
 *  items:  { id, field, type {th,en}, academy 'science'|'moral'|'arts',
 *            date (ISO, as first published), href (pages/article.html?id=…),
 *            image (the article's own picture), title {th,en}, excerpt {th,en},
 *            pdf { src, pages, bytes } — optional: the Office's own PDF of the
 *            article; the article page offers ดูตัวอย่าง / เปิดเอกสาร. Never a
 *            PDF printed from a web page.
 *            from — the article's original page on its Academy's website. The
 *            Academies publish these articles as web pages only (no PDF), so
 *            the article page links here under "บทความต้นฉบับ". }
 *  The articles are the academies' own, as published on
 *  science.royalsociety.go.th, mps.royalsociety.go.th and
 *  arts.royalsociety.go.th (title, author, date, text and picture as there;
 *  the summary is the article's opening; English titles and summaries are
 *  translations for this site). Each is filed under the nearest field.
 *  TODO (CMS): the Office adds new articles here.
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
      "id": "kn-arts-698",
      "field": "language",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-02-04",
      "href": "pages/article.html?id=kn-arts-698",
      "image": "assets/images/knowledge/kn-arts-698.jpg",
      "title": {
        "th": "ศัพทมูลของคำว่า กั้นหยั่น",
        "en": "The etymology of the word kanyan"
      },
      "excerpt": {
        "th": "มีผู้เสนอว่า กั้นหยั่น เป็นคำที่มีศัพทมูลมาจากภาษาจีน เดิมเป็นชื่อเฉพาะของกระบี่เล่มหนึ่ง เรียกกระบี่ กันจีอ่อง (乾將) ในภาษาจีนฮกเกี้ยน หรือ กังเจี่ยง…",
        "en": "Traces the Thai word for a short curved dagger to the Persian khanjar rather than to Chinese, as was once proposed."
      },
      "from": "https://arts.royalsociety.go.th/ศัพทมูลของคำว่า-กั้นหยั/"
    },
    {
      "id": "kn-arts-707",
      "field": "language",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-03-19",
      "href": "pages/article.html?id=kn-arts-707",
      "image": "assets/images/knowledge/kn-arts-707.jpg",
      "title": {
        "th": "ภาษาไทย : การรวมอำนาจ กับ การกระจายอำนาจ",
        "en": "Thai spelling: centralisation and decentralisation"
      },
      "excerpt": {
        "th": "บทความนี้กล่าวถึงความเป็นมาของรูปการเขียนคำไทยที่แต่เดิมเขียนได้หลายแบบ ดังที่ปรากฏในเอกสารโบราณหลายฉบับ แต่เมื่อถึง พ.ศ. ๒๔๗๐…",
        "en": "How written Thai moved from many spellings to one official standard, and the pressures on that standard today."
      },
      "from": "https://arts.royalsociety.go.th/ภาษาไทย-การรวมอำนาจ-กับ/"
    },
    {
      "id": "kn-arts-695",
      "field": "language",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-01-07",
      "href": "pages/article.html?id=kn-arts-695",
      "image": "assets/images/knowledge/kn-arts-695.jpg",
      "title": {
        "th": "สวัสดิมงคล",
        "en": "Sawatdi-mongkhon: the meaning of a blessing"
      },
      "excerpt": {
        "th": "สวัสดิมงคล เป็นคำสำคัญคำหนึ่งที่คนไทยนิยมใช้พูดใช้เขียนที่หมายถึงความดีงาม ความเจริญรุ่งเรือง ความปลอดภัย ความยั่งยืน เป็นต้น…",
        "en": "What the auspicious word sawatdi-mongkhon means and how Thais use it to wish others well."
      },
      "from": "https://arts.royalsociety.go.th/สวัสดิมงคล/"
    },
    {
      "id": "kn-science-806",
      "field": "science",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2019-02-20",
      "href": "pages/article.html?id=kn-science-806",
      "image": "assets/images/knowledge/kn-science-806.jpg",
      "title": {
        "th": "กลวิธานการเกิดมลภาวะอากาศ PM2.5 ในประเทศไทย เดือนมกราคม ๒๕๖๒",
        "en": "How the January 2019 PM2.5 haze formed in Thailand"
      },
      "excerpt": {
        "th": "ช่วงเดือนมกราคม ๒๕๖๒ ที่ผ่านไป ได้เกิดปัญหาฝุ่นละอองขนาด PM2.5 สูงเกินค่ามาตรฐานบริเวณกรุงเทพฯและจังหวัดใกล้เคียงอย่างน้อย ๑๒ จังหวัด ได้แก่ นครปฐม…",
        "en": "Where the fine dust around Bangkok came from, why it built up under a temperature inversion, and what policy should do."
      },
      "from": "https://science.royalsociety.go.th/กลวิธานการเกิดมลภาวะอา/"
    },
    {
      "id": "kn-science-185",
      "field": "science",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-06-21",
      "href": "pages/article.html?id=kn-science-185",
      "image": "assets/images/knowledge/kn-science-185.jpg",
      "title": {
        "th": "พืชดัดแปรพันธุกรรม: เราจะไปทางไหนดี?",
        "en": "Genetically modified crops: which way forward?"
      },
      "excerpt": {
        "th": "GMO หรือ Genetically modified organisms ได้แก่ สิ่งมีชีวิต (พืช สัตว์ จุลินทรีย์) ที่ถูกดัดแปรพันธุกรรมด้วยกระบวนการทางพันธุวิศวกรรม…",
        "en": "What GMOs are, their benefits and risks, and the choices Thailand faces."
      },
      "from": "https://science.royalsociety.go.th/พืชดัดแปรพันธุกรรม/"
    },
    {
      "id": "kn-science-823",
      "field": "science",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2019-03-06",
      "href": "pages/article.html?id=kn-science-823",
      "image": "assets/images/knowledge/kn-science-823.jpg",
      "title": {
        "th": "ความหลากหลายและการพัฒนาเห็ดทรัฟเฟิลในประเทศไทย",
        "en": "Truffle diversity and development in Thailand"
      },
      "excerpt": {
        "th": "เห็ดทรัฟเฟิลเป็นเห็ดรับประทานได้และมีราคาแพงแพงที่สุดในโลก…",
        "en": "The truffles found in Thailand and research towards cultivating them."
      },
      "from": "https://science.royalsociety.go.th/ความหลากหลายและการพัฒน/"
    },
    {
      "id": "kn-science-457",
      "field": "science",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-11-15",
      "href": "pages/article.html?id=kn-science-457",
      "image": "assets/images/knowledge/kn-science-457.jpg",
      "title": {
        "th": "น้ำแข็งติดไฟ",
        "en": "Fire ice: methane hydrate"
      },
      "excerpt": {
        "th": "ในช่วงเวลาที่ผ่านมาไม่นานนี้ มีรายงานที่เกี่ยวกับความสำเร็จในการผลิตก๊าซมีเทนจากมีเทนไฮเดรต (methane hydrate) หรือที่เรียกกันว่า “น้ำแข็งติดไฟ”…",
        "en": "What methane hydrate is, where it is found, and the promise and risks of producing gas from it."
      },
      "from": "https://science.royalsociety.go.th/methane-hydrate/"
    },
    {
      "id": "kn-science-374",
      "field": "technology",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-10-04",
      "href": "pages/article.html?id=kn-science-374",
      "image": "assets/images/knowledge/kn-science-374.jpg",
      "title": {
        "th": "แนวคิดการพัฒนาเมืองอัจฉริยะ",
        "en": "Developing smart cities"
      },
      "excerpt": {
        "th": "เมืองอัจฉริยะ (Smart cities) เป็นคำที่มีความหมายค่อนข้างกว้าง เนื่องจากสามารถพิจารณาถึงความเป็นอัจฉริยะได้จากหลากหลายประเด็น อย่างไรก็ตาม…",
        "en": "What makes a city smart beyond its technology, and how cities can plan to become one."
      },
      "from": "https://science.royalsociety.go.th/smart-cities-develop-concept/"
    },
    {
      "id": "kn-science-364",
      "field": "technology",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-10-04",
      "href": "pages/article.html?id=kn-science-364",
      "image": "assets/images/knowledge/kn-science-364.jpg",
      "title": {
        "th": "ปัญญาประดิษฐ์ (การเรียนรู้เชิงลึกและเทคโนโลยีหุ่นยนต์โต้ตอบการสนทนา)",
        "en": "Artificial intelligence: deep learning and conversational robots"
      },
      "excerpt": {
        "th": "ปัญญาประดิษฐ์ (Artificial intelligence) นับเป็นศูนย์กลางของศาสตร์ที่เกี่ยวข้องอีกหลาย ๆ แขนง เช่น Big data, Fintech, Internet of Things (IoT) และอื่น…",
        "en": "How deep learning works and how it powers chatbots and social robots."
      },
      "from": "https://science.royalsociety.go.th/ai-chatbot/"
    },
    {
      "id": "kn-science-873",
      "field": "technology",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2019-12-18",
      "href": "pages/article.html?id=kn-science-873",
      "image": "assets/images/knowledge/kn-science-873.jpg",
      "title": {
        "th": "เครื่องพิมพ์ ๓ มิติ (3D Printer) กับการพัฒนาอุตสาหกรรม",
        "en": "3D printing and industrial development"
      },
      "excerpt": {
        "th": "เทคโนโลยีการพิมพ์ ๓ มิติ หรือ 3D Printing เป็นหนึ่งในเทคโนโลยีสมัยใหม่และเป็น Disruption Technology ที่จะมีส่วนสำคัญในการปฏิวัติอุตสาหกรรมครั้งที่ ๔…",
        "en": "3D printing technologies and their part in the fourth industrial revolution."
      },
      "from": "https://science.royalsociety.go.th/เครื่องพิมพ์-๓-มิติ-3d-printer-กับ/"
    },
    {
      "id": "kn-science-952",
      "field": "technology",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2020-05-14",
      "href": "pages/article.html?id=kn-science-952",
      "image": "assets/images/knowledge/kn-science-952.jpg",
      "title": {
        "th": "ประเภทของเงินดิจิตอลและเทคโนโลยีที่เกี่ยวข้อง",
        "en": "Types of digital currency and their technologies"
      },
      "excerpt": {
        "th": "เมื่อเดือนต้นเดือนพฤษภาคม ๒๕๖๓ ที่ผ่านมานี้ ได้มีข่าวว่าธนาคารกลางจีน (PBoC) ได้เริ่มมีการทดสอบเงินหยวนดิจิทัลแล้วใน ๔ เมืองหลัก คือ ซูโจว เซินเจิ้น…",
        "en": "From cryptocurrencies to China’s digital yuan: how kinds of digital money differ and work."
      },
      "from": "https://science.royalsociety.go.th/ประเภทของเงินดิจิตอลแล/"
    },
    {
      "id": "kn-science-436",
      "field": "medicine",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-10-18",
      "href": "pages/article.html?id=kn-science-436",
      "image": "assets/images/knowledge/kn-science-436.jpg",
      "title": {
        "th": "วัคซีนป้องกันมะเร็ง",
        "en": "Cancer vaccines"
      },
      "excerpt": {
        "th": "วัคซีนป้องกันโรคมะเร็งสามารถจำแนกออกได้เป็น ๒ กลุ่ม ได้แก่ วัคซีนที่ใช้ในการป้องกัน และวัคซีนที่ใช้ในการบำบัดรักษา…",
        "en": "Preventive and therapeutic vaccines against cancer, and how each works."
      },
      "from": "https://science.royalsociety.go.th/cancer-vaccines/"
    },
    {
      "id": "kn-science-480",
      "field": "medicine",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-09-20",
      "href": "pages/article.html?id=kn-science-480",
      "image": "assets/images/knowledge/kn-science-480.jpg",
      "title": {
        "th": "สถานการณ์วัณโรคในประเทศไทย",
        "en": "Tuberculosis in Thailand"
      },
      "excerpt": {
        "th": "วัณโรค (Tuberculosis: TB) อาจจัดได้ว่าเป็นโรคอุบัติซ้ำ (Re-emerging disease) โดยเหตุที่เคยเป็นปัญหาด้านสุขภาพของโลกและของประเทศไทย…",
        "en": "Why TB has re-emerged as a health problem and how Thailand is responding."
      },
      "from": "https://science.royalsociety.go.th/tuberculosis-in-thailand/"
    },
    {
      "id": "kn-science-429",
      "field": "medicine",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-08-16",
      "href": "pages/article.html?id=kn-science-429",
      "image": "assets/images/knowledge/kn-science-429.jpg",
      "title": {
        "th": "การลดสารพิษปนเปื้อนในผักและผลไม้ก่อนการบริโภค",
        "en": "Reducing pesticide residues in fruit and vegetables"
      },
      "excerpt": {
        "th": "ในปัจจุบันการพัฒนาระบบการปลูกพืชและการดูแลพืชเปลี่ยนแปลงไปเป็นอย่างมากเมื่อเทียบกับการเกษตรในอดีต ทั้งนี้ เนื่องจากสภาพแวดล้อมที่เปลี่ยนแปลงไป…",
        "en": "Practical ways to wash and prepare produce to remove contaminants before eating."
      },
      "from": "https://science.royalsociety.go.th/reduction-of-toxin-contamination-in-vegetables-and-fruits-before-consumption/"
    },
    {
      "id": "kn-science-800",
      "field": "medicine",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2019-02-06",
      "href": "pages/article.html?id=kn-science-800",
      "image": "assets/images/knowledge/kn-science-800.jpg",
      "title": {
        "th": "กัญชง/กัญชา",
        "en": "Hemp and cannabis"
      },
      "excerpt": {
        "th": "กัญชงมีชื่อวิทยาศาสตร์ว่า Cannabis sativa subspecies sativa กัญชามีชื่อวิทยาศาสตร์เดียวกัน แต่อยู่ใน subsp. indica ชื่อสามัญที่นิยมใช้เรียกกัญชง คือ…",
        "en": "How hemp and cannabis differ, their active compounds and their uses."
      },
      "from": "https://science.royalsociety.go.th/กัญชง-กัญชา/"
    },
    {
      "id": "kn-mps-772",
      "field": "social",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-09-04",
      "href": "pages/article.html?id=kn-mps-772",
      "image": "assets/images/knowledge/kn-mps-772.jpg",
      "title": {
        "th": "โฉมหน้าครอบครัวไทย : อดีตและปัจจุบัน",
        "en": "The Thai family: past and present"
      },
      "excerpt": {
        "th": "บทความนี้มีวัตถุประสงค์จะเสนอภาพครอบครัวไทย ตั้งแต่อดีตจนถึงปัจจุบัน โดยแบ่งเนื้อหาหลักออกเป็น 2 ส่วน คือส่วนที่ว่าด้วยครอบครัวไทยในอดีต…",
        "en": "Evidence that most Thai families have long been nuclear, and the seven kinds of family found today."
      },
      "from": "https://mps.royalsociety.go.th/โฉมหน้าครอบครัวไทย-อดี/"
    },
    {
      "id": "kn-mps-720",
      "field": "social",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-03-06",
      "href": "pages/article.html?id=kn-mps-720",
      "image": "assets/images/knowledge/kn-mps-720.jpg",
      "title": {
        "th": "การศึกษาแบบเรียนรวมเพื่อความเป็นธรรมในสังคม (Inclusive Education for Social Justice)",
        "en": "Inclusive education for social justice"
      },
      "excerpt": {
        "th": "การศึกษาแบบเรียนรวม คือ การจัดการการศึกษาเพื่อให้ผู้เรียนที่มีความต้องการพิเศษได้บรรลุศักยภาพสูงสุดแห่งตนในโรงเรียนเดียวกันกับเด็กปรกติ…",
        "en": "Teaching learners with special needs alongside their peers in local schools."
      },
      "from": "https://mps.royalsociety.go.th/การศึกษาแบบเรียนรวมเพื/"
    },
    {
      "id": "kn-mps-748",
      "field": "social",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-06-19",
      "href": "pages/article.html?id=kn-mps-748",
      "image": "assets/images/knowledge/kn-mps-748.jpg",
      "title": {
        "th": "ความลึกลับของสื่อสังคม (The Mystery of Social Media)",
        "en": "The mystery of social media"
      },
      "excerpt": {
        "th": "ปัจจุบันมีคนจำนวนมากใช้อินเทอร์เน็ตโดยมองไม่เห็นบางสิ่งที่ซ่อนอยู่ นั่นคือปรากฏการณ์อันเป็นผลจาก กลไกข่าวสาร ขับเคลื่อนไปพร้อมกับ กลไกของเกม…",
        "en": "The hidden mechanisms of information and gaming that shape what people see online."
      },
      "from": "https://mps.royalsociety.go.th/ความลึกลับของสื่อสังคม/"
    },
    {
      "id": "kn-arts-717",
      "field": "arts",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-04-23",
      "href": "pages/article.html?id=kn-arts-717",
      "image": "assets/images/knowledge/kn-arts-717.png",
      "title": {
        "th": "จิตรกรรมฝีมือกลุ่มช่างพื้นบ้านชลบุรี",
        "en": "Murals by the folk painters of Chonburi"
      },
      "excerpt": {
        "th": "จิตรกรรมเป็นงานศิลปะประเภทหนึ่งของไทยที่ส่วนมากเกี่ยวเนื่องกับพุทธศาสนา ปรากฏอยู่ทุกภาค…",
        "en": "The style and subjects of temple murals by local painters in eastern Thailand."
      },
      "from": "https://arts.royalsociety.go.th/จิตรกรรมฝีมือกลุ่มช่าง/"
    },
    {
      "id": "kn-arts-704",
      "field": "arts",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-03-03",
      "href": "pages/article.html?id=kn-arts-704",
      "image": "assets/images/knowledge/kn-arts-704.png",
      "title": {
        "th": "พระขรรค์ในนาฏกรรมไทย",
        "en": "The phra khan sword in Thai dance drama"
      },
      "excerpt": {
        "th": "ขรรค์ พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔ ขรรค์ [ขัน] น. ศัสตราวุธชนิดหนึ่งมีคม ๒ ข้าง ที่กลางใบมีดทั้งใบและหลังเป็นสันเล็กคล้ายคมรูปหอก ด้ามสั้น…",
        "en": "The royal sword as a symbol of kingship and its place in Thai classical performance."
      },
      "from": "https://arts.royalsociety.go.th/พระขรรค์ในนาฏกรรมไทย/"
    },
    {
      "id": "kn-arts-701",
      "field": "arts",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-02-04",
      "href": "pages/article.html?id=kn-arts-701",
      "image": "assets/images/knowledge/kn-arts-701.jpg",
      "title": {
        "th": "เปลี่ยนสลับ ทับซ้อน ซ่อนร่าง ให้เป็นงานสร้างสรรค์",
        "en": "Shifting, overlapping, hidden: disguise as creative work"
      },
      "excerpt": {
        "th": "บทความนี้เป็นส่วนหนึ่งของปาฐกถานำในการประชุมสัมมนาวิชาการเรื่อง เปลี่ยนสลับ ทับซ้อน ซ่อนร่างในประเพณี และการละเล่นสวมหน้ากากในประเทศไทย…",
        "en": "Masks and disguise in Thai traditions and play as a source for new creative work."
      },
      "from": "https://arts.royalsociety.go.th/เปลี่ยนสลับ-ทับซ้อน-ซ่อน/"
    },
    {
      "id": "kn-arts-711",
      "field": "arts",
      "type": {
        "th": "บทคัดย่อ",
        "en": "Abstract"
      },
      "academy": "arts",
      "date": "2020-03-19",
      "href": "pages/article.html?id=kn-arts-711",
      "image": "assets/images/knowledge/kn-arts-711.jpg",
      "title": {
        "th": "แนวทางการออกแบบสภาพแวดล้อมสำหรับชุมชนสูงอายุ (Design Guidelines for Aged Community Environment)",
        "en": "Design guidelines for ageing communities"
      },
      "excerpt": {
        "th": "ในช่วงเวลาอีก ๒๓ ปีข้างหน้า ประเทศไทยจะเข้าสู่ “สังคมสูงอายุอย่างสมบูรณ์” เมื่อประชากร ร้อยละ ๒๐ จะมีอายุตั้งแต่ ๖๐ ปีขึ้นไป…",
        "en": "Designing community environments for a fully aged Thai society."
      },
      "from": "https://arts.royalsociety.go.th/แนวทางการออกแบบสภาพแวด/"
    },
    {
      "id": "kn-mps-799",
      "field": "history",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2020-01-15",
      "href": "pages/article.html?id=kn-mps-799",
      "image": "assets/images/knowledge/kn-mps-799.jpg",
      "title": {
        "th": "ทฤษฎีระบบราชการกับการจัดระเบียบบริหารราชการแผ่นดินในสมัยกรุงศรีอยุธยา",
        "en": "Bureaucracy theory and the government of Ayutthaya"
      },
      "excerpt": {
        "th": "ทฤษฎีการบริหารองค์การขนาดใหญ่ที่เป็นที่ยอมรับและมีการใช้กันอย่างกว้างขวางมาจนกระทั่งปัจจุบันคือ ทฤษฎีระบบราชการ (Bureaucracy) ของแมกซ์ เวเบอร์ (Max…",
        "en": "Reading the organisation of government in the Ayutthaya kingdom through Max Weber’s theory of bureaucracy."
      },
      "from": "https://mps.royalsociety.go.th/ทฤษฎีระบบราชการกับการจ/"
    },
    {
      "id": "kn-mps-786",
      "field": "history",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-11-06",
      "href": "pages/article.html?id=kn-mps-786",
      "image": "assets/images/knowledge/kn-mps-786.png",
      "title": {
        "th": "คดีพญาระกา–บทเรียนจากประวัติศาสตร์ไทย",
        "en": "The Phaya Raka case: a lesson from Thai history"
      },
      "excerpt": {
        "th": "คดีพญาระกาเป็นคดีสำคัญในประวัติศาสตร์ไทยคดีหนึ่ง ซึ่งเป็นคดีพิพาทในข้อหาหมิ่นประมาทโดยการโฆษณา เนื่องจากพระเจ้าบรมวงศ์เธอ กรมพระนราธิปประพันธ์พงศ์…",
        "en": "A famous 1910 defamation case over a satirical play, and what it teaches."
      },
      "from": "https://mps.royalsociety.go.th/คดีพญาระกา-บทเรียนจากป/"
    },
    {
      "id": "kn-mps-754",
      "field": "history",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-07-03",
      "href": "pages/article.html?id=kn-mps-754",
      "image": "assets/images/knowledge/kn-mps-754.png",
      "title": {
        "th": "ล้านนา-เชียงใหม่ : ส่งบรรณาการไปจีน สมัยราชวงศ์หยวนและราชวงศ์หมิง",
        "en": "Lan Na–Chiang Mai tribute to China under the Yuan and Ming"
      },
      "excerpt": {
        "th": "ดินแดนล้านนา-เชียงใหม่ เอกสาร จีนเรียกว่า “ปาไป่สีฟู” ปรากฏใน “จดหมายเหตุประจำรัชกาล” ของจักรพรรดิจีนตั้งแต่สมัยราชวงศ์หยวน เรียกว่า “หยวนสื่อ”…",
        "en": "What Chinese court records reveal about Chiang Mai’s tribute missions to the Yuan and Ming emperors."
      },
      "from": "https://mps.royalsociety.go.th/ล้านนา-เชียงใหม่-ส่งบรร/"
    },
    {
      "id": "kn-mps-751",
      "field": "history",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-07-03",
      "href": "pages/article.html?id=kn-mps-751",
      "image": "assets/images/knowledge/kn-mps-751.jpg",
      "title": {
        "th": "การตั้งถิ่นฐานของสังคมไทย : ปริทัศน์เชิงภูมิศาสตร์มนุษย์",
        "en": "Settlement in Thai society: a human-geography review"
      },
      "excerpt": {
        "th": "ภูมิศาสตร์ (Geography) ซึ่งเป็นศาสตร์ที่ว่าด้วยพื้นดินหรือพื้นโลกสามารถแบ่งสาระได้ออกเป็น 3 แขนงคือ ภูมิศาสตร์กายภาพ (Physical Geography)…",
        "en": "How Thai settlements formed and spread, seen through human geography."
      },
      "from": "https://mps.royalsociety.go.th/การตั้งถิ่นฐานของสังคม/"
    },
    {
      "id": "kn-mps-810",
      "field": "law",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2020-03-05",
      "href": "pages/article.html?id=kn-mps-810",
      "image": "assets/images/knowledge/kn-mps-810.jpg",
      "title": {
        "th": "ข่าวปลอม (fake news) บนโลกอินเตอร์เนต ๔.๐ ในมิติทางกฎหมาย",
        "en": "Fake news on the internet: the legal dimension"
      },
      "excerpt": {
        "th": "ขณะนี้ “ข่าวปลอม (Fake News)” กลายเป็นปัญหาสำคัญของโลกและไม่ว่าใครก็อาจแพร่กระจายข่าวปลอมโดยไม่รู้ตัว…",
        "en": "Why fake news is hard to regulate and how the law deals with it."
      },
      "from": "https://mps.royalsociety.go.th/ข่าวปลอม-fake-news-บนโลกอินเตอร/"
    },
    {
      "id": "kn-mps-783",
      "field": "law",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-10-16",
      "href": "pages/article.html?id=kn-mps-783",
      "image": "assets/images/knowledge/kn-mps-783.jpg",
      "title": {
        "th": "เงินทดแทนเมื่อได้รับอันตรายจากการทำงาน",
        "en": "Compensation for work-related injury"
      },
      "excerpt": {
        "th": "ประเทศไทยให้ความสำคัญในการคุ้มครองลูกจ้างจากการประสบอันตราย เจ็บป่วย หรือสูญหายจากการทำงาน โดยตรากฎหมายเงินทดแทนขึ้นมาใช้บังคับตั้งแต่ พ.ศ. ๒๔๙๙…",
        "en": "How Thai law protects employees injured, taken ill or lost through their work."
      },
      "from": "https://mps.royalsociety.go.th/เงินทดแทนเมื่อได้รับอั/"
    },
    {
      "id": "kn-mps-710",
      "field": "law",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-02-20",
      "href": "pages/article.html?id=kn-mps-710",
      "image": "assets/images/knowledge/kn-mps-710.jpg",
      "title": {
        "th": "ความมั่นคงปลอดภัยไซเบอร์ (Cyber Security) และมาตรการทางกฎหมายเพื่อรับมือภัยคุกคาม",
        "en": "Cyber security and legal measures against threats"
      },
      "excerpt": {
        "th": "เทคโนโลยีสำหรับเศรษฐกิจดิจิทัลเข้ามามีบทบาทต่อประชาชนในสังคมของทุกรัฐในการใช้ชีวิตประจำวันเพื่ออำนวยความสะดวกในการติดต่อสื่อสาร ประกอบวิชาชีพ…",
        "en": "The threats that come with the digital economy and the laws that respond to them."
      },
      "from": "https://mps.royalsociety.go.th/ความมั่นคงปลอดภัยไซเบอ/"
    },
    {
      "id": "kn-mps-694",
      "field": "law",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-01-16",
      "href": "pages/article.html?id=kn-mps-694",
      "image": "assets/images/knowledge/kn-mps-694.png",
      "title": {
        "th": "ความเสมอภาคในความยุติธรรม",
        "en": "Equality in justice"
      },
      "excerpt": {
        "th": "ความเสมอภาคในความยุติธรรม แปลเป็นภาษาอังกฤษได้ว่า equality in justice ซึ่งแผลงมาจากภาษาละตินว่า equalitas in justitia คำแรกมีความหมายเหมือน equation…",
        "en": "What equality in justice means across languages and philosophical traditions."
      },
      "from": "https://mps.royalsociety.go.th/ความเสมอภาคในความยุติธ/"
    },
    {
      "id": "kn-science-760",
      "field": "economics",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2019-01-02",
      "href": "pages/article.html?id=kn-science-760",
      "image": "assets/images/knowledge/kn-science-760.jpg",
      "title": {
        "th": "เศรษฐกิจแบบแบ่งปัน (Sharing Economy)",
        "en": "The sharing economy"
      },
      "excerpt": {
        "th": "Sharing Economy หรือเศรษฐกิจแบ่งปัน เป็นรูปแบบทางธุรกิจ (Business Model) ใหม่ที่มีการเติบโตอย่างรวดเร็วนับตั้งแต่ปี ค.ศ. 2010…",
        "en": "A business model that connects buyers and sellers on digital platforms, from Uber to Airbnb."
      },
      "from": "https://science.royalsociety.go.th/เศรษฐกิจแบบแบ่งปัน-sharing-economy/"
    },
    {
      "id": "kn-mps-813",
      "field": "economics",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2020-03-18",
      "href": "pages/article.html?id=kn-mps-813",
      "image": "assets/images/knowledge/kn-mps-813.jpg",
      "title": {
        "th": "จากเศรษฐกิจซบเซาสู่อนาคตสีเขียว",
        "en": "From economic slowdown to a green future"
      },
      "excerpt": {
        "th": "จากกลางทศวรรษ ๒๕๕๐ การลงทุนภาคเอกชนมีแนวโน้มถดถอย ส่งผลให้เศรษฐกิจไทยโตช้ากว่าประเทศเพื่อนบ้านในอาเซียนทั้งหมด ส่วนหนึ่งเกิดจากภาวะเศรษฐกิจโลกซบเซา…",
        "en": "Why Thai growth slowed and how a green economy could renew it."
      },
      "from": "https://mps.royalsociety.go.th/จากเศรษฐกิจซบเซาสู่อนา/"
    },
    {
      "id": "kn-science-423",
      "field": "economics",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "science",
      "date": "2017-09-20",
      "href": "pages/article.html?id=kn-science-423",
      "image": "assets/images/knowledge/kn-science-423.jpg",
      "title": {
        "th": "เกษตรพันธสัญญากับการจัดการโซ่อุปทานสินค้าเกษตร",
        "en": "Contract farming and agricultural supply chains"
      },
      "excerpt": {
        "th": "เกษตรพันธสัญญา (Contract farming) เริ่มมีการใช้เป็นครั้งแรกโดยบริษัทญี่ปุ่นที่เข้าไปทำธุรกิจในไต้หวันตั้งแต่ช่วงทศวรรษปี ค.ศ. ๑๙๓๐ เพื่อให้มีอุปทาน…",
        "en": "How contract farming works and how it can be fair to farmers."
      },
      "from": "https://science.royalsociety.go.th/contract-farming/"
    },
    {
      "id": "kn-mps-742",
      "field": "economics",
      "type": {
        "th": "บทความ",
        "en": "Article"
      },
      "academy": "moral",
      "date": "2019-06-05",
      "href": "pages/article.html?id=kn-mps-742",
      "image": "assets/images/knowledge/kn-mps-742.jpg",
      "title": {
        "th": "การเปลี่ยนผ่านสู่ดิจิทัล : ความก้าวหน้าของฟินเทคไทย (Digital Transformation: Progress of Thailand’s FinTech)",
        "en": "Digital transformation: the progress of Thai FinTech"
      },
      "excerpt": {
        "th": "ผลจากความก้าวหน้าทางเทคโนโลยีทำให้ระบบนิเวศทางธุรกิจเปลี่ยนแปลงไปอย่างรวดเร็ว มีการนำเทคโนโลยีทางการเงินหรือฟินเทค (FinTech)…",
        "en": "How financial technology is changing financial services in Thailand."
      },
      "from": "https://mps.royalsociety.go.th/การเปลี่ยนผ่านสู่ดิจิท/"
    }
  ]
};
