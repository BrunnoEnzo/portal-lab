// backend/src/courses/courses.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { User } from '@prisma/client';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: User;
}

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverPhoto', maxCount: 1 }], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/foto-curso');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  create(
    @UploadedFiles() files: { coverPhoto?: Express.Multer.File[] },
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: AuthRequest,
  ) {
    const coverPhotoPath = files.coverPhoto
      ? `/uploads/foto-curso/${files.coverPhoto[0].filename}`
      : null;
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
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverPhoto', maxCount: 1 }], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/foto-curso');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { coverPhoto?: Express.Multer.File[] },
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() req: AuthRequest,
  ) {
    const coverPhotoPath = files.coverPhoto
      ? `/uploads/foto-curso/${files.coverPhoto[0].filename}`
      : undefined;

    return this.coursesService.update(
      id,
      updateCourseDto,
      req.user.id,
      coverPhotoPath,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.coursesService.remove(id, req.user.id);
  }
}