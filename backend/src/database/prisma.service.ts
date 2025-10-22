import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Se ejecuta cuando el módulo se inicializa
  async onModuleInit() {
    await this.$connect(); // Conecta a la base de datos
  }

  // Hook para cerrar la conexión cuando la app se cierra
  async enableShutdownHooks(app: INestApplication) {
    // castea a any para evitar error de tipo cuando Prisma infiere el evento como never
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}