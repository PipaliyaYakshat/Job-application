const express = require('express');
const router = express.Router();
const JC = require('../controllers/jobApplicationStatus');

router.post('/', JC.createJobApplicationStatus);

router.get('/', JC.allJobApplicationStatuses);

router.get('/:id', JC.oneJobApplicationStatus);

router.put('/:id', JC.updateJobApplicationStatus);

router.delete('/:id', JC.deleteJobApplicationStatus);

module.exports = router;
