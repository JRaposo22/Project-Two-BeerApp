const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/favourites', (req, res) => {
    res.render('wines/favourites')
})

router.post("/favourites/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/favourites");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;