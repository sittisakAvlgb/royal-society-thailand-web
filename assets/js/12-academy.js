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
    upcoming: { th: 'กำลังจะมาถึง', en: 'Coming up' },
    readMore: { th: 'อ่านต่อ', en: 'Read more' },
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
    set('[data-acad-fields]', (t(academy.tags) || []).map(escapeHTML).join(' · '));
    const site = qs('[data-acad-site]', root);
    if (site) { if (academy.site) site.href = academy.site; else site.hidden = true; }
    const photo = qs('[data-acad-photo]', root);
    if (photo && page.photo) photo.src = RS.url(page.photo);

    set('[data-acad-switch]', CFG.academies.map(item => `
      <li><a href="${href(`pages/academy.html?id=${item.id}`)}" data-academy="${item.id}"${item === academy ? ' aria-current="page"' : ''}>${te(item.name)}</a></li>`).join(''));
  }

  /* ---- about: intro and the academy's fields, set like a contents page ---- */
  function renderAbout() {
    set('[data-acad-intro]', te(page.intro || academy.fields));
    set('[data-acad-field-list]', (t(academy.tags) || []).map((tag, i) => `
      <li><span class="acad-fields__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${escapeHTML(tag)}</span></li>`).join(''));
  }

  /* ---- news and activities: the newest as the lead, the rest beside it ---- */
  const postMeta = post => `
    <span class="acad-post__meta"><span class="acad-post__cat" data-cat="${escapeHTML(post.cat)}">${te(CATS[post.cat])}</span><time datetime="${escapeHTML(post.date)}">${date(post.date)}</time></span>`;

  function renderPosts(filter = 'all') {
    const posts = (page.posts || [])
      .filter(post => filter === 'all' || post.cat === filter)
      .sort((a, b) => b.date.localeCompare(a.date));
    if (!posts.length) { set('[data-acad-posts]', `<p class="cal-empty">${icon('info')}<span>${te(L.noPosts)}</span></p>`); return; }
    const [lead, ...rest] = posts;
    set('[data-acad-posts]', `
      <article class="acad-post acad-post--lead">
        <a href="${href(lead.href)}">
          <span class="acad-post__media"><img src="${href(lead.image)}" alt="" width="1200" height="800" loading="lazy" decoding="async"></span>
          <span class="acad-post__body">
            ${postMeta(lead)}
            <span class="acad-post__title">${te(lead.title)}</span>
            <span class="acad-post__excerpt">${te(lead.excerpt)}</span>
            <span class="link-arrow"><span>${te(L.readMore)}</span>${icon('arrow')}</span>
          </span>
        </a>
      </article>
      ${rest.length ? `<ul class="acad-post-list" role="list">${rest.map(post => `
        <li class="acad-post">
          <a href="${href(post.href)}">
            <span class="acad-post__media"><img src="${href(post.image)}" alt="" width="800" height="600" loading="lazy" decoding="async"></span>
            <span class="acad-post__body">${postMeta(post)}<span class="acad-post__title">${te(post.title)}</span></span>
          </a>
        </li>`).join('')}</ul>` : ''}`);
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
  const ledgerRow = (index, item) => {
    const external = RS.isExternal(item.href);
    return `
      <li class="ledger-row">
        <a href="${href(item.href)}"${external ? ' target="_blank" rel="noopener"' : ''}>
          <span class="ledger-row__num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <span class="ledger-row__body">
            ${item.flag ? `<span class="ledger-row__flag">${te(item.flag)}</span>` : ''}
            <span class="ledger-row__title">${te(item.title)}${external ? `<span class="visually-hidden"> ${te(L.external)}</span>` : ''}</span>
            <span class="ledger-row__meta">${item.meta}</span>
          </span>
          ${item.date ? `<span class="ledger-row__date">${date(item.date)}</span>` : ''}
        </a>
      </li>`;
  };

  function renderLectures() {
    const lectures = [...(page.lectures || [])].sort((a, b) => b.date.localeCompare(a.date));
    set('[data-acad-lectures]', lectures.map((lecture, i) => ledgerRow(i, {
      href: lecture.href, title: lecture.title, date: lecture.date,
      flag: lecture.date >= today ? L.upcoming : null,
      meta: `${te(lecture.speaker)} · ${te(lecture.place)}`
    })).join(''));
  }

  function renderWorks() {
    const works = INDEX.filter(record => record.academy === academy.id)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 5);
    set('[data-acad-works]', works.length
      ? works.map((record, i) => ledgerRow(i, {
        href: record.href, title: record.title, date: record.date,
        meta: te(TYPES[record.type]?.label) + (record.source ? ` · ${te(record.source)}` : '')
      })).join('')
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
    set('[data-acad-links]', links.map(link => `
      <li><a href="${href(link.href)}"${link.external ? ' target="_blank" rel="noopener"' : ''}>
        <span>${te(link.label)}${link.external ? `<span class="visually-hidden"> ${te(L.external)}</span>` : ''}</span>${icon(link.external ? 'external' : 'arrow')}
      </a></li>`).join(''));
    set('[data-acad-others]', CFG.academies.filter(item => item !== academy).map(item => `
      <li data-academy="${item.id}">
        <a href="${href(`pages/academy.html?id=${item.id}`)}">
          <span class="acad-others__name">${te(item.name)}</span>
          <span class="acad-others__fields">${(t(item.tags) || []).map(escapeHTML).join(' · ')}</span>
          <span class="acad-others__go" aria-hidden="true">${icon('arrow')}</span>
        </a>
      </li>`).join(''));
  }

  /* ---- hand the academy to the shared Fellows track and calendar ---- */
  function tagShared() {
    const track = qs('[data-fellows-preview]', root);
    if (track) track.dataset.fellowsAcademy = academy.id;
    const tearoff = qs('[data-acad-tearoff]', root);
    if (tearoff) tearoff.dataset.tearoffAcademy = academy.id;
    const more = qs('[data-acad-fellows-more]', root);
    if (more) more.href = RS.url(`pages/fellows.html?academy=${academy.id}#fellow-directory`);
  }

  /* ---- in-page menu: mark the section being read ---- */
  function initNav() {
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
    renderPosts();
    initPostFilter();
    renderLectures();
    renderWorks();
    renderFoot();
    tagShared();
    initNav();
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
