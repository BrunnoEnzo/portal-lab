import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, professor: User) {
    if (professor.role !== 'PROFESSOR') {
      throw new UnauthorizedException('Apenas professores podem criar artigos.');
    }

    return this.prisma.article.create({
      data: {
        ...createArticleDto,
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
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.article.update({ where: { id }, data: updateArticleDto });
  }

  async remove(id: string, professorId: string) {
    await this.findOne(id, professorId);
    return this.prisma.article.delete({ where: { id } });
  }
}