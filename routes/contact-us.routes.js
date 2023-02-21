const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/contact-us', (req, res) => {
    const loggedIn = req.session.currentUser;
    res.render('wines/contact-us', {loggedIn})
})

  module.exports = router;