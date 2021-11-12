import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Auth')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
