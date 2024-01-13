const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: {type:String, unique: true},
        password: String,
        age: Number
    })
);

module.exports = User;