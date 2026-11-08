import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/common/SEO';

const PrivacyPage = () => {
  const { lang } = useLanguage();

  return (
    <>
      <SEO title={lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'} />
      <div className="bg-devotional-gradient py-14 border-b border-gold-300/40 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-hindi text-devotional-brown">
          {lang === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs sm:text-sm text-devotional-muted mt-2 font-hindi">
          राणाजी छठ पूजा पार्क समिति (रजि.), नजफगढ़, नई दिल्ली
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-devotional-brown/90 leading-relaxed font-hindi">
        <div className="bg-cream-50 p-6 rounded-2xl border border-gold-300 space-y-4">
          <h2 className="text-lg font-bold text-devotional-brown">1. सूचना संग्रह एवं उपयोग</h2>
          <p>
            राणाजी छठ पूजा पार्क समिति (रजि.) अपनी आधिकारिक वेबसाइट पर केवल वही जानकारी प्राप्त करती है जो आगंतुक संपर्क प्रपत्र (Contact Form) के माध्यम से स्वेच्छा से प्रदान करते हैं (जैसे नाम, फोन नंबर, विषय एवं संदेश)।
          </p>

          <h2 className="text-lg font-bold text-devotional-brown">2. आर्थिक सहयोग एवं भुगतान डेटा</h2>
          <p>
            समिति की वेबसाइट सीधे किसी भी प्रकार की वित्तीय या कार्ड जानकारी संग्रहित नहीं करती है। वेबसाइट पर प्रदर्शित QR कोड केवल आधिकारिक UPI पते पर सीधे बैंकिंग ऐप से दान/सहयोग करने हेतु प्रदान किया गया है।
          </p>

          <h2 className="text-lg font-bold text-devotional-brown">3. गोपनीयता एवं सुरक्षा</h2>
          <p>
            श्रद्धालुओं द्वारा प्रदान की गई जानकारी किसी भी व्यावसायिक तीसरे पक्ष के साथ साझा या बेची नहीं जाती। इसका उपयोग केवल पूजा संबंधी व्यवस्थाओं, सूचनाओं एवं पूछताछ के प्रत्युत्तर हेतु किया जाता है।
          </p>

          <h2 className="text-lg font-bold text-devotional-brown">4. संपर्क</h2>
          <p>
            गोपनीयता नीति से संबंधित किसी भी प्रश्न हेतु समिति के मुख्य पदाधिकारियों से 9971472216 अथवा 7982713291 पर संपर्क किया जा सकता है।
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
