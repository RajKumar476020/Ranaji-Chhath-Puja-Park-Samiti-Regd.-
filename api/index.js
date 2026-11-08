const app = require("../backend/src/app");

module.exports = (req, res) => {
  // Normalize URL prefix for Vercel serverless invocation
  if (!req.url.startsWith("/api") && !req.url.startsWith("/uploads")) {
    req.url = "/api" + (req.url.startsWith("/") ? req.url : "/" + req.url);
  }
  return app(req, res);
};
