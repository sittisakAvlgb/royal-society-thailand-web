/* ============================================================================
 * 08-directory.js — Data-driven lists
 * ============================================================================
 *
 *  Renders lists whose data lives in one place, so pages never duplicate it:
 *
 *    <ul data-service-list="primary|all|group:<id>">  services (RS_CONFIG.services)
 *    <ul data-academy-list>                    academies (RS_CONFIG.academies)
 *    <ul data-fellows-preview="4">             first N people (RS_FELLOWS)
 *    <section id="fellow-directory">           searchable directory
 *    <div id="fellow-profile">                 profile (?id=)
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const CFG = window.RS_CONFIG;
  if (!RS || !CFG) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const PEOPLE = window.RS_FELLOWS || [];
  const MEMBER_TYPES = window.RS_MEMBER_TYPES || {};
  const TOPICS = window.RS_TOPICS || {};

  const L = {
    viewDetails: { th: 'ดูรายละเอียด', en: 'View details' },
    save: { th: 'บันทึก', en: 'Save' },
    saved: { th: 'บันทึกไว้ในรายการของคุณแล้ว', en: 'Saved to your list' },
    unsaved: { th: 'นำออกจากรายการแล้ว', en: 'Removed from your list' },
    fellowsIn: { th: 'ราชบัณฑิตในสำนัก', en: 'Fellows of this academy' },
    knowledgeOf: { th: 'องค์ความรู้ของสำนัก', en: 'Knowledge from this academy' },
    count: { th: 'พบ {n} คน', en: '{n} people' },
    emptyTitle: { th: 'ไม่พบรายชื่อที่ตรงกับเงื่อนไข', en: 'No one matches these filters' },
    emptyText: { th: 'ลองใช้คำค้นที่สั้นลง หรือล้างตัวกรอง', en: 'Try a shorter search term or clear the filters.' },
    clear: { th: 'ล้างตัวกรอง', en: 'Clear filters' },
    chip: {
      q: { th: 'คำค้น', en: 'Search' },
      academy: { th: 'สำนัก', en: 'Academy' },
      topic: { th: 'สาขาวิชา', en: 'Field' },
      type: { th: 'ประเภท', en: 'Type' },
      year: { th: 'ปีที่แต่งตั้ง', en: 'Year' }
    },
    notFound: { th: 'ไม่พบข้อมูลบุคคลนี้', en: 'Profile not found' },
    notFoundText: { th: 'ลิงก์อาจไม่ถูกต้องหรือข้อมูลถูกย้ายแล้ว', en: 'The link may be incorrect or the profile has moved.' },
    backToDirectory: { th: 'กลับไปหน้ารายชื่อ', en: 'Back to directory' },
    academy: { th: 'สำนัก', en: 'Academy' },
    memberType: { th: 'ประเภทสมาชิก', en: 'Membership' },
    field: { th: 'สาขาวิชา', en: 'Field' },
    expertise: { th: 'ความเชี่ยวชาญ', en: 'Expertise' },
    bio: { th: 'ประวัติ', en: 'Biography' },
    works: { th: 'ผลงานสำคัญ', en: 'Selected works' },
    publications: { th: 'ผลงานตีพิมพ์', en: 'Publications' },
    sample: { th: 'ข้อมูลตัวอย่าง', en: 'Sample data' },
    photo: { th: 'รูปถ่ายทางการจะแสดงที่นี่', en: 'Official portrait will appear here' },
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
    const href = escapeHTML(RS.url(`pages/fellows.html?academy=${academy.id}`));
    const fields = (academy.tags ? RS.t(academy.tags) : []).map(escapeHTML).join(' · ') || te(academy.fields);
    return `
      <li class="academy-index__item reveal reveal--delay-${index + 1}" data-academy="${academy.id}">
        <span class="academy-index__num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <div class="academy-index__body">
          <h3 class="academy-index__name"><a href="${href}">${te(academy.name)}</a></h3>
          <p class="academy-index__fields">${fields}</p>
          ${academy.site ? `<a class="academy-index__site" href="${escapeHTML(academy.site)}" target="_blank" rel="noopener">${te({ th: 'เว็บไซต์สำนัก', en: 'Academy website' })}${icon('external')}</a>` : ''}
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
      layers.forEach(img => img.classList.toggle('is-active', (img.dataset.academyPhoto || '') === (id || '')));
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

  /* Discipline icon for the home tiles (portrait slot until photographs arrive) */
  const TOPIC_ICON = {
    language: 'book', technology: 'flask', law: 'scale', medicine: 'stetho', arts: 'palette',
    economics: 'chart', science: 'leaf', social: 'people', history: 'archive'
  };

  const BOOKMARK_KEY = 'rs.bookmarks';
  const readBookmarks = () => { try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]'); } catch { return []; } };

  /** Home tile: discipline-tinted portrait slot, name, field, membership, "view details" */
  function renderFellowTile(person) {
    const href = escapeHTML(RS.url(`pages/fellow.html?id=${encodeURIComponent(person.id)}`));
    const saved = readBookmarks().includes(person.id);
    return `
      <li class="fellow-tile" data-academy="${escapeHTML(person.academy)}" data-topic="${escapeHTML(person.topic || '')}">
        <div class="fellow-tile__portrait" aria-hidden="true">
          <!-- Official portrait will replace the discipline icon -->
          <span class="fellow-tile__disc">${icon(TOPIC_ICON[person.topic] || 'people')}</span>
        </div>
        <button class="fellow-tile__save" type="button" data-bookmark="${escapeHTML(person.id)}" aria-pressed="${saved}" aria-label="${te(L.save)} ${te(person.name)}">${icon('bookmark')}</button>
        <p class="fellow-tile__title">${te(person.title)}</p>
        <h3 class="fellow-tile__name"><a href="${href}">${te(person.name)}</a></h3>
        <p class="fellow-tile__field">${te(person.field)}</p>
        <p class="fellow-tile__meta"><span class="fellow-tile__type">${te(MEMBER_TYPES[person.memberType])}</span><span class="fellow-tile__academy">${te(academyOf(person.academy)?.name)}</span></p>
        <p class="fellow-tile__foot"><span>${te(L.viewDetails)}</span><span class="fellow-tile__go">${icon('arrow')}</span></p>
      </li>`;
  }

  /** Bookmark toggle — remembered per browser (prototype; a real account would store it) */
  function initBookmarks(root) {
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-bookmark]');
      if (!button) return;
      event.preventDefault();
      const id = button.dataset.bookmark;
      const list = readBookmarks();
      const on = !list.includes(id);
      const next = on ? [...list, id] : list.filter(item => item !== id);
      try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next)); } catch { /* private mode */ }
      button.setAttribute('aria-pressed', String(on));
      button.classList.remove('is-bumped');
      button.getBoundingClientRect();
      button.classList.add('is-bumped');
      RS.toast?.(t(on ? L.saved : L.unsaved));
    });
  }

  function initFellowsPreview() {
    qsa('[data-fellows-preview]').forEach(list => {
      const limit = Number(list.dataset.fellowsPreview) || 4;
      list.innerHTML = PEOPLE.slice(0, limit).map(renderFellowTile).join('');
      initBookmarks(list);
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: list }));
    });
  }

  const normalize = value => String(value || '').toLowerCase().trim();

  function matches(person, { q, academy, topic, type, year }) {
    if (academy && person.academy !== academy) return false;
    if (topic && person.topic !== topic) return false;
    if (type && person.memberType !== type) return false;
    if (year && String(person.appointed) !== year) return false;
    if (!q) return true;
    const haystack = [
      person.name.th, person.name.en, person.field.th, person.field.en,
      person.expertise.th, person.expertise.en, ...(person.keywords || [])
    ].map(normalize).join(' ');
    return haystack.includes(normalize(q));
  }

  function initDirectory() {
    const root = qs('#fellow-directory');
    if (!root) return;

    const form = qs('#directory-form', root);
    const fields = {
      q: qs('#directory-q', root),
      academy: qs('input[name="academy"]', root) || qs('#directory-academy', root),
      topic: qs('input[name="topic"]', root) || qs('#directory-topic', root),
      type: qs('input[name="type"]', root) || qs('#directory-type', root),
      year: qs('input[name="year"]', root) || qs('#directory-year', root)
    };
    /* Optional filters may be absent from a page */
    Object.keys(fields).forEach(key => { if (!fields[key]) delete fields[key]; });
    const sortField = qs('input[name="sort"]', root);

    const list = qs('[data-directory-list]', root);
    const count = qs('[data-directory-count]', root);
    const chips = qs('[data-directory-chips]', root);
    const tabs = qsa('[data-academy-tab]', root);

    const optionHTML = (value, label) => `
      <li class="rs-select__option" role="option" tabindex="-1" data-value="${escapeHTML(value)}" aria-selected="false">
        <span>${label}</span>${icon('check')}
      </li>`;

    /* Filter options come from the data so they never list empty values */
    const topicList = fields.topic?.closest('[data-select]')?.querySelector('[role="listbox"]');
    if (topicList) {
      const topics = [...new Set(PEOPLE.map(person => person.topic))];
      topicList.insertAdjacentHTML('beforeend', topics.map(key => optionHTML(key, te(TOPICS[key] || key))).join(''));
    }
    const yearList = fields.year?.closest('[data-select]')?.querySelector('[role="listbox"]');
    if (yearList) {
      const years = [...new Set(PEOPLE.map(person => person.appointed).filter(Boolean))].sort((a, b) => b - a);
      yearList.insertAdjacentHTML('beforeend', years.map(year => optionHTML(String(year), RS.lang === 'th' ? year + 543 : year)).join(''));
    }

    /* Tab counts */
    qsa('[data-academy-count]', root).forEach(el => {
      const id = el.dataset.academyCount;
      el.textContent = RS.formatNumber(PEOPLE.filter(person => !id || person.academy === id).length);
    });

    const params = new URLSearchParams(location.search);
    Object.entries(fields).forEach(([key, el]) => RS.selectSet(el, params.get(key) || ''));
    if (sortField) RS.selectSet(sortField, params.get('sort') || '');

    const labelFor = (key, value) => {
      if (key === 'academy') return t(academyOf(value)?.name) || value;
      if (key === 'topic') return t(TOPICS[value]) || value;
      if (key === 'type') return t(MEMBER_TYPES[value]) || value;
      if (key === 'year') return RS.lang === 'th' ? String(Number(value) + 543) : value;
      return value;
    };

    function sorted(results) {
      const mode = sortField?.value || '';
      const byName = (a, b) => t(a.name).localeCompare(t(b.name), RS.lang === 'th' ? 'th' : 'en');
      if (mode === 'newest') return [...results].sort((a, b) => (b.appointed || 0) - (a.appointed || 0) || byName(a, b));
      if (mode === 'oldest') return [...results].sort((a, b) => (a.appointed || 0) - (b.appointed || 0) || byName(a, b));
      return [...results].sort(byName);
    }

    function update() {
      const state = Object.fromEntries(Object.entries(fields).map(([key, el]) => [key, el.value.trim()]));
      const results = sorted(PEOPLE.filter(person => matches(person, state)));

      const next = new URL(location.href);
      Object.entries(state).forEach(([key, value]) => (value ? next.searchParams.set(key, value) : next.searchParams.delete(key)));
      if (sortField) (sortField.value ? next.searchParams.set('sort', sortField.value) : next.searchParams.delete('sort'));
      history.replaceState(null, '', next);

      tabs.forEach(tab => {
        const active = (tab.dataset.academyTab || '') === (state.academy || '');
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });

      if (chips) {
        const active = Object.entries(state).filter(([, value]) => value);
        chips.hidden = !active.length;
        chips.innerHTML = active.length ? `
          ${active.map(([key, value]) => `
            <button class="dir-chip" type="button" data-directory-remove="${escapeHTML(key)}">
              <span class="dir-chip__key">${te(L.chip[key] || key)}</span>
              <span>${escapeHTML(labelFor(key, value))}</span>
              ${icon('x')}
            </button>`).join('')}
          <button class="dir-chips__clear" type="button" data-directory-clear>${te(L.clear)}</button>` : '';
      }

      count.innerHTML = t(L.count).replace('{n}', `<strong>${RS.formatNumber(results.length)}</strong>`);
      list.innerHTML = results.length
        ? results.map(renderFellowTile).join('')
        : `<li class="state state--empty">
             <p class="state__icon" aria-hidden="true">${icon('people')}</p>
             <h3 class="state__title">${te(L.emptyTitle)}</h3>
             <p class="state__text">${te(L.emptyText)}</p>
             <button class="btn btn--secondary btn--sm" type="button" data-directory-clear>${te(L.clear)}</button>
           </li>`;
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: list }));
    }

    let timer = null;
    fields.q.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(update, 200);
    });
    ['academy', 'topic', 'type', 'year'].forEach(key => fields[key]?.addEventListener('change', update));
    sortField?.addEventListener('change', update);

    form.addEventListener('submit', event => {
      event.preventDefault();
      update();
    });

    root.addEventListener('click', event => {
      const tab = event.target.closest('[data-academy-tab]');
      if (tab && fields.academy) {
        RS.selectSet(fields.academy, tab.dataset.academyTab || '');
        update();
        return;
      }
      const remove = event.target.closest('[data-directory-remove]');
      if (remove) {
        const key = remove.dataset.directoryRemove;
        if (fields[key]) RS.selectSet(fields[key], '');
        update();
        return;
      }
      if (!event.target.closest('[data-directory-clear]')) return;
      Object.values(fields).forEach(el => RS.selectSet(el, ''));
      update();
      fields.q.focus();
    });

    initBookmarks(list);
    update();
  }

  /* ==================================================================== *
   * Profile
   * ==================================================================== */

  function initProfile() {
    const root = qs('#fellow-profile');
    if (!root) return;

    const id = new URLSearchParams(location.search).get('id') || PEOPLE[0]?.id;
    const person = PEOPLE.find(item => item.id === id);
    const crumb = qs('[data-profile-crumb]');

    if (!person) {
      root.innerHTML = `
        <div class="state state--empty">
          <p class="state__icon" aria-hidden="true">${icon('people')}</p>
          <h1 class="state__title">${te(L.notFound)}</h1>
          <p class="state__text">${te(L.notFoundText)}</p>
          <a class="btn btn--secondary" href="${escapeHTML(RS.url('pages/fellows.html'))}">${te(L.backToDirectory)}</a>
        </div>`;
      return;
    }

    const other = RS.lang === 'th' ? 'en' : 'th';
    const academy = academyOf(person.academy);
    document.title = `${t(person.title)} ${t(person.name)} | ${t(CFG.site.name)}`;
    if (crumb) crumb.textContent = t(person.name);

    root.innerHTML = `
      <div class="profile" data-academy="${escapeHTML(person.academy)}">
        <aside class="profile__aside">
          <div class="image-placeholder image-placeholder--portrait" role="img" aria-label="${te(L.photo)}">
            <!-- Official portrait will be added here -->
            ${icon('people')}
          </div>
          <dl class="profile__facts">
            <div><dt>${te(L.academy)}</dt><dd class="person-card__academy">${te(academy?.name)}</dd></div>
            <div><dt>${te(L.memberType)}</dt><dd>${te(MEMBER_TYPES[person.memberType])}</dd></div>
            <div><dt>${te(L.field)}</dt><dd>${te(person.field)}</dd></div>
          </dl>
        </aside>

        <div class="profile__main">
          <span class="badge badge--accent">${te(L.sample)}</span>
          <p class="profile__title">${te(person.title)}</p>
          <h1 class="profile__name">${te(person.name)}</h1>
          <p class="profile__name-alt" lang="${other}">${escapeHTML(person.name[other])}</p>

          <section class="profile__section" aria-labelledby="profile-expertise">
            <h2 id="profile-expertise">${te(L.expertise)}</h2>
            <ul class="tag-list" role="list">
              ${t(person.expertise).split(/,\s*|\s(?=[ก-๙])/).filter(Boolean).map(item => `<li><span class="tag">${escapeHTML(item)}</span></li>`).join('')}
            </ul>
          </section>

          <section class="profile__section" aria-labelledby="profile-bio">
            <h2 id="profile-bio">${te(L.bio)}</h2>
            <p>${te(person.bio)}</p>
          </section>

          <section class="profile__section" aria-labelledby="profile-works">
            <h2 id="profile-works">${te(L.works)}</h2>
            <ul class="profile__list">${person.works.map(work => `<li>${te(work)}</li>`).join('')}</ul>
          </section>

          <section class="profile__section" aria-labelledby="profile-pubs">
            <h2 id="profile-pubs">${te(L.publications)}</h2>
            <ol class="profile__pubs" role="list">
              ${person.publications.map(pub => `
                <li><span class="profile__year">${RS.lang === 'th' ? pub.year + 543 : pub.year}</span><span>${te(pub.title)}</span></li>`).join('')}
            </ol>
          </section>

          <a class="link-arrow" href="${escapeHTML(RS.url('pages/fellows.html'))}"><span>${te(L.backToDirectory)}</span>${icon('arrow')}</a>
        </div>
      </div>`;
  }

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
    initDirectory();
    initProfile();
    initSitemap();
  });
})();
