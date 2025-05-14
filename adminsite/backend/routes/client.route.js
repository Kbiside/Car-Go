const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Маршруты для работы с клиентами
router.post('/clients', clientController.createClient);
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getOneClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;