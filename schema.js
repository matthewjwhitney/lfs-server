const { gql } = require("apollo-server-express");
const producers = require("./producers.json");
const products = require("./products.json");

const typeDefs = gql`
  type Product {
    description: String
    unit: String
    price: String
    producer: String
    notes: String
  }

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
    getProducts: [Product]
  }

  type Mutation {
    addProduct(
      description: String
      unit: String
      price: String
      producer: String
      notes: String
    ): Product

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

const resolvers = {
  Query: {
    getProducers: () => producers,
    getProducts: () => products
  }
};

module.exports = { typeDefs, resolvers };
