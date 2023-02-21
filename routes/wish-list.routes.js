const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model');
const User = require('../models/User.model');
const filterWines = require('../functions/filter-wines');

router.get('/wish-list', async (req, res, next) => {

  try {
    let loggedIn = req.session.currentUser;
    const userEmail = req.session.currentUser.email
    const user = await User.findOne({email: userEmail}).populate('wishList');
    const userWishList = user.wishList;
  
    res.render('wines/wish-list', {userWishList, loggedIn});

  } catch (error) {
    console.log(error);
    next(error);
  }
   
});

router.post('/wish-list', async (req, res, next) => {

  try {
    //Get the filter wine type
    let {wineType} = req.body;
    //Current user logged in
    let loggedIn = req.session.currentUser;
    //Current user email
    const userEmail = req.session.currentUser.email
    //Get the user info
    const user = await User.findOne({email: userEmail}).populate('wishList');
    //Get user favourite wines
    let userWishList = user.wishList;

    //Function to filter the wines bye type
    userWishList = filterWines(wineType, userWishList);



    res.render('wines/wish-list', {userWishList, loggedIn, wineType})

  } catch (error) {

    console.log(error);
    next(error);
    
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
      res.render('wines/wine-details', {wine, loggedIn})

  } catch (error) {
      console.log(error)
      next(error)
  }
});


router.get('/wine-details/:id/delete-wish-list', async (req, res, next) => {
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
          await User.findByIdAndUpdate(user._id, { $pull:{wishList:wine._id} } );
      } 
      res.render('wines/wine-details', {wine, loggedIn})

  } catch (error) {
      console.log(error)
      next(error)
  }
});

router.post("/wish-list/:id", async (req, res, next) => {
    try {
      let loggedIn = req.session.currentUser;
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/wish-list", {loggedIn});
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;





  

