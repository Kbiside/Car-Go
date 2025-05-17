const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cars', authMiddleware, carController.createCar);
router.get('/cars', carController.getCars);
router.get('/cars/available', carController.getAvailableCars);
router.get('/cars/search', carController.searchCars);
router.get('/cars/:id', carController.getOneCar);
router.get('/cars/:carId/documents', authMiddleware, carController.getCarDocuments);
router.put('/cars/:id', authMiddleware, carController.updateCar);
router.patch('/cars/:id/availability', authMiddleware, carController.updateCarAvailability);
router.delete('/cars/:id', authMiddleware, carController.deleteCar);

module.exports = router;