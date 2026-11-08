const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth");
const upload = require("../middleware/upload");

const authController = require("../controllers/authController");
const settingsController = require("../controllers/settingsController");
const eventsController = require("../controllers/eventsController");
const committeeController = require("../controllers/committeeController");
const galleryController = require("../controllers/galleryController");
const enquiriesController = require("../controllers/enquiriesController");
const announcementsController = require("../controllers/announcementsController");
const statsController = require("../controllers/statsController");

// Authentication
router.post("/auth/login", authController.login);
router.get("/auth/verify", authenticateToken, authController.verify);
router.post("/auth/change-password", authenticateToken, authController.changePassword);

// Settings
router.get("/settings", settingsController.getAll);
router.put("/settings", authenticateToken, settingsController.update);

// Events
router.get("/events", eventsController.getAll);
router.get("/events/:id", eventsController.getById);
router.post("/events", authenticateToken, eventsController.create);
router.put("/events/:id", authenticateToken, eventsController.update);
router.delete("/events/:id", authenticateToken, eventsController.delete);

// Committee Members
router.get("/committee", committeeController.getAll);
router.post("/committee", authenticateToken, committeeController.create);
router.put("/committee/:id", authenticateToken, committeeController.update);
router.delete("/committee/:id", authenticateToken, committeeController.delete);
router.post("/committee/reorder", authenticateToken, committeeController.reorder);

// Gallery
router.get("/gallery", galleryController.getAll);
router.post("/gallery/upload", authenticateToken, upload.single("image"), galleryController.uploadImage);
router.post("/gallery", authenticateToken, galleryController.create);
router.put("/gallery/:id", authenticateToken, galleryController.update);
router.delete("/gallery/:id", authenticateToken, galleryController.delete);

// Enquiries
router.post("/enquiries", enquiriesController.submit);
router.get("/enquiries", authenticateToken, enquiriesController.getAll);
router.put("/enquiries/:id/read", authenticateToken, enquiriesController.markRead);
router.delete("/enquiries/:id", authenticateToken, enquiriesController.delete);

// Announcements
router.get("/announcements", announcementsController.getAll);
router.post("/announcements", authenticateToken, announcementsController.create);
router.put("/announcements/:id", authenticateToken, announcementsController.update);
router.patch("/announcements/:id/toggle", authenticateToken, announcementsController.toggle);
router.delete("/announcements/:id", authenticateToken, announcementsController.delete);

// Dashboard Stats
router.get("/stats", authenticateToken, statsController.getStats);

// General File / Image Upload (for settings QR code, event banners, etc.)
router.post("/upload", authenticateToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "कोई फाइल नहीं मिली (No file uploaded)" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: "चित्र सफलतापूर्वक अपलोड किया गया (Image uploaded)",
    url: fileUrl,
    filename: req.file.filename
  });
});

module.exports = router;

