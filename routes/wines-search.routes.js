const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/search', (req, res) => {

    res.render('wines/search');
});

router.post('/search', async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;
        const {searchwine} = req.body;

        const wine = await Wine.find({'title': searchwine});
        console.log(wine);
        res.render('wines/result', {wine, loggedIn});
    } catch (error) {
        console.log(error);
        next(error);
    }

});



module.exports = router;
