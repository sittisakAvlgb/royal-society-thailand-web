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
   *  A centred card: one row per category, each with its own switch and a
   *  chevron that opens the list of keys it actually covers — the same keys
   *  the table on pages/policies.html#privacy-policy documents, so the two
   *  cannot drift.
   *
   *  Everything moves: the card springs in, the rows arrive a beat apart, the
   *  switch knob overshoots, the detail grows on grid-template-rows and the
   *  biscuit turns slowly in the corner. All of it stops dead under
   *  prefers-reduced-motion.
   * ==================================================================== */

  /* Decorative, and marked so: the crumbs are drawn, not an emoji */
  const BISCUIT = `
    <svg class="cc-biscuit" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path class="cc-biscuit__body" d="M60 6a54 54 0 1 0 54 54 30 30 0 0 1-30-24 30 30 0 0 1-24-30Z"/>
      <circle class="cc-biscuit__chip" cx="44" cy="46" r="7"/>
      <circle class="cc-biscuit__chip" cx="72" cy="72" r="6"/>
      <circle class="cc-biscuit__chip" cx="42" cy="78" r="5"/>
      <circle class="cc-biscuit__chip" cx="66" cy="40" r="4"/>
      <circle class="cc-biscuit__chip" cx="88" cy="56" r="4"/>
    </svg>`;

  function render() {
    /* Pages sit one folder deep, so the policy link is resolved from the root */
    const root = location.pathname.includes('/pages/') ? '../' : '';

    const rows = categories.map(c => {
      const id = `cc-detail-${escapeHTML(c.key)}`;
      const keys = (c.keys || []).map(k => `<li><code lang="en">${escapeHTML(k)}</code></li>`).join('');

      const control = c.required
        ? `<span class="cc-row__always">${te(ui.always)}</span>`
        : `<button class="cc-switch" type="button" role="switch" aria-checked="false"
                   data-consent-switch="${escapeHTML(c.key)}">
             <span class="cc-switch__knob" aria-hidden="true"></span>
             <span class="visually-hidden">${te(c.label)}</span>
           </button>`;

      return `
        <li class="cc-row" data-consent-row>
          <div class="cc-row__main">
            <span class="cc-row__icon" aria-hidden="true">${icon(c.icon || 'sliders')}</span>
            <div class="cc-row__text">
              <p class="cc-row__name">${te(c.label)}</p>
              <p class="cc-row__hint">${te(c.hint)}</p>
            </div>
            <div class="cc-row__controls">
              ${control}
              <button class="cc-row__expand" type="button" aria-expanded="false" aria-controls="${id}"
                      aria-label="${te(ui.showKeys)}">${icon('chevron')}</button>
            </div>
          </div>
          <div class="cc-row__detail" id="${id}">
            <div class="cc-row__detail-inner">
              <p class="cc-row__detail-title">${te(ui.stored)}</p>
              <ul class="cc-keys" role="list">${keys}</ul>
            </div>
          </div>
        </li>`;
    }).join('');

    return `
      <dialog class="cc" id="cookie-bar" aria-labelledby="cc-title">
        <div class="cc__sheet">
          ${BISCUIT}
          <p class="cc__eyebrow">${icon('info')}<span>${te(ui.regionLabel)}</span></p>
          <h2 class="cc__title" id="cc-title">${te(conf.title)}</h2>
          <p class="cc__intro">${te(conf.intro)}</p>
          <a class="cc__policy" href="${escapeHTML(root + conf.policyHref)}">
            <span>${te(ui.policy)}</span>${icon('arrow')}
          </a>

          <ul class="cc__rows" role="list">${rows}</ul>

          <div class="cc__actions">
            <button class="btn btn--primary cc__btn" type="button" data-consent="all">
              <span>${te(ui.acceptAll)}</span>${icon('arrow')}
            </button>
            <button class="btn btn--secondary cc__btn" type="button" data-consent="necessary">
              <span>${te(ui.essential)}</span>
            </button>
            <button class="btn btn--primary cc__btn" type="button" data-consent="chosen" hidden>
              <span>${te(ui.save)}</span>${icon('arrow')}
            </button>
          </div>
        </div>
      </dialog>`;
  }

  let bar = null;
  let closing = 0;

  function show() {
    clearTimeout(closing);
    if (bar.open) { bar.classList.add('is-open'); return; }
    bar.showModal();
    /* Flush the closed state so the spring has something to move from. A
       reflow, not requestAnimationFrame, which never runs in a background tab
       and would leave the notice open but invisible. */
    void bar.offsetWidth;
    bar.classList.add('is-open');
  }

  /* A timer rather than transitionend, which an interrupted transition can
     swallow — a notice that will not close is worse than one that closes early */
  function hide() {
    bar.classList.remove('is-open');
    clearTimeout(closing);
    const done = () => { if (!bar.classList.contains('is-open') && bar.open) bar.close(); };
    if (RS.reduceMotion?.()) done(); else closing = setTimeout(done, 280);
  }

  function setSwitch(button, on) {
    button.setAttribute('aria-checked', String(on));
  }

  /** The save button only matters once a switch has been touched */
  function offerSave(visible = true) {
    qs('[data-consent="chosen"]', bar).hidden = !visible;
  }

  function wire() {
    const current = get();

    qsa('[data-consent-switch]', bar).forEach(button => {
      setSwitch(button, current[button.dataset.consentSwitch] === true);
      button.addEventListener('click', () => {
        setSwitch(button, button.getAttribute('aria-checked') !== 'true');
        offerSave();
      });
    });

    qsa('.cc-row__expand', bar).forEach(button => {
      button.addEventListener('click', () => {
        const row = button.closest('.cc-row');
        const open = !row.classList.contains('is-expanded');
        row.classList.toggle('is-expanded', open);
        button.setAttribute('aria-expanded', String(open));
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
