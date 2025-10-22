import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';


// Tipo del payload del JWT
export type JwtPayload = {
  sub: number; // ID del usuario
  role: 'volunteer' | 'ong'; // Rol
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lee el token del header Authorization
      ignoreExpiration: false, // Valida que no esté expirado
      secretOrKey: config.get<string>('JWT_SECRET'), // Secreto desde .env
    });
  }

  // Se ejecuta automáticamente cuando se valida el token
  async validate(payload: JwtPayload) {
    // Verificar que el usuario exista en la BD
    if (payload.role === 'volunteer') {
      const volunteer = await this.prisma.volunteer.findUnique({
        where: { id: payload.sub },
      });
      if (!volunteer) {
        throw new UnauthorizedException('Voluntario no encontrado');
      }
    } else if (payload.role === 'ong') {
      const org = await this.prisma.org.findUnique({
        where: { id: payload.sub },
      });
      if (!org) {
        throw new UnauthorizedException('Organización no encontrada');
      }
    }

    // Retorna el payload que se adjunta a req.user
    return { userId: payload.sub, role: payload.role, email: payload.email };
  }
}