import { Controller, Get } from '@nestjs/common';
import { Genre } from './genre';

@Controller('genre')
export class GenreController {
  constructor(private genre: Genre) {}

  @Get()
  async getAllGanre() {
    return this.genre.getAllGenre();
  }
}
