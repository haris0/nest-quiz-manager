import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/CreateQuiz.dto';

@Injectable()
export class QuizService {
  getAllQuiz = () => {
    console.log(process.env.DATABASE_PASSWORD);
    return [1, 2, 3];
  };

  createQuiz = (payload: CreateQuizDto) => {
    return payload;
  };
}
