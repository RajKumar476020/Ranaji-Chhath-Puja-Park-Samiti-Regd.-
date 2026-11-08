import React, { useState, useEffect } from 'react';
import { Search, Users, Phone, ShieldCheck, Sparkles, User, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
import SEO from '../components/common/SEO';

const CommitteePage = () => {
  const { lang, t, pick } = useLanguage();
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.getCommittee();
        if (res.success && res.members) {
          setMembers(res.members);
        }
      } catch (err) {
        console.error('Failed to load committee members:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((m) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameHi = (m.name_hi || '').toLowerCase();
    const nameEn = (m.name_en || '').toLowerCase();
    const desHi = (m.designation_hi || '').toLowerCase();
    const desEn = (m.designation_en || '').toLowerCase();
    const num = String(m.order_index);
    return nameHi.includes(query) || nameEn.includes(query) || desHi.includes(query) || desEn.includes(query) || num === query;
  });

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'कार्यकारिणी सदस्य सूची' : 'Executive Committee Members'}
        description={lang === 'hi'
          ? 'राणाजी छठ पूजा पार्क समिति (रजि.) के सभी 66 कार्यकारिणी सदस्यों एवं पदाधिकारियों की अधिकृत सूची।'
          : 'Official list of all 66 executive committee members of Ranaji Chhath Puja Park Samiti (Regd.).'}
      />

      {/* Header */}
      <div className="bg-devotional-gradient py-16 sm:py-20 border-b border-gold-300/40 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'समिति परिवार' : 'Committee Family'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('committee_page.title')}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-saffron-800 font-hindi mt-2">
            {t('committee_page.subtitle')}
          </p>

          <p className="text-xs sm:text-sm text-devotional-muted font-hindi mt-2 max-w-xl mx-auto">
            {t('committee_page.description')}
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto mt-8 relative">
            <div className="relative">
              <Search className="w-5 h-5 text-devotional-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('committee_page.search_placeholder')}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-cream-50 border-2 border-gold-400 focus:border-saffron-600 focus:outline-none shadow-sm text-sm text-devotional-brown font-hindi placeholder:text-devotional-muted/70 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-devotional-muted hover:text-devotional-brown"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-devotional-muted px-2 mt-2">
              <span>{t('committee_page.member_count')} <strong>{members.length}</strong></span>
              {searchQuery && <span>परिणाम: <strong>{filteredMembers.length}</strong> सदस्य मिले</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20 text-devotional-muted font-hindi">
            {t('common.loading')}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-cream-50 rounded-2xl border border-gold-300 max-w-md mx-auto p-6">
            <User className="w-10 h-10 text-gold-400 mx-auto mb-2" />
            <h3 className="font-bold font-hindi text-devotional-brown">
              कोई सदस्य नहीं मिला (No member found)
            </h3>
            <p className="text-xs text-devotional-muted mt-1">
              कृपया दूसरा नाम अथवा क्रमांक खोजें।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMembers.map((member) => {
              const isLeadership = member.is_leadership === 1 || member.order_index <= 4;
              return (
                <div
                  key={member.id}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isLeadership
                      ? 'bg-cream-50 border-2 border-gold-400 shadow-warm hover:border-gold-500 hover:-translate-y-1'
                      : 'bg-cream-100/80 border border-gold-300/60 shadow-sm hover:border-gold-400 hover:bg-cream-50 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Top Row: Number Badge and Role */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-saffron-100 text-saffron-800 font-bold text-xs flex items-center justify-center font-sans border border-saffron-300">
                      {member.order_index}
                    </span>

                    {member.designation_hi && member.designation_hi !== 'कार्यकारिणी सदस्य' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-vermilion-50 border border-vermilion-200 text-vermilion-800 font-bold text-[10px] font-hindi">
                        {pick(member.designation_hi, member.designation_en)}
                      </span>
                    )}
                  </div>

                  {/* Member Name */}
                  <div className="my-2">
                    <h3 className="font-bold text-base sm:text-lg font-hindi text-devotional-brown leading-snug">
                      {pick(member.name_hi, member.name_en)}
                    </h3>

                    {member.name_en && lang === 'hi' && (
                      <p className="text-[11px] text-devotional-muted font-sans font-medium mt-0.5">
                        {member.name_en}
                      </p>
                    )}
                    {member.name_hi && lang === 'en' && (
                      <p className="text-[11px] text-devotional-muted font-hindi font-medium mt-0.5">
                        {member.name_hi}
                      </p>
                    )}
                  </div>

                  {/* Phone / Contact if available */}
                  {member.phone ? (
                    <div className="mt-3 pt-3 border-t border-gold-200/80 flex items-center justify-between">
                      <a
                        href={`tel:${member.phone}`}
                        className="text-xs font-bold text-saffron-800 hover:text-saffron-900 flex items-center gap-1 font-sans"
                      >
                        <Phone className="w-3.5 h-3.5 text-saffron-600" />
                        <span>{member.phone}</span>
                      </a>
                      <span className="text-[10px] text-devotional-muted font-hindi">
                        {pick(member.designation_hi, member.designation_en)}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 pt-2 border-t border-gold-200/40 text-[10px] text-devotional-muted font-hindi">
                      {pick(member.designation_hi, member.designation_en)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CommitteePage;
