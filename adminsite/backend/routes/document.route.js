const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Клиентские документы
router.post('/documents/client', authMiddleware, documentController.createClientDocument);
router.put('/documents/client/:id', authMiddleware, documentController.updateDocument);
router.delete('/documents/client/:id', authMiddleware, documentController.deleteDocument);

// Документы сотрудников
router.post('/documents/employee', authMiddleware, documentController.createEmployeeDocument);
router.put('/documents/employee/:id', authMiddleware, documentController.updateDocument);
router.delete('/documents/employee/:id', authMiddleware, documentController.deleteDocument);

// Документы автомобилей
router.post('/documents/car', authMiddleware, documentController.createCarDocument);
router.put('/documents/car/:id', authMiddleware, documentController.updateDocument);
router.delete('/documents/car/:id', authMiddleware, documentController.deleteDocument);

module.exports = router;