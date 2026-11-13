/* ============================================================================
 * 00-core.js — Shared namespace (window.RS)
 * ============================================================================
 *  Loaded first. Provides DOM helpers, safe HTML escaping, storage,
 *  language state and a single ready() queue so every module initialises
 *  in script order after the DOM is parsed.
 *
 *  Language model
 *    Every piece of bilingual data is { th: '...', en: '...' }.
 *    RS.t(value) returns the string for the current language.
 *    The current language comes from ?lang= in the URL, then from the
 *    stored preference, then defaults to Thai.
 * ========================================================================== */

(() => {
  'use strict';

  const THAI_DIGITS = '๐๑๒๓๔๕๖๗๘๙';

  const LANGS = ['th', 'en'];
  const LANG_KEY = 'rs-lang';

  const CONSENT_KEY = 'rs-cookie-consent';

  /**
   * May this key be stored on the visitor's device?
   *
   * RS_CONFIG.cookies.categories says which key belongs to which category; a
   * category marked `required` is what the website needs to run and is always
   * allowed, the rest wait for the visitor to say yes (10-consent.js).
   * A key that is in no category counts as necessary — so register every new
   * key in the config, or it is neither offered nor withdrawable.
   */
  function mayStore(key) {
    const cookies = window.RS_CONFIG?.cookies;
    if (!cookies?.enabled) return true;

    const category = (cookies.categories || []).find(c => (c.keys || []).includes(key));
    if (!category || category.required) return true;

    try {
      const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
      if (saved?.version !== cookies.version) return false;
      return saved?.choices?.[category.key] === true;
    } catch {
      return false;
    }
  }

  const storage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      if (!mayStore(key)) return;
      try { localStorage.setItem(key, value); } catch { /* private mode */ }
    }
  };

  function detectLang() {
    const params = new URLSearchParams(location.search);
    const fromUrl = params.get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    const stored = storage.get(LANG_KEY);
    return LANGS.includes(stored) ? stored : 'th';
  }

  const lang = detectLang();
  storage.set(LANG_KEY, lang);
  document.documentElement.lang = lang;

  /* Keep the URL shareable: a stored English preference is written to the URL */
  if (lang === 'en' && !new URLSearchParams(location.search).has('lang')) {
    const next = new URL(location.href);
    next.searchParams.set('lang', 'en');
    history.replaceState(history.state, '', next);
  }

  /* English shows English only. Records without an English title are kept
     out of every list on an English page: the data files assign these
     globals, and the setter filters them as they arrive, before any page
     script reads them, so lists, counts and pagers agree. A record is
     English when its title (or name) has an `en` value, or `en` itself is
     set. TODO (CMS): give every record its English title to show it here. */
  if (lang === 'en') {
    const THAI = /[\u0E00-\u0E7F]/;
    const english = item => {
      if (!item || typeof item !== 'object') return true;
      const t = item.title || item.name;
      if (t && typeof t === 'object') return !!(t.en && !THAI.test(t.en));
      if (typeof item.en === 'string') return !THAI.test(item.en);
      if (typeof t === 'string') return !THAI.test(t);
      return true;
    };
    const LISTS = ['RS_NEWS', 'RS_ACTIVITIES', 'RS_DOCS', 'RS_VIDEOS', 'RS_EVENTS', 'RS_RECRUIT', 'RS_PUBLICATIONS'];
    LISTS.forEach(name => {
      let value;
      Object.defineProperty(window, name, {
        configurable: true,
        get: () => value,
        set: next => {
          if (!Array.isArray(next)) { value = next; return; }
          value = next.filter(english);
          /* remembered so the page can say that Thai-only items were left out */
          window.RS_EN_FILTERED = (window.RS_EN_FILTERED || 0) + (next.length - value.length);
        }
      });
    });
  }

  /** Pages inside /pages/ need ../ to reach the project root */
  const base = /\/pages\//.test(location.pathname) ? '../' : '';

  const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  const RS = {
    lang,
    langs: LANGS,
    base,
    storage,

    qs: (selector, root = document) => (root ? root.querySelector(selector) : null),
    qsa: (selector, root = document) => (root ? [...root.querySelectorAll(selector)] : []),

    /** Escape any value before it is placed inside an HTML template */
    escapeHTML: value => String(value ?? '').replace(/[&<>"']/g, ch => HTML_ESCAPES[ch]),

    /** Resolve bilingual data: { th, en } -> string. Strings pass through. */
    t(value) {
      if (value == null) return '';
      if (typeof value === 'string' || typeof value === 'number') return String(value);
      return value[lang] ?? value.th ?? '';
    },

    /** Same as t() but already escaped for HTML templates */
    te(value) {
      return RS.escapeHTML(RS.t(value));
    },

    isExternal: href => /^(https?:)?\/\//i.test(href || ''),

    /**
     * Build an internal URL from a project-root path and carry the language.
     * External, hash, mailto and tel links are returned unchanged.
     */
    url(path) {
      if (!path || path === '#') return '#';
      if (RS.isExternal(path) || /^(mailto:|tel:|#)/i.test(path)) return path;
      return RS.withLang(base + path);
    },

    /** Add/remove ?lang=en on a relative URL while keeping query and hash */
    withLang(href, targetLang = lang) {
      if (!href || RS.isExternal(href) || /^(mailto:|tel:|#|javascript:)/i.test(href)) return href;
      const [pathAndQuery, hash = ''] = href.split('#');
      const [path, query = ''] = pathAndQuery.split('?');
      const params = new URLSearchParams(query);
      if (targetLang === 'en') params.set('lang', 'en');
      else params.delete('lang');
      const qs = params.toString();
      return `${path}${qs ? `?${qs}` : ''}${hash ? `#${hash}` : ''}`;
    },

    icon: name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`,

    /** True when the cookie choice allows this key to be kept (see mayStore) */
    mayStore,

    reduceMotion: () =>
      document.body.classList.contains('access-reduce-motion') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    formatNumber: value => new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'th-TH-u-nu-thai').format(value),

    /**
     * Western digits -> Thai digits while the site is in Thai.
     * Everything is authored with 0-9; this is the single place that decides
     * which numerals the reader sees. Anything that must stay Latin (a
     * telephone number, an e-mail address, a domain, a file name) is marked
     * with [data-keep-digits] and never passes through here.
     */
    digits(value) {
      const text = String(value ?? '');
      return lang === 'th' ? text.replace(/[0-9]/g, d => THAI_DIGITS[Number(d)]) : text;
    },

    /** ISO date -> localised date (Buddhist era for Thai) */
    formatDate(iso, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
      const date = new Date(`${iso}T00:00:00`);
      if (Number.isNaN(date.getTime())) return iso;
      const locale = lang === 'en' ? 'en-GB' : 'th-TH-u-ca-buddhist-nu-thai';
      return new Intl.DateTimeFormat(locale, options).format(date);
    },

    /** Queue a module initialiser; runs in script order once the DOM is ready */
    ready(fn) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
      } else {
        fn();
      }
    }
  };

  /** A printed cover for a record without a photograph of its own (a
      report, abstracts, an article whose PDF opens on a page of text): the
      crest, what it is, the period or date, the academy. Flat, no glow.
      item: { title, cat, date, academy } (title Thai or {th,en}); kind, when
      and org ({th,en}) set those lines directly when the caller knows them */
  const COVER_KINDS = [
    [/จดหมายข่าว/, { th: 'จดหมายข่าว', en: 'Newsletter' }],
    [/บทคัดย่อ/, { th: 'บทคัดย่อการบรรยาย', en: 'Lecture abstracts' }],
    [/รายงานผลการตีพิมพ์|ผลงานอื่น|บทความทางวิชาการ หนังสือ/, { th: 'ผลงานทางวิชาการ', en: 'Publications' }],
    [/รายงานสรุป/, { th: 'รายงานสรุป', en: 'Report' }],
    [/ประชุม/, { th: 'การประชุมสำนัก', en: 'Academy meeting' }],
    [/บทความ/, { th: 'บทความ', en: 'Article' }]
  ];
  const ACADEMY_NAMES = { moral: { th: 'สำนักธรรมศาสตร์และการเมือง', en: 'Academy of Moral and Political Sciences' }, science: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' }, arts: { th: 'สำนักศิลปกรรม', en: 'Academy of Arts' } };
  RS.docCover = item => {
    const t = v => (v && typeof v === 'object' ? (lang === 'en' && v.en ? v.en : v.th) : (v || ''));
    const title = typeof item.title === 'object' ? (item.title.th || '') : (item.title || '');
    const kind = item.kind || (COVER_KINDS.find(([re]) => re.test(title)) || [null, item.cat === 'article' ? { th: 'บทความ', en: 'Article' } : { th: 'รายงาน', en: 'Report' }])[1];
    /* the period the record covers ("ระหว่างเดือน…"), else its date */
    const period = (title.match(/(?:ระหว่าง(?:เดือน)?|ประจำเดือน)\s*([^()]{4,40}?)(?:\s*\)|$)/) || [])[1];
    const when = item.when !== undefined ? t(item.when) : period ? period.trim() : (item.date ? RS.formatDate(item.date, { month: 'long', year: 'numeric' }) : '');
    const academy = item.org || ACADEMY_NAMES[item.academy] || { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' };
    /* drawn as the pale green cover the plans page uses (.plans-cover):
       the crest at the top right, what it is, the year large (item.year)
       or the period/date as a line, the academy or Office at the foot */
    const esc = RS.escapeHTML;
    const year = item.year ? `<span class="plans-cover__year">${item.yearLabel ? `<small>${esc(t(item.yearLabel))}</small>` : ''}${esc(lang === 'en' ? String(item.year) : RS.digits(String(item.year)))}</span>` : '';
    const whenLine = !year && when ? `<span class="plans-cover__when">${esc(lang === 'en' ? when : RS.digits(when))}</span>` : '';
    return `<span class="plans-cover${item.tone ? ` plans-cover--${esc(item.tone)}` : ''}${item.academy ? ` plans-cover--${esc(item.academy)}` : ''}" aria-hidden="true">
      <img class="plans-cover__crest" src="${esc(RS.url('assets/images/logo-image-160.png'))}" alt="" width="44" height="44" loading="lazy" decoding="async">
      <span class="plans-cover__kind">${esc(t(kind))}</span>
      ${year}${whenLine}
      <span class="plans-cover__org">${esc(t(academy))}</span>
    </span>`;
  };

  window.RS = RS;
})();
