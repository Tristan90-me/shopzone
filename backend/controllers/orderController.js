const Order = require('../models/Order');
const Settings = require('../models/Settings');

// POST /api/orders — place an order (public)
exports.placeOrder = async (req, res) => {
  try {
    const { customer, items, deliveryType, deliveryAddress } = req.body;

    const settings = await Settings.findOne();
    const deliveryFee = (deliveryType === 'delivery' && settings?.deliveryEnabled)
      ? (settings.deliveryFee || 0) : 0;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      customer,
      items,
      subtotal,
      deliveryFee,
      total,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : '',
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/orders — all orders (admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/orders/:id — single order (admin)
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/orders/:id/status — update status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};