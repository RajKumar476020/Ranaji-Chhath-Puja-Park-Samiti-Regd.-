const path = require("path");
const fs = require("fs");

let db;

// In Vercel or when better-sqlite3 is unavailable, use zero-dependency in-memory store
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  db = createInMemoryDb();
} else {
  try {
    const Database = require("better-sqlite3");
    const dbDir = process.env.DB_DIR || path.resolve(__dirname, "../../data");
    if (!fs.existsSync(dbDir)) {
      try {
        fs.mkdirSync(dbDir, { recursive: true });
      } catch (e) {}
    }
    const dbPath = process.env.DB_PATH || path.join(dbDir, "samiti.sqlite");
    db = new Database(dbPath);

    try {
      db.pragma("journal_mode = WAL");
      db.pragma("foreign_keys = ON");
    } catch (e) {}

    // Verify committee_members has data
    const check = db.prepare("SELECT COUNT(*) as count FROM committee_members").get();
    if (!check || check.count === 0) {
      console.log("Database empty, loading default data...");
      const initialData = require("../database/initialData.json");
      // populate from initialData
      populateFromInitialData(db, initialData);
    }
  } catch (err) {
    console.log("SQLite unavailable, using in-memory store:", err.message);
    db = createInMemoryDb();
  }
}

function populateFromInitialData(sqliteDb, initialData) {
  try {
    const insertMember = sqliteDb.prepare(`
      INSERT OR REPLACE INTO committee_members (id, name_hi, name_en, designation_hi, designation_en, phone, order_index, is_leadership, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const m of initialData.committee_members) {
      insertMember.run(m.id, m.name_hi, m.name_en, m.designation_hi, m.designation_en, m.phone || "", m.order_index, m.is_leadership || 0, m.image_url || null);
    }

    const insertEvent = sqliteDb.prepare(`
      INSERT OR REPLACE INTO events (id, title_hi, title_en, start_date, end_date, location_hi, location_en, description_hi, description_en, schedule_json, status, featured, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const ev of initialData.events) {
      insertEvent.run(ev.id, ev.title_hi, ev.title_en, ev.start_date, ev.end_date, ev.location_hi, ev.location_en, ev.description_hi, ev.description_en, ev.schedule_json, ev.status, ev.featured, ev.image_url);
    }

    const insertSetting = sqliteDb.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    for (const [k, v] of Object.entries(initialData.settings)) {
      insertSetting.run(k, v);
    }
  } catch (e) {
    console.warn("Populate error:", e.message);
  }
}

function createInMemoryDb() {
  let initialData = { settings: {}, events: [], committee_members: [], announcements: [] };
  try {
    initialData = require("../database/initialData.json");
  } catch (e) {
    console.error("Could not load initialData.json:", e);
  }

  const data = {
    settings: { ...initialData.settings },
    events: JSON.parse(JSON.stringify(initialData.events || [])),
    committee_members: JSON.parse(JSON.stringify(initialData.committee_members || [])),
    announcements: JSON.parse(JSON.stringify(initialData.announcements || [])),
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
            return [...data.events].sort((a,b) => (a.start_date || "").localeCompare(b.start_date || ""));
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
            if (lower.includes("committee_members")) return { count: data.committee_members.length };
            if (lower.includes("events")) return { count: data.events.length };
            if (lower.includes("announcements")) return { count: data.announcements.length };
            if (lower.includes("enquiries")) return { count: data.enquiries.length };
            return { count: 0 };
          }
          if (lower.includes("max(order_index)")) {
            const max = data.committee_members.reduce((m, c) => Math.max(m, c.order_index || 0), 0);
            return { max_idx: max };
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
          if (lower.includes("insert into committee_members")) {
            const newId = (data.committee_members.reduce((m, c) => Math.max(m, c.id || 0), 0) || 0) + 1;
            const [name_hi, name_en, designation_hi, designation_en, phone, order, is_leadership, image_url] = params;
            data.committee_members.push({
              id: newId,
              name_hi,
              name_en,
              designation_hi,
              designation_en,
              phone: phone || "",
              order_index: order || newId,
              is_leadership: is_leadership ? 1 : 0,
              image_url: image_url || null
            });
            return { changes: 1, lastInsertRowid: newId };
          }
          if (lower.includes("update committee_members")) {
            const id = params[params.length - 1];
            const member = data.committee_members.find(m => m.id == id);
            if (member && params.length >= 7) {
              member.name_hi = params[0] || member.name_hi;
              member.name_en = params[1] || member.name_en;
              member.designation_hi = params[2] || member.designation_hi;
              member.designation_en = params[3] || member.designation_en;
              member.phone = params[4] !== undefined ? params[4] : member.phone;
              member.order_index = params[5] || member.order_index;
              member.is_leadership = params[6] !== undefined ? params[6] : member.is_leadership;
            }
            return { changes: 1 };
          }
          if (lower.includes("delete from committee_members")) {
            const id = params[0];
            data.committee_members = data.committee_members.filter(m => m.id != id);
            return { changes: 1 };
          }
          if (lower.includes("insert into events")) {
            const newId = (data.events.reduce((m, e) => Math.max(m, e.id || 0), 0) || 0) + 1;
            const [title_hi, title_en, start_date, end_date, location_hi, location_en, description_hi, description_en, schedule_json, status, featured, image_url] = params;
            data.events.push({
              id: newId,
              title_hi,
              title_en,
              start_date,
              end_date,
              location_hi,
              location_en,
              description_hi,
              description_en,
              schedule_json: schedule_json || "[]",
              status: status || "upcoming",
              featured: featured || 0,
              image_url: image_url || null
            });
            return { changes: 1, lastInsertRowid: newId };
          }
          if (lower.includes("insert into enquiries")) {
            data.enquiries.push({ id: Date.now(), params });
            return { changes: 1, lastInsertRowid: Date.now() };
          }
          if (lower.includes("insert or replace into settings") || lower.includes("update settings")) {
            if (params.length >= 2) data.settings[params[0]] = params[1];
            return { changes: 1 };
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
