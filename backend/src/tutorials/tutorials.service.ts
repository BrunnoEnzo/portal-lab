// backend/src/tutorials/tutorials.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Injectable()
export class TutorialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTutorialDto: CreateTutorialDto, professor: User, coverPhotoPath: string | null) {
    if (professor.role !== 'PROFESSOR') {
      throw new UnauthorizedException('Apenas professores podem criar tutoriais.');
    }
    
    if (!coverPhotoPath) {
        throw new Error("A foto de capa é obrigatória.");
    }

    return this.prisma.tutorial.create({
      data: {
        ...createTutorialDto,
        coverPhotoPath,
        professorId: professor.id,
      },
    });
  }

  async findAllByProfessor(professorId: string) {
    return this.prisma.tutorial.findMany({ where: { professorId } });
  }

  async findOne(id: string, professorId: string) {
    const tutorial = await this.prisma.tutorial.findUnique({ where: { id } });
    if (!tutorial || tutorial.professorId !== professorId) {
      throw new NotFoundException(`Tutorial com ID "${id}" não encontrado.`);
    }
    return tutorial;
  }

  async update(id: string, updateTutorialDto: UpdateTutorialDto, professorId: string, coverPhotoPath?: string) {
    await this.findOne(id, professorId);
    return this.prisma.tutorial.update({
      where: { id },
      data: {
        ...updateTutorialDto,
        ...(coverPhotoPath && { coverPhotoPath }),
      },
    });
  }

  async remove(id: string, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.tutorial.delete({ where: { id } });
  }
}