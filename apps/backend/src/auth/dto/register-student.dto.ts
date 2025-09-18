import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name: string;

  @IsEmail({}, { message: 'Por favor, insira um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  // ADICIONE/AJUSTE ESTA LINHA
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;
}