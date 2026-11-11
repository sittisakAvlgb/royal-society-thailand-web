/* ============================================================================
 * 19-works-list.js — Academic activity lists (pages/works-*.html)
 * ============================================================================
 *
 *  The reports are written into the page as a list of cards
 *  (ul[data-works-items] > li[data-academy]); without script every card
 *  shows. With it the list gains what the news page has: academy tabs,
 *  a search, a grid / list switch (remembered in this browser) and a pager
 *  (RS.pagerHTML, 04-interactions.js). Every card is the same size.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-works-list]');
  if (!RS || !root) return;

  const { qs, qsa, t } = RS;
  const box = qs('[data-works-items]', root);
  if (!box) return;

  const VIEW_KEY = 'rs-works-view';
  const SIZE_KEY = 'rs-works-size';
  const SIZES = [9, 18, 36];
  const L = {
    count: { th: 'พบ {n} รายการ', en: '{n} reports' },
    unit: { th: 'รายการ', en: 'reports' }
  };

  const items = qsa(':scope > li', box).map(li => ({
    li,
    academy: li.dataset.academy || '',
    text: li.textContent.replace(/\s+/g, ' ').toLowerCase()
  }));

  let filter = 'all';
  let query = '';
  let page = 1;
  let view = 'grid';
  try { if (localStorage.getItem(VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }
  let size = SIZES[0];
  try { const saved = Number(localStorage.getItem(SIZE_KEY)); if (SIZES.includes(saved)) size = saved; } catch { /* storage unavailable */ }

  function render() {
    const q = query.trim().toLowerCase();
    const found = items.filter(item => (filter === 'all' || item.academy === filter) && (!q || item.text.includes(q)));
    const pages = Math.max(1, Math.ceil(found.length / size));
    page = Math.min(page, pages);
    const shown = new Set(found.slice((page - 1) * size, page * size));

    /* the cards keep their place in the page; only which show changes */
    items.forEach((item, i) => {
      item.li.hidden = !shown.has(item);
      item.li.style.animationDelay = `${Math.min(i % size, 11) * 30}ms`;
    });
    box.className = `newsx-items newsx-items--${view} works-list__items`;

    const count = qs('[data-works-count]', root);
    if (count) count.textContent = RS.digits(t(L.count).replace('{n}', found.length));
    const empty = qs('[data-works-empty]', root);
    if (empty) empty.hidden = found.length > 0;

    const nav = qs('[data-works-pages]', root);
    if (nav) {
      nav.hidden = !found.length;
      nav.classList.add('pager');
      nav.classList.toggle('pager--single', pages < 2);
      nav.innerHTML = found.length ? RS.pagerHTML({ page, pages, total: found.length, size, sizes: SIZES, unit: L.unit }) : '';
    }
  }

  function setFilter(value) {
    filter = value;
    page = 1;
    qsa('[data-works-tabs] .news-tab', root).forEach(tab => {
      const on = tab.dataset.filter === value;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-pressed', String(on));
    });
    render();
  }

  function setView(value) {
    view = value === 'list' ? 'list' : 'grid';
    try { localStorage.setItem(VIEW_KEY, view); } catch { /* storage unavailable */ }
    qsa('[data-works-view]', root).forEach(btn => {
      const on = btn.dataset.worksView === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    render();
  }

  RS.ready(() => {
    /* each tab says how many reports it holds */
    qsa('[data-works-tabs] .news-tab', root).forEach(tab => {
      const n = tab.dataset.filter === 'all' ? items.length : items.filter(item => item.academy === tab.dataset.filter).length;
      const badge = document.createElement('span');
      badge.className = 'works-list__n';
      badge.textContent = RS.digits(String(n));
      tab.append(badge);
    });
    qs('[data-works-tabs]', root)?.addEventListener('click', event => {
      const tab = event.target.closest('.news-tab');
      if (tab) setFilter(tab.dataset.filter);
    });
    let timer;
    qs('[data-works-search]', root)?.addEventListener('input', event => {
      clearTimeout(timer);
      timer = setTimeout(() => { query = event.target.value; page = 1; render(); }, 150);
    });
    qs('[data-works-views]', root)?.addEventListener('click', event => {
      const btn = event.target.closest('[data-works-view]');
      if (btn) setView(btn.dataset.worksView);
    });
    qs('[data-works-pages]', root)?.addEventListener('click', event => {
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        size = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(SIZE_KEY, String(size)); } catch { /* storage unavailable */ }
        page = 1;
        render();
        qs('[data-works-pages] .pager__menu-btn', root)?.focus();
        return;
      }
      const btn = event.target.closest('[data-pager-page]');
      if (!btn || btn.disabled) return;
      page = Number(btn.dataset.pagerPage);
      render();
      qs('[data-works-tools]', root)?.scrollIntoView({ block: 'start', behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
    });
    setView(view);
  });
})();
