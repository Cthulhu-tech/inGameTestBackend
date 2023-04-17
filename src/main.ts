import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Genre } from './genre/genre';
import { User } from './user/user';

async function bootstrap() {
  // create seed
  const seed = await NestFactory.createApplicationContext(AppModule);
  // get genres create method
  const genreServer = await seed.select(GenreModule).get(Genre);
  const userServer = await seed.select(UserModule).get(User);
  // init all genres in db
  await genreServer.create();
  await userServer.create();

  // create app
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // listen app in localhost:3000
  await app.listen(3000);
}
bootstrap();
