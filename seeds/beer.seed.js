require('dotenv').config();
const mongoose = require('mongoose');
const axios = require("axios");
const Beer = require('../models/Beer.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/IronHack-BeerApp";

const options = {
    method: 'GET',
    url: 'https://beer-list.p.rapidapi.com/beers/',
    headers: {
      'X-RapidAPI-Key': process.env.XRAPID_API_KEY,
      'X-RapidAPI-Host': 'beer-list.p.rapidapi.com'
    }
}

async function seed(){
    try {
        let beers = await axios.request(options);
        console.log(beers);
        await mongoose.connect(MONGO_URI);

        await Beer.create(beers.data);

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }


};

seed();
