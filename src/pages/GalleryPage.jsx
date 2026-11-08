import React, { useState, useEffect } from 'react';
import { Camera, Filter, Eye, Download, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
import SEO from '../components/common/SEO';
import Lightbox from '../components/common/Lightbox';

const GalleryPage = () => {
  const { lang, t, pick } = useLanguage();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: t('gallery_page.cat_all') },
    { id: 'chhath-2026', label: t('gallery_page.cat_2026') },
    { id: 'past-years', label: t('gallery_page.cat_past') },
    { id: 'religious', label: t('gallery_page.cat_religious') },
    { id: 'cultural', label: t('gallery_page.cat_cultural') },
    { id: 'samiti-activities', label: t('gallery_page.cat_activities') },
    { id: 'other', label: t('gallery_page.cat_other') }
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await api.getGallery(activeCategory);
        if (res.success && res.items) {
          setItems(res.items);
        }
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [activeCategory]);

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'तस्वीर एवं वीडियो गैलरी' : 'Photo & Video Gallery'}
        description={lang === 'hi'
          ? 'राणाजी छठ पूजा पार्क समिति के छठ महापर्व आयोजनों, सूर्योपासना, घाट सजावट एवं सांस्कृतिक कार्यक्रमों की पावन तस्वीरें।'
          : 'Photographs of Chhath Puja celebrations, Arghya rituals, and cultural gatherings at Ranaji Chhath Puja Park.'}
      />

      {/* Header */}
      <div className="bg-devotional-gradient py-16 sm:py-20 border-b border-gold-300/40 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'पावन स्मृतियां' : 'Visual Gallery'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('gallery_page.title')}
          </h1>

          <p className="text-sm sm:text-base text-devotional-muted font-hindi mt-3 max-w-xl mx-auto">
            {t('gallery_page.subtitle')}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-hindi transition-all ${
                  activeCategory === cat.id
                    ? 'bg-saffron-600 text-white shadow-warm scale-105'
                    : 'bg-cream-100 text-devotional-brown hover:bg-gold-100 border border-gold-300/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Gallery Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20 text-devotional-muted font-hindi">
            {t('common.loading')}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-cream-50 rounded-2xl border border-gold-300 max-w-md mx-auto p-8">
            <ImageIcon className="w-12 h-12 text-gold-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-hindi text-devotional-brown">
              {lang === 'hi' ? 'इस श्रेणी में अभी कोई तस्वीर नहीं है।' : 'No photos found in this category.'}
            </h3>
            <p className="text-xs text-devotional-muted mt-1">
              {lang === 'hi' ? 'कृपया अन्य श्रेणी का चयन करें।' : 'Please choose another category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-gold-300/80 shadow-elevation cursor-pointer bg-cream-200"
              >
                <img
                  src={item.image_url}
                  alt={pick(item.title_hi, item.title_en)}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-devotional-dark/90 via-devotional-dark/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity"></div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-cream-50/90 backdrop-blur-md text-saffron-700 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Bottom Caption Box */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-gold-300 tracking-wider block">
                    {categories.find(c => c.id === item.category)?.label || 'छठ पूजा'}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-hindi text-white leading-snug mt-1 group-hover:text-gold-200 transition-colors">
                    {pick(item.title_hi, item.title_en)}
                  </h3>
                  {item.caption_hi && (
                    <p className="text-xs text-cream-200/80 font-hindi truncate mt-1">
                      {pick(item.caption_hi, item.caption_en)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))}
        />
      )}
    </>
  );
};

export default GalleryPage;
