// apps/backend/src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // A mágica está aqui!
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}