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
import { UsersService } from './users.service';
import { CreateUserDto, UserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; // 假设有一个User实体类
import { AdminGuard } from '../auth/guard/admin.guard'; // 假设有AuthGuard和AdminGuard守卫
import { AuthGuard } from './../auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | undefined> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getCurrentUser(@Request() req): Promise<User | undefined> {
    const userId = parseInt(req.user.id, 10);
    return this.usersService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/profile')
  async updateCurrentUser(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User | undefined> {
    const userId = parseInt(req.user.id, 10);
    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/password')
  async changePassword(
    @Body() changePasswordDto: UpdatePasswordDto,
    @Request() req,
  ): Promise<void> {
    const userId = parseInt(req.user.id, 10);
    // 假设有验证旧密码的机制
    await this.usersService.updatePassword(userId, changePasswordDto);
  }

  @UseGuards(AdminGuard)
  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    const userId = parseInt(id, 10);
    return this.usersService.findOne(userId);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const userId = parseInt(id, 10);
    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    await this.usersService.remove(userId);
  }
}
