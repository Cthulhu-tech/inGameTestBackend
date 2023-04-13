import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class Author {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly author: Repository<AuthorEntity>,
  ) {}

  async getAllAuthor() {
    const data = await this.author.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }
}
