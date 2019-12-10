const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Producer {
    id: ID
    name: String
    location: String
    productTypes: String
    contactPerson: String
    phoneNumber: String
    email: String
    website: String
    notes: String
  }

  type Query {
    producers: [Producer]
  }

  type Mutation {
    addProducer(
      name: String
      location: String
      productTypes: String
      contactPerson: String
      phoneNumber: String
      email: String
      website: String
      notes: String
    ): Producer
    updateProducer(
      id: ID!
      name: String
      location: String
      productTypes: String
      contactPerson: String
      phoneNumber: String
      email: String
      website: String
      notes: String
    ): Producer
    deleteProducer(id: ID!): Producer
  }
`;

const producerSchema = new mongoose.Schema({
  name: { type: String },
  location: { type: String },
  productTypes: { type: String },
  contactPerson: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  website: { type: String },
  notes: { type: String }
});

producerSchema.set("toObject", { virtuals: true });
const Producer = mongoose.model("Producer", producerSchema);

const resolvers = {
  Query: {
    producers: () => Producer.find({})
  },
  Mutation: {
    addProducer: (parent, args) =>
      new Producer({
        name: args.name,
        location: args.location,
        productTypes: args.productTypes,
        contactPerson: args.contactPerson,
        phoneNumber: args.phoneNumber,
        email: args.email,
        website: args.website,
        notes: args.notes
      }).save(),
    updateProducer: (parent, args) => {
      if (!args.id) return;
      return Producer.findOneAndUpdate(
        {
          _id: args.id
        },
        {
          $set: {
            name: args.name,
            location: args.location,
            productTypes: args.productTypes,
            contactPerson: args.contactPerson,
            phoneNumber: args.phoneNumber,
            email: args.email,
            website: args.website,
            notes: args.notes
          }
        },
        { new: true }
      );
    },
    deleteProducer: (parent, args) => {
      if (!args.id) return;
      return Producer.findOneAndDelete({
        _id: args.id
      });
    }
  }
};

module.exports = { typeDefs, resolvers };
