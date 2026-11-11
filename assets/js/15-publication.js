/* ============================================================================
 * 15-publication.js — Publication page (pages/publication.html?id=<id>)
 * ============================================================================
 *
 *  One template for every item in RS_PUBLICATIONS (data/publications.js). An
 *  unknown or missing id shows the newest publication. Fills the record
 *  (cover, kind, title, issue, facts, download), the summary, a printed
 *  contents page, the citation in two styles, and a shelf of other covers.
 *  Covers are typeset here until the Office supplies scans: the crest, the
 *  series, the title and the issue on a stock coloured by the kind.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-publication]');
  const PUBS = window.RS_PUBLICATIONS || [];
  if (!RS || !root || !PUBS.length) return;

  const { qs, t, te, escapeHTML } = RS;
  const KINDS = window.RS_PUB_KINDS || {};

  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    editor: { th: 'บรรณาธิการ / ผู้จัดทำ', en: 'Editor' },
    publisher: { th: 'จัดพิมพ์โดย', en: 'Publisher' },
    year: { th: 'ปีที่พิมพ์', en: 'Published' },
    pages: { th: 'จำนวนหน้า', en: 'Pages' },
    pagesN: { th: '{n} หน้า', en: '{n} pages' },
    lang: { th: 'ภาษา', en: 'Language' },
    download: { th: 'ดาวน์โหลด PDF', en: 'Download PDF' },
    readFull: { th: 'อ่านฉบับเต็ม', en: 'Read the full issue' },
    newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' },
    page: { th: 'หน้า', en: 'p.' }
  };

  const list = [...PUBS].sort((a, b) => b.date.localeCompare(a.date));
  const requested = new URLSearchParams(location.search).get('id');
  const pub = list.find(item => item.id === requested) || list[0];

  const link = item => escapeHTML(RS.url(`pages/publication.html?id=${encodeURIComponent(item.id)}`));
  const set = (selector, html) => { const el = qs(selector, root); if (el) el.innerHTML = html; };
  const num = n => escapeHTML(RS.digits(String(n)));
  const year = iso => RS.formatDate(iso, { year: 'numeric' });

  /* keep Thai phrases whole when a title wraps (see 13-news-detail.js) */
  const phrases = text => String(text).split(' ').map(part => `<span class="story__ph">${escapeHTML(part)}</span>`).join(' ');

  /* covers come from 07-pub-cover.js */
  const cover = item => RS.pubCover(item);
  const SERIES = window.RS_SERIES || [];
  const seriesOf = item => SERIES.find(s => s.id === item.seriesId || (s.fromKind && s.fromKind === item.kind));

  function renderRecord() {
    document.title = `${t(pub.title)} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', `${t(pub.title)} — ${t(pub.issue)}`);
    set('[data-pub-crumb]', te(pub.title));
    /* the series as a step in the path */
    const series = seriesOf(pub);
    const crumbSeries = qs('[data-pub-crumb-series]', root);
    if (crumbSeries && series) {
      crumbSeries.hidden = false;
      crumbSeries.innerHTML = `<a href="${escapeHTML(RS.url(`pages/series.html?id=${series.id}`))}">${te(series.title)}</a>`;
    }
    set('[data-pub-cover]', cover(pub));
    set('[data-pub-kind]', te(KINDS[pub.kind]));
    const time = qs('[data-pub-date]', root);
    if (time) { time.dateTime = pub.date; time.textContent = RS.formatDate(pub.date, { day: 'numeric', month: 'long', year: 'numeric' }); }
    set('[data-pub-title]', phrases(t(pub.title)));
    set('[data-pub-issue]', te(pub.issue));
    const facts = [
      pub.editor && [L.editor, te(pub.editor)],
      pub.publisher && [L.publisher, te(pub.publisher)],
      [L.year, escapeHTML(year(pub.date))],
      pub.pages && [L.pages, escapeHTML(RS.digits(t(L.pagesN).replace('{n}', pub.pages)))],
      pub.lang && [L.lang, te(pub.lang)]
    ].filter(Boolean);
    set('[data-pub-facts]', facts.map(([label, value]) => `
      <div class="pub-facts__row"><dt>${te(label)}</dt><dd>${value}</dd></div>`).join(''));
    /* a real issue's PDF opens the original file; an issue published as a
       web page opens our own document page (data/docs.js); samples keep a
       PDF slot */
    const btn = qs('[data-pub-download]', root);
    if (pub.link && btn && pub.linkKind === 'pdf') {
      /* a PDF still opens the original file, in a new tab */
      btn.href = pub.link;
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.removeAttribute('download');
      btn.querySelector('use')?.setAttribute('href', '#i-download');
      set('[data-pub-download-label]', `${te(L.download)}<span class="visually-hidden"> ${te(L.newTab)}</span>`);
    } else if (pub.link && btn) {
      btn.href = RS.url(`pages/document.html?id=pub-${encodeURIComponent(pub.id)}`);
      btn.removeAttribute('target');
      btn.removeAttribute('rel');
      btn.removeAttribute('download');
      btn.querySelector('use')?.setAttribute('href', '#i-arrow');
      set('[data-pub-download-label]', te(L.readFull));
    } else {
      /* TODO (Office): link the PDF */
      set('[data-pub-download-label]', `${te(L.download)} <span class="pub-actions__size" data-keep-digits>${escapeHTML(pub.size || '')}</span>`);
    }
  }

  function renderBody() {
    /* summaries are authored HTML from data/publications.js (trusted content) */
    set('[data-pub-summary]', (pub.summary || []).join(''));
    const box = qs('[data-pub-contents]', root);
    if (box && pub.contents?.length) {
      box.hidden = false;
      set('[data-pub-toc]', pub.contents.map((entry, i) => `
        <li class="pub-toc__entry">
          <span class="pub-toc__num" aria-hidden="true">${num(i + 1)}</span>
          <span class="pub-toc__text">
            <span class="pub-toc__title">${te(entry.title)}</span>
            ${entry.authors ? `<span class="pub-toc__authors">${te(entry.authors)}</span>` : ''}
          </span>
          <span class="pub-toc__dots" aria-hidden="true"></span>
          <span class="pub-toc__page"><span class="visually-hidden">${te(L.page)} </span>${num(entry.page)}</span>
        </li>`).join(''));
    }
  }

  /* Citations in Thai bibliographic style (Buddhist era) */
  function renderCitation() {
    const th = v => v?.th || '';
    const be = String(Number(pub.date.slice(0, 4)) + 543);
    const url = `https://royalsociety.go.th/pages/publication.html?id=${pub.id}`;
    const apa = `${escapeHTML(th(pub.editor))}. (${be}). <i>${escapeHTML(th(pub.title))}</i>. ${escapeHTML(th(pub.publisher))}.`;
    const chicago = `${escapeHTML(th(pub.editor))}. <i>${escapeHTML(th(pub.title))}</i>. กรุงเทพฯ: ${escapeHTML(th(pub.publisher))}, ${be}.`;
    /* the web address keeps Latin digits */
    set('[data-pub-cite="apa"]', `${RS.digits(apa)} <span data-keep-digits>${escapeHTML(url)}</span>`);
    set('[data-pub-cite="chicago"]', RS.digits(chicago));
  }

  function renderShelf() {
    const mine = seriesOf(pub);
    const others = list.filter(item => item !== pub);
    const same = others.filter(item => seriesOf(item) === mine);
    const picks = [...same, ...others.filter(item => seriesOf(item) !== mine)].slice(0, 5);
    const more = qs('#pub-more-title', root);
    if (more && mine && same.length) more.innerHTML = `${te({ th: 'ฉบับอื่นใน', en: 'More from' })} ${te(mine.title)}`;
    set('[data-pub-more]', picks.map(item => `
      <li>
        <a class="pub-shelf__item" href="${link(item)}">
          ${cover(item)}
          <span class="pub-shelf__kind">${te(KINDS[item.kind])}</span>
          <span class="pub-shelf__title">${te(item.title)}</span>
          <time class="pub-shelf__date" datetime="${escapeHTML(item.date)}">${escapeHTML(RS.formatDate(item.date))}</time>
        </a>
      </li>`).join(''));
  }

  RS.ready(() => {
    renderRecord();
    renderBody();
    renderCitation();
    renderShelf();
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
