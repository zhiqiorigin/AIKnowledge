import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // 确保正确导入 bcrypt
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByName(username);
    if (!user) {
      throw new UnauthorizedException('找不到该用户');
    }
    // 比较哈希密码
    const isPasswordCorrect = await bcrypt.compare(password, user!.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('密码错误或已过期');
    }

    // 创建 JWT payload
    const payload = { sub: user!.id, username: user!.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
