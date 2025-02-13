import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private readonly logger = new Logger(AdminGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // 验证 JWT 并获取 payload
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // 将 payload 赋值给 request 对象以便在路由处理器中使用
      /**
       * payload:{
       *  id
       *  username
       *  role
       * }
       */
      request['user'] = payload;
      
      // 检查用户是否存在并且角色为 admin
      const user = request.user;
      this.logger.log(user)
      if (user && user.role === 'admin') {
        return true;
      } else {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
