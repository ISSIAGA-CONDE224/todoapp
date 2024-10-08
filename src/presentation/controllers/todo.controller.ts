import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoUseCase } from '../../core/use-cases/todo/update-todo-use-case';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { GetAllTodoUseCase } from '../../core/use-cases/todo/find-all-todo-use-case';
import { TodoViewModel } from '../view-models/todo.view-model';
import { FindOneTodoUseCase } from '../../core/use-cases/todo/find-one-todo-use-case';
import { DeleteTodoUseCase } from '../../core/use-cases/todo/delete-todo-use-case';
import { CreateTodoUseCase } from '../../core/use-cases/todo/create-todo-use-case';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly getAllTodoUseCase: GetAllTodoUseCase,
    private readonly findOneTodoUseCase: FindOneTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {}
  @Get()
  async getAllTodos() {
    const todos = await this.getAllTodoUseCase.execute();
    return TodoViewModel.toViewModels(todos);
  }
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.createTodoUseCase.execute(createTodoDto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.updateTodoUseCase.execute(Number(id), updateTodoDto);
  }

  @Get(':id')
  async findTodoById(@Param('id') id: string) {
    const todo = await this.findOneTodoUseCase.execute(Number(id));
    return TodoViewModel.toViewModel(todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.deleteTodoUseCase.execute(Number(id));
  }
}
