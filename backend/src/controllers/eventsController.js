const db = require("../config/database");

function computeDynamicStatus(startDateStr, endDateStr, manualStatus) {
  if (manualStatus && manualStatus !== "auto") return manualStatus;
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  if (todayStr < startDateStr) {
    return "upcoming";
  } else if (todayStr >= startDateStr && todayStr <= endDateStr) {
    return "ongoing";
  } else {
    return "completed";
  }
}

exports.getAll = (req, res, next) => {
  try {
    const rows = db.prepare("SELECT * FROM events ORDER BY start_date ASC").all();
    const events = rows.map(e => {
      let schedule = [];
      try {
        schedule = e.schedule_json ? JSON.parse(e.schedule_json) : [];
      } catch (err) {
        schedule = [];
      }
      return {
        ...e,
        schedule,
        status: computeDynamicStatus(e.start_date, e.end_date, e.status)
      };
    });
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

exports.getById = (req, res, next) => {
  try {
    const event = db.prepare("SELECT * FROM events WHERE id = ?").get(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "कार्यक्रम नहीं मिला (Event not found)" });
    }
    let schedule = [];
    try {
      schedule = event.schedule_json ? JSON.parse(event.schedule_json) : [];
    } catch (err) {
      schedule = [];
    }
    res.json({
      success: true,
      event: {
        ...event,
        schedule,
        status: computeDynamicStatus(event.start_date, event.end_date, event.status)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.create = (req, res, next) => {
  try {
    const {
      title_hi, title_en, start_date, end_date,
      location_hi, location_en, description_hi, description_en,
      schedule_json, status, featured, image_url
    } = req.body;

    if (!title_hi || !start_date || !end_date) {
      return res.status(400).json({ success: false, message: "शीर्षक और दिनांक आवश्यक हैं (Title and dates are required)" });
    }

    const schedStr = typeof schedule_json === "string" ? schedule_json : JSON.stringify(schedule_json || []);

    const result = db.prepare(`
      INSERT INTO events (
        title_hi, title_en, start_date, end_date,
        location_hi, location_en, description_hi, description_en,
        schedule_json, status, featured, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title_hi,
      title_en || title_hi,
      start_date,
      end_date,
      location_hi || "",
      location_en || location_hi || "",
      description_hi || "",
      description_en || description_hi || "",
      schedStr,
      status || "upcoming",
      featured ? 1 : 0,
      image_url || "/images/img_20_offset_6306509.jpg"
    );

    const newEvent = db.prepare("SELECT * FROM events WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: "कार्यक्रम सफलतापूर्वक जोड़ा गया (Event created)", event: newEvent });
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title_hi, title_en, start_date, end_date,
      location_hi, location_en, description_hi, description_en,
      schedule_json, status, featured, image_url
    } = req.body;

    const existing = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "कार्यक्रम नहीं मिला (Event not found)" });
    }

    const schedStr = typeof schedule_json === "string" ? schedule_json : (schedule_json ? JSON.stringify(schedule_json) : existing.schedule_json);

    db.prepare(`
      UPDATE events SET
        title_hi = ?,
        title_en = ?,
        start_date = ?,
        end_date = ?,
        location_hi = ?,
        location_en = ?,
        description_hi = ?,
        description_en = ?,
        schedule_json = ?,
        status = ?,
        featured = ?,
        image_url = ?
      WHERE id = ?
    `).run(
      title_hi !== undefined ? title_hi : existing.title_hi,
      title_en !== undefined ? title_en : existing.title_en,
      start_date !== undefined ? start_date : existing.start_date,
      end_date !== undefined ? end_date : existing.end_date,
      location_hi !== undefined ? location_hi : existing.location_hi,
      location_en !== undefined ? location_en : existing.location_en,
      description_hi !== undefined ? description_hi : existing.description_hi,
      description_en !== undefined ? description_en : existing.description_en,
      schedStr,
      status !== undefined ? status : existing.status,
      featured !== undefined ? (featured ? 1 : 0) : existing.featured,
      image_url !== undefined ? image_url : existing.image_url,
      id
    );

    const updated = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
    res.json({ success: true, message: "कार्यक्रम सफलतापूर्वक अपडेट किया गया (Event updated)", event: updated });
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM events WHERE id = ?").run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "कार्यक्रम नहीं मिला (Event not found)" });
    }
    res.json({ success: true, message: "कार्यक्रम सफलतापूर्वक हटा दिया गया (Event deleted)" });
  } catch (error) {
    next(error);
  }
};

