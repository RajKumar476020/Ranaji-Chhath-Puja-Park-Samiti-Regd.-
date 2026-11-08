import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Share2, Clock, Check, Sparkles, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
import SEO from '../components/common/SEO';
import Countdown from '../components/common/Countdown';

const EventsPage = () => {
  const { lang, t, pick } = useLanguage();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'ongoing' | 'completed' | 'all'
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.getEvents();
        if (res.success && res.events) {
          setEvents(res.events);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      }
    };
    fetchEvents();
  }, []);

  const handleShare = async (event) => {
    const shareData = {
      title: `${pick(event.title_hi, event.title_en)} - राणाजी छठ पूजा पार्क समिति`,
      text: `${pick(event.title_hi, event.title_en)}: ${pick(event.description_hi, event.description_en)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') copyLink(event.id);
      }
    } else {
      copyLink(event.id);
    }
  };

  const copyLink = (id) => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredEvents = events.filter((e) => {
    if (activeTab === 'all') return true;
    return e.status === activeTab;
  });

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'कार्यक्रम एवं तिथियां' : 'Events & Programme'}
        description={lang === 'hi'
          ? 'छठ महापर्व 2026 एवं राणाजी छठ पूजा पार्क समिति के आगामी, वर्तमान व विगत धार्मिक कार्यक्रम।'
          : 'Chhath Mahaparv 2026 schedule, upcoming and past cultural events by Ranaji Chhath Puja Park Samiti.'}
      />

      {/* Header */}
      <div className="bg-devotional-gradient py-16 sm:py-20 border-b border-gold-300/40 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-100 border border-saffron-300 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'समिति कार्यक्रम' : 'Samiti Events'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {lang === 'hi' ? 'कार्यक्रम एवं उत्सव विवरण' : 'Events & Celebrations'}
          </h1>

          <p className="text-sm sm:text-base text-devotional-muted font-hindi mt-3 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'छठ महापर्व 2026 एवं समिति द्वारा आयोजित समस्त धार्मिक व सांस्कृतिक कार्यक्रमों की अधिकृत जानकारी'
              : 'Official dates, programmes, and schedule for Chhath Mahaparv 2026'}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-saffron-600 text-white shadow-warm'
                  : 'bg-cream-100 text-devotional-brown hover:bg-gold-100 border border-gold-300/60'
              }`}
            >
              {lang === 'hi' ? 'आगामी कार्यक्रम (Upcoming)' : 'Upcoming'}
            </button>

            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'ongoing'
                  ? 'bg-vermilion-700 text-white shadow-warm'
                  : 'bg-cream-100 text-devotional-brown hover:bg-gold-100 border border-gold-300/60'
              }`}
            >
              {lang === 'hi' ? 'जारी कार्यक्रम (Ongoing)' : 'Ongoing'}
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'completed'
                  ? 'bg-emerald-700 text-white shadow-warm'
                  : 'bg-cream-100 text-devotional-brown hover:bg-gold-100 border border-gold-300/60'
              }`}
            >
              {lang === 'hi' ? 'विगत आयोजन (Past)' : 'Past Events'}
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-devotional-brown text-white shadow-warm'
                  : 'bg-cream-100 text-devotional-brown hover:bg-gold-100 border border-gold-300/60'
              }`}
            >
              {lang === 'hi' ? 'सभी (All)' : 'All'}
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-cream-50 rounded-2xl border border-gold-300 p-8">
            <Calendar className="w-12 h-12 text-gold-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-hindi text-devotional-brown">
              {lang === 'hi' ? 'इस श्रेणी में वर्तमान में कोई कार्यक्रम नहीं है।' : 'No events found in this category.'}
            </h3>
            <p className="text-xs text-devotional-muted mt-1">
              {lang === 'hi' ? 'कृपया अन्य श्रेणी का चयन करें।' : 'Please check another tab or view all events.'}
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-cream-50 rounded-3xl border-2 border-gold-400/80 shadow-elevation overflow-hidden"
            >
              {/* Event Header Banner */}
              <div className="bg-gradient-to-r from-vermilion-800 via-saffron-700 to-vermilion-800 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      event.status === 'upcoming' 
                        ? 'bg-saffron-500 text-white' 
                        : (event.status === 'ongoing' ? 'bg-vermilion-600 text-white animate-pulse' : 'bg-emerald-700 text-white')
                    }`}>
                      {event.status === 'upcoming' ? 'आगामी' : (event.status === 'ongoing' ? 'जारी है' : 'सम्पन्न')}
                    </span>
                    <span className="text-xs text-gold-200 font-mono">
                      {event.start_date} {event.end_date !== event.start_date ? `– ${event.end_date}` : ''}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-white leading-tight">
                    {pick(event.title_hi, event.title_en)}
                  </h2>
                </div>

                {event.status === 'upcoming' && (
                  <Countdown
                    targetDate={`${event.start_date}T16:00:00+05:30`}
                    endDate={`${event.end_date}T10:00:00+05:30`}
                  />
                )}
              </div>

              {/* Event Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Description */}
                <p className="text-sm sm:text-base text-devotional-brown/90 leading-relaxed font-hindi">
                  {pick(event.description_hi, event.description_en)}
                </p>

                {/* Schedule Sub-events (if present) */}
                {event.schedule && event.schedule.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-saffron-800 font-sans">
                      {lang === 'hi' ? 'दैनिक कार्यक्रम रूपरेखा' : 'Daily Programme Schedule'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.schedule.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-cream-100 border border-gold-300/70"
                        >
                          <span className="text-xs font-bold text-saffron-700 block mb-1">
                            {item.date}
                          </span>
                          <h4 className="font-bold text-sm sm:text-base font-hindi text-devotional-brown">
                            {pick(item.title_hi, item.title_en)}
                          </h4>
                          <p className="text-xs text-devotional-muted font-hindi mt-1">
                            {pick(item.desc_hi, item.desc_en)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="p-4 rounded-xl bg-gold-50 border border-gold-300/80 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-vermilion-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-saffron-800 uppercase tracking-wider block">
                      {lang === 'hi' ? 'स्थान' : 'Venue'}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-devotional-brown font-hindi leading-snug mt-0.5">
                      {pick(event.location_hi, event.location_en)}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold-200">
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'स्थल एवं संपर्क' : 'Venue & Contact'}</span>
                  </Link>

                  <button
                    onClick={() => handleShare(event)}
                    className="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-gold-50 border border-gold-300 text-devotional-brown font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                  >
                    {copiedId === event.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">{lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-saffron-600" />
                        <span>{lang === 'hi' ? 'शेयर करें' : 'Share'}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default EventsPage;
