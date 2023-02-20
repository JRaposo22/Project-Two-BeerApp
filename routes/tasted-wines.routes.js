const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/tasted-wines', (req, res) => {
    res.render('wines/tasted-wines')
})

router.post("/tasted-wines/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/tasted-wines");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;