const app = require("./api/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌸 राणाजी छठ पूजा पार्क समिति (रजि.) Unified Server 🌸`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Static assets available at http://localhost:${PORT}/images`);
  console.log(`=======================================================`);
});
