const Product = require('../models/entities/product');
const ServiceResult = require('../models/exchanges/serviceResult');
const { ResponseProducts } = require('../models/exchanges/product/responseProductList');

class ProductService {
    constructor() { };

    ProductGetById = async (productId) => {

        const serviceResult = new ServiceResult();
        try {
            const product = await Product.findById(productId);
            return serviceResult.ServiceResultSuccess(product);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    ProductGetAll = async (productListRequestModel) => {

        const serviceResult = new ServiceResult();
        try {
            const categoryId = productListRequestModel.categoryId;
            const filter = categoryId ? { categoryId } : {};

            var pageOptions = {
                page: parseInt(productListRequestModel.page) - 1 || 0,
                limit: parseInt(productListRequestModel.limit) || 10
            }

            const products = await Product.find(filter)
                .sort({ title: 1 })
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit)
                .exec();
            const productTotalCount = await Product.count(filter);
            const responseProducts = new ResponseProducts(products, productTotalCount);

            return serviceResult.ServiceResultSuccess(responseProducts);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    ProductSave = async (productSaveModel) => {

        const serviceResult = new ServiceResult();
        try {
            const newProduct = new Product({
                categoryId: productSaveModel.categoryId,
                title: productSaveModel.title,
                description: productSaveModel.description,
                price: productSaveModel.price,
                rating: productSaveModel.rating,
                imageLogo: productSaveModel.imageLogo,
                image: productSaveModel.image
            });
            const saveProduct = await newProduct.save();
            return serviceResult.ServiceResultSuccess(saveProduct);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }
}

module.exports = ProductService;