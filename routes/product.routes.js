
const router = require('express').Router();
const productControllers = require('../controllers/product.controllers');
const checkAuth = require('../middleware/auth.middleware');

router.get('/:id', productControllers.productGet);
router.post('/', productControllers.productGetAll);
router.post('/save', productControllers.productSave);

module.exports = router;