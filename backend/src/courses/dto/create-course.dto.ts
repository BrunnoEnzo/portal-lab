// backend/src/courses/dto/create-course.dto.ts
import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do curso não pode ser vazio.' })
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O resumo não pode ser vazio.' })
  @MaxLength(255)
  summary: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
  description: string;

  @IsUrl({}, { message: 'A URL da foto de capa é inválida.' })
  @IsNotEmpty({ message: 'A foto de capa é obrigatória.' })
  coverPhotoUrl: string;
}