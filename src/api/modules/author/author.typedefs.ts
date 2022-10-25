export interface Author {
  id: string,
  email: string,
  firstName: string;
  lastName: string;
}

export type CreateAuthorFields = Omit<Author, 'id'>;
export type UpdateAuthorFields = Partial<Omit<Author, 'id'>>;

export enum AuthorError {
  NotFound = 'author_not_found',
}
