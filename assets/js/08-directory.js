/* ============================================================================
 * 08-directory.js — Data-driven lists
 * ============================================================================
 *
 *  Renders lists whose data lives in one place, so pages never duplicate it:
 *
 *    <ul data-service-list="primary|all|group:<id>">  services (RS_CONFIG.services)
 *    <ul data-academy-list>                    academies (RS_CONFIG.academies)
 *    <ul data-fellows-preview="4">             first N people (RS_FELLOWS);
 *                                              data-fellows-academy="<id>" narrows to one academy
 *    <div data-sitemap>                        the site map (RS_CONFIG.nav)
 *
 *  The Fellows directory and profile pages use 17-fellows.js.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const CFG = window.RS_CONFIG;
  if (!RS || !CFG) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const PEOPLE = window.RS_FELLOWS || [];
  const MEMBER_TYPES = window.RS_MEMBER_TYPES || {};

  const L = {
    viewDetails: { th: 'ดูรายละเอียด', en: 'View details' },
    fellowsIn: { th: 'ราชบัณฑิตในสำนัก', en: 'Fellows of this academy' },
    knowledgeOf: { th: 'องค์ความรู้ของสำนัก', en: 'Knowledge from this academy' },
    jump: { th: 'ทางลัดไปยังหมวด', en: 'Jump to a section' },
    filterPlaceholder: { th: 'พิมพ์เพื่อกรองหน้าในเว็บไซต์', en: 'Type to filter the pages on this site' },
    clearFilter: { th: 'ล้างคำค้น', en: 'Clear' },
    pageCount: { th: 'ทั้งหมด {n} หน้าในเว็บไซต์', en: '{n} pages on this website' },
    found: { th: 'พบ {n} หน้า', en: '{n} pages found' },
    noMatch: { th: 'ไม่พบหน้าที่ตรงกับ “{q}”', en: 'No page matches “{q}”' }
  };

  const academyOf = id => CFG.academies.find(academy => academy.id === id);
  const externalText = `<span class="visually-hidden"> ${te(CFG.ui.external)}</span>`;

  /* ==================================================================== *
   * Services
   * ==================================================================== */

  function renderService(service) {
    const target = service.external ? ' target="_blank" rel="noopener"' : '';
    return `
      <li class="service-item stretched">
        <span class="service-item__icon" aria-hidden="true">${icon(service.icon)}</span>
        <h3 class="service-item__title">
          <a class="stretched-link" href="${escapeHTML(RS.url(service.href))}"${target}>${te(service.title)}${service.external ? externalText : ''}</a>
        </h3>
        <span class="service-item__arrow" aria-hidden="true">${icon(service.external ? 'external' : 'arrow')}</span>
        <p class="service-item__desc">${te(service.desc)}</p>
        ${service.domain ? `<p class="service-item__domain">${escapeHTML(service.domain)}</p>` : ''}
      </li>`;
  }

  function initServiceLists() {
    qsa('[data-service-list]').forEach(list => {
      const mode = list.dataset.serviceList;
      const services = mode === 'all'
        ? CFG.services
        : mode.startsWith('group:')
          ? CFG.services.filter(service => service.group === mode.slice(6))
          : CFG.services.filter(service => service.primary);
      list.innerHTML = services.map(renderService).join('');
    });
  }

  /* ==================================================================== *
   * Academies
   * ==================================================================== */

  /** Index rows for the home split: <ol data-academy-list="compact"> */
  function renderAcademyRow(academy, index) {
    const external = Boolean(academy.external);
    /* each academy opens its own page (pages/academy.html?id=…) */
    const href = academy.href ? escapeHTML(academy.href) : escapeHTML(RS.url(`pages/academy.html?id=${academy.id}`));
    const nameAttrs = external ? ' target="_blank" rel="noopener"' : '';
    const fields = (academy.tags ? RS.t(academy.tags) : []).map(escapeHTML).join(' · ') || te(academy.fields);
    const siteLabel = te(academy.siteLabel || { th: 'เว็บไซต์สำนัก', en: 'Academy website' });
    return `
      <li class="academy-index__item reveal reveal--delay-${index + 1}" data-academy="${academy.id}">
        <span class="academy-index__num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <div class="academy-index__body">
          <h3 class="academy-index__name"><a href="${href}"${nameAttrs}>${te(academy.name)}</a></h3>
          <p class="academy-index__fields">${fields}</p>
          ${academy.site ? `<a class="academy-index__site" href="${escapeHTML(academy.site)}" target="_blank" rel="noopener">${siteLabel}${icon('external')}</a>` : ''}
        </div>
        <span class="academy-index__arrow" aria-hidden="true">${icon('arrow')}</span>
      </li>`;
  }

  /**
   * Spotlight: pointing at or focusing a row shows that academy's photo in
   * [data-academy-spotlight]; leaving returns to the default photo.
   */
  function initAcademySpotlight(list) {
    const stage = qs('[data-academy-spotlight]');
    if (!stage) return;

    const layers = qsa('[data-academy-photo]', stage);
    const caption = qs('[data-academy-caption]', stage);

    /* A missing photo is hidden so the gradient and crest show instead */
    layers.forEach(img => {
      const hide = () => { img.hidden = true; };
      if (img.complete && !img.naturalWidth) hide();
      else img.addEventListener('error', hide, { once: true });
    });

    let timer = 0;
    function show(id) {
      clearTimeout(timer);
      /* An academy without its own photo keeps the default one */
      const photo = layers.some(img => id && img.dataset.academyPhoto === id) ? id : '';
      layers.forEach(img => img.classList.toggle('is-active', (img.dataset.academyPhoto || '') === photo));
      stage.classList.toggle('is-spotlit', Boolean(id));
      if (caption) {
        const academy = CFG.academies.find(item => item.id === id);
        caption.hidden = !academy;
        if (academy) caption.textContent = t(academy.name);
      }
    }
    const reset = () => { timer = setTimeout(() => show(''), 160); };

    list.addEventListener('pointerover', event => {
      const row = event.target.closest('[data-academy]');
      if (row) show(row.dataset.academy);
    });
    list.addEventListener('pointerleave', reset);
    list.addEventListener('focusin', event => {
      const row = event.target.closest('[data-academy]');
      if (row) show(row.dataset.academy);
    });
    list.addEventListener('focusout', event => {
      if (!list.contains(event.relatedTarget)) reset();
    });
  }

  function initAcademyLists() {
    qsa('[data-academy-list]').forEach(list => {
      if (list.dataset.academyList === 'compact') {
        /* The three academies (home only; the Office row was removed at the client's request) */
        list.innerHTML = CFG.academies.map(renderAcademyRow).join('');
        initAcademySpotlight(list);
        /* Rows rendered after the reveal observer ran: let it pick them up */
        document.dispatchEvent(new CustomEvent('rs:content-added', { detail: list }));
        return;
      }

      const other = RS.lang === 'th' ? 'en' : 'th';
      list.innerHTML = CFG.academies.map((academy, index) => `
        <li class="academy" data-academy="${academy.id}">
          <p class="academy__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</p>
          <h3 class="academy__name">${te(academy.name)}</h3>
          <p class="academy__name-alt" lang="${other}">${escapeHTML(academy.name[other])}</p>
          <p class="academy__fields">${te(academy.fields)}</p>
          <ul class="academy__links" role="list">
            <li><a class="link-arrow" href="${escapeHTML(RS.url(`pages/fellows.html?academy=${academy.id}`))}"><span>${te(L.fellowsIn)}</span>${icon('arrow')}</a></li>
            <li><a class="link-arrow" href="${escapeHTML(RS.url(`pages/search.html?academy=${academy.id}`))}"><span>${te(L.knowledgeOf)}</span>${icon('arrow')}</a></li>
          </ul>
        </li>`).join('');
    });
  }

  /* ==================================================================== *
   * People
   * ==================================================================== */

  function renderPerson(person) {
    return `
      <li class="person-card stretched" data-academy="${escapeHTML(person.academy)}">
        <div class="image-placeholder image-placeholder--portrait">
          <!-- Official portrait will be added here -->
          ${icon('people')}
        </div>
        <p class="person-card__title">${te(person.title)}</p>
        <h3 class="person-card__name">
          <a class="stretched-link" href="${escapeHTML(RS.url(`pages/fellow.html?id=${encodeURIComponent(person.id)}`))}">${te(person.name)}</a>
        </h3>
        <p class="person-card__field">${te(person.field)} · ${te(MEMBER_TYPES[person.memberType])}</p>
        <p class="person-card__academy">${te(academyOf(person.academy)?.name)}</p>
      </li>`;
  }


  /* ==================================================================== *
   * The member card — one markup for the home page, the academy pages and
   * the Fellows directory (17-fellows.js uses RS.fellowCard too): a small
   * portrait (the official photo, or the initial until it arrives) beside
   * membership, title and name, field, academy.
   * ==================================================================== */

  /* the first consonant of the given name (Thai leading vowels เ แ โ ใ ไ are skipped), or the first letter */
  const initialOf = person => {
    const name = t(person.name) || '';
    return (name.match(/[ก-ฮA-Za-z]/) || [name.charAt(0)])[0].toUpperCase();
  };
  /* image paths carry no ?lang= */
  const assetURL = path => (/^https?:/i.test(path) ? path : RS.url(path).replace(/[?&]lang=\w+/, ''));

  /** the portrait; the initial is set underneath, so a photo that fails to load (removed below) leaves the plate */
  RS.fellowPortrait = (person, extra = '') => `<span class="fellowx-photo${extra}" data-academy="${escapeHTML(person.academy)}" aria-hidden="true"><span class="fellowx-photo__initial">${escapeHTML(initialOf(person))}</span>${person.photo
    ? `<img src="${escapeHTML(assetURL(person.photo))}" alt="" loading="lazy" decoding="async">` : ''}</span>`;

  /** the title written at the head of the name, each part kept whole when the name wraps */
  /* นาย, นาง and นางสาว are written against the first name, as Thai writes
     them ("นางสาวกนกวลี"); academic titles keep their space ("ศ. ดร. …") */
  RS.fellowName = person => {
    const title = t(person.title);
    const parts = t(person.name).split(' ').map(escapeHTML);
    if (/^(นาย|นาง|นางสาว)$/.test(title)) parts[0] = `<span class="fellow-name__title">${escapeHTML(title)}</span>${parts[0]}`;
    else if (title) parts.unshift(`<span class="fellow-name__title">${escapeHTML(title)}</span>`);
    return parts.map(part => `<span class="story__ph">${part}</span>`).join(' ');
  };

  RS.fellowCard = (person, itemClass = 'newsx-item') => `
      <li class="${itemClass}">
        <a class="fellowx-card" href="${escapeHTML(RS.url(`pages/fellow.html?id=${encodeURIComponent(person.id)}`))}" data-academy="${escapeHTML(person.academy)}">
          ${RS.fellowPortrait(person)}
          <span class="fellowx-card__body">
            <span class="fellowx-card__type">${te(MEMBER_TYPES[person.memberType])}</span>
            <span class="fellowx-card__name">${RS.fellowName(person)}</span>
            <span class="fellowx-card__field" title="${te(t(person.field) ? person.field : person.group)}">${te(t(person.field) ? person.field : person.group)}</span>
            <span class="fellowx-card__academy">${te(academyOf(person.academy)?.name)}</span>
          </span>
        </a>
      </li>`;

  /* a member photo that fails to load is removed, showing the initial */
  document.addEventListener('error', event => {
    if (event.target.matches?.('.fellowx-photo img')) event.target.remove();
  }, true);

  function initFellowsPreview() {
    qsa('[data-fellows-preview]').forEach(list => {
      const limit = Number(list.dataset.fellowsPreview) || 4;
      const academy = list.dataset.fellowsAcademy;      /* academy page: that academy only, */
      const rank = { honorary: 0, fellow: 1, associate: 2 }; /* honorary Fellows first, Associates last */
      const people = academy
        ? PEOPLE.filter(person => person.academy === academy).sort((a, b) => (rank[a.memberType] ?? 3) - (rank[b.memberType] ?? 3))
        : PEOPLE;
      /* a sliding row (academy pages) or a plain grid (home page) */
      const itemClass = list.hasAttribute('data-scroller-track') ? 'fellow-scroller__item' : 'newsx-item';
      list.innerHTML = people.slice(0, limit).map(person => RS.fellowCard(person, itemClass)).join('');
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: list }));
    });
  }

  /* The directory (pages/fellows.html) and the profile (pages/fellow.html)
     live in 17-fellows.js. */

  /* ==================================================================== *
   * Sitemap — the outline is built from RS_CONFIG.nav plus
   * RS_CONFIG.sitemapExtra, so it cannot fall behind the menu.
   *
   *   <div data-sitemap>  →  filter field · section rail · outline
   *
   * The rail follows the page while scrolling (scroll spy) and the filter
   * narrows the outline as the visitor types.
   * ==================================================================== */

  const TH_DIGITS = '๐๑๒๓๔๕๖๗๘๙';

  function outlineNumber(n) {
    const digits = String(n).padStart(2, '0');
    return RS.lang === 'th' ? [...digits].map(d => TH_DIGITS[Number(d)]).join('') : digits;
  }

  /** Link whose label sits in its own span, so the filter can highlight it */
  function outlineLink(item, className) {
    const target = item.external ? ' target="_blank" rel="noopener"' : '';
    const label = t(item.label);
    return `<a${className ? ` class="${className}"` : ''} href="${escapeHTML(RS.url(item.href))}"${target}>
      <span class="sm-text" data-text="${escapeHTML(label)}">${escapeHTML(label)}</span>${item.external ? externalText + icon('external') : ''}
    </a>`;
  }

  function countPages(group) {
    const children = group.children || [];
    return children.reduce((total, child) => total + 1 + (child.children?.length || 0), 0) || 1;
  }

  function renderSitemapGroup(group, number) {
    const children = group.children || [];
    const columns = children.map(child => `
      <div class="sitemap-col">
        <p class="sitemap-col__title">${outlineLink(child)}</p>
        ${child.children?.length
          ? `<ul role="list">${child.children.map(sub => `<li>${outlineLink(sub)}</li>`).join('')}</ul>`
          : ''}
      </div>`).join('');

    const key = escapeHTML(group.key);
    return `
      <section class="sitemap-block reveal" id="sm-${key}" aria-labelledby="sm-${key}-title">
        <div class="sitemap-block__head">
          ${number ? `<span class="sitemap-block__num" aria-hidden="true">${outlineNumber(number)}</span>` : ''}
          <h2 class="sitemap-block__title" id="sm-${key}-title">
            ${group.href ? outlineLink(group) : `<span class="sm-text" data-text="${escapeHTML(t(group.label))}">${te(group.label)}</span>`}
          </h2>
          <span class="sitemap-block__count">${countPages(group)}</span>
        </div>
        ${columns ? `<div class="sitemap-cols">${columns}</div>` : ''}
      </section>`;
  }

  function renderRailItem(group, number) {
    const key = escapeHTML(group.key);
    return `
      <a class="sitemap-rail__item" href="#sm-${key}" data-rail="${key}">
        <span class="sitemap-rail__num" aria-hidden="true">${number ? outlineNumber(number) : '·'}</span>
        <span class="sitemap-rail__label">${te(group.short || group.label)}</span>
        <span class="sitemap-rail__count">${countPages(group)}</span>
      </a>`;
  }

  /** Escape, then wrap every occurrence of the query in <mark> */
  function highlight(text, query) {
    if (!query) return escapeHTML(text);
    const lower = text.toLowerCase();
    let out = '';
    let from = 0;
    let at = lower.indexOf(query);
    while (at !== -1) {
      out += escapeHTML(text.slice(from, at)) + '<mark>' + escapeHTML(text.slice(at, at + query.length)) + '</mark>';
      from = at + query.length;
      at = lower.indexOf(query, from);
    }
    return out + escapeHTML(text.slice(from));
  }

  /* Filter: hide links, then columns and sections left with nothing */
  function filterSitemap(host, rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    let shown = 0;

    qsa('.sm-text', host).forEach(span => {
      span.innerHTML = highlight(span.dataset.text || '', query);
    });

    qsa('.sitemap-block', host).forEach(block => {
      let blockHits = 0;

      qsa('.sitemap-col', block).forEach(col => {
        const title = qs('.sitemap-col__title .sm-text', col);
        const titleHit = !query || (title?.dataset.text || '').toLowerCase().includes(query);
        let colHits = titleHit ? 1 : 0;

        qsa('li', col).forEach(row => {
          const text = (qs('.sm-text', row)?.dataset.text || '').toLowerCase();
          const hit = !query || titleHit || text.includes(query);
          row.hidden = !hit;
          if (hit) colHits += 1;
        });

        col.hidden = colHits === 0;
        blockHits += colHits;
      });

      const headText = (qs('.sitemap-block__title .sm-text', block)?.dataset.text || '').toLowerCase();
      const headHit = !query || headText.includes(query);

      /* A section matched by its own name keeps all of its pages */
      if (headHit && query) {
        qsa('.sitemap-col, .sitemap-col li', block).forEach(el => { el.hidden = false; });
      }

      block.hidden = !(headHit || blockHits > 0);
      if (!block.hidden) {
        shown += qsa('.sitemap-col:not([hidden])', block).length
               + qsa('.sitemap-col:not([hidden]) li:not([hidden])', block).length;
      }

      const rail = qs(`[data-rail="${block.id.replace('sm-', '')}"]`, host);
      if (rail) rail.classList.toggle('is-dimmed', block.hidden);
    });

    return shown;
  }

  function initSitemap() {
    const host = qs('[data-sitemap]');
    if (!host) return;

    const menu = CFG.nav || [];
    const extra = CFG.sitemapExtra || [];
    const total = [...menu, ...extra].reduce((sum, group) => sum + countPages(group), 0);

    host.innerHTML = `
      <div class="sitemap-tools reveal">
        <div class="sitemap-filter">
          ${icon('search')}
          <input type="search" id="sitemap-filter" autocomplete="off"
                 placeholder="${te(L.filterPlaceholder)}" aria-label="${te(L.filterPlaceholder)}">
          <button class="sitemap-filter__clear" type="button" hidden aria-label="${te(L.clearFilter)}">${icon('x')}</button>
        </div>
        <p class="sitemap-status" role="status" data-total="${total}">${te(L.pageCount).replace('{n}', total)}</p>
      </div>

      <div class="sitemap-layout">
        <nav class="sitemap-rail" aria-label="${te(L.jump)}">
          ${menu.map((group, i) => renderRailItem(group, i + 1)).join('')}
          ${extra.map(group => renderRailItem(group, 0)).join('')}
        </nav>

        <div class="sitemap-outline">
          ${menu.map((group, i) => renderSitemapGroup(group, i + 1)).join('')}
          ${extra.map(group => renderSitemapGroup(group, 0)).join('')}
          <p class="sitemap-empty" hidden></p>
        </div>
      </div>`;

    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: host }));

    /* ---- Filter ---- */
    const input = qs('#sitemap-filter', host);
    const clear = qs('.sitemap-filter__clear', host);
    const status = qs('.sitemap-status', host);
    const empty = qs('.sitemap-empty', host);

    const runFilter = () => {
      const query = input.value.trim();
      const shown = filterSitemap(host, query);
      clear.hidden = !query;
      empty.hidden = !(query && shown === 0);
      empty.textContent = t(L.noMatch).replace('{q}', query);
      status.textContent = query
        ? t(L.found).replace('{n}', shown)
        : t(L.pageCount).replace('{n}', status.dataset.total);
    };

    input.addEventListener('input', runFilter);
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape' && input.value) { input.value = ''; runFilter(); }
    });
    clear.addEventListener('click', () => { input.value = ''; runFilter(); input.focus(); });

    /* ---- Scroll spy: mark the section the reader is in ---- */
    const railItems = qsa('.sitemap-rail__item', host);
    const blocks = qsa('.sitemap-block', host);
    if (!('IntersectionObserver' in window) || !railItems.length) return;

    const setActive = id => railItems.forEach(item => {
      const on = item.getAttribute('href') === `#${id}`;
      item.classList.toggle('is-active', on);
      if (on) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });

    const seen = new Set();
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) seen.add(entry.target.id);
        else seen.delete(entry.target.id);
      });
      const first = blocks.find(block => seen.has(block.id));
      if (first) setActive(first.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    blocks.forEach(block => spy.observe(block));
  }

  RS.ready(() => {
    initServiceLists();
    initAcademyLists();
    initFellowsPreview();
    initSitemap();
  });
})();
