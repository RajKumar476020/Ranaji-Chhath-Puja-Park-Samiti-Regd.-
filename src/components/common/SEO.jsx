import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';

const SEO = ({ title, description, keywords, image }) => {
  const { lang } = useLanguage();
  
  const siteTitle = lang === 'hi'
    ? 'राणाजी छठ पूजा पार्क समिति (रजि.) | Najafgarh, New Delhi'
    : 'Ranaji Chhath Puja Park Samiti (Regd.) | Najafgarh, New Delhi';

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  const defaultDesc = lang === 'hi'
    ? 'राणाजी छठ पूजा पार्क समिति (रजि.) - लगातार 10 वर्षों से छठी मैया की सेवा में समर्पित। छठ महापर्व 2026, 15-16 नवम्बर 2026, राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली।'
    : 'Ranaji Chhath Puja Park Samiti (Regd.) - Dedicated to the divine service of Chhathi Maiya for 10 consecutive years. Chhath Mahaparv 2026 on 15-16 November 2026, Najafgarh, New Delhi.';

  const metaDesc = description || defaultDesc;
  const metaKeywords = keywords || 'Ranaji Chhath Puja Park Samiti, राणाजी छठ पूजा पार्क समिति, Chhath Puja Najafgarh, Chhath Puja Ranaji Enclave, छठ पूजा नजफगढ़, छठी मैया, छठ महापर्व 2026';
  const metaImage = image || '/images/img_20_offset_6306509.jpg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'hi' ? 'hi_IN' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;

