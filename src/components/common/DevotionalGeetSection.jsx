import React, { useState } from 'react';
import { Music, Play, Pause, BookOpen, Volume2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const DevotionalGeetSection = () => {
  const { lang } = useLanguage();
  const [expandedId, setExpandedId] = useState('song1');

  const songs = [
    {
      id: 'song1',
      titleHi: 'कांच ही बांस के बहंगिया (Kaanch Hi Baans Ke Bahangiya)',
      titleEn: 'Sacred Bamboo Carrying Pole Hymn',
      singer: 'पारंपरिक छठ लोकगीत (Traditional Folk Hymn)',
      descHi: 'छठ पूजा का सबसे पवित्र एवं मार्मिक लोकगीत, जिसमें बहंगी लेकर घाट जाने का भावपूर्ण वर्णन है।',
      lyrics: [
        'कांच ही बांस के बहंगिया, बहंगी लचकत जाए...',
        'बहंगी लचकत जाए...',
        'होई ना बलम जी कहरिया, बहंगी घाटे पहुंचाए...',
        'बहंगी घाटे पहुंचाए...',
        'बात जे पूछेला बटोहिया, बहंगी केकरा के जाए?',
        'बहंगी केकरा के जाए?',
        'तू त आन्हर हउवे रे बटोहिया, बहंगी छठी माई के जाए...',
        'बहंगी छठी माई के जाए...'
      ]
    },
    {
      id: 'song2',
      titleHi: 'उ जे केरवा जे फरेला घवद से (Oo Je Kerwa Je Farela)',
      titleEn: 'The Sacred Banana Bunch Hymn',
      singer: 'पारंपरिक छठ लोकगीत (Traditional Folk Hymn)',
      descHi: 'सूर्य देव के भोग हेतु केले के घवद एवं पवित्र फलों की महिमा का पावन गीत।',
      lyrics: [
        'उ जे केरवा जे फरेला घवद से, ओह पर सुगा मेड़राय...',
        'उ जे सुगवा के मारबो धनुख से, सुगा गिरे मुरझाय...',
        'सुगा जे रोवेले बियोग से, आदित होई ना सहाय...',
        'देव जे रोवेले बियोग से, छठी माई होई ना सहाय...'
      ]
    },
    {
      id: 'song3',
      titleHi: 'केलवा के पात पर उगेलन सुरुज देव (Kelwa Ke Paat Par)',
      titleEn: 'Rising Sun God Upon The Banana Leaf',
      singer: 'पारंपरिक छठ लोकगीत (Traditional Folk Hymn)',
      descHi: 'प्रातःकाल अर्घ्य के समय उदीयमान भगवान भास्कर के दिव्य दर्शन एवं वंदना।',
      lyrics: [
        'केलवा के पात पर उगेलन सुरुज देव, झांके-झुके...',
        'करा ना अरग के बेर, हे सुरुज देव, करा ना अरग के बेर...',
        'हाथ में नारियल, सूप में सिंदूरवा, बाजेला बाजवा अनेक...',
        'दर्शन दीहीं ना हे दीनानाथ, घटवा पे ठाढ़े सेवकवा अनेक...'
      ]
    },
    {
      id: 'song4',
      titleHi: 'जोड़े-जोड़े फलवा सुरुज देव (Jode Jode Falwa)',
      titleEn: 'Offering Sacred Pairs of Fruits',
      singer: 'पारंपरिक छठ लोकगीत (Traditional Folk Hymn)',
      descHi: 'छठ मैया के सूप में जोड़े फल और नारियल अर्पित करने की परंपरा।',
      lyrics: [
        'जोड़े-जोड़े फलवा सुरुज देव घटवा पे देबो...',
        'घटवा पे देबो सुरुज देव, अरघ तोहार...',
        'निर्मल जलवा में ठाढ़े सेवकवा, सुन लीं पुकार...',
        'छठी मैया करब कल्याण, गोदिया में बालिग लाल...'
      ]
    }
  ];

  return (
    <div className="bg-cream-50 rounded-3xl border-2 border-gold-400 p-6 sm:p-10 shadow-elevation space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold font-sans uppercase mb-1">
          <Music className="w-3.5 h-3.5 text-saffron-600" />
          <span>{lang === 'hi' ? 'भक्ति संगीत एवं लोकगीत' : 'Devotional Hymns'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown">
          {lang === 'hi' ? 'छठी मैया के पारंपरिक अमर लोकगीत' : 'Traditional Chhathi Maiya Folk Songs'}
        </h2>
        <p className="text-xs sm:text-sm text-devotional-muted font-hindi mt-1">
          {lang === 'hi'
            ? 'छठ महापर्व की आत्मा हैं ये पावन लोकगीत जो हर घाट पर श्रद्धा और भावुकता का संचार करते हैं'
            : 'Sacred folk songs embodying the soul and pure devotion of Chhath Mahaparv'}
        </p>
      </div>

      {/* Song Accordion / Cards */}
      <div className="space-y-3">
        {songs.map((song) => {
          const isOpen = expandedId === song.id;
          return (
            <div
              key={song.id}
              className="rounded-2xl border border-gold-300 bg-cream-100/70 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setExpandedId(isOpen ? null : song.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-gold-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-saffron-100 text-saffron-700 flex items-center justify-center flex-shrink-0">
                    <Music className="w-4 h-4 text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base font-hindi text-devotional-brown leading-snug">
                      {lang === 'hi' ? song.titleHi : song.titleEn}
                    </h3>
                    <span className="text-[11px] text-devotional-muted font-hindi block mt-0.5">
                      {song.singer}
                    </span>
                  </div>
                </div>

                <div className="p-1 rounded-lg text-devotional-muted">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-saffron-700" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-gold-200/80 space-y-3 animate-fadeIn">
                  <p className="text-xs text-devotional-brown/80 font-hindi italic">
                    {song.descHi}
                  </p>

                  <div className="p-4 rounded-xl bg-white/80 border border-gold-300/60 font-hindi text-xs sm:text-sm leading-loose text-devotional-brown space-y-1">
                    {song.lyrics.map((line, idx) => (
                      <p key={idx} className="font-medium">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DevotionalGeetSection;

