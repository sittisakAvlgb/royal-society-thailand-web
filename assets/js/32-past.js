/* ============================================================================
 * 32-past.js — รายพระนามและรายนามผู้วายชนม์ (pages/fellows-past.html)
 * ============================================================================
 *  One numbered roll per group from data/fellows-past.js, in the book's
 *  order and numbering. A name the site holds a profile for links to it.
 *  The group tabs above the roll jump to each group.
 * ========================================================================== */
(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-past-roll]');
  const GROUPS = window.RS_FELLOWS_PAST || [];
  if (!RS || !root || !GROUPS.length) return;

  const { te, escapeHTML } = RS;
  const num = n => (RS.lang === 'en' ? String(n) : RS.digits(String(n)));
  const href = id => RS.url(`pages/fellow.html?id=${encodeURIComponent(id)}`);

  const nav = document.querySelector('[data-past-nav]');
  if (nav) {
    nav.innerHTML = GROUPS.map(g => `
      <li><a href="#past-${escapeHTML(g.id)}">${te(g.title)} <span class="past-roll__n">${num(g.people.length)}</span></a></li>`).join('');
  }

  /* English pages show no Thai: the names exist only as the book prints
     them, so each group gives its count and points to the Thai page */
  if (RS.lang === 'en') {
    const thai = escapeHTML(RS.url('pages/fellows-past.html?lang=th'));
    root.innerHTML = GROUPS.map(g => `
    <section class="past-roll__group" id="past-${escapeHTML(g.id)}" aria-labelledby="past-${escapeHTML(g.id)}-title">
      <h3 class="past-roll__title" id="past-${escapeHTML(g.id)}-title">${te(g.title)}<span class="past-roll__count">${num(g.people.length)}</span></h3>
    </section>`).join('') + `
    <p class="past-roll__note">The names are listed as printed in the directory, in Thai. <a href="${thai}">See the names on the Thai page</a>.</p>`;
    return;
  }

  root.innerHTML = GROUPS.map(g => `
    <section class="past-roll__group" id="past-${escapeHTML(g.id)}" aria-labelledby="past-${escapeHTML(g.id)}-title">
      <h3 class="past-roll__title" id="past-${escapeHTML(g.id)}-title">${te(g.title)}<span class="past-roll__count">${num(g.people.length)}</span></h3>
      <ol class="past-roll__list" role="list">${g.people.map((p, i) => `
        <li><span class="past-roll__no">${num(i + 1)}.</span>${p.id
          ? `<a class="past-roll__name" href="${escapeHTML(href(p.id))}">${escapeHTML(p.name)}</a>`
          : `<span class="past-roll__name">${escapeHTML(p.name)}</span>`}</li>`).join('')}
      </ol>
    </section>`).join('');
})();
