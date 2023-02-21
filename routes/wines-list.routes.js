const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User.model');
const Wine = require('../models/Wine.model');
const filterWines = require('../functions/filter-wines');

router.get('/wines-list', async (req, res, next) => {
    try {
      const loggedIn = req.session.currentUser;
        let wine = await Wine.find()
        console.log(wine)
        res.render('wines/wines-list', {wine, loggedIn})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/wines-list', async (req, res, next) => {

    try {

      //Getting the wine type  
      let {wineType} = req.body;
      //Current user logged in
      let loggedIn = req.session.currentUser;
      //Get all the wines
      let wine = await Wine.find();
      
      //function to filter the wines by type
      wine = filterWines(wineType, wine);
  
  
      res.render('wines/wines-list', {wine, loggedIn, wineType})
  
    } catch (error) {
  
      console.log(error);
      next(error);
      
    }
     
  });

  module.exports = router;