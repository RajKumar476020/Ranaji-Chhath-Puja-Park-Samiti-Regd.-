import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit, Trash2, Check, AlertCircle, X, MapPin } from 'lucide-react';
import { api } from '../../services/api';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const initialForm = {
    title_hi: '',
    title_en: '',
    start_date: '',
    end_date: '',
    location_hi: 'राणाजी छठ पूजा पार्क (MCD पार्क), राणाजी एन्क्लेव, नजफगढ़, नई दिल्ली – 110043',
    location_en: 'Ranaji Chhath Puja Park (MCD Park), Ranaji Enclave, Najafgarh, New Delhi – 110043',
    description_hi: '',
    description_en: '',
    status: 'upcoming',
    featured: 1,
    image_url: '/images/img_20_offset_6306509.jpg'
  };

  const [form, setForm] = useState(initialForm);

  const fetchEvents = async () => {
    try {
      const res = await api.getEvents();
      if (res.success && res.events) {
        setEvents(res.events);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingId(event.id);
    setForm({
      title_hi: event.title_hi || '',
      title_en: event.title_en || '',
      start_date: event.start_date || '',
      end_date: event.end_date || '',
      location_hi: event.location_hi || '',
      location_en: event.location_en || '',
      description_hi: event.description_hi || '',
      description_en: event.description_en || '',
      status: event.status || 'upcoming',
      featured: event.featured ? 1 : 0,
      image_url: event.image_url || '/images/img_20_offset_6306509.jpg'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.updateEvent(editingId, form);
        if (res.success) {
          setStatusMsg({ text: 'कार्यक्रम सफलतापूर्वक अपडेट किया गया!', isError: false });
        }
      } else {
        const res = await api.createEvent(form);
        if (res.success) {
          setStatusMsg({ text: 'नया कार्यक्रम सफलतापूर्वक जोड़ा गया!', isError: false });
        }
      }
      setModalOpen(false);
      fetchEvents();
      setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
    } catch (err) {
      setStatusMsg({ text: 'ऑपरेशन विफल रहा।', isError: true });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप निश्चित रूप से इस कार्यक्रम को हटाना चाहते हैं?')) return;
    try {
      const res = await api.deleteEvent(id);
      if (res.success) {
        fetchEvents();
        setStatusMsg({ text: 'कार्यक्रम हटा दिया गया।', isError: false });
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
            कार्यक्रम प्रबंधन (Events Management)
          </h1>
          <p className="text-xs text-devotional-muted font-hindi mt-1">
            छठ महापर्व एवं अन्य कार्यक्रमों का विवरण, तिथियां एवं स्थिति अपडेट करें
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>नया कार्यक्रम जोड़ें (Add Event)</span>
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

      {/* Events List */}
      <div className="bg-cream-50 rounded-2xl border border-gold-300 shadow-elevation overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-hindi">
            <thead className="bg-cream-100 text-devotional-muted uppercase border-b border-gold-200">
              <tr>
                <th className="py-3 px-4">शीर्षक (Title)</th>
                <th className="py-3 px-4">प्रारंभ तिथि</th>
                <th className="py-3 px-4">समापन तिथि</th>
                <th className="py-3 px-4">स्थान</th>
                <th className="py-3 px-4">स्थिति (Status)</th>
                <th className="py-3 px-4 text-right">कार्रवाई (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-200/60">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-gold-50/50">
                  <td className="py-3 px-4 font-bold text-devotional-brown">
                    <div>{ev.title_hi}</div>
                    <div className="text-[10px] text-devotional-muted font-sans">{ev.title_en}</div>
                  </td>
                  <td className="py-3 px-4 font-mono">{ev.start_date}</td>
                  <td className="py-3 px-4 font-mono">{ev.end_date}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{ev.location_hi}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ev.status === 'upcoming' ? 'bg-saffron-100 text-saffron-800' : (ev.status === 'ongoing' ? 'bg-vermilion-100 text-vermilion-800' : 'bg-emerald-100 text-emerald-800')
                    }`}>
                      {ev.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(ev)}
                        className="p-1.5 rounded-lg bg-cream-200 hover:bg-gold-200 text-devotional-brown"
                        title="संपादित करें"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                        title="हटाएं"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-lg w-full border-2 border-gold-400 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gold-200 mb-4">
              <h3 className="font-bold text-base font-hindi text-devotional-brown">
                {editingId ? 'कार्यक्रम संपादित करें (Edit Event)' : 'नया कार्यक्रम जोड़ें (New Event)'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-devotional-muted hover:text-devotional-brown">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-hindi">
              <div>
                <label className="block font-bold text-devotional-brown mb-1">कार्यक्रम शीर्षक (हिन्दी) *</label>
                <input
                  type="text"
                  required
                  value={form.title_hi}
                  onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                  placeholder="उदा. छठ महापर्व 2026"
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">Title (English)</label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  placeholder="e.g. Chhath Mahaparv 2026"
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">प्रारंभ तिथि (Start Date) *</label>
                  <input
                    type="date"
                    required
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                  />
                </div>
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">समापन तिथि (End Date) *</label>
                  <input
                    type="date"
                    required
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">स्थान (Location)</label>
                <input
                  type="text"
                  value={form.location_hi}
                  onChange={(e) => setForm({ ...form, location_hi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">विवरण (Description)</label>
                <textarea
                  rows="3"
                  value={form.description_hi}
                  onChange={(e) => setForm({ ...form, description_hi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">स्थिति (Status)</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                  >
                    <option value="upcoming">upcoming (आगामी)</option>
                    <option value="ongoing">ongoing (जारी है)</option>
                    <option value="completed">completed (सम्पन्न)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-devotional-brown mb-1">मुख्य पृष्ठ पर दिखाएँ (Featured)</label>
                  <select
                    value={form.featured}
                    onChange={(e) => setForm({ ...form, featured: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                  >
                    <option value={1}>हाँ (Featured on Home)</option>
                    <option value={0}>नहीं (Normal)</option>
                  </select>
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
                  सहेजें (Save Event)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;

