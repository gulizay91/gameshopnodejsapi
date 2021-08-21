const router = require('express').Router();
const checkAuth = require('../middleware/auth.middleware');

const UserControllers = require('../controllers/user.controllers');
const userControllers = new UserControllers();

router.get('/:id', checkAuth, userControllers.userGet);
router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);

module.exports = router;