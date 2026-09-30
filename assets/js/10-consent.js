/* ============================================================================
 * 10-consent.js — Cookie consent (RS_CONFIG.cookies)
 * ============================================================================
 *  PDPA (พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. ๒๕๖๒) asks for a choice before a
 *  website keeps anything that is not needed to run it. This site sets no
 *  tracking cookies at all; what it keeps is localStorage — language, display
 *  settings, recent searches, saved Fellows, event reminders — so the bar
 *  offers the two categories that really exist and nothing else.
 *
 *  The choice is the whole point, so it is enforced, not just recorded:
 *
 *    RS.consent.allows('preferences')   asked by the features that store
 *    RS.consent.get()                   { necessary: true, preferences: … }
 *    RS.consent.open()                  re-opens the bar (footer link)
 *    'rs:consent-change' on document    fired after every save
 *
 *  Declining a category clears every key listed for it in the config, so a
 *  visitor who changes their mind is not left with data they refused.
 * ========================================================================== */

(() => {
  const { qs, qsa, escapeHTML, t, te, icon, ready } = window.RS;
  const CFG = window.RS_CONFIG;
  const KEY = 'rs-cookie-consent';

  const conf = CFG?.cookies;
  if (!conf?.enabled) return;

  const categories = conf.categories || [];
  const optional = categories.filter(c => !c.required);

  /* ==================================================================== *
   * Stored choice
   * ==================================================================== */

  /** The saved record, or null when the visitor has not chosen yet */
  function stored() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const value = JSON.parse(raw);
      /* A new version of the categories means the old answer no longer covers
         what is being asked, so the bar comes back. */
      return value?.version === conf.version ? value : null;
    } catch {
      return null;
    }
  }

  /** What the site may keep right now. Necessary is always true. */
  function get() {
    const saved = stored();
    const state = { necessary: true };
    optional.forEach(c => { state[c.key] = Boolean(saved?.choices?.[c.key]); });
    return state;
  }

  const allows = key => (key === 'necessary' ? true : get()[key] === true);

  /** Remove everything a declined category is responsible for */
  function forget(categoryKey) {
    const category = categories.find(c => c.key === categoryKey);
    if (!category || category.required) return;
    (category.keys || []).forEach(key => {
      try { localStorage.removeItem(key); } catch { /* private mode */ }
      try { sessionStorage.removeItem(key); } catch { /* private mode */ }
    });
  }

  function save(choices) {
    const record = { version: conf.version, at: new Date().toISOString(), choices };
    try { localStorage.setItem(KEY, JSON.stringify(record)); } catch { /* private mode */ }
    Object.entries(choices).forEach(([key, on]) => { if (!on) forget(key); });
    document.dispatchEvent(new CustomEvent('rs:consent-change', { detail: get() }));
  }

  /* ==================================================================== *
   * The bar
   * ==================================================================== */

  const ui = conf.ui || {};

  /* ==================================================================== *
   * The notice
   * ----------------------------------------------------------------------
   *  A native <dialog>, centred: the choice is worth stopping for, and the
   *  browser gives the focus trap and the backdrop for free. It is written as
   *  a notice from the Office rather than a consent widget — the two
   *  categories are set like a printed table of contents, Thai numeral, dotted
   *  leader, state on the right, the same treatment the knowledge lists use.
   * ==================================================================== */

  const stateLabel = (category, on) =>
    te(category.required ? ui.always : (on ? ui.on : ui.off));

  function render() {
    /* Pages sit one folder deep, so the policy link is resolved from the root */
    const root = location.pathname.includes('/pages/') ? '../' : '';

    const rows = categories.map((c, index) => {
      const line = `
        <span class="consent__line">
          <span class="consent__name">${te(c.label)}</span>
          <span class="consent__leader" aria-hidden="true"></span>
          <span class="consent__state" data-consent-state>${stateLabel(c, false)}</span>
        </span>
        <span class="consent__hint">${te(c.hint)}</span>`;

      /* A required category is a statement; an optional one is the control */
      const body = c.required
        ? `<span class="consent__item">${line}</span>`
        : `<button class="consent__item consent__item--choice" type="button" role="switch"
                   aria-checked="false" data-consent-switch="${escapeHTML(c.key)}">${line}</button>`;

      return `
        <li class="consent__row">
          <span class="consent__num" aria-hidden="true">${index + 1}</span>
          ${body}
        </li>`;
    }).join('');

    return `
      <dialog class="consent" id="cookie-bar" aria-labelledby="consent-title">
        <div class="consent__sheet">
          <p class="consent__eyebrow">${te(ui.regionLabel)}</p>
          <h2 class="consent__title" id="consent-title">${te(conf.title)}</h2>
          <p class="consent__intro">${te(conf.intro)}</p>

          <ol class="consent__list" role="list">${rows}</ol>

          <a class="consent__policy" href="${escapeHTML(root + conf.policyHref)}">
            <span>${te(ui.policy)}</span>${icon('arrow')}
          </a>

          <div class="consent__actions">
            <button class="btn btn--primary" type="button" data-consent="all">${te(ui.acceptAll)}</button>
            <button class="btn btn--secondary" type="button" data-consent="necessary">${te(ui.essential)}</button>
            <button class="btn btn--primary" type="button" data-consent="chosen" hidden>${te(ui.save)}</button>
          </div>
        </div>
      </dialog>`;
  }

  let bar = null;

  function show() {
    clearTimeout(closing);
    if (bar.open) { bar.classList.add('is-open'); return; }
    bar.showModal();
    /* Flush the closed state so the rise has something to animate from.
       A reflow rather than requestAnimationFrame, which never runs while the
       tab is in the background — the notice would then open invisible. */
    void bar.offsetWidth;
    bar.classList.add('is-open');
  }

  /* Close once it has faded. A timer rather than transitionend: the event can
     be missed (an interrupted transition, a stylesheet swapped underneath) and
     a notice that will not close is worse than one that closes a beat early. */
  let closing = 0;

  function hide() {
    bar.classList.remove('is-open');
    clearTimeout(closing);
    const done = () => {
      if (!bar.classList.contains('is-open') && bar.open) bar.close();
    };
    if (RS.reduceMotion?.()) done(); else closing = setTimeout(done, 300);
  }

  /** Reflect a category's state in both the switch and the word beside it */
  function setSwitch(button, on) {
    const category = categories.find(c => c.key === button.dataset.consentSwitch);
    button.setAttribute('aria-checked', String(on));
    const state = qs('[data-consent-state]', button);
    if (state && category) state.textContent = t(on ? ui.on : ui.off);
  }

  /** The save button only matters once a choice has been touched */
  function offerSave(show = true) {
    qs('[data-consent="chosen"]', bar).hidden = !show;
  }

  function wire() {
    /* The locked categories read "always on" from the start */
    categories.filter(c => c.required).forEach(c => {
      const row = qsa('.consent__row', bar)[categories.indexOf(c)];
      qs('[data-consent-state]', row).textContent = t(ui.always);
    });

    const current = get();
    qsa('[data-consent-switch]', bar).forEach(button => {
      setSwitch(button, current[button.dataset.consentSwitch] === true);
      button.addEventListener('click', () => {
        setSwitch(button, button.getAttribute('aria-checked') !== 'true');
        offerSave();
      });
    });

    qsa('[data-consent]', bar).forEach(button => {
      button.addEventListener('click', () => {
        const mode = button.dataset.consent;
        const choices = {};
        optional.forEach(c => {
          choices[c.key] = mode === 'all' ? true
            : mode === 'necessary' ? false
            : qs(`[data-consent-switch="${c.key}"]`, bar)?.getAttribute('aria-checked') === 'true';
        });
        save(choices);
        hide();
        RS.toast?.(t(ui.saved));
      });
    });

    /* Esc would be an answer nobody gave, so the notice stays until one is */
    bar.addEventListener('cancel', event => event.preventDefault());
  }

  /** Re-open from the footer, showing what was chosen last time */
  function open() {
    const current = get();
    qsa('[data-consent-switch]', bar).forEach(button =>
      setSwitch(button, current[button.dataset.consentSwitch] === true));
    offerSave(Boolean(stored()));
    show();
  }

  window.RS.consent = { get, allows, open, forget };

  ready(() => {
    document.body.insertAdjacentHTML('beforeend', render());
    bar = qs('#cookie-bar');
    wire();

    if (!stored()) show();

    document.addEventListener('click', event => {
      const trigger = event.target.closest('[data-cookie-settings]');
      if (!trigger) return;
      event.preventDefault();
      open();
    });
  });
})();
