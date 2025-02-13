import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TODO_REPOSITORY } from '../../constants/common.constants';
import { Todo } from './entities/todo.entity';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private todoRepository: Repository<Todo>,
  ) {}

  private readonly logger = new Logger(TodosService.name);

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    try {
      this.logger.log(`Creating a new todo with data: ${JSON.stringify(createTodoDto)} and user ID: ${userId}`);

      // 创建新的TODO实体
      const todo = this.todoRepository.create({
        ...createTodoDto,
        assigned_to: createTodoDto.assigned_to,
        created_by: userId,
      });

      // 保存TODO实体
      const savedTodo = await this.todoRepository.save(todo);
      this.logger.log(`Created todo entity: ${JSON.stringify(savedTodo)}`);

      return savedTodo;
    } catch (error) {
      this.logger.error(`Error creating todo: ${error.message}`, error.stack);
      throw new InternalServerErrorException('An error occurred while creating the todo');
    }
  }

  async findAll(userId: number): Promise<Todo[]> {
    this.logger.log(`Fetching todos for user with ID: ${userId}`);

    const todos = await this.todoRepository.find({
      where: [
        { assigned_to: userId },
      ],
    });
    this.logger.log(`Fetched ${todos.length} todos for user with ID: ${userId}`);
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    this.logger.log(`Finding todo with ID: ${id}`);

    const todo = await this.todoRepository.findOne({
      where: { todo_id: id },
    });
    if (!todo) {
      this.logger.error(`Todo with ID ${id} not found`);
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.logger.log(`Found todo: ${JSON.stringify(todo)}`);
    return todo;
  }

  async update(todo_id: number, updateTodoDto: UpdateTodoDto, userId: number): Promise<Todo> {
    this.logger.log(`Updating todo with ID: ${todo_id} using data: ${JSON.stringify(updateTodoDto)} and user ID: ${userId}`);

    const todo = await this.findOne(todo_id);

    Object.assign(todo, updateTodoDto);

    this.logger.log(`Updated todo entity: ${JSON.stringify(todo)}`);
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing todo with ID: ${id}`);

    const todo = await this.findOne(id);
    if (!todo) {
      this.logger.error(`Todo with ID ${id} not found`);
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    await this.todoRepository.remove(todo);
    this.logger.log(`Removed todo with ID: ${id}`);
  }
}