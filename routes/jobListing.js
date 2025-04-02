const express = require('express');
const router = express.Router();
const JC = require('../controllers/jobListing');


router.post('/', JC.createJobListing);

router.get('/', JC.allJobListings);

router.get('/:id', JC.oneJobListing);

router.patch('/:id', JC.updateJobListing);

router.delete('/:id', JC.deleteJobListing);

module.exports = router;
