import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { Quiz } from './entity/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
