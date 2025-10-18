import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('tutorials')
export class TutorialsController {
  constructor(private readonly tutorialsService: TutorialsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('coverPhoto'))
  create(
    @Body() createTutorialDto: CreateTutorialDto,
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: 'image' }),
        ],
        fileIsRequired: false,
      }),
    )
    coverPhoto?: Express.Multer.File,
  ) {
    return this.tutorialsService.create(
      createTutorialDto,
      req.user.id,
      coverPhoto,
    );
  }

  @Get()
  findAll() {
    return this.tutorialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorialsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('coverPhoto'))
  update(
    @Param('id') id: string,
    @Body() updateTutorialDto: UpdateTutorialDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: 'image' }),
        ],
        fileIsRequired: false,
      }),
    )
    coverPhoto: Express.Multer.File,
  ) {
    return this.tutorialsService.update(id, updateTutorialDto, coverPhoto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorialsService.remove(id);
  }
}