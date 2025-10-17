import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, professor: User, pdfFilePath: string | null, coverPhotoPath: string | null) {
    if (professor.role !== 'PROFESSOR') {
      throw new UnauthorizedException('Apenas professores podem criar artigos.');
    }

    if (!pdfFilePath) {
      throw new Error("O arquivo PDF é obrigatório.");
    }

    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        pdfFilePath,
        coverPhotoPath,
        professorId: professor.id,
      },
    });
  }
  
  async findAllByProfessor(professorId: string) {
    return this.prisma.article.findMany({ where: { professorId } });
  }

  async findOne(id: string, professorId: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article || article.professorId !== professorId) {
      throw new NotFoundException(`Artigo com ID "${id}" não encontrado.`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto, professorId: string, pdfFilePath?: string, coverPhotoPath?: string) {
    await this.findOne(id, professorId);
    return this.prisma.article.update({
      where: { id },
      data: {
        ...updateArticleDto,
        ...(pdfFilePath && { pdfFilePath }),
        ...(coverPhotoPath && { coverPhotoPath }),
      },
    });
  }

  async remove(id: string, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.article.delete({ where: { id } });
  }
}