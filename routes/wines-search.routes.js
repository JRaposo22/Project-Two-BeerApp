const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')


router.get('/search', (req, res) => {

    let loggedIn = req.session.currentUser;
    res.render('wines/search',{loggedIn});
});

router.post('/search', async (req, res, next) => {

    try {

        //check current user
        let loggedIn = req.session.currentUser;
        const {searchWine, searchWinery} = req.body;
        //Initialize wine variable
        let wine 
        console.log('SEARCHHHHHHHHHHHH',searchWine) 
        //check if the user is searching by wine name or winery
        if(searchWine) {
            wine = await Wine.aggregate([{
                $search:{

                  //"index": 'default', // optional, defaults to "default"
                  "autocomplete": {
                    "query": searchWine,
                    "path": "wine",
 
                }
            }
              }]);   
                   
        }else{
            wine = await Wine.aggregate([{
                $search:{

                  //"index": 'default', // optional, defaults to "default"
                  "autocomplete": {
                    "query": searchWinery,
                    "path": "winery",
 
                }
            }
              }]);
        }
        
        
        res.render('wines/result', {wine, loggedIn});
    } catch (error) {
        console.log(error);
        next(error);
    }

}); 



module.exports = router;
