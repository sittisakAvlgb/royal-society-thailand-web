/* ============================================================================
 * 09-calendar.js — Events calendar
 * ============================================================================
 *
 *  markup: <div data-calendar> with these slots (see index.html):
 *    [data-cal-title]        current period title
 *    [data-cal-view]         view buttons: data-view="day|week|month|year"
 *    [data-cal-today] [data-cal-prev] [data-cal-next]
 *    [data-cal-grid]         the calendar body
 *    [data-cal-side]         events for the selected day / month
 *    [data-cal-detail]       selected event with actions
 *
 *  Data: window.RS_EVENTS (data/events.js). Reminders are kept in
 *  localStorage (prototype) and surfaced as a browser notification when the
 *  page is open on the day before / the day of the event.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const EVENTS = window.RS_EVENTS || [];
  const TYPES = window.RS_EVENT_TYPES || {};
  if (!RS || !EVENTS.length) return;

  const { qs, qsa, t, te, icon, escapeHTML } = RS;
  const TH = RS.lang !== 'en';

  const L = {
    today: { th: 'วันนี้', en: 'Today' },
    upcoming: { th: 'กิจกรรมที่จะมาถึง', en: 'Coming up' },
    day: { th: 'วัน', en: 'Day' }, week: { th: 'สัปดาห์', en: 'Week' },
    month: { th: 'เดือน', en: 'Month' }, year: { th: 'ปี', en: 'Year' },
    eventsOn: { th: 'กิจกรรมวันที่', en: 'Events on' },
    eventsIn: { th: 'กิจกรรมในเดือน', en: 'Events in' },
    none: { th: 'ไม่มีกิจกรรมในช่วงนี้', en: 'No events in this period' },
    allDay: { th: 'ทั้งวัน', en: 'All day' },
    more: { th: 'อีก {n} รายการ', en: '+{n} more' },
    details: { th: 'รายละเอียด', en: 'Details' },
    addCal: { th: 'เพิ่มลงปฏิทิน (.ics)', en: 'Add to calendar (.ics)' },
    google: { th: 'Google Calendar', en: 'Google Calendar' },
    remind: { th: 'เตือนฉัน', en: 'Remind me' },
    reminding: { th: 'ตั้งเตือนแล้ว', en: 'Reminder set' },
    remindOn: { th: 'จะแจ้งเตือนในเบราว์เซอร์นี้ 1 วันก่อนและในวันจัดกิจกรรม', en: 'This browser will notify you the day before and on the day' },
    remindOff: { th: 'ยกเลิกการเตือนแล้ว', en: 'Reminder removed' },
    denied: { th: 'เบราว์เซอร์ไม่อนุญาตการแจ้งเตือน — จะเตือนเมื่อเปิดหน้านี้แทน', en: 'Notifications are blocked — you will be reminded when this page is open instead' },
    tomorrow: { th: 'พรุ่งนี้', en: 'Tomorrow' },
    todayIs: { th: 'วันนี้', en: 'Today' },
    close: { th: 'ปิด', en: 'Close' },
    weekOf: { th: 'สัปดาห์ที่', en: 'Week of' },
    selectDay: { th: 'เลือกวันที่', en: 'Select' },
    reminderList: { th: 'ตั้งเตือนไว้', en: 'Reminders' }
  };

  const WEEKDAYS = TH ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const MONTHS = TH
    ? ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTHS_SHORT = TH
    ? ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* ---- date helpers (local time) ---- */
  const parse = iso => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
  const iso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
  const startOfWeek = date => addDays(date, -date.getDay());
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const year = date => TH ? date.getFullYear() + 543 : date.getFullYear();
  const todayDate = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };

  const eventsOn = date => EVENTS.filter(ev => {
    const from = parse(ev.date);
    const to = ev.end ? parse(ev.end) : from;
    return date >= from && date <= to;
  }).sort((a, b) => (a.start || '').localeCompare(b.start || ''));

  const eventsBetween = (from, to) => EVENTS.filter(ev => {
    const a = parse(ev.date);
    const b = ev.end ? parse(ev.end) : a;
    return b >= from && a <= to;
  }).sort((a, b) => a.date.localeCompare(b.date) || (a.start || '').localeCompare(b.start || ''));

  const timeText = ev => ev.start ? `${ev.start}${ev.finish ? '–' + ev.finish : ''}` : t(L.allDay);
  const dateText = ev => {
    const a = parse(ev.date);
    const text = d => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${year(d)}`;
    return ev.end ? `${text(a)} – ${text(parse(ev.end))}` : text(a);
  };

  /* ---- reminders (prototype: this browser only) ---- */
  const KEY = 'rs.reminders';
  const reminders = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const saveReminders = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* private mode */ } };
  const hasReminder = id => reminders().includes(id);

  async function toggleReminder(ev) {
    const list = reminders();
    const on = !list.includes(ev.id);
    saveReminders(on ? [...list, ev.id] : list.filter(id => id !== ev.id));
    if (on && 'Notification' in window && Notification.permission === 'default') {
      try { await Notification.requestPermission(); } catch { /* ignore */ }
    }
    if (on && 'Notification' in window && Notification.permission === 'denied') RS.toast?.(t(L.denied));
    else RS.toast?.(t(on ? L.remindOn : L.remindOff));
    return on;
  }

  /** Once per day, remind about events due tomorrow or today */
  function checkReminders() {
    const list = reminders();
    if (!list.length) return;
    const today = todayDate();
    const stamp = `rs.reminded.${iso(today)}`;
    try { if (localStorage.getItem(stamp)) return; } catch { return; }
    const due = EVENTS.filter(ev => list.includes(ev.id)).map(ev => {
      const d = parse(ev.date);
      if (sameDay(d, today)) return { ev, when: t(L.todayIs) };
      if (sameDay(d, addDays(today, 1))) return { ev, when: t(L.tomorrow) };
      return null;
    }).filter(Boolean);
    if (!due.length) return;
    due.forEach(({ ev, when }) => {
      const body = `${when} · ${timeText(ev)} · ${t(ev.location)}`;
      if ('Notification' in window && Notification.permission === 'granted') {
        try { new Notification(t(ev.title), { body, icon: `${RS.base}assets/images/logo-image-160.png` }); } catch { /* ignore */ }
      }
      RS.toast?.(`${when}: ${t(ev.title)} (${timeText(ev)})`);
    });
    try { localStorage.setItem(stamp, '1'); } catch { /* ignore */ }
  }

  /* ---- export ---- */
  const pad = n => String(n).padStart(2, '0');
  const icsStamp = (date, time) => {
    const [h, m] = (time || '00:00').split(':').map(Number);
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(h)}${pad(m)}00`;
  };
  function downloadIcs(ev) {
    const a = parse(ev.date);
    const b = ev.end ? addDays(parse(ev.end), 1) : a;
    const allDay = !ev.start;
    const dt = allDay
      ? `DTSTART;VALUE=DATE:${iso(a).replace(/-/g, '')}\nDTEND;VALUE=DATE:${iso(ev.end ? b : addDays(a, 1)).replace(/-/g, '')}`
      : `DTSTART:${icsStamp(a, ev.start)}\nDTEND:${icsStamp(a, ev.finish || ev.start)}`;
    const text = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Royal Society of Thailand//Prototype//TH', 'BEGIN:VEVENT',
      `UID:${ev.id}@royalsociety.go.th`, dt, `SUMMARY:${t(ev.title)}`, `LOCATION:${t(ev.location)}`,
      `DESCRIPTION:${t(ev.summary)}`, `URL:${location.origin}${RS.base}${ev.href}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = `${ev.id}.ics`;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function googleUrl(ev) {
    const a = parse(ev.date);
    const dates = ev.start
      ? `${icsStamp(a, ev.start)}/${icsStamp(a, ev.finish || ev.start)}`
      : `${iso(a).replace(/-/g, '')}/${iso(addDays(ev.end ? parse(ev.end) : a, 1)).replace(/-/g, '')}`;
    const p = new URLSearchParams({ action: 'TEMPLATE', text: t(ev.title), dates, details: t(ev.summary), location: t(ev.location) });
    return `https://calendar.google.com/calendar/render?${p}`;
  }

  /* ---- component ---- */
  function initCalendar(root) {
    const title = qs('[data-cal-title]', root);
    const grid = qs('[data-cal-grid]', root);
    const side = qs('[data-cal-side]', root);
    const detail = qs('[data-cal-detail]', root);
    if (!title || !grid) return;

    const today = todayDate();
    let view = root.dataset.calendar || 'month';
    let cursor = new Date(today);
    let selected = new Date(today);
    let openId = null;

    const pill = ev => `
      <button class="cal-pill cal-pill--${escapeHTML(ev.type)}" type="button" data-cal-event="${escapeHTML(ev.id)}" title="${te(ev.title)}">
        ${ev.start ? `<span class="cal-pill__time">${escapeHTML(ev.start)}</span>` : ''}<span class="cal-pill__text">${te(ev.title)}</span>
      </button>`;

    const row = ev => `
      <li>
        <button class="cal-row${ev.id === openId ? ' is-open' : ''}" type="button" data-cal-event="${escapeHTML(ev.id)}">
          <span class="cal-row__date" aria-hidden="true"><span class="cal-row__day">${parse(ev.date).getDate()}</span><span class="cal-row__mon">${MONTHS_SHORT[parse(ev.date).getMonth()]}</span></span>
          <span class="cal-row__body">
            <span class="cal-row__title">${te(ev.title)}</span>
            <span class="cal-row__meta">${icon('clock')} ${escapeHTML(timeText(ev))} · ${te(ev.location)}</span>
          </span>
          <span class="badge badge--type cal-row__type" data-type="${escapeHTML(ev.type)}">${te(TYPES[ev.type])}</span>
          ${hasReminder(ev.id) ? `<span class="cal-row__bell" title="${te(L.reminding)}">${icon('bell')}</span>` : ''}
        </button>
      </li>`;

    function renderMonth() {
      const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      const start = startOfWeek(first);
      let cells = '';
      for (let i = 0; i < 42; i++) {
        const d = addDays(start, i);
        const inMonth = d.getMonth() === cursor.getMonth();
        const list = eventsOn(d);
        const shown = list.slice(0, 2);
        const extra = list.length - shown.length;
        cells += `
          <button class="cal-cell${inMonth ? '' : ' is-outside'}${sameDay(d, today) ? ' is-today' : ''}${sameDay(d, selected) ? ' is-selected' : ''}${list.length ? ' has-events' : ''}"
                  type="button" role="gridcell" data-cal-day="${iso(d)}" aria-label="${d.getDate()} ${MONTHS[d.getMonth()]} ${year(d)}${list.length ? ` · ${list.length}` : ''}">
            <span class="cal-cell__num">${d.getDate()}</span>
            <span class="cal-cell__events">${shown.map(pill).join('')}${extra > 0 ? `<span class="cal-cell__more">${escapeHTML(t(L.more).replace('{n}', extra))}</span>` : ''}</span>
          </button>`;
      }
      grid.innerHTML = `
        <div class="cal-weekdays" aria-hidden="true">${WEEKDAYS.map(w => `<span>${w}</span>`).join('')}</div>
        <div class="cal-month" role="grid">${cells}</div>`;
    }

    function renderWeek() {
      const start = startOfWeek(cursor);
      let cols = '';
      for (let i = 0; i < 7; i++) {
        const d = addDays(start, i);
        const list = eventsOn(d);
        cols += `
          <div class="cal-weekcol${sameDay(d, today) ? ' is-today' : ''}${sameDay(d, selected) ? ' is-selected' : ''}">
            <button class="cal-weekcol__head" type="button" data-cal-day="${iso(d)}">
              <span class="cal-weekcol__wd">${WEEKDAYS[i]}</span><span class="cal-weekcol__num">${d.getDate()}</span>
            </button>
            <div class="cal-weekcol__body">${list.length ? list.map(pill).join('') : ''}</div>
          </div>`;
      }
      grid.innerHTML = `<div class="cal-week">${cols}</div>`;
    }

    function renderDay() {
      const list = eventsOn(cursor);
      grid.innerHTML = `
        <div class="cal-day">
          <p class="cal-day__head"><span class="cal-day__num">${cursor.getDate()}</span><span>${WEEKDAYS[cursor.getDay()]} · ${MONTHS[cursor.getMonth()]} ${year(cursor)}</span></p>
          ${list.length ? `<ul class="cal-rows" role="list">${list.map(row).join('')}</ul>` : `<p class="cal-empty">${icon('calendar')}<span>${te(L.none)}</span></p>`}
        </div>`;
    }

    function renderYear() {
      let months = '';
      for (let m = 0; m < 12; m++) {
        const first = new Date(cursor.getFullYear(), m, 1);
        const start = startOfWeek(first);
        const count = eventsBetween(first, new Date(cursor.getFullYear(), m + 1, 0)).length;
        let days = '';
        for (let i = 0; i < 42; i++) {
          const d = addDays(start, i);
          if (d.getMonth() !== m) { days += '<span class="cal-mini__day is-outside"></span>'; continue; }
          const n = eventsOn(d).length;
          days += `<span class="cal-mini__day${n ? ' has-events' : ''}${sameDay(d, today) ? ' is-today' : ''}">${d.getDate()}</span>`;
        }
        months += `
          <button class="cal-mini${m === today.getMonth() && cursor.getFullYear() === today.getFullYear() ? ' is-current' : ''}" type="button" data-cal-month="${m}">
            <span class="cal-mini__title">${MONTHS[m]}${count ? `<span class="cal-mini__count">${count}</span>` : ''}</span>
            <span class="cal-mini__grid">${days}</span>
          </button>`;
      }
      grid.innerHTML = `<div class="cal-year">${months}</div>`;
    }

    function renderSide() {
      if (!side) return;
      let heading, list;
      if (view === 'year') {
        heading = `${t(L.year)} ${year(cursor)}`;
        list = eventsBetween(new Date(cursor.getFullYear(), 0, 1), new Date(cursor.getFullYear(), 11, 31));
      } else if (view === 'month') {
        heading = `${t(L.eventsIn)} ${MONTHS[cursor.getMonth()]}`;
        list = eventsBetween(new Date(cursor.getFullYear(), cursor.getMonth(), 1), new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0));
      } else if (view === 'week') {
        const s = startOfWeek(cursor);
        heading = `${t(L.weekOf)} ${s.getDate()} ${MONTHS_SHORT[s.getMonth()]}`;
        list = eventsBetween(s, addDays(s, 6));
      } else {
        heading = `${t(L.eventsOn)} ${selected.getDate()} ${MONTHS_SHORT[selected.getMonth()]}`;
        list = eventsOn(selected);
      }
      if (view === 'month' && eventsOn(selected).length) {
        heading = `${t(L.eventsOn)} ${selected.getDate()} ${MONTHS_SHORT[selected.getMonth()]}`;
        list = eventsOn(selected);
      }
      /* A short day would leave the column half empty: fill it with what is
         coming next, so the panel always answers "what now?" */
      let more = '';
      if (view !== 'year' && list.length < 4) {
        const shown = new Set(list.map(ev => ev.id));
        const next = eventsBetween(today, addDays(today, 400))
          .filter(ev => !shown.has(ev.id))
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 5 - list.length);
        if (next.length) {
          more = `
            <p class="cal-side__sub">${te(L.upcoming)}</p>
            <ul class="cal-rows" role="list">${next.map(row).join('')}</ul>`;
        }
      }

      side.innerHTML = `
        <p class="cal-side__title">${escapeHTML(heading)}<span class="cal-side__count">${list.length}</span></p>
        ${list.length ? `<ul class="cal-rows" role="list">${list.map(row).join('')}</ul>` : `<p class="cal-empty">${icon('calendar')}<span>${te(L.none)}</span></p>`}
        ${more}`;
    }

    function renderDetail() {
      if (!detail) return;
      const ev = EVENTS.find(item => item.id === openId);
      if (!ev) { detail.hidden = true; detail.innerHTML = ''; return; }
      const on = hasReminder(ev.id);
      detail.hidden = false;
      detail.innerHTML = `
        <div class="cal-detail__head">
          <span class="badge badge--type" data-type="${escapeHTML(ev.type)}">${te(TYPES[ev.type])}</span>
          <button class="header-btn cal-detail__close" type="button" data-cal-close aria-label="${te(L.close)}">${icon('x')}</button>
        </div>
        <h3 class="cal-detail__title">${te(ev.title)}</h3>
        <ul class="cal-detail__meta" role="list">
          <li>${icon('calendar')}<span>${escapeHTML(dateText(ev))}</span></li>
          <li>${icon('clock')}<span>${escapeHTML(timeText(ev))}</span></li>
          <li>${icon('pin')}<span>${te(ev.location)}</span></li>
        </ul>
        <p class="cal-detail__text">${te(ev.summary)}</p>
        <div class="cal-detail__actions">
          <button class="btn btn--primary btn--sm cal-remind${on ? ' is-on' : ''}" type="button" data-cal-remind aria-pressed="${on}">
            ${icon('bell')}<span>${te(on ? L.reminding : L.remind)}</span>
          </button>
          <button class="btn btn--secondary btn--sm" type="button" data-cal-ics>${icon('download')}<span>${te(L.addCal)}</span></button>
          <a class="btn btn--ghost btn--sm" href="${escapeHTML(googleUrl(ev))}" target="_blank" rel="noopener">${icon('external')}<span>${te(L.google)}</span></a>
          <a class="link-arrow" href="${escapeHTML(RS.url(ev.href))}"><span>${te(L.details)}</span>${icon('arrow')}</a>
        </div>`;
    }

    function render() {
      qsa('[data-view]', root).forEach(btn => {
        const active = btn.dataset.view === view;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      if (view === 'year') title.textContent = `${TH ? 'พ.ศ. ' : ''}${year(cursor)}`;
      else if (view === 'day') title.textContent = `${cursor.getDate()} ${MONTHS[cursor.getMonth()]} ${year(cursor)}`;
      else if (view === 'week') { const s = startOfWeek(cursor); const e = addDays(s, 6); title.textContent = `${s.getDate()} ${MONTHS_SHORT[s.getMonth()]} – ${e.getDate()} ${MONTHS_SHORT[e.getMonth()]} ${year(e)}`; }
      else title.textContent = `${MONTHS[cursor.getMonth()]} ${year(cursor)}`;
      root.dataset.calendar = view;
      ({ month: renderMonth, week: renderWeek, day: renderDay, year: renderYear }[view] || renderMonth)();
      renderSide();
      renderDetail();
      /* Thai numerals and the reveal observer both work on fresh markup */
      document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
    }

    /** The grid animates in from the side the reader is travelling towards */
    function setDirection(n) {
      root.dataset.dir = n > 0 ? 'next' : n < 0 ? 'prev' : 'none';
    }

    function step(n) {
      setDirection(n);
      if (view === 'month') cursor = new Date(cursor.getFullYear(), cursor.getMonth() + n, 1);
      else if (view === 'week') cursor = addDays(cursor, 7 * n);
      else if (view === 'day') { cursor = addDays(cursor, n); selected = cursor; }
      else cursor = new Date(cursor.getFullYear() + n, cursor.getMonth(), 1);
      render();
    }

    root.addEventListener('click', event => {
      const viewBtn = event.target.closest('[data-view]');
      if (viewBtn) { view = viewBtn.dataset.view; if (view === 'day') cursor = new Date(selected); setDirection(0); render(); return; }
      if (event.target.closest('[data-cal-today]')) { cursor = new Date(today); selected = new Date(today); setDirection(0); render(); return; }
      if (event.target.closest('[data-cal-prev]')) { step(-1); return; }
      if (event.target.closest('[data-cal-next]')) { step(1); return; }

      const evBtn = event.target.closest('[data-cal-event]');
      if (evBtn) {
        openId = evBtn.dataset.calEvent;
        const ev = EVENTS.find(item => item.id === openId);
        if (ev) selected = parse(ev.date);
        render();
        detail?.scrollIntoView({ block: 'nearest', behavior: RS.reduceMotion() ? 'auto' : 'smooth' });
        return;
      }
      const dayBtn = event.target.closest('[data-cal-day]');
      if (dayBtn) {
        selected = parse(dayBtn.dataset.calDay);
        if (view === 'week' || view === 'month') cursor = view === 'month' ? new Date(selected.getFullYear(), selected.getMonth(), 1) : selected;
        if (event.detail === 2) { view = 'day'; cursor = new Date(selected); }
        render();
        return;
      }
      const monthBtn = event.target.closest('[data-cal-month]');
      if (monthBtn) { cursor = new Date(cursor.getFullYear(), Number(monthBtn.dataset.calMonth), 1); view = 'month'; render(); return; }

      if (event.target.closest('[data-cal-close]')) { openId = null; render(); return; }
      if (event.target.closest('[data-cal-ics]')) { const ev = EVENTS.find(item => item.id === openId); if (ev) downloadIcs(ev); return; }
      if (event.target.closest('[data-cal-remind]')) {
        const ev = EVENTS.find(item => item.id === openId);
        if (ev) toggleReminder(ev).then(render);
      }
    });

    /* Keyboard: arrows move the period, Home returns to today */
    root.addEventListener('keydown', event => {
      if (event.target.closest('input, textarea, select')) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
      else if (event.key === 'Home') { event.preventDefault(); cursor = new Date(today); selected = new Date(today); render(); }
    });

    render();
  }

  RS.ready(() => {
    qsa('[data-calendar]').forEach(initCalendar);
    checkReminders();
  });
})();
