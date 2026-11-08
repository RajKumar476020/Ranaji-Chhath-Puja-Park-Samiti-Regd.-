import React, { useState, useEffect } from 'react';
import { Volume2, ChevronRight, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { api } from '../../services/api';

const AnnouncementBar = () => {
  const { lang, pick } = useLanguage();
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.getAnnouncements(false);
        if (res.success && res.announcements.length > 0) {
          setAnnouncements(res.announcements);
        }
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (dismissed) return null;

  const current = announcements[currentIndex];
  const defaultTextHi = "जय छठी मैया 🙏 | छठ महापर्व 2026: 15 एवं 16 नवम्बर 2026 को राणाजी छठ पूजा पार्क में आप सभी सपरिवार सादर आमंत्रित हैं!";
  const defaultTextEn = "Jai Chhathi Maiya 🙏 | Chhath Mahaparv 2026: Cordial invitation to all devotees on 15 & 16 November 2026 at Ranaji Chhath Puja Park!";

  const message = current ? pick(current.message_hi, current.message_en) : (lang === 'hi' ? defaultTextHi : defaultTextEn);

  return (
    <div className="bg-gradient-to-r from-vermilion-900 via-saffron-600 to-vermilion-900 text-white text-xs sm:text-sm py-2 px-3 sm:px-6 relative overflow-hidden border-b border-gold-400/40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="flex-shrink-0 bg-gold-400/20 text-gold-200 px-2 py-0.5 rounded-full font-semibold border border-gold-400/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-300 animate-pulse" />
            <span className="hidden xs:inline">{lang === 'hi' ? 'सूचना' : 'Notice'}</span>
          </span>
          <p className="truncate text-cream-50 font-medium tracking-wide">
            {message}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {announcements.length > 1 && (
            <span className="text-[10px] text-cream-200 hidden md:inline">
              {currentIndex + 1}/{announcements.length}
            </span>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="text-cream-200 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

