const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

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

router.post('/profile/edit', fileUploader.single('imageUrl'), async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;
        let {username, title, currentImage} = req.body;
        let imageUrl;
        
        if (req.file) imageUrl = req.file.path;
        else imageUrl = currentImage
        
        await User.findByIdAndUpdate(loggedIn._id, {username, title, imageUrl})
        

        req.session.currentUser.username = username
        req.session.currentUser.title = title
        req.session.currentUser.imageUrl = imageUrl;
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