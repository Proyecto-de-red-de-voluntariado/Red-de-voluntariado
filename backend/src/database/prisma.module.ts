import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que PrismaService esté disponible en TODOS los módulos sin importar
@Module({
  providers: [PrismaService], // Registra el servicio
  exports: [PrismaService],   // Lo exporta para que otros módulos lo usen
})
export class PrismaModule {}