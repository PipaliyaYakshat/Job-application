const express = require('express');
const router = express.Router();
const NC = require('../controllers/information');


router.post('/', NC.createInformation);

router.get('/', NC.allInformation);

router.get('/:id', NC.oneInformation);

router.patch('/:id', NC.updateInformation);

router.delete('/:id', NC.deleteInformation);

module.exports = router;
