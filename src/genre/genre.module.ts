import { GenreController } from './genre.controller';
import { Module } from '@nestjs/common';
import { Genre } from './genre';

@Module({
  controllers: [GenreController],
  providers: [Genre],
})
export class GenreModule {}
