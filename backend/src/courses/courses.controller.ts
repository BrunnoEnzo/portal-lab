// backend/src/courses/courses.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { Request } from 'express';

interface AuthRequest extends Request { user: User; }

@UseGuards(JwtAuthGuard) // Aplicamos o guard a todas as rotas do controller
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: AuthRequest) {
    return this.coursesService.create(createCourseDto, req.user);
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
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: AuthRequest) {
    return this.coursesService.update(id, updateCourseDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.coursesService.remove(id, req.user.id);
  }
}