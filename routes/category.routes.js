const router = require('express').Router();
const checkAuth = require('../middleware/auth.middleware');

const CategoryControllers = require('../controllers/category.controllers');
const categoryControllers = new CategoryControllers();

router.get('', categoryControllers.get);
router.post('', checkAuth, categoryControllers.post);

module.exports = router;