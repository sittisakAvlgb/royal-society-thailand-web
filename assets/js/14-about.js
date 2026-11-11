/* ============================================================================
 * 14-about.js — the About hub (pages/about.html) and its topic pages
 *  (pages/about-*.html)
 *  - the three academies as photo cards (the same cards the academy pages
 *    use for "other academies"), each with its own photo or its latest
 *    news photo from data/academies.js
 *  - old in-page links (about.html#history …) open the topic's own page
 * ========================================================================== */
(() => {
  'use strict';

  const { qs, t, te, icon, escapeHTML } = RS;
  const CFG = window.RS_CONFIG || {};
  const PAGES = window.RS_ACADEMY_PAGES || {};
  const other = RS.lang === 'th' ? 'en' : 'th';
  const href = path => escapeHTML(RS.url(path));

  function renderAcademies(root) {
    const list = qs('[data-about-academies]', root);
    if (!list) return;
    const photoOf = id => {
      const data = PAGES[id] || {};
      const post = (data.posts || []).find(item => item.external && /^https?:.*\.jpe?g$/i.test(item.image));
      return data.photo || post?.image || 'assets/images/about/about-office.jpg';
    };
    list.innerHTML = (CFG.academies || []).map((item, i) => `
      <li class="acad-next__item reveal reveal--delay-${i + 1}" data-academy="${item.id}">
        <a href="${href(`pages/academy.html?id=${item.id}`)}">
          <span class="acad-next__media">
            <img src="${href(photoOf(item.id))}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"
                 onerror="this.onerror=null;this.src='${href('assets/images/about/about-office.jpg')}'">
          </span>
          <span class="acad-next__caption">
            <span class="acad-next__name">${te(item.name)}</span>
            <span class="acad-next__alt">${escapeHTML(item.name[other])}</span>
          </span>
          <span class="acad-next__fields">${(t(item.tags) || []).map(escapeHTML).join(' · ')}</span>
          <span class="acad-next__go" aria-hidden="true">${icon('arrow')}</span>
        </a>
      </li>`).join('');
  }

  /* Each topic used to be a part of this page: old links such as
     about.html#history now open the topic's own page */
  const MOVED = {
    history: 'history', authority: 'authority', direction: 'direction', structure: 'structure',
    'current-executives': 'executives', 'past-presidents': 'past-presidents', 'president-message': 'president-message',
    acts: 'acts', bylaws: 'bylaws', rules: 'rules', announcements: 'announcements'
  };
  function redirectOldLinks() {
    const topic = MOVED[location.hash.slice(1)];
    if (!topic || !/about\.html$/.test(location.pathname)) return false;
    location.replace(RS.url(`pages/about-${topic}.html`));
    return true;
  }

  RS.ready(() => {
    const root = qs('.about-page');
    if (!root) return;
    if (redirectOldLinks()) return;
    renderAcademies(root);
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
