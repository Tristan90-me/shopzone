const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  orderNumber: { type: String, default: '' },
  message: { type: String, required: true },
  replies: [replySchema],
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new',
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);