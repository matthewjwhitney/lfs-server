const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { typeDefs, resolvers } = require("./schema");

const app = express();
app.use(bodyParser.json());
app.use("*", cors());

const dbURL =
  "mongodb://matthewjwhitney:testpass1@ds253408.mlab.com:53408/producers";

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    db => {
      console.log("Connected with DB successfully");
    },
    err => {
      console.log(err);
    }
  );

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
