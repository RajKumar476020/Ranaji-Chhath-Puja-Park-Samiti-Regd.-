import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Share2, Clock, Check, Sparkles, Sun } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Countdown from '../common/Countdown';

const FeaturedEventSection = () => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'छठ महापर्व 2026 - राणाजी छठ पूजा पार्क समिति (रजि.)',
      text: 'छठ महापर्व 2026: 15 एवं 16 नवम्बर 2026 को राणाजी छठ पूजा पार्क, नजफगढ़, नई दिल्ली में आप सभी सपरिवार सादर आमंत्रित हैं!',
      url: window.location.origin + '/events'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + '/events');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-20 bg-devotional-gradient relative overflow-hidden border-y border-gold-300/40">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-vermilion-50 border border-vermilion-200 text-vermilion-700 text-xs font-bold font-sans uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-vermilion-600" />
            <span>{lang === 'hi' ? 'विशेष पावन आमंत्रण' : 'Official Invitation'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('home.event_heading')}
          </h2>

          <p className="text-sm sm:text-base text-devotional-muted font-hindi mt-2">
            {t('home.event_subtitle')}
          </p>
        </div>

        {/* Grand Featured Event Card */}
        <div className="max-w-4xl mx-auto bg-cream-50 rounded-3xl border-2 border-gold-400/70 shadow-elevation overflow-hidden">
          
          {/* Top Banner Ribbon */}
          <div className="bg-gradient-to-r from-vermilion-800 via-saffron-600 to-vermilion-800 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-semibold text-gold-200 uppercase tracking-widest block">
                {lang === 'hi' ? 'सस्नेह निमंत्रण' : 'Cordial Invitation'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-hindi">
                {lang === 'hi' ? 'छठ महापर्व का पावन आयोजन' : 'Grand Chhath Mahaparv Celebration'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Countdown targetDate="2026-11-15T16:00:00+05:30" endDate="2026-11-16T10:00:00+05:30" />
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Programme Days Grid (exact as per invitation card: no invented times) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Day 1: Evening Arghya */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-cream-100 to-gold-50/50 border border-gold-300 shadow-sm hover:border-gold-500 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-saffron-600 text-white text-xs font-bold font-hindi">
                    {lang === 'hi' ? 'प्रथम अर्घ्य' : 'First Arghya'}
                  </span>
                  <span className="text-xs font-bold text-saffron-900 font-sans">
                    {lang === 'hi' ? 'रविवार, 15 नवम्बर 2026' : 'Sunday, 15 November 2026'}
                  </span>
                </div>

                <div className="flex items-start gap-3 mt-3">
                  <div className="p-2.5 rounded-xl bg-saffron-100 text-saffron-700 flex-shrink-0">
                    <Sun className="w-6 h-6 text-saffron-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-devotional-brown font-hindi leading-snug">
                      {lang === 'hi' ? 'सायंकाल अर्घ्य' : 'Evening Arghya (Sandhya Arghya)'}
                    </h4>
                    <p className="text-xs sm:text-sm text-devotional-muted mt-1 font-hindi leading-relaxed">
                      {lang === 'hi' 
                        ? 'अस्ताचलगामी भगवान भास्कर को प्रथम अर्घ्य अर्पण एवं भजन-कीर्तन।'
                        : 'First sacred Arghya offering to the setting Sun God with devotional prayers.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Day 2: Morning Arghya */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-cream-100 to-gold-50/50 border border-gold-300 shadow-sm hover:border-gold-500 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-vermilion-700 text-white text-xs font-bold font-hindi">
                    {lang === 'hi' ? 'प्रातः अर्घ्य' : 'Morning Arghya'}
                  </span>
                  <span className="text-xs font-bold text-vermilion-900 font-sans">
                    {lang === 'hi' ? 'सोमवार, 16 नवम्बर 2026' : 'Monday, 16 November 2026'}
                  </span>
                </div>

                <div className="flex items-start gap-3 mt-3">
                  <div className="p-2.5 rounded-xl bg-vermilion-100 text-vermilion-700 flex-shrink-0">
                    <Sun className="w-6 h-6 text-vermilion-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-devotional-brown font-hindi leading-snug">
                      {lang === 'hi' ? 'सुबह का अर्घ्य' : 'Morning Arghya (Usha Arghya)'}
                    </h4>
                    <p className="text-xs sm:text-sm text-devotional-muted mt-1 font-hindi leading-relaxed">
                      {lang === 'hi'
                        ? 'उदीयमान भगवान सूर्य देव को प्रातः अर्घ्य समर्पण, पारण एवं महाप्रसाद वितरण।'
                        : 'Morning Arghya offering to the rising Sun God, completion of fast (Paran) & Mahaprasad.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Venue & Location Block */}
            <div className="p-5 rounded-2xl bg-cream-100/90 border border-gold-300/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-gold-100 text-gold-700 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-vermilion-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-saffron-800 uppercase tracking-wider block">
                    {lang === 'hi' ? 'आयोजन स्थल (Venue)' : 'Event Venue'}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-devotional-brown font-hindi leading-snug mt-0.5">
                    {lang === 'hi' 
                      ? 'राणाजी छठ पूजा पार्क (MCD पार्क), राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043'
                      : 'Ranaji Chhath Puja Park (MCD Park), Ranaji Enclave, Najafgarh, New Delhi – 110043'}
                  </p>
                  <p className="text-xs text-devotional-muted mt-0.5 font-hindi font-medium">
                    {lang === 'hi' ? 'मेट्रो पिलर नं. 46 के सामने, मेन नजफगढ़ रोड' : 'Opposite Metro Pillar No. 46, Main Najafgarh Road'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Events & Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                to="/events"
                className="px-6 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm tracking-wide shadow-warm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'सम्पूर्ण कार्यक्रम देखें' : 'View Full Schedule'}</span>
              </Link>

              <button
                onClick={handleShare}
                className="px-5 py-3 rounded-xl bg-cream-50 hover:bg-gold-50 border-2 border-gold-400 text-devotional-brown font-bold text-sm tracking-wide shadow-sm flex items-center gap-2 hover:border-gold-500 active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-saffron-600" />
                    <span>{lang === 'hi' ? 'कार्यक्रम शेयर करें' : 'Share Event'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedEventSection;

