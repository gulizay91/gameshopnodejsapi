const router = require('express').Router();
const checkAuth = require('../middleware/auth.middleware');

const CategoryControllers = require('../controllers/category.controllers');
const categoryControllers = new CategoryControllers();

router.get('/:id', categoryControllers.categoryGet);
router.post('/', categoryControllers.categoryGetAll);
router.post('/save', checkAuth, categoryControllers.categorySave);

module.exports = router;