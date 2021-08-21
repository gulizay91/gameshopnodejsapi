const CategoryService = require('../services/category.service');
const CategorySaveModel = require('../models/exchanges/category/requestCategorySave');

class CategoryControllers {
    constructor() {
        this._categoryService = new CategoryService();
    }

    categoryGet = async (req, res, next) => {
        let response = await this._categoryService.CategoryGetById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

    categoryGetAll = async (req, res, next) => {
        let response = await this._categoryService.CategoryGetAll();
        return res.status(response.statusCode).json(response);
    }

    categorySave = async (req, res, next) => {
        const requestModel = new CategorySaveModel(req.body._id, req.body.name, req.body.description);
        let response = await this._categoryService.CategorySave(requestModel);
        return res.status(response.statusCode).json(response);
    }

}

module.exports = CategoryControllers;