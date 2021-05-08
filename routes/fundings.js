require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getImagesByProjectsId, saveFunding} = require('../db/queries/fundings');

router.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  getImagesByProjectsId(projectId).then((data) => {
    res.send(data[0].image)
  });
});

router.post("/", (req,res) => {
  const funding = {
    "user_id": req.body.user_id,
    "project_id": req.body.project_id,
    "amount": req.body.amount,
    "transaction_id": req.body.transaction_id
  }
  saveFunding(funding).then((data)=>{
    res.status(201).json(data)
  });
});

module.exports = router;