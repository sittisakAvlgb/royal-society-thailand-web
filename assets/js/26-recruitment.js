/* ============================================================================
 * 26-recruitment.js — the latest call on pages/fellows-recruitment.html
 *  Fills the green card from data/recruitment.js: the newest open call (or
 *  the newest notice when no call is open), its academy, the closing date
 *  when there is one and its PDF; the count beside it is the number of
 *  notices; the next notices are listed under the card. Without the data
 *  the page keeps the card written into it.
 * ========================================================================== */
(() => {
  'use strict';

  const RS = window.RS;
  const DATA = window.RS_RECRUIT || [];
  const root = document.querySelector('[data-recruit]');
  if (!RS || !root || !DATA.length) return;

  const { t, te, escapeHTML } = RS;
  const qs = sel => root.querySelector(sel);
  const ACAD = {
    moral: { th: 'สำนักธรรมศาสตร์และการเมือง', en: 'Academy of Moral and Political Sciences' },
    science: { th: 'สำนักวิทยาศาสตร์', en: 'Academy of Science' },
    arts: { th: 'สำนักศิลปกรรม', en: 'Academy of Arts' }
  };
  const KIND = {
    call: { th: 'ประกาศรับสมัคร', en: 'Call for applications' },
    appoint: { th: 'ประกาศแต่งตั้ง', en: 'Appointment' }
  };
  const L = {
    closes: { th: 'ปิดรับสมัคร {d}', en: 'Applications close {d}' },
    pdf: { th: 'เปิด PDF', en: 'Open PDF' },
    newTab: { th: '(เปิดในแท็บใหม่)', en: '(opens in a new tab)' }
  };
  const today = new Date().toISOString().slice(0, 10);
  const open = DATA.find(x => x.kind === 'call' && (!x.closes || x.closes >= today));
  const lead = open || DATA[0];
  const icon = name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  const tag = qs('[data-recruit-kind]');
  if (tag) tag.textContent = t(KIND[lead.kind] || KIND.call);
  const acad = qs('[data-recruit-academy]');
  if (acad) { acad.textContent = t(ACAD[lead.academy] || ''); acad.removeAttribute('data-en'); }
  const title = qs('[data-recruit-title]');
  if (title) { title.textContent = t(lead.title); title.removeAttribute('data-en'); }
  const closes = qs('[data-recruit-closes]');
  if (closes) {
    closes.hidden = !lead.closes;
    if (lead.closes) closes.textContent = t(L.closes).replace('{d}', RS.formatDate(lead.closes, { day: 'numeric', month: 'long', year: 'numeric' }));
  }
  const pdf = qs('[data-recruit-pdf]');
  if (pdf && lead.pdf) pdf.href = lead.pdf;
  const preview = qs('[data-recruit-preview]');
  if (preview) {
    preview.hidden = !lead.pdf;
    if (lead.pdf) { preview.dataset.pdfPreview = lead.pdf; preview.dataset.pdfTitle = t(lead.title); }
  }
  root.classList.toggle('is-closed', !open);

  const count = qs('[data-recruit-count]');
  if (count) count.textContent = RS.digits(String(DATA.length));

  /* the next notices, under the card */
  const list = qs('[data-recruit-more]');
  const rest = DATA.filter(x => x !== lead).slice(0, 4);
  if (list) {
    list.hidden = !rest.length;
    list.innerHTML = rest.map(x => `
      <li>
        <a class="rec-more__link" href="${escapeHTML(x.pdf || '#')}" target="_blank" rel="noopener">
          <span class="rec-more__kind">${te(KIND[x.kind] || KIND.appoint)} · ${te(ACAD[x.academy] || '')}</span>
          <span class="rec-more__title">${te(x.title)}</span>
          <span class="rec-more__open">${te(L.pdf)}${icon('external')}</span>
          <span class="visually-hidden">${te(L.newTab)}</span>
        </a>
      </li>`).join('');
    RS.upgradePdfCards?.(list);
  }
})();
