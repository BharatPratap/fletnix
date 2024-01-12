const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const moment = require('moment');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const { connect, getClient } = require('./db');

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