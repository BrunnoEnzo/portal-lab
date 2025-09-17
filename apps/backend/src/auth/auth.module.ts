// apps/backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // Adicione essa variável ao seu .env do backend!
      signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}