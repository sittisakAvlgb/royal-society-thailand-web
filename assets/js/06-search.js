/* ============================================================================
 * 06-search.js — Universal search
 * ============================================================================
 *
 *  1. Search engine      RS.searchEngine.query(q, filters)
 *  2. Autocomplete       combobox with grouped results (hero + search panel)
 *  3. Search panel       <dialog> opened by [data-focus-search] or "/"
 *  4. Results page       #search-results on pages/search.html
 *
 *  Data: window.RS_SEARCH_INDEX (+ window.RS_FELLOWS when loaded).
 *  TODO (Backend): replace engine.query() with the search API; keep the
 *  record shape documented in data/search-index.js.
 *
 *  Security: queries are only ever rendered through RS.escapeHTML().
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const CFG = window.RS_CONFIG;
  if (!RS || !CFG) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const TYPES = window.RS_SEARCH_TYPES || {};
  const TOPICS = window.RS_TOPICS || {};
  const MAX_QUERY = 100;
  const RECENT_KEY = 'rs-recent-searches';

  const L = {
    official: { th: 'ข้อมูลอย่างเป็นทางการ', en: 'Official data' },
    recent: { th: 'คำค้นล่าสุด', en: 'Recent searches' },
    popular: { th: 'คำค้นยอดนิยม', en: 'Popular searches' },
    services: { th: 'บริการที่เกี่ยวข้อง', en: 'Related services' },
    clear: { th: 'ล้าง', en: 'Clear' },
    noRecent: { th: 'ยังไม่มีคำค้นล่าสุด', en: 'No recent searches' },
    seeAll: { th: 'ดูผลการค้นหาทั้งหมดสำหรับ', en: 'See all results for' },
    noLatest: { th: 'ยังไม่มีผลงานตามตัวกรองนี้', en: 'No works match these filters yet.' },
    noSuggest: { th: 'ไม่พบคำแนะนำ กด Enter เพื่อค้นหาทั้งเว็บไซต์', en: 'No suggestions. Press Enter to search the whole site.' },
    count: { th: 'พบ {n} รายการ', en: '{n} results' },
    suggestCount: { th: 'มีคำแนะนำ {n} รายการ ใช้ลูกศรขึ้นลงเพื่อเลือก', en: '{n} suggestions available. Use up and down arrows to choose.' },
    close: { th: 'ปิดการค้นหา', en: 'Close search' },
    hint: { th: 'กด / เพื่อเปิดการค้นหา · Esc เพื่อปิด', en: 'Press / to open search · Esc to close' },
    source: { th: 'แหล่งข้อมูล', en: 'Source' },
    updated: { th: 'เผยแพร่', en: 'Published' },
    thOnly: { th: 'ภาษาไทย', en: 'Thai only' },
    found: { th: 'พบข้อมูลอย่างเป็นทางการ', en: 'Official match' },
    dateInSource: { th: 'ดูวันที่ในระบบต้นทาง', en: 'See date in source system' },
    viewSource: { th: 'ดูข้อมูลต้นฉบับ', en: 'View original record' }
  };

  const fill = (template, n) => t(template).replace('{n}', RS.formatNumber(n));

  /* ==================================================================== *
   * 1. Search engine
   * ==================================================================== */

  const normalize = value => String(value || '').toLowerCase().normalize('NFC').replace(/\s+/g, ' ').trim();

  function allRecords() {
    const people = (window.RS_FELLOWS || []).map(person => ({
      id: `person-${person.id}`,
      type: 'person',
      title: person.name,
      alt: t(person.title),
      summary: person.expertise,
      source: CFG.academies.find(a => a.id === person.academy)?.name,
      href: `pages/fellow.html?id=${encodeURIComponent(person.id)}`,
      date: null,
      academy: person.academy,
      topic: person.topic,
      contentLang: 'th-en',
      keywords: person.keywords || []
    }));
    return [...(window.RS_SEARCH_INDEX || []), ...people];
  }

  function score(record, q) {
    const title = normalize(record.title.th);
    const titleEn = normalize(record.title.en);
    const alt = normalize(record.alt);
    const keywords = (record.keywords || []).map(normalize);

    if (title === q || alt === q || titleEn === q || keywords.includes(q)) return 100;
    if (title.startsWith(q) || alt.startsWith(q) || titleEn.startsWith(q)) return 70;
    if (title.includes(q) || titleEn.includes(q) || alt.includes(q)) return 50;
    if (keywords.some(k => k.includes(q))) return 35;
    if (normalize(record.summary?.th).includes(q) || normalize(record.summary?.en).includes(q)) return 15;
    return 0;
  }

  const yearOf = record => (record.date ? new Date(record.date).getFullYear() : null);

  const FILTER_KEYS = ['type', 'academy', 'topic', 'year', 'inlang'];

  function matchesFilters(record, filters) {
    return FILTER_KEYS.every(key => {
      const values = filters[key];
      if (!values || !values.length) return true;
      if (key === 'year') return values.includes(String(yearOf(record)));
      if (key === 'inlang') return values.some(v => (record.contentLang || '').includes(v));
      return values.includes(record[key]);
    });
  }

  const engine = {
    query(rawQuery, filters = {}) {
      const q = normalize(rawQuery).slice(0, MAX_QUERY);
      const records = allRecords();
      const scored = q
        ? records.map(record => ({ record, score: score(record, q) })).filter(item => item.score > 0)
        : records.map(record => ({ record, score: 1 }));

      /* Official data first when scores tie */
      scored.sort((a, b) =>
        b.score - a.score ||
        Number(Boolean(TYPES[b.record.type]?.official)) - Number(Boolean(TYPES[a.record.type]?.official)));

      const matched = scored.map(item => item.record);
      return { all: matched, results: matched.filter(record => matchesFilters(record, filters)), q };
    },

    /** Exact official matches — used by the answer panel */
    official(rawQuery) {
      const q = normalize(rawQuery);
      if (!q) return [];
      return allRecords().filter(record => TYPES[record.type]?.official && score(record, q) >= 70);
    },

    group(records, perGroup = 3) {
      const groups = new Map();
      records.forEach(record => {
        if (!groups.has(record.type)) groups.set(record.type, []);
        const list = groups.get(record.type);
        if (list.length < perGroup) list.push(record);
      });
      return [...groups.entries()];
    }
  };

  RS.searchEngine = engine;

  /* ---- Recent searches (stored on this device only) -------------------- */

  const recent = {
    list() {
      try { return JSON.parse(RS.storage.get(RECENT_KEY, '[]')).slice(0, 5); } catch { return []; }
    },
    add(query) {
      const q = query.trim().slice(0, MAX_QUERY);
      if (!q) return;
      RS.storage.set(RECENT_KEY, JSON.stringify([q, ...recent.list().filter(item => item !== q)].slice(0, 5)));
    },
    clear() { RS.storage.set(RECENT_KEY, '[]'); }
  };

  /* ---- Shared rendering helpers ---------------------------------------- */

  /** Highlight the query inside text, escaping every segment */
  function highlight(text, query) {
    const source = String(text || '');
    const q = query.trim();
    const index = q ? source.toLowerCase().indexOf(q.toLowerCase()) : -1;
    if (index < 0) return escapeHTML(source);
    return `${escapeHTML(source.slice(0, index))}<mark>${escapeHTML(source.slice(index, index + q.length))}</mark>${escapeHTML(source.slice(index + q.length))}`;
  }

  const recordHref = record => RS.url(record.href);
  const isExternalRecord = record => RS.isExternal(record.href);

  function typeBadge(type) {
    const info = TYPES[type];
    if (!info) return '';
    return `<span class="badge badge--type">${icon(info.icon)}${te(info.label)}</span>`;
  }

  /** params: { key: value | [values] } — arrays repeat the key (?type=a&type=b) */
  function resultsUrl(query, params = {}) {
    const search = new URLSearchParams(query ? { q: query } : {});
    Object.entries(params).forEach(([key, value]) =>
      [].concat(value).filter(Boolean).forEach(item => search.append(key, item)));
    return RS.url(`pages/search.html?${search}`);
  }

  /* ==================================================================== *
   * 2. Autocomplete (ARIA combobox, grouped listbox)
   * ==================================================================== */

  let comboboxCount = 0;

  function createCombobox({ form, input, listbox, onIdle, getFilters, allowEmpty }) {
    const id = listbox.id || `rs-listbox-${++comboboxCount}`;
    listbox.id = id;
    listbox.setAttribute('role', 'listbox');

    const status = document.createElement('div');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', id);
    input.setAttribute('autocomplete', 'off');
    input.maxLength = MAX_QUERY;

    let options = [];
    let active = -1;
    let statusTimer = null;

    function hide() {
      listbox.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      active = -1;
    }

    function setActive(index) {
      options.forEach(option => option.setAttribute('aria-selected', 'false'));
      active = index;
      if (index < 0) {
        input.removeAttribute('aria-activedescendant');
        return;
      }
      const option = options[index];
      option.setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    }

    function render() {
      const query = input.value.trim();

      if (!query) {
        listbox.innerHTML = '';
        hide();
        onIdle?.(true);
        return;
      }
      onIdle?.(false);

      const filters = getFilters?.() || {};
      const { results } = engine.query(query, filters);
      const groups = engine.group(results.slice(0, 24));
      const total = groups.reduce((sum, [, list]) => sum + list.length, 0);

      let n = 0;
      const groupsHTML = groups.slice(0, 5).map(([type, list]) => {
        const labelId = `${id}-g-${type}`;
        return `
          <div class="suggestion-group" role="group" aria-labelledby="${labelId}">
            <div class="suggestion-group__label" id="${labelId}">${te(TYPES[type]?.label)}</div>
            ${list.map(record => `
              <a class="suggestion-item" role="option" id="${id}-o-${n++}" aria-selected="false"
                 href="${escapeHTML(recordHref(record))}"${isExternalRecord(record) ? ' target="_blank" rel="noopener"' : ''}
                 data-query-value="${escapeHTML(t(record.title))}">
                ${icon(TYPES[type]?.icon || 'search')}
                <span class="suggestion-item__text">
                  <span class="suggestion-item__title">${highlight(t(record.title), query)}</span>
                  <span class="suggestion-item__sub">${escapeHTML(record.alt || t(record.summary))}</span>
                </span>
                ${TYPES[type]?.official ? `<span class="badge badge--official">${icon('verified')}<span class="visually-hidden">${te(L.official)}</span></span>` : ''}
              </a>`).join('')}
          </div>`;
      }).join('');

      listbox.innerHTML = `
        ${total ? groupsHTML : `<p class="suggestion-group__label">${te(L.noSuggest)}</p>`}
        <a class="suggestions__all" href="${escapeHTML(resultsUrl(query, filters))}" tabindex="-1">
          ${icon('search')}<span>${te(L.seeAll)} “${escapeHTML(query)}”</span>
        </a>`;

      options = qsa('[role="option"]', listbox);
      listbox.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      setActive(-1);

      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => { status.textContent = fill(L.suggestCount, total); }, 500);
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', () => { if (input.value.trim()) render(); });

    input.addEventListener('keydown', event => {
      const open = !listbox.hidden && options.length;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (listbox.hidden) render();
        if (options.length) setActive((active + 1) % options.length);
      } else if (event.key === 'ArrowUp') {
        if (!open) return;
        event.preventDefault();
        setActive(active <= 0 ? options.length - 1 : active - 1);
      } else if (event.key === 'Enter' && open && active >= 0) {
        event.preventDefault();
        recent.add(options[active].dataset.queryValue || input.value);
        options[active].click();
      } else if (event.key === 'Escape' && !listbox.hidden) {
        event.stopPropagation();
        event.preventDefault();
        hide();
      }
    });

    listbox.addEventListener('click', event => {
      const option = event.target.closest('[data-query-value]');
      if (option) recent.add(option.dataset.queryValue);
    });

    document.addEventListener('pointerdown', event => {
      if (!form.contains(event.target)) hide();
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const query = input.value.trim().slice(0, MAX_QUERY);
      if (!query && !allowEmpty) { input.focus(); return; }
      const target = resultsUrl(query, getFilters?.() || {});
      if (RS.lockedUrl?.(target)) { RS.lockNotice(); return; }   /* demo lock */
      if (query) recent.add(query);
      location.href = target;
    });

    return { render, hide };
  }

  /* ---- Hero search (#smart-search / #global-search / #suggestions) ----- */

  function initHeroSearch() {
    const form = qs('#smart-search');
    const input = qs('#global-search');
    const panel = qs('#suggestions');
    if (!form || !input || !panel) return;

    /* Custom selects (04-interactions.js) keep their value in a hidden input:
       kind (comma-separated types) → type, plus academy / topic / year */
    const selectInputs = qsa('[data-select] input[type="hidden"]', form);
    const getFilters = () => {
      const filters = {};
      selectInputs.forEach(field => {
        if (field.value) filters[field.name === 'kind' ? 'type' : field.name] = field.value.split(',');
      });
      return filters;
    };

    /* An empty query with filters browses the works that match them */
    const combo = createCombobox({ form, input, listbox: panel, getFilters, allowEmpty: true });

    selectInputs.forEach(field => field.addEventListener('change', () => { if (input.value.trim()) combo.render(); }));

    /* Latest works of the chosen type and filters, newest first (undated last) */
    const latest = qs('#hs-latest');
    const latestAll = qs('#hs-latest-all');
    const yearLabel = date => {
      if (!date) return '–';
      const year = new Date(date).getFullYear();
      return String(RS.lang === 'en' ? year : year + 543);
    };
    const renderLatest = () => {
      if (!latest) return;
      const filters = getFilters();
      const works = engine.query('', filters).results
        .slice()
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .slice(0, 3);
      latest.innerHTML = works.length
        ? works.map((record, index) => {
            const academy = CFG.academies.find(item => item.id === record.academy);
            return `
              <li><a class="latest-item" href="${escapeHTML(recordHref(record))}"${isExternalRecord(record) ? ' target="_blank" rel="noopener"' : ''}>
                <span class="latest-item__num" aria-hidden="true">${index + 1}</span>
                <span class="latest-item__line">
                  <span class="latest-item__title">${escapeHTML(t(record.title))}</span>
                  <span class="latest-item__leader" aria-hidden="true"></span>
                </span>
                <span class="latest-item__year">${yearLabel(record.date)}</span>
                <span class="latest-item__meta">${te(TYPES[record.type]?.label)}${academy ? ` · ${te(academy.name)}` : ''}</span>
              </a></li>`;
          }).join('')
        : `<li class="latest-list__empty">${te(L.noLatest)}</li>`;
      if (latestAll) latestAll.href = resultsUrl('', filters);
    };
    /* How many works each option would give, with the other filters as they are */
    const renderCounts = () => {
      selectInputs.forEach(field => {
        const key = field.name === 'kind' ? 'type' : field.name;
        const others = getFilters();
        delete others[key];
        qsa('[role="option"]', field.closest('[data-select]')).forEach(option => {
          const value = option.dataset.value || '';
          const filters = value ? { ...others, [key]: value.split(',') } : others;
          const count = engine.query('', filters).results.length;
          const slot = qs('.rs-select__count', option);
          if (slot) slot.textContent = String(count);
          option.classList.toggle('is-empty', count === 0);
        });
      });
    };
    /* The chip in the search bar shows the icon of the chosen type */
    const syncIcon = field => {
      const root = field.closest('[data-select]');
      const chosen = qs('[aria-selected="true"] .rs-select__opt-icon use', root);
      const shown = qs('.rs-select__icon use', root);
      if (chosen && shown) shown.setAttribute('href', chosen.getAttribute('href'));
    };
    selectInputs.forEach(field => field.addEventListener('change', () => { syncIcon(field); renderLatest(); renderCounts(); }));
    renderLatest();
    renderCounts();

    /* Quick query buttons: <button data-query="คำค้น"> */
    qsa('[data-query]').forEach(button => {
      button.addEventListener('click', () => {
        input.value = RS.lang === 'en' && button.dataset.queryEn ? button.dataset.queryEn : button.dataset.query || '';
        input.focus();
        combo.render();
      });
    });

    typeHints(input);
  }

  /** Types example queries into the placeholder, one after another, while the
   *  field is empty and unfocused: <input data-hints="a|b" data-hints-en="a|b"> */
  function typeHints(input) {
    if (!input.dataset.hints || RS.reduceMotion()) return;
    const hints = () => ((RS.lang === 'en' && input.dataset.hintsEn) || input.dataset.hints).split('|');
    const prefix = () => (RS.lang === 'en' ? 'Try: ' : 'ลองค้นหา: ');
    let base = null;
    let index = 0;
    let chars = 0;
    let timer = null;

    const tick = () => {
      const idle = !input.value && document.activeElement !== input;
      if (!idle) {
        if (base !== null) { input.placeholder = base; base = null; }
        timer = setTimeout(tick, 600);
        return;
      }
      if (base === null) base = input.placeholder;
      const list = hints();
      const word = list[index % list.length];
      chars += 1;
      input.placeholder = prefix() + word.slice(0, chars);
      if (chars >= word.length) {
        chars = 0;
        index += 1;
        timer = setTimeout(tick, 2200);
      } else {
        timer = setTimeout(tick, 70);
      }
    };
    timer = setTimeout(tick, 1200);
    input.addEventListener('focus', () => { clearTimeout(timer); if (base !== null) { input.placeholder = base; base = null; } timer = setTimeout(tick, 600); });
  }

  /* ==================================================================== *
   * 3. Search panel (dialog)
   * ==================================================================== */

  function renderDialog() {
    const services = CFG.services.filter(service => service.primary).slice(0, 4);

    return `
      <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-dialog-title">
        <div class="search-dialog__inner">
          <h2 id="search-dialog-title" class="visually-hidden">${te(CFG.ui.searchSite)}</h2>
          <div class="search-dialog__bar">
            <form class="search-box" id="dialog-search" role="search" action="${escapeHTML(RS.url('pages/search.html'))}">
              <label class="visually-hidden" for="dialog-search-input">${te(CFG.ui.searchSite)}</label>
              <div class="search-box__field">
                ${icon('search')}
                <input class="search-box__input" id="dialog-search-input" name="q" type="search"
                       placeholder="${te(CFG.ui.searchPlaceholder)}" enterkeyhint="search">
                <button class="btn btn--primary search-box__submit" type="submit">${icon('arrow')}<span>${te(CFG.ui.search)}</span></button>
              </div>
              <div class="suggestions" id="dialog-suggestions" hidden></div>
            </form>
            <button class="header-btn" type="button" data-search-close aria-label="${te(L.close)}">${icon('x')}</button>
          </div>

          <div class="search-dialog__idle" data-search-idle>
            <section aria-labelledby="sd-recent">
              <h2 id="sd-recent">${icon('history')}<span>${te(L.recent)}</span></h2>
              <div data-recent-list></div>
            </section>
            <section aria-labelledby="sd-popular">
              <h2 id="sd-popular">${icon('trending')}<span>${te(L.popular)}</span></h2>
              <div class="tag-list">
                ${(window.RS_POPULAR_SEARCHES || []).map(item =>
                  `<a class="tag" href="${escapeHTML(resultsUrl(t(item)))}">${te(item)}</a>`).join('')}
              </div>
            </section>
            <section aria-labelledby="sd-services">
              <h2 id="sd-services">${icon('book')}<span>${te(L.services)}</span></h2>
              <div class="service-links">
                ${services.map(service => `
                  <a href="${escapeHTML(RS.url(service.href))}"${service.external ? ' target="_blank" rel="noopener"' : ''}>
                    ${icon(service.icon)}<span>${te(service.title)}</span>
                    ${service.external ? `${icon('external')}<span class="visually-hidden">${te(CFG.ui.external)}</span>` : icon('arrow')}
                  </a>`).join('')}
              </div>
            </section>
          </div>
          <p class="search-dialog__hint">${te(L.hint)}</p>
        </div>
      </dialog>`;
  }

  function renderRecent(root) {
    const slot = qs('[data-recent-list]', root);
    if (!slot) return;
    const items = recent.list();

    slot.innerHTML = items.length
      ? `<div class="tag-list">${items.map(item =>
          `<a class="tag" href="${escapeHTML(resultsUrl(item))}">${escapeHTML(item)}</a>`).join('')}
          <button class="btn btn--ghost btn--sm" type="button" data-recent-clear>${te(L.clear)}</button></div>`
      : `<p class="text-secondary">${te(L.noRecent)}</p>`;
  }

  function initSearchDialog() {
    const triggers = qsa('[data-focus-search]');
    if (!triggers.length) return;

    document.body.insertAdjacentHTML('beforeend', renderDialog());
    const dialog = qs('#search-dialog');
    const form = qs('#dialog-search', dialog);
    const input = qs('#dialog-search-input', dialog);
    const idle = qs('[data-search-idle]', dialog);

    /* <dialog> unsupported (very old browsers): fall back to the results page */
    if (typeof dialog.showModal !== 'function') {
      triggers.forEach(trigger => trigger.addEventListener('click', () => { location.href = RS.url('pages/search.html'); }));
      return;
    }

    createCombobox({
      form,
      input,
      listbox: qs('#dialog-suggestions', dialog),
      onIdle: isIdle => { idle.hidden = !isIdle; }
    });

    let opener = null;

    function open(trigger) {
      opener = trigger || document.activeElement;
      renderRecent(dialog);
      dialog.showModal();
      document.body.classList.add('search-open');
      input.focus();
      input.select();
    }

    dialog.addEventListener('close', () => {
      document.body.classList.remove('search-open');
      opener?.focus?.();
    });

    triggers.forEach(trigger => trigger.addEventListener('click', () => open(trigger)));
    qs('[data-search-close]', dialog).addEventListener('click', () => dialog.close());

    /* Click on the backdrop closes */
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('click', event => {
      if (!event.target.closest('[data-recent-clear]')) return;
      recent.clear();
      renderRecent(dialog);
      input.focus();
    });

    /* "/" opens search unless the user is typing somewhere */
    document.addEventListener('keydown', event => {
      if (event.key !== '/' || dialog.open) return;
      const el = document.activeElement;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      event.preventDefault();
      open(triggers[0]);
    });
  }

  /* ==================================================================== *
   * 4. Results page
   * ==================================================================== */

  const P = {
    filters: { th: 'ตัวกรอง', en: 'Filters' },
    type: { th: 'ประเภทข้อมูล', en: 'Content type' },
    academy: { th: 'สำนัก', en: 'Academy' },
    topic: { th: 'หมวดหมู่', en: 'Category' },
    year: { th: 'ปีเผยแพร่', en: 'Year published' },
    inlang: { th: 'ภาษา', en: 'Language' },
    clearAll: { th: 'ล้างตัวกรองทั้งหมด', en: 'Clear all filters' },
    all: { th: 'ทุกประเภท', en: 'All types' },
    resultsFor: { th: 'ผลการค้นหา', en: 'Results for' },
    browse: { th: 'เลือกดูข้อมูลทั้งหมด', en: 'Browse all content' },
    emptyTitle: { th: 'ไม่พบข้อมูลสำหรับ', en: 'No results for' },
    emptyTips: { th: 'ลองวิธีเหล่านี้', en: 'Try the following' },
    tipSpell: { th: 'ตรวจสอบการสะกด', en: 'Check the spelling' },
    tipSimilar: { th: 'ลองใช้คำใกล้เคียงหรือคำที่สั้นลง', en: 'Try a similar or shorter word' },
    tipFilters: { th: 'ล้างตัวกรองที่เลือกไว้', en: 'Remove selected filters' },
    tipDict: { th: 'ค้นหาในพจนานุกรม', en: 'Search the Dictionary' },
    tipCoined: { th: 'ค้นหาศัพท์บัญญัติ', en: 'Search Coined Terms' },
    langTh: { th: 'ภาษาไทย', en: 'Thai' },
    langEn: { th: 'ภาษาอังกฤษ', en: 'English' }
  };

  function readParams() {
    const params = new URLSearchParams(location.search);
    const filters = {};
    FILTER_KEYS.forEach(key => {
      const values = params.getAll(key).filter(Boolean);
      if (values.length) filters[key] = values;
    });
    return { q: (params.get('q') || '').slice(0, MAX_QUERY), filters };
  }

  function writeParams(q, filters) {
    const next = new URL(location.href);
    ['q', ...FILTER_KEYS].forEach(key => next.searchParams.delete(key));
    if (q) next.searchParams.set('q', q);
    FILTER_KEYS.forEach(key => (filters[key] || []).forEach(value => next.searchParams.append(key, value)));
    history.replaceState(null, '', next);
  }

  function facetOptions(records) {
    const count = (fn) => records.reduce((map, record) => {
      const values = [].concat(fn(record)).filter(value => value != null && value !== '');
      values.forEach(value => map.set(String(value), (map.get(String(value)) || 0) + 1));
      return map;
    }, new Map());

    return {
      type: [...count(r => r.type)].map(([value, n]) => ({ value, n, label: TYPES[value]?.label })),
      academy: [...count(r => r.academy)].map(([value, n]) => ({ value, n, label: CFG.academies.find(a => a.id === value)?.name })),
      topic: [...count(r => r.topic)].map(([value, n]) => ({ value, n, label: TOPICS[value] })),
      year: [...count(yearOf)].sort((a, b) => b[0] - a[0]).map(([value, n]) => ({
        value, n, label: RS.lang === 'th' ? String(Number(value) + 543) : value
      })),
      inlang: [...count(r => (r.contentLang || '').split('-'))].map(([value, n]) => ({
        value, n, label: value === 'th' ? P.langTh : P.langEn
      }))
    };
  }

  function renderFilters(root, records, filters) {
    const facets = facetOptions(records);
    const active = FILTER_KEYS.reduce((sum, key) => sum + (filters[key]?.length || 0), 0);

    root.innerHTML = `
      ${FILTER_KEYS.map(key => facets[key].length ? `
        <fieldset class="filter-group">
          <legend>${te(P[key])}</legend>
          ${facets[key].map(option => `
            <label class="check">
              <input type="checkbox" name="${key}" value="${escapeHTML(option.value)}"${filters[key]?.includes(option.value) ? ' checked' : ''}>
              <span>${te(option.label)}</span>
              <span class="check__count">${RS.formatNumber(option.n)}</span>
            </label>`).join('')}
        </fieldset>` : '').join('')}
      ${active ? `<button class="btn btn--ghost btn--sm" type="button" data-clear-filters>${te(P.clearAll)}</button>` : ''}`;
  }

  function renderResult(record, query) {
    const type = TYPES[record.type] || {};
    const external = isExternalRecord(record);
    const date = record.date
      ? `<span>${te(L.updated)} <time datetime="${escapeHTML(record.date)}">${escapeHTML(RS.formatDate(record.date))}</time></span>`
      : '';

    return `
      <li class="result-item stretched">
        <div class="result-item__badges">
          ${typeBadge(record.type)}
          ${type.official ? `<span class="badge badge--official">${icon('verified')}${te(L.official)}</span>` : ''}
        </div>
        <h3 class="result-item__title">
          <a class="stretched-link" href="${escapeHTML(recordHref(record))}"${external ? ' target="_blank" rel="noopener"' : ''}>
            ${highlight(t(record.title), query)}${external ? `${icon('external')}<span class="visually-hidden">${te(CFG.ui.external)}</span>` : ''}
          </a>
        </h3>
        ${record.alt ? `<p class="result-item__alt" lang="${record.type === 'person' ? RS.lang : 'en'}">${escapeHTML(record.alt)}</p>` : ''}
        <p class="result-item__summary">${te(record.summary)}</p>
        <p class="result-item__meta">
          ${record.source ? `<span>${te(L.source)}: ${te(record.source)}</span>` : ''}
          ${date}
          ${RS.lang === 'en' && record.contentLang === 'th' ? `<span class="badge">${te(L.thOnly)}</span>` : ''}
        </p>
      </li>`;
  }

  function renderEmpty(query, hasFilters) {
    const tip = (label, href, external) => `
      <li><a href="${escapeHTML(href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${te(label)}${external ? `${icon('external')}<span class="visually-hidden">${te(CFG.ui.external)}</span>` : ''}</a></li>`;

    return `
      <div class="state state--empty">
        <p class="state__icon" aria-hidden="true">${icon('search')}</p>
        <h2 class="state__title">${te(P.emptyTitle)} “${escapeHTML(query)}”</h2>
        <p class="state__text">${te(P.emptyTips)}</p>
        <ul class="state__list">
          <li>${te(P.tipSpell)}</li>
          <li>${te(P.tipSimilar)}</li>
          ${hasFilters ? `<li><button class="btn btn--ghost btn--sm" type="button" data-clear-filters>${te(P.tipFilters)}</button></li>` : ''}
          ${tip(P.tipDict, 'https://dictionary.orst.go.th/', true)}
          ${tip(P.tipCoined, 'https://coined-word.orst.go.th/', true)}
        </ul>
      </div>`;
  }

  /** Official record that exactly matches the query, shown above the results */
  function renderOfficialAnswer(slot, query) {
    const record = query ? engine.official(query)[0] : null;
    slot.hidden = !record;
    if (!record) {
      slot.innerHTML = '';
      return;
    }

    const external = isExternalRecord(record);
    const date = record.date
      ? `<time datetime="${escapeHTML(record.date)}">${escapeHTML(RS.formatDate(record.date))}</time>`
      : te(L.dateInSource);

    slot.innerHTML = `
      <section class="trust-block trust-block--official trust-block--compact" aria-labelledby="search-answer-title">
        <header class="trust-block__head">
          <span class="badge badge--official">${icon('verified')}<span id="search-answer-title">${te(L.found)}</span></span>
        </header>
        <div class="official-record">
          <p class="official-record__term" lang="th">${escapeHTML(record.title.th)}</p>
          ${record.alt ? `<p class="official-record__alt" lang="en">${escapeHTML(record.alt)}</p>` : ''}
          <p class="official-record__summary">${te(record.summary)}</p>
          <dl class="official-record__meta">
            <div><dt>${te(L.source)}</dt><dd>${te(record.source)} ${typeBadge(record.type)}</dd></div>
            <div><dt>${te(L.updated)}</dt><dd>${date}</dd></div>
          </dl>
          <a class="btn btn--secondary btn--sm" href="${escapeHTML(recordHref(record))}"${external ? ' target="_blank" rel="noopener"' : ''}>
            ${te(L.viewSource)}${external ? `${icon('external')}<span class="visually-hidden">${te(CFG.ui.external)}</span>` : icon('arrow')}
          </a>
        </div>
      </section>`;
  }

  function initResultsPage() {
    const root = qs('#search-results');
    if (!root) return;

    const form = qs('#results-search');
    const input = qs('#results-search-input');
    const list = qs('[data-results-list]', root);
    const filterRoot = qs('[data-filters]', root);
    const summary = qs('[data-results-summary]', root);
    const heading = qs('[data-results-heading]');
    const filterToggle = qs('[data-filter-toggle]', root);
    const filterPanel = qs('[data-filter-panel]', root);
    const answerSlot = qs('#search-answer');

    let { q, filters } = readParams();
    if (input) input.value = q;

    function update({ push = true } = {}) {
      const { all, results } = engine.query(q, filters);
      const hasFilters = FILTER_KEYS.some(key => filters[key]?.length);

      if (push) writeParams(q, filters);

      if (heading) heading.textContent = q ? `${t(P.resultsFor)} “${q}”` : t(P.browse);
      document.title = `${q ? `${q} — ` : ''}${t({ th: 'ค้นหา', en: 'Search' })} | ${t(CFG.site.name)}`;

      summary.textContent = fill(L.count, results.length);
      renderFilters(filterRoot, all, filters);

      list.innerHTML = results.length
        ? `<ol class="result-list" role="list">${results.map(record => renderResult(record, q)).join('')}</ol>`
        : renderEmpty(q, hasFilters);

      list.setAttribute('aria-busy', 'false');
      if (answerSlot) renderOfficialAnswer(answerSlot, q);
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: list.parentElement || list }));
    }

    filterRoot.addEventListener('change', event => {
      const box = event.target.closest('input[type="checkbox"]');
      if (!box) return;
      filters = { ...filters };
      const values = new Set(filters[box.name] || []);
      box.checked ? values.add(box.value) : values.delete(box.value);
      filters[box.name] = [...values];
      update();
      /* Filter markup is re-rendered — keep keyboard focus on the same option */
      qs(`input[name="${box.name}"][value="${CSS.escape(box.value)}"]`, filterRoot)?.focus();
    });

    root.addEventListener('click', event => {
      if (!event.target.closest('[data-clear-filters]')) return;
      filters = {};
      update();
      input?.focus();
    });

    if (form && input) {
      const combo = createCombobox({ form, input, listbox: qs('#results-suggestions') });
      /* On this page, submitting updates results in place */
      form.addEventListener('submit', event => {
        event.stopImmediatePropagation();
        event.preventDefault();
        q = input.value.trim().slice(0, MAX_QUERY);
        recent.add(q);
        combo.hide();
        update();
      }, { capture: true });
    }

    /* Mobile: filters collapse behind a toggle */
    if (filterToggle && filterPanel) {
      const desktop = window.matchMedia('(min-width: 1024px)');
      const sync = () => {
        filterPanel.hidden = !desktop.matches && filterToggle.getAttribute('aria-expanded') !== 'true';
        filterToggle.hidden = desktop.matches;
      };
      filterToggle.addEventListener('click', () => {
        filterToggle.setAttribute('aria-expanded', String(filterToggle.getAttribute('aria-expanded') !== 'true'));
        sync();
      });
      desktop.addEventListener('change', sync);
      sync();
    }

    update({ push: false });
  }

  /** Initialises every search surface present on the page. */
  function initSearch() {
    initHeroSearch();
    initSearchDialog();
    initResultsPage();
  }

  RS.ready(initSearch);
})();
