const CategoryService = require('../services/category.service');
const CategorySaveModel = require('../models/exchanges/category/requestCategorySave');

class CategoryControllers {
    constructor() {
        this._categoryService = new CategoryService();
    }

    get = async (req, res, next) => {
        let response = await this._categoryService.CategoryGet(req.query);
        return res.status(response.statusCode).json(response);
    }

    post = async (req, res, next) => {
        const requestModel = new CategorySaveModel(req.body._id, req.body.name, req.body.description);
        let response = await this._categoryService.CategorySave(requestModel);
        return res.status(response.statusCode).json(response);
    }

}

module.exports = CategoryControllers;