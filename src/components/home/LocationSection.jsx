import React, { useState } from 'react';
import { MapPin, Copy, Check, Train, Compass, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LocationSection = () => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const fullAddress = lang === 'hi'
    ? "मेट्रो पिलर नं. 46 के सामने, मेन नजफगढ़ रोड, राणाजी छठ पूजा पार्क (MCD पार्क), राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043"
    : "Opposite Metro Pillar No. 46, Main Najafgarh Road, Ranaji Chhath Puja Park (MCD Park), Ranaji Enclave, Najafgarh, New Delhi – 110043";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-100 border border-saffron-300 text-saffron-800 text-xs font-bold font-sans uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'स्थल निर्देश' : 'Location & Address'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('home.location_heading')}
          </h2>

          <p className="text-sm text-devotional-muted font-hindi mt-2">
            {t('home.location_sub')}
          </p>
        </div>

        {/* Centered Elegant Address & Landmark Card */}
        <div className="max-w-3xl mx-auto bg-cream-100/90 rounded-2xl border-2 border-gold-300/80 p-6 sm:p-10 shadow-elevation">
          <div className="space-y-6">
            
            {/* Landmark Highlight */}
            <div className="p-4 sm:p-5 rounded-xl bg-gold-100/70 border border-gold-300 flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-vermilion-700 text-white flex-shrink-0 mt-0.5">
                <Train className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-900 block font-sans">
                  {lang === 'hi' ? 'मुख्य पहचान (Landmark)' : 'Key Landmark'}
                </span>
                <span className="text-lg sm:text-xl font-bold text-devotional-brown font-hindi leading-snug">
                  {lang === 'hi' ? 'मेट्रो पिलर नं. 46 के ठीक सामने' : 'Directly Opposite Metro Pillar No. 46'}
                </span>
                <p className="text-xs sm:text-sm text-devotional-muted mt-0.5 font-hindi">
                  {lang === 'hi' ? 'मेन नजफगढ़ रोड, नजफगढ़, नई दिल्ली' : 'Main Najafgarh Road, Najafgarh, New Delhi'}
                </p>
              </div>
            </div>

            {/* Full Address */}
            <div>
              <span className="text-xs font-bold text-devotional-muted uppercase tracking-wider block mb-1.5 font-sans">
                {lang === 'hi' ? 'पूर्ण पता' : 'Full Official Address'}
              </span>
              <div className="flex items-start gap-3.5 p-4 bg-cream-50 rounded-xl border border-gold-300/60">
                <MapPin className="w-5 h-5 text-vermilion-700 flex-shrink-0 mt-1" />
                <p className="text-sm sm:text-base font-bold text-devotional-brown font-hindi leading-relaxed">
                  {fullAddress}
                </p>
              </div>
            </div>

            {/* Action Buttons: Copy Address & Direct Call */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold-200">
              <button
                onClick={handleCopy}
                className="py-3 px-5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{t('common.address_copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white" />
                    <span>{t('common.copy_address')}</span>
                  </>
                )}
              </button>

              <a
                href="tel:9971472216"
                className="py-3 px-5 rounded-xl bg-cream-50 hover:bg-gold-50 border-2 border-gold-400 text-devotional-brown font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Phone className="w-4 h-4 text-vermilion-700" />
                <span>{lang === 'hi' ? 'मार्ग सहायता कॉल: 9971472216' : 'Helpline: 9971472216'}</span>
              </a>
            </div>

            {/* Helpline contact numbers */}
            <div className="pt-3 border-t border-gold-200 flex flex-wrap items-center justify-between gap-3 text-xs text-devotional-muted">
              <span className="font-hindi font-semibold text-devotional-brown">
                {lang === 'hi' ? 'समिति पदाधिकारी संपर्क सूत्र:' : 'Samiti Key Contacts:'}
              </span>
              <div className="flex items-center gap-3 font-mono font-bold text-saffron-800">
                <a href="tel:9971472216" className="hover:underline">9971472216</a>
                <span>•</span>
                <a href="tel:7982713291" className="hover:underline">7982713291</a>
                <span>•</span>
                <a href="tel:9312712790" className="hover:underline">9312712790</a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationSection;
