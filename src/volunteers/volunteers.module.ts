import { Module } from '@nestjs/common';

import { VolunteersService } from './volunteers.service';
import { PrismaModule } from '../database/prisma.module';
import { VolunteersController } from './volunteers.controller';

@Module({
  imports: [PrismaModule],
  controllers: [VolunteersController],
  providers: [VolunteersService],
})
export class VolunteersModule {}