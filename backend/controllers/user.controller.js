const db = require("../models");
const Title = db.title;
const fetch = require('node-fetch');
const mongoosePaginate = require('mongoose-paginate-v2');


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.search = async (req, res) => {
    const query = req.body.query;
    const page = parseInt(req.body.page) || 1;
    const type = req.body.type;
    const age = parseInt(req.body.age) || 17;
    const excludeRating = age<=18 ? 'R' : "";

    let options = {
        offset: (page - 1) * 15,
        limit: 15
    }
    
    Title.paginate({
        $or: [{ "title": { "$regex": query, '$options': 'i' }, "type":{ "$regex": type, '$options': 'i' },'rating': {'$ne' : excludeRating} },
        { "cast": { "$regex": query, '$options': 'i' } , "type":{ "$regex": type, '$options': 'i' }, 'rating': {'$ne' : excludeRating}}]
    }, options)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error(error);
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

exports.movies = async (req, res) => {
    const options = {
        method: 'GET',
        params: {
            include_video: 'true',
            language: 'en-US',
            sort_by: 'popularity.desc',
            page: '1'
        },
        header: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjkwZDk2MzBlMWVhNmVmOTRmMmJiMjZkNmIzMDA2YiIsInN1YiI6IjY1YTliODBkN2NhYTQ3MDEyNTA5MmQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S20rlpq_TTTAogDapEBlPSyUuHfoVv4qxwhrN5uKPdk'
        }
    };

    await fetch('https://api.themoviedb.org/3/discover/movie', options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

}
