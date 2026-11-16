/* ============================================================================
 * 31-policy.js — the policies (data/policies.js)
 * ============================================================================
 *
 *  pages/policies.html  [data-policy-hub]  every policy as a card, the
 *                                          principles, and where to ask
 *  pages/policy.html    [data-policy]      one policy on a page of its own:
 *                                          its sections and a contents list that
 *                                          follows the reading
 *
 *  Links from before the split (policies.html#privacy-policy and the like)
 *  open the policy they named.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const LIST = window.RS_POLICIES || [];
  if (!RS || !LIST.length) return;

  const { qs, escapeHTML: esc, icon } = RS;
  const t = v => RS.t(v);
  /* names the line-breaker would split (พระ|ราชบัญญัติ, ราชบัณฑิต|ยสภา) are
     kept on one line; the rest of the Thai still breaks between words */
  const KEEP = /(พระราชบัญญัติ|ราชบัณฑิตยสภา|ราชกิจจานุเบกษา|พ\.ร\.บ\.|พ\.ศ\. [๐-๙0-9]+)/g;
  const te = v => esc(t(v)).replace(KEEP, '<span class="nobr">$1</span>');
  const en = RS.lang === 'en';
  const num = n => (en ? String(n) : RS.digits(String(n)));
  const pad = n => num(String(n).padStart(2, '0'));
  const date = iso => (iso ? `<time datetime="${esc(iso)}">${esc(RS.formatDate(iso, { day: 'numeric', month: 'long', year: 'numeric' }))}</time>` : '');
  const pageOf = p => RS.url(`pages/policy.html?id=${encodeURIComponent(p.id)}`);

  const L = {
    version: { th: 'ฉบับที่', en: 'Edition' },
    effective: { th: 'มีผลตั้งแต่', en: 'In force from' },
    updated: { th: 'ปรับปรุงล่าสุด', en: 'Last updated' },
    owner: { th: 'ผู้รับผิดชอบ', en: 'Responsible' },
    brief: { th: 'สรุปสั้น ๆ', en: 'In brief' },
    all: { th: 'นโยบายทั้งหมด', en: 'All policies' },
    toc: { th: 'ในหน้านี้', en: 'On this page' },
    read: { th: 'อ่านนโยบาย', en: 'Read the policy' },
    prev: { th: 'ก่อนหน้า', en: 'Previous' },
    next: { th: 'ถัดไป', en: 'Next' },
    ask: { th: 'ส่งคำถามถึงสำนักงาน', en: 'Write to the Office' },
    askLead: { th: 'ตอบกลับภายใน ๓ วันทำการ หรือโทร ๐๒ ๑๔๑ ๑๗๑๗ วันจันทร์ถึงศุกร์ ๐๘.๓๐–๑๖.๓๐ น.', en: 'We reply within 3 working days, or call 02 141 1717, Monday to Friday 08:30–16:30.' },
    print: { th: 'พิมพ์', en: 'Print' },
    cookie: { th: 'ตั้งค่าคุกกี้', en: 'Cookie settings' },
    need: { th: 'จำเป็น', en: 'Necessary' },
    pref: { th: 'การตั้งค่า', en: 'Preferences' },
    cols: [{ th: 'ชื่อ', en: 'Name' }, { th: 'ประเภท', en: 'Type' }, { th: 'หมวด', en: 'Category' }, { th: 'วัตถุประสงค์', en: 'Purpose' }, { th: 'ระยะเวลา', en: 'Duration' }],
    missing: { th: 'ไม่พบนโยบายนี้', en: 'Policy not found' }
  };
  /* where each policy's questions go on the contact form */
  const TOPIC = { website: 'website', privacy: 'privacy', cookies: 'privacy', security: 'website', copyright: 'other' };

  /* links from before the split: policies.html#privacy-policy → policy.html?id=privacy */
  const OLD = { 'website-policy': 'website', 'privacy-policy': 'privacy', 'device-storage-title': 'cookies', 'security-policy': 'security', copyright: 'copyright' };

  /* ---- blocks ---------------------------------------------------------- */
  function storageTable() {
    const rows = window.RS_STORAGE || [];
    return `<div class="plc-table" tabindex="0" role="region" aria-label="${te(L.cols[0])}">
      <table>
        <thead><tr>${L.cols.map(c => `<th scope="col">${te(c)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr>
          <td>${r.keys.map(k => `<code lang="en">${esc(k)}</code>`).join(' ')}</td>
          <td lang="en">${esc(r.type)}</td>
          <td><span class="plc-tag${r.need ? ' plc-tag--need' : ''}">${te(r.need ? L.need : L.pref)}</span></td>
          <td>${te(r.purpose)}</td>
          <td>${te(r.keep)}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>`;
  }
  const block = b => {
    if (b.h) return `<h3>${te(b.h)}</h3>`;
    if (b.p) return `<p>${te(b.p)}</p>`;
    if (b.list) return `<ul class="plc-list">${b.list.map(i => `<li>${te(i)}</li>`).join('')}</ul>`;
    if (b.steps) return `<ol class="plc-steps">${b.steps.map(i => `<li>${te(i)}</li>`).join('')}</ol>`;
    if (b.note) return `<p class="plc-note">${icon('info')}<span>${te(b.note)}</span></p>`;
    if (b.storage) return storageTable();
    if (b.cookieButton) return `<p><button class="btn btn--primary btn--pill" type="button" data-cookie-settings>${icon('sliders')}<span>${te(L.cookie)}</span></button></p>`;
    return '';
  };

  /* ---- one policy ------------------------------------------------------ */
  function initPolicy(root) {
    const id = new URLSearchParams(location.search).get('id') || LIST[0].id;
    const i = LIST.findIndex(p => p.id === id);
    const p = LIST[i];
    const set = (sel, html) => { const el = qs(sel, root); if (el) el.innerHTML = html; };
    if (!p) { set('[data-policy-title]', te(L.missing)); return; }

    document.title = `${t(p.title)} | ${t({ th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' })}`;
    qs('meta[name="description"]')?.setAttribute('content', t(p.summary));
    set('[data-policy-crumb]', te(p.title));
    set('[data-policy-title]', te(p.title));
    set('[data-policy-lead]', te(p.summary));
    set('[data-policy-meta]', [
      [L.version, num(p.version)], [L.effective, date(p.effective)], [L.updated, date(p.updated)]
    ].filter(([, v]) => v).map(([k, v]) => `<div><dt>${te(k)}</dt><dd>${v}</dd></div>`).join(''));

    /* contents */
    set('[data-policy-toc]', p.sections.map((s, k) => `<li><a href="#${esc(s.id)}" data-toc="${esc(s.id)}"><span class="plc-toc__no">${num(k + 1)}</span>${te(s.title)}</a></li>`).join(''));

    /* the policy itself */
    const sections = p.sections.map((s, k) => `
      <section class="plc-sec" id="${esc(s.id)}" aria-labelledby="${esc(s.id)}-h">
        <h2 id="${esc(s.id)}-h"><span class="plc-sec__no" aria-hidden="true">${num(k + 1)}</span>${te(s.title)}</h2>
        <div class="plc-sec__body">${s.blocks.map(block).join('')}</div>
      </section>`).join('');
    const topic = TOPIC[p.id] || 'other';
    const contact = `
      <aside class="plc-ask" aria-labelledby="plc-ask-title">
        <div>
          <h2 id="plc-ask-title">${te(p.contact || { th: 'มีข้อสงสัยเกี่ยวกับนโยบายนี้', en: 'Questions about this policy' })}</h2>
          <p>${te(L.askLead)}</p>
          ${p.owner ? `<p class="plc-ask__owner">${te(L.owner)}: ${te(p.owner)}</p>` : ''}
        </div>
        <a class="btn btn--primary btn--pill" href="${esc(RS.url(`pages/contact-form.html?topic=${topic}`))}">${te(L.ask)}${icon('arrow')}</a>
      </aside>`;
    set('[data-policy-body]', sections + contact);

    qs('[data-policy-print]', root)?.addEventListener('click', () => window.print());

    /* contents follow the reading */
    const links = [...root.querySelectorAll('[data-toc]')];
    if ('IntersectionObserver' in window && links.length) {
      const mark = id2 => links.forEach(a => a.classList.toggle('is-on', a.dataset.toc === id2));
      const io = new IntersectionObserver(entries => {
        const seen = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (seen) mark(seen.target.id);
      }, { rootMargin: '-25% 0px -65% 0px' });
      p.sections.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el); });
      mark(p.sections[0].id);
    }
  }

  /* ---- the list -------------------------------------------------------- */
  function initHub(root) {
    const go = OLD[location.hash.slice(1)];
    if (go) { location.replace(pageOf({ id: go })); return; }
    const list = qs('[data-policy-list]', root);
    if (!list) return;
    list.innerHTML = LIST.map((p, k) => `
      <li>
        <a class="plc-card" href="${esc(pageOf(p))}">
          <span class="plc-card__icon">${icon(p.icon || 'doc')}</span>
          <span class="plc-card__no" aria-hidden="true">${pad(k + 1)}</span>
          <strong class="plc-card__title">${te(p.title)}</strong>
          <span class="plc-card__sum">${te(p.summary)}</span>
          <span class="plc-card__foot"><span>${te(L.updated)} ${date(p.updated)}</span><span class="plc-card__go">${te(L.read)}${icon('arrow')}</span></span>
        </a>
      </li>`).join('');
  }

  RS.ready(() => {
    const one = qs('[data-policy]');
    if (one) initPolicy(one);
    const hub = qs('[data-policy-hub]');
    if (hub) initHub(hub);
  });
})();
