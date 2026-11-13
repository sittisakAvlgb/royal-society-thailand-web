/* ============================================================================
 * 25-article.js — one knowledge article (pages/article.html?id=…)
 * ============================================================================
 *  One template for every article in data/knowledge.js: the record gives
 *  the field, kind, date, title and summary; data/knowledge-bodies.js gives
 *  the author, reading time, full text and references. The contents list is
 *  built from the body's h2 headings, the citations from the record, and
 *  the related articles from the same field (newest first).
 *  An unknown or missing id shows the newest article that has a full text.
 *  Runs as soon as it loads (before RS.ready), so the scroll-spy, tabs and
 *  citation copy in 04-interactions.js find the filled page.
 * ========================================================================== */
(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-article]');
  const DATA = window.RS_KNOWLEDGE || { fields: [], items: [] };
  const BODIES = window.RS_KNOWLEDGE_BODIES || {};
  if (!RS || !root || !DATA.items.length) return;

  const { t, te, icon, escapeHTML } = RS;
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => [...el.querySelectorAll(sel)];
  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    editors: { th: 'กองบรรณาธิการ ราชบัณฑิตยสภา', en: 'Editorial team, The Royal Society of Thailand' },
    published: { th: 'เผยแพร่', en: 'Published' },
    updated: { th: 'ปรับปรุง', en: 'Updated' },
    minutes: { th: 'อ่าน {n} นาที', en: '{n} min read' },
    readTime: { th: 'เวลาอ่าน', en: 'Reading time' },
    pending: { th: 'บทความฉบับเต็มจะเผยแพร่โดยสำนักงานราชบัณฑิตยสภา ระหว่างนี้อ่านบทความอื่นในสาขาเดียวกันได้ด้านล่าง', en: 'The full text will be published by the Office. Meanwhile, see other articles in this field below.' },
    cite: { th: 'อ้างอิงบทความนี้', en: 'Cite this article' },
    read: { th: 'อ่านต่อ', en: 'Read' }
  };

  const sorted = [...DATA.items].sort((a, b) => b.date.localeCompare(a.date));
  const id = new URLSearchParams(location.search).get('id');
  const item = sorted.find(x => x.id === id) || sorted.find(x => BODIES[x.id]) || sorted[0];
  const body = BODIES[item.id] || null;
  const field = DATA.fields.find(f => f.id === item.field);
  const date = (iso, opts) => escapeHTML(RS.formatDate(iso, opts));
  const set = (sel, html) => { const el = qs(sel, root); if (el) el.innerHTML = html; };
  const text = (sel, value) => { const el = qs(sel, root); if (el) el.textContent = value; };
  const fieldHref = field ? RS.url(`pages/knowledge.html#${field.id}`) : RS.url('pages/knowledge.html');

  /* opening */
  const title = t(item.title);
  document.title = `${title} | ${t(L.org)}`;
  qs('meta[name="description"]')?.setAttribute('content', t(item.excerpt));
  text('[data-article-title]', title);
  text('[data-article-dek]', t(item.excerpt));
  text('[data-article-crumb]', title);
  text('[data-article-type]', t(item.type));
  qsa('[data-article-field], [data-article-crumb-field]', root).forEach(a => {
    a.textContent = field ? t(field.name) : '';
    a.href = fieldHref;
    a.removeAttribute('data-en');
  });
  text('[data-article-author]', body ? t(body.author) : t(L.editors));
  text('[data-article-role]', body && body.role ? t(body.role) : (field ? t(field.name) : ''));
  set('[data-article-meta]', `
    <div><dt>${te(L.published)}</dt><dd><time datetime="${escapeHTML(item.date)}">${date(item.date)}</time></dd></div>
    ${body && body.updated ? `<div><dt>${te(L.updated)}</dt><dd><time datetime="${escapeHTML(body.updated)}">${date(body.updated)}</time></dd></div>` : ''}
    ${body && body.minutes ? `<div><dt>${icon('clock')}<span class="visually-hidden">${te(L.readTime)}</span></dt><dd>${escapeHTML(RS.digits(t(L.minutes).replace('{n}', body.minutes)))}</dd></div>` : ''}`);

  /* the text, or (the summary already stands under the title) a note
     while the full text is prepared */
  const bodyBox = qs('[data-article-body]', root);
  bodyBox.innerHTML = body
    ? body.body
    : `<p class="note-box">${icon('info')}<span>${te(L.pending)}</span></p>`;

  /* contents, from the body's h2 headings (each gets an id if it has none) */
  const heads = qsa('h2', bodyBox);
  heads.forEach((h, i) => { if (!h.id) h.id = `section-${i + 1}`; });
  const toc = heads.map(h => `<li><a href="#${escapeHTML(h.id)}">${escapeHTML(h.textContent)}</a></li>`).join('')
    + `<li><a href="#cite">${te(L.cite)}</a></li>`;
  qsa('[data-article-toc]', root).forEach(ol => { ol.innerHTML = toc; });
  const hasToc = heads.length > 1;
  const tocNav = qs('[data-article-toc-nav]', root);
  const tocBox = qs('[data-article-toc-box]', root);
  if (tocNav) tocNav.hidden = !hasToc;
  if (tocBox) tocBox.hidden = !hasToc;
  if (!hasToc) qs('.article-layout', root)?.classList.add('article-layout--single');

  /* references */
  const refs = body && body.refs ? body.refs : [];
  const refsBox = qs('[data-article-refs-box]', root);
  if (refsBox) refsBox.hidden = !refs.length;
  set('[data-article-refs]', refs.map(r => `<li>${r}</li>`).join(''));

  /* citations, from the record */
  const author = body ? t(body.author) : t(L.editors);
  const url = `https://royalsociety.go.th/pages/article.html?id=${encodeURIComponent(item.id)}`;
  const year = RS.formatDate(item.date, { year: 'numeric' }).replace(/[^\d๐-๙]/g, '') || item.date.slice(0, 4);
  const longDate = RS.formatDate(item.date, { day: 'numeric', month: 'long', year: 'numeric' });
  const dayMonth = RS.formatDate(item.date, { day: 'numeric', month: 'long' });
  const org = t(L.org);
  const cites = {
    apa: `${escapeHTML(author)}. (${escapeHTML(RS.digits(year))}, ${escapeHTML(dayMonth)}). <i>${escapeHTML(title)}</i>. ${escapeHTML(org)}. ${escapeHTML(url)}`,
    mla: `${escapeHTML(author)}. “${escapeHTML(title)}.” <i>${escapeHTML(org)}</i>, ${escapeHTML(longDate)}, ${escapeHTML(url.replace(/^https:\/\//, ''))}.`,
    chicago: `${escapeHTML(author)}. “${escapeHTML(title)}.” ${escapeHTML(org)}. ${escapeHTML(longDate)}. ${escapeHTML(url)}.`
  };
  qsa('[data-cite]', root).forEach(p => { p.innerHTML = cites[p.dataset.cite] || ''; });

  /* the same field: other titles as links at the foot, and three as cards */
  const others = sorted.filter(x => x !== item);
  const same = others.filter(x => x.field === item.field);
  const href = x => escapeHTML(RS.url(x.href || `pages/article.html?id=${encodeURIComponent(x.id)}`));
  set('[data-article-topics]', same.slice(0, 6).map(x => `<li><a class="tag" href="${href(x)}">${te(x.title)}</a></li>`).join(''));
  const topics = qs('[data-article-topics]', root)?.closest('section');
  if (topics) topics.hidden = !same.length;
  const picks = [...same, ...others.filter(x => x.field !== item.field)].slice(0, 3);
  const relatedBox = document.querySelector('[data-article-related-box]');
  const related = document.querySelector('[data-article-related]');
  if (relatedBox && related && picks.length) {
    related.innerHTML = picks.map(x => {
      const f = DATA.fields.find(fl => fl.id === x.field);
      return `
          <li class="newsx-item">
            <a class="newsx-card kn-card" href="${href(x)}">
              <span class="newsx-card__body">
                <span class="news-cat">${f ? te(f.name) : ''}</span>
                <span class="newsx-card__title">${te(x.title)}</span>
                <span class="newsx-card__dek">${te(x.excerpt)}</span>
                <span class="news-card__foot newsx-card__foot">
                  <time datetime="${escapeHTML(x.date)}">${date(x.date)}</time>
                  <span class="news-cta"><span>${te(L.read)}</span><span class="news-cta__dot" aria-hidden="true">${icon('arrow')}</span></span>
                </span>
              </span>
            </a>
          </li>`;
    }).join('');
    relatedBox.hidden = false;
  }

  /* keep Thai phrases whole: each run between spaces becomes a span that
     moves to the next line in one piece (a phrase longer than the line
     still wraps inside), as on the news stories */
  const THAI = /[฀-๿]/;
  qsa('p, li, blockquote', bodyBox).forEach(block => {
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!THAI.test(node.nodeValue) || node.parentElement.closest('.story__ph, [lang="en"], a, code, .note-box')) return;
      const frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part) || !THAI.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const span = document.createElement('span');
        span.className = 'story__ph';
        span.textContent = part;
        frag.appendChild(span);
      });
      node.replaceWith(frag);
    });
  });
})();
