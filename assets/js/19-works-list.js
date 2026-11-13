/* ============================================================================
 * 19-works-list.js — Academic activity lists (pages/works-*.html)
 * ============================================================================
 *
 *  The reports are written into the page as a list of cards
 *  (ul[data-works-items] > li[data-academy]); without script every card
 *  shows. With it the list gains what the news page has: academy tabs,
 *  a search, a grid / list switch (remembered in this browser) and a pager
 *  (RS.pagerHTML, 04-interactions.js). Every card is the same size.
 *  With data-works-rows on the root the list keeps its own rows (document
 *  lists such as the announcements): list by default, the grid turning
 *  each row into a document card; twelve a page (rows of four).
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-works-list]');
  if (!RS || !root) return;

  const { qs, qsa, t } = RS;
  const box = qs('[data-works-items]', root);
  if (!box) return;

  /* The reports come from data/activities.js (the CMS feed) when the page
     loads it: one card per record of this page's series, newest first, in
     place of the cards written into the page. Cards that are not reports
     (a white paper, a link elsewhere) stay, after the reports. */
  const SERIES_OF = { 'on-tour': 'on-tour', 'ideas-forum': 'ideas-forum', lectures: 'lectures', proposals: 'proposals', 'knowledge-to-society': 'knowledge' };
  const series = SERIES_OF[root.dataset.worksTopic];
  /* the academies' own news (data/academies.js, academy-news.html): every
     post of the three academies, opened on activity.html; a photo kept on
     an old academy site or a PDF's page of text gives way to the cover
     template, as on the academy page */
  const ACADEMY_NEWS = root.dataset.worksTopic === 'academy-news' && window.RS_ACADEMY_PAGES;
  const OLD_SITE = /^https?:\/\/(?:[a-z]+\.)?(?:royalsociety\.go\.th|orst\.go\.th)\//i;
  const academyRecords = () => Object.entries(window.RS_ACADEMY_PAGES || {}).flatMap(([key, page]) => (page.posts || []).map(post => ({
    id: post.id, academy: key, title: post.title, dek: post.excerpt || '', date: post.date,
    image: OLD_SITE.test(post.image || '') || post.cover === 'template' ? '' : post.image
  })));
  if ((series && Array.isArray(window.RS_ACTIVITIES)) || ACADEMY_NEWS) {
    const ACADEMIES = (window.RS_CONFIG && window.RS_CONFIG.academies) || [];
    const esc = RS.escapeHTML;
    const records = (ACADEMY_NEWS ? academyRecords() : window.RS_ACTIVITIES.filter(a => a.series === series))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const card = a => {
      const academy = ACADEMIES.find(x => x.id === a.academy);
      const title = typeof a.title === 'object' ? a.title : { th: a.title };
      const dek = typeof a.dek === 'object' ? a.dek : { th: a.dek || '' };
      const shortDate = RS.formatDate(a.date, { day: 'numeric', month: 'short', year: 'numeric' });
      return `<li class="newsx-item" data-academy="${esc(a.filter || a.academy || '')}">
        <a class="newsx-card" href="${esc(RS.url(`pages/activity.html?id=${encodeURIComponent(a.id)}`))}">
          <span class="newsx-card__media">${a.image ? `<img src="${esc(RS.url(a.image))}" alt="" width="640" height="427" loading="lazy" decoding="async">` : RS.docCover({ title: a.title, date: a.date, academy: a.academy })}</span>
          <span class="newsx-card__body">
            <span class="news-cat works-cat${a.academy ? ` works-cat--${esc(a.academy)}` : ''}"${academy ? ` data-en="${esc(academy.name.en)}"` : ' data-en="Royal Society"'}>${esc(a.cat || (academy ? academy.name.th : 'ราชบัณฑิตยสภา'))}</span>
            <span class="newsx-card__title"${title.en ? ` data-en="${esc(title.en)}"` : ''}>${esc(RS.lang === 'en' && title.en ? title.en : title.th)}</span>
            <span class="newsx-card__dek" data-th-only>${esc(dek.th)}</span>
            <span class="news-card__foot newsx-card__foot">
              <time datetime="${esc(a.date)}">${esc(shortDate)}</time>
              <span class="news-cta"><span>${esc(t({ th: 'อ่านต่อ', en: 'Read' }))}</span><span class="news-cta__dot" aria-hidden="true"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg></span></span>
            </span>
          </span>
        </a>
      </li>`;
    };
    const others = qsa(':scope > li', box).filter(li => !qs('a[href*="activity.html?id="]', li));
    box.innerHTML = records.map(card).join('');
    others.forEach(li => box.appendChild(li));
  }

  /* Documents (laws, bylaws, rules, notices) come from data/documents.js:
     data-works-docs="<list>" names the list; one card per record. */
  const docKey = root.dataset.worksDocs;
  const docs = docKey && window.RS_DOCUMENTS && window.RS_DOCUMENTS[docKey];
  if (Array.isArray(docs)) {
    const esc = RS.escapeHTML;
    const TH = '๐๑๒๓๔๕๖๗๘๙';
    const thDigits = n => String(n).replace(/\d/g, d => TH[d]);
    const ACAD = { moral: 'สำนักธรรมศาสตร์และการเมือง', science: 'สำนักวิทยาศาสตร์', arts: 'สำนักศิลปกรรม' };
    const docCard = d => {
      const meta = [
        d.subject ? `<span class="ann-subject">${esc(d.subject)}</span>` : '',
        d.edition ? esc(d.edition.th) : '',
        d.academy ? `<span class="ann-acad ann-acad--${esc(d.academy)}">${esc(ACAD[d.academy] || '')}</span>` : '',
        d.issuer ? esc(d.issuer) : '',
        d.form ? `<span class="acts-doc__form" data-en="Form">แบบฟอร์ม</span> ${esc(d.form)}` : '',
        d.year ? `พ.ศ. ${thDigits(d.year)}` : '',
        d.lang ? (d.lang === 'en' ? 'ภาษาอังกฤษ' : 'ภาษาไทย') : ''
      ].filter(Boolean).join(' · ') + (d.latest ? ' <span class="acts-doc__new" data-en="Latest">ล่าสุด</span>' : '');
      const metaEn = d.edition ? ` data-en="${esc(`${d.edition.en} · ${d.lang === 'en' ? 'English' : 'Thai'}`)}"` : '';
      const title = d.title || {};
      const nameEn = title.en && title.en !== title.th ? ` data-en="${esc(title.en)}"` : '';
      const cover = d.cover ? ` data-cover-name="${esc(d.cover.name)}" data-cover-sub="${esc(d.cover.sub)}"` : '';
      const href = /^https?:/.test(d.href) ? d.href : RS.url(d.href.replace(/^(\.\.\/)+/, ''));
      return `<li data-academy="${esc(d.group || '')}"${cover}>
        <a class="acts-doc" href="${esc(href)}" target="_blank" rel="noopener"${d.full ? ` aria-label="${esc(d.full)}"` : ''}>
          <span class="acts-doc__body">
            <span class="acts-doc__name"${nameEn}>${esc(title.th || '')}</span>
            <span class="acts-doc__meta"${metaEn}>${meta}</span>
          </span>
          <span class="acts-doc__open"><span data-en="Open PDF">${RS.lang === 'en' ? 'Open PDF' : 'เปิด PDF'}</span><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-external"></use></svg></span>
          <span class="visually-hidden" data-en="(opens in a new tab)">${RS.lang === 'en' ? '(opens in a new tab)' : '(เปิดในแท็บใหม่)'}</span>
        </a>
      </li>`;
    };
    box.innerHTML = docs.map(docCard).join('');
    RS.upgradePdfCards?.(box);
    /* English titles count as English for the English page */
    if (RS.lang === 'en') qsa('.acts-doc__name', box).forEach((el, i) => { if (docs[i].title && docs[i].title.en) el.dataset.en = docs[i].title.en; });
  }

  const ROWS = 'worksRows' in root.dataset;
  const VIEW_KEY = ROWS ? 'rs-works-rows-view' : 'rs-works-view';
  const SIZE_KEY = ROWS ? 'rs-works-rows-size' : 'rs-works-size';
  const SIZES = ROWS ? [12, 24, 48] : [9, 18, 36];
  const L = {
    count: { th: 'พบ {n} รายการ', en: '{n} reports' },
    unit: { th: 'รายการ', en: 'reports' }
  };

  /* English shows English only: an item whose title has no English
     (no data-en, Thai text) leaves the list before it is counted */
  if (RS.lang === 'en') {
    const THAI = /[\u0E00-\u0E7F]/;
    qsa(':scope > li', box).forEach(li => {
      const title = qs('.newsx-card__title, .acts-doc__name', li);
      if (title && !title.dataset.en && THAI.test(title.textContent)) {
        li.remove();
        window.RS_EN_FILTERED = (window.RS_EN_FILTERED || 0) + 1;
      }
    });
    /* nothing in English yet: no tools or empty-search message, the page's
       "published in Thai" note (04-interactions.js) speaks instead */
    if (!qsa(':scope > li', box).length) {
      root.classList.add('works-list--empty-en');
      return;
    }
  }
  const items = qsa(':scope > li', box).map(li => ({
    li,
    academy: li.dataset.academy || '',
    text: li.textContent.replace(/\s+/g, ' ').toLowerCase()
  }));

  /* rows mode: in the grid each document gets a printed cover drawn from
     data, no image per item. The kind (ประกาศ, พระราชบัญญัติ…) comes from
     data-cover-kind on the li or data-works-cover-kind on the list; the
     name from data-cover-name (default ราชบัณฑิตยสภา); the line under the
     rule from data-cover-sub, else the item's tab label. */
  /* data-works-cover-all="template" (the proposals list): every card's
     picture is the shared cover template, named by its tab (สมุดปกขาว,
     ข้อเสนอเชิงนโยบาย…), so a logo, a typed title and a designed panel do
     not sit side by side */
  if (root.dataset.worksCoverAll === 'template' && RS.docCover) {
    const names = {};
    qsa('[data-works-tabs] .news-tab[data-filter]', root).forEach(tab => {
      names[tab.dataset.filter] = (tab.childNodes[0] ? tab.childNodes[0].textContent : tab.textContent).trim();
    });
    const TONES = { whitepaper: 'strategy', policy: 'annual' };
    items.forEach(({ li }) => {
      const media = qs('.newsx-card__media', li);
      if (!media) return;
      const kind = names[li.dataset.academy] || '';
      media.classList.add('newsx-card__media--tpl');
      media.innerHTML = RS.docCover({ kind: { th: kind, en: kind }, when: { th: 'ข้อเสนอต่อรัฐบาล', en: 'Proposals to Government' }, org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' }, tone: TONES[li.dataset.academy] || 'other' });
    });
  }

  if (ROWS) {
    const tabName = {};
    qsa('[data-works-tabs] .news-tab[data-filter]', root).forEach(tab => {
      tabName[tab.dataset.filter] = (tab.childNodes[0] ? tab.childNodes[0].textContent : tab.textContent).trim();
    });
    const crest = RS.url('assets/images/logo-image-160.png');
    items.forEach(({ li }) => {
      const a = qs('.acts-doc', li);
      if (!a || qs('.ann-cover', a)) return;
      const cover = document.createElement('span');
      cover.className = 'ann-cover';
      /* data-works-cover-style="template" (the ITA list): the shared pale
         green cover (RS.docCover) filling the picture area instead of the
         small printed sheet; one tone per tab */
      if (root.dataset.worksCoverStyle === 'template' && RS.docCover) {
        const TONES = ['annual', 'strategy', 'report', 'assess', 'other', 'moral', 'science', 'arts'];
        const keys = Object.keys(tabName).filter(k => k !== 'all');
        const sub = li.dataset.coverSub || tabName[li.dataset.academy] || '';
        cover.classList.add('ann-cover--tpl');
        cover.setAttribute('aria-hidden', 'true');
        cover.innerHTML = RS.docCover({ kind: { th: sub, en: sub }, when: { th: root.dataset.worksCoverWhen || '', en: root.dataset.worksCoverWhenEn || '' }, org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' }, tone: TONES[Math.max(0, keys.indexOf(li.dataset.academy)) % TONES.length] });
        a.prepend(cover);
        return;
      }
      cover.setAttribute('aria-hidden', 'true');
      cover.innerHTML = `<span class="ann-cover__sheet"><img src="${crest}" alt="" width="40" height="40" loading="lazy"><span class="ann-cover__kind"></span><span class="ann-cover__org"></span><span class="ann-cover__rule"></span><span class="ann-cover__subject"></span></span>`;
      qs('.ann-cover__kind', cover).textContent = li.dataset.coverKind || root.dataset.worksCoverKind || '';
      qs('.ann-cover__org', cover).textContent = li.dataset.coverName || root.dataset.worksCoverName || 'ราชบัณฑิตยสภา';
      qs('.ann-cover__subject', cover).textContent = li.dataset.coverSub || tabName[li.dataset.academy] || '';
      a.prepend(cover);
    });
  }

  let filter = 'all';
  let query = '';
  let page = 1;
  let view = ROWS ? 'list' : 'grid';
  try { const saved = localStorage.getItem(VIEW_KEY); if (saved === 'list' || saved === 'grid') view = saved; } catch { /* storage unavailable */ }
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
    if (ROWS) box.classList.toggle('is-grid', view === 'grid');
    else box.className = `newsx-items newsx-items--${view} works-list__items`;

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
    /* ?academy=moral|science|arts opens on that academy's tab (the sitemap's
       "ราชบัณฑิตสัญจร สำนัก…" links) */
    const asked = new URLSearchParams(location.search).get('academy');
    if (asked && qs(`[data-works-tabs] .news-tab[data-filter="${CSS.escape(asked)}"]`, root)) filter = asked;
    if (filter !== 'all') setFilter(filter);
    setView(view);
  });
})();
