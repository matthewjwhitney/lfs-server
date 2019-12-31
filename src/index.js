import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { typeDefs, resolvers } from "./schema";

const app = express();
app.use(bodyParser.json());
app.use("*", cors());

const dbURL =
  "mongodb://matthewjwhitney:testpass1@ds253408.mlab.com:53408/producers";

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(
    db => {
      console.log("Server connected with database successfully");
    },
    err => {
      console.log(err);
    }
  );

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get("/", function(req, res) {
  res.send("lfs-server is running.");
});
var port = process.env.PORT || 4000;
app.listen({ port }, () =>
  console.log(
    `Server ready at http://localhost:${port} \n\ In development, view graphql playground at http://localhost:${port}/graphql`
  )
);
