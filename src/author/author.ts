import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CheckType } from 'src/utils/check/checkType';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
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
  private checkDate(_date: string | Date) {
    const date = new Date(_date);
    if (date.toString() === 'Invalid Date')
      throw new HttpException(
        'Need Valid date format: YYYY.MM.DD',
        HttpStatus.BAD_REQUEST,
      );
    if (date.toString().includes('Incorrect DATE value'))
      throw new HttpException(
        'Need correct DATE formate',
        HttpStatus.BAD_REQUEST,
      );
  }
  private async checkAuthorIsCreate(bodyAuthor: IAuthor, idNumber?: number) {
    const _findAuthor = await this.getAuthorByAllProperties(bodyAuthor);

    if (Number(_findAuthor[0]?.id) === Number(idNumber)) return _findAuthor[0];
    if (_findAuthor[0])
      throw new HttpException(
        'This author already exists. Author Id: ' + _findAuthor[0].id,
        HttpStatus.BAD_REQUEST,
      );
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
  async getAuthorByAllProperties(bodyAuthor: IAuthor) {
    const _author = { ...bodyAuthor };
    delete _author.id;
    return await this.author.find({
      where: _author,
    });
  }
  async saveAuthorPost(bodyAuthor: IAuthor) {
    if (!bodyAuthor?.firstName || !bodyAuthor?.lastName || !bodyAuthor?.dob)
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    this.checkDate(new Date(bodyAuthor?.dob));

    const createAuthor = await this.createAuthor([bodyAuthor]);
    const saveAuthor = await this.saveAuthor(createAuthor);

    await this.checkAuthorIsCreate(bodyAuthor, saveAuthor[0].id);

    const findAuthor = await this.getAuthorsById([Number(saveAuthor[0].id)]);
    return {
      data: findAuthor[0],
    };
  }
  async updateAuthorPut(bodyAuthor: IAuthor) {
    if (!bodyAuthor?.firstName || !bodyAuthor?.lastName || !bodyAuthor?.dob)
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    return this.updateAuthorPatch(bodyAuthor);
  }
  async updateAuthorPatch(bodyAuthor: IAuthor) {
    const idNumber = Number(bodyAuthor.id);

    if (Object.keys(bodyAuthor).length <= 1)
      throw new HttpException(
        'At least one value is required',
        HttpStatus.BAD_REQUEST,
      );

    if (isNaN(idNumber))
      throw new HttpException('Need Author id', HttpStatus.BAD_REQUEST);

    if (bodyAuthor.dob) this.checkDate(new Date(bodyAuthor?.dob));

    const findAuthor = await this.getAuthorsById([idNumber]);
    if (findAuthor.length <= 0)
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);

    if (bodyAuthor.firstName) findAuthor[0].firstName = bodyAuthor.firstName;
    else bodyAuthor.firstName = findAuthor[0].firstName;
    if (bodyAuthor.lastName) findAuthor[0].lastName = bodyAuthor.lastName;
    else bodyAuthor.lastName = findAuthor[0].lastName;
    if (bodyAuthor.dob) findAuthor[0].dob = bodyAuthor.dob;
    else bodyAuthor.dob = findAuthor[0].dob;

    await this.checkAuthorIsCreate(bodyAuthor, idNumber);

    findAuthor[0].id = idNumber;

    const saveAuthor = await this.author.save({
      ...findAuthor[0],
      id: findAuthor[0].id,
    });
    return saveAuthor;
  }
  async deleteAuthor(id: number) {
    const idNumber = Number(id);

    if (isNaN(idNumber))
      throw new HttpException('Need Author id', HttpStatus.BAD_REQUEST);

    const findAuthor = await this.getAuthorsById([idNumber]);
    if (findAuthor.length <= 0)
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);

    return this.author
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: idNumber })
      .execute();
  }
  async getAllAuthor() {
    const data = await this.author.findAndCount();
    return {
      count: data[1],
      data: data[0],
    };
  }
}
