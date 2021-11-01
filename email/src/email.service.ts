import { Injectable } from '@nestjs/common';
//import { nodemailer } from 'nodemailer';
const nodemailer = require('nodemailer');
import { Logger } from '@nestjs/common';
@Injectable()
export class EmailService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(toEmail = 'test@gmail.com', message = 'Registration Success', subject = 'Bigleap'){
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER ? process.env.USER : "" ,
        pass: process.env.PASSWORD ? process.env.PASSWORD : ""
      }
    });
    
    var mailOptions = {
      from: process.env.USER,
      to: toEmail,
      subject: subject,
      text: message
    };
    Logger.log(nodemailer);
    var status = await transporter.sendMail(mailOptions);
    Logger.log(status);
    return 'Success';
  }
}
