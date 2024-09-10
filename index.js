const express = require('express');
const app = express();

// Route tanımı
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sunucu başlatma
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));

// app nesnesini export et
module.exports = app;
