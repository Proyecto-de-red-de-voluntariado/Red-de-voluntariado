import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  //Habilitar CORS para que el frontend pueda consumir la API
  app.enableCors({
    origin: true, //En producción, especifica el dominio del frontend
    credentials: true,
  });

  //Validación automática de DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Eliminar propiedades no definidas en el DTO
      forbidNonWhitelisted: true, //Lanza error si hay propiedades no dfinidas
      transform: true, //Transforma los tipos automáticamente
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();