/* ============================================================================
 * 24-album.js — one photo album (pages/news-album.html?id=…)
 * ============================================================================
 *  The gallery's albums open here rather than on the news story: the album's
 *  title, kind, date and how many photos, then every photo in a grid that
 *  opens the site's photo viewer (RS.photoViewer, 04-interactions.js).
 *  "อ่านข่าว" keeps the story one link away; other albums follow below.
 *
 *  Data: RS_NEWS (data/news.js + data/press.js). A story's `photos`
 *  [{ src, caption }] are its album. A press release lists only
 *  `photoCount` and its cover so far, so its album is the cover plus the
 *  site's stand-in photos up to that count.
 *  TODO (Office): each press release's own photos.
 * ========================================================================== */
(() => {
  const RS = window.RS;
  const root = document.querySelector('[data-album]');
  const NEWS = window.RS_NEWS || [];
  if (!RS || !root) return;

  const { qs, t, te, icon, escapeHTML } = RS;
  const CATS = window.RS_NEWS_CATS || {};
  const L = {
    photos: { th: '{n} ภาพ', en: '{n} photos' },
    open: { th: 'เปิดภาพที่ {n} จาก {t}', en: 'Open photo {n} of {t}' },
    album: { th: 'อัลบั้มภาพ', en: 'Photo album' }
  };
  const POOL = ['news/news-lead.jpg', 'news/news-01.jpg', 'news/news-02.jpg', 'news/news-03.jpg', 'news/news-04.jpg',
    'news/news-05.jpg', 'news/news-06.jpg', 'hero/hero-1.jpg', 'hero/hero-2.jpg', 'hero/hero-3.jpg', 'hero/hero-4.jpg']
    .map(name => `assets/images/${name}`);

  const photoCount = item => (item.photos || []).length || item.photoCount || 0;
  const photosOf = item => {
    if (item.photos && item.photos.length) return item.photos;
    const n = photoCount(item);
    const others = POOL.filter(src => src !== item.image);
    return [{ src: item.image }, ...Array.from({ length: Math.max(0, n - 1) }, (_, i) => ({ src: others[i % others.length] }))];
  };
  const albums = [...NEWS].filter(item => photoCount(item) > 1).sort((a, b) => b.date.localeCompare(a.date));
  const id = new URLSearchParams(location.search).get('id');
  const album = albums.find(item => item.id === id);
  const num = n => escapeHTML(RS.digits(String(n)));
  const date = iso => escapeHTML(RS.formatDate(iso));
  const cat = item => te(item.label || CATS[item.cat]);
  const albumUrl = item => escapeHTML(RS.url(`pages/news-album.html?id=${encodeURIComponent(item.id)}`));

  function renderAlbum() {
    if (!album) {
      qs('[data-album-empty]', root).hidden = false;
      return;
    }
    const photos = photosOf(album);
    const title = t(album.title);
    document.title = `${title} | ${RS.lang === 'th' ? 'ราชบัณฑิตยสภา' : 'The Royal Society of Thailand'}`;
    qs('[data-album-title]', root).textContent = title;
    qs('[data-album-crumb]', root).textContent = title;
    const art = qs('[data-album-art]', root);
    if (art && album.image) art.src = RS.url(album.image);
    qs('[data-album-facts]', root).innerHTML = `
      <li><span class="news-cat">${cat(album)}</span></li>
      <li>${icon('calendar')}<time datetime="${escapeHTML(album.date)}">${date(album.date)}</time></li>
      <li>${icon('eye')}<span>${num(t(L.photos).replace('{n}', photos.length))}</span></li>`;
    const story = qs('[data-album-story]', root);
    if (story) {
      story.href = RS.url(`pages/news-detail.html?id=${encodeURIComponent(album.id)}`);
      story.hidden = false;
    }
    qs('[data-album-grid]', root).innerHTML = photos.map((photo, i) => `
      <li class="album__item" style="animation-delay:${Math.min(i, 15) * 35}ms">
        <button class="album__photo" type="button" data-album-photo="${i}"
                aria-label="${escapeHTML(t(L.open).replace('{n}', RS.digits(String(i + 1))).replace('{t}', RS.digits(String(photos.length))))}${t(photo.caption) ? ` — ${escapeHTML(t(photo.caption))}` : ''}">
          <img src="${escapeHTML(RS.url(photo.src))}" alt="" loading="${i < 8 ? 'eager' : 'lazy'}" decoding="async">
        </button>
      </li>`).join('');
    const open = RS.photoViewer(photos);
    if (open) {
      root.addEventListener('click', event => {
        const b = event.target.closest('[data-album-photo]');
        if (b) open(Number(b.dataset.albumPhoto));
      });
    }
  }

  /* four other albums, the newest first */
  function renderMore() {
    const box = qs('[data-album-more-box]', root);
    const others = albums.filter(item => item !== album).slice(0, 4);
    if (!box || !others.length) return;
    box.hidden = false;
    qs('[data-album-more]', root).innerHTML = others.map((item, i) => `
      <li class="newsx-item" style="animation-delay:${i * 30}ms">
        <a class="newsx-card newsx-album" href="${albumUrl(item)}">
          <span class="newsx-card__media"><img src="${escapeHTML(RS.url(item.image))}" alt="" width="600" height="400" loading="lazy" decoding="async"></span>
          <span class="newsx-card__body">
            <span class="news-cat">${cat(item)}</span>
            <span class="newsx-card__title">${te(item.title)}</span>
            <span class="news-card__foot newsx-card__foot">
              <time datetime="${escapeHTML(item.date)}">${date(item.date)}</time>
              <span class="newsx-album__n">${icon('eye')}<span>${num(t(L.photos).replace('{n}', photoCount(item)))}</span></span>
            </span>
          </span>
        </a>
      </li>`).join('');
  }

  RS.ready(() => {
    renderAlbum();
    renderMore();
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
