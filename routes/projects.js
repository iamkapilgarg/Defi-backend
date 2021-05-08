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
    for(let project of projects) {
      promises.push(getImagesByProjectsId(project.id));
    }
    Promise.all(promises).then((images) => {
      const projectsArray = [];
      for(let image of images) {
        for(let project of projects) {
          if(image[0].project_id === project.id) {
            console.log('inside a')
            projectsArray.push({... project, "images": image})
          }
        }
      }
      res.status(200).json(projectsArray);
    });
  });
});

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  getProjectById(projectId).then((data) => {
    let project = {};
    getImagesByProjectsId(data[0].id).then((images) => {
      project = {...data[0], images}
      res.status(200).json(project);
    });
  });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByUserId(userId).then((projects) => {
    const promises = [];
    for(let project of projects) {
      promises.push(getImagesByProjectsId(project.id));
    }
    Promise.all(promises).then((images) => {
      const projectsArray = [];
      for(let image of images) {
        for(let project of projects) {
          if(image[0].project_id === project.id) {
            console.log('inside a')
            projectsArray.push({... project, "images": image})
          }
        }
      }
      res.status(200).json(projectsArray);
    });
  });
});

router.get("/users/fundings/:id", (req, res) => {
  const userId = req.params.id;
  getProjectsByInvestorId(userId).then((projects) => {
    console.log(projects)
    const promises = [];
    for(let project of projects) {
      promises.push(getImagesByProjectsId(project.id));
    }
    Promise.all(promises).then((images) => {
      const projectsArray = [];
      for(let image of images) {
        for(let project of projects) {
          if(image[0].project_id === project.id) {
            console.log('inside a')
            projectsArray.push({... project, "images": image})
          }
        }
      }
      res.status(200).json(projectsArray);
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

//use by upload form
router.post('/', upload.array('image', 1), (req, res, next) => {
  console.log(req.files)
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
    link: body.link,
  }
  saveProject(project).then((data) => {
    const image = {
      project_id: data[0],
      image: req.files[0].location
    }
    saveImage(image).then((data) => {
      console.log("image saved successfully")
    })
    res.status(201).json({ "message": "project saved successfully", id: data[0] });
  })
});


module.exports = router;