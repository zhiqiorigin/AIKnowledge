import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders, userProfileProviders } from './users.provider';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, ...userProfileProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
