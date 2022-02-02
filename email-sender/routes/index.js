const express = require('express');

const router = express.Router();
const UserRoute = require('./UserRoute');

router.use('/user', UserRoute);

module.exports = router;
