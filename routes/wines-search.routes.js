const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/search', (req, res) => {

    res.render('wines/search');
});

router.post('/search', async (req, res, next) => {

    try {

        //check ucrrent user
        let loggedIn = req.session.currentUser;
        const {searchWine, searchWinery} = req.body;
        console.log(searchWine)
        


        let wine 
        if(searchWine) {
            wine = await Wine.find({'wine': searchWine});
            
        }else{
            wine = await Wine.find({'winery': searchWinery});

        }
        
        console.log(wine);
        res.render('wines/result', {wine, loggedIn});
    } catch (error) {
        console.log(error);
        next(error);
    }

});



module.exports = router;
