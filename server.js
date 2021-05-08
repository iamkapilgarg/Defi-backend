const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const imageRoutes = require('./routes/images');
const fundingRoutes = require('./routes/fundings');
const commentRoutes = require('./routes/comments')
const express = require("express");
const morgan = require('morgan');

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(express.json());
App.use(morgan('dev'));
App.use("/users", userRoutes);
App.use("/projects", projectRoutes);
App.use("/images", imageRoutes);
App.use("/fundings", fundingRoutes);
App.use("/comments", commentRoutes);
App.set("view engine", "ejs");

// Sample GET route
App.get('/', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});