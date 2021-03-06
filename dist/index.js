"use strict";

const {
  ApolloServer
} = require("apollo-server-express");

const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

const {
  typeDefs,
  resolvers
} = require("./schema");

const app = express();
app.use(bodyParser.json());
app.use("*", cors());
const dbURL = "mongodb://matthewjwhitney:testpass1@ds253408.mlab.com:53408/producers";
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(db => {
  console.log("Server connected with database successfully");
}, err => {
  console.log(err);
});
const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({
  app
});
app.get('/', function (req, res) {
  res.send('lfs-server is running.');
});
var port = process.env.PORT || 4000;
app.listen({
  port
}, () => console.log(`Server ready at http://localhost:${port} \n\ In development, view graphql playground at http://localhost:${port}/graphql`));