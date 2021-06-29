
const router = require('express').Router();
const productControllers = require('../controllers/product.controllers');
const checkAuth = require('../middleware/auth.middleware');

router.get('/:id', checkAuth, productControllers.productGet);
router.post('/', checkAuth, productControllers.productGetAll);

module.exports = router;