import { Todo } from '../entities/todo.entity';

export interface ITodoRepository {
  create(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo>;
  findById(id: number): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  update(id: number, todo: Partial<Todo>): Promise<Todo>;
  delete(id: number): Promise<void>;
}
