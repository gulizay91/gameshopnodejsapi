const Product = require('../models/entities/product');
const ServiceResult = require('../models/exchanges/serviceResult');

const productGet = async (req, res) => {

    const serviceResult = new ServiceResult();
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        return res.json(serviceResult.ServiceResultSuccess(product));
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

const productGetAll = async (req, res) => {

    const serviceResult = new ServiceResult();
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
        return res.json(serviceResult.ServiceResultSuccess(products));
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

const productSave = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        const newProduct = new Product({
            categoryId: req.body.categoryId,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating
        });
        const saveProduct = await newProduct.save();
        return res.json(serviceResult.ServiceResultSuccess(saveProduct));
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

module.exports = {
    productGet,
    productGetAll,
    productSave
};