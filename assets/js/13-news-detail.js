/* ============================================================================
 * 13-news-detail.js — News story page (pages/news-detail.html?id=<id>)
 * ============================================================================
 *
 *  One template for every story in RS_NEWS (data/news.js). An unknown or
 *  missing id shows the newest story rather than an empty page. A magazine
 *  opening (headline left, photo right), then the story in one reading
 *  column, its photos and attachments, and four other stories in the home
 *  news band's card.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-news-story]');
  const NEWS = window.RS_NEWS || [];
  if (!RS || !root || !NEWS.length) return;

  const { qs, t, te, icon, escapeHTML } = RS;
  const CATS = window.RS_NEWS_CATS || {};

  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    date: { th: 'วันที่', en: 'Date' },
    readMore: { th: 'อ่านต่อ', en: 'Read more' },
    download: { th: 'ดาวน์โหลด', en: 'Download' },
    openPhoto: { th: 'เปิดภาพที่', en: 'Open photo' }
  };

  /* newest first; "older" is the next one down the list */
  const list = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
  const requested = new URLSearchParams(location.search).get('id');
  const index = Math.max(0, list.findIndex(item => item.id === requested));
  const story = list[index];

  const link = item => escapeHTML(RS.url(`pages/news-detail.html?id=${encodeURIComponent(item.id)}`));
  const date = iso => escapeHTML(RS.formatDate(iso));
  const longDate = (iso, weekday) => escapeHTML(RS.formatDate(iso, { ...(weekday ? { weekday: 'long' } : {}), day: 'numeric', month: 'long', year: 'numeric' }));
  const cat = item => te(item.label || CATS[item.cat]);
  const set = (selector, html) => { const el = qs(selector, root); if (el) el.innerHTML = html; };
  /* Thai breaks lines inside words ("บรรยาย / สาธารณะ"); in the headline and
     dek each space-separated phrase is an inline-block, so it moves to the
     next line whole (and wraps inside only when longer than a line) */
  const phrases = value => t(value).split(' ').map(part => `<span class="story__ph">${escapeHTML(part)}</span>`).join(' ');

  function renderHead() {
    document.title = `${t(story.title)} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', t(story.dek));
    set('[data-story-crumb]', te(story.title));
    set('[data-story-cat]', cat(story));
    const time = qs('[data-story-date]', root);
    if (time) { time.dateTime = story.date; time.innerHTML = longDate(story.date); }
    set('[data-story-title]', phrases(story.title));
    set('[data-story-dek]', phrases(story.dek));
    set('[data-story-by]', te(story.by));
  }

  function renderBody() {
    const img = qs('[data-story-img]', root);
    if (img && !story.image && !story.fallback) {
      /* a story without a photo: no empty frame, the headline takes the width */
      img.closest('figure')?.setAttribute('hidden', '');
      img.closest('.story__open')?.classList.add('story__open--solo');
    } else if (img) {
      if (story.fallback) img.dataset.fallback = RS.url(story.fallback);
      img.src = RS.url(story.image || story.fallback);
      img.alt = t(story.caption);
    }
    set('[data-story-caption]', te(story.caption));
    /* body paragraphs are authored HTML from data/news.js (trusted content) */
    set('[data-story-body]', (story.body || []).join(''));
  }


  function renderFiles() {
    const box = qs('[data-story-files]', root);
    if (!box || !story.files?.length) return;
    box.hidden = false;
    /* TODO (Office): link each attachment to its PDF */
    set('[data-story-files-count]', escapeHTML(RS.digits(String(story.files.length))));
    set('[data-story-files-list]', story.files.map(file => `
      <li>
        <a class="story__doc" href="#" download>
          <span class="story__file-doc" aria-hidden="true"><span data-keep-digits>PDF</span></span>
          <span class="story__file-body">
            <span class="story__file-name">${te(file.name)}</span>
            <span class="story__file-meta" data-keep-digits>PDF · ${escapeHTML(file.size)}</span>
          </span>
          <span class="btn btn--secondary btn--sm story__doc-btn">${icon('download')}<span>${te(L.download)}</span></span>
        </a>
      </li>`).join(''));
  }

  /* The story's photographs: the first large, four beside it, the last
     showing how many more there are; each opens the viewer */
  const SHOWN = 5;
  function renderAlbum() {
    const photos = story.photos || [];
    const box = qs('[data-story-album]', root);
    if (!box || photos.length < 2) return;
    box.hidden = false;
    set('[data-story-album-count]', escapeHTML(RS.digits(String(photos.length))));
    set('[data-story-album-list]', photos.slice(0, SHOWN).map((photo, i) => {
      const rest = i === SHOWN - 1 && photos.length > SHOWN ? photos.length - SHOWN : 0;
      return `
      <li>
        <button class="story__album-item" type="button" data-story-photo="${i}" aria-label="${escapeHTML(`${t(L.openPhoto)} ${RS.digits(String(i + 1))} / ${RS.digits(String(photos.length))}${t(photo.caption) ? ` — ${t(photo.caption)}` : ''}`)}">
          <img src="${escapeHTML(RS.url(photo.src))}" alt="" loading="lazy" decoding="async">
          ${rest ? `<span class="story__album-more" aria-hidden="true">+${escapeHTML(RS.digits(String(rest)))}</span>` : ''}
        </button>
      </li>`;
    }).join(''));
  }

  /* the site's photo viewer (RS.photoViewer, 04-interactions.js): the same
     frosted slider with thumbnails as the activity reports */
  function initViewer() {
    const photos = story.photos || [];
    const open = RS.photoViewer(photos);
    if (!open) return;
    root.addEventListener('click', event => {
      const b = event.target.closest('[data-story-photo]');
      if (b) open(Number(b.dataset.storyPhoto));
    });
  }

  function settleExtras() {
    const extras = qs('[data-story-extras]', root);
    if (!extras) return;
    const parts = [...extras.children];
    extras.hidden = parts.every(el => el.hidden);
    extras.classList.toggle('story__extras--one', parts.filter(el => !el.hidden).length === 1);
  }

  /* Four other stories as compact home news cards: the same kind first, then the newest */
  function renderMore() {
    const family = item => (item.cat === 'press' ? 'news' : item.cat);
    const others = list.filter(item => item !== story);
    const picks = [
      ...others.filter(item => family(item) === family(story)),
      ...others.filter(item => family(item) !== family(story))
    ].slice(0, 4);
    set('[data-story-more]', picks.map(item => `
      <li class="news-card-li">
        <article class="news-card">
          <a class="news-card__link" href="${link(item)}">
            <span class="news-card__media">
              <img src="${escapeHTML(RS.url(item.image))}"${item.fallback ? ` data-fallback="${escapeHTML(RS.url(item.fallback))}"` : ''} alt="" width="800" height="600" loading="lazy" decoding="async">
            </span>
            <span class="news-card__body">
              <span class="news-cat">${cat(item)}</span>
              <span class="news-card__title">${te(item.title)}</span>
              <span class="news-card__excerpt">${te(item.dek)}</span>
              <span class="news-card__foot">
                <time datetime="${escapeHTML(item.date)}">${date(item.date)}</time>
                <span class="news-cta"><span>${te(L.readMore)}</span><span class="news-cta__dot" aria-hidden="true">${icon('arrow')}</span></span>
              </span>
            </span>
          </a>
        </article>
      </li>`).join(''));
  }


  /* A photo that is not in assets/images/news/ yet falls back to a stand-in */
  root.addEventListener('error', event => {
    const img = event.target;
    if (img.tagName !== 'IMG' || !img.dataset.fallback) return;
    const next = img.dataset.fallback;
    delete img.dataset.fallback;                        /* once only */
    img.src = next;
  }, true);

  RS.ready(() => {
    renderHead();
    renderBody();
    renderFiles();
    renderAlbum();
    initViewer();
    settleExtras();
    renderMore();
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
