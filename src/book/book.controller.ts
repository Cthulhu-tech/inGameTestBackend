import { Controller, Get } from '@nestjs/common';
import { Book } from './book';

@Controller('book')
export class BookController {
  constructor(private book: Book) {}

  @Get()
  async getAllBook() {
    return this.book.getAllBook();
  }
}
