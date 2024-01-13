const db = require("../models");
const User = db.user;

const checkDuplicateEmail = async (req, res, next) => {
    // Username
    try {
        const userData = await User.find({
            email: req.body.email
        });
        console.log(userData);
        if (userData) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
                return;
    }
};

const verifySignUp = {
    checkDuplicateEmail
};

module.exports = verifySignUp;