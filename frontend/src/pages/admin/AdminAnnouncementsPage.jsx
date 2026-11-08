import React, { useState, useEffect } from 'react';
import { Bell, Plus, Edit, Trash2, Check, AlertCircle, X, Eye, EyeOff } from 'lucide-react';
import { api } from '../../services/api';

const AdminAnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const initialForm = {
    title_hi: '',
    title_en: '',
    message_hi: '',
    message_en: '',
    is_active: 1,
    priority: 0
  };

  const [form, setForm] = useState(initialForm);

  const fetchAnnouncements = async () => {
    try {
      const res = await api.getAnnouncements(true); // all = true
      if (res.success && res.announcements) {
        setAnnouncements(res.announcements);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm({
      title_hi: item.title_hi || '',
      title_en: item.title_en || '',
      message_hi: item.message_hi || '',
      message_en: item.message_en || '',
      is_active: item.is_active ? 1 : 0,
      priority: item.priority || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.updateAnnouncement(editingId, form);
        if (res.success) {
          setStatusMsg({ text: 'सूचना सफलतापूर्वक अपडेट की गई!', isError: false });
        }
      } else {
        const res = await api.createAnnouncement(form);
        if (res.success) {
          setStatusMsg({ text: 'नई सूचना सफलतापूर्वक जोड़ी गई!', isError: false });
        }
      }
      setModalOpen(false);
      fetchAnnouncements();
      setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
    } catch (err) {
      setStatusMsg({ text: 'ऑपरेशन विफल रहा।', isError: true });
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.toggleAnnouncement(id);
      if (res.success) {
        fetchAnnouncements();
      }
    } catch (err) {
      alert('स्थिति बदलने में त्रुटि हुई।');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप निश्चित रूप से इस सूचना को हटाना चाहते हैं?')) return;
    try {
      const res = await api.deleteAnnouncement(id);
      if (res.success) {
        fetchAnnouncements();
        setStatusMsg({ text: 'सूचना हटा दी गई।', isError: false });
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
            सूचना प्रबंधन (Announcements Management)
          </h1>
          <p className="text-xs text-devotional-muted font-hindi mt-1">
            वेबसाइट पर प्रदर्शित होने वाली नई घोषणाएं, अलर्ट एवं नोटिस प्रबंधित करें
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>नई सूचना जोड़ें (Add Notice)</span>
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

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              item.is_active
                ? 'bg-cream-50 border-gold-300 shadow-sm'
                : 'bg-cream-100/60 border-gold-200/60 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.is_active ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-cream-200 text-devotional-muted'
                }`}>
                  {item.is_active ? 'सक्रिय (Live)' : 'निष्क्रिय (Hidden)'}
                </span>
                <span className="text-[10px] text-devotional-muted font-mono">
                  Priority: {item.priority}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base font-hindi text-devotional-brown">
                {item.title_hi}
              </h3>
              <p className="text-xs text-devotional-muted font-hindi">
                {item.message_hi}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleToggle(item.id)}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 ${
                  item.is_active
                    ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                }`}
                title="स्थिति बदलें"
              >
                {item.is_active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{item.is_active ? 'छिपाएं' : 'सक्रिय करें'}</span>
              </button>

              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-xl bg-cream-200 hover:bg-gold-200 text-devotional-brown"
                title="संपादित करें"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700"
                title="हटाएं"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-md w-full border-2 border-gold-400 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gold-200 mb-4">
              <h3 className="font-bold text-base font-hindi text-devotional-brown">
                {editingId ? 'सूचना संपादित करें' : 'नई सूचना जोड़ें'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-devotional-muted hover:text-devotional-brown">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-hindi">
              <div>
                <label className="block font-bold text-devotional-brown mb-1">शीर्षक (Title Hindi) *</label>
                <input
                  type="text"
                  required
                  value={form.title_hi}
                  onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                  placeholder="उदा. वेदी व्यवस्था सूचना"
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">संदेश (Message Hindi) *</label>
                <textarea
                  rows="3"
                  required
                  value={form.message_hi}
                  onChange={(e) => setForm({ ...form, message_hi: e.target.value })}
                  placeholder="घोषणा का पूर्ण विवरण..."
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">स्थिति (Visibility)</label>
                  <select
                    value={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                  >
                    <option value={1}>सक्रिय (Active)</option>
                    <option value={0}>निष्क्रिय (Hidden)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-devotional-brown mb-1">प्राथमिकता (Priority)</label>
                  <input
                    type="number"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono"
                  />
                </div>
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
                  className="px-5 py-2 rounded-xl bg-saffron-600 text-white font-bold"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncementsPage;

