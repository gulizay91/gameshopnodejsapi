const Basket = require('../models/entities/basket');
const ServiceResult = require('../models/exchanges/serviceResult');

class BasketService {
    constructor() { };

    BasketGetByUserId = async (userId) => {
        const serviceResult = new ServiceResult();
        try {
            let data = await Basket.find({ userId });
            // if(!data)
            //     return new Basket();
            console.log(data)
            return serviceResult.ServiceResultSuccess(data);
        }
        catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    BasketSave = async (basketSaveModel) => {
        const serviceResult = new ServiceResult();
        try {
            if (!basketSaveModel.id) {
                const newBasket = new Basket({
                    items: basketSaveModel.products, totalQty: basketSaveModel.totalQty,
                    totalPrice: basketSaveModel.totalPrice, userId: basketSaveModel.userId
                });
                const saveBasket = await newBasket.save();
                return serviceResult.ServiceResultSuccess(saveBasket);
            }
            else {
                // todo: update
                //return serviceResult.ServiceResultSuccess(updateBasket);
            }
        }
        catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    BasketClearById = async (id) => {
        const serviceResult = new ServiceResult();
        try {
            let data = await Basket.findByIdAndUpdate(id,
                { $set: { products: [], totalQty: 0, totalPrice: 0 } }, { new: true });
            return serviceResult.ServiceResultSuccess(data);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }


}

module.exports = BasketService;