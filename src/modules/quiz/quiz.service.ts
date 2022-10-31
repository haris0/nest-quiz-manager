import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/CreateQuiz.dto';
import { UpdateQuizDto } from './dto/UpdateQuiz.dto';
import { Quiz } from './entity/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  findAll = async () => {
    return this.quizRepository.find();
  };

  findOne = async (id: number) => {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return quiz;
  };

  create = (payload: CreateQuizDto) => {
    const quiz = this.quizRepository.create(payload);
    try {
      return this.quizRepository.save(quiz);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  update = async (id: number, payload: UpdateQuizDto) => {
    console.log(typeof id);
    const quiz = await this.quizRepository.preload({
      id: id,
      ...payload,
    });
    console.log(quiz);

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return this.quizRepository.save(quiz);
  };

  remove = async (id: number) => {
    const quiz = await this.findOne(id);
    return this.quizRepository.remove(quiz);
  };
}
