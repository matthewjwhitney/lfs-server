import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    currentUser: (parent, args, { user }) => user,
    users: async (parent, context) => {
      if (!context.user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return await context.models.userModel.find({}).exec();
    },
    user: async (parent, { id }, { models: { userModel }, user }, info) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return await userModel.findById({ id }).exec();
    },
    login: async (
      parent,
      { email, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.findOne({ email }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, "riddlemethis", {
        expiresIn: 24 * 10 * 50
      });

      return {
        token
      };
    }
  },

  Mutation: {
    createUser: async (parent, args, { models: { userModel } }) =>
      await userModel.create({ ...args }),
    updateUser: async (parent, args, { models: { userModel } }) =>
      await userModel
        .findOneAndUpdate(
          { _id: args.id },
          { $set: { ...args } },
          { new: true }
        )
        .exec(),
    deleteUser: async (parent, args, { models: { userModel } }) =>
      await userModel.findByIdAndRemove({ _id: args.id }).exec()
  }
};
