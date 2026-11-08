import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/common/SEO';

const NotFoundPage = () => {
  const { lang } = useLanguage();

  return (
    <>
      <SEO title="404 - पृष्ठ नहीं मिला" />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-cream-50 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-cream-100 border-2 border-gold-400 shadow-elevation space-y-5">
          <div className="text-6xl font-black text-vermilion-700 font-sans tracking-tight">
            404
          </div>
          <div className="text-2xl">🪔</div>
          <h1 className="text-2xl font-bold font-hindi text-devotional-brown">
            {lang === 'hi' ? 'यह पृष्ठ उपलब्ध नहीं है' : 'Page Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-devotional-muted font-hindi">
            {lang === 'hi' 
              ? 'आप जिस पृष्ठ को ढूंढ रहे हैं वह स्थानांतरित कर दिया गया है अथवा उपलब्ध नहीं है।'
              : 'The page you are looking for might have been moved or is unavailable.'}
          </p>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm shadow-warm transition-all"
            >
              <Home className="w-4 h-4" />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
