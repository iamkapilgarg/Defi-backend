require('dotenv').config();
const express = require('express');
const router = express.Router();
const { listProjects, getProjectById, getProjectsByUserId, saveProject } = require('../db/queries/projects');
const { getProjectsByInvestorId } = require('../db/queries/fundings');
const { saveImage, getImagesByProjectsId } = require('../db/queries/images')
const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')

router.get("/", (req, res) => {
  listProjects().then((projects) => {
    const promises = [];
    for (let project of projects) {
      promises.push(getImagesByProjectsId(project.id));
    }
    Promise.all(promises).then((images) => {
      const projectsArray = [];
      for (let image of images) {
        for (let project of projects) {
          if (image[0].project_id === project.id) {
            console.log('inside a')
            projectsArray.push({ ...project, "images": image })
          }
        }
      }
      return res.status(200).json(projectsArray);
    });
  });
});

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  getProjectById(projectId).then((data) => {
    let project = {};
    getImagesByProjectsId(data[0].id).then((images) => {
      project = { ...data[0], images }
      return res.status(200).json(project);
    });
  });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByUserId(userId).then((projects) => {
    const promises = [];
    for (let project of projects) {
      promises.push(getImagesByProjectsId(project.id));
    }
    Promise.all(promises).then((images) => {
      const projectsArray = [];
      for (let image of images) {
        for (let project of projects) {
          if (image[0].project_id === project.id) {
            console.log('inside a')
            projectsArray.push({ ...project, "images": image })
          }
        }
      }
      return res.status(200).json(projectsArray);
    });
  });
});

router.get("/users/fundings/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByInvestorId(userId).then((projects) => {
    console.log(projects)
    const promises = [];
    for (let project of projects) {
      promises.push(getImagesByProjectsId(project.id));
    }
    Promise.all(promises).then((images) => {
      const projectsArray = [];
      for (let image of images) {
        for (let project of projects) {
          if (image[0].project_id === project.id) {
            projectsArray.push({ ...project, "images": image })
          }
        }
      }
      return res.status(200).json(projectsArray);
    });
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

router.post('/', upload.array('image', 1), (req, res, next) => {
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
  }
  saveProject(project).then((data) => {
    if (req.files.length > 0) {
      const image = {
        project_id: data[0],
        image: req.files[0].location
      }
      saveImage(image).then((data) => {
        console.log("image saved successfully")
      });
    }
    return res.status(201).json({ "message": "project saved successfully", id: data[0] });
  })
});

module.exports = router;