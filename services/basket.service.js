const { Basket, BasketItem } = require('../models/entities/basket');
const { Product } = require('../models/entities/product');
const ServiceResult = require('../models/exchanges/serviceResult');

// [Obsolete(use cart)]
class BasketService {
    constructor() { };

    BasketGetByUserId = async (userId) => {
        const serviceResult = new ServiceResult();
        try {
            let data = await Basket.findOne({ userId }).populate("productId", "title image price", Product);
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

            let userBasket = await Basket.findOne({ userId: basketSaveModel.userId });
            
            if(!userBasket)
            {
                // if(basketSaveModel.productId)
                //     return serviceResult.ServiceResultError("Not found basket for user!");

                const newBasket = new Basket({
                    items: [], totalQty: 0,
                    totalPrice: 0, userId: basketSaveModel.userId
                });
                const saveBasket = await newBasket.save();
                userBasket = saveBasket;
                //return serviceResult.ServiceResultSuccess(saveBasket);
                console.log("new basket created for user");
            }
            
            if(basketSaveModel.productId)
            {
                let product = await Product.findById(basketSaveModel.productId);
                if(!product)
                    return serviceResult.ServiceResultError("Not found product for adding to basket!");
                
                let basketProductIndex = userBasket.items?.findIndex(pId => pId.productId == basketSaveModel.productId);
                if(basketProductIndex > -1)
                {
                    if(basketSaveModel.increaseOrDecrease > 0)
                    {
                        userBasket.items[basketProductIndex].totalQty++;
                        userBasket.items[basketProductIndex].totalPrice = userBasket.items[basketProductIndex].totalQty * product.price;
                    }
                    else if(basketSaveModel.increaseOrDecrease < 0)
                    {
                        if(userBasket.items[basketProductIndex].totalQty == 1)
                        {
                            userBasket.items.splice(basketProductIndex, 1);
                        }
                        else
                        {
                            userBasket.items[basketProductIndex].totalQty--;
                            userBasket.items[basketProductIndex].totalPrice -= product.price;
                        }
                    }
                }
                else
                {
                    if(basketSaveModel.increaseOrDecrease < 0)
                        return serviceResult.ServiceResultError("Not found product for remove from basket!");

                    userBasket.items.push(new BasketItem({ productId: product._id, totalQty: 1, totalPrice: product.price}));
                }

                userBasket.totalQty = userBasket?.items.reduce((total, item) => item.totalQty + total, 0);
                userBasket.totalPrice = userBasket?.items.reduce((total, item) => item.totalPrice + total, 0);

                let data = await Basket.findOneAndUpdate({_id: userBasket._id},
                    userBasket, { new: true });
                return serviceResult.ServiceResultSuccess(data);
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
                { $set: { items: [], totalQty: 0, totalPrice: 0 } }, { new: true });
            return serviceResult.ServiceResultSuccess(data);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }


}

module.exports = BasketService;