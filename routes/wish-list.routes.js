const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model');

router.get('/wish-list', async (req, res, next) => {

  try {
    let loggedIn = req.session.currentUser;
    const userEmail = req.session.currentUser.email
    const userWines = await User.findOne({email: userEmail}).populate('wishList');
  
    res.render('wines/wish-list', {userWines, loggedIn});

  } catch (error) {
    console.log(error);
    next(error);
  }
   
})

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





  

