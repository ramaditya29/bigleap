import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConsumerDeserializer, IncomingRequest, Transport } from '@nestjs/microservices';
import { EmailModule } from './email.module';

class IdDeserializer implements ConsumerDeserializer {
  deserialize(value: any): IncomingRequest {
    Logger.log(value);
    return value;
  }
}


async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmailModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 8889,
      deserializer: new IdDeserializer()
    },
    logger: ['log']
  });
  app.listen();
}
bootstrap();
