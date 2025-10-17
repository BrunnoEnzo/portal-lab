import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { TutorialsService } from './tutorials.service';

interface AuthRequest extends Request { user: User; }

@UseGuards(JwtAuthGuard)
@Controller('tutorials')
export class TutorialsController {
  constructor(private readonly tutorialsService: TutorialsService) {}

  @Post()
  create(@Body() createTutorialDto: CreateTutorialDto, @Req() req: AuthRequest) {
    return this.tutorialsService.create(createTutorialDto, req.user);
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
  update(@Param('id') id: string, @Body() updateTutorialDto: UpdateTutorialDto, @Req() req: AuthRequest) {
    return this.tutorialsService.update(id, updateTutorialDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.tutorialsService.remove(id, req.user.id);
  }
}