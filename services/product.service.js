const { Product }  = require('../models/entities/product');
const ServiceResult = require('../models/exchanges/serviceResult');
const { ResponseProducts } = require('../models/exchanges/product/responseProduct');

class ProductService {
    constructor() { };

    ProductGet = async (productGetRequestModel) => {
        const serviceResult = new ServiceResult();
        try {
            let filter = {};
            const _id = productGetRequestModel.id;
            const categoryId = productGetRequestModel.categoryId;

            if(_id != null)
                filter = { _id };
            else if(categoryId)
                filter = { categoryId };

            var pageOptions = {
                page: parseInt(productGetRequestModel.page) - 1 || 0,
                limit: parseInt(productGetRequestModel.limit) || 10
            }

            // todo: sort

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