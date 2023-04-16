import { CheckType } from 'src/utils/check/checkType';
import { GenreEntity } from 'src/genre/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenre } from 'src/utils/mysql/seed/type';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { GenreArray } from 'src/utils/mysql/seed/genre';

@Injectable()
export class Genre {
  private check: CheckType;
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genres: Repository<GenreEntity>,
  ) {
    this.check = new CheckType();
  }
  // return array genre
  async getGenreById(genres: number[]) {
    this.check.checkType<number>(genres, 'number', 'Genres');

    return this.genres
      .createQueryBuilder()
      .where('id IN (:...id)', {
        id: genres,
      })
      .getMany();
  }
  // retur all genre
  async getAllGenre() {
    const data = await this.genres.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }
  // only start
  create(): Array<Promise<IGenre>> {
    return GenreArray.map(async (genre: IGenre) => {
      return await this.genres
        .findOneBy({
          title: genre.title,
        })
        .then(async (dbGenre) => {
          if (dbGenre) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.genres.save(genre));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
