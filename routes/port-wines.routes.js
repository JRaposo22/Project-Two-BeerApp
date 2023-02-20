const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/port-wines', async (req, res, next) => {
    try {
        await Wine.find({type: "Port"})
        res.render('wines/port-wines')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

  module.exports = router;