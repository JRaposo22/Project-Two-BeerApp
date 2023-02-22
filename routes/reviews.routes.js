const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');

router.post('/review/create/:id', async (req, res, next) => {
    try {
      const loggedIn = req.session.currentUser;
      const userId = loggedIn._id;
      const wineId  = req.params.id;
      const { reviewContent} = req.body;
  
  
      //Create the review
      const newReview = await Review.create({ content: reviewContent, author: userId , wineId:wineId });
  
      //Add the review to the user
      await User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id } });
  
      //Add the review to the book
      await Wine.findByIdAndUpdate(wineId, { $push: { reviews: newReview._id } });
  
      //to pull something out of an array
      /* await Book.findByIdAndUpdate(id, { $pull: { reviews: newReview._id } }); */
  
      res.redirect(`/wine-details/${wineId}`);
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.post("/review/edit/:reviewId", async (req, res, next) => {
  try {
    const {reviewId} = req.params.reviewId
    const {content} = req.body
    await Review.findByIdAndUpdate(reviewId, {content})
    const review = await Review.findById(reviewId)
    console.log("HELOOOoooo", review)
    /* res.redirect(`/wine-details/${wineId}`); */
  } catch (error) {
    console.log(error)
    next(error)
  }
})


module.exports = router;