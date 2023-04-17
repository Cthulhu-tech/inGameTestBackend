import { AuthorEntity } from 'src/author/author.entity';
import { GenreEntity } from 'src/genre/genre.entity';
import { TextController } from './text.controller';
import { BookEntity } from 'src/book/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextEntity } from './text.entity';
import { Module } from '@nestjs/common';
import { Text } from './text';

@Module({
  imports: [
    TypeOrmModule.forFeature([TextEntity]),
    TypeOrmModule.forFeature([BookEntity]),
    TypeOrmModule.forFeature([AuthorEntity]),
    TypeOrmModule.forFeature([GenreEntity]),
  ],
  controllers: [TextController],
  providers: [Text],
})
export class TextModule {}
