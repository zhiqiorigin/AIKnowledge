import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity'; // 假设有一个Todo实体类
import { AdminGuard } from '../auth/guard/admin.guard'; // 假设有AuthGuard和AdminGuard守卫
import { AuthGuard } from './../auth/guard/auth.guard';
import { Logger } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  private readonly logger = new Logger(TodosController.name);


  // 创建todo
  @UseGuards(AuthGuard)
  @Post('')
  async createTodo(
    @Request() req,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo | undefined> {
    return this.todosService.create(createTodoDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/list')
  async getAllTodos(@Request() req,): Promise<Todo[]> {
    return this.todosService.findAll(req.user.id);
  }

  // @UseGuards(AdminGuard)
  // @Get('/:id')
  // async getTodoById(@Param('id') id: string): Promise<Todo | undefined> {
  //   const todoId = parseInt(id, 10);
  //   return this.todosService.findOne(todoId);
  // }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateTodo(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const todoId = parseInt(id, 10);
    return this.todosService.update(todoId, updateTodoDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    this.logger.debug(`Deleting todo with id: ${id}`);
    const todoId = parseInt(id, 10);
    await this.todosService.remove(todoId);
  }
}