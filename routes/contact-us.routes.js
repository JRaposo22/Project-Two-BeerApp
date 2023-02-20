const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/contact-us', (req, res) => {
    res.render('wines/contact-us')
})

  module.exports = router;