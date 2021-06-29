const Category = require('../models/category');

const getCategory = async (req, res, next) => {
    try {
        let data = await Category.findById(req.params.id)
        res.status(200).json(data);
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        });
    }
}

const getCategories = async (req, res, next) => {
    try {
        let data = await Category.find({})
        res.status(200).json(data);
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        });
    }
}

const categorySave = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    try {
        const newCategory = new Category({ name: name, description: description });
        const saveCategory = await newCategory.save();
        res.json( saveCategory );
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}

module.exports = {
    getCategory,
    getCategories,
    categorySave
};