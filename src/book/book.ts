import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorEntity } from 'src/author/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BookTypeBody } from './bookType';
import { Repository } from 'typeorm';

@Injectable()
export class Book {
  constructor(
    @InjectRepository(BookEntity)
    private readonly book: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly author: Repository<AuthorEntity>,
  ) {}

  async getAllBook() {
    const data = await this.book.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }
  async createBook(bodyBook: BookTypeBody) {
    if (
      bodyBook.authors?.length <= 0 ||
      !bodyBook.edition ||
      !bodyBook.genre ||
      !bodyBook.title ||
      !bodyBook.year_of_issue
    )
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    let authors = await this.author
      .createQueryBuilder()
      .where('firstName IN (:...firstName)', {
        firstName: bodyBook.authors.map((author) => author.authors_name),
      })
      .andWhere('lastName IN (:...lastName)', {
        lastName: bodyBook.authors.map((author) => author.author_surname),
      })
      .getMany();

    if (authors.length <= 0) {
      authors = this.author.create(
        bodyBook.authors.map((author) => {
          return {
            firstName: author.authors_name,
            lastName: author.author_surname,
          };
        }),
      );
      this.author.insert(authors);
    }

    const data = await this.book.create({
      title: bodyBook.title,
      year_of_issue: bodyBook.year_of_issue,
      edition: bodyBook.edition,
      authors: authors,
    });

    return data;
  }
}
