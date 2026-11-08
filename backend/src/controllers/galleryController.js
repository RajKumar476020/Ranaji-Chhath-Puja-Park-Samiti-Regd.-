const fs = require("fs");
const path = require("path");
const db = require("../config/database");

exports.getAll = (req, res, next) => {
  try {
    const { category } = req.query;
    let query = "SELECT * FROM gallery_items";
    const params = [];

    if (category && category !== "all") {
      query += " WHERE category = ?";
      params.push(category);
    }

    query += " ORDER BY order_index ASC, id DESC";
    const items = db.prepare(query).all(...params);

    res.json({ success: true, count: items.length, items });
  } catch (error) {
    next(error);
  }
};

exports.uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "कोई चित्र फाइल अपलोड नहीं की गई (No image file uploaded)" });
    }

    const { title_hi, title_en, category, caption_hi, caption_en, order_index } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const result = db.prepare(`
      INSERT INTO gallery_items (title_hi, title_en, category, image_url, caption_hi, caption_en, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title_hi || "छठ पूजा उत्सव",
      title_en || "Chhath Puja Celebration",
      category || "chhath-2026",
      imageUrl,
      caption_hi || "",
      caption_en || "",
      parseInt(order_index, 10) || 0
    );

    const newItem = db.prepare("SELECT * FROM gallery_items WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: "तस्वीर सफलतापूर्वक अपलोड की गई (Image uploaded)", item: newItem });
  } catch (error) {
    next(error);
  }
};

exports.create = (req, res, next) => {
  try {
    const { title_hi, title_en, category, image_url, caption_hi, caption_en, order_index } = req.body;
    if (!image_url) {
      return res.status(400).json({ success: false, message: "चित्र URL आवश्यक है (Image URL is required)" });
    }

    const result = db.prepare(`
      INSERT INTO gallery_items (title_hi, title_en, category, image_url, caption_hi, caption_en, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title_hi || "छठ पूजा तस्वीर",
      title_en || "Chhath Puja Photo",
      category || "chhath-2026",
      image_url,
      caption_hi || "",
      caption_en || "",
      parseInt(order_index, 10) || 0
    );

    const newItem = db.prepare("SELECT * FROM gallery_items WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: "गैलरी आइटम सफलतापूर्वक जोड़ा गया (Gallery item created)", item: newItem });
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title_hi, title_en, category, image_url, caption_hi, caption_en, order_index } = req.body;

    const existing = db.prepare("SELECT * FROM gallery_items WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "गैलरी आइटम नहीं मिला (Item not found)" });
    }

    db.prepare(`
      UPDATE gallery_items SET
        title_hi = ?,
        title_en = ?,
        category = ?,
        image_url = ?,
        caption_hi = ?,
        caption_en = ?,
        order_index = ?
      WHERE id = ?
    `).run(
      title_hi !== undefined ? title_hi : existing.title_hi,
      title_en !== undefined ? title_en : existing.title_en,
      category !== undefined ? category : existing.category,
      image_url !== undefined ? image_url : existing.image_url,
      caption_hi !== undefined ? caption_hi : existing.caption_hi,
      caption_en !== undefined ? caption_en : existing.caption_en,
      order_index !== undefined ? parseInt(order_index, 10) : existing.order_index,
      id
    );

    const updated = db.prepare("SELECT * FROM gallery_items WHERE id = ?").get(id);
    res.json({ success: true, message: "गैलरी आइटम सफलतापूर्वक अपडेट किया गया (Item updated)", item: updated });
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = db.prepare("SELECT * FROM gallery_items WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "गैलरी आइटम नहीं मिला (Item not found)" });
    }

    // Try to delete local uploaded file if it starts with /uploads/
    if (existing.image_url && existing.image_url.startsWith("/uploads/")) {
      const filename = path.basename(existing.image_url);
      const filePath = path.resolve(__dirname, "../../uploads", filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn("Could not delete file:", filePath, e.message);
        }
      }
    }

    db.prepare("DELETE FROM gallery_items WHERE id = ?").run(id);
    res.json({ success: true, message: "गैलरी आइटम सफलतापूर्वक हटा दिया गया (Item deleted)" });
  } catch (error) {
    next(error);
  }
};

