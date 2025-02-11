import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// 定义 UserProfileDto 类
export class UserProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  first_name?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  last_name?: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsOptional()
  language_preference?: string;

  @IsString()
  @IsOptional()
  occupation?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  location?: string;
}

// 定义 UserRole 枚举
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// 定义 CreateUserDto 类
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  email?: string;

  @IsString()
  @MinLength(8) // 密码至少8位
  password: string; // 使用强加密算法存储

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @MaxLength(50)
  status?: string = 'active'; // 默认值为 'active'

  @IsBoolean()
  isActive?: boolean = false; // 默认值为 false

  @ValidateNested() // 验证嵌套对象
  @Type(() => UserProfileDto) // 确保反序列化为 UserProfileDto 类型
  profile?: UserProfileDto; // 用户个人资料
}
