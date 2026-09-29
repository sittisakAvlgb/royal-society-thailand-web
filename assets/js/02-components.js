/* ============================================================================
 * 02-components.js — Header / Footer / Mega menu / Mobile menu
 * ============================================================================
 *
 *  Every page shares one header and footer. A page only needs:
 *
 *      <div id="app-header"></div>     <- skip link, utility bar, header, menus
 *      <div id="app-footer"></div>     <- footer
 *
 *  Content comes from window.RS_CONFIG (01-config.js); the menu supports
 *  three levels (see the `nav` schema there).
 *  Styles live in assets/css/layout.css and components.css.
 *  Requires 00-core.js and 01-config.js.
 * ========================================================================== */

(() => {
  'use strict';

  const CFG = window.RS_CONFIG;
  const RS = window.RS;

  if (!CFG || !RS) {
    console.error('[RS] 02-components.js requires 00-core.js and 01-config.js to load first.');
    return;
  }

  const { t, te, url, icon, escapeHTML } = RS;
  const ui = CFG.ui;

  /* -------------------------------------------------------------------- *
   * Icon sprite — use with RS.icon('name')
   * Add an icon: add <symbol id="i-name" viewBox="0 0 24 24">…</symbol>
   * -------------------------------------------------------------------- */
  const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const iconSprite = `
    <svg class="icon-sprite" aria-hidden="true" focusable="false">
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" ${S}/><path d="m16 16 4.5 4.5" ${S}/></symbol>
      <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m7 9.5 5 5 5-5" ${S}/></symbol>
      <symbol id="i-pause" viewBox="0 0 24 24"><path d="M9 6.5v11M15 6.5v11" ${S}/></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8.5 5.8v12.4L18.5 12 8.5 5.8Z" ${S}/></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" ${S}/></symbol>
      <symbol id="i-external" viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" ${S}/></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" ${S}/></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" ${S}/></symbol>
      <symbol id="i-access" viewBox="0 0 24 24"><path d="M4 18 8.5 6h1L14 18M5.6 14h6.8" ${S}/><path d="M16 18l2.6-7h.8L22 18M16.8 16h4.4" ${S}/></symbol>
      <symbol id="i-person" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" ${S}/><path d="M5 9.5c4.5 1 9.5 1 14 0M12 10.5v4l-3 6M12 14.5l3 6" ${S}/></symbol>
      <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" ${S}/><circle cx="12" cy="12" r="3" ${S}/></symbol>
      <symbol id="i-text-plus" viewBox="0 0 24 24"><path d="M3 18 8 6h1l5 12M4.8 14h7.4M17 8v6M14 11h6" ${S}/></symbol>
      <symbol id="i-text" viewBox="0 0 24 24"><path d="M5 6h14M12 6v13M9 19h6" ${S}/></symbol>
      <symbol id="i-spacing" viewBox="0 0 24 24"><path d="M4 8 8.5 4 13 8M4 16l4.5 4L13 16M8.5 4v16M16 8h5M16 12h5M16 16h5" ${S}/></symbol>
      <symbol id="i-speaker" viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" ${S}/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" ${S}/></symbol>
      <symbol id="i-motion" viewBox="0 0 24 24"><path d="M4 12h9M4 7h5M4 17h5" ${S}/><circle cx="17" cy="12" r="3.5" ${S}/></symbol>
      <symbol id="i-cursor" viewBox="0 0 24 24"><path d="M6 4.5 18 11l-5.5 1.5L10 18 6 4.5Z" ${S}/></symbol>
      <symbol id="i-reset" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" ${S}/></symbol>
      <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15l1.5-2ZM10 20.5a2 2 0 0 0 4 0" ${S}/></symbol>
      <symbol id="i-stetho" viewBox="0 0 24 24"><path d="M6 4v5a4 4 0 0 0 8 0V4M10 13v3a4 4 0 0 0 8 0v-2" ${S}/><circle cx="18" cy="11.5" r="2" ${S}/></symbol>
      <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" ${S}/><path d="M5 19c3-4 6-7 10-10" ${S}/></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 19h16M6 16V9M11 16V5M16 16v-6" ${S}/></symbol>
      <symbol id="i-flask" viewBox="0 0 24 24"><path d="M9.5 3.5h5M10 3.5v6L4.8 18a1.5 1.5 0 0 0 1.3 2.2h11.8a1.5 1.5 0 0 0 1.3-2.2L14 9.5v-6M7.5 15h9" ${S}/></symbol>
      <symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 12h3M11 12h9M4 17h12M20 17h0" ${S}/><circle cx="16" cy="7" r="2" ${S}/><circle cx="9" cy="12" r="2" ${S}/><circle cx="18" cy="17" r="2" ${S}/></symbol>
      <symbol id="i-bookmark" viewBox="0 0 24 24"><path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-4-6 4V5.5a1 1 0 0 1 1-1Z" ${S}/></symbol>
      <symbol id="i-institution" viewBox="0 0 24 24"><path d="m3.5 9 8.5-5 8.5 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3.5 18h17M3.5 20.5h17" ${S}/></symbol>
      <symbol id="i-scale" viewBox="0 0 24 24"><path d="M12 4v16M6 20h12M4.5 8h15" ${S}/><path d="M6.5 8 4 14a2.5 2.5 0 0 0 5 0L6.5 8ZM17.5 8 15 14a2.5 2.5 0 0 0 5 0L17.5 8Z" ${S}/></symbol>
      <symbol id="i-atom" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.6" ${S}/><ellipse cx="12" cy="12" rx="9" ry="3.6" ${S}/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" ${S}/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(-60 12 12)" ${S}/></symbol>
      <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.7 1.8-1.5 0-.9-.6-1.2-.6-2 0-.9.8-1.5 1.7-1.5H16a4.5 4.5 0 0 0 4.5-4.5C20.5 7 16.7 3.5 12 3.5Z" ${S}/><circle cx="8" cy="11" r="1.1" ${S}/><circle cx="10.5" cy="7.5" r="1.1" ${S}/><circle cx="15" cy="7.5" r="1.1" ${S}/></symbol>
      <symbol id="i-grad" viewBox="0 0 24 24"><path d="m2.5 9 9.5-4 9.5 4-9.5 4-9.5-4Z" ${S}/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5" ${S}/></symbol>
      <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5v-13ZM12 6v13.5" ${S}/></symbol>
      <symbol id="i-term" viewBox="0 0 24 24"><path d="M4 6h9M8.5 6v12M15 10h5M17.5 10v8" ${S}/></symbol>
      <symbol id="i-translit" viewBox="0 0 24 24"><path d="M3 7h8M7 5v2c0 4-2 7-4 8M5 11c1 2 3 4 5 4" ${S}/><path d="m13 19 3.5-9h1L21 19M14.2 16h5.6" ${S}/></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" ${S}/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z" ${S}/></symbol>
      <symbol id="i-archive" viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="4" rx="1" ${S}/><path d="M5 8.5v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-10M10 12.5h4" ${S}/></symbol>
      <symbol id="i-ebook" viewBox="0 0 24 24"><rect x="5.5" y="3" width="13" height="18" rx="1.5" ${S}/><path d="M9 7h6M9 10.5h6M9 14h3.5" ${S}/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" ${S}/></symbol>
      <symbol id="i-people" viewBox="0 0 24 24"><circle cx="9" cy="8.5" r="3" ${S}/><path d="M3.5 19c.4-3 2.6-5 5.5-5s5.1 2 5.5 5M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.3c1.7.6 2.8 2.2 3 4.7" ${S}/></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" ${S}/><path d="m4 7 8 6 8-6" ${S}/></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 4h3l1.5 4-2 1.3a9.5 9.5 0 0 0 5.7 5.7L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" ${S}/></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" ${S}/><circle cx="12" cy="10" r="2.3" ${S}/></symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="1.5" ${S}/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" ${S}/></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" ${S}/><path d="M12 7.5V12l3 2" ${S}/></symbol>
      <symbol id="i-print" viewBox="0 0 24 24"><path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" ${S}/><rect x="7" y="14" width="10" height="6" ${S}/></symbol>
      <symbol id="i-share" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5" ${S}/><circle cx="17.5" cy="6" r="2.5" ${S}/><circle cx="17.5" cy="18" r="2.5" ${S}/><path d="m8.3 10.8 7-3.6M8.3 13.2l7 3.6" ${S}/></symbol>
      <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8.5" y="8.5" width="11" height="11" rx="1.5" ${S}/><path d="M15.5 8.5V5.5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3" ${S}/></symbol>
      <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" ${S}/></symbol>
      <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" ${S}/><path d="M12 11v5M12 8h.01" ${S}/></symbol>
      <symbol id="i-verified" viewBox="0 0 24 24"><path d="M12 3.5 19 6v5.5c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6l7-2.5Z" ${S}/><path d="m8.8 12 2.2 2.2 4.2-4.4" ${S}/></symbol>
      <symbol id="i-history" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4.5v3.8h3.8" ${S}/><path d="M12 8v4l2.5 1.8" ${S}/></symbol>
      <symbol id="i-trending" viewBox="0 0 24 24"><path d="m4 16 5-5 3.5 3.5L20 7M15 7h5v5" ${S}/></symbol>
      <symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" ${S}/></symbol>
      <symbol id="i-doc" viewBox="0 0 24 24"><path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" ${S}/><path d="M14 3.5v4h4M9 12h6M9 15.5h6" ${S}/></symbol>
    </svg>`;

  /* ==================================================================== *
   * Helpers
   * ==================================================================== */

  /** File name of the current page, e.g. "fellows.html" */
  const currentFile = () => location.pathname.split('/').pop().toLowerCase() || 'index.html';

  /** Which nav item is current — matched by file name via nav[].match */
  function detectActive() {
    const file = currentFile();
    const match = CFG.nav.find(item => item.match?.includes(file));
    return match ? match.key : '';
  }

  /** The organisation name in the language that is NOT currently shown */
  const otherLang = () => (RS.lang === 'th' ? 'en' : 'th');

  /** <a> for a config link, with external-link indication */
  function link(item, className = '') {
    const href = item.href.replace('{webmaster}', CFG.contact.webmaster);
    const external = item.external || RS.isExternal(href);
    const attrs = external ? ' target="_blank" rel="noopener"' : '';
    const cls = className ? ` class="${className}"` : '';
    const extra = external
      ? `${icon('external')}<span class="visually-hidden"> ${te(ui.external)}</span>`
      : '';
    return `<a${cls} href="${escapeHTML(url(href))}"${attrs}><span>${te(item.label)}</span>${extra}</a>`;
  }

  function logo(className, width, height) {
    return `<img class="${className}" src="${RS.base}${CFG.site.logo}" alt="${te(CFG.site.logoAlt)}" width="${width}" height="${height}" decoding="async">`;
  }

  /** Language switcher links preserve path, query, filters and hash */
  function langHref(target) {
    const next = new URL(location.href);
    if (target === 'en') next.searchParams.set('lang', 'en');
    else next.searchParams.delete('lang');
    return next.href;
  }

  function renderLangSwitch() {
    return `
      <div class="lang-switch" role="group" aria-label="${te(ui.language)}">
        ${RS.langs.map(code => `
          <a href="${escapeHTML(langHref(code))}" data-lang-switch="${code}" lang="${code}" hreflang="${code}"
             ${code === RS.lang ? 'aria-current="true"' : ''}>
            <span aria-hidden="true">${code.toUpperCase()}</span>
            <span class="visually-hidden">${code === 'th' ? 'ภาษาไทย' : 'English'}</span>
          </a>`).join('')}
      </div>`;
  }

  /* ==================================================================== *
   * Header
   * ==================================================================== */

  /** Thin top bar: prototype note, organisation links, accessibility and language */
  function renderUtilityBar() {
    const note = CFG.site.prototype ? `
          <p class="utility-bar__note">
            ${icon('info')}<span aria-hidden="true">${te(CFG.site.prototypeShort)}</span>
            <span class="visually-hidden">${te(CFG.site.prototypeNote)}</span>
          </p>` : '';
    const links = CFG.utilityLinks.map(item => `<li>${link(item)}</li>`).join('');

    return `
      <div class="utility-bar">
        <div class="container utility-bar__inner">
          ${note}
          <nav class="utility-bar__links" aria-label="${te(ui.utility)}"><ul role="list">${links}</ul></nav>
          <div class="utility-bar__tools">
            <div class="access-wrap" id="app-a11y"></div>
            ${renderLangSwitch()}
          </div>
        </div>
      </div>`;
  }

  /**
   * Mega panel for a nav item with children.
   * Level-2 items that have children become columns (heading + level-3 links);
   * level-2 items without children share one column.
   */
  function renderMega(key) {
    const item = CFG.nav.find(entry => entry.key === key);
    if (!item?.children?.length) return '';

    const branches = item.children.filter(child => child.children?.length);
    const leaves = item.children.filter(child => !child.children?.length);
    /* Top-level items kept out of the bar (bar: false) can ride along as a column */
    const guests = (item.alsoShow || []).map(key => CFG.nav.find(entry => entry.key === key)).filter(Boolean);

    const columns = [...branches, ...guests].map(child => `
      <div class="mega-group">
        <p class="mega-group__title">${link(child)}</p>
        <ul role="list">${child.children.map(sub => `<li>${link(sub)}</li>`).join('')}</ul>
      </div>`).join('');

    const leafColumn = leaves.length ? `
      <div class="mega-group mega-group--leaves${leaves.length > 5 ? ' mega-group--wide' : ''}">
        <ul role="list">${leaves.map(child => `<li>${link(child, 'mega-group__lead')}</li>`).join('')}</ul>
      </div>` : '';

    return `
      <div class="mega-inner">
        <div class="mega-feature">
          <p class="mega-feature__title">${te(item.label)}</p>
          ${item.intro ? `<p class="mega-feature__desc">${te(item.intro)}</p>` : ''}
          <a class="link-arrow" href="${escapeHTML(url(item.href))}"${detectActive() === key ? ' aria-current="page"' : ''}>
            <span>${te(ui.viewSection)}</span>${icon('arrow')}
          </a>
        </div>
        <div class="mega-groups">${columns}${leafColumn}</div>
      </div>`;
  }

  function renderNav(active) {
    return CFG.nav.filter(item => item.bar !== false).map(item => {
      const isActive = item.key === active;

      if (!item.children?.length) {
        return `<li class="nav-item">
          <a class="nav-link${isActive ? ' is-current' : ''}" href="${escapeHTML(url(item.href))}"${isActive ? ' aria-current="page"' : ''}>${te(item.short || item.label)}</a>
        </li>`;
      }

      return `<li class="nav-item">
        <button class="nav-link${isActive ? ' is-current' : ''}" type="button" data-mega="${item.key}"
                aria-expanded="false" aria-controls="mega-${item.key}">
          <span>${te(item.short || item.label)}</span>${icon('chevron')}
        </button>
        <div class="mega-menu" id="mega-${item.key}" hidden>${renderMega(item.key)}</div>
      </li>`;
    }).join('');
  }

  function renderMobilePanel(active) {
    const items = CFG.nav.map(item => {
      const href = escapeHTML(url(item.href));
      const current = item.key === active ? ' aria-current="page"' : '';

      if (!item.children?.length) {
        return `<a class="rs-mobile-direct" href="${href}"${current}>${te(item.label)}${icon('arrow')}</a>`;
      }

      const links = item.children.map(child => `
        ${link(child, 'rs-mobile-sub')}
        ${(child.children || []).map(sub => link(sub, 'rs-mobile-subsub')).join('')}`).join('');

      return `
        <details${item.key === active ? ' open' : ''}>
          <summary>${te(item.label)}${icon('chevron')}</summary>
          <div class="rs-mobile-links">
            <a class="rs-mobile-landing" href="${href}"${current}>${te(ui.viewSection)}</a>
            ${links}
          </div>
        </details>`;
    }).join('');

    return `
      <div class="rs-mobile-panel" id="rs-mobile-panel" hidden>
        <div class="rs-mobile-drawer" role="dialog" aria-modal="true" aria-labelledby="rs-mobile-title">
          <div class="rs-mobile-head">
            <p id="rs-mobile-title" class="rs-mobile-title">${te(ui.mainMenu)}</p>
            <button class="header-btn" type="button" data-mobile-close aria-label="${te(ui.closeMenu)}">${icon('x')}</button>
          </div>
          <nav class="rs-mobile-acc" aria-label="${te(ui.mainMenu)}">${items}</nav>
          <div class="rs-mobile-foot">
            <button class="btn btn--secondary btn--block" type="button" data-access-open aria-controls="access-drawer" aria-expanded="false">
              ${icon('access')}<span>${te(ui.accessibility)}</span>
            </button>
            <ul class="rs-mobile-utility" role="list">
              ${CFG.utilityLinks.map(item => `<li>${link(item)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`;
  }

  function renderHeader() {
    const active = detectActive();

    return `${iconSprite}
      <a class="skip-link" href="#main-content">${te(ui.skip)}</a>
      ${renderUtilityBar()}
      <header class="site-header" id="site-header">
        <div class="container">
        <div class="header-inner">
          <a href="${escapeHTML(url('index.html'))}" class="brand"${active === 'home' && currentFile() === 'index.html' ? ' aria-current="page"' : ''}>
            ${logo('brand-logo-img', 34, 48)}
            <span class="brand-text">
              <span class="brand-title">${te(CFG.site.name)}</span>
              <span class="brand-sub" lang="${otherLang()}">${escapeHTML(CFG.site.name[otherLang()])}</span>
            </span>
          </a>

          <nav class="main-nav" aria-label="${te(ui.mainMenu)}">
            <ul class="main-nav__list" role="list">${renderNav(active)}</ul>
          </nav>

          <div class="header-actions">
            <button class="header-btn search-action" type="button" data-focus-search aria-haspopup="dialog" aria-controls="search-dialog">
              ${icon('search')}<span class="header-btn__label">${te(ui.search)}</span>
            </button>
            <button class="header-btn mobile-toggle" type="button" data-mobile-open aria-expanded="false" aria-controls="rs-mobile-panel">
              ${icon('menu')}<span class="header-btn__label">${te(ui.menu)}</span>
            </button>
          </div>
        </div>
        </div>
      </header>
      ${renderMobilePanel(active)}
      <button class="access-fab" type="button" data-access-open aria-controls="access-drawer" aria-expanded="false" aria-label="${te(ui.accessibility)}" title="${te(ui.accessibility)}">
        ${icon('person')}
      </button>`;
  }

  /* ==================================================================== *
   * Footer
   * ==================================================================== */

  function renderFooter() {
    const { site, contact, footer } = CFG;
    const year = new Date().getFullYear();
    const yearLabel = RS.lang === 'th' ? year + 543 : year;

    const columns = footer.columns.map(column => `
      <div class="footer-col footer-col--${column.id}">
        <h2>${escapeHTML(column.heading.th)}${RS.lang === 'th' ? `<span lang="en">${escapeHTML(column.heading.en)}</span>` : ''}</h2>
        <ul class="footer-links" role="list">
          ${column.links.map(item => `<li>${link(item)}</li>`).join('')}
        </ul>
      </div>`).join('');

    return `
      <footer class="site-footer">
        <div class="container footer-main">
          <section class="footer-org" aria-labelledby="footer-org-name">
            <div class="footer-org__brand">
              ${logo('footer-org__logo', 52, 74)}
              <p id="footer-org-name" class="footer-org__name">
                ${escapeHTML(site.name.th)}
                <span class="footer-org__name-en" lang="en">${escapeHTML(site.nameEn)}</span>
              </p>
            </div>

            <address>
              <dl class="footer-address">
                <div>
                  <dt class="visually-hidden">${te(ui.address)}</dt>
                  <dd class="footer-address__line">${icon('pin')}<span>${te(contact.address)}</span></dd>
                </div>
                <div>
                  <dt class="visually-hidden">${te(ui.phone)}</dt>
                  <dd><a href="tel:${contact.phoneHref}">${icon('phone')}<span class="font-latin" data-keep-digits>${escapeHTML(contact.phone)}</span></a></dd>
                </div>
                <div>
                  <dt class="visually-hidden">${te(ui.email)}</dt>
                  <dd><a href="mailto:${escapeHTML(contact.email)}">${icon('mail')}<span class="font-latin" data-keep-digits>${escapeHTML(contact.email)}</span></a></dd>
                </div>
                <div>
                  <dt class="visually-hidden">${te(ui.officeHours)}</dt>
                  <dd class="footer-address__line">${icon('clock')}<span>${te(contact.officeHours)}</span></dd>
                </div>
              </dl>
            </address>

            <div class="footer-org__actions">
              <a class="footer-btn footer-btn--solid" href="${escapeHTML(RS.url('pages/contact.html'))}">
                <span>${te(ui.contactUs)}</span>${icon('arrow')}
              </a>
              <a class="footer-btn" href="${escapeHTML(contact.mapUrl)}" target="_blank" rel="noopener">
                ${icon('pin')}<span>${te(ui.mapShort)}</span>
                <span class="visually-hidden">${te(ui.external)}</span>
              </a>
            </div>
          </section>

          <nav class="footer-nav" aria-label="${te(ui.footerNav)}">${columns}</nav>
        </div>

        <div class="footer-bottom">
          <div class="container">
            <p>© <span class="font-latin">${yearLabel}</span> ${escapeHTML(site.name.th)} <span lang="en">${escapeHTML(site.nameEn)}</span> · ${te(ui.rights)}</p>
            <div class="footer-bottom__end">
              <p class="visitor-count">${icon('people')}<span>${te(ui.visitors)}</span> <strong>${escapeHTML(RS.formatNumber(CFG.visitorCount))}</strong></p>
              <button class="footer-top" type="button" data-scroll-top>
                <span>${te(ui.backToTop)}</span>${icon('arrow')}
              </button>
            </div>
          </div>
        </div>
      </footer>`;
  }

  /* ==================================================================== *
   * Global Navigation — desktop mega menus
   *  Disclosure pattern: buttons toggle panels; Esc closes and returns focus.
   * ==================================================================== */

  function initMegaMenu() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const triggers = RS.qsa('[data-mega]', header);
    let hoverTimer = null;

    const panelFor = trigger => document.getElementById(trigger.getAttribute('aria-controls'));

    function close(returnFocusTo) {
      clearTimeout(hoverTimer);
      triggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
        const panel = panelFor(trigger);
        if (panel) panel.hidden = true;
      });
      returnFocusTo?.focus();
    }

    function open(trigger) {
      clearTimeout(hoverTimer);
      triggers.forEach(item => {
        const isTarget = item === trigger;
        item.setAttribute('aria-expanded', String(isTarget));
        const panel = panelFor(item);
        if (panel) panel.hidden = !isTarget;
      });
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        trigger.getAttribute('aria-expanded') === 'true' ? close() : open(trigger);
      });

      /* Hover intent for mouse users only — touch and keyboard use click */
      trigger.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => open(trigger), 90);
      });

      trigger.addEventListener('keydown', event => {
        if (event.key !== 'ArrowDown') return;
        event.preventDefault();
        open(trigger);
        panelFor(trigger)?.querySelector('a')?.focus();
      });
    });

    header.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse') return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => close(), 180);
    });
    header.addEventListener('pointerenter', () => clearTimeout(hoverTimer));

    /* Links to a section of the current page don't unload it — close the panel */
    header.addEventListener('click', event => {
      if (event.target.closest('.mega-menu a')) close();
    });

    document.addEventListener('click', event => {
      if (!header.contains(event.target)) close();
    });

    /* Close when focus leaves the header entirely */
    header.addEventListener('focusout', event => {
      if (event.relatedTarget && !header.contains(event.relatedTarget)) close();
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const openTrigger = triggers.find(item => item.getAttribute('aria-expanded') === 'true');
      if (openTrigger) close(openTrigger);
    });

    window.matchMedia(`(max-width: ${CFG.breakpoints.mobileNav}px)`).addEventListener('change', () => close());
  }

  /* ==================================================================== *
   * Mobile menu
   * ==================================================================== */

  function initMobileMenu() {
    const panel = document.getElementById('rs-mobile-panel');
    const openButton = document.querySelector('[data-mobile-open]');
    if (!panel || !openButton) return;

    const drawer = panel.querySelector('.rs-mobile-drawer');
    const closeButton = panel.querySelector('[data-mobile-close]');
    let lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      panel.hidden = false;
      openButton.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-menu-lock');

      /* Force reflow so the transition starts from the closed state */
      void panel.offsetWidth;
      panel.classList.add('is-open');
      closeButton?.focus();
      document.addEventListener('keydown', onKeydown);
    }

    function close({ restoreFocus = true } = {}) {
      panel.classList.remove('is-open');
      openButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-lock');
      document.removeEventListener('keydown', onKeydown);

      setTimeout(() => {
        panel.hidden = true;
        if (restoreFocus) lastFocused?.focus?.();
      }, RS.reduceMotion() ? 0 : 200);
    }

    /* Esc closes; Tab stays inside the drawer */
    function onKeydown(event) {
      if (event.key === 'Escape') { close(); return; }
      if (event.key !== 'Tab' || !drawer) return;

      const focusable = RS.qsa('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])', drawer)
        .filter(el => el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    openButton.addEventListener('click', open);
    closeButton?.addEventListener('click', () => close());

    panel.addEventListener('click', event => {
      if (event.target === panel) close();
    });

    panel.querySelectorAll('a').forEach(item => item.addEventListener('click', () => close({ restoreFocus: false })));

    /* The accessibility button inside the drawer hands over to the header panel */
    panel.querySelector('[data-access-open]')?.addEventListener('click', () => close({ restoreFocus: false }));

    window.matchMedia(`(min-width: ${CFG.breakpoints.mobileNav + 1}px)`).addEventListener('change', event => {
      if (event.matches && panel.classList.contains('is-open')) close({ restoreFocus: false });
    });
  }

  /* ==================================================================== *
   * Demo lock (RS_CONFIG.site.menuLock)
   * Every link on the page — menus, buttons, cards — still shows its hover
   * animation, but a click only shows a toast. Open: in-page anchors, the
   * language switch and the pages listed in `allow`. Searches that would
   * leave the page are stopped the same way (RS.lockedUrl, 06-search.js).
   * ==================================================================== */

  /** True when navigating to `href` is blocked by the demo lock */
  function lockedUrl(href) {
    const lock = CFG.site.menuLock;
    if (!lock?.enabled || !href || href.startsWith('#')) return false;
    const url = new URL(href, location.href);
    if (!/^https?:$/.test(url.protocol)) return false;              /* tel:, mailto: */
    if (url.origin === location.origin && url.pathname === location.pathname && url.hash) return false;
    return !(url.origin === location.origin && lock.allow.some(path =>
      url.pathname.endsWith(`/${path}`) || (path === 'index.html' && url.pathname.endsWith('/'))));
  }
  RS.lockedUrl = lockedUrl;
  RS.lockNotice = () => RS.toast?.(RS.t(CFG.site.menuLock.message));

  const isLockedLink = link =>
    !link.matches('[data-lang-switch]') && lockedUrl(link.getAttribute('href') || '');

  function initMenuLock() {
    const lock = CFG.site.menuLock;
    if (!lock?.enabled) return;

    /* Mark the locked links for assistive technology (lists render later too).
       `data-locked` keeps them out of the disabled styling: the demo lock must
       still look alive on hover — only the click is stopped. */
    const mark = () => RS.qsa('a[href]')
      .forEach(link => {
        if (!isLockedLink(link)) return;
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('data-locked', '');
      });
    mark();
    window.addEventListener('load', mark);
    document.addEventListener('rs:content-added', mark);

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || !isLockedLink(link)) return;
      event.preventDefault();
      RS.lockNotice();
    }, true);
  }

  /** Controls desktop and mobile navigation. */
  function initNavigation() {
    initMegaMenu();
    initMobileMenu();
  }

  /* ==================================================================== *
   * Bootstrap
   * ==================================================================== */

  RS.ready(() => {
    const headerSlot = document.getElementById('app-header');
    const footerSlot = document.getElementById('app-footer');

    if (headerSlot) headerSlot.innerHTML = renderHeader();
    if (footerSlot) footerSlot.innerHTML = renderFooter();

    initNavigation();
    initMenuLock();

    /* Back to top — the page, not the browser, so it honours reduced motion */
    footerSlot?.querySelector('[data-scroll-top]')?.addEventListener('click', () => {
      /* Focus first: moving focus mid-flight cancels a smooth scroll */
      document.getElementById('main-content')?.focus({ preventScroll: true });

      if (RS.reduceMotion()) { window.scrollTo(0, 0); return; }

      const from = window.scrollY;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      /* Where smooth scrolling is switched off the button must still work */
      setTimeout(() => { if (window.scrollY === from) window.scrollTo(0, 0); }, 250);
    });
  });

  window.RSComponents = { renderMega, renderHeader, renderFooter, initNavigation };
})();
