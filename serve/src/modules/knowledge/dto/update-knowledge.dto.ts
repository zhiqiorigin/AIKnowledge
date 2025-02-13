// update-knowledge.dto.ts
import { IsInt, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export class UpdateKnowledgeDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['private', 'team', 'public'])
  @IsOptional()
  privacy_setting?: 'private' | 'team' | 'public';

  @IsInt()
  @IsOptional()
  teamId?: number;
}