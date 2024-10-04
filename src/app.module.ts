import { Module } from '@nestjs/common';
import { TodoController } from './presentation/controllers/todo.controller';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { TodoPrismaRepository } from './infrastructure/database/prisma/repositories/todo.prisma-repository';
import { CreateTodoUseCase } from './core/use-cases/create-todo.use-case';

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
  ],
})
export class AppModule {}
