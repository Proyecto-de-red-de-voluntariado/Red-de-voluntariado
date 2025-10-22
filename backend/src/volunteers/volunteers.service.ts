import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';


@Injectable()
export class VolunteersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: number) {
    const volunteer = await this.prisma.volunteer.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        phone: true,
        skills: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!volunteer) throw new NotFoundException('Voluntario no encontrado');
    return volunteer;
  }

  async updateMe(userId: number, dto: UpdateVolunteerDto) {
    const updated = await this.prisma.volunteer.update({
      where: { id: userId },
      data: {
        name: dto.name ?? undefined,
        lastName: dto.lastName ?? undefined,
        phone: dto.phone ?? undefined,
        skills: dto.skills ?? undefined,
        availability: dto.availability ?? undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        phone: true,
        skills: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updated;
  }
}