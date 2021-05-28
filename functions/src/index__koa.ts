import * as functions from "firebase-functions";
import { PrismaClient } from "@prisma/client";
import Koa from "koa";
// import bodyParser from "koa-bodyparser";
import { ApolloServer, gql } from "apollo-server-koa";
// import Router from "koa-router";
// import json from "koa-json";

const app = new Koa();
const region = "asia-northeast1";
// app.use(bodyParser());

const prisma = new PrismaClient();

// const router = new Router();
// const routes = require("./routers");
// router.post("/graphql", graphqlKoa({ schema: myGraphQLSchema }));
// router.get("/graphql", graphqlKoa({ schema: myGraphQLSchema }));

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    // hello: () => "Hello world!",
    hello: () => prisma.articles.findMany(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// app.use(router.routes()).use(router.allowedMethods());
// routes(router);

exports.api = functions.region(region).https.onRequest(app.callback());
