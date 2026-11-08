const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "ranaji-chhath-puja-samiti-secret-key-2026-jai-chhathi-maiya";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "प्रमाणीकरण टोकन आवश्यक है (Authentication token required)" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "टोकन अमान्य या समाप्त हो गया है (Invalid or expired token)" });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  JWT_SECRET
};

