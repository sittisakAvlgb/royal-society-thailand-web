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

  window.RS = RS;
})();
