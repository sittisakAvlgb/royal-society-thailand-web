/* ============================================================================
 * 30-notice.js — the announcement popup (data/notices.js)
 * ============================================================================
 *
 *  The notices in RS_NOTICES that are enabled, in their dates and meant for
 *  this page open in a small window (native <dialog>), one at a time with
 *  ก่อนหน้า / ถัดไป when there are several. It waits for the entry page
 *  (29-splash.js) and the cookie notice to close, so they never stack.
 *
 *  Closing keeps them closed for the visit (sessionStorage). "ไม่ต้องแสดงอีก"
 *  keeps the ones seen closed on this device (localStorage, under the
 *  preferences consent) until the Office gives a notice a new id.
 *  ?notice=1 shows them regardless, ?notice=0 skips them.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const LIST = window.RS_NOTICES;
  if (!RS || !Array.isArray(LIST) || !LIST.length) return;

  const esc = RS.escapeHTML;
  const t = v => RS.t(v);
  const force = new URLSearchParams(location.search).get('notice');
  if (force === '0') return;

  const SESSION = 'rs-notices-closed';
  const KEPT = 'rs-notices-hidden';
  const read = (get, key) => { try { return JSON.parse(get(key) || '[]'); } catch { return []; } };
  const closedNow = read(k => sessionStorage.getItem(k), SESSION);
  const hidden = read(k => RS.storage.get(k), KEPT);

  const file = (location.pathname.split('/').pop() || 'index.html');
  const isHome = file === 'index.html' || file === '';
  const onThisPage = n => {
    const p = n.pages || 'home';
    if (p === 'all') return true;
    if (p === 'home') return isHome;
    return Array.isArray(p) && p.includes(file);
  };
  const today = new Date().toISOString().slice(0, 10);
  const inDates = n => (!n.start || today >= n.start) && (!n.end || today <= n.end);

  const notices = LIST.filter(n => n && n.enabled && n.id && t(n.title) && onThisPage(n) &&
    (force === '1' || (inDates(n) && !closedNow.includes(n.id) && !hidden.includes(n.id))));
  if (!notices.length) return;

  const L = {
    close: { th: 'ปิดประกาศ', en: 'Close notice' },
    prev: { th: 'ประกาศก่อนหน้า', en: 'Previous notice' },
    next: { th: 'ประกาศถัดไป', en: 'Next notice' },
    keep: { th: 'ไม่ต้องแสดงอีก', en: "Don't show again" },
    ok: { th: 'ปิด', en: 'Close' },
    of: { th: 'จาก', en: 'of' }
  };

  function slide(n) {
    const link = n.link && n.link.href;
    const external = link && (n.link.external || RS.isExternal(link));
    const href = link ? (external ? link : RS.url(link)) : '';
    const date = n.date ? `<time datetime="${esc(n.date)}">${esc(RS.formatDate(n.date, { day: 'numeric', month: 'long', year: 'numeric' }))}</time>` : '';
    return `
      ${n.image ? `<figure class="notice__media"><img src="${esc(RS.url(n.image))}" alt="${esc(t(n.imageAlt))}" decoding="async"></figure>` : ''}
      <div class="notice__body">
        ${n.kicker || date ? `<p class="notice__kicker">${n.kicker ? `<span>${esc(t(n.kicker))}</span>` : ''}${date}</p>` : ''}
        <h2 class="notice__title" id="notice-title">${esc(t(n.title))}</h2>
        ${n.text ? `<p class="notice__text">${esc(t(n.text))}</p>` : ''}
        ${href ? `<a class="btn btn--primary btn--pill notice__go" href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ''} data-notice-go>${esc(t(n.link.label) || t({ th: 'อ่านต่อ', en: 'Read more' }))}${RS.icon(external ? 'external' : 'arrow')}</a>` : ''}
      </div>`;
  }

  function open() {
    let index = 0;
    const many = notices.length > 1;
    const dialog = document.createElement('dialog');
    dialog.className = 'notice';
    dialog.setAttribute('aria-labelledby', 'notice-title');
    dialog.innerHTML = `
      <button class="notice__close" type="button" data-notice-close aria-label="${esc(t(L.close))}">${RS.icon('x')}</button>
      <div class="notice__slide" data-notice-slide aria-live="polite"></div>
      <div class="notice__foot">
        <label class="notice__keep"><input type="checkbox" data-notice-keep> <span>${esc(t(L.keep))}</span></label>
        ${many ? `<div class="notice__pager">
          <button type="button" data-notice-step="-1" aria-label="${esc(t(L.prev))}">${RS.icon('chevron')}</button>
          <span data-notice-count></span>
          <button type="button" data-notice-step="1" aria-label="${esc(t(L.next))}">${RS.icon('chevron')}</button>
        </div>` : ''}
      </div>`;
    document.body.appendChild(dialog);

    const box = dialog.querySelector('[data-notice-slide]');
    const count = dialog.querySelector('[data-notice-count]');
    const show = i => {
      index = (i + notices.length) % notices.length;
      box.innerHTML = slide(notices[index]);
      box.classList.remove('is-in'); void box.offsetWidth; box.classList.add('is-in');
      if (count) count.textContent = RS.digits(`${index + 1} ${t(L.of)} ${notices.length}`);
    };

    const remember = () => {
      const ids = notices.map(n => n.id);
      try { sessionStorage.setItem(SESSION, JSON.stringify([...new Set([...closedNow, ...ids])])); } catch { /* storage unavailable */ }
      if (dialog.querySelector('[data-notice-keep]').checked) RS.storage.set(KEPT, JSON.stringify([...new Set([...hidden, ...ids])]));
    };
    let closing = false;
    const close = () => {
      if (closing) return; closing = true;
      remember();
      dialog.classList.remove('is-open');
      const done = () => { if (dialog.open) dialog.close(); dialog.remove(); };
      if (RS.reduceMotion()) done(); else setTimeout(done, 220);
    };

    dialog.addEventListener('click', event => {
      if (event.target === dialog) { close(); return; }            /* the backdrop */
      if (event.target.closest('[data-notice-close]')) close();
      const step = event.target.closest('[data-notice-step]');
      if (step) show(index + Number(step.dataset.noticeStep));
      if (event.target.closest('[data-notice-go]')) remember();
    });
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });

    show(0);
    dialog.showModal();
    void dialog.offsetWidth;
    dialog.classList.add('is-open');
    dialog.querySelector('[data-notice-close]').focus();
  }

  /* after the entry page and the cookie notice: wait while either is open */
  const busy = () => document.documentElement.classList.contains('splash-open') ||
    document.querySelector('dialog[open]');
  RS.ready(() => {
    let waited = 0;
    const tick = () => {
      if (busy()) { setTimeout(tick, 400); return; }
      /* a beat after the page settles, so it does not land with the hero */
      if (waited++ < 2) { setTimeout(tick, 500); return; }
      if (!busy()) open(); else setTimeout(tick, 400);
    };
    setTimeout(tick, 600);
  });
})();
