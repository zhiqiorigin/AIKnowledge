// src/user-profile/user-profile.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ length: 100, nullable: true })
  timezone: string;

  @Column({ length: 100, nullable: true })
  language_preference: string;

  @Column({ length: 255, nullable: true })
  occupation: string; // 新增字段：职业

  @Column({ length: 255, nullable: true })
  company: string; // 新增字段：公司

  @Column({ length: 255, nullable: true })
  location: string; // 新增字段：位置

  @OneToOne(() => User, (user) => user.profile) // 关联到 User 实体
  @JoinColumn({ name: 'user_id' })
  user: User;
}
