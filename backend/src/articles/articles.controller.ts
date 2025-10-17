import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesService } from './articles.service';
import { diskStorage } from 'multer';
import { Express } from 'express';

interface AuthRequest extends Request { user: User; }

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pdfFile', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: (req, file, cb) => {
        let uploadPath = './uploads/';
        if (file.fieldname === 'pdfFile') {
          uploadPath += 'pdf-artigo';
        } else if (file.fieldname === 'coverPhoto') {
          uploadPath += 'foto-artigo';
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  create(
    @UploadedFiles() files: { pdfFile?: Express.Multer.File[], coverPhoto?: Express.Multer.File[] },
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: AuthRequest,
  ) {
    const pdfFilePath = files.pdfFile ? `/uploads/pdf-artigo/${files.pdfFile[0].filename}` : null;
    const coverPhotoPath = files.coverPhoto ? `/uploads/foto-artigo/${files.coverPhoto[0].filename}` : null;
    return this.articlesService.create(createArticleDto, req.user, pdfFilePath, coverPhotoPath);
  }

  @Get()
  findAllByProfessor(@Req() req: AuthRequest) {
    return this.articlesService.findAllByProfessor(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.articlesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pdfFile', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 },
  ]))
  update(
    @Param('id') id: string,
    @UploadedFiles() files: { pdfFile?: Express.Multer.File[], coverPhoto?: Express.Multer.File[] },
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req: AuthRequest,
  ) {
    const pdfFilePath = files.pdfFile ? `/uploads/pdf-artigo/${files.pdfFile[0].filename}` : undefined;
    const coverPhotoPath = files.coverPhoto ? `/uploads/foto-artigo/${files.coverPhoto[0].filename}` : undefined;

    return this.articlesService.update(id, updateArticleDto, req.user.id, pdfFilePath, coverPhotoPath);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.articlesService.remove(id, req.user.id);
  }
}