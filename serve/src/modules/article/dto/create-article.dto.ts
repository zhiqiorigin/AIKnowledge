// create-article.dto.ts
import { IsInt, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  slug: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: 'draft' | 'published' | 'archived';

  @IsEnum(['public', 'private', 'team-only'])
  @IsOptional()
  default_permission?: 'public' | 'private' | 'team-only';

  @IsInt()
  author_id: number;

  @IsInt()
  knowledge_base_id: number;
}