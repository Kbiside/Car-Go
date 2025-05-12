const express = require('express');
const cors = require('cors');
const { callback } = require('chart.js/helpers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(cors());
app.use(express.json()); // Для парсинга JSON

// Пример маршрута
app.get('/', (req, res) => {
  res.send('working');
});

// Запуск сервера
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});