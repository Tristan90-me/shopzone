const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  deliveryEnabled:  { type: Boolean, default: true },
  deliveryFee:      { type: Number, default: 0 },
  pickupEnabled:    { type: Boolean, default: true },
  storeName:        { type: String, default: 'ShopZone' },
  currencyCode:     { type: String, default: 'USD' },
  currencySymbol:   { type: String, default: '$' },
  currencyPosition: { type: String, default: 'before' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);