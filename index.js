const { ApolloServer } = require("apollo-server");

const { typeDefs, resolvers } = require("./schema");

/* const mongoose = require("mongoose");

const dbURL =
  "mongodb://matthewjwhitney:testpass1@ds253408.mlab.com:53408/producers";

mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected with DB successfully");
  }
);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "DB connection error")); */

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
