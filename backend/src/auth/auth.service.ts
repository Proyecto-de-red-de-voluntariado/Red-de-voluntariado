import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { RegisterVolunteerDto } from './dto/register-volunteer.dto';
import { RegisterOngDto } from './dto/register-ong.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ============================================
  // REGISTRO DE VOLUNTARIO
  // ============================================
  async registerVolunteer(dto: RegisterVolunteerDto) {
    // 1. Verificar si el email ya existe
    const existingVolunteer = await this.prisma.volunteer.findUnique({
      where: { email: dto.email },
    });

    if (existingVolunteer) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Encriptar la contraseña con bcrypt (10 rondas de salt)
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Crear el voluntario en la base de datos
    const volunteer = await this.prisma.volunteer.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        lastName: dto.lastName ?? null,
        phone: dto.phone ?? null,
        skills: dto.skills ?? null,
        availability: dto.availability ?? null,
      },
    });

    // 4. Generar token JWT
    const accessToken = await this.generateToken(
      volunteer.id,
      'volunteer',
      volunteer.email,
    );

    // 5. Retornar respuesta sin la contraseña
    return {
      message: 'Voluntario registrado exitosamente',
      user: {
        id: volunteer.id,
        email: volunteer.email,
        name: volunteer.name,
        lastName: volunteer.lastName,
        role: 'volunteer',
      },
      access_token: accessToken,
    };
  }

  // ============================================
  // REGISTRO DE ONG
  // ============================================
  async registerOng(dto: RegisterOngDto) {
    // 1. Verificar si el email ya existe
    const existingOrg = await this.prisma.org.findUnique({
      where: { email: dto.email },
    });

    if (existingOrg) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Crear la ONG en la base de datos
    const org = await this.prisma.org.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        description: dto.description ?? null,
        phone: dto.phone ?? null,
        website: dto.website ?? null,
        city: dto.city ?? null,
        country: dto.country ?? null,
      },
    });

    // 4. Generar token JWT
    const accessToken = await this.generateToken(org.id, 'ong', org.email);

    // 5. Retornar respuesta
    return {
      message: 'ONG registrada exitosamente (pendiente de verificación)',
      user: {
        id: org.id,
        email: org.email,
        name: org.name,
        verified: org.verified,
        role: 'ong',
      },
      access_token: accessToken,
    };
  }

  // ============================================
  // LOGIN
  // ============================================
  async login(dto: LoginDto) {
    // 1. Buscar primero como voluntario
    let user: any; //  Cambiar el tipo a 'any' temporalmente
    let role: 'volunteer' | 'ong' = 'volunteer';

    user = await this.prisma.volunteer.findUnique({
      where: { email: dto.email },
    });

    // 2. Si no es voluntario, buscar como ONG
    if (!user) {
      user = await this.prisma.org.findUnique({
        where: { email: dto.email },
      });
      role = 'ong';
    }

    // 3. Si no existe el usuario
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Verificar la contraseña con bcrypt
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 5. Generar token JWT
    const accessToken = await this.generateToken(user.id, role, user.email);

    // 6. Retornar respuesta
    return {
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role,
      },
      access_token: accessToken,
    };
  }

  // ============================================
  // GENERAR TOKEN JWT (método privado)
  // ============================================
  private async generateToken(
    userId: number,
    role: 'volunteer' | 'ong',
    email: string,
  ): Promise<string> {
    // Payload del JWT
    const payload = {
      sub: userId, // "sub" es el estándar para el ID del usuario
      role,
      email,
    };

    // Firmar el token con JWT_SECRET
    return await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '7d',
    });
  }
}