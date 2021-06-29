const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];
    //console.log(token)
    if (!token) return res.status(400).json({ message: "Access Denied!, no token entered" });

    try {
        const verified = jwt.verify(token, process.env.JWTSECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: "auth failed, check bearer token" });
    }
};