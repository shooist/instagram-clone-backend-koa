// const functions = require("firebase-functions");
// const Koa = require("koa");
// const Router = require("koa-router");
// const json = require("koa-json");
// const bodyParser = require("koa-bodyparser");
// const { ApolloServer, gql } = require("apollo-server-koa");
import { PrismaClient } from "@prisma/client";

const app = new Koa();
const region = "asia-northeast1";
app.use(bodyParser());

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
