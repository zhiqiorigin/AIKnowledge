import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('increment')
  article_id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ unique: true, length: 255, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'int', nullable: false })
  author_id: number;

  @Column({ type: 'varchar', nullable: false, default: 'draft' })
  status: 'draft' | 'published' | 'archived';

  @Column({ type: 'varchar', nullable: false, default: 'private' })
  default_permission: 'public' | 'private' | 'team-only';

  @Column({ type: 'int', nullable: false })
  knowledge_base_id: number;

  @Column({ type: 'int', default: 1 })
  current_version: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_modified_at: Date;
}