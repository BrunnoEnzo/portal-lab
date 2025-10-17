// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs'; // <-- 1. Importe o 'fs'

async function bootstrap() {
  // 2. Crie os diretórios de upload antes de iniciar a aplicação
  const uploadPaths = ['uploads/pdf-artigo', 'uploads/foto-capa'];
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