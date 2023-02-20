const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')


router.get('/favourites', async (req, res, next) => {

  try {
    const userEmail = req.session.currentUser.email
    const favoriteWines = await User.findOne({email: userEmail}).populate('favorites');
    console.log(favoriteWines);
    res.render('wines/favourites', {favoriteWines})

  } catch (error) {

    console.log(error);
    next(error);
    
  }
   
})

router.post("/favourites/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/favourites");

    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;