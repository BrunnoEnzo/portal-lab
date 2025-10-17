import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { TutorialsModule } from './tutorials/tutorials.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthModule, PrismaModule, CoursesModule, TutorialsModule, ArticlesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
