const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model');
const User = require('../models/User.model');
const filterWines = require('../functions/filter-wines');

router.get('/tasted-wines',  async (req, res, next) => {

  try {
    let loggedIn = req.session.currentUser;
    const userEmail = req.session.currentUser.email
    const user = await User.findOne({email: userEmail}).populate('tastedWines');
    const userTasted = user.tastedWines
    res.render('wines/tasted-wines', {userTasted, loggedIn});

  } catch (error) {
    console.log(error);
    next(error);
    
  }
    
});

router.post('/tasted-wines', async (req, res, next) => {

  try {
    //Get the filter wine type
    let {wineType} = req.body;
    //Current user logged in
    let loggedIn = req.session.currentUser;
    //Current user email
    const userEmail = req.session.currentUser.email
    //Get the user info
    const user = await User.findOne({email: userEmail}).populate('tastedWines');
    //Get user favourite wines
    let userTasted = user.tastedWines;

    //Function to filter the wines bye type
    userTasted = filterWines(wineType, userTasted);



    res.render('wines/tasted-wines', {userTasted, loggedIn, wineType})

  } catch (error) {

    console.log(error);
    next(error);
    
  }
   
});

router.post('/wine-details/:id/add-tasted-wines', async (req, res, next) => {
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
      //get the tasted array
      let userTasted = user.tastedWines;

      //check if the array includes the wine
      if(!(userTasted.includes(wine._id))){

          //if it doesn't include then add to the favorites list
          await User.findByIdAndUpdate(user._id, { $push:{tastedWines:wine._id} } );
          await User.findByIdAndUpdate(user._id, { $pull:{wishList:wine._id} } );
      } 
      res.redirect(`/wine-details/${wine._id}`)

  } catch (error) {
      console.log(error)
      next(error)
  }
});

router.post('/tasted-wines/:id/delete-tasted-wine', async (req, res, next) => {
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
      let user = await User.findOne({email: userEmail}).populate('tastedWines');
      //get the favorites array
      let userTastedWines = user.tastedWines;

      //check if the array includes the wine
      if(!(userTastedWines.includes(wine._id))){

          //if it doesn't include then add to the favorites list
          await User.findByIdAndUpdate(user._id, { $pull:{tastedWines:wine._id} } );
      } 
      res.redirect('/tasted-wines')

  } catch (error) {
      console.log(error)
      next(error)
  }
});

router.post("/tasted-wines/:id", async (req, res, next) => {
    try {
      let loggedIn = req.session.currentUser;
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/tasted-wines", {loggedIn});
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;



