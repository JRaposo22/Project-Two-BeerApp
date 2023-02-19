const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Beer = require('../models/Beer.model')

router.get('/search', (req, res) => {

    res.render('beers/search');
});

router.post('/search', async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;
        const {searchBeer} = req.body;

        const beer = await Beer.find({'title': searchBeer});
        console.log(beer);
        res.render('beers/result', {beer, loggedIn});
    } catch (error) {
        console.log(error);
        next(error);
    }

});



module.exports = router;
