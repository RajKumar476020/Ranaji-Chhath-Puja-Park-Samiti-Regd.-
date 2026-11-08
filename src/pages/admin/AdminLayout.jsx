import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Camera, Users, Settings, Heart, Bell, MessageSquare, LogOut, ExternalLink, Shield, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SEO from '../../components/common/SEO';

const AdminLayout = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passData, setPassData] = useState({ currentPassword: '', newPassword: '' });
  const [passStatus, setPassStatus] = useState({ error: '', success: '' });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassStatus({ error: '', success: '' });
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(passData)
      });
      const data = await res.json();
      if (data.success) {
        setPassStatus({ success: data.message, error: '' });
        setPassData({ currentPassword: '', newPassword: '' });
        setTimeout(() => setShowPasswordModal(false), 2000);
      } else {
        setPassStatus({ error: data.message, success: '' });
      }
    } catch (err) {
      setPassStatus({ error: 'त्रुटि हुई। कृपया पुनः प्रयास करें।', success: '' });
    }
  };

  const navItems = [
    { to: '/admin', label: 'डैशबोर्ड (Dashboard)', icon: LayoutDashboard, end: true },
    { to: '/admin/events', label: 'कार्यक्रम (Events)', icon: Calendar },
    { to: '/admin/gallery', label: 'गैलरी (Gallery)', icon: Camera },
    { to: '/admin/committee', label: 'कार्यकारिणी (Committee)', icon: Users },
    { to: '/admin/settings', label: 'वेबसाइट सेटिंग्स (Settings)', icon: Settings },
    { to: '/admin/donations', label: 'आर्थिक सहयोग / QR (Donations)', icon: Heart },
    { to: '/admin/announcements', label: 'सूचनाएं (Announcements)', icon: Bell },
    { to: '/admin/enquiries', label: 'प्राप्त संदेश (Enquiries)', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col md:flex-row">
      <SEO title="प्रशासन डैशबोर्ड (Admin Portal)" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-devotional-dark text-cream-100 flex-shrink-0 flex flex-col justify-between border-r-2 border-gold-500/40">
        <div>
          {/* Logo & Header */}
          <div className="p-5 border-b border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🪔</span>
              <div>
                <span className="font-bold text-sm text-white font-hindi block leading-tight">
                  राणाजी छठ पूजा समिति
                </span>
                <span className="text-[10px] text-gold-300 font-sans uppercase tracking-wider">
                  Admin Control Panel
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-saffron-600 text-white shadow-warm'
                        : 'text-cream-200/80 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 text-gold-400" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gold-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-cream-200/70 px-1 mb-2">
            <span>प्रशासक: <strong>{user?.username || 'admin'}</strong></span>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="text-gold-400 hover:text-gold-300 p-1"
              title="पासवर्ड बदलें (Change Password)"
            >
              <Key className="w-3.5 h-3.5" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>वेबसाइट देखें (View Site)</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-900/40 hover:bg-red-800 text-red-200 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉगआउट (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-md w-full border-2 border-gold-400 shadow-2xl">
            <h3 className="font-bold text-base font-hindi text-devotional-brown mb-4">
              पासवर्ड बदलें (Change Admin Password)
            </h3>

            {passStatus.error && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-50 text-red-800 text-xs border border-red-300">
                {passStatus.error}
              </div>
            )}
            {passStatus.success && (
              <div className="mb-3 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-300">
                {passStatus.success}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-devotional-brown mb-1">वर्तमान पासवर्ड (Current Password)</label>
                <input
                  type="password"
                  required
                  value={passData.currentPassword}
                  onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gold-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-devotional-brown mb-1">नया पासवर्ड (New Password)</label>
                <input
                  type="password"
                  required
                  value={passData.newPassword}
                  onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gold-300 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-lg border border-gold-300 text-devotional-brown font-semibold"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-saffron-600 text-white font-bold"
                >
                  सहेजें (Update)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;

