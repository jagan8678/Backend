const express = require('express');
const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../Controllers/productControllers');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', protect, admin, addProduct);                   // Create Product (Admin only)
router.get('/', protect, getProducts);                          // Read All Products (Any logged-in user)
router.get('/:productId', protect, getProductById);             // Read Single Product (Any logged-in user)
router.put('/:productId', protect, admin, updateProduct);       // Update Product (Admin only, must own the product)
router.delete('/:productId', protect, admin, deleteProduct);    // Delete Product (Admin only, must own the product)


module.exports = router;
