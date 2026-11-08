/* ============================================================================
 * 13-knowledge.js — the knowledge page (pages/knowledge.html)
 *  One catalogue from data/knowledge.js: a field index on the left (with
 *  counts) narrows the list on the right; the newest article of the current
 *  choice leads in larger type. The choice lives in the URL hash (#science),
 *  so the home page and the menu can link straight to a field.
 * ========================================================================== */
(() => {
  'use strict';

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const DATA = window.RS_KNOWLEDGE || { fields: [], items: [] };

  const L = {
    all: { th: 'บทความทั้งหมด', en: 'All articles' },
    allDesc: { th: 'ความรู้จากราชบัณฑิตและผู้เชี่ยวชาญทุกสาขา เรียงจากล่าสุด', en: 'Knowledge from Fellows and experts in every field, newest first' },
    allIndex: { th: 'ทุกสาขา', en: 'All fields' },
    searchField: { th: 'ค้นหาในสาขานี้', en: 'Search this field' },
    searchAll: { th: 'ค้นหาเพิ่มเติม', en: 'Search more' },
    read: { th: 'อ่านบทความ', en: 'Read the article' },
    latest: { th: 'ล่าสุด', en: 'Latest' }
  };

  RS.ready(() => {
    const root = qs('.knowledge-page');
    if (!root) return;

    const index = qs('[data-kn-fields]', root);
    const lead = qs('[data-kn-lead]', root);
    const list = qs('[data-kn-list]', root);
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

    function render(current) {
      const field = fieldOf(current);
      const items = field ? sorted.filter(item => item.field === field.id) : sorted;
      qs('[data-kn-title]', root).textContent = field ? t(field.name) : t(L.all);
      qs('[data-kn-desc]', root).textContent = field ? t(field.desc) : t(L.allDesc);
      const more = qs('[data-kn-more]', root);
      more.href = RS.url(field ? `pages/search.html?topic=${field.id}` : 'pages/search.html');
      qs('[data-kn-more-label]', root).textContent = t(field ? L.searchField : L.searchAll);

      const [first, ...rest] = items;
      lead.innerHTML = first ? `
        <a href="${href(first.href)}">
          <span class="kn-lead__kicker"><span class="kn-lead__flag">${te(L.latest)}</span>${field ? '' : `<span>${te(fieldOf(first.field)?.name)}</span>`}<span>${te(first.type)}</span><time datetime="${first.date}">${date(first.date)}</time></span>
          <span class="kn-lead__title">${te(first.title)}</span>
          <span class="kn-lead__excerpt">${te(first.excerpt)}</span>
          <span class="link-arrow kn-lead__go"><span>${te(L.read)}</span>${icon('arrow')}</span>
        </a>` : '';
      list.innerHTML = rest.map((item, i) => {
        const d = new Date(`${item.date}T00:00:00`);
        return `
        <li class="kn-row" style="--i:${i}">
          <a href="${href(item.href)}">
            <time class="kn-row__date" datetime="${item.date}">
              <span class="kn-row__day">${escapeHTML(RS.formatDate(item.date, { day: 'numeric' }))}</span>
              <span class="kn-row__month">${escapeHTML(RS.formatDate(item.date, { month: 'short', year: '2-digit' }))}</span>
            </time>
            <span class="kn-row__body">
              <span class="kn-row__kicker">${field ? '' : `<span>${te(fieldOf(item.field)?.name)}</span>`}<span>${te(item.type)}</span></span>
              <span class="kn-row__title">${te(item.title)}</span>
              <span class="kn-row__excerpt">${te(item.excerpt)}</span>
            </span>
            <span class="kn-row__go" aria-hidden="true">${icon('arrow')}</span>
          </a>
        </li>`;
      }).join('');
      /* replay the entrance so the change reads */
      [lead, list].forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
    }

    function choose(id, push) {
      const current = fieldOf(id) ? id : '';
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

    choose(location.hash.slice(1), false);
  });
})();
