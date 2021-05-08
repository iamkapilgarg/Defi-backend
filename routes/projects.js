require('dotenv').config();
const express = require('express');
const router = express.Router();
const { listProjects, getProjectById, getProjectsByUserId, saveProject } = require('../db/queries/projects');
const { getProjectsByInvestorId } = require('../db/queries/fundings')
const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')

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

aws.config.update({
  secretAccessKey: process.env.SECRETACCESSKEY,
  accessKeyId: process.env.ACCESSKEYID,
  region: process.env.REGION
});

s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      key: (req, file, cb) => {
          cb(null, file.originalname);
      }
  })
});

//use by upload form
router.post('/', upload.array('image',1), (req, res, next) => {
  const body = req.body;
  const project = {
    name: body.name,
    description: body.description,
    target_amount: body.target_amount,
    target_date: body.target_date,
    min_amount: body.min_amount,
    round: body.round,
    contract: body.contract,
    user_id: body.user_id,
    link: body.link
  }
  saveProject(project).then((data) => {
    res.status(201).json({"message": "project saved successfully", id: data[0]});
  })
});


module.exports = router;