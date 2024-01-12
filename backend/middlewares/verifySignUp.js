const db = require("../models");
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
    // Username
    try {
        const userData = User.findOne({
            email: req.body.email
        })
        if (userData) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
                return;
    }
};

const verifySignUp = {
    checkDuplicateEmail
};

module.exports = verifySignUp;