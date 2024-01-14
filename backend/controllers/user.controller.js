const db = require("../models");
const Title = db.title;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.search = async (req, res) => {
    const query = req.body.query;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;

    // Filter items based on the query
    let items = await Title.find({ "title" : {"$regex": query,'$options' : 'i' }});
    const totalPages = Math.ceil(items.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedItems = items.slice(startIndex, endIndex);

    res.json({
        items: slicedItems,
        page: page,
        totalPages: totalPages,
    });
}

exports.fetchDefaults = async (req, res) => {

    const type = await Title.distinct("type");
    const country = await Title.distinct("country");
    const rating = await Title.distinct("rating");
    const listedIn = await Title.distinct("listedIn");
    
    res.json({
        type,
        country,
        rating,
        listedIn
    });
}
