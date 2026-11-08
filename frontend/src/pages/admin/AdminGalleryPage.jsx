import React, { useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Edit, Plus, Check, AlertCircle, X, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';

const AdminGalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const [form, setForm] = useState({
    title_hi: '',
    title_en: '',
    category: 'chhath-2026',
    caption_hi: '',
    caption_en: '',
    order_index: 0,
    image_url: ''
  });

  const fetchItems = async () => {
    try {
      const res = await api.getGallery();
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setStatusMsg({ text: '', isError: false });

    try {
      if (selectedFile) {
        const data = new FormData();
        data.append('image', selectedFile);
        data.append('title_hi', form.title_hi || 'छठ पूजा उत्सव');
        data.append('title_en', form.title_en || 'Chhath Celebration');
        data.append('category', form.category);
        data.append('caption_hi', form.caption_hi);
        data.append('caption_en', form.caption_en);
        data.append('order_index', form.order_index);

        const res = await api.uploadGalleryImage(data);
        if (res.success) {
          setStatusMsg({ text: 'तस्वीर सफलतापूर्वक अपलोड की गई!', isError: false });
        }
      } else if (form.image_url) {
        const res = await api.createGalleryItem(form);
        if (res.success) {
          setStatusMsg({ text: 'तस्वीर लिंक सफलतापूर्वक जोड़ी गई!', isError: false });
        }
      } else {
        alert('कृपया फाइल चुनें अथवा इमेज URL दर्ज करें।');
        setUploading(false);
        return;
      }

      setModalOpen(false);
      setSelectedFile(null);
      setForm({
        title_hi: '',
        title_en: '',
        category: 'chhath-2026',
        caption_hi: '',
        caption_en: '',
        order_index: 0,
        image_url: ''
      });
      fetchItems();
      setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
    } catch (err) {
      setStatusMsg({ text: 'अपलोड विफल रहा।', isError: true });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप निश्चित रूप से इस तस्वीर को हटाना चाहते हैं?')) return;
    try {
      const res = await api.deleteGalleryItem(id);
      if (res.success) {
        fetchItems();
        setStatusMsg({ text: 'तस्वीर हटा दी गई।', isError: false });
        setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
      }
    } catch (err) {
      alert('हटाने में त्रुटि हुई।');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-hindi text-devotional-brown">
            गैलरी प्रबंधन (Gallery Management)
          </h1>
          <p className="text-xs text-devotional-muted font-hindi mt-1">
            वेबसाइट गैलरी में नई तस्वीरें अपलोड करें, श्रेणीबद्ध करें एवं व्यवस्थित करें
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start"
        >
          <Upload className="w-4 h-4" />
          <span>नई तस्वीर अपलोड करें (Upload Image)</span>
        </button>
      </div>

      {statusMsg.text && (
        <div className={`p-3 rounded-xl text-xs font-hindi flex items-center gap-2 ${
          statusMsg.isError ? 'bg-red-50 text-red-800 border border-red-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
        }`}>
          {statusMsg.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Grid of gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-cream-50 rounded-2xl border border-gold-300 overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div className="h-44 bg-cream-200 relative overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title_hi}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                {item.category}
              </span>
            </div>

            <div className="p-3">
              <h3 className="font-bold text-xs font-hindi text-devotional-brown truncate">
                {item.title_hi}
              </h3>
              {item.caption_hi && (
                <p className="text-[11px] text-devotional-muted truncate font-hindi mt-0.5">
                  {item.caption_hi}
                </p>
              )}
            </div>

            <div className="p-3 pt-0 border-t border-gold-200/40 flex items-center justify-between mt-1">
              <span className="text-[10px] text-devotional-muted font-mono">
                Order: {item.order_index}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 rounded text-red-600 hover:bg-red-50"
                title="हटाएं"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-md w-full border-2 border-gold-400 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gold-200 mb-4">
              <h3 className="font-bold text-base font-hindi text-devotional-brown">
                नई तस्वीर अपलोड करें (Upload Photo)
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-devotional-muted hover:text-devotional-brown">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs font-hindi">
              <div>
                <label className="block font-bold text-devotional-brown mb-1">तस्वीर फाइल चुनें (Select File)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full p-2 rounded-xl border border-gold-300 bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-saffron-600 file:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">शीर्षक (Title Hindi) *</label>
                <input
                  type="text"
                  required
                  value={form.title_hi}
                  onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                  placeholder="उदा. सायंकाल अर्घ्य उत्सव"
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">श्रेणी (Category)</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                >
                  <option value="chhath-2026">छठ पूजा 2026</option>
                  <option value="past-years">पिछले वर्षों के आयोजन</option>
                  <option value="religious">धार्मिक कार्यक्रम</option>
                  <option value="cultural">सांस्कृतिक कार्यक्रम</option>
                  <option value="samiti-activities">समिति की गतिविधियां</option>
                  <option value="other">अन्य तस्वीरें</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">कैप्शन / विवरण (Caption)</label>
                <textarea
                  rows="2"
                  value={form.caption_hi}
                  onChange={(e) => setForm({ ...form, caption_hi: e.target.value })}
                  placeholder="तस्वीर का संक्षिप्त विवरण..."
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gold-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gold-300 text-devotional-brown"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl bg-saffron-600 text-white font-bold"
                >
                  {uploading ? 'अपलोड हो रहा है...' : 'अपलोड करें (Upload)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryPage;

