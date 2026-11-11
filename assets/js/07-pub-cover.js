/* ============================================================================
 * 07-pub-cover.js — Typeset publication covers (RS.pubCover)
 * ============================================================================
 *
 *  Shared by pages/publication.html and pages/series.html until the Office
 *  supplies scanned covers: the crest, the kind, the series or title, a rule,
 *  the issue and the organisation, on a stock coloured by the kind (CSS
 *  .pub-cover--<kind>). Thai publications are set in Thai; items with
 *  coverLang: 'en' (The Journal, the English newsletter) are set in English.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  if (!RS) return;
  const { escapeHTML } = RS;

  const KINDS_EN = { journal: 'Journal', whitepaper: 'White paper', report: 'Annual report', newsletter: 'Newsletter', bulletin: 'Bulletin' };
  const MAIN = { journal: 'series', newsletter: 'series', bulletin: 'series', whitepaper: 'title', report: 'title' };

  /* keep Thai phrases whole when a title wraps */
  const phrases = text => String(text).split(' ').map(part => `<span class="story__ph">${escapeHTML(part)}</span>`).join(' ');

  RS.pubCover = item => {
    const kinds = window.RS_PUB_KINDS || {};
    const en = item.coverLang === 'en';
    const main = (MAIN[item.kind] === 'series' ? item.series : item.title) || {};
    const org = en ? (String(main.en || '').includes('Institute') ? 'The Royal Institute of Thailand' : 'The Royal Society of Thailand') : 'ราชบัณฑิตยสภา';
    return `
      <span class="pub-cover pub-cover--${escapeHTML(item.kind)}${en ? ' pub-cover--en' : ''}" lang="${en ? 'en' : 'th'}" aria-hidden="true">
        <img class="pub-cover__crest" src="${escapeHTML(RS.url('assets/images/logo-image-160.png'))}" alt="" width="80" height="80" loading="lazy">
        <span class="pub-cover__kind">${escapeHTML(en ? KINDS_EN[item.kind] || '' : kinds[item.kind]?.th || '')}</span>
        <span class="pub-cover__title">${phrases(en ? main.en : main.th)}</span>
        <span class="pub-cover__rule"></span>
        <span class="pub-cover__issue">${escapeHTML(en ? item.issue.en : item.issue.th)}</span>
        <span class="pub-cover__org">${escapeHTML(org)}</span>
      </span>`;
  };
})();
