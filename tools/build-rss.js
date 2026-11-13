/* ============================================================================
 * tools/build-rss.js — writes rss.xml (sitemap 3.15, มสพร. 11-2566 ข้อ 8.2)
 * ============================================================================
 *  The feed is built from the site's own data: news stories and press
 *  releases (data/news.js, data/press.js) and activity reports
 *  (data/activities.js), newest first, 40 items, each linking to its page on
 *  this site. Run after the data changes:
 *
 *      node tools/build-rss.js
 * ========================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://royalsociety.go.th/';
global.window = {};
['assets/js/data/news.js', 'assets/js/data/press.js', 'assets/js/data/activities.js']
  .forEach(file => { const p = path.join(ROOT, file); if (fs.existsSync(p)) eval(fs.readFileSync(p, 'utf8')); });

const th = v => (v && typeof v === 'object' ? v.th || v.en || '' : v || '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clean = s => th(s).replace(/<[^>]+>/g, ' ').replace(/\u0e4d\u0e32/g, '\u0e33').replace(/\s+/g, ' ').trim();

const items = [];
(window.RS_NEWS || []).forEach(n => items.push({
  title: clean(n.title), text: clean(n.dek), date: n.date,
  link: n.link && /^https?:/.test(n.link) && !/royalsociety\.go\.th/.test(n.link) ? n.link : `${BASE}pages/news-detail.html?id=${encodeURIComponent(n.id)}`,
  cat: n.cat === 'press' ? 'แถลงข่าว' : 'ข่าวสาร'
}));
(window.RS_ACTIVITIES || []).forEach(a => items.push({
  title: clean(a.title), text: clean(a.dek), date: a.date,
  link: `${BASE}pages/activity.html?id=${encodeURIComponent(a.id)}`, cat: a.cat || 'กิจกรรมวิชาการ'
}));
const seen = new Set();
const feed = items
  .filter(i => i.title && i.date && !seen.has(i.link) && seen.add(i.link))
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 40);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ข่าวสารและกิจกรรม ราชบัณฑิตยสภา</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}rss.xml" rel="self" type="application/rss+xml"/>
    <description>ข่าวสาร แถลงข่าว และรายงานกิจกรรมวิชาการของราชบัณฑิตยสภา</description>
    <language>th</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${feed.map(i => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="true">${esc(i.link)}</guid>
      <category>${esc(i.cat)}</category>
      <pubDate>${new Date(`${i.date}T09:00:00+07:00`).toUTCString()}</pubDate>${i.text ? `
      <description>${esc(i.text)}</description>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, 'rss.xml'), xml, 'utf8');
console.log(`rss.xml: ${feed.length} items`);
