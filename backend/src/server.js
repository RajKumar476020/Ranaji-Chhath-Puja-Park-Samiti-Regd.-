const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌸 राणाजी छठ पूजा पार्क समिति (रजि.) Backend API 🌸`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads available at http://localhost:${PORT}/uploads`);
  console.log(`=======================================================`);
});
