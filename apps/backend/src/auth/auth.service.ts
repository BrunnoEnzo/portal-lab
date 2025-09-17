import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterStudentDto } from './dto/register-student.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // CADASTRO DE ESTUDANTE COM SENHA
  async registerStudent(dto: RegisterStudentDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { matricula: dto.matricula }] },
    });
    if (existingUser) {
      throw new ConflictException('E-mail ou matrícula já cadastrados.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        matricula: dto.matricula,
        role: 'STUDENT',
      },
    });

    return this.generateToken(user.id, user.email, user.role);
  }
  
  // LOGIN COM SENHA
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordMatching = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.generateToken(user.id, user.email, user.role);
  }

  // LOGIN SOCIAL (GOOGLE, GITHUB)
  async handleSocialLogin(dto: SocialLoginDto) {
    const user = await this.prisma.user.upsert({
      where: { email: dto.email },
      update: { name: dto.name },
      create: {
        email: dto.email,
        name: dto.name,
        role: 'STUDENT',
      },
    });
    
    // Retorna o usuário completo para o NextAuth.js
    const { password, ...result } = user;
    return result;
  }

  // GERA O TOKEN JWT
  private async generateToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}