require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getUserById, getUserByAuthId, addUsers} = require('../db/queries/users');

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  getUserById(userId).then((data) => {
    return res.json(data);
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.get("/auth/:id", (req, res) => {
  const authId = req.params.id;
  getUserByAuthId(authId).then((data) => {
    return res.json(data);
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.post("/", (req, res) => {
  const auth_id = req.body.authId;
  getUserByAuthId(auth_id).then((data) => {
    if(data.length === 0) {
      const name = req.body.name;
      const user = {
        name,
        auth_id
      };
      addUsers(user).then((data) => {
        return res.status(201).json({message: "user saved successfully", id: data[0]})
      }).catch((err) => {
        return res.status(500).send(err)
      });
      return;
    }
    return res.status(400).json({message: "user already exists"})
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

module.exports = router;