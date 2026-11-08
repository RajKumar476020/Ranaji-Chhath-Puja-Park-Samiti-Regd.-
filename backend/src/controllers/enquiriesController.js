const db = require("../config/database");

// Simple in-memory rate limiting map (IP -> timestamps)
const submissionTracker = new Map();

exports.submit = (req, res, next) => {
  try {
    const { name, phone, email, subject, message, bot_field } = req.body;

    // 1. Honeypot check for bots
    if (bot_field) {
      // Quietly reject bot submissions
      return res.status(200).json({ success: true, message: "आपका संदेश प्राप्त हो गया है। (Message received)" });
    }

    // 2. IP Rate limiting (max 5 submissions per 10 minutes per IP)
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const now = Date.now();
    const timestamps = submissionTracker.get(ip) || [];
    const recent = timestamps.filter(t => now - t < 10 * 60 * 1000);
    if (recent.length >= 5) {
      return res.status(429).json({
        success: false,
        message: "आपने हाल ही में कई संदेश भेजे हैं। कृपया थोड़ी देर बाद पुनः प्रयास करें। (Too many submissions. Please wait.)"
      });
    }
    recent.push(now);
    submissionTracker.set(ip, recent);

    // 3. Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: "कृपया अपना पूरा नाम दर्ज करें। (Please enter your name)" });
    }

    if (!phone || phone.trim().length < 10) {
      return res.status(400).json({ success: false, message: "कृपया एक मान्य 10 अंकों का फोन नंबर दर्ज करें। (Please enter a valid phone number)" });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: "कृपया अपना संदेश विस्तार से लिखें (कम से कम 5 अक्षर)। (Message must be at least 5 characters)" });
    }

    const cleanSubject = (subject && subject.trim()) || "वेबसाइट से सामान्य पूछताछ (General Website Enquiry)";

    const result = db.prepare(`
      INSERT INTO enquiries (name, phone, email, subject, message, is_read)
      VALUES (?, ?, ?, ?, ?, 0)
    `).run(name.trim(), phone.trim(), (email || "").trim(), cleanSubject, message.trim());

    res.status(201).json({
      success: true,
      message: "धन्यवाद! आपका संदेश सफलतापूर्वक समिति को भेज दिया गया है। हमारे पदाधिकारी शीघ्र ही आपसे संपर्क करेंगे। (Thank you! Your message has been sent successfully.)",
      enquiryId: result.lastInsertRowid
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = (req, res, next) => {
  try {
    const enquiries = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC").all();
    res.json({ success: true, count: enquiries.length, enquiries });
  } catch (error) {
    next(error);
  }
};

exports.markRead = (req, res, next) => {
  try {
    const { id } = req.params;
    const result = db.prepare("UPDATE enquiries SET is_read = 1 WHERE id = ?").run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "संदेश नहीं मिला (Enquiry not found)" });
    }
    res.json({ success: true, message: "संदेश को पढ़ा हुआ चिह्नित किया गया (Marked as read)" });
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM enquiries WHERE id = ?").run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "संदेश नहीं मिला (Enquiry not found)" });
    }
    res.json({ success: true, message: "संदेश हटा दिया गया (Enquiry deleted)" });
  } catch (error) {
    next(error);
  }
};

