
const CartService = require('../services/cart.service');
const CartSaveModel = require('../models/exchanges/cart/requestCartSave');

class CartControllers {
    constructor() {
        this._cartService = new CartService();
    }

    get = async (req, res, next) => {
        let response = await this._cartService.CartGetByUserId(req.params.userId);
        return res.status(response.statusCode).json(response);
    }

    post = async (req, res, next) => {
        const requestModel = new CartSaveModel(req.body.userId, req.body.productId,
            req.body.increaseOrDecrease);
        let response = await this._cartService.CartSave(requestModel);
        return res.status(response.statusCode).json(response);
    }

    delete = async (req, res, next) => {
        const { userId, productId } = req.query;
        let response = await this._cartService.CartClearByUserId(userId, productId);
        return res.status(response.statusCode).json(response);
    }

}

module.exports = CartControllers;

