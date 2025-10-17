// backend/src/courses/dto/create-course.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O resumo não pode ser vazio.' })
  @MaxLength(255, { message: 'O resumo não pode ter mais de 255 caracteres.' })
  summary: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
  description: string;
}