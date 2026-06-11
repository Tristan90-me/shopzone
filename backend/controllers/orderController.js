const Order = require('../models/Order');
const Settings = require('../models/Settings');

// POST /api/orders — place an order (public)
exports.placeOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      deliveryType,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      note,
    } = req.body;

    // Basic validation
    if (!customer?.phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have at least one item' });
    }
    if (!deliveryType) {
      return res.status(400).json({ message: 'Delivery type is required' });
    }

    // Sanitize items — product ref is optional
    const sanitizedItems = items.map(item => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      ...(item.product ? { product: item.product } : {}),
    }));

    // Recalculate totals server-side for safety
    const calculatedSubtotal = sanitizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    let calculatedDeliveryFee = 0;
    if (deliveryType === 'delivery') {
      const settings = await Settings.findOne();
      calculatedDeliveryFee = settings?.deliveryEnabled
        ? (settings.deliveryFee || 0)
        : 0;
    }

    const order = await Order.create({
      customer: {
        name: customer.name || '',
        phone: customer.phone,
      },
      items: sanitizedItems,
      subtotal: calculatedSubtotal,
      deliveryFee: calculatedDeliveryFee,
      total: calculatedSubtotal + calculatedDeliveryFee,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? (deliveryAddress || '') : '',
      note: note || '',
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Place order error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
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
    const validStatuses = ['pending', 'ready', 'delivered', 'pickedup'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
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