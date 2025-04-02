const express = require('express');
const router = express.Router();
const JC = require('../controllers/jobApplication');
const multer = require('multer');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]), JC.createJobApplication);

router.get('/', JC.allJobApplications);

router.get('/:id', JC.oneJobApplication);

router.patch('/:id', JC.updateJobApplication);

router.delete('/:id', JC.deleteJobApplication);

module.exports = router;
