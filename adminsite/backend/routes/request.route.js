const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/requests', requestController.createRequest);
router.get('/requests', requestController.getRequests);
router.get('/requests/:id', requestController.getOneRequest);
router.get('/requests/client/:clientId', requestController.getClientRequests);
router.get('/requests/car/:carId', requestController.getCarRequests);
router.put('/requests/:id', requestController.updateRequest);
router.delete('/requests/:id', requestController.deleteRequest);

module.exports = router;