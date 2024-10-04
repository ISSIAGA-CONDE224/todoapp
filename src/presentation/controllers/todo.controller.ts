import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { CreateTodoUseCase } from 'src/core/use-cases/create-todo.use-case';

@Controller('todos')
export class TodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.createTodoUseCase.execute({
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: createTodoDto.completed,
    });
  }
}
