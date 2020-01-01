const { gql } = require("apollo-server-express");

export const typeDefs = gql`
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

  extend type Query {
    producers: [Producer]
  }

  extend type Mutation {
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