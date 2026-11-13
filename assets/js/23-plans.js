/* ============================================================================
 * 23-plans.js — Plans and performance reports (pages/about-plans.html)
 * ============================================================================
 *  Reads data/plans.js. The newest annual plan and the newest report open
 *  the page; beneath, every document by fiscal year, newest first, with
 *  the kind tabs, a year picker (rs-select) and a search. Each document has
 *  ดูตัวอย่าง (RS.pdfPreview, 04-interactions.js) and เปิดเอกสาร.
 * ========================================================================== */
(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-plans]');
  if (!RS || !root) return;

  const { qs, qsa, t, te, escapeHTML } = RS;
  const GROUPS = window.RS_PLAN_GROUPS || {};
  const ALL = (window.RS_PLANS || []).map((p, i) => ({ ...p, i }));
  const L = {
    year: { th: 'ปีงบประมาณ พ.ศ. {y}', en: 'Fiscal year {y}' },
    yearShort: { th: 'พ.ศ. {y}', en: 'B.E. {y}' },
    anyYear: { th: 'ทุกปี', en: 'Every year' },
    count: { th: 'พบ {n} รายการ', en: '{n} documents' },
    posted: { th: 'เผยแพร่ {d}', en: 'Published {d}' },
    preview: { th: 'ดูตัวอย่าง', en: 'Preview' },
    open: { th: 'เปิดเอกสาร', en: 'Open' },
    newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' },
  };
  const svg = name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
  const fill = (s, map) => s.replace(/\{(\w)\}/g, (_, k) => map[k]);
  const date = iso => (iso ? RS.formatDate(iso, { day: 'numeric', month: 'short', year: 'numeric' }) : '');
  const meta = p => [RS.pdfMeta({ bytes: p.bytes, pages: p.pages }), p.posted ? fill(t(L.posted), { d: date(p.posted) }) : ''].filter(Boolean).join(' · ');
  const actions = p => `
    <div class="plans-acts">
      <button class="act-doc__btn act-doc__btn--primary" type="button" data-plan="${p.i}">${svg('eye')}<span>${te(L.preview)}</span></button>
      <a class="act-doc__btn" href="${escapeHTML(RS.url(p.src))}" target="_blank" rel="noopener">${svg('external')}<span>${te(L.open)}</span><span class="visually-hidden">${te(L.newTab)}</span></a>
    </div>`;

  /* the year picker: every fiscal year that has a document */
  const years = [...new Set(ALL.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);
  function renderYears() {
    const list = qs('[data-plans-year-list]', root);
    if (!list) return;
    const tick = svg('check');
    list.innerHTML = [['', t(L.anyYear)], ...years.map(y => [String(y), fill(t(L.yearShort), { y: RS.digits(String(y)) })])]
      .map(([v, label], i) => `<li class="rs-select__option" role="option" tabindex="-1" data-value="${v}" aria-selected="${i === 0}"><span>${escapeHTML(label)}</span>${tick}</li>`).join('');
    const label = qs('[data-select-label]', root);
    if (label) label.textContent = t(L.anyYear);
  }

  /* grid (covers) or list (rows), and documents per page — the news page's
     controls, each remembered in this browser */
  const VIEW_KEY = 'rs-plans-view';
  const SIZE_KEY = 'rs-plans-size';
  const SIZES = [12, 24, 48];
  let view = 'grid', size = SIZES[0];
  try { view = localStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'grid'; } catch (e) { /* storage blocked */ }
  try { const saved = Number(localStorage.getItem(SIZE_KEY)); if (SIZES.includes(saved)) size = saved; } catch (e) { /* storage blocked */ }
  function setView(next) {
    view = next === 'list' ? 'list' : 'grid';
    qsa('[data-plans-view]', root).forEach(b => {
      const on = b.dataset.plansView === view;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    try { localStorage.setItem(VIEW_KEY, view); } catch (e) { /* storage blocked */ }
    render();
  }

  /* one list, newest first: by fiscal year, then the date it was posted */
  const SORTED = [...ALL].sort((a, b) => (b.year || 0) - (a.year || 0) || (b.posted || '').localeCompare(a.posted || '') || a.i - b.i);
  let group = 'all', year = '', query = '', page = 1;
  function render() {
    const q = query.trim().toLowerCase();
    const found = SORTED.filter(p => (group === 'all' || p.group === group)
      && (!year || String(p.year) === year)
      && (!q || `${p.title} ${t(GROUPS[p.group])}`.toLowerCase().includes(q)));
    qs('[data-plans-count]', root).textContent = fill(t(L.count), { n: RS.digits(String(found.length)) });
    qs('[data-plans-empty]', root).hidden = found.length > 0;
    const pages = Math.max(1, Math.ceil(found.length / size));
    page = Math.min(page, pages);
    const box = qs('[data-plans-list]', root);
    box.className = `newsx-items newsx-items--${view} plans-items`;
    /* the news card: the cover on top (or left), the kind, the title, what
       the file is, and the fiscal year with the two actions at the foot */
    box.innerHTML = found.slice((page - 1) * size, page * size).map((p, n) => `
      <li class="newsx-item" style="animation-delay:${Math.min(n, 11) * 30}ms">
        <article class="newsx-card plans-card">
          <button class="newsx-card__media plans-card__media" type="button" data-plan="${p.i}" aria-label="${escapeHTML(`${t(L.preview)} ${p.title}`)}">
            ${p.thumb ? `<img src="${escapeHTML(RS.url(p.thumb))}" alt="" loading="lazy" decoding="async">` : ''}
            <span class="plans-card__pages">${escapeHTML(RS.pdfMeta({ pages: p.pages }).replace(/^PDF · /, '') || 'PDF')}</span>
          </button>
          <div class="newsx-card__body">
            <span class="news-cat">${te(GROUPS[p.group])}</span>
            <h3 class="newsx-card__title" title="${escapeHTML(p.title)}">${escapeHTML(p.title)}</h3>
            <span class="newsx-card__dek">${escapeHTML(meta(p))}</span>
            <div class="news-card__foot newsx-card__foot plans-card__foot">
              <span class="plans-card__year">${p.year ? escapeHTML(fill(t(L.year), { y: RS.digits(String(p.year)) })) : ''}</span>
              ${actions(p)}
            </div>
          </div>
        </article>
      </li>`).join('');
    const nav = qs('[data-plans-pages]', root);
    nav.hidden = !found.length;
    nav.classList.add('pager');
    nav.classList.toggle('pager--single', pages < 2);
    nav.innerHTML = found.length ? RS.pagerHTML({ page, pages, total: found.length, size, sizes: SIZES, unit: { th: 'รายการ', en: found.length === 1 ? 'document' : 'documents' } }) : '';
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  }

  RS.ready(() => {
    renderYears();
    setView(view);
    qsa('[data-plans-view]', root).forEach(b => b.addEventListener('click', () => setView(b.dataset.plansView)));
    qs('[data-plans-pages]', root).addEventListener('click', event => {
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        size = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(SIZE_KEY, String(size)); } catch (e) { /* storage blocked */ }
        page = 1; render();
        return;
      }
      const btn = event.target.closest('[data-pager-page]');
      if (!btn || btn.disabled) return;
      page = Number(btn.dataset.pagerPage);
      render();
      qs('.plans-tools', root)?.scrollIntoView({ block: 'start', behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
    });

    qsa('[data-plans-tab]', root).forEach(tab => tab.addEventListener('click', () => {
      group = tab.dataset.plansTab; page = 1;
      qsa('[data-plans-tab]', root).forEach(b => {
        const on = b === tab;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      render();
    }));
    qs('[data-plans-year-input]', root)?.addEventListener('change', event => { year = event.target.value; page = 1; render(); });
    let timer;
    qs('[data-plans-search]', root)?.addEventListener('input', event => {
      clearTimeout(timer);
      timer = setTimeout(() => { query = event.target.value; page = 1; render(); }, 150);
    });
    root.addEventListener('click', event => {
      const b = event.target.closest('[data-plan]');
      if (!b) return;
      const p = ALL[Number(b.dataset.plan)];
      RS.pdfPreview({ src: RS.url(p.src), title: p.title, bytes: p.bytes, pages: p.pages });
    });
  });
})();
