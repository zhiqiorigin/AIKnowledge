import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Knowledge {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ length: 255, nullable: false })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({
      type: 'enum',
      enum: ['private', 'team', 'public'],
      default: 'private',
      nullable: false,
    })
    privacy_setting: 'private' | 'team' | 'public';
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column({ type: 'int', nullable: true })
    teamId?: number;
  
    @Column({ type: 'int' })
    created_by: number;
  }