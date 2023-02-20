const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/wines-list', async (req, res, next) => {
    try {
        let wine = await Wine.find()
        console.log(wine)
        res.render('wines/wines-list', {wine})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/wines-list/:type', async (req, res, next) => {
    try {
        const {type} = req.body
        let wine = await Wine.find({type: type})
        res.render('wines/wines-list', {wine})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

  module.exports = router;