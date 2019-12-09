const { ApolloServer, gql } = require("apollo-server-express");
var express = require("express");
const { typeDefs, resolvers } = require("./schema");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const port = 4000;
app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
