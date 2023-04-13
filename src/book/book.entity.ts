import { Author } from 'src/author/author.entity';
import { Genre } from 'src/genre/genre.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year_of_issue: string;

  @Column()
  edition: string;

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];

  @ManyToMany(() => Genre)
  @JoinTable()
  genre: Genre[];
}
