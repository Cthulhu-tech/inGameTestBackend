import { AuthorEntity } from 'src/author/author.entity';
import { GenreEntity } from 'src/genre/genre.entity';
import { BookController } from './book.controller';
import { BookEntity } from 'src/book/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Book } from './book';
@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    TypeOrmModule.forFeature([AuthorEntity]),
    TypeOrmModule.forFeature([GenreEntity]),
  ],
  controllers: [BookController],
  providers: [Book],
})
export class BookModule {}
