import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './../constants';
import { Request } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      this.logger.debug(`Attempting to verify token: ${token}`);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Assign the payload to the request object for use in route handlers
      request['user'] = payload;
      return true;
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.authorization;

    if (!authorization) {
      this.logger.warn('Authorization header is missing.');
      return undefined;
    }

    const [type, token] = authorization.split(' ') ?? [];

    if (type !== 'Bearer') {
      this.logger.warn(`Unsupported authorization type: ${type}`);
      return undefined;
    }

    if (!token) {
      this.logger.warn('Token is missing in the authorization header.');
      return undefined;
    }

    return token;
  }
}