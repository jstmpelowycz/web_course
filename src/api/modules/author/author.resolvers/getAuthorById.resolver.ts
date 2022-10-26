import {Author} from "../author.typedefs";
import {AuthorRepository} from "../author.repository";

interface Options {
  id: string;
}

type Result = Author;

export const getAuthorByIdResolver = async (
  options: Options,
): Promise<Result> => {
  const authorRepository = new AuthorRepository();

  return await authorRepository.getByPk(options.id);
}
