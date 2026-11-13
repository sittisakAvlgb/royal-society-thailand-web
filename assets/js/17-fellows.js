/* ============================================================================
 * 17-fellows.js — Fellows directory (pages/fellows.html) and profile
 *                 (pages/fellow.html?id=<id>)
 * ============================================================================
 *
 *  Directory: the membership tallied on the cream band; academy tabs, a
 *  search, the membership select and a grid / list switch in one bar (the
 *  news list's bar); every member at one size — a grid of portrait cards or
 *  a register of rows grouped by initial, like a printed roll; the shared
 *  pager with 12, 24 or 48 to a page.
 *  Directory by academy (fellows-academies.html): each academy's roll.
 *  State lives in the URL (?academy= &type= &q=) so a filtered view can be
 *  shared; the grid / list choice is remembered in this browser.
 *
 *  Profile: the cream band with the portrait beside the record (membership ·
 *  academy, title, name, the other-language name, a ruled table of facts,
 *  share / print); biography, expertise, selected works and publications set
 *  like the publication page; other members as cards.
 *
 *  Data: window.RS_FELLOWS and RS_MEMBER_TYPES (data/fellows.js — SAMPLE).
 *  Until the Office supplies official portraits, a portrait is the member's
 *  initial set in a gold frame on cream paper.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const CFG = window.RS_CONFIG;
  const PEOPLE = window.RS_FELLOWS || [];
  if (!RS || !CFG || !PEOPLE.length || !RS.fellowCard) return;   /* needs 08-directory.js first */

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const TYPES = window.RS_MEMBER_TYPES || {};
  const TOPICS = window.RS_TOPICS || {};
  const VIEW_KEY = 'rs-fellows-view';
  const SIZES = [12, 24, 48];                       /* per page: rows of four — the reader picks */
  const SIZE_KEY = 'rs-fellows-size';
  /* membership in the order the Office asked for: honorary, associate, then Fellows */
  const ORDER = ['honorary', 'associate', 'fellow'];
  const rankOf = person => { const i = ORDER.indexOf(person.memberType); return i < 0 ? ORDER.length : i; };

  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    people: { th: '{n} คน', en: '{n}' },
    found: { th: 'พบ {n} คน', en: '{n} people' },
    academies: { th: 'สำนัก', en: 'Academies' },
    academyN: { th: '{n} สำนัก', en: '{n}' },
    open: { th: 'ดูประวัติ', en: 'View profile' },
    appointed: { th: 'ได้รับแต่งตั้ง', en: 'Appointed' },
    academy: { th: 'สำนัก', en: 'Academy' },
    field: { th: 'สาขาวิชา', en: 'Field' },
    type: { th: 'ประเภทสมาชิก', en: 'Membership' },
    group: { th: 'ประเภทวิชา', en: 'Discipline' },
    source: { th: 'ประวัติบนเว็บไซต์สำนัก', en: 'Profile on the academy website' },
    newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' },
    showAll: { th: 'แสดงทั้งหมด {n} รายการ', en: 'Show all {n}' },
    items: { th: '{n} รายการ', en: '{n}' },
    noProfile: { th: 'ประวัติฉบับเต็มอยู่ระหว่างรวบรวม', en: 'The full profile is being prepared.' },
    notFound: { th: 'ไม่พบข้อมูลบุคคลนี้', en: 'Profile not found' },
    notFoundText: { th: 'ลิงก์อาจไม่ถูกต้องหรือข้อมูลถูกย้ายแล้ว', en: 'The link may be incorrect or the profile has moved.' },
    back: { th: 'กลับไปหน้ารายชื่อ', en: 'Back to the directory' }
  };

  const academyOf = id => CFG.academies.find(academy => academy.id === id);
  const other = RS.lang === 'th' ? 'en' : 'th';
  const num = n => escapeHTML(RS.digits(String(n)));
  const year = y => (y ? num(RS.lang === 'th' ? y + 543 : y) : '');
  const profileURL = person => escapeHTML(RS.url(`pages/fellow.html?id=${encodeURIComponent(person.id)}`));
  const typeName = person => te(TYPES[person.memberType]);
  /* the field (สาขาวิชา), or the discipline (ประเภทวิชา) when no field is listed */
  const fieldOf = person => te(t(person.field) ? person.field : person.group);
  /* the name in the other language, only when it differs (English names are not yet supplied) */
  const altName = person => (person.name[other] && person.name[other] !== person.name.th ? person.name[other] : '');
  const both = value => (value ? [value.th, value.en] : []);
  const countOf = (list, type) => list.filter(person => person.memberType === type).length;

  /* the initial for the portrait plate: the first consonant of the given
     name (Thai leading vowels เ แ โ ใ ไ are skipped), or the first letter */
  const initialOf = person => {
    const name = t(person.name) || '';
    return (name.match(/[ก-ฮA-Za-z]/) || [name.charAt(0)])[0].toUpperCase();
  };
  const byName = (a, b) => t(a.name).localeCompare(t(b.name), RS.lang === 'th' ? 'th' : 'en');

  /* the portrait, the name with its title and the card are shared with the
     home and academy pages (08-directory.js) */
  const portrait = (person, extra) => RS.fellowPortrait(person, extra);
  const card = person => RS.fellowCard(person);

  /** Register row: portrait, who, field and expertise, membership and academy */
  function row(person) {
    return `
      <li>
        <a class="fellowx-row" href="${profileURL(person)}" data-academy="${escapeHTML(person.academy)}">
          ${portrait(person, ' fellowx-photo--sm')}
          <span class="fellowx-row__who">
            <span class="fellowx-row__name">${RS.fellowName(person)}</span>
            ${altName(person) ? `<span class="fellowx-row__alt" lang="${other}">${escapeHTML(altName(person))}</span>` : ''}
          </span>
          <span class="fellowx-row__field">
            <span class="fellowx-row__subject">${fieldOf(person)}</span>
            <span class="fellowx-row__expertise">${te(t(person.expertise) || person.group)}</span>
          </span>
          <span class="fellowx-row__meta">
            <span class="fellowx-card__type">${typeName(person)}</span>
            <span class="fellowx-card__academy">${te(academyOf(person.academy)?.name)}</span>
          </span>
          <span class="fellowx-row__go"><span class="visually-hidden">${te(L.open)}</span>${icon('arrow')}</span>
        </a>
      </li>`;
  }

  /* ==================================================================== *
   * Directory
   * ==================================================================== */

  function initDirectory() {
    const root = qs('[data-fellowx]');
    if (!root) return;

    const params = new URLSearchParams(location.search);
    const state = {
      academy: params.get('academy') || '',
      type: params.get('type') || '',
      topic: params.get('topic') || '',           /* from older links; no control of its own */
      q: params.get('q') || ''
    };
    let page = 1;
    let size = 24;
    try { const saved = Number(localStorage.getItem(SIZE_KEY)); if (SIZES.includes(saved)) size = saved; } catch { /* storage unavailable */ }
    let view = 'grid';
    try { if (localStorage.getItem(VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }

    const search = qs('[data-fellowx-search]', root);
    const typeField = qs('[data-fellowx-type]', root);
    if (search) search.value = state.q;
    RS.selectSet(typeField, state.type);

    const matches = person => {
      if (state.academy && person.academy !== state.academy) return false;
      if (state.type && person.memberType !== state.type) return false;
      if (state.topic && person.topic !== state.topic) return false;
      const q = state.q.trim().toLowerCase();
      if (!q) return true;
      return [...both(person.name), ...both(person.title), ...both(person.field), ...both(person.group),
        ...both(person.expertise), t(TOPICS[person.topic]), ...(person.keywords || [])]
        .filter(Boolean).join(' ').toLowerCase().includes(q);
    };

    /* the head: the membership tallied, then the three academies */
    const tally = qs('[data-fellowx-tally]');
    if (tally) {
      tally.innerHTML = ORDER.map(type => `
        <div class="series-facts__item"><dt>${te(TYPES[type])}</dt><dd>${num(t(L.people).replace('{n}', countOf(PEOPLE, type)))}</dd></div>`).join('') + `
        <div class="series-facts__item"><dt>${te(L.academies)}</dt><dd>${num(t(L.academyN).replace('{n}', CFG.academies.length))}</dd></div>`;
    }
    qsa('[data-fellowx-n]').forEach(el => { el.innerHTML = num(t(L.people).replace('{n}', countOf(PEOPLE, el.dataset.fellowxN))); });

    /* by academy: the compact rows, each with its count, filtering the directory */
    const academies = qs('[data-fellowx-academies]');
    if (academies) {
      academies.innerHTML = CFG.academies.map((academy, i) => {
        const members = PEOPLE.filter(person => person.academy === academy.id);
        const counts = ORDER.filter(type => countOf(members, type))
          .map(type => `${te(TYPES[type])} ${num(countOf(members, type))}`).join(' · ');
        return `
          <li class="acad-other" data-academy="${academy.id}">
            <a href="${escapeHTML(RS.url(`pages/fellows.html?academy=${academy.id}#fellow-directory`))}" data-fellowx-go="${academy.id}">
              <span class="acad-other__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
              <span class="acad-other__names">
                <span class="acad-other__name">${te(academy.name)}</span>
                <span class="fellowx-academies__count">${counts}</span>
              </span>
              <span class="acad-other__go">${icon('arrow')}</span>
            </a>
          </li>`;
      }).join('');
    }

    const list = qs('[data-fellowx-items]', root);
    const count = qs('[data-fellowx-count]', root);
    const empty = qs('[data-fellowx-empty]', root);
    const pagesNav = qs('[data-fellowx-pages]', root);

    function syncURL() {
      const next = new URL(location.href);
      ['academy', 'type', 'topic', 'q'].forEach(key => (state[key].trim() ? next.searchParams.set(key, state[key].trim()) : next.searchParams.delete(key)));
      history.replaceState(null, '', next);
    }

    /* the shared pager (RS.pagerHTML, 04-interactions.js): what is shown,
       first / previous / numbers / next / last, and members per page */
    function renderPages(pages, total) {
      pagesNav.hidden = !total;
      pagesNav.classList.add('pager');
      pagesNav.innerHTML = total ? RS.pagerHTML({ page, pages, total, size, sizes: SIZES, unit: { th: 'คน', en: total === 1 ? 'person' : 'people' } }) : '';
    }

    function render() {
      const found = PEOPLE.filter(matches).sort((a, b) => rankOf(a) - rankOf(b) || byName(a, b));
      const pages = Math.max(1, Math.ceil(found.length / size));
      page = Math.min(page, pages);
      const shown = found.slice((page - 1) * size, page * size);

      qsa('[data-fellowx-academy]', root).forEach(tab => {
        const on = tab.dataset.fellowxAcademy === state.academy;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-pressed', String(on));
      });
      count.innerHTML = num(t(L.found).replace('{n}', found.length));
      empty.hidden = found.length > 0;

      /* the page's members under their membership, honorary first — cards
         in the grid, rows in the list */
      const groups = [];
      shown.forEach(person => {
        const last = groups[groups.length - 1];
        if (last && last.type === person.memberType) last.people.push(person); else groups.push({ type: person.memberType, people: [person] });
      });
      const total = type => countOf(found, type);
      list.innerHTML = groups.map(g => `
          <section class="fellowx-typeset roll-group--${escapeHTML(g.type)}" aria-label="${te(TYPES[g.type])}">
            <h3 class="roll-group__title fellowx-typeset__title">${te(TYPES[g.type])} <span class="fellowx-roll__n">${num(total(g.type))}</span></h3>
            ${view === 'grid'
              ? `<ul class="fellowx-grid" role="list">${g.people.map(card).join('')}</ul>`
              : `<ul class="fellowx-rows" role="list">${g.people.map(row).join('')}</ul>`}
          </section>`).join('');
      renderPages(pages, found.length);
      syncURL();
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: list }));
    }

    function setView(value) {
      view = value === 'list' ? 'list' : 'grid';
      try { localStorage.setItem(VIEW_KEY, view); } catch { /* storage unavailable */ }
      qsa('[data-fellowx-view]', root).forEach(btn => {
        const on = btn.dataset.fellowxView === view;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', String(on));
      });
      render();
    }

    const toTop = () => qs('.newsx-tools', root)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

    root.addEventListener('click', event => {
      const tab = event.target.closest('[data-fellowx-academy]');
      if (tab) { state.academy = tab.dataset.fellowxAcademy; page = 1; render(); return; }
      const viewBtn = event.target.closest('[data-fellowx-view]');
      if (viewBtn) { setView(viewBtn.dataset.fellowxView); return; }
      const sizeBtn = event.target.closest('[data-pager-size]');
      if (sizeBtn) {
        size = Number(sizeBtn.dataset.pagerSize);
        try { localStorage.setItem(SIZE_KEY, String(size)); } catch { /* storage unavailable */ }
        page = 1;
        render();
        qs('.pager__menu-btn', root)?.focus();
        return;
      }
      const pageBtn = event.target.closest('[data-pager-page]');
      if (pageBtn && !pageBtn.disabled) { page = Number(pageBtn.dataset.pagerPage); render(); toTop(); return; }
      if (event.target.closest('[data-fellowx-clear]')) {
        Object.assign(state, { academy: '', type: '', topic: '', q: '' });
        if (search) search.value = '';
        RS.selectSet(typeField, '');
        page = 1;
        render();
        search?.focus();
      }
    });
    typeField?.addEventListener('change', () => { state.type = typeField.value; page = 1; render(); });
    let timer;
    search?.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.q = search.value; page = 1; render(); }, 180);
    });
    academies?.addEventListener('click', event => {
      const go = event.target.closest('[data-fellowx-go]');
      if (!go) return;
      event.preventDefault();
      state.academy = go.dataset.fellowxGo;
      page = 1;
      render();
      toTop();
    });

    setView(view);
  }

  /* ==================================================================== *
   * Directory by academy (pages/fellows-academies.html): each academy's
   * roll set like a printed list — Fellows, Honorary Fellows, then
   * Associate Fellows, names in columns, each opening the profile
   * ==================================================================== */

  const L_ROLL = {
    search: { th: 'ค้นหาในสำนักนี้', en: 'Search this academy' },
    total: { th: 'รวม <strong>{n}</strong> คน', en: '<strong>{n}</strong> members in all' }
  };
  /* the order the Office asked for: honorary, associate, then Fellows */
  const ROLL_ORDER = ['honorary', 'associate', 'fellow'];
  const ROLL_VIEW_KEY = 'rs-roll-view';

  /** Directory by academy: a bar with the academies to jump to and a grid /
      list switch (remembered in this browser); each academy with its members
      grouped by membership — portrait cards, or a compact roll of names */
  function initRoll() {
    const box = qs('[data-fellowx-roll]');
    if (!box) return;
    const jump = qs('[data-roll-jump]');
    let view = 'grid';
    try { if (localStorage.getItem(ROLL_VIEW_KEY) === 'list') view = 'list'; } catch { /* storage unavailable */ }

    if (jump) {
      jump.innerHTML = CFG.academies.map(academy => {
        const n = PEOPLE.filter(person => person.academy === academy.id).length;
        return `<a class="roll-bar__tab" href="#academy-${academy.id}" data-academy="${academy.id}"><span>${te(academy.name)}</span><span class="roll-bar__n">${num(n)}</span></a>`;
      }).join('');
    }

    const names = list => `
              <ol class="fellowx-roll__names" role="list">
                ${list.map(person => `
                <li><a href="${profileURL(person)}"><span class="fellowx-roll__name">${RS.fellowName(person)}</span><span class="fellowx-roll__field">${fieldOf(person)}</span></a></li>`).join('')}
              </ol>`;
    const cards = list => `<ul class="fellowx-grid roll-grid" role="list">${list.map(person => card(person)).join('')}</ul>`;

    function render() {
      box.innerHTML = CFG.academies.map(academy => {
        const members = PEOPLE.filter(person => person.academy === academy.id);
        const tally = ROLL_ORDER.filter(type => countOf(members, type)).map(type =>
          `<span class="roll-academy__tally-item"><strong>${num(countOf(members, type))}</strong> ${typeName({ memberType: type })}</span>`).join('');
        const groups = ROLL_ORDER.filter(type => countOf(members, type)).map(type => {
          const list = members.filter(person => person.memberType === type).sort(byName);
          return `
            <section class="fellowx-roll__group roll-group roll-group--${type}">
              <h3 class="fellowx-roll__type roll-group__title">${typeName({ memberType: type })} <span class="fellowx-roll__n">${num(list.length)}</span></h3>
              ${view === 'grid' ? cards(list) : names(list)}
            </section>`;
        }).join('');
        return `
        <section class="fellowx-roll__academy roll-academy" id="academy-${academy.id}" data-academy="${academy.id}" aria-labelledby="roll-${academy.id}">
          <header class="roll-academy__head">
            <div class="roll-academy__id">
              <span class="roll-academy__no" aria-hidden="true">${num(String(CFG.academies.indexOf(academy) + 1).padStart(2, '0'))}</span>
              <div>
                <h2 class="fellowx-roll__title roll-academy__title" id="roll-${academy.id}">${te(academy.name)}</h2>
                ${t(academy.fields) ? `<p class="roll-academy__fields">${te(academy.fields)}</p>` : ''}
              </div>
            </div>
            <div class="roll-academy__side">
              <p class="roll-academy__tally">${tally}<span class="roll-academy__tally-item roll-academy__tally-item--total">${t(L_ROLL.total).replace('{n}', num(members.length))}</span></p>
              <a class="btn btn--secondary btn--sm btn--pill" href="${escapeHTML(RS.url(`pages/fellows.html?academy=${academy.id}`))}">${icon('search')}<span>${te(L_ROLL.search)}</span></a>
            </div>
          </header>
          ${groups}
        </section>`;
      }).join('');
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: box }));
    }

    function setView(value) {
      view = value === 'list' ? 'list' : 'grid';
      try { localStorage.setItem(ROLL_VIEW_KEY, view); } catch { /* storage unavailable */ }
      qsa('[data-roll-view]').forEach(btn => {
        const on = btn.dataset.rollView === view;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', String(on));
      });
      render();
    }

    document.addEventListener('click', event => {
      const btn = event.target.closest('[data-roll-view]');
      if (btn) setView(btn.dataset.rollView);
    });
    setView(view);

    /* the tab of the academy being read is marked as the page scrolls */
    if (jump && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          qsa('.roll-bar__tab', jump).forEach(tab => tab.classList.toggle('is-current', tab.dataset.academy === entry.target.dataset.academy));
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      const watch = () => qsa('.roll-academy', box).forEach(section => io.observe(section));
      watch();
      document.addEventListener('click', event => { if (event.target.closest('[data-roll-view]')) { io.disconnect(); watch(); } });
    }
  }

  /* ==================================================================== *
   * Profile
   * ==================================================================== */

  function initProfile() {
    const root = qs('[data-fellow]');
    if (!root) return;

    const id = new URLSearchParams(location.search).get('id');
    const person = PEOPLE.find(item => item.id === id) || (id ? null : PEOPLE[0]);
    const set = (selector, html) => { const el = qs(selector, root); if (el) el.innerHTML = html; };

    if (!person) {
      set('[data-fellow-article]', `
        <div class="container">
          <div class="newsx-empty fellowp-missing">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-people"></use></svg>
            <span><strong>${te(L.notFound)}</strong> — ${te(L.notFoundText)}</span>
            <a class="btn btn--secondary btn--sm" href="${escapeHTML(RS.url('pages/fellows.html'))}">${te(L.back)}</a>
          </div>
        </div>`);
      qs('[data-fellow-more]', root)?.closest('section')?.remove();
      return;
    }

    const academy = academyOf(person.academy);
    const name = `${t(person.title)}${/^(นาย|นาง|นางสาว)$/.test(t(person.title)) ? '' : ' '}${t(person.name)}`.trim();
    document.title = `${name} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', `${name} — ${t(TYPES[person.memberType])} ${t(academy?.name)} · ${t(person.field) || t(person.group)}`);
    root.dataset.academy = person.academy;

    set('[data-fellow-crumb]', te(person.name));
    set('[data-fellow-portrait]', portrait(person, ' fellowx-photo--lg'));
    set('[data-fellow-type]', typeName(person));
    set('[data-fellow-academy]', te(academy?.name));
    /* the title and the name as one heading, the same size, each part kept whole */
    set('[data-fellow-name]', RS.fellowName(person));
    set('[data-fellow-alt]', escapeHTML(altName(person)));
    qs('[data-fellow-alt]', root)?.setAttribute('lang', other);

    /* the type and academy are already named above the heading */
    const facts = [
      t(person.field) ? [L.field, te(person.field)] : null,
      t(person.group) ? [L.group, te(person.group)] : null,
      person.appointed ? [L.appointed, `${RS.lang === 'th' ? 'พ.ศ. ' : ''}${year(person.appointed)}`] : null
    ].filter(Boolean);
    set('[data-fellow-facts]', facts.map(([label, value]) => `<div class="pub-facts__row"><dt>${te(label)}</dt><dd>${value}</dd></div>`).join(''));

    /* the profile is kept here; nothing links to the academy websites */
    qs('[data-fellow-source]', root)?.remove();

    /* the profile sections (education, positions, works, honours …) as the
       academy page lists them; long lists show their first items and open */
    /* Each section is read as one kind of list:
       terms  — the expertise, set large in a row
       works  — books, papers, research: numbered
       dated  — most items end in a year (education, posts): the year in a
                column of its own at the left, as a printed CV gives it
       list   — everything else, plain readable lines */
    const SHOW = 6;
    const Y = '(?:[๒2][๔๕45]|19|20|๑๙|๒๐)[๐-๙0-9]{2}';   /* a year, B.E. 24xx–25xx or C.E. 19xx–20xx */
    const YEAR = new RegExp(`[\\s,]*\\(?(?:พ\\.ศ\\.\\s*)?(?<![๐-๙0-9,])(${Y}(?:\\s*[-–]\\s*(?:พ\\.ศ\\.\\s*)?(?:${Y}|ปัจจุบัน))?)\\s*\\)?\\.?$`);
    const kindOf = sec => {
      if (/เชี่ยวชาญ/.test(sec.title)) return 'terms';
      if (/ผลงาน|หนังสือ|ตำรา|บทความ|งานวิจัย|ตีพิมพ์|สิ่งประดิษฐ์|นิทรรศการ/.test(sec.title)) return 'works';
      const dated = sec.items.filter(item => YEAR.test(item.trim())).length;
      return sec.items.length > 1 && dated / sec.items.length >= 0.6 ? 'dated' : 'list';
    };
    /* a work as the academy page wrote it, made easier to scan: its own
       numbering dropped (the list numbers it), quoted titles set bold, and a
       closing note in brackets (who published it) set small beneath */
    const workHTML = item => {
      let text = item.trim().replace(/^\(?[๐-๙0-9]{1,3}\s*[.)]\s*/, '');
      let note = '';
      const m = text.match(/\s*\(([^()]{4,})\)\.?\s*$/);
      if (m && m.index > 0) { note = m[1]; text = text.slice(0, m.index).replace(/[\s.,]+$/, ''); }
      const body = escapeHTML(text).replace(/“([^”]+)”/g, '<strong class="fellowp-item__t">“$1”</strong>');
      return `<span class="fellowp-item__body">${body}${note ? `<span class="fellowp-item__note">${escapeHTML(note)}</span>` : ''}</span>`;
    };
    const itemHTML = (item, kind, n) => {
      if (kind === 'works') return `<li><span class="fellowp-item__n" aria-hidden="true">${num(n)}</span>${workHTML(item)}</li>`;
      if (kind === 'dated') {
        const m = item.trim().match(YEAR);
        const text = m ? item.trim().slice(0, m.index).replace(/[\s,]+$/, '') : item;
        const when = m ? m[1].replace(/พ\.ศ\.\s*/g, '').replace(/\s*[-–]\s*/, ' – ') : '';
        const what = text.replace(/\s*(?:ปีที่สำเร็จการศึกษา|ระหว่างปี|ประจำปี|ปี|วาระ|พ\.?\s*ศ\s*\.?|\(|,|:)\s*$/, '');
        return `<li><span class="fellowp-item__year">${escapeHTML(when)}</span><span>${escapeHTML(what)}</span></li>`;
      }
      return `<li>${escapeHTML(item)}</li>`;
    };
    const section = sec => {
      const kind = sec.kind;
      const more = kind !== 'terms' && sec.items.length > SHOW + 2;
      const shown = more ? sec.items.slice(0, SHOW) : sec.items;
      return `
        <section class="fellowp-sec fellowp-sec--${kind}${sec.wide ? ' fellowp-sec--wide' : ''}${/เกียรติ|เครื่องราช|รางวัล/.test(sec.title) ? ' fellowp-sec--honour' : ''}" id="${sec.id}" aria-labelledby="${sec.id}-title">
          <h2 class="fellowp-sec__title" id="${sec.id}-title">${escapeHTML(sec.title)}${kind !== 'terms' ? ` <span class="fellowp-sec__count">${te(L.items).replace('{n}', num(sec.items.length))}</span>` : ''}</h2>
          <ul class="fellowp-items fellowp-items--${kind}" role="list">${shown.map((item, n) => itemHTML(item, kind, n + 1)).join('')}</ul>
          ${more ? `<button class="btn btn--secondary btn--sm btn--pill fellowp-more" type="button" data-fellow-rest='${escapeHTML(JSON.stringify(sec.items.slice(SHOW)))}' data-kind="${kind}" data-from="${SHOW}">${te(L.showAll).replace('{n}', num(sec.items.length))}</button>` : ''}
        </section>`;
    };
    /* the sections as the academy gives them; the expertise is lifted into the opening */
    const render = sections => {
      /* a year the academy page set on a line of its own goes back to the line before it */
      const joinYears = items => items.reduce((out, item) => {
        const last = out[out.length - 1];
        if (last && /^[\s(]*(?:พ\.ศ\.\s*)?[๐-๙0-9\s–-]+(?:ปัจจุบัน)?[\s)]*$/.test(item) && YEAR.test(item.trim()) && !YEAR.test(last.trim())) out[out.length - 1] = `${last} ${item.trim()}`;
        else out.push(item);
        return out;
      }, []);
      let list = sections.filter(sec => sec.items?.length).map((sec, i) => {
        const kind = kindOf(sec);
        return { ...sec, items: kind === 'dated' ? joinYears(sec.items) : sec.items, id: `fellow-sec-${i}`, kind };
      });
      /* the expertise goes up beside the name as a quotation, not into a panel */
      const terms = list.filter(sec => sec.kind === 'terms');
      const quote = qs('[data-fellow-expertise]', root);
      if (terms.length && quote) {
        qs('[data-fellow-expertise-text]', quote).textContent = terms.flatMap(sec => sec.items).join(' · ');
        quote.hidden = false;
      }
      list = list.filter(sec => sec.kind !== 'terms');
      /* panels: the expertise, the works and any long or wordy list across the
         width; the rest in pairs side by side — a panel left without a partner
         takes the width */
      const avg = sec => sec.items.reduce((sum, item) => sum + item.length, 0) / sec.items.length;
      list.forEach(sec => { sec.wide = sec.kind === 'terms' || sec.kind === 'works' || sec.items.length > SHOW + 2 || avg(sec) > 110; });
      const halves = list.filter(sec => !sec.wide);
      if (halves.length % 2) halves[halves.length - 1].wide = true;
      return `<div class="fellowp-main">${list.map(section).join('')}</div>`;
    };
    const body = qs('[data-fellow-sections]', root);
    const fallback = () => {
      if (!body) return;
      body.removeAttribute("aria-busy");
      body.innerHTML = `<p class="fellowp-note">${te(L.noProfile)}</p>`;
    };
    if (body && person.profile) {
      fetch(RS.url(`assets/js/data/fellows/${encodeURIComponent(person.id)}.json`))
        .then(response => (response.ok ? response.json() : Promise.reject(response.status)))
        .then(data => {
          body.innerHTML = render(data.sections || []);
          body.removeAttribute('aria-busy');
          document.dispatchEvent(new CustomEvent('rs:content-added', { detail: body }));
        })
        .catch(fallback);
    } else fallback();
    body?.addEventListener('click', event => {
      const btn = event.target.closest('[data-fellow-rest]');
      if (!btn) return;
      const list = btn.previousElementSibling;
      const from = Number(btn.dataset.from) || 0;
      list.insertAdjacentHTML('beforeend', JSON.parse(btn.dataset.fellowRest).map((item, n) => itemHTML(item, btn.dataset.kind, from + n + 1)).join(''));
      btn.remove();
    });

    /* other members: the same discipline in the same academy first, then the academy — one row of six */
    const more = qs('[data-fellow-more]', root);
    if (more) {
      const rest = PEOPLE.filter(item => item !== person && item.academy === person.academy);
      const near = item => (t(item.group) && t(item.group) === t(person.group) ? 0 : 1);
      const picks = rest.sort((x, y) => near(x) - near(y) || byName(x, y)).slice(0, 6);
      more.innerHTML = picks.map(item => `
        <li class="fellowp-other">
          <a class="fellowp-other__link" href="${profileURL(item)}">
            <span class="fellowp-other__photo">${portrait(item, '')}</span>
            <span class="fellowp-other__type">${typeName(item)}</span>
            <span class="fellowp-other__name">${RS.fellowName(item)}</span>
            <span class="fellowp-other__field">${fieldOf(item)}</span>
          </a>
        </li>`).join('');
      const kicker = qs('[data-fellow-others-academy]', root);
      if (kicker && academy) { kicker.removeAttribute('data-en'); kicker.textContent = t(academy.name); }
      const all = qs('[data-fellow-all]', root);
      if (all) all.href = RS.url(`pages/fellows.html?academy=${person.academy}#fellow-directory`);
    }
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  }

  RS.ready(() => {
    initDirectory();
    initRoll();
    initProfile();
  });
})();
