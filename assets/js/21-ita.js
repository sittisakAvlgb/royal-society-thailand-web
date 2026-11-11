/* ============================================================================
 * 21-ita.js — One item of the ITA public disclosure (pages/ita-item.html?id=)
 * ============================================================================
 *
 *  From RS_ITA (data/ita.js): the group and title in the opening band; what
 *  the item is; its fiscal year, group and status; its documents (or a note
 *  that they are awaited from the Office); the page of this site that holds
 *  it, if any; and the other items of the same group.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-ita-item]');
  const DATA = window.RS_ITA;
  if (!RS || !root || !DATA) return;

  const { qs, t, te, escapeHTML } = RS;
  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    year: { th: 'ปีงบประมาณ', en: 'Fiscal year' },
    group: { th: 'หมวด', en: 'Group' },
    status: { th: 'สถานะ', en: 'Status' },
    ready: { th: 'เผยแพร่แล้ว', en: 'Published' },
    waiting: { th: 'รอข้อมูลจากสำนักงาน', en: 'Awaiting the Office' },
    what: { th: 'ข้อมูลนี้คืออะไร', en: 'What this is' },
    docs: { th: 'เอกสาร', en: 'Documents' },
    noDocs: { th: 'เอกสารของรายการนี้อยู่ระหว่างรวบรวมจากสำนักงานราชบัณฑิตยสภา และจะเผยแพร่ในหน้านี้', en: 'The documents for this item are being gathered from the Office and will be published on this page.' },
    fileSoon: { th: 'ไฟล์อยู่ระหว่างนำเข้า', en: 'File being added' },
    open: { th: 'ดูข้อมูลบนเว็บไซต์', en: 'View it on this site' },
    others: { th: 'รายการอื่นในหมวดนี้', en: 'Other items in this group' },
    back: { th: 'กลับไปหน้า ITA', en: 'Back to ITA' },
    notFound: { th: 'ไม่พบรายการนี้', en: 'Item not found' }
  };
  const ARROW = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg>';
  const set = (sel, html) => { const el = qs(sel, root); if (el) el.innerHTML = html; };
  const num = n => escapeHTML(RS.digits(String(n)));
  const itemURL = item => escapeHTML(RS.url(`pages/ita-item.html?id=${encodeURIComponent(item.id)}`));
  const name = item => (RS.lang === 'en' ? item.en : item.title);

  const item = DATA.items.find(i => i.id === new URLSearchParams(location.search).get('id'));

  RS.ready(() => {
    if (!item) {
      set('[data-ita-title]', te(L.notFound));
      set('[data-ita-body]', `<p><a class="btn btn--secondary btn--sm" href="${escapeHTML(RS.url('pages/ita.html'))}">${te(L.back)}</a></p>`);
      return;
    }
    const group = DATA.groups.find(g => g.id === item.group) || { name: '', en: '' };
    const groupName = RS.lang === 'en' ? group.en : group.name;
    document.title = `${name(item)} | ITA | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', item.desc);

    const groupLink = qs('[data-ita-group-link]', root);
    if (groupLink) { groupLink.href = RS.url(`pages/ita.html#${item.group}`); groupLink.textContent = groupName; }
    set('[data-ita-crumb]', escapeHTML(name(item)));
    set('[data-ita-kicker]', escapeHTML(groupName));
    set('[data-ita-title]', escapeHTML(name(item)));

    const ready = Boolean(item.page);
    const docs = item.docs || [];
    const others = DATA.items.filter(i => i.group === item.group && i !== item);

    set('[data-ita-body]', `
      <section class="auth__part" aria-labelledby="ita-what">
        <p class="kicker" id="ita-what">${te(L.what)}</p>
        <p class="ita-item__desc" data-th-only>${escapeHTML(item.desc)}</p>
        <dl class="ita-facts">
          <div><dt>${te(L.year)}</dt><dd>${num(RS.lang === 'en' ? DATA.year - 543 : DATA.year)}</dd></div>
          <div><dt>${te(L.group)}</dt><dd>${escapeHTML(groupName)}</dd></div>
          <div><dt>${te(L.status)}</dt><dd><span class="${ready ? 'ita-ready' : 'ita-pending'}">${te(ready ? L.ready : L.waiting)}</span></dd></div>
        </dl>
        ${ready ? `<p class="ita-item__go"><a class="btn btn--primary btn--pill" href="${escapeHTML(RS.url(`pages/${item.page}`))}"><span>${te(L.open)}</span>${ARROW}</a></p>` : ''}
      </section>

      <section class="auth__part" aria-labelledby="ita-docs">
        <h2 class="auth__title" id="ita-docs">${te(L.docs)}</h2>
        ${docs.length ? `
        <ul class="acts-docs" role="list">${docs.map(d => `
          <li><div class="acts-doc acts-doc--pending">
            <span class="acts-doc__body">
              <span class="acts-doc__name" data-th-only>${escapeHTML(d.title)}</span>
              ${d.date ? `<span class="acts-doc__meta">${escapeHTML(RS.formatDate(d.date, { day: 'numeric', month: 'short', year: 'numeric' }))}</span>` : ''}
            </span>
            <span class="ita-pending">${te(L.fileSoon)}</span>
          </div></li>`).join('')}
        </ul>` : `<p class="ita-docs-empty">${te(L.noDocs)}</p>`}
      </section>

      ${others.length ? `
      <section class="auth__part" aria-labelledby="ita-others">
        <h2 class="auth__title" id="ita-others">${te(L.others)}</h2>
        <ul class="acts-docs" role="list">${others.map(o => `
          <li><a class="acts-doc${o.page ? '' : ' acts-doc--pending'}" href="${itemURL(o)}">
            <span class="acts-doc__body">
              <span class="acts-doc__name">${escapeHTML(name(o))}</span>
              <span class="acts-doc__meta">${escapeHTML(o.note)}</span>
            </span>
            ${o.page ? `<span class="acts-doc__open"><span>${te(L.ready)}</span>${ARROW}</span>` : `<span class="ita-pending">${te(L.waiting)}</span>`}
          </a></li>`).join('')}
        </ul>
        <p class="ita-item__go"><a class="btn btn--secondary btn--sm btn--pill" href="${escapeHTML(RS.url('pages/ita.html'))}"><span>${te(L.back)}</span>${ARROW}</a></p>
      </section>` : ''}`);
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
