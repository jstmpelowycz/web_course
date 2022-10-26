import {Book} from "../book.typedefs";
import {BookRepository} from "../book.repository";

interface Options {
  id: number;
}

type Result = Book;

export const getBookByIdResolver = async (
  options: Options,
): Promise<Result> => {
  const authorRepository = new BookRepository();

  return await authorRepository.getByPk(options.id);
}
