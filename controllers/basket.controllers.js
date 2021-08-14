const Basket = require('../models/entities/basket');
const ServiceResult = require('../models/exchanges/serviceResult');

const basketGet = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        var userId = req.params.user_id;
        
        let data = await Basket.find({userId});
        // if(!data)
        //     return new Basket();
        console.log(data)
        return res.json(serviceResult.ServiceResultSuccess(data));
    }
    catch(error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

const basketSave = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        const products = req.body.products;
        const totalQty = req.body.totalQty;
        const totalPrice = req.body.totalPrice;
        const userId = req.body.userId;
        // todo: update
        const newBasket = new Basket({ items: products, totalQty: totalQty, totalPrice: totalPrice, userId: userId });
        const saveBasket = await newBasket.save();
        return res.json(serviceResult.ServiceResultSuccess(saveBasket));
    }
    catch(error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

const basketClear = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    
    try {
        let data = await Basket.findByIdAndUpdate(req.params.id,
            { $set: { products: [], totalQty: 0, totalPrice: 0 }}, {new: true});
        return res.json(serviceResult.ServiceResultSuccess(data));
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

module.exports = {
    basketGet,
    basketSave,
    basketClear
};