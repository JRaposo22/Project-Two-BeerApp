const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')

router.post('/wine-details/:id/add-favorite', async (req, res, next) => {
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
        let userFavorites = user.favorites;

        //check if the array includes the wine
        if(!(userFavorites.includes(wine._id))){

            //if it doesn't include then add to the favorites list
            await User.findByIdAndUpdate(user._id, { $push:{favorites:wine._id} } );
        } 
        res.render('wines/wine-details', {loggedIn})

    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/wine-details/:id/add-wish-list', async (req, res, next) => {
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
        res.render('wines/wine-details', {loggedIn})

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