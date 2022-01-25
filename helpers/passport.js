const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID:
        '343848483233-rrt64rfqkbiqn2deohc1rm98nt92rmr1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log('profile: ', profile);
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
    }
  )
);
