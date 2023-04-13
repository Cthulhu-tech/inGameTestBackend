import { Injectable } from '@nestjs/common';

@Injectable()
export class Book {
  private readonly Book = [];

  getAllBook() {
    return this.Book;
  }
}
