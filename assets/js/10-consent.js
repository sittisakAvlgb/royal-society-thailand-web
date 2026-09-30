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

  function render() {
    const rows = optional.map(c => `
      <button class="switch-row" type="button" role="switch" aria-checked="false" data-consent-switch="${escapeHTML(c.key)}">
        <span class="switch-row__icon" aria-hidden="true">${icon(c.icon || 'sliders')}</span>
        <span class="switch-row__label">${te(c.label)}${c.hint ? `<small>${te(c.hint)}</small>` : ''}</span>
        <i aria-hidden="true"></i>
      </button>`).join('');

    const locked = categories.filter(c => c.required).map(c => `
      <p class="cookie-card__locked">
        ${icon(c.icon || 'verified')}
        <span><strong>${te(c.label)}</strong>${c.hint ? ` <small>${te(c.hint)}</small>` : ''}</span>
      </p>`).join('');

    /* Pages sit one folder deep, so the policy link is resolved from the root */
    const root = qs('[data-site-root]')?.getAttribute('data-site-root')
      || (location.pathname.includes('/pages/') ? '../' : '');

    /* A card in the corner, not a green wall across the page: the reader can
       carry on while it waits, and it keeps the site's cream-and-gold voice. */
    return `
      <section class="cookie-card" id="cookie-bar" role="region"
               aria-label="${te(ui.regionLabel)}" hidden>
        <span class="cookie-card__rule" aria-hidden="true"></span>
        <div class="cookie-card__body">
          <p class="cookie-card__head">
            <span class="cookie-card__mark" aria-hidden="true">${icon('verified')}</span>
            <span class="cookie-card__title">${te(conf.title)}</span>
          </p>
          <p class="cookie-card__intro">${te(conf.intro)}</p>
          <a class="cookie-card__policy" href="${escapeHTML(root + conf.policyHref)}">
            <span>${te(ui.policy)}</span>${icon('arrow')}
          </a>

          <div class="cookie-card__detail" data-consent-detail>
            <div class="cookie-card__detail-inner">
              ${locked}
              <div class="access-list">${rows}</div>
            </div>
          </div>

          <div class="cookie-card__actions">
            <button class="btn btn--primary btn--pill" type="button" data-consent="all">${te(ui.acceptAll)}</button>
            <button class="btn btn--secondary btn--pill" type="button" data-consent="necessary">${te(ui.essential)}</button>
            <button class="cookie-card__more" type="button" data-consent-customise
                    aria-expanded="false" aria-controls="cookie-bar-detail">
              <span>${te(ui.customise)}</span>${icon('chevron')}
            </button>
            <button class="btn btn--primary btn--pill" type="button" data-consent="chosen" hidden>${te(ui.save)}</button>
          </div>
        </div>
      </section>`;
  }

  let bar = null;

  /* The bar is only hidden once it has finished sliding out. Re-opening it
     mid-slide has to cancel that, or the pending handler hides it again. */
  let closing = null;

  function show() {
    if (closing) { bar.removeEventListener('transitionend', closing); closing = null; }
    bar.hidden = false;
    /* It slides in, so it is noticed without stealing focus from the page */
    requestAnimationFrame(() => bar.classList.add('is-open'));
  }

  function hide() {
    bar.classList.remove('is-open');
    const done = () => {
      bar.removeEventListener('transitionend', done);
      closing = null;
      if (!bar.classList.contains('is-open')) bar.hidden = true;
    };
    closing = done;
    if (RS.reduceMotion?.()) done(); else bar.addEventListener('transitionend', done);
  }

  function setSwitch(button, on) {
    button.setAttribute('aria-checked', String(on));
  }

  /* The panel opens by animating its own height (grid 0fr -> 1fr) instead of
     flipping display, so it grows rather than jumping. `visibility` is what
     keeps the collapsed switches out of the tab order. */
  function openDetail(open) {
    const trigger = qs('[data-consent-customise]', bar);
    bar.classList.toggle('is-expanded', open);
    qs('[data-consent="chosen"]', bar).hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  }

  function wire() {
    const current = get();
    qsa('[data-consent-switch]', bar).forEach(button => {
      setSwitch(button, current[button.dataset.consentSwitch] === true);
      button.addEventListener('click', () =>
        setSwitch(button, button.getAttribute('aria-checked') !== 'true'));
    });

    qs('[data-consent-customise]', bar).addEventListener('click', () =>
      openDetail(!bar.classList.contains('is-expanded')));

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
  }

  /** Re-open the bar from the footer link, with the saved answers filled in */
  function open() {
    const current = get();
    qsa('[data-consent-switch]', bar).forEach(button =>
      setSwitch(button, current[button.dataset.consentSwitch] === true));
    openDetail(true);
    show();
    qs('[data-consent-customise]', bar)?.focus();
  }

  window.RS.consent = { get, allows, open, forget };

  ready(() => {
    document.body.insertAdjacentHTML('beforeend', render());
    bar = qs('#cookie-bar');
    qs('[data-consent-detail]', bar).id = 'cookie-bar-detail';
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
