// backend/src/articles/dto/create-article.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateArticleDto {
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
  pdfFileUrl: string;

  @IsUrl()
  @IsOptional()
  coverPhotoUrl?: string;
}