const Category = require('../models/entities/category');
const ServiceResult = require('../models/exchanges/serviceResult');

const categoryGet = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        let data = await Category.findById(req.params.id);
        return res.json(serviceResult.ServiceResultSuccess(data));
    }
    catch(error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

const categoryGetAll = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        let data = await Category.find({})
        return res.json(serviceResult.ServiceResultSuccess(data));
    }
    catch(error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

const categorySave = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    const name = req.body.name;
    const description = req.body.description;
    try {
        const newCategory = new Category({ name: name, description: description });
        const saveCategory = await newCategory.save();
        return res.json(serviceResult.ServiceResultSuccess(saveCategory));
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

module.exports = {
    categoryGet,
    categoryGetAll,
    categorySave
};