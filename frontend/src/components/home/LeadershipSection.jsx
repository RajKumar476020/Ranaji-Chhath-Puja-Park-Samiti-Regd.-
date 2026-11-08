import React from 'react';
import { Phone, MessageCircle, ShieldCheck, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LeadershipSection = () => {
  const { lang, t } = useLanguage();

  const leaders = [
    {
      roleHi: "अध्यक्ष",
      roleEn: "President",
      nameHi: "श्री रामानन्द सिंह",
      nameEn: "Shri Ramanand Singh",
      phone: "9971472216",
      descHi: "समिति का संपूर्ण नेतृत्व एवं आयोजन मार्गदर्शन",
      descEn: "Overall committee leadership & celebration guidance",
      badgeColor: "from-vermilion-700 to-saffron-600"
    },
    {
      roleHi: "महासचिव",
      roleEn: "General Secretary",
      nameHi: "श्री अशोक सिंह",
      nameEn: "Shri Ashok Singh",
      phone: "7982713291",
      descHi: "समस्त प्रशासनिक कार्य एवं स्वयंसेवक समन्वय",
      descEn: "Administrative operations & volunteer coordination",
      badgeColor: "from-saffron-600 to-gold-600"
    },
    {
      roleHi: "कोषाध्यक्ष",
      roleEn: "Treasurer",
      nameHi: "श्री उमेश शर्मा",
      nameEn: "Shri Umesh Sharma",
      phone: "9312712790",
      descHi: "आर्थिक व्यवस्था, चंदा संग्रह एवं लेखा-जोखा",
      descEn: "Financial management, donations & accounts",
      badgeColor: "from-gold-600 to-emerald-700"
    }
  ];

  return (
    <section className="py-20 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-100 border border-saffron-300 text-saffron-800 text-xs font-bold font-sans uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'समिति नेतृत्व' : 'Key Leadership'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('home.leadership_heading')}
          </h2>

          <p className="text-sm text-devotional-muted font-hindi mt-2">
            {lang === 'hi'
              ? 'छठ महापर्व आयोजन, व्यवस्था, वेदी आवंटन अथवा सहायता हेतु हमारे प्रमुख पदाधिकारियों से सीधे संपर्क करें'
              : 'Directly reach out to our primary office bearers for arrangements, altar allocation, or assistance'}
          </p>
        </div>

        {/* 3 Highlighted Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => {
            const cleanPhone = leader.phone.replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
              lang === 'hi'
                ? 'नमस्ते, मैं राणाजी छठ पूजा पार्क समिति (रजि.) की वेबसाइट से संपर्क कर रहा हूँ।'
                : 'Hello, I am contacting you through the Ranaji Chhath Puja Park Samiti website.'
            )}`;

            return (
              <div
                key={idx}
                className="bg-cream-50 rounded-2xl border-2 border-gold-400 p-6 shadow-elevation hover:border-gold-500 hover:shadow-warm hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative group"
              >
                {/* Role Badge */}
                <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${leader.badgeColor} text-white text-xs font-bold font-hindi shadow-sm mb-4`}>
                  {lang === 'hi' ? leader.roleHi : leader.roleEn}
                </div>

                {/* Profile Avatar Icon */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-saffron-500 to-gold-400 p-1 shadow-warm mb-4 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-cream-100 flex items-center justify-center border border-gold-300/40">
                    <User className="w-8 h-8 text-devotional-brown" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold font-hindi text-devotional-brown leading-snug">
                  {lang === 'hi' ? leader.nameHi : leader.nameEn}
                </h3>

                {/* Phone Text */}
                <div className="mt-2 text-base font-bold text-saffron-800 font-sans tracking-wide">
                  +91 {leader.phone}
                </div>

                {/* Brief description */}
                <p className="text-xs text-devotional-muted mt-1 font-hindi px-2 min-h-[36px] flex items-center justify-center">
                  {lang === 'hi' ? leader.descHi : leader.descEn}
                </p>

                {/* Direct Action Buttons: Call & WhatsApp */}
                <div className="grid grid-cols-2 gap-3 w-full mt-5 pt-4 border-t border-gold-200/80">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="py-2.5 px-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs tracking-wide shadow-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t('common.call_now')}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t('common.whatsapp')}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;

