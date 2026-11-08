const db = require("../config/database");

exports.getAll = (req, res, next) => {
  try {
    const rows = db.prepare("SELECT key, value FROM settings").all();
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });
    res.json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== "object") {
      return res.status(400).json({ success: false, message: "अमान्य डेटा (Invalid data)" });
    }

    const upsert = db.prepare(`
      INSERT INTO settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `);

    const updateMany = db.transaction((entries) => {
      for (const [key, val] of Object.entries(entries)) {
        upsert.run(key, String(val));
      }
    });

    updateMany(updates);

    // Return all updated settings
    const rows = db.prepare("SELECT key, value FROM settings").all();
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });

    res.json({ success: true, message: "सेटिंग्स सफलतापूर्वक अपडेट की गईं (Settings updated successfully)", settings });
  } catch (error) {
    next(error);
  }
};

