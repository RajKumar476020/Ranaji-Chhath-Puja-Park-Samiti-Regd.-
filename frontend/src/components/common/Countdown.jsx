import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, Radio } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Countdown = ({ targetDate = '2026-11-15T16:00:00+05:30', endDate = '2026-11-16T10:00:00+05:30' }) => {
  const { lang, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState('upcoming'); // upcoming | ongoing | completed

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const start = new Date(targetDate).getTime();
      const end = new Date(endDate).getTime();

      if (now < start) {
        setStatus('upcoming');
        const diff = start - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else if (now >= start && now <= end) {
        setStatus('ongoing');
      } else {
        setStatus('completed');
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate, endDate]);

  if (status === 'ongoing') {
    return (
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-vermilion-700/90 text-white border border-gold-300 shadow-warm animate-pulse">
        <Radio className="w-4 h-4 text-gold-300 animate-spin" />
        <span className="font-bold text-sm">
          {lang === 'hi' ? 'छठ महापर्व आयोजन वर्तमान में जारी है!' : 'Chhath Mahaparv is Currently Ongoing!'}
        </span>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800 text-white border border-emerald-500 shadow-sm">
        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
        <span className="font-semibold text-sm">
          {lang === 'hi' ? 'छठ महापर्व 2026 सफलतापूर्वक सम्पन्न' : 'Chhath Mahaparv 2026 Successfully Completed'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {/* Days */}
        <div className="bg-cream-50/90 backdrop-blur-md border border-gold-400/40 rounded-xl px-2.5 sm:px-4 py-2 shadow-sm min-w-[60px] sm:min-w-[72px]">
          <span className="block text-xl sm:text-2xl font-black text-vermilion-700 font-sans leading-none">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-devotional-muted uppercase tracking-wider mt-1 block">
            {t('common.days')}
          </span>
        </div>

        {/* Hours */}
        <div className="bg-cream-50/90 backdrop-blur-md border border-gold-400/40 rounded-xl px-2.5 sm:px-4 py-2 shadow-sm min-w-[60px] sm:min-w-[72px]">
          <span className="block text-xl sm:text-2xl font-black text-vermilion-700 font-sans leading-none">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-devotional-muted uppercase tracking-wider mt-1 block">
            {t('common.hours')}
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-cream-50/90 backdrop-blur-md border border-gold-400/40 rounded-xl px-2.5 sm:px-4 py-2 shadow-sm min-w-[60px] sm:min-w-[72px]">
          <span className="block text-xl sm:text-2xl font-black text-vermilion-700 font-sans leading-none">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-devotional-muted uppercase tracking-wider mt-1 block">
            {t('common.minutes')}
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-cream-50/90 backdrop-blur-md border border-gold-400/40 rounded-xl px-2.5 sm:px-4 py-2 shadow-sm min-w-[60px] sm:min-w-[72px]">
          <span className="block text-xl sm:text-2xl font-black text-saffron-600 font-sans leading-none">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-devotional-muted uppercase tracking-wider mt-1 block">
            {t('common.seconds')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

