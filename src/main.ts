import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // 'Bootstrap' es el contexto del log
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  logger.log(`Running on port ${3000}`);
  const config = new DocumentBuilder()
    .setTitle('API de Imágenes')
    .setDescription('API para gestión de imágenes con filtros')
    .setVersion('1.0')
    .addTag('images')
    .addBearerAuth() 
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();