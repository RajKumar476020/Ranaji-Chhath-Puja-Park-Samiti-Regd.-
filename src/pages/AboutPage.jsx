import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Users, Sun, Sparkles, Award, CheckCircle, Landmark, TreePine } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/common/SEO';

const AboutPage = () => {
  const { lang, t } = useLanguage();

  const values = [
    {
      titleHi: "श्रद्धा (Shraddha)",
      titleEn: "Reverence & Faith",
      descHi: "छठी मैया एवं भगवान सूर्य देव के प्रति अटूट आस्था, निष्ठा और भक्ति भाव।",
      descEn: "Unshakable faith, devotion, and reverence towards Chhathi Maiya and Lord Surya."
    },
    {
      titleHi: "सेवा (Seva)",
      titleEn: "Selfless Service",
      descHi: "छठ व्रतियों एवं समस्त श्रद्धालु परिवारों की निःस्वार्थ सेवा एवं सहयोग।",
      descEn: "Selfless service, care, and assistance for all devotees and fasting Vratis."
    },
    {
      titleHi: "समर्पण (Samarpan)",
      titleEn: "Dedication",
      descHi: "समिति के सभी 66 सदस्यों का धार्मिक एवं सामाजिक कार्यों में पूर्ण समर्पण।",
      descEn: "Complete dedication and commitment of all 66 executive members towards community welfare."
    },
    {
      titleHi: "एकता (Ekta)",
      titleEn: "Unity & Harmony",
      descHi: "जाति, वर्ग से परे समाज के सभी वर्गों को एक सूत्र में पिरोकर सांस्कृतिक समरसता।",
      descEn: "Fostering social equality, cultural harmony, and fraternity across all sections of society."
    },
    {
      titleHi: "संस्कृति (Sanskriti)",
      titleEn: "Cultural Heritage",
      descHi: "भारतीय सनातन संस्कृति, लोक परंपराओं एवं छठ पर्व की पवित्रता का संरक्षण।",
      descEn: "Preserving ancient Indian sanatan culture, folklore traditions, and the sacred sanctity of Chhath."
    }
  ];

  const missions = [
    {
      titleHi: "छठ महापर्व का धार्मिक एवं सांस्कृतिक आयोजन",
      titleEn: "Grand Religious & Cultural Organization of Chhath",
      descHi: "प्रत्येक वर्ष कार्तिक शुक्ल षष्ठी एवं सप्तमी को राणाजी छठ पूजा पार्क में पूर्ण विधि-विधान, शुद्धता और श्रद्धा के साथ महापर्व का आयोजन करना।"
    },
    {
      titleHi: "भक्तों को एक साथ जोड़ना",
      titleEn: "Uniting Devotees & Families",
      descHi: "क्षेत्र के समस्त निवासियों एवं पूर्वांचल संस्कृति प्रेमियों को एक साझा मंच पर लाकर आत्मीयता एवं सौहार्द को सुदृढ़ करना।"
    },
    {
      titleHi: "धार्मिक परंपराओं को आगे बढ़ाना",
      titleEn: "Propagating Sacred Vedic Traditions",
      descHi: "प्रकृति पूजा, सूर्योपासना, स्वच्छता और पर्यावरण संरक्षण के छठ महापर्व के संदेश को भावी पीढ़ी तक पहुंचाना।"
    },
    {
      titleHi: "समाज में सहयोग और एकता की भावना विकसित करना",
      titleEn: "Fostering Community Cooperation & Brotherhood",
      descHi: "सामूहिक श्रम, निःशुल्क वेदी व्यवस्था, स्वच्छ जल एवं सुरक्षा प्रबंध के माध्यम से सामाजिक सद्भाव को बढ़ावा देना।"
    }
  ];

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'हमारे बारे में' : 'About Samiti'}
        description={lang === 'hi'
          ? 'राणाजी छठ पूजा पार्क समिति (रजि.) का परिचय, 10 वर्षों की यात्रा, पंच-मूल्य एवं संकल्प।'
          : 'About Ranaji Chhath Puja Park Samiti (Regd.), our decade of service, core values, and mission.'}
      />

      {/* Page Hero Header */}
      <div className="bg-devotional-gradient py-16 sm:py-20 border-b border-gold-300/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>{t('about_page.intro_title')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {lang === 'hi' ? 'समिति परिचय एवं संकल्प' : 'About The Samiti & Mission'}
          </h1>

          <p className="text-base sm:text-lg text-saffron-800 font-hindi mt-3 font-semibold">
            {t('common.consecutive_years')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Section 1: Detailed Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold">
              <Sun className="w-4 h-4 text-saffron-600" />
              <span>{lang === 'hi' ? 'क्षेत्र की अग्रणी पूजा समिति' : 'Premier Puja Committee'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown leading-snug">
              {lang === 'hi' 
                ? 'राणाजी छठ पूजा पार्क समिति (रजि.) की स्थापना एवं उद्देश्य'
                : 'Ranaji Chhath Puja Park Samiti (Regd.) Overview'}
            </h2>

            <div className="space-y-4 text-base text-devotional-brown/90 leading-relaxed font-hindi">
              <p className="bg-cream-50 p-4 rounded-xl border-l-4 border-saffron-600 shadow-sm">
                <strong>राणाजी छठ पूजा पार्क समिति (रजि.)</strong> क्षेत्र की एक अग्रणी पूजा समिति है, जो लगातार 10 वर्षों से छठी मैया की सेवा में समर्पित है। समिति का उद्देश्य छठ महापर्व का श्रद्धा एवं भक्ति के साथ आयोजन करना तथा समाज में धार्मिक और सांस्कृतिक एकता को बढ़ावा देना है।
              </p>
              <p>
                नजफगढ़ के मेन नजफगढ़ रोड (मेट्रो पिलर नं. 46 के सामने) स्थित <strong>राणाजी छठ पूजा पार्क (MCD पार्क)</strong> में समिति प्रत्येक वर्ष भव्य छठ घाट, निर्मल एवं पवित्र जल कुंड, प्रकाश व्यवस्था, सुरक्षा, स्वच्छता एवं महाप्रसाद की निशुल्क व्यवस्था करती है।
              </p>
              <p>
                समिति के 66 समर्पित कार्यकारिणी सदस्य, स्वयंसेवक एवं क्षेत्रवासी मिलकर इस महापर्व को एक पारिवारिक उत्सव की तरह आयोजित करते हैं, जहाँ प्रत्येक छठ व्रती एवं श्रद्धालु को आत्मीय सम्मान और सेवा प्राप्त होती है।
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-gold-400 shadow-elevation">
              <img
                src="/images/img_20_offset_6306509.jpg"
                alt="Chhath Ghat at Ranaji Park"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-4 bg-cream-50 text-center border-t border-gold-300">
                <span className="text-xs font-bold text-saffron-800 font-hindi block">
                  {lang === 'hi' ? 'राणाजी छठ पूजा पार्क (MCD पार्क), नजफगढ़' : 'Ranaji Chhath Puja Park (MCD Park), Najafgarh'}
                </span>
                <span className="text-[11px] text-devotional-muted">
                  {lang === 'hi' ? 'दशक भर से पावन आस्था का केंद्र' : 'A sacred center of faith for a decade'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Our Core Values (पंच-मूल्य) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-800 block mb-1">
              {lang === 'hi' ? 'हमारे आधार स्तंभ' : 'Guiding Principles'}
            </span>
            <h2 className="text-3xl font-bold font-hindi text-devotional-brown">
              {t('about_page.values_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-cream-50 border-2 border-gold-300/80 hover:border-gold-500 shadow-sm hover:shadow-warm transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center font-bold text-lg mb-3 group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <h3 className="font-bold text-base text-devotional-brown font-hindi leading-snug">
                  {lang === 'hi' ? v.titleHi : v.titleEn}
                </h3>
                <p className="text-xs text-devotional-muted font-hindi mt-2 leading-relaxed">
                  {lang === 'hi' ? v.descHi : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Our Mission (हमारा संकल्प) */}
        <div className="bg-devotional-gradient rounded-3xl p-8 sm:p-12 border-2 border-gold-400/80 shadow-elevation">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vermilion-100 text-vermilion-800 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5 text-vermilion-600" />
              <span>{lang === 'hi' ? 'हमारा संकल्प' : 'Our Mission'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown">
              {t('about_page.mission_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-cream-50/95 border border-gold-300 shadow-sm flex items-start gap-4"
              >
                <div className="p-2 rounded-lg bg-saffron-100 text-saffron-700 flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-devotional-brown font-hindi leading-snug">
                    {lang === 'hi' ? m.titleHi : m.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-devotional-muted font-hindi mt-1.5 leading-relaxed">
                    {m.descHi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Park Preservation & Community Care */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-cream-50 border border-gold-300/80 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base font-hindi text-devotional-brown">
              {lang === 'hi' ? 'पार्क संरक्षण एवं स्वच्छता' : 'Park Cleanliness'}
            </h3>
            <p className="text-xs text-devotional-muted font-hindi leading-relaxed">
              छठ पूजा के पूर्व एवं पश्चात पार्क की संपूर्ण सफाई, जल कुंड की पवित्रता एवं हरित पर्यावरण की रक्षा।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cream-50 border border-gold-300/80 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-saffron-100 text-saffron-700 mx-auto flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base font-hindi text-devotional-brown">
              {lang === 'hi' ? '66 समर्पित सदस्य' : '66 Active Members'}
            </h3>
            <p className="text-xs text-devotional-muted font-hindi leading-relaxed">
              समिति के सभी 66 पदाधिकारी बिना किसी स्वार्थ के दिन-रात एक कर पूजा की तैयारी में जुटे रहते हैं।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cream-50 border border-gold-300/80 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-vermilion-100 text-vermilion-700 mx-auto flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base font-hindi text-devotional-brown">
              {lang === 'hi' ? 'निःशुल्क सेवा भाव' : 'Selfless Hospitality'}
            </h3>
            <p className="text-xs text-devotional-muted font-hindi leading-relaxed">
              वेदी आवंटन, स्वच्छ जल, दूध अर्घ्य, दातुन, धूप-दीप एवं प्राथमिक उपचार की निशुल्क व्यवस्था।
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default AboutPage;
