require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getImagesByProjectsId} = require('../db/queries/images');

router.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  getImagesByProjectsId(projectId).then((data) => {
    res.send(data[0].image)
  });
});

module.exports = router;