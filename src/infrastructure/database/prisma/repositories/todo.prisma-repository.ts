import { Injectable } from '@nestjs/common';
import { Todo } from 'src/core/domain/entities/todo.entity';
import { PrismaService } from '../prisma.service';
import { ITodoRepository } from 'src/core/domain/repositories/todo.repository.interface';

@Injectable()
export class TodoPrismaRepository implements ITodoRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Todo> {
    return this.prisma.todo.create({
      data: todo,
    });
  }

  async findById(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: todo,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.todo.delete({
      where: { id },
    });
  }
}
