import { Injectable } from '@nestjs/common';

@Injectable()
export class Genre {
  private readonly Genre = [];

  getAllGenre() {
    return this.Genre;
  }
}
