import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCourseDto: CreateCourseDto,
    userId: string,
    coverPhoto?: Express.Multer.File,
  ) {
    try {
      const course = await this.prisma.course.create({
        data: {
          ...createCourseDto,
          coverPhotoPath: coverPhoto?.path,
          professor: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return course;
    } catch (error) {
      throw new InternalServerErrorException(
        'Aconteceu um erro ao criar o curso',
        error.message,
      );
    }
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }
    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    coverPhoto?: Express.Multer.File,
  ) {
    const data: any = { ...updateCourseDto };

    if (coverPhoto) {
      data.coverPhotoPath = coverPhoto.path;
    }

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}