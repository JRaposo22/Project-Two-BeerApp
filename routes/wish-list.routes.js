const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/wish-list', (req, res) => {
    res.render('wines/wish-list')
})

router.post("/wish-list/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Wine.findByIdAndRemove(id);
      res.redirect("/wish-list");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = router;