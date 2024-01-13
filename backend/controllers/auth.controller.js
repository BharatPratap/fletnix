const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const verifySignUp = require("../middlewares/verifySignUp");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });

    user.save();
    res.status(200).send({ message: 'New User created' });
};

exports.signin = async (req, res) => {
    const userData = await User.findOne({
        email: req.body.email,
    });
    console.log(userData);

    if (!userData) {
        return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        userData.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: userData.id },
        config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });

    req.session.token = token;

    res.status(200).send({
        id: userData._id,
        email: userData.email
    });

};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};