import { Todo } from 'src/core/domain/entities/todo.entity';

export class TodoViewModel {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.completed = todo.completed;
    this.createdAt = todo.createdAt;
  }
}
