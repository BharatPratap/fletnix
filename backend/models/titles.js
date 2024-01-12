const mongoose = require('mongoose');

const titleSchema = mongoose.Schema({
    showId: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    director: { type: String },
    cast: { type: Array },
    country: { type: Array },
    dateAdded: { type: String, required: true},
    releaseYear: { type: String, required: true},
    rating: { type: String, required: true},
    duration: { type: String, required: true},
    listedIn: { type: Array, required: true},
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Title', titleSchema);