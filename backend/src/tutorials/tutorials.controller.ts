// backend/src/tutorials/tutorials.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Express } from 'express';

interface AuthRequest extends Request {
  user: User;
}

@UseGuards(JwtAuthGuard)
@Controller('tutorials')
export class TutorialsController {
  constructor(private readonly tutorialsService: TutorialsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('coverPhoto', {
    storage: diskStorage({
      destination: './uploads/foto-tutorial',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createTutorialDto: CreateTutorialDto, @Req() req: AuthRequest) {
    const coverPhotoPath = file ? `/uploads/foto-tutorial/${file.filename}` : null;
    return this.tutorialsService.create(createTutorialDto, req.user, coverPhotoPath);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.tutorialsService.findAllByProfessor(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.tutorialsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('coverPhoto', {
    storage: diskStorage({
      destination: './uploads/foto-tutorial',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateTutorialDto: UpdateTutorialDto, @Req() req: AuthRequest) {
    const coverPhotoPath = file ? `/uploads/foto-tutorial/${file.filename}` : undefined;
    return this.tutorialsService.update(id, updateTutorialDto, req.user.id, coverPhotoPath);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.tutorialsService.remove(id, req.user.id);
  }
}