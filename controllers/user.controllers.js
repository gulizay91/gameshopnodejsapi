const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        if (!hash) {
            return res.status(500).json({
                error: "Error Password Encrypt!!!",
            });
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
            res.json(saveUser);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}


const userLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const existUser = await User.findOne({ email });
        if (!existUser) {
            res.status(401).json({
                message: "Auth failed: Email not found probably",
            });
        }
        
        const matchResult = await bcrypt.compare(req.body.password, existUser.password);
        if (!matchResult) {
            console.log(matchResult)
            res.status(401).json({
                message: "Auth failed",
            });
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
            //console.log(existUser)
            res.status(200).json({
                message: "Auth successful",
                userDetails: {
                    id: existUser._id,
                    username: existUser.username,
                    email: existUser.email,
                    firstName: existUser.firstName,
                    lastName: existUser.lastName,
                },
                token: token,
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}


const userGet = async (req, res) => {
    try {
        let userId = req.params.id;
        const user = await User.findById(userId)
        res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.toString()
        })
    }
}

module.exports = {
    userRegister,
    userLogin,
    userGet
};