const bcrypt = require("bcryptjs");
const db = require("../config/database");

console.log("Seeding database for Rana Ji Chhath Puja Park Samiti (Regd.)...");

// 1. Settings
const defaultSettings = {
  samiti_name_hi: "राणाजी छठ पूजा पार्क समिति (रजि.)",
  samiti_name_en: "Ranaji Chhath Puja Park Samiti (Regd.)",
  tagline_hi: "लगातार 10 वर्षों से छठी मैया की सेवा में",
  tagline_en: "Dedicated to the Service of Chhathi Maiya for 10 Consecutive Years",
  hero_desc_hi: "आस्था, श्रद्धा और सामाजिक एकता के साथ छठ महापर्व के भव्य आयोजन एवं सेवा में समर्पित।",
  hero_desc_en: "Dedicated to the grand celebration and selfless service of Chhath Mahaparv with devotion, faith, and cultural unity.",
  about_summary_hi: "राणाजी छठ पूजा पार्क समिति (रजि.) क्षेत्र की एक अग्रणी पूजा समिति है, जो लगातार 10 वर्षों से छठी मैया की सेवा में समर्पित है। समिति का उद्देश्य छठ महापर्व का श्रद्धा एवं भक्ति के साथ आयोजन करना तथा समाज में धार्मिक और सांस्कृतिक एकता को बढ़ावा देना है।",
  about_summary_en: "Ranaji Chhath Puja Park Samiti (Regd.) is a leading cultural and devotional committee of the region, dedicated to the divine service of Chhathi Maiya for the past 10 consecutive years. The committee aims to organize Chhath Mahaparv with deep reverence and foster social and cultural unity.",
  address_hi: "मेट्रो पिलर नं. 46 के सामने, मेन नजफगढ़ रोड, राणाजी छठ पूजा पार्क (MCD पार्क), राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043",
  address_en: "Opposite Metro Pillar No. 46, Main Najafgarh Road, Ranaji Chhath Puja Park (MCD Park), Ranaji Enclave, Najafgarh, New Delhi – 110043",
  metro_landmark: "Metro Pillar No. 46 (Main Najafgarh Road)",
  phone_president: "9971472216",
  phone_gen_sec: "7982713291",
  phone_treasurer: "9312712790",
  president_name_hi: "श्री रामानन्द सिंह",
  president_name_en: "Shri Ramanand Singh",
  gen_sec_name_hi: "श्री अशोक सिंह",
  gen_sec_name_en: "Shri Ashok Singh",
  treasurer_name_hi: "श्री उमेश शर्मा",
  treasurer_name_en: "Shri Umesh Sharma",
  upi_id: "9971472216@indianbk",
  upi_payee_name: "ranaji chhath pooja park samiti",
  bank_name: "Indian Bank",
  qr_code_image: "/images/original_qr.png",
  announcement_bar_text_hi: "जय छठी मैया 🙏 | छठ महापर्व 2026: 15-16 नवम्बर 2026 को राणाजी छठ पूजा पार्क में आप सभी सपरिवार सादर आमंत्रित हैं!",
  announcement_bar_text_en: "Jai Chhathi Maiya 🙏 | Chhath Mahaparv 2026: Cordial invitation to all devotees on 15-16 November 2026 at Ranaji Chhath Puja Park!",
  announcement_active: "1",
  map_embed_url: ""
};

const insertSetting = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
for (const [key, val] of Object.entries(defaultSettings)) {
  insertSetting.run(key, val);
}

// 2. Admin account
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync("Admin@Chhath2026", salt);

const insertAdmin = db.prepare(`
  INSERT OR IGNORE INTO admins (username, password_hash, role)
  VALUES (?, ?, ?)
`);
insertAdmin.run("admin", passwordHash, "superadmin");

// 3. Events
const checkEvent = db.prepare("SELECT COUNT(*) as count FROM events").get();
if (checkEvent.count === 0) {
  const insertEvent = db.prepare(`
    INSERT INTO events (title_hi, title_en, start_date, end_date, location_hi, location_en, description_hi, description_en, schedule_json, status, featured, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const schedule2026 = JSON.stringify([
    {
      date: "2026-11-15",
      title_hi: "सायंकाल अर्घ्य (संध्या अर्घ्य)",
      title_en: "Evening Arghya (Sandhya Arghya)",
      desc_hi: "अस्ताचलगामी भगवान सूर्य देव को प्रथम अर्घ्य एवं भक्ति संगीत कार्यक्रम",
      desc_en: "First Arghya offering to the setting Sun God accompanied by devotional songs and cultural presentation"
    },
    {
      date: "2026-11-16",
      title_hi: "सुबह का अर्घ्य (उषा अर्घ्य) एवं पारण",
      title_en: "Morning Arghya (Usha Arghya) & Paran",
      desc_hi: "उदीयमान भगवान सूर्य देव को प्रातः अर्घ्य अर्पण, हवन एवं महाप्रसाद वितरण",
      desc_en: "Morning Arghya offering to the rising Sun God, sacred rituals, and Mahaprasad distribution"
    }
  ]);

  insertEvent.run(
    "छठ महापर्व 2026",
    "Chhath Mahaparv 2026",
    "2026-11-15",
    "2026-11-16",
    "राणाजी छठ पूजा पार्क (MCD पार्क), मेन नजफगढ़ रोड, राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043",
    "Ranaji Chhath Puja Park (MCD Park), Main Najafgarh Road, Ranaji Enclave, Najafgarh, New Delhi – 110043",
    "राणाजी छठ पूजा पार्क समिति (रजि.) द्वारा 10वें वर्ष में भव्य छठ महापर्व का आयोजन। इस पावन अवसर पर घाट पर जल, प्रकाश, सुरक्षा, स्वच्छ वेदी और महाप्रसाद की संपूर्ण व्यवस्था की जा रही है। समस्त श्रद्धालु सपरिवार सादर आमंत्रित हैं।",
    "Grand celebration of Chhath Mahaparv organized by Ranaji Chhath Puja Park Samiti (Regd.) celebrating 10 consecutive years of dedicated service. Complete arrangements for sacred ghat water, lighting, security, clean altars, and Mahaprasad are organized.",
    schedule2026,
    "upcoming",
    1,
    "/images/img_20_offset_6306509.jpg"
  );

  insertEvent.run(
    "छठ महापर्व 2025 (गत वर्ष)",
    "Chhath Mahaparv 2025 (Past Year)",
    "2025-10-27",
    "2025-10-28",
    "राणाजी छठ पूजा पार्क, नजफगढ़, नई दिल्ली",
    "Ranaji Chhath Puja Park, Najafgarh, New Delhi",
    "विगत वर्ष का अत्यंत सफल एवं ऐतिहासिक छठ महापर्व आयोजन जिसमें हजारों श्रद्धालुओं ने शांतिपूर्ण वातावरण में पूजा संपन्न की।",
    "The highly successful celebration of Chhath Mahaparv from the previous year attended by thousands of devotees in a serene and devotional atmosphere.",
    "[]",
    "completed",
    0,
    "/images/img_26_offset_7808649.jpg"
  );
}

// 4. Committee Members (All 66 from Page 5 in exact order)
const checkCommittee = db.prepare("SELECT COUNT(*) as count FROM committee_members").get();
if (checkCommittee.count === 0) {
  const insertMember = db.prepare(`
    INSERT INTO committee_members (name_hi, name_en, designation_hi, designation_en, phone, order_index, is_leadership)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const members = [
    { no: 1, hi: "श्री सत्येन्द्र सिंह राणा", en: "Shri Satyendra Singh Rana", desHi: "मार्गदर्शक / मुख्य पदाधिकारी", desEn: "Patron / Key Official", phone: "" },
    { no: 2, hi: "श्री रामानन्द सिंह", en: "Shri Ramanand Singh", desHi: "अध्यक्ष", desEn: "President", phone: "9971472216", isLead: 1 },
    { no: 3, hi: "श्री अशोक सिंह", en: "Shri Ashok Singh", desHi: "महासचिव", desEn: "General Secretary", phone: "7982713291", isLead: 1 },
    { no: 4, hi: "श्री उमेश शर्मा", en: "Shri Umesh Sharma", desHi: "कोषाध्यक्ष", desEn: "Treasurer", phone: "9312712790", isLead: 1 },
    { no: 5, hi: "श्री सुधांशु शेखर", en: "Shri Sudhanshu Shekhar" },
    { no: 6, hi: "श्री राजू सिंह", en: "Shri Raju Singh" },
    { no: 7, hi: "श्री विद्यानंद चौधरी", en: "Shri Vidyanand Choudhary" },
    { no: 8, hi: "श्री जोशी जी", en: "Shri Joshi Ji" },
    { no: 9, hi: "श्री आनंद झा", en: "Shri Anand Jha" },
    { no: 10, hi: "श्री अमरनाथ सिंह", en: "Shri Amarnath Singh" },
    { no: 11, hi: "श्री सुरेन्द्र सिंह", en: "Shri Surendra Singh" },
    { no: 12, hi: "श्री सुनील राणा", en: "Shri Sunil Rana" },
    { no: 13, hi: "श्री संतोष झा", en: "Shri Santosh Jha" },
    { no: 14, hi: "श्री लोहा सिंह", en: "Shri Loha Singh" },
    { no: 15, hi: "श्री दिलीप कुमार सिंह", en: "Shri Dilip Kumar Singh" },
    { no: 16, hi: "श्री दुर्गेश लाल कर्ण", en: "Shri Durgesh Lal Karn" },
    { no: 17, hi: "श्री शेखर सिंह", en: "Shri Shekhar Singh" },
    { no: 18, hi: "श्री किशोर जी", en: "Shri Kishore Ji" },
    { no: 19, hi: "श्री राजकुमार मांझी", en: "Shri Rajkumar Manjhi" },
    { no: 20, hi: "श्री सुरेन्द्र मांझी", en: "Shri Surendra Manjhi" },
    { no: 21, hi: "श्री अशोक भगत", en: "Shri Ashok Bhagat" },
    { no: 22, hi: "श्री दिलीप वर्मा", en: "Shri Dilip Verma" },
    { no: 23, hi: "श्री राकेश रंजन", en: "Shri Rakesh Ranjan" },
    { no: 24, hi: "श्री गणेश यादव", en: "Shri Ganesh Yadav" },
    { no: 25, hi: "श्री सुभाष यादव", en: "Shri Subhash Yadav" },
    { no: 26, hi: "श्री तारकेश्वर शर्मा", en: "Shri Tarkeshwar Sharma" },
    { no: 27, hi: "डॉक्टर बैद्यनाथ", en: "Dr. Baidyanath" },
    { no: 28, hi: "श्री संजय चौधरी", en: "Shri Sanjay Choudhary" },
    { no: 29, hi: "श्री अमित कुमार सिंह", en: "Shri Amit Kumar Singh" },
    { no: 30, hi: "श्री संदीप सिंह", en: "Shri Sandeep Singh" },
    { no: 31, hi: "श्री अखिलेश दास", en: "Shri Akhilesh Das" },
    { no: 32, hi: "श्री चन्द्रशेखर तिवारी", en: "Shri Chandrashekhar Tiwari" },
    { no: 33, hi: "श्री दिलीप सिंह", en: "Shri Dilip Singh" },
    { no: 34, hi: "श्री कैलाश झा", en: "Shri Kailash Jha" },
    { no: 35, hi: "श्री संजीत सिंह", en: "Shri Sanjeet Singh" },
    { no: 36, hi: "श्री अशोक त्रिपाठी", en: "Shri Ashok Tripathi" },
    { no: 37, hi: "डॉक्टर मदन", en: "Dr. Madan" },
    { no: 38, hi: "श्री अतुल दुबे", en: "Shri Atul Dubey" },
    { no: 39, hi: "श्री विनोद कुमार शर्मा", en: "Shri Vinod Kumar Sharma" },
    { no: 40, hi: "श्री जितेन्द्र सिंह", en: "Shri Jitendra Singh" },
    { no: 41, hi: "श्री मिथिलेश सिंह", en: "Shri Mithilesh Singh" },
    { no: 42, hi: "श्री अरविंद सिंह", en: "Shri Arvind Singh" },
    { no: 43, hi: "श्री गिरिराज सिंह", en: "Shri Giriraj Singh" },
    { no: 44, hi: "श्री गजेन्द्र सिंह", en: "Shri Gajendra Singh" },
    { no: 45, hi: "श्री संजीव इस्सर", en: "Shri Sanjeev Issar" },
    { no: 46, hi: "श्री बच्चा ठाकुर", en: "Shri Bachcha Thakur" },
    { no: 47, hi: "श्री संजय भगत", en: "Shri Sanjay Bhagat" },
    { no: 48, hi: "श्री प्रमोद झा", en: "Shri Pramod Jha" },
    { no: 49, hi: "श्री गौरी शंकर इस्सर", en: "Shri Gauri Shankar Issar" },
    { no: 50, hi: "श्री उदय सिंह", en: "Shri Uday Singh" },
    { no: 51, hi: "श्री किशोर जी", en: "Shri Kishore Ji" },
    { no: 52, hi: "श्री रणजीत सिंह", en: "Shri Ranjeet Singh" },
    { no: 53, hi: "श्री संतोष कर्ण", en: "Shri Santosh Karn" },
    { no: 54, hi: "श्री भोला सिंह", en: "Shri Bhola Singh" },
    { no: 55, hi: "श्री दीपक श्रीवास्तव", en: "Shri Deepak Shrivastava" },
    { no: 56, hi: "श्री दिलीप सिंह", en: "Shri Dilip Singh" },
    { no: 57, hi: "श्री नीरज कुमार सिंह", en: "Shri Neeraj Kumar Singh" },
    { no: 58, hi: "श्री योगेन्द्र सिंह", en: "Shri Yogendra Singh" },
    { no: 59, hi: "श्री मनीष कुमार", en: "Shri Manish Kumar" },
    { no: 60, hi: "श्री साधु यादव", en: "Shri Sadhu Yadav" },
    { no: 61, hi: "श्री कृष्ण मुरारी", en: "Shri Krishna Murari" },
    { no: 62, hi: "श्री राज कुमार शर्मा", en: "Shri Raj Kumar Sharma" },
    { no: 63, hi: "श्री विनय कुमार सिंह", en: "Shri Vinay Kumar Singh" },
    { no: 64, hi: "श्री गौतम मिश्रा", en: "Shri Gautam Mishra" },
    { no: 65, hi: "श्री संजीत सिंह", en: "Shri Sanjeet Singh" },
    { no: 66, hi: "श्री सुबोध कुमार", en: "Shri Subodh Kumar" }
  ];

  for (const m of members) {
    insertMember.run(
      m.hi,
      m.en,
      m.desHi || "कार्यकारिणी सदस्य",
      m.desEn || "Executive Committee Member",
      m.phone || "",
      m.no,
      m.isLead ? 1 : 0
    );
  }
}

// 5. Gallery Items
const checkGallery = db.prepare("SELECT COUNT(*) as count FROM gallery_items").get();
if (checkGallery.count === 0) {
  const insertGallery = db.prepare(`
    INSERT INTO gallery_items (title_hi, title_en, category, image_url, caption_hi, caption_en, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const galleryItems = [
    {
      title_hi: "छठ घाट पर सूर्य देव की उपासना",
      title_en: "Worship of Surya Dev at Chhath Ghat",
      category: "chhath-2026",
      image_url: "/images/img_9_offset_1533842.jpg",
      caption_hi: "सप्तरथारूढ़ भगवान सूर्य एवं छठ मैया की पावन छवि",
      caption_en: "Sacred representation of Lord Surya on his divine chariot with Chhathi Maiya",
      order: 1
    },
    {
      title_hi: "सायंकाल अर्घ्य समर्पण",
      title_en: "Evening Arghya Devotion",
      category: "chhath-2026",
      image_url: "/images/img_20_offset_6306509.jpg",
      caption_hi: "राणाजी छठ पूजा पार्क में श्रद्धालुओं द्वारा पावन जल में सायंकाल अर्घ्य समर्पण",
      caption_en: "Devotees standing in sacred water offering evening Arghya at Ranaji Chhath Puja Park",
      order: 2
    },
    {
      title_hi: "प्रभु श्री राम, माता सीता एवं छठ मैया",
      title_en: "Lord Rama, Sita Mata & Chhathi Maiya",
      category: "religious",
      image_url: "/images/img_10_offset_2432634.jpg",
      caption_hi: "अयोध्या आगमन पर भगवान राम व माता सीता द्वारा सूर्योपासना की पावन परंपरा",
      caption_en: "Divine memory of Surya worship initiated upon returning to Ayodhya",
      order: 3
    },
    {
      title_hi: "घाट की भव्य दीपमाला एवं सजावट",
      title_en: "Illuminated Ghat & Decorative Lamps",
      category: "past-years",
      image_url: "/images/img_26_offset_7808649.jpg",
      caption_hi: "संध्याकाल में जगमगाते मिट्टी के दीये, ईख की वेदी एवं श्रद्धा का संगम",
      caption_en: "Ghat illuminated with traditional earthen diyas, sugarcane altars, and devotional atmosphere",
      order: 4
    },
    {
      title_hi: "भक्तों का सपरिवार स्वागत",
      title_en: "Cordial Welcome to Devotee Families",
      category: "samiti-activities",
      image_url: "/images/img_20_offset_6306509.jpg",
      caption_hi: "समिति के कार्यकर्ताओं द्वारा भक्तों के लिए जल, वेदी व सुरक्षा की निशुल्क व्यवस्था",
      caption_en: "Free arrangements for sacred water, clean altars, and volunteer security by Samiti members",
      order: 5
    },
    {
      title_hi: "सांस्कृतिक भक्ति संध्या",
      title_en: "Cultural Devotional Evening",
      category: "cultural",
      image_url: "/images/img_9_offset_1533842.jpg",
      caption_hi: "छठ महापर्व की पावन रात्रि में पारंपरिक लोकगीतों एवं भजनों का गायन",
      caption_en: "Traditional folk songs and bhajans dedicated to Chhathi Maiya during the holy night",
      order: 6
    }
  ];

  for (const item of galleryItems) {
    insertGallery.run(
      item.title_hi,
      item.title_en,
      item.category,
      item.image_url,
      item.caption_hi,
      item.caption_en,
      item.order
    );
  }
}

// 6. Announcements
const checkAnnounce = db.prepare("SELECT COUNT(*) as count FROM announcements").get();
if (checkAnnounce.count === 0) {
  const insertAnnounce = db.prepare(`
    INSERT INTO announcements (title_hi, title_en, message_hi, message_en, is_active, priority)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertAnnounce.run(
    "छठ महापर्व 2026 आमंत्रण",
    "Chhath Mahaparv 2026 Invitation",
    "राणाजी छठ पूजा पार्क समिति (रजि.) की ओर से समस्त श्रद्धालु 15-16 नवम्बर 2026 को सायंकाल एवं सुबह के अर्घ्य हेतु सपरिवार सादर आमंत्रित हैं।",
    "Ranaji Chhath Puja Park Samiti (Regd.) cordially invites all devotees and their families for the Evening and Morning Arghya on 15-16 November 2026.",
    1,
    10
  );

  insertAnnounce.run(
    "वेदी पंजीकरण एवं व्यवस्था सूचना",
    "Altar (Vedi) Cleanliness & Arrangements Notice",
    "पार्क में पूजा वेदी के आसपास स्वच्छता बनाए रखें। समिति द्वारा स्वच्छ जल, प्रकाश, प्राथमिक चिकित्सा एवं सुरक्षा के पुख्ता इंतजाम किए गए हैं।",
    "Kindly maintain utmost cleanliness around the puja altars in the park. The Samiti has arranged clean water, lighting, first aid, and security for all.",
    1,
    5
  );
}

console.log("Database seeded successfully!");

