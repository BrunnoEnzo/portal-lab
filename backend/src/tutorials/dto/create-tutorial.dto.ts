// backend/src/tutorials/dto/create-tutorial.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateTutorialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  summary: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsOptional()
  youtubeUrl?: string;
}