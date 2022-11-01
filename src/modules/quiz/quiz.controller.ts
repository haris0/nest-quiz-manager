import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('')
  getAllQuiz(@Query() paginationQuery: PaginationDto) {
    return this.quizService.findAll(paginationQuery);
  }

  @Get(':id')
  getQuiz(@Param('id') id: number) {
    return this.quizService.findOne(id);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createQuiz(@Body() quizData: CreateQuizDto) {
    return this.quizService.create(quizData);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateQuiz(@Param('id') id: number, @Body() quizData: UpdateQuizDto) {
    return this.quizService.update(+id, quizData);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: number) {
    return this.quizService.remove(id);
  }
}
