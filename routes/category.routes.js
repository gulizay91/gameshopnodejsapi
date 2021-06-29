const router = require('express').Router();
const categoryControllers = require('../controllers/category.controllers');

router.get('', (req, res) => {
    res.send("categories");
});

router.get('/:id', categoryControllers.getCategory);
router.post('/', categoryControllers.getCategories);
router.post('/save', categoryControllers.categorySave);

module.exports = router;