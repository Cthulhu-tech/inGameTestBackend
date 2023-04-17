import { Author } from './author';
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
import { IAuthor } from './authorType';
@Controller('author')
export class AuthorController {
  constructor(private author: Author) {}

  @Get()
  @HttpCode(200)
  async getAllAuthor() {
    return this.author.getAllAuthor();
  }
  @Get(':id')
  @HttpCode(200)
  async getAllAuthorById(@Param('id') authorId: string) {
    return this.author.getAuthorsById([Number(authorId)]);
  }
  @Post()
  @HttpCode(201)
  async createAuthor(@Body() bodyAuthor: IAuthor) {
    return this.author.saveAuthorPost(bodyAuthor);
  }
  @Put(':id')
  @HttpCode(201)
  async updateAuthorPut(@Param('id') id: string, @Body() bodyAuthor: IAuthor) {
    bodyAuthor.id = Number(id);
    return this.author.updateAuthorPut(bodyAuthor);
  }
  @Patch(':id')
  @HttpCode(201)
  async updateAuthorPatch(
    @Param('id') id: string,
    @Body() bodyAuthor: IAuthor,
  ) {
    bodyAuthor.id = Number(id);
    return this.author.updateAuthorPatch(bodyAuthor);
  }
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.author.deleteAuthor(Number(id));
  }
}
