import { AuthorEntity } from 'src/author/author.entity';
import { GenreEntity } from 'src/genre/genre.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year_of_issue: string;

  @Column()
  edition: string;

  @ManyToMany(() => AuthorEntity)
  @JoinTable()
  authors: AuthorEntity[];

  @ManyToMany(() => GenreEntity)
  @JoinTable()
  genre: GenreEntity[];
}
