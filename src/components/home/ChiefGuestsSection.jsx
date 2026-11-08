import React from 'react';
import { UserCheck, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ChiefGuestsSection = () => {
  const { lang, t } = useLanguage();

  const guests = [
    {
      nameHi: "श्रीमती कमलजीत सहरावत जी",
      nameEn: "Smt. Kamaljeet Sehrawat Ji",
      postHi: "सांसद, पश्चिमी दिल्ली",
      postEn: "Member of Parliament (MP), West Delhi",
      badgeHi: "माननीय सांसद",
      badgeEn: "Honorable MP",
      image: "/images/guests/kamaljeet_sehrawat.png",
      initial: "क"
    },
    {
      nameHi: "श्री संदीप सहरावत जी",
      nameEn: "Shri Sandeep Sehrawat Ji",
      postHi: "विधायक, मटियाला विधानसभा",
      postEn: "MLA, Matiala Legislative Assembly",
      badgeHi: "माननीय विधायक",
      badgeEn: "Honorable MLA",
      image: "/images/guests/sandeep_sehrawat.png",
      initial: "स"
    },
    {
      nameHi: "श्रीमती सविता पवन शर्मा",
      nameEn: "Smt. Savita Pawan Sharma",
      postHi: "निगम पार्षद, वार्ड 111",
      postEn: "Municipal Councillor, Ward 111",
      badgeHi: "निगम पार्षद",
      badgeEn: "Councillor",
      image: "/images/guests/savita_pawan_sharma.png",
      initial: "स"
    },
    {
      nameHi: "श्री सत्येन्द्र सिंह राणा",
      nameEn: "Shri Satyendra Singh Rana",
      postHi: "महासचिव, भारतीय जनता पार्टी, नजफगढ़",
      postEn: "General Secretary, BJP Najafgarh",
      badgeHi: "महासचिव",
      badgeEn: "General Secretary",
      image: "/images/guests/satyendra_singh_rana.png",
      initial: "स"
    }
  ];

  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold font-sans uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            <span>{lang === 'hi' ? 'गरिमामयी उपस्थिति' : 'Dignified Presence'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('home.chief_guests_heading')}
          </h2>

          <p className="text-sm text-devotional-muted font-hindi mt-2">
            {lang === 'hi'
              ? 'छठ महापर्व के पावन अवसर पर समिति एवं श्रद्धालुओं का उत्साहवर्धन करने पधारने वाले हमारे मुख्य अतिथि'
              : 'Our esteemed chief guests gracing the auspicious occasion of Chhath Mahaparv'}
          </p>
        </div>

        {/* 4 Elegant Guest Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {guests.map((guest, idx) => (
            <div
              key={idx}
              className="bg-cream-100/90 rounded-2xl border-2 border-gold-300/80 p-6 shadow-elevation hover:border-gold-500 hover:shadow-warm hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center relative group"
            >
              {/* Devotional Top Badge */}
              <div className="absolute -top-3.5 bg-gradient-to-r from-saffron-600 to-vermilion-700 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {lang === 'hi' ? guest.badgeHi : guest.badgeEn}
              </div>

              {/* Dignitary Portrait Frame with pure white backdrop */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-gold-400 via-saffron-500 to-vermilion-600 p-1 shadow-warm mt-3 mb-4 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-white overflow-hidden border-2 border-gold-200 flex items-center justify-center relative">
                  <img
                    src={guest.image}
                    alt={lang === 'hi' ? guest.nameHi : guest.nameEn}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.classList.remove('hidden');
                        e.currentTarget.nextElementSibling.classList.add('flex');
                      }
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-gold-50 to-cream-200 flex-col items-center justify-center">
                    <UserCheck className="w-9 h-9 text-saffron-700" />
                    <span className="text-[11px] font-bold text-devotional-brown font-hindi opacity-80 mt-0.5">
                      {guest.initial}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest Name */}
              <h3 className="text-lg sm:text-xl font-bold font-hindi text-devotional-brown leading-snug group-hover:text-saffron-800 transition-colors">
                {lang === 'hi' ? guest.nameHi : guest.nameEn}
              </h3>

              {/* Designation / Portfolio */}
              <div className="mt-2 pt-2 border-t border-gold-200/80 w-full">
                <p className="text-xs sm:text-sm font-semibold text-vermilion-800 font-hindi leading-snug">
                  {lang === 'hi' ? guest.postHi : guest.postEn}
                </p>
              </div>

              {/* Subtle bottom accent line */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-gold-400 to-saffron-500 mt-4 opacity-70 group-hover:w-20 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ChiefGuestsSection;
