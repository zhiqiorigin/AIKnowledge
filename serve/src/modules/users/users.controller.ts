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
  UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserProfileDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; // 假设有一个User实体类
import { AdminGuard } from '../auth/guard/admin.guard'; // 假设有AuthGuard和AdminGuard守卫
import { AuthGuard } from './../auth/guard/auth.guard';
import { Logger } from '@nestjs/common';
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersService.name);

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
  ): Promise<any> {
    const userId = parseInt(req.user.id, 10);
    // 假设有验证旧密码的机制
    return this.usersService.updatePassword(userId, changePasswordDto);
  }

  @UseGuards(AdminGuard)
  @Get('/list')
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
  @Patch('/profile/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const userId = parseInt(id, 10);
    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    this.logger.debug(`id:${id}`)
    const userId = parseInt(id, 10);
    // 这里可以根据需要进一步处理用户信息
    return await this.usersService.remove(userId);
  }
}
