require('dotenv').config();
const express = require('express');
const router = express.Router();
const {getUserById, getUserByAuthId, addUsers} = require('../db/queries/users');

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  getUserById(userId).then((data) => {
    res.json(data);
  });
});

router.get("/auth/:id", (req, res) => {
  const userId = req.params.id;
  getUserByAuthId(userId).then((data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  const auth_id = req.body.authId;
  const name = req.body.name;
  const user = {
    name,
    auth_id
  };
  addUsers(user).then((data) => {
    res.status(201).send({message: "user save successfully", id: data[0]})
  })
})

module.exports = router;