const { ApolloServer } = require("apollo-server-express");
var express = require("express");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./schema");

const dbUrl =
  "mongodb://matthewjwhitney:testpass1@ds253408.mlab.com:53408/producers";
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected with DB successfully");
  }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error"));

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;
app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
