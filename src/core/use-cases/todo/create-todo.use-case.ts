import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo.entity';
@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}

  async execute(
    todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Todo> {
    return this.todoRepository.create(todoData);
  }
}
