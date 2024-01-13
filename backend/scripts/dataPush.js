const { MongoClient, ServerApiVersion } = require('mongodb');
const csvFilePath = 'netflix_titles.csv';
const csv = require('csvtojson');
require('dotenv').config()
const uri = process.env.MONGO_URI;
const db = require("../models");
const Title = db.title;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const dataPush = async () => {
    await connect();
    const jsonArray = await csv()
        .fromFile(csvFilePath)
        .then(async (jsonObj) => {

            jsonObj = jsonObj.map((obj) => {
                return {
                    showId: obj.show_id,
                    type: obj.type,
                    title: obj.title,
                    director: obj.director,
                    cast: obj.cast.split(', '),
                    country: obj.country,
                    dateAdded: obj.date_added,
                    releaseYear: obj.release_year,
                    rating: obj.rating,
                    duration: obj.duration,
                    listedIn: obj.listed_in,
                    description: obj.description,
                    imageUrl: ""
                }
            });
            const database = client.db('test');
            const titlesCollection = database.collection('titles');
            console.log(jsonObj);
            // return;
            const obj = await titlesCollection.insertMany(jsonObj);
            return;
        })

}

dataPush();

