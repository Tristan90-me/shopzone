const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  price:         { type: Number, required: true },
  image:         { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  description:   { type: String, default: '' },
  category:      { type: String, required: true, trim: true },
  stock:         { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);