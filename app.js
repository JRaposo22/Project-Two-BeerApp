// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");



// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "IronHack-BeerApp";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
//Index routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
//Authorization routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
//Wine search routes
const winesRoutes = require("./routes/wines-search.routes");
app.use("/wines", winesRoutes);
//Favourites routes
const favouritesRoutes = require("./routes/favourites.routes")
app.use("/", favouritesRoutes)
//Wish list routes
const wishListRoutes = require("./routes/wish-list.routes")
app.use("/", wishListRoutes)
//Tasted wines routes
const tastedWinesRoutes = require("./routes/tasted-wines.routes")
app.use("/", tastedWinesRoutes)
//Contact-us routes
const contactUsRoutes = require("./routes/contact-us.routes")
app.use("/", contactUsRoutes)
//Wines-list routes
const winesListRoutes = require("./routes/wines-list.routes")
app.use("/", winesListRoutes)
//Wine-details routes
const wineDetailsRoutes = require("./routes/wine-details.routes")
app.use("/", wineDetailsRoutes)
//Profile routes
const profileRoutes = require("./routes/profile.routes")
app.use("/", profileRoutes)



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
