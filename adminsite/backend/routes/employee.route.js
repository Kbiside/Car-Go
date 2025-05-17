const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/employees', authMiddleware, adminMiddleware, employeeController.createEmployee);
router.get('/employees', authMiddleware, employeeController.getEmployees);
router.get('/employees/:id', authMiddleware, employeeController.getOneEmployee);
router.get('/employees/:employeeId/documents', authMiddleware, employeeController.getEmployeeDocuments);
router.put('/employees/:id', authMiddleware, adminMiddleware, employeeController.updateEmployee);
router.delete('/employees/:id', authMiddleware, adminMiddleware, employeeController.deleteEmployee);

module.exports = router;