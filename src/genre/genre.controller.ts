import { Controller, Get, HttpCode } from '@nestjs/common';
import { Genre } from './genre';

@Controller('genre')
export class GenreController {
  constructor(private genre: Genre) {}

  @Get()
  @HttpCode(200)
  async getAllGanre() {
    return this.genre.getAllGenre();
  }
}
