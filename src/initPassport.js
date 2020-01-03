import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";

export const initPassport = ({ User }) => {
  passport.use(
    new GraphQLLocalStrategy(
      async (email, password, done) =>
        await User.findOne({ email, password }).then((user, error) =>
          done(error, user)
        )
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(
    async (id, done) =>
      await User.findById(id).then((user, error) => done(error, user))
  );
};
