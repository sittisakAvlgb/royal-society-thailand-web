/* ============================================================================
 * 20-activity.js — One report of an academic activity (pages/activity.html?id=)
 * ============================================================================
 *
 *  Fills the story template from RS_ACTIVITIES (data/activities.js): the
 *  series in the breadcrumb, the academy, date, title and photograph; the
 *  summary as the text, with the full report to follow from the Office;
 *  then more reports from the same series. Nothing here links to the
 *  site the report first appeared on.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-activity]');
  const ALL = (window.RS_ACTIVITIES || []).slice();
  if (!RS || !root) return;

  const { qs, t, te, escapeHTML } = RS;
  const SERIES = {
    'on-tour': { th: 'ราชบัณฑิตสัญจร', en: 'Fellows on Tour', href: 'pages/works-on-tour.html' },
    'ideas-forum': { th: 'อาศรมความคิด', en: 'Think Tank Forum', href: 'pages/works-ideas-forum.html' },
    lectures: { th: 'การบรรยายและเสวนาวิชาการ', en: 'Lectures and Academic Seminars', href: 'pages/works-lectures.html' },
    proposals: { th: 'ข้อเสนอต่อรัฐบาล', en: 'Proposals to Government', href: 'pages/works-proposals.html' },
    knowledge: { th: 'โครงการนำความรู้สู่สังคม', en: 'Knowledge for Society Programme', href: 'pages/works-knowledge-to-society.html' }
  };
  /* an academy's own news (data/academies.js) opens here too, under that academy */
  const ACADEMIES = (window.RS_CONFIG && window.RS_CONFIG.academies) || [];
  const STAND_INS = ['assets/images/news/news-01.jpg', 'assets/images/news/news-02.jpg', 'assets/images/news/news-03.jpg', 'assets/images/news/news-04.jpg', 'assets/images/news/news-05.jpg', 'assets/images/news/news-06.jpg'];
  const OLD_SITE = /^https?:\/\/(?:[a-z]+\.)?(?:royalsociety\.go\.th|orst\.go\.th)\//i;
  Object.entries(window.RS_ACADEMY_PAGES || {}).forEach(([key, page]) => {
    const academy = ACADEMIES.find(a => a.id === key);
    if (!academy) return;
    SERIES[`academy-${key}`] = { ...academy.name, href: `pages/academy.html?id=${key}` };
    (page.posts || []).forEach((post, i) => {
      if (ALL.some(a => a.id === post.id)) return;
      ALL.push({
        id: post.id, series: `academy-${key}`, academy: key, cat: academy.name.th,
        title: post.title.th, dek: post.excerpt ? post.excerpt.th : '', date: post.date,
        image: OLD_SITE.test(post.image || '') ? STAND_INS[i % STAND_INS.length] : post.image
      });
    });
  });
  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    pending: { th: 'รายงานฉบับเต็ม ภาพกิจกรรม และเอกสารประกอบ อยู่ระหว่างนำเข้าสู่เว็บไซต์', en: 'The full report, photographs and documents are being added to the website.' },
    more: { th: 'รายงานอื่นใน{s}', en: 'More from {s}' },
    all: { th: 'ดูทั้งหมด', en: 'View all' },
    read: { th: 'อ่านต่อ', en: 'Read' },
    notFound: { th: 'ไม่พบรายงานนี้', en: 'Report not found' },
    back: { th: 'กลับไปหน้ากิจกรรม', en: 'Back to the activities' }
  };

  const set = (sel, value) => { const el = qs(sel, root); if (el) el.innerHTML = value; };
  const date = iso => RS.formatDate(iso, { day: 'numeric', month: 'short', year: 'numeric' });
  /* a summary cut off where it was published ends at a whole word, with "…" */
  const tidy = dek => {
    const s = (dek || '').trim();
    if (!s || /[.!?”")ๆ]$/.test(s)) return s;
    const cut = s.lastIndexOf(' ');
    return `${cut > 40 ? s.slice(0, cut) : s}…`;
  };
  const link = item => escapeHTML(RS.url(`pages/activity.html?id=${encodeURIComponent(item.id)}`));

  const item = ALL.find(a => a.id === new URLSearchParams(location.search).get('id'));

  RS.ready(() => {
    if (!item) {
      set('[data-activity-article]', `
        <div class="container">
          <div class="newsx-empty fellowp-missing">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-search"></use></svg>
            <span><strong>${te(L.notFound)}</strong></span>
            <a class="btn btn--secondary btn--sm" href="${escapeHTML(RS.url('pages/works-on-tour.html'))}">${te(L.back)}</a>
          </div>
        </div>`);
      qs('[data-activity-more]', root)?.closest('section')?.remove();
      return;
    }

    const series = SERIES[item.series] || SERIES['on-tour'];
    document.title = `${item.title} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', tidy(item.dek) || item.title);

    const crumb = qs('[data-activity-series]', root);
    if (crumb) { crumb.href = RS.url(series.href); crumb.textContent = t(series); }
    set('[data-activity-crumb]', escapeHTML(item.title));
    set('[data-activity-cat]', `<span class="works-cat${item.academy ? ` works-cat--${item.academy}` : ''}">${escapeHTML(item.cat)}</span>`);
    const time = qs('[data-activity-date]', root);
    if (time) { time.dateTime = item.date; time.textContent = date(item.date); }
    set('[data-activity-title]', item.title.split(' ').map(part => `<span class="story__ph">${escapeHTML(part)}</span>`).join(' '));
    set('[data-activity-by]', escapeHTML(item.cat));
    const img = qs('[data-activity-img]', root);
    if (img) img.src = RS.url(item.image);

    const summary = tidy(item.dek);
    set('[data-activity-body]', `
      ${summary ? `<p>${escapeHTML(summary)}</p>` : ''}
      <p class="activity-pending">${te(L.pending)}</p>`);

    /* more from the series: the nearest in time first */
    const more = ALL.filter(a => a.series === item.series && a !== item)
      .sort((a, b) => Math.abs(new Date(a.date) - new Date(item.date)) - Math.abs(new Date(b.date) - new Date(item.date)))
      .slice(0, 4);
    set('[data-activity-more-title]', escapeHTML(t(L.more).replace('{s}', t(series))));
    const all = qs('[data-activity-all]', root);
    if (all) all.href = RS.url(series.href);
    set('[data-activity-more]', more.map(a => `
      <li class="newsx-item">
        <a class="newsx-card" href="${link(a)}">
          <span class="newsx-card__media"><img src="${escapeHTML(RS.url(a.image))}" alt="" width="640" height="427" loading="lazy" decoding="async"></span>
          <span class="newsx-card__body">
            <span class="news-cat works-cat${a.academy ? ` works-cat--${a.academy}` : ''}">${escapeHTML(a.cat)}</span>
            <span class="newsx-card__title">${escapeHTML(a.title)}</span>
            <span class="news-card__foot newsx-card__foot">
              <time datetime="${escapeHTML(a.date)}">${date(a.date)}</time>
              <span class="news-cta"><span>${te(L.read)}</span><span class="news-cta__dot" aria-hidden="true"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg></span></span>
            </span>
          </span>
        </a>
      </li>`).join(''));
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
