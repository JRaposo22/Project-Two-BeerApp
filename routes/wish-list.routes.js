const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wine = require('../models/Wine.model')

router.get('/wish-list', (req, res) => {
  let user = req.session.currentUser
  console.log(user)
  res.render('wines/wish-list', user)
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