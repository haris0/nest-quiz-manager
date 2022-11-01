import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Question } from './entity/question.entity';
import { Quiz } from './entity/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  findAll = async (pagination: PaginationDto) => {
    const { limit, offset } = pagination;
    return this.quizRepository.find({
      relations: ['questions'],
      skip: offset,
      take: limit,
    });
  };

  findOne = async (id: number) => {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return quiz;
  };

  create = async (payload: CreateQuizDto) => {
    const questions = await Promise.all(
      payload.questions.map((question) => this.preloadQuestion(question)),
    );

    const quiz = this.quizRepository.create({
      ...payload,
      questions,
    });
    try {
      return this.quizRepository.save(quiz);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  update = async (id: number, payload: UpdateQuizDto) => {
    const questions =
      payload.questions &&
      (await Promise.all(
        payload.questions.map((question) => this.preloadQuestion(question)),
      ));

    const quiz = await this.quizRepository.preload({
      id: id,
      ...payload,
      questions,
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return this.quizRepository.save(quiz);
  };

  remove = async (id: number) => {
    const quiz = await this.findOne(id);
    return this.quizRepository.remove(quiz);
  };

  preloadQuestion = async (question: string) => {
    const questionExsist = await this.questionRepository.findOne({
      where: { question },
    });

    if (questionExsist) {
      return questionExsist;
    }

    return this.questionRepository.create({ question });
  };
}
