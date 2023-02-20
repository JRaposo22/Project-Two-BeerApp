const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')


router.get('/favourites', async (req, res, next) => {

  try {
    let loggedIn = req.session.currentUser;
    const userEmail = req.session.currentUser.email
    const favoriteWines = await User.findOne({email: userEmail}).populate('favorites');
    console.log(favoriteWines);
    res.render('wines/favourites', {favoriteWines, loggedIng})

  } catch (error) {

    console.log(error);
    next(error);
    
  }
   
})

router.post("/favourites/:id", async (req, res, next) => {
    try {
      let loggedIn = req.session.currentUser;
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/favourites", {loggedIn});

    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;