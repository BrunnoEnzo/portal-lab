// backend/src/courses/courses.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCourseDto: CreateCourseDto,
    professor: User,
    coverPhotoPath: string | null,
  ) {
    if (professor.role !== 'PROFESSOR') {
      throw new UnauthorizedException('Apenas professores podem criar cursos.');
    }

    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        coverPhotoPath,
        professorId: professor.id,
      },
    });
  }

  async findAllByProfessor(professorId: string) {
    return this.prisma.course.findMany({ where: { professorId } });
  }

  async findOne(id: string, professorId: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course || course.professorId !== professorId) {
      throw new NotFoundException(`Curso com ID "${id}" não encontrado.`);
    }
    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    professorId: string,
    coverPhotoPath?: string,
  ) {
    await this.findOne(id, professorId);
    return this.prisma.course.update({
      where: { id },
      data: {
        ...updateCourseDto,
        ...(coverPhotoPath && { coverPhotoPath }),
      },
    });
  }

  async remove(id: string, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.course.delete({ where: { id } });
  }
}