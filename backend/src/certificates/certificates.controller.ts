import { Controller, Post, Get, Param, Body, UseGuards, Req, BadRequestException, ParseIntPipe } from '@nestjs/common';

import { CreateCertificateDto } from './dto/create-certificate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get()
  async list() {
    return this.certificatesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.certificatesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() dto: CreateCertificateDto) {
    if (req.user.role !== 'ong') {
      throw new BadRequestException('Solo ONGs pueden emitir certificados');
    }
    return this.certificatesService.create({ ...dto, orgId: req.user.userId });
  }
}
