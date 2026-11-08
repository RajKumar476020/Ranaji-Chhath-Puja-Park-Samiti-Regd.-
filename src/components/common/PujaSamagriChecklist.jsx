import React, { useState } from 'react';
import { CheckSquare, Square, Printer, Share2, Sparkles, ShoppingBag, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const PujaSamagriChecklist = () => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('essential');

  const categories = [
    { id: 'essential', labelHi: 'मुख्य सामग्री (सूप व दौरा)', labelEn: 'Main Items (Soop & Daura)' },
    { id: 'fruits', labelHi: 'पावन फल एवं सब्जियां', labelEn: 'Sacred Fruits & Crops' },
    { id: 'prasad', labelHi: 'महाप्रसाद सामग्री', labelEn: 'Prasad Ingredients' },
    { id: 'puja', labelHi: 'हवन, धूप व दीप सामग्री', labelEn: 'Diyas, Incense & Havan' },
    { id: 'vastra', labelHi: 'वस्त्र एवं श्रृंगार', labelEn: 'Clothing & Sacred Items' }
  ];

  const items = {
    essential: [
      { id: 'e1', nameHi: 'बांस का सूप (कम से कम 2 या 4)', nameEn: 'Bamboo Soop (min 2 or 4)' },
      { id: 'e2', nameHi: 'बांस का बड़ा दौरा या डलिया', nameEn: 'Large Bamboo Daura / Basket' },
      { id: 'e3', nameHi: 'पीतल का सूप (वैकल्पिक)', nameEn: 'Brass Soop (optional)' },
      { id: 'e4', nameHi: 'अर्घ्य हेतु तांबे का कलश/लोटा', nameEn: 'Copper Kalash/Lota for Arghya' },
      { id: 'e5', nameHi: 'दूध अर्घ्य हेतु पात्र', nameEn: 'Vessel for Milk Arghya' },
      { id: 'e6', nameHi: 'ईख (गन्ना) पत्तियों एवं जड़ सहित', nameEn: 'Sugarcane stalks with leaves & roots' }
    ],
    fruits: [
      { id: 'f1', nameHi: 'पानी वाला नारियल (जटा सहित)', nameEn: 'Whole Coconut with husk' },
      { id: 'f2', nameHi: 'बड़ा नींबू (डाभ नींबू)', nameEn: 'Large Pomelo / Daabh Lemon' },
      { id: 'f3', nameHi: 'केले का पूरा घवद (घौद)', nameEn: 'Full stem bunch of bananas' },
      { id: 'f4', nameHi: 'सिंघाड़ा (पानीफल)', nameEn: 'Water Chestnuts (Singhara)' },
      { id: 'f5', nameHi: 'सुथनी एवं शकरकंद', nameEn: 'Suthni & Sweet Potatoes' },
      { id: 'f6', nameHi: 'कच्ची हल्दी एवं कच्चा अदरक पौधों सहित', nameEn: 'Fresh Raw Turmeric & Ginger plants' },
      { id: 'f7', nameHi: 'सेब, संतरा, अनार एवं अन्य मौसमी फल', nameEn: 'Apples, Oranges, Pomegranates' }
    ],
    prasad: [
      { id: 'p1', nameHi: 'शुद्ध गेहूं का आटा (घर में धोकर सुखाया हुआ)', nameEn: 'Pure Wheat Flour (washed & sun-dried)' },
      { id: 'p2', nameHi: 'शुद्ध देशी घी', nameEn: 'Pure Desi Ghee' },
      { id: 'p3', nameHi: 'गुड़ (ठेकुआ व खीर हेतु)', nameEn: 'Organic Jaggery (Gur)' },
      { id: 'p4', nameHi: 'नए अरवा चावल (खरना खीर हेतु)', nameEn: 'New Arwa Rice (for Kharna kheer)' },
      { id: 'p5', nameHi: 'शुद्ध गाय का ताजा दूध', nameEn: 'Fresh Cow Milk' },
      { id: 'p6', nameHi: 'चना दाल (नहाय-खाय हेतु)', nameEn: 'Chana Dal (for Nahay-Khay)' },
      { id: 'p7', nameHi: 'शुद्ध कद्दू / लौकी', nameEn: 'Fresh Bottle Gourd (Kaddu)' },
      { id: 'p8', nameHi: 'सौंफ, इलायची एवं सूखा नारियल (गढ़ी)', nameEn: 'Fennel seeds, Cardamom, Dry coconut' }
    ],
    puja: [
      { id: 'pu1', nameHi: 'मिट्टी के दीये (कम से कम 24 या 36)', nameEn: 'Earthen Diyas (24 to 36 min)' },
      { id: 'pu2', nameHi: 'रुई की बत्तियां एवं कपूर', nameEn: 'Cotton wicks & Camphor' },
      { id: 'pu3', nameHi: 'तिल का तेल या सरसों का तेल', nameEn: 'Sesame or Mustard oil for lamps' },
      { id: 'pu4', nameHi: 'धूपबत्ती, अगरबत्ती एवं माचिस', nameEn: 'Incense sticks & Matchbox' },
      { id: 'pu5', nameHi: 'अक्षत (अखंडित चावल) एवं रोली', nameEn: 'Akshat (unbroken rice) & Roli' },
      { id: 'pu6', nameHi: 'पीला एवं नारंगी सिंदूर (मांग भरने हेतु)', nameEn: 'Yellow & Orange Sindoor' },
      { id: 'pu7', nameHi: 'पान के पत्ते एवं साबुत सुपारी', nameEn: 'Betel leaves & Whole Areca nuts' },
      { id: 'pu8', nameHi: 'हवन सामग्री एवं आम की सूखी लकड़ियां', nameEn: 'Havan samagri & dry mango wood' }
    ],
    vastra: [
      { id: 'v1', nameHi: 'व्रती हेतु पीले या लाल रंग की सूती साड़ी/धोती', nameEn: 'Yellow/Red Cotton Saree/Dhoti for Vrati' },
      { id: 'v2', nameHi: 'दौरा एवं सूप ढकने हेतु नया लाल/पीला वस्त्र', nameEn: 'New Red/Yellow cloth to cover Daura' },
      { id: 'v3', nameHi: 'अर्घ्य देने वाले परिवार के सदस्यों हेतु धोती/कुर्ता', nameEn: 'Traditional Dhoti/Kurta for Arghya givers' },
      { id: 'v4', nameHi: 'दौरा उठाने वाले हेतु गमछा', nameEn: 'Traditional Gamchha for Daura carrier' },
      { id: 'v5', nameHi: 'अलता (महावर) एवं बिंदी', nameEn: 'Traditional Alta & Bindi' }
    ]
  };

  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentList = items[activeCategory] || [];
  const totalCount = Object.values(items).flat().length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `🪔 *छठ पूजा सामग्री चेकलिस्ट* (राणाजी छठ पूजा पार्क समिति)\n\nमैंने ${totalCount} में से ${completedCount} सामग्री एकत्र कर ली है। संपूर्ण सूची देखने के लिए यहाँ क्लिक करें: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-cream-50 rounded-3xl border-2 border-gold-400 p-6 sm:p-10 shadow-elevation space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold-300">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold font-sans uppercase mb-1">
            <ShoppingBag className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'पूजा तैयारी' : 'Puja Preparation'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown">
            {lang === 'hi' ? 'छठ महापर्व संपूर्ण सामग्री चेकलिस्ट' : 'Complete Chhath Puja Samagri Checklist'}
          </h2>
          <p className="text-xs sm:text-sm text-devotional-muted font-hindi mt-1">
            {lang === 'hi'
              ? 'छठ व्रतियों एवं परिवारों की सुविधा हेतु प्रामाणिक सामग्रियों की संपूर्ण सूची (अपनी तैयारी ट्रैक करें)'
              : 'Interactive checklist for devotees to prepare and track puja items'}
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3 bg-cream-100 px-4 py-2.5 rounded-2xl border border-gold-300 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] text-devotional-muted uppercase font-bold block">
              {lang === 'hi' ? 'तैयारी प्रगति' : 'Progress'}
            </span>
            <span className="font-bold text-sm text-saffron-800 font-sans">
              {completedCount} / {totalCount} वस्तुएं
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-saffron-600 text-white font-bold text-xs flex items-center justify-center font-sans shadow-sm">
            {Math.round((completedCount / totalCount) * 100)}%
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-hindi transition-all ${
              activeCategory === cat.id
                ? 'bg-saffron-600 text-white shadow-warm scale-105'
                : 'bg-cream-100 text-devotional-brown hover:bg-gold-100 border border-gold-300/60'
            }`}
          >
            {lang === 'hi' ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {currentList.map(item => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                isDone
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-sm'
                  : 'bg-white border-gold-300/70 hover:border-gold-400 text-devotional-brown'
              }`}
            >
              <div className="mt-0.5 text-saffron-600 flex-shrink-0">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-gold-500" />
                )}
              </div>
              <div className="flex-1">
                <span className={`text-xs sm:text-sm font-semibold font-hindi block leading-snug ${
                  isDone ? 'line-through text-emerald-900/70' : ''
                }`}>
                  {lang === 'hi' ? item.nameHi : item.nameEn}
                </span>
                {lang === 'hi' && item.nameEn && (
                  <span className="text-[10px] text-devotional-muted font-sans block mt-0.5">
                    {item.nameEn}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-gold-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-devotional-muted font-hindi">
          * सामग्री सूची सनातन परंपरा एवं पूर्वांचल छठ विधि के अनुसार संकलित की गई है।
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>व्हाट्सएप पर शेयर करें</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-cream-100 hover:bg-gold-50 border border-gold-300 text-devotional-brown font-bold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-saffron-700" />
            <span>प्रिंट सूची</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default PujaSamagriChecklist;

