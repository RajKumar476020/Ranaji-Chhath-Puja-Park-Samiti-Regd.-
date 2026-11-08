import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/common/SEO';

const TermsPage = () => {
  const { lang } = useLanguage();

  return (
    <>
      <SEO title={lang === 'hi' ? 'नियम एवं शर्तें' : 'Terms & Conditions'} />
      <div className="bg-devotional-gradient py-14 border-b border-gold-300/40 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown">
          {lang === 'hi' ? 'नियम एवं शर्तें (Terms & Conditions)' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs sm:text-sm text-devotional-muted mt-2 font-hindi">
          राणाजी छठ पूजा पार्क समिति (रजि.), नजफगढ़, नई दिल्ली
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-devotional-brown/90 leading-relaxed font-hindi">
        <div className="bg-cream-50 p-6 rounded-2xl border border-gold-300 space-y-4">
          <h2 className="text-lg font-bold text-devotional-brown">1. वेबसाइट का उद्देश्य</h2>
          <p>
            यह वेबसाइट राणाजी छठ पूजा पार्क समिति (रजि.) की आधिकारिक डिजिटल पहचान है, जिसका उद्देश्य छठ महापर्व के कार्यक्रमों, कार्यकारिणी सूची, धार्मिक परंपराओं एवं आर्थिक सहयोग की प्रामाणिक जानकारी उपलब्ध कराना है।
          </p>

          <h2 className="text-lg font-bold text-devotional-brown">2. पूजा वेदी एवं पार्क नियम</h2>
          <p>
            राणाजी छठ पूजा पार्क (MCD पार्क) में पूजा वेदी के निर्माण एवं पूजा अनुष्ठान के दौरान सभी श्रद्धालुओं से अनुशासन, स्वच्छता एवं समिति के स्वयंसेवकों के निर्देशों का पालन करने का अनुरोध किया जाता है।
          </p>

          <h2 className="text-lg font-bold text-devotional-brown">3. बौद्धिक संपदा एवं सामग्री</h2>
          <p>
            वेबसाइट पर उपलब्ध आधिकारिक कार्ड सामग्री, तस्वीरें एवं पाठ्य सामग्री समिति की अधिकृत संपत्ति हैं। किसी भी अनाधिकृत व्यावसायिक उपयोग की अनुमति नहीं है।
          </p>

          <h2 className="text-lg font-bold text-devotional-brown">4. अधिकार क्षेत्र</h2>
          <p>
            समिति संबंधी सभी कानूनी एवं प्रशासनिक विषय दिल्ली के अधिकार क्षेत्र के अंतर्गत आते हैं।
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
