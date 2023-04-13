import { GenreModule } from './genre/genre.module';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Genre } from './genre/genre';

async function bootstrap() {
  // create seed
  const seed = await NestFactory.createApplicationContext(AppModule);
  // get genres create method
  const genreServer = await seed.select(GenreModule).get(Genre);
  // init all genres in db
  await genreServer.create();

  // create app
  const app = await NestFactory.create(AppModule);
  // listen app in localhost:3000
  await app.listen(3000);
}
bootstrap();
