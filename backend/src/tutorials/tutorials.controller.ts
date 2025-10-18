// backend/src/tutorials/tutorials.controller.ts
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
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { User } from '@prisma/client';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: User;
}

@UseGuards(JwtAuthGuard)
@Controller('tutorials')
export class TutorialsController {
  constructor(private readonly tutorialsService: TutorialsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverPhoto', maxCount: 1 }], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/foto-tutorial');
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
    @Body() createTutorialDto: CreateTutorialDto,
    @Req() req: AuthRequest,
  ) {
    const coverPhotoPath = files.coverPhoto
      ? `/uploads/foto-tutorial/${files.coverPhoto[0].filename}`
      : null;
    return this.tutorialsService.create(
      createTutorialDto,
      req.user,
      coverPhotoPath,
    );
  }

  @Get()
  findAllByProfessor(@Req() req: AuthRequest) {
    return this.tutorialsService.findAllByProfessor(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.tutorialsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverPhoto', maxCount: 1 }], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/foto-tutorial');
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
    @Body() updateTutorialDto: UpdateTutorialDto,
    @Req() req: AuthRequest,
  ) {
    const coverPhotoPath = files.coverPhoto
      ? `/uploads/foto-tutorial/${files.coverPhoto[0].filename}`
      : undefined;

    return this.tutorialsService.update(
      id,
      updateTutorialDto,
      req.user.id,
      coverPhotoPath,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.tutorialsService.remove(id, req.user.id);
  }
}