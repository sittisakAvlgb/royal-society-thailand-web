/* ============================================================================
 * 14-about.js — the About page (pages/about.html)
 *  - the three academies as photo cards (the same cards the academy pages
 *    use for "other academies"), each with its own photo or its latest
 *    news photo from data/academies.js
 *  - the sticky "on this page" index marks the part being read
 * ========================================================================== */
(() => {
  'use strict';

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
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

  function initToc(root) {
    const links = qsa('[data-about-toc] a', root);
    const parts = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    if (!('IntersectionObserver' in window) || !parts.length) return;
    const list = qs('[data-about-toc]', root);
    const mark = id => links.forEach(link => {
      if (link.hash !== `#${id}`) { link.removeAttribute('aria-current'); return; }
      link.setAttribute('aria-current', 'true');
      /* on phones the index is a sideways row: keep the current one in view */
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: link.offsetLeft - 16, behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
      }
    });
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) mark(visible.target.id);
    }, { rootMargin: '-30% 0px -60% 0px' });
    parts.forEach(part => observer.observe(part));
    mark(parts[0].id);
  }

  RS.ready(() => {
    const root = qs('.about-page');
    if (!root) return;
    renderAcademies(root);
    initToc(root);
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
