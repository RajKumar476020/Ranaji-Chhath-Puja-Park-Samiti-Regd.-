const db = require("../config/database");

exports.getAll = (req, res, next) => {
  try {
    const { all } = req.query;
    let query = "SELECT * FROM announcements";
    if (!all) {
      query += " WHERE is_active = 1";
    }
    query += " ORDER BY priority DESC, created_at DESC";

    const announcements = db.prepare(query).all();
    res.json({ success: true, count: announcements.length, announcements });
  } catch (error) {
    next(error);
  }
};

exports.create = (req, res, next) => {
  try {
    const { title_hi, title_en, message_hi, message_en, is_active, priority } = req.body;
    if (!title_hi || !message_hi) {
      return res.status(400).json({ success: false, message: "शीर्षक और संदेश आवश्यक हैं (Title and message required)" });
    }

    const result = db.prepare(`
      INSERT INTO announcements (title_hi, title_en, message_hi, message_en, is_active, priority)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      title_hi,
      title_en || title_hi,
      message_hi,
      message_en || message_hi,
      is_active !== undefined ? (is_active ? 1 : 0) : 1,
      parseInt(priority, 10) || 0
    );

    const newAnnounce = db.prepare("SELECT * FROM announcements WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: "सूचना सफलतापूर्वक जोड़ी गई (Announcement created)", announcement: newAnnounce });
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title_hi, title_en, message_hi, message_en, is_active, priority } = req.body;

    const existing = db.prepare("SELECT * FROM announcements WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "सूचना नहीं मिली (Announcement not found)" });
    }

    db.prepare(`
      UPDATE announcements SET
        title_hi = ?,
        title_en = ?,
        message_hi = ?,
        message_en = ?,
        is_active = ?,
        priority = ?
      WHERE id = ?
    `).run(
      title_hi !== undefined ? title_hi : existing.title_hi,
      title_en !== undefined ? title_en : existing.title_en,
      message_hi !== undefined ? message_hi : existing.message_hi,
      message_en !== undefined ? message_en : existing.message_en,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      priority !== undefined ? parseInt(priority, 10) : existing.priority,
      id
    );

    const updated = db.prepare("SELECT * FROM announcements WHERE id = ?").get(id);
    res.json({ success: true, message: "सूचना सफलतापूर्वक अपडेट की गई (Announcement updated)", announcement: updated });
  } catch (error) {
    next(error);
  }
};

exports.toggle = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare("SELECT * FROM announcements WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "सूचना नहीं मिली (Announcement not found)" });
    }

    const newStatus = existing.is_active === 1 ? 0 : 1;
    db.prepare("UPDATE announcements SET is_active = ? WHERE id = ?").run(newStatus, id);

    res.json({ success: true, message: `सूचना की स्थिति ${newStatus === 1 ? "सक्रिय" : "निष्क्रिय"} कर दी गई`, is_active: newStatus });
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "सूचना नहीं मिली (Announcement not found)" });
    }
    res.json({ success: true, message: "सूचना सफलतापूर्वक हटा दी गई (Announcement deleted)" });
  } catch (error) {
    next(error);
  }
};

