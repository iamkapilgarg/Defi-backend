require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getCommentsByProjectId, saveComments} = require('../db/queries/comments');

router.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  getCommentsByProjectId(projectId).then((data) => {
    return res.status(200).json(data)
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.post("/", (req,res) => {
  if (req.body.user_id === undefined || req.body.user_id === '') {
    return res.status(400).json({ "message": "user_id cannot be blank" })
  }
  if (req.body.project_id === undefined || req.body.project_id === '') {
    return res.status(400).json({ "message": "project_id cannot be blank" })
  }
  if (req.body.comment === undefined || req.body.comment === '') {
    return res.status(400).json({ "message": "comment cannot be blank" })
  }
  const comment = {
    "auth_id": req.body.user_id,
    "project_id": req.body.project_id,
    "comment": req.body.comment
  }
  saveComments(comment).then((data)=>{
    return res.status(201).json({"message": "comments saved successfully", "id": data[0]})
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

module.exports = router;