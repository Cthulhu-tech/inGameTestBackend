import { AuthorController } from './author.controller';
import { Module } from '@nestjs/common';
import { Author } from './author';

@Module({
  controllers: [AuthorController],
  providers: [Author],
})
export class AuthorModule {}
