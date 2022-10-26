import {buildSchema} from "graphql/utilities";

export const authorSchema = buildSchema(`
    type Query {
        getAuthorById(id: String!): Author
    }

    interface Author {
        id: String!
        firstName: String!
        lastName: String!
        email: String!
    }
`);
