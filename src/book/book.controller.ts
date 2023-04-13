import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { BookTypeBody } from './bookType';
import { Book } from './book';

@Controller('book')
export class BookController {
  constructor(private book: Book) {}

  @Get()
  @HttpCode(200)
  async getAllBook() {
    return this.book.getAllBook();
  }
  @Post()
  @HttpCode(204)
  async createBook(@Body() bodyBook: BookTypeBody) {
    return this.book.createBook(bodyBook);
  }
}
