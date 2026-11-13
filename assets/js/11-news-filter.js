/* ============================================================================
 * 11-news-filter.js — Home news: filter the card grid by category
 * ============================================================================
 *
 *  markup (index.html):
 *    [data-news-filter]  the tab group; each tab has data-filter="all|<category>"
 *    .news-cards > li[data-category]   the cards to show / hide
 *
 *  The featured story stays in view; only the card grid is filtered.
 * ========================================================================== */

(() => {
  'use strict';

  const group = document.querySelector('[data-news-filter]');
  const grid = document.querySelector('.news-cards');
  if (!group || !grid) return;

  /* The stories come from data/news.js (the CMS feed) when the page loads
     it: the top story is the record marked `featured: true`, else the
     newest; the six after it fill the grid. */
  const RS = window.RS;
  const NEWS = Array.isArray(window.RS_NEWS) ? window.RS_NEWS.slice() : null;
  if (RS && NEWS && NEWS.length) {
    const esc = RS.escapeHTML;
    const t = v => (v && typeof v === 'object' ? (RS.lang === 'en' && v.en ? v.en : v.th) : (v || ''));
    const en = v => (v && typeof v === 'object' && v.en ? ` data-en="${esc(v.en)}"` : '');
    const CAT = {
      news: { th: 'ข่าว', en: 'News' }, announcement: { th: 'ประกาศ', en: 'Announcement' },
      activity: { th: 'กิจกรรม', en: 'Activity' }, press: { th: 'แถลงข่าว', en: 'Press release' }
    };
    const READ = { th: 'อ่านต่อ', en: 'Read more' };
    const cta = `<span class="news-cta"><span${en(READ)}>${esc(t(READ))}</span><span class="news-cta__dot" aria-hidden="true"><svg class="icon" focusable="false"><use href="#i-arrow"></use></svg></span></span>`;
    const href = n => esc(RS.url(`pages/news-detail.html?id=${encodeURIComponent(n.id)}`));
    const img = (n, w, h) => `<img src="${esc(RS.url(n.image || n.fallback || 'assets/images/hero/hero-1.jpg'))}"${n.fallback ? ` data-fallback="${esc(RS.url(n.fallback))}"` : ''} alt="" width="${w}" height="${h}" loading="lazy" decoding="async">`;
    const when = n => `<time datetime="${esc(n.date)}">${esc(RS.formatDate(n.date, { day: 'numeric', month: 'short', year: 'numeric' }))}</time>`;
    const filterOf = n => (n.cat === 'press' ? 'news' : n.cat);
    NEWS.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const lead = NEWS.find(n => n.featured) || NEWS[0];
    const rest = NEWS.filter(n => n !== lead).slice(0, 6);
    const spot = document.querySelector('.news-spotlight');
    if (spot) {
      const label = lead.label || CAT[lead.cat] || CAT.news;
      spot.dataset.category = filterOf(lead);
      const media = spot.querySelector('.news-spotlight__media img');
      if (media) media.outerHTML = img(lead, 1200, 800);
      const body = spot.querySelector('.news-spotlight__body');
      if (body) body.innerHTML = `
        <p class="news-spotlight__meta"><span class="news-cat"${en(label)}>${esc(t(label))}</span></p>
        <h3 class="news-spotlight__title"><a href="${href(lead)}"${en(lead.title)}>${esc(t(lead.title))}</a></h3>
        ${lead.dek ? `<p class="news-spotlight__excerpt"${en(lead.dek)}>${esc(t(lead.dek))}</p>` : ''}
        <span class="news-card__foot news-spotlight__foot">${when(lead)}${cta}</span>`;
    }
    grid.innerHTML = rest.map(n => {
      const label = CAT[n.cat] || CAT.news;
      return `<li class="news-card-li" data-category="${esc(filterOf(n))}">
        <article class="news-card">
          <a class="news-card__link" href="${href(n)}">
            <span class="news-card__media">${img(n, 800, 600)}</span>
            <span class="news-card__body">
              <span class="news-cat"${en(label)}>${esc(t(label))}</span>
              <h3 class="news-card__title"${en(n.title)}>${esc(t(n.title))}</h3>
              ${n.dek ? `<span class="news-card__excerpt"${en(n.dek)}>${esc(t(n.dek))}</span>` : ''}
              <span class="news-card__foot">${when(n)}${cta}</span>
            </span>
          </a>
        </article>
      </li>`;
    }).join('');
  }

  const tabs = Array.from(group.querySelectorAll('[data-filter]'));
  const cards = Array.from(grid.querySelectorAll('[data-category]'));

  function apply(filter) {
    tabs.forEach(tab => {
      const on = tab.dataset.filter === filter;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-pressed', String(on));
    });
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) {                       /* replay the fade-in so the change reads */
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
      }
    });
  }

  group.addEventListener('click', event => {
    const tab = event.target.closest('[data-filter]');
    if (tab) apply(tab.dataset.filter);
  });
})();
