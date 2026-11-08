import React, { createContext, useContext, useState, useEffect } from 'react';
import hiTranslations from '../translations/hi.json';
import enTranslations from '../translations/en.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('samiti_lang') || 'hi';
  });

  const translations = {
    hi: hiTranslations,
    en: enTranslations
  };

  useEffect(() => {
    localStorage.setItem('samiti_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang) => {
    if (newLang === 'hi' || newLang === 'en') {
      setLangState(newLang);
    }
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  // Helper function to resolve dot-notation paths like 'home.about_heading'
  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[lang];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to Hindi translation if missing in English
        let fallbackVal = translations['hi'];
        for (const k of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && k in fallbackVal) {
            fallbackVal = fallbackVal[k];
          } else {
            fallbackVal = null;
            break;
          }
        }
        return fallbackVal || fallback || path;
      }
    }
    return current;
  };

  // Helper function to pick Hindi or English based on active language
  const pick = (hiVal, enVal) => {
    if (lang === 'hi') return hiVal || enVal;
    return enVal || hiVal;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

