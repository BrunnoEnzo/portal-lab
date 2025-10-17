import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Injectable()
export class TutorialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTutorialDto: CreateTutorialDto, professor: User) {
    if (professor.role !== 'PROFESSOR') {
      throw new UnauthorizedException('Apenas professores podem criar tutoriais.');
    }

    return this.prisma.tutorial.create({
      data: {
        ...createTutorialDto,
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
      throw new NotFoundException(`Tutorial with ID "${id}" not found`);
    }
    return tutorial;
  }

  async update(id: string, updateTutorialDto: UpdateTutorialDto, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.tutorial.update({ where: { id }, data: updateTutorialDto });
  }

  async remove(id: string, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.tutorial.delete({ where: { id } });
  }
}