import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, CheckCircle, Mail, Phone, Calendar, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });

  const fetchEnquiries = async () => {
    try {
      const res = await api.getEnquiries();
      if (res.success && res.enquiries) {
        setEnquiries(res.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const res = await api.markEnquiryRead(id);
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, is_read: 1 } : e))
        );
      }
    } catch (err) {
      alert('त्रुटि हुई।');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप इस संदेश को हटाना चाहते हैं?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        setStatusMsg({ text: 'संदेश हटा दिया गया।', isError: false });
        setTimeout(() => setStatusMsg({ text: '', isError: false }), 2500);
      }
    } catch (err) {
      alert('हटाने में त्रुटि हुई।');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-hindi text-devotional-brown">
          प्राप्त संदेश एवं पूछताछ (Enquiries Inbox)
        </h1>
        <p className="text-xs text-devotional-muted font-hindi mt-1">
          वेबसाइट संपर्क प्रपत्र से भक्तों द्वारा भेजे गए सभी संदेश एवं विवरण
        </p>
      </div>

      {statusMsg.text && (
        <div className={`p-3 rounded-xl text-xs font-hindi flex items-center gap-2 ${
          statusMsg.isError ? 'bg-red-50 text-red-800 border border-red-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
        }`}>
          {statusMsg.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-devotional-muted font-hindi">लोड हो रहा है...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 bg-cream-50 rounded-2xl border border-gold-300 p-8">
          <MessageSquare className="w-12 h-12 text-gold-400 mx-auto mb-2" />
          <h3 className="font-bold text-devotional-brown font-hindi">कोई संदेश उपलब्ध नहीं है</h3>
          <p className="text-xs text-devotional-muted mt-1">
            वेबसाइट से प्राप्त होने वाले सभी संदेश यहाँ प्रदर्शित होंगे।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className={`p-6 rounded-2xl border-2 transition-all space-y-3 ${
                enq.is_read
                  ? 'bg-cream-50/70 border-gold-300/60'
                  : 'bg-cream-50 border-saffron-500 shadow-warm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold-200/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base font-hindi text-devotional-brown">
                    {enq.name}
                  </span>
                  {!enq.is_read && (
                    <span className="px-2 py-0.5 rounded-full bg-saffron-100 text-saffron-800 text-[10px] font-bold border border-saffron-300">
                      नया (New)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-devotional-muted font-mono">
                  <span>{enq.created_at}</span>
                  <div className="flex items-center gap-1.5">
                    {!enq.is_read && (
                      <button
                        onClick={() => handleMarkRead(enq.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200 transition-colors"
                        title="पढ़ा हुआ चिह्नित करें"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="संदेश हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <a
                  href={`tel:${enq.phone}`}
                  className="font-bold text-saffron-800 hover:underline flex items-center gap-1 font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-saffron-600" />
                  <span>{enq.phone}</span>
                </a>
                {enq.email && (
                  <a
                    href={`mailto:${enq.email}`}
                    className="text-devotional-muted hover:underline flex items-center gap-1 font-sans"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{enq.email}</span>
                  </a>
                )}
              </div>

              {/* Subject & Message */}
              <div>
                <h4 className="font-bold text-sm text-devotional-brown font-hindi">
                  विषय: {enq.subject}
                </h4>
                <p className="text-xs sm:text-sm text-devotional-brown/90 mt-1 font-hindi leading-relaxed bg-cream-100/70 p-3 rounded-xl border border-gold-200/50">
                  {enq.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesPage;

