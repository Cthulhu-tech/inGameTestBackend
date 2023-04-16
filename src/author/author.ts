import { CheckType } from 'src/utils/check/checkType';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { Injectable } from '@nestjs/common';
import { IAuthor } from './authorType';
import { Repository } from 'typeorm';

@Injectable()
export class Author {
  private check: CheckType;
  constructor(
    @InjectRepository(AuthorEntity)
    public readonly author: Repository<AuthorEntity>,
  ) {
    this.check = new CheckType();
  }
  async createAuthor(authors: IAuthor[]) {
    return this.author.create(authors);
  }
  async saveAuthor(authors: AuthorEntity[]) {
    const save = await this.author
      .createQueryBuilder()
      .insert()
      .values(authors)
      .orUpdate(['firstName', 'lastName'], ['externalId'])
      .execute();
    return save.generatedMaps;
  }
  async getAuthorsById(authors: number[]) {
    this.check.checkType<number>(authors, 'number', 'Authors');

    return await this.author
      .createQueryBuilder()
      .where('id IN (:...id)', {
        id: authors,
      })
      .getMany();
  }
  async getAllAuthor() {
    const data = await this.author.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }
}
