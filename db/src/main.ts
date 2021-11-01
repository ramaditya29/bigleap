import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DBModule } from './db.module';
import { Logger } from '@nestjs/common';
import { ConsumerDeserializer, IncomingRequest } from '@nestjs/microservices';

class IdDeserializer implements ConsumerDeserializer {
  deserialize(value: any): IncomingRequest {
    Logger.log(value);
    return value;
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DBModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 8888,
      deserializer: new IdDeserializer()
    },
    logger: ['log']
  });
  app.listen();
}
bootstrap();
