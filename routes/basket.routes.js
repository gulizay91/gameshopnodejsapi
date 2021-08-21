
const router = require('express').Router();
const BasketControllers = require('../controllers/basket.controllers');
const basketControllers = new BasketControllers();

router.get('/:user_id', basketControllers.basketGet);
router.post('/save', basketControllers.basketSave);
router.post('/clear/:id', basketControllers.basketClear);

module.exports = router;