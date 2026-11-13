/* ============================================================================
 * 20-activity.js — One report of an academic activity (pages/activity.html?id=)
 * ============================================================================
 *
 *  Fills the page from RS_ACTIVITIES (data/activities.js: series, academy,
 *  date, title, cover) and RS_ACTIVITY_BODY (data/activity-bodies.js: the
 *  text, photographs, videos and PDFs brought across from the earlier
 *  sites); then more reports from the same series.
 *  Only the PDFs still open the original files, until the Office moves them;
 *  nothing else links to the
 *  sites the reports first appeared on.
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
  const BODY = window.RS_ACTIVITY_BODY || {};
  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    pending: { th: 'รายงานฉบับเต็ม ภาพกิจกรรม และเอกสารประกอบ อยู่ระหว่างนำเข้าสู่เว็บไซต์', en: 'The full report, photographs and documents are being added to the website.' },
    fallback: { th: 'รายงานจาก{s} จัดโดย{c} เมื่อวันที่ {d}', en: 'A report from {s}, held by {c} on {d}.' },
    series: { th: 'ชุดกิจกรรม', en: 'Series' },
    by: { th: 'จัดโดย', en: 'Held by' },
    when: { th: 'วันที่', en: 'Date' },
    reading: { th: 'เวลาอ่าน', en: 'Reading time' },
    minutes: { th: 'ราว {n} นาที', en: 'About {n} min' },
    photos: { th: '{n} ภาพ · กดที่ภาพเพื่อขยาย', en: '{n} photos · select one to enlarge' },
    photo: { th: 'ภาพที่ {n}', en: 'Photo {n}' },
    pdf: { th: 'เอกสาร PDF', en: 'PDF document' },
    doc: { th: 'เอกสารประกอบรายงาน', en: 'Report document' },
    openPdf: { th: 'เปิดเอกสาร', en: 'Open' },
    preview: { th: 'ดูตัวอย่าง', en: 'Preview' },
    previewOf: { th: 'ดูตัวอย่าง {t}', en: 'Preview {t}' },
    newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' },
    play: { th: 'เล่นวิดีโอ', en: 'Play the video' },
    more: { th: 'รายงานอื่นใน{s}', en: 'More from {s}' },
    all: { th: 'ดูทั้งหมด', en: 'View all' },
    read: { th: 'อ่านต่อ', en: 'Read' },
    notFound: { th: 'ไม่พบรายงานนี้', en: 'Report not found' },
    back: { th: 'กลับไปหน้ากิจกรรม', en: 'Back to the activities' }
  };

  const set = (sel, value) => { const el = qs(sel, root); if (el) el.innerHTML = value; };
  const date = iso => RS.formatDate(iso, { day: 'numeric', month: 'short', year: 'numeric' });
  const longDate = iso => RS.formatDate(iso, { day: 'numeric', month: 'long', year: 'numeric' });
  const fill = (s, map) => Object.entries(map).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s);
  const svg = name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
  /* Thai text as published: the old "นิคหิต + า" written for "ำ", a space before "(" */
  const clean = s => (s || '').replace(/ํา/g, 'ำ').replace(/(\S)\(/g, '$1 (').replace(/\s+-\s*(พ\.ศ\.)/g, '–$1').replace(/\s+/g, ' ').trim();
  /* a summary cut off where it was published ends at a whole word, with "…" */
  const tidy = dek => {
    const s = clean(dek);
    if (!s || /[.!?”")ๆ]$/.test(s)) return s;
    const cut = s.lastIndexOf(' ');
    return `${cut > 40 ? s.slice(0, cut) : s}…`;
  };
  /* the topic leads: "รายงาน… เรื่อง “X”" shows X as the headline, the rest above it */
  const headline = title => {
    const s = clean(title);
    const q = s.match(/^(.*?)[“"]([^”"]+)[”"]\s*(.*)$/);
    if (q && q[2].length > 6 && q[1].trim()) return { kicker: q[1].replace(/\s*เรื่อง\s*$/, '').trim(), title: (q[2] + (q[3] ? ` ${q[3]}` : '')).trim() };
    const r = s.match(/^(รายงานสรุป.{6,}?)\s+เรื่อง\s+(.{6,})$/);
    if (r) return { kicker: r[1], title: r[2] };
    return { kicker: '', title: s };
  };
  /* words kept together so a line never breaks inside one */
  const phrases = s => escapeHTML(s).split(' ').map(part => `<span class="story__ph">${part}</span>`).join(' ');
  const link = item => escapeHTML(RS.url(`pages/activity.html?id=${encodeURIComponent(item.id)}`));

  const item = ALL.find(a => a.id === new URLSearchParams(location.search).get('id'));

  /* Reports copied from a printed title page arrive one short line at a time:
     "เรื่อง" / the topic / "โดย" / the academy. A line that is only such a word
     joins the next; a line ending in "เรื่อง" does too. */
  const JOINERS = /^(เรื่อง|โดย|จัดโดย|จัดทำโดย|ณ)$/;
  function joinLines(blocks) {
    const out = [];
    for (let i = 0; i < blocks.length; i++) {
      const [tag, text] = blocks[i];
      const next = blocks[i + 1];
      if (next && next[0] !== 'li' && (JOINERS.test(text.trim()) || /เรื่อง$/.test(text.trim()))) {
        out.push([tag === 'h' || next[0] === 'h' ? 'h' : 'p', `${text.trim()} ${next[1].trim()}`]);
        i++;
      } else out.push([tag, text]);
    }
    return out;
  }
  /* one line of the title page: "เรื่อง" / "โดย" / "ณ" set apart from what follows */
  function titleLine(text, first) {
    const s = clean(text);
    if (first) return `<p class="act-tp__name">${escapeHTML(s)}</p>`;
    const m = s.match(/^(.*?เรื่อง|จัดทำโดย|จัดโดย|โดย|ณ)\s+(.+)$/);
    if (!m) return `<p>${escapeHTML(s)}</p>`;
    const topic = /เรื่อง$/.test(m[1]);
    return `<p${topic ? ' class="act-tp__topic"' : ''}><span class="act-tp__k">${escapeHTML(m[1])}</span> ${topic ? `<strong>${escapeHTML(m[2])}</strong>` : escapeHTML(m[2])}</p>`;
  }

  /* the report's text: the title page, if it opens with one; then headings,
     lists and paragraphs, the first paragraph leading */
  function bodyHTML(raw, fromPdf) {
    const blocks = joinLines(raw);
    let html = '', list = [], lead = false;
    /* the opening run of short lines (three or more, none a long sentence, none
       introducing a list) is the title page */
    let n = 0;
    while (n < blocks.length && blocks[n][0] !== 'li' && !(fromPdf && blocks[n][0] === 'h') && blocks[n][1].length <= (fromPdf ? 170 : 90) && !(/[.!?]$/.test(blocks[n][1]) && blocks[n][1].length > 60) && blocks[n + 1]?.[0] !== 'li') n++;
    if (n >= 3) {
      html += `<div class="act-tp">${blocks.slice(0, n).map((b, i) => titleLine(b[1], i === 0)).join('')}</div>`;
      lead = true;
    } else n = 0;
    const flush = () => { if (list.length) { html += `<ul>${list.join('')}</ul>`; list = []; } };
    blocks.slice(n).forEach(([tag, text], i, rest) => {
      const tx = escapeHTML(clean(text));
      if (tag === 'li') { list.push(`<li>${tx}</li>`); return; }
      flush();
      /* a short line that introduces a list ("สารบัญ", "ผู้ร่วมเสวนา… ดังนี้") heads it */
      if (tag === 'h' || (/[:：]$/.test(text) && text.length < 60) || (text.length < 40 && rest[i + 1]?.[0] === 'li')) { html += `<h2>${tx.replace(/[:：]$/, '')}</h2>`; return; }
      /* the opening paragraph leads, when it is short enough to read as one */
      html += `<p${lead || text.length > 320 ? '' : ' class="act-lead"'}>${tx}</p>`;
      lead = true;
    });
    flush();
    return html;
  }

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
    const body = BODY[item.id] || {};
    const head = headline(item.title);
    document.title = `${head.title} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', tidy(item.dek) || clean(item.title));

    const crumb = qs('[data-activity-series]', root);
    if (crumb) { crumb.href = RS.url(series.href); crumb.textContent = t(series); }
    set('[data-activity-crumb]', escapeHTML(head.title));
    set('[data-activity-cat]', `<a class="act-head__series" href="${escapeHTML(RS.url(series.href))}">${escapeHTML(t(series))}</a>`);
    const time = qs('[data-activity-date]', root);
    if (time) { time.dateTime = item.date; time.textContent = longDate(item.date); }
    const kicker = qs('[data-activity-kicker]', root);
    if (kicker && head.kicker) { kicker.innerHTML = phrases(head.kicker); kicker.hidden = false; }
    set('[data-activity-title]', phrases(head.title));
    const img = qs('[data-activity-img]', root);
    if (img && item.image) img.src = RS.url(item.image);
    else if (img) {
      /* a report without a cover photo: no empty frame in the green head */
      img.closest('figure')?.setAttribute('hidden', '');
      img.closest('.act-head__grid')?.classList.add('act-head__grid--solo');
    }

    /* the facts in one line */
    const blocks = body.blocks || [];
    const chars = blocks.reduce((n, b) => n + b[1].length, 0);
    const facts = [
      [L.series, `<a href="${escapeHTML(RS.url(series.href))}">${escapeHTML(t(series))}</a>`],
      [L.by, escapeHTML(item.cat)],
      [L.when, `<time datetime="${escapeHTML(item.date)}">${longDate(item.date)}</time>`]
    ];
    if (chars > 900) facts.push([L.reading, escapeHTML(t(L.minutes).replace('{n}', RS.digits(Math.max(1, Math.round(chars / 700)))))]);
    set('[data-activity-facts]', facts.map(([k, v]) => `<div class="act-facts__item"><dt>${te(k)}</dt><dd>${v}</dd></div>`).join(''));

    /* the report */
    let text = bodyHTML(blocks, body.source === 'pdf');
    if (!text) {
      const summary = tidy(item.dek);
      text = `<p class="act-lead">${escapeHTML(summary || fill(t(L.fallback), { s: t(series), c: item.cat, d: longDate(item.date) }))}</p>`;
    }
    const nothing = !blocks.length && !(body.images || []).length && !(body.files || []).length && !(body.videos || []).length;
    set('[data-activity-body]', `<div class="prose act-prose">${text}</div>${nothing ? `<p class="activity-pending">${te(L.pending)}</p>` : ''}`);

    /* photographs: the first large, up to nine shown, the rest behind "+n";
       a single photograph is already the cover */
    const photos = body.images || [];
    if (photos.length > 1) {
      const open = RS.photoViewer(photos);
      /* a layout to suit the number: 2, 3 and 4 fill their own grids; from 5 the
         first is large beside four, from 9 a third row of four */
      const shown = photos.slice(0, photos.length >= 9 ? 9 : photos.length >= 5 ? 5 : photos.length);
      set('[data-activity-photos-count]', escapeHTML(t(L.photos).replace('{n}', RS.digits(photos.length))));
      set('[data-activity-photos-list]', shown.map(([src, w, h], i) => {
        const rest = i === shown.length - 1 && photos.length > shown.length ? photos.length - shown.length : 0;
        return `<li class="act-photo${i === 0 ? ' act-photo--lead' : ''}" style="--i:${i}">
          <button type="button" data-photo="${i}" aria-label="${te(L.photo).replace('{n}', RS.digits(i + 1))}">
            <img src="${escapeHTML(RS.url(src))}" alt="" width="${w}" height="${h}" loading="lazy" decoding="async">
            ${rest ? `<span class="act-photo__more" aria-hidden="true">+${escapeHTML(RS.digits(rest))}</span>` : ''}
          </button>
        </li>`;
      }).join(''));
      qs('[data-activity-photos-list]', root).dataset.count = String(Math.min(shown.length, 9));
      qs('[data-activity-photos]', root).hidden = false;
      qs('[data-activity-photos-list]', root).addEventListener('click', event => {
        const b = event.target.closest('[data-photo]');
        if (b && open) open(Number(b.dataset.photo));
      });
    }

    /* videos: a still with a play button; the player loads only when asked */
    const videos = body.videos || [];
    if (videos.length) {
      set('[data-activity-videos-list]', videos.map(id => `
        <div class="act-video">
          <button type="button" class="act-video__play" data-video="${escapeHTML(id)}" aria-label="${te(L.play)}">
            <img src="https://i.ytimg.com/vi/${escapeHTML(id)}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy" decoding="async">
            <span class="act-video__btn" aria-hidden="true">${svg('play')}</span>
          </button>
        </div>`).join(''));
      qs('[data-activity-videos]', root).hidden = false;
      qs('[data-activity-videos-list]', root).addEventListener('click', event => {
        const b = event.target.closest('[data-video]');
        if (!b) return;
        b.parentElement.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.video)}?autoplay=1&rel=0" title="${te(L.play)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      });
    }

    /* documents: each with its first page, what it is (pages, size), a
       preview in a popup (RS.pdfPreview, 04-interactions.js) and a link to
       the file itself; the PDFs still open the original files */
    const files = (body.files || []).map(([src, name, thumb, pages, bytes], i, all) => ({
      src, thumb, pages, bytes,
      title: clean(name) || `${t(L.doc)}${all.length > 1 ? ` ${RS.digits(i + 1)}` : ''}`
    }));
    if (files.length) {
      set('[data-activity-files-list]', files.map((f, i) => `
        <li class="act-doc">
          <button class="act-doc__thumb" type="button" data-pdf="${i}" aria-label="${escapeHTML(t(L.previewOf).replace('{t}', f.title))}">
            ${f.thumb ? `<img src="${escapeHTML(RS.url(f.thumb))}" alt="" loading="lazy" decoding="async">` : ''}
            <span class="act-doc__type" aria-hidden="true">PDF</span>
          </button>
          <div class="act-doc__body">
            <p class="act-doc__t">${escapeHTML(f.title)}</p>
            <p class="act-doc__d">${escapeHTML(RS.pdfMeta(f))}</p>
            <div class="act-doc__actions">
              <button class="act-doc__btn act-doc__btn--primary" type="button" data-pdf="${i}">${svg('eye')}<span>${te(L.preview)}</span></button>
              <a class="act-doc__btn" href="${escapeHTML(f.src)}" target="_blank" rel="noopener">${svg('external')}<span>${te(L.openPdf)}</span><span class="visually-hidden">${te(L.newTab)}</span></a>
            </div>
          </div>
        </li>`).join(''));
      qs('[data-activity-files]', root).hidden = false;
      qs('[data-activity-files-list]', root).addEventListener('click', event => {
        const b = event.target.closest('[data-pdf]');
        if (b) RS.pdfPreview(files[Number(b.dataset.pdf)]);
      });
    }

    /* more from the series: the nearest in time first */
    const more = ALL.filter(a => a.series === item.series && a !== item)
      .sort((a, b) => Math.abs(new Date(a.date) - new Date(item.date)) - Math.abs(new Date(b.date) - new Date(item.date)))
      .slice(0, 4);
    set('[data-activity-more-title]', escapeHTML(t(L.more).replace('{s}', t(series))));
    const all = qs('[data-activity-all]', root);
    if (all) all.href = RS.url(series.href);
    if (!more.length) qs('[data-activity-more]', root)?.closest('section')?.remove();
    else set('[data-activity-more]', more.map(a => `
      <li class="newsx-item">
        <a class="newsx-card" href="${link(a)}">
          <span class="newsx-card__media"><img src="${escapeHTML(RS.url(a.image))}" alt="" width="640" height="427" loading="lazy" decoding="async"></span>
          <span class="newsx-card__body">
            <span class="news-cat works-cat${a.academy ? ` works-cat--${a.academy}` : ''}">${escapeHTML(a.cat)}</span>
            <span class="newsx-card__title">${escapeHTML(clean(a.title))}</span>
            <span class="news-card__foot newsx-card__foot">
              <time datetime="${escapeHTML(a.date)}">${date(a.date)}</time>
              <span class="news-cta"><span>${te(L.read)}</span><span class="news-cta__dot" aria-hidden="true"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg></span></span>
            </span>
          </span>
        </a>
      </li>`).join(''));

    /* sections rise into view as they are reached */
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' }) : null;
    root.querySelectorAll('.act-sec:not([hidden])').forEach(el => {
      el.classList.add('act-rise');
      if (io) io.observe(el); else el.classList.add('is-in');
    });
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
