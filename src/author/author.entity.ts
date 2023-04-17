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
@Unique(['firstName', 'lastName', 'dob'])
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({
    type: 'date',
    nullable: true,
    name: 'dob',
  })
  dob: Date | string;

  @ManyToMany(() => BookEntity, (books) => books.authors, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'book_and_author',
  })
  books: BookEntity[];
}
