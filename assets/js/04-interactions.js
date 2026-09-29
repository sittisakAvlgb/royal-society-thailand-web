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

    const item = document.createElement('div');
    item.className = 'toast';
    item.innerHTML = `${icon('check')}<span>${escapeHTML(message)}</span>`;
    region.appendChild(item);
    setTimeout(() => item.remove(), 3200);
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

  function initImageFallbacks() {
    qsa('img[data-fallback]').forEach(img => {
      const swap = () => {
        if (img.dataset.fallbackUsed) return;
        img.dataset.fallbackUsed = 'true';
        img.src = img.dataset.fallback;
      };
      if (img.complete && !img.naturalWidth && img.currentSrc) swap();
      else img.addEventListener('error', swap, { once: true });
    });
  }

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

  RS.ready(() => {
    initAnimations();
    initHeroSlider();
    initFeatureSlider();
    initScrollers();
    initSelects();
    initImageFallbacks();
    initTabs();
    initTocSpy();
    initUtilities();
    initCitation();
    initModals();
  });
})();
