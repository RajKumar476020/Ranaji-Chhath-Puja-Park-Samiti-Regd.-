import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Search, Check, AlertCircle, X, Shield, Phone } from 'lucide-react';
import { api } from '../../services/api';

const AdminCommitteePage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const initialForm = {
    name_hi: '',
    name_en: '',
    designation_hi: 'कार्यकारिणी सदस्य',
    designation_en: 'Executive Committee Member',
    phone: '',
    order_index: '',
    is_leadership: 0
  };

  const [form, setForm] = useState(initialForm);

  const fetchMembers = async () => {
    try {
      const res = await api.getCommittee();
      if (res.success && res.members) {
        setMembers(res.members);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      ...initialForm,
      order_index: members.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingId(member.id);
    setForm({
      name_hi: member.name_hi || '',
      name_en: member.name_en || '',
      designation_hi: member.designation_hi || 'कार्यकारिणी सदस्य',
      designation_en: member.designation_en || 'Executive Committee Member',
      phone: member.phone || '',
      order_index: member.order_index,
      is_leadership: member.is_leadership ? 1 : 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.updateMember(editingId, form);
        if (res.success) {
          setStatusMsg({ text: 'सदस्य विवरण सफलतापूर्वक अपडेट किया गया!', isError: false });
        }
      } else {
        const res = await api.createMember(form);
        if (res.success) {
          setStatusMsg({ text: 'नया सदस्य सफलतापूर्वक जोड़ा गया!', isError: false });
        }
      }
      setModalOpen(false);
      fetchMembers();
      setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
    } catch (err) {
      setStatusMsg({ text: 'ऑपरेशन विफल रहा।', isError: true });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`क्या आप निश्चित रूप से '${name}' को हटाना चाहते हैं?`)) return;
    try {
      const res = await api.deleteMember(id);
      if (res.success) {
        fetchMembers();
        setStatusMsg({ text: 'सदस्य हटा दिया गया।', isError: false });
        setTimeout(() => setStatusMsg({ text: '', isError: false }), 3000);
      }
    } catch (err) {
      alert('हटाने में त्रुटि हुई।');
    }
  };

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (m.name_hi || '').toLowerCase().includes(q) || (m.name_en || '').toLowerCase().includes(q) || String(m.order_index) === q;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-hindi text-devotional-brown">
            कार्यकारिणी प्रबंधन (Committee Management)
          </h1>
          <p className="text-xs text-devotional-muted font-hindi mt-1">
            समिति के सभी 66 सदस्यों की सूची, नाम संपादन, पद, फोन नंबर एवं क्रम व्यवस्था
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>नया सदस्य जोड़ें (Add Member)</span>
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

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-cream-50 p-4 rounded-2xl border border-gold-300">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-devotional-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="सदस्य का नाम अथवा क्रमांक खोजें..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gold-300 text-xs bg-white font-hindi"
          />
        </div>
        <span className="text-xs text-devotional-muted font-hindi">
          कुल सदस्य: <strong>{members.length}</strong> (दिख रहे हैं: {filteredMembers.length})
        </span>
      </div>

      {/* Members Table */}
      <div className="bg-cream-50 rounded-2xl border border-gold-300 shadow-elevation overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-hindi">
            <thead className="bg-cream-100 text-devotional-muted uppercase border-b border-gold-200">
              <tr>
                <th className="py-3 px-3 w-16 text-center">क्र. (No.)</th>
                <th className="py-3 px-4">नाम (हिन्दी)</th>
                <th className="py-3 px-4">Name (English)</th>
                <th className="py-3 px-4">पद (Designation)</th>
                <th className="py-3 px-4">फोन नंबर</th>
                <th className="py-3 px-4 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-200/60">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-gold-50/50">
                  <td className="py-2.5 px-3 text-center font-bold font-sans text-saffron-800">
                    {m.order_index}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-devotional-brown">
                    {m.name_hi}
                    {m.is_leadership ? (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-vermilion-100 text-vermilion-800 border border-vermilion-300">
                        प्रमुख पदाधिकारी
                      </span>
                    ) : null}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-devotional-muted">{m.name_en}</td>
                  <td className="py-2.5 px-4">{m.designation_hi}</td>
                  <td className="py-2.5 px-4 font-mono text-saffron-900">{m.phone || '-'}</td>
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(m)}
                        className="p-1.5 rounded-lg bg-cream-200 hover:bg-gold-200 text-devotional-brown"
                        title="संपादित करें"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.name_hi)}
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

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-md w-full border-2 border-gold-400 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gold-200 mb-4">
              <h3 className="font-bold text-base font-hindi text-devotional-brown">
                {editingId ? 'सदस्य विवरण संपादित करें' : 'नया सदस्य जोड़ें'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-devotional-muted hover:text-devotional-brown">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-hindi">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block font-bold text-devotional-brown mb-1">क्रमांक (Order)</label>
                  <input
                    type="number"
                    required
                    value={form.order_index}
                    onChange={(e) => setForm({ ...form, order_index: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block font-bold text-devotional-brown mb-1">सदस्य का नाम (हिन्दी) *</label>
                  <input
                    type="text"
                    required
                    value={form.name_hi}
                    onChange={(e) => setForm({ ...form, name_hi: e.target.value })}
                    placeholder="उदा. श्री रामानन्द सिंह"
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">Member Name (English)</label>
                <input
                  type="text"
                  value={form.name_en}
                  onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                  placeholder="e.g. Shri Ramanand Singh"
                  className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">पद (Designation Hindi)</label>
                  <input
                    type="text"
                    value={form.designation_hi}
                    onChange={(e) => setForm({ ...form, designation_hi: e.target.value })}
                    placeholder="कार्यकारिणी सदस्य / अध्यक्ष"
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">Designation (English)</label>
                  <input
                    type="text"
                    value={form.designation_en}
                    onChange={(e) => setForm({ ...form, designation_en: e.target.value })}
                    placeholder="Executive Member / President"
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-devotional-brown mb-1">मोबाइल फोन</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="9971472216"
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-devotional-brown mb-1">प्रमुख नेतृत्व (Leadership)</label>
                  <select
                    value={form.is_leadership}
                    onChange={(e) => setForm({ ...form, is_leadership: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-gold-300 bg-white"
                  >
                    <option value={0}>सामान्य सदस्य</option>
                    <option value={1}>हाँ (शीर्ष नेतृत्व कार्ड)</option>
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
                  सहेजें (Save)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommitteePage;

