import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.payload.role === 'admin') {
      return next();
    }
    if (
      (req.body.payload.role === 'user' || !req.body.payload.role) &&
      req.method === 'GET'
    ) {
      return next();
    }
    throw new HttpException(
      'You do not have rights to change',
      HttpStatus.FORBIDDEN,
    );
  }
}
