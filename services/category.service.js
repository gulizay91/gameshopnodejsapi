const Category = require('../models/entities/category');
const ServiceResult = require('../models/exchanges/serviceResult');

class CategoryService {
    constructor() { };

    CategoryGetById = async (id) => {
        const serviceResult = new ServiceResult();
        try {
            let data = await Category.findById(id);
            return serviceResult.ServiceResultSuccess(data);
        }
        catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    CategoryGetAll = async () => {
        const serviceResult = new ServiceResult();
        try {
            let data = await Category.find({})
            return serviceResult.ServiceResultSuccess(data);
        }
        catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    CategorySave = async (categorySaveModel) => {
        const serviceResult = new ServiceResult();
        try {
            // we dont need update just insert
            if (!categorySaveModel._id) {
                const newCategory = new Category({ name: categorySaveModel.name, description: categorySaveModel.description });
                const saveCategory = await newCategory.save();
                return serviceResult.ServiceResultSuccess(saveCategory);
            }

        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

}

module.exports = CategoryService;