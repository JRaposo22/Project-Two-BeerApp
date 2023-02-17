const mongoose = require('mongoose');
const axios = require("axios");
const Beer = require('../models/Beer.model');

const MONGO_URI = 'mongodb+srv://raposo:raposoDB123@cluster0.pc41qan.mongodb.net/?retryWrites=true&w=majority' || "mongodb://127.0.0.1:27017/IronHack-BeerApp";

const options = {
    method: 'GET',
    url: 'https://beer-list.p.rapidapi.com/beers/',
    headers: {
      'X-RapidAPI-Key': '5c0a3a9d59msh21a6671fcb0e2ccp1b8966jsne6e989f451bf',
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




