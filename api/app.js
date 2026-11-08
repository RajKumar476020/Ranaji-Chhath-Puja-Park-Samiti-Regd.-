const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Ensure database is initialized
require("./config/database");

const apiRoutes = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static public/uploads directory if present
const uploadsDir = path.resolve(__dirname, "../public/images");
if (fs.existsSync(uploadsDir)) {
  app.use("/uploads", express.static(uploadsDir));
  app.use("/images", express.static(uploadsDir));
}

// Health check endpoint
app.get(["/api/health", "/health"], (req, res) => {
  res.json({
    status: "healthy",
    samiti: "राणाजी छठ पूजा पार्क समिति (रजि.)",
    timestamp: new Date().toISOString()
  });
});

// Mount api routes on both /api and /
app.use("/api", apiRoutes);
app.use("/", apiRoutes);

// In local production mode (non-serverless), serve built dist if present
const distPath = path.resolve(__dirname, "../dist");
if (fs.existsSync(distPath) && !process.env.VERCEL) {
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads") || req.path.startsWith("/images")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
