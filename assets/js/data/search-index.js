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
  person:          { label: { th: 'ราชบัณฑิตและผู้เชี่ยวชาญ', en: 'Fellows & experts' }, icon: 'people' },
  activity:        { label: { th: 'กิจกรรมวิชาการ', en: 'Academic activities' }, icon: 'calendar' },
  document:        { label: { th: 'กฎหมายและระเบียบ', en: 'Laws and regulations' }, icon: 'doc' },
  video:           { label: { th: 'วิดีโอ', en: 'Videos' },                  icon: 'play' },
  event:           { label: { th: 'กำหนดการ', en: 'Calendar' },               icon: 'calendar' }
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
  }
];
