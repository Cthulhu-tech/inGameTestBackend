import { Controller, Get, HttpCode } from '@nestjs/common';
import { Author } from './author';

@Controller('author')
export class AuthorController {
  constructor(private author: Author) {}

  @Get()
  @HttpCode(200)
  async getAllAuthor() {
    return this.author.getAllAuthor();
  }
}
