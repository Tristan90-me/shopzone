const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  name: String,
  price: Number,
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    phone: { type: String, required: true },
    name: { type: String, default: '' },
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  deliveryType: {
    type: String,
    enum: ['pickup', 'delivery'],
    required: true,
  },
  deliveryAddress: { type: String, default: '' },
  note: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'ready', 'delivered', 'pickedup'],
    default: 'pending',
  },
}, { timestamps: true });

// Auto-generate order number before saving
orderSchema.pre('save', async function () {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = 'ORD-' + String(count + 1).padStart(4, '0');
  }
});

module.exports = mongoose.model('Order', orderSchema);