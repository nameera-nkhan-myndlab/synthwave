import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export enum SkillCategory {
  LANGUAGE = 'language',
  FRAMEWORK = 'framework',
  TOOL = 'tool',
  PLATFORM = 'platform',
  MODEL = 'model',
}

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsEnum(SkillCategory)
  category: string;

  @IsOptional()
  @IsString()
  iconUrl?: string;

  @IsOptional()
  @IsInt()
  proficiency?: number;
}