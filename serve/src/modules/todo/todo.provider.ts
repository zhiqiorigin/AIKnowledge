import { DataSource } from 'typeorm';
import { Todo } from './entities/todo.entity';
import {User} from './../users/entities/user.entity'
import {
  TODO_REPOSITORY,
  USER_REPOSITORY
} from '../../constants/common.constants';

export const todoProviders = [
  {
    provide: TODO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: ['DATA_SOURCE'],
  },
];
