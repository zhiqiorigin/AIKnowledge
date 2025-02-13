// src/user/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany
} from 'typeorm';
import { Todo } from '@/modules/todo/entities/todo.entity';
import { UserProfile } from './userProfile.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  username: string;

  @Column({ length: 255, unique: true, nullable: true })
  email: string;


  @Column({ length: 255, nullable: false })
  password: string; // 使用强加密算法存储

  @Column({ length: 50, nullable: false, default: 'user' })
  role: string;

  @CreateDateColumn() // 直接使用 CreateDateColumn 装饰器
  createdAt: Date;

  @UpdateDateColumn() // 直接使用 UpdateDateColumn 装饰器
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @Column({ length: 50, nullable: false, default: 'active' })
  status: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;
  
}
