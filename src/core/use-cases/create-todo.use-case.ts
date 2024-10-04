import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../domain/repositories/todo.repository.interface';
@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(todoData: {
    title: string;
    description?: string;
    completed?: boolean;
  }) {
    return this.todoRepository.create({
      title: todoData.title,
      description: todoData.description,
      completed: todoData.completed,
    });
  }
}
