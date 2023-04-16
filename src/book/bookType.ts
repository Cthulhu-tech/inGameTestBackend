import { IAuthor } from 'src/author/authorType';
import { IGenre } from 'src/genre/genresType';

export type Book = {
  title: string;
  year_of_issue: string;
  edition: string;
};

export interface IBook extends Book {
  authors: number[];
  genre: number[];
}

export interface IBookEntity extends Book {
  authors: IAuthor[];
  genre: IGenre[];
}
