import {
  ApolloServer,
  mergeSchemas,
  gql,
  AuthenticationError
} from "apollo-server-express";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { merge } from "lodash";

import { producerTypes, producerResolvers, producerModel } from "./Producer";
import { userTypes, userResolvers, userModel } from "./User";

const port = process.env.PORT || 4000;
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true
};

const getUser = async req => {
  const token = req.headers["token"];

  if (token) {
    try {
      return await jwt.verify(token, "riddlemethis");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://admin:D$nbX6XRMwedBh@ds253408.mlab.com:53408/producers", {
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

const typeDefs = gql`
  type Query {
    _blank: String
  }
  type Mutation {
    _blank: String
  }
`;

const resolvers = {
  Query: {
    _blank: () => null
  },
  Mutation: {
    _blank: () => null
  }
};

const schema = mergeSchemas({
  schemas: [typeDefs, producerTypes, userTypes],
  resolvers: merge(resolvers, producerResolvers, userResolvers)
});

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req),
    models: {
      userModel,
      producerModel
    }
  }),
  playground: {
    settings: {
      "request.credentials": "same-origin"
    }
  }
});

server.applyMiddleware({ app, cors: false, path: "/graphql" });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}`)
);
