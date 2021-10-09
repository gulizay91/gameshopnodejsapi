const UserRegisterModel = require('../models/exchanges/user/requestUserRegister');
const UserLoginModel = require('../models/exchanges/user/requestUserLogin');
const UserUpdateModel = require('../models/exchanges/user/requestUserUpdate');
const UserService = require('../services/user.service');

class UserControllers {
    constructor() {
        //console.log("constructor no parameter")
        this._userService = new UserService();
    };
    // constructor(userService) {
    //     console.log("constructor with parameter")
    //     this._userService = userService;
    // };

    userRegister = async (req, res, next) => {
        const requestModel = new UserRegisterModel(req.body.username,
            req.body.password, req.body.email,
            req.body.firstName, req.body.lastName, req.body.phoneNumber);
        let response = await this._userService.UserRegister(requestModel);
        return res.status(response.statusCode).json(response);
    }

    userLogin = async (req, res, next) => {
        const requestModel = new UserLoginModel(req.body.email, req.body.password);
        let response = await this._userService.UserLogin(requestModel);
        return res.status(response.statusCode).json(response);
    }

    userGet = async (req, res) => {
        let response = await this._userService.UserGetById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

    userUpdate = async (req, res) => {
        const requestModel = new UserUpdateModel(req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber);
        let response = await this._userService.UserUpdate(requestModel);
        return res.status(response.statusCode).json(response);
    }

    userAddressGet = async (req, res) => {
        let response = await this._userService.UserAddressGetByUserId(req.params.userId);
        return res.status(response.statusCode).json(response);
    }
}

module.exports = UserControllers;