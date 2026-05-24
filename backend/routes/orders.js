const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  placeOrder, getOrders, getOrder, updateOrderStatus
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.patch('/:id/status', auth, updateOrderStatus);

module.exports = router;