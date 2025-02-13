import { DataSource } from 'typeorm';
import { Knowledge } from './entities/knowledge.entity';
import {
  KNOWLEDGE_REPOSITORY
} from '../../constants/common.constants';

export const userProviders = [
  {
    provide: KNOWLEDGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Knowledge),
    inject: ['DATA_SOURCE'],
  },
];
