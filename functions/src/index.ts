import * as functions from "firebase-functions";
import { ApolloServer, gql } from "apollo-server-cloud-functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   type Book {
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//   }
// `;

const typeDefs = gql`
  type Article {
    id: Int
    author: String
    caption: String
    imageUrl: String
    uid: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    articles: [Article]
  }
`;

// const books = [
//   {
//     title: "Harry Potter and the Chamber of Secrets",
//     author: "J.K. Rowling",
//   },
//   {
//     title: "Jurassic Park",
//     author: "Michael Crichton",
//   },
// ];

const resolvers = {
  Query: {
    // books: () => books,
    articles: () => prisma.articles.findMany(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
  }),
});

exports.graphql = functions.https.onRequest(server.createHandler());
