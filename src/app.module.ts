import { OrmConnection } from './utils/mysql/connect';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { TextModule } from './text/text.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';

import { EnvConfig } from './utils/env/envConfig';

import { TokenMiddleware } from './middleware/token';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { RoleMiddleware } from './middleware/role';

@Module({
  imports: [
    EnvConfig,
    OrmConnection,
    BookModule,
    AuthorModule,
    GenreModule,
    UserModule,
    TextModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'file'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware, RoleMiddleware)
      .exclude(
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/refresh', method: RequestMethod.POST },
        { path: '/genre', method: RequestMethod.GET },
        { path: '/author', method: RequestMethod.GET },
        { path: '/book', method: RequestMethod.GET },
        { path: '/genre/:id', method: RequestMethod.GET },
        { path: '/author/:id', method: RequestMethod.GET },
        { path: '/book/:id', method: RequestMethod.GET },
        { path: '/text/:id', method: RequestMethod.GET },
        { path: '/text', method: RequestMethod.GET },
        { path: '/text/download/:id', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
