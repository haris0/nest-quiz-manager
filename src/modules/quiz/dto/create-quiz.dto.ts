import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty({ message: 'Title is mandatory' })
  @Length(3, 225)
  title: string;

  @IsNotEmpty()
  @Length(3)
  description: string;

  @IsNotEmpty()
  questions: string[];
}
