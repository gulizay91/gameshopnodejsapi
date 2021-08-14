const router = require('express').Router();
const categoryControllers = require('../controllers/category.controllers');
const checkAuth = require('../middleware/auth.middleware');

router.get('/:id', categoryControllers.categoryGet);
router.post('/', categoryControllers.categoryGetAll);
router.post('/save', checkAuth, categoryControllers.categorySave);

module.exports = router;