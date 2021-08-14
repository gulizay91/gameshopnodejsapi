
const router = require('express').Router();
const basketControllers = require('../controllers/basket.controllers');

router.get('/:user_id', basketControllers.basketGet);
router.post('/save', basketControllers.basketSave);
router.post('/clear/:id', basketControllers.basketClear);

module.exports = router;