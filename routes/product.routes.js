
const router = require('express').Router();
const checkAuth = require('../middleware/auth.middleware');

const ProductControllers = require('../controllers/product.controllers');
const productControllers = new ProductControllers();

router.get('', productControllers.get);
router.post('', checkAuth, productControllers.post);

module.exports = router;