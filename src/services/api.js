import { defaultSettings, defaultEvents, defaultCommittee, defaultAnnouncements } from '../data/defaultData';

const getAuthHeaders = () => {
  const token = localStorage.getItem('samiti_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Settings
  async getSettings() {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return (data && data.success && data.settings) ? data : { success: true, settings: defaultSettings };
    } catch (err) {
      console.warn('Using default settings fallback:', err);
      return { success: true, settings: defaultSettings };
    }
  },
  async updateSettings(data) {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Events
  async getEvents() {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.events) && data.events.length > 0) {
        return data;
      }
      return { success: true, events: defaultEvents };
    } catch (err) {
      console.warn('Using default events fallback:', err);
      return { success: true, events: defaultEvents };
    }
  },
  async getEvent(id) {
    try {
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data && data.success && data.event) {
        return data;
      }
      const match = defaultEvents.find(e => String(e.id) === String(id));
      return match ? { success: true, event: match } : { success: false, message: 'Event not found' };
    } catch (err) {
      console.warn(`Falling back for event ${id}:`, err);
      const match = defaultEvents.find(e => String(e.id) === String(id));
      return match ? { success: true, event: match } : { success: false, message: 'Event not found' };
    }
  },
  async createEvent(data) {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updateEvent(id, data) {
    const res = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deleteEvent(id) {
    const res = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Committee
  async getCommittee() {
    try {
      const res = await fetch('/api/committee');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.members) && data.members.length > 0) {
        return data;
      }
      return { success: true, members: defaultCommittee };
    } catch (err) {
      console.warn('Using default committee fallback:', err);
      return { success: true, members: defaultCommittee };
    }
  },
  async createMember(data) {
    const res = await fetch('/api/committee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updateMember(id, data) {
    const res = await fetch(`/api/committee/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deleteMember(id) {
    const res = await fetch(`/api/committee/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async reorderMembers(orderMap) {
    const res = await fetch('/api/committee/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ orderMap })
    });
    return res.json();
  },

  // Gallery
  async getGallery(category) {
    const url = category && category !== 'all' ? `/api/gallery?category=${category}` : '/api/gallery';
    const res = await fetch(url);
    return res.json();
  },
  async uploadGalleryImage(formData) {
    const res = await fetch('/api/gallery/upload', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return res.json();
  },
  async createGalleryItem(data) {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updateGalleryItem(id, data) {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deleteGalleryItem(id) {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Enquiries (Contact Form)
  async submitEnquiry(data) {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async getEnquiries() {
    const res = await fetch('/api/enquiries', {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async markEnquiryRead(id) {
    const res = await fetch(`/api/enquiries/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async deleteEnquiry(id) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Announcements
  async getAnnouncements(all = false) {
    try {
      const res = await fetch(`/api/announcements${all ? '?all=true' : ''}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.announcements) && data.announcements.length > 0) {
        return data;
      }
      return { success: true, announcements: defaultAnnouncements };
    } catch (err) {
      console.warn('Using default announcements fallback:', err);
      return { success: true, announcements: defaultAnnouncements };
    }
  },
  async createAnnouncement(data) {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updateAnnouncement(id, data) {
    const res = await fetch(`/api/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async toggleAnnouncement(id) {
    const res = await fetch(`/api/announcements/${id}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async deleteAnnouncement(id) {
    const res = await fetch(`/api/announcements/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // General Upload
  async uploadFile(formData) {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch('/api/stats', {
      headers: getAuthHeaders()
    });
    return res.json();
  }
};

