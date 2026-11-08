import React, { useState } from 'react';
import { Heart, QrCode, Copy, Check, Download, ShieldCheck, ExternalLink, Phone, Info, Sparkles, Building, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/common/SEO';

const DonationPage = () => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Exact verified details from the original QR code on page 3 of the source card
  const verifiedUpiId = "9971472216@indianbk";
  const verifiedPayee = "ranaji chhath pooja park samiti";
  const bankName = "Indian Bank";
  const upiIntentUri = "upi://pay?appid=inb_admin&tr=IND164722351c1444e0afc3361d1da2c0f7&mc=&pa=9971472216@indianbk&pn=ranaji%20chhath%20pooja%20park%20samiti&bn=ranaji%20chhath%20pooja%20park%20samiti&mode=01";

  const handleCopy = () => {
    navigator.clipboard.writeText(verifiedUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <SEO
        title={lang === 'hi' ? 'आर्थिक सहयोग' : 'Donations & Contributions'}
        description={lang === 'hi'
          ? 'राणाजी छठ पूजा पार्क समिति (रजि.) के धार्मिक आयोजनों एवं सेवा कार्यों हेतु आधिकारिक आर्थिक सहयोग एवं UPI QR कोड।'
          : 'Official donation and contribution page for Ranaji Chhath Puja Park Samiti (Regd.) with verified QR code.'}
      />

      {/* Header */}
      <div className="bg-devotional-gradient py-16 sm:py-20 border-b border-gold-300/40 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-vermilion-100 text-vermilion-800 text-xs font-bold uppercase tracking-wider mb-4 border border-vermilion-200">
            <Heart className="w-3.5 h-3.5 fill-current text-vermilion-700" />
            <span>{lang === 'hi' ? 'पुण्य का कार्य' : 'Divine Contribution'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-hindi text-devotional-brown leading-tight">
            {t('donation_page.title')}
          </h1>

          <p className="text-sm sm:text-base text-devotional-muted font-hindi mt-3 max-w-xl mx-auto">
            {t('donation_page.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Main Donation Container */}
        <div className="bg-cream-50 rounded-3xl border-2 border-gold-400 shadow-elevation overflow-hidden">
          
          <div className="bg-gradient-to-r from-saffron-700 via-vermilion-700 to-saffron-700 text-white p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-hindi">
              {lang === 'hi' ? 'छठी मैया की सेवा में आपका अमूल्य सहयोग' : 'Your Contribution to Divine Chhathi Maiya Service'}
            </h2>
            <p className="text-xs sm:text-sm text-cream-100 font-hindi mt-2 max-w-lg mx-auto">
              समिति द्वारा आयोजित छठ महापर्व के भव्य आयोजन, घाट निर्माण, पवित्र जल आपूर्ति, प्रकाश व्यवस्था एवं महाप्रसाद वितरण में सहभागी बनें।
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* QR Code Presentation */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative p-4 rounded-2xl bg-white border-2 border-gold-400 shadow-warm">
                  <img
                    src="/images/original_qr.png"
                    alt="Official Ranaji Chhath Puja Samiti Donation QR Code"
                    className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
                  />
                  <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 py-1 rounded border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'मूल सत्यापित QR कोड (Source Card)' : 'Official Verified QR Code'}</span>
                  </div>
                </div>

                {/* QR Action Buttons */}
                <div className="flex items-center gap-2 mt-4">
                  <a
                    href="/images/original_qr.png"
                    download="Ranaji_Chhath_Puja_Samiti_QR.png"
                    className="px-3.5 py-2 rounded-xl bg-gold-100 hover:bg-gold-200 text-devotional-brown text-xs font-bold flex items-center gap-1.5 border border-gold-300 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4 text-saffron-700" />
                    <span>{t('common.download_qr')}</span>
                  </a>

                  <button
                    onClick={() => setShowModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-cream-100 hover:bg-gold-50 text-devotional-brown text-xs font-bold border border-gold-300 transition-colors"
                  >
                    <span>{t('common.enlarge_qr')}</span>
                  </button>
                </div>
              </div>

              {/* Instructions & Verified Credentials */}
              <div className="md:col-span-7 space-y-5">
                
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-800 font-sans">
                    {lang === 'hi' ? 'स्कैन एवं भुगतान निर्देश' : 'Instructions'}
                  </span>
                  <h3 className="text-xl font-bold font-hindi text-devotional-brown">
                    {t('donation_page.scan_instructions')}
                  </h3>
                </div>

                {/* Verified Payment Details Card */}
                <div className="p-4 rounded-xl bg-cream-100 border border-gold-300 space-y-3.5">
                  {/* Verified UPI ID */}
                  <div>
                    <span className="text-[11px] font-bold text-devotional-muted uppercase tracking-wider block">
                      {t('donation_page.verified_upi')}
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-1 bg-white p-2.5 rounded-lg border border-gold-300/80">
                      <span className="font-mono font-bold text-sm sm:text-base text-vermilion-800 select-all">
                        {verifiedUpiId}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 rounded-md bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors active:scale-95 flex-shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>{t('common.upi_copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t('common.copy_upi')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Beneficiary Name & Bank Details */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gold-200/80 text-xs">
                    <div>
                      <span className="text-devotional-muted block text-[10px] font-semibold uppercase flex items-center gap-1">
                        <User className="w-3 h-3 text-saffron-600" />
                        {t('donation_page.verified_payee')}
                      </span>
                      <span className="font-bold text-devotional-brown capitalize mt-0.5 block">
                        {verifiedPayee}
                      </span>
                    </div>

                    <div>
                      <span className="text-devotional-muted block text-[10px] font-semibold uppercase flex items-center gap-1">
                        <Building className="w-3 h-3 text-saffron-600" />
                        {t('donation_page.bank')}
                      </span>
                      <span className="font-bold text-devotional-brown mt-0.5 block">
                        {bankName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Direct Pay Button */}
                <div>
                  <a
                    href={upiIntentUri}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-vermilion-700 to-saffron-600 hover:from-vermilion-800 hover:to-saffron-700 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 active:scale-98 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'UPI ऐप खोलें (Direct Mobile Payment)' : 'Open in UPI App'}</span>
                  </a>
                </div>

                {/* Transparency Note */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gold-100/50 border border-gold-300 text-xs text-devotional-brown leading-relaxed font-hindi">
                  <Info className="w-4 h-4 text-saffron-700 flex-shrink-0 mt-0.5" />
                  <span>
                    {t('donation_page.transparency_note')}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Committee Contacts for Donation Assistance */}
        <div className="p-8 rounded-3xl bg-cream-50 border-2 border-gold-300 shadow-elevation">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase text-saffron-800 block mb-1">
              {lang === 'hi' ? 'सहयोग एवं पावती हेतु संपर्क' : 'Assistance & Receipts'}
            </span>
            <h3 className="text-xl font-bold font-hindi text-devotional-brown">
              {t('donation_page.need_help')}
            </h3>
            <p className="text-xs text-devotional-muted mt-1 font-hindi">
              आर्थिक सहयोग करने के उपरांत पावती अथवा रसीद हेतु नीचे दिए गए पदाधिकारियों से संपर्क कर सकते हैं:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-cream-100 border border-gold-300/80 text-center">
              <span className="text-[11px] font-bold text-saffron-800 uppercase block">
                {t('home.president')}
              </span>
              <span className="font-bold text-sm font-hindi text-devotional-brown block mt-0.5">
                श्री रामानन्द सिंह
              </span>
              <a href="tel:9971472216" className="text-xs font-bold text-vermilion-700 hover:underline mt-1 inline-flex items-center gap-1">
                <Phone className="w-3 h-3" /> 9971472216
              </a>
            </div>

            <div className="p-4 rounded-xl bg-cream-100 border border-gold-300/80 text-center">
              <span className="text-[11px] font-bold text-saffron-800 uppercase block">
                {t('home.gen_sec')}
              </span>
              <span className="font-bold text-sm font-hindi text-devotional-brown block mt-0.5">
                श्री अशोक सिंह
              </span>
              <a href="tel:7982713291" className="text-xs font-bold text-vermilion-700 hover:underline mt-1 inline-flex items-center gap-1">
                <Phone className="w-3 h-3" /> 7982713291
              </a>
            </div>

            <div className="p-4 rounded-xl bg-cream-100 border border-gold-300/80 text-center">
              <span className="text-[11px] font-bold text-saffron-800 uppercase block">
                {t('home.treasurer')}
              </span>
              <span className="font-bold text-sm font-hindi text-devotional-brown block mt-0.5">
                श्री उमेश शर्मा
              </span>
              <a href="tel:9312712790" className="text-xs font-bold text-vermilion-700 hover:underline mt-1 inline-flex items-center gap-1">
                <Phone className="w-3 h-3" /> 9312712790
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Enlarged QR Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-sm w-full border-2 border-gold-400 text-center relative shadow-2xl">
            <h3 className="font-bold text-lg font-hindi text-devotional-brown mb-3">
              {lang === 'hi' ? 'राणाजी छठ पूजा पार्क समिति QR' : 'Official Committee QR Code'}
            </h3>
            <img
              src="/images/original_qr.png"
              alt="Enlarged QR Code"
              className="w-72 h-72 mx-auto object-contain bg-white p-2 rounded-xl border border-gold-300"
            />
            <p className="font-mono font-bold text-sm text-vermilion-800 mt-3 select-all">
              {verifiedUpiId}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-6 py-2 rounded-xl bg-devotional-brown text-white font-bold text-xs"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationPage;
