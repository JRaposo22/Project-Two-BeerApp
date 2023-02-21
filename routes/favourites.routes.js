const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')
const filterWines = require('../functions/filter-wines');

router.get('/favourites', async (req, res, next) => {

  try {
    let {wineType} = req.body;
    let loggedIn = req.session.currentUser;
    const userEmail = req.session.currentUser.email
    const user = await User.findOne({email: userEmail}).populate('favourites');
    const userFavourites = user.favourites;
    console.log("USER LOGIN" , loggedIn)

  
    res.render('wines/favourites', {userFavourites, loggedIn})

  } catch (error) {

    console.log(error);
    next(error);
    
  }
   
})

router.post('/favourites', async (req, res, next) => {

  try {
    let {wineType} = req.body;
    let loggedIn = req.session.currentUser;
    const userEmail = req.session.currentUser.email
    const user = await User.findOne({email: userEmail}).populate('favourites');
    let userFavourites = user.favourites;

    userFavourites = filterWines(wineType, userFavourites);

    res.render('wines/favourites', {userFavourites, loggedIn, wineType})

  } catch (error) {

    console.log(error);
    next(error);
    
  }
   
});

router.post('/wine-details/:id/add-favourite', async (req, res, next) => {
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
          await User.findByIdAndUpdate(user._id, { $push:{tastedWines:wine._id} } );
          await User.findByIdAndUpdate(user._id, { $pull:{wishList:wine._id} } );
      } 
      //res.render('wines/wine-details', {wine, loggedIn})
      res.redirect(`/wine-details/${wine._id}`)

  } catch (error) {
      console.log(error)
      next(error)
  }
});

router.post('/favourites/:id/delete-favourite', async (req, res, next) => {
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
      let user = await User.findOne({email: userEmail}).populate('favourites');
      //get the favorites array
      let userFavourites = user.favourites;

      await User.findByIdAndUpdate(user._id, { $pull:{favourites:wine._id} } );
          console.log(userFavourites)
    
      //res.render('wines/favourites', {userFavourites, loggedIn})
      res.redirect('/favourites');

  } catch (error) {
      console.log(error)
      next(error)
  }
});

router.post('/favourites/:id/delete-favourite-tasted', async (req, res, next) => {
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
     
      await User.findByIdAndUpdate(user._id, { $pull:{favourites:wine._id} } );
      await User.findByIdAndUpdate(user._id, { $pull:{tastedWines:wine._id} } );
      
      res.redirect(`/favourites`)
      
  } catch (error) {
      console.log(error)
      next(error)
  }
});





  module.exports = router;