import { Injectable } from '@nestjs/common';

@Injectable()
export class Author {
  private readonly Author = [];

  getAllAuthor() {
    return this.Author;
  }
}
