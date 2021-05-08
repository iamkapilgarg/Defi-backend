require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getCommentsByProjectId, saveComments} = require('../db/queries/comments');

router.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  getCommentsByProjectId(projectId).then((data) => {
    res.send(data[0].image)
  });
});

router.post("/", (req,res) => {
  const comment = {
    "user_id": req.body.user_id,
    "project_id": req.body.project_id,
    "comment": req.body.comment
  }
  saveComments(comment).then((data)=>{
    res.status(201).json(data)
  });
});

module.exports = router;