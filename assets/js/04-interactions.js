/* ============================================================================
 * 04-interactions.js — In-page behaviour
 * ============================================================================
 *
 *  Every function is safe when its markup is missing — it returns early —
 *  so the same file loads on every page.
 *
 *  Markup for each behaviour is documented in pages/_styleguide.html.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  if (!RS) return;

  const { qs, qsa, icon, escapeHTML } = RS;
  const scrollBehavior = () => (RS.reduceMotion() ? 'auto' : 'smooth');

  /* ==================================================================== *
   * Header height -> --rs-header-current-h, compact state after scroll
   * ==================================================================== */

  function initHeaderSync() {
    const header = qs('#app-header');
    if (!header) return;

    let ticking = false;

    function sync() {
      ticking = false;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      const height = Math.ceil(qs('.site-header', header)?.getBoundingClientRect().height || 0);
      /* Over the home hero photo the card floats on its own; the white band
         behind it appears only once the photo has scrolled away */
      const photo = qs('.hero-slides');
      header.classList.toggle('is-over-photo', Boolean(photo) && photo.getBoundingClientRect().bottom > height);
      document.documentElement.style.setProperty('--rs-header-current-h', `${height}px`);
    }

    const request = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('resize', request, { passive: true });
    window.addEventListener('scroll', request, { passive: true });
  }

  /* ==================================================================== *
   * Toast — RS.toast('message')
   * ==================================================================== */

  function toast(message) {
    let region = qs('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }

    /* the same message again (e.g. repeated clicks on locked links) restarts
       the one already showing instead of stacking copies */
    const same = [...region.children].find(el => el.dataset.message === message);
    if (same) {
      clearTimeout(same._timer);
      same._timer = setTimeout(() => same.remove(), 3200);
      return;
    }
    const item = document.createElement('div');
    item.className = 'toast';
    item.dataset.message = message;
    item.innerHTML = `${icon('check')}<span>${escapeHTML(message)}</span>`;
    region.appendChild(item);
    item._timer = setTimeout(() => item.remove(), 3200);
  }

  RS.toast = toast;

  /** Copy text; falls back to a hidden textarea for older browsers */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    }
  }

  RS.copyText = copyText;

  /* ==================================================================== *
   * Reveal on scroll — add .reveal; receives .is-visible
   * ==================================================================== */

  function initReveal() {
    const instant = !('IntersectionObserver' in window) || RS.reduceMotion();
    const observer = instant ? null : new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    const watch = root => qsa('.reveal:not(.is-visible)', root).forEach(el => {
      if (instant) el.classList.add('is-visible');
      else observer.observe(el);
    });

    watch(document);
    /* Lists rendered by other scripts (08-directory.js) announce themselves */
    document.addEventListener('rs:content-added', event => watch(event.detail || document));
  }

  /* ==================================================================== *
   * Count-up numbers — <span data-count-to="100">100</span>
   * Runs once when the element scrolls into view; honours reduced motion.
   * ==================================================================== */

  function initCounters() {
    const elements = qsa('[data-count-to]');
    if (!elements.length) return;

    const run = el => {
      const target = parseInt(el.dataset.countTo, 10);
      /* Group thousands (2,480); 05-language.js turns the digits Thai */
      const show = n => { el.textContent = n.toLocaleString('en-US'); };
      if (!Number.isFinite(target) || RS.reduceMotion()) { show(target); return; }
      const duration = 1400;
      const start = performance.now();
      const step = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        show(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) { elements.forEach(run); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    elements.forEach(el => observer.observe(el));
  }

  /* ==================================================================== *
   * Tabs
   * markup: [data-tabs] > [role=tablist] > button[role=tab][aria-controls]
   *         + [role=tabpanel]
   * Arrow keys move between tabs (automatic activation).
   * ==================================================================== */

  function initTabs() {
    qsa('[data-tabs]').forEach(root => {
      const tabs = qsa('[role="tab"]', root);
      if (!tabs.length) return;

      function select(tab, focus = false) {
        tabs.forEach(item => {
          const selected = item === tab;
          item.setAttribute('aria-selected', String(selected));
          item.tabIndex = selected ? 0 : -1;
          const panel = document.getElementById(item.getAttribute('aria-controls'));
          if (panel) panel.hidden = !selected;
        });
        if (focus) tab.focus();
      }

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => select(tab));
        tab.addEventListener('keydown', event => {
          const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: tabs.length - 1 - index };
          if (!(event.key in keys)) return;
          event.preventDefault();
          select(tabs[(index + keys[event.key] + tabs.length) % tabs.length], true);
        });
      });

      select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
    });
  }

  /* ==================================================================== *
   * Hero slideshow — background images behind the home hero
   * markup: [data-hero-slider] > .hero-slides > .hero-slide (one per image)
   *         .hero-slider__controls > [data-slide-toggle] > .hero-slider__ring
   * Advances every --hero-interval; touch users can also swipe. It stops when
   * the visitor pauses it or moves keyboard focus onto the button (WAI
   * carousel pattern), and waits while the hero is off screen or the tab is
   * hidden. Starts paused when motion is reduced.
   * ==================================================================== */

  const SLIDESHOW_LABEL = {
    pause: { th: 'หยุดเลื่อนสไลด์อัตโนมัติ', en: 'Pause slideshow' },
    play: { th: 'เล่นสไลด์อัตโนมัติ', en: 'Play slideshow' }
  };

  function initHeroSlider() {
    qsa('[data-hero-slider]').forEach(root => {
      /* A missing image is hidden so the slide's placeholder shows instead */
      qsa('.hero-slide__img', root).forEach(img => {
        const hide = () => img.setAttribute('hidden', '');
        if (img.complete && !img.naturalWidth) hide();
        else img.addEventListener('error', hide, { once: true });
      });

      const slides = qsa('.hero-slide', root);
      const controls = qs('.hero-slider__controls', root);
      const toggle = qs('[data-slide-toggle]', root);
      const ring = qs('.hero-slider__ring', root);
      if (slides.length < 2 || !controls || !toggle) return;

      const interval = (parseFloat(getComputedStyle(root).getPropertyValue('--hero-interval')) || 6) * 1000;
      let index = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
      let timer = 0;
      let paused = RS.reduceMotion();
      let onScreen = true;

      const running = () => !paused && onScreen && !document.hidden;

      /* Starts the ring from empty so it stays in step with the timer */
      function restartRing() {
        if (!ring) return;
        ring.classList.remove('is-running');
        ring.getBoundingClientRect();
        ring.classList.add('is-running');
      }

      function schedule() {
        clearTimeout(timer);
        const run = running();
        root.classList.toggle('is-paused', !run);
        if (!run) return;
        restartRing();
        timer = setTimeout(() => show(index + 1), interval);
      }

      function show(next) {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        schedule();
      }

      function setPaused(value) {
        paused = value;
        qs('[data-slide-icon="pause"]', toggle)?.toggleAttribute('hidden', paused);
        qs('[data-slide-icon="play"]', toggle)?.toggleAttribute('hidden', !paused);
        const label = qs('[data-slide-toggle-label]', toggle);
        if (label) label.textContent = RS.t(paused ? SLIDESHOW_LABEL.play : SLIDESHOW_LABEL.pause);
        schedule();
      }

      toggle.addEventListener('click', () => setPaused(!paused));

      /* Keyboard focus on the button stops rotation until the visitor presses play */
      toggle.addEventListener('focus', () => {
        if (toggle.matches(':focus-visible') && !paused) setPaused(true);
      });

      /* Touch swipe */
      let startX = null;
      root.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch') startX = event.clientX;
      });
      root.addEventListener('pointerup', event => {
        if (startX === null) return;
        const distance = event.clientX - startX;
        startX = null;
        if (Math.abs(distance) > 50) show(index + (distance < 0 ? 1 : -1));
      });
      root.addEventListener('pointercancel', () => { startX = null; });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
          onScreen = entry.isIntersecting;
          schedule();
        }).observe(root);
      }
      document.addEventListener('visibilitychange', schedule);

      controls.hidden = false;
      setPaused(paused);
    });
  }

  /* ==================================================================== *
   * Featured story slider (home)
   * markup: [data-feature-slider] > .feature-slides > .feature-slide
   *         [data-feature-prev] [data-feature-next] [data-feature-current]
   * Rotates every 7 s; stops on hover, focus, touch and when off screen.
   * ==================================================================== */

  function initFeatureSlider() {
    qsa('[data-feature-slider]').forEach(root => {
      const slides = qsa('.feature-slide', root);
      const current = qs('[data-feature-current]', root);
      const total = qs('[data-feature-total]', root);
      if (slides.length < 2) return;

      const pad = n => String(n).padStart(2, '0');
      if (total) total.textContent = pad(slides.length);

      let index = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
      let timer = 0;
      let hold = false;
      let onScreen = true;

      function show(next, byUser) {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          const active = i === index;
          slide.classList.toggle('is-active', active);
          slide.toggleAttribute('inert', !active);
        });
        if (current) current.textContent = pad(index + 1);
        if (byUser) root.setAttribute('aria-live', 'polite');
        schedule();
      }

      function schedule() {
        clearTimeout(timer);
        if (hold || !onScreen || document.hidden || RS.reduceMotion()) return;
        timer = setTimeout(() => show(index + 1), 7000);
      }

      qs('[data-feature-prev]', root)?.addEventListener('click', () => show(index - 1, true));
      qs('[data-feature-next]', root)?.addEventListener('click', () => show(index + 1, true));

      root.addEventListener('pointerenter', () => { hold = true; schedule(); });
      root.addEventListener('pointerleave', () => { hold = false; schedule(); });
      root.addEventListener('focusin', () => { hold = true; schedule(); });
      root.addEventListener('focusout', event => {
        if (!root.contains(event.relatedTarget)) { hold = false; schedule(); }
      });

      /* Touch swipe */
      let startX = null;
      root.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') startX = event.clientX; });
      root.addEventListener('pointerup', event => {
        if (startX === null) return;
        const distance = event.clientX - startX;
        startX = null;
        if (Math.abs(distance) > 50) show(index + (distance < 0 ? 1 : -1), true);
      });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; schedule(); }).observe(root);
      }
      document.addEventListener('visibilitychange', schedule);

      show(index);
    });
  }

  /* ==================================================================== *
   * Custom select — [data-select] > input[hidden] + button + ul[role=listbox]
   * Options: li[role=option][data-value]. Arrow keys move, Enter/Space pick,
   * Esc closes; the hidden input carries the value for the form.
   * ==================================================================== */

  function initSelects() {
    qsa('[data-select]').forEach(root => {
      const input = qs('input[type="hidden"]', root);
      const button = qs('.rs-select__btn', root);
      const list = qs('[role="listbox"]', root);
      const label = qs('[data-select-label]', root);
      if (!input || !button || !list) return;

      /* Options are read on demand — other scripts may add them later */
      const options = () => qsa('[role="option"]', root);
      const current = () => options().findIndex(option => option.getAttribute('aria-selected') === 'true');

      function open() {
        list.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        root.classList.add('is-open');
        options()[Math.max(0, current())]?.focus();
      }
      function close(refocus) {
        if (list.hidden) return;
        list.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        root.classList.remove('is-open');
        if (refocus) button.focus();
      }
      /* Reflect a value in the UI (used by choose() and RS.selectSet) */
      function reflect(value) {
        const items = options();
        const option = items.find(item => (item.dataset.value || '') === value) || items[0];
        items.forEach(item => item.setAttribute('aria-selected', String(item === option)));
        input.value = option ? option.dataset.value || '' : '';
        /* Take the option's text only — not an extra such as a result count */
        if (label && option) label.textContent = (qs('span:not(.rs-select__count)', option) || option).textContent.trim();
        root.classList.toggle('has-value', Boolean(input.value));
      }
      function choose(option) {
        reflect(option.dataset.value || '');
        close(true);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      root.rsSelectSet = reflect;

      button.addEventListener('click', () => (list.hidden ? open() : close()));
      button.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(); }
      });

      list.addEventListener('click', event => {
        const option = event.target.closest('[role="option"]');
        if (option) choose(option);
      });
      list.addEventListener('keydown', event => {
        const items = options();
        const index = items.indexOf(document.activeElement);
        if (event.key === 'ArrowDown') { event.preventDefault(); items[(index + 1) % items.length].focus(); }
        else if (event.key === 'ArrowUp') { event.preventDefault(); items[(index - 1 + items.length) % items.length].focus(); }
        else if (event.key === 'Home') { event.preventDefault(); items[0].focus(); }
        else if (event.key === 'End') { event.preventDefault(); items[items.length - 1].focus(); }
        else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (index >= 0) choose(items[index]); }
        else if (event.key === 'Escape') { event.preventDefault(); close(true); }
        else if (event.key === 'Tab') close();
      });

      document.addEventListener('click', event => { if (!root.contains(event.target)) close(); });
      root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) close(); });
    });
  }

  /* ==================================================================== *
   * Pager — RS.pagerHTML({ page, pages, total, size, sizes, unit })
   * The foot of a long list: what is shown ("1–10 of 17"), first /
   * previous / numbers / next / last, and a dropdown of how many per page.
   * The caller listens for clicks on [data-pager-page] and [data-pager-size].
   * ==================================================================== */

  const PAGER_L = {
    shown: { th: 'แสดง {a}–{b} จาก {n} {unit}', en: 'Showing {a}–{b} of {n} {unit}' },
    first: { th: 'หน้าแรก', en: 'First' },
    prev: { th: 'ก่อนหน้า', en: 'Previous' },
    next: { th: 'ถัดไป', en: 'Next' },
    last: { th: 'สุดท้าย', en: 'Last' },
    pageN: { th: 'หน้า {n}', en: 'Page {n}' },
    ofN: { th: 'หน้า {p} จาก {n}', en: 'Page {p} of {n}' },
    perPage: { th: 'แสดงต่อหน้า', en: 'Per page' }
  };
  let pagerSeq = 0;

  /* the page numbers to show: always the first and last, two either side
     of the current one, and a gap (…) where numbers are skipped */
  function pageWindow(page, pages) {
    const keep = new Set([1, pages]);
    for (let n = page - 1; n <= page + 1; n++) if (n >= 1 && n <= pages) keep.add(n);
    if (page <= 3) [2, 3, 4].forEach(n => n <= pages && keep.add(n));
    if (page >= pages - 2) [pages - 1, pages - 2, pages - 3].forEach(n => n >= 1 && keep.add(n));
    const list = [...keep].sort((a, b) => a - b);
    return list.flatMap((n, i) => (i && n - list[i - 1] > 1 ? ['gap', n] : [n]));
  }

  RS.pagerHTML = ({ page, pages, total, size, sizes = [10, 20, 40], unit = { th: 'รายการ', en: 'items' } }) => {
    const { t, te, escapeHTML } = RS;
    const num = n => escapeHTML(RS.digits(String(n)));
    const id = `pager-${++pagerSeq}`;
    const a = total ? (page - 1) * size + 1 : 0;
    const b = Math.min(page * size, total);
    const go = (n, cls, label, html, off) => `<li><button class="pager__btn ${cls}" type="button" data-pager-page="${n}" aria-label="${escapeHTML(label)}"${off ? ' disabled' : ''}>${html}</button></li>`;
    const chev = `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-chevron"></use></svg>`;
    const numbers = pageWindow(page, pages).map(n => (n === 'gap'
      ? '<li class="pager__gap" aria-hidden="true">…</li>'
      : `<li><button class="pager__btn pager__num" type="button" data-pager-page="${n}" aria-label="${escapeHTML(t(PAGER_L.pageN).replace('{n}', n))}"${n === page ? ' aria-current="page"' : ''}>${num(n)}</button></li>`)).join('');
    return `
      <p class="pager__summary" aria-live="polite">${escapeHTML(RS.digits(t(PAGER_L.shown).replace('{a}', a).replace('{b}', b).replace('{n}', total).replace('{unit}', t(unit))))}</p>
      <ul class="pager__pages" role="list">
        ${go(1, 'pager__edge pager__first', t(PAGER_L.first), `<span class="pager__chev pager__chev--double" aria-hidden="true">${chev}${chev}</span><span class="pager__word">${te(PAGER_L.first)}</span>`, page <= 1)}
        ${go(page - 1, 'pager__edge pager__prev', t(PAGER_L.prev), `<span class="pager__chev" aria-hidden="true">${chev}</span><span class="pager__word">${te(PAGER_L.prev)}</span>`, page <= 1)}
        ${numbers}
        <li class="pager__of" aria-hidden="true">${escapeHTML(RS.digits(t(PAGER_L.ofN).replace('{p}', page).replace('{n}', pages)))}</li>
        ${go(page + 1, 'pager__edge pager__next', t(PAGER_L.next), `<span class="pager__word">${te(PAGER_L.next)}</span><span class="pager__chev" aria-hidden="true">${chev}</span>`, page >= pages)}
        ${go(pages, 'pager__edge pager__last', t(PAGER_L.last), `<span class="pager__word">${te(PAGER_L.last)}</span><span class="pager__chev pager__chev--double" aria-hidden="true">${chev}${chev}</span>`, page >= pages)}
      </ul>
      <div class="pager__size">
        <span class="pager__size-label" id="${id}-label">${te(PAGER_L.perPage)}</span>
        <div class="pager__menu" data-pager-menu>
          <button class="pager__menu-btn" type="button" id="${id}-btn" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${id}-label ${id}-btn">
            <span>${num(size)}</span>${chev}
          </button>
          <ul class="pager__menu-list" role="listbox" aria-labelledby="${id}-label" hidden>
            ${sizes.map(n => `<li class="pager__menu-opt" role="option" tabindex="-1" data-pager-size="${n}" aria-selected="${n === size}"><span>${num(n)}</span><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-check"></use></svg></li>`).join('')}
          </ul>
        </div>
      </div>`;
  };

  /* the per-page dropdown: opens upward from the foot of the list; arrow
     keys move, Enter / Space pick (a click on the option, which the list's
     own script handles), Esc closes */
  const closeMenus = except => qsa('[data-pager-menu].is-open').forEach(menu => {
    if (menu === except) return;
    menu.classList.remove('is-open');
    qs('.pager__menu-list', menu).hidden = true;
    qs('.pager__menu-btn', menu).setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('click', event => {
    const btn = event.target.closest('.pager__menu-btn');
    if (!btn) { closeMenus(); return; }
    const menu = btn.closest('[data-pager-menu]');
    const list = qs('.pager__menu-list', menu);
    const opening = list.hidden;
    closeMenus(menu);
    list.hidden = !opening;
    menu.classList.toggle('is-open', opening);
    btn.setAttribute('aria-expanded', String(opening));
    if (opening) (qs('[aria-selected="true"]', list) || qs('[role="option"]', list))?.focus();
  });
  document.addEventListener('keydown', event => {
    const menu = event.target.closest?.('[data-pager-menu]');
    if (!menu) return;
    const btn = qs('.pager__menu-btn', menu);
    const items = qsa('[role="option"]', menu);
    const index = items.indexOf(document.activeElement);
    if (event.target === btn) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); btn.click(); }
      return;
    }
    if (event.key === 'ArrowDown') { event.preventDefault(); items[(index + 1) % items.length].focus(); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); items[(index - 1 + items.length) % items.length].focus(); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (index >= 0) items[index].click(); }
    else if (event.key === 'Escape' || event.key === 'Tab') { closeMenus(); if (event.key === 'Escape') btn.focus(); }
  });

  /** Set a custom select's value from code (falls back to plain inputs) */
  RS.selectSet = (input, value) => {
    const root = input?.closest('[data-select]');
    if (root?.rsSelectSet) root.rsSelectSet(value || '');
    else if (input) input.value = value || '';
  };

  /* ==================================================================== *
   * Horizontal scroller — [data-scroller] > [data-scroller-track]
   *   buttons: [data-scroller-prev] [data-scroller-next]
   * Scrolls by one item; buttons disable at either end.
   * ==================================================================== */

  function initScrollers() {
    qsa('[data-scroller]').forEach(root => {
      const track = qs('[data-scroller-track]', root);
      const prev = qs('[data-scroller-prev]', root);
      const next = qs('[data-scroller-next]', root);
      if (!track || !prev || !next) return;

      const step = () => {
        const item = track.firstElementChild;
        if (!item) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return item.getBoundingClientRect().width + gap;
      };

      function update() {
        const max = track.scrollWidth - track.clientWidth - 1;
        const atStart = track.scrollLeft <= 0;
        const atEnd = track.scrollLeft >= max;
        prev.disabled = atStart;
        next.disabled = atEnd;
        root.classList.toggle('is-scrollable', max > 0);
        root.classList.toggle('is-at-start', atStart);
        root.classList.toggle('is-at-end', atEnd);
      }

      prev.addEventListener('click', () => track.scrollBy({ left: -step() * 2, behavior: RS.reduceMotion() ? 'auto' : 'smooth' }));
      next.addEventListener('click', () => track.scrollBy({ left: step() * 2, behavior: RS.reduceMotion() ? 'auto' : 'smooth' }));
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      /* Items may be rendered later (08-directory.js) */
      document.addEventListener('rs:content-added', update);
      update();
    });
  }

  /* ==================================================================== *
   * Table of contents scroll-spy
   * markup: nav.article-toc a[href="#section-id"]
   * ==================================================================== */

  function initTocSpy() {
    const links = qsa('.article-toc a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const byId = new Map(links.map(link => [decodeURIComponent(link.hash.slice(1)), link]));
    const sections = [...byId.keys()].map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* ==================================================================== *
   * Copy / share / print
   *   <button data-copy-target="#element-id">   copies text content
   *   <button data-copy-link>                   copies the page URL
   *   <button data-share>                       native share, falls back to copy
   *   <button data-print>
   * ==================================================================== */

  const COPY_DONE = { th: 'คัดลอกแล้ว', en: 'Copied' };
  const LINK_DONE = { th: 'คัดลอกลิงก์แล้ว', en: 'Link copied' };

  /* ==================================================================== *
   * Image fallback — <img src="new.jpg" data-fallback="stand-in.jpg">
   * Shows the stand-in until the real file has been added.
   * ==================================================================== */

  /* Any picture that cannot be shown — a missing file, an empty or "#" path
     from the CMS — first tries its data-fallback; failing that it is hidden
     and, when it is the only thing in its frame, the frame becomes a quiet
     placeholder (.media-empty: pale green with the crest) instead of the
     browser's broken-image icon or a bare grey box. Member portraits keep
     their own handling (08-directory.js shows the initial). */
  function onBrokenImage(img) {
    if (!img || img.closest('.fellowx-photo')) return;
    if (img.dataset.fallback && !img.dataset.fallbackUsed) {
      img.dataset.fallbackUsed = 'true';
      img.src = img.dataset.fallback;
      return;
    }
    if (img.dataset.broken) return;
    img.dataset.broken = 'true';
    img.hidden = true;
    const frame = img.parentElement;
    if (frame && frame.children.length === 1) frame.classList.add('media-empty');
  }

  /* an empty src="" is a template waiting to be filled (the photo viewer),
     not a missing picture; "#" is what RS.url() gives for an empty path */
  const isUnusable = img => {
    const src = img.getAttribute('src');
    if (!src || !src.trim()) return false;
    return src === '#' || (img.complete && !img.naturalWidth && !!img.currentSrc);
  };

  /* ==================================================================== *
   * Keep Thai phrases whole
   *   Thai has no spaces between words, only between phrases, and browsers
   *   break a Thai line wherever their dictionary allows, so a phrase can be
   *   cut at the line end ("และให้ / บริการ"). In the reading text of the
   *   main content each run between spaces becomes span.story__ph, which
   *   moves to the next line whole (a run longer than the line still wraps
   *   inside). Skipped: links and buttons (cards), forms, navigation, text
   *   clamped to a few lines, English, code, and [data-no-phrases].
   *   Content added later is handled through the rs:content-added event.
   * ==================================================================== */
  const THAI_RE = /[\u0E00-\u0E7F]/;
  const PHRASE_BLOCKS = 'p, li, dd, dt, blockquote, figcaption, td, th';
  const PHRASE_SKIP = 'a, button, label, select, textarea, nav, form, .pager, [data-no-phrases], [contenteditable], code, pre, svg, .story__ph, [lang="en"]';
  function keepPhrases(scope) {
    const main = document.getElementById('main-content');
    if (!main) return;
    const base = scope && scope.nodeType === 1 ? scope : main;
    if (!main.contains(base) && base !== main) return;
    const blocks = base.matches?.(PHRASE_BLOCKS) ? [base, ...base.querySelectorAll(PHRASE_BLOCKS)] : [...base.querySelectorAll(PHRASE_BLOCKS)];
    blocks.forEach(block => {
      if (block.dataset.phrases || !THAI_RE.test(block.textContent) || block.closest(PHRASE_SKIP)) return;
      const cs = getComputedStyle(block);
      if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') return;
      block.dataset.phrases = '1';
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const value = node.nodeValue;
        if (!THAI_RE.test(value) || !/\S\s+\S/.test(value) || node.parentElement.closest(PHRASE_SKIP)) return;
        const frag = document.createDocumentFragment();
        /* "ต่าง ๆ" stays one piece: a lone ๆ joins the word before it */
        value.replace(/[ \t\n\r]+ๆ/g, '\u00A0ๆ').split(/([ \t\n\r]+)/).forEach(part => {
          if (!part) return;
          if (/^[ \t\n\r]+$/.test(part) || !THAI_RE.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const span = document.createElement('span');
          span.className = 'story__ph';
          span.textContent = part;
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      });
    });
  }
  RS.keepPhrases = keepPhrases;

  function initPhrases() {
    if (RS.lang !== 'th' && document.documentElement.lang !== 'th') return;
    /* after every module has filled its part of the page */
    setTimeout(() => keepPhrases(document), 0);
    document.addEventListener('rs:content-added', event => {
      const el = event.detail && event.detail.nodeType === 1 ? event.detail : document;
      requestAnimationFrame(() => keepPhrases(el));
    });
  }

  /* ==================================================================== *
   * English pages: Thai interface words and Thai numerals
   *   Lists drawn from Thai records (documents, notices, ITA, covers) carry
   *   short Thai labels: a language, an academy, a section of the Act, a
   *   Buddhist-era year. On English pages these become English, and Thai
   *   numerals become 0–9. Thai content itself (titles, names, Thai-only
   *   text: [data-th-only], [lang="th"]) is left as it is.
   * ==================================================================== */
  const EN_WORDS = [
    ['สำนักงานราชบัณฑิตยสภา', 'Office of the Royal Society'],
    ['สำนักธรรมศาสตร์และการเมือง', 'Academy of Moral and Political Sciences'],
    ['สำนักวิทยาศาสตร์', 'Academy of Science'],
    ['สำนักศิลปกรรม', 'Academy of Arts'],
    ['ราชบัณฑิตยสถาน', 'Royal Institute'],
    ['ราชบัณฑิตยสภา', 'Royal Society'],
    ['ภาษาอังกฤษ', 'English'],
    ['ภาษาไทย', 'Thai'],
    ['ฉบับเต็ม', 'Full text'],
    ['ฉบับแปล', 'Translation'],
    ['สรุปสาระสำคัญ', 'Summary'],
    ['อ่านเข้าใจง่าย', 'Plain summary'],
    ['สมัยราชบัณฑิตยสถาน', 'Royal Institute era'],
    ['พระราชบัญญัติ', 'Act'],
    ['ข้อบังคับ', 'Bylaw'],
    ['ระเบียบ', 'Regulation'],
    ['ประกาศ', 'Notice'],
    ['จำนวนที่นั่ง', 'Seats'],
    ['ประเภทวิชาและสาขา', 'Fields and disciplines'],
    ['การรับภาคีสมาชิก', 'Electing Associate Fellows'],
    ['การเลือกราชบัณฑิต', 'Electing Fellows'],
    ['หน้า', 'pages'],
    ['ล่าสุด', 'Latest']
  ];
  const EN_LABELS = '.acts-doc__meta, .ann-acad, .auth-ref, .auth-flow__ref, .auth-sec__no, .rec-doc__kind, .rec-doc__meta, .act-doc__d, .ann-cover__kind, .ann-cover__org, .ann-cover__subject, .acts-doc__new';
  const TH_DIGITS = /[๐-๙]/g;
  const toArabic = text => text.replace(TH_DIGITS, d => String(d.charCodeAt(0) - 0x0E50));
  /* subject names: the tab with the same Thai label holds its English;
     read before 05-language.js swaps the tabs' text */
  const tabEn = {};
  function englishLabels(scope) {
    if (document.documentElement.lang !== 'en') return;
    const base = scope && scope.nodeType === 1 ? scope : document.body;
    base.querySelectorAll(EN_LABELS).forEach(el => {
      if (el.closest('[data-th-only], [lang="th"]')) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const v = node.nodeValue;
        if (!THAI_RE.test(v) && !/[๐-๙]/.test(v)) return;
        /* translate whole items between the "·" separators only, so a Thai
           phrase is never half-translated */
        const out = v.split(/(\s*·\s*)/).map(part => {
          const word = part.trim();
          if (!word || part.includes('·')) return part;
          const lead = part.slice(0, part.indexOf(word));
          const tail = part.slice(part.indexOf(word) + word.length);
          let en = tabEn[word];
          if (!en) { const hit = EN_WORDS.find(([th]) => th === word); if (hit) en = hit[1]; }
          if (!en && /^พ\.ศ\.\s*[๐-๙\d]{4}$/.test(word)) en = String(Number(toArabic(word.replace(/[^๐-๙\d]/g, ''))) - 543);
          if (!en && /^มาตรา(\s|$)/.test(word)) en = word.replace(/^มาตรา/, word.includes(' ', 6) ? 'Sections' : 'Section');
          if (!en && /^[๐-๙\d]+\s*หน้า$/.test(word)) en = word.replace(/\s*หน้า$/, ' p.');
          return en ? lead + en + tail : part;
        }).join('');
        node.nodeValue = toArabic(out);
      });
    });
    /* Thai numerals anywhere outside Thai content */
    const walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!/[๐-๙]/.test(node.nodeValue)) continue;
      const el = node.parentElement;
      if (!el || el.closest('[data-th-only], [lang="th"], script, style, [data-keep-digits]')) continue;
      /* a run that is otherwise Thai prose keeps its numerals */
      if (/[ก-๏]/.test(node.nodeValue)) continue;
      node.nodeValue = toArabic(node.nodeValue);
    }
  }
  function initEnglishLabels() {
    if (document.documentElement.lang !== 'en') return;
    document.querySelectorAll('.news-tab[data-en]').forEach(tab => {
      const thText = (tab.childNodes[0] ? tab.childNodes[0].textContent : tab.textContent).trim();
      if (thText) tabEn[thText] = tab.dataset.en;
    });
    setTimeout(() => englishLabels(document.body), 0);
    document.addEventListener('rs:content-added', event => {
      requestAnimationFrame(() => englishLabels(event.detail && event.detail.nodeType === 1 ? event.detail : document.body));
    });
  }

  /* ==================================================================== *
   * English only
   *   The last pass on an English page, after every module has drawn its
   *   part: Thai-only blocks ([data-th-only]) give way to their English
   *   notice, and any element still showing Thai text is hidden. Labels the
   *   English pass above could translate are already English by now.
   * ==================================================================== */
  const LATIN_RE = /[A-Za-z]/;
  function englishOnly(scope) {
    if (document.documentElement.lang !== 'en') return;
    const base = scope && scope.nodeType === 1 ? scope : document.body;
    base.querySelectorAll('[data-th-only]').forEach(el => el.classList.add('en-hidden'));
    document.querySelectorAll('[data-en-notice]').forEach(el => { el.hidden = false; });
    const walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT);
    const hits = new Set();
    let node;
    while ((node = walker.nextNode())) {
      if (!THAI_RE.test(node.nodeValue)) continue;
      const el = node.parentElement;
      if (!el || el.closest('script, style, title, .en-hidden, .visually-hidden')) continue;
      hits.add(el);
    }
    hits.forEach(el => {
      /* hide the smallest box that holds the Thai: the element itself, or
         its list item / card when nothing English is left in it */
      const item = el.closest('li, article, tr, .newsx-item, .fellowx-card, .result-item');
      if (item && !LATIN_RE.test(item.textContent.replace(/[฀-๿]+/g, ''))) { item.classList.add('en-hidden'); return; }
      const ownLatin = [...el.childNodes].some(n => n.nodeType === 3 && LATIN_RE.test(n.nodeValue));
      if (!ownLatin) { el.classList.add('en-hidden'); return; }
      /* English and Thai in one run: keep the English words only */
      [...el.childNodes].forEach(n => {
        if (n.nodeType === 3 && THAI_RE.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/[฀-๿][฀-๿\s.]*/g, ' ').replace(/\s{2,}/g, ' ');
      });
    });
  }
  /* where Thai was hidden, say so once and offer the Thai page; on a page
     left with almost nothing, this note becomes its content */
  function thaiOnlyNote() {
    const main = document.getElementById('main-content');
    if (!main || main.querySelector('.en-thai-note')) return;
    const thUrl = new URL(location.href);
    thUrl.searchParams.set('lang', 'th');
    const words = [...main.querySelectorAll('h1, h2, h3, p, li')].filter(el => el.getClientRects().length && el.textContent.trim()).length;
    const leftOut = main.querySelector('.en-hidden') || window.RS_EN_FILTERED > 0;
    if (!leftOut && words >= 10) return;
    const note = document.createElement('div');
    note.className = `container en-thai-note${words < 10 ? ' en-thai-note--page' : ''}`;
    note.innerHTML = words < 10
      ? `<p class="en-thai-note__title">This page is published in Thai only</p><p class="en-thai-note__text">An English version will follow. You can read it in Thai now.</p><a class="btn btn--primary btn--pill" href="${escapeHTML(thUrl.href)}" hreflang="th">Read in Thai ${icon('arrow')}</a>`
      : `<p class="en-thai-note__text">${icon('info')}<span>Some items on this page are available in Thai only. <a href="${escapeHTML(thUrl.href)}" hreflang="th">View this page in Thai</a></span></p>`;
    const hero = main.querySelector('.hhero, .page-header, .story__head, .article-header, .kn-hero');
    if (hero) hero.after(note); else main.prepend(note);
  }
  function initEnglishOnly() {
    if (document.documentElement.lang !== 'en') return;
    /* after the modules and the English labels pass, and once more when the
       page has settled (late drawings: quotes, sliders, embeds) */
    setTimeout(() => setTimeout(() => { englishOnly(document.body); thaiOnlyNote(); }, 0), 0);
    window.addEventListener('load', () => setTimeout(() => { englishOnly(document.body); thaiOnlyNote(); }, 300));
    document.addEventListener('rs:content-added', event => {
      requestAnimationFrame(() => requestAnimationFrame(() => englishOnly(event.detail && event.detail.nodeType === 1 ? event.detail : document.body)));
    });
  }

  function initImageFallbacks() {
    document.addEventListener('error', event => {
      const img = event.target;
      if (img instanceof HTMLImageElement && (img.getAttribute('src') || '').trim()) onBrokenImage(img);
    }, true);
    /* a picture given a working file later (a viewer, a lazy swap) comes back */
    document.addEventListener('load', event => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement) || !img.dataset.broken || !img.naturalWidth) return;
      delete img.dataset.broken;
      img.hidden = false;
      img.parentElement?.classList.remove('media-empty');
    }, true);
    /* pictures that failed before this script ran, or were never given a file */
    qsa('img').forEach(img => { if (isUnusable(img)) onBrokenImage(img); });
  }
  /* ==================================================================== *
   * Photo viewer — one for the whole site (news stories, activity reports,
   * anything a CMS page adds): every photograph in one frame size on a
   * light frosted backdrop, the photo whole with its own blurred copy
   * filling the frame; a horizontal track that snaps, so a swipe, a
   * trackpad, a drag, the arrow buttons or keys all slide it; thumbnails
   * beneath jump to any one; the caption, when there is one, under it.
   *
   *   const open = RS.photoViewer([{ src, caption }, …]);  open(index);
   * ==================================================================== */
  const LB = {
    label: { th: 'ภาพบรรยากาศ', en: 'Photographs' },
    photo: { th: 'ภาพที่ {n}', en: 'Photo {n}' },
    close: { th: 'ปิด', en: 'Close' },
    prev: { th: 'ภาพก่อนหน้า', en: 'Previous photo' },
    next: { th: 'ภาพถัดไป', en: 'Next photo' }
  };
  RS.photoViewer = list => {
    const photos = (list || []).map(p => (Array.isArray(p) ? { src: p[0] } : p)).filter(p => p && p.src);
    if (!photos.length || typeof HTMLDialogElement !== 'function') return null;
    const tt = key => RS.t(LB[key]);
    const dialog = document.createElement('dialog');
    dialog.className = 'act-lb';
    dialog.setAttribute('aria-label', tt('label'));
    const label = i => tt('photo').replace('{n}', RS.digits(i + 1));
    const caption = p => escapeHTML(RS.t(p.caption) || '');
    dialog.innerHTML = `
      <div class="act-lb__bar">
        <p class="act-lb__count" aria-live="polite" data-lb-count></p>
        <button class="act-lb__close" type="button" data-lb-close aria-label="${escapeHTML(tt('close'))}">${icon('x')}</button>
      </div>
      <div class="act-lb__stage">
        <button class="act-lb__nav act-lb__nav--prev" type="button" data-lb-step="-1" aria-label="${escapeHTML(tt('prev'))}">${icon('chevron')}</button>
        <div class="act-lb__track" data-lb-track>${photos.map((p, i) => `
          <figure class="act-lb__slide" aria-roledescription="slide" aria-label="${escapeHTML(label(i))}">
            <img class="act-lb__bg" data-src="${escapeHTML(RS.url(p.src))}" alt="" aria-hidden="true">
            <img class="act-lb__img" data-src="${escapeHTML(RS.url(p.src))}" alt="${caption(p) || escapeHTML(label(i))}">
          </figure>`).join('')}</div>
        <button class="act-lb__nav act-lb__nav--next" type="button" data-lb-step="1" aria-label="${escapeHTML(tt('next'))}">${icon('chevron')}</button>
      </div>
      <p class="act-lb__caption" data-lb-caption hidden></p>
      <div class="act-lb__thumbs">${photos.length > 1 ? photos.map((p, i) => `
        <button class="act-lb__thumb" type="button" data-lb-thumb="${i}" aria-label="${escapeHTML(label(i))}">
          <img src="${escapeHTML(RS.url(p.src))}" alt="" loading="lazy" decoding="async">
        </button>`).join('') : ''}</div>`;
    document.body.appendChild(dialog);

    const track = qs('[data-lb-track]', dialog);
    const count = qs('[data-lb-count]', dialog);
    const cap = qs('[data-lb-caption]', dialog);
    const slides = [...track.children];
    const marks = qsa('[data-lb-thumb]', dialog);
    const prev = qs('.act-lb__nav--prev', dialog);
    const next = qs('.act-lb__nav--next', dialog);
    let at = 0;

    /* load the photo shown and its neighbours only */
    const load = i => [i - 1, i, i + 1].forEach(n => {
      slides[n]?.querySelectorAll('img[data-src]').forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    });
    const mark = i => {
      at = i;
      load(i);
      count.textContent = RS.digits(`${i + 1} / ${photos.length}`);
      const c = caption(photos[i]);
      cap.innerHTML = c;
      cap.hidden = !c;
      marks.forEach((m, n) => m.setAttribute('aria-current', String(n === i)));
      marks[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      prev.disabled = i === 0;
      next.disabled = i === photos.length - 1;
    };
    const go = (i, smooth = true) => {
      i = Math.max(0, Math.min(photos.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: smooth && !RS.reduceMotion() ? 'smooth' : 'auto' });
      mark(i);
    };
    /* the slide in view after a swipe or a trackpad scroll */
    let settle;
    track.addEventListener('scroll', () => {
      clearTimeout(settle);
      settle = setTimeout(() => { const i = Math.round(track.scrollLeft / track.clientWidth); if (i !== at) mark(i); }, 80);
    }, { passive: true });
    /* a mouse drag slides too */
    let drag = null;
    track.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') { drag = { x: e.clientX, left: track.scrollLeft }; track.classList.add('is-dragging'); } });
    window.addEventListener('pointermove', e => { if (drag) track.scrollLeft = drag.left - (e.clientX - drag.x); });
    window.addEventListener('pointerup', e => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      track.classList.remove('is-dragging');
      drag = null;
      go(Math.abs(dx) > 60 ? at + (dx < 0 ? 1 : -1) : at);
    });
    dialog.addEventListener('click', event => {
      const step = event.target.closest('[data-lb-step]');
      if (step) { go(at + Number(step.dataset.lbStep)); return; }
      const thumb = event.target.closest('[data-lb-thumb]');
      if (thumb) { go(Number(thumb.dataset.lbThumb)); return; }
      if (event.target.closest('[data-lb-close]') || event.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); go(at + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(at - 1); }
    });
    window.addEventListener('resize', () => { if (dialog.open) go(at, false); });
    return i => { dialog.showModal(); go(i || 0, false); };
  };

  /* ==================================================================== *
   * PDF preview — one for the whole site: the document in the browser's
   * own PDF reader inside a popup, loaded only when asked (some files are
   * tens of megabytes), with "open in a new tab" and "download" beside the
   * close button. On a phone, where an embedded PDF reads badly, it simply
   * opens the file in a new tab.
   *
   *   RS.pdfPreview({ src, title, pages, bytes });
   * ==================================================================== */
  const PDF = {
    label: { th: 'ตัวอย่างเอกสาร', en: 'Document preview' },
    open: { th: 'เปิดในแท็บใหม่', en: 'Open in a new tab' },
    download: { th: 'ดาวน์โหลด', en: 'Download' },
    close: { th: 'ปิด', en: 'Close' },
    loading: { th: 'กำลังโหลดเอกสาร…', en: 'Loading the document…' },
    pages: { th: '{n} หน้า', en: '{n} pages' }
  };
  RS.fileSize = bytes => {
    if (!bytes) return '';
    const mb = bytes / 1048576;
    return RS.digits(mb >= 1 ? `${mb >= 10 ? Math.round(mb) : mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);
  };
  RS.pdfMeta = f => ['PDF', f.pages ? RS.t(PDF.pages).replace('{n}', RS.digits(f.pages)) : '', RS.fileSize(f.bytes)].filter(Boolean).join(' · ');
  let pdfDialog = null;
  RS.pdfPreview = file => {
    if (!file || !file.src) return;
    const narrow = matchMedia('(max-width: 767.98px)').matches || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (narrow || typeof HTMLDialogElement !== 'function') { window.open(file.src, '_blank', 'noopener'); return; }
    const tt = key => RS.t(PDF[key]);
    if (!pdfDialog) {
      pdfDialog = document.createElement('dialog');
      pdfDialog.className = 'pdf-lb';
      pdfDialog.setAttribute('aria-label', tt('label'));
      pdfDialog.innerHTML = `
        <div class="pdf-lb__bar">
          <div class="pdf-lb__head"><p class="pdf-lb__title" data-pdf-title></p><p class="pdf-lb__meta" data-pdf-meta></p></div>
          <div class="pdf-lb__tools">
            <a class="pdf-lb__btn" data-pdf-open target="_blank" rel="noopener">${icon('external')}<span>${escapeHTML(tt('open'))}</span></a>
            <a class="pdf-lb__btn" data-pdf-download download>${icon('download')}<span>${escapeHTML(tt('download'))}</span></a>
            <button class="pdf-lb__close" type="button" data-pdf-close aria-label="${escapeHTML(tt('close'))}">${icon('x')}</button>
          </div>
        </div>
        <div class="pdf-lb__stage"><p class="pdf-lb__loading" data-pdf-loading>${escapeHTML(tt('loading'))}</p><iframe class="pdf-lb__frame" title="${escapeHTML(tt('label'))}"></iframe></div>`;
      document.body.appendChild(pdfDialog);
      pdfDialog.addEventListener('click', event => {
        if (event.target.closest('[data-pdf-close]') || event.target === pdfDialog) pdfDialog.close();
      });
      /* closing drops the document, so a long PDF stops loading and frees memory */
      pdfDialog.addEventListener('close', () => { qs('iframe', pdfDialog).src = 'about:blank'; });
      qs('iframe', pdfDialog).addEventListener('load', event => {
        if (event.target.getAttribute('src') !== 'about:blank') qs('[data-pdf-loading]', pdfDialog).hidden = true;
      });
    }
    qs('[data-pdf-title]', pdfDialog).textContent = file.title || tt('label');
    qs('[data-pdf-meta]', pdfDialog).textContent = RS.pdfMeta(file);
    qs('[data-pdf-open]', pdfDialog).href = file.src;
    qs('[data-pdf-download]', pdfDialog).href = file.src;
    qs('[data-pdf-loading]', pdfDialog).hidden = false;
    pdfDialog.showModal();
    qs('iframe', pdfDialog).src = `${file.src}#view=FitH`;
  };

  /* any page (or CMS content) can ask for a preview without a script of its
     own: <button data-pdf-preview="file.pdf" data-pdf-title="…" data-pdf-pages="3" data-pdf-bytes="40769"> */
  document.addEventListener('click', event => {
    const b = event.target.closest('[data-pdf-preview]');
    if (!b) return;
    event.preventDefault();
    RS.pdfPreview({ src: b.dataset.pdfPreview, title: b.dataset.pdfTitle, pages: Number(b.dataset.pdfPages) || 0, bytes: Number(b.dataset.pdfBytes) || 0 });
  });

  RS.checkImages = root => qsa('img', root || document).forEach(img => { if (isUnusable(img)) onBrokenImage(img); });

  function initUtilities() {
    document.addEventListener('click', async event => {
      const button = event.target.closest('[data-copy-target], [data-copy-link], [data-share], [data-print]');
      if (!button) return;

      if (button.hasAttribute('data-print')) {
        window.print();
        return;
      }

      if (button.hasAttribute('data-share') && navigator.share) {
        try {
          await navigator.share({ title: document.title, url: location.href });
        } catch { /* user dismissed the share sheet */ }
        return;
      }

      if (button.hasAttribute('data-copy-link') || button.hasAttribute('data-share')) {
        if (await copyText(location.href)) toast(RS.t(LINK_DONE));
        return;
      }

      const source = qs(button.dataset.copyTarget);
      if (source && await copyText(source.innerText.trim())) toast(RS.t(COPY_DONE));
    });
  }

  /* ==================================================================== *
   * Citation formats — tabs already switch the visible format;
   * [data-copy-citation] copies whichever panel is visible.
   * ==================================================================== */

  function initCitation() {
    qsa('[data-citation]').forEach(root => {
      qs('[data-copy-citation]', root)?.addEventListener('click', async () => {
        const visible = qsa('[role="tabpanel"]', root).find(panel => !panel.hidden);
        if (visible && await copyText(visible.innerText.trim())) toast(RS.t(COPY_DONE));
      });
    });
  }

  /* ==================================================================== *
   * Modal — native <dialog class="modal">
   *   <button data-modal-open="dialog-id">   <button data-modal-close>
   * The browser handles focus trapping, Esc and focus return.
   * ==================================================================== */

  function initModals() {
    document.addEventListener('click', event => {
      const opener = event.target.closest('[data-modal-open]');
      if (opener) {
        const dialog = document.getElementById(opener.dataset.modalOpen);
        if (typeof dialog?.showModal === 'function') dialog.showModal();
        return;
      }

      const closer = event.target.closest('[data-modal-close]');
      if (closer) {
        closer.closest('dialog')?.close();
        return;
      }

      /* Click on the backdrop */
      if (event.target instanceof HTMLDialogElement && event.target.classList.contains('modal')) {
        event.target.close();
      }
    });
  }

  /** Initialises motion-related behaviour. */
  function initAnimations() {
    initHeaderSync();
    initReveal();
    initCounters();
  }

  /* ==================================================================== *
   * Chat card (02-components.js renders it): the round button opens and
   * closes it; Esc, the close button or a click outside closes it and
   * focus returns to the button.
   * ==================================================================== */

  function initChat() {
    const widget = qs('[data-chat]');
    if (!widget) return;
    const toggle = qs('[data-chat-toggle]', widget);
    const panel = qs('.chat-panel', widget);
    const setOpen = (open, focus = true) => {
      panel.hidden = !open;
      widget.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open && focus) qs('.chat-cta', panel)?.focus();
      if (!open && focus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    qs('[data-chat-close]', widget).addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) setOpen(false);
    });
    document.addEventListener('click', event => {
      if (!panel.hidden && !widget.contains(event.target)) setOpen(false, false);
    });
  }

  RS.ready(() => {
    initChat();
    initAnimations();
    initHeroSlider();
    initFeatureSlider();
    initScrollers();
    initSelects();
    initImageFallbacks();
    initPhrases();
    initEnglishLabels();
    initEnglishOnly();
    initTabs();
    initTocSpy();
    initUtilities();
    initCitation();
    initModals();
  });
})();
