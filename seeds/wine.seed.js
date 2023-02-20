require('dotenv').config();
const mongoose = require('mongoose');
const axios = require("axios");
const Wine = require('../models/Wine.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/IronHack-BeerApp";

const options = {
    method: 'GET',
    url: 'https://beer-list.p.rapidapi.com/wines/',
    headers: {
      'X-RapidAPI-Key': process.env.XRAPID_API_KEY,
      'X-RapidAPI-Host': 'beer-list.p.rapidapi.com'
    }
}

async function seed(){
    try {
        let wines = await axios.request('https://api.sampleapis.com/wines/whites');
        console.log(wines);
        await mongoose.connect(MONGO_URI);

        await Beer.create(wines.data);

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }


};

seed();
