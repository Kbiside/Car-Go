const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/requests', authMiddleware, requestController.createRequest);
router.get('/requests', authMiddleware, requestController.getRequests);
router.get('/requests/:id', authMiddleware, requestController.getOneRequest);
router.get('/requests/client/:clientId', authMiddleware, requestController.getClientRequests);
router.get('/requests/car/:carId', authMiddleware, requestController.getCarRequests);
router.put('/requests/:id', authMiddleware, requestController.updateRequest);
router.delete('/requests/:id', authMiddleware, requestController.deleteRequest);

module.exports = router;