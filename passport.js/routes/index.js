const express = require('express');
const passport = require('passport');

const router = express.Router();
const UserRoute = require('./UserRoute');
// const { authenticate } = require('../middlewares/auth')

/* Import passport helper */
require('../helpers/passport');

const { generateToken } = require('../helpers/jwt');

/* OAuth Google */
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  function (req, res) {
    // Successful authentication
    let payload = {
      id: req.user.id,
      email: req.user.email,
    };

    const access_token = generateToken(payload);
    res.status(200).json({ access_token });
  }
);

router.use('/user', UserRoute);
// router.use(authenticate)

module.exports = router;
