/* ============================================================================
 * data/search-index.js — SAMPLE search index (prototype only)
 * ============================================================================
 *
 *  Demonstration records so the search, filter and trust-model UI can be
 *  reviewed. This is NOT connected to the official databases.
 *
 *  Production: replace with a search API that queries the dictionary,
 *  coined-term, transliteration and gazetteer systems plus the CMS, and
 *  returns the same record shape:
 *
 *    id          unique id
 *    type        key of RS_SEARCH_TYPES
 *    title       { th, en }   main heading
 *    alt         string       secondary line (e.g. the English term)
 *    summary     { th, en }
 *    source      { th, en }   provenance shown on the result
 *    href        internal path (from project root) or external URL
 *    date        ISO date or null (publication / last update)
 *    academy     'moral' | 'science' | 'arts' | null
 *    topic       knowledge category key or null
 *    contentLang 'th' | 'en' | 'th-en'
 *    keywords    extra match terms
 *
 *  Term records below use widely published Royal Society terms, but every
 *  value must be verified against the official systems before launch.
 * ========================================================================== */

window.RS_SEARCH_TYPES = {
  coined:          { label: { th: 'ศัพท์บัญญัติ', en: 'Coined term' },       icon: 'term',     official: true },
  dictionary:      { label: { th: 'พจนานุกรม', en: 'Dictionary' },          icon: 'book',     official: true },
  transliteration: { label: { th: 'คำทับศัพท์', en: 'Transliteration' },     icon: 'translit', official: true },
  gazetteer:       { label: { th: 'อักขรานุกรมภูมิศาสตร์', en: 'Gazetteer' }, icon: 'globe',    official: true },
  knowledge:       { label: { th: 'คลังความรู้', en: 'Knowledge base' },     icon: 'archive' },
  article:         { label: { th: 'บทความวิชาการ', en: 'Academic article' }, icon: 'doc' },
  research:        { label: { th: 'งานวิจัย', en: 'Research' },              icon: 'doc' },
  journal:         { label: { th: 'วารสาร', en: 'Journal' },                 icon: 'ebook' },
  ebook:           { label: { th: 'E-Book', en: 'E-Book' },                  icon: 'ebook' },
  news:            { label: { th: 'ข่าวและกิจกรรม', en: 'News & events' },    icon: 'calendar' },
  person:          { label: { th: 'ราชบัณฑิตและผู้เชี่ยวชาญ', en: 'Fellows & experts' }, icon: 'people' }
};

window.RS_TOPICS = {
  language:   { th: 'ภาษาและวรรณกรรม', en: 'Language & Literature' },
  science:    { th: 'วิทยาศาสตร์', en: 'Science' },
  technology: { th: 'เทคโนโลยี', en: 'Technology' },
  medicine:   { th: 'แพทยศาสตร์', en: 'Medicine' },
  social:     { th: 'สังคมศาสตร์', en: 'Social Sciences' },
  arts:       { th: 'ศิลปกรรม', en: 'Arts' },
  history:    { th: 'ประวัติศาสตร์', en: 'History' },
  law:        { th: 'กฎหมาย', en: 'Law' },
  economics:  { th: 'เศรษฐศาสตร์', en: 'Economics' }
};

window.RS_POPULAR_SEARCHES = [
  { th: 'ปัญญาประดิษฐ์', en: 'Artificial intelligence' },
  { th: 'จักรวาลนฤมิต', en: 'Metaverse' },
  { th: 'อีเมล', en: 'E-mail' },
  { th: 'โลกาภิวัตน์', en: 'Globalization' },
  { th: 'เมียนมา', en: 'Myanmar' }
];

window.RS_SEARCH_INDEX = [
  /* ---- Coined terms ----------------------------------------------------- */
  {
    id: 'coined-ai', type: 'coined',
    title: { th: 'ปัญญาประดิษฐ์', en: 'ปัญญาประดิษฐ์' }, alt: 'artificial intelligence (AI)',
    summary: { th: 'ศัพท์บัญญัติสาขาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ', en: 'Coined term — computer and information technology' },
    source: { th: 'ระบบศัพท์บัญญัติ สำนักงานราชบัณฑิตยสภา', en: 'Coined-term database, Office of the Royal Society' },
    href: 'https://coined-word.orst.go.th/', date: null, academy: 'science', topic: 'technology', contentLang: 'th-en',
    keywords: ['ai', 'artificial intelligence', 'เอไอ']
  },
  {
    id: 'coined-metaverse', type: 'coined',
    title: { th: 'จักรวาลนฤมิต', en: 'จักรวาลนฤมิต' }, alt: 'metaverse',
    summary: { th: 'ศัพท์บัญญัติ ใช้คู่กับคำทับศัพท์ “เมตาเวิร์ส”', en: 'Coined term; the transliteration “เมตาเวิร์ส” may also be used' },
    source: { th: 'ประกาศราชบัณฑิตยสภา', en: 'Royal Society announcement' },
    href: 'https://coined-word.orst.go.th/', date: null, academy: 'science', topic: 'technology', contentLang: 'th-en',
    keywords: ['metaverse', 'เมตาเวิร์ส']
  },
  {
    id: 'coined-ml', type: 'coined',
    title: { th: 'การเรียนรู้ของเครื่อง', en: 'การเรียนรู้ของเครื่อง' }, alt: 'machine learning',
    summary: { th: 'ศัพท์บัญญัติสาขาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ', en: 'Coined term — computer and information technology' },
    source: { th: 'ระบบศัพท์บัญญัติ สำนักงานราชบัณฑิตยสภา', en: 'Coined-term database, Office of the Royal Society' },
    href: 'https://coined-word.orst.go.th/', date: null, academy: 'science', topic: 'technology', contentLang: 'th-en',
    keywords: ['machine learning', 'ml']
  },
  {
    id: 'coined-algorithm', type: 'coined',
    title: { th: 'ขั้นตอนวิธี', en: 'ขั้นตอนวิธี' }, alt: 'algorithm',
    summary: { th: 'ศัพท์บัญญัติสาขาคอมพิวเตอร์และคณิตศาสตร์', en: 'Coined term — computing and mathematics' },
    source: { th: 'ระบบศัพท์บัญญัติ สำนักงานราชบัณฑิตยสภา', en: 'Coined-term database, Office of the Royal Society' },
    href: 'https://coined-word.orst.go.th/', date: null, academy: 'science', topic: 'technology', contentLang: 'th-en',
    keywords: ['algorithm', 'อัลกอริทึม']
  },
  {
    id: 'coined-globalization', type: 'coined',
    title: { th: 'โลกาภิวัตน์', en: 'โลกาภิวัตน์' }, alt: 'globalization',
    summary: { th: 'ศัพท์บัญญัติสาขาสังคมศาสตร์', en: 'Coined term — social sciences' },
    source: { th: 'ระบบศัพท์บัญญัติ สำนักงานราชบัณฑิตยสภา', en: 'Coined-term database, Office of the Royal Society' },
    href: 'https://coined-word.orst.go.th/', date: null, academy: 'moral', topic: 'social', contentLang: 'th-en',
    keywords: ['globalization', 'globalisation']
  },

  /* ---- Dictionary -------------------------------------------------------- */
  {
    id: 'dict-panya', type: 'dictionary',
    title: { th: 'ปัญญา', en: 'ปัญญา' }, alt: 'น.',
    summary: { th: 'ความรอบรู้ ความรู้ทั่ว', en: 'Noun — wisdom, general knowledge' },
    source: { th: 'พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔', en: 'Royal Institute Dictionary, B.E. 2554 (2011)' },
    href: 'https://dictionary.orst.go.th/', date: null, academy: 'arts', topic: 'language', contentLang: 'th',
    keywords: ['wisdom']
  },
  {
    id: 'dict-phasa', type: 'dictionary',
    title: { th: 'ภาษา', en: 'ภาษา' }, alt: 'น.',
    summary: { th: 'เสียงหรือกิริยาอาการที่ทำความเข้าใจกันได้ คำพูด ถ้อยคำ', en: 'Noun — sounds or gestures through which people understand one another; speech, words' },
    source: { th: 'พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔', en: 'Royal Institute Dictionary, B.E. 2554 (2011)' },
    href: 'https://dictionary.orst.go.th/', date: null, academy: 'arts', topic: 'language', contentLang: 'th',
    keywords: ['language']
  },

  /* ---- Transliteration -------------------------------------------------- */
  {
    id: 'translit-email', type: 'transliteration',
    title: { th: 'อีเมล', en: 'อีเมล' }, alt: 'e-mail',
    summary: { th: 'คำทับศัพท์ภาษาอังกฤษ', en: 'Transliteration of an English word' },
    source: { th: 'ระบบฐานข้อมูลคำทับศัพท์ สำนักงานราชบัณฑิตยสภา', en: 'Transliteration database, Office of the Royal Society' },
    href: 'https://transliteration.orst.go.th/', date: null, academy: 'arts', topic: 'language', contentLang: 'th-en',
    keywords: ['email', 'e-mail', 'อีเมล์']
  },
  {
    id: 'translit-computer', type: 'transliteration',
    title: { th: 'คอมพิวเตอร์', en: 'คอมพิวเตอร์' }, alt: 'computer',
    summary: { th: 'คำทับศัพท์ภาษาอังกฤษ', en: 'Transliteration of an English word' },
    source: { th: 'ระบบฐานข้อมูลคำทับศัพท์ สำนักงานราชบัณฑิตยสภา', en: 'Transliteration database, Office of the Royal Society' },
    href: 'https://transliteration.orst.go.th/', date: null, academy: 'arts', topic: 'technology', contentLang: 'th-en',
    keywords: ['computer']
  },
  {
    id: 'translit-website', type: 'transliteration',
    title: { th: 'เว็บไซต์', en: 'เว็บไซต์' }, alt: 'website',
    summary: { th: 'คำทับศัพท์ภาษาอังกฤษ', en: 'Transliteration of an English word' },
    source: { th: 'ระบบฐานข้อมูลคำทับศัพท์ สำนักงานราชบัณฑิตยสภา', en: 'Transliteration database, Office of the Royal Society' },
    href: 'https://transliteration.orst.go.th/', date: null, academy: 'arts', topic: 'technology', contentLang: 'th-en',
    keywords: ['website', 'เวบไซต์', 'เว็บไซท์']
  },

  /* ---- Gazetteer --------------------------------------------------------- */
  {
    id: 'gaz-myanmar', type: 'gazetteer',
    title: { th: 'เมียนมา', en: 'เมียนมา' }, alt: 'Myanmar',
    summary: { th: 'ชื่อทางการ: สาธารณรัฐแห่งสหภาพเมียนมา', en: 'Official name: Republic of the Union of Myanmar' },
    source: { th: 'อักขรานุกรมภูมิศาสตร์ สำนักงานราชบัณฑิตยสภา', en: 'Gazetteer, Office of the Royal Society' },
    href: 'https://gazetteer.orst.go.th/', date: null, academy: 'moral', topic: 'social', contentLang: 'th-en',
    keywords: ['myanmar', 'burma', 'พม่า']
  },
  {
    id: 'gaz-singapore', type: 'gazetteer',
    title: { th: 'สิงคโปร์', en: 'สิงคโปร์' }, alt: 'Singapore',
    summary: { th: 'ชื่อทางการ: สาธารณรัฐสิงคโปร์', en: 'Official name: Republic of Singapore' },
    source: { th: 'อักขรานุกรมภูมิศาสตร์ สำนักงานราชบัณฑิตยสภา', en: 'Gazetteer, Office of the Royal Society' },
    href: 'https://gazetteer.orst.go.th/', date: null, academy: 'moral', topic: 'social', contentLang: 'th-en',
    keywords: ['singapore']
  },

  /* ---- Articles / knowledge (fictional sample content) ------------------ */
  {
    id: 'article-coining', type: 'article',
    title: { th: 'หลักการบัญญัติศัพท์วิชาการภาษาไทย', en: 'Principles of coining Thai academic terms' },
    alt: '',
    summary: { th: 'ทำความเข้าใจขั้นตอนการพิจารณาศัพท์ใหม่ ตั้งแต่การศึกษาความหมายจนถึงการประกาศใช้', en: 'How new terms are considered, from studying meaning to official announcement.' },
    source: { th: 'บทความตัวอย่าง · สำนักศิลปกรรม', en: 'Sample article · Academy of Arts' },
    href: 'pages/article.html', date: '2026-08-18', academy: 'arts', topic: 'language', contentLang: 'th',
    keywords: ['ศัพท์บัญญัติ', 'coined terms', 'terminology']
  },
  {
    id: 'article-ai-thai', type: 'article',
    title: { th: 'ปัญญาประดิษฐ์กับการใช้ภาษาไทยในงานวิชาการ', en: 'Artificial intelligence and Thai in academic writing' },
    alt: '',
    summary: { th: 'ข้อควรพิจารณาในการใช้เครื่องมือปัญญาประดิษฐ์ช่วยเขียนและแปลงานวิชาการ', en: 'Considerations when using AI tools to write and translate academic work.' },
    source: { th: 'บทความตัวอย่าง · สำนักวิทยาศาสตร์', en: 'Sample article · Academy of Science' },
    href: 'pages/article.html', date: '2026-07-02', academy: 'science', topic: 'technology', contentLang: 'th',
    keywords: ['ai', 'ปัญญาประดิษฐ์', 'artificial intelligence']
  },
  {
    id: 'knowledge-translit', type: 'knowledge',
    title: { th: 'เขียนคำทับศัพท์ภาษาอังกฤษอย่างไรให้ถูกหลัก', en: 'How to transliterate English words into Thai' },
    alt: '',
    summary: { th: 'สรุปหลักเกณฑ์ที่พบบ่อย เช่น การใช้วรรณยุกต์และตัวการันต์', en: 'A summary of common rules, such as tone marks and silent letters.' },
    source: { th: 'คลังความรู้ (ตัวอย่าง)', en: 'Knowledge base (sample)' },
    href: 'pages/article.html', date: '2026-05-21', academy: 'arts', topic: 'language', contentLang: 'th',
    keywords: ['ทับศัพท์', 'transliteration', 'อีเมล']
  },
  {
    id: 'research-biodiversity', type: 'research',
    title: { th: 'ความหลากหลายทางชีวภาพของป่าชายเลนไทย', en: 'Biodiversity of Thai mangrove forests' },
    alt: '',
    summary: { th: 'รายงานการวิจัยตัวอย่างด้านนิเวศวิทยาชายฝั่ง', en: 'Sample research report on coastal ecology.' },
    source: { th: 'งานวิจัยตัวอย่าง · สำนักวิทยาศาสตร์', en: 'Sample research · Academy of Science' },
    href: 'pages/article.html', date: '2025-11-10', academy: 'science', topic: 'science', contentLang: 'th-en',
    keywords: ['mangrove', 'biodiversity', 'ป่าชายเลน']
  },
  {
    id: 'research-ageing', type: 'research',
    title: { th: 'สังคมสูงวัยกับความมั่นคงทางรายได้ของครัวเรือนไทย', en: 'Ageing society and household income security in Thailand' },
    alt: '',
    summary: { th: 'รายงานการวิจัยตัวอย่างว่าด้วยการออมและสวัสดิการผู้สูงอายุ', en: 'Sample research report on savings and welfare for older people.' },
    source: { th: 'งานวิจัยตัวอย่าง · สำนักธรรมศาสตร์และการเมือง', en: 'Sample research · Academy of Moral and Political Sciences' },
    href: 'pages/article.html', date: '2026-02-12', academy: 'moral', topic: 'economics', contentLang: 'th',
    keywords: ['สังคมสูงวัย', 'ผู้สูงอายุ', 'ageing society', 'aged society']
  },
  {
    id: 'research-ai-thai-nlp', type: 'research',
    title: { th: 'การประมวลผลภาษาไทยด้วยปัญญาประดิษฐ์: ปัญหาการตัดคำ', en: 'Thai language processing with AI: the word segmentation problem' },
    alt: '',
    summary: { th: 'รายงานการวิจัยตัวอย่างเปรียบเทียบวิธีตัดคำภาษาไทยสำหรับระบบปัญญาประดิษฐ์', en: 'Sample research comparing Thai word segmentation methods for AI systems.' },
    source: { th: 'งานวิจัยตัวอย่าง · สำนักวิทยาศาสตร์', en: 'Sample research · Academy of Science' },
    href: 'pages/article.html', date: '2025-08-05', academy: 'science', topic: 'technology', contentLang: 'th-en',
    keywords: ['ai', 'ปัญญาประดิษฐ์', 'nlp', 'ตัดคำ']
  },
  {
    id: 'research-mural', type: 'research',
    title: { th: 'จิตรกรรมฝาผนังสมัยรัตนโกสินทร์ตอนต้น', en: 'Early Rattanakosin mural painting' },
    alt: '',
    summary: { th: 'รายงานการวิจัยตัวอย่างด้านประวัติศาสตร์ศิลปะไทย', en: 'Sample research report on Thai art history.' },
    source: { th: 'งานวิจัยตัวอย่าง · สำนักศิลปกรรม', en: 'Sample research · Academy of Arts' },
    href: 'pages/article.html', date: '2024-10-21', academy: 'arts', topic: 'history', contentLang: 'th',
    keywords: ['จิตรกรรมฝาผนัง', 'mural', 'rattanakosin']
  },
  {
    id: 'article-mangrove-carbon', type: 'article',
    title: { th: 'ป่าชายเลนกับการกักเก็บคาร์บอน', en: 'Mangroves and carbon storage' },
    alt: '',
    summary: { th: 'บทความตัวอย่างสรุปบทบาทของป่าชายเลนต่อการลดภาวะโลกร้อน', en: 'Sample article on the role of mangroves in mitigating climate change.' },
    source: { th: 'บทความตัวอย่าง · สำนักวิทยาศาสตร์', en: 'Sample article · Academy of Science' },
    href: 'pages/article.html', date: '2023-06-08', academy: 'science', topic: 'science', contentLang: 'th',
    keywords: ['ป่าชายเลน', 'mangrove', 'carbon', 'คาร์บอน']
  },
  {
    id: 'article-law-language', type: 'article',
    title: { th: 'ภาษากฎหมายที่ประชาชนเข้าใจได้', en: 'Legal language the public can understand' },
    alt: '',
    summary: { th: 'แนวทางเขียนกฎหมายและประกาศราชการด้วยภาษาที่ชัดเจน', en: 'Guidance on writing laws and notices in plain language.' },
    source: { th: 'บทความตัวอย่าง · สำนักธรรมศาสตร์และการเมือง', en: 'Sample article · Academy of Moral and Political Sciences' },
    href: 'pages/article.html', date: '2026-03-14', academy: 'moral', topic: 'law', contentLang: 'th',
    keywords: ['plain language', 'กฎหมาย']
  },
  {
    id: 'journal-sample', type: 'journal',
    title: { th: 'วารสารราชบัณฑิตยสภา (ฉบับตัวอย่าง)', en: 'Journal of the Royal Society (sample issue)' },
    alt: '',
    summary: { th: 'รวมบทความวิชาการจากราชบัณฑิตและผู้ทรงคุณวุฒิ', en: 'Academic articles by Fellows and experts.' },
    source: { th: 'วารสาร (ตัวอย่าง)', en: 'Journal (sample)' },
    href: 'pages/knowledge.html#publications', date: '2026-06-30', academy: null, topic: null, contentLang: 'th-en',
    keywords: ['journal', 'วารสาร']
  },
  {
    id: 'ebook-translit-rules', type: 'ebook',
    title: { th: 'หลักเกณฑ์การทับศัพท์ภาษาอังกฤษ', en: 'Rules for transliterating English' },
    alt: '',
    summary: { th: 'หนังสือหลักเกณฑ์ของสำนักงานราชบัณฑิตยสภา อ่านได้ในระบบ E-Book', en: 'Office of the Royal Society guideline book, available as an E-Book.' },
    source: { th: 'E-Book สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society E-Books' },
    href: 'https://www.orst.go.th/iwfm_list.asp?u=6', date: null, academy: 'arts', topic: 'language', contentLang: 'th',
    keywords: ['ทับศัพท์', 'transliteration', 'ebook']
  },
  {
    id: 'news-lecture', type: 'news',
    title: { th: 'บรรยายสาธารณะ “ภาษาไทยในยุคดิจิทัล”', en: 'Public lecture: “Thai in the digital age”' },
    alt: '',
    summary: { th: 'กิจกรรมตัวอย่าง เปิดให้ประชาชนลงทะเบียนเข้าร่วม', en: 'Sample event open for public registration.' },
    source: { th: 'ข่าวและกิจกรรม (ตัวอย่าง)', en: 'News & events (sample)' },
    href: 'pages/news.html', date: '2026-09-02', academy: 'arts', topic: 'language', contentLang: 'th',
    keywords: ['lecture', 'บรรยาย', 'ดิจิทัล']
  }
];
