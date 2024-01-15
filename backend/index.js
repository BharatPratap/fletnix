const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config()

// const { connect, getClient } = require('./db');
const db = require("./models");

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4200","https://65a4f2e02296ab1b2b0c8ab0--animated-biscuit-22cb0c.netlify.app"],
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookie_key = process.env.COOKIE_SECRET;
app.use(
    cookieSession({
        name: "fletnix-session",
        keys: [cookie_key],
        httpOnly: true
    })
);

db.mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to fletnix application." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});