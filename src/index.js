import { ApolloServer, mergeSchemas, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import uuid from "uuid/v4";
import session from "express-session";
import { merge } from 'lodash';

import { producerTypes, producerResolvers } from "./Producer";
import { userTypes, userResolvers, userSchema } from "./User";
import { initPassport } from './initPassport';
import buildContext from "graphql-passport/lib/buildContext";

const port = process.env.PORT || 4000;
const SESSION_SECRECT = 'bad secret';

const User = mongoose.model("User", userSchema);
initPassport({ User });

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
  // use secure cookies for production meaning they will only be sent via https
  //cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

const dbURL =
  "mongodb://admin:D$nbX6XRMwedBh@ds253408.mlab.com:53408/producers";

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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
  },
  type Mutation {
    _blank: String
  }
`;

const resolvers = {
  Query: {
    _blank: () => null,
  },
  Mutation: {
    _blank: () => null,
  }
}

const schema = mergeSchemas({
  schemas: [
    typeDefs,
    producerTypes,
    userTypes,
  ],
  resolvers: merge(
    resolvers,
    producerResolvers,
    userResolvers,
  )
})

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

server.applyMiddleware({ app, cors: false });

app.get('/', function (req, res) {
  res.send('lfs-server is running.');
});

app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}`));
