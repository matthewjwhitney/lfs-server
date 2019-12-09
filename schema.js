const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");
/* const producers = require("./producers.json"); */
/* const products = require("./products.json"); */

const typeDefs = gql`
  #type Product {
  #  description: String
  #  unit: String
  #  price: String
  #  producer: String
  #  notes: String
  #}

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
    # getProducts: [Product]
  }

  type Mutation {
    # addProduct(
    #   description: String
    #   unit: String
    #   price: String
    #   producer: String
    #   notes: String
    # ): Product

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
    /* getProducts: () => products */
    getProducers: () => {
      return MProducers.find();
    }
  }
};

module.exports = { typeDefs, resolvers };
