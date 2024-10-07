import { Module } from '@nestjs/common';
import { TodoController } from './presentation/controllers/todo.controller';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { TodoPrismaRepository } from './infrastructure/database/prisma/repositories/todo.prisma-repository';
import { CreateTodoUseCase } from './core/use-cases/todo/create-todo.use-case';
import { UpdateTodoUseCase } from './core/use-cases/todo/update-todo-use-case';
import { GetAllTodoUseCase } from './core/use-cases/todo/find-all-todo-use-case';
import { FindOneTodoUseCase } from './core/use-cases/todo/find-one-todo-use-case';
import { DeleteTodoUseCase } from './core/use-cases/todo/delete-todo-use-case';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    PrismaService,
    TodoPrismaRepository,
    {
      provide: 'ITodoRepository',
      useClass: TodoPrismaRepository,
    },
    CreateTodoUseCase,
    UpdateTodoUseCase,
    GetAllTodoUseCase,
    FindOneTodoUseCase,
    DeleteTodoUseCase,
  ],
})
export class AppModule {}
