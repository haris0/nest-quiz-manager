import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('quizes')
export class Quiz {
  @PrimaryGeneratedColumn({
    comment: 'The Quiz unique identifire',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @JoinTable()
  @ManyToMany(() => Question, { cascade: true })
  questions: Question[];
}
