const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')


router.get('/wine-details/:id', async (req, res, next) => {
    try {
        let loggedIn = req.session.currentUser;
        const {id} = req.params
        const user = await User.findById(loggedIn._id).populate("reviews")
        let wine = await Wine.findById(id)
        .populate('reviews')
        .populate({
          path: 'reviews',
          populate: {
            path: 'author',
            model: 'User',
          },
        });

        let userReviews = wine.reviews
        let userFilteredReviews = userReviews.filter(review => {
          return review.author.email === user.email
        })
        
        let wineReviews = wine.reviews
        let filteredReviews = wineReviews.filter(review => {
          return review.author.email !== user.email
        })

        res.render('wines/wine-details', {wine, loggedIn, user, userFilteredReviews, filteredReviews})
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router;