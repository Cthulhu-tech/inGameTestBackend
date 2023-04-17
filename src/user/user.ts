import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserArray } from 'src/utils/mysql/seed/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { IUser } from './userType';

@Injectable()
export class User {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {}
  private async findUser(bodyUser: IUser) {
    const _user = { ...bodyUser };
    delete _user.password;
    return await this.user.findOne({
      where: _user,
    });
  }
  private async createAccessToken(bodyUser: IUser) {
    return sign({ userId: bodyUser.id, role: bodyUser.role }, 'access', {
      expiresIn: '15m',
    });
  }
  private async createRefreshToken(bodyUser: IUser) {
    return sign({ userId: bodyUser.id, role: bodyUser.role }, 'refresh', {
      expiresIn: '7d',
    });
  }
  private async setRefreshToken(res: Response, token) {
    res.cookie('refreshtoken', token, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + 432000000),
    });
  }
  async refresh(req: Request, res: Response) {
    try {
      const _refreshToken = req?.cookies['refreshtoken'];

      const payload = verify(_refreshToken, 'refresh');

      const findUser = await this.findUser({
        id: payload.userId,
        role: payload.role,
      });

      if (findUser.refresh !== _refreshToken)
        throw new HttpException('Token not Valid', HttpStatus.UNAUTHORIZED);

      const access = await this.createAccessToken(findUser);
      const refresh = await this.createRefreshToken(findUser);

      await this.setRefreshToken(res, refresh);

      findUser.refresh = refresh;

      await this.user.save(findUser);

      return {
        access,
      };
    } catch (err) {
      throw new HttpException('Token not Valid', HttpStatus.UNAUTHORIZED);
    }
  }
  async login(bodyUser: IUser, req: Request, res: Response) {
    if (!bodyUser.email || !bodyUser.password)
      throw new HttpException('Fill in all the fields', HttpStatus.BAD_REQUEST);

    const findUser = await this.findUser(bodyUser);
    if (!findUser)
      throw new HttpException(
        'User not found or Password not correct',
        HttpStatus.BAD_REQUEST,
      );

    const valid = await compare(bodyUser.password, findUser.password);
    if (!valid)
      throw new HttpException(
        'User not found or Password not correct',
        HttpStatus.BAD_REQUEST,
      );

    bodyUser.id = findUser.id;
    bodyUser.role = findUser.role;

    const access = await this.createAccessToken(bodyUser);
    const refresh = await this.createRefreshToken(bodyUser);

    await this.setRefreshToken(res, refresh);

    findUser.refresh = refresh;

    await this.user.save(findUser);

    return {
      access,
    };
  }
  // only start
  create(): Array<Promise<IUser>> {
    return UserArray.map(async (user: IUser) => {
      return await this.user
        .findOneBy({
          email: user.email,
        })
        .then(async (dbUser) => {
          if (dbUser) {
            return Promise.resolve(null);
          }
          const hashedPassword = await hash(user.password, 10);
          user.password = hashedPassword;
          return Promise.resolve(await this.user.save(user));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
