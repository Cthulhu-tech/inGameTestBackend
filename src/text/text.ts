import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorEntity } from 'src/author/author.entity';
import { GenreEntity } from 'src/genre/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/book/book.entity';
import { TextEntity } from './text.entity';
import { Book } from 'src/book/book';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';

import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class Text {
  private _book: Book;
  constructor(
    @InjectRepository(TextEntity)
    private readonly text: Repository<TextEntity>,
    @InjectRepository(BookEntity)
    private readonly book: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly author: Repository<AuthorEntity>,
    @InjectRepository(GenreEntity)
    private readonly genre: Repository<GenreEntity>,
  ) {
    this._book = new Book(this.book, this.author, this.genre);
  }
  private getFile(path: string, res: Response): StreamableFile {
    try {
      const file = createReadStream(join(process.cwd(), path));
      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename=${path}`,
      });
      const fileStream = new StreamableFile(file);
      return fileStream;
    } catch {
      throw new HttpException('Sorry, book not found', HttpStatus.BAD_REQUEST);
    }
  }
  async getTextById(textId: number, res: Response) {
    if (!textId)
      throw new HttpException('Need book id', HttpStatus.BAD_REQUEST);

    const find = await this.text
      .createQueryBuilder()
      .where('id IN (:id)', {
        id: textId,
      })
      .getOne();
    if (!find)
      throw new HttpException('Sorry, book not found', HttpStatus.BAD_REQUEST);

    return this.getFile(find.path, res);
  }
  async getListTextByIdBook(bookId: number) {
    return await this.text
      .createQueryBuilder()
      .where('bookId IN (:id)', {
        id: bookId,
      })
      .getMany();
  }
  async uploadFile(file: Express.Multer.File, bookId: number) {
    if (!bookId)
      throw new HttpException('Need book id', HttpStatus.BAD_REQUEST);
    const findBook = await this._book.getBookById(bookId);
    if (findBook.count <= 0)
      throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);

    const _hash = sign(
      {
        fileName: file.originalname,
        type: file.mimetype,
      },
      'file',
    );

    const _path = path.join('./file/' + _hash + '_' + file.originalname);
    if (!fs.existsSync('./file')) {
      fs.mkdirSync('./file');
    }

    fs.writeFile(_path, file.buffer, (err) => {
      if (err)
        throw new HttpException('file save error', HttpStatus.BAD_REQUEST);
    });

    const createFile = await this.text.create({
      bookId: findBook.data[0].id.toString(),
      path: _path,
    });

    return await this.text.save(createFile);
  }
}
