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
  Put,
} from '@nestjs/common';
@Controller('book')
export class BookController {
  constructor(private book: Book) {}

  @Get()
  @HttpCode(200)
  async getAllBook() {
    return await this.book.getAllBook();
  }
  @Get(':id')
  @HttpCode(200)
  async getBookById(@Param('id') id) {
    return this.book.getBookById(id);
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
  @Patch(':id')
  @HttpCode(201)
  async updateBookPatch(@Param('id') id, @Body() bodyBook: IBook) {
    bodyBook.id = id;
    return await this.book.updateBookPatch(bodyBook);
  }
  @Put(':id')
  @HttpCode(201)
  async updateBookPut(@Param('id') id, @Body() bodyBook: IBook) {
    bodyBook.id = id;
    return await this.book.updateBookPut(bodyBook);
  }
}
