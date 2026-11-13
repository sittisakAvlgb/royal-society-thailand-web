/* ============================================================================
 * 29-splash.js — the entry page before the website (data/splash.js)
 * ============================================================================
 *
 *  Home page only: when RS_SPLASH is enabled and today falls between its
 *  start and end, a full-screen page opens over the site once per visit
 *  (sessionStorage, by id). "เข้าสู่เว็บไซต์" closes it; "Enter site" opens
 *  the English site. Esc closes it too; focus stays inside while it is open.
 *  ?splash=1 shows it regardless (for the Office to check), ?splash=0 skips.
 *
 *  Mourning mode, on every page for the period: the site in grey and the
 *  black ribbon in the corner.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const S = window.RS_SPLASH;
  if (!RS || !S || !S.enabled) return;

  const esc = RS.escapeHTML;
  const en = RS.lang === 'en';
  const t = v => (v && typeof v === 'object' ? (en && v.en ? v.en : v.th) : (v || ''));
  const today = new Date().toISOString().slice(0, 10);
  const inPeriod = (!S.start || today >= S.start) && (!S.end || today <= S.end);
  const force = new URLSearchParams(location.search).get('splash');
  if (!inPeriod && force !== '1') return;

  const RIBBON = `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M32 6c-7 0-12 5-12 12 0 6 3 11 7 16L14 56l8 3 10-18 10 18 8-3-13-22c4-5 7-10 7-16 0-7-5-12-12-12Zm0 8c3 0 5 2 5 5 0 3-2 7-5 11-3-4-5-8-5-11 0-3 2-5 5-5Z" fill="currentColor"/></svg>`;

  /* mourning: every page, for the whole period */
  if (S.mode === 'mourning') {
    document.documentElement.classList.add('rs-mourning');
    RS.ready(() => {
      if (document.querySelector('.mourning-ribbon')) return;
      const r = document.createElement('div');
      r.className = 'mourning-ribbon';
      r.setAttribute('role', 'img');
      r.setAttribute('aria-label', t({ th: 'ไว้ทุกข์', en: 'In mourning' }));
      r.innerHTML = RIBBON;
      document.body.appendChild(r);
    });
  }

  /* the entry page: home only, once per visit */
  const home = !/\/pages\//.test(location.pathname);
  const KEY = `rs-splash-${S.id || 'default'}`;
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch { /* storage unavailable */ }
  if (!home || force === '0' || (seen && force !== '1')) return;

  RS.ready(() => {
    const logo = RS.url('assets/images/logo-image-160.png');
    const el = document.createElement('div');
    el.className = `splash splash--${esc(S.mode || 'normal')}${S.portrait ? ' splash--portrait' : ''}`;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'splash-title');
    /* a designed poster (the usual case): the image as it was made, whole,
       on its own background colour; its wording read out from alt */
    const poster = S.poster && (typeof S.poster === 'object' ? S.poster : { desktop: S.poster });
    if (poster) {
      el.classList.add('splash--poster');
      if (S.fit === 'cover') { el.classList.add('splash--cover'); if (S.focus) el.style.setProperty('--poster-focus', S.focus); }
      if (S.background === 'blur') el.classList.add('splash--blurfill');
      else if (S.background) el.style.background = S.background;
    }
    /* overlay: the poster leaves a panel empty and the message is set on it
       as live text from the record (sharp at any size, editable, read
       out); the poster is drawn on a canvas of its own shape that covers
       the screen, so the text keeps its place on the image */
    function overlayHTML() {
      const o = S.overlay;
      const fy = parseFloat(String(S.focus || '50% 50%').split(/\s+/)[1]) / 100;
      const ratio = o.ratio || 16 / 9;
      return `<div class="splash__poster splash__poster--canvas" style="--ratio:${ratio};--fy:${Number.isFinite(fy) ? fy : 0.5}">
        <div class="splash__canvas">
          <img src="${esc(RS.url(poster.desktop))}" alt="" decoding="async">
          <div class="splash__overlay" style="top:${o.top}%;left:${o.left}%;width:${o.width}%;height:${o.height}%">
            ${(S.lines || []).map(l => `<p>${esc(t(l))}</p>`).join('')}
            ${S.from ? `<span class="splash__overlay-rule" aria-hidden="true"></span><p class="splash__overlay-from">${esc(t(S.from))}</p>` : ''}
          </div>
        </div>
      </div>`;
    }
    const posterHTML = poster ? `
      <h1 class="visually-hidden" id="splash-title">${esc(t(S.title) || t(S.alt))}</h1>
      ${S.background === 'blur' ? `<span class="splash__fill" aria-hidden="true"><img src="${esc(RS.url(poster.desktop))}" alt="" decoding="async"></span>` : ''}
      ${S.overlay ? overlayHTML() : `<picture class="splash__poster">
        ${poster.mobile ? `<source media="(max-width: 767.98px)" srcset="${esc(RS.url(poster.mobile))}">` : ''}
        <img src="${esc(RS.url(poster.desktop))}" alt="${esc(t(S.alt))}" decoding="async">
      </picture>`}` : '';
    el.innerHTML = poster ? `${posterHTML}
      ${S.mode === 'mourning' ? `<span class="splash__ribbon" aria-hidden="true">${RIBBON}</span>` : ''}
      <div class="splash__bar">
        <div class="splash__org"><img src="${esc(logo)}" alt="" width="40" height="40"><span><strong>ราชบัณฑิตยสภา</strong><span>The Royal Society of Thailand</span></span></div>
        <div class="splash__actions">
          <button class="splash__enter" type="button" data-splash-enter="th" lang="th">${esc((S.enter && S.enter.th) || 'เข้าสู่เว็บไซต์')}</button>
          <button class="splash__enter splash__enter--en" type="button" data-splash-enter="en" lang="en">${esc((S.enter && S.enter.en) || 'Enter site')}</button>
        </div>
      </div>` : `
      <div class="splash__art" aria-hidden="true">${S.image ? `<img src="${esc(RS.url(S.image))}" alt="" decoding="async">` : ''}</div>
      ${S.mode === 'mourning' ? `<span class="splash__ribbon" aria-hidden="true">${RIBBON}</span>` : ''}
      <div class="splash__stage">
        <div class="splash__text">
          ${S.kicker ? `<p class="splash__kicker">${esc(t(S.kicker))}</p>` : ''}
          <h1 class="splash__title" id="splash-title">${esc(t(S.title))}</h1>
          ${S.subtitle ? `<p class="splash__subtitle">${esc(t(S.subtitle))}</p>` : ''}
          <span class="splash__rule" aria-hidden="true"></span>
          ${(S.lines || []).length ? `<div class="splash__lines">${S.lines.map(l => `<p>${esc(t(l))}</p>`).join('')}</div>` : ''}
          ${S.from ? `<p class="splash__from">${esc(t(S.from))}</p>` : ''}
        </div>
        ${S.portrait ? `<div class="splash__portrait" aria-hidden="true"><img src="${esc(RS.url(S.portrait))}" alt="" decoding="async"></div>` : ''}
      </div>
      <div class="splash__bar">
        <div class="splash__org"><img src="${esc(logo)}" alt="" width="40" height="40"><span><strong>ราชบัณฑิตยสภา</strong><span>The Royal Society of Thailand</span></span></div>
        <div class="splash__actions">
          <button class="splash__enter" type="button" data-splash-enter="th" lang="th">${esc((S.enter && S.enter.th) || 'เข้าสู่เว็บไซต์')}</button>
          <button class="splash__enter splash__enter--en" type="button" data-splash-enter="en" lang="en">${esc((S.enter && S.enter.en) || 'Enter site')}</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    document.documentElement.classList.add('splash-open');
    const before = document.activeElement;
    const buttons = [...el.querySelectorAll('[data-splash-enter]')];
    (buttons[en ? 1 : 0] || buttons[0]).focus();

    const close = toLang => {
      try { sessionStorage.setItem(KEY, '1'); } catch { /* storage unavailable */ }
      if (toLang === 'en' && !en) { location.href = RS.url('index.html') + '?lang=en'; return; }
      if (toLang === 'th' && en) { location.href = RS.url('index.html') + '?lang=th'; return; }
      el.classList.add('is-leaving');
      document.documentElement.classList.remove('splash-open');
      setTimeout(() => el.remove(), 450);
      if (before && before.focus) before.focus();
    };
    buttons.forEach(b => b.addEventListener('click', () => close(b.dataset.splashEnter)));
    el.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  });
})();
