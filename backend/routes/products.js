const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  getProducts,
  getProduct,
  getBestSellers,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/best-sellers', getBestSellers);
router.get('/:id', getProduct);
router.post('/', auth, upload.array('images', 10), createProduct);
router.put('/:id', auth, upload.array('images', 10), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;