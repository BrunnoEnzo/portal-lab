import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SocialLoginDto {
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() name: string;
}