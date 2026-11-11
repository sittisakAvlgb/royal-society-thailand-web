/* ============================================================================
 * 22-document.js — One document kept on this website (pages/document.html?id=)
 * ============================================================================
 *
 *  From RS_DOCS (data/docs.js): the title, the page that lists it, and the
 *  PDF itself shown in the page with a button to download it — or, while
 *  the file is still being brought across, a note saying so. Nothing here
 *  links to the website the file was first published on.
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const root = document.querySelector('[data-doc]');
  const DOCS = window.RS_DOCS || [];
  if (!RS || !root) return;

  const { qs, t, te, escapeHTML } = RS;
  const L = {
    org: { th: 'ราชบัณฑิตยสภา', en: 'The Royal Society of Thailand' },
    kind: { th: 'ประเภท', en: 'Type' },
    pdf: { th: 'เอกสาร PDF', en: 'PDF document' },
    listed: { th: 'อยู่ในหน้า', en: 'Listed on' },
    status: { th: 'สถานะ', en: 'Status' },
    ready: { th: 'พร้อมเปิดอ่าน', en: 'Available' },
    waiting: { th: 'ไฟล์อยู่ระหว่างนำเข้า', en: 'File being added' },
    download: { th: 'ดาวน์โหลด PDF', en: 'Download PDF' },
    note: { th: 'ไฟล์เอกสารนี้อยู่ระหว่างนำเข้าสู่เว็บไซต์ เมื่อพร้อมแล้วจะเปิดอ่านและดาวน์โหลดได้ในหน้านี้', en: 'This file is being added to the website. Once it is here you can read and download it on this page.' },
    back: { th: 'กลับไปหน้าเดิม', en: 'Back' },
    contact: { th: 'ต้องการเอกสารฉบับนี้ ติดต่อสำนักงาน', en: 'Need this document now? Contact the Office' },
    notFound: { th: 'ไม่พบเอกสารนี้', en: 'Document not found' }
  };
  const ARROW = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg>';
  const DOWNLOAD = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-download"></use></svg>';
  /* the page that lists the document, by its file name, for the breadcrumb */
  const PAGES = {
    'about-acts.html': { th: 'พระราชบัญญัติที่เกี่ยวข้อง', en: 'Relevant Acts' },
    'about-bylaws.html': { th: 'ข้อบังคับราชบัณฑิตยสภา', en: 'Royal Society Bylaws' },
    'about-rules.html': { th: 'ระเบียบราชบัณฑิตยสภา', en: 'Royal Society Regulations' },
    'about-announcements.html': { th: 'ประกาศราชบัณฑิตยสภา', en: 'Royal Society Notifications' },
    'about-authority.html': { th: 'อำนาจหน้าที่', en: 'Mandate and Authority' },
    'about-structure.html': { th: 'แผนผังการบริหาร', en: 'Governance Chart' },
    'admissions.html': { th: 'การรับสมัคร', en: 'Applications' },
    'admissions-associate-rules.html': { th: 'ระเบียบการรับสมัครภาคีสมาชิก', en: 'Associate Fellow regulations' },
    'admissions-fellow-rules.html': { th: 'ระเบียบการรับสมัครราชบัณฑิต', en: 'Fellow regulations' },
    'fellows-recruitment.html': { th: 'ตำแหน่งว่างและการสรรหาสมาชิก', en: 'Vacancies and Election' },
    'publications.html': { th: 'วารสารและสิ่งพิมพ์', en: 'Journals and Publications' },
    'works-proposals.html': { th: 'ข้อเสนอต่อรัฐบาล', en: 'Proposals to Government' }
  };
  const set = (sel, html) => { const el = qs(sel, root); if (el) el.innerHTML = html; };
  const doc = DOCS.find(d => d.id === new URLSearchParams(location.search).get('id'));

  RS.ready(() => {
    if (!doc) {
      set('[data-doc-title]', te(L.notFound));
      return;
    }
    const pageFile = (doc.page || '').split('?')[0];
    const pageName = PAGES[pageFile] || (pageFile === 'publication.html' ? { th: 'วารสารและสิ่งพิมพ์', en: 'Journals and Publications' } : { th: 'เอกสาร', en: 'Documents' });
    const pageHref = RS.url(`pages/${doc.page || 'publications.html'}`);
    document.title = `${doc.title} | ${t(L.org)}`;
    qs('meta[name="description"]')?.setAttribute('content', doc.title);

    const crumb = qs('[data-doc-page]', root);
    if (crumb) { crumb.href = pageHref; crumb.textContent = t(pageName); }
    set('[data-doc-crumb]', escapeHTML(doc.title));
    set('[data-doc-title]', escapeHTML(doc.title));

    const ready = Boolean(doc.file);
    const file = ready ? escapeHTML(RS.url(doc.file)) : '';
    set('[data-doc-body]', `
      <dl class="ita-facts">
        <div><dt>${te(L.kind)}</dt><dd>${te(L.pdf)}</dd></div>
        <div><dt>${te(L.listed)}</dt><dd><a href="${escapeHTML(pageHref)}">${te(pageName)}</a></dd></div>
        <div><dt>${te(L.status)}</dt><dd><span class="${ready ? 'ita-ready' : 'ita-pending'}">${te(ready ? L.ready : L.waiting)}</span></dd></div>
      </dl>
      ${ready ? `
      <div class="doc-viewer"><iframe src="${file}" title="${escapeHTML(doc.title)}" loading="lazy"></iframe></div>
      <p class="ita-item__go"><a class="btn btn--primary btn--pill" href="${file}" download>${DOWNLOAD}<span>${te(L.download)}</span></a></p>` : `
      <p class="ita-docs-empty">${te(L.note)}</p>
      <p class="ita-item__go doc-actions">
        <a class="btn btn--secondary btn--sm btn--pill" href="${escapeHTML(pageHref)}"><span>${te(L.back)}</span>${ARROW}</a>
        <a class="btn btn--secondary btn--sm btn--pill" href="${escapeHTML(RS.url('pages/contact.html'))}"><span>${te(L.contact)}</span>${ARROW}</a>
      </p>`}`);
    document.dispatchEvent(new CustomEvent('rs:content-added', { detail: root }));
  });
})();
