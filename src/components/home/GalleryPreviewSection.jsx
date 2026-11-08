import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { api } from '../../services/api';
import Lightbox from '../common/Lightbox';

const GalleryPreviewSection = () => {
  const { lang, t, pick } = useLanguage();
  const [items, setItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.getGallery();
        if (res.success && res.items.length > 0) {
          setItems(res.items.slice(0, 6)); // First 6 for preview
        }
      } catch (err) {
        console.error('Failed to load gallery preview:', err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold font-sans uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-saffron-600" />
              <span>{lang === 'hi' ? 'स्मृति चित्र' : 'Photo Glimpses'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown leading-tight">
              {t('home.gallery_preview_heading')}
            </h2>

            <p className="text-sm text-devotional-muted font-hindi mt-1">
              {t('home.gallery_preview_sub')}
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-100 hover:bg-gold-50 border-2 border-gold-400 text-devotional-brown font-bold text-xs sm:text-sm shadow-sm hover:border-gold-500 transition-all self-start md:self-auto"
          >
            <span>{t('common.view_all_photos')}</span>
            <ArrowRight className="w-4 h-4 text-saffron-600" />
          </Link>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-gold-300/80 shadow-elevation cursor-pointer bg-cream-200"
            >
              <img
                src={item.image_url}
                alt={pick(item.title_hi, item.title_en)}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-devotional-dark/85 via-devotional-dark/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* View Icon on Hover */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-cream-50/80 backdrop-blur-md text-devotional-brown opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                <Eye className="w-4 h-4 text-saffron-700" />
              </div>

              {/* Text Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-gold-300 tracking-wider block">
                  {item.category === 'chhath-2026' ? 'छठ महापर्व 2026' : (item.category === 'past-years' ? 'विगत वर्ष' : 'धार्मिक कार्यक्रम')}
                </span>
                <h3 className="text-base font-bold font-hindi text-white leading-snug mt-0.5 group-hover:text-gold-200 transition-colors">
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
    </section>
  );
};

export default GalleryPreviewSection;

