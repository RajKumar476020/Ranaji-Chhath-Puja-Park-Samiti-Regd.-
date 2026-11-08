const getAuthHeaders = () => {
  const token = localStorage.getItem('samiti_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Settings
  async getSettings() {
    const res = await fetch('/api/settings');
    return res.json();
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
    const res = await fetch('/api/events');
    return res.json();
  },
  async getEvent(id) {
    const res = await fetch(`/api/events/${id}`);
    return res.json();
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
    const res = await fetch('/api/committee');
    return res.json();
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
    const res = await fetch(`/api/announcements${all ? '?all=true' : ''}`);
    return res.json();
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

