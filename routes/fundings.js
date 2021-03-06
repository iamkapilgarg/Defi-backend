require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getFundingsByProjectID, saveFunding, getFundingsByUserID} = require('../db/queries/fundings');

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: true
});

router.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  getFundingsByProjectID(projectId).then((data) => {
    return res.status(200).send(data)
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  getFundingsByUserID(userId).then((data) => {
    return res.status(200).send(data)
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
  if (req.body.amount === undefined || req.body.amount === '') {
    return res.status(400).json({ "message": "amount cannot be blank" })
  }
  if (req.body.transaction_id === undefined || req.body.transaction_id === '') {
    return res.status(400).json({ "message": "transaction_id cannot be blank" })
  }
  const funding = {
    "auth_id": req.body.user_id,
    "project_id": req.body.project_id,
    "amount": req.body.amount,
    "transaction_id": req.body.transaction_id
  }
  saveFunding(funding).then((data)=>{
    pusher.trigger("my-channel", "my-event", {
      message: "hello world"
    });
    return res.status(201).json({"message": "transaction saved successfully", "id":data[0]})
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

module.exports = router;