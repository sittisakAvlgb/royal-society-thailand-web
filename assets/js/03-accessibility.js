/* ============================================================================
 * 03-accessibility.js — Accessibility helper panel
 * ============================================================================
 *
 *  Accessibility comes primarily from the native implementation (semantic
 *  HTML, focus states, contrast, reduced-motion media query). This panel adds
 *  user preferences on top:
 *
 *    fontSize        small | normal | large | xlarge   -> html[data-font-size]
 *    contrast        high contrast                      -> body.access-contrast
 *    readable        easy-reading mode (spacing, width) -> body.access-readable
 *    underlineLinks  highlight links                    -> body.access-underline-links
 *    headings        highlight headings                 -> body.access-headings
 *    lineSpacing     extra line spacing                 -> body.access-line-spacing
 *    tts             read aloud (Web Speech API)        -> body.access-tts
 *    reduceMotion    reduce motion                      -> body.access-reduce-motion
 *    bigCursor       large cursor                       -> body.access-big-cursor
 *
 *  The panel is inserted into #app-a11y (rendered in the header by
 *  02-components.js). Pages without that slot get it appended to <body>.
 *  Changes preview live; "Save" persists them (localStorage
 *  'rs-accessibility-settings'), closing without saving reverts.
 *
 *  Add a setting: add it to defaultState + BODY_CLASS, then to a GROUP below.
 * ========================================================================== */

(() => {
  'use strict';

  const CFG = window.RS_CONFIG;
  const RS = window.RS;
  if (!CFG || !RS) return;

  const STORAGE_KEY = 'rs-accessibility-settings';
  const FONT_SIZES = ['small', 'normal', 'large', 'xlarge'];

  const defaultState = {
    fontSize: 'normal',
    contrast: false,
    readable: false,
    underlineLinks: false,
    headings: false,
    lineSpacing: false,
    tts: false,
    reduceMotion: false,
    bigCursor: false
  };

  const BODY_CLASS = {
    contrast: 'access-contrast',
    readable: 'access-readable',
    underlineLinks: 'access-underline-links',
    headings: 'access-headings',
    lineSpacing: 'access-line-spacing',
    tts: 'access-tts',
    reduceMotion: 'access-reduce-motion',
    bigCursor: 'access-big-cursor'
  };

  const L = {
    title: { th: 'ช่วยการเข้าถึง', en: 'Accessibility helper' },
    subtitle: { th: 'ปรับเว็บไซต์ให้เหมาะกับคุณ ใช้งานง่าย สบายตาขึ้น', en: 'Adjust the site to suit you — easier to use, easier on the eyes' },
    quick: { th: 'ทางลัดด่วน', en: 'Quick actions' },
    fontSize: { th: 'ขนาดตัวอักษร', en: 'Text size' },
    display: { th: 'การแสดงผล', en: 'Display' },
    reading: { th: 'ช่วยการอ่าน', en: 'Reading' },
    motion: { th: 'การเคลื่อนไหวและการโต้ตอบ', en: 'Motion and interaction' },
    sizes: { small: { th: 'เล็ก', en: 'Small' }, normal: { th: 'ปกติ', en: 'Default' }, large: { th: 'ใหญ่', en: 'Large' }, xlarge: { th: 'ใหญ่มาก', en: 'Larger' } },
    biggerText: { th: 'เพิ่มขนาดตัวอักษร', en: 'Bigger text' },
    contrast: { th: 'คอนทราสต์สูง', en: 'High contrast' },
    readable: { th: 'โหมดอ่านง่าย', en: 'Easy reading' },
    underlineLinks: { th: 'เน้นลิงก์', en: 'Highlight links' },
    headings: { th: 'เน้นหัวข้อ', en: 'Highlight headings' },
    lineSpacing: { th: 'เพิ่มระยะห่างบรรทัด', en: 'More line spacing' },
    tts: { th: 'อ่านออกเสียง', en: 'Read aloud' },
    ttsHint: { th: 'เปิดแล้วคลิกย่อหน้าหรือลากเลือกข้อความเพื่อฟัง', en: 'When on, click a paragraph or select text to listen' },
    ttsUnsupported: { th: 'เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง', en: 'This browser does not support read-aloud' },
    reduceMotion: { th: 'ลดการเคลื่อนไหว', en: 'Reduce motion' },
    bigCursor: { th: 'เคอร์เซอร์ใหญ่', en: 'Large cursor' },
    reset: { th: 'รีเซ็ต', en: 'Reset' },
    save: { th: 'บันทึกการตั้งค่า', en: 'Save settings' },
    saved: { th: 'บันทึกการตั้งค่าแล้ว', en: 'Settings saved' },
    resetDone: { th: 'คืนค่าเริ่มต้นแล้ว', en: 'Settings reset' },
    more: { th: 'เกี่ยวกับการเข้าถึง', en: 'About accessibility' },
    collapse: { th: 'ย่อ/ขยาย', en: 'Collapse/expand' }
  };

  const GROUPS = [
    { id: 'display', title: L.display, items: [
      { key: 'contrast', icon: 'eye', label: L.contrast },
      { key: 'readable', icon: 'book', label: L.readable },
      { key: 'underlineLinks', icon: 'external', label: L.underlineLinks },
      { key: 'headings', icon: 'text', label: L.headings },
      { key: 'lineSpacing', icon: 'spacing', label: L.lineSpacing }
    ] },
    { id: 'reading', title: L.reading, items: [
      { key: 'tts', icon: 'speaker', label: L.tts, hint: L.ttsHint }
    ] },
    { id: 'motion', title: L.motion, items: [
      { key: 'reduceMotion', icon: 'motion', label: L.reduceMotion },
      { key: 'bigCursor', icon: 'cursor', label: L.bigCursor }
    ] }
  ];

  const { qs, qsa, t, te, icon } = RS;

  /** camelCase -> kebab-case  (underlineLinks -> underline-links) */
  const toAttr = key => key.replace(/[A-Z]/g, c => '-' + c.toLowerCase());

  let state = loadState();
  let snapshot = { ...state };

  function loadState() {
    let stored = {};
    try {
      stored = JSON.parse(RS.storage.get(STORAGE_KEY, '{}')) || {};
    } catch { /* corrupted value — fall back to defaults */ }
    const next = { ...defaultState };
    Object.keys(defaultState).forEach(key => { if (key in stored) next[key] = stored[key]; });
    if (!FONT_SIZES.includes(next.fontSize)) next.fontSize = 'normal';
    return next;
  }

  const saveState = () => RS.storage.set(STORAGE_KEY, JSON.stringify(state));

  /* ==================================================================== *
   * Markup
   * ==================================================================== */

  function renderPanel() {
    const sizes = FONT_SIZES.map(size =>
      `<button type="button" data-font-size="${size}" aria-pressed="false">${te(L.sizes[size])}</button>`
    ).join('');

    const quick = [
      { attr: 'data-font-plus', icon: 'text-plus', label: L.biggerText },
      { attr: 'data-contrast', icon: 'eye', label: L.contrast, key: 'contrast' },
      { attr: 'data-reduce-motion', icon: 'motion', label: L.reduceMotion, key: 'reduceMotion' },
      { attr: 'data-readable', icon: 'book', label: L.readable, key: 'readable' }
    ].map(item => `
      <button class="access-quick" type="button" ${item.attr}${item.key ? ' aria-pressed="false"' : ''}>
        ${icon(item.icon)}<span>${te(item.label)}</span>
      </button>`).join('');

    const group = (id, title, body) => `
      <section class="access-group" aria-labelledby="access-${id}-title">
        <button class="access-group__head" type="button" data-access-group aria-expanded="true" aria-controls="access-${id}">
          <span id="access-${id}-title">${te(title)}</span>${icon('chevron')}
        </button>
        <div class="access-group__body" id="access-${id}">${body}</div>
      </section>`;

    const toggles = GROUPS.map(g => group(g.id, g.title, `
      <div class="access-list">${g.items.map(item => `
        <button class="switch-row" type="button" role="switch" aria-checked="false" data-${toAttr(item.key)}${item.hint ? ` title="${te(item.hint)}"` : ''}>
          <span class="switch-row__icon" aria-hidden="true">${icon(item.icon)}</span>
          <span class="switch-row__label">${te(item.label)}${item.hint ? `<small>${te(item.hint)}</small>` : ''}</span>
          <i aria-hidden="true"></i>
        </button>`).join('')}
      </div>`)).join('');

    return `
      <div class="access-panel" id="access-drawer" role="dialog" aria-modal="false" aria-labelledby="access-title" hidden>
        <div class="access-panel__head">
          <span class="access-panel__mark" aria-hidden="true">${icon('person')}</span>
          <div class="access-panel__heading">
            <h2 id="access-title">${te(L.title)}</h2>
            <p>${te(L.subtitle)}</p>
          </div>
          <button class="header-btn access-panel__close" type="button" data-access-close aria-label="${te(CFG.ui.close)}">${icon('x')}</button>
        </div>

        <div class="access-panel__body">
          <p class="access-panel__label">${te(L.quick)}</p>
          <div class="access-quicks">${quick}</div>

          ${group('size', L.fontSize, `<div class="segmented" role="group" aria-label="${te(L.fontSize)}">${sizes}</div>`)}
          ${toggles}
        </div>

        <div class="access-panel__foot">
          <button class="btn btn--secondary" type="button" data-access-reset>${icon('reset')}<span>${te(L.reset)}</span></button>
          <button class="btn btn--primary" type="button" data-access-save>${icon('check')}<span>${te(L.save)}</span></button>
          <a class="access-panel__more" href="${RS.url('pages/accessibility.html')}">${te(L.more)}</a>
        </div>
      </div>`;
  }

  /* ==================================================================== *
   * Apply state
   * ==================================================================== */

  function applyState() {
    document.documentElement.dataset.fontSize = state.fontSize;

    Object.entries(BODY_CLASS).forEach(([key, className]) => {
      document.body.classList.toggle(className, Boolean(state[key]));
    });

    qsa('[data-font-size]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.fontSize === state.fontSize));
    });

    Object.keys(BODY_CLASS).forEach(key => {
      qsa(`[data-${toAttr(key)}]`).forEach(button => {
        const attr = button.getAttribute('role') === 'switch' ? 'aria-checked' : 'aria-pressed';
        button.setAttribute(attr, String(Boolean(state[key])));
      });
    });

    if (!state.tts) stopSpeaking();
  }

  function stepFontSize(direction) {
    const index = FONT_SIZES.indexOf(state.fontSize) + direction;
    state.fontSize = FONT_SIZES[Math.max(0, Math.min(FONT_SIZES.length - 1, index))];
    applyState();
  }

  /* ==================================================================== *
   * Read aloud (Web Speech API)
   * ==================================================================== */

  const synth = window.speechSynthesis;

  function stopSpeaking() {
    if (synth?.speaking) synth.cancel();
    qsa('.is-speaking').forEach(el => el.classList.remove('is-speaking'));
  }

  function speak(text, element) {
    if (!synth || !text.trim()) return;
    stopSpeaking();
    const utter = new SpeechSynthesisUtterance(text.trim());
    utter.lang = RS.lang === 'en' ? 'en-GB' : 'th-TH';
    const voice = synth.getVoices().find(v => v.lang.toLowerCase().startsWith(utter.lang.toLowerCase().slice(0, 2)));
    if (voice) utter.voice = voice;
    utter.rate = 1;
    element?.classList.add('is-speaking');
    utter.onend = utter.onerror = () => element?.classList.remove('is-speaking');
    synth.speak(utter);
  }

  function initReadAloud() {
    document.addEventListener('mouseup', event => {
      if (!state.tts) return;
      if (event.target.closest('#access-drawer, button, a, input, select, textarea')) return;
      const selection = window.getSelection()?.toString();
      if (selection && selection.trim().length > 1) { speak(selection); return; }
      const block = event.target.closest('p, h1, h2, h3, h4, li, blockquote, figcaption, dd, dt, td, th');
      if (block) speak(block.innerText, block);
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') stopSpeaking(); });
  }

  /* ==================================================================== *
   * Panel (non-modal disclosure)
   * ==================================================================== */

  function initPanel() {
    const panel = qs('#access-drawer');
    if (!panel) return;

    const openButtons = qsa('[data-access-open]');
    let opener = null;

    function open(button) {
      opener = button;
      snapshot = { ...state };
      panel.hidden = false;
      openButtons.forEach(item => item.setAttribute('aria-expanded', 'true'));
      qs('.access-panel__close', panel)?.focus();
      document.addEventListener('keydown', onKeydown);
      document.addEventListener('pointerdown', onPointerDown);
    }

    function close({ restoreFocus = true, keep = false } = {}) {
      if (panel.hidden) return;
      if (!keep) { state = { ...snapshot }; applyState(); }   /* closing without saving reverts the preview */
      panel.hidden = true;
      openButtons.forEach(item => item.setAttribute('aria-expanded', 'false'));
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('pointerdown', onPointerDown);

      if (!restoreFocus) return;
      const target = opener?.offsetParent ? opener : qs('.access-fab');
      (target?.offsetParent ? target : qs('[data-mobile-open]'))?.focus();
    }

    function onKeydown(event) { if (event.key === 'Escape') close(); }

    function onPointerDown(event) {
      if (!panel.contains(event.target) && !event.target.closest('[data-access-open]')) close({ restoreFocus: false });
    }

    openButtons.forEach(button => button.addEventListener('click', () => { panel.hidden ? open(button) : close(); }));
    qsa('[data-access-close]', panel).forEach(button => button.addEventListener('click', () => close()));

    panel.addEventListener('click', event => {
      if (event.target.closest('[data-access-save]')) {
        saveState();
        snapshot = { ...state };
        RS.toast?.(t(L.saved));
        close({ keep: true });
        return;
      }
      const head = event.target.closest('[data-access-group]');
      if (head) {
        const expanded = head.getAttribute('aria-expanded') === 'true';
        head.setAttribute('aria-expanded', String(!expanded));
        const body = document.getElementById(head.getAttribute('aria-controls'));
        if (body) body.hidden = expanded;
      }
    });
  }

  /* ==================================================================== *
   * Controls — delegated so buttons anywhere on the page work
   * (e.g. the settings on pages/accessibility.html)
   * ==================================================================== */

  function initControls() {
    document.addEventListener('click', event => {
      const target = event.target.closest('button');
      if (!target) return;
      const data = target.dataset;
      const inPanel = Boolean(target.closest('#access-drawer'));
      const persist = () => { if (!inPanel) { saveState(); snapshot = { ...state }; } };

      if (data.fontSize !== undefined) { state.fontSize = data.fontSize; applyState(); persist(); return; }
      if (data.fontPlus !== undefined) { stepFontSize(1); persist(); return; }
      if (data.fontMinus !== undefined) { stepFontSize(-1); persist(); return; }
      if (data.fontReset !== undefined) { state.fontSize = 'normal'; applyState(); persist(); return; }

      if (data.accessReset !== undefined) {
        state = { ...defaultState };
        applyState();
        saveState();
        snapshot = { ...state };
        RS.toast?.(t(L.resetDone));
        return;
      }

      const key = Object.keys(BODY_CLASS).find(name => data[name] !== undefined);
      if (key) {
        if (key === 'tts' && !synth) { RS.toast?.(t(L.ttsUnsupported)); return; }
        state[key] = !state[key];
        applyState();
        persist();
      }
    });
  }

  /** Initialises the accessibility panel and restores saved preferences. */
  function initAccessibility() {
    const slot = document.getElementById('app-a11y');
    (slot || document.body).insertAdjacentHTML('beforeend', renderPanel());

    initPanel();
    initControls();
    initReadAloud();
    applyState();
  }

  RS.ready(initAccessibility);

  window.RSAccessibility = { getState: () => ({ ...state }) };
})();
