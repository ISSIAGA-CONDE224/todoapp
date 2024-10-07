import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from '../../domain/repositories/todo.repository.interface';

@Injectable()
export class FindOneTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}
  async execute(id: number) {
    return this.todoRepository.findById(id);
  }
}
