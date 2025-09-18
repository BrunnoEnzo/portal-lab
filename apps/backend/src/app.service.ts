// apps/backend/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  // Injeta o PrismaService
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Novo método para checar a saúde do banco
  async getDbHealth(): Promise<string> {
    try {
      // Executa uma query simples e barata que sempre deve funcionar
      await this.prisma.$queryRaw`SELECT 1`;
      return 'Database connection is healthy';
    } catch (e) {
      // Se a query falhar, a conexão está com problemas
      console.error(e);
      return 'Database connection failed';
    }
  }
}