require('dotenv').config();
const express = require('express');
const router = express.Router();
const { listProjects, getProjectById, getProjectsByUserId, saveProject } = require('../db/queries/projects');
const { getProjectsByInvestorId } = require('../db/queries/fundings');
const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')

router.get("/", (req, res) => {
  listProjects().then((projects) => {
    return res.status(200).json(projects);
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  getProjectById(projectId).then((data) => {
    return res.status(200).json(data);
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByUserId(userId).then((projects) => {
    return res.status(200).json(projects);
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.get("/users/fundings/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByInvestorId(userId).then((projects) => {
    return res.status(200).json(projects);
  }).catch((err) => {
    return res.status(500).send(err)
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  if (body.name === undefined || body.name.trim() === '') {
    return res.status(400).json({ "message": "name cannot be blank" })
  }
  if (body.description === undefined || body.description.trim() === '') {
    return res.status(400).json({ "message": "description cannot be blank" })
  }
  if (body.target_amount === undefined || body.target_amount === 0) {
    return res.status(400).json({ "message": "target_amount cannot be blank or zero" })
  }
  if (body.min_amount === undefined || body.min_amount === 0) {
    return res.status(400).json({ "message": "min_amount cannot be blank" })
  }
  if (body.target_date === undefined || body.target === '') {
    return res.status(400).json({ "message": "target_date cannot be blank" })
  }
  if (body.contract === undefined || body.contract.trim() === '') {
    return res.status(400).json({ "message": "contract cannot be blank" })
  } 
  if(body.image === undefined || body.image.trim === '') {
    return res.status(400).json({ "message": "image cannot be blank" })
  }
  const project = {
    name: body.name,
    description: body.description,
    target_amount: body.target_amount,
    target_date: body.target_date,
    min_amount: body.min_amount,
    round: body.round,
    contract: body.contract,
    user_id: body.user_id,
    link: body.link,
    image: body.image
  }
  saveProject(project).then((data) => {
    return res.status(201).json({ "message": "project saved successfully", id: data[0] });
  }).catch((err) => {
    return res.status(500).send(err)
  });
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

router.post('/image', upload.array('image', 1), (req, res, next) => {
  res.end(req.files[0].location);
});
module.exports = router;