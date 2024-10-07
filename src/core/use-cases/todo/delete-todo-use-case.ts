import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from 'src/core/domain/repositories/todo.repository.interface';

@Injectable()
export class DeleteTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}
  async execute(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
