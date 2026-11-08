import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ChhathPujaPage from './pages/ChhathPujaPage';
import EventsPage from './pages/EventsPage';
import CommitteePage from './pages/CommitteePage';
import GalleryPage from './pages/GalleryPage';
import DonationPage from './pages/DonationPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminCommitteePage from './pages/admin/AdminCommitteePage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminDonationPage from './pages/admin/AdminDonationPage';
import AdminAnnouncementsPage from './pages/admin/AdminAnnouncementsPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="chhath-puja" element={<ChhathPujaPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="committee" element={<CommitteePage />} />
              <Route path="donations" element={<DonationPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="gallery" element={<AdminGalleryPage />} />
                <Route path="committee" element={<AdminCommitteePage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="donations" element={<AdminDonationPage />} />
                <Route path="announcements" element={<AdminAnnouncementsPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;

