/* ============================================================================
 * 16-series.js — Publication series archive (pages/series.html?id=<id>)
 * ============================================================================
 *
 *  One template for every series in RS_SERIES (data/series.js): the latest
 *  covers and the series record on the green band, then every issue in one
 *  list, newest first, in the news page's cards: grid or list (the reader's
 *  choice, remembered in this browser), a year picker, a search and a pager,
 *  so it takes any number of issues from the CMS. Each issue opens on
 *  pages/publication.html. The other series close the page as a shelf.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-series]');
  const SERIES = window.RS_SERIES || [];
  const PUBS = window.RS_PUBLICATIONS || [];
  if (!RS || !root || !SERIES.length) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const KINDS = window.RS_PUB_KINDS || {};
  const VIEW_KEY = 'rs-series-view';

  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    anyYear: { th: 'ทุกปี', en: 'Every year' },
    frequency: { th: 'กำหนดออก', en: 'Frequency' },
    lang: { th: 'ภาษา', en: 'Language' },
    count: { th: 'จำนวน', en: 'Issues' },
    countN: { th: '{n} ฉบับ', en: '{n} issues' },
    span: { th: 'ช่วงปี', en: 'Years' },
    latest: { th: 'ฉบับล่าสุด', en: 'Latest issue' },
    source: { th: 'หน้าเดิมบนเว็บไซต์ราชบัณฑิตยสภา', en: 'Original page on the Royal Society website' },
    newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' },
    found: { th: 'พบ {n} ฉบับ', en: '{n} issues' },
    vol: { th: 'ปีที่ {n}', en: 'Vol. {n}' },
    open: { th: 'เปิดดู', en: 'Open' }
  };

  const series = SERIES.find(s => s.id === new URLSearchParams(location.search).get('id')) || SERIES[0];
  const itemsOf = s => (s.items
    ? s.items.map(id => PUBS.find(p => p.id === id)).filter(Boolean)
    : PUBS.filter(p => p.kind === s.fromKind)
  ).sort((a, b) => b.date.localeCompare(a.date));
  const items = itemsOf(series);

  const set = (selector, html) => { const el = qs(selector, root); if (el) el.innerHTML = html; };
  const link = item => escapeHTML(RS.url(`pages/publication.html?id=${encodeURIComponent(item.id)}`));
  const year = iso => RS.formatDate(iso, { year: 'numeric' });
  const digits = n => escapeHTML(RS.digits(String(n)));

  /* an issue line ("ปีที่ ๔๓ ฉบับที่ ๑ มกราคม–เมษายน ๒๕๖๑" or
     "Vol. 43, No. 1, January–April 2018") splits into the number, shown
     small above, and the period, shown as the title. */
  const SPLIT = {
    th: /^((?:ปีที่\s*\S+\s*)?ฉบับที่\s*\S+)\s+(.+)$/,
    en: /^((?:Vol\.\s*[^,]+,\s*)?No\.\s*[^,]+),\s*(.+)$/
  };
  const issueParts = item => {
    const text = t(item.issue) || t(item.title);
    const m = text.match(SPLIT.th) || text.match(SPLIT.en);
    if (m) return { no: m[1].replace(/\s+/g, ' ').replace(/,\s*$/, ''), period: m[2] };
    /* an edition or volume line that does not split: it goes small above,
       and the publication's own title is the card's title */
    return item.issue && t(item.title) ? { no: t(item.issue), period: t(item.title) } : { no: t(KINDS[item.kind]) || '', period: text };
  };

  /* grid of covers or list of rows, and issues per page — the news page's
     controls, each remembered in this browser */
  const SIZE_KEY = 'rs-series-size';
  const SIZES = [12, 24, 48];
  let view = 'grid', size = SIZES[0];
  try { if (localStorage.getItem(VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }
  try { const saved = Number(localStorage.getItem(SIZE_KEY)); if (SIZES.includes(saved)) size = saved; } catch { /* storage unavailable */ }
  let query = '', yr = '', page = 1;
  const yearOf = item => String(item.date || '').slice(0, 4);

  function renderHead() {
    document.title = `${t(series.title)} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', t(series.desc));
    set('[data-series-crumb]', te(series.title));
    set('[data-series-kind]', te(KINDS[series.kind]));
    set('[data-series-title]', te(series.title));
    set('[data-series-desc]', te(series.desc));
    const latest = items[0];
    /* the three latest issues fanned like copies laid on a desk, the newest in front */
    set('[data-series-cover]', `<div class="series-stack series-stack--${Math.min(items.length, 3)}">${items.slice(0, 3).reverse().map((item, i, arr) => `
      <a class="series-stack__item series-stack__item--${arr.length - i}" href="${link(item)}" aria-label="${escapeHTML(t(item.issue))}">${RS.pubCover(item)}</a>`).join('')}</div>`);
    const years = items.map(i => i.date).sort();
    const span = years.length ? `${year(years[0])}–${year(years[years.length - 1])}` : '—';
    const facts = [
      [L.frequency, te(series.frequency)],
      [L.lang, te(series.lang)],
      [L.count, digits(t(L.countN).replace('{n}', items.length))],
      [L.span, escapeHTML(span)]
    ];
    set('[data-series-facts]', facts.map(([label, value]) => `<div class="series-facts__item"><dt>${te(label)}</dt><dd>${value}</dd></div>`).join(''));
    set('[data-series-actions]', `
      ${latest ? `<a class="btn btn--primary" href="${link(latest)}">${icon('arrow')}<span>${te(L.latest)}</span></a>` : ''}
`);
  }

  /* the year picker: every year that has an issue, newest first */
  function renderYears() {
    const pick = qs('[data-series-jump]', root);
    if (!pick) return;
    const years = [...new Set(items.map(yearOf).filter(Boolean))].sort((a, b) => b.localeCompare(a));
    pick.hidden = years.length < 2;
    const tick = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-check"></use></svg>';
    qs('[data-series-jump-list]', pick).innerHTML = [['', t(L.anyYear)], ...years.map(y => [y, year(`${y}-06-30`)])]
      .map(([v, label], i) => `
        <li class="rs-select__option" role="option" tabindex="-1" data-value="${v}" aria-selected="${i === 0}"><span>${escapeHTML(label)}</span>${tick}</li>`).join('');
    const label = qs('[data-select-label]', pick);
    if (label) label.textContent = t(L.anyYear);
  }

  function render() {
    const q = query.trim().toLowerCase();
    const found = items.filter(item => (!yr || yearOf(item) === yr)
      && (!q || `${item.issue.th} ${item.issue.en} ${t(item.title)} ${RS.digits(item.issue.en)}`.toLowerCase().includes(q)));
    qs('[data-series-count]', root).textContent = RS.digits(t(L.found).replace('{n}', found.length));
    qs('[data-series-empty]', root).hidden = found.length > 0;
    const pages = Math.max(1, Math.ceil(found.length / size));
    page = Math.min(page, pages);

    /* one list, newest first, in the news card: the cover laid on a pale
       green ground, the number above, the period as the title, and the
       year with "เปิดดู" at the foot. Takes any number of issues. */
    const box = qs('[data-series-groups]', root);
    box.className = `newsx-items newsx-items--${view} series-items`;
    box.innerHTML = found.slice((page - 1) * size, page * size).map((item, n) => {
      const { no, period } = issueParts(item);
      return `
      <li class="newsx-item" style="animation-delay:${Math.min(n, 11) * 30}ms">
        <a class="newsx-card series-card" href="${link(item)}">
          <span class="newsx-card__media series-card__media">${RS.pubCover(item)}</span>
          <span class="newsx-card__body">
            ${no ? `<span class="series-card__no">${escapeHTML(no)}</span>` : ''}
            <span class="newsx-card__title series-card__title">${escapeHTML(period)}</span>
            <span class="news-card__foot newsx-card__foot series-card__foot">
              <time datetime="${escapeHTML(item.date)}">${escapeHTML(year(item.date))}</time>
              <span class="news-cta"><span>${te(L.open)}</span><span class="news-cta__dot" aria-hidden="true">${icon('arrow')}</span></span>
            </span>
          </span>
        </a>
      </li>`;
    }).join('');

    const nav = qs('[data-series-pages]', root);
    if (nav) {
      nav.hidden = !found.length;
      nav.classList.add('pager');
      nav.classList.toggle('pager--single', pages < 2);
      nav.innerHTML = found.length ? RS.pagerHTML({ page, pages, total: found.length, size, sizes: SIZES, unit: { th: 'ฉบับ', en: found.length === 1 ? 'issue' : 'issues' } }) : '';
    }
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  }

  function setView(value) {
    view = value === 'list' ? 'list' : 'grid';
    try { localStorage.setItem(VIEW_KEY, view); } catch { /* storage unavailable */ }
    qsa('[data-series-view]', root).forEach(btn => {
      const on = btn.dataset.seriesView === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    render();
  }

  function renderOthers() {
    set('[data-series-others]', SERIES.filter(s => s !== series).map(s => {
      const latest = itemsOf(s)[0];
      if (!latest) return '';
      return `<li><a class="pub-shelf__item" href="${escapeHTML(RS.url(`pages/series.html?id=${s.id}`))}">${RS.pubCover(latest)}
        <span class="pub-shelf__kind">${te(KINDS[s.kind])}</span>
        <span class="pub-shelf__title">${te(s.title)}</span>
        <span class="pub-shelf__date">${digits(t(L.countN).replace('{n}', itemsOf(s).length))}</span></a></li>`;
    }).join(''));
  }

  RS.ready(() => {
    renderHead();
    renderOthers();
    renderYears();
    qs('.newsx-view', root)?.addEventListener('click', event => {
      const btn = event.target.closest('[data-series-view]');
      if (btn) setView(btn.dataset.seriesView);
    });
    qs('[data-series-pages]', root)?.addEventListener('click', event => {
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        size = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(SIZE_KEY, String(size)); } catch { /* storage unavailable */ }
        page = 1; render();
        return;
      }
      const btn = event.target.closest('[data-pager-page]');
      if (!btn || btn.disabled) return;
      page = Number(btn.dataset.pagerPage);
      render();
      qs('.series-bar', root)?.scrollIntoView({ block: 'start', behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
    });
    /* the year dropdown narrows the list to that year */
    qs('[data-series-jump-input]', root)?.addEventListener('change', event => { yr = event.target.value; page = 1; render(); });
    let timer;
    qs('[data-series-search]', root)?.addEventListener('input', event => {
      clearTimeout(timer);
      timer = setTimeout(() => { query = event.target.value; page = 1; render(); }, 150);
    });
    setView(view);
  });
})();
