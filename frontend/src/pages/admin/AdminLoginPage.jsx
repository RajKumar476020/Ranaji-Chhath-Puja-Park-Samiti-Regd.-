import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SEO from '../../components/common/SEO';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'लॉगिन विफल। कृपया सही क्रेडेंशियल दर्ज करें।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="प्रशासन लॉगिन (Admin Login)" />
      <div className="min-h-screen flex items-center justify-center bg-cream-100 px-4 py-12 relative">
        <div className="max-w-md w-full bg-cream-50 rounded-3xl border-2 border-gold-400 p-8 shadow-elevation relative z-10">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-saffron-600 via-gold-500 to-vermilion-600 p-0.5 mx-auto mb-3 shadow-warm">
              <div className="w-full h-full rounded-full bg-cream-50 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-saffron-700" />
              </div>
            </div>

            <h1 className="text-xl font-bold font-hindi text-devotional-brown">
              राणाजी छठ पूजा पार्क समिति (रजि.)
            </h1>
            <p className="text-xs font-semibold text-saffron-800 uppercase tracking-wider mt-1">
              प्रशासन पोर्टल (Admin Portal)
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-devotional-brown mb-1">
                उपयोगकर्ता नाम (Username)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-devotional-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-gold-300 text-sm focus:border-saffron-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-devotional-brown mb-1">
                पासवर्ड (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-devotional-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-gold-300 text-sm focus:border-saffron-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm shadow-warm transition-all disabled:opacity-60"
            >
              {submitting ? 'लॉगिन किया जा रहा है...' : 'लॉगिन करें (Sign In)'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gold-200 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-devotional-muted hover:text-saffron-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>वेबसाइट पर वापस जाएं (Back to website)</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;

