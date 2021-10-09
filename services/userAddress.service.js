const User = require('../models/entities/user');
const UserAddress = require('../models/entities/userAddress');
const ServiceResult = require('../models/exchanges/serviceResult');

class UserAddressService {
    constructor() { };

    UserAddressSave = async (userAddressSaveModel) => {
        const serviceResult = new ServiceResult();
        try {
            const newUserAddress = new UserAddress({
                userId: userAddressSaveModel.userId,
                title: userAddressSaveModel.title,
                building: userAddressSaveModel.building,
                street: userAddressSaveModel.street,
                country: userAddressSaveModel.country,
                city: userAddressSaveModel.city
            });
            const saveUserAddress = await newUserAddress.save();
            return serviceResult.ServiceResultSuccess(saveUserAddress);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    UserAddressGetByUserId = async (userId) => {
        const serviceResult = new ServiceResult();
        try {
            const filter = userId ? { userId } : {};
            const userAddress = await UserAddress.find(filter);
            
            return serviceResult.ServiceResultSuccess(userAddress);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    UserAddressUpdate = async (userAddressUpdateModel) => {
        const serviceResult = new ServiceResult();
        try {
            const existUserAddress = await UserAddress.findByIdAndUpdate(userAddressUpdateModel._id,
                { $set: { 
                    title: userAddressUpdateModel.title,
                    building: userAddressUpdateModel.building,
                    street: userAddressUpdateModel.street,
                    country: userAddressUpdateModel.country,
                    city: userAddressUpdateModel.city
                  } 
                }, { new: true });
            return serviceResult.ServiceResultSuccess(existUserAddress);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    UserAddressDeleteById = async (id) => {
        const serviceResult = new ServiceResult();
        try {
            let data = await UserAddress.deleteOne({ _id: id}, { new: true });
            return serviceResult.ServiceResultSuccess(data);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }
}

module.exports = UserAddressService;
