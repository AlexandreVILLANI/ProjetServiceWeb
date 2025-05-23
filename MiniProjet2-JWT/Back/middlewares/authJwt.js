const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token){
        token = req.headers["authorization"];
        if (!token){
            return res.status(403).send({
                message: "No token provided!"
            });
        }
        token = token.split(' ')[1];
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({
                message: "pas le bon"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;