const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User.model');
const Wine = require('../models/Wine.model');
const Page = require('../models/Page.model');
const filterWines = require('../functions/filter-wines');
/* comment */


router.get('/wines-list', async (req, res, next) => {
    try {
       const loggedIn = req.session.currentUser;
        let wine = await Wine.find();~
        await Page.findByIdAndUpdate('63f64c31e13906ffda3f555a', {prev:0, next:21});
        wine = wine.splice(0, 21)
        
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

router.post('/wines-list/next', async (req, res, next) => {

    try {
      let page = await Page.findById('63f64c31e13906ffda3f555a');
      let minPage = page.prev;
      let maxPage = page.next;
      minPage += 21;
      
      console.log(minPage, 'MINIMO', maxPage, 'MAXIMO')
      await Page.findByIdAndUpdate('63f64c31e13906ffda3f555a', {prev:minPage, next:maxPage});
      //Getting the wine type  
      let {wineType} = req.body;
      //Current user logged in
      let loggedIn = req.session.currentUser;

      
      //Get all the wines
      let wine = await Wine.find();
      
      //function to filter the wines by type
      //wine = filterWines(wineType, wine);
      console.log(wine)
      
      wine = wine.splice(minPage, 21)
  
      
  
      res.render('wines/wines-list', {wine, loggedIn, wineType})
  
    } catch (error) {
  
      console.log(error);
      next(error);
      
    }
     
  });

  router.post('/wines-list/prev', async (req, res, next) => {

    try {

      let page = await Page.findById('63f64c31e13906ffda3f555a');
      let minPage = page.prev;
      let maxPage = page.next;
      minPage -= 21;
      maxPage -= 21;
      await Page.findByIdAndUpdate('63f64c31e13906ffda3f555a', {prev:minPage, next:maxPage});

      if(minPage <= 0) minPage = 0;
      
      //Getting the wine type  
      let {wineType} = req.body;
      //Current user logged in
      let loggedIn = req.session.currentUser;

      
      //Get all the wines
      let wine = await Wine.find();
      
      //function to filter the wines by type
      //wine = filterWines(wineType, wine);

      wine = wine.splice(minPage, 21)
  
  
      res.render('wines/wines-list', {wine, loggedIn, wineType})
  
    } catch (error) {
  
      console.log(error);
      next(error);
      
    }
     
  });
 




  module.exports = router;