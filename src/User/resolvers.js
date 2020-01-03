import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    currentUser: async (parent, args, { models: { userModel }, user }, info) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return await userModel.findById(user.id);
    },
    login: async (
      parent,
      { email, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.findOne({ email });
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
    },
    user: async (parent, { id }, { models: { userModel }, user }, info) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return await userModel.findById(id);
    },
    users: async (parent, args, { models: { userModel }, user }, info) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return await userModel.find({});
    },
  },

  Mutation: {
    createUser: async (parent, args, { models: { userModel } }, info) => {
      const user = await userModel.create({ ...args });
      return user;
    },
    deleteUser: async (parent, args, { models: { userModel } }, info) =>
      await userModel.findByIdAndRemove({ _id: args.id }),
    updateUser: async (parent, args, { models: { userModel } }, info) =>
      await userModel
        .findOneAndUpdate(
          { _id: args.id },
          { $set: { ...args } },
          { new: true }
        ),
  }
};
