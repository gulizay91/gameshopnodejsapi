
const BasketService = require('../services/basket.service');
const BasketSaveModel = require('../models/exchanges/basket/requestBasketSave');

class BasketControllers {
    constructor() {
        this._basketService = new BasketService();
    }

    basketGet = async (req, res, next) => {
        let response = await this._basketService.BasketGetByUserId(req.params.user_id);
        return res.status(response.statusCode).json(response);
    }


    basketSave = async (req, res, next) => {
        const requestModel = new BasketSaveModel(req.body._id, req.body.products,
            req.body.totalQty, req.body.totalPrice, req.body.userId);
        let response = await this._basketService.BasketSave(requestModel);
        return res.status(response.statusCode).json(response);
    }

    basketClear = async (req, res, next) => {
        let response = await this._basketService.BasketClearById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

}

module.exports = BasketControllers;

