import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHeaderMiddleware } from './middleware/auth-header/authHeader.middleware';
const emailHost = process.env.EMAIL_SERVICE ? process.env.EMAIL_SERVICE : "127.0.0.1";
const dbHost = process.env.DATABASE_SERVICE ? process.env.DATABASE_SERVICE : "127.0.0.1";  
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MONGO_SERVICE',
        transport: Transport.TCP,
        options: {
          //host: '127.0.0.1',
          host: dbHost,
          port: 8888,
        },
      },
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.TCP,
        options: {
          //host: '127.0.0.1',
          host: emailHost,
          port: 8889,
        },
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthHeaderMiddleware)
      .forRoutes(AuthController);
  }
  
}
