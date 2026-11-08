import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Camera, Users, MessageSquare, Bell, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../services/api';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getStats();
        if (res.success) {
          setStats(res);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-devotional-brown font-hindi">डैशबोर्ड लोड हो रहा है...</div>;
  }

  const statCards = [
    { label: 'कुल कार्यकारिणी सदस्य', value: stats?.stats?.totalMembers || 66, icon: Users, color: 'from-amber-500 to-saffron-600', link: '/admin/committee' },
    { label: 'कुल कार्यक्रम (Events)', value: stats?.stats?.totalEvents || 0, icon: Calendar, color: 'from-vermilion-700 to-saffron-600', link: '/admin/events' },
    { label: 'कुल गैलरी तस्वीरें', value: stats?.stats?.totalGallery || 0, icon: Camera, color: 'from-gold-600 to-amber-700', link: '/admin/gallery' },
    { label: 'प्राप्त संदेश (Enquiries)', value: stats?.stats?.totalEnquiries || 0, unread: stats?.stats?.unreadEnquiries || 0, icon: MessageSquare, color: 'from-emerald-600 to-teal-700', link: '/admin/enquiries' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-hindi text-devotional-brown leading-tight">
          प्रशासन डैशबोर्ड (Admin Overview)
        </h1>
        <p className="text-xs sm:text-sm text-devotional-muted mt-1 font-hindi">
          राणाजी छठ पूजा पार्क समिति (रजि.) की आधिकारिक वेबसाइट प्रबंधन
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-5 rounded-2xl bg-cream-50 border-2 border-gold-300 shadow-sm hover:border-gold-500 hover:shadow-warm transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-hindi text-devotional-muted">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-black text-devotional-brown font-sans">
                  {card.value}
                </span>
                {card.unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-300 animate-pulse">
                    {card.unread} नए संदेश
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Submissions */}
      <div className="bg-cream-50 rounded-2xl border border-gold-300 shadow-elevation p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-hindi text-devotional-brown flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-saffron-600" />
            <span>हाल ही में प्राप्त संदेश (Recent Enquiries)</span>
          </h2>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-saffron-700 hover:underline flex items-center gap-1"
          >
            <span>सभी देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {(!stats?.recentEnquiries || stats.recentEnquiries.length === 0) ? (
          <p className="text-xs text-devotional-muted py-4 font-hindi">
            कोई नया संदेश नहीं है।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-hindi">
              <thead className="bg-cream-100 text-devotional-muted uppercase border-b border-gold-200">
                <tr>
                  <th className="py-2.5 px-3">नाम</th>
                  <th className="py-2.5 px-3">फोन</th>
                  <th className="py-2.5 px-3">विषय</th>
                  <th className="py-2.5 px-3">दिनांक</th>
                  <th className="py-2.5 px-3">स्थिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-200/60">
                {stats.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gold-50/50">
                    <td className="py-2.5 px-3 font-bold text-devotional-brown">{enq.name}</td>
                    <td className="py-2.5 px-3 font-mono text-saffron-800">{enq.phone}</td>
                    <td className="py-2.5 px-3 max-w-xs truncate">{enq.subject}</td>
                    <td className="py-2.5 px-3 text-devotional-muted">{enq.created_at?.split(' ')[0] || 'आज'}</td>
                    <td className="py-2.5 px-3">
                      {enq.is_read ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cream-200 text-devotional-muted">पढ़ा गया</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">नया संदेश</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/events"
          className="p-4 rounded-xl bg-cream-50 border border-gold-300 hover:border-gold-500 shadow-sm transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-saffron-600" />
            <span className="text-xs font-bold font-hindi text-devotional-brown">नया कार्यक्रम जोड़ें</span>
          </div>
          <ArrowRight className="w-4 h-4 text-devotional-muted" />
        </Link>

        <Link
          to="/admin/gallery"
          className="p-4 rounded-xl bg-cream-50 border border-gold-300 hover:border-gold-500 shadow-sm transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-saffron-600" />
            <span className="text-xs font-bold font-hindi text-devotional-brown">नई तस्वीर अपलोड करें</span>
          </div>
          <ArrowRight className="w-4 h-4 text-devotional-muted" />
        </Link>

        <Link
          to="/admin/committee"
          className="p-4 rounded-xl bg-cream-50 border border-gold-300 hover:border-gold-500 shadow-sm transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-saffron-600" />
            <span className="text-xs font-bold font-hindi text-devotional-brown">सदस्य सूची प्रबंधित करें</span>
          </div>
          <ArrowRight className="w-4 h-4 text-devotional-muted" />
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

