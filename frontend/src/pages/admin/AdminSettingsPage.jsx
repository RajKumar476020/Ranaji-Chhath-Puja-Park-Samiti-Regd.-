import React, { useState, useEffect } from 'react';
import { Settings, Save, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updateSettings(settings);
      if (res.success) {
        setStatusMsg({ text: 'सेटिंग्स सफलतापूर्वक अपडेट की गईं!', isError: false });
        setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
      }
    } catch (err) {
      setStatusMsg({ text: 'सेव करने में त्रुटि हुई।', isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-devotional-brown font-hindi">लोड हो रहा है...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-hindi text-devotional-brown">
          वेबसाइट सेटिंग्स (Website Settings)
        </h1>
        <p className="text-xs text-devotional-muted font-hindi mt-1">
          समिति का नाम, टैगलाइन, पता, फोन नंबर एवं मुख्य विवरण अपडेट करें
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

      <form onSubmit={handleSubmit} className="bg-cream-50 rounded-2xl border-2 border-gold-300 p-6 sm:p-8 shadow-elevation space-y-6 text-xs font-hindi">
        
        {/* Samiti Name & Tagline */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-saffron-800 pb-2 border-b border-gold-200">
            समिति का नाम एवं टैगलाइन
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-devotional-brown mb-1">समिति का नाम (हिन्दी)</label>
              <input
                type="text"
                name="samiti_name_hi"
                value={settings.samiti_name_hi || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-devotional-brown mb-1">Samiti Name (English)</label>
              <input
                type="text"
                name="samiti_name_en"
                value={settings.samiti_name_en || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-devotional-brown mb-1">टैगलाइन (हिन्दी)</label>
              <input
                type="text"
                name="tagline_hi"
                value={settings.tagline_hi || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-devotional-brown mb-1">Tagline (English)</label>
              <input
                type="text"
                name="tagline_en"
                value={settings.tagline_en || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
              />
            </div>
          </div>
        </div>

        {/* Leadership Contact Numbers */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-saffron-800 pb-2 border-b border-gold-200">
            प्रमुख संपर्क सूत्र (Phone Numbers)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-devotional-brown mb-1">अध्यक्ष फोन (President)</label>
              <input
                type="tel"
                name="phone_president"
                value={settings.phone_president || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-devotional-brown mb-1">महासचिव फोन (Gen Secretary)</label>
              <input
                type="tel"
                name="phone_gen_sec"
                value={settings.phone_gen_sec || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-devotional-brown mb-1">कोषाध्यक्ष फोन (Treasurer)</label>
              <input
                type="tel"
                name="phone_treasurer"
                value={settings.phone_treasurer || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Address and Landmark */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-saffron-800 pb-2 border-b border-gold-200">
            पता एवं स्थल पहचान (Address & Landmark)
          </h2>

          <div>
            <label className="block font-bold text-devotional-brown mb-1">पूर्ण पता (हिन्दी)</label>
            <textarea
              name="address_hi"
              rows="2"
              value={settings.address_hi || ''}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-devotional-brown mb-1">Full Address (English)</label>
            <textarea
              name="address_en"
              rows="2"
              value={settings.address_en || ''}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-devotional-brown mb-1">मेट्रो लैंडमार्क (Metro Landmark)</label>
            <input
              type="text"
              name="metro_landmark"
              value={settings.metro_landmark || ''}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
            />
          </div>
        </div>

        {/* Announcement Ticker Text */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-saffron-800 pb-2 border-b border-gold-200">
            शीर्ष घोषणा पट्टी (Top Announcement Bar)
          </h2>

          <div>
            <label className="block font-bold text-devotional-brown mb-1">घोषणा संदेश (हिन्दी)</label>
            <input
              type="text"
              name="announcement_bar_text_hi"
              value={settings.announcement_bar_text_hi || ''}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-devotional-brown mb-1">Announcement Message (English)</label>
            <input
              type="text"
              name="announcement_bar_text_en"
              value={settings.announcement_bar_text_en || ''}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gold-200 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm shadow-warm flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'सहेजा जा रहा है...' : 'सेटिंग्स सहेजें (Save Settings)'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettingsPage;

