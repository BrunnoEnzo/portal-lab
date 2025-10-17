// backend/src/tutorials/dto/create-tutorial.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateTutorialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  summary: string;

  @IsUrl()
  @IsNotEmpty()
  coverPhotoUrl: string;

  @IsUrl()
  @IsOptional()
  youtubeUrl?: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}