const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Producer {
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
    getProducers: [Producer]
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

const MProducers = mongoose.model("Producer", producerSchema);

const resolvers = {
  Query: {
    getProducers: () => {
      return MProducers.find();
    }
  }
};

module.exports = { typeDefs, resolvers };
