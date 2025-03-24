var express = require('express');
var router = express.Router();
const CC = require('../controllers/company');

router.post('/', CC.createCompany);

router.get('/', CC.allCompanies);

router.get('/:id', CC.oneCompany);

router.patch('/:id', CC.updateCompany);

router.delete('/:id', CC.deleteCompany);

module.exports = router;
