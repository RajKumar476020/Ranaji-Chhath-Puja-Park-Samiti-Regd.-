import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, QrCode, Copy, Check, Download, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const DonationPreviewSection = () => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Exact verified payment information extracted from Page 3 original QR code
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
    <section className="py-20 bg-devotional-gradient relative overflow-hidden border-t border-gold-300/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto bg-cream-50 rounded-3xl border-2 border-gold-400 shadow-elevation overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-saffron-700 via-vermilion-700 to-saffron-700 text-white px-6 py-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-gold-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>{lang === 'hi' ? 'पुण्य का कार्य' : 'Sacred Seva'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-hindi leading-tight">
              {t('home.donation_heading')}
            </h2>
            <p className="text-xs sm:text-sm text-cream-100 font-hindi max-w-xl mx-auto mt-2">
              {t('home.donation_sub')}
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* QR Code Presentation Column */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative p-4 rounded-2xl bg-white border-2 border-gold-400 shadow-warm">
                  {/* Original Verified QR Code extracted from PDF Page 3 */}
                  <img
                    src="/images/original_qr.png"
                    alt="Official Ranaji Chhath Puja Samiti Donation QR Code"
                    className="w-56 h-56 sm:w-60 sm:h-60 object-contain rounded-lg"
                  />
                  {/* Verified Watermark Badge */}
                  <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 py-1 rounded border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'समिति का मूल सत्यापित QR कोड' : 'Official Verified Samiti QR'}</span>
                  </div>
                </div>

                {/* QR Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <a
                    href="/images/original_qr.png"
                    download="Ranaji_Chhath_Puja_Samiti_QR.png"
                    className="px-3 py-1.5 rounded-lg bg-gold-100 hover:bg-gold-200 text-devotional-brown text-xs font-bold flex items-center gap-1.5 border border-gold-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-saffron-700" />
                    <span>{t('common.download_qr')}</span>
                  </a>

                  <button
                    onClick={() => setShowModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-gold-50 text-devotional-brown text-xs font-bold border border-gold-300 transition-colors"
                  >
                    <span>{t('common.enlarge_qr')}</span>
                  </button>
                </div>
              </div>

              {/* Instructions and Verified UPI Details Column */}
              <div className="md:col-span-7 space-y-5">
                
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-800 font-sans">
                    {lang === 'hi' ? 'स्कैन एवं भुगतान निर्देश' : 'Scan & Pay Details'}
                  </span>
                  <h3 className="text-xl font-bold font-hindi text-devotional-brown">
                    {lang === 'hi' ? 'किसी भी UPI ऐप से सीधे सहयोग करें' : 'Donate via any UPI Application'}
                  </h3>
                  <p className="text-xs sm:text-sm text-devotional-muted font-hindi">
                    Google Pay, PhonePe, Paytm, BHIM अथवा अपने बैंक के मोबाइल ऐप द्वारा ऊपर दिए गए QR कोड को स्कैन करें।
                  </p>
                </div>

                {/* Verified Payment Credential Card */}
                <div className="p-4 rounded-xl bg-cream-100 border border-gold-300 space-y-3">
                  {/* Verified UPI ID */}
                  <div>
                    <span className="text-[11px] font-bold text-devotional-muted uppercase tracking-wider block">
                      {lang === 'hi' ? 'सत्यापित UPI ID' : 'Verified UPI ID'}
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

                  {/* Beneficiary Name & Bank */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gold-200/80 text-xs">
                    <div>
                      <span className="text-devotional-muted block text-[10px] font-semibold uppercase">
                        {lang === 'hi' ? 'लाभार्थी खाता' : 'Account Name'}
                      </span>
                      <span className="font-bold text-devotional-brown capitalize">
                        {verifiedPayee}
                      </span>
                    </div>
                    <div>
                      <span className="text-devotional-muted block text-[10px] font-semibold uppercase">
                        {lang === 'hi' ? 'बैंक' : 'Bank'}
                      </span>
                      <span className="font-bold text-devotional-brown">
                        {bankName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Direct Pay Intent Button (visible on mobile) */}
                <div className="pt-1">
                  <a
                    href={upiIntentUri}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-vermilion-700 to-saffron-600 hover:from-vermilion-800 hover:to-saffron-700 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 active:scale-98 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'UPI ऐप में खोलें (Mobile Pay)' : 'Open in UPI App (Mobile Pay)'}</span>
                  </a>
                </div>

                {/* Transparency Note (strict compliance with prompt requirement) */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-gold-100/40 border border-gold-300/50 text-[11px] text-devotional-brown leading-relaxed font-hindi">
                  <Info className="w-4 h-4 text-saffron-700 flex-shrink-0 mt-0.5" />
                  <span>
                    {lang === 'hi'
                      ? 'पारदर्शिता सूचना: QR कोड के माध्यम से भुगतान सीधे आपके अधिकृत बैंकिंग/UPI ऐप द्वारा प्रोसेस होता है, वेबसाइट द्वारा नहीं। किसी भी सहायता अथवा पावती हेतु समिति पदाधिकारियों से संपर्क करें।'
                      : 'Transparency Note: QR payments are processed directly by your authorized banking/UPI application and not through this website.'}
                  </span>
                </div>

                <div className="pt-1 text-center sm:text-left">
                  <Link
                    to="/donations"
                    className="text-xs font-bold text-saffron-700 hover:text-saffron-900 hover:underline transition-colors"
                  >
                    {lang === 'hi' ? 'आर्थिक सहयोग पृष्ठ पर संपूर्ण विवरण देखें →' : 'View full details on Donations page →'}
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Enlarged QR Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-sm w-full border-2 border-gold-400 text-center relative shadow-2xl animate-scaleUp">
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
    </section>
  );
};

export default DonationPreviewSection;

