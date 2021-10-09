const Cart = require('../models/entities/cart');
const { Product } = require('../models/entities/product');
const ServiceResult = require('../models/exchanges/serviceResult');
const { ResponseCart } = require('../models/exchanges/cart/responseCart');

class CartService {
    constructor() { };

    CartGetByUserId = async (userId) => {
        const serviceResult = new ServiceResult();
        try {
            let cartItems = await Cart.find({ user: userId }).populate("product", "title image price", Product);
            let data = new ResponseCart(cartItems, cartItems.reduce((total, item) => item.totalQty + total, 0), cartItems.reduce((total, item) => item.totalPrice + total, 0));
            return serviceResult.ServiceResultSuccess(data);
        }
        catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    CartSave = async (cartSaveModel) => {
        const serviceResult = new ServiceResult();
        try {

            let product = await Product.findById(cartSaveModel.productId);
            if(!product)
                return serviceResult.ServiceResultError("Not found product for adding to cart!");

            let userCart = await Cart.findOne({ user: cartSaveModel.userId, product: cartSaveModel.productId });
            if(!userCart)
            {
                if(cartSaveModel.increaseOrDecrease < 0)
                    return serviceResult.ServiceResultError("Not found product for remove from cart!");

                const newCart = new Cart({ user: cartSaveModel.userId, product: product._id, totalQty: 1, totalPrice: product.price });
                userCart = await newCart.save();
                console.log("new cart created for user");
                return serviceResult.ServiceResultSuccess(userCart);
            }
            else
            {
                if(cartSaveModel.increaseOrDecrease > 0)
                {
                    userCart.totalQty++;
                    userCart.totalPrice = userCart.totalQty * product.price;
                }
                else if(cartSaveModel.increaseOrDecrease < 0)
                {
                    if(userCart.totalQty == 1)
                    {
                        let removeData = await Cart.deleteOne({ _id: userCart._id });
                        return serviceResult.ServiceResultSuccess(removeData);
                    }
                    else
                    {
                        userCart.totalQty--;
                        userCart.totalPrice -= product.price;
                    }
                }

                let data = await Cart.findOneAndUpdate({_id: userCart._id},
                    userCart, { new: true });
                return serviceResult.ServiceResultSuccess(data);
            }
        }
        catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    CartClearByUserId = async (userId, productId) => {
        const serviceResult = new ServiceResult();
        try {
            const filter = { user: userId };
            if(productId)
                filter = { user: userId, product: productId };

            let data = await Cart.deleteMany(filter, { new: true });
            return serviceResult.ServiceResultSuccess(data);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

}

module.exports = CartService;