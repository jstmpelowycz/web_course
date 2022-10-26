import {buildSchema} from "graphql/utilities";

export const bookSchema = buildSchema(`
    type BookQuery {
        getBookById(id: Int!): Book
    }

    interface Book {
        id: Int!
        title: String!
        authorId: String!
    }
`);
