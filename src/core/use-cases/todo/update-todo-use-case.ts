import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}
  async execute(id: number, todoData: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.update(id, todoData);
  }
}
