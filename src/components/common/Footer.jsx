import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, Sparkles, Shield, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-devotional-dark text-cream-100 pt-16 pb-8 border-t-4 border-gold-500 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold-500/20">
          
          {/* Column 1: Samiti Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-saffron-600 to-gold-400 p-0.5 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-devotional-dark flex items-center justify-center">
                  <span className="text-xl">🪔</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight font-hindi">
                  {lang === 'hi' ? 'राणाजी छठ पूजा पार्क समिति' : 'Ranaji Chhath Puja Park Samiti'}
                  <span className="text-gold-400 text-xs ml-1">(रजि.)</span>
                </h3>
                <p className="text-xs text-gold-300/80 font-medium">
                  {t('common.consecutive_years')}
                </p>
              </div>
            </div>

            <p className="text-xs text-cream-200/80 leading-relaxed font-hindi">
              {t('footer.description')}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{t('footer.closing')}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-gold-500/30 inline-block font-sans">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-200/80">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="text-gold-500">›</span> {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="text-gold-500">›</span> {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/chhath-puja" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="text-gold-500">›</span> {t('nav.chhath')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="text-gold-500">›</span> {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/committee" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="text-gold-500">›</span> {t('nav.committee')}
                </Link>
              </li>
              <li>
                <Link to="/donations" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="text-gold-500">›</span> {t('nav.donations')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Leadership */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-gold-500/30 inline-block font-sans">
              {lang === 'hi' ? 'प्रमुख पदाधिकारी' : 'Key Officials'}
            </h4>
            <ul className="space-y-3 text-xs text-cream-200/80 font-hindi">
              <li className="bg-white/5 p-2 rounded-lg border border-white/5 hover:border-gold-500/30 transition-colors">
                <div className="font-bold text-white text-xs">
                  {lang === 'hi' ? 'श्री रामानन्द सिंह' : 'Shri Ramanand Singh'}
                  <span className="text-gold-400 font-normal ml-1">({t('home.president')})</span>
                </div>
                <a href="tel:9971472216" className="text-saffron-400 hover:underline flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" /> 9971472216
                </a>
              </li>
              <li className="bg-white/5 p-2 rounded-lg border border-white/5 hover:border-gold-500/30 transition-colors">
                <div className="font-bold text-white text-xs">
                  {lang === 'hi' ? 'श्री अशोक सिंह' : 'Shri Ashok Singh'}
                  <span className="text-gold-400 font-normal ml-1">({t('home.gen_sec')})</span>
                </div>
                <a href="tel:7982713291" className="text-saffron-400 hover:underline flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" /> 7982713291
                </a>
              </li>
              <li className="bg-white/5 p-2 rounded-lg border border-white/5 hover:border-gold-500/30 transition-colors">
                <div className="font-bold text-white text-xs">
                  {lang === 'hi' ? 'श्री उमेश शर्मा' : 'Shri Umesh Sharma'}
                  <span className="text-gold-400 font-normal ml-1">({t('home.treasurer')})</span>
                </div>
                <a href="tel:9312712790" className="text-saffron-400 hover:underline flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" /> 9312712790
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Landmark */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4 pb-1 border-b border-gold-500/30 inline-block font-sans">
              {lang === 'hi' ? 'समिति का पता' : 'Park Location'}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-cream-200/90 leading-relaxed font-hindi">
              <MapPin className="w-4 h-4 text-vermilion-500 flex-shrink-0 mt-0.5" />
              <span>
                {lang === 'hi' 
                  ? 'मेट्रो पिलर नं. 46 के सामने, मेन नजफगढ़ रोड, राणाजी छठ पूजा पार्क (MCD पार्क), राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043'
                  : 'Opposite Metro Pillar No. 46, Main Najafgarh Road, Ranaji Chhath Puja Park (MCD Park), Ranaji Enclave, Najafgarh, New Delhi – 110043'}
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 text-xs font-semibold transition-colors"
              >
                <span>{lang === 'hi' ? 'स्थल एवं संपर्क जानकारी' : 'Venue & Contact Info'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-gold-300 transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-cream-200/20">•</span>
            <Link to="/terms" className="hover:text-gold-300 transition-colors">
              {t('footer.terms')}
            </Link>
            <span className="text-cream-200/20">•</span>
            <Link to="/admin" className="text-cream-200/40 hover:text-gold-400 transition-colors">
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

