import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateOrgDto } from './dto/update-org.dto';

@Injectable()
export class OrgsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: number) {
    const org = await this.prisma.org.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        description: true,
        phone: true,
        website: true,
        city: true,
        country: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!org) throw new NotFoundException('Organización no encontrada');
    return org;
  }

  async updateMe(userId: number, dto: UpdateOrgDto) {
    const updated = await this.prisma.org.update({
      where: { id: userId },
      data: {
        name: dto.name ?? undefined,
        description: dto.description ?? undefined,
        phone: dto.phone ?? undefined,
        website: dto.website ?? undefined,
        city: dto.city ?? undefined,
        country: dto.country ?? undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        description: true,
        phone: true,
        website: true,
        city: true,
        country: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updated;
  }
}