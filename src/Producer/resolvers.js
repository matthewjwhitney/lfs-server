import Producer from "./model";

export const resolvers = {
  Query: {
    producers: () => Producer.find({})
  },

  Mutation: {
    addProducer: (parent, args) => new Producer({ ...args }).save(),

    updateProducer: (parent, args) => {
      if (!args.id) return;
      return Producer.findOneAndUpdate(
        { _id: args.id },
        { $set: { ...args } },
        { new: true }
      );
    },

    deleteProducer: (parent, args) => {
      if (!args.id) return;
      return Producer.findByIdAndRemove({ _id: args.id });
    }
  }
};
