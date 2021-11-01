import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  

  @MessagePattern({cmd: 'send_email'})
  sendEmail(payload) {
    console.log('entered here');
    Logger.log('TEst');
    const successResponse = this.emailService.sendEmail(payload.email, payload.message, payload.subject);
    Logger.log(typeof(successResponse));
    return  successResponse;
  }
}
