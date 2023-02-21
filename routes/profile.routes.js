const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model');
const User = require('../models/User.model');

router.get('/profile', async (req, res, next) => {

    try {
        let loggedIn = req.session.currentUser;

        console.log(loggedIn);
        res.render('/auth/profile')
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;