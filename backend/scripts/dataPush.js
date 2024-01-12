const { MongoClient, ServerApiVersion } = require('mongodb');
const csvFilePath = 'netflix_titles.csv';
const csv = require('csvtojson');
const uri = process.env.MONGO_URI;

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
            let titlesArray = [];
            jsonObj.forEach(async (obj) => {
                let title = {};
                title.showId = obj.show_id;
                title.type = obj.type;
                title.title = obj.title;
                title.director = obj.director;
                title.cast = obj.cast.split(', ');
                title.country = obj.country;
                title.dateAdded = obj.date_added;
                title.releaseYear = obj.release_year;
                title.rating = obj.rating;
                title.duration = obj.duration;
                title.listedIn = obj.listed_in;
                title.description = obj.description;
                titlesArray.push(title);
            })
            try {
                await client.connect();
                const database = client.db('fletnix');
                const titleCollection = database.collection('title_list');
                const result = await titleCollection.count({});
                console.log(`User added with ID: ${result}`);
            } finally {
                await client.close();
            }
        })
        
}

dataPush();

