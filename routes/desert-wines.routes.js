const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/desert-wines', async (req, res, next) => {
    try {
        await Wine.find({type: "Desert"})
        res.render('wines/desert-wines')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

  module.exports = router;