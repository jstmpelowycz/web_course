import {authorSchema} from "./author/author.schema";
import {bookSchema} from "./book/book.schema";
import {emptyFunction} from "../utils/functional";
import {mergeSchemas} from '@graphql-tools/schema'

export const schema = mergeSchemas({
  schemas: [authorSchema, bookSchema],
})

export const root = {
  getAuthorById: emptyFunction,
  getBookById: emptyFunction,
}
