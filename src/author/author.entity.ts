import { BookEntity } from 'src/book/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['firstName', 'lastName'])
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({
    nullable: true,
    name: 'dob',
  })
  dob: string;

  @ManyToMany(() => BookEntity, (books) => books.authors, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'book_and_author',
  })
  books: BookEntity[];
}
