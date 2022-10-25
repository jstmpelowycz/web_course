import db from "../../models";
import {Maybe} from "../../../app";
import {Repository} from "../repository";
import {Book, BookError, CreateBookFields} from "./book.typedefs";

export class BookRepository extends Repository {
  public async getByPk(id: number): Promise<Book | never> {
    const book = await this.findByPk(id);

    if (!book) {
      this.throwError(BookError.NotFound, {
        id,
      });
    }

    return book;
  }

  public async getByTitle(title: string): Promise<Book | never> {
    const book = await this.findByTitle(title);

    if (!book) {
      this.throwError(BookError.NotFound, {
        title,
      });
    }

    return book;
  }

  public async create(fields: CreateBookFields): Promise<Book> {
    const book = await db.Book.create(fields, {
      returning: true,
    });

    return this.getPlain<Book>(book);
  }

  public async getAllByAuthorId(authorId: string): Promise<Book[]> {
    const books = await db.Book.findAll({
      where: {
        authorId,
      }
    });

    return books.map(this.getPlain<Book>);
  }

  private async findByPk(id: number): Promise<Maybe<Book>> {
    return await db.Book.findByPk(id) as Maybe<Book>;
  }

  private async findByTitle(title: string): Promise<Maybe<Book>> {
    const book = await db.Book.findOne({
      raw: true,
      where: {
        title,
      },
    });

    return this.getPlain<Book>(book);
  }
}
