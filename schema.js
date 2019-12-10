const { gql } = require("apollo-server-express");
const producers = require("./producers.json");
/* const mongoose = require("mongoose"); */

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

/* const producerSchema = new mongoose.Schema({
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
const producers = mongoose.model("Producer", producerSchema); */

const resolvers = {
  Query: {
    /* producers: () => producers.find() */
    producers: () => producers
  }
};

module.exports = { typeDefs, resolvers };
