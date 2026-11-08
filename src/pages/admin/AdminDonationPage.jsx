import React, { useState, useEffect } from 'react';
import { Heart, Upload, Save, Check, AlertCircle, ShieldCheck, QrCode } from 'lucide-react';
import { api } from '../../services/api';

const AdminDonationPage = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [qrFile, setQrFile] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const fetchSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleQrUpload = async () => {
    if (!qrFile) return;
    try {
      const formData = new FormData();
      formData.append('image', qrFile);
      const uploadRes = await api.uploadFile(formData);
      if (uploadRes.success) {
        const updatedSettings = { ...settings, qr_code_image: uploadRes.url };
        setSettings(updatedSettings);
        await api.updateSettings(updatedSettings);
        setStatusMsg({ text: 'नया QR कोड सफलतापूर्वक अपलोड एवं अपडेट किया गया!', isError: false });
        setQrFile(null);
        setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
      }
    } catch (err) {
      setStatusMsg({ text: 'QR कोड अपलोड में त्रुटि हुई।', isError: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updateSettings(settings);
      if (res.success) {
        setStatusMsg({ text: 'आर्थिक सहयोग सेटिंग्स सफलतापूर्वक सहेजी गईं!', isError: false });
        setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
      }
    } catch (err) {
      setStatusMsg({ text: 'सहेजने में त्रुटि हुई।', isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-devotional-brown font-hindi">लोड हो रहा है...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-hindi text-devotional-brown">
          आर्थिक सहयोग एवं QR प्रबंधन (Donation Management)
        </h1>
        <p className="text-xs text-devotional-muted font-hindi mt-1">
          सत्यापित UPI ID, लाभार्थी खाता, बैंक विवरण एवं QR कोड प्रबंधन
        </p>
      </div>

      {statusMsg.text && (
        <div className={`p-3 rounded-xl text-xs font-hindi flex items-center gap-2 ${
          statusMsg.isError ? 'bg-red-50 text-red-800 border border-red-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
        }`}>
          {statusMsg.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* QR Code Upload / Preview Card */}
        <div className="md:col-span-5 bg-cream-50 rounded-2xl border-2 border-gold-300 p-6 shadow-elevation text-center space-y-4">
          <h2 className="text-sm font-bold uppercase text-saffron-800 font-sans">
            वर्तमान सक्रिय QR कोड
          </h2>

          <div className="p-4 bg-white rounded-xl border border-gold-300 inline-block shadow-sm">
            <img
              src={settings.qr_code_image || '/images/original_qr.png'}
              alt="Active QR"
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-devotional-brown">
              नया QR कोड बदलें (Upload / Replace)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setQrFile(e.target.files[0])}
              className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-saffron-600 file:text-white"
            />
            {qrFile && (
              <button
                type="button"
                onClick={handleQrUpload}
                className="w-full mt-2 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs"
              >
                अपलोड करें और सहेजें
              </button>
            )}
          </div>
        </div>

        {/* UPI Details Form */}
        <div className="md:col-span-7 bg-cream-50 rounded-2xl border-2 border-gold-300 p-6 shadow-elevation space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-hindi">
            <div>
              <label className="block font-bold text-devotional-brown mb-1">
                सत्यापित UPI ID (Verified UPI ID) *
              </label>
              <input
                type="text"
                required
                name="upi_id"
                value={settings.upi_id || ''}
                onChange={handleChange}
                placeholder="9971472216@indianbk"
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono text-vermilion-800 font-bold"
              />
              <span className="text-[10px] text-devotional-muted mt-0.5 block">
                मूल कार्ड से सत्यापित: 9971472216@indianbk
              </span>
            </div>

            <div>
              <label className="block font-bold text-devotional-brown mb-1">
                लाभार्थी नाम (Account Payee Name) *
              </label>
              <input
                type="text"
                required
                name="upi_payee_name"
                value={settings.upi_payee_name || ''}
                onChange={handleChange}
                placeholder="ranaji chhath pooja park samiti"
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
              />
            </div>

            <div>
              <label className="block font-bold text-devotional-brown mb-1">
                बैंक का नाम (Bank Name) *
              </label>
              <input
                type="text"
                required
                name="bank_name"
                value={settings.bank_name || ''}
                onChange={handleChange}
                placeholder="Indian Bank"
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow-warm transition-all"
              >
                {saving ? 'सहेजा जा रहा है...' : 'विवरण सहेजें (Save UPI Details)'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDonationPage;

