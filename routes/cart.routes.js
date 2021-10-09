const router = require('express').Router();
const CartControllers = require('../controllers/cart.controllers');
const cartControllers = new CartControllers();

router.get('/:userId', cartControllers.get);
router.post('', cartControllers.post);
router.delete('', cartControllers.delete);

module.exports = router;