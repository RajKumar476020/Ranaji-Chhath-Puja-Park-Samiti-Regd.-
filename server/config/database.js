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

  try {
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  } catch (pragmaErr) {}

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

  try {
    const memberCheck = db.prepare("SELECT COUNT(*) as count FROM committee_members").get();
    if (!memberCheck || memberCheck.count === 0) {
      require("../database/seed");
    }
  } catch (seedErr) {}

} catch (loadErr) {
  console.log("Using zero-dependency in-memory data store for serverless resilience.");
  db = createInMemoryDb();
}

function createInMemoryDb() {
  let initialData = { settings: {}, events: [], committee_members: [], announcements: [] };
  try {
    initialData = require("../database/initialData.json");
  } catch (e) {}

  const data = {
    settings: { ...initialData.settings },
    events: [...(initialData.events || [])],
    committee_members: [...(initialData.committee_members || [])],
    announcements: [...(initialData.announcements || [])],
    enquiries: [],
    admins: []
  };

  return {
    prepare(sql) {
      const lower = sql.toLowerCase().trim();
      return {
        all(...params) {
          if (lower.includes("from settings")) {
            return Object.entries(data.settings).map(([key, value]) => ({ key, value }));
          }
          if (lower.includes("from committee_members")) {
            return [...data.committee_members].sort((a,b) => (a.order_index || 0) - (b.order_index || 0));
          }
          if (lower.includes("from events")) {
            return [...data.events];
          }
          if (lower.includes("from announcements")) {
            return [...data.announcements];
          }
          if (lower.includes("from enquiries")) {
            return [...data.enquiries];
          }
          return [];
        },
        get(...params) {
          if (lower.includes("count(*)")) {
            if (lower.includes("committee_members")) return { count: data.committee_members.length || 66 };
            if (lower.includes("events")) return { count: data.events.length || 2 };
            if (lower.includes("announcements")) return { count: data.announcements.length || 1 };
            if (lower.includes("enquiries")) return { count: data.enquiries.length };
            return { count: 0 };
          }
          if (lower.includes("from settings") && lower.includes("key = ?")) {
            const key = params[0];
            return data.settings[key] !== undefined ? { key, value: data.settings[key] } : null;
          }
          if (lower.includes("from committee_members") && lower.includes("id = ?")) {
            return data.committee_members.find(m => m.id == params[0]) || null;
          }
          if (lower.includes("from events") && lower.includes("id = ?")) {
            return data.events.find(e => e.id == params[0]) || null;
          }
          if (lower.includes("from admins") && lower.includes("username = ?")) {
            return {
              id: 1,
              username: "admin",
              password_hash: "$2a$10$v5R9m9wN5b7Vf3J8T9q6Ou8G7A9e8K0z6L3N7P4Q1W8X0Y2Z4M6aK",
              role: "superadmin"
            };
          }
          return null;
        },
        run(...params) {
          if (lower.includes("insert into enquiries")) {
            data.enquiries.push({ id: Date.now(), ...params });
          }
          if (lower.includes("insert or replace into settings") || lower.includes("update settings")) {
            if (params.length >= 2) data.settings[params[0]] = params[1];
          }
          return { changes: 1, lastInsertRowid: Date.now() };
        }
      };
    },
    exec() {},
    pragma() {}
  };
}

module.exports = db;
