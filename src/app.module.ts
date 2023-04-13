import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';

import { Module } from '@nestjs/common';
import { EnvConfig } from './utils/env/envConfig';
import { OrmConnection } from './utils/mysql/connect';

@Module({
  imports: [EnvConfig, OrmConnection, BookModule, AuthorModule, GenreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
