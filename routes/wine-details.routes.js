const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')
const User = require('../models/User.model')

router.post('/wine-details/:id/add', async (req, res, next) => {
    try {
        const {id} = req.params
        const userEmail = req.session.currentUser.email
        let wine = await Wine.findById(id)
        await User.findOneAndUpdate({email :userEmail },{wine} )
        res.render('wines/wine-details')
    } catch (error) {
        console.log(error)
        next(error)
    }
})


router.get('/wine-details/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        let wine = await Wine.findById(id)
        res.render('wines/wine-details', wine)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


  module.exports = router;