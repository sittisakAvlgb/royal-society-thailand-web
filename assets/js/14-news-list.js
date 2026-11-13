/* ============================================================================
 * 14-news-list.js — News index (pages/news.html)
 * ============================================================================
 *
 *  Lists RS_NEWS (data/news.js), newest first, every story at one size —
 *  as a grid of cards or a list of rows (the reader picks; remembered in
 *  this browser) — 10, 20 or 40 to a page (also remembered), with a pager. The category tabs and the search field narrow the
 *  list together. Used by three pages: news.html (news, announcements and
 *  activities), news-press.html (press releases, with data/press.js) and
 *  news-gallery.html (one photo album per story) — see data-news-cats and
 *  data-newsx-gallery="albums".
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  /* the press releases, the gallery and the calendar used to be parts of
     news.html; old links such as news.html#media-gallery open their pages */
  const MOVED = { 'press-releases': 'pages/news-press.html', 'media-gallery': 'pages/news-gallery.html', events: 'pages/works-calendar.html' };
  if (RS && MOVED[location.hash.slice(1)] && /news\.html$/.test(location.pathname)) {
    location.replace(RS.url(MOVED[location.hash.slice(1)]));
    return;
  }
  const root = document.querySelector('[data-news-list]');
  const NEWS = window.RS_NEWS || [];
  if (!RS || !root || !NEWS.length) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const CATS = window.RS_NEWS_CATS || {};
  const SIZES = [10, 20, 40];                       /* stories per page — the reader picks */
  const VIEW_KEY = 'rs-news-view';
  const SIZE_KEY = 'rs-news-size';

  const L = {
    readMore: { th: 'อ่านต่อ', en: 'Read more' },
    count: { th: 'พบ {n} ข่าว', en: '{n} stories' }
  };

  /* each page shows its own categories: data-news-cats="press" on the press
     page, "news,announcement,activity" on the news page; none = every story */
  const CATS_SHOWN = (root.dataset.newsCats || '').split(',').map(s => s.trim()).filter(Boolean);
  const list = [...NEWS].filter(item => !CATS_SHOWN.length || CATS_SHOWN.includes(item.cat))
    .sort((a, b) => b.date.localeCompare(a.date));
  /* a story read from another website (data/press.js) opens there */
  /* every story opens on this site; a link to the earlier website is not followed */
  const OLD_SITE = /^https?:\/\/(?:[a-z]+\.)?(?:royalsociety\.go\.th|orst\.go\.th)\//i;
  const outside = item => item.link && !OLD_SITE.test(item.link);
  const link = item => escapeHTML(outside(item) ? item.link : RS.url(`pages/news-detail.html?id=${encodeURIComponent(item.id)}`));
  const away = item => (outside(item) ? ' target="_blank" rel="noopener"' : '');
  const date = iso => escapeHTML(RS.formatDate(iso));
  const cat = item => te(item.label || CATS[item.cat]);
  /* keep Thai phrases whole when a headline wraps (see 13-news-detail.js) */
  const phrases = value => t(value).split(' ').map(part => `<span class="story__ph">${escapeHTML(part)}</span>`).join(' ');
  const img = (item, w, h, eager) => `<img src="${escapeHTML(RS.url(item.image))}"${item.fallback ? ` data-fallback="${escapeHTML(RS.url(item.fallback))}"` : ''} alt="" width="${w}" height="${h}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  const cta = solid => `<span class="news-cta${solid ? ' news-cta--solid' : ''}"><span>${te(L.readMore)}</span><span class="news-cta__dot" aria-hidden="true">${icon('arrow')}</span></span>`;

  /* a link can open a category: news.html?cat=activity ("กิจกรรมอื่น ๆ" in the menu) */
  const askedCat = new URLSearchParams(location.search).get('cat');
  let filter = askedCat && (!CATS_SHOWN.length || CATS_SHOWN.includes(askedCat)) ? askedCat : 'all';
  let query = '';
  let page = 1;
  /* grid or list; the reader's last choice is remembered in this browser */
  let view = 'grid';
  try { if (localStorage.getItem(VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }
  /* stories per page; the reader's last choice is remembered too */
  let size = SIZES[0];
  try { const saved = Number(localStorage.getItem(SIZE_KEY)); if (SIZES.includes(saved)) size = saved; } catch { /* storage unavailable */ }

  const matches = () => {
    const q = query.trim().toLowerCase();
    return list.filter(item => (filter === 'all' || item.cat === filter)
      && (!q || `${t(item.title)} ${t(item.dek)} ${t(CATS[item.cat])}`.toLowerCase().includes(q)));
  };

  function render() {
    const box = qs('[data-newsx-items]', root);
    if (!box) return;
    const found = matches();

    qs('[data-newsx-count]', root).textContent = RS.digits(t(found.length === 1 && RS.lang === 'en' ? { en: '1 story' } : L.count).replace('{n}', found.length));
    qs('[data-newsx-empty]', root).hidden = found.length > 0;

    /* every story at one size: the same markup serves the grid (photo on top)
       and the list (photo left, words right) — the view is a class on the list */
    box.className = `newsx-items newsx-items--${view}`;
    const pages = Math.max(1, Math.ceil(found.length / size));
    page = Math.min(page, pages);
    box.innerHTML = found.slice((page - 1) * size, page * size).map((item, i) => `
      <li class="newsx-item" style="animation-delay:${Math.min(i, 11) * 30}ms">
        <a class="newsx-card" href="${link(item)}"${away(item)}>
          <span class="newsx-card__media">${img(item, 800, 533, i < 3)}</span>
          <span class="newsx-card__body">
            <span class="news-cat">${cat(item)}</span>
            <span class="newsx-card__title">${phrases(item.title)}</span>
            <span class="newsx-card__dek">${te(item.dek)}</span>
            <span class="news-card__foot newsx-card__foot">
              <time datetime="${escapeHTML(item.date)}">${date(item.date)}</time>
              ${cta(false)}
            </span>
          </span>
        </a>
      </li>`).join('');

    renderPages(pages, found.length);
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  }

  /* the foot of the list: what is shown, first / previous / numbers /
     next / last, and stories per page (RS.pagerHTML, 04-interactions.js) */
  function renderPages(pages, total) {
    const nav = qs('[data-newsx-pages]', root);
    if (!nav) return;
    nav.hidden = !total;
    nav.classList.add('pager');
    nav.classList.toggle('pager--single', pages < 2);
    nav.innerHTML = total ? RS.pagerHTML({ page, pages, total, size, sizes: SIZES, unit: { th: 'ข่าว', en: total === 1 ? 'story' : 'stories' } }) : '';
  }

  function setView(value) {
    view = value === 'list' ? 'list' : 'grid';
    try { localStorage.setItem(VIEW_KEY, view); } catch { /* storage unavailable */ }
    qsa('[data-newsx-view]', root).forEach(btn => {
      const on = btn.dataset.newsxView === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    render();
    if (qs('[data-newsx-gallery="albums"]', root)) renderGallery();
  }

  /* the gallery page: one album per story, its cover and how many photos;
     each opens its own album page (news-album.html, 24-album.js) */
  const L_PHOTOS = { th: '{n} ภาพ', en: '{n} photos' };
  const L_ALBUMS = { th: '{n} อัลบั้ม · {p} ภาพ', en: '{n} albums · {p} photos' };
  const ALBUM_KEY = 'rs-gallery-size';
  let albumPage = 1;
  /* albums per page: whole rows of the four-across grid */
  const ALBUM_SIZES = [12, 24, 48];
  let albumSize = ALBUM_SIZES[0];
  try { const saved = Number(localStorage.getItem(ALBUM_KEY)); if (ALBUM_SIZES.includes(saved)) albumSize = saved; } catch { /* storage unavailable */ }

  function renderAlbums(box) {
    /* a story with its own photos, or a press release with a set of them */
    const photoCount = item => (item.photos || []).length || item.photoCount || 0;
    const albums = list.filter(item => photoCount(item) > 1);
    const pages = Math.max(1, Math.ceil(albums.length / albumSize));
    albumPage = Math.min(albumPage, pages);
    const count = qs('[data-newsx-gallery-count]', root);
    if (count) {
      const photos = albums.reduce((sum, item) => sum + photoCount(item), 0);
      count.textContent = RS.digits(t(L_ALBUMS).replace('{n}', albums.length).replace('{p}', photos));
    }
    const nav = qs('[data-newsx-gallery-pages]', root);
    if (nav) {
      nav.hidden = !albums.length;
      nav.classList.add('pager');
      nav.classList.toggle('pager--single', pages < 2);
      nav.innerHTML = albums.length ? RS.pagerHTML({ page: albumPage, pages, total: albums.length, size: albumSize, sizes: ALBUM_SIZES, unit: { th: 'อัลบั้ม', en: albums.length === 1 ? 'album' : 'albums' } }) : '';
    }
    /* the news page's framed cards, in its grid or list view */
    box.className = `newsx-items newsx-items--${view} newsx-albumlist`;
    box.innerHTML = albums.slice((albumPage - 1) * albumSize, albumPage * albumSize).map((item, i) => `
      <li class="newsx-item" style="animation-delay:${Math.min(i, 11) * 30}ms">
        <a class="newsx-card newsx-album" href="${escapeHTML(RS.url(`pages/news-album.html?id=${encodeURIComponent(item.id)}`))}">
          <span class="newsx-card__media">${img(item, 600, 400, i < 4)}</span>
          <span class="newsx-card__body">
            <span class="news-cat">${cat(item)}</span>
            <span class="newsx-card__title">${te(item.title)}</span>
            <span class="news-card__foot newsx-card__foot">
              <time datetime="${escapeHTML(item.date)}">${date(item.date)}</time>
              <span class="newsx-album__n">${icon('eye')}<span>${escapeHTML(RS.digits(t(L_PHOTOS).replace('{n}', photoCount(item))))}</span></span>
            </span>
          </span>
        </a>
      </li>`).join('');
  }

  function renderGallery() {
    const box = qs('[data-newsx-gallery]', root);
    if (!box) return;
    if (box.dataset.newsxGallery === 'albums') { renderAlbums(box); return; }
    box.innerHTML = list.slice(0, 8).map(item => `
      <li>
        <a class="newsx-photo" href="${link(item)}">
          <span class="newsx-photo__media">${img(item, 600, 450)}</span>
          <span class="newsx-photo__caption">${te(item.caption || item.title)}</span>
        </a>
      </li>`).join('');
  }

  function setFilter(value) {
    filter = value;
    page = 1;
    qsa('[data-newsx-tabs] .news-tab', root).forEach(tab => {
      const on = tab.dataset.filter === value;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-pressed', String(on));
    });
    render();
  }

  /* A photo not in assets/images/news/ yet falls back to a stand-in */
  root.addEventListener('error', event => {
    const el = event.target;
    if (el.tagName !== 'IMG' || !el.dataset.fallback) return;
    const next = el.dataset.fallback;
    delete el.dataset.fallback;
    el.src = next;
  }, true);

  RS.ready(() => {
    qs('[data-newsx-tabs]', root)?.addEventListener('click', event => {
      const tab = event.target.closest('.news-tab');
      if (tab) setFilter(tab.dataset.filter);
    });
    let timer;
    qs('[data-newsx-search]', root)?.addEventListener('input', event => {
      clearTimeout(timer);
      timer = setTimeout(() => { query = event.target.value; page = 1; render(); }, 150);
    });
    qs('[data-newsx-pages]', root)?.addEventListener('click', event => {
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        size = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(SIZE_KEY, String(size)); } catch { /* storage unavailable */ }
        page = 1;
        render();
        qs('.pager__menu-btn', root)?.focus();
        return;
      }
      const btn = event.target.closest('[data-pager-page]');
      if (!btn || btn.disabled) return;
      page = Number(btn.dataset.pagerPage);
      render();
      qs('.newsx-tools', root)?.scrollIntoView({ block: 'start', behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
    });
    qs('.newsx-view', root)?.addEventListener('click', event => {
      const btn = event.target.closest('[data-newsx-view]');
      if (btn) setView(btn.dataset.newsxView);
    });
    qsa('[data-newsx-view]', root).forEach(btn => {
      const on = btn.dataset.newsxView === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    setFilter(filter);
    renderGallery();

    /* the gallery's pager: pages of albums and albums per page */
    qs('[data-newsx-gallery-pages]', root)?.addEventListener('click', event => {
      const box = qs('[data-newsx-gallery]', root);
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        albumSize = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(ALBUM_KEY, String(albumSize)); } catch { /* storage unavailable */ }
        albumPage = 1;
        renderAlbums(box);
        qs('[data-newsx-gallery-pages] .pager__menu-btn', root)?.focus();
        return;
      }
      const btn = event.target.closest('[data-pager-page]');
      if (!btn || btn.disabled) return;
      albumPage = Number(btn.dataset.pagerPage);
      renderAlbums(box);
      qs('.newsx-albums', root)?.scrollIntoView({ block: 'start', behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
    });
  });
})();
