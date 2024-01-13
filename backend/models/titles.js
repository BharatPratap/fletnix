const mongoose = require('mongoose');

const titleSchema = mongoose.Schema({
    showId: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    director: { type: String },
    cast: { type: Array },
    country: { type: Array },
    dateAdded: { type: String},
    releaseYear: { type: String},
    rating: { type: String},
    duration: { type: String},
    listedIn: { type: Array},
    description: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Title', titleSchema);