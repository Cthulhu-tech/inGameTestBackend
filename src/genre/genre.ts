import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenreArray } from 'src/utils/mysql/seed/genre';
import { CheckType } from 'src/utils/check/checkType';
import { GenreEntity } from 'src/genre/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenre } from 'src/genre/genresType';
import { Repository } from 'typeorm';

@Injectable()
export class Genre {
  private check: CheckType;
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genres: Repository<GenreEntity>,
  ) {
    this.check = new CheckType();
  }
  // find genre
  async findGenre(bodyGenre: IGenre) {
    const genres = { ...bodyGenre };
    delete genres.id;
    return await this.genres.find({
      where: genres,
    });
  }
  // create genre
  async _createGenre(bodyGenre: IGenre) {
    return this.genres.create(bodyGenre);
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
  // get method :id
  async getGenreByIdGet(genres: number) {
    const genre = await this.genres
      .createQueryBuilder()
      .where('id IN (:id)', {
        id: genres,
      })
      .getOne();
    if (!genre)
      throw new HttpException(
        'Genre not found. Genre id: ' + genres,
        HttpStatus.NOT_FOUND,
      );
    return genre;
  }
  // delete method
  async deleteGenreById(genres: number) {
    const idNumber = Number(genres);

    if (isNaN(idNumber))
      throw new HttpException('Need Genre id', HttpStatus.BAD_REQUEST);

    await this.getGenreByIdGet(idNumber);

    return this.genres
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: idNumber })
      .execute();
  }
  // patch method
  async updateGenreByIdPatch(bodyGenre: IGenre) {
    if (Object.keys(bodyGenre).length <= 1)
      throw new HttpException(
        'At least one value is required',
        HttpStatus.BAD_REQUEST,
      );
    return this.updateGenreByIdPut(bodyGenre);
  }
  // put method
  async updateGenreByIdPut(bodyGenre: IGenre) {
    if (isNaN(bodyGenre.id))
      throw new HttpException('Need Author id', HttpStatus.BAD_REQUEST);

    if (!bodyGenre.title)
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    const findGenre = await this.getGenreByIdGet(bodyGenre.id);

    findGenre.title = bodyGenre.title;
    const newGenre = await this._createGenre(findGenre);
    return await this.genres.save(newGenre);
  }
  // post method
  async createGenre(bodyGenre: IGenre) {
    if (!bodyGenre.title)
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    const findGenre = await this.findGenre(bodyGenre);
    if (findGenre[0])
      throw new HttpException(
        'This Genre already exists. Genre Id: ' + findGenre[0].id,
        HttpStatus.BAD_REQUEST,
      );

    const newGenre = await this._createGenre(bodyGenre);
    return await this.genres.save(newGenre);
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
