/* ============================================================================
 * data/ita.js — Integrity and Transparency Assessment: public disclosure
 * ============================================================================
 *  Each item of pages/ita.html, opened on pages/ita-item.html?id=<id>.
 *
 *    id, group (and groupName), title, en, note (the line under the title),
 *    page — where this site already holds the information (or null),
 *    desc — what the item is, docs — documents known by name.
 *
 *  TODO (Office): supply each item's documents for this fiscal year (files
 *  to be kept on this site) and confirm the list against the NACC's OIT
 *  indicators for the year. Nothing here links to the earlier websites.
 * ========================================================================== */
window.RS_ITA = { year: 2569, groups: [{"id": "basic", "name": "ข้อมูลพื้นฐาน", "en": "Basic information", "what": "โครงสร้าง ผู้บริหาร อำนาจหน้าที่ กฎหมาย และช่องทางติดต่อ"}, {"id": "plan", "name": "การบริหารงาน", "en": "Management", "what": "ทิศทาง แผนประจำปี และผลการดำเนินงาน"}, {"id": "budget", "name": "งบประมาณและการจัดซื้อจัดจ้าง", "en": "Budget and procurement", "what": "แผนการใช้จ่าย แผนและผลการจัดซื้อจัดจ้าง"}, {"id": "people", "name": "การบริหารทรัพยากรบุคคล", "en": "Human resources", "what": "นโยบาย การดำเนินการ และรายงานผล"}, {"id": "complaints", "name": "การจัดการเรื่องร้องเรียนการทุจริต", "en": "Corruption complaints", "what": "ช่องทางแจ้งเรื่องและสถิติ"}, {"id": "integrity", "name": "การป้องกันการทุจริตและส่งเสริมคุณธรรม", "en": "Preventing corruption", "what": "เจตจำนง แผน มาตรการ และประมวลจริยธรรม"}], items: [
  {
    "id": "structure",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "โครงสร้างหน่วยงาน",
    "en": "Organisation chart",
    "note": "แผนผังการบริหาร",
    "page": "about-structure.html",
    "desc": "แผนผังแสดงโครงสร้างการแบ่งส่วนราชการของราชบัณฑิตยสภาและสำนักงานราชบัณฑิตยสภา",
    "docs": []
  },
  {
    "id": "executives",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "ข้อมูลผู้บริหาร",
    "en": "Executives",
    "note": "นายกและอุปนายก",
    "page": "about-executives.html",
    "desc": "รายชื่อ ตำแหน่ง และรูปถ่ายของผู้บริหารราชบัณฑิตยสภา",
    "docs": []
  },
  {
    "id": "authority",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "อำนาจหน้าที่",
    "en": "Mandate and authority",
    "note": "ตามพระราชบัญญัติ",
    "page": "about-authority.html",
    "desc": "อำนาจหน้าที่ของราชบัณฑิตยสภาตามพระราชบัญญัติราชบัณฑิตยสภา พ.ศ. ๒๕๕๘",
    "docs": []
  },
  {
    "id": "laws",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "กฎหมายที่เกี่ยวข้อง",
    "en": "Relevant laws",
    "note": "พระราชบัญญัติ ข้อบังคับ ระเบียบ",
    "page": "about-acts.html",
    "desc": "พระราชบัญญัติ ข้อบังคับ ระเบียบ และประกาศที่เกี่ยวข้องกับการดำเนินงาน",
    "docs": []
  },
  {
    "id": "news",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "ข่าวประชาสัมพันธ์",
    "en": "News",
    "note": "ข่าวและประกาศ",
    "page": "news.html",
    "desc": "ข่าวประชาสัมพันธ์และประกาศของราชบัณฑิตยสภา",
    "docs": []
  },
  {
    "id": "contact",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "ข้อมูลการติดต่อ",
    "en": "Contact information",
    "note": "ที่อยู่ แผนที่ โทรศัพท์",
    "page": "contact.html",
    "desc": "ที่อยู่ หมายเลขโทรศัพท์ ไปรษณีย์อิเล็กทรอนิกส์ และแผนที่ตั้งของสำนักงาน",
    "docs": []
  },
  {
    "id": "faq",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "คำถามที่พบบ่อย",
    "en": "Frequently asked questions",
    "note": "Q&A",
    "page": "contact-faq.html",
    "desc": "คำถามที่ประชาชนสอบถามบ่อยและคำตอบ",
    "docs": []
  },
  {
    "id": "feedback",
    "group": "basic",
    "groupName": "ข้อมูลพื้นฐาน",
    "title": "ช่องทางรับฟังความคิดเห็น",
    "en": "Feedback",
    "note": "แบบฟอร์มติดต่อออนไลน์",
    "page": "contact-form.html",
    "desc": "ช่องทางให้ประชาชนแสดงความคิดเห็นและข้อเสนอแนะต่อการดำเนินงาน",
    "docs": []
  },
  {
    "id": "direction",
    "group": "plan",
    "groupName": "การบริหารงาน",
    "title": "ทิศทางและการดำเนินงาน",
    "en": "Direction and operations",
    "note": "ยุทธศาสตร์และแนวทาง",
    "page": "about-direction.html",
    "desc": "ทิศทาง ยุทธศาสตร์ และแนวทางการดำเนินงานของราชบัณฑิตยสภา",
    "docs": []
  },
  {
    "id": "annual-plan",
    "group": "plan",
    "groupName": "การบริหารงาน",
    "title": "แผนปฏิบัติราชการประจำปี",
    "en": "Annual operating plan",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "แผนปฏิบัติราชการของสำนักงานราชบัณฑิตยสภาประจำปีงบประมาณ ระบุโครงการ งบประมาณ และตัวชี้วัด",
    "docs": []
  },
  {
    "id": "progress-6m",
    "group": "plan",
    "groupName": "การบริหารงาน",
    "title": "รายงานการกำกับติดตามการดำเนินงานรอบ ๖ เดือน",
    "en": "Six-month progress report",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "ความก้าวหน้าการดำเนินงานตามแผนปฏิบัติราชการในรอบ ๖ เดือนแรกของปีงบประมาณ",
    "docs": []
  },
  {
    "id": "annual-report",
    "group": "plan",
    "groupName": "การบริหารงาน",
    "title": "รายงานผลการดำเนินงานประจำปี",
    "en": "Annual report",
    "note": "รายงานประจำปี",
    "page": "series.html?id=annual-report",
    "desc": "ผลการดำเนินงานของราชบัณฑิตยสภาตลอดปีงบประมาณ",
    "docs": []
  },
  {
    "id": "spending-plan",
    "group": "budget",
    "groupName": "งบประมาณและการจัดซื้อจัดจ้าง",
    "title": "แผนการใช้จ่ายงบประมาณประจำปี",
    "en": "Annual spending plan",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "แผนการใช้จ่ายงบประมาณของสำนักงานราชบัณฑิตยสภาประจำปีงบประมาณ",
    "docs": []
  },
  {
    "id": "spending-6m",
    "group": "budget",
    "groupName": "งบประมาณและการจัดซื้อจัดจ้าง",
    "title": "รายงานการกำกับติดตามการใช้จ่ายงบประมาณรอบ ๖ เดือน",
    "en": "Six-month spending report",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "ผลการใช้จ่ายงบประมาณเทียบกับแผนในรอบ ๖ เดือนแรกของปีงบประมาณ",
    "docs": []
  },
  {
    "id": "procurement-plan",
    "group": "budget",
    "groupName": "งบประมาณและการจัดซื้อจัดจ้าง",
    "title": "แผนการจัดซื้อจัดจ้าง",
    "en": "Procurement plan",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "แผนการจัดซื้อจัดจ้างหรือแผนการจัดหาพัสดุประจำปีงบประมาณ",
    "docs": []
  },
  {
    "id": "procurement-notices",
    "group": "budget",
    "groupName": "งบประมาณและการจัดซื้อจัดจ้าง",
    "title": "ประกาศต่าง ๆ เกี่ยวกับการจัดซื้อจัดจ้าง",
    "en": "Procurement notices",
    "note": "ประกาศเชิญชวนและผลการพิจารณา",
    "page": null,
    "desc": "ประกาศเชิญชวน ประกาศผลการพิจารณา และสาระสำคัญของสัญญา",
    "docs": []
  },
  {
    "id": "procurement-report",
    "group": "budget",
    "groupName": "งบประมาณและการจัดซื้อจัดจ้าง",
    "title": "รายงานผลการจัดซื้อจัดจ้างประจำปี",
    "en": "Annual procurement report",
    "note": "ปีงบประมาณ ๒๕๖๘",
    "page": null,
    "desc": "ผลการจัดซื้อจัดจ้างของปีงบประมาณที่ผ่านมา พร้อมปัญหาอุปสรรคและแนวทางแก้ไข",
    "docs": []
  },
  {
    "id": "hr-policy",
    "group": "people",
    "groupName": "การบริหารทรัพยากรบุคคล",
    "title": "นโยบายการบริหารทรัพยากรบุคคล",
    "en": "HR policy",
    "note": "สำนักงานราชบัณฑิตยสภา",
    "page": null,
    "desc": "นโยบายการบริหารทรัพยากรบุคคลของผู้บริหารสำนักงาน",
    "docs": []
  },
  {
    "id": "hr-practice",
    "group": "people",
    "groupName": "การบริหารทรัพยากรบุคคล",
    "title": "การดำเนินการตามนโยบายการบริหารทรัพยากรบุคคล",
    "en": "HR in practice",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "การดำเนินการตามนโยบาย เช่น การสรรหา การพัฒนา และการประเมินผล",
    "docs": []
  },
  {
    "id": "hr-report",
    "group": "people",
    "groupName": "การบริหารทรัพยากรบุคคล",
    "title": "รายงานผลการบริหารและพัฒนาทรัพยากรบุคคลประจำปี",
    "en": "Annual HR report",
    "note": "ปีงบประมาณ ๒๕๖๘",
    "page": null,
    "desc": "ผลการบริหารและพัฒนาทรัพยากรบุคคลของปีงบประมาณที่ผ่านมา",
    "docs": []
  },
  {
    "id": "complaint-channel",
    "group": "complaints",
    "groupName": "การจัดการเรื่องร้องเรียนการทุจริต",
    "title": "ช่องทางการแจ้งเรื่องร้องเรียนการทุจริต",
    "en": "How to report corruption",
    "note": "แบบฟอร์มออนไลน์ โทรศัพท์ หรือหนังสือ",
    "page": "contact-form.html",
    "desc": "ผู้พบเห็นการทุจริตหรือประพฤติมิชอบของเจ้าหน้าที่ แจ้งเรื่องได้ทางแบบฟอร์มออนไลน์ โทรศัพท์ หรือหนังสือถึงสำนักงานราชบัณฑิตยสภา",
    "docs": []
  },
  {
    "id": "complaint-stats",
    "group": "complaints",
    "groupName": "การจัดการเรื่องร้องเรียนการทุจริต",
    "title": "ข้อมูลเชิงสถิติเรื่องร้องเรียนการทุจริตประจำปี",
    "en": "Annual complaint statistics",
    "note": "ปีงบประมาณ ๒๕๖๘",
    "page": null,
    "desc": "จำนวนเรื่องร้องเรียนการทุจริต ประเภท และผลการดำเนินการในปีงบประมาณ",
    "docs": []
  },
  {
    "id": "integrity-statement",
    "group": "integrity",
    "groupName": "การป้องกันการทุจริตและส่งเสริมคุณธรรม",
    "title": "เจตจำนงการบริหารงานด้วยความซื่อสัตย์สุจริต",
    "en": "Statement of integrity",
    "note": "ผู้บริหารสำนักงาน",
    "page": null,
    "desc": "เจตจำนงของผู้บริหารสำนักงานราชบัณฑิตยสภาที่จะบริหารงานด้วยความซื่อสัตย์สุจริต โปร่งใส และตรวจสอบได้",
    "docs": []
  },
  {
    "id": "moral-pledge",
    "group": "integrity",
    "groupName": "การป้องกันการทุจริตและส่งเสริมคุณธรรม",
    "title": "ประกาศเจตนารมณ์เป็นองค์กรคุณธรรม",
    "en": "Pledge as a moral organisation",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "ประกาศเจตนารมณ์ของสำนักงานราชบัณฑิตยสภาในการเป็นองค์กรคุณธรรม",
    "docs": [
      {
        "title": "ประกาศเจตนารมณ์เป็นองค์กรคุณธรรมของสำนักงานราชบัณฑิตยสภา ประจำปีงบประมาณ พ.ศ. ๒๕๖๙",
        "date": "2026-06-09"
      }
    ]
  },
  {
    "id": "anti-corruption-plan",
    "group": "integrity",
    "groupName": "การป้องกันการทุจริตและส่งเสริมคุณธรรม",
    "title": "แผนปฏิบัติการป้องกันและปราบปรามการทุจริต",
    "en": "Anti-corruption action plan",
    "note": "ศูนย์ปฏิบัติการต่อต้านการทุจริต",
    "page": null,
    "desc": "แผนปฏิบัติการป้องกันและปราบปรามการทุจริตและประพฤติมิชอบของสำนักงาน",
    "docs": [
      {
        "title": "แผนปฏิบัติการด้านการส่งเสริมคุณธรรม ประจำปีงบประมาณ พ.ศ. ๒๕๖๗",
        "date": "2023-11-24"
      }
    ]
  },
  {
    "id": "integrity-measures",
    "group": "integrity",
    "groupName": "การป้องกันการทุจริตและส่งเสริมคุณธรรม",
    "title": "มาตรการส่งเสริมคุณธรรมและความโปร่งใสภายในหน่วยงาน",
    "en": "Measures for integrity and transparency",
    "note": "ศูนย์ปฏิบัติการต่อต้านการทุจริต",
    "page": null,
    "desc": "มาตรการภายในเพื่อส่งเสริมคุณธรรมและความโปร่งใสในการปฏิบัติงาน",
    "docs": [
      {
        "title": "มาตรการส่งเสริมคุณธรรมและความโปร่งใสภายในหน่วยงาน ประจำปีงบประมาณ พ.ศ. ๒๕๖๔",
        "date": ""
      },
      {
        "title": "มาตรการส่งเสริมคุณธรรมและความโปร่งใสภายในหน่วยงาน ประจำปีงบประมาณ พ.ศ. ๒๕๖๓",
        "date": ""
      }
    ]
  },
  {
    "id": "ethics-code",
    "group": "integrity",
    "groupName": "การป้องกันการทุจริตและส่งเสริมคุณธรรม",
    "title": "ประมวลจริยธรรม",
    "en": "Code of ethics",
    "note": "ข้าราชการสำนักงานราชบัณฑิตยสภา",
    "page": null,
    "desc": "ประมวลจริยธรรมของข้าราชการสำนักงานราชบัณฑิตยสภา",
    "docs": []
  },
  {
    "id": "risk-assessment",
    "group": "integrity",
    "groupName": "การป้องกันการทุจริตและส่งเสริมคุณธรรม",
    "title": "การประเมินความเสี่ยงการทุจริตประจำปี",
    "en": "Annual corruption risk assessment",
    "note": "ปีงบประมาณ ๒๕๖๙",
    "page": null,
    "desc": "ผลการประเมินความเสี่ยงการทุจริตและมาตรการจัดการความเสี่ยง",
    "docs": []
  }
] };
