// update-article.dto.ts
import { IsInt, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  slug?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  content?: string;

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: 'draft' | 'published' | 'archived';

  @IsEnum(['public', 'private', 'team-only'])
  @IsOptional()
  default_permission?: 'public' | 'private' | 'team-only';

  @IsInt()
  @IsOptional()
  author_id?: number;

  @IsInt()
  @IsOptional()
  knowledge_base_id?: number;

  @IsInt()
  @IsOptional()
  current_version?: number;
}