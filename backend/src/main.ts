import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 1. Importe aqui

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Adicione esta linha para habilitar a validação global
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();