import { Module } from '@nestjs/common';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';
import {todoProviders} from './todo.provider'
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosController],
  providers: [...todoProviders,TodosService],
})
export class TodoModule {}
