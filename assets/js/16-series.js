/* ============================================================================
 * 16-series.js — Publication series archive (pages/series.html?id=<id>)
 * ============================================================================
 *
 *  One template for every series in RS_SERIES (data/series.js): the latest
 *  cover and the series record on the cream band, then every issue grouped
 *  by volume (the Thai journal) or by year, as a shelf of covers or a list
 *  (the reader's choice, remembered in this browser), with a search across
 *  the issues. Each issue opens on pages/publication.html. The other series
 *  close the page as a shelf.
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

  /* groups: the Thai journal by volume (ปีที่ …), the rest by year */
  const groupKey = item => {
    if (series.groupBy === 'volume') {
      const vol = Number(item.id.split('-')[1]);
      return { key: `v${vol}`, label: `${t(L.vol).replace('{n}', vol)} · ${year(item.date)}`, main: RS.digits(t(L.vol).replace('{n}', vol)), sub: year(item.date) };
    }
    return { key: item.date.slice(0, 4), label: year(item.date), main: year(item.date), sub: '' };
  };

  let view = 'shelf';
  try { if (localStorage.getItem(VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }
  let query = '';

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

  function render() {
    const q = query.trim().toLowerCase();
    const found = items.filter(item => !q || `${item.issue.th} ${item.issue.en} ${t(item.title)} ${RS.digits(item.issue.en)}`.toLowerCase().includes(q));
    qs('[data-series-count]', root).textContent = RS.digits(t(L.found).replace('{n}', found.length));
    qs('[data-series-empty]', root).hidden = found.length > 0;

    const groups = [];
    found.forEach(item => {
      const g = groupKey(item);
      const last = groups[groups.length - 1];
      if (last && last.key === g.key) last.items.push(item); else groups.push({ ...g, items: [item] });
    });

    /* volumes to jump to, when there are enough of them to scroll past */
    const jump = qs('[data-series-jump]', root);
    if (jump) {
      jump.hidden = groups.length < 5;
      jump.innerHTML = groups.map(g => `<a class="series-jump__link" href="#series-${g.key}">${escapeHTML(g.main)}</a>`).join('');
    }

    set('[data-series-groups]', groups.map(g => `
      <section class="series-group" id="series-${g.key}" aria-label="${escapeHTML(g.label)}">
        <h3 class="series-group__label">${escapeHTML(g.label)}</h3>
        ${view === 'shelf' ? `
          <ul class="pub-shelf series-shelf" role="list">${g.items.map(item => `
            <li><a class="pub-shelf__item" href="${link(item)}">${RS.pubCover(item)}
              <span class="pub-shelf__title">${te(item.issue)}</span></a></li>`).join('')}
          </ul>` : `
          <ul class="series-list" role="list">${g.items.map(item => `
            <li><a class="series-row" href="${link(item)}">
              <span class="series-row__cover">${RS.pubCover(item)}</span>
              <span class="series-row__text">
                <span class="series-row__title">${te(item.title)}</span>
                <span class="series-row__issue">${te(item.issue)}</span>
              </span>
              <span class="news-cta"><span>${te(L.open)}</span><span class="news-cta__dot" aria-hidden="true">${icon('arrow')}</span></span>
            </a></li>`).join('')}
          </ul>`}
      </section>`).join(''));
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  }

  function setView(value) {
    view = value === 'list' ? 'list' : 'shelf';
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
    qs('.newsx-view', root)?.addEventListener('click', event => {
      const btn = event.target.closest('[data-series-view]');
      if (btn) setView(btn.dataset.seriesView);
    });
    let timer;
    qs('[data-series-search]', root)?.addEventListener('input', event => {
      clearTimeout(timer);
      timer = setTimeout(() => { query = event.target.value; render(); }, 150);
    });
    setView(view);
  });
})();
