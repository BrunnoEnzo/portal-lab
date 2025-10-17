// backend/src/courses/courses.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // POST /courses (Já tínhamos este)
  async create(createCourseDto: CreateCourseDto, professor: User) {
    // ...código existente...
  }

  // GET /courses
  async findAllByProfessor(professorId: string) {
    return this.prisma.course.findMany({
      where: { professorId },
    });
  }

  // GET /courses/:id
  async findOne(id: string, professorId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course || course.professorId !== professorId) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }

    return course;
  }

  // PATCH /courses/:id
  async update(id: string, updateCourseDto: UpdateCourseDto, professorId: string) {
    // Primeiro, verifica se o curso existe e pertence ao professor
    await this.findOne(id, professorId); 
    
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  // DELETE /courses/:id
  async remove(id: string, professorId: string) {
    // Verifica se o curso existe e pertence ao professor
    await this.findOne(id, professorId);

    return this.prisma.course.delete({
      where: { id },
    });
  }
}