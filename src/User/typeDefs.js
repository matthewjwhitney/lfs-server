const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
    currentUser: User
    login(email: String!, password: String!): Token
  }

  extend type Mutation {
    createUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    updateUser(
      id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    deleteUser(id: ID!): User
  }
`;
