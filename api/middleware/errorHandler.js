function errorHandler(err, req, res, next) {
  console.error("Server Error:", err);

  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "फाइल का आकार 10 MB से अधिक नहीं हो सकता। (File size cannot exceed 10 MB.)"
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "सर्वर पर एक आंतरिक त्रुटि हुई है। (Internal Server Error)",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
}

module.exports = errorHandler;

