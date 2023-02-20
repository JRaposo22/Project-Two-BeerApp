require('dotenv').config();
const mongoose = require('mongoose');
const axios = require("axios");
const Wine = require('../models/Wine.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/IronHack-BeerApp";



async function seed(){
    try {
        let whiteWines = await axios.request('https://api.sampleapis.com/wines/whites');
        

        await Wine.create(whiteWines.data);  
        await Wine.updateMany({type:'None'},{type:'White'}) 

        let redWines = await axios.request('https://api.sampleapis.com/wines/reds');
        

        await Wine.create(redWines.data);
        await Wine.updateMany({type:'None'}, {type:'Red'}) 

        await mongoose.connect(MONGO_URI);
        let sparklingWines = await axios.request('https://api.sampleapis.com/wines/sparkling');
        
        await Wine.create(sparklingWines.data); 
        await Wine.updateMany({type:'None'},{type:'Sparkling'}) 

        let roseWines = await axios.request('https://api.sampleapis.com/wines/rose');
        
        await Wine.create(roseWines.data); 
        await Wine.updateMany({type:'None'},{type:'Rose'}) 

        let portWines = await axios.request('https://api.sampleapis.com/wines/port');
        
        await Wine.create(portWines.data); 
        await Wine.updateMany({type:'None'},{type:'Port'}) 

        let dessertWines = await axios.request('https://api.sampleapis.com/wines/dessert');
        
        await Wine.create(dessertWines.data); 
        await Wine.updateMany({type:'None'},{type:'Dessert'}) 





        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }


};

seed();
