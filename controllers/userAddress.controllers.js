const UserAddressSaveModel = require('../models/exchanges/userAddress/requestUserAddressSave');
const UserAddressUpdateModel = require('../models/exchanges/userAddress/requestUserAddressUpdate');
const UserAddressService = require('../services/userAddress.service');

class UserControllers {
    constructor() {
        //console.log("constructor no parameter")
        this._userAddressService = new UserAddressService();
    };

    userAddressSave = async (req, res, next) => {
        const requestModel = new UserAddressSaveModel(req.body.userId,
            req.body.title, req.body.building,
            req.body.street, req.body.country, req.body.city);
        let response = await this._userAddressService.UserAddressSave(requestModel);
        return res.status(response.statusCode).json(response);
    }

    userAddressGet = async (req, res) => {
        let response = await this._userAddressService.UserAddressGetByUserId(req.params.userId);
        return res.status(response.statusCode).json(response);
    }

    userAddressUpdate = async (req, res) => {
        const requestModel = new UserAddressUpdateModel(req.body.id, req.body.title, req.body.building,
            req.body.street, req.body.country, req.body.city);
        let response = await this._userAddressService.UserAddressUpdate(requestModel);
        return res.status(response.statusCode).json(response);
    }

    userAddressDelete = async (req, res) => {
        let response = await this._userAddressService.UserAddressDeleteById(req.params.id);
        return res.status(response.statusCode).json(response);
    }

}

module.exports = UserControllers;