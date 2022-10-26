import db from "../../models";
import {Maybe} from "../../../app";
import {Repository} from "../../utils/repository";
import {Author, AuthorError, CreateAuthorFields, UpdateAuthorFields} from "./author.typedefs";

export class AuthorRepository extends Repository<Author> {
  public async getByPk(id: string): Promise<Author | never> {
    const author = await this.findByPk(id);

    if (!author) {
      this.throwError(AuthorError.NotFound, {
        id,
      });
    }

    return author;
  }

  public async getByEmail(email: string): Promise<Author | never> {
    const author = await this.findByEmail(email);

    if (!author) {
      this.throwError(AuthorError.NotFound, {
        email,
      });
    }

    return author;
  }

  public async create(fields: CreateAuthorFields): Promise<Author> {
    const author = await db.Author.create(fields, {
      returning: true,
    });

    return this.getPlain(author);
  }

  public async update(id: string, fields: UpdateAuthorFields): Promise<number> {
    const [count] = await db.Author.update(fields, {
      where: {
        id
      },
    });

    return count;
  }

  private async findByPk(id: string): Promise<Maybe<Author>> {
    const author = await db.Author.findByPk(id);

    return this.getPlain(author);
  }

  private async findByEmail(email: string): Promise<Maybe<Author>> {
    const author = await db.Author.findOne({
      raw: true,
      where: {
        email,
      },
    });

    return this.getPlain(author);
  }
}
