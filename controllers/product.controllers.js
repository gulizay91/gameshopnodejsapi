const Product = require('../models/product');



const productGet = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        res.status(200).json({ product });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}

const productGetAll = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const filter = categoryId ? { categoryId } : {};
        const products = await Product.find(filter);
        res.status(200).json({ products });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}

module.exports = {
    productGet,
    productGetAll
};