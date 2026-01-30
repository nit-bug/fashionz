const express = require('express');
const cartController = require('../controllers/cart.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authMiddleware, cartController.addItem);
router.get('/', authMiddleware, cartController.getCart);

module.exports = router;
