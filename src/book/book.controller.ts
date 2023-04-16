import { IBook } from './bookType';
import { Book } from './book';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
@Controller('book')
export class BookController {
  constructor(private book: Book) {}

  @Get()
  @HttpCode(200)
  async getAllBook() {
    return await this.book.getAllBook();
  }
  @Post()
  @HttpCode(201)
  async createBook(@Body() bodyBook: IBook) {
    return await this.book.saveBook(bodyBook);
  }
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id) {
    return await this.book.deleteBook(id);
  }
  @Patch()
  @HttpCode(201)
  async updateBook(@Body() bodyBook: IBook) {
    return await this.book.updateBook(bodyBook);
  }
}
