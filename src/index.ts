/*eslint-disable @typescript-eslint/no-unused-vars*/

import db from '../src/api/models';
import {AuthorRepository} from "./api/modules/author/author.repository";
import {BookRepository} from "./api/modules/book/book.repository";
import {faker} from "@faker-js/faker";

const express = require('express');

const app = express();
const port = process.env.PORT || process.env.FALLBACK_PORT;

const mockFnA = () => {
  const authorRepository = new AuthorRepository();
  const bookRepository = new BookRepository();

  let authorId = '';

  const authorTestFn = async () => {
    const createdAuthor = await authorRepository.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    authorId = createdAuthor.id;

    const retrievedBook = await authorRepository.getByPk(authorId);

    console.log(retrievedBook);

    await authorRepository.update(authorId, {
      firstName: faker.name.firstName(),
    });
  };

  const bookTestFn = async () => {
    const createdBook = await bookRepository.create({
      authorId,
      title: faker.random.words(5),
    });

    const retrievedBook = await bookRepository.getByPk(createdBook.id);

    console.log(createdBook.title);
    console.log(retrievedBook.title);
  };

  authorTestFn().then(() => {
    bookTestFn().then();
  });
}

const mockFnB = () => {
  const authorAndBooksTestFn = async () => {
    const authorRepository = new AuthorRepository();
    const bookRepository = new BookRepository();

    const author = await authorRepository.create({
      firstName: 'Bob',
      lastName: 'Jones',
      email: faker.internet.email(),
    });

    await Promise.all([
      bookRepository.create({
        title: faker.random.words(4),
        authorId: author.id,
      }),
      bookRepository.create({
        title: faker.random.words(5),
        authorId: author.id,
      }),
    ]);

    const books = await bookRepository.getAllByAuthorId(author.id);

    console.log(books);
  };

  authorAndBooksTestFn().then();
}

mockFnA();
mockFnB();

db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log('Listening...');
    });
  });
