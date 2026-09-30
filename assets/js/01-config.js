/* ============================================================================
 * 01-config.js — Site data (Single Source of Truth)
 * ============================================================================
 *
 *  CMS connection point. Every string shown on more than one page lives here.
 *  When the CMS is live, replace this object with the API response, e.g.
 *      window.RS_CONFIG = await fetch('/api/site-config').then(r => r.json());
 *  and keep the schema so 02-components.js keeps working.
 *
 *  Bilingual schema: every visible string is { th: '...', en: '...' }.
 *  Data only — no HTML or CSS in this file.
 * ========================================================================== */

window.RS_CONFIG = {

  /* Must match the breakpoints noted in assets/css/tokens.css
     mobileNav = widest viewport that still uses the mobile menu */
  breakpoints: {
    mobileNav: 1279,
    tablet: 1024,
    mobile: 768,
    small: 640
  },

  /* ---------------------------------------------------------------------- *
   * Organisation
   * ---------------------------------------------------------------------- */
  site: {
    name: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    nameEn: 'The Royal Society of Thailand',
    office: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    /* 112×160 resized copy of logo-image.png (the full-size master) — covers
       the header (34×48) and footer (52×74) at up to 3× / 2× pixel density */
    logo: 'assets/images/logo-image-160.png',
    logoAlt: { th: 'ตราราชบัณฑิตยสภา', en: 'Emblem of the Royal Society of Thailand' },
    officeSite: 'https://www.orst.go.th/',

    /* Set to false before launch — removes the prototype notice on every page */
    prototype: false,
    prototypeNote: {
      th: 'ต้นแบบเว็บไซต์ — เนื้อหา รายชื่อ และผลการค้นหาเป็นข้อมูลตัวอย่าง ยังไม่เชื่อมต่อฐานข้อมูลจริง',
      en: 'Website prototype — content, people and search results are sample data and are not connected to live databases.'
    },
    /* Short form shown in the top bar; the full note is read by screen readers */
    prototypeShort: { th: 'ต้นแบบเว็บไซต์ · ข้อมูลตัวอย่าง', en: 'Prototype · sample data' },

    /* Demo lock — every link and search on the site keeps its hover animation
       but does not open its page (a toast explains), except the pages listed
       in `allow`. Set enabled: false before launch. */
    menuLock: {
      enabled: true,
      allow: ['index.html', 'pages/sitemap.html'],
      message: { th: 'ต้นแบบเว็บไซต์ — หน้านี้ยังไม่เปิดให้เข้าชม', en: 'Prototype — this page is not open yet' }
    }
  },

  /* ---------------------------------------------------------------------- *
   * Cookie consent (PDPA, พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. ๒๕๖๒)
   * ----------------------------------------------------------------------
   *  The bar appears once, until a choice is stored in `rs-cookie-consent`.
   *  `categories` drives both the bar and what the site is allowed to keep:
   *  a category with `required: true` cannot be switched off. Turning one off
   *  removes every key it lists (10-consent.js), so adding a key here is all
   *  that a new feature needs to be covered.
   *
   *  The Office must confirm this wording, and the table in
   *  pages/policies.html#privacy-policy has to list the same keys.
   * ---------------------------------------------------------------------- */
  cookies: {
    enabled: true,
    version: 1,                        /* raise it to ask everyone again */
    policyHref: 'pages/policies.html#privacy-policy',
    title: { th: 'เว็บไซต์นี้ใช้คุกกี้', en: 'This website uses cookies' },
    intro: {
      th: 'ราชบัณฑิตยสภาจัดเก็บข้อมูลบางอย่างไว้ในเบราว์เซอร์ของคุณ เพื่อให้เว็บไซต์ทำงานได้และจดจำตัวเลือกของคุณ เว็บไซต์นี้ไม่ใช้คุกกี้เพื่อการวิเคราะห์ การติดตาม หรือการโฆษณา',
      en: 'The Royal Society stores a little information in your browser so the website works and remembers your choices. This website uses no analytics, tracking or advertising cookies.'
    },
    categories: [
      {
        key: 'necessary',
        required: true,
        icon: 'verified',
        label: { th: 'จำเป็นต่อการใช้งาน', en: 'Strictly necessary' },
        hint: {
          th: 'จดจำภาษาที่เลือกและตัวเลือกคุกกี้นี้ ปิดไม่ได้เพราะเว็บไซต์ต้องใช้',
          en: 'Remembers your language and this cookie choice. Cannot be switched off.'
        },
        keys: ['rs-lang', 'rs-lang-scroll', 'rs-cookie-consent']
      },
      {
        key: 'preferences',
        required: false,
        icon: 'sliders',
        label: { th: 'การตั้งค่าและความสะดวก', en: 'Preferences' },
        hint: {
          th: 'จดจำการตั้งค่าการแสดงผล คำค้นล่าสุด รายการที่บันทึกไว้ และการเตือนกิจกรรม',
          en: 'Remembers display settings, recent searches, saved items and event reminders.'
        },
        keys: ['rs-accessibility-settings', 'rs-recent-searches', 'rs.bookmarks', 'rs.reminders',
               'rs-mobile-panel', 'rs-mobile-sub', 'rs-mobile-subsub']
      }
    ],
    ui: {
      acceptAll:  { th: 'ยอมรับทั้งหมด', en: 'Accept all' },
      essential:  { th: 'ใช้เฉพาะที่จำเป็น', en: 'Necessary only' },
      customise:  { th: 'ตั้งค่า', en: 'Customise' },
      save:       { th: 'บันทึกตัวเลือก', en: 'Save choices' },
      policy:     { th: 'อ่านนโยบายคุกกี้', en: 'Read the cookie policy' },
      manage:     { th: 'ตั้งค่าคุกกี้', en: 'Cookie settings' },
      regionLabel:{ th: 'การตั้งค่าคุกกี้', en: 'Cookie settings' },
      saved:      { th: 'บันทึกตัวเลือกคุกกี้แล้ว', en: 'Your cookie choices are saved' },
      /* The word beside each line in the notice */
      always:     { th: 'เปิดเสมอ', en: 'Always on' },
      on:         { th: 'อนุญาต', en: 'Allowed' },
      off:        { th: 'ไม่อนุญาต', en: 'Not allowed' }
    }
  },

  /* ---------------------------------------------------------------------- *
   * Contact — verified against royalsociety.go.th/ติดต่อ (Sept 2026)
   * ---------------------------------------------------------------------- */
  contact: {
    address: {
      th: 'สำนักงานราชบัณฑิตยสภา เลขที่ ๑๒๐ หมู่ ๓ ศูนย์ราชการเฉลิมพระเกียรติ ๘๐ พรรษา ๕ ธันวาคม ๒๕๕๐ (อาคารซี) ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพมหานคร ๑๐๒๑๐',
      en: 'Office of the Royal Society, 120 Moo 3, Government Complex Commemorating His Majesty the King’s 80th Birthday Anniversary (Building C), Chaeng Watthana Road, Thung Song Hong, Lak Si, Bangkok 10210'
    },
    phone: '02 141 1718',
    phoneHref: '+6621411718',
    email: 'saraban@orst.go.th',
    /* TODO (Office): confirm the dedicated webmaster address — none is published */
    webmaster: 'saraban@orst.go.th',
    /* TODO (Office): confirm office hours */
    officeHours: { th: 'จันทร์–ศุกร์ 08:30–16:30 น.', en: 'Monday–Friday, 08:30–16:30' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9A%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B8%AA%E0%B8%A0%E0%B8%B2+%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%81%E0%B8%B2%E0%B8%A3+%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%8B%E0%B8%B5'
  },

  /* TODO (Backend): replace with the live visitor counter value */
  visitorCount: 1234567,

  /* ---------------------------------------------------------------------- *
   * Utility bar (above the header, desktop only)
   * ---------------------------------------------------------------------- */
  utilityLinks: [
    { label: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' }, href: 'https://www.orst.go.th/', external: true },
    { label: { th: 'ติดต่อและมีส่วนร่วม', en: 'Contact and Participation' }, href: 'pages/contact.html' }
  ],

  /* ---------------------------------------------------------------------- *
   * Main navigation — up to three levels
   *
   *   key      — used for the active state
   *   short    — shorter label for the desktop menu bar only (optional);
   *              label is the official name, used everywhere else
   *   bar      — false keeps the item out of the desktop bar; it still
   *              appears in the drawer, footer and sitemap (items 7–9:
   *              7 rides along in the Services panel, 8 in the Fellows
   *              panel, 9 is the utility-bar "Contact" link)
   *   alsoShow — keys of bar:false items rendered as extra columns in
   *              this item's mega panel
   *   match    — file names that mark this item as current
   *   intro    — short description shown in the mega menu (optional)
   *   children — level 2: { label, href, external?, children? }
   *              level 3: { label, href, external? }
   *
   *   Level-2 items with children become columns in the mega menu;
   *   level-2 items without children are listed together in one column.
   *
   *   Items 1–9 follow the menu list supplied by the Office (Sept 2026).
   *   Item 4.1.6 (search academic works) opens the knowledge page; Explore
   *   is the header search button.
   * ---------------------------------------------------------------------- */
  nav: [
    { key: 'home', label: { th: 'หน้าหลัก', en: 'Home' }, href: 'index.html', match: ['index.html', '404.html'] },

    {
      key: 'about',
      label: { th: 'เกี่ยวกับราชบัณฑิตยสภา', en: 'About the Royal Society' },
      href: 'pages/about.html',
      match: ['about.html'],
      intro: { th: 'ประวัติ อำนาจหน้าที่ ผู้บริหาร สำนักวิชาการ และกฎหมายที่เกี่ยวข้อง', en: 'History, mandate and authority, executives, academies, laws and regulations' },
      children: [
        {
          label: { th: 'ข้อมูลองค์กร', en: 'Organisation Profile' }, href: 'pages/about.html#organization',
          children: [
            { label: { th: 'ประวัติความเป็นมา', en: 'History' }, href: 'pages/about.html#history' },
            { label: { th: 'อำนาจหน้าที่', en: 'Mandate and Authority' }, href: 'pages/about.html#authority' },
            { label: { th: 'ทิศทางและการดำเนินงาน', en: 'Direction and Operations' }, href: 'pages/about.html#direction' },
            { label: { th: 'แผนผังการบริหาร', en: 'Governance Chart' }, href: 'pages/about.html#structure' }
          ]
        },
        {
          label: { th: 'ผู้บริหาร', en: 'Executives' }, href: 'pages/about.html#executives',
          children: [
            { label: { th: 'นายกและอุปนายกปัจจุบัน', en: 'President and Vice-Presidents' }, href: 'pages/about.html#current-executives' },
            { label: { th: 'ทำเนียบนายกราชบัณฑิตยสภา', en: 'Past Presidents' }, href: 'pages/about.html#past-presidents' },
            { label: { th: 'สารจากนายกราชบัณฑิตยสภา', en: 'Message from the President' }, href: 'pages/about.html#president-message' }
          ]
        },
        {
          label: { th: 'สำนักวิชาการ', en: 'Academies' }, href: 'pages/about.html#academies',
          children: [
            { label: { th: 'สำนักธรรมศาสตร์และการเมือง', en: 'Academy of Moral and Political Sciences' }, href: 'pages/about.html#academy-moral' },
            { label: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' }, href: 'pages/about.html#academy-science' },
            { label: { th: 'สำนักศิลปกรรม', en: 'Academy of Arts' }, href: 'pages/about.html#academy-arts' }
          ]
        },
        {
          label: { th: 'กฎหมายและระเบียบ', en: 'Laws and Regulations' }, href: 'pages/about.html#laws',
          children: [
            { label: { th: 'พระราชบัญญัติที่เกี่ยวข้อง', en: 'Relevant Acts' }, href: 'pages/about.html#acts' },
            { label: { th: 'ข้อบังคับราชบัณฑิตยสภา', en: 'Royal Society Bylaws' }, href: 'pages/about.html#bylaws' },
            { label: { th: 'ระเบียบราชบัณฑิตยสภา', en: 'Royal Society Regulations' }, href: 'pages/about.html#rules' },
            { label: { th: 'ประกาศราชบัณฑิตยสภา', en: 'Royal Society Notifications' }, href: 'pages/about.html#announcements' }
          ]
        }
      ]
    },

    {
      key: 'fellows',
      label: { th: 'ราชบัณฑิตและภาคีสมาชิก', en: 'Fellows and Associate Fellows' },
      alsoShow: ['admissions'],
      href: 'pages/fellows.html',
      match: ['fellows.html', 'fellow.html', 'admissions.html'],
      intro: { th: 'ค้นหาสมาชิก รายนามตามสำนัก การสรรหา และทำเนียบอดีตราชบัณฑิต', en: 'Search Fellows, directory by academy, vacancies and election, and past Fellows' },
      children: [
        {
          label: { th: 'ค้นหาสมาชิก', en: 'Search Fellows' }, href: 'pages/fellows.html#fellow-directory',
          children: [
            { label: { th: 'กรองตามสำนักและประเภทวิชา', en: 'Filter by Academy and Discipline' }, href: 'pages/fellows.html#filter-academy' },
            { label: { th: 'กรองตามปีที่แต่งตั้งและความเชี่ยวชาญ', en: 'Filter by Appointment Year and Expertise' }, href: 'pages/fellows.html#filter-year' }
          ]
        },
        { label: { th: 'รายนามตามสำนัก', en: 'Directory by Academy' }, href: 'pages/fellows.html#by-academy' },
        { label: { th: 'ตำแหน่งว่างและการสรรหาสมาชิก', en: 'Vacancies and Election of Fellows' }, href: 'pages/fellows.html#recruitment' },
        { label: { th: 'ทำเนียบอดีตราชบัณฑิต', en: 'Past Fellows' }, href: 'pages/fellows.html#former-fellows' }
      ]
    },

    {
      key: 'works',
      label: { th: 'ผลงานและกิจกรรมวิชาการ', en: 'Publications and Academic Activities' },
      short: { th: 'ผลงานและกิจกรรมวิชาการ', en: 'Publications & Activities' },
      href: 'pages/academic-works.html',
      match: ['academic-works.html', 'knowledge.html', 'article.html'],
      intro: { th: 'วารสาร สิ่งพิมพ์ ข้อเสนอต่อรัฐบาล กิจกรรมวิชาการ และโครงการนำความรู้สู่สังคม', en: 'Journals, publications, proposals to Government, academic activities and the Knowledge for Society Programme' },
      children: [
        {
          label: { th: 'วารสารและสิ่งพิมพ์', en: 'Journals and Publications' }, href: 'pages/academic-works.html#publications',
          children: [
            { label: { th: 'วารสารราชบัณฑิตยสภา', en: 'Journal of the Royal Society of Thailand (Thai)' }, href: 'pages/academic-works.html#journal-th' },
            { label: { th: 'The Journal of the Royal Society of Thailand', en: 'The Journal of the Royal Society of Thailand' }, href: 'pages/academic-works.html#journal-en' },
            { label: { th: 'จดหมายข่าวราชบัณฑิตยสภา', en: 'The Royal Society of Thailand Newsletter' }, href: 'pages/academic-works.html#newsletter' },
            { label: { th: 'จุลสารสำนักวิทยาศาสตร์', en: 'Academy of Science Bulletin' }, href: 'pages/academic-works.html#science-bulletin' },
            { label: { th: 'รายงานประจำปี', en: 'Annual Report' }, href: 'pages/academic-works.html#annual-report' },
            { label: { th: 'สืบค้นผลงานวิชาการ', en: 'Search Academic Publications' }, href: 'pages/knowledge.html' }
          ]
        },
        { label: { th: 'ข้อเสนอต่อรัฐบาล', en: 'Proposals to Government' }, href: 'pages/academic-works.html#policy-proposals' },
        {
          label: { th: 'กิจกรรมวิชาการ', en: 'Academic Activities' }, href: 'pages/academic-works.html#activities',
          children: [
            { label: { th: 'ราชบัณฑิตสัญจร', en: 'Fellows on Tour' }, href: 'pages/academic-works.html#on-tour' },
            { label: { th: 'อาศรมความคิด', en: 'Think Tank Forum' }, href: 'pages/academic-works.html#ideas-forum' },
            { label: { th: 'การบรรยายและเสวนาวิชาการ', en: 'Lectures and Academic Seminars' }, href: 'pages/academic-works.html#lectures' },
            { label: { th: 'ปฏิทินกิจกรรม', en: 'Events Calendar' }, href: 'pages/academic-works.html#calendar' }
          ]
        },
        { label: { th: 'โครงการนำความรู้สู่สังคม', en: 'Knowledge for Society Programme' }, href: 'pages/academic-works.html#knowledge-to-society' }
      ]
    },

    {
      key: 'news',
      label: { th: 'ข่าวสาร', en: 'News' },
      href: 'pages/news.html',
      match: ['news.html'],
      intro: { th: 'แถลงข่าว ข่าวประชาสัมพันธ์ และคลังภาพและวิดีโอของราชบัณฑิตยสภา', en: 'Press releases, news and announcements, and the photo and video gallery' },
      children: [
        { label: { th: 'แถลงข่าว', en: 'Press Releases' }, href: 'pages/news.html#press-releases' },
        { label: { th: 'ข่าวประชาสัมพันธ์', en: 'News and Announcements' }, href: 'pages/news.html#news' },
        { label: { th: 'คลังภาพและวิดีโอ', en: 'Photo and Video Gallery' }, href: 'pages/news.html#media-gallery' }
      ]
    },

    {
      key: 'services',
      label: { th: 'บริการวิชาการออนไลน์', en: 'Online Academic Services' },
      short: { th: 'บริการ', en: 'Services' },
      alsoShow: ['audiences'],
      href: 'pages/services.html',
      match: ['services.html', 'audiences.html'],
      intro: { th: 'พจนานุกรม ฐานข้อมูลศัพท์ คลังความรู้ หนังสือ และการทดสอบความรู้ภาษาไทยออนไลน์', en: 'Dictionaries, terminology databases, knowledge resources, books and Thai language testing' },
      children: [
        {
          label: { th: 'พจนานุกรมและฐานข้อมูลศัพท์', en: 'Dictionaries and Terminology Databases' }, href: 'pages/services.html#dictionaries',
          children: [
            { label: { th: 'พจนานุกรม', en: 'Dictionary' }, href: 'https://dictionary.orst.go.th/', external: true },
            { label: { th: 'ศัพท์บัญญัติ', en: 'Coined Terms' }, href: 'https://coined-word.orst.go.th/', external: true },
            { label: { th: 'คำทับศัพท์', en: 'Transliteration' }, href: 'https://transliteration.orst.go.th/', external: true },
            { label: { th: 'อักขรานุกรมภูมิศาสตร์', en: 'Gazetteer' }, href: 'https://gazetteer.orst.go.th/', external: true }
          ]
        },
        {
          label: { th: 'คลังความรู้และหนังสือ', en: 'Knowledge Base and Books' }, href: 'pages/services.html#knowledge-books',
          children: [
            { label: { th: 'คลังความรู้', en: 'Knowledge Base' }, href: 'https://www.orst.go.th/iwfm_table.asp?a=28', external: true },
            { label: { th: 'E-Book', en: 'E-Books' }, href: 'https://www.orst.go.th/iwfm_list.asp?u=6', external: true },
            { label: { th: 'สารานุกรมไทย', en: 'Thai Encyclopedia' }, href: 'https://lst.nectec.or.th/encyclopedia/', external: true },
            { label: { th: 'คลังเอกสารดิจิทัล', en: 'Digital Archive' }, href: 'https://da2.thaidlt.org/', external: true }
          ]
        },
        {
          label: { th: 'เรียนรู้และทดสอบความรู้ภาษาไทย', en: 'Thai Language Learning and Testing' }, href: 'pages/services.html#learning',
          children: [
            { label: { th: 'ทดสอบความรู้ภาษาไทย', en: 'Thai Language Test' }, href: 'https://etest.orst.go.th/', external: true },
            { label: { th: 'ค้นหาในเว็บไซต์', en: 'Search the website' }, href: 'pages/search.html' },
            { label: { th: 'สอบถามข้อมูลทางวิชาการ', en: 'Academic enquiries' }, href: 'pages/contact.html' }
          ]
        }
      ]
    },

    {
      key: 'audiences',
      label: { th: 'บริการตามกลุ่มผู้ใช้', en: 'Services by Audience' },
      bar: false,
      href: 'pages/audiences.html',
      match: ['audiences.html'],
      intro: { th: 'รวมบริการและข้อมูลที่เหมาะกับประชาชน หน่วยงานภาครัฐ และสมาชิกราชบัณฑิตยสภา', en: 'Services and information for the public, government agencies and members of the Royal Society' },
      children: [
        { label: { th: 'สำหรับประชาชน', en: 'For Citizens' }, href: 'pages/audiences.html#public' },
        { label: { th: 'สำหรับหน่วยงานภาครัฐ', en: 'For Government Agencies' }, href: 'pages/audiences.html#government' },
        { label: { th: 'สำหรับราชบัณฑิตและภาคีสมาชิก', en: 'For Fellows and Associate Fellows' }, href: 'pages/audiences.html#members' }
      ]
    },

    {
      key: 'admissions',
      label: { th: 'การรับสมัคร', en: 'Applications for Membership' },
      bar: false,
      href: 'pages/admissions.html',
      match: ['admissions.html'],
      intro: { th: 'ระเบียบและแบบฟอร์มการรับสมัครเป็นภาคีสมาชิก และการรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Regulations and forms for Associate Fellow applications, and for Associate Fellows applying to become Fellows' },
      children: [
        {
          label: { th: 'การรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Applying to Become an Associate Fellow' }, href: 'pages/admissions.html#associate-fellow',
          children: [
            { label: { th: 'ระเบียบการรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Regulations for Associate Fellow Applications' }, href: 'pages/admissions.html#associate-fellow-rules' },
            { label: { th: 'แบบฟอร์มการรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Associate Fellow Application Form' }, href: 'pages/admissions.html#associate-fellow-form' }
          ]
        },
        {
          label: { th: 'การรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Associate Fellows Applying to Become Fellows' }, href: 'pages/admissions.html#fellow',
          children: [
            { label: { th: 'ระเบียบการรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Regulations for Fellow Applications' }, href: 'pages/admissions.html#fellow-rules' },
            { label: { th: 'แบบฟอร์มการรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Fellow Application Form' }, href: 'pages/admissions.html#fellow-form' }
          ]
        }
      ]
    },

    {
      key: 'contact',
      label: { th: 'ติดต่อและมีส่วนร่วม', en: 'Contact and Participation' },
      bar: false,
      href: 'pages/contact.html',
      match: ['contact.html'],
      intro: { th: 'ช่องทางติดต่อสำนักงาน แบบฟอร์มติดต่อออนไลน์ และคำถามที่พบบ่อย', en: 'How to reach the Office, the online contact form and frequently asked questions' },
      children: [
        { label: { th: 'ติดต่อราชบัณฑิตยสภา', en: 'Contact the Royal Society' }, href: 'pages/contact.html#office' },
        { label: { th: 'แบบฟอร์มติดต่อออนไลน์', en: 'Online Contact Form' }, href: 'pages/contact.html#contact-form' },
        { label: { th: 'คำถามที่พบบ่อย (FAQ)', en: 'Frequently Asked Questions (FAQ)' }, href: 'pages/contact.html#faq' }
      ]
    }
  ],

  /* ---------------------------------------------------------------------- *
   * Sitemap — groups shown after the main menu on pages/sitemap.html
   *   The menu itself (nav, above) is rendered from the same data, so the
   *   sitemap can never drift out of step with the header.
   * ---------------------------------------------------------------------- */
  sitemapExtra: [
    {
      key: 'explore',
      label: { th: 'ค้นคว้า', en: 'Explore' },
      children: [
        { label: { th: 'ค้นหาในเว็บไซต์', en: 'Search the website' }, href: 'pages/search.html' },
        { label: { th: 'องค์ความรู้', en: 'Knowledge' }, href: 'pages/knowledge.html' },
        { label: { th: 'บทความวิชาการ', en: 'Academic article' }, href: 'pages/article.html' }
      ]
    },
    {
      key: 'website',
      label: { th: 'ข้อมูลเว็บไซต์และนโยบาย', en: 'Website Information and Policies' },
      children: [
        { label: { th: 'การเข้าถึงเว็บไซต์', en: 'Accessibility' }, href: 'pages/accessibility.html' },
        { label: { th: 'นโยบายเว็บไซต์', en: 'Website Policy' }, href: 'pages/policies.html#website-policy' },
        { label: { th: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลและคุกกี้', en: 'Privacy and Cookie Policy' }, href: 'pages/policies.html#privacy-policy' },
        { label: { th: 'นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์', en: 'Website Security Policy' }, href: 'pages/policies.html#security-policy' },
        { label: { th: 'คำสงวนลิขสิทธิ์และการปฏิเสธความรับผิด', en: 'Copyright and Disclaimer' }, href: 'pages/policies.html#copyright' },
        { label: { th: 'ผังเว็บไซต์', en: 'Sitemap' }, href: 'pages/sitemap.html' }
      ]
    }
  ],

  /* ---------------------------------------------------------------------- *
   * Services — home quick services, services page, search panel
   *   URLs verified from royalsociety.go.th (Sept 2026)
   *   group — section on the services page (menu items 6.1–6.3):
   *           dictionaries | knowledge | learning | other
   * ---------------------------------------------------------------------- */
  services: [
    { id: 'dictionary', group: 'dictionaries', primary: true, icon: 'book',
      title: { th: 'พจนานุกรม', en: 'Dictionary' },
      desc: { th: 'ค้นหาความหมาย การสะกด และการอ่านคำ', en: 'Look up meaning, spelling and pronunciation' },
      href: 'https://dictionary.orst.go.th/', external: true, domain: 'dictionary.orst.go.th' },
    { id: 'coined', group: 'dictionaries', primary: true, icon: 'term',
      title: { th: 'ศัพท์บัญญัติ', en: 'Coined Terms' },
      desc: { th: 'ค้นหาศัพท์วิชาการภาษาไทยที่บัญญัติแล้ว', en: 'Find official Thai academic terminology' },
      href: 'https://coined-word.orst.go.th/', external: true, domain: 'coined-word.orst.go.th' },
    { id: 'transliteration', group: 'dictionaries', primary: true, icon: 'translit',
      title: { th: 'คำทับศัพท์', en: 'Transliteration' },
      desc: { th: 'เขียนคำภาษาต่างประเทศเป็นภาษาไทยให้ถูกหลัก', en: 'Write foreign words in Thai script correctly' },
      href: 'https://transliteration.orst.go.th/', external: true, domain: 'transliteration.orst.go.th' },
    { id: 'gazetteer', group: 'dictionaries', primary: true, icon: 'globe',
      title: { th: 'อักขรานุกรมภูมิศาสตร์', en: 'Gazetteer' },
      desc: { th: 'ค้นหาการเขียนชื่อประเทศ เมือง และสถานที่', en: 'Find how to write countries, cities and places' },
      href: 'https://gazetteer.orst.go.th/', external: true, domain: 'gazetteer.orst.go.th' },
    { id: 'knowledge-base', group: 'knowledge', primary: true, icon: 'archive',
      title: { th: 'คลังความรู้', en: 'Knowledge Base' },
      desc: { th: 'อ่านบทความและบทความวิทยุด้านภาษาและวิชาการ', en: 'Read articles on language and scholarship' },
      href: 'https://www.orst.go.th/iwfm_table.asp?a=28', external: true, domain: 'orst.go.th' },
    { id: 'ebook', group: 'knowledge', primary: true, icon: 'ebook',
      title: { th: 'E-Book', en: 'E-Books' },
      desc: { th: 'อ่านหนังสือและสิ่งพิมพ์ของราชบัณฑิตยสภาออนไลน์', en: 'Read Royal Society publications online' },
      href: 'https://www.orst.go.th/iwfm_list.asp?u=6', external: true, domain: 'orst.go.th' },
    { id: 'encyclopedia', group: 'knowledge', icon: 'archive',
      title: { th: 'สารานุกรมไทย', en: 'Thai Encyclopedia' },
      desc: { th: 'อ่านสารานุกรมฉบับราชบัณฑิตยสภา', en: 'Read the Royal Society encyclopedia' },
      href: 'https://lst.nectec.or.th/encyclopedia/', external: true, domain: 'lst.nectec.or.th' },
    { id: 'archive', group: 'knowledge', icon: 'archive',
      title: { th: 'คลังเอกสารดิจิทัล', en: 'Digital Archive' },
      desc: { th: 'ค้นเอกสารและสิ่งพิมพ์ในรูปแบบดิจิทัล', en: 'Search digitised documents and publications' },
      href: 'https://da2.thaidlt.org/', external: true, domain: 'da2.thaidlt.org' },
    { id: 'etest', group: 'learning', icon: 'check',
      title: { th: 'ทดสอบความรู้ภาษาไทย', en: 'Thai Language Test' },
      desc: { th: 'สมัครและทดสอบความรู้ภาษาไทยออนไลน์', en: 'Take the online Thai language test' },
      href: 'https://etest.orst.go.th/', external: true, domain: 'etest.orst.go.th' },
    { id: 'fellows', group: 'other', icon: 'people',
      title: { th: 'ค้นหาราชบัณฑิตและผู้เชี่ยวชาญ', en: 'Find Fellows & Experts' },
      desc: { th: 'ค้นหาตามสำนัก สาขาวิชา และความเชี่ยวชาญ', en: 'Search by academy, field and expertise' },
      href: 'pages/fellows.html' },
    { id: 'contact', group: 'other', icon: 'mail',
      title: { th: 'สอบถามข้อมูลทางวิชาการ', en: 'Academic enquiries' },
      desc: { th: 'ติดต่อสำนักงานเพื่อสอบถามด้านภาษาและวิชาการ', en: 'Contact the Office about language and scholarship' },
      href: 'pages/contact.html' }
  ],

  /* ---------------------------------------------------------------------- *
   * Three academies
   * site: the academy's own website (from the history supplied by the Office, Sept 2026)
   * ---------------------------------------------------------------------- */
  academies: [
    { id: 'moral', site: 'http://mps.royalsociety.go.th/', icon: 'scale', name: { th: 'สำนักธรรมศาสตร์และการเมือง', en: 'Academy of Moral and Political Sciences' },
      fields: { th: 'ปรัชญา นิติศาสตร์ รัฐศาสตร์ เศรษฐศาสตร์ สังคมศาสตร์ ประวัติศาสตร์', en: 'Philosophy, law, political science, economics, social sciences, history' },
      tags: { th: ['ปรัชญา', 'นิติศาสตร์', 'รัฐศาสตร์', 'เศรษฐศาสตร์', 'สังคมศาสตร์', 'ประวัติศาสตร์'],
              en: ['Philosophy', 'Law', 'Political science', 'Economics', 'Social sciences', 'History'] } },
    { id: 'science', site: 'http://science.royalsociety.go.th/', icon: 'atom', name: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' },
      fields: { th: 'วิทยาศาสตร์กายภาพ ชีวภาพ ประยุกต์ แพทยศาสตร์ วิศวกรรมศาสตร์ เทคโนโลยี', en: 'Physical, biological and applied sciences, medicine, engineering, technology' },
      tags: { th: ['วิทยาศาสตร์กายภาพ', 'ชีวภาพ', 'ประยุกต์', 'แพทยศาสตร์', 'วิศวกรรมศาสตร์', 'เทคโนโลยี'],
              en: ['Physical sciences', 'Biology', 'Applied sciences', 'Medicine', 'Engineering', 'Technology'] } },
    { id: 'arts', site: 'http://arts.royalsociety.go.th/', icon: 'palette', name: { th: 'สำนักศิลปกรรม', en: 'Academy of Arts' },
      fields: { th: 'ภาษาและวรรณกรรม ภาษาศาสตร์ ดุริยางคศิลป์ ทัศนศิลป์ สถาปัตยกรรม', en: 'Language and literature, linguistics, music, visual arts, architecture' },
      tags: { th: ['ภาษาและวรรณกรรม', 'ภาษาศาสตร์', 'ดุริยางคศิลป์', 'ทัศนศิลป์', 'สถาปัตยกรรม'],
              en: ['Language & literature', 'Linguistics', 'Music', 'Visual arts', 'Architecture'] } }
  ],

  /* ---------------------------------------------------------------------- *
   * Footer
   * ---------------------------------------------------------------------- */
  footer: {
    columns: [
      {
        id: 'main',
        heading: { th: 'เมนูหลัก', en: 'Main Menu' },
        links: [
          { label: { th: 'หน้าแรก', en: 'Home' }, href: 'index.html' },
          { label: { th: 'เกี่ยวกับราชบัณฑิตยสภา', en: 'About the Royal Society' }, href: 'pages/about.html' },
          { label: { th: 'ราชบัณฑิตและภาคีสมาชิก', en: 'Fellows and Associate Fellows' }, href: 'pages/fellows.html' },
          { label: { th: 'ผลงานและกิจกรรมวิชาการ', en: 'Publications and Academic Activities' }, href: 'pages/academic-works.html' },
          { label: { th: 'ข่าวสาร', en: 'News' }, href: 'pages/news.html' },
          { label: { th: 'บริการวิชาการออนไลน์', en: 'Online Academic Services' }, href: 'pages/services.html' },
          { label: { th: 'บริการตามกลุ่มผู้ใช้', en: 'Services by Audience' }, href: 'pages/audiences.html' },
          { label: { th: 'การรับสมัคร', en: 'Applications for Membership' }, href: 'pages/admissions.html' },
          { label: { th: 'ติดต่อและมีส่วนร่วม', en: 'Contact and Participation' }, href: 'pages/contact.html' }
        ]
      },
      {
        id: 'website',
        heading: { th: 'ข้อมูลเว็บไซต์', en: 'Website Information' },
        links: [
          { label: { th: 'ผังเว็บไซต์', en: 'Sitemap' }, href: 'pages/sitemap.html' },
          { label: { th: 'อีเมลผู้ดูแลเว็บไซต์', en: 'Webmaster e-mail' }, href: 'mailto:{webmaster}' },
          { label: { th: 'การเข้าถึงเว็บไซต์', en: 'Accessibility' }, href: 'pages/accessibility.html' },
          { label: { th: 'ติดต่อเรา', en: 'Contact us' }, href: 'pages/contact.html' }
        ]
      },
      {
        id: 'policies',
        heading: { th: 'นโยบายและข้อกำหนด', en: 'Policies & Legal' },
        links: [
          { label: { th: 'นโยบายเว็บไซต์', en: 'Website Policy' }, href: 'pages/policies.html#website-policy' },
          { label: { th: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลและคุกกี้', en: 'Privacy and Cookie Policy' }, href: 'pages/policies.html#privacy-policy' },
          { label: { th: 'นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์', en: 'Website Security Policy' }, href: 'pages/policies.html#security-policy' },
          { label: { th: 'คำสงวนลิขสิทธิ์และการปฏิเสธความรับผิด', en: 'Copyright and Disclaimer' }, href: 'pages/policies.html#copyright' },
          { label: { th: 'ตั้งค่าคุกกี้', en: 'Cookie settings' }, action: 'cookie-settings' }
        ]
      }
    ]
  },

  /* ---------------------------------------------------------------------- *
   * Accessibility panel
   * ---------------------------------------------------------------------- */
  accessibility: {
    title: { th: 'การแสดงผล', en: 'Display settings' },
    fontSizes: [
      { value: 'normal', label: { th: 'ปกติ', en: 'Default' } },
      { value: 'large',  label: { th: 'ใหญ่', en: 'Large' } },
      { value: 'xlarge', label: { th: 'ใหญ่มาก', en: 'Larger' } }
    ],
    toggles: [
      { key: 'contrast',       label: { th: 'คอนทราสต์สูง', en: 'High contrast' } },
      { key: 'reduceMotion',   label: { th: 'ลดการเคลื่อนไหว', en: 'Reduce motion' } },
      { key: 'underlineLinks', label: { th: 'ขีดเส้นใต้ลิงก์', en: 'Underline links' } }
    ]
  },

  /* ---------------------------------------------------------------------- *
   * Interface strings used by JavaScript-rendered components
   * ---------------------------------------------------------------------- */
  ui: {
    skip: { th: 'ข้ามไปยังเนื้อหาหลัก', en: 'Skip to main content' },
    home: { th: 'หน้าแรก', en: 'Home' },
    search: { th: 'ค้นหา', en: 'Search' },
    searchSite: { th: 'ค้นหาในเว็บไซต์', en: 'Search the website' },
    searchPlaceholder: { th: 'ค้นหาคำ ศัพท์บัญญัติ บทความ หรือองค์ความรู้…', en: 'Search words, coined terms, articles or knowledge…' },
    accessibility: { th: 'การเข้าถึง', en: 'Accessibility' },
    textSize: { th: 'ขนาดตัวอักษร', en: 'Text size' },
    reset: { th: 'คืนค่าเริ่มต้น', en: 'Reset' },
    close: { th: 'ปิด', en: 'Close' },
    menu: { th: 'เมนู', en: 'Menu' },
    mainMenu: { th: 'เมนูหลัก', en: 'Main menu' },
    openMenu: { th: 'เปิดเมนูหลัก', en: 'Open main menu' },
    closeMenu: { th: 'ปิดเมนู', en: 'Close menu' },
    viewSection: { th: 'ไปที่หน้ารวมของหมวดนี้', en: 'Go to section overview' },
    language: { th: 'เลือกภาษา', en: 'Choose language' },
    external: { th: '(เว็บไซต์ภายนอก เปิดในแท็บใหม่)', en: '(external website, opens in a new tab)' },
    utility: { th: 'ลิงก์หน่วยงาน', en: 'Organisation links' },
    footerNav: { th: 'ลิงก์ส่วนท้าย', en: 'Footer' },
    address: { th: 'ที่อยู่', en: 'Address' },
    phone: { th: 'โทรศัพท์', en: 'Telephone' },
    email: { th: 'อีเมล', en: 'Email' },
    map: { th: 'ดูที่ตั้งสำนักงานราชบัณฑิตยสภาบน Google Maps', en: 'View the Office location on Google Maps' },
    mapShort: { th: 'แผนที่และการเดินทาง', en: 'Map & directions' },
    rights: { th: 'สงวนลิขสิทธิ์', en: 'All rights reserved' },
    visitors: { th: 'จำนวนผู้เข้าชมเว็บไซต์', en: 'Visitor counter' },
    viewAll: { th: 'ดูทั้งหมด', en: 'View all' },
    backToTop: { th: 'ขึ้นบนสุด', en: 'Back to top' },
    contactUs: { th: 'ติดต่อเรา', en: 'Contact us' },
    officeHours: { th: 'เวลาทำการ', en: 'Office hours' }
  }
};
