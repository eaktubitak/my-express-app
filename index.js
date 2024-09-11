const express = require('express');
const app = express();

// Route tanımı
app.get('/', (req, res) => {
  res.send('Hello World! Here is the updated version of my-express-app!');
});

// Sunucuyu başlatma işlemi (Geliştirme sırasında kullanılabilir)
if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
}

// app nesnesini dışa aktar
module.exports = app;
