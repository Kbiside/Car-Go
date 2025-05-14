const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Импорт роутеров
const clientRouter = require('./routes/clientRouter');
const carRouter = require('./routes/carRouter');
const employeeRouter = require('./routes/employeeRouter');
const requestRouter = require('./routes/requestRouter');

// Создание Express-приложения
const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статическая папка для загружаемых файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/clients', clientRouter);
app.use('/api/cars', carRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/requests', requestRouter);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; // Для тестирования