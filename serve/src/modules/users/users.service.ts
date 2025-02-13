
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { USER_REPOSITORY, USER_PROFILE_REPOSITORY } from '../../constants/common.constants';
import * as bcrypt from 'bcrypt'; // 确保正确导入 bcrypt
import { Logger } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(USER_PROFILE_REPOSITORY)
    private userProfileRepository: Repository<UserProfile>, // 注入 UserProfile 的 Repository
  ) { }
  private readonly logger = new Logger(UsersService.name);
  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    console.log(hashedPassword); // 调试输出哈希后的密码
    const newUserHash = {
      ...createUserDto,
      password: hashedPassword,
    };
    const newUser = this.userRepository.create(newUserHash);
    const savedUser = await this.userRepository.save(newUser);

    // 如果有 UserProfile 数据，也需要保存
    if (createUserDto.profile) {
      const userProfile = this.userProfileRepository.create({
        ...createUserDto.profile,
        user: savedUser,
      });
      await this.userProfileRepository.save(userProfile);
    }

    return savedUser;
  }
  // 查询所有用户
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profile'], // 加载关联的 UserProfile
    });
  }
  // 查询用户
  async findOne(id: number): Promise<User | undefined> {
    this.logger.debug(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'], // 加载关联的 UserProfile
    });
    return user ? user : undefined;
  }
  // 查询用户 通过username
  async findByName(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['profile'], // 加载关联的 UserProfile
    });
    return user ? user : undefined;
  }
  // 更新用户
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // 更新用户信息
    await this.userRepository.update(id, updateUserDto);

    // 如果有 UserProfile 数据，也需要更新
    if (updateUserDto.profile) {
      let userProfile = await this.userProfileRepository.findOne({
        where: { user: { id } },
      });

      if (userProfile) {
        userProfile = { ...userProfile, ...updateUserDto.profile };
        await this.userProfileRepository.save(userProfile);
      } else {
        userProfile = this.userProfileRepository.create({
          ...updateUserDto.profile,
          user,
        });
        await this.userProfileRepository.save(userProfile);
      }
    }
    return await this.findOne(id); // 返回更新后的用户数据
  }
  // 删除用户
  async remove(id: number): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // 删除关联的 UserProfile
    const userProfile = await this.userProfileRepository.findOne({
      where: { user: { id } },
    });

    if (userProfile) {
      await this.userProfileRepository.remove(userProfile);
    }

    return await this.userRepository.delete(id);
  }
  // 新增方法 - 更新密码
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // 检查旧密码是否正确
    const oldPasswordCorrect = await bcrypt.compare(updatePasswordDto.oldPassword, user.password);
    this.logger.log(oldPasswordCorrect)
    if (!oldPasswordCorrect) {
      throw new Error('旧密码错误'); // 或者返回一个错误响应
    }
    // 生成新哈希密码
    const newPasswordHash = await bcrypt.hash(updatePasswordDto.newPassword, 12);
    // 更新用户的密码
    this.userRepository.update(id, { password: newPasswordHash });
    return user;
  }
}