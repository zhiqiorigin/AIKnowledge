// create-knowledge.dto.ts
import { IsInt, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export class CreateKnowledgeDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['private', 'team', 'public'])
  privacy_setting: 'private' | 'team' | 'public';

  @IsInt()
  @IsOptional()
  teamId?: number;
}