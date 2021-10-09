
const BasketService = require('../services/basket.service');
const BasketSaveModel = require('../models/exchanges/basket/requestBasketSave');

// [Obsolete(use cart)]
class BasketControllers {
    constructor() {
        this._basketService = new BasketService();
    }

    get = async (req, res, next) => {
        let response = await this._basketService.BasketGetByUserId(req.params.userId);
        return res.status(response.statusCode).json(response);
    }

    post = async (req, res, next) => {
        const requestModel = new BasketSaveModel(req.body.userId, req.body.productId,
            req.body.increaseOrDecrease);
        let response = await this._basketService.BasketSave(requestModel);
        return res.status(response.statusCode).json(response);
    }

    delete = async (req, res, next) => {
        let response = await this._basketService.BasketClearById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

}

module.exports = BasketControllers;

