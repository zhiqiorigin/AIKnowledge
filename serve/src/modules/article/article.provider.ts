import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';
import { Knowledge } from '../knowledge/entities/knowledge.entity';
import {
  ARTICLE_REPOSITORY,
  KNOWLEDGE_REPOSITORY
} from '../../constants/common.constants';

export const userProviders = [
  {
    provide: ARTICLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: KNOWLEDGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Knowledge),
    inject: ['DATA_SOURCE'],
  },
];
