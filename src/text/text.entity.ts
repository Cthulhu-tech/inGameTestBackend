import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TextEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  path: string;

  @Column()
  bookId: string;
}
