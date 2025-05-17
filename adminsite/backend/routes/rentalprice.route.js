const express = require('express');
const router = express.Router();
const rentalPriceController = require('../controllers/rentalPriceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/rental-prices', authMiddleware, rentalPriceController.createRentalPrice);
router.get('/rental-prices/car/:carId/current', rentalPriceController.getCurrentPriceForCar);
router.get('/rental-prices/car/:carId', rentalPriceController.getPricesForCar);
router.put('/rental-prices/:id', authMiddleware, rentalPriceController.updateRentalPrice);
router.delete('/rental-prices/:id', authMiddleware, rentalPriceController.deleteRentalPrice);

module.exports = router;