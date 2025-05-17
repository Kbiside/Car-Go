const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/clients', authMiddleware, clientController.createClient);
router.get('/clients', authMiddleware, clientController.getClients);
router.get('/clients/:id', authMiddleware, clientController.getOneClient);
router.get('/clients/:clientId/documents', authMiddleware, clientController.getClientDocuments);
router.put('/clients/:id', authMiddleware, clientController.updateClient);
router.delete('/clients/:id', authMiddleware, clientController.deleteClient);

module.exports = router;