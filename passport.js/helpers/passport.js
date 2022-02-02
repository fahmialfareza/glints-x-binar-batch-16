const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Import user model
const { User } = require('../models');

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID:
        '343848483233-rrt64rfqkbiqn2deohc1rm98nt92rmr1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      // Find email or create it
      const [findUser, created] = await User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: { name: profile.displayName },
      });

      // null is no error, findUser => req.user
      cb(null, findUser);
    }
  )
);
