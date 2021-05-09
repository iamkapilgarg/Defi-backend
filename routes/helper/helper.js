const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')

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

module.exports = {upload}