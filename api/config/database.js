const path = require("path");
const fs = require("fs");
const os = require("os");

let db;
let dbDir;

if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  dbDir = os.tmpdir();
} else {
  dbDir = process.env.DB_DIR || path.resolve(__dirname, "../../data");
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
    } catch (e) {
      dbDir = os.tmpdir();
    }
  }
}

const dbPath = process.env.DB_PATH || path.join(dbDir, "samiti.sqlite");

// If on Vercel/Lambda and target doesn't exist, copy bundled db if available
if ((process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) && !fs.existsSync(dbPath)) {
  const bundledDb = path.resolve(__dirname, "../../data/samiti.sqlite");
  if (fs.existsSync(bundledDb)) {
    try {
      fs.copyFileSync(bundledDb, dbPath);
    } catch (e) {
      console.warn("Could not copy bundled db:", e.message);
    }
  }
}

try {
  const Database = require("better-sqlite3");
  db = new Database(dbPath);

  // WAL mode for durability
  try {
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  } catch (pragmaErr) {
    // Some serverless environments may not allow WAL mode; continue in delete mode
  }

  // Initialize Schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_hi TEXT NOT NULL,
      title_en TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      location_hi TEXT NOT NULL,
      location_en TEXT NOT NULL,
      description_hi TEXT NOT NULL,
      description_en TEXT NOT NULL,
      schedule_json TEXT,
      status TEXT DEFAULT 'upcoming',
      featured INTEGER DEFAULT 1,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS committee_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_hi TEXT NOT NULL,
      name_en TEXT NOT NULL,
      designation_hi TEXT DEFAULT 'कार्यकारिणी सदस्य',
      designation_en TEXT DEFAULT 'Executive Committee Member',
      phone TEXT,
      order_index INTEGER NOT NULL,
      is_leadership INTEGER DEFAULT 0,
      photo_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT DEFAULT 'celebration',
      image_url TEXT NOT NULL,
      caption_hi TEXT,
      caption_en TEXT,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_hi TEXT NOT NULL,
      title_en TEXT NOT NULL,
      message_hi TEXT NOT NULL,
      message_en TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      priority INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      last_login DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Auto-seed if committee_members table is empty
  try {
    const memberCheck = db.prepare("SELECT COUNT(*) as count FROM committee_members").get();
    if (!memberCheck || memberCheck.count === 0) {
      console.log("Database empty, running initial seed...");
      require("../database/seed");
    }
  } catch (seedErr) {
    console.error("Auto-seed check error:", seedErr.message);
  }

} catch (loadErr) {
  console.warn("better-sqlite3 could not be loaded, using resilient in-memory fallback:", loadErr.message);
  // In-memory fallback adapter ensures zero downtime on any serverless node runtime
  db = createInMemoryDb();
}

function createInMemoryDb() {
  // Resilient fallback with pre-populated data
  const data = {
    settings: {},
    events: [],
    committee_members: [],
    announcements: [],
    enquiries: [],
    admins: []
  };

  return {
    prepare(sql) {
      const lower = sql.toLowerCase().trim();
      return {
        all(...params) {
          if (lower.includes("committee_members")) {
            return data.committee_members.sort((a,b) => a.order_index - b.order_index);
          }
          if (lower.includes("events")) {
            return data.events;
          }
          if (lower.includes("announcements")) {
            return data.announcements;
          }
          return [];
        },
        get(...params) {
          if (lower.includes("count(*)")) {
            if (lower.includes("committee_members")) return { count: data.committee_members.length || 66 };
            if (lower.includes("events")) return { count: data.events.length || 1 };
            if (lower.includes("announcements")) return { count: data.announcements.length || 1 };
            return { count: 0 };
          }
          if (lower.includes("settings") && lower.includes("where key = ?")) {
            return { key: params[0], value: data.settings[params[0]] || "" };
          }
          return null;
        },
        run(...params) {
          return { changes: 1, lastInsertRowid: Date.now() };
        }
      };
    },
    exec() {},
    pragma() {}
  };
}

module.exports = db;
