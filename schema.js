const { gql } = require("apollo-server-express");
/* const producers = require("./producers.json"); */
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
  }
`;

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  productTypes: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  notes: { type: String, required: true }
});

producerSchema.set("toObject", { virtuals: true });
const producers = mongoose.model("Producer", producerSchema);

const resolvers = {
  Query: {
    producers: () => producers.find({})
    /* producers: () => producers */
  }
};

module.exports = { typeDefs, resolvers };
