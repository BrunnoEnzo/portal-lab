// backend/src/courses/courses.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import type { Request } from 'express';
import { diskStorage } from 'multer';
import type { Express } from 'express';

interface AuthRequest extends Request { user: User; }

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('coverPhoto', {
    storage: diskStorage({
      destination: './uploads/foto-curso',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createCourseDto: CreateCourseDto, @Req() req: AuthRequest) {
    const coverPhotoPath = file ? `/uploads/foto-curso/${file.filename}` : null;
    return this.coursesService.create(createCourseDto, req.user, coverPhotoPath);
  }

  @Get()
  findAllByProfessor(@Req() req: AuthRequest) {
    return this.coursesService.findAllByProfessor(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.coursesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('coverPhoto', {
    storage: diskStorage({
      destination: './uploads/foto-curso',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateCourseDto: UpdateCourseDto, @Req() req: AuthRequest) {
    const coverPhotoPath = file ? `/uploads/foto-curso/${file.filename}` : undefined;
    return this.coursesService.update(id, updateCourseDto, req.user.id, coverPhotoPath);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.coursesService.remove(id, req.user.id);
  }
}