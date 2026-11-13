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
      enabled: false,                              /* off: every page is open (2026-11-11) */
      allow: ['index.html', 'pages/sitemap.html', 'pages/about.html', 'pages/academy.html', 'pages/knowledge.html', 'pages/article.html', 'pages/search.html', 'pages/news.html', 'pages/news-detail.html', 'pages/publication.html'],
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
    /* The one line the summary bar shows; `intro` is the fuller text on the card */
    summary: {
      th: 'เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้ และขอความยินยอมสำหรับการจดจำการตั้งค่าของคุณ',
      en: 'We use the cookies the website needs to work, and ask before remembering your settings.'
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
               'rs-mobile-panel', 'rs-mobile-sub', 'rs-mobile-subsub',
               /* how lists are shown: grid or list, and per page */
               'rs-news-view', 'rs-news-size', 'rs-gallery-size', 'rs-works-view', 'rs-works-size',
               'rs-series-view', 'rs-fellows-view', 'rs-fellows-size', 'rs-roll-view']
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
      off:        { th: 'ไม่อนุญาต', en: 'Not allowed' },
      stored:     { th: 'ข้อมูลที่จัดเก็บ', en: 'What is stored' },
      showKeys:   { th: 'ดูข้อมูลที่จัดเก็บ', en: 'Show what is stored' }
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
    /* general enquiries; 02 141 1718 is the bookshop (orst.go.th, Nov 2026) */
    phone: '02 141 1717',
    phoneHref: '+6621411717',
    fax: '0 2356 0490, 0 2356 0491',
    email: 'saraban@orst.go.th',
    /* TODO (Office): confirm the dedicated webmaster address — none is published */
    webmaster: 'saraban@orst.go.th',
    /* TODO (Office): confirm office hours */
    officeHours: { th: 'จันทร์–ศุกร์ 08:30–16:30 น.', en: 'Monday–Friday, 08:30–16:30' },
    /* Chat button (bottom right): the Office's Facebook Messenger link, https://m.me/<page username>.
       TODO (Office): supply the page — none is published on royalsociety.go.th.
       While empty, "Start chat" opens the contact page instead. */
    messenger: '',
    /* official channels (sitemap 1.16.5). The YouTube channel is the one
       orst.go.th links to. TODO (Office): add the Facebook page */
    social: [
      { label: { th: 'YouTube สำนักงานราชบัณฑิตยสภา', en: 'YouTube: Office of the Royal Society' }, href: 'https://www.youtube.com/channel/UCFGKmCXh_pWaawbilPgZ69g' }
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9A%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B8%AA%E0%B8%A0%E0%B8%B2+%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%81%E0%B8%B2%E0%B8%A3+%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%8B%E0%B8%B5'
  },

  /* TODO (Backend): replace with the live visitor counter value */
  visitorCount: 1234567,

  /* ---------------------------------------------------------------------- *
   * Utility bar (above the header, desktop only)
   * ---------------------------------------------------------------------- */
  utilityLinks: [
    /* an entry with `menu: '<nav key>'` would open that item's children as a
       dropdown here (02-components.js); Contact now has its own place in the
       main menu, so the top bar keeps only the Office link */
    { label: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' }, href: 'https://www.orst.go.th/', external: true }
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
   *              panel)
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
      match: ['about.html', 'academy.html', 'about-history.html', 'about-authority.html', 'about-direction.html', 'about-structure.html', 'about-executives.html', 'about-past-presidents.html', 'about-president-message.html', 'about-vision.html', 'about-thai-language.html', 'about-wellbeing.html', 'about-acts.html', 'about-bylaws.html', 'about-rules.html', 'about-announcements.html'],
      intro: { th: 'ประวัติ อำนาจหน้าที่ ผู้บริหาร สำนัก และกฎหมายที่เกี่ยวข้อง', en: 'History, mandate and authority, executives, academies, laws and regulations' },
      children: [
        {
          label: { th: 'ข้อมูลองค์กร', en: 'Organisation Profile' }, href: 'pages/about.html#organization',
          children: [
            { label: { th: 'ประวัติความเป็นมา', en: 'History' }, href: 'pages/about-history.html' },
            { label: { th: 'วิสัยทัศน์และพันธกิจ', en: 'Vision and Mission' }, href: 'pages/about-vision.html' },
            { label: { th: 'อำนาจหน้าที่ของราชบัณฑิตยสภา', en: 'Powers and Duties' }, menu: { th: 'อำนาจหน้าที่', en: 'Powers and Duties' }, href: 'pages/about-authority.html' },
            { label: { th: 'ทิศทางและการดำเนินงาน', en: 'Direction and Operations' }, href: 'pages/about-direction.html' },
            { label: { th: 'แผนผังการบริหารราชบัณฑิตยสภาและสำนักงานราชบัณฑิตยสภา', en: 'Administrative Chart of the Royal Society and its Office' }, menu: { th: 'แผนผังการบริหาร', en: 'Governance Chart' }, href: 'pages/about-structure.html' },
            /* the Office publishes the annual plans and reports (sitemap 1.9) */
            { label: { th: 'แผนงาน โครงการ และรายงานผลการดำเนินงานประจำปี', en: 'Annual Plans and Performance Reports' }, menu: { th: 'แผนงานและผลการดำเนินงาน', en: 'Plans and Reports' }, href: 'pages/about-plans.html' }
          ]
        },
        {
          label: { th: 'ผู้บริหาร', en: 'Executives' }, href: 'pages/about.html#executives',
          children: [
            { label: { th: 'ผู้บริหารราชบัณฑิตยสภาปัจจุบัน', en: 'Current Executives' }, menu: { th: 'ผู้บริหารปัจจุบัน', en: 'Current Executives' }, href: 'pages/about-executives.html' },
            { label: { th: 'สารจากผู้บริหารราชบัณฑิตยสภา', en: 'Message from the President' }, menu: { th: 'สารจากผู้บริหาร', en: 'Message from the President' }, href: 'pages/about-president-message.html' },
            { label: { th: 'ทำเนียบผู้บริหาร', en: 'Past Executives' }, href: 'pages/about-past-presidents.html' },
            { label: { th: 'พันธกิจของราชบัณฑิตยสภาด้านภาษาไทย', en: 'Thai Language Mission' }, menu: { th: 'พันธกิจด้านภาษาไทย', en: 'Thai Language Mission' }, href: 'pages/about-thai-language.html' },
            { label: { th: 'สุขภาวะโดยองค์รวมกับคุณภาพชีวิต', en: 'Holistic Well-being and Quality of Life' }, menu: { th: 'สุขภาวะและคุณภาพชีวิต', en: 'Well-being' }, href: 'pages/about-wellbeing.html' },
            { label: { th: 'ผู้บริหารเทคโนโลยีสารสนเทศระดับสูง (CIO)', en: 'Chief Information Officer (CIO)' }, menu: { th: 'ผู้บริหารสารสนเทศ (CIO)', en: 'Chief Information Officer' }, href: 'pages/about-cio.html' }
          ]
        },
        {
          label: { th: 'สำนัก', en: 'Academies' }, href: 'pages/about.html#academies',
          children: [
            { label: { th: 'สำนักธรรมศาสตร์และการเมือง', en: 'Academy of Moral and Political Sciences' }, href: 'pages/academy.html?id=moral' },
            { label: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' }, href: 'pages/academy.html?id=science' },
            { label: { th: 'สำนักศิลปกรรม', en: 'Academy of Arts' }, href: 'pages/academy.html?id=arts' }
          ]
        },
        {
          label: { th: 'กฎหมาย ระเบียบ และข้อบังคับที่เกี่ยวข้อง', en: 'Laws and Regulations' }, menu: { th: 'กฎหมายและระเบียบ', en: 'Laws and Regulations' }, href: 'pages/about.html#laws',
          children: [
            { label: { th: 'พระราชบัญญัติที่เกี่ยวข้อง', en: 'Relevant Acts' }, href: 'pages/about-acts.html' },
            { label: { th: 'ข้อบังคับราชบัณฑิตยสภา', en: 'Royal Society Bylaws' }, href: 'pages/about-bylaws.html' },
            { label: { th: 'ระเบียบราชบัณฑิตยสภา', en: 'Royal Society Regulations' }, href: 'pages/about-rules.html' },
            { label: { th: 'ประกาศราชบัณฑิตยสภา', en: 'Royal Society Notifications' }, href: 'pages/about-announcements.html' }
          ]
        }
      ]
    },

    {
      key: 'fellows',
      label: { th: 'ราชบัณฑิตและภาคีสมาชิก', en: 'Fellows and Associate Fellows' },
      href: 'pages/fellows.html',
      match: ['fellows.html', 'fellow.html', 'admissions.html', 'fellows-academies.html', 'fellows-recruitment.html', 'fellows-past.html', 'admissions-associate-rules.html', 'admissions-associate-form.html', 'admissions-fellow-rules.html', 'admissions-fellow-form.html'],
      /* the panel's own link goes to the search, so it says so */
      viewLabel: { th: 'ค้นหาสมาชิก', en: 'Search Fellows' },
      intro: { th: 'ค้นหาสมาชิก รายนามตามสำนัก การสรรหา และทำเนียบอดีตราชบัณฑิต', en: 'Search Fellows, directory by academy, vacancies and election, and past Fellows' },
      children: [
        {
          label: { th: 'รายนามราชบัณฑิตและภาคีสมาชิก', en: 'Directory of Fellows and Associate Fellows' }, href: 'pages/fellows.html',
          children: [
            { label: { th: 'ค้นหาสมาชิก', en: 'Search Fellows' }, href: 'pages/fellows.html' },
            { label: { th: 'รายนามตามสำนัก', en: 'Directory by Academy' }, href: 'pages/fellows-academies.html' },
            { label: { th: 'ทำเนียบอดีตราชบัณฑิต', en: 'Past Fellows' }, href: 'pages/fellows-past.html' }
          ]
        },
        {
          label: { th: 'การสรรหาและรับสมัคร', en: 'Election and Applications' }, href: 'pages/fellows-recruitment.html',
          children: [
            { label: { th: 'ตำแหน่งว่างและการสรรหาสมาชิก', en: 'Vacancies and Election of Fellows' }, href: 'pages/fellows-recruitment.html' },
            { label: { th: 'การรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Applying to Become an Associate Fellow' }, href: 'pages/admissions.html#associate-fellow' },
            { label: { th: 'การรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Associate Fellows Applying to Become Fellows' }, href: 'pages/admissions.html#fellow' }
          ]
        }
      ]
    },

    {
      key: 'works',
      label: { th: 'ผลงานทางวิชาการ', en: 'Academic Works' },
      short: { th: 'ผลงานทางวิชาการ', en: 'Academic Works' },
      /* no landing page: the menu opens the topics, each with its own page */
      match: ['knowledge.html', 'article.html', 'series.html', 'publication.html', 'works-proposals.html', 'works-on-tour.html', 'works-ideas-forum.html', 'works-lectures.html', 'works-calendar.html', 'works-knowledge-to-society.html'],
      intro: { th: 'วารสาร สิ่งพิมพ์ ข้อเสนอต่อรัฐบาล กิจกรรมวิชาการ และโครงการนำความรู้สู่สังคม', en: 'Journals, publications, proposals to Government, academic activities and the Knowledge for Society Programme' },
      children: [
        {
          label: { th: 'วารสารและสิ่งพิมพ์', en: 'Journals and Publications' },   /* a heading: the journals are below */
          children: [
            { label: { th: 'วารสารราชบัณฑิตยสภา', en: 'Journal, Thai edition' }, href: 'pages/series.html?id=journal-th' },
            { label: { th: 'The Journal of the Royal Society of Thailand', en: 'Journal, English edition' }, href: 'pages/series.html?id=journal-en' },
            { label: { th: 'จดหมายข่าวราชบัณฑิตยสภา', en: 'Newsletter' }, href: 'pages/series.html?id=newsletter' },
            { label: { th: 'จุลสารสำนักวิทยาศาสตร์', en: 'Academy of Science Bulletin' }, href: 'pages/series.html?id=science-bulletin' },
            { label: { th: 'รายงานประจำปี', en: 'Annual Report' }, href: 'pages/series.html?id=annual-report' },
            { label: { th: 'สืบค้นผลงานวิชาการ', en: 'Search Academic Publications' }, href: 'pages/knowledge.html' }
          ]
        },
        {
          label: { th: 'กิจกรรมวิชาการ', en: 'Academic Activities' },   /* a heading: the activities are below */
          children: [
            { label: { th: 'ราชบัณฑิตสัญจร', en: 'Fellows on Tour' }, href: 'pages/works-on-tour.html' },
            { label: { th: 'อาศรมความคิด', en: 'Think Tank Forum' }, href: 'pages/works-ideas-forum.html' },
            { label: { th: 'การบรรยายและเสวนาวิชาการ', en: 'Lectures and Academic Seminars' }, href: 'pages/works-lectures.html' },
            { label: { th: 'ปฏิทินกิจกรรม', en: 'Events Calendar' }, href: 'pages/works-calendar.html' },
            /* the live site's "กิจกรรมอื่น ๆ": the news list opened at its activities */
            { label: { th: 'กิจกรรมอื่น ๆ', en: 'Other Activities' }, href: 'pages/news.html?cat=activity' }
          ]
        },
        /* the two that stood alone, under a heading of their own like the rest */
        {
          label: { th: 'ข้อเสนอและโครงการ', en: 'Proposals and Programmes' },
          children: [
            { label: { th: 'ข้อเสนอต่อรัฐบาล', en: 'Proposals to Government' }, href: 'pages/works-proposals.html' },
            { label: { th: 'โครงการนำความรู้สู่สังคม', en: 'Knowledge for Society Programme' }, href: 'pages/works-knowledge-to-society.html' }
          ]
        }
      ]
    },

    {
      key: 'news',
      label: { th: 'ข่าวสาร', en: 'News' },
      href: 'pages/news.html',
      match: ['news.html', 'news-press.html', 'news-gallery.html', 'news-album.html', 'news-videos.html', 'news-detail.html', 'academy-news.html'],
      intro: { th: 'แถลงข่าว ข่าวประชาสัมพันธ์ คลังรูปภาพ และคลังวิดีโอของราชบัณฑิตยสภา', en: 'Press releases, news and announcements, and the photo and video galleries' },
      children: [
        { label: { th: 'แถลงข่าว', en: 'Press Releases' }, href: 'pages/news-press.html' },
        { label: { th: 'ข่าวประชาสัมพันธ์', en: 'News and Announcements' }, href: 'pages/news.html' },
        { label: { th: 'ข่าวและกิจกรรมของสำนัก', en: 'News from the Academies' }, href: 'pages/academy-news.html' },
        { label: { th: 'คลังรูปภาพ', en: 'Photo Gallery' }, href: 'pages/news-gallery.html' },
        { label: { th: 'คลังวิดีโอ', en: 'Video Gallery' }, href: 'pages/news-videos.html' }
      ]
    },

    {
      key: 'admissions',
      label: { th: 'การรับสมัคร', en: 'Applications for Membership' },
      bar: false,
      href: 'pages/admissions.html',
      match: ['admissions.html', 'admissions-associate-rules.html', 'admissions-associate-form.html', 'admissions-fellow-rules.html', 'admissions-fellow-form.html'],
      intro: { th: 'ระเบียบและแบบฟอร์มการรับสมัครเป็นภาคีสมาชิก และการรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Regulations and forms for Associate Fellow applications, and for Associate Fellows applying to become Fellows' },
      children: [
        {
          label: { th: 'การรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Applying to Become an Associate Fellow' }, href: 'pages/admissions.html#associate-fellow',
          children: [
            { label: { th: 'ระเบียบการรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Regulations for Associate Fellow Applications' }, href: 'pages/admissions-associate-rules.html' },
            { label: { th: 'แบบฟอร์มการรับสมัครบุคคลเป็นภาคีสมาชิก', en: 'Associate Fellow Application Form' }, href: 'pages/admissions-associate-form.html' }
          ]
        },
        {
          label: { th: 'การรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Associate Fellows Applying to Become Fellows' }, href: 'pages/admissions.html#fellow',
          children: [
            { label: { th: 'ระเบียบการรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Regulations for Fellow Applications' }, href: 'pages/admissions-fellow-rules.html' },
            { label: { th: 'แบบฟอร์มการรับสมัครภาคีสมาชิกเป็นราชบัณฑิต', en: 'Fellow Application Form' }, href: 'pages/admissions-fellow-form.html' }
          ]
        }
      ]
    },

    {
      key: 'contact',
      label: { th: 'ติดต่อและมีส่วนร่วม', en: 'Contact and Participation' },
      short: { th: 'ติดต่อเรา', en: 'Contact' },
      href: 'pages/contact.html',
      match: ['contact.html', 'contact-form.html', 'survey.html', 'contact-faq.html', 'ita.html', 'ita-item.html'],
      intro: { th: 'ช่องทางติดต่อสำนักงาน คำถามที่พบบ่อย การแสดงความคิดเห็น และช่องทางร้องเรียน', en: 'How to reach the Office, frequently asked questions, feedback and complaint channels' },
      children: [
        {
          label: { th: 'ติดต่อสำนักงาน', en: 'Contact the Office' }, href: 'pages/contact.html',
          children: [
            { label: { th: 'ติดต่อราชบัณฑิตยสภา', en: 'Contact the Royal Society' }, href: 'pages/contact.html' },
            { label: { th: 'แบบฟอร์มติดต่อออนไลน์', en: 'Online Contact Form' }, href: 'pages/contact-form.html' },
            { label: { th: 'คำถามที่พบบ่อย (FAQ)', en: 'Frequently Asked Questions (FAQ)' }, href: 'pages/contact-faq.html' }
          ]
        },
        /* the Office's own feedback form and complaint channels (orst.go.th, Nov 2026) */
        {
          label: { th: 'มีส่วนร่วมและร้องเรียน', en: 'Feedback and Complaints' }, href: 'pages/contact-form.html',
          children: [
            { label: { th: 'แบบรับฟังความคิดเห็นและข้อเสนอแนะ', en: 'Feedback and Suggestions' }, menu: { th: 'รับฟังความคิดเห็น', en: 'Feedback' }, href: 'https://forms.gle/mc1qF9RCDQbvLnho6', external: true },
            { label: { th: 'ช่องทางการแจ้งเรื่องร้องเรียน', en: 'Complaints to the Office' }, menu: { th: 'แจ้งเรื่องร้องเรียน', en: 'Complaints' }, href: 'pages/contact-form.html?topic=complaint' },
            { label: { th: 'แบบสำรวจความพึงพอใจการใช้งานเว็บไซต์', en: 'Website Satisfaction Survey' }, menu: { th: 'แบบสำรวจความพึงพอใจ', en: 'Satisfaction Survey' }, href: 'pages/survey.html' },
            { label: { th: 'ศูนย์ร้องเรียน ป.ป.ช.', en: 'NACC Complaints Centre' }, href: 'https://www.nacc.go.th/', external: true },
            { label: { th: 'ศูนย์ร้องเรียน ป.ป.ท.', en: 'PACC Complaints Centre' }, href: 'https://www.pacc.go.th/', external: true }
          ]
        },
        /* transparency: the ITA disclosure and the open-data portal, under a heading */
        {
          label: { th: 'ความโปร่งใสและข้อมูลเปิด', en: 'Transparency and Open Data' },
          children: [
            /* the public disclosure assessed each year by the NACC */
            { label: { th: 'การประเมินคุณธรรมและความโปร่งใส (ITA)', en: 'Integrity and Transparency Assessment (ITA)' }, menu: { th: 'การประเมิน ITA', en: 'ITA' }, href: 'pages/ita.html' },
            /* sitemap 1.15: the national open-data portal
               TODO (Office): confirm whether the Royal Society publishes its own datasets */
            { label: { th: 'ข้อมูลเปิดภาครัฐ (Open Data)', en: 'Government Open Data' }, menu: { th: 'ข้อมูลเปิดภาครัฐ', en: 'Open Data' }, href: 'https://data.go.th/', external: true }
          ]
        }
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
      key: 'academy-activities',
      label: { th: 'กิจกรรมสำนัก', en: 'Academy Activities' },
      children: [
        { label: { th: 'ราชบัณฑิตสัญจร สำนักธรรมศาสตร์และการเมือง', en: 'Fellows on Tour: Moral and Political Sciences' }, href: 'pages/works-on-tour.html?academy=moral' },
        { label: { th: 'ราชบัณฑิตสัญจร สำนักวิทยาศาสตร์', en: 'Fellows on Tour: Science' }, href: 'pages/works-on-tour.html?academy=science' },
        { label: { th: 'ราชบัณฑิตสัญจร สำนักศิลปกรรม', en: 'Fellows on Tour: Arts' }, href: 'pages/works-on-tour.html?academy=arts' },
        { label: { th: 'อาศรมความคิด สำนักวิทยาศาสตร์', en: 'Think Tank Forum: Science' }, href: 'pages/works-ideas-forum.html' },
        { label: { th: 'ข่าวและกิจกรรม สำนักธรรมศาสตร์และการเมือง', en: 'News: Moral and Political Sciences' }, href: 'pages/academy.html?id=moral#news' },
        { label: { th: 'ข่าวและกิจกรรม สำนักวิทยาศาสตร์', en: 'News: Science' }, href: 'pages/academy.html?id=science#news' },
        { label: { th: 'ข่าวและกิจกรรม สำนักศิลปกรรม', en: 'News: Arts' }, href: 'pages/academy.html?id=arts#news' }
      ]
    },
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
        { label: { th: 'นโยบายเว็บไซต์', en: 'Website Policy' }, href: 'pages/policies.html#website-policy' },
        { label: { th: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลและคุกกี้', en: 'Privacy and Cookie Policy' }, href: 'pages/policies.html#privacy-policy' },
        { label: { th: 'นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์', en: 'Website Security Policy' }, href: 'pages/policies.html#security-policy' },
        { label: { th: 'คำสงวนลิขสิทธิ์และการปฏิเสธความรับผิด', en: 'Copyright and Disclaimer' }, href: 'pages/policies.html#copyright' },
        { label: { th: 'นโยบายคุกกี้', en: 'Cookie Policy' }, href: 'pages/policies.html#device-storage-title' },
        { label: { th: 'RSS ข่าวสาร', en: 'RSS feed' }, href: 'rss.xml' },
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
      href: 'pages/knowledge.html' },
    { id: 'ebook', group: 'knowledge', primary: true, icon: 'ebook',
      title: { th: 'E-Book', en: 'E-Books' },
      desc: { th: 'อ่านหนังสือและสิ่งพิมพ์ของราชบัณฑิตยสภาออนไลน์', en: 'Read Royal Society publications online' },
      href: 'pages/series.html?id=journal-th' },
    { id: 'encyclopedia', group: 'knowledge', icon: 'archive',
      title: { th: 'สารานุกรมไทย', en: 'Thai Encyclopedia' },
      desc: { th: 'อ่านสารานุกรมฉบับราชบัณฑิตยสภา', en: 'Read the Royal Society encyclopedia' },
      href: 'https://lst.nectec.or.th/encyclopedia/', external: true, domain: 'lst.nectec.or.th' },
    { id: 'archive', group: 'knowledge', icon: 'archive',
      title: { th: 'คลังเอกสารดิจิทัล', en: 'Digital Archive' },
      desc: { th: 'ค้นเอกสารและสิ่งพิมพ์ในรูปแบบดิจิทัล', en: 'Search digitised documents and publications' },
      href: 'https://da2.thaidlt.org/', external: true, domain: 'da2.thaidlt.org' },
    /* TODO (Office): these two run on a bare address over http on the live
       site (164.115.33.116/vocab); confirm the proper https domain */
    { id: 'dictionary-rs', group: 'dictionaries', icon: 'book',
      title: { th: 'พจนานุกรมภาษาไทย ฉบับราชบัณฑิตยสภา', en: 'Thai Dictionary, Royal Society Edition' },
      desc: { th: 'พจนานุกรมภาษาไทยฉบับล่าสุดของราชบัณฑิตยสภา', en: 'The latest Thai dictionary of the Royal Society' },
      href: 'http://164.115.33.116/vocab/', external: true, domain: '164.115.33.116' },
    { id: 'elearning', group: 'learning', icon: 'ebook',
      title: { th: 'บทเรียนภาษาไทย (E-Learning)', en: 'Thai Lessons (E-Learning)' },
      desc: { th: 'เรียนรู้คำและการใช้ภาษาไทยด้วยตนเองออนไลน์', en: 'Learn Thai words and usage online at your own pace' },
      href: 'http://164.115.33.116/vocab/', external: true, domain: '164.115.33.116' },
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
    { id: 'moral', icon: 'scale', name: { th: 'สำนักธรรมศาสตร์และการเมือง', en: 'Academy of Moral and Political Sciences' },
      fields: { th: 'ปรัชญา นิติศาสตร์ รัฐศาสตร์ เศรษฐศาสตร์ สังคมศาสตร์ ประวัติศาสตร์', en: 'Philosophy, law, political science, economics, social sciences, history' },
      tags: { th: ['ปรัชญา', 'นิติศาสตร์', 'รัฐศาสตร์', 'เศรษฐศาสตร์', 'สังคมศาสตร์', 'ประวัติศาสตร์'],
              en: ['Philosophy', 'Law', 'Political science', 'Economics', 'Social sciences', 'History'] } },
    { id: 'science', icon: 'atom', name: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' },
      fields: { th: 'วิทยาศาสตร์กายภาพ ชีวภาพ ประยุกต์ แพทยศาสตร์ วิศวกรรมศาสตร์ เทคโนโลยี', en: 'Physical, biological and applied sciences, medicine, engineering, technology' },
      tags: { th: ['วิทยาศาสตร์กายภาพ', 'ชีวภาพ', 'ประยุกต์', 'แพทยศาสตร์', 'วิศวกรรมศาสตร์', 'เทคโนโลยี'],
              en: ['Physical sciences', 'Biology', 'Applied sciences', 'Medicine', 'Engineering', 'Technology'] } },
    { id: 'arts', icon: 'palette', name: { th: 'สำนักศิลปกรรม', en: 'Academy of Arts' },
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
          { label: { th: 'วารสารและสิ่งพิมพ์', en: 'Journals and Publications' }, href: 'pages/series.html?id=journal-th' },
          { label: { th: 'ข่าวสาร', en: 'News' }, href: 'pages/news.html' },
          { label: { th: 'การรับสมัคร', en: 'Applications for Membership' }, href: 'pages/admissions.html' },
          { label: { th: 'ติดต่อและมีส่วนร่วม', en: 'Contact and Participation' }, href: 'pages/contact.html' }
        ]
      },
      {
        id: 'website',
        heading: { th: 'ข้อมูลเว็บไซต์', en: 'Website Information' },
        links: [
          { label: { th: 'ผังเว็บไซต์', en: 'Sitemap' }, href: 'pages/sitemap.html' },
            { label: { th: 'แบบสำรวจความพึงพอใจ', en: 'Satisfaction survey' }, href: 'pages/survey.html' },
          { label: { th: 'RSS ข่าวสาร', en: 'RSS feed' }, href: 'rss.xml' },
          { label: { th: 'ติดต่อเรา', en: 'Contact us' }, href: 'pages/contact.html' }
        ]
      },
      {
        id: 'policies',
        heading: { th: 'นโยบายและข้อกำหนด', en: 'Policies & Legal' },
        links: [
          { label: { th: 'การประเมินคุณธรรมและความโปร่งใส (ITA)', en: 'Integrity and Transparency (ITA)' }, href: 'pages/ita.html' },
          { label: { th: 'นโยบายเว็บไซต์', en: 'Website Policy' }, href: 'pages/policies.html#website-policy' },
          { label: { th: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลและคุกกี้', en: 'Privacy and Cookie Policy' }, href: 'pages/policies.html#privacy-policy' },
          { label: { th: 'นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์', en: 'Website Security Policy' }, href: 'pages/policies.html#security-policy' },
          { label: { th: 'คำสงวนลิขสิทธิ์และการปฏิเสธความรับผิด', en: 'Copyright and Disclaimer' }, href: 'pages/policies.html#copyright' },
          { label: { th: 'นโยบายคุกกี้', en: 'Cookie Policy' }, href: 'pages/policies.html#device-storage-title' },
          { label: { th: 'ตั้งค่าคุกกี้', en: 'Cookie settings' }, action: 'cookie-settings' }
        ]
      }
    ],
    /* sitemap footer: เว็บลิงก์หน่วยงานที่เกี่ยวข้อง
       TODO (Office): confirm the list */
    related: [
      { label: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' }, href: 'https://www.orst.go.th/' },
      { label: { th: 'พจนานุกรม ฉบับราชบัณฑิตยสถาน', en: 'Royal Institute Dictionary' }, href: 'https://dictionary.orst.go.th/' },
      { label: { th: 'ราชกิจจานุเบกษา', en: 'Royal Thai Government Gazette' }, href: 'https://ratchakitcha.soc.go.th/' },
      { label: { th: 'ศูนย์กลางข้อมูลเปิดภาครัฐ', en: 'Government Open Data' }, href: 'https://data.go.th/' },
      { label: { th: 'ศูนย์ราชการสะดวก', en: 'Government Easy Contact Center' }, href: 'https://www.gecc.go.th/' }
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
    fax: { th: 'โทรสาร', en: 'Fax' },
    related: { th: 'เว็บลิงก์หน่วยงานที่เกี่ยวข้อง', en: 'Related agencies' },
    followUs: { th: 'ติดตามเรา', en: 'Follow us' },
    updated: { th: 'ปรับปรุงข้อมูลล่าสุด', en: 'Last updated' },
    viewAll: { th: 'ดูทั้งหมด', en: 'View all' },
    backToTop: { th: 'ขึ้นบนสุด', en: 'Back to top' },
    contactUs: { th: 'ติดต่อเรา', en: 'Contact us' },
    officeHours: { th: 'เวลาทำการ', en: 'Office hours' }
  }
};
