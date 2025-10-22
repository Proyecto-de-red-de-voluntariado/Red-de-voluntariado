import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { OrgsModule } from './orgs/orgs.module';
import { ProjectsModule } from './projects/projects.module';
import { MailerModule } from './mailer/mailer.module';
import { CertificatesModule } from './certificates/certificates.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule, // ⬅️ Agregar aquí
    VolunteersModule,
    OrgsModule,
    ProjectsModule,
    MailerModule,
  CertificatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}