import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].split(' ')[1];

    try {
      req.body.payload = verify(token, 'access');
    } catch (err) {
      throw new HttpException('Token not Valid', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
