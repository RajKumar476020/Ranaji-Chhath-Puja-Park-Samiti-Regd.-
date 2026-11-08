import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, HeartHandshake, Sun, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutSamitiSection = () => {
  const { lang, t } = useLanguage();

  const highlights = [
    {
      icon: Award,
      title: t('home.highlight_1'),
      desc: lang === 'hi' ? 'दशक भर से अनवरत निःस्वार्थ सेवा एवं समर्पण' : 'A full decade of selfless service and community dedication'
    },
    {
      icon: Sun,
      title: t('home.highlight_2'),
      desc: lang === 'hi' ? 'भव्य छठ घाट, स्वच्छ जल एवं वेदी की सम्पूर्ण व्यवस्था' : 'Grand ghat preparation, clean sacred waters, and pure altars'
    },
    {
      icon: HeartHandshake,
      title: t('home.highlight_3'),
      desc: lang === 'hi' ? 'सभी धर्मप्रेमियों एवं परिवारों का आत्मीय मिलन' : 'Fostering cultural brotherhood, harmony, and togetherness'
    },
    {
      icon: Users,
      title: t('home.highlight_4'),
      desc: lang === 'hi' ? 'कार्यकर्ताओं द्वारा 24 घंटे तत्पर सहयोग व सुरक्षा' : 'Round-the-clock volunteer support and devotee assistance'
    }
  ];

  return (
    <section className="py-20 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Devotional Card Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main devotional portrait card */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-2 border-gold-400 group">
                <img
                  src="/images/img_9_offset_1533842.jpg"
                  alt="Surya Dev Chhathi Maiya"
                  className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-devotional-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase font-bold text-gold-300 tracking-wider">
                    {lang === 'hi' ? 'पावन परंपरा' : 'Sacred Heritage'}
                  </span>
                  <p className="text-base font-bold font-hindi text-cream-50 leading-snug">
                    {lang === 'hi' ? 'भगवान सूर्य एवं छठी मैया की असीम अनुकंपा' : 'Divine Grace of Lord Surya & Chhathi Maiya'}
                  </p>
                </div>
              </div>

              {/* Overlapping Secondary Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 w-48 sm:w-56 bg-cream-50 p-3 rounded-xl border border-gold-400 shadow-xl hidden xs:block">
                <div className="rounded-lg overflow-hidden h-24 sm:h-28 relative">
                  <img
                    src="/images/img_26_offset_7808649.jpg"
                    alt="Evening Arghya Diya"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-gold-300">
                    {lang === 'hi' ? 'संध्या अर्घ्य दीपमाला' : 'Evening Arghya Lamps'}
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold text-saffron-800 block">
                    {lang === 'hi' ? 'लगातार 10वां वर्ष' : '10th Milestone Year'}
                  </span>
                </div>
              </div>

              {/* Decorative Corner Mandala */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gold-400/10 rounded-full blur-xl pointer-events-none"></div>
            </div>
          </div>

          {/* Right Column: Information & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100/70 border border-saffron-300 text-saffron-800 text-xs font-bold font-sans uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-saffron-600" />
              <span>{lang === 'hi' ? 'समिति परिचय' : 'About The Committee'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown leading-tight">
              {t('home.about_heading')}
            </h2>

            <p className="text-base sm:text-lg text-devotional-brown/90 leading-relaxed font-hindi">
              {t('home.about_text')}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-cream-50 border border-gold-300/60 shadow-sm hover:border-gold-400 hover:shadow-warm transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-saffron-100 text-saffron-700 flex-shrink-0 group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-devotional-brown font-hindi leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-devotional-muted mt-1 font-hindi leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to Detailed About Page */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-saffron-700 hover:text-saffron-800 hover:underline transition-all"
              >
                <span>{lang === 'hi' ? 'समिति का संपूर्ण इतिहास एवं उद्देश्य पढ़ें' : 'Read Full History & Mission of Samiti'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSamitiSection;

