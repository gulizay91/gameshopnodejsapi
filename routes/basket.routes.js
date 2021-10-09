
// [Obsolete(use cart)]
const router = require('express').Router();
const BasketControllers = require('../controllers/basket.controllers');
const basketControllers = new BasketControllers();

router.get('/:userId', basketControllers.get);
router.post('', basketControllers.post);
router.delete('/:id', basketControllers.delete);

module.exports = router;