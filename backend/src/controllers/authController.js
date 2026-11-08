const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { JWT_SECRET } = require("../middleware/auth");

exports.login = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "उपयोगकर्ता नाम और पासवर्ड आवश्यक हैं। (Username and password required)" });
    }

    const admin = db.prepare("SELECT * FROM admins WHERE username = ?").get(username);
    if (!admin) {
      return res.status(401).json({ success: false, message: "अमान्य उपयोगकर्ता नाम या पासवर्ड (Invalid username or password)" });
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "अमान्य उपयोगकर्ता नाम या पासवर्ड (Invalid username or password)" });
    }

    // Update last login
    db.prepare("UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?").run(admin.id);

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "सफलतापूर्वक लॉगिन किया गया (Login successful)",
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.verify = (req, res, next) => {
  try {
    const admin = db.prepare("SELECT id, username, role, last_login, created_at FROM admins WHERE id = ?").get(req.user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "उपयोगकर्ता नहीं मिला (User not found)" });
    }
    res.json({ success: true, user: admin });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "वर्तमान और नया पासवर्ड आवश्यक है। (Current and new passwords required)" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए। (New password must be at least 6 characters)" });
    }

    const admin = db.prepare("SELECT * FROM admins WHERE id = ?").get(req.user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "उपयोगकर्ता नहीं मिला (User not found)" });
    }

    const isMatch = bcrypt.compareSync(currentPassword, admin.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "वर्तमान पासवर्ड गलत है। (Current password incorrect)" });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    db.prepare("UPDATE admins SET password_hash = ? WHERE id = ?").run(newHash, admin.id);

    res.json({ success: true, message: "पासवर्ड सफलतापूर्वक बदल दिया गया। (Password changed successfully)" });
  } catch (error) {
    next(error);
  }
};

