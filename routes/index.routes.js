const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  let loggedIn = req.session.currentUser;
  console.log("ESTE é O USER", loggedIn)
  res.render("index", {loggedIn});
});

module.exports = router;
