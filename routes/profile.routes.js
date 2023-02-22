const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model');
const User = require('../models/User.model');

//User profile route
router.get('/profile', async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;
        let user = await User.findById(loggedIn._id)

        
        res.render('auth/profile', {loggedIn, user} )
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/profile/edit', async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;
        let user = await User.findById(loggedIn._id)

        
        res.render('auth/profile-edit', {loggedIn, user} )
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/profile/edit', async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;
        let {username} = req.body;
        await User.findByIdAndUpdate(loggedIn._id, {username})
        console.log(username);

        
        res.redirect('/profile');
        //res.redirect('auth/profile');
    } catch (error) {
        console.log(error);
        next(error);
    }
});


//Other users profile routes
router.get('/other-profile/:id', async (req, res, next) => {

    try {
        let {id} = req.params;
        const otherUser = await User.findById(id);
        res.render('other-profile', otherUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;