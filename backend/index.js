const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config()

const { connect, getClient } = require('./db');
const db = require("./models");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:3001"
};
app.use(cors(corsOptions));
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
    res.json({ message: "Welcome to bezkoder application." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);



connect();
let client;

app.post('/handleQuery', async (req, res) => {
    const { customerId, query } = req.body;

    try {
        client = getClient();
        await client.connect();
        const database = client.db('fletnix');
        const titlesCollection = database.collection('title_list');
        const obj = await titlesCollection.find({ query }).toArray();

        res.json({ response: obj[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});