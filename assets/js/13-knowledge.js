/* ============================================================================
 * 13-knowledge.js — the knowledge page (pages/knowledge.html)
 *  One catalogue from data/knowledge.js: a field index on the left (with
 *  counts) narrows the articles on the right, framed cards in a grid or a
 *  list (the reader's choice, remembered in this browser) with a pager, so
 *  it takes any number of articles from the CMS. The field lives in the
 *  URL hash (#science), so the home page and the menu can link to it.
 * ========================================================================== */
(() => {
  'use strict';

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const DATA = window.RS_KNOWLEDGE || { fields: [], items: [] };

  const L = {
    all: { th: 'บทความทั้งหมด', en: 'All articles' },
    allDesc: { th: 'ความรู้จากราชบัณฑิตและผู้เชี่ยวชาญทุกสาขา เรียงจากล่าสุด', en: 'Knowledge from Fellows and experts in every field, newest first' },
    allIndex: { th: 'ทุกสาขา', en: 'All fields' },
    read: { th: 'อ่านบทความ', en: 'Read the article' },
    latest: { th: 'ล่าสุด', en: 'Latest' },
    found: { th: 'พบ {n} บทความ', en: '{n} articles' },
    unit: { th: 'บทความ', en: 'articles' },
    readShort: { th: 'อ่านต่อ', en: 'Read' }
  };

  RS.ready(() => {
    const root = qs('.knowledge-page');
    if (!root) return;

    const index = qs('[data-kn-fields]', root);
    const list = qs('[data-kn-list]', root);
    const nav = qs('[data-kn-pages]', root);
    const VIEW_KEY = 'rs-kn-view';
    const SIZE_KEY = 'rs-kn-size';
    const SIZES = [12, 24, 48];
    let view = 'grid';
    try { if (localStorage.getItem(VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }
    let size = SIZES[0];
    try { const saved = Number(localStorage.getItem(SIZE_KEY)); if (SIZES.includes(saved)) size = saved; } catch { /* storage unavailable */ }
    let page = 1;
    let currentField = '';
    const fieldOf = id => DATA.fields.find(field => field.id === id);
    const sorted = [...DATA.items].sort((a, b) => b.date.localeCompare(a.date));
    const date = iso => escapeHTML(RS.formatDate(iso));
    const href = path => escapeHTML(RS.url(path));

    /* the search box keeps the language */
    const form = qs('[data-kn-search]', root);
    if (form && RS.lang === 'en') form.insertAdjacentHTML('beforeend', '<input type="hidden" name="lang" value="en">');

    function renderIndex(current) {
      const row = (id, label, count) => `
        <li><button class="kn-index__item${id === current ? ' is-active' : ''}" type="button" data-kn-field="${id}" aria-pressed="${id === current}">
          <span>${label}</span><span class="kn-index__count">${escapeHTML(RS.digits(count))}</span>
        </button></li>`;
      index.innerHTML = row('', te(L.allIndex), sorted.length)
        + DATA.fields.map(field => row(field.id, te(field.name), sorted.filter(item => item.field === field.id).length)).join('');
    }

    /* each article's cover: its own picture when the record has one, else
       the shared cover template (RS.docCover) with the field and the kind
       of article; one pale tone per field */
    const TONES = ['annual', 'strategy', 'report', 'assess', 'other', 'moral', 'science', 'arts'];
    const cover = item => {
      if (item.image) return `<img src="${href(item.image)}" alt="" width="640" height="400" loading="lazy" decoding="async">`;
      const f = fieldOf(item.field);
      const n = Math.max(0, DATA.fields.indexOf(f));
      return RS.docCover({ kind: f ? f.name : { th: 'บทความ', en: 'Article' }, when: item.type || '', org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' }, tone: TONES[n % TONES.length] });
    };

    function render(current) {
      const field = fieldOf(current);
      const items = field ? sorted.filter(item => item.field === field.id) : sorted;
      qs('[data-kn-title]', root).textContent = field ? t(field.name) : t(L.all);
      qs('[data-kn-desc]', root).textContent = field ? t(field.desc) : t(L.allDesc);

      const pages = Math.max(1, Math.ceil(items.length / size));
      page = Math.min(page, pages);
      const count = qs('[data-kn-count]', root);
      if (count) count.textContent = RS.digits(t(L.found).replace('{n}', items.length));
      list.className = `newsx-items newsx-items--${view} kn-items`;
      list.innerHTML = items.slice((page - 1) * size, page * size).map((item, i) => `
        <li class="newsx-item" style="animation-delay:${Math.min(i, 11) * 30}ms">
          <a class="newsx-card kn-card" href="${href(item.href)}">
            <span class="newsx-card__media kn-card__media">${cover(item)}</span>
            <span class="newsx-card__body">
              <span class="news-cat kn-card__kicker">${field ? '' : `<span>${te(fieldOf(item.field)?.name)}</span>`}<span>${te(item.type)}</span></span>
              <span class="newsx-card__title">${te(item.title)}</span>
              <span class="newsx-card__dek">${te(item.excerpt)}</span>
              <span class="news-card__foot newsx-card__foot">
                <time datetime="${item.date}">${date(item.date)}</time>
                <span class="news-cta"><span>${te(L.readShort)}</span><span class="news-cta__dot" aria-hidden="true">${icon('arrow')}</span></span>
              </span>
            </span>
          </a>
        </li>`).join('');
      if (nav) {
        nav.hidden = !items.length;
        nav.classList.add('pager');
        nav.classList.toggle('pager--single', pages < 2);
        nav.innerHTML = items.length ? RS.pagerHTML({ page, pages, total: items.length, size, sizes: SIZES, unit: L.unit }) : '';
      }
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
    }

    function choose(id, push) {
      const current = fieldOf(id) ? id : '';
      if (current !== currentField) page = 1;
      currentField = current;
      renderIndex(current);
      render(current);
      if (push) history.replaceState(null, '', current ? `#${current}` : location.pathname + location.search);
    }

    index.addEventListener('click', event => {
      const button = event.target.closest('[data-kn-field]');
      if (!button) return;
      choose(button.dataset.knField, true);
      /* on narrow screens the list sits below the index: bring it into view */
      if (window.matchMedia('(max-width: 899px)').matches) {
        qs('.kn-main', root).scrollIntoView({ behavior: RS.reduceMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    });
    window.addEventListener('hashchange', () => choose(location.hash.slice(1), false));

    /* grid or list */
    const syncViews = () => qsa('[data-newsx-view]', root).forEach(btn => {
      const on = btn.dataset.newsxView === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    qs('.newsx-view', root)?.addEventListener('click', event => {
      const btn = event.target.closest('[data-newsx-view]');
      if (!btn) return;
      view = btn.dataset.newsxView === 'list' ? 'list' : 'grid';
      try { localStorage.setItem(VIEW_KEY, view); } catch { /* storage unavailable */ }
      syncViews();
      render(currentField);
    });
    syncViews();

    /* pages of articles, and how many per page */
    nav?.addEventListener('click', event => {
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        size = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(SIZE_KEY, String(size)); } catch { /* storage unavailable */ }
        page = 1;
        render(currentField);
        qs('.pager__menu-btn', nav)?.focus();
        return;
      }
      const btn = event.target.closest('[data-pager-page]');
      if (!btn || btn.disabled) return;
      page = Number(btn.dataset.pagerPage);
      render(currentField);
      qs('.kn-main', root).scrollIntoView({ behavior: RS.reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    });

    choose(location.hash.slice(1), false);
  });
})();
