import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../../domain/repositories/todo.repository.interface';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable()
export class GetAllTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}
  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}
