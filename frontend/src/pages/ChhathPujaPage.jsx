import React from 'react';
import { Sun, Sparkles, Heart, Waves, Calendar, Flame, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/common/SEO';
import PujaSamagriChecklist from '../components/common/PujaSamagriChecklist';
import DevotionalGeetSection from '../components/common/DevotionalGeetSection';

const ChhathPujaPage = () => {
  const { lang, t } = useLanguage();

  const fourDays = [
    {
      day: "प्रथम दिवस (Day 1)",
      nameHi: "नहाय-खाय (Nahay-Khay)",
      descHi: "छठ महापर्व का शुभारंभ आत्म-शुद्धि एवं पवित्रता के साथ होता है। व्रती पवित्र नदी या जल में स्नान कर सात्विक भोजन ग्रहण करते हैं। इसमें अरवा चावल, चने की दाल और शुद्ध घी में बनी लौकी (कद्दू) की सब्जी का भोग प्रसाद बनाया जाता है।",
      badge: "आत्म-शुद्धि एवं पवित्रता"
    },
    {
      day: "द्वितीय दिवस (Day 2)",
      nameHi: "खरना / लोहंडा (Kharna)",
      descHi: "व्रती पूरे दिन निर्जला उपवास रखते हैं। सायंकाल में गुड़, शुद्ध गाय के दूध और नए चावल की खीर तथा घी लगी रोटी बनाई जाती है। सूर्य देव व छठी मैया को भोग लगाकर व्रती यह प्रसाद ग्रहण करते हैं। इसके बाद 36 घंटे का कठिन निर्जला व्रत प्रारंभ होता है।",
      badge: "कठिन तपस्या का आरंभ"
    },
    {
      day: "तृतीय दिवस (Day 3)",
      nameHi: "संध्या अर्घ्य / सायंकाल अर्घ्य (Sandhya Arghya)",
      descHi: "बांस के सूप और दौरी में ठेकुआ, भुसवा, ईख, फल, नारियल आदि सजाकर पूरा परिवार गाजे-बाजे और छठ गीतों के साथ घाट पर पहुंचता है। व्रती कमर तक पवित्र जल में खड़े होकर अस्ताचलगामी (डूबते हुए) भगवान सूर्य देव को प्रथम अर्घ्य समर्पित करते हैं।",
      badge: "15 नवम्बर 2026 (राणाजी पार्क)"
    },
    {
      day: "चतुर्थ दिवस (Day 4)",
      nameHi: "उषा अर्घ्य / प्रातःकाल अर्घ्य एवं पारण (Usha Arghya)",
      descHi: "ब्रह्म मुहूर्त में व्रती और परिवार पुनः घाट पर उपस्थित होते हैं। उदीयमान (उगते हुए) भगवान भुवन भास्कर को प्रातः अर्घ्य दिया जाता है। इसके पश्चात छठी मैया से परिवार, समाज व राष्ट्र के कल्याण की प्रार्थना कर 36 घंटे के व्रत का पारण किया जाता है।",
      badge: "16 नवम्बर 2026 (राणाजी पार्क)"
    }
  ];

  const arrangements = [
    "राणाजी छठ पूजा पार्क में विशाल एवं स्वच्छ पक्का जल कुंड व घाट निर्माण।",
    "हजारों श्रद्धालुओं के लिए सुरक्षित एवं स्वच्छ पूजा वेदी की व्यवस्था।",
    "पार्क परिसर में दुधिया प्रकाश, फ्लड लाइट्स, जनरेटर एवं ध्वनि विस्तारक यंत्र।",
    "समिति के 66 सदस्यों एवं स्थानीय स्वयंसेवकों द्वारा 24 घंटे सुरक्षा निगरानी।",
    "व्रतियों के लिए स्वच्छ पेयजल, दूध अर्घ्य, दातुन एवं प्राथमिक चिकित्सा व्यवस्था।",
    "खोया-पाया केंद्र एवं महिलाओं व बुजुर्गों के लिए विशेष विश्राम स्थल।"
  ];

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'छठ पूजा महापर्व' : 'Chhath Puja Mahaparv'}
        description={lang === 'hi'
          ? 'छठ महापर्व का आध्यात्मिक महत्व, छठी मैया की पूजा, सूर्य देव को अर्घ्य, चार पावन दिवस एवं राणाजी छठ पूजा पार्क समिति की व्यवस्थाएं।'
          : 'Spiritual significance of Chhath Puja, rituals, the four sacred days, and arrangements by Ranaji Chhath Puja Park Samiti.'}
      />

      {/* Hero Banner */}
      <div className="relative py-20 bg-devotional-gradient border-b border-gold-300/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-100 border border-saffron-300 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sun className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'महापर्व महिमा' : 'Festival Significance'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {lang === 'hi' ? 'छठ महापर्व: आस्था, प्रकृति एवं सूर्योपासना' : 'Chhath Mahaparv: Sun Worship & Nature'}
          </h1>

          <p className="text-sm sm:text-base text-devotional-muted font-hindi mt-3 max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'सृष्टि के प्रत्यक्ष देवता भगवान सूर्य एवं संतान व परिवार की रक्षक माता छठी की आराधना का पावन लोकपर्व'
              : 'The sacred festival of worshipping visible deity Lord Surya and divine Mother Chhathi'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Section 1: Significance of Chhath Puja */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-saffron-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>{lang === 'hi' ? 'आध्यात्मिक एवं वैज्ञानिक महत्व' : 'Spiritual & Scientific Context'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown leading-snug">
              {lang === 'hi' ? 'छठ महापर्व का आध्यात्मिक एवं सामाजिक महत्व' : 'Significance of Chhath Mahaparv'}
            </h2>

            <div className="space-y-4 text-devotional-brown/90 text-sm sm:text-base leading-relaxed font-hindi">
              <p>
                छठ महापर्व सनातन धर्म का अत्यंत विशिष्ट और पावन पर्व है। यह एकमात्र ऐसा पर्व है जिसमें अस्ताचलगामी (डूबते हुए) सूर्य और उदीयमान (उगते हुए) सूर्य दोनों को समान श्रद्धा के साथ अर्घ्य दिया जाता है। यह जीवन चक्र के हर पहलू के प्रति कृतज्ञता व्यक्त करने का संदेश देता है।
              </p>
              <p>
                छठ पूजा पूरी तरह प्रकृति, स्वच्छता और सात्विकता पर आधारित है। इसमें किसी मूर्ति की आवश्यकता नहीं होती, अपितु प्रत्यक्ष भगवान सूर्य और प्रकृति माता की पूजा मिट्टी के चूल्हे, बांस के सूप, मौसमी फलों, ठेकुआ और पवित्र जल के माध्यम से की जाती है।
              </p>
              <p>
                यह पर्व सामाजिक समानता का अनुपम उदाहरण है, जहाँ धनी-निर्धन का कोई भेद नहीं रहता। सभी एक ही घाट पर, एक ही पवित्र जल में खड़े होकर छठी मैया से सुख-समृद्धि की कामना करते हैं।
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border-2 border-gold-400 shadow-elevation">
              <img
                src="/images/img_9_offset_1533842.jpg"
                alt="Lord Surya on chariot"
                className="w-full h-80 sm:h-96 object-cover object-top"
              />
              <div className="p-4 bg-cream-50 text-center border-t border-gold-300">
                <span className="text-sm font-bold text-saffron-800 font-hindi block">
                  भगवान सूर्य देव एवं छठी मैया की असीम अनुकंपा
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Chhathi Maiya & Surya Dev Worship */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Chhathi Maiya */}
          <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 border-2 border-gold-400 shadow-elevation space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-vermilion-100 text-vermilion-700 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-hindi text-devotional-brown">
              {lang === 'hi' ? 'छठी मैया की पूजा एवं कृपा' : 'Divine Grace of Chhathi Maiya'}
            </h3>
            <p className="text-sm text-devotional-brown/90 leading-relaxed font-hindi">
              छठी मैया को ब्रह्मा जी की मानस पुत्री और देवसेना के रूप में जाना जाता है। प्रकृति के छठे अंश से उत्पन्न होने के कारण इन्हें षष्ठी (छठी) देवी कहा जाता है। छठी मैया संतान की रक्षा, दीर्घायु, स्वास्थ्य, सुख और कुल की वृद्धि करने वाली देवी हैं। व्रती महिलाएं संतान की कुशलता और परिवार के कल्याण हेतु यह कठोर व्रत रखती हैं।
            </p>
          </div>

          {/* Card 2: Surya Dev Arghya */}
          <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 border-2 border-gold-400 shadow-elevation space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-hindi text-devotional-brown">
              {lang === 'hi' ? 'सूर्य देव को अर्घ्य का पावन रहस्य' : 'Sacred Arghya to Lord Surya'}
            </h3>
            <p className="text-sm text-devotional-brown/90 leading-relaxed font-hindi">
              सूर्य देव संसार के प्रत्यक्ष देवता और ऊर्जा के मूल स्रोत हैं। जल में खड़े होकर तांबे अथवा पीतल के पात्र या बांस के सूप से दूध और गंगाजल मिश्रित अर्घ्य देने से सूर्य की जीवनदायिनी किरणें शरीर, मन और आत्मा को नई ऊर्जा, आरोग्य एवं तेजस्विता प्रदान करती हैं।
            </p>
          </div>
        </div>

        {/* Section 3: The 4 Sacred Days of Chhath */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-800 block mb-1">
              {lang === 'hi' ? 'चार दिवसीय अनुष्ठान' : '4-Day Sacred Cycle'}
            </span>
            <h2 className="text-3xl font-bold font-hindi text-devotional-brown">
              {t('chhath_page.four_days_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fourDays.map((d, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-cream-50 border-2 border-gold-300/80 hover:border-gold-500 shadow-sm hover:shadow-warm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase text-devotional-muted font-sans">
                      {d.day}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-saffron-100 text-saffron-800 font-hindi border border-saffron-300">
                      {d.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-hindi text-devotional-brown mb-2">
                    {d.nameHi}
                  </h3>
                  <p className="text-xs sm:text-sm text-devotional-brown/90 leading-relaxed font-hindi">
                    {d.descHi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Samiti's Arrangements at Ranaji Park */}
        <div className="p-8 sm:p-12 rounded-3xl bg-devotional-gradient border-2 border-gold-400 shadow-elevation">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'hi' ? 'समिति की व्यवस्थाएं' : 'Samiti Arrangements'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown">
              {t('chhath_page.samiti_arrangements_title')}
            </h2>
            <p className="text-xs sm:text-sm text-devotional-muted font-hindi mt-1">
              राणाजी छठ पूजा पार्क समिति (रजि.) द्वारा श्रद्धालुओं के लिए पार्क में की जाने वाली प्रमुख सुविधाएं:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arrangements.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-50/90 border border-gold-300/60"
              >
                <div className="p-1.5 rounded-lg bg-saffron-100 text-saffron-700 flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-saffron-600" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-devotional-brown font-hindi leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Interactive Puja Samagri Checklist */}
        <PujaSamagriChecklist />

        {/* Section 6: Traditional Chhath Folk Songs / Hymns */}
        <DevotionalGeetSection />

      </div>
    </>
  );
};

export default ChhathPujaPage;
