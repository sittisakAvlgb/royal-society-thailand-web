/* ============================================================================
 * 28-leaders.js — The executives and the past Presidents, from data/leaders.js
 * ============================================================================
 *
 *  pages/about-executives.html
 *    [data-leaders-president]  the President's article
 *    [data-leaders-vices]      the list of Vice-Presidents
 *  pages/about-past-presidents.html
 *    [data-pres-era="society|institute|today"]  each era's grid
 *    [data-pres-count="…"]                       the era's head count
 *
 *  The cards keep the markup the pages were designed with; only where the
 *  words come from changes (the CMS fills data/leaders.js).
 * ========================================================================== */

(() => {
  'use strict';

  const RS = window.RS;
  const DATA = window.RS_LEADERS;
  if (!RS || !DATA) return;

  const esc = RS.escapeHTML;
  const en = RS.lang === 'en';
  const t = v => (v && typeof v === 'object' ? (en && v.en ? v.en : v.th) : (v || ''));
  const dataEn = v => (v && typeof v === 'object' && v.en ? ` data-en="${esc(v.en)}"` : '');
  const ph = s => `<span class="story__ph">${esc(s)}</span>`;
  const url = path => esc(RS.url(path));
  const svg = name => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
  const ACAD = { moral: 'academy.html?id=moral', science: 'academy.html?id=science', arts: 'academy.html?id=arts' };

  /* a name: the English style when there is one, else the honorific and
     the Thai name, each kept on one line */
  const nameHTML = p => {
    if (en && p.name.en) return esc(p.name.en);
    const parts = p.honorific ? [p.honorific, p.name.th] : p.name.th.split(' ');
    return parts.map(ph).join(' ');
  };

  /* ---- the executives ---------------------------------------------------- */
  const lead = document.querySelector('[data-leaders-president]');
  const p = DATA.president;
  if (lead && p) {
    const profile = url(`pages/fellow.html?id=${encodeURIComponent(p.fellow)}`);
    lead.className = `exec-lead exec--${p.academy}`;
    lead.innerHTML = `
      <a class="exec-lead__photo" href="${profile}" tabindex="-1" aria-hidden="true"><img src="${url(p.photo)}" alt="" width="320" height="410" loading="lazy" decoding="async"></a>
      <div class="exec-lead__text">
        <p class="exec__role"${dataEn(p.role)}>${esc(t(p.role))}</p>
        <h3 class="exec-lead__name"><a href="${profile}"${dataEn(p.name)}>${nameHTML(p)}</a></h3>
        <p class="exec__acad"><a href="${url(`pages/${ACAD[p.academy]}`)}"${dataEn(p.rank)}>${esc(t(p.rank))}</a></p>
        <p class="exec__field"${dataEn(p.field)}>${esc(t(p.field))}</p>
        ${(p.duties || []).length ? `<dl class="exec-duties">${p.duties.map(d => `
          <div><dt${dataEn(d.title)}>${esc(t(d.title))}</dt><dd><span data-th-only>${esc(d.text)}</span>${d.ref ? `<span class="auth-ref">${esc(d.ref)}</span>` : ''}</dd></div>`).join('')}
        </dl>` : ''}
        <p class="exec-lead__links">
          <a class="btn btn--secondary btn--sm btn--pill" href="${url('pages/about-president-message.html')}"><span data-en="The President's message">${en ? "The President's message" : 'สารจากนายกราชบัณฑิตยสภา'}</span>${svg('arrow')}</a>
          <a class="exec-lead__more" href="${profile}" data-en="Fellow's profile">${en ? "Fellow's profile" : 'ประวัติราชบัณฑิต'}</a>
        </p>
      </div>`;
  }

  const vices = document.querySelector('[data-leaders-vices]');
  if (vices && Array.isArray(DATA.vices)) {
    vices.innerHTML = DATA.vices.map(v => {
      const profile = url(`pages/fellow.html?id=${encodeURIComponent(v.fellow)}`);
      return `<li class="exec-vice exec--${esc(v.academy)}">
        <a class="exec-vice__photo" href="${profile}" tabindex="-1" aria-hidden="true"><img src="${url(v.photo)}" alt="" width="320" height="410" loading="lazy" decoding="async"></a>
        <div class="exec-vice__text">
          <p class="exec__role"${dataEn(v.role)}>${esc(t(v.role))}</p>
          <h3 class="exec-vice__name"><a href="${profile}"${dataEn(v.name)}>${nameHTML(v)}</a></h3>
          <p class="exec__acad"><a href="${url(`pages/${ACAD[v.academy]}`)}"${dataEn(v.rank)}>${esc(t(v.rank))}</a></p>
          <p class="exec__field"${dataEn(v.field)}>${esc(t(v.field))}</p>
        </div>
      </li>`;
    }).join('');
  }

  /* ---- the past Presidents ----------------------------------------------- */
  const ce = be => be - 543;
  const span = s => {
    const to = s.to === 'now' ? (en ? 'today' : 'ปัจจุบัน') : s.to ? String(en ? ce(s.to) : s.to) : '';
    return `${en ? ce(s.from) : s.from}${to ? `–${to}` : ''}${s.acting ? ` <span class="pres__acting" data-en="acting">${en ? 'acting' : 'รักษาการ'}</span>` : ''}`;
  };
  const term = terms => `<span class="pres__term">${en ? '' : 'พ.ศ. '}${terms.map(span).join(' · ')}</span>`;

  document.querySelectorAll('[data-pres-era]').forEach(grid => {
    const era = grid.dataset.presEra;
    const list = (DATA.past || []).filter(x => x.era === era);
    grid.innerHTML = list.map(x => {
      const photo = `<span class="pres__photo"><img src="${url(x.photo)}" alt="" width="320" height="410" loading="lazy" decoding="async">${x.current ? `<span class="pres__now" data-en="Current">${en ? 'Current' : 'ปัจจุบัน'}</span>` : ''}</span>`;
      const name = `<span class="pres__name">${nameHTML(x)}</span>`;
      if (x.current) {
        return `<li class="pres pres--current">
          <a class="pres__link" href="${url('pages/about-executives.html')}">
            ${photo}${term(x.terms)}${name}
            <span class="pres__more"><span data-en="Current executives">${en ? 'Current executives' : 'ผู้บริหารปัจจุบัน'}</span>${svg('arrow')}</span>
          </a>
        </li>`;
      }
      return `<li class="pres">${photo}${term(x.terms)}${name}</li>`;
    }).join('');
    const count = document.querySelector(`[data-pres-count="${era}"]`);
    if (count) count.textContent = String(list.length);
  });
})();
