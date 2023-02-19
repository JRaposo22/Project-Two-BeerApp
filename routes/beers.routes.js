const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/search', (req, res) => {

    res.render('beers/search');
});

module.exports = router;
