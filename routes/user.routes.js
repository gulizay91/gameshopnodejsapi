
const router = require('express').Router();
const userControllers = require('../controllers/user.controllers');
const checkAuth = require('../middleware/auth.middleware');

router.get('', (req, res) => {
    res.send("users");
});

router.get('/:id', checkAuth, userControllers.userGet);
router.post('/signup', userControllers.userRegister);
router.post('/login', userControllers.userLogin);

module.exports = router;