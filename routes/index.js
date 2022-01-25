const express = require('express');
const passport = require('passport');

const router = express.Router();
const UserRoute = require('./UserRoute');
// const { authenticate } = require('../middlewares/auth')

/* Import passport helper */
require('../helpers/passport');

/* OAuth Google */
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.use('/user', UserRoute);
// router.use(authenticate)

module.exports = router;
