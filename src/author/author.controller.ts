import { Controller, Get } from '@nestjs/common';
import { Author } from './author';

@Controller('author')
export class AuthorController {
  constructor(private author: Author) {}

  @Get()
  async getAllAuthor() {
    return this.author.getAllAuthor();
  }
}
