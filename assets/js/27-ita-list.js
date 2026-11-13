/* ============================================================================
 * 27-ita-list.js — the ITA index (pages/ita.html), drawn from data/ita.js
 *  The fiscal year, the published / total count and its bar, one tab per
 *  group, and one row per item (opening pages/ita-item.html?id=…), all from
 *  RS_ITA, so a new year or a new item is a change to the data only. An
 *  item counts as published when it has a page on this site (`page`) or is
 *  marked `published: true`. Runs before 19-works-list.js, which then adds
 *  the tabs' counts, the search, the grid / list switch and the pager.
 * ========================================================================== */
(() => {
  'use strict';

  const RS = window.RS;
  const DATA = window.RS_ITA;
  const root = document.querySelector('[data-ita-list]');
  if (!RS || !root || !DATA || !DATA.items) return;

  const { escapeHTML } = RS;
  const th = RS.lang !== 'en';
  const qs = sel => document.querySelector(sel);
  const done = item => !!(item.page || item.published);
  const published = DATA.items.filter(done).length;
  const total = DATA.items.length;
  const pct = total ? Math.round(published / total * 100) : 0;
  const digits = n => escapeHTML(RS.digits(String(n)));
  const icon = name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  /* the year and the count */
  const year = qs('[data-ita-year]');
  if (year) year.textContent = th ? `การเปิดเผยข้อมูล ปีงบประมาณ ${RS.digits(String(DATA.year))}` : `Disclosure, fiscal year ${DATA.year - 543}`;
  const num = qs('[data-ita-num]');
  if (num) num.innerHTML = `<strong>${digits(published)}</strong><span>/${digits(total)} ${th ? 'รายการเผยแพร่แล้ว' : 'items published'}</span>`;
  const bar = qs('[data-ita-bar]');
  if (bar) {
    bar.setAttribute('aria-label', th ? `เผยแพร่แล้ว ${RS.digits(String(pct))}%` : `${pct}% published`);
    bar.innerHTML = `<span style="width:${pct}%"></span>`;
  }

  /* one tab per group */
  const tabs = root.querySelector('[data-works-tabs]');
  if (tabs) {
    tabs.innerHTML = `<button class="news-tab is-active" type="button" data-filter="all" aria-pressed="true">${th ? 'ทั้งหมด' : 'All'}</button>`
      + DATA.groups.map(g => `<button class="news-tab" type="button" data-filter="${escapeHTML(g.id)}" aria-pressed="false">${escapeHTML(th ? g.name : (g.en || g.name))}</button>`).join('');
  }

  /* one row per item */
  const list = root.querySelector('[data-works-items]');
  const groupName = id => { const g = DATA.groups.find(x => x.id === id); return g ? (th ? g.name : (g.en || g.name)) : ''; };
  if (list) {
    list.innerHTML = DATA.items.map(item => {
      const ok = done(item);
      return `
      <li data-academy="${escapeHTML(item.group)}">
        <a class="acts-doc${ok ? '' : ' acts-doc--pending'}" href="${escapeHTML(RS.url(`pages/ita-item.html?id=${encodeURIComponent(item.id)}`))}">
          <span class="acts-doc__body">
            <span class="acts-doc__name">${escapeHTML(th ? item.title : (item.en || item.title))}</span>
            <span class="acts-doc__meta"><span class="ann-subject">${escapeHTML(groupName(item.group))}</span>${item.note ? ` · ${escapeHTML(item.note)}` : ''}</span>
          </span>
          ${ok
            ? `<span class="acts-doc__open"><span>${th ? 'ดูข้อมูล' : 'View'}</span>${icon('arrow')}</span>`
            : `<span class="ita-pending">${th ? 'รอข้อมูลจากสำนักงาน' : 'Awaiting the Office'}</span>`}
        </a>
      </li>`;
    }).join('');
  }
})();
