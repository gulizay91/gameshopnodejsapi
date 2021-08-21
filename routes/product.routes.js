
const router = require('express').Router();
const checkAuth = require('../middleware/auth.middleware');
const ProductControllers = require('../controllers/product.controllers');
const productControllers = new ProductControllers();

router.get('/:id', productControllers.productGet);
router.post('/', productControllers.productGetAll);
router.post('/save', checkAuth, productControllers.productSave);

module.exports = router;