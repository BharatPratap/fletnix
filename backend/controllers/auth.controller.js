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

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.email,
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            req.session.token = token;

            res.status(200).send({
                id: user._id,
                email: user.email
            });
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