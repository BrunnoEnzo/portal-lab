import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TutorialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTutorialDto: CreateTutorialDto, userId: string) {
    // Simplificado: Sem parâmetro 'coverPhoto'
    try {
      const tutorial = await this.prisma.tutorial.create({
        data: {
          ...createTutorialDto,
          // Campos opcionais (content, youtubeUrl, coverPhotoPath) não são definidos aqui
          professor: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return tutorial;
    } catch (error) {
      throw new InternalServerErrorException(
        'Aconteceu um erro ao criar o tutorial',
        error.message,
      );
    }
  }

  findAll() {
    return this.prisma.tutorial.findMany();
  }

  async findOne(id: string) {
    const tutorial = await this.prisma.tutorial.findUnique({ where: { id } });
    if (!tutorial) {
      throw new NotFoundException(`Tutorial com ID ${id} não encontrado`);
    }
    return tutorial;
  }

  async update(
    id: string,
    updateTutorialDto: UpdateTutorialDto,
    coverPhoto?: Express.Multer.File,
  ) {
    // Adicionado parâmetro 'coverPhoto'
    const data: any = { ...updateTutorialDto };

    if (coverPhoto) {
      data.coverPhotoPath = coverPhoto.path;
    }

    return this.prisma.tutorial.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.tutorial.delete({ where: { id } });
  }
}