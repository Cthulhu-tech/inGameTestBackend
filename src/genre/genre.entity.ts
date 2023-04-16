import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BookEntity } from 'src/book/book.entity';

@Entity()
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToMany(() => BookEntity, { cascade: true })
  book: BookEntity[];
}
