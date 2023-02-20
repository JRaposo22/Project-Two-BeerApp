const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')

router.get('/wine-details/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        let wine = await Wine.findBy(id)
        res.render('wines/wine-details')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/wine-details/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const user = req.session.currentUser.email
        let wine = await Wine.findBy(id)
        res.render('wines/wine-details')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

  module.exports = router;