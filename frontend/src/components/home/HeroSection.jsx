import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Heart, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Countdown from '../common/Countdown';

const HeroSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-cream-50 pt-8 pb-16">
      {/* Background with sacred water, golden sunlight & devotional layered textures */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/img_20_offset_6306509.jpg"
          alt="Chhath Ghat Sunrise"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />
        {/* Divine Golden & Saffron Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/75 to-devotional-dark/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100/85 via-transparent to-cream-100/60"></div>
        {/* Subtle decorative mandala texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF7A00_1px,transparent_1px)] [background-size:28px_28px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8">
        <div className="max-w-3xl flex flex-col items-start">
          
          {/* Top Devotional Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/90 backdrop-blur-md border border-gold-400 shadow-warm mb-5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-vermilion-600 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold text-devotional-brown font-hindi tracking-wide flex items-center gap-1.5">
              <span>{t('common.jai_chhathi_maiya')}</span>
              <span className="text-gold-600">•</span>
              <span className="text-saffron-700">{t('common.consecutive_years')}</span>
            </span>
          </motion.div>

          {/* Main Samiti Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-hindi text-devotional-brown tracking-tight leading-[1.15] mb-3"
          >
            {lang === 'hi' ? (
              <>
                राणाजी छठ पूजा पार्क समिति <span className="text-vermilion-700">(रजि.)</span>
              </>
            ) : (
              <>
                Ranaji Chhath Puja Park Samiti <span className="text-vermilion-700">(Regd.)</span>
              </>
            )}
          </motion.h1>

          {/* Supporting Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-2xl font-semibold font-hindi text-saffron-800 mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-gold-500 fill-gold-400 flex-shrink-0" />
            <span>{t('common.consecutive_years')}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-devotional-brown/90 leading-relaxed font-hindi mb-6 max-w-2xl"
          >
            {t('common.hero_desc')}
          </motion.p>

          {/* Event Badge & Countdown Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full bg-cream-50/95 backdrop-blur-md border-2 border-gold-400/80 rounded-2xl p-4 sm:p-5 shadow-elevation mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-saffron-600 to-gold-400 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-800 block">
                  {lang === 'hi' ? 'छठ महापर्व 2026' : 'Chhath Mahaparv 2026'}
                </span>
                <span className="text-base sm:text-lg font-bold text-devotional-brown font-hindi leading-snug block">
                  {t('common.event_badge_date')}
                </span>
                <span className="text-[11px] text-devotional-muted flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-vermilion-600" />
                  {lang === 'hi' ? 'राणाजी छठ पूजा पार्क, नजफगढ़' : 'Ranaji Chhath Puja Park, Najafgarh'}
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <Countdown targetDate="2026-11-15T16:00:00+05:30" endDate="2026-11-16T10:00:00+05:30" />
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 w-full"
          >
            {/* View Programme */}
            <Link
              to="/events"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-vermilion-700 via-saffron-600 to-vermilion-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-warm hover:shadow-saffron hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>{t('common.view_programme')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Learn About Us */}
            <Link
              to="/about"
              className="px-5 py-3.5 rounded-xl bg-cream-50 hover:bg-gold-50 text-devotional-brown border-2 border-gold-400 font-bold text-sm sm:text-base tracking-wide shadow-sm hover:border-gold-500 hover:scale-105 active:scale-95 transition-all"
            >
              {t('common.learn_about_us')}
            </Link>

            {/* Donate */}
            <Link
              to="/donations"
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-devotional-dark font-bold text-sm sm:text-base tracking-wide shadow-warm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-vermilion-700 text-vermilion-700" />
              <span>{t('common.donate_btn')}</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Decorative Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-cream-100 clip-path-wave pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;

