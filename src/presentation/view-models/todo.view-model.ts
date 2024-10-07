import { Todo } from 'src/core/domain/entities/todo.entity';

export class TodoViewModel {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.completed = todo.completed;
    this.createdAt = TodoViewModel.formatDate(todo.createdAt);
  }
  static toViewModel(todo: any): TodoViewModel {
    return new TodoViewModel(todo);
  }

  static toViewModels(todos: any[]): TodoViewModel[] {
    return todos.map((todo) => TodoViewModel.toViewModel(todo));
  }

  private static formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }
}
