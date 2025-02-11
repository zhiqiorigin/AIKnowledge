import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import {
  USER_REPOSITORY,
  USER_PROFILE_REPOSITORY,
} from '../../constants/common.constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

export const userProfileProviders = [
  {
    provide: USER_PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserProfile),
    inject: ['DATA_SOURCE'],
  },
];
