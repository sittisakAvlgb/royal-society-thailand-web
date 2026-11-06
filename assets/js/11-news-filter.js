/* ============================================================================
 * 11-news-filter.js — Home news: filter the card grid by category
 * ============================================================================
 *
 *  markup (index.html):
 *    [data-news-filter]  the tab group; each tab has data-filter="all|<category>"
 *    .news-cards > li[data-category]   the cards to show / hide
 *
 *  The featured story stays in view; only the card grid is filtered.
 * ========================================================================== */

(() => {
  'use strict';

  const group = document.querySelector('[data-news-filter]');
  const grid = document.querySelector('.news-cards');
  if (!group || !grid) return;

  const tabs = Array.from(group.querySelectorAll('[data-filter]'));
  const cards = Array.from(grid.querySelectorAll('[data-category]'));

  function apply(filter) {
    tabs.forEach(tab => {
      const on = tab.dataset.filter === filter;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-pressed', String(on));
    });
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) {                       /* replay the fade-in so the change reads */
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
      }
    });
  }

  group.addEventListener('click', event => {
    const tab = event.target.closest('[data-filter]');
    if (tab) apply(tab.dataset.filter);
  });
})();
