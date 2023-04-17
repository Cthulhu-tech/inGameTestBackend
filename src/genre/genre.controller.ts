import { Genre } from './genre';
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
import { IGenre } from './genresType';
@Controller('genre')
export class GenreController {
  constructor(private genre: Genre) {}

  @Get()
  @HttpCode(200)
  async getAllGenre() {
    return this.genre.getAllGenre();
  }
  @Get(':id')
  @HttpCode(200)
  async getGenreById(@Param('id') genreId: string) {
    return this.genre.getGenreByIdGet(Number(genreId));
  }
  @Post()
  @HttpCode(201)
  async createGenre(@Body() bodyGenre: IGenre) {
    return this.genre.createGenre(bodyGenre);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteGenreById(@Param('id') genreId: string) {
    return this.genre.deleteGenreById(Number(genreId));
  }
  @Patch(':id')
  @HttpCode(201)
  async updateGenreByIdPatch(
    @Param('id') genreId: string,
    @Body() bodyGenre: IGenre,
  ) {
    bodyGenre.id = Number(genreId);
    return this.genre.updateGenreByIdPatch(bodyGenre);
  }
  @Put(':id')
  @HttpCode(201)
  async updateGenreByIdPut(
    @Param('id') genreId: string,
    @Body() bodyGenre: IGenre,
  ) {
    bodyGenre.id = Number(genreId);
    return this.genre.updateGenreByIdPut(bodyGenre);
  }
}
