// apps/backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Este método garante que a conexão com o banco de dados seja estabelecida
  // assim que o módulo for carregado.
  async onModuleInit() {
    await this.$connect();
  }
}