/* ============================================================================
 * data/knowledge-bodies.js — the full text of knowledge articles
 *  (pages/article.html?id=…, 25-article.js), keyed by the article's id in
 *  data/knowledge.js. An article without an entry here shows its summary
 *  and a note that the full text is being prepared.
 *    author {th,en}, role {th,en}, updated (ISO), minutes (reading time),
 *    body (HTML: h2 with an id per section, p, ul/ol, blockquote, table),
 *    refs [HTML per reference]
 *  TODO (CMS): one entry per article.
 * ========================================================================== */
window.RS_KNOWLEDGE_BODIES = {
  "kn-coined-terms": {
    "author": {
      "th": "กองบรรณาธิการ ราชบัณฑิตยสภา",
      "en": "Editorial team"
    },
    "role": {
      "th": "สำนักศิลปกรรม",
      "en": "Academy of Arts"
    },
    "updated": "2026-09-01",
    "minutes": 8,
    "body": "<h2 id=\"intro\">ความนำ</h2>\n<p>งานเขียนวิชาการภาษาไทยต้องใช้ศัพท์เฉพาะจำนวนมากที่มีต้นทางจากภาษาต่างประเทศ ผู้เขียนจึงมักพบคำถามว่าควรใช้คำภาษาไทย ใช้คำทับศัพท์ หรือเขียนคำภาษาต่างประเทศกำกับไว้ บทความนี้สรุปแนวคิดพื้นฐานเพื่อช่วยให้เลือกใช้คำได้อย่างมั่นใจ</p>\n<h2 id=\"what\">ศัพท์บัญญัติคืออะไร</h2>\n<p>ศัพท์บัญญัติคือคำภาษาไทยที่กำหนดขึ้นเพื่อใช้แทนศัพท์วิชาการภาษาต่างประเทศ โดยมุ่งให้สื่อความหมายได้ตรง กระชับ และใช้ได้สม่ำเสมอในแต่ละสาขาวิชา ตัวอย่างที่คุ้นเคย เช่น <strong>ปัญญาประดิษฐ์</strong> ซึ่งใช้แทน <span lang=\"en\">artificial intelligence</span></p>\n<blockquote>\n<p>คำที่ดีไม่ได้วัดจากความไพเราะเพียงอย่างเดียว แต่วัดจากการที่ผู้อ่านเข้าใจความหมายได้ถูกต้อง</p>\n</blockquote>\n<h2 id=\"principles\">หลักที่ใช้พิจารณา</h2>\n<p>ในการพิจารณาศัพท์หนึ่งคำ ผู้เชี่ยวชาญมักคำนึงถึงประเด็นต่อไปนี้</p>\n<ol>\n<li><strong>ความหมาย</strong> คำไทยต้องสื่อแนวคิดของศัพท์ต้นทางได้ถูกต้องในบริบทของสาขาวิชา</li>\n<li><strong>ความกระชับ</strong> คำควรสั้นพอที่จะใช้ซ้ำได้ในงานเขียนและการพูด</li>\n<li><strong>ความสอดคล้อง</strong> คำควรเข้าชุดกับศัพท์อื่นในสาขาเดียวกัน</li>\n<li><strong>การใช้งานจริง</strong> คำที่ใช้กันแพร่หลายแล้วมีผลต่อการพิจารณา</li>\n</ol>\n<h2 id=\"transliteration\">ศัพท์บัญญัติกับคำทับศัพท์</h2>\n<p>คำทับศัพท์คือการเขียนคำภาษาต่างประเทศด้วยตัวอักษรไทยตามหลักเกณฑ์การทับศัพท์ ศัพท์บางคำจึงใช้ได้ทั้งสองแบบ เช่น <strong>จักรวาลนฤมิต</strong> ซึ่งเป็นศัพท์บัญญัติของ <span lang=\"en\">metaverse</span> และสามารถเขียนเป็นคำทับศัพท์ว่า <strong>เมตาเวิร์ส</strong></p>\n<h3>เลือกใช้อย่างไร</h3>\n<ul>\n<li>งานวิชาการที่ต้องการความชัดเจน ใช้ศัพท์บัญญัติ แล้ววงเล็บคำภาษาต่างประเทศเมื่อกล่าวถึงครั้งแรก</li>\n<li>งานสื่อสารทั่วไปที่ผู้อ่านคุ้นกับคำทับศัพท์ อาจใช้คำทับศัพท์ได้</li>\n<li>ในเอกสารฉบับเดียวกัน ควรใช้รูปคำเดียวกันตลอด</li>\n</ul>\n<h2 id=\"examples\">ตัวอย่าง</h2>\n<div class=\"table-scroll\">\n<table>\n<caption class=\"visually-hidden\">ตัวอย่างศัพท์บัญญัติและคำทับศัพท์</caption>\n<thead>\n<tr>\n<th scope=\"col\">ศัพท์ต้นทาง</th>\n<th scope=\"col\">ศัพท์บัญญัติ</th>\n<th scope=\"col\">คำทับศัพท์</th>\n</tr>\n</thead>\n<tbody>\n<tr><td lang=\"en\">metaverse</td><td>จักรวาลนฤมิต</td><td>เมตาเวิร์ส</td></tr>\n<tr><td lang=\"en\">artificial intelligence</td><td>ปัญญาประดิษฐ์</td><td>—</td></tr>\n<tr><td lang=\"en\">e-mail</td><td>—</td><td>อีเมล</td></tr>\n</tbody>\n</table>\n</div>\n<p class=\"note-box\">\n<svg class=\"icon\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#i-verified\"></use></svg>\n<span>ตรวจสอบรูปคำที่เป็นทางการได้ที่ระบบศัพท์บัญญัติและระบบคำทับศัพท์ของสำนักงานราชบัณฑิตยสภาก่อนนำไปใช้</span>\n</p>\n<h2 id=\"summary\">สรุป</h2>\n<p>การเลือกใช้ศัพท์ให้ถูกต้องช่วยให้งานเขียนวิชาการอ่านง่ายและน่าเชื่อถือ เริ่มจากตรวจสอบศัพท์ในแหล่งข้อมูลทางการ เลือกรูปคำให้เหมาะกับผู้อ่าน และใช้ให้สม่ำเสมอทั้งเอกสาร</p>",
    "refs": [
      "ราชบัณฑิตยสถาน. (๒๕๕๖). <i>พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔</i>. กรุงเทพฯ: ราชบัณฑิตยสถาน. <a href=\"https://dictionary.orst.go.th/\" target=\"_blank\" rel=\"noopener\">https://dictionary.orst.go.th/<span class=\"visually-hidden\" data-en=\"(external website, opens in a new tab)\">(เว็บไซต์ภายนอก เปิดในแท็บใหม่)</span></a>",
      "สำนักงานราชบัณฑิตยสภา. <i>ระบบศัพท์บัญญัติ</i>. <a href=\"https://coined-word.orst.go.th/\" target=\"_blank\" rel=\"noopener\">https://coined-word.orst.go.th/<span class=\"visually-hidden\" data-en=\"(external website, opens in a new tab)\">(เว็บไซต์ภายนอก เปิดในแท็บใหม่)</span></a>",
      "สำนักงานราชบัณฑิตยสภา. <i>ระบบฐานข้อมูลคำทับศัพท์</i>. <a href=\"https://transliteration.orst.go.th/\" target=\"_blank\" rel=\"noopener\">https://transliteration.orst.go.th/<span class=\"visually-hidden\" data-en=\"(external website, opens in a new tab)\">(เว็บไซต์ภายนอก เปิดในแท็บใหม่)</span></a>"
    ]
  }
};
