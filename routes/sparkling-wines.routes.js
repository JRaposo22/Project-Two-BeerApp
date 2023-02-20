const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/sparkling-wines', async (req, res, next) => {
    try {
        await Wine.find({type: "Sparkling"})
        res.render('wines/sparkling-wines')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

  module.exports = router;