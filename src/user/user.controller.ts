import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IUser } from './userType';
import { User } from './user';

@Controller('user')
export class UserController {
  constructor(private user: User) {}

  @Post('/refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.user.refresh(req, res);
  }
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() bodyUser: IUser,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.user.login(bodyUser, req, res);
  }
}
