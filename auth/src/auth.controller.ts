import { Body, Controller, Get, Inject, Logger, NotFoundException, Post, Res, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { GetOtpDto } from './dto/GetOtpDto.dto';
import { LoginDto } from './dto/LoginDto.dto';
import { RegisterDto } from './dto/RegisterDto.dto';
import { ValidateOtp } from './dto/ValidateOtp.dto';
import { generateOtp } from './utils/utils';
import { ResponsePayload } from './utils/ResponsePayload';
import { Response } from 'express';
import { ApiOkResponse, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <Token>',
})
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    @Inject('MONGO_SERVICE') private readonly dbService: ClientProxy,
    @Inject('EMAIL_SERVICE') private readonly emailService: ClientProxy) {}

  @Get('/status')
  serverStatus(){
    return { 
      res: process.uptime(),
      currentDate: new Date().toString()
    }    
  }  

  @Post('/register')
  async registerUser(@Body() registerDto: RegisterDto){
    let registerResp$ = this.dbService.send({cmd: 'create_user'}, registerDto);
    let data = await lastValueFrom(registerResp$);
    Logger.log('the data is:' , data);
    if(data.status === "SUCCESS"){
      const emailStatus = this.emailService.send({cmd : 'send_email'}, {email: registerDto.email, message: `Registration successful`, subject: 'Bigleap Registration' });
      let st = await lastValueFrom(emailStatus);
    }
    return data;
  }

  @Post('/login')
  @ApiOkResponse({ status: 200, description: "OTP Validation", type: ResponsePayload})
  async login(@Body() loginDto: LoginDto){
    return await this.dbService.send({cmd: 'login_user'}, loginDto.email);
  }

  @Post('/getOtp')
  @ApiOkResponse({ status: 200, description: "OTP Validation", type: ResponsePayload})
  async getOtp(@Body() otpDetails: GetOtpDto, @Res() response: Response){
    const serviceResponse$ = this.dbService.send({cmd: 'get_otp'} , otpDetails);
    let res = await lastValueFrom(serviceResponse$);
    
    if(res.status && res.status === 'SUCCESS' ){
      let { data } = res;
      Logger.log(data.currentOtp);
      const emailStatus = this.emailService.send({cmd : 'send_email'}, {email: data.email, message: `OTP is:${data.currentOtp}`, subject: 'OTP for Bigleap' });
      let st = await lastValueFrom(emailStatus);
      response.status(HttpStatus.OK).json({ status: "SUCCESS", message: "OTP GENERATION SUCCESS", data: ""});
    } else {
      response.status(HttpStatus.BAD_REQUEST).json({ status: "ERROR", message: "OTP GENERATION FAILURE", data: ""});
    }
  
  }

  @Post('/validateOtp')
  async validateOtp(@Body() otpDetails: ValidateOtp){
    return this.authService.validateOtp(otpDetails);
  }
  
  @Post('/testemail')
  async testEmail(){
    return await this.emailService.send({ cmd: 'send_email'}, {});
  }
}
