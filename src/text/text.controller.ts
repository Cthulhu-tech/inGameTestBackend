import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { Text } from './text';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Body,
  Res,
} from '@nestjs/common';

@Controller('text')
export class TextController {
  constructor(private text: Text) {}
  @Get(':id')
  @HttpCode(200)
  async getListTextByIdBook(@Param('id') bookId: string) {
    return this.text.getListTextByIdBook(Number(bookId));
  }
  @Get('download/:id')
  @HttpCode(200)
  async getTextById(
    @Param('id') textId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.text.getTextById(Number(textId), res);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
          new FileTypeValidator({ fileType: 'text/plain' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('id') bookId: string,
  ) {
    return await this.text.uploadFile(file, Number(bookId));
  }
}
