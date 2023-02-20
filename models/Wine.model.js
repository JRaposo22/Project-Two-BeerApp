const { Schema, model } = require("mongoose");

const wineSchema = new Schema ({

    winery: String,
    wine: String,
    rating:{
        average: Number,
        reviews: String,
    },
    location: String,
    image: String,
    id: Number,
    type: {
        type: String,
        default: 'None'
    }
    
});

module.exports = model('Wine', wineSchema);

