/* ============================================================================
 * data/leaders.js — The executives and the past Presidents (CMS feed)
 * ============================================================================
 *  Drawn by 28-leaders.js on pages/about-executives.html (president, vices)
 *  and pages/about-past-presidents.html (past, by era).
 *
 *  president / vices[]:
 *    fellow     id in data/fellows.js (links to the Fellow's page)
 *    academy    'moral'|'science'|'arts'
 *    photo      portrait, 320 x 410
 *    role       {th, en} the office held
 *    honorific  the academic title, set apart from the name
 *    name       {th, en} the name; en is the full English style
 *    rank       {th, en} Fellow of which academy
 *    field      {th, en} discipline · group
 *    duties     president only: [{title {th,en}, text (Thai), ref (มาตรา)}]
 *
 *  past[]: in order within each era
 *    romanised  true: name.en is romanised (RTGS), not yet a confirmed spelling
 *    era        'society' (2469–2476) | 'institute' (2476–2558) | 'today'
 *    honorific, name {th, en} — en is the full English style, title included
 *    photo
 *    terms      [{from, to?, acting?}] Buddhist-era years; to 'now' = in office
 *    current    true for the President in office (links to the executives)
 * ========================================================================== */
window.RS_LEADERS = {
 "president": {
  "fellow": "science-025",
  "academy": "science",
  "photo": "assets/images/about/leaders/surapol-issaragrisil.jpg",
  "role": {
   "th": "นายกราชบัณฑิตยสภา",
   "en": "President of the Royal Society"
  },
  "honorific": "ศาสตราจารย์เกียรติคุณ",
  "name": {
   "th": "นพ.สุรพล อิสรไกรศีล",
   "en": "Professor Emeritus Surapol Issaragrisil, M.D."
  },
  "rank": {
   "th": "ราชบัณฑิต สำนักวิทยาศาสตร์",
   "en": "Fellow, Academy of Science"
  },
  "field": {
   "th": "สาขาวิชาแพทยศาสตร์ · กลุ่มวิทยาศาสตร์สุขภาพ",
   "en": "Medicine · health sciences"
  },
  "duties": [
   {
    "title": {
     "th": "เป็นนายกสภา",
     "en": "Chairs the council"
    },
    "text": "ประธานการประชุมราชบัณฑิตยสภา ซึ่งราชบัณฑิตทุกคนเป็นกรรมการ",
    "ref": "มาตรา ๒๔"
   },
   {
    "title": {
     "th": "กำกับงานวิชาการ",
     "en": "Oversees the academic work"
    },
    "text": "ให้เป็นไปตามนโยบาย ข้อบังคับ ระเบียบ และมติของราชบัณฑิตยสภา",
    "ref": "มาตรา ๒๖"
   }
  ]
 },
 "vices": [
  {
   "fellow": "mps-012",
   "academy": "moral",
   "photo": "assets/images/about/leaders/phalin-phoocharoon.jpg",
   "role": {
    "th": "อุปนายกราชบัณฑิตยสภา คนที่ ๑",
    "en": "First Vice-President"
   },
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร.ผลิน ภู่จรูญ",
    "en": "Professor Phalin Phoocharoon, Ph.D."
   },
   "rank": {
    "th": "ราชบัณฑิต สำนักธรรมศาสตร์และการเมือง",
    "en": "Fellow, Academy of Moral and Political Sciences"
   },
   "field": {
    "th": "สาขาวิชาบริหารธุรกิจ · กลุ่มสังคมศาสตร์",
    "en": "Business administration · social sciences"
   }
  },
  {
   "fellow": "arts-011",
   "academy": "arts",
   "photo": "assets/images/about/leaders/viboon-leesuwan.jpg",
   "role": {
    "th": "อุปนายกราชบัณฑิตยสภา คนที่ ๒",
    "en": "Second Vice-President"
   },
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "วิบูลย์ ลี้สุวรรณ",
    "en": "Professor Viboon Leesuwan"
   },
   "rank": {
    "th": "ราชบัณฑิต สำนักศิลปกรรม",
    "en": "Fellow, Academy of Arts"
   },
   "field": {
    "th": "สาขาวิชาจิตรกรรม · กลุ่มวิจิตรศิลป์",
    "en": "Painting · fine arts"
   }
  }
 ],
 "past": [
  {
   "era": "society",
   "honorific": "พระเจ้าบรมวงศ์เธอ",
   "name": {
    "th": "กรมพระดำรงราชานุภาพ",
    "en": "His Royal Highness Prince Damrong Rajanubhab"
   },
   "photo": "assets/images/about/leaders/damrong.jpg",
   "terms": [
    {
     "from": 2469
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์พิเศษ",
   "name": {
    "th": "พระยาอนุมานราชธน",
    "en": "Adjunct Professor Phraya Anuman Rajadhon"
   },
   "photo": "assets/images/about/leaders/anuman-rajadhon.jpg",
   "terms": [
    {
     "from": 2490,
     "to": 2512,
     "acting": true
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์ พลตรี",
   "name": {
    "th": "พระเจ้าวรวงศ์เธอ กรมหมื่นนราธิปพงศ์ประพันธ์",
    "en": "Professor Major General Prince Wan Waithayakon"
   },
   "photo": "assets/images/about/leaders/naradhip.jpg",
   "terms": [
    {
     "from": 2512,
     "to": 2516,
     "acting": true
    },
    {
     "from": 2516,
     "to": 2518
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "สุกิจ นิมมานเหมินท์",
    "en": "Professor Sukich Nimmanheminda"
   },
   "photo": "assets/images/about/leaders/sukit.jpg",
   "terms": [
    {
     "from": 2518,
     "to": 2519
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "เสริม วินิจฉัยกุล",
    "en": "Professor Serm Vinicchayakul"
   },
   "photo": "assets/images/about/leaders/serm.jpg",
   "terms": [
    {
     "from": 2519,
     "to": 2528
    }
   ],
   "romanised": true
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์ พลโท",
   "name": {
    "th": "พระยาศัลวิธานนิเทศ",
    "en": "Professor Lieutenant General Phraya Salwidhan Nidhes"
   },
   "photo": "assets/images/about/leaders/salwithan.jpg",
   "terms": [
    {
     "from": 2528,
     "to": 2532
    }
   ],
   "romanised": true
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์ พันโท",
   "name": {
    "th": "ดร.บุญพฤกษ์ จาฏามระ",
    "en": "Professor Lieutenant Colonel Boonpruek Chatamara, Ph.D."
   },
   "photo": "assets/images/about/leaders/boonpruek.jpg",
   "terms": [
    {
     "from": 2528,
     "to": 2532,
     "acting": true
    },
    {
     "from": 2532,
     "to": 2540
    }
   ],
   "romanised": true
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร.ประยูร กาญจนดุล",
    "en": "Professor Prayoon Kanchanadul, Ph.D."
   },
   "photo": "assets/images/about/leaders/prayoon.jpg",
   "terms": [
    {
     "from": 2540,
     "to": 2542
    }
   ],
   "romanised": true
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร.ประเสริฐ ณ นคร",
    "en": "Professor Prasert na Nagara, Ph.D."
   },
   "photo": "assets/images/about/leaders/prasert.jpg",
   "terms": [
    {
     "from": 2542,
     "to": 2543
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร. นพ.อรรถสิทธิ์ เวชชาชีวะ",
    "en": "Professor Athasit Vejjajiva, M.D., Ph.D."
   },
   "photo": "assets/images/about/leaders/athasit.jpg",
   "terms": [
    {
     "from": 2544,
     "to": 2548
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร.ชัยอนันต์ สมุทวณิช",
    "en": "Professor Chai-Anan Samudavanija, Ph.D."
   },
   "photo": "assets/images/about/leaders/chai-anan.jpg",
   "terms": [
    {
     "from": 2548,
     "to": 2552
    }
   ]
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์พิเศษ",
   "name": {
    "th": "ดร.ปัญญา บริสุทธิ์",
    "en": "Adjunct Professor Panya Borisut, Ph.D."
   },
   "photo": "assets/images/about/leaders/panya.jpg",
   "terms": [
    {
     "from": 2552,
     "to": 2556
    }
   ],
   "romanised": true
  },
  {
   "era": "institute",
   "honorific": "ศาสตราจารย์พิเศษ",
   "name": {
    "th": "ดร.สันทัด โรจนสุนทร",
    "en": "Adjunct Professor Santad Rojanasoonthon, Ph.D."
   },
   "photo": "assets/images/about/leaders/santad.jpg",
   "terms": [
    {
     "from": 2556,
     "to": 2558
    }
   ]
  },
  {
   "era": "today",
   "honorific": "ศาสตราจารย์พิเศษ",
   "name": {
    "th": "ดร.สันทัด โรจนสุนทร",
    "en": "Adjunct Professor Santad Rojanasoonthon, Ph.D."
   },
   "photo": "assets/images/about/leaders/santad.jpg",
   "terms": [
    {
     "from": 2558
    }
   ]
  },
  {
   "era": "today",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร.ปกรณ์ อดุลพันธุ์",
    "en": "Professor Pakorn Adulbhan, Ph.D."
   },
   "photo": "assets/images/about/leaders/pakorn.jpg",
   "terms": [
    {
     "from": 2558,
     "to": 2560
    }
   ]
  },
  {
   "era": "today",
   "honorific": "",
   "name": {
    "th": "ดร.โสภา ชูพิกุลชัย ชปีลมันน์",
    "en": "Sopha Chupikulchai Spielmann, Ph.D."
   },
   "photo": "assets/images/about/leaders/sopha.jpg",
   "terms": [
    {
     "from": 2560,
     "to": 2562
    }
   ],
   "romanised": true
  },
  {
   "era": "today",
   "honorific": "ศาสตราจารย์เกียรติคุณ",
   "name": {
    "th": "นพ.สุรพล อิสรไกรศีล",
    "en": "Professor Emeritus Surapol Issaragrisil, M.D."
   },
   "photo": "assets/images/about/leaders/surapol-issaragrisil.jpg",
   "terms": [
    {
     "from": 2562,
     "to": 2564
    }
   ]
  },
  {
   "era": "today",
   "honorific": "ศาสตราจารย์",
   "name": {
    "th": "ดร.สุรพล วิรุฬห์รักษ์",
    "en": "Professor Surapone Virulrak, Ph.D."
   },
   "photo": "assets/images/about/leaders/surapol-wirulrak.jpg",
   "terms": [
    {
     "from": 2564,
     "to": 2566
    }
   ]
  },
  {
   "era": "today",
   "honorific": "ศาสตราจารย์เกียรติคุณ",
   "name": {
    "th": "นพ.สุรพล อิสรไกรศีล",
    "en": "Professor Emeritus Surapol Issaragrisil, M.D."
   },
   "photo": "assets/images/about/leaders/surapol-issaragrisil.jpg",
   "terms": [
    {
     "from": 2566,
     "to": "now"
    }
   ],
   "current": true
  }
 ]
};
