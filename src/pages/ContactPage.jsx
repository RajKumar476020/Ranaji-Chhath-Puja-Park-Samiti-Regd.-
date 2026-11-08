import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Send, CheckCircle2, AlertCircle, Copy, Check, Navigation, Train } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
import SEO from '../components/common/SEO';

const ContactPage = () => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    bot_field: '' // honeypot for spam bots
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const fullAddress = lang === 'hi'
    ? "मेट्रो पिलर नं. 46 के सामने, मेन नजफगढ़ रोड, राणाजी छठ पूजा पार्क (MCD पार्क), राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043"
    : "Opposite Metro Pillar No. 46, Main Najafgarh Road, Ranaji Chhath Puja Park (MCD Park), Ranaji Enclave, Najafgarh, New Delhi – 110043";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          bot_field: ''
        });
      } else {
        setErrorMsg(res.message || 'त्रुटि हुई। कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      setErrorMsg('सर्वर से संपर्क करने में असमर्थ। कृपया बाद में प्रयास करें।');
    } finally {
      setSubmitting(false);
    }
  };

  const leaders = [
    {
      role: t('home.president'),
      name: lang === 'hi' ? 'श्री रामानन्द सिंह' : 'Shri Ramanand Singh',
      phone: '9971472216',
      badge: 'bg-vermilion-700'
    },
    {
      role: t('home.gen_sec'),
      name: lang === 'hi' ? 'श्री अशोक सिंह' : 'Shri Ashok Singh',
      phone: '7982713291',
      badge: 'bg-saffron-600'
    },
    {
      role: t('home.treasurer'),
      name: lang === 'hi' ? 'श्री उमेश शर्मा' : 'Shri Umesh Sharma',
      phone: '9312712790',
      badge: 'bg-gold-600'
    }
  ];

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'हमसे संपर्क करें' : 'Contact Us'}
        description={lang === 'hi'
          ? 'राणाजी छठ पूजा पार्क समिति (रजि.) के प्रमुख पदाधिकारियों से संपर्क सूत्र, पता, दिशा-निर्देश एवं संदेश प्रपत्र।'
          : 'Contact details, phone numbers, and address of Ranaji Chhath Puja Park Samiti (Regd.), Najafgarh.'}
      />

      {/* Header */}
      <div className="bg-devotional-gradient py-16 sm:py-20 border-b border-gold-300/40 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-100 border border-saffron-300 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5 text-saffron-600" />
            <span>{lang === 'hi' ? 'संपर्क सूत्र' : 'Get In Touch'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('contact_page.title')}
          </h1>

          <p className="text-sm sm:text-base text-devotional-muted font-hindi mt-3 max-w-xl mx-auto">
            {t('contact_page.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Leadership Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader, idx) => {
            const cleanPhone = leader.phone.replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
              'नमस्ते, मैं राणाजी छठ पूजा पार्क समिति (रजि.) की वेबसाइट से संपर्क कर रहा हूँ।'
            )}`;

            return (
              <div
                key={idx}
                className="bg-cream-50 rounded-2xl border-2 border-gold-400 p-6 shadow-elevation hover:border-gold-500 hover:shadow-warm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`inline-block px-3 py-0.5 rounded-full text-white text-xs font-bold font-hindi ${leader.badge} mb-3`}>
                    {leader.role}
                  </div>
                  <h3 className="text-xl font-bold font-hindi text-devotional-brown">
                    {leader.name}
                  </h3>
                  <div className="text-base font-bold text-saffron-800 font-sans mt-1">
                    +91 {leader.phone}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gold-200">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="py-2 px-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t('common.call_now')}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t('common.whatsapp')}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Enquiry Form */}
          <div className="lg:col-span-7 bg-cream-50 rounded-3xl border-2 border-gold-400 p-6 sm:p-10 shadow-elevation">
            <h2 className="text-2xl font-bold font-hindi text-devotional-brown mb-2">
              {t('contact_page.form_title')}
            </h2>
            <p className="text-xs sm:text-sm text-devotional-muted font-hindi mb-6">
              पूजा वेदी, आयोजन व्यवस्था, स्वयंसेवक सेवा अथवा किसी भी जानकारी हेतु अपना विवरण भेजें:
            </p>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-hindi flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs sm:text-sm font-hindi flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-hindi">
              
              {/* Honeypot field (hidden for users, bots fill it) */}
              <input
                type="text"
                name="bot_field"
                value={formData.bot_field}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-devotional-brown mb-1">
                    {t('contact_page.name_label')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="उदा. राहुल शर्मा"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 focus:border-saffron-600 focus:outline-none text-sm text-devotional-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-devotional-brown mb-1">
                    {t('contact_page.phone_label')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 अंकों का मोबाइल नंबर"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 focus:border-saffron-600 focus:outline-none text-sm text-devotional-brown"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-devotional-brown mb-1">
                    {t('contact_page.email_label')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 focus:border-saffron-600 focus:outline-none text-sm text-devotional-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-devotional-brown mb-1">
                    {t('contact_page.subject_label')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="उदा. छठ पूजा वेदी जानकारी"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 focus:border-saffron-600 focus:outline-none text-sm text-devotional-brown"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-devotional-brown mb-1">
                  {t('contact_page.message_label')}
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="अपना संदेश या प्रश्न यहाँ लिखें..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold-300 focus:border-saffron-600 focus:outline-none text-sm text-devotional-brown"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-vermilion-700 to-saffron-600 hover:from-vermilion-800 hover:to-saffron-700 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t('common.submitting') : t('common.submit')}</span>
              </button>
            </form>
          </div>

          {/* Right: Address & Map Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-cream-50 border-2 border-gold-400 shadow-elevation space-y-4">
              <h3 className="text-lg font-bold font-hindi text-devotional-brown">
                {t('contact_page.address_card_title')}
              </h3>

              <div className="p-3.5 bg-cream-100 rounded-xl border border-gold-300 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vermilion-700 flex-shrink-0 mt-1" />
                <p className="text-xs sm:text-sm font-bold text-devotional-brown font-hindi leading-relaxed">
                  {fullAddress}
                </p>
              </div>

              <div className="p-3 bg-gold-50 rounded-xl border border-gold-300 flex items-center gap-2.5">
                <Train className="w-4 h-4 text-saffron-700 flex-shrink-0" />
                <span className="text-xs text-devotional-brown font-hindi font-semibold">
                  {lang === 'hi' ? 'मेट्रो पिलर नं. 46 के ठीक सामने, मेन नजफगढ़ रोड' : 'Directly opposite Metro Pillar No. 46'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:9971472216"
                  className="py-2.5 px-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'मार्ग सहायता' : 'Call Help'}</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-cream-100 hover:bg-gold-50 border border-gold-300 text-devotional-brown text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">{t('common.address_copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('common.copy_address')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Venue & Landmark Guide Box */}
            <div className="rounded-3xl overflow-hidden border-2 border-gold-300 shadow-elevation p-6 bg-gradient-to-br from-cream-100 via-gold-50/50 to-cream-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-800 font-sans block mb-1">
                  {lang === 'hi' ? 'मार्ग निर्देश' : 'Transit Directions'}
                </span>
                <h4 className="text-base font-bold text-devotional-brown font-hindi leading-snug">
                  {lang === 'hi' ? 'राणाजी छठ पूजा पार्क (MCD पार्क)' : 'Ranaji Chhath Puja Park (MCD Park)'}
                </h4>
                <p className="text-xs text-devotional-muted font-hindi mt-1">
                  {lang === 'hi'
                    ? 'मेन नजफगढ़ रोड, मेट्रो पिलर संख्या 46 के ठीक सामने। नजफगढ़ मेट्रो स्टेशन (ग्रे लाइन) से सीधे ई-रिक्शा द्वारा सुलभ।'
                    : 'Main Najafgarh Road, directly opposite Metro Pillar No. 46. Easily accessible via e-rickshaw from Najafgarh Metro Station (Grey Line).'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gold-300/60 flex items-center justify-between text-xs font-hindi">
                <span className="text-devotional-brown font-bold">
                  {lang === 'hi' ? 'सहायता केंद्र:' : 'Help Center:'}
                </span>
                <a href="tel:9971472216" className="text-saffron-800 font-bold font-mono hover:underline">
                  9971472216
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ContactPage;
