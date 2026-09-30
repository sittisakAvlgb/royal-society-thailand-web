/* ============================================================================
 * 05-language.js — TH | EN switching
 * ============================================================================
 *
 *  Static HTML is authored in Thai with the English text beside it:
 *
 *      <h2 data-en="Explore knowledge">สำรวจองค์ความรู้</h2>
 *      <input placeholder="ค้นหา…" data-en-placeholder="Search…">
 *      <button aria-label="ปิด" data-en-aria-label="Close">
 *      <title data-en="Search — The Royal Society of Thailand">…</title>
 *      <meta name="description" content="…" data-en-content="…">
 *
 *  Rules
 *    - data-en replaces textContent, so put it on elements with text only
 *      (wrap mixed content in <span>).
 *    - JavaScript-rendered content uses RS.t({ th, en }) instead.
 *    - Content that exists in Thai only gets data-th-only; in English mode it
 *      keeps lang="th" and a notice can be shown with [data-en-notice].
 *
 *  Switching language is a normal navigation to the same URL with ?lang=
 *  changed, so the current page, search query, filters and hash are kept.
 *  Scroll position is restored after the switch.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  if (!RS) return;

  const { qsa } = RS;
  const SCROLL_KEY = 'rs-lang-scroll';
  const ATTRS = ['placeholder', 'aria-label', 'title', 'content', 'alt'];

  function translateStatic() {
    if (RS.lang !== 'en') return;

    qsa('[data-en]').forEach(el => { el.textContent = el.dataset.en; });

    ATTRS.forEach(attr => {
      qsa(`[data-en-${attr}]`).forEach(el => el.setAttribute(attr, el.getAttribute(`data-en-${attr}`)));
    });

    /* Plain dates (<time datetime="YYYY-MM-DD">text</time>) are re-formatted;
       composite date blocks with child elements keep their own data-en */
    qsa('time[datetime]:not([data-en])').forEach(el => {
      if (el.children.length || el.closest('[data-th-only]') || !/^\d{4}-\d{2}-\d{2}$/.test(el.dateTime)) return;
      el.textContent = RS.formatDate(el.dateTime);
    });

    /* Thai-only content keeps its language for screen readers and hyphenation */
    qsa('[data-th-only]').forEach(el => el.setAttribute('lang', 'th'));
    qsa('[data-en-notice]').forEach(el => { el.hidden = false; });
  }

  /** Carry ?lang=en on internal links written in static HTML */
  function rewriteLinks() {
    if (RS.lang !== 'en') return;
    qsa('a[href]:not([data-lang-switch])').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || RS.isExternal(href) || /^(mailto:|tel:)/i.test(href)) return;
      link.setAttribute('href', RS.withLang(href, 'en'));
    });
  }

  /** Recompute switch targets at click time — the URL may have changed (filters) */
  function initLanguageSwitcher() {
    document.addEventListener('click', event => {
      const link = event.target.closest('[data-lang-switch]');
      if (!link) return;

      const target = link.dataset.langSwitch;
      if (target === RS.lang) {
        event.preventDefault();
        return;
      }

      const next = new URL(location.href);
      if (target === 'en') next.searchParams.set('lang', 'en');
      else next.searchParams.delete('lang');
      link.href = next.href;

      RS.storage.set('rs-lang', target);
      try {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ path: location.pathname, y: window.scrollY }));
      } catch { /* storage unavailable */ }
    });
  }

  function restoreScroll() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || 'null');
      sessionStorage.removeItem(SCROLL_KEY);
      if (saved && saved.path === location.pathname && !location.hash) {
        window.scrollTo(0, saved.y);
      }
    } catch { /* storage unavailable */ }
  }


  /* ==================================================================== *
   * Thai numerals
   *
   *  Pages are authored with 0-9. In Thai the reader should see ๐-๙
   *  everywhere, so one pass rewrites the digits in the visible text once
   *  the page is built. Switching language is a fresh page load, so this
   *  never has to be undone.
   *
   *  Latin digits are kept where they are an address, not a number:
   *  e-mail, domain, file name, English text — mark anything else with
   *  [data-keep-digits]. A telephone number is read aloud like any other
   *  Thai number, so its text is converted; the tel: href stays Latin
   *  because it is an attribute, not a text node.
   * ==================================================================== */

  const KEEP_DIGITS = [
    '[data-keep-digits]',
    'a[href^="mailto:"]',
    '.service-item__domain',
    '[lang="en"]',
    'code', 'kbd', 'samp', 'input', 'textarea', 'select', 'script', 'style'
  ].join(',');

  /** Convert one text node unless it sits somewhere that must stay Latin */
  function convertTextNode(node) {
    if (!node || !/[0-9]/.test(node.nodeValue)) return;
    const parent = node.parentElement;
    if (!parent || parent.closest(KEEP_DIGITS)) return;
    node.nodeValue = RS.digits(node.nodeValue);
  }

  function localiseDigits(root = document.body) {
    if (RS.lang !== 'th' || !root) return;
    if (root.nodeType === Node.TEXT_NODE) { convertTextNode(root); return; }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(convertTextNode);
  }

  /**
   * Counts, calendars, filters and search results are written long after the
   * first pass and keep changing as the visitor works, so the digits are kept
   * in step with a watcher rather than a list of hooks that can be forgotten.
   * Converted text holds no 0-9, so a pass never triggers another one.
   */
  function watchDigits() {
    if (RS.lang !== 'th' || !('MutationObserver' in window)) return;

    const options = { childList: true, characterData: true, subtree: true };
    const observer = new MutationObserver(records => {
      observer.disconnect();
      records.forEach(record => {
        if (record.type === 'characterData') convertTextNode(record.target);
        else record.addedNodes.forEach(localiseDigits);
      });
      observer.observe(document.body, options);
    });

    observer.observe(document.body, options);
  }

  RS.localiseDigits = localiseDigits;

  RS.ready(() => {
    translateStatic();
    rewriteLinks();
    initLanguageSwitcher();
    restoreScroll();
    localiseDigits();
    watchDigits();
  });
})();
