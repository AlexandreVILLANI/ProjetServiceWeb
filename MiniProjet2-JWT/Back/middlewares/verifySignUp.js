const db = require('../models');
const User = db.user;

checkDuplicateUsername= (req, res, next) => {
    User.findOne({
        where: {
            emailId: req.body.emailId
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "already used"
        });
        return;
    }
    next();
    })
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;