import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorEntity } from 'src/author/author.entity';
import { IBook, IBookEntity } from 'src/book/bookType';
import { GenreEntity } from 'src/genre/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Author } from 'src/author/author';
import { Genre } from 'src/genre/genre';
import { Repository } from 'typeorm';

@Injectable()
export class Book {
  private _author: Author;
  private _genre: Genre;
  constructor(
    @InjectRepository(BookEntity)
    private readonly book: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly author: Repository<AuthorEntity>,
    @InjectRepository(GenreEntity)
    private readonly genre: Repository<GenreEntity>,
  ) {
    this._author = new Author(this.author);
    this._genre = new Genre(this.genre);
  }
  async createBook(bodyBook: IBookEntity) {
    return this.book.create(bodyBook);
  }
  private async _getBookById(id: number[]) {
    return await this.book
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'authors')
      .leftJoinAndSelect('book.genre', 'genre')
      .where('book.id = :id', { id: id })
      .getManyAndCount();
  }
  async getBookById(bookId: number) {
    const findBook = await this._getBookById([bookId]);
    return {
      count: findBook[1],
      data: findBook[0],
    };
  }
  async getAllBook() {
    const data = await this.book.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }
  async saveBook(bodyBook: IBook) {
    if (bodyBook.id && isNaN(Number(bodyBook.id)))
      throw new HttpException('Need book id', HttpStatus.BAD_REQUEST);
    if (
      !bodyBook.authors ||
      bodyBook.authors?.length <= 0 ||
      !bodyBook.edition ||
      !bodyBook.genre ||
      bodyBook.genre?.length <= 0 ||
      !bodyBook.title ||
      !bodyBook.year_of_issue
    )
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    const _book: IBookEntity = {} as IBookEntity;

    const findAuthor = await this._author.getAuthorsById(bodyBook.authors);
    if (findAuthor.length < bodyBook.authors.length)
      throw new HttpException('Authors not found', HttpStatus.NOT_FOUND);

    const findGanre = await this._genre.getGenreById(bodyBook.genre);
    if (findGanre.length < bodyBook.genre.length)
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);

    if (bodyBook?.id) _book.id = Number(bodyBook.id);
    _book.title = bodyBook.title;
    _book.edition = bodyBook.edition;
    _book.year_of_issue = bodyBook.year_of_issue;
    _book.authors = findAuthor;
    _book.genre = findGanre;

    const { id } = await this.book.save(_book);

    const findBookData = await this._getBookById([id]);

    return {
      data: findBookData[0],
      count: findBookData[1],
    };
  }
  async deleteBook(bookId: number) {
    if (!bookId || isNaN(Number(bookId)))
      throw new HttpException('Need book id', HttpStatus.BAD_REQUEST);

    const findBook = await this._getBookById([bookId]);

    if (findBook[1] <= 0)
      throw new HttpException(
        'Book: ' + bookId + ' - not found',
        HttpStatus.BAD_REQUEST,
      );

    return this.book
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: bookId })
      .execute();
  }
  async updateBookPatch(bodyBook: IBook) {
    const _book: IBookEntity = {} as IBookEntity;

    if (bodyBook.id && isNaN(Number(bodyBook.id)))
      throw new HttpException('Need book id', HttpStatus.BAD_REQUEST);

    _book.id = Number(bodyBook.id);

    const findBookData = await this._getBookById([bodyBook.id]);

    if (bodyBook?.authors?.length > 0) {
      const findAuthor = await this._author.getAuthorsById(bodyBook.authors);
      if (findAuthor.length < bodyBook.authors.length)
        throw new HttpException('Authors not found', HttpStatus.NOT_FOUND);
      _book.authors = findAuthor;
    } else {
      _book.authors = findBookData[0][0].authors;
    }

    if (bodyBook?.authors?.length > 0) {
      const findGanre = await this._genre.getGenreById(bodyBook.genre);
      if (findGanre.length < bodyBook.genre.length)
        throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
      _book.genre = findGanre;
    } else {
      _book.genre = findBookData[0][0].genre;
    }

    if (bodyBook?.title) _book.title = bodyBook.title;
    else _book.title = findBookData[0][0].title;
    if (bodyBook?.edition) _book.edition = bodyBook.edition;
    else _book.edition = findBookData[0][0].edition;
    if (bodyBook?.year_of_issue) _book.year_of_issue = bodyBook.year_of_issue;
    else _book.year_of_issue = findBookData[0][0].year_of_issue;

    const { id } = await this.book.save(_book);

    const _findBookData = await this._getBookById([id]);

    return {
      data: _findBookData[0],
      count: _findBookData[1],
    };
  }
  async updateBookPut(bodyBook: IBook) {
    return this.saveBook(bodyBook);
  }
}
