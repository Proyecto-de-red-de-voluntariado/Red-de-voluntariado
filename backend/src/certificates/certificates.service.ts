import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.certificate.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const cert = await this.prisma.certificate.findUnique({ where: { id } });
    if (!cert) throw new NotFoundException('Certificado no encontrado');
    return cert;
  }

  async create(dto: CreateCertificateDto) {
    if (!dto.title || !dto.description || !dto.volunteerId || !dto.projectId || !dto.orgId) {
      throw new BadRequestException('Faltan campos obligatorios');
    }
    return await this.prisma.certificate.create({
      data: {
        title: dto.title,
        description: dto.description,
        volunteerId: dto.volunteerId,
        projectId: dto.projectId,
        orgId: dto.orgId,
        template: dto.template ?? null,
        customFields: dto.customFields ?? null,
      },
    });
  }
}
