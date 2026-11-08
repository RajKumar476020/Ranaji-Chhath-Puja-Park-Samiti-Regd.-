const db = require("../config/database");

exports.getStats = (req, res, next) => {
  try {
    const totalEvents = db.prepare("SELECT count(*) as count FROM events").get().count;
    const totalMembers = db.prepare("SELECT count(*) as count FROM committee_members").get().count;
    const totalGallery = db.prepare("SELECT count(*) as count FROM gallery_items").get().count;
    const totalEnquiries = db.prepare("SELECT count(*) as count FROM enquiries").get().count;
    const unreadEnquiries = db.prepare("SELECT count(*) as count FROM enquiries WHERE is_read = 0").get().count;
    const totalAnnouncements = db.prepare("SELECT count(*) as count FROM announcements").get().count;

    const recentEnquiries = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5").all();
    const upcomingEvents = db.prepare("SELECT * FROM events WHERE status = 'upcoming' ORDER BY start_date ASC LIMIT 3").all();

    res.json({
      success: true,
      stats: {
        totalEvents,
        totalMembers,
        totalGallery,
        totalEnquiries,
        unreadEnquiries,
        totalAnnouncements
      },
      recentEnquiries,
      upcomingEvents
    });
  } catch (error) {
    next(error);
  }
};

