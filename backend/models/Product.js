const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  price:         { type: Number, required: true },
  image:         { type: String, default: '' },       // keeps first image for cards
  images:        { type: [String], default: [] },     // all images array
  imagePublicIds:{ type: [String], default: [] },     // cloudinary public IDs for deletion
  description:   { type: String, default: '' },
  category:      { type: String, required: true, trim: true },
  stock:         { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);