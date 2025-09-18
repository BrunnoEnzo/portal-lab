import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  provider: string; // <<< Adicionado e validado
}