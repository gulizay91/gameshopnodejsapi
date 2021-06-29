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

        var pageOptions = {
            page: parseInt(req.body.page) - 1 || 0,
            limit: parseInt(req.body.limit) || 10
        }

        const products = await Product.find(filter)
            .sort({ title: 1 })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec();
        res.status(200).json({ products });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}

const productSave = async (req, res, next) => {
    try {
        const newProduct = new Product({
            categoryId: req.body.categoryId,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating
        });
        const saveProduct = await newProduct.save();
        res.json(saveProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}

module.exports = {
    productGet,
    productGetAll,
    productSave
};