/* ============================================================================
 * data/policies.js — the website's policies (CMS feed)
 * ============================================================================
 *  pages/policies.html lists them; pages/policy.html?id=… shows one, with
 *  the others beside it. One record per policy, in this order.
 *
 *    id        the page's address: policy.html?id=privacy
 *    title     {th,en}
 *    summary   {th,en} one line, on the list and under the title
 *    icon      an icon name from the sprite (02-components.js)
 *    version   the edition, e.g. '1.0'
 *    effective ISO date it takes effect
 *    updated   ISO date it was last revised
 *    owner     {th,en} who is responsible for it
 *    points    [{th,en}] the policy in brief: three or four lines
 *    sections  [{ id, title {th,en}, blocks: [...] }] — a block is one of
 *                { h: {th,en} }                 a sub-heading
 *                { p: {th,en} }                 a paragraph
 *                { list: [{th,en}, …] }         a bulleted list
 *                { steps: [{th,en}, …] }        a numbered list
 *                { note: {th,en} }              a highlighted note
 *                { storage: true }              the table of what the
 *                                               website keeps (RS_STORAGE)
 *                { cookieButton: true }         the cookie-settings button
 *    contact   optional {th,en} heading for the contact box at the end
 *
 *  TODO (Office): every text below is sample wording written so the pages
 *  can be reviewed; replace it with the Office's approved text and dates.
 * ========================================================================== */
window.RS_POLICIES = [
  {
    id: 'website',
    icon: 'globe',
    title: { th: 'นโยบายเว็บไซต์', en: 'Website Policy' },
    summary: { th: 'ขอบเขต เงื่อนไข และข้อปฏิบัติในการใช้งานเว็บไซต์ราชบัณฑิตยสภา', en: 'The scope and terms of use of the Royal Society website' },
    version: '1.0', effective: '2026-10-01', updated: '2026-11-01',
    owner: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    points: [
      { th: 'เว็บไซต์นี้เผยแพร่ข้อมูลและผลงานทางวิชาการของราชบัณฑิตยสภาเพื่อประโยชน์สาธารณะ', en: 'This website publishes the Royal Society’s information and academic work for the public good.' },
      { th: 'ใช้งานได้โดยไม่ต้องสมัครสมาชิก และไม่เก็บค่าบริการ', en: 'It can be used without an account and free of charge.' },
      { th: 'ผู้ใช้ต้องไม่ใช้เว็บไซต์ในทางที่ผิดกฎหมายหรือรบกวนการทำงานของระบบ', en: 'Users must not use it unlawfully or disrupt the service.' },
      { th: 'สำนักงานอาจปรับปรุงนโยบายนี้ และจะแจ้งวันที่ปรับปรุงไว้ที่หน้านี้', en: 'The Office may revise this policy; the date of each revision is shown here.' }
    ],
    sections: [
      { id: 'about', title: { th: 'เกี่ยวกับเว็บไซต์', en: 'About this website' }, blocks: [
        { p: { th: 'เว็บไซต์ราชบัณฑิตยสภา (royalsociety.go.th) จัดทำและดูแลโดยสำนักงานราชบัณฑิตยสภา เพื่อเผยแพร่ข้อมูลเกี่ยวกับราชบัณฑิตยสภา ราชบัณฑิตและภาคีสมาชิก ผลงานทางวิชาการ วารสาร สิ่งพิมพ์ ข่าวสาร และกิจกรรม ให้ประชาชน หน่วยงานภาครัฐ และนักวิชาการเข้าถึงได้สะดวก', en: 'The Royal Society website (royalsociety.go.th) is made and kept by the Office of the Royal Society to publish information about the Royal Society, its Fellows, academic work, journals, publications, news and events.' } },
        { p: { th: 'การเข้าใช้งานเว็บไซต์ถือว่าผู้ใช้ได้รับทราบและยอมรับเงื่อนไขในนโยบายนี้', en: 'Using the website means you accept the terms of this policy.' } }
      ] },
      { id: 'use', title: { th: 'เงื่อนไขการใช้งาน', en: 'Terms of use' }, blocks: [
        { p: { th: 'ผู้ใช้สามารถอ่าน ค้นหา ดาวน์โหลดเอกสาร และแบ่งปันลิงก์ของเว็บไซต์ได้ โดยมีข้อปฏิบัติดังนี้', en: 'You may read, search, download documents and share links, on these terms:' } },
        { list: [
          { th: 'ไม่ใช้เว็บไซต์เพื่อกระทำการที่ขัดต่อกฎหมาย ความสงบเรียบร้อย หรือศีลธรรมอันดีของประชาชน', en: 'Do not use the website for anything unlawful or against public order.' },
          { th: 'ไม่พยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต หรือทำให้เว็บไซต์ทำงานผิดปกติ เช่น ส่งคำขอจำนวนมากผิดปกติ', en: 'Do not try to access the system without permission or overload it.' },
          { th: 'ไม่แอบอ้างเป็นราชบัณฑิตยสภาหรือนำเนื้อหาไปใช้ในลักษณะที่ทำให้เข้าใจผิด', en: 'Do not pass yourself off as the Royal Society or use the content in a misleading way.' },
          { th: 'การนำเนื้อหาไปใช้ต่อให้เป็นไปตามคำสงวนลิขสิทธิ์ของเว็บไซต์', en: 'Reuse of content follows the website’s copyright notice.' }
        ] }
      ] },
      { id: 'links', title: { th: 'ลิงก์ไปยังเว็บไซต์อื่น', en: 'Links to other websites' }, blocks: [
        { p: { th: 'เว็บไซต์มีลิงก์ไปยังเว็บไซต์ของหน่วยงานอื่น เช่น พจนานุกรมออนไลน์ ราชกิจจานุเบกษา และเว็บไซต์ของสำนักวิชา ลิงก์ภายนอกจะมีสัญลักษณ์กำกับและเปิดในแท็บใหม่ ราชบัณฑิตยสภาไม่ได้ควบคุมเนื้อหาและนโยบายของเว็บไซต์เหล่านั้น', en: 'The website links to other bodies’ websites. External links are marked and open in a new tab; the Royal Society does not control their content or policies.' } }
      ] },
      { id: 'accessibility', title: { th: 'การเข้าถึงได้', en: 'Accessibility' }, blocks: [
        { p: { th: 'เว็บไซต์ออกแบบตามแนวทางการพัฒนาเว็บไซต์ภาครัฐ และมาตรฐาน WCAG 2.1 ระดับ AA เพื่อให้ทุกคนใช้งานได้ รวมถึงผู้ใช้โปรแกรมอ่านหน้าจอและผู้ใช้แป้นพิมพ์', en: 'The website follows the government web guidelines and WCAG 2.1 level AA so that everyone can use it, including people using screen readers or the keyboard.' } },
        { list: [
          { th: 'ปรับขนาดตัวอักษร คอนทราสต์สูง และลดการเคลื่อนไหวได้จากปุ่มการเข้าถึง', en: 'Text size, high contrast and reduced motion from the accessibility button' },
          { th: 'ใช้งานด้วยแป้นพิมพ์ได้ทุกส่วน และมีลิงก์ข้ามไปยังเนื้อหาหลัก', en: 'Every part works from the keyboard, with a skip link to the main content' },
          { th: 'มีเนื้อหาภาษาไทยและภาษาอังกฤษ', en: 'Content in Thai and English' }
        ] },
        { note: { th: 'หากพบส่วนที่ใช้งานไม่ได้ โปรดแจ้งผ่านแบบฟอร์มติดต่อ สำนักงานจะแก้ไขโดยเร็ว', en: 'If any part does not work for you, tell us through the contact form.' } }
      ] },
      { id: 'changes', title: { th: 'การเปลี่ยนแปลงนโยบาย', en: 'Changes to this policy' }, blocks: [
        { p: { th: 'สำนักงานราชบัณฑิตยสภาอาจปรับปรุงนโยบายนี้ตามความเหมาะสม โดยจะระบุฉบับและวันที่ปรับปรุงล่าสุดไว้ที่ส่วนบนของหน้านี้', en: 'The Office may revise this policy; the edition and the date of the latest revision appear at the top of this page.' } }
      ] }
    ],
    contact: { th: 'สอบถามเกี่ยวกับการใช้งานเว็บไซต์', en: 'Questions about the website' }
  },

  {
    id: 'privacy',
    icon: 'person',
    title: { th: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล', en: 'Privacy Policy' },
    summary: { th: 'ข้อมูลส่วนบุคคลที่จัดเก็บ วัตถุประสงค์ และสิทธิของคุณตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. ๒๕๖๒', en: 'The personal data we collect, why, and your rights under the Personal Data Protection Act 2019' },
    version: '1.0', effective: '2026-10-01', updated: '2026-11-01',
    owner: { th: 'เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO) สำนักงานราชบัณฑิตยสภา', en: 'Data Protection Officer, Office of the Royal Society' },
    points: [
      { th: 'การอ่านและค้นหาบนเว็บไซต์ไม่ต้องให้ข้อมูลส่วนบุคคล', en: 'Reading and searching the website needs no personal data.' },
      { th: 'จัดเก็บเฉพาะข้อมูลที่คุณกรอกเอง เช่น แบบฟอร์มติดต่อ ใบสมัคร และแบบสำรวจ', en: 'We keep only what you enter yourself: the contact form, applications and surveys.' },
      { th: 'ไม่ขาย ไม่แลกเปลี่ยน และไม่ใช้ข้อมูลเพื่อการโฆษณา', en: 'We never sell or trade your data or use it for advertising.' },
      { th: 'คุณขอเข้าถึง แก้ไข ลบ หรือถอนความยินยอมได้ทุกเมื่อ', en: 'You can ask to see, correct or delete it, or withdraw consent, at any time.' }
    ],
    sections: [
      { id: 'controller', title: { th: 'ผู้ควบคุมข้อมูลส่วนบุคคล', en: 'Data controller' }, blocks: [
        { p: { th: 'สำนักงานราชบัณฑิตยสภา สนามเสือป่า ถนนศรีอยุธยา แขวงดุสิต เขตดุสิต กรุงเทพมหานคร ๑๐๓๐๐ เป็นผู้ควบคุมข้อมูลส่วนบุคคลที่จัดเก็บผ่านเว็บไซต์นี้ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. ๒๕๖๒', en: 'The Office of the Royal Society, Sanam Suea Pa, Si Ayutthaya Road, Dusit, Bangkok 10300, is the controller of the personal data collected through this website under the Personal Data Protection Act 2019.' } }
      ] },
      { id: 'collect', title: { th: 'ข้อมูลที่จัดเก็บ', en: 'What we collect' }, blocks: [
        { list: [
          { th: 'แบบฟอร์มติดต่อและเรื่องร้องเรียน: ชื่อ อีเมล หมายเลขโทรศัพท์ และข้อความที่คุณส่ง', en: 'Contact and complaint forms: name, email, phone and your message' },
          { th: 'การรับสมัครภาคีสมาชิกและราชบัณฑิต: ข้อมูลตามใบสมัคร ประวัติการศึกษา และผลงาน', en: 'Applications for Associate Fellows and Fellows: the details on the form, education and work' },
          { th: 'แบบสำรวจความพึงพอใจ: คำตอบโดยไม่ระบุตัวตน เว้นแต่คุณระบุเอง', en: 'Satisfaction survey: answers, anonymous unless you identify yourself' },
          { th: 'ข้อมูลทางเทคนิคในบันทึกของเซิร์ฟเวอร์: หมายเลข IP เวลา และหน้าที่เรียกดู เพื่อความมั่นคงปลอดภัยของระบบ', en: 'Technical server logs: IP address, time and page requested, for security' }
        ] }
      ] },
      { id: 'purpose', title: { th: 'วัตถุประสงค์และฐานทางกฎหมาย', en: 'Purpose and legal basis' }, blocks: [
        { p: { th: 'สำนักงานใช้ข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ต่อไปนี้', en: 'We use the data only as needed for these purposes:' } },
        { list: [
          { th: 'ตอบคำถาม ให้บริการ และดำเนินการเรื่องร้องเรียน (ฐานการปฏิบัติหน้าที่ตามกฎหมายของหน่วยงานรัฐ)', en: 'To answer questions, provide services and handle complaints (public task)' },
          { th: 'พิจารณาการรับสมัครสมาชิกตามพระราชบัญญัติราชบัณฑิตยสภา พ.ศ. ๒๕๕๘ (ฐานการปฏิบัติตามกฎหมาย)', en: 'To consider applications under the Royal Society Act 2015 (legal obligation)' },
          { th: 'ปรับปรุงบริการจากผลแบบสำรวจ (ฐานความยินยอม)', en: 'To improve services from survey results (consent)' },
          { th: 'รักษาความมั่นคงปลอดภัยของระบบ (ฐานประโยชน์โดยชอบด้วยกฎหมาย)', en: 'To keep the system secure (legitimate interest)' }
        ] }
      ] },
      { id: 'share', title: { th: 'การเปิดเผยข้อมูล', en: 'Sharing' }, blocks: [
        { p: { th: 'สำนักงานไม่เปิดเผยข้อมูลส่วนบุคคลแก่บุคคลภายนอก เว้นแต่ได้รับความยินยอมจากคุณ หรือกฎหมายกำหนดให้ต้องเปิดเผย เช่น ตามคำสั่งศาลหรือหน่วยงานที่มีอำนาจตามกฎหมาย', en: 'We do not disclose personal data to others unless you agree or the law requires it, such as a court order.' } }
      ] },
      { id: 'retention', title: { th: 'ระยะเวลาการจัดเก็บ', en: 'How long we keep it' }, blocks: [
        { list: [
          { th: 'ข้อความติดต่อและเรื่องร้องเรียน: ๒ ปีนับจากดำเนินการเสร็จ', en: 'Messages and complaints: 2 years after they are closed' },
          { th: 'ใบสมัครสมาชิก: ตามระเบียบงานสารบรรณของทางราชการ', en: 'Applications: as the government records rules require' },
          { th: 'บันทึกของเซิร์ฟเวอร์: ๙๐ วัน ตาม พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์', en: 'Server logs: 90 days, under the Computer Crime Act' }
        ] }
      ] },
      { id: 'rights', title: { th: 'สิทธิของเจ้าของข้อมูล', en: 'Your rights' }, blocks: [
        { p: { th: 'คุณมีสิทธิตามกฎหมายดังต่อไปนี้', en: 'You have these rights under the law:' } },
        { list: [
          { th: 'ขอเข้าถึงและขอรับสำเนาข้อมูลของคุณ', en: 'To see and get a copy of your data' },
          { th: 'ขอแก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน', en: 'To have it corrected' },
          { th: 'ขอลบ ระงับการใช้ หรือคัดค้านการประมวลผล', en: 'To have it deleted, restricted, or to object' },
          { th: 'ขอโอนย้ายข้อมูล', en: 'To have it moved' },
          { th: 'ถอนความยินยอมได้ทุกเมื่อ โดยไม่กระทบสิ่งที่ทำไปแล้วก่อนถอน', en: 'To withdraw consent at any time' },
          { th: 'ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล', en: 'To complain to the Personal Data Protection Committee' }
        ] },
        { h: { th: 'วิธียื่นคำขอใช้สิทธิ', en: 'How to make a request' } },
        { steps: [
          { th: 'ส่งคำขอผ่านแบบฟอร์มติดต่อ เลือกหัวเรื่อง “ข้อมูลส่วนบุคคล” หรือส่งอีเมลถึงเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล', en: 'Send a request through the contact form (topic: personal data) or email the DPO' },
          { th: 'สำนักงานยืนยันตัวตนของผู้ขอ', en: 'We confirm who you are' },
          { th: 'ดำเนินการและแจ้งผลภายใน ๓๐ วัน', en: 'We act and reply within 30 days' }
        ] }
      ] },
      { id: 'device', title: { th: 'ข้อมูลในอุปกรณ์ของคุณ', en: 'Data on your device' }, blocks: [
        { p: { th: 'เว็บไซต์ไม่ใช้คุกกี้เพื่อการติดตามหรือการโฆษณา การตั้งค่าของคุณจัดเก็บในเบราว์เซอร์เท่านั้น ดูรายละเอียดทั้งหมดได้ในนโยบายคุกกี้', en: 'The website uses no tracking or advertising cookies; your settings stay in your browser. See the cookie policy for the details.' } }
      ] }
    ],
    contact: { th: 'ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล', en: 'Contact the Data Protection Officer' }
  },

  {
    id: 'cookies',
    icon: 'sliders',
    title: { th: 'นโยบายคุกกี้', en: 'Cookie Policy' },
    summary: { th: 'สิ่งที่เว็บไซต์จัดเก็บในเบราว์เซอร์ของคุณ ระยะเวลา และวิธีเปลี่ยนตัวเลือก', en: 'What the website keeps in your browser, for how long, and how to change your choice' },
    version: '1.1', effective: '2026-10-01', updated: '2026-11-14',
    owner: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    points: [
      { th: 'ไม่มีคุกกี้เพื่อการวิเคราะห์ การติดตาม หรือการโฆษณา', en: 'No analytics, tracking or advertising cookies.' },
      { th: 'ข้อมูลอยู่ในเบราว์เซอร์ของคุณเท่านั้น ไม่ส่งไปที่ใด', en: 'Everything stays in your browser; nothing is sent anywhere.' },
      { th: 'รายการที่ไม่จำเป็นจะจัดเก็บเมื่อคุณยินยอมเท่านั้น', en: 'Anything not necessary is kept only with your consent.' },
      { th: 'เปลี่ยนหรือถอนความยินยอมได้ตลอดเวลา', en: 'Change or withdraw your choice at any time.' }
    ],
    sections: [
      { id: 'what', title: { th: 'คุกกี้และพื้นที่จัดเก็บในเบราว์เซอร์คืออะไร', en: 'What cookies and browser storage are' }, blocks: [
        { p: { th: 'คุกกี้และพื้นที่จัดเก็บในเบราว์เซอร์ (localStorage และ sessionStorage) คือข้อมูลขนาดเล็กที่เว็บไซต์บันทึกไว้ในอุปกรณ์ของคุณ เพื่อจดจำการตั้งค่า เช่น ภาษาและขนาดตัวอักษร เว็บไซต์นี้ใช้พื้นที่จัดเก็บในเบราว์เซอร์เท่านั้น และไม่ได้ส่งข้อมูลเหล่านี้กลับไปที่เซิร์ฟเวอร์', en: 'Cookies and browser storage (localStorage and sessionStorage) are small pieces of data a website keeps on your device to remember settings such as language and text size. This website uses browser storage only and never sends it back to the server.' } }
      ] },
      { id: 'list', title: { th: 'รายการที่จัดเก็บ', en: 'What is stored' }, blocks: [
        { p: { th: 'รายการที่ระบุว่า “จำเป็น” คือสิ่งที่เว็บไซต์ต้องใช้เพื่อให้ทำงานได้ ส่วนรายการอื่นจะจัดเก็บก็ต่อเมื่อคุณยินยอมเท่านั้น และรายการที่คุณปฏิเสธจะถูกลบออกจากอุปกรณ์นี้', en: 'Items marked “Necessary” are what the website needs to work. The rest are kept only if you agree; anything you decline is deleted from this device.' } },
        { storage: true }
      ] },
      { id: 'choice', title: { th: 'การเปลี่ยนตัวเลือก', en: 'Changing your choice' }, blocks: [
        { p: { th: 'เปลี่ยนตัวเลือกได้ทันทีจากปุ่มด้านล่าง หรือจากลิงก์ “ตั้งค่าคุกกี้” ที่ส่วนท้ายของทุกหน้า หรือลบข้อมูลทั้งหมดด้วยการล้างข้อมูลของเว็บไซต์ในเบราว์เซอร์', en: 'Change your choice with the button below or the “Cookie settings” link at the foot of every page, or remove everything by clearing this website’s data in your browser.' } },
        { cookieButton: true }
      ] },
      { id: 'third', title: { th: 'บริการภายนอก', en: 'Outside services' }, blocks: [
        { list: [
          { th: 'Google Fonts: แบบอักษรภาษาอังกฤษโหลดจาก fonts.googleapis.com เบราว์เซอร์จะเชื่อมต่อกับเซิร์ฟเวอร์ของ Google ซึ่งได้รับหมายเลข IP ของคุณ', en: 'Google Fonts: the English fonts load from fonts.googleapis.com; Google receives your IP address.' },
          { th: 'Google Maps: แผนที่ในหน้าติดต่อแสดงจาก Google Maps เมื่อแผนที่โหลด Google จะได้รับหมายเลข IP ของคุณ', en: 'Google Maps: the map on the contact page; Google receives your IP address when it loads.' },
          { th: 'YouTube: วิดีโอในคลังวิดีโอจะโหลดจาก YouTube เมื่อคุณกดเล่นเท่านั้น', en: 'YouTube: videos load from YouTube only when you press play.' }
        ] }
      ] }
    ]
  },

  {
    id: 'security',
    icon: 'verified',
    title: { th: 'นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์', en: 'Website Security Policy' },
    summary: { th: 'มาตรการดูแลระบบ ข้อมูล และการรับแจ้งช่องโหว่ของเว็บไซต์', en: 'How the website and its data are protected, and how to report a weakness' },
    version: '1.0', effective: '2026-10-01', updated: '2026-11-01',
    owner: { th: 'ผู้บริหารเทคโนโลยีสารสนเทศระดับสูง (CIO) สำนักงานราชบัณฑิตยสภา', en: 'Chief Information Officer, Office of the Royal Society' },
    points: [
      { th: 'เชื่อมต่อผ่าน HTTPS ทุกหน้า', en: 'Every page is served over HTTPS.' },
      { th: 'ปรับปรุงซอฟต์แวร์และสำรองข้อมูลอย่างสม่ำเสมอ', en: 'Software is kept up to date and data is backed up regularly.' },
      { th: 'ดำเนินการตามมาตรฐานความมั่นคงปลอดภัยไซเบอร์ของหน่วยงานรัฐ', en: 'We follow the government cyber security standards.' },
      { th: 'พบช่องโหว่ แจ้งสำนักงานได้โดยตรง', en: 'Found a weakness? Tell us directly.' }
    ],
    sections: [
      { id: 'measures', title: { th: 'มาตรการด้านเทคนิค', en: 'Technical measures' }, blocks: [
        { list: [
          { th: 'เข้ารหัสการเชื่อมต่อด้วย HTTPS (TLS 1.2 ขึ้นไป) และ HSTS', en: 'Encrypted connections over HTTPS (TLS 1.2+) with HSTS' },
          { th: 'กำหนด Content Security Policy เพื่อป้องกันการแทรกสคริปต์', en: 'A Content Security Policy against injected scripts' },
          { th: 'ไฟร์วอลล์สำหรับเว็บแอปพลิเคชันและการป้องกันการโจมตีแบบ DDoS', en: 'A web application firewall and DDoS protection' },
          { th: 'ปรับปรุงระบบและซอฟต์แวร์ให้เป็นรุ่นล่าสุด และสแกนหาช่องโหว่เป็นประจำ', en: 'Regular updates and vulnerability scans' },
          { th: 'สำรองข้อมูลทุกวัน และทดสอบการกู้คืนทุกไตรมาส', en: 'Daily backups, with a restore test every quarter' }
        ] }
      ] },
      { id: 'access', title: { th: 'การควบคุมการเข้าถึง', en: 'Access control' }, blocks: [
        { p: { th: 'ระบบจัดการเนื้อหา (CMS) เข้าถึงได้เฉพาะเจ้าหน้าที่ที่ได้รับมอบหมาย ด้วยการยืนยันตัวตนสองขั้นตอน สิทธิ์ของแต่ละคนกำหนดตามหน้าที่ และมีบันทึกการแก้ไขเนื้อหาทุกครั้ง', en: 'The content management system is open only to assigned staff, with two-step sign-in, role-based rights and a log of every change.' } }
      ] },
      { id: 'standards', title: { th: 'มาตรฐานและกฎหมายที่เกี่ยวข้อง', en: 'Standards and law' }, blocks: [
        { list: [
          { th: 'พระราชบัญญัติการรักษาความมั่นคงปลอดภัยไซเบอร์ พ.ศ. ๒๕๖๒', en: 'Cybersecurity Act 2019' },
          { th: 'พระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. ๒๕๕๐ และที่แก้ไขเพิ่มเติม', en: 'Computer Crime Act 2007, as amended' },
          { th: 'มาตรฐานการรักษาความมั่นคงปลอดภัยเว็บไซต์ภาครัฐ ของสำนักงานพัฒนารัฐบาลดิจิทัล', en: 'Government website security standard, Digital Government Development Agency' }
        ] }
      ] },
      { id: 'report', title: { th: 'การแจ้งช่องโหว่และเหตุผิดปกติ', en: 'Reporting a weakness' }, blocks: [
        { p: { th: 'หากพบช่องโหว่หรือพฤติกรรมผิดปกติของเว็บไซต์ โปรดแจ้งสำนักงานพร้อมรายละเอียดที่ทำซ้ำได้ และงดเผยแพร่จนกว่าจะแก้ไขเสร็จ สำนักงานจะตอบรับภายใน ๓ วันทำการ', en: 'If you find a weakness or something unusual, tell the Office with the steps to repeat it, and keep it private until it is fixed. We reply within 3 working days.' } },
        { note: { th: 'ห้ามทดสอบเจาะระบบหรือเข้าถึงข้อมูลของผู้อื่นโดยไม่ได้รับอนุญาต', en: 'Do not test the system’s defences or reach other people’s data without permission.' } }
      ] }
    ],
    contact: { th: 'แจ้งปัญหาด้านความมั่นคงปลอดภัย', en: 'Report a security issue' }
  },

  {
    id: 'copyright',
    icon: 'doc',
    title: { th: 'คำสงวนลิขสิทธิ์และการปฏิเสธความรับผิด', en: 'Copyright and Disclaimer' },
    summary: { th: 'การนำเนื้อหาไปใช้ การอ้างอิง และขอบเขตความรับผิดชอบของราชบัณฑิตยสภา', en: 'Reusing and citing the content, and the limits of the Royal Society’s responsibility' },
    version: '1.0', effective: '2026-10-01', updated: '2026-11-01',
    owner: { th: 'สำนักงานราชบัณฑิตยสภา', en: 'Office of the Royal Society' },
    points: [
      { th: 'เนื้อหาเป็นลิขสิทธิ์ของราชบัณฑิตยสภา เว้นแต่ระบุเป็นอย่างอื่น', en: 'The content is the Royal Society’s copyright unless stated otherwise.' },
      { th: 'นำไปใช้เพื่อการศึกษาและประโยชน์สาธารณะได้ โดยอ้างอิงแหล่งที่มา', en: 'It may be used for study and the public good, with the source cited.' },
      { th: 'ตราสัญลักษณ์ใช้ได้เมื่อได้รับอนุญาตเท่านั้น', en: 'The emblem may be used only with permission.' },
      { th: 'ราชบัณฑิตยสภาไม่รับผิดชอบต่อความเสียหายจากการนำข้อมูลไปใช้', en: 'The Royal Society is not liable for loss from using the information.' }
    ],
    sections: [
      { id: 'copyright', title: { th: 'ลิขสิทธิ์', en: 'Copyright' }, blocks: [
        { p: { th: 'ข้อความ ภาพ เอกสาร วารสาร และสื่อทั้งหมดบนเว็บไซต์นี้ เป็นลิขสิทธิ์ของราชบัณฑิตยสภา ตามพระราชบัญญัติลิขสิทธิ์ พ.ศ. ๒๕๓๗ และที่แก้ไขเพิ่มเติม เว้นแต่ระบุไว้เป็นอย่างอื่น ผลงานของราชบัณฑิตบางเรื่องเป็นลิขสิทธิ์ของผู้เขียน', en: 'All text, images, documents, journals and media on this website are the Royal Society’s copyright under the Copyright Act 1994, as amended, unless stated otherwise. Some Fellows’ works belong to their authors.' } }
      ] },
      { id: 'reuse', title: { th: 'การนำไปใช้และการอ้างอิง', en: 'Reuse and citation' }, blocks: [
        { list: [
          { th: 'ใช้เพื่อการศึกษา การวิจัย และประโยชน์สาธารณะที่ไม่แสวงหากำไรได้ โดยอ้างอิงแหล่งที่มา', en: 'Use for study, research and non-profit public purposes, citing the source' },
          { th: 'การใช้เพื่อการค้า การดัดแปลง หรือการพิมพ์ซ้ำ ต้องได้รับอนุญาตเป็นลายลักษณ์อักษร', en: 'Commercial use, adaptation or reprinting needs written permission' },
          { th: 'ตราสัญลักษณ์ราชบัณฑิตยสภาห้ามนำไปใช้โดยไม่ได้รับอนุญาต', en: 'The Royal Society emblem may not be used without permission' }
        ] },
        { note: { th: 'ตัวอย่างการอ้างอิง: ราชบัณฑิตยสภา. (๒๕๖๙). ชื่อเรื่อง. สืบค้นจาก https://royalsociety.go.th/…', en: 'Example citation: Royal Society of Thailand. (2026). Title. Retrieved from https://royalsociety.go.th/…' } }
      ] },
      { id: 'disclaimer', title: { th: 'การปฏิเสธความรับผิด', en: 'Disclaimer' }, blocks: [
        { p: { th: 'ราชบัณฑิตยสภาพยายามให้ข้อมูลบนเว็บไซต์ถูกต้องและเป็นปัจจุบัน แต่ไม่รับรองความครบถ้วนหรือความเหมาะสมกับการใช้งานเฉพาะใด ๆ และไม่รับผิดชอบต่อความเสียหายใด ๆ ที่เกิดจากการใช้ข้อมูล การหยุดให้บริการ หรือเนื้อหาของเว็บไซต์ภายนอกที่ลิงก์ไป', en: 'The Royal Society aims to keep the information accurate and current but does not guarantee it is complete or fit for a particular use, and is not liable for loss from using it, from interruptions, or from linked external websites.' } },
        { p: { th: 'ความเห็นในบทความของราชบัณฑิตเป็นความเห็นของผู้เขียน ไม่จำเป็นต้องเป็นความเห็นของราชบัณฑิตยสภา', en: 'Views in Fellows’ articles are the authors’ own.' } }
      ] },
      { id: 'permission', title: { th: 'การขออนุญาต', en: 'Asking permission' }, blocks: [
        { steps: [
          { th: 'ส่งคำขอผ่านแบบฟอร์มติดต่อ ระบุเนื้อหาที่ต้องการใช้และวัตถุประสงค์', en: 'Send a request through the contact form, naming the content and the purpose' },
          { th: 'สำนักงานพิจารณาและแจ้งผลภายใน ๑๕ วันทำการ', en: 'We reply within 15 working days' }
        ] }
      ] }
    ],
    contact: { th: 'ขออนุญาตใช้เนื้อหา', en: 'Ask permission to use content' }
  }
];

/* What the website keeps in the browser — the cookie policy's table.
   It must list the same keys as RS_CONFIG.cookies (01-config.js). */
window.RS_STORAGE = [
  { keys: ['rs-lang'], type: 'localStorage', need: true, purpose: { th: 'จดจำภาษาที่เลือก (ไทยหรืออังกฤษ)', en: 'Remembers the language you chose' }, keep: { th: 'จนกว่าจะล้างข้อมูลของเว็บไซต์', en: 'Until you clear this website’s data' } },
  { keys: ['rs-lang-scroll'], type: 'sessionStorage', need: true, purpose: { th: 'จดจำตำแหน่งการเลื่อนหน้าเมื่อสลับภาษา', en: 'Keeps your place when you switch language' }, keep: { th: 'ลบทันทีเมื่อเปิดหน้าภาษาใหม่ หรือเมื่อปิดแท็บ', en: 'Removed once the new page opens, or when the tab closes' } },
  { keys: ['rs-cookie-consent'], type: 'localStorage', need: true, purpose: { th: 'จดจำตัวเลือกคุกกี้ เพื่อไม่ต้องถามซ้ำ', en: 'Remembers your cookie choice' }, keep: { th: 'จนกว่าจะล้างข้อมูลของเว็บไซต์', en: 'Until you clear this website’s data' } },
  { keys: ['rs-accessibility-settings'], type: 'localStorage', purpose: { th: 'จดจำขนาดตัวอักษร คอนทราสต์สูง ลดการเคลื่อนไหว และขีดเส้นใต้ลิงก์', en: 'Remembers text size, contrast, motion and link settings' }, keep: { th: 'จนกว่าจะล้างข้อมูลของเว็บไซต์', en: 'Until you clear this website’s data' } },
  { keys: ['rs-recent-searches'], type: 'localStorage', purpose: { th: 'คำค้นล่าสุดไม่เกิน ๕ รายการ บนอุปกรณ์นี้เท่านั้น', en: 'Up to 5 recent searches, on this device only' }, keep: { th: 'จนกว่าจะกด “ล้าง” หรือล้างข้อมูลของเว็บไซต์', en: 'Until you press “Clear” or clear this website’s data' } },
  { keys: ['rs-notices-hidden'], type: 'localStorage', purpose: { th: 'จดจำประกาศที่เลือก “ไม่ต้องแสดงอีก”', en: 'Remembers notices you chose not to see again' }, keep: { th: 'จนกว่าจะปฏิเสธหมวดนี้ หรือล้างข้อมูลของเว็บไซต์', en: 'Until you decline this category or clear this website’s data' } },
  { keys: ['rs.bookmarks'], type: 'localStorage', purpose: { th: 'หน้าที่กดบันทึกไว้ บนอุปกรณ์นี้เท่านั้น', en: 'Pages you saved, on this device only' }, keep: { th: 'จนกว่าจะลบรายการ หรือล้างข้อมูลของเว็บไซต์', en: 'Until you remove them or clear this website’s data' } },
  { keys: ['rs.reminders'], type: 'localStorage', purpose: { th: 'การเตือนกิจกรรมที่ตั้งไว้ในปฏิทิน', en: 'Event reminders you set in the calendar' }, keep: { th: 'จนกว่าจะลบรายการ หรือล้างข้อมูลของเว็บไซต์', en: 'Until you remove them or clear this website’s data' } },
  { keys: ['rs-mobile-panel', 'rs-mobile-sub', 'rs-mobile-subsub'], type: 'sessionStorage', purpose: { th: 'จดจำตำแหน่งที่เปิดค้างในเมนูมือถือ', en: 'Keeps the mobile menu open where you left it' }, keep: { th: 'ลบเมื่อปิดแท็บ', en: 'Removed when the tab closes' } },
  { keys: ['rs-news-view', 'rs-news-size', 'rs-gallery-size', 'rs-works-view', 'rs-works-size', 'rs-series-view', 'rs-fellows-view', 'rs-fellows-size', 'rs-roll-view'], type: 'localStorage', purpose: { th: 'จดจำรูปแบบการแสดงรายการ (ตารางหรือรายการ) และจำนวนต่อหน้า', en: 'Remembers grid or list view and items per page' }, keep: { th: 'จนกว่าจะปฏิเสธหมวดนี้ หรือล้างข้อมูลของเว็บไซต์', en: 'Until you decline this category or clear this website’s data' } }
];
