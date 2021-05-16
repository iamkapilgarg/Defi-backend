require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getLikesByUserID, saveLikes} = require('../db/queries/likes');

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  getLikesByUserID(userId).then((data) => {
    return res.status(200).json(data)
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.post("/", (req,res) => {
  const like = {
    "auth_id": req.body.auth_id,
    "project_id": req.body.project_id,
  }
  saveLikes(like).then((data)=>{
    return res.status(201).json({"message": "likes saved successfully", "id": data[0]})
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

module.exports = router;