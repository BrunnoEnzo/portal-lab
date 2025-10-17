// backend/src/tutorials/dto/create-tutorial.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'; // Adicione o IsOptional aqui

export class CreateTutorialDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsString({ message: 'O resumo deve ser uma string.' })
  @IsNotEmpty({ message: 'O resumo não pode ser vazio.' })
  summary: string;

  @IsOptional() // <<< ADICIONE ESTA LINHA
  @IsString({ message: 'O conteúdo deve ser uma string.' })
  content: string;
}