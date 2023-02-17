const { Schema, model } = require("mongoose");

const beerSchema = new Schema ({

    title: String,
    alchool: String,
    description: String,
    country: String,
    pairing: String,
    reviews: String,
    rating: Number 
});

module.exports = model('Beer', beerSchema);