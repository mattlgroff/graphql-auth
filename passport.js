const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-oauth').OAuth2Strategy;

// GOOGLE STRATEGY
const GoogleTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    GoogleTokenStrategyCallback
  )
);

// promisified authenticate functions
const authenticateGoogle = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      'google-token',
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });

module.exports = { authenticateGoogle };
