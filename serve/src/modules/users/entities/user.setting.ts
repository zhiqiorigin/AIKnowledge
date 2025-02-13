import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class UserSetting {
  @PrimaryGeneratedColumn()
  settingId: number;

  @Column({
    length: 255,
    unique: false,
    nullable: false,
  })
  settingKey: string;

  @Column({
    type: 'text',
    length: 65535,
    unique: false,
    nullable: false,
  })
  settingValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile) // 关联到 User 实体
  @JoinColumn({ name: 'user_id' })
  user: User;
}
