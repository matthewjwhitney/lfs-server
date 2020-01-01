const { gql } = require("apollo-server-express");

export const typeDefs = gql`

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  extend type Query {
    users: [User]
    currentUser: User
  }

  extend type Mutation {
    addUser(
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

    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload

    login(email: String!, password: String!): AuthPayload

    logout: Boolean
  }

  type AuthPayload {
    user: User
  }
`;