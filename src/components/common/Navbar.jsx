import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Heart, Phone, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/chhath-puja', label: t('nav.chhath') },
    { to: '/events', label: t('nav.events') },
    { to: '/committee', label: t('nav.committee') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cream-50/95 backdrop-blur-md shadow-md border-b border-gold-300/60' 
        : 'bg-cream-50 border-b border-gold-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Samiti Name */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Devotional Emblem Logo */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-saffron-600 via-gold-500 to-vermilion-600 p-0.5 shadow-warm flex-shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-cream-50 flex items-center justify-center overflow-hidden border border-gold-300/40">
                <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current text-saffron-600">
                  {/* Sun Rays */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 3" />
                  <circle cx="50" cy="50" r="28" fill="#FFF7ED" />
                  {/* Sacred Sun Core */}
                  <path d="M50 12 L53 30 L69 22 L61 38 L78 40 L64 50 L78 60 L61 62 L69 78 L53 70 L50 88 L47 70 L31 78 L39 62 L22 60 L36 50 L22 40 L39 38 L31 22 L47 30 Z" fill="#FF7A00" opacity="0.9" />
                  <circle cx="50" cy="50" r="14" fill="#D32F2F" />
                  <circle cx="50" cy="50" r="8" fill="#D4AF37" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold font-hindi text-devotional-brown leading-tight tracking-tight group-hover:text-saffron-700 transition-colors">
                {lang === 'hi' ? 'राणाजी छठ पूजा पार्क समिति' : 'Ranaji Chhath Puja Park Samiti'}
                <span className="text-xs sm:text-sm font-semibold text-vermilion-700 ml-1.5">(रजि.)</span>
              </span>
              <span className="text-[11px] sm:text-xs text-devotional-muted font-medium flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-saffron-500"></span>
                {lang === 'hi' ? 'राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली' : 'Ranaji Enclave, Najafgarh, New Delhi'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-saffron-500 text-white shadow-sm'
                      : 'text-devotional-brown hover:text-saffron-700 hover:bg-gold-50/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Language Switcher & Donation Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-300/80 text-devotional-brown text-xs font-bold hover:bg-gold-100 hover:border-gold-400 transition-all shadow-sm"
              title={lang === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-saffron-600" />
              <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

            {/* Quick Donation Highlight Button */}
            <Link
              to="/donations"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-vermilion-700 to-saffron-600 text-white text-xs font-bold tracking-wide shadow-warm hover:shadow-saffron hover:scale-105 active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>{t('nav.donations')}</span>
            </Link>
          </div>

          {/* Mobile Hamburger & Language Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="p-1.5 rounded-full bg-gold-50 border border-gold-300 text-xs font-bold text-devotional-brown"
              aria-label="Toggle language"
            >
              {lang === 'hi' ? 'EN' : 'हिं'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-devotional-brown hover:bg-gold-100/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-vermilion-700" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50/98 backdrop-blur-xl border-b border-gold-300 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-base font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-saffron-500 text-white'
                      : 'text-devotional-brown hover:bg-gold-100/60'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-xs opacity-60">›</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-gold-200/80 flex flex-col gap-2">
            <Link
              to="/donations"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-vermilion-700 to-saffron-600 text-white font-bold text-center text-sm shadow-warm flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current text-white" />
              <span>{t('nav.donations')} (QR कोड)</span>
            </Link>

            <div className="flex items-center justify-between px-2 pt-2 text-xs text-devotional-muted">
              <span>{lang === 'hi' ? 'भाषा चुनें:' : 'Select Language:'}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => toggleLang()}
                  className={`px-3 py-1 rounded-md text-xs font-bold ${
                    lang === 'hi' ? 'bg-saffron-600 text-white' : 'bg-cream-200 text-devotional-brown'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => toggleLang()}
                  className={`px-3 py-1 rounded-md text-xs font-bold ${
                    lang === 'en' ? 'bg-saffron-600 text-white' : 'bg-cream-200 text-devotional-brown'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

