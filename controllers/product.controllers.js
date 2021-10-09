const ProductService = require('../services/product.service');
const ProductGetModel = require('../models/exchanges/product/requestProductGet');
const ProductSaveModel = require('../models/exchanges/product/requestProductSave');

class ProductControllers {
    constructor() {
        this._productService = new ProductService();
    }

    get = async (req, res) => {
        const { id, categoryId, page, limit } = req.query;
        const requestModel = new ProductGetModel(id, categoryId,
            page, limit);
        let response = await this._productService.ProductGet(requestModel);
        return res.status(response.statusCode).json(response);
    }

    post = async (req, res, next) => {
        const requestModel = new ProductSaveModel(req.body.categoryId,
            req.body.title, req.body.description, req.body.price, req.body.rating, req.body.imageLogo, req.body.image);
        let response = await this._productService.ProductSave(requestModel);
        return res.status(response.statusCode).json(response);
    }
}

module.exports = ProductControllers;
