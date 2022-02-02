const express = require('express');

const router = express.Router();
//! panggil controller dari user untuk hit endpoint
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);

module.exports = router;
