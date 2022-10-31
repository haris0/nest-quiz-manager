import { IsOptional, Length } from 'class-validator';

export class UpdateQuizDto {
  @IsOptional()
  @Length(3, 225)
  title: string;

  @IsOptional()
  @Length(3)
  description: string;

  @IsOptional()
  choices: string[];
}
