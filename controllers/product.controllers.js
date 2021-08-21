const ProductService = require('../services/product.service');
const ProductListModel = require('../models/exchanges/product/requestProductList');
const ProductSaveModel = require('../models/exchanges/product/requestProductSave');

class ProductControllers {
    constructor() {
        this._productService = new ProductService();
    }

    productGet = async (req, res) => {
        let response = await this._productService.ProductGetById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

    productGetAll = async (req, res) => {
        const requestModel = new ProductListModel(req.body.categoryId,
            req.body.page, req.body.limit);
        let response = await this._productService.ProductGetAll(requestModel);
        return res.status(response.statusCode).json(response);
    }

    productSave = async (req, res, next) => {
        const requestModel = new ProductSaveModel(req.body.categoryId,
            req.body.title, req.body.description, req.body.price, req.body.rating);
        let response = await this._productService.ProductSave(requestModel);
        return res.status(response.statusCode).json(response);
    }
}

module.exports = ProductControllers;
