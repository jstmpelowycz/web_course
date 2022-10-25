export interface Book {
  id: number;
  authorId: string;
  title: string;
}

export type CreateBookFields = Omit<Book, 'id'>;

export enum BookError {
  NotFound = 'book_not_found',
  Assertion = 'book_args_assertion',
}
