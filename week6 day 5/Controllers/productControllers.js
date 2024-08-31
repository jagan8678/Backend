const Product = require('../models/productModel');


// Create Product (Admin Only)
exports.addProduct = async (req, res) => {
    const { name, price, description, tax, discount } = req.body;


    try {
        const product = new Product({
            name,
            price,
            description,
            tax,
            discount,
            user: req.user._id,
        });
        await product.save();
        res.status(201).json({ message: 'Product added', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get All Products (Accessible by all logged-in users)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get Product By ID (Accessible by all logged-in users)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);


        if (!product) return res.status(404).json({ message: 'Product not found' });


        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }


        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });


        res.json({ message: 'Product updated', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);


        if (!product) return res.status(404).json({ message: 'Product not found' });


        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }


        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
