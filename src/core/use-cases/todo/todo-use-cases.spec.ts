import { TodoController } from '../../../presentation/controllers/todo.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoViewModel } from '../../../presentation/view-models/todo.view-model';
import { CreateTodoUseCase } from './create-todo-use-case';
import { FindOneTodoUseCase } from './find-one-todo-use-case';

describe('TodoController', () => {
  let controller: TodoController;
  let createTodoUseCase: CreateTodoUseCase;
  let findOneTodoUseCase: FindOneTodoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: CreateTodoUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindOneTodoUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get<TodoController>(TodoController);
    createTodoUseCase: module.get<CreateTodoUseCase>(CreateTodoUseCase);
    findOneTodoUseCase: module.get<FindOneTodoUseCase>(FindOneTodoUseCase);
  });
  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const createTodoDto = {
        title: 'New Todo',
        description: 'Description',
        completed: false,
      };
      const createdTodo = {
        id: 1,
        ...createTodoDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (createTodoUseCase.execute as jest.Mock).mockResolvedValue(createdTodo);
      const result = await controller.createTodo(createTodoDto);
      expect(createTodoUseCase.execute).toHaveBeenCalledWith(createTodoDto);
      expect(result).toBeInstanceOf(TodoViewModel);
      expect(result.title).toBe(createTodoDto.title);
    });
  });
  describe('findTodoById', () => {
    it('should find a todo by id', async () => {
      const todoId = '1';
      const todo = {
        id: todoId,
        title: 'Todo 1',
        description: 'Description 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (findOneTodoUseCase.execute as jest.Mock).mockResolvedValue(todo);
      const result = await controller.findTodoById(todoId);
      expect(findOneTodoUseCase.execute).toHaveBeenCalledWith(todoId);
      expect(result).toBeInstanceOf(TodoViewModel);
      expect(result.title).toBe(todo.title);
    });
  });
});
