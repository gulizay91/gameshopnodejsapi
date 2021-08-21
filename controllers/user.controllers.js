const UserRegisterModel = require('../models/exchanges/user/requestUserRegister');
const UserLoginModel = require('../models/exchanges/user/requestUserLogin');
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
            req.body.firstName, req.body.lastName);
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

}

module.exports = UserControllers;

/*
const _userService = new UserService(); 

const userRegister = async (req, res, next) => {
    const requestModel = new UserRegisterModel(req.body.username, 
        req.body.password, req.body.email, 
        req.body.firstName, req.body.lastName);
    let response = await _userService.UserRegister(requestModel);
    return res.status(response.statusCode).json(response);
}


const userLogin = async (req, res, next) => {
    const requestModel = new UserLoginModel(req.body.email, req.body.password);
    let response = await _userService.UserLogin(requestModel);
    return res.status(response.statusCode).json(response);
}


const userGet = async (req, res) => {
    let response = await _userService.UserGetById(req.params.id);
    return res.status(response.statusCode).json(response);
}

module.exports = {
    userRegister,
    userLogin,
    userGet
};

*/