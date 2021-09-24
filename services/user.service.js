const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/entities/user');
const ServiceResult = require('../models/exchanges/serviceResult');
const { ResponseAuth, UserDetail } = require('../models/exchanges/user/responseAuth');

class UserService {
    constructor() { };

    async UserRegister(userRegisterModel) {
        const serviceResult = new ServiceResult();
        try {
            const hash = await bcrypt.hash(userRegisterModel.password, 10);
            if (!hash) {
                return serviceResult.ServiceResultError("Error Password Encrypt!!!");
            } else {
                const newUser = new User({
                    //_id: new mongoose.Types.ObjectId(),
                    username: userRegisterModel.username,
                    password: hash,
                    email: userRegisterModel.email,
                    firstName: userRegisterModel.firstName,
                    lastName: userRegisterModel.lastName
                });
                const saveUser = await newUser.save();

                const token = jwt.sign(
                    {
                        id: saveUser._id,
                        username: saveUser.username,
                        email: saveUser.email,
                        firstName: saveUser.firstName,
                        lastName: saveUser.lastName,
                    },
                    process.env.JWTSECRET,
                    {
                        expiresIn: "1d",
                    }
                );
                const responseAuth = new ResponseAuth(saveUser, token);
                return serviceResult.ServiceResultSuccess(responseAuth, "User register success.");
            }

        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    async UserLogin(userLoginModel) {
        const serviceResult = new ServiceResult();
        try {
            const email = userLoginModel.email;
            const existUser = await User.findOne({ email });
            if (!existUser) {
                return serviceResult.ServiceResultError("Auth failed: Email not found probably", 401);
            }

            const matchResult = await bcrypt.compare(userLoginModel.password, existUser.password);
            if (!matchResult) {
                //console.log(matchResult)
                return serviceResult.ServiceResultError("Auth failed", 401);
            }
            else {
                const token = jwt.sign(
                    {
                        id: existUser._id,
                        username: existUser.username,
                        email: existUser.email,
                        firstName: existUser.firstName,
                        lastName: existUser.lastName,
                    },
                    process.env.JWTSECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                const userDetail = new UserDetail(existUser._id, existUser.username, existUser.email, existUser.firstName, existUser.lastName)
                const responseAuth = new ResponseAuth(userDetail, token);
                return serviceResult.ServiceResultSuccess(responseAuth);
            }
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

    async UserGetById(userId) {
        const serviceResult = new ServiceResult();
        try {
            const user = await User.findById(userId);
            const userDetail = new UserDetail(user._id, user.username, user.email, user.firstName, user.lastName);
            return serviceResult.ServiceResultSuccess(userDetail);
        } catch (error) {
            console.log(error)
            return serviceResult.ServiceResultError(error.toString());
        }
    }

}

module.exports = UserService;
