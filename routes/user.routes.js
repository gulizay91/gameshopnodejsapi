const router = require('express').Router();
const checkAuth = require('../middleware/auth.middleware');

const UserControllers = require('../controllers/user.controllers');
const userControllers = new UserControllers();

const UserAddressControllers = require('../controllers/userAddress.controllers');
const userAddressControllers = new UserAddressControllers();

router.get('/:id', checkAuth, userControllers.userGet);
// todo: '/' register user, use 3th module like identityserver for login
//router.post('/', userControllers.userRegister);
router.post('/signup', userControllers.userRegister);
router.post('/signin', userControllers.userLogin);
router.put('/', checkAuth, userControllers.userUpdate);

router.get('/userAddresses/:userId', checkAuth, userAddressControllers.userAddressGet);
router.post('/userAddresses', checkAuth, userAddressControllers.userAddressSave);
router.put('/userAddresses', checkAuth, userAddressControllers.userAddressUpdate);
router.delete('/userAddresses/:id', checkAuth, userAddressControllers.userAddressDelete);

module.exports = router;