import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment')
  todo_id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'date' , nullable: true })
  due_date?: Date;

  @Column({ length: 20, default: 'normal' })
  priority?: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
    nullable: false,
  })
  status: string;

  @Column({ type: 'int' })
  assigned_to: number;

  @Column({ type: 'int' })
  created_by: number;

  @Column({ type: 'int', nullable: true })
  team_id?: number;
}