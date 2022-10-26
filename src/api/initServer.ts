import {buildSchema} from "graphql/utilities";
import {getBookByIdResolver} from "./modules/book/book.resolvers/getBookById.resolver";
import {getAuthorByIdResolver} from "./modules/author/author.resolvers/getAuthorById.resolver";

const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();
const PORT = 4001;

const schema = buildSchema(`
    type Query {
      getAuthorById(id: String!): Author!
      getBookById(id: Int!): Book!
    }

    type Author {
      id: String!
      firstName: String!
      lastName: String!
      email: String!
    }
    
    type Book {
      id: Int!
      title: String!
      authorId: String!
    }
`);

const resolvers = {
  getAuthorById: getAuthorByIdResolver,
  getBookById: getBookByIdResolver,
};

app.use('/api', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}))

app.listen(PORT, () => {
  console.log('Listening...');
});
