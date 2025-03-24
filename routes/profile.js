const express = require('express');
const router = express.Router();
const PC = require('../controllers/profile');
const multer = require('multer');
const path = require('path');

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

router.post('/', upload.single('profilePicture'), PC.createProfile);

router.get('/', PC.allProfiles);

router.get('/:id', PC.oneProfile);

router.patch('/:id', PC.updateProfile);

router.delete('/:id', PC.deleteProfile);

module.exports = router;
