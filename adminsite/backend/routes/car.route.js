const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/cars', carController.createCar);
router.get('/cars', carController.getCars);
router.get('/cars/available', carController.getAvailableCars);
router.get('/cars/search', carController.searchCars);
router.get('/cars/:id', carController.getOneCar);
router.put('/cars/:id', carController.updateCar);
router.patch('/cars/:id/availability', carController.updateCarAvailability);
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;