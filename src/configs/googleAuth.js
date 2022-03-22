import GoogleStrategy from "passport-google-oauth20";
import config from ".";
import User from "../api/model/userModal";

const googleAuth = (passport) => {
  GoogleStrategy.Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, callback) => {
        const userObject = {
          googleId: profile.id,
          displayName: profile.displayName,
          gmail: profile.emails[0].value,
          image: profile.photos[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return callback(null, profile);
        }

        User.create(userObject)
          .then((user) => {
            return callback(null, user);
          })
          .catch((err) => {
            return callback(err.message);
          });
      }
    )
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
    console.log(callback);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      callback(err, user);
    });
  });
};

export { googleAuth };
