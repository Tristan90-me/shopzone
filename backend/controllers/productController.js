const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products/:id
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products (admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const images = req.files ? req.files.map(f => f.path) : [];
    const imagePublicIds = req.files ? req.files.map(f => f.filename) : [];
    const image = images[0] || '';

    const product = await Product.create({
      name, price, description, category, stock,
      image, images, imagePublicIds,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/products/:id (admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updates = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
    };

    // Which existing images to keep (sent from frontend as JSON array)
    let keptImages = [];
    let keptPublicIds = [];
    if (req.body.keptImages) {
      try {
        keptImages = JSON.parse(req.body.keptImages);
        keptPublicIds = JSON.parse(req.body.keptPublicIds || '[]');
      } catch {}
    }

    // Delete removed images from Cloudinary
    const removedPublicIds = product.imagePublicIds.filter(
      id => !keptPublicIds.includes(id)
    );
    for (const pid of removedPublicIds) {
      try { await cloudinary.uploader.destroy(pid); } catch {}
    }

    // New uploaded images
    const newImages = req.files ? req.files.map(f => f.path) : [];
    const newPublicIds = req.files ? req.files.map(f => f.filename) : [];

    // Merge kept + new
    const allImages = [...keptImages, ...newImages];
    const allPublicIds = [...keptPublicIds, ...newPublicIds];

    updates.images = allImages;
    updates.imagePublicIds = allPublicIds;
    updates.image = allImages[0] || '';

    const updated = await Product.findByIdAndUpdate(
      req.params.id, updates, { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/products/:id (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete all images from Cloudinary
    for (const pid of product.imagePublicIds || []) {
      try { await cloudinary.uploader.destroy(pid); } catch {}
    }
    // Also try legacy single image
    if (product.imagePublicId) {
      try { await cloudinary.uploader.destroy(product.imagePublicId); } catch {}
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products/best-sellers
exports.getBestSellers = async (req, res) => {
  try {
    const Order = require('../models/Order');
    const mongoose = require('mongoose');

    const topSellers = await Order.aggregate([
      { $unwind: '$items' },
      { $match: { 'items.product': { $exists: true, $type: 'objectId' } } },
      { $group: { _id: '$items.product', totalSold: { $sum: '$items.quantity' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 8 },
    ]);

    if (!topSellers || topSellers.length === 0) return res.json([]);

    const results = [];
    for (const seller of topSellers) {
      const product = await Product.findById(seller._id);
      if (product) results.push({ ...product.toObject(), totalSold: seller.totalSold });
    }

    res.json(results);
  } catch (err) {
    console.error('Best sellers error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};