const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')


router.post('/review/create/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { author, content } = req.body;
  
      //Create the review
      const newReview = await Review.create({ author, content });
  
      //Add the review to the user
      await User.findByIdAndUpdate(author, { $push: { reviews: newReview._id } });
  
      //Add the review to the book
      await Book.findByIdAndUpdate(id, { $push: { reviews: newReview._id } });
  
      //to pull something out of an array
      /* await Book.findByIdAndUpdate(id, { $pull: { reviews: newReview._id } }); */
  
      res.redirect(`/books/${id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });






module.exports = router;