/* ============================================================================
 * 12-academy.js — Academy page (pages/academy.html?id=moral|science|arts)
 * ============================================================================
 *
 *  One template serves all three academies; the name, fields and website come
 *  from RS_CONFIG.academies, the rest from RS_ACADEMY_PAGES (data/academies.js).
 *  It runs before 08-directory.js and 09-calendar.js, so it only has to tag
 *  the Fellows track and the tear-off calendar with the academy for them to
 *  render that academy's people and events.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const CFG = window.RS_CONFIG;
  const root = document.querySelector('[data-academy-page]');
  if (!RS || !CFG || !root) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const PAGES = window.RS_ACADEMY_PAGES || {};
  const CATS = window.RS_POST_CATS || {};
  const INDEX = window.RS_SEARCH_INDEX || [];
  const TYPES = window.RS_SEARCH_TYPES || {};

  const L = {
    site: { th: 'สำนัก', en: 'Academy' },
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    noPosts: { th: 'ยังไม่มีรายการในหมวดนี้', en: 'Nothing in this category yet' },
    noWorks: { th: 'ยังไม่มีผลงานที่เผยแพร่', en: 'No published works yet' },
    noFellows: { th: 'ยังไม่มีรายชื่อ', en: 'No members listed yet' },
    upcoming: { th: 'กำลังจะมาถึง', en: 'Coming up' },
    inDays: { th: 'อีก {n} วัน', en: 'in {n} days' },
    today: { th: 'วันนี้', en: 'Today' },
    past: { th: 'บรรยายแล้ว', en: 'Held' },
    readMore: { th: 'อ่านต่อ', en: 'Read more' },
    visit: { th: 'ไปที่หน้าสำนัก', en: 'Go to the academy' },
    external: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' }
  };

  /* An unknown id falls back to the first academy rather than an empty page */
  const requested = new URLSearchParams(location.search).get('id');
  const academy = CFG.academies.find(item => item.id === requested) || CFG.academies[0];
  const page = PAGES[academy.id] || {};
  const other = RS.lang === 'th' ? 'en' : 'th';
  const today = new Date().toISOString().slice(0, 10);

  const href = path => escapeHTML(RS.url(path));
  const date = iso => escapeHTML(RS.formatDate(iso));
  const set = (selector, html) => { const el = qs(selector, root); if (el) el.innerHTML = html; };

  /* ---- masthead ---- */
  function renderMast() {
    root.dataset.academy = academy.id;               /* --academy-accent for the page */
    document.title = `${t(academy.name)} | ${t(L.org)}`;
    set('[data-acad-crumb]', te(academy.name));
    set('[data-acad-name]', te(academy.name));
    const alt = qs('[data-acad-alt]', root);
    if (alt) { alt.textContent = academy.name[other]; alt.lang = other; }
    set('[data-acad-fields]', (t(academy.tags) || []).map((tag, i) => `<li style="--i:${i}">${escapeHTML(tag)}</li>`).join(''));
    const photo = qs('[data-acad-photo]', root);
    if (photo && page.photo) photo.src = RS.url(page.photo);
  }

  /* ---- about: intro and the academy's fields, set like a contents page ---- */
  function renderAbout() {
    set('[data-acad-intro]', te(page.intro || academy.fields));
    /* The academy's own pages: each row opens that page on its website */
    /* only pages this site holds: rows that pointed at the academy's earlier website are left out */
    set('[data-acad-info]', (page.info || []).filter(item => !OLD_SITE.test(item.href)).map((item, i) => `
      <li class="acad-work__item reveal reveal--delay-${Math.min(i + 1, 4)}">
        <a class="acad-work__link" href="${escapeHTML(href(item.href))}">
          <span class="acad-work__num" aria-hidden="true">${i + 1}</span>
          <span class="acad-work__body">
            <span class="acad-work__name">${te(item.title)}</span>
            <span class="acad-work__text">${te(item.text)}</span>
          </span>
          <span class="acad-work__go" aria-hidden="true">${icon('arrow')}</span>
        </a>
      </li>`).join(''));
  }

  /* ---- news and activities: the newest as the lead, four cards beside it ---- */
  /* Same card as the home news band: the category above the title, and a
     foot with the date on the left and "Read more" on the right */
  const postCat = post => `<span class="acad-post__cat" data-cat="${escapeHTML(post.cat)}">${te(CATS[post.cat])}</span>`;
  const postFoot = post => `
    <span class="acad-post__foot">
      <time datetime="${escapeHTML(post.date)}">${date(post.date)}</time>
      <span class="news-cta"><span>${te(L.readMore)}</span><span class="news-cta__dot" aria-hidden="true">${icon(post.external ? 'external' : 'arrow')}</span></span>
    </span>`;

  /* every post opens on this site (activity.html); a photo kept on an
     academy's earlier website is replaced by a local one */
  const OLD_SITE = /^https?:\/\/(?:[a-z]+\.)?(?:royalsociety\.go\.th|orst\.go\.th)\//i;
  const STAND_INS = ['assets/images/news/news-01.jpg', 'assets/images/news/news-02.jpg', 'assets/images/news/news-03.jpg', 'assets/images/news/news-04.jpg', 'assets/images/news/news-05.jpg', 'assets/images/news/news-06.jpg'];
  const ownPost = (post, i) => ({
    ...post,
    href: OLD_SITE.test(post.href || '') ? `pages/activity.html?id=${encodeURIComponent(post.id)}` : post.href,
    /* a photo kept on the old site, or a PDF's page of text, gives way to a
       printed cover (RS.docCover) rather than an unrelated stock photo */
    image: OLD_SITE.test(post.image || '') || post.cover === 'template' ? '' : post.image,
    external: false
  });

  /* the home news band: one lead post and three beside it, each with its
     summary, date and Read more; View all opens the rest beneath */
  let showAll = false;
  let currentFilter = 'all';
  function renderPosts(filter = currentFilter) {
    currentFilter = filter;
    const posts = (page.posts || []).map(ownPost)
      .filter(post => filter === 'all' || post.cat === filter)
      .sort((a, b) => b.date.localeCompare(a.date));
    const allBtn = qs('[data-acad-posts-all]', root);
    if (!posts.length) { set('[data-acad-posts]', `<p class="cal-empty">${icon('info')}<span>${te(L.noPosts)}</span></p>`); if (allBtn) allBtn.hidden = true; return; }
    const [lead, ...more] = posts;
    const rest = more.slice(0, 3);
    const extra = showAll ? more.slice(3) : [];
    if (allBtn) {
      allBtn.hidden = more.length <= 3;
      allBtn.setAttribute('aria-expanded', String(showAll));
      const label = qs('[data-acad-posts-all-label]', allBtn);
      if (label) label.textContent = showAll ? t({ th: 'แสดงน้อยลง', en: 'Show fewer' }) : `${t({ th: 'ดูทั้งหมด', en: 'View all' })} (${RS.digits(String(posts.length))})`;
      allBtn.classList.toggle('is-open', showAll);
    }
    /* Posts from the academy websites open there, in a new tab */
    const target = post => post.external ? ' target="_blank" rel="noopener"' : '';
    /* Photos come from the academy websites; a local one stands in if one fails */
    const img = (post, w, h) => post.image ? `<img src="${href(post.image)}" alt="" width="${w}" height="${h}" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-fallback="${href('assets/images/news/news-01.jpg')}">` : RS.docCover({ ...post, academy: academy.id });
    const box = qs('[data-acad-posts]', root);
    if (box) box.classList.toggle('acad-posts--single', !rest.length);
    const external = post => post.external ? `<span class="visually-hidden"> ${te(L.external)}</span>` : '';
    const card = post => `
        <li class="acad-post">
          <a href="${href(post.href)}"${target(post)}>
            <span class="acad-post__media">${img(post, 890, 530)}</span>
            <span class="acad-post__body">
              ${postCat(post)}
              <span class="acad-post__title">${te(post.title)}${external(post)}</span>
              ${post.excerpt ? `<span class="acad-post__excerpt">${te(post.excerpt)}</span>` : ''}
              ${postFoot(post)}
            </span>
          </a>
        </li>`;
    set('[data-acad-posts]', `
      <article class="acad-post acad-post--lead">
        <a href="${href(lead.href)}"${target(lead)}>
          <span class="acad-post__media">${img(lead, 890, 530)}</span>
          <span class="acad-post__body">
            ${postCat(lead)}
            <span class="acad-post__title">${te(lead.title)}${external(lead)}</span>
            <span class="acad-post__excerpt">${te(lead.excerpt)}</span>
            ${postFoot(lead)}
          </span>
        </a>
      </article>
      ${rest.length ? `<ul class="acad-post-grid" role="list">${rest.map(card).join('')}</ul>` : ''}
      ${extra.length ? `<ul class="acad-post-grid acad-post-grid--more" role="list">${extra.map(card).join('')}</ul>` : ''}`);
  }

  function initPostsAll() {
    const btn = qs('[data-acad-posts-all]', root);
    if (!btn) return;
    btn.addEventListener('click', () => {
      showAll = !showAll;
      renderPosts();
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: qs('[data-acad-posts]', root) }));
      if (showAll) { const first = qs('.acad-post-grid--more a', root); if (first) first.focus({ preventScroll: true }); }
    });
  }

  /* A photo that fails to load (a post moved on the academy website) falls back */
  function initImageFallback() {
    root.addEventListener('error', event => {
      const img = event.target;
      if (img.tagName !== 'IMG' || !img.dataset.fallback) return;
      const next = img.dataset.fallback;
      delete img.dataset.fallback;                      /* once only */
      img.src = next;
    }, true);
  }

  function initPostFilter() {
    const group = qs('[data-acad-post-filter]', root);
    if (!group) return;
    group.addEventListener('click', event => {
      const tab = event.target.closest('[data-filter]');
      if (!tab) return;
      qsa('[data-filter]', group).forEach(btn => {
        const on = btn === tab;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', String(on));
      });
      renderPosts(tab.dataset.filter);
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: qs('[data-acad-posts]', root) }));
    });
  }

  /* ---- lectures and works: numbered ledgers ---- */

  /* Lectures as a printed programme: the date set large on the left; the next
     one stands out on a cream panel with the days still to go */
  function renderLectures() {
    const lectures = [...(page.lectures || [])].sort((a, b) => b.date.localeCompare(a.date));
    const now = new Date(`${today}T00:00:00`);
    set('[data-acad-lectures]', lectures.map((lecture, i) => {
      const upcoming = lecture.date >= today;
      const days = Math.round((new Date(`${lecture.date}T00:00:00`) - now) / 864e5);
      const when = days === 0 ? te(L.today) : escapeHTML(RS.digits(t(L.inDays).replace('{n}', days)));
      const external = RS.isExternal(lecture.href);
      return `
      <li class="prog-row${upcoming ? ' is-upcoming' : ''} reveal reveal--delay-${Math.min(i + 1, 4)}">
        <a href="${href(lecture.href)}"${external ? ' target="_blank" rel="noopener"' : ''}>
          <span class="prog-row__date">
            <span class="prog-row__day">${escapeHTML(RS.formatDate(lecture.date, { day: 'numeric' }))}</span>
            <span class="prog-row__month">${escapeHTML(RS.formatDate(lecture.date, { month: 'short', year: '2-digit' }))}</span>
          </span>
          <span class="prog-row__body">
            <span class="prog-row__flag">${upcoming ? `${te(L.upcoming)} · ${when}` : te(L.past)}</span>
            <span class="prog-row__title">${te(lecture.title)}</span>
            <span class="prog-row__meta">
              <span>${icon('person')}${te(lecture.speaker)}</span>
              <span>${icon('pin')}${te(lecture.place)}</span>
            </span>
          </span>
          <span class="prog-row__go" aria-hidden="true">${icon('arrow')}</span>
        </a>
      </li>`;
    }).join(''));
  }

  /* Works: each entry carries its kind as a small mark and label */
  function renderWorks() {
    const works = INDEX.filter(record => record.academy === academy.id)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 5);
    set('[data-acad-works]', works.length
      ? works.map((record, i) => {
        const type = TYPES[record.type] || {};
        const external = RS.isExternal(record.href);
        return `
      <li class="work-row reveal reveal--delay-${Math.min(i + 1, 4)}" data-kind="${escapeHTML(record.type)}">
        <a href="${href(record.href)}"${external ? ' target="_blank" rel="noopener"' : ''}>
          <span class="work-row__mark" aria-hidden="true">${icon(type.icon || 'doc')}</span>
          <span class="work-row__body">
            <span class="work-row__kind">${te(type.label)}${record.date ? ` · ${date(record.date)}` : ''}</span>
            <span class="work-row__title">${te(record.title)}${external ? `<span class="visually-hidden"> ${te(L.external)}</span>` : ''}</span>
            ${record.source ? `<span class="work-row__source">${te(record.source)}</span>` : ''}
          </span>
          <span class="work-row__go" aria-hidden="true">${icon(external ? 'external' : 'arrow')}</span>
        </a>
      </li>`;
      }).join('')
      : `<li class="cal-empty">${icon('info')}<span>${te(L.noWorks)}</span></li>`);
    const more = qs('[data-acad-works-more]', root);
    if (more) more.href = RS.url(`pages/search.html?academy=${academy.id}`);
  }

  /* ---- links and the other academies ---- */
  function renderFoot() {
    const links = [
      ...(academy.site ? [{ label: { th: `เว็บไซต์${academy.name.th}`, en: `${academy.name.en} website` }, href: academy.site, external: true }] : []),
      ...(page.links || [])
    ];
    const host = url => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; } };
    /* Set like a printed list of references: numeral, title, a dotted leader
       to the address it opens */
    set('[data-acad-links]', links.map((link, i) => `
      <li class="acad-link reveal reveal--delay-${Math.min(i + 1, 4)}"><a href="${href(link.href)}"${link.external ? ' target="_blank" rel="noopener"' : ''}>
        <span class="acad-link__num" aria-hidden="true">${i + 1}</span>
        <span class="acad-link__label">${te(link.label)}${link.external ? `<span class="visually-hidden"> ${te(L.external)}</span>` : ''}</span>
        <span class="acad-link__dots" aria-hidden="true"></span>
        <span class="acad-link__host" data-keep-digits>${escapeHTML(link.external ? host(link.href) : t(L.org))}</span>
        <span class="acad-link__go" aria-hidden="true">${icon(link.external ? 'external' : 'arrow')}</span>
      </a></li>`).join(''));
    /* Each academy's own photograph if it has one, else the latest photo from
       its news (taken from its website), else the Office building */
    const photoOf = id => {
      const data = PAGES[id] || {};
      /* a photograph (.jpg), not a newsletter page or poster (.png) */
      const post = (data.posts || []).find(item => item.external && /^https?:.*\.jpe?g$/i.test(item.image));
      return data.photo || post?.image || 'assets/images/about/about-office.jpg';
    };
    /* The other two academies as typographic panels (no photographs): the
       academy's number large in its own colour, a hairline, the two names,
       and the way in. photoOf stays for a page that wants pictures back. */
    void photoOf;
    set('[data-acad-others]', CFG.academies.filter(item => item !== academy).map((item, i) => `
      <li class="acad-other reveal reveal--delay-${i + 1}" data-academy="${item.id}">
        <a href="${href(`pages/academy.html?id=${item.id}`)}">
          <span class="acad-other__num" aria-hidden="true">${String(CFG.academies.indexOf(item) + 1).padStart(2, '0')}</span>
          <span class="acad-other__names">
            <span class="acad-other__name">${te(item.name)}</span>
            <span class="acad-other__alt" lang="${other}">${escapeHTML(item.name[other])}</span>
          </span>
          <span class="acad-other__go"><span class="visually-hidden">${te(L.visit)}</span>${icon('arrow')}</span>
        </a>
      </li>`).join(''));
  }

  /* ---- Fellows: a printed roll of members, grouped by membership ---- */
  function renderRoll() {
    const people = (window.RS_FELLOWS || []).filter(person => person.academy === academy.id);
    const types = window.RS_MEMBER_TYPES || {};
    const order = ['honorary', 'fellow', 'associate'];
    const groups = order.map(type => ({ type, people: people.filter(person => person.memberType === type) }))
      .filter(group => group.people.length);
    set('[data-acad-roll]', groups.length ? groups.map((group, g) => `
      <section class="acad-roll__group reveal reveal--delay-${Math.min(g + 1, 4)}">
        <h3 class="acad-roll__head"><span>${te(types[group.type])}</span><span class="acad-roll__count">${escapeHTML(RS.digits(group.people.length))}</span></h3>
        <ol class="acad-roll__list" role="list">${group.people.map(person => `
          <li><a href="${href(`pages/fellow.html?id=${encodeURIComponent(person.id)}`)}">
            <span class="acad-roll__who">
              <span class="acad-roll__title">${te(person.title)}</span>
              <span class="acad-roll__name">${te(person.name)}</span>
            </span>
            <span class="acad-roll__dots" aria-hidden="true"></span>
            <span class="acad-roll__field">${te(person.field)}</span>
            <span class="acad-roll__go" aria-hidden="true">${icon('arrow')}</span>
          </a></li>`).join('')}
        </ol>
      </section>`).join('') : `<p class="cal-empty">${icon('info')}<span>${te(L.noFellows)}</span></p>`);
  }

  /* ---- hand the academy to the shared Fellows track and calendar ---- */
  function tagShared() {
    const track = qs('[data-fellows-preview]', root);
    if (track) track.dataset.fellowsAcademy = academy.id;
    /* the Fellows search: scoped to this academy; its fields become the chips */
    const field = qs('[data-acad-fellow-academy]', root);
    if (field) field.value = academy.id;
    set('[data-acad-fellow-chips]', (t(academy.tags) || []).map(tag =>
      `<a href="${href(`pages/fellows.html?academy=${academy.id}&q=${encodeURIComponent(tag)}`)}">${escapeHTML(tag)}</a>`).join(''));
    const tearoff = qs('[data-acad-tearoff]', root);
    if (tearoff) tearoff.dataset.tearoffAcademy = academy.id;
    const more = qs('[data-acad-fellows-more]', root);
    if (more) more.href = RS.url(`pages/fellows.html?academy=${academy.id}#fellow-directory`);
  }

  /* ---- in-page menu: mark the section being read ---- */
  /* Once the menu sticks under the floating header, it grows a white band
     upward to the top of the window so the page never shows through the
     gap around the header */
  function initStuck() {
    const nav = qs('.acad-nav', root);
    if (!nav) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const top = parseFloat(getComputedStyle(nav).top) || 0;
      nav.classList.toggle('is-stuck', nav.getBoundingClientRect().top <= top + 0.5);
    };
    window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(check); }, { passive: true });
    window.addEventListener('resize', check);
    check();
  }

  function initNav() {
    initStuck();
    const links = qsa('[data-acad-nav] a', root);
    const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;
    const mark = id => links.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) mark(visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  RS.ready(() => {
    renderMast();
    renderAbout();
    initImageFallback();
    renderPosts();
    initPostFilter();
    initPostsAll();
    renderLectures();
    renderWorks();
    renderRoll();          /* no-op unless a [data-acad-roll] is on the page */
    renderFoot();
    tagShared();
    initNav();
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
