// test/infrastructure/database/prisma/repositories/todo.prisma-repository.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { TodoPrismaRepository } from './todo.prisma-repository';
import { Todo } from '../../../../core/domain/entities/todo.entity';

describe('TodoPrismaRepository', () => {
  let repository: TodoPrismaRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoPrismaRepository,
        {
          provide: PrismaService,
          useValue: {
            todo: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<TodoPrismaRepository>(TodoPrismaRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> = {
        title: 'Test Todo',
        description: 'This is a test',
        completed: false,
      };

      const expectedTodo: Todo = {
        id: 1,
        ...todoData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prismaService.todo.create as jest.Mock).mockResolvedValue(expectedTodo);

      const result = await repository.create(todoData);

      expect(prismaService.todo.create).toHaveBeenCalledWith({
        data: todoData,
      });
      expect(result).toEqual(expectedTodo);
    });
  });
});
