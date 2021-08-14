const bcrypt = require('bcrypt');
const User = require('../models/entities/user');
const ServiceResult = require('../models/exchanges/serviceResult');
const { ResponseAuth, UserDetail } = require('../models/exchanges/user/responseAuth');
const jwt = require('jsonwebtoken');
//const { response } = require('express');

const userRegister = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        if (!hash) {
            return res.status(500).json(serviceResult.ServiceResultError("Error Password Encrypt!!!"));
        } else {
            const newUser = new User({
                //_id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
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
            return res.json(serviceResult.ServiceResultSuccess(responseAuth, "User register success."));
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}


const userLogin = async (req, res, next) => {

    const serviceResult = new ServiceResult();
    try {
        const email = req.body.email;
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(401).json(serviceResult.ServiceResultError("Auth failed: Email not found probably", 401));
        }
        
        const matchResult = await bcrypt.compare(req.body.password, existUser.password);
        if (!matchResult) {
            //console.log(matchResult)
            return res.status(401).json(serviceResult.ServiceResultError("Auth failed", 401));
        }
        else
        {
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
            return res.status(200).json(serviceResult.ServiceResultSuccess(responseAuth));
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}


const userGet = async (req, res) => {
    const serviceResult = new ServiceResult();
    try {
        let userId = req.params.id;
        const user = await User.findById(userId)
        return res.status(200).json(serviceResult.ServiceResultSuccess({ user }));
    } catch (error) {
        console.log(error)
        return res.status(500).json(serviceResult.ServiceResultError(error.toString()));
    }
}

module.exports = {
    userRegister,
    userLogin,
    userGet
};