const db = require("../config/database");

exports.getAll = (req, res, next) => {
  try {
    const members = db.prepare("SELECT * FROM committee_members ORDER BY order_index ASC, id ASC").all();
    res.json({ success: true, count: members.length, members });
  } catch (error) {
    next(error);
  }
};

exports.create = (req, res, next) => {
  try {
    const { name_hi, name_en, designation_hi, designation_en, phone, order_index, is_leadership, image_url } = req.body;
    if (!name_hi) {
      return res.status(400).json({ success: false, message: "नाम आवश्यक है (Name is required)" });
    }

    // Determine default order_index if not provided
    let order = parseInt(order_index, 10);
    if (isNaN(order)) {
      const maxOrder = db.prepare("SELECT MAX(order_index) as max_idx FROM committee_members").get();
      order = (maxOrder.max_idx || 0) + 1;
    }

    const result = db.prepare(`
      INSERT INTO committee_members (name_hi, name_en, designation_hi, designation_en, phone, order_index, is_leadership, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name_hi,
      name_en || name_hi,
      designation_hi || "कार्यकारिणी सदस्य",
      designation_en || "Executive Committee Member",
      phone || "",
      order,
      is_leadership ? 1 : 0,
      image_url || ""
    );

    const newMember = db.prepare("SELECT * FROM committee_members WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: "सदस्य सफलतापूर्वक जोड़ा गया (Member added)", member: newMember });
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name_hi, name_en, designation_hi, designation_en, phone, order_index, is_leadership, image_url } = req.body;

    const existing = db.prepare("SELECT * FROM committee_members WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "सदस्य नहीं मिला (Member not found)" });
    }

    db.prepare(`
      UPDATE committee_members SET
        name_hi = ?,
        name_en = ?,
        designation_hi = ?,
        designation_en = ?,
        phone = ?,
        order_index = ?,
        is_leadership = ?,
        image_url = ?
      WHERE id = ?
    `).run(
      name_hi !== undefined ? name_hi : existing.name_hi,
      name_en !== undefined ? name_en : existing.name_en,
      designation_hi !== undefined ? designation_hi : existing.designation_hi,
      designation_en !== undefined ? designation_en : existing.designation_en,
      phone !== undefined ? phone : existing.phone,
      order_index !== undefined ? parseInt(order_index, 10) : existing.order_index,
      is_leadership !== undefined ? (is_leadership ? 1 : 0) : existing.is_leadership,
      image_url !== undefined ? image_url : existing.image_url,
      id
    );

    const updated = db.prepare("SELECT * FROM committee_members WHERE id = ?").get(id);
    res.json({ success: true, message: "सदस्य सफलतापूर्वक अपडेट किया गया (Member updated)", member: updated });
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM committee_members WHERE id = ?").run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "सदस्य नहीं मिला (Member not found)" });
    }
    res.json({ success: true, message: "सदस्य सफलतापूर्वक हटा दिया गया (Member removed)" });
  } catch (error) {
    next(error);
  }
};

exports.reorder = (req, res, next) => {
  try {
    const { orderMap } = req.body; // array of { id, order_index }
    if (!Array.isArray(orderMap)) {
      return res.status(400).json({ success: false, message: "अमान्य डेटा सूची (Invalid array of orders)" });
    }

    const updateOrder = db.prepare("UPDATE committee_members SET order_index = ? WHERE id = ?");
    const runTransaction = db.transaction((items) => {
      for (const item of items) {
        updateOrder.run(item.order_index, item.id);
      }
    });

    runTransaction(orderMap);

    const members = db.prepare("SELECT * FROM committee_members ORDER BY order_index ASC").all();
    res.json({ success: true, message: "क्रम सफलतापूर्वक अपडेट किया गया (Order updated)", members });
  } catch (error) {
    next(error);
  }
};

