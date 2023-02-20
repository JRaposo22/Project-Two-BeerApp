const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/red-wines', async (req, res, next) => {
    try {
        await Wine.find({type: "Red"})
        res.render('wines/red-wines')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

  module.exports = router;