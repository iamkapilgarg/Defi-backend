require('dotenv').config();
const express = require('express');
const router = express.Router();
const {listProjects, getProjectById, getProjectsByUserId} = require('../db/queries/projects');
const {getProjectsByInvestorId} = require('../db/queries/fundings')


router.get("/", (req, res) => {
  listProjects().then((data) => {
    res.json(data);      
  })
});

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  getProjectById(projectId).then((data) => {
    res.json(data);
  });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByUserId(userId).then((data) => {
    res.json(data);
  });
});

router.get("/users/fundings/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByInvestorId(userId).then((data) => {
    res.json(data);
  })
});

module.exports = router;