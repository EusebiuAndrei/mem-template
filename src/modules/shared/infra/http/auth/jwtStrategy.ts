import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const applyJWTStrategy = (passport: PassportStatic) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'MY_SECRET',
  };

  passport.use(
    new Strategy(options, (payload, done) => {
      // return done(null, false) - success
      // return done(err, false) - error
      //! This has to be implemented
    }),
  );
};

export default applyJWTStrategy;
