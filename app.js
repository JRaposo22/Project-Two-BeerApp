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
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const winesRoutes = require("./routes/wines-search.routes");
app.use("/wines", winesRoutes);

const favouritesRoutes = require("./routes/favourites.routes")
app.use("/", favouritesRoutes)

const wishListRoutes = require("./routes/wish-list.routes")
app.use("/", wishListRoutes)

const tastedWinesRoutes = require("./routes/tasted-wines.routes")
app.use("/", tastedWinesRoutes)

const contactUsRoutes = require("./routes/contact-us.routes")
app.use("/", contactUsRoutes)

const winesListRoutes = require("./routes/wines-list.routes")
app.use("/", winesListRoutes)

const wineDetailsRoutes = require("./routes/wine-details.routes")
app.use("/", wineDetailsRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
