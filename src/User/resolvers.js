import mongoose from "mongoose";
import { schema } from "./schema";
import uuid from "uuid/v4";

const User = mongoose.model("User", schema);

export const resolvers = {
    Query: {
        currentUser: (parent, args, context) => context.getUser(),
        users: () => User.find({})
    },

    Mutation: {
        addUser: (parent, args) => new User({ ...args }).save(),
        updateUser: (parent, args) => {
            if (!args.id) return;
            return User.findOneAndUpdate(
                { _id: args.id },
                { $set: { ...args } },
                { new: true }
            );
        },
        deleteUser: (parent, args) => {
            if (!args.id) return;
            return User.findByIdAndRemove({ _id: args.id });
        },
        signup: async (parent, { firstName, lastName, email, password }, context) => {
            const users = User.find({})

            if (users.length > 0 && users.find(user => user.email === email)) {
                throw new Error('User with email already exists');
            }

            const newUser = new User({
                firstName,
                lastName,
                email,
                password,
            });

            newUser.save();

            context.login(newUser);

            return { user: newUser };
        },
        login: async (parent, { email, password }, context) => {
            const { user } = await context.authenticate('graphql-local', { email, password });
            context.login(user);
            return { user }
        },
        logout: (parent, args, context) => context.logout(),
    }
};