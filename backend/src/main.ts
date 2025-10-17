// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  // CORREÇÃO: Adicione todos os diretórios de upload necessários
  const uploadPaths = [
    'uploads/pdf-artigo',
    'uploads/foto-artigo', // Adicionado
    'uploads/foto-curso',  // Adicionado
    'uploads/foto-tutorial'// Adicionado
  ];

  uploadPaths.forEach((path) => {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();