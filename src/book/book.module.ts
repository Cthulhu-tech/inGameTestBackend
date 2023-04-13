import { BookController } from './book.controller';
import { Module } from '@nestjs/common';
import { Book } from './book';

@Module({
  controllers: [BookController],
  providers: [Book],
})
export class BookModule {}
