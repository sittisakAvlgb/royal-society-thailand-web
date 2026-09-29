# ราชบัณฑิตยสภา — The Royal Society of Thailand (website prototype)

A static HTML/CSS/vanilla-JavaScript redesign positioned as
**Thailand’s National Knowledge & Language Gateway**: search first, official
data always authoritative.

> **Prototype.** Search results, articles, news and people are sample data.
> Nothing is connected to the Office’s live databases.
> Turn off the notice with `site.prototype: false` in `assets/js/01-config.js`.

## Run locally

Any static server works. With Python:

```bash
python .claude/serve.py 5510
```

Then open http://localhost:5510. (`serve.py` only disables caching for development.)

## Structure

```
index.html                 Home
404.html                   Not found
pages/                     Inner pages (search, article, fellows, fellow, admissions,
                           services, academic-works, audiences, knowledge, news, about,
                           contact, sitemap, policies, accessibility, _styleguide)
assets/css/
  tokens.css               Design tokens (colour, type, spacing, radius, motion, z-index)
  base.css                 Reset, typography, focus, utilities, reduced motion, print
  layout.css               Containers, sections, header, footer
  components.css           Reusable components (button … modal, trust blocks)
  pages.css                Page sections and templates
  responsive.css           Wider-screen rules, one block per breakpoint (mobile-first)
assets/js/                 Loaded with defer, in this order
  00-core.js               window.RS: DOM helpers, escaping, language state, RS.ready()
  01-config.js             Site data — nav, services, academies, footer, UI strings (CMS point)
  data/search-index.js     SAMPLE search records + content types + topics
  data/fellows.js          SAMPLE directory records
  02-components.js         Header, footer, mega menu, mobile menu (initNavigation)
  03-accessibility.js      Display settings panel (initAccessibility)
  04-interactions.js       Header state, reveal, tabs, TOC, copy/share/print, toast, modal
  05-language.js           TH | EN switching (initLanguageSwitcher)
  06-search.js             Search engine, autocomplete, search panel, results page (initSearch)
  08-directory.js          Services, academies, fellows directory, profiles,
                           sitemap (filter · section rail · outline)
  09-calendar.js           Events calendar (day/week/month/year, reminders, .ics export)
  data/events.js           SAMPLE events for the calendar
```

Each page includes only the scripts it needs; header, footer and the search
panel are rendered into `<div id="app-header">` / `<div id="app-footer">`.

**Menu.** `RS_CONFIG.nav` follows the nine-item menu list supplied by the Office
(1 Home · 2 About · 3 Fellows & Members · 4 Academic works & activities ·
5 News · 6 Online academic services · 7 Services by audience · 8 Applications
for membership · 9 Contact & engage, with their sub-items). Every menu item links to a page or a section
anchor; sections that have no content yet carry a "content will be provided by
the Office" note. `pages/sitemap.html` renders the same tree from `RS_CONFIG.nav`
(plus `RS_CONFIG.sitemapExtra` for the groups that are not in the menu), so the
menu and the sitemap cannot drift apart — edit the config, not the page.

**Header.** The floating card shows six items on desktop (from 1280px):
Home · About · Fellows · Publications · News · Services. Items 7–9 are
`bar: false` — 7 (Services by audience) appears as an extra column inside the
Services panel (`alsoShow`), 8 (Applications for membership) as an extra column
inside the Fellows panel, 9 (Contact and participation) is the utility-bar
link — and all three stay in the drawer, footer and sitemap. `short` gives an item a
shorter label for the desktop bar only; the official name in `label` is used
everywhere else.

## Conventions

**Bilingual content.** Thai is authored in HTML; English sits beside it:

```html
<h2 data-en="Explore knowledge">สำรวจองค์ความรู้</h2>
<input placeholder="ค้นหา…" data-en-placeholder="Search…">
```

`data-en` replaces text content, so use it on text-only elements. Data rendered by
JavaScript uses `{ th, en }` objects resolved with `RS.t()`. The language lives in
the URL (`?lang=en`), so switching keeps the page, query, filters and hash.

**Numerals.** Pages are authored with 0-9. In Thai the reader sees ๐-๙: one
pass in `05-language.js` rewrites the digits of the visible text once the page
is built, and a `MutationObserver` keeps later content (counts, the calendar,
search results, filters) in step. Latin digits are kept where the number is an
address rather than a quantity — telephone, e-mail, domain, file name, English
text — via `[data-keep-digits]`, `a[href^="tel:"]`, `a[href^="mailto:"]`,
`.service-item__domain`, `[lang="en"]` and `code`. `RS.digits()` does the same
for strings built in JavaScript; `RS.formatNumber()` and `RS.formatDate()`
already return Thai numerals in Thai.

**Official data.** Search results mark records from the official systems
(dictionary, coined terms, transliteration, gazetteer). An exact match is shown
above the results with its source, date and a link to the original system. The
site never generates or suggests terms of its own.

**Security.** Every dynamic value goes through `RS.escapeHTML()`. No inline
scripts, styles or event handlers (JSON-LD data blocks only), so the site can run
under a strict Content Security Policy, for example:

```
default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';
frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

**Styles.** Use tokens from `tokens.css`; no raw z-index numbers (use `--z-*`).
`!important` is used only for `[hidden]`, `.visually-hidden` and user
motion/print preferences.

## Before launch

- Turn off the demo lock: `site.menuLock.enabled: false` in `assets/js/01-config.js`
  (while on, every link and search shows a toast instead of opening its page —
  only Home and the sitemap open).
- Replace sample data with the search API, member registry and CMS (schemas are
  documented at the top of each data file).
- Confirm with the Office: webmaster email, office hours, colour tokens (not verified
  CI), all policy texts, and the visitor counter source.
- Add official imagery (every `.image-placeholder` marks a slot). The home
  "Featured knowledge" band uses `assets/images/featured/featured-bg.png` as its
  background and, for now, hero photos as stand-in article images (marked TODO in
  `index.html`); confirm the quotation shown in that band.
- Home hero slideshow images are `assets/images/hero/hero-1.jpg` … `hero-4.jpg` (see the README in that folder). Confirm usage rights with the Office and compress `hero-2`/`hero-4` before launch.
- The banner behind every inner-page heading takes `assets/images/page-header/page-header-bg.png` (see the README in that folder); until the file exists the band shows its gradient only.
- Feed the events calendar (`assets/js/data/events.js`) from the events system.
  Reminders are a prototype: kept in the visitor's browser (localStorage) and
  shown as a browser notification / toast when the page is open the day
  before or on the day; a production version would tie them to accounts.
- Wire the contact form (`pages/contact.html#contact-form`) to the enquiry
  system and add spam protection; confirm the FAQ list.
- Render English server-side (or at `/en/` URLs) for best SEO; the prototype
  swaps text in the browser.
- Self-host fonts to remove the Google Fonts dependency.
