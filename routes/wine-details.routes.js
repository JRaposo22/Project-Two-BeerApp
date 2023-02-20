const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')

router.get('/wine-details/:id/add-favourite', async (req, res, next) => {
    try {
        //get wine ID
        const {id} = req.params
        //get user
        let loggedIn = req.session.currentUser;
        //get current user email
        const userEmail = req.session.currentUser.email
        //fin the wine to add to favorites
        let wine = await Wine.findById(id)
        //find the user
        let user = await User.findOne({email: userEmail});
        //get the favorites array
        let userFavourites = user.favourites;

        //check if the array includes the wine
        if(!(userFavourites.includes(wine._id))){

            //if it doesn't include then add to the favorites list
            await User.findByIdAndUpdate(user._id, { $push:{favourites:wine._id} } );
        } 
        res.render('wines/wine-details', {wine, loggedIn})

    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/wine-details/:id/add-wish-list', async (req, res, next) => {
    try {
        //get wine ID
        const {id} = req.params
        //get user
        let loggedIn = req.session.currentUser;
        //get current user email
        const userEmail = req.session.currentUser.email
        //fin the wine to add to favorites
        let wine = await Wine.findById(id)
        //find the user
        let user = await User.findOne({email: userEmail});
        //get the favorites array
        let userWishList = user.wishList;

        //check if the array includes the wine
        if(!(userWishList.includes(wine._id))){

            //if it doesn't include then add to the favorites list
            await User.findByIdAndUpdate(user._id, { $push:{wishList:wine._id} } );
        } 
        res.render('wines/wine-details', {wine, loggedIn})

    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/wine-details/:id/add-tasted-wines', async (req, res, next) => {
    try {
        //get wine ID
        const {id} = req.params
        //get user
        let loggedIn = req.session.currentUser;
        //get current user email
        const userEmail = req.session.currentUser.email
        //fin the wine to add to favorites
        let wine = await Wine.findById(id)
        //find the user
        let user = await User.findOne({email: userEmail});
        //get the favorites array
        let userTastedWines = user.tastedWines;

        //check if the array includes the wine
        if(!(userTastedWines.includes(wine._id))){

            //if it doesn't include then add to the favorites list
            await User.findByIdAndUpdate(user._id, { $push:{tastedWines:wine._id} } );
        } 
        res.render('wines/wine-details', {wine, loggedIn})

    } catch (error) {
        console.log(error)
        next(error)
    }
});


router.get('/wine-details/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        let wine = await Wine.findById(id)
        res.render('wines/wine-details', wine)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})


  module.exports = router;