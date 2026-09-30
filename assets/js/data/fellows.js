/* ============================================================================
 * data/fellows.js — SAMPLE directory records (prototype only)
 * ============================================================================
 *  Fictional people — invented names, fields and dates, so the directory and
 *  profile templates can be reviewed. Replace with the member API/CMS.
 *  They are not, and must not be read as, real Fellows of the Royal Society.
 *
 *    id, name {th,en}, title {th,en}, memberType 'fellow'|'associate'|'honorary',
 *    academy 'moral'|'science'|'arts', topic (RS_TOPICS key),
 *    field {th,en}, expertise {th,en}, bio {th,en},
 *    works [{th,en}], publications [{ title {th,en}, year }], keywords []
 *    photo: image path or null (placeholder is shown when null)
 *    appointed: year appointed (CE) — shown in Buddhist Era in Thai
 * ========================================================================== */

window.RS_MEMBER_TYPES = {
  fellow:    { th: 'ราชบัณฑิต', en: 'Fellow' },
  associate: { th: 'ภาคีสมาชิก', en: 'Associate Fellow' },
  honorary:  { th: 'ราชบัณฑิตกิตติมศักดิ์', en: 'Honorary Fellow' }
};

(() => {
  const sampleBio = (fieldTh, fieldEn) => ({
    th: `ผู้เชี่ยวชาญด้าน${fieldTh} มีผลงานวิจัย งานสอน และงานบริการวิชาการแก่สังคม ร่วมจัดทำหลักเกณฑ์และศัพท์บัญญัติของสำนัก`,
    en: `An expert in ${fieldEn} with research, teaching and public service, and a contributor to the academy's standards and coined terminology.`
  });

  const people = [
    { id: 'sample-01', name: { th: 'อรุณี ศรีสกุล', en: 'Arunee Srisakun' }, memberType: 'fellow', academy: 'arts', topic: 'language',
      title: { th: 'ศาสตราจารย์ ดร.', en: 'Professor Dr.' },
      field: { th: 'ภาษาศาสตร์', en: 'Linguistics' },
      expertise: { th: 'ภาษาศาสตร์ประวัติ การยืมคำ ศัพท์บัญญัติ', en: 'Historical linguistics, loanwords, terminology' },
      keywords: ['linguistics', 'ภาษาไทย', 'terminology'] },
    { id: 'sample-02', name: { th: 'กิตติ วัฒนพงศ์', en: 'Kitti Wattanapong' }, memberType: 'fellow', academy: 'science', topic: 'technology',
      title: { th: 'ศาสตราจารย์ ดร.', en: 'Professor Dr.' },
      field: { th: 'วิทยาการคอมพิวเตอร์', en: 'Computer science' },
      expertise: { th: 'การประมวลผลภาษาธรรมชาติ ปัญญาประดิษฐ์', en: 'Natural language processing, artificial intelligence' },
      keywords: ['ai', 'ปัญญาประดิษฐ์', 'nlp'] },
    { id: 'sample-03', name: { th: 'มาลัย จันทโรจน์', en: 'Malai Chantharot' }, memberType: 'associate', academy: 'moral', topic: 'law',
      title: { th: 'รองศาสตราจารย์ ดร.', en: 'Associate Professor Dr.' },
      field: { th: 'นิติศาสตร์', en: 'Law' },
      expertise: { th: 'กฎหมายมหาชน ภาษากฎหมาย', en: 'Public law, legal drafting' },
      keywords: ['law', 'กฎหมาย'] },
    { id: 'sample-04', name: { th: 'ประเสริฐ ธนวัฒน์', en: 'Prasert Thanawat' }, memberType: 'fellow', academy: 'science', topic: 'medicine',
      title: { th: 'ศาสตราจารย์ นายแพทย์', en: 'Professor' },
      field: { th: 'แพทยศาสตร์', en: 'Medicine' },
      expertise: { th: 'อายุรศาสตร์ ศัพท์แพทย์ภาษาไทย', en: 'Internal medicine, Thai medical terminology' },
      keywords: ['medicine', 'แพทย์'] },
    { id: 'sample-05', name: { th: 'วรรณา บุญยเกียรติ', en: 'Wanna Bunyakiat' }, memberType: 'associate', academy: 'arts', topic: 'arts',
      title: { th: 'ศาสตราจารย์', en: 'Professor' },
      field: { th: 'ดุริยางคศิลป์', en: 'Music' },
      expertise: { th: 'ดนตรีไทย สังคีตนิยม', en: 'Thai classical music, musicology' },
      keywords: ['music', 'ดนตรี'] },
    { id: 'sample-06', name: { th: 'สุรชัย พิพัฒน์สกุล', en: 'Surachai Phiphatsakun' }, memberType: 'fellow', academy: 'moral', topic: 'economics',
      title: { th: 'ศาสตราจารย์ ดร.', en: 'Professor Dr.' },
      field: { th: 'เศรษฐศาสตร์', en: 'Economics' },
      expertise: { th: 'เศรษฐศาสตร์การพัฒนา การคลังสาธารณะ', en: 'Development economics, public finance' },
      keywords: ['economics', 'เศรษฐกิจ'] },
    { id: 'sample-07', name: { th: 'นภา อินทรวิชัย', en: 'Napa Intharawichai' }, memberType: 'associate', academy: 'science', topic: 'science',
      title: { th: 'รองศาสตราจารย์ ดร.', en: 'Associate Professor Dr.' },
      field: { th: 'ชีววิทยา', en: 'Biology' },
      expertise: { th: 'นิเวศวิทยาป่าชายเลน ความหลากหลายทางชีวภาพ', en: 'Mangrove ecology, biodiversity' },
      keywords: ['biology', 'mangrove', 'ป่าชายเลน'] },
    { id: 'sample-08', name: { th: 'ธนา เกษมสุข', en: 'Thana Kasemsuk' }, memberType: 'honorary', academy: 'moral', topic: 'history',
      title: { th: 'ศาสตราจารย์ ดร.', en: 'Professor Dr.' },
      field: { th: 'ประวัติศาสตร์', en: 'History' },
      expertise: { th: 'ประวัติศาสตร์เอเชียตะวันออกเฉียงใต้ จารึก', en: 'Southeast Asian history, epigraphy' },
      keywords: ['history', 'ประวัติศาสตร์'] }
  ];

  /* Sample appointment years (fictional, like the people above) */
  const APPOINTED = {
    'sample-01': 2012, 'sample-02': 2018, 'sample-03': 2021, 'sample-04': 2012,
    'sample-05': 2018, 'sample-06': 2015, 'sample-07': 2021, 'sample-08': 2009
  };

  window.RS_FELLOWS = people.map(person => ({
    photo: null,
    appointed: APPOINTED[person.id] ?? null,
    bio: sampleBio(person.field.th, person.field.en.toLowerCase()),
    works: [
      { th: `ตำราด้าน${person.field.th} เล่ม ๑`, en: `Textbook in ${person.field.en.toLowerCase()}, volume 1` },
      { th: `บทความปริทัศน์ด้าน${person.field.th}`, en: `Review article in ${person.field.en.toLowerCase()}` }
    ],
    publications: [
      { title: { th: `รายงานวิจัย: ${person.expertise.th}`, en: `Research report: ${person.expertise.en}` }, year: 2025 },
      { title: { th: 'บทความในวารสารราชบัณฑิตยสภา', en: 'Article in the Journal of the Royal Society' }, year: 2023 }
    ],
    ...person
  }));
})();
