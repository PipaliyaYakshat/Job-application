const express = require('express');
const router = express.Router();
const UC = require('../controllers/user');
let middleware = require('../middleware/jwt')

router.post('/', UC.signupUser);

router.post('/login', UC.loginUser);

router.get('/', middleware.Auth, UC.viewAllUsers);

router.patch('/users/:userId', middleware.Auth, UC.updateUser);

router.delete('/users/:userId', middleware.Auth, UC.deleteUser);

module.exports = router;
